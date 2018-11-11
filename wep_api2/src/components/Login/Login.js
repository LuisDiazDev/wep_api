import React, {Component} from 'react';
import firebase from 'firebase'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {this.setState({user})});
    }

    handleAuthGoogle(){
        const providerGoogle = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(providerGoogle)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`error ${error.code} : ${error.message}`))
    }


    handleLogout(){
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha cerrado sesión`))
            .catch(error => console.log(`error ${error.code} : ${error.message}`))
    }
    /*
    handleAuthFacebook(){
        const providerGoogle = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(providerGoogle)
            .then(result => {
                console.log(`${result.user.getIdToken()} ha iniciado sesión`)
                this.setState({logeado:true});
            })
            .catch(error => console.log(`error ${error.code} : ${error.message}`))
    }*/

    renderLogin(){
        if(this.state.user){
            return(
              <div>
                  <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                  <p> Bienvenido {this.state.user.displayName}</p>
                  <button onClick={this.handleLogout}>Salir</button>
              </div>
            );
        }else{
            return(
                <div>
                    <h4>ingrese al sistema</h4>
                    <button className="pt-button pt-intent-primary" onClick={() => {this.handleAuthGoogle()}}>
                        Login con Google
                    </button>
                </div>
            );
        }
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
