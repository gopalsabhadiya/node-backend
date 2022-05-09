import {autoInjectable} from "tsyringe";
import {FIREBASE_NOTIFICATION_CONFIG} from "./Config";

@autoInjectable()
export default class FirebaseConfig {
    private _firebaseAdmin: any;
    private _config: any;

    constructor() {
        this._firebaseAdmin = require("firebase-admin");
        let serviceAccount = require("./chatlook-firebase-adminsdk.json");
        this._firebaseAdmin.initializeApp({
            credential: this._firebaseAdmin.credential.cert(serviceAccount),
        });
        this._config = {
            priority: FIREBASE_NOTIFICATION_CONFIG.priority,
            timeToLive: parseInt(FIREBASE_NOTIFICATION_CONFIG.timeToLive),
        }
    }

    get firebaseAdmin(): any {
        return this._firebaseAdmin;
    }


    get config(): any {
        return this._config;
    }
}