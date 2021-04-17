import {Router} from "express";

import {UseCaseUser} from "../../../domain/user/usecase";

import {MConfiguration} from "../../../model/configuration";
import {EmailUser} from "../../notify/email/user";
import {HandlerUser} from "./handler";

export class RouterUser {
    PRIVATE_ROUTE_PREFIX = '/api/v1/user'

    constructor(app: Router, config: MConfiguration) {
        const notifyEmail = new EmailUser(config)
        const useCase = new UseCaseUser(notifyEmail)
        const handler = new HandlerUser(useCase)

        this.privateRoutes(app, handler)
    }

    privateRoutes(app: Router, handler: HandlerUser): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/new', handler.sendMailNewUser)
        app.post(this.PRIVATE_ROUTE_PREFIX + '/reset-password', handler.sendMailResetPassword)
    }
}
