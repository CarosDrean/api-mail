import {Router} from "express";

import {Configuration} from "../../../model/configuration";
import {RouterFeedback} from "../feedback/router";

export class Routes {

    constructor(router: Router, config: Configuration) {
        new RouterFeedback(router, config)
    }
}
