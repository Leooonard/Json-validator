// @flow

/*
    result结构：
    {
        successful: bool,
        value: ?JSON,
        message: ?string
    }
*/

function wrapResult (successful, value, message) {
    if (successful) {
        return {
            successful,
            value,
            message: undefined
        };
    } else {
        return {
            successful,
            value: undefined,
            message
        };
    }
}

function isSuccessResult (result) {
    return result.successful;
}

function getResultMessage (result) {
    return result.message;
}

function getResultValue (result) {
    return result.value;
}

export {
    wrapResult,
    isSuccessResult,
    getResultMessage,
    getResultValue
};
