import {INotifyMailWeb} from "../../../domain/mailweb/mailweb";
import {MConfiguration} from "../../../model/configuration";
import {Nodemailer} from "../../../kit/nodemailer";
import {MMailWeb} from "../../../model/mailweb";
import {MailWebTemplate} from "./templates/mailweb";

export class EmailMailWeb implements INotifyMailWeb {
    static TITLE_MAIL = 'Cotizacion'

    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailMailWeb.config = config;
    }

    async sendNotify(item: MMailWeb): Promise<any> {
        const auxMail = 'saludocupacional@holosalud.pe'

        const mailConfig = EmailMailWeb.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailMailWeb.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}, ${auxMail}`,
            subject: `${EmailMailWeb.TITLE_MAIL} | ${item.email}`,
            html: MailWebTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailMailWeb.config).sendMail(mailOptions)
    }
}
