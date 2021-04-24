import {Router} from "express";

import {UseCaseFeedback} from "../../../domain/feedback/usecase";

import {HandlerFeedback} from "./handler";
import {MConfiguration} from "../../../model/configuration";
import {EmailFeedback} from "../../notify/email/feedback";
import {Authentication} from "../../middleware/authentication";

export class RouterFeedback {
    PRIVATE_ROUTE_PREFIX = '/api/v1/feedback'

    constructor(app: Router, config: MConfiguration, auth: Authentication) {
        const notifyEmail = new EmailFeedback(config)
        const useCase = new UseCaseFeedback(notifyEmail)
        const handler = new HandlerFeedback(useCase)

        this.privateRoutes(app, handler, auth)
    }

    privateRoutes(app: Router, handler: HandlerFeedback, auth: Authentication): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', auth.validatePermission, handler.sendMail)
    }
}
