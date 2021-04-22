import {Request, Response} from "express";

import {MResponse} from "../../../model/response";
import {MError} from "../../../model/error";

export class HandlerFile {
    uploadFile(req: Request, res: Response) {
        const file = req.file
        if (file == undefined) {
            const error: MError = {
                code: 400,
                error: 'file not found',
                message: '',
                where: 'HandlerUploadFile.uploadFile()',
            }

            res.status(error.code).json(error)
            return
        }

        const response: MResponse = {
            message: 'file uploaded successful',
            data: req.file.filename
        }

        res.status(200).json(response)
    }
}
