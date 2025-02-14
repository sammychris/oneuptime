import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormLoader } from '../basic/Loader';
import ShouldRender from '../basic/ShouldRender';
import { renewAlertLimit } from '../../actions/project';

export class ProjectAlertLimitBox extends Component<ComponentProps>{
    public static displayName = '';
    public static propTypes = {};

    constructor(props: $TSFixMe) {
        super(props);
        this.state = {
            alertLimit:
                props.project && props.project.alertLimit
                    ? props.project.alertLimit
                    : null,
        };
    }

    onChange = (e: $TSFixMe) => {
        const value: $TSFixMe = e.target.value;
        this.setState({ alertLimit: value });
    };

    handleClick = () => {

        const { renewAlertLimit, project }: $TSFixMe = this.props;

        const { alertLimit }: $TSFixMe = this.state;
        renewAlertLimit(project._id, alertLimit);
    };

    override render() {

        const { requesting }: $TSFixMe = this.props;
        return (
            <div className="Box-root Margin-bottom--12">
                <div className="bs-ContentSection Card-root Card-shadow--medium">
                    <div className="Box-root">
                        <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--16">
                            <div className="Box-root">
                                <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                    <span>Alert Limit</span>
                                </span>
                                <p>
                                    <span>
                                        Increase alert limit of this project.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-horizontal--8 Padding-vertical--2">
                            <div>
                                <div className="bs-Fieldset-wrapper Box-root Margin-bottom--2">
                                    <fieldset className="bs-Fieldset">
                                        <div className="bs-Fieldset-rows">
                                            <div className="bs-Fieldset-row">
                                                <label className="bs-Fieldset-label">
                                                    Alert Limit
                                                </label>
                                                <div className="bs-Fieldset-fields">
                                                    <input
                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                        placeholder="100"
                                                        value={
                                                            this.state

                                                                .alertLimit
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="bs-ContentSection-footer bs-ContentSection-content Box-root Box-background--white Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--12">
                            <span className="db-SettingsForm-footerMessage"></span>
                            <div>
                                <button
                                    className="bs-Button bs-DeprecatedButton bs-Button--blue"
                                    disabled={requesting}
                                    type="button"
                                    onClick={this.handleClick}
                                >
                                    <ShouldRender if={requesting}>
                                        <FormLoader />
                                    </ShouldRender>
                                    <ShouldRender if={!requesting}>
                                        <span>Renew</span>
                                    </ShouldRender>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ProjectAlertLimitBox.displayName = 'ProjectAlertLimitBox';

const mapDispatchToProps: Function = (dispatch: Dispatch) => bindActionCreators({ renewAlertLimit }, dispatch);

const mapStateToProps: Function = (state: RootState) => {
    const project: $TSFixMe = state.project.project.project;
    return {
        project,
        requesting:
            state.project &&
            state.project.alertLimit &&
            state.project.alertLimit.requesting,
    };
};


ProjectAlertLimitBox.propTypes = {
    project: PropTypes.object,
    renewAlertLimit: PropTypes.func,
    requesting: PropTypes.bool,
};


ProjectAlertLimitBox.contextTypes = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectAlertLimitBox);
