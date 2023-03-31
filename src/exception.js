const ErrorType = {
    BadRequest: 400,
    InternalError: 500
};

class Exception {
    constructor(errorType, errorText, isFatal) {
        this.errorType = errorType;
        this.errorText = errorText;
        this.isFatal = isFatal;
    }
}

module.exports = { ErrorType, Exception };