import {INotifyURLCreateUser} from "../../../domain/urlcreateuser/urlcreateuser";

import {Nodemailer} from "../../../kit/nodemailer";
import {Token} from "../../../kit/token";
import {MConfiguration} from "../../../model/configuration";
import {MURLCreateUser} from "../../../model/urlcreateuser";
import {MTokenObject} from "../../../model/tokenobject";
import {Error, MError} from "../../../model/error";
import {URLUserTemplate} from "./templates/urlcreateuser";
import {FileSystem} from "../../../kit/filesystem";

export class EmailURLCreateUser implements INotifyURLCreateUser{
    static TITLE_MAIL = 'HoloSalud'

    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailURLCreateUser.config = config;
    }

    async sendNotify(item: MURLCreateUser): Promise<[any, MError]> {
        const [tokenObject, error] = Token.getTokenObjectURL(item.url)
        if (!Error.isVoidError(error)) {
            return [tokenObject, error]
        }

        item.typeUser = this.getTypeUserTokenObject(tokenObject)

        const [filename, path, err] = this.getFilenameAndPath(item.typeUser)
        if (!Error.isVoidError(err)) {
            return ['', err]
        }

        const mailConfig = EmailURLCreateUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailURLCreateUser.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `${EmailURLCreateUser.TITLE_MAIL} | Usuario Externo`,
            html: URLUserTemplate.template(item),
            attachments: [{
                filename: filename,
                path: path,
                contentType: 'application/pdf'
            }]
        }

        return [await Nodemailer.transporter(EmailURLCreateUser.config).sendMail(mailOptions), Error.voidError()]
    }

    getFilenameAndPath(typeUser: string): [string, string, MError] {
        const nameHandbookAdmin = 'Manual Administrador - HoloResults.pdf'
        const nameHandbookMedic = 'Manual Medico - HoloResults.pdf'

        const pathHandbookAdmin = './assets/MANUAL DE HOLORESULTS - ADMINISTRADOR.pdf'
        const pathHandbookMedic = './assets/MANUAL DE HOLORESULTS - MEDICO.pdf'

        const filename = typeUser === 'Admin'
            ? nameHandbookAdmin
            : nameHandbookMedic

        const path = typeUser === 'Admin'
            ? pathHandbookAdmin
            : pathHandbookMedic

        const existFile = FileSystem.exist(path)
        if (!existFile) {
            const error: MError = {
                code: 404,
                error: path + ': file not found',
                message: 'file not found',
                where: 'EmailURLCreateUser.sendNotify()'
            }

            return ['', '', error]
        }

        return [filename, path, Error.voidError()]
    }

    getTypeUserTokenObject(token: MTokenObject): 'Admin' | 'Medic' {
        const external = token.result;
        return external.data;
    }
}
