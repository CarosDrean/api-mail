import http from 'http';
import cors from 'cors'
import express, {Request, Response, Router} from 'express';

import {Config} from "./config";
import {Routes} from "../../infraestructure/handler/router/init";
import {Signature} from "./signature";

function index(req: Request, res: Response) {
    res.json({
        message: 'welcome api mail!'
    })
}

function main() {
    const app = express()
    const server  = http.createServer(app)

    const config = Config.getConfiguration()
    const signatures = new Signature().getCertificates()
    const router = Router()

    app.use(express.json())
    app.use(cors({origin: ['*']}))

    new Routes(router, config, signatures)
    app.use(router)

    app.get('/', index)

    const port = process.env.PORT_HTTP || config.port

    server.listen(port, () => {
        console.log(`server online in: localhost:${port}`)
    })
}

main()
