import {
    PAGE_LOAD_REQUEST,
    PAGE_LOAD_SUCCESS,
    PAGE_LOAD_RESET,
} from '../constants/page';

import Action from 'CommonUI/src/Types/Action';

const initialState: $TSFixMe = {
    requesting: false,
    title: '',
    sidenavopen: false,
};

export default (state: $TSFixMe = initialState, action: Action): void => {
    switch (action.type) {
        case PAGE_LOAD_REQUEST:
            return Object.assign({}, state, {
                requesting: true,
                title: action.payload,
            });

        case PAGE_LOAD_SUCCESS:
            return Object.assign({}, state, {
                requesting: false,
                title: action.payload,
            });

        case PAGE_LOAD_RESET:
            return Object.assign({}, state, {
                requesting: false,
                title: '',
            });

        case 'OPEN_SIDENAV':
            return Object.assign({}, state, {
                sidenavopen: true,
            });

        case 'CLOSE_SIDENAV':
            return Object.assign({}, state, {
                sidenavopen: false,
            });

        default:
            return state;
    }
};
