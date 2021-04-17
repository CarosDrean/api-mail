export interface MError {
    code: number
    error: string
    message: string
}

export class Error implements MError {
    code: number;
    error: string;
    message: string

    constructor(code: number, error: string, message: string = '') {
        this.code = code;
        this.error = error;
        this.message = message
    }

    static voidError(): MError {
        return {code: 0, error: '', message: ''}
    }

    static isVoidError(error: MError): boolean {
        const voidError = Error.voidError()
        return error.code == voidError.code && error.error == voidError.error && error.message == voidError.message
    }
}
