export interface MUser {
    email: string
    user: string
    password: string

    isValidUser(): boolean
}

export class User implements MUser {
    email: string;
    password: string;
    user: string;

    constructor(email: string, password: string, user: string) {
        this.email = email;
        this.password = password;
        this.user = user;
    }

    isValidUser(): boolean {
        return this.isValidEmail() && this.isValidPassword() && this.isValidFUser()
    }

    isValidEmail(): boolean {
        return this.email != "" && this.email != null
    }

    isValidPassword(): boolean {
        return this.password != "" && this.password != null
    }

    isValidFUser(): boolean {
        return this.user != "" && this.user != null
    }

}
