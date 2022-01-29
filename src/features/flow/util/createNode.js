export function createNode( id, type, data ) {
    return {
        data,
        id,
        type
    };
}

createNode.textInput = ( id, value, data ) =>
    createNode( id, 'input', { ...data, action: 'textInput', value });
createNode.logOut = ( id, data ) =>
    createNode( id, 'output', { ...data, action: 'logOut' });
createNode.toUpperCase = ( id, data ) =>
    createNode( id, 'string-func', { ...data, action: 'toUpperCase' });
createNode.split = ( id, data ) =>
    createNode( id, 'string-func', { ...data, action: 'split' });
