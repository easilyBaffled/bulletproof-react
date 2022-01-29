/* eslint-disable max-lines */

import { createNode } from './util/createNode';
import { createEdge } from './util/createEdge';

let pipe = ( ...args ) => args.reduce( ( acc, v ) => v( acc ) );

export const testScenarios = [
    {
        functionalExample: pipe( 'test', console.log ),
        input:             [
            createNode.textInput( 0, 'test' ),
            createNode.logOut( 1 ),
            createEdge( 0, 1 )
        ],
        name:   'input -> output',
        output: [
            {
                action:  'textInput',
                id:      0,
                inputs:  [],
                outputs: [ 1 ],
                value:   'test'
            },
            { action: 'logOut', id: 1, inputs: [ 0 ], outputs: [] }
        ]
    },
    {
        functionalExample: pipe( 'test', ( s ) => s.toUpperCase(), console.log ),
        input:             [
            createNode.textInput( 0, 'test' ),
            createNode.toUpperCase( 1 ),
            createNode.logOut( 2 ),
            createEdge( 0, 1 ),
            createEdge( 1, 2 )
        ],
        name:   'input -> toUpperCase -> output',
        output: [
            {
                action:  'textInput',
                id:      0,
                inputs:  [],
                outputs: [ 1 ],
                value:   'test'
            },
            { action: 'toUpperCase', id: 1, inputs: [ 0 ], outputs: [ 2 ] },
            { action: 'logOut', id: 2, inputs: [ 1 ], outputs: [] }
        ]
    },
    {
        functionalExample: pipe(
            'test',
            ( s ) => s.toUpperCase(),
            ( s ) => s.split( '' ),
            console.log
        ),
        input: [
            createNode.textInput( 0, 'test' ),
            createNode.textInput( 1, '' ),
            createNode.toUpperCase( 2 ),
            createNode.split( 3 ),
            createNode.logOut( 4 ),
            createEdge( 0, 2 ),
            createEdge( 1, 3 ),
            createEdge( 2, 3 ),
            createEdge( 3, 4 )
        ],
        name:   `input -> toUpperCase -> ( input -> split ) -> output`,
        output: [
            {
                action:  'textInput',
                id:      0,
                inputs:  [],
                outputs: [ 2 ],
                value:   'test'
            },
            {
                action:  'textInput',
                id:      1,
                inputs:  [],
                outputs: [ 3 ],
                value:   ''
            },
            { action: 'toUpperCase', id: 2, inputs: [ 0 ], outputs: [ 3 ] },
            { action: 'split', id: 3, inputs: [ 1, 2 ], outputs: [ 4 ] },
            { action: 'logOut', id: 4, inputs: [ 3 ], outputs: [] }
        ]
    },
    {
        input: [
            createNode.textInput( 0, 'test' ),
            createNode.toUpperCase( 1 ),
            createNode.logOut( 2 ),
            createNode.textInput( 3, '' ),
            createEdge( 0, 1 ),
            createEdge( 1, 2 )
        ],
        name:   `input | input -> toUpperCase -> output`,
        output: [
            {
                action:  'textInput',
                id:      0,
                inputs:  [],
                outputs: [ 1 ],
                value:   'test'
            },
            { action: 'toUpperCase', id: 1, inputs: [ 0 ], outputs: [ 2 ] },
            { action: 'logOut', id: 2, inputs: [ 1 ], outputs: [] },
            {
                action:  'textInput',
                id:      3,
                inputs:  [],
                outputs: [],
                value:   ''
            }
        ]
    }
].map( ({ name, input, output }) => [ name, input, output ]);
