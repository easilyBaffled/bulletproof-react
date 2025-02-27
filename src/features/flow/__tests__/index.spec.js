/* eslint-disable max-nested-callbacks, max-lines, max-lines-per-function */
import {
    isNode,
    isEdge,
    getOutgoers,
    getIncomers,
    removeElements,
    addEdge
} from 'react-flow-renderer';
import { testScenarios } from './testScenarios';
import { createWorkflow } from './index';

describe( 'Output Testing', () => {
    describe( 'Basic Situations', () => {
        it.each( testScenarios )( '%s', ( scenarioName, input, output ) => {
            const actual = createWorkflow( input );
            const expected = output;
            expect( actual ).toStrictEqual( expected );
        });
    });
});

const nodes = [
    {
        data:     { label: 'Node 1' },
        id:       '1',
        position: { x: 250, y: 5 },
        type:     'input'
    },
    { data: { label: 'Node 2' }, id: '2', position: { x: 100, y: 100 } },
    { data: { label: 'Node 3' }, id: '3', position: { x: 400, y: 100 } },
    { data: { label: 'Node 4' }, id: '4', position: { x: 400, y: 200 } }
];

const edges = [
    { animated: true, id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-3', source: '2', target: '3' }
];

const elements = [ ...nodes, ...edges ];

describe( 'Graph Utils Testing', () => {
    it( 'tests isNode function', () => {
        expect( isNode( nodes[ 0 ]) ).toBe( true );
        expect( isNode( edges[ 0 ]) ).toBe( false );
    });

    it( 'tests isEdge function', () => {
        expect( isEdge( edges[ 0 ]) ).toBe( true );
        expect( isEdge( nodes[ 0 ]) ).toBe( false );
    });

    it( 'tests getOutgoers function', () => {
        const outgoers = getOutgoers( nodes[ 0 ], elements );
        expect( outgoers.length ).toBe( 2 );

        const noOutgoers = getOutgoers( nodes[ 2 ], elements );
        expect( noOutgoers.length ).toBe( 0 );
    });

    it( 'tests getIncomers function', () => {
        const incomers = getIncomers( nodes[ 2 ], elements );
        expect( incomers.length ).toBe( 2 );

        const noIncomers = getIncomers( nodes[ 0 ], elements );
        expect( noIncomers.length ).toBe( 0 );
    });

    describe( 'tests addEdge function', () => {
        it( 'adds edge', () => {
            const newEdge = { source: '1', target: '4' };
            const nextElements = addEdge( newEdge, elements );

            expect( nextElements.length ).toBe( elements.length + 1 );
        });

        it( 'tries to add existing edge', () => {
            const newEdge = { source: '2', target: '3' };
            const nextElements = addEdge( newEdge, elements );

            expect( nextElements.length ).toBe( elements.length );
        });

        it( 'tries to add invalid edge', () => {
            const newEdge = { nosource: '1', notarget: '3' };

            try {
                addEdge( newEdge, elements );
            } catch ( e ) {
                console.log( e.message );

                expect( e.message ).toBe(
                    "Can't create edge. An edge needs a source and a target."
                );
            }
        });
    });

    describe( 'tests removeElements function', () => {
        it( 'removes a node', () => {
            const nextElements = removeElements([ nodes[ 0 ] ], elements );

            const nextNodes = nextElements.filter( ( e ) => isNode( e ) );
            const nextEdges = nextElements.filter( ( e ) => isEdge( e ) );

            expect( nextNodes.length ).toBe( nodes.length - 1 );
            expect( nextEdges.length ).toBe( edges.length - 2 );
        });

        it( 'removes multiple nodes', () => {
            const elementsToRemove = [ nodes[ 0 ], nodes[ 1 ] ];
            const nextElements = removeElements( elementsToRemove, elements );
            const nextNodes = nextElements.filter( ( e ) => isNode( e ) );
            const nextEdges = nextElements.filter( ( e ) => isEdge( e ) );

            expect( nextNodes.length ).toBe( nodes.length - 2 );
            expect( nextEdges.length ).toBe( 0 );
        });

        it( 'removes no node', () => {
            const nextElementsNoRemove = removeElements([], elements );
            expect( nextElementsNoRemove.length ).toBe( elements.length );
        });

        it( 'tries to removes node that does not exist', () => {
            const nextElementsNoRemove = removeElements(
                [ { id: 'id-that-does-not-exist' } ],
                elements
            );
            expect( nextElementsNoRemove.length ).toBe( elements.length );
        });

        it( 'removes an edge', () => {
            const nextElements = removeElements([ edges[ 0 ] ], elements );

            const nextNodes = nextElements.filter( ( e ) => isNode( e ) );
            const nextEdges = nextElements.filter( ( e ) => isEdge( e ) );

            expect( nextNodes.length ).toBe( nodes.length );
            expect( nextEdges.length ).toBe( edges.length - 1 );
        });

        it( 'removes multiple edges', () => {
            const nextElements = removeElements([ edges[ 0 ], edges[ 1 ] ], elements );

            const nextNodes = nextElements.filter( ( e ) => isNode( e ) );
            const nextEdges = nextElements.filter( ( e ) => isEdge( e ) );

            expect( nextNodes.length ).toBe( nodes.length );
            expect( nextEdges.length ).toBe( edges.length - 2 );
        });

        it( 'removes node and edge', () => {
            const nextElements = removeElements([ nodes[ 0 ], edges[ 0 ] ], elements );

            const nextNodes = nextElements.filter( ( e ) => isNode( e ) );
            const nextEdges = nextElements.filter( ( e ) => isEdge( e ) );

            expect( nextNodes.length ).toBe( nodes.length - 1 );
            expect( nextEdges.length ).toBe( edges.length - 2 );
        });
    });
});
