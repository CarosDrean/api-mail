import {MError} from "../../model/error";
import {MFeedback} from "../../model/feedback";

export interface IUseCaseFeedback {
    sendNotify(feedback: MFeedback): Promise<[any, MError]>
}

export interface INotifyEmailFeedback {
    sendNotify(item: MFeedback): Promise<any>
}
