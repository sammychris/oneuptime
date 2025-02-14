import {
    OPEN_NOTIFICATION_MENU,
    CLOSE_NOTIFICATION_MENU,
    FETCH_NOTIFICATIONS_FAILED,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_RESET,
    NOTIFICATION_READ_SUCCESS,
} from '../constants/notification';

import Action from 'CommonUI/src/Types/Action';

const initialState: $TSFixMe = {
    notifications: {
        error: null,
        requesting: false,
        success: false,
        notifications: [],
    },
    notificationsVisible: false,
    notificationsPosition: 0,
};

export default (state: $TSFixMe = initialState, action: Action): void => {
    switch (action.type) {
        case OPEN_NOTIFICATION_MENU:
            return Object.assign({}, state, {
                notificationsVisible: true,
                notificationsPosition: action.payload,
            });

        case CLOSE_NOTIFICATION_MENU:
            return Object.assign({}, state, {
                notificationsVisible: false,
            });

        case FETCH_NOTIFICATIONS_FAILED:
            return Object.assign({}, state, {
                notifications: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                    notifications: [],
                },
            });

        case FETCH_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                notifications: {
                    requesting: false,
                    success: true,
                    error: null,
                    notifications: action.payload.data,
                },
            });

        case FETCH_NOTIFICATIONS_REQUEST:
            return Object.assign({}, state, {
                notifications: {
                    requesting: true,
                    error: null,
                    success: false,
                    notifications: [],
                },
            });

        case FETCH_NOTIFICATIONS_RESET:
            return Object.assign({}, state, {
                notifications: {
                    error: null,
                    requesting: false,
                    success: false,
                    notifications: [],
                },
                notificationsVisible: false,
            });

        case 'ADD_NOTIFICATION_BY_SOCKET': {
            const notify: $TSFixMe = state.notifications.notifications;

            notify.unshift(action.payload);
            return Object.assign({}, state, {
                notifications: {
                    error: null,
                    requesting: false,
                    success: true,
                    notifications: notify,
                },
            });
        }

        case NOTIFICATION_READ_SUCCESS:
            return Object.assign({}, state, {
                notifications: {
                    ...state.notifications,
                    notifications: state.notifications.notifications.map(
                        (notification: $TSFixMe) => {
                            if (
                                notification._id ===
                                action.payload.notificationId._id
                            ) {
                                return {
                                    ...notification,
                                    read: notification.read.concat([
                                        action.payload.userId,
                                    ]),
                                };
                            }
                            return notification;
                        }
                    ),
                },
            });

        default:
            return state;
    }
};
