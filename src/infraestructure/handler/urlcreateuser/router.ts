import {Router} from "express";

import {UseCaseURLCreateUser} from "../../../domain/urlcreateuser/usecase";

import {MConfiguration} from "../../../model/configuration";
import {EmailURLCreateUser} from "../../notify/email/urlcreateuser";
import {HandlerURLCreateUser} from "./handler";
import {Authentication} from "../../middleware/authentication";

export class RouterURLCreateUser {
    PRIVATE_ROUTE_PREFIX = '/api/v1/url-create-user'

    constructor(app: Router, config: MConfiguration, auth: Authentication) {
        const notifyEmail = new EmailURLCreateUser(config)
        const useCase = new UseCaseURLCreateUser(notifyEmail)
        const handler = new HandlerURLCreateUser(useCase)

        this.privateRoutes(app, handler, auth)
    }

    privateRoutes(app: Router, handler: HandlerURLCreateUser, auth: Authentication): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', auth.validatePermission, handler.sendMail)
    }
}
