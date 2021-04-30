import {Feedback, MFeedback} from "../../model/feedback";
import {Error} from "../../model/error";
import {INotifyFile} from "./file";
import {File, MFile} from "../../model/file";
import {UseCaseFile} from "./usecase";

class FakeNotifierOk implements INotifyFile {
    sendNotify(item: MFile): Promise<any> {
        return Promise.resolve(['Ok', Error.voidError()]);
    }
}

class FakeNotifierError implements INotifyFile {
    sendNotify(item: MFile): Promise<any> {
        return Promise.reject([undefined, Error.voidError()]);
    }
}

describe('useCase file', () => {
    const notifierOk = new FakeNotifierOk()
    const useCaseOk = new UseCaseFile(notifierOk)

    const notifierError = new FakeNotifierError()
    const useCaseError = new UseCaseFile(notifierError)

    const file = new File('description', 'josueht15@gmail.com', 'image', 'image', 'jpg')
    const fileIncomplete = new File('', '', 'hey', 'drean', '')

    test('send notify file successful', async () => {
        const [info, err] = await useCaseOk.sendNotify(file)
        expect(Error.isVoidError(err)).toBe(true)
        expect(info).toBe('Ok')
    })

    test('send notify file fail', async () => {
        const [info, error] = await useCaseError.sendNotify(file)
        expect(Error.isVoidError(error)).toBe(false)
        expect(info).toBe("")
    })

    test('send notify file incomplete model', async () => {
        const [info, error] = await useCaseOk.sendNotify(fileIncomplete)
        expect(Error.isVoidError(error)).toBe(false)
        expect(info).toBe("")
    })
})
