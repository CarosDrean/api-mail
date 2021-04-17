import {Router} from "express";

import {UseCaseMailWeb} from "../../../domain/mailweb/usecase";

import {MConfiguration} from "../../../model/configuration";
import {EmailMailWeb} from "../../notify/email/mailweb";
import {HandlerMailWeb} from "./handler";

export class RouterMailWeb {
    PRIVATE_ROUTE_PREFIX = '/api/v1/mail-web'

    constructor(app: Router, config: MConfiguration) {
        const notifyEmail = new EmailMailWeb(config)
        const useCase = new UseCaseMailWeb(notifyEmail)
        const handler = new HandlerMailWeb(useCase)

        this.privateRoutes(app, handler)
    }

    privateRoutes(app: Router, handler: HandlerMailWeb): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', handler.sendMail)
    }
}
