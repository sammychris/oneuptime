import BackendAPI from 'CommonUI/src/utils/api/backend';
import { Dispatch } from 'redux';
import * as types from '../constants/emailLogs';
import Route from 'Common/Types/api/route';
import PositiveNumber from 'Common/Types/PositiveNumber';

// Fetch All Email Logs
export const fetchEmailLogsRequest: Function = (): void => {
    return {
        type: types.FETCH_EMAILLOGS_REQUEST,
    };
};

export const fetchEmailLogsSuccess: Function = (emailLogs: $TSFixMe): void => {
    return {
        type: types.FETCH_EMAILLOGS_SUCCESS,
        payload: emailLogs,
    };
};

export const fetchEmailLogsError: Function = (error: $TSFixMe): void => {
    return {
        type: types.FETCH_EMAILLOGS_FAILURE,
        payload: error,
    };
};

export const fetchEmailLogs: $TSFixMe = (
    skip: PositiveNumber,
    limit: PositiveNumber
) => {
    return async (dispatch: Dispatch) => {
        skip = skip ? parseInt(skip) : 0;
        limit = limit ? parseInt(limit) : 10;

        dispatch(fetchEmailLogsRequest());

        try {
            const response: $TSFixMe = await BackendAPI.get(
                `email-logs?skip=${skip}&limit=${limit}`
            );

            const data: $TSFixMe = response.data;

            dispatch(fetchEmailLogsSuccess(data));

            return response;
        } catch (error) {
            let errorMsg: $TSFixMe;
            if (error && error.response && error.response.data) {
                errorMsg = error.response.data;
            }
            if (error && error.data) {
                errorMsg = error.data;
            }
            if (error && error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Network Error';
            }
            dispatch(fetchEmailLogsError(errorMsg));
        }
    };
};

// Search Email Logs.
export const searchEmailLogsRequest: Function = (): void => {
    return {
        type: types.SEARCH_EMAILLOGS_REQUEST,
    };
};

export const searchEmailLogsSuccess: Function = (emailLogs: $TSFixMe): void => {
    return {
        type: types.SEARCH_EMAILLOGS_SUCCESS,
        payload: emailLogs,
    };
};

export const searchEmailLogsError: Function = (error: $TSFixMe): void => {
    return {
        type: types.SEARCH_EMAILLOGS_FAILURE,
        payload: error,
    };
};

export const searchEmailLogs: $TSFixMe = (
    filter: $TSFixMe,
    skip: PositiveNumber,
    limit: PositiveNumber
) => {
    return async (dispatch: Dispatch) => {
        const values: $TSFixMe = {
            filter,
        };

        dispatch(searchEmailLogsRequest());

        try {
            const response: $TSFixMe = await BackendAPI.post(
                `email-logs/search?skip=${skip}&limit=${limit}`,
                values
            );

            const data: $TSFixMe = response.data;

            dispatch(searchEmailLogsSuccess(data));
            return response;
        } catch (error) {
            let errorMsg: $TSFixMe;
            if (error && error.response && error.response.data) {
                errorMsg = error.response.data;
            }
            if (error && error.data) {
                errorMsg = error.data;
            }
            if (error && error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Network Error';
            }
            dispatch(searchEmailLogsError(errorMsg));
        }
    };
};

// Delete All Email Logs
export const deleteEmailLogsRequest: Function = (): void => {
    return {
        type: types.DELETE_ALL_EMAILLOGS_REQUEST,
    };
};

export const deleteEmailLogsSuccess: Function = (message: $TSFixMe): void => {
    return {
        type: types.DELETE_ALL_EMAILLOGS_SUCCESS,
        payload: message,
    };
};

export const deleteEmailLogsError: Function = (error: $TSFixMe): void => {
    return {
        type: types.DELETE_ALL_EMAILLOGS_FAILURE,
        payload: error,
    };
};

export const deleteEmailLogs: $TSFixMe = () => {
    return async (dispatch: Dispatch): void => {
        dispatch(deleteEmailLogsRequest());

        try {
            const response: $TSFixMe = delete `email-logs`;

            const message: $TSFixMe = response.data.message;

            dispatch(deleteEmailLogsSuccess(message));
        } catch (error) {
            let errorMsg: $TSFixMe;
            if (error && error.response && error.response.data) {
                errorMsg = error.response.data;
            }
            if (error && error.data) {
                errorMsg = error.data;
            }
            if (error && error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Network Error';
            }
            dispatch(deleteEmailLogsError(errorMsg));
        }
    };
};

// Fetch emailLogStatus

export const fetchEmailLogStatusRequest: Function = (
    promise: $TSFixMe
): void => {
    return {
        type: types.FETCH_EMAILLOG_STATUS_REQUEST,
        payload: promise,
    };
};

export const fetchEmailLogStatusError: Function = (error: $TSFixMe): void => {
    return {
        type: types.FETCH_EMAILLOG_STATUS_FAILED,
        payload: error,
    };
};

export const fetchEmailLogStatusSuccess: Function = (
    emailLogStatus: $TSFixMe
): void => {
    return {
        type: types.FETCH_EMAILLOG_STATUS_SUCCESS,
        payload: emailLogStatus,
    };
};

export const resetFetchEmailLogStatus: Function = (): void => {
    return {
        type: types.FETCH_EMAILLOG_STATUS_RESET,
    };
};

// Calls the API to fetch emailLogStatus
export const fetchEmailLogStatus: $TSFixMe = () => {
    return async (dispatch: Dispatch): void => {
        dispatch(fetchEmailLogStatusRequest());

        try {
            const response: $TSFixMe = await BackendAPI.get(
                'globalConfig/emailLogMonitoringStatus'
            );

            dispatch(fetchEmailLogStatusSuccess(response.data));
            return response;
        } catch (error) {
            let errorMsg: $TSFixMe;
            if (error && error.response && error.response.data) {
                errorMsg = error.response.data;
            }
            if (error && error.data) {
                errorMsg = error.data;
            }
            if (error && error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Network Error';
            }
            dispatch(fetchEmailLogStatusError(errorMsg));
            return 'error';
        }
    };
};

// Change emailLogStatus

export const changeEmailLogStatusRequest: Function = (
    promise: $TSFixMe
): void => {
    return {
        type: types.CHANGE_EMAILLOG_STATUS_REQUEST,
        payload: promise,
    };
};

export const changeEmailLogStatusError: Function = (error: $TSFixMe): void => {
    return {
        type: types.CHANGE_EMAILLOG_STATUS_FAILED,
        payload: error,
    };
};

export const changeEmailLogStatusSuccess: Function = (
    emailLogStatus: $TSFixMe
): void => {
    return {
        type: types.CHANGE_EMAILLOG_STATUS_SUCCESS,
        payload: emailLogStatus,
    };
};

export const resetConfirmEmailLogStatus: Function = (): void => {
    return {
        type: types.CHANGE_EMAILLOG_STATUS_RESET,
    };
};

// Calls the API to change emailLogStatus
export const emailLogStatusChange: $TSFixMe = (values: $TSFixMe) => {
    return async (dispatch: Dispatch) => {
        dispatch(changeEmailLogStatusRequest());

        try {
            const response: $TSFixMe = await BackendAPI.post(
                new Route('globalConfig/'),
                [{ name: 'emailLogMonitoringStatus', value: values.status }]
            );

            const data: $TSFixMe = response.data;
            dispatch(changeEmailLogStatusSuccess(data));
            return data;
        } catch (error) {
            let errorMsg: $TSFixMe;
            if (error && error.response && error.response.data) {
                errorMsg = error.response.data;
            }
            if (error && error.data) {
                errorMsg = error.data;
            }
            if (error && error.message) {
                errorMsg = error.message;
            } else {
                errorMsg = 'Network Error';
            }
            dispatch(changeEmailLogStatusError(errorMsg));
            return 'error';
        }
    };
};
