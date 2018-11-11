import React, {Component} from 'react';
import './css/Header.css';
import logo from './images/logo.svg';
import FacebookLogin from  '../FacebookLogin/FacebookLogin';

class Header extends Component {

    render() {
        return (
            <div className="Header">
                <div className="Logo">
                    <img className="img" src={logo} alt="logo"/>
                    <FacebookLogin/>
                    <h1 className="datos"> Bienvenidos al chats </h1>
                </div>
            </div>
        );
    }
}

export default Header;