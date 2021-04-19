import {MError} from "../../model/error";
import {MUser} from "../../model/user";

export interface IUseCaseUser {
    sendNotifyNewUser(user: MUser): Promise<[any, MError]>
    sendNotifyResetPassword(user: MUser): Promise<[any, MError]>
}

export interface INotifyEmailUser {
    sendNotifyNewUser(item: MUser): Promise<any>
    sendNotifyResetPassword(item: MUser): Promise<any>
}
