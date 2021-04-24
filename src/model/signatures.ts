export interface MSignatures {
    privateKey: string
    publicKey: string
}

export class Signatures implements MSignatures{
    privateKey: string;
    publicKey: string;

    constructor(privateKey: string, publicKey: string) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
}
