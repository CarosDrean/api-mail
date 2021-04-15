import {Request, Response} from "express";

import {Feedback, MFeedback} from "../../../model/feedback";
import {IUseCaseFeedback} from "../../../domain/feedback/feedback";
import {Error, MError} from "../../../model/error";

export class HandlerFeedback {
    private static useCase: IUseCaseFeedback

    constructor(useCase: IUseCaseFeedback) {
        HandlerFeedback.useCase = useCase;
    }

    sendMail(req: Request, res: Response) {
        let [item, error] = HandlerFeedback.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        if (!item.isValidFeedback()) {
            res.status(400).json('data is not complete')
            return
        }

        error = HandlerFeedback.useCase.sendMail()
        if (!Error.isVoidError(error)) {
            res.status(error.code).json(error)
            return
        }

        res.status(200).json('email sending successful')
    }

    private static getDataBody(item: MFeedback): [MFeedback, MError] {
        try {
            return [new Feedback(item.email, item.type, item.message, item.user), Error.voidError()]
        } catch (e) {
            return [item, new Error(400, e)]
        }
    }
}

