import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reduxForm, Field } from 'redux-form';

class Search extends Component<ComponentProps> {

    public static displayName = '';
    public static propTypes = {};

    override render() {
        return (
            <div style={{ width: 300 }}>
                <div
                    className="Box-root Margin-right--8"
                    style={{ width: '100px' }}
                >
                    <Field
                        className="db-BusinessSettings-input TextInput bs-TextInput"
                        component="input"
                        type="text"
                        name="search"
                        required="required"
                    />
                </div>
                <div className="Box-root">
                    <button
                        id="btnSearch"
                        className="bs-Button bs-Button--blue"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </div >
        );
    }
}


Search.displayName = 'Search';

const mapStateToProps: Function = () => {
    return {};
};

const SearchForm: $TSFixMe = reduxForm({
    form: 'Search',
})(Search);

export default connect(mapStateToProps)(SearchForm);
