export interface MMailWeb {
    business: string
    ruc: string
    phone: string
    email: string
    consult: string

    isValidMailWeb(): boolean
}

export class MailWeb implements MMailWeb {
    business: string;
    consult: string;
    email: string;
    phone: string;
    ruc: string;

    constructor(business: string, consult: string, email: string, phone: string, ruc: string) {
        this.business = business;
        this.consult = consult;
        this.email = email;
        this.phone = phone;
        this.ruc = ruc;
    }

    isValidMailWeb(): boolean {
        return this.isValidBusiness() &&
            this.isValidConsult() &&
            this.isValidEmail() &&
            this.isValidPhone() &&
            this.isValidRUC()
    }

    isValidBusiness(): boolean {
        return this.business != "" && this.business != null
    }

    isValidConsult(): boolean {
        return this.consult != "" && this.consult != null
    }

    isValidEmail(): boolean {
        return this.email != "" && this.email != null
    }

    isValidPhone(): boolean {
        return this.phone != "" && this.phone != null
    }

    isValidRUC(): boolean {
        return this.ruc != "" && this.ruc != null
    }

}

