import {INotifyEmailURLCreateUser} from "../../../domain/urlcreateuser/urlcreateuser";

import {MConfiguration} from "../../../model/configuration";
import {Nodemailer} from "../../../kit/nodemailer";
import {MURLCreateUser} from "../../../model/urlcreateuser";
import {URLUserTemplate} from "./templates/urlcreateuser";
import {Token} from "../../../kit/token";
import {MTokenObject} from "../../../model/tokenobject";
import {Error, MError} from "../../../model/error";

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

        const filename = item.typeUser === 'Admin' ? 'Manual Administrador - HoloResults.pdf' : 'Manual Medico - HoloResults.pdf'

        // TODO: verificar si existe el archivo, podria ponerse el nombre y el path en el configuration.json
        const path = item.typeUser === 'Admin'
            ? './assets/MANUAL DE HOLORESULTS - ADMINISTRADOR.pdf'
            : './assets/MANUAL DE HOLORESULTS - MEDICO.pdf'

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

    getTypeUserTokenObject(token: MTokenObject): 'Admin' | 'Medic' {
        const external = token.result;
        return external.data;
    }
}
