import {INotifyFile, IUseCaseFile} from "./file";
import {Error, MError} from "../../model/error";
import {MFile} from "../../model/file";

export class UseCaseFile implements IUseCaseFile {
    static notifier: INotifyFile

    constructor(notifier: INotifyFile) {
        UseCaseFile.notifier = notifier
    }

    async sendNotify(item: MFile): Promise<[any, MError]> {
        const error = UseCaseFile.validateFields(item)
        if (!Error.isVoidError(error)) {
            return ['', error]
        }

        try {
            const [info, err] = await UseCaseFile.notifier.sendNotify(item)
            if (!Error.isVoidError(err)) {
                return ['', err]
            }

            return [info, Error.voidError()]
        } catch (e) {
            const error: MError = {
                code: 500,
                message: 'sending notify',
                error: e,
                where: 'UseCaseFeedback.sendNotify()'
            }

            return ['', error]
        }
    }

    private static validateFields(item: MFile): MError {
        if (!item.isValidFile()) {
            return {
                code: 400,
                message: 'validate fields',
                error: 'data is not complete',
                where: 'UseCaseFile.validateFields()'
            }
        }

        return Error.voidError()
    }
}
