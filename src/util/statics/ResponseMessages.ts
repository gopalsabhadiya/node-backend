export default class ResponseMessages {
    public static get TEST_SERVER_SUCCESS():string {return "Your server is running fine"}
    public static get SEND_OTP_SUCCESS():string {return "OTP sent successfully"}
    public static get VERIFY_OTP_SUCCESS():string {return "OTP verification successfully"}

    public static get AUTH_TOKEN_MANDATORY():string {return "auth-token is required"}

    public static get REGISTER_USER_SUCCESS():string {return "User registered successfully"}

    public static get REGISTER_PERSONAL_PROFILE_SUCCESS():string {return "User Personal profile registered successfully"}
    public static get PERSONAL_PROFILE_NOT_REGISTERED():string {return "Personal Profile not registered. Please, register personal profile first"}
    public static get UPDATE_PERSONAL_PROFILE_SUCCESS():string {return "User Personal profile registered successfully"}
    public static get PERSONAL_PROFILE_DELETED():string {return "User Personal profile deleted successfully"}
    public static get FETCH_PERSONAL_PROFILE_SUCCESS():string {return "User profile fetch success"}

    public static get REGISTER_BUSINESS_PROFILE_SUCCESS():string {return "User Business profile registered successfully"}
    public static get UPDATE_BUSINESS_PROFILE_SUCCESS():string {return "User Business profile updated successfully"}
    public static get BUSINESS_PROFILE_NOT_REGISTERED():string{return "Business Profile not registered. Please, register business profile first"}
    public static get UPDATE_BUSINESS_NOT_FOUND():string {return "Please, create business profile before updating it."}
    public static get BUSINESS_ALREADY_REGISTERED():string {return "Business is already registered."}

    public static get INCORRECT_OTP():string {return "Invalid OTP"}
    public static get BAD_REQUEST_ERROR():string {return "Bad request, try again with proper parameters"}
    public static get USER_WITH_ID_NOT_FOUND():string{return "User is not registered with ID: "}
    public static get ONE_OR_MORE_USER_IN_LIST_ABSENT():string{return "One or more user in the Users list are not registered"}
    public static get USER_PERSONAL_PROFILE_ALREADY_REGISTERED():string{return "User profile already registered"}

    public static get CREATE_PRODUCT_SUCCESS(): string{return "Product created successfully"}
    public static get UPDATE_PRODUCT_SUCCESS(): string{return "Product updated successfully"}
    public static get DELETE_PRODUCT_SUCCESS(): string{return "Product deleted successfully"}
    public static get FETCH_ALL_PRODUCT_SUCCESS(): string{return "All products fetched successfully"}
    public static get FETCH_SINGLE_PRODUCT_SUCCESS(): string{return "Single product fetched successfully"}
    public static get PRODUCTS_NOT_REGISTERED(): string{return "Products not registered. Please, register proucts first"}
    public static get PRODUCTS_NOT_FOUND(): string{return "Product not found with id: "}

    public static get PAYMENT_CARD_NOT_ADDED(): string{return "Payment cards are not added. Please, add payment cards first"}
    public static get PAYMENT_CARD_NOT_FOUND(): string{return "Payment cards not found"}
    public static get PAYMENT_DELETE_SUCCESS(): string{return "Payment card deleted successfully"}


    public static get TNC_NOT_ADDED(): string{return "Terms and condition not added"}
    public static get SUBSCRIPTION_PLAN_NOT_ADDED(): string{return "Subscription plan not added"}

    public static get NOTIFICATION_CREATE_SUCCESS(): string{return "Notification created successfully"}
    public static get NOTIFICATION_SEND_SUCCESS(): string{return "Notification sent successfully"}
    public static get NOTIFICATION_UPDATE_SUCCESS(): string{return "Notification updated successfully"}
    public static get NOTIFICATION_DELETE_SUCCESS(): string{return "Notification deleted successfully"}
    public static get NOTIFICATION_FETCH_ALL_SUCCESS(): string{return "All notification fetched successfully"}
    public static get NOTIFICATION_FETCH_SINGLE_SUCCESS(): string{return "Single notification fetched successfully"}
    public static get NOTIFICATION_FETCH_USERS_SUCCESS(): string{return "Notification users fetched successfully"}
    public static get MARKETING_NOTIFICATION_NOT_FOUND(): string{return "Notification not found with id: "}
    public static  get MARKETING_NOTIFICATION_NOT_REGISTERED(): string{return "Marketing notification not registered"};

    public static get EMAIL_CREATE_SUCCESS(): string{return "Email created successfully"}
    public static get EMAIL_SEND_SUCCESS(): string{return "Email sent successfully"}
    public static get EMAIL_UPDATE_SUCCESS(): string{return "Email updated successfully"}
    public static get EMAIL_DELETE_SUCCESS(): string{return "Email deleted successfully"}
    public static get EMAIL_FETCH_ALL_SUCCESS(): string{return "All Email fetched successfully"}
    public static get EMAIL_FETCH_SINGLE_SUCCESS(): string{return "Single Email fetched successfully"}
    public static get EMAIL_FETCH_USERS_SUCCESS(): string{return "Email users fetched successfully"}
    public static get EMAIL_NOT_FOUND(): string{return "Email not found with id: "}
    public static get EMAIL_NOT_REGISTERED(): string{return "Email not registered. Please, register Email first"}
    public static get MARKETING_EMAIL_NOT_FOUND(): string{return "Email not found with ID: "}
    public static  get MARKETING_EMAIL_NOT_REGISTERED(): string{return "Marketing Email not registered"};

    public static get SMS_CREATE_SUCCESS(): string{return "SMS created successfully"}
    public static get SMS_SEND_SUCCESS(): string{return "SMS sent successfully"}
    public static get SMS_UPDATE_SUCCESS(): string{return "SMS updated successfully"}
    public static get SMS_DELETE_SUCCESS(): string{return "SMS deleted successfully"}
    public static get SMS_FETCH_ALL_SUCCESS(): string{return "All SMS fetched successfully"}
    public static get SMS_FETCH_SINGLE_SUCCESS(): string{return "Single SMS fetched successfully"}
    public static get SMS_FETCH_USERS_SUCCESS(): string{return "SMS users fetched successfully"}
    public static get SMS_NOT_FOUND(): string{return "SMS not found with id: "}
    public static get SMS_NOT_REGISTERED(): string{return "SMS not registered. Please, register SMS first"}
    public static get MARKETING_SMS_NOT_FOUND(): string{return "SMS not found with ID: "}
    public static  get MARKETING_SMS_NOT_REGISTERED(): string{return "Marketing SMS not registered"};

    public static get FRIEND_REQUEST_CREATE_SUCCESS(): string{return "Friend request created successfully"}
    public static get FRIEND_REQUEST_UPDATE_SUCCESS(): string{return "Friend request updated successfully"}
    public static get FRIEND_REQUEST_FETCH_SUCCESS(): string{return "Friend request fetched successfully"}
    public static get FRIEND_REQUEST_DELETE_SUCCESS(): string{return "Friend request deleted successfully"}
    public static get FRIEND_REQUEST_NOT_FOUND(): string{return "Friend request not found with ID: "}

    public static get STORY_CREATE_SUCCESS():string {return "User story created successfully"}
    public static get STORY_COUNT_INCREASE_SUCCESS():string {return "User story count increased successfully"}
    public static get STORY_DELETE_SUCCESS():string {return "User story deleted successfully"}
    public static get STORY_WITH_ID_NOT_FOUND(): string {return "No Story found with id: "}
}
