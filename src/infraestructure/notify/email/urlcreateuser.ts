import {INotifyEmailURLCreateUser} from "../../../domain/urlcreateuser/urlcreateuser";

import {Nodemailer} from "../../../kit/nodemailer";
import {Token} from "../../../kit/token";
import {MConfiguration} from "../../../model/configuration";
import {MURLCreateUser} from "../../../model/urlcreateuser";
import {MTokenObject} from "../../../model/tokenobject";
import {Error, MError} from "../../../model/error";
import {URLUserTemplate} from "./templates/urlcreateuser";
import {File} from "../../../kit/file";

export class EmailURLCreateUser implements INotifyEmailURLCreateUser{
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
            return ['', error]
        }

        const mailConfig = EmailURLCreateUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | Usuario Externo <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `HoloSalud | Usuario Externo`,
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
        const filename = typeUser === 'Admin' ? 'Manual Administrador - HoloResults.pdf' : 'Manual Medico - HoloResults.pdf'

        const path = typeUser === 'Admin'
            ? './assets/MANUAL DE HOLORESULTS - ADMINISTRADOR.pdf'
            : './assets/MANUAL DE HOLORESULTS - MEDICO.pdf'

        const existFile = File.exist(path)
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
