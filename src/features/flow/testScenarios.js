import { createNode } from "./util/createNode";
import { createEdge } from "./util/createEdge";

let pipe = (...args) => args.reduce((acc, v) => v(acc));

export const testScenarios = [
    {
        name: "input -> output",
        input: [
            createNode.textInput(0, "test"),
            createNode.logOut(1),
            createEdge(0, 1)
        ],
        output: [
            {
                id: 0,
                action: "textInput",
                value: "test",
                inputs: [],
                outputs: [1]
            },
            { id: 1, action: "logOut", inputs: [0], outputs: [] }
        ],
        functionalExample: pipe("test", console.log)
    },
    {
        name: "input -> toUpperCase -> output",
        input: [
            createNode.textInput(0, "test"),
            createNode.toUpperCase(1),
            createNode.logOut(2),
            createEdge(0, 1),
            createEdge(1, 2)
        ],
        output: [
            {
                id: 0,
                action: "textInput",
                value: "test",
                inputs: [],
                outputs: [1]
            },
            { id: 1, action: "toUpperCase", inputs: [0], outputs: [2] },
            { id: 2, action: "logOut", inputs: [1], outputs: [] }
        ],
        functionalExample: pipe("test", (s) => s.toUpperCase(), console.log)
    },
    {
        name: `input -> toUpperCase -> ( input -> split ) -> output`,
        input: [
            createNode.textInput(0, "test"),
            createNode.textInput(1, ""),
            createNode.toUpperCase(2),
            createNode.split(3),
            createNode.logOut(4),
            createEdge(0, 2),
            createEdge(1, 3),
            createEdge(2, 3),
            createEdge(3, 4)
        ],
        output: [
            {
                id: 0,
                action: "textInput",
                value: "test",
                inputs: [],
                outputs: [2]
            },
            {
                id: 1,
                action: "textInput",
                value: "",
                inputs: [],
                outputs: [3]
            },
            { id: 2, action: "toUpperCase", inputs: [0], outputs: [3] },
            { id: 3, action: "split", inputs: [1, 2], outputs: [4] },
            { id: 4, action: "logOut", inputs: [3], outputs: [] }
        ],
        functionalExample: pipe(
            "test",
            (s) => s.toUpperCase(),
            (s) => s.split(""),
            console.log
        )
    },
    {
        name: `input | input -> toUpperCase -> output`,
        input: [
            createNode.textInput(0, "test"),
            createNode.toUpperCase(1),
            createNode.logOut(2),
            createNode.textInput(3, ""),
            createEdge(0, 1),
            createEdge(1, 2)
        ],
        output: [
            {
                id: 0,
                action: "textInput",
                value: "test",
                inputs: [],
                outputs: [1]
            },
            { id: 1, action: "toUpperCase", inputs: [0], outputs: [2] },
            { id: 2, action: "logOut", inputs: [1], outputs: [] },
            {
                id: 3,
                action: "textInput",
                value: "",
                inputs: [],
                outputs: []
            }
        ]
    }
].map(({ name, input, output }) => [name, input, output]);
