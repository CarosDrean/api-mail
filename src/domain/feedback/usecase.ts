import {INotifyFeedback, IUseCaseFeedback} from "./feedback";
import {Error, MError} from "../../model/error";
import {MFeedback} from "../../model/feedback";

export class UseCaseFeedback implements IUseCaseFeedback{
    emailNotifier: INotifyFeedback

    constructor(emailNotifier: INotifyFeedback) {
        this.emailNotifier = emailNotifier
    }

    async sendNotify(feedback: MFeedback): Promise<[any, MError]> {
        const error = UseCaseFeedback.validateFields(feedback)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const info = await this.emailNotifier.sendNotify(feedback)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email',
                error: e,
                where: 'UseCaseFeedback.sendNotify()'
            }

            return ['', error]
        }
    }

    private static validateFields(feedback: MFeedback): MError {
        if (!feedback.isValidFeedback()) {
            return {
                code: 400,
                message: 'validate fields',
                error: 'data is not complete',
                where: 'UseCaseFeedback.validateFields()'
            }
        }

        return Error.voidError()
    }

}
