import Logger from './util/Logger';
import AppWideConfig from './AppWideConfig';
import db from './data/models';
import {environment, port} from "./config/Config";
import {container} from "tsyringe";
import * as http from "http";

db.sequelize.sync().then(() => {
    const appWideConfig: AppWideConfig = container.resolve(AppWideConfig);

    appWideConfig.getConfiguredApp().listen(port, () => {
        Logger.info(`server running on port : ${port}`);
        Logger.info("App Running for profile: " + environment);
    }).on('error', (e: any) => Logger.error(e));
});

