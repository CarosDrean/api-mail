import multer from 'multer'
import path from 'path'
import {v4 as uuidV4} from 'uuid'

import express from "express";

import {MConfiguration} from "../../model/configuration";

export class Multer {
    static config: MConfiguration

    constructor(config: MConfiguration) {
        Multer.config = config;
    }

    midUploadFile(fieldName: string): express.RequestHandler<any, any, any, any, Record<string, any>> {
        const storage = multer.diskStorage({
            destination: Multer.config.uploads,
            filename: (req, file, cb) => {
                cb(null, uuidV4() + path.extname(file.originalname).toLocaleLowerCase())
            }
        })

        const cMulter = multer({
            storage: storage,
            dest: Multer.config.uploads
        })

        return cMulter.single(fieldName)
    }
}
