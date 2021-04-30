import {Router} from "express";

import {MConfiguration} from "../../../model/configuration";
import {RouterFeedback} from "../feedback/router";
import {RouterMailWeb} from "../mailweb/router";
import {RouterUser} from "../user/router";
import {RouterURLCreateUser} from "../urlcreateuser/router";
import {RouterFile} from "../file/router";
import {MSignatures} from "../../../model/signatures";
import {Authentication} from "../../middleware/authentication";

export class Routes {

    constructor(router: Router, config: MConfiguration, signatures: MSignatures) {
        const auth = new Authentication(signatures)

        new RouterFeedback(router, config, auth)
        new RouterMailWeb(router, config, auth)
        new RouterUser(router, config, auth)
        new RouterURLCreateUser(router, config, auth)
        new RouterFile(router, config, auth)
    }
}
