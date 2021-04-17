import {INotifyEmailUser} from "../../../domain/user/user";
import {MConfiguration} from "../../../model/configuration";
import {MUser} from "../../../model/user";
import {ResetPasswordTemplate} from "./templates/resetpassword";
import {Nodemailer} from "../../../kit/nodemailer";
import {NewUserTemplate} from "./templates/newuser";

export class EmailUser implements INotifyEmailUser {
    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailUser.config = config;
    }

    async sendNotifyNewUser(item: MUser): Promise<any> {
        const mailConfig = EmailUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | Resultados <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `HoloSalud | Nuevo Usuario`,
            html: NewUserTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailUser.config).sendMail(mailOptions)
    }

    async sendNotifyResetPassword(item: MUser): Promise<any> {
        const mailConfig = EmailUser.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | Resultados <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `HoloSalud | Nueva Contraseña`,
            html: ResetPasswordTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailUser.config).sendMail(mailOptions)
    }
}
