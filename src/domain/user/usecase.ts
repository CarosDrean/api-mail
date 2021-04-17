import {INotifyEmailUser, IUseCaseUser} from "./user";
import {MUser} from "../../model/user";
import {Error, MError} from "../../model/error";

export class UseCaseUser implements IUseCaseUser {
    static emailNotifier: INotifyEmailUser

    constructor(emailNotifier: INotifyEmailUser) {
        UseCaseUser.emailNotifier = emailNotifier
    }

    async sendNotifyNewUser(user: MUser): Promise<[any, MError]> {
        try {
            const info = await UseCaseUser.emailNotifier.sendNotifyNewUser(user)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email new user',
                error: e
            }

            return ['', error]
        }
    }

    async sendNotifyResetPassword(user: MUser): Promise<[any, MError]> {
        try {
            const info = await UseCaseUser.emailNotifier.sendNotifyResetPassword(user)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email reset password',
                error: e
            }

            return ['', error]
        }
    }
}
