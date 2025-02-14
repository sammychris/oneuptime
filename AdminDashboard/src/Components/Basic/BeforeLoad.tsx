import React from 'react';
import PropTypes from 'prop-types';
import { User, getQueryVar } from '../../config';

class BeforeLoad extends Component<ComponentProps> {
    isAuthenticated: $TSFixMe;
    redirect: $TSFixMe;
    constructor(props: $TSFixMe) {
        super(props);
        const isAuthenticated: $TSFixMe = User.isLoggedIn();
        const initialUrl: $TSFixMe = sessionStorage.getItem('initialUrl');
        this.isAuthenticated = isAuthenticated;
        const redirectTo: $TSFixMe = getQueryVar('redirectTo', initialUrl);
        const counter: $TSFixMe = getQueryVar('counter', initialUrl) || 0;
        if (redirectTo) this.redirect = redirectTo;
        if (isAuthenticated) {
            if (redirectTo) {
                sessionStorage.removeItem('initialUrl');
                const accessToken: $TSFixMe = User.getAccessToken();

                window.location.href = `${redirectTo}?accessToken=${accessToken}&counter=${parseInt(

                    counter,
                    10
                ) + 1}`;
            }
        }
    }
    override render() {
        if (this.isAuthenticated && this.redirect) {
            return (
                <div
                    id="app-loading"
                    style={{
                        position: 'fixed',
                        top: '0',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        backgroundColor: '#fdfdfd',
                        zIndex: '999',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div>Redirecting please wait...</div>
                </div>
            );
        }
        return this.props.children;
    }
}


BeforeLoad.displayName = 'BeforeLoad';


BeforeLoad.contextTypes = {};


BeforeLoad.propTypes = {
    children: PropTypes.any,
};

export default BeforeLoad;
