import React, {Component} from 'react';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadValue: 0,
            picture: null
        }
    }

    render() {

        return (
            <div className="FileUpload">
                <progress value={this.state.uploadValue} max="100"/>
                <br/>
                <input type="file" onChange={this.handleUpload}/>
                <br/>
                <img src={this.state.picture} alt=""/>
            </div>
        );
    }
}

export default FileUpload;
