import {INotifyMailWeb, IUseCaseMailWeb} from "./mailweb";
import {Error, MError} from "../../model/error";
import {MMailWeb} from "../../model/mailweb";

export class UseCaseMailWeb implements IUseCaseMailWeb {
    emailNotifier: INotifyMailWeb

    constructor(emailNotifier: INotifyMailWeb) {
        this.emailNotifier = emailNotifier
    }

    async sendNotify(mailWeb: MMailWeb): Promise<[any, MError]> {
        const error = UseCaseMailWeb.validateFields(mailWeb)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const info = await this.emailNotifier.sendNotify(mailWeb)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email',
                error: e,
                where: 'UseCaseMailWeb.sendNotify()'
            }

            return ['', error]
        }
    }

    private static validateFields(mailWeb: MMailWeb): MError {
        if (!mailWeb.isValidMailWeb()) {
            return {
                code: 400,
                message: 'validate fields',
                error: 'data is not complete',
                where: 'UseCaseMailWeb.validateFields()'
            }
        }

        return Error.voidError()
    }
}
