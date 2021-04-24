import {INotifyFeedback} from "../../../domain/feedback/feedback";
import {Feedback, MFeedback} from "../../../model/feedback";
import {MConfiguration} from "../../../model/configuration";
import {FeedbackTemplate} from "./templates/feedback";
import {Nodemailer} from "../../../kit/nodemailer";

export class EmailFeedback implements INotifyFeedback{
    static TITLE_MAIL = 'Feedback'

    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailFeedback.config = config;
    }

    async sendNotify(item: MFeedback): Promise<any> {
        const auxMail = 'holosaludti@gmail.com'

        const mailConfig = EmailFeedback.config.mail

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailFeedback.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}, ${auxMail}`,
            subject: `${EmailFeedback.TITLE_MAIL} | ${item.type}`,
            html: FeedbackTemplate.template(item)
        }

        return await Nodemailer.transporter(EmailFeedback.config).sendMail(mailOptions)
    }

}
