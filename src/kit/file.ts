import fs from "fs";
import {Error, MError} from "../model/error";

export class File {
    static exist(path: string): boolean {
        const [_, error] = this.getFile(path)
        return Error.isVoidError(error)
    }

    static getFile(path: string): [Buffer, MError] {
        try {
            const file = fs.readFileSync(path)
            return [file, Error.voidError()]
        } catch (e) {
            return [Buffer.from(''), new Error(404, e, 'file not found', 'File.getFile()')]
        }
    }
}
