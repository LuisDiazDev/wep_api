import React, {Component} from 'react';
import firebase from 'firebase'


class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadValue: 0,
            picture: null
        }
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event){
        const files = event.target.files;
        const file = files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot =>{
            let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue : porcentaje
            });
        }, error => {
            console.log(error.message)
            }, () =>{
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.setState({
                        uploadValue: 100,
                        picture : downloadURL
                    });
                });
            }
        )
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
