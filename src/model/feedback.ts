export interface MFeedback {
    email: string
    type: string
    message: string
    user: string

    isValidFeedback(): boolean
}

export class Feedback implements MFeedback{
    email: string
    type: string
    message: string
    user: string

    constructor(email: string, type: string, message: string, user: string) {
        this.email = email;
        this.type = type;
        this.message = message;
        this.user = user;
    }

    isValidFeedback(): boolean {
        return this.isEmailValid() && this.isTypeValid() && this.isMessageValid() && this.isUserValid()
    }

    isEmailValid(): boolean {
        return this.email != "" && this.email != null
    }

    isTypeValid(): boolean {
        return this.type != "" && this.type != null
    }

    isMessageValid(): boolean {
        return this.message != "" && this.message != null
    }

    isUserValid(): boolean {
        return this.user != "" && this.user != null
    }
}
