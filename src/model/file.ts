export interface MFile {
    email: string
    filenameUpload: string
    description: string
    nameFileSendingNoFormat: string
    formatFile: string

    isValidFile(): boolean
}

export class File implements MFile {
    description: string;
    email: string;
    filenameUpload: string;
    nameFileSendingNoFormat: string
    formatFile: string

    constructor(description: string, email: string, filenameUpload: string, nameFileSendingNoFormat: string, formatFile: string) {
        this.description = description;
        this.email = email;
        this.filenameUpload = filenameUpload;
        this.nameFileSendingNoFormat = nameFileSendingNoFormat
        this.formatFile = formatFile
    }

    isValidFile(): boolean {
        return this.isBusinessValid() &&
            this.isEmailValid() &&
            this.isFilenameValid() &&
            this.isNameFileSendingNoFormatValid() &&
            this.isFormatFileValid()
    }

    isBusinessValid(): boolean {
        return this.description != "" && this.description != null
    }

    isEmailValid(): boolean {
        return this.email != "" && this.email != null
    }

    isFilenameValid(): boolean {
        return this.filenameUpload != "" && this.filenameUpload != null
    }

    isNameFileSendingNoFormatValid(): boolean {
        return this.nameFileSendingNoFormat != "" && this.nameFileSendingNoFormat != null
    }

    isFormatFileValid(): boolean {
        return this.formatFile != "" && this.formatFile != null
    }
}
