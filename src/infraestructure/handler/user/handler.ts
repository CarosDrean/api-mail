import {Request, Response} from "express";

import {IUseCaseUser} from "../../../domain/user/user";

import {Error, MError} from "../../../model/error";
import {MUser, User} from "../../../model/user";
import {MResponse} from "../../../model/response";

export class HandlerUser {
    private static useCase: IUseCaseUser

    constructor(useCase: IUseCaseUser) {
        HandlerUser.useCase = useCase;
    }

    async sendMailNewUser(req: Request, res: Response) {
        let [item, error] = HandlerUser.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidUser()) {
            res.status(400).json('data is not complete')
            return
        }

        const [info, err] = await HandlerUser.useCase.sendNotifyNewUser(item)
        if (!Error.isVoidError(err)) {
            res.status(err.code).json(err)
            return
        }

        const response: MResponse = {
            message: 'email sending successful',
            data: info
        }

        res.status(200).json(response)
    }

    async sendMailResetPassword(req: Request, res: Response) {
        let [item, error] = HandlerUser.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidUser()) {
            res.status(400).json('data is not complete')
            return
        }

        const [info, err] = await HandlerUser.useCase.sendNotifyResetPassword(item)
        if (!Error.isVoidError(err)) {
            res.status(err.code).json(err)
            return
        }

        const response: MResponse = {
            message: 'email sending successful',
            data: info
        }

        res.status(200).json(response)
    }

    private static getDataBody(item: MUser): [MUser, MError] {
        try {
            return [new User(item.email, item.password, item.user), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e)]
        }
    }
}
