import {Router} from "express";

import {UseCaseFeedback} from "../../../domain/feedback/usecase";
import {HandlerFeedback} from "./handler";
import {MConfiguration} from "../../../model/configuration";
import {EmailFeedback} from "../../notify/email/feedback";

export class RouterFeedback {
    PRIVATE_ROUTE_PREFIX = '/api/v1/feedback'

    constructor(app: Router, config: MConfiguration) {
        const notifyEmail = new EmailFeedback(config)
        const useCase = new UseCaseFeedback(notifyEmail)
        const handler = new HandlerFeedback(useCase)

        this.privateRoutes(app, handler)
    }

    privateRoutes(app: Router, handler: HandlerFeedback): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', handler.sendMail)
    }
}
