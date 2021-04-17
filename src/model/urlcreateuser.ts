export interface MURLCreateUser {
    email: string
    business: string
    url: string

    // variable auxiliar, es asignada en tiempo de ejecucion en base al token
    typeUser?: 'Admin' | 'Medic'

    isValidURLCreateUser(): boolean
}

export class URLCreateUser implements MURLCreateUser{
    business: string;
    url: string;
    email: string;

    constructor(business: string, url: string, email: string) {
        this.business = business;
        this.url = url;
        this.email = email;
    }

    isValidURLCreateUser(): boolean {
        return this.isValidBusiness() && this.isValidData() && this.isValidEmail()
    }

    isValidBusiness(): boolean {
        return this.business != "" && this.business != null
    }

    isValidData(): boolean {
        return this.url != "" && this.url != null
    }

    isValidEmail(): boolean {
        return this.email != "" && this.email != null
    }

}
