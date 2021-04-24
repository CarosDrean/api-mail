import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'

import {MError} from "../../model/error";
import {MSignatures} from "../../model/signatures";

export class Authentication {
    static signatures: MSignatures

    constructor(signatures: MSignatures) {
        Authentication.signatures = signatures;
    }

    validatePermission(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            const error: MError = {
                code: 403,
                error: 'not found authorization',
                message: '',
                where: ''
            }
            return res.status(403).send(error);
        }

        let token = req.headers.authorization
        token = token.replace('Bearer ', '')

        const publicKey = Authentication.signatures.publicKey

        try {
            jwt.verify(token, publicKey) // de aqui se puede obtener los datos del token
            next()
        } catch (e) {
            const error: MError = {
                code: 401,
                error: e,
                message: 'you don\'t have authorization',
                where: ''
            }
            return res.status(error.code).json(error)
        }
    }
}
