import {INotifyEmailUser, IUseCaseUser} from "./user";
import {MUser} from "../../model/user";
import {Error, MError} from "../../model/error";

export class UseCaseUser implements IUseCaseUser {
    static emailNotifier: INotifyEmailUser

    constructor(emailNotifier: INotifyEmailUser) {
        UseCaseUser.emailNotifier = emailNotifier
    }

    async sendNotifyNewUser(user: MUser): Promise<[any, MError]> {
        const error = UseCaseUser.validateFields(user)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const info = await UseCaseUser.emailNotifier.sendNotifyNewUser(user)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email new user',
                error: e,
                where: 'UseCaseUser.sendNotifyNewUser()'
            }

            return ['', error]
        }
    }

    async sendNotifyResetPassword(user: MUser): Promise<[any, MError]> {
        const error = UseCaseUser.validateFields(user)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const info = await UseCaseUser.emailNotifier.sendNotifyResetPassword(user)

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email reset password',
                error: e,
                where: 'UseCaseUser.sendNotifyResetPassword()'
            }

            return ['', error]
        }
    }

    private static validateFields(user: MUser): MError {
        if (!user.isValidUser()) {
            return {
                code: 400,
                message: 'validate fields',
                error: 'data is not complete',
                where: 'UseCaseUser.validateFields()'
            }
        }

        return Error.voidError()
    }
}
