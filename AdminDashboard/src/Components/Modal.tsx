import React, { Component } from 'react';
import PropTypes from 'prop-types';

const composableComponent: Function = (ComposedComponent: $TSFixMe) => {
    class Modal extends Component<ComponentProps> {

        public static displayName = '';
        public static propTypes = {};

        constructor(props: $TSFixMe) {
            super(props);

            this.props = props;
            this.onClose = this.onClose.bind(this);
            this.onConfirm = this.onConfirm.bind(this);
        }
        onClose = (value: $TSFixMe) => {

            if (this.props.item.onClose) {

                this.props.item.onClose(value);

                this.props.onClose(this.props.item);
            } else {

                this.props.onClose(this.props.item);
            }
        };
        onConfirm = (value: $TSFixMe) => {
            

            if (this.props.item.onConfirm) {

                this.props.item.onConfirm(value).then(

                    () => this.props.onClose(this.props.item),
                    () => { }
                );
            } else {

                this.props.onClose(this.props.item);
            }
        };
        override render() {

            const { zIndex }: $TSFixMe = this.props;

            const { extraClasses }: $TSFixMe = this.props.item;

            const mainClass:string: $TSFixMe = `${extraClasses || ''} modal-dialog-view`;
            const modalContainerStyle: $TSFixMe = {
                overflowX: 'auto',
                overflowY: 'scroll',
                display: 'block',
                top: '0px',
            };
            return (
                <div
                    className={mainClass}
                    style={{
                        zIndex: (zIndex + 1) * 10000,
                    }}
                >
                    <div
                        className="modal_overlay"
                        style={{
                            top: 0,
                            opacity: 1,
                            transform: 'none',
                            display: 'block',
                            pointerEvents: 'auto',
                        }}
                    >
                        <div
                            className="modal_container"

                            style={modalContainerStyle}
                        >
                            <ComposedComponent
                                closeThisDialog={this.onClose}
                                confirmThisDialog={this.onConfirm}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

    Modal.propTypes = {
        onConfirm: PropTypes.func,
        item: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        extraClasses: PropTypes.string,
        zIndex: PropTypes.number.isRequired,
    };


    Modal.displayName = 'Modal';

    return Modal;
};

export default composableComponent;
