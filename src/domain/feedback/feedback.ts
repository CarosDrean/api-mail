import {MError} from "../../model/error";
import {MFeedback} from "../../model/feedback";

export interface IUseCaseFeedback {
    sendNotify(feedback: MFeedback): Promise<any>
}

export interface INotifyEmail {
    sendNotify(item: MFeedback): Promise<any>
}
