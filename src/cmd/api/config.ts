import fs from 'fs'

import {
    Auth,
    Configuration,
    Mail,
    MAuth,
    MConfiguration,
    MMail,
    MNodemailer,
    Nodemailer
} from "../../model/configuration";
import {Error, MError} from "../../model/error";

const path = './configuration.json'

export class Config {
    static getConfiguration(): MConfiguration {
        try {
            const rawData = fs.readFileSync(path);
            const [config, error] = Config.assemblyConfiguration(JSON.parse(rawData.toString()))

            if (!Error.isVoidError(error)) {
                console.log('Hubo un error al leer el json: ', error)
                process.exit()
            }

            return config
        } catch (e) {
            console.log('Hubo un error al leer el json: ', e)
            process.exit()
        }
    }

    private static assemblyConfiguration(mConfig: MConfiguration): [MConfiguration, MError] {
        const [mail, error] = Config.assemblyMail(mConfig.mail)
        if (!Error.isVoidError(error)) {
            return [mConfig, new Error(500, error.error, 'config is invalid', 'assemblyConfiguration')]
        }

        const [nodemailer, err] = Config.assemblyNodemailer(mConfig.nodemailer)
        if (!Error.isVoidError(err)) {
            return [mConfig, new Error(500, err.error, 'config is invalid', 'assemblyConfiguration')]
        }

        const config = new Configuration(mail, nodemailer, mConfig.port)
        if (!config.isValidConfiguration()) {
            return [config, new Error(500, 'invalid config', 'config is invalid', 'assemblyConfiguration')]
        }

        return [config, Error.voidError()]
    }

    private static assemblyNodemailer(mNodemailer: MNodemailer): [MNodemailer, MError] {
        const [auth, error] = Config.assemblyAuth(mNodemailer.auth)
        if (!Error.isVoidError(error)) {
            return [mNodemailer, new Error(500, error.error, 'field nodemailer is invalid', 'assemblyNodemailer')]
        }

        const nodemailer = new Nodemailer(auth, mNodemailer.service)
        if (!nodemailer.isValidNodemailer()) {
            return [mNodemailer, new Error(500, 'invalid nodemailer', 'field nodemailer is invalid', 'assemblyNodemailer')]
        }

        return [nodemailer, Error.voidError()]
    }

    private static assemblyAuth(mAuth: MAuth): [MAuth, MError] {
       const auth = new Auth(mAuth.accessToken, mAuth.clientId, mAuth.clientSecret, mAuth.refreshToken, mAuth.type, mAuth.user)
       if (!auth.isValidAuth()) {
           return [mAuth, new Error(500, 'invalid auth', 'field auth is invalid', 'assemblyAuth')]
       }

       return [auth, Error.voidError()]
    }

    private static assemblyMail(mMail: MMail): [MMail, MError] {
        const mail = new Mail(mMail.email, mMail.name)
        if (!mail.isValidMail()) {
            return [mMail, new Error(500, 'invalid mail', 'field mail is invalid', 'assemblyMail')]
        }

        return [mail, Error.voidError()]
    }
}
