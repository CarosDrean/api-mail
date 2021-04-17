import {INotifyEmailFeedback} from "../../../domain/feedback/feedback";
import {MFeedback} from "../../../model/feedback";
import {MConfiguration} from "../../../model/configuration";
import {FeedbackTemplate} from "./templates/feedback";
import {Nodemailer} from "../../../kit/nodemailer";

export class EmailFeedback implements INotifyEmailFeedback{
    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailFeedback.config = config;
    }

    async sendNotify(item: MFeedback): Promise<any> {
        const mailConfig = EmailFeedback.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | Feedback <${mailConfig.email}>`,
            to: `${item.email}, holosaludti@gmail.com`,
            subject: `Feedback | ${item.type}`,
            html: FeedbackTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailFeedback.config).sendMail(mailOptions)
    }

}
