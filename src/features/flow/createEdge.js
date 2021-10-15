export function createEdge(source, target) {
    return {
        id: "e" + source?.id ?? source + "-" + target?.id ?? target,
        source: source?.id ?? source,
        target: target?.id ?? target
    };
}
