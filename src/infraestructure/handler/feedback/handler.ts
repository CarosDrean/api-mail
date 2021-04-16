import {Request, Response} from "express";

import {Feedback, MFeedback} from "../../../model/feedback";
import {IUseCaseFeedback} from "../../../domain/feedback/feedback";
import {Error, MError} from "../../../model/error";
import {MResponse} from "../../../model/response";

export class HandlerFeedback {
    private static useCase: IUseCaseFeedback

    constructor(useCase: IUseCaseFeedback) {
        HandlerFeedback.useCase = useCase;
    }

    async sendMail(req: Request, res: Response) {
        let [item, error] = HandlerFeedback.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidFeedback()) {
            res.status(400).json('data is not complete')
            return
        }

        const [info, err] = await HandlerFeedback.useCase.sendNotify(item)
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

    private static getDataBody(item: MFeedback): [MFeedback, MError] {
        try {
            return [new Feedback(item.email, item.type, item.message, item.user), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e)]
        }
    }
}

