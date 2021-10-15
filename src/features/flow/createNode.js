export function createNode(id, type, data) {
    return {
        id,
        type,
        data
    };
}

createNode.textInput = (id, value, data) =>
    createNode(id, "input", { ...data, value, action: "textInput" });
createNode.logOut = (id, data) =>
    createNode(id, "output", { ...data, action: "logOut" });
createNode.toUpperCase = (id, data) =>
    createNode(id, "string-func", { ...data, action: "toUpperCase" });
createNode.split = (id, data) =>
    createNode(id, "string-func", { ...data, action: "split" });
