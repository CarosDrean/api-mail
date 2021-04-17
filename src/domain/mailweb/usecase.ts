import {INotifyEmailMailWeb, IUseCaseMailWeb} from "./mailweb";
import {Error, MError} from "../../model/error";
import {MMailWeb} from "../../model/mailweb";

export class UseCaseMailWeb implements IUseCaseMailWeb {
    static emailNotifier: INotifyEmailMailWeb

    constructor(emailNotifier: INotifyEmailMailWeb) {
        UseCaseMailWeb.emailNotifier = emailNotifier
    }

    async sendNotify(mailWeb: MMailWeb): Promise<[any, MError]> {
        try {
            const info = await UseCaseMailWeb.emailNotifier.sendNotify(mailWeb)

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
