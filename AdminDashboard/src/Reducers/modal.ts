import { OPEN_MODAL, CLOSE_MODAL } from '../constants/Modal';

import Action from 'CommonUI/src/Types/Action';

const initialState: $TSFixMe = {
    modals: [],
    feedbackModalVisble: false,
};

export default (state: $TSFixMe = initialState, action: Action): void => {
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {
                modals: state.modals.concat(action.payload),
            });

        case CLOSE_MODAL:
            return Object.assign({}, state, {
                modals: state.modals.filter((item: $TSFixMe) => {
                    return item.id !== action.payload.id;
                }),
            });

        default:
            return state;
    }
};
