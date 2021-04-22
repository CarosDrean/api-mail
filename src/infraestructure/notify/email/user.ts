import {INotifyEmailUser} from "../../../domain/user/user";
import {MConfiguration} from "../../../model/configuration";
import {MUser} from "../../../model/user";
import {ResetPasswordTemplate} from "./templates/resetpassword";
import {Nodemailer} from "../../../kit/nodemailer";
import {NewUserTemplate} from "./templates/newuser";

export class EmailUser implements INotifyEmailUser {
    static TITLE_MAIL = 'HoloSalud'

    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailUser.config = config;
    }

    async sendNotifyNewUser(item: MUser): Promise<any> {
        const subject = 'Nuevo Usuario'

        const mailConfig = EmailUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailUser.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `${EmailUser.TITLE_MAIL} | ${subject}`,
            html: NewUserTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailUser.config).sendMail(mailOptions)
    }

    async sendNotifyResetPassword(item: MUser): Promise<any> {
        const subject = 'Nueva Contraseña'

        const mailConfig = EmailUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailUser.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `${EmailUser.TITLE_MAIL} | ${subject}`,
            html: ResetPasswordTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailUser.config).sendMail(mailOptions)
    }
}
