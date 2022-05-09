import FirebaseConfig from "../../config/FirebaseConfig";

export default class PushNotificationService {
    private firebaseConfig: FirebaseConfig;

    constructor(firebaseConfig: FirebaseConfig) {
        this.firebaseConfig = firebaseConfig;
    }

    private async sendPushNotification(registrationToken: string, message: string): Promise<boolean> {
        let response = await this.firebaseConfig.firebaseAdmin.message(registrationToken, message, this.firebaseConfig.config);
        return true;
    }
}