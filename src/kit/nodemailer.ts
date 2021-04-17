import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer"

import {MConfiguration} from "../model/configuration";

export class Nodemailer {
    static transporter(config: MConfiguration): Mail {
        return nodemailer.createTransport({
            service: config.nodemailer.service,
            auth: {
                type: config.nodemailer.auth.type,
                user: config.nodemailer.auth.user,
                clientId: config.nodemailer.auth.clientId,
                clientSecret: config.nodemailer.auth.clientSecret,
                refreshToken: config.nodemailer.auth.refreshToken,
                accessToken: config.nodemailer.auth.accessToken
            }
        })
    }
}

