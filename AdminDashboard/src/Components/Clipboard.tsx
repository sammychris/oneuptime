import React from 'react';
import Clipboard from 'clipboard';
import PropTypes from 'prop-types';

class ClipboardWrap extends Component<ComponentProps> {
    button: $TSFixMe;
    clipboard: $TSFixMe;
    input: $TSFixMe;
    override componentDidMount() {
        const button: $TSFixMe = this.button;
        const input: $TSFixMe = this.input;

        this.clipboard = new Clipboard(button, {
            target: () => input,
        });
    }

    override componentWillUnmount() {
        this.clipboard.destroy();
    }

    override render() {

        const { value }: $TSFixMe = this.props;

        return (
            <div>
                <input
                    ref={element => {
                        this.input = element;
                    }}
                    type={'text'}
                    value={value}
                    className="bs-TextInput"
                    style={{
                        width: 360,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    readOnly
                />
                <button
                    ref={element => {
                        this.button = element;
                    }}
                    className="bs-Button bs-Button--blue"
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    }}
                >
                    Copy
                </button>
            </div>
        );
    }
}


ClipboardWrap.displayName = 'ClipboardWrap';


ClipboardWrap.propTypes = {
    value: PropTypes.string,
};

export default ClipboardWrap;
