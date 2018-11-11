import React, {Component} from 'react';
import './css/Content.css';
import PropTypes from 'prop-types';

import ChatRooms from '../ChatRooms/ChatRooms.js'

class Content extends Component {
    static propTypes = {
        body: PropTypes.object.isRequired
    };

    render() {
        const {body} = this.props;
        return (
            <div className="Content">
                <div>
                    <h1>Area de Chats</h1>
                </div>
                <ChatRooms/>
                {body}
            </div>
        );
    }
}

export default Content;
