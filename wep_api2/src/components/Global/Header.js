import React, {Component} from 'react';
import './css/Header.css';
import logo from './images/logo.svg';

class Header extends Component {

    render() {
        return (
            <div className="Header">
                <div className="Logo">
                    <img className="img" src={logo} alt="logo"/>
                    <h1 className="datos"> Bienvenidos </h1>
                </div>
            </div>
        );
    }
}

export default Header;