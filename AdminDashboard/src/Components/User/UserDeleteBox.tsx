import React, { Component } from 'react';

import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { FormLoader } from '../basic/Loader';
import ShouldRender from '../basic/ShouldRender';
import { deleteUser } from '../../actions/user';
import UserDeleteModal from './UserDeleteModal';
import { openModal, closeModal } from 'CommonUI/actions/Modal';

export class UserDeleteBox extends Component<ComponentProps>{
    public static displayName = '';
    public static propTypes = {};

    constructor(props: $TSFixMe) {
        super(props);
        this.state = { deleteModalId: uuidv4() };
    }

    handleClick = () => {

        const { deleteUser, userId }: $TSFixMe = this.props;

        const { deleteModalId }: $TSFixMe = this.state;


        this.props.openModal({
            id: deleteModalId,
            onConfirm: () => {
                return deleteUser(userId);
            },
            content: UserDeleteModal,
        });
    };

    handleKeyBoard = (e: $TSFixMe) => {
        switch (e.key) {
            case 'Escape':

                return this.props.closeModal({ id: this.state.deleteModalId });
            default:
                return false;
        }
    };

    override render() {

        const { isRequesting }: $TSFixMe = this.props;

        return (
            <div
                onKeyDown={this.handleKeyBoard}
                className="Box-root Margin-bottom--12"
            >
                <div className="bs-ContentSection Card-root Card-shadow--medium">
                    <div className="Box-root">
                        <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--16">
                            <div className="Box-root">
                                <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                    <span>Delete User</span>
                                </span>
                                <p>
                                    <span>
                                        Click the button to delete this user.
                                    </span>
                                </p>
                            </div>
                            <div className="bs-ContentSection-footer bs-ContentSection-content Box-root Box-background--white Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--0 Padding-vertical--12">
                                <span className="db-SettingsForm-footerMessage"></span>
                                <div>
                                    <button
                                        id="delete"
                                        className="bs-Button bs-Button--red Box-background--red"
                                        disabled={isRequesting}
                                        onClick={this.handleClick}
                                    >
                                        <ShouldRender if={!isRequesting}>
                                            <span>Delete</span>
                                        </ShouldRender>
                                        <ShouldRender if={isRequesting}>
                                            <FormLoader />
                                        </ShouldRender>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


UserDeleteBox.displayName = 'UserDeleteBox';

const mapDispatchToProps: Function = (dispatch: Dispatch) => bindActionCreators({ deleteUser, openModal, closeModal }, dispatch);

const mapStateToProps: Function = (state: RootState) => {
    const userId: $TSFixMe = state.user.user.user ? state.user.user.user._id : null;

    return {
        userId,
        isRequesting:
            state.user &&
            state.user.deleteUser &&
            state.user.deleteUser.requesting,
    };
};


UserDeleteBox.propTypes = {
    isRequesting: PropTypes.oneOf([null, undefined, true, false]),
    userId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null, undefined]),
    ]),
    deleteUser: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    openModal: PropTypes.func.isRequired,
};


UserDeleteBox.contextTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleteBox);
