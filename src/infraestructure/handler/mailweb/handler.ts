import {Request, Response} from "express";

import {IUseCaseMailWeb} from "../../../domain/mailweb/mailweb";

import {Error, MError} from "../../../model/error";
import {MResponse} from "../../../model/response";
import {MailWeb, MMailWeb} from "../../../model/mailweb";

export class HandlerMailWeb {
    private static useCase: IUseCaseMailWeb

    constructor(useCase: IUseCaseMailWeb) {
        HandlerMailWeb.useCase = useCase;
    }

    async sendMail(req: Request, res: Response) {
        let [item, error] = HandlerMailWeb.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidMailWeb()) {
            res.status(400).json('data is not complete')
            return
        }

        const [info, err] = await HandlerMailWeb.useCase.sendNotify(item)
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

    private static getDataBody(item: MMailWeb): [MMailWeb, MError] {
        try {
            return [new MailWeb(item.business, item.consult, item.email, item.phone, item.ruc), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e, '', 'HandlerMailWeb.getDataBody()')]
        }
    }
}
