export interface MConfiguration {
    port: number
    uploads: string
    mail: MMail
    nodemailer: MNodemailer

    isValidConfiguration(): boolean
}

export class Configuration implements MConfiguration {
    mail: MMail;
    nodemailer: MNodemailer;
    port: number;
    uploads: string

    constructor(mail: MMail, nodemailer: MNodemailer, port: number, uploads: string) {
        this.mail = mail;
        this.nodemailer = nodemailer;
        this.port = port;
        this.uploads = uploads
    }

    isValidConfiguration(): boolean {
        return this.isPortValid() && this.isValidUploads() && this.isValidMail() && this.isValidNodemailer()
    }

    isPortValid(): boolean {
        return this.port != 0 && this.port != null
    }

    isValidUploads(): boolean {
        return this.uploads != '' && this.uploads != null
    }

    isValidMail(): boolean {
        return this.mail.isValidMail()
    }

    isValidNodemailer(): boolean {
        return this.nodemailer.isValidNodemailer()
    }

}

export interface MMail {
    name: string
    email: string

    isValidMail(): boolean
}

export class Mail implements MMail {
    email: string;
    name: string;

    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }

    isValidMail(): boolean {
        return this.isValidEmail() && this.isValidName()
    }

    isValidEmail(): boolean {
        return this.email != '' && this.email != null
    }

    isValidName(): boolean {
        return this.name != '' && this.name != null
    }

}

export interface MNodemailer {
    service: string
    auth: MAuth

    isValidNodemailer(): boolean
}

export class Nodemailer implements MNodemailer {
    auth: MAuth;
    service: string;

    constructor(auth: MAuth, service: string) {
        this.auth = auth;
        this.service = service;
    }

    isValidNodemailer(): boolean {
        return this.isValidService() && this.isValidAuth()
    }

    isValidService(): boolean {
        return this.service != '' && this.service != null
    }

    isValidAuth(): boolean {
        return this.auth.isValidAuth()
    }

}

export interface MAuth {
    type: 'OAUTH2' | 'OAuth2' | 'oauth2'
    user: string
    clientId: string
    clientSecret: string
    refreshToken: string
    accessToken: string

    isValidAuth(): boolean
}

export class Auth implements MAuth {
    accessToken: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    type: "OAUTH2" | "OAuth2" | "oauth2";
    user: string;

    constructor(accessToken: string, clientId: string, clientSecret: string, refreshToken: string, type: "OAUTH2" | "OAuth2" | "oauth2", user: string) {
        this.accessToken = accessToken;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
        this.type = type;
        this.user = user;
    }

    isValidAuth(): boolean {
        return this.isValidAccessToken() &&
            this.isValidClientId() &&
            this.isValidClientSecret() &&
            this.isValidRefreshToken() &&
            this.isValidType() &&
            this.isValidUser()
    }

    isValidAccessToken(): boolean {
        return this.accessToken != '' && this.accessToken != null
    }

    isValidClientId(): boolean {
        return this.clientId != '' && this.clientId != null
    }

    isValidClientSecret(): boolean {
        return this.clientSecret != '' && this.clientSecret != null
    }

    isValidRefreshToken(): boolean {
        return this.refreshToken != '' && this.refreshToken != null
    }

    isValidType(): boolean {
        return (this.type == "OAUTH2" || this.type == "OAuth2" || this.type == "oauth2") && this.type != null
    }

    isValidUser(): boolean {
        return this.user != '' && this.user != null
    }

}
