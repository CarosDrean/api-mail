import {Router} from "express";

import {MConfiguration} from "../../../model/configuration";
import {HandlerFile} from "./handler";
import {Multer} from "../../middleware/multer";

export class RouterFile {
    PRIVATE_ROUTE_PREFIX = '/api/v1/file'

    constructor(app: Router, config: MConfiguration) {
        const handler = new HandlerFile()
        const multer = new Multer(config)

        this.privateRoutes(app, handler, multer)
    }

    privateRoutes(app: Router, handler: HandlerFile, multer: Multer): void {
        app.post(this.PRIVATE_ROUTE_PREFIX + '/upload', multer.midUploadFile, handler.uploadFile)
    }
}
