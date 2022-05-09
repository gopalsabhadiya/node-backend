export default class ValidationRegex {
    //Common
    public static get STRING_WITH_SPACE_REGEX(): RegExp {
        return /^[a-zA-Z ]*$/;
    }

    public static get NUMBER_REGEX(): RegExp {
        return /^[\d]*$/;
    }

    public static get CONTACT_NO_REGEX(): RegExp {
        return /^[\d]{10}$/;
    }

    public static get USER_NAME_REGEX(): RegExp {
        return /^[a-zA-Z._]+$/;
    }

    public static get UUIDV4_REGEX(): RegExp {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    }

    public static get EMAIL_REGEX(): RegExp {
        return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
}
