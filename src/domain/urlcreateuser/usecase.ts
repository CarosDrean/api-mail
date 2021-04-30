import {INotifyURLCreateUser, IUseCaseURLCreateUser} from "./urlcreateuser";
import {Error, MError} from "../../model/error";
import {MURLCreateUser} from "../../model/urlcreateuser";

export class UseCaseURLCreateUser implements IUseCaseURLCreateUser {
    emailNotifier: INotifyURLCreateUser

    constructor(emailNotifier: INotifyURLCreateUser) {
        this.emailNotifier = emailNotifier
    }

    async sendNotify(urlCreateUser: MURLCreateUser): Promise<[any, MError]> {
        const error = UseCaseURLCreateUser.validateFields(urlCreateUser)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const [info, error] = await this.emailNotifier.sendNotify(urlCreateUser)
            if (!Error.isVoidError(error)) {
                return ['', error]
            }

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending email',
                error: e,
                where: 'UseCaseURLCreateUser.sendNotify()'
            }

            return ['', error]
        }
    }

    private static validateFields(urlCreateUser: MURLCreateUser): MError {
        if (!urlCreateUser.isValidURLCreateUser()) {
            return {
                code: 400,
                message: 'validate fields',
                error: 'data is not complete',
                where: 'UseCaseURLCreateUser.validateFields()'
            }
        }

        return Error.voidError()
    }
}
