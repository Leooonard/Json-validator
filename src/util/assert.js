// @flow

function assert (erroTip, assertExp) {
    if (!assertExp) {
        throw new Error(erroTip);
    }
}

export {
    assert
};
