import {INotifyEmailMailWeb} from "../../../domain/mailweb/mailweb";
import {MConfiguration} from "../../../model/configuration";
import {Nodemailer} from "../../../kit/nodemailer";
import {MMailWeb} from "../../../model/mailweb";
import {MailWebTemplate} from "./templates/mailweb";

export class EmailMailWeb implements INotifyEmailMailWeb {
    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailMailWeb.config = config;
    }

    async sendNotify(item: MMailWeb): Promise<any> {
        const mailConfig = EmailMailWeb.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | Resultados <${mailConfig.email}>`,
            to: `${item.email}, saludocupacional@holosalud.pe`,
            subject: `Cotizacion | ${item.email}`,
            html: MailWebTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailMailWeb.config).sendMail(mailOptions)
    }
}
