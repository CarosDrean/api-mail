import multer from 'multer'
import express from "express";
import {v4 as uuidV4} from 'uuid'
import path from 'path'

import {MConfiguration} from "../../model/configuration";

export class Multer {
    static config: MConfiguration

    constructor(config: MConfiguration) {
        Multer.config = config;
    }

    midUploadFile(): express.RequestHandler<any, any, any, any, Record<string, any>> {
        const storage = multer.diskStorage({
            destination: Multer.config.uploads,
            filename: (req, file, cb) => {
                cb(null, uuidV4() + path.extname(file.originalname).toLocaleLowerCase())
            }
        })

        return multer({
            storage: storage,
            dest: Multer.config.uploads
        }).single('file')
    }
}
