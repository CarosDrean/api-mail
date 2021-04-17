import {Router} from "express";

import {MConfiguration} from "../../../model/configuration";
import {RouterFeedback} from "../feedback/router";
import {RouterMailWeb} from "../mailweb/router";

export class Routes {

    constructor(router: Router, config: MConfiguration) {
        new RouterFeedback(router, config)
        new RouterMailWeb(router, config)
    }
}
