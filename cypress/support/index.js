// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import uniqueSelector from '@cypress/unique-selector';
// Alternatively you can use CommonJS syntax:
// require('./commands')
const $ = Cypress.$;
// const onlyTextNodes = ( innerText ) => ( i, el ) =>
//     [ ...el.childNodes ].some(
//         ( child ) => child.nodeType === 3 && child.textContent.includes( innerText )
//     );
const isTheOnlyMatch = ( testSelector ) => $( testSelector ).length === 1; // || .filter( onlyTextNodes( innerText ) )

const selectorPriority = [
    'data-cy',
    'data-test',
    'data-testid',
    'id',
    'attributes',
    'tag',
    'class',
    'nth-child'
];

const _isTheOnlyMatch = ( targetText ) => ( selector ) => {
    const matcher = new RegExp( targetText, 'g' );
    return Cypress.$( selector ).text().match( matcher )?.length === 1;
};

Cypress.SelectorPlayground.defaults({
    onElement: ( $el ) => {
        const selector = uniqueSelector( $el.get( 0 ), {
            selectorTypes: selectorPriority
        });

        // from https://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
        let innerText =
            $el
                .contents()
                .filter( ( i, el ) => el.nodeType === Node.TEXT_NODE )?.[ 0 ]
                ?.wholeText?.trim() || $el.text(); // for <button><span>text</span></button> when you click on the button but not the span

        if ( innerText ) {
            if ( isTheOnlyMatch( `body :contains('${innerText}')`, innerText ) )
                return `body :contains('${innerText}')`;

            // if the selector has more than one step, try walking up each step
            const steppedSelectors = selector
                .split( ' > ' )
                .map( ( __, i, arr ) => arr.slice( 0, i + 1 ).join( ' > ' ) );

            for ( const step of steppedSelectors ) {
                if ( isTheOnlyMatch( `body ${step}:contains('${innerText}')` ) )
                    return `body ${step}:contains('${innerText}')`;

                if (
                    isTheOnlyMatch(
                        `body ${step}:contains('${innerText}'):visible`
                    )
                )
                    return `body ${step}:contains('${innerText}'):visible`;
            }

            const nearestTestId =
                $el.closest( '[data-testid]' )?.attr( 'data-testid' ) ?? '';

            if (
                isTheOnlyMatch(
                    `[data-testid="${nearestTestId}"] :contains(${innerText})`
                )
            )
                return `[data-testid="${nearestTestId}"] :contains(${innerText})`;
        }

        return selector;
    },
    selectorPriority
});
