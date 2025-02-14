import React, { Component } from 'react';

/**
 * Component that alerts if you click outside of it
 */

export default (ComposedComponent: $TSFixMe, extras: $TSFixMe) => {
    class OutsideCkick extends Component<ComponentProps> {

        public static displayName = '';
        public static propTypes = {};

        wrapperRef: $TSFixMe;
        constructor(props: $TSFixMe) {
            super(props);

            this.setWrapperRef = this.setWrapperRef.bind(this);
            this.handleClickOutside = this.handleClickOutside.bind(this);
        }

        override componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }

        override componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }

        /**
         * Set the wrapper ref
         */
        setWrapperRef(node: $TSFixMe) {
            this.wrapperRef = node;
        }

        /**
         * Alert if clicked on outside of element
         */
        handleClickOutside = (event: $TSFixMe) => {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                extras.closeModal();
            }
        };

        override render() {
            return (
                <div ref={this.setWrapperRef} >
                    {' '}
                    < ComposedComponent {...this.props} />{' '}
                </div >
            );
        }
    }


    OutsideCkick.displayName = 'OutsideCkick';

    return OutsideCkick;
};
