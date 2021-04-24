import {MError} from "../../model/error";
import {MMailWeb} from "../../model/mailweb";

export interface IUseCaseMailWeb {
    sendNotify(mailWeb: MMailWeb): Promise<[any, MError]>
}

export interface INotifyMailWeb {
    sendNotify(item: MMailWeb): Promise<any>
}
