import { isNode, getOutgoers, getIncomers } from "react-flow-renderer";

const convertNodeToModule = (
    { data: { action, value }, id },
    inputs,
    outputs
) => {
    const res = {
        action,
        id,
        inputs,
        outputs
    };
    if (value !== undefined) res.value = value;
    return res;
};

export function createWorkflow(elements) {
    return elements.filter(isNode).map((el) =>
        convertNodeToModule(
            el,
            getIncomers(el, elements).map((n) => n.id),
            getOutgoers(el, elements).map((n) => n.id)
        )
    );
}
