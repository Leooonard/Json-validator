// @flow

function wrapResult (condition, message) {
    if (condition) {
        return true;
    } else {
        return {
            message
        };
    }
}

function isSuccessResult (result) {
    return result === true;
}

function getResultMessage (result) {
    return result.message;
}

export {
    wrapResult,
    isSuccessResult,
    getResultMessage
};
