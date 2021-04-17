import http from 'http';
import cors from 'cors'
import express, {Request, Response, Router} from 'express';

import {Config} from "./config";
import {Routes} from "../../infraestructure/handler/router/init";

function index(req: Request, res: Response) {
    res.json({
        message: 'welcome api mail!'
    })
}

function main() {
    const app = express()
    const server  = http.createServer(app)

    const config = Config.getConfiguration()
    const router = Router()

    app.use(express.json())
    app.use(cors({origin: ['*']}))

    new Routes(router, config)
    app.use(router)

    app.get('/', index)

    server.listen(config.port, () => {
        console.log(`server online in: localhost:${config.port}`)
    })
}

main()
