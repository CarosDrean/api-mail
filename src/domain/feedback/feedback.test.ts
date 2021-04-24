import {UseCaseFeedback} from "./usecase";
import {INotifyFeedback} from "./feedback";
import {Feedback, MFeedback} from "../../model/feedback";
import {Error} from "../../model/error";

class FakeNotifierOk implements INotifyFeedback {
    sendNotify(item: MFeedback): Promise<any> {
        return Promise.resolve('Ok');
    }
}

class FakeNotifierError implements INotifyFeedback {
    sendNotify(item: MFeedback): Promise<any> {
        return Promise.reject(undefined);
    }
}

describe('useCase feedback', () => {
    const notifierOk = new FakeNotifierOk()
    const useCaseOk = new UseCaseFeedback(notifierOk)

    const notifierError = new FakeNotifierError()
    const useCaseError = new UseCaseFeedback(notifierError)

    const feedback = new Feedback('josueht15@gmail.com', 'Queja', 'hey', 'drean')
    const feedbackIncomplete = new Feedback('josueht15@gmail.com', '', 'hey', 'drean')

    test('send notify successful', async () => {
        const [info, err] = await useCaseOk.sendNotify(feedback)
        expect(Error.isVoidError(err)).toBe(true)
        expect(info).toBe('Ok')
    })

    test('send notify fail', async () => {
        const [info, error] = await useCaseError.sendNotify(feedback)
        expect(Error.isVoidError(error)).toBe(false)
        expect(info).toBe("")
    })

    test('send notify incomplete model', async () => {
        const [info, error] = await useCaseOk.sendNotify(feedbackIncomplete)
        expect(Error.isVoidError(error)).toBe(false)
        expect(info).toBe("")
    })
})


