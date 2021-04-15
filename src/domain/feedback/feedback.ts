import {MError} from "../../model/error";

export interface IUseCaseFeedback {
    sendMail(): MError
}
