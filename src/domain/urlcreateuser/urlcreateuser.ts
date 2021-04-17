import {MError} from "../../model/error";
import {MURLCreateUser} from "../../model/urlcreateuser";

export interface IUseCaseURLCreateUser {
    sendNotify(mailWeb: MURLCreateUser): Promise<[any, MError]>
}

export interface INotifyEmailURLCreateUser {
    sendNotify(item: MURLCreateUser): Promise<[any, MError]>
}
