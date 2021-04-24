import {Request, Response} from "express";

import {MResponse} from "../../../model/response";
import {Error, MError} from "../../../model/error";
import {IUseCaseFile} from "../../../domain/file/file";
import {File, MFile} from "../../../model/file";

export class HandlerFile {
    private static useCase: IUseCaseFile

    constructor(useCase: IUseCaseFile) {
        HandlerFile.useCase = useCase;
    }

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

    async sendMail(req: Request, res: Response) {
        let [item, error] = HandlerFile.getDataBody(req.body)
        if (!Error.isVoidError(error)) {
            res.status(400).json(error)
            return
        }

        const [info, err] = await HandlerFile.useCase.sendNotify(item)
        if (!Error.isVoidError(err)) {
            res.status(err.code).json(err)
            return
        }

        const response: MResponse = {
            message: 'email sending successful',
            data: info
        }

        res.status(200).json(response)
    }

    private static getDataBody(item: MFile): [MFile, MError] {
        try {
            return [
                new File(item.description, item.email, item.filenameUpload, item.nameFileSendingNoFormat, item.formatFile),
                Error.voidError()
            ]
        } catch (e) {
            return [item, new Error(400, e, '', 'HandlerFile.getDataBody()')]
        }
    }
}
