import React, {Component} from 'react';
import '../Global/css/FacebookLogin.css';

class FacebookLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logeado: false
        }
    }

    componentDidMount() {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '343744149709579',
                xfbml: true,
                version: 'v3.2'
            });
            window.FB.Event.subscribe("auth.statusChange", response => {
                this.statusChangeCallback(response);
            });

            this.checkLoginStatus()
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    statusChangeCallback(response) {
        console.log(response);
        if (response.status === 'connected') {
            this.setState({
                logeado: true,
                userID: response.authResponse.userID
            });
            this.getPersonaData();
        } else {
            this.setState({
                logeado: false
            });
        }
    }

    checkLoginStatus(response) {
        window.FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }


    getPersonaData() {
        var url = "/" + this.state.userID + "?fields=name,picture"
        window.FB.api(url, response => {
            console.log(response);
            this.setState({
                name: response.name,
                picture: response.picture.data.url
            });
        });
    }

    cerrarSession(e){
        console.log("saliendo...");
        window.FB.logout(response => {
            alert("gracias por preferirnos");
            this.setState({
                logeado: false
            });
        });
    }

    showPersonalData() {
        if (this.state.logeado) {
            return (
                <div>
                    <p className="nombre"> Bienvenido {this.state.name}</p>
                    <img className="fotoPerfil" src={this.state.picture} alt="fotoPerfil"/>
                    <button onClick={this.cerrarSession} className="butonS">salir</button>
                </div>
            );
        } else {
            return (
                <div className="boton">
                    <div className="fb-login-button"
                         data-max-rows="1"
                         data-size="large"
                         data-button-type="continue_with"
                         data-show-faces="false"
                         data-auto-logout-link="true"
                         data-use-continue-as="false">
                    </div>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="FacebookLogin">
                {this.showPersonalData()}
            </div>
        );
    }
}

export default FacebookLogin;
