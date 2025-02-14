import {
    REQUESTING_SETTINGS,
    REQUESTING_SETTINGS_SUCCEEDED,
    REQUESTING_SETTINGS_FAILED,
    TEST_SMTP_REQUEST,
    TEST_SMTP_SUCCESS,
    TEST_SMTP_FAILURE,
    TEST_TWILIO_REQUEST,
    TEST_TWILIO_SUCCESS,
    TEST_TWILIO_FAILURE,
} from '../constants/settings';

import Action from 'CommonUI/src/Types/Action';

const INITIAL_STATE: $TSFixMe = {
    requesting: false,
    testing: false,
    errored: false,
    smtp: {},
    twilio: {},
    sso: {},
    error: null,
    testSuccess: false,
};

export default function profileSettings(
    state: $TSFixMe = INITIAL_STATE,
    action: Action
): void {
    const settings: $TSFixMe = {};
    switch (action.type) {
        case REQUESTING_SETTINGS:
            return {
                ...state,
                requesting: true,
            };

        case REQUESTING_SETTINGS_SUCCEEDED:
            if (action.payloadType === 'smtp') {
                settings.smtp = action.payload;
            } else if (action.payloadType === 'twilio') {
                settings.twilio = action.payload;
            } else if (action.payloadType === 'sso') {
                settings.sso = action.payload;
            }
            return {
                ...state,
                ...settings,
                requesting: false,
                errored: false,
                error: null,
            };

        case REQUESTING_SETTINGS_FAILED:
            return {
                ...state,
                requesting: false,
                errored: true,
                error: action.payload,
            };

        case TEST_SMTP_REQUEST:
        case TEST_TWILIO_REQUEST:
            return {
                ...state,
                testing: true,
            };

        case TEST_SMTP_SUCCESS:
        case TEST_TWILIO_SUCCESS:
            return {
                ...state,
                errored: false,
                testing: false,
                error: null,
                testSuccess: true,
            };

        case TEST_SMTP_FAILURE:
        case TEST_TWILIO_FAILURE:
            return {
                ...state,
                errored: true,
                testing: false,
                error: action.payload,
                testSuccess: false,
            };

        default:
            return state;
    }
}
