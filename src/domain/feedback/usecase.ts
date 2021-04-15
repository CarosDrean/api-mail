import {IUseCaseFeedback} from "./feedback";
import {Error, MError} from "../../model/error";

export class UseCaseFeedback implements IUseCaseFeedback{
    sendMail(): MError {
        console.log('email sending successful')
        const err = Error.voidError()
        // const err = new Error(500, 'no se', 'tampoco se')
        return err
    }

}
