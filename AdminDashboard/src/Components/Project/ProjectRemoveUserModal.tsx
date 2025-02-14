import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import ClickOutside from 'react-click-outside';
import { closeModal } from 'CommonUI/actions/Modal';
import { resetTeamDelete } from '../../actions/project';
import ShouldRender from '../basic/ShouldRender';
import { FormLoader } from '../basic/Loader';

class ProjectRemoveUserModal extends Component<ComponentProps> {

    public static displayName = '';
    public static propTypes = {};

    override componentDidMount() {
        window.addEventListener('keydown', this.handleKeyBoard);
    }

    override componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyBoard);
    }

    handleKeyBoard = (e: $TSFixMe) => {

        const { data, resetTeamDelete }: $TSFixMe = this.props;
        switch (e.key) {
            case 'Escape':
                resetTeamDelete();
                return this.handleCloseModal();
            case 'Enter':
                return data.removeTeamMember(data.values);
            default:
                return false;
        }
    };

    handleCloseModal = () => {

        this.props.closeModal({

            id: this.props.data.removeUserModalId,
        });
    };

    override render() {
        const {

            teamUserDelete,

            closeModal,

            data,

            resetTeamDelete,

            deleting,
        } = this.props;
        return (
            <div className="ModalLayer-wash Box-root Flex-flex Flex-alignItems--flexStart Flex-justifyContent--center">
                <div
                    className="ModalLayer-contents"
                    tabIndex={-1}
                    style={{ marginTop: 40 }}
                >
                    <div className="bs-BIM">
                        <div className="bs-Modal bs-Modal--medium">
                            <ClickOutside
                                onClickOutside={this.handleCloseModal}
                            >
                                <div className="bs-Modal-header">
                                    <div className="bs-Modal-header-copy">
                                        <span className="Text-color--inherit Text-display--inline Text-fontSize--20 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                            <span>Confirm Removal</span>
                                        </span>
                                    </div>
                                    <div className="bs-Modal-messages">
                                        <ShouldRender if={teamUserDelete.error}>
                                            <p className="bs-Modal-message">
                                                {teamUserDelete.error}
                                            </p>
                                        </ShouldRender>
                                    </div>
                                </div>
                                <div className="bs-Modal-content">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        Are you sure you want to remove{' '}
                                        {data.displayName
                                            ? data.displayName
                                            : 'this user'}{' '}
                                        from the project?
                                    </span>
                                </div>
                                <div className="bs-Modal-footer">
                                    <div className="bs-Modal-footer-actions">
                                        <button
                                            className="bs-Button bs-DeprecatedButton bs-Button--grey btn__modal"
                                            disabled={deleting}
                                            type="button"
                                            onClick={() => {
                                                resetTeamDelete();
                                                return closeModal({
                                                    id: data.removeUserModalId,
                                                });
                                            }}
                                        >
                                            <span>Cancel</span>
                                            <span className="cancel-btn__keycode">
                                                Esc
                                            </span>
                                        </button>
                                        <button
                                            id="removeTeamUser"
                                            className="bs-Button bs-DeprecatedButton bs-Button--red btn__modal"
                                            disabled={deleting}
                                            type="button"
                                            onClick={() =>
                                                data.removeTeamMember(
                                                    data.values
                                                )
                                            }
                                            autoFocus={true}
                                        >
                                            {!deleting && (
                                                <>
                                                    <span>Remove</span>
                                                    <span className="delete-btn__keycode">
                                                        <span className="keycode__icon keycode__icon--enter" />
                                                    </span>
                                                </>
                                            )}
                                            {deleting && <FormLoader />}
                                        </button>
                                    </div>
                                </div>
                            </ClickOutside>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ProjectRemoveUserModal.displayName = 'ProjectRemoveUserModal';

const mapStateToProps: Function = (state: RootState, props: $TSFixMe) => {
    const userId: $TSFixMe =
        props.data && props.data.values && props.data.values.userId
            ? props.data.values.userId
            : null;
    return {
        teamUserDelete: state.project.teamDelete,
        deleting: state.project.teamDelete.deleting.some((id: $TSFixMe) => id === userId),
    };
};

const mapDispatchToProps: Function = (dispatch: Dispatch) => {
    return bindActionCreators({ closeModal, resetTeamDelete }, dispatch);
};


ProjectRemoveUserModal.propTypes = {
    closeModal: PropTypes.func,
    data: PropTypes.object,
    deleting: PropTypes.bool,
    resetTeamDelete: PropTypes.any,
    teamUserDelete: PropTypes.any,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectRemoveUserModal);
