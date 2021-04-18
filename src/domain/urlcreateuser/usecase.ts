import {INotifyEmailURLCreateUser, IUseCaseURLCreateUser} from "./urlcreateuser";
import {Error, MError} from "../../model/error";
import {MURLCreateUser} from "../../model/urlcreateuser";

export class UseCaseURLCreateUser implements IUseCaseURLCreateUser {
    static emailNotifier: INotifyEmailURLCreateUser

    constructor(emailNotifier: INotifyEmailURLCreateUser) {
        UseCaseURLCreateUser.emailNotifier = emailNotifier
    }

    async sendNotify(urlCreateUser: MURLCreateUser): Promise<[any, MError]> {
        try {
            const [info, error] = await UseCaseURLCreateUser.emailNotifier.sendNotify(urlCreateUser)
            if (!Error.isVoidError(error)) {
                return ['', error]
            }

            return [info, Error.voidError()]
        } catch (e) {
            console.log(e)
            const error: MError = {
                code: 500,
                message: 'sending email',
                error: e,
                where: 'UseCaseURLCreateUser.sendNotify()'
            }

            return ['', error]
        }
    }
}
