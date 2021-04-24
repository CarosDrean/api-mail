import {Router} from "express";

import {MConfiguration} from "../../../model/configuration";
import {HandlerFile} from "./handler";
import {Multer} from "../../middleware/multer";
import {EmailFile} from "../../notify/email/file";
import {UseCaseFile} from "../../../domain/file/usecase";

export class RouterFile {
    PRIVATE_ROUTE_PREFIX = '/api/v1/file'
    FIELD_NAME_FILE = 'file'

    constructor(app: Router, config: MConfiguration) {
        const notifyEmail = new EmailFile(config)
        const useCase = new UseCaseFile(notifyEmail)
        const handler = new HandlerFile(useCase)
        const multer = new Multer(config)

        this.privateRoutes(app, handler, multer)
    }

    privateRoutes(app: Router, handler: HandlerFile, multer: Multer): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/upload', multer.midUploadFile(this.FIELD_NAME_FILE), handler.uploadFile)
        app.post(this.PRIVATE_ROUTE_PREFIX + '/send-mail', handler.sendMail)
    }
}
