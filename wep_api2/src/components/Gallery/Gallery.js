import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../Global/css/Gallery.css'

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            picture: []
        }
    }

    static propTypes = {
        user: PropTypes.object.isRequired
    };

    componentWillUnmount(){

    }

    render(){
        const {pictures} = this.props;

        return (
            <div className="gallery">
                <h1>Galeria</h1>
            </div>
        );
    }
}

export default Gallery;