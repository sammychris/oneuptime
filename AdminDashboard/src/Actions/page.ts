import * as types from '../constants/page';
import { Dispatch } from 'redux';
export const pageLoadRequest: $TSFixMe = function (title: $TSFixMe): void {
    return {
        type: types.PAGE_LOAD_REQUEST,
        payload: title,
    };
};
export const pageLoadSuccess: $TSFixMe = function (title: $TSFixMe): void {
    return {
        type: types.PAGE_LOAD_SUCCESS,
        payload: title,
    };
};
export const resetPageLoad: $TSFixMe = function (): void {
    return {
        type: types.PAGE_LOAD_RESET,
    };
};

export const loadPage: $TSFixMe = function (title: $TSFixMe): void {
    return function (dispatch: Dispatch): void {
        dispatch(pageLoadRequest(title));
        dispatch(pageLoadSuccess(title));
        dispatch(closeSideNav());
    };
};

export const openSideNav: Function = (): void => {
    return {
        type: 'OPEN_SIDENAV',
    };
};

export const closeSideNav: Function = (): void => {
    return {
        type: 'CLOSE_SIDENAV',
    };
};
