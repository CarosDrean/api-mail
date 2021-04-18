import atob from "atob"

import {External, MTokenObject, TokenObject} from "../model/tokenobject";
import {Error, MError} from "../model/error";

export class Token {
    static getTokenObjectURL(url: string): [MTokenObject, MError]{
        const arrUrl = url.split('/')

        const [tokenObject, error] = this.decodeToken(arrUrl[arrUrl.length - 1])
        if (!Error.isVoidError(error)) {
            return [tokenObject, error]
        }

        return [tokenObject, Error.voidError()]
    }

    static decodeToken(token: string): [MTokenObject, MError] {
        const tokenBody = token.split('.')[1]
        if (tokenBody == null) {
            const error: MError = {
                code: 400,
                error: 'invalid token',
                message: 'token is invalid',
                where: 'Token.decodeToken()'
            }
            return [TokenObject.tokenObjectVoid(), error]
        }

        const [tokenObject, error] = this.assemblyTokenObject(JSON.parse(atob(tokenBody)))
        if (!Error.isVoidError(error)) {
            return [tokenObject, error]
        }

        if (!tokenObject.isValidTokenObject()) {
            const err = new Error(400, 'invalid token object', 'the object token is invalid', 'Token.decodeToken()')
            return [tokenObject, err]
        }

        return [tokenObject, Error.voidError()]
    }

    static assemblyTokenObject(item: MTokenObject): [MTokenObject, MError] {
        try {
            const result = new External(item.result.data)
            return [new TokenObject(result), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e, '', 'Token.assemblyTokenObject()')]
        }
    }
}
