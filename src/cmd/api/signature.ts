import fs from "fs";

import {MSignatures, Signatures} from "../../model/signatures";

export class Signature {
    pathPrivateKey = './certificates/private.rsa'
    pathPublicKey = './certificates/public.rsa.pub'

    getCertificates(): MSignatures {
        try {
            const rawDataPrivateKey = fs.readFileSync(this.pathPrivateKey);
            const rawDataPublicKey = fs.readFileSync(this.pathPublicKey);
            return new Signatures(rawDataPrivateKey.toString(), rawDataPublicKey.toString())
        } catch (e) {
            console.log('Hubo un error al leer los certificados: ', e)
            process.exit()
        }
    }
}
