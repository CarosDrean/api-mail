import {MError} from "../../model/error";
import {MFile} from "../../model/file";

export interface IUseCaseFile {
    sendNotify(item: MFile): Promise<[any, MError]>
}

export interface INotifyFile {
    sendNotify(item: MFile): Promise<[any, MError]>
}
