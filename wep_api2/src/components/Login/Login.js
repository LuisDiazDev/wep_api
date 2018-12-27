import React, {Component} from 'react';
import firebase from 'firebase'
import '../Global/css/Login.css'

// Utils
import auth from '../../utils/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            pictures:[],
            estado:'galeria',
            email:"",
            password:""
        };
        this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSumit = this.handleSumit.bind(this);
        this.Auth = new auth('http://localhost:8080/users');

    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {this.setState({user})});

        firebase.database().ref('pictures').on('child_added',snapshot =>{
            this.setState({
                pictures: this.state.pictures.concat(snapshot)
            });
        })
    }

    handleAuthGoogle(){
        const providerGoogle = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(providerGoogle)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`error ${error.code} : ${error.message}`))
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
                    const record = {
                      photoURL: this.state.user.photoURL,
                      displayName: this.state.user.displayName,
                      email: this.state.user.email,
                      image: downloadURL
                    };

                    console.log(record);

                    const dbRef = firebase.database().ref('pictures');
                    const newPicture = dbRef.push();
                    newPicture.set(record);
                });
            }
        )
    }

    handleLogout(){
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha cerrado sesión`))
            .catch(error => console.log(`error ${error.code} : ${error.message}`))
    }

    handleDate(){
        if(this.state.estado !== 'galeria'){
            this.setState({estado:'galeria'});
        }
    }

    renderLogin(){
        if(this.state.user){
            return(
                /*<Perfil/>*/
                <button type="button" className="btn btn-success btn-sm" onClick={this.handleLogout}>Salir</button>
            );
        }else{
            return(
                <div>
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card" src="../Global/images/login.png" alt=""/>
                        <p id="profile-name" className="profile-name-card"/>
                        <form className="form-signin">
                            <span id="reauth-email" className="reauth-email"/>
                            <input defaultValue={this.state.email} type="email" id="inputEmail" name="email" className="form-control" placeholder="correo" onChange={this.handleChange} required />
                                <input defaultValue={this.state.password} type="password" id="inputPassword"  name="password" className="form-control" placeholder="contraseña" onChange={this.handleChange} required/>
                                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.handleSumit}>Ingresar</button>
                                    <button className="pt-button pt-intent-primary" onClick={() => {this.handleAuthGoogle()}}>
                                        Ingresar con Google
                                    </button>
                        </form>
                        <a href={this.handleDate()} className="forgot-password">
                            olvido su contraseña?
                        </a>
                    </div>
                </div>
            );
        }
    }

    handleChange(e){
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSumit(e){
        e.preventDefault();
        this.Auth.login(this.state.email,this.state.password)
            .then(resp =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err)
            })
    }

    render() {
        return (
            <div className="Login">
                {this.renderLogin()}
            </div>
        );
    }
}

export default Login;
