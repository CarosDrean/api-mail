import fs from 'fs'

import {Configuration} from "../../model/configuration";

const path = './configuration.json'

export class Config {
    static getConfiguration(): Configuration {
        try {
            const rawData = fs.readFileSync(path);
            return JSON.parse(rawData.toString())
        } catch (e) {
            console.log('Hubo un error al leer el json: ', e)
            process.exit()
        }
    }
}
