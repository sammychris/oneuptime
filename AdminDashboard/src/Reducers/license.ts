import {
    FETCH_LICENSE_SUCCESS,
    FETCH_LICENSE_FAILED,
    FETCH_LICENSE_REQUEST,
    FETCH_LICENSE_RESET,
    CONFIRM_LICENSE_SUCCESS,
    CONFIRM_LICENSE_FAILED,
    CONFIRM_LICENSE_REQUEST,
    CONFIRM_LICENSE_RESET,
} from '../constants/license';

import Action from 'CommonUI/src/Types/Action';

const initialState: $TSFixMe = {
    license: {
        error: null,
        requesting: false,
        success: false,
        data: null,
    },
    confirmLicense: {
        error: null,
        requesting: false,
        success: false,
    },
};

export default (state: $TSFixMe = initialState, action: Action): void => {
    switch (action.type) {
        case FETCH_LICENSE_REQUEST:
            return Object.assign({}, state, {
                license: {
                    error: null,
                    requesting: true,
                    success: false,
                    data: null,
                },
            });

        case FETCH_LICENSE_SUCCESS: {
            const data: $TSFixMe = {};
            for (const config of action.payload.data) {
                const { name, value }: $TSFixMe = config;

                data[name] = value;
            }
            return Object.assign({}, state, {
                license: {
                    error: null,
                    requesting: false,
                    success: true,
                    data: {
                        license: data.licenseKey,

                        email: data.licenseEmail,

                        token: data.licenseToken,
                    },
                },
            });
        }

        case FETCH_LICENSE_FAILED:
            return Object.assign({}, state, {
                license: {
                    ...state.license,
                    error: action.payload,
                    requesting: false,
                    success: false,
                },
            });

        case FETCH_LICENSE_RESET:
            return Object.assign({}, state, {
                license: {
                    error: null,
                    requesting: false,
                    success: false,
                    data: null,
                },
            });

        case CONFIRM_LICENSE_REQUEST:
            return Object.assign({}, state, {
                confirmLicense: {
                    error: null,
                    requesting: true,
                    success: false,
                },
            });

        case CONFIRM_LICENSE_SUCCESS: {
            const data: $TSFixMe = {};
            for (const config of action.payload.data) {
                const { name, value }: $TSFixMe = config;

                data[name] = value;
            }
            return Object.assign({}, state, {
                license: {
                    error: null,
                    requesting: false,
                    success: true,
                    data: {
                        license: data.licenseKey,

                        email: data.licenseEmail,

                        token: data.licenseToken,
                    },
                },
                confirmLicense: {
                    error: null,
                    requesting: false,
                    success: true,
                },
            });
        }

        case CONFIRM_LICENSE_FAILED:
            return Object.assign({}, state, {
                confirmLicense: {
                    error: action.payload,
                    requesting: false,
                    success: false,
                },
            });

        case CONFIRM_LICENSE_RESET:
            return Object.assign({}, state, {
                confirmLicense: {
                    error: null,
                    requesting: false,
                    success: false,
                },
            });

        default:
            return state;
    }
};
