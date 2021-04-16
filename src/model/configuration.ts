export interface Configuration {
    port: number
    mail: mail
    nodemailer: nodemailer
}

interface mail {
    name: string
    email: string
}

interface nodemailer {
    service: string
    auth: auth
}

interface auth {
    type: 'OAUTH2' | 'OAuth2' | 'oauth2'
    user: string
    clientId: string
    clientSecret: string
    refreshToken: string
    accessToken: string
}
