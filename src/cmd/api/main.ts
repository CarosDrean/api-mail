import http from 'http';
import cors from 'cors'
import express, {Request, Response} from 'express';

import {Config} from "./config";

function index(req: Request, res: Response) {
    res.json({
        message: 'welcome api mail!'
    })
}

function main() {
    const app = express()
    const server  = http.createServer(app)

    const config = Config.getConfiguration()

    app.use(express.json())
    app.use(cors({origin: ['*']}))

    app.get('/', index)

    server.listen(config.port, () => {
        console.log(`server online in: localhost:${config.port}`)
    })
}

main()
