import {INotifyFile} from "../../../domain/file/file";

import {MConfiguration} from "../../../model/configuration";
import {Nodemailer} from "../../../kit/nodemailer";
import {MFile} from "../../../model/file";
import {FileTemplate} from "./templates/file";
import {Error, MError} from "../../../model/error";
import {FileSystem} from "../../../kit/filesystem";

export class EmailFile implements INotifyFile{
    static TITLE_MAIL = 'Archivos'

    static config: MConfiguration

    constructor(config: MConfiguration) {
        EmailFile.config = config;
    }

    async sendNotify(item: MFile): Promise<[any, MError]> {
        const mailConfig = EmailFile.config.mail

        const [filename, path, err] = this.getFilenameAndPath(item, EmailFile.config)
        if (!Error.isVoidError(err)) {
            return ['', err]
        }

        const mailOptions = {
            from: `${mailConfig.name} | ${EmailFile.TITLE_MAIL} <${mailConfig.email}>`,
            to: `${item.email}`,
            subject: `${EmailFile.TITLE_MAIL} | ${item.nameFileSendingNoFormat}`,
            html: FileTemplate.template(item),
            attachments: [{
                filename: filename,
                path: path,
                contentType: `application/${item.formatFile}`
            }]
        }

        const info = await Nodemailer.transporter(EmailFile.config).sendMail(mailOptions)

        FileSystem.deleteFile(path)

        return [info, Error.voidError()]
    }

    getFilenameAndPath(item: MFile, config: MConfiguration): [string, string, MError] {
        const filename = `${item.nameFileSendingNoFormat}.${item.formatFile}`
        const path = `./${config.uploads}/${item.filenameUpload}`

        const existFile = FileSystem.exist(path)
        if (!existFile) {
            const error: MError = {
                code: 404,
                error: path + ': file not found',
                message: 'first upload the file you want to send',
                where: 'EmailFile.sendNotify()'
            }

            return ['', '', error]
        }

        return [filename, path, Error.voidError()]
    }
}
