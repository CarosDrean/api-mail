import {INotifyEmail, IUseCaseFeedback} from "./feedback";
import {Error, MError} from "../../model/error";
import {MFeedback} from "../../model/feedback";

export class UseCaseFeedback implements IUseCaseFeedback{
    static emailNotifier: INotifyEmail

    constructor(emailNotifier: INotifyEmail) {
        UseCaseFeedback.emailNotifier = emailNotifier
    }

    async sendNotify(feedback: MFeedback): Promise<[any, MError]> {
        try {
            const info = await UseCaseFeedback.emailNotifier.sendNotify(feedback)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email',
                error: e
            }

            return ['', error]
        }
    }

}
