import React, {Component} from 'react';
import './css/Content.css';
import PropTypes from 'prop-types';

import Login from '../Login/Login'

class Content extends Component {
    static propTypes = {
        body: PropTypes.object.isRequired
    };

    render() {
        const {body} = this.props;
        return (
            <div className="Content">
                {body}
                <Login/>
            </div>
        );
    }
}

export default Content;
