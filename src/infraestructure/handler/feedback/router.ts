import {Router} from "express";
import {UseCaseFeedback} from "../../../domain/feedback/usecase";
import {HandlerFeedback} from "./handler";

export class RouterFeedback {
    PRIVATE_ROUTE_PREFIX = '/api/v1/feedback'

    constructor(app: Router) {
        const useCase = new UseCaseFeedback()
        const handler = new HandlerFeedback(useCase)
        this.privateRoutes(app, handler)
    }

    privateRoutes(app: Router, handler: HandlerFeedback): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', handler.sendMail)
    }
}
