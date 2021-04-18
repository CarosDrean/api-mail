import {Request, Response} from "express";

import {IUseCaseURLCreateUser} from "../../../domain/urlcreateuser/urlcreateuser";

import {Error, MError} from "../../../model/error";
import {MURLCreateUser, URLCreateUser} from "../../../model/urlcreateuser";
import {MResponse} from "../../../model/response";

export class HandlerURLCreateUser {
    private static useCase: IUseCaseURLCreateUser

    constructor(useCase: IUseCaseURLCreateUser) {
        HandlerURLCreateUser.useCase = useCase;
    }

    async sendMail(req: Request, res: Response) {
        let [item, error] = HandlerURLCreateUser.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidURLCreateUser()) {
            res.status(400).json('data is not complete')
            return
        }

        const [info, err] = await HandlerURLCreateUser.useCase.sendNotify(item)
        if (!Error.isVoidError(err)) {
            err.error = err.error.toString()
            res.status(err.code).json(err)
            return
        }

        const response: MResponse = {
            message: 'email sending successful',
            data: info
        }

        res.status(200).json(response)
    }

    private static getDataBody(item: MURLCreateUser): [MURLCreateUser, MError] {
        try {
            return [new URLCreateUser(item.business, item.url, item.email), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e, '', 'HandlerURLCreateUser.getDataBody()')]
        }
    }
}
