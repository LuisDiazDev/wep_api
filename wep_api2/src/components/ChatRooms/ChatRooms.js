import React, {Component} from 'react'

class ChatRooms extends Component {
    constructor() {
        super();
        this.state = {
            text:'',
            mensajes: [
                {id: 0, text: 'msj 1', autor: 'usuarioP'},
                {id: 1, text: 'msj 2', autor: 'usuarioP2'},
                {id: 2, text: 'msj 3', autor: 'usuarioP3'}
            ]
        }
    }

    updateText(e){
        this.setState({text: e.target.value});
    }

    handleSummit(e){
        e.preventDefault();
    }

    render() {
        const mensajesList = this.state.mensajes.map(mensaje => {
                return <li key={mensaje.id}>{mensaje.text}</li>
            }
        );
        return (
            <div className="ChatRooms">
                <ul>{mensajesList}</ul>
                <form onSubmit={this.handleSummit.bind(this)}>
                    <p>para</p>
                    <input type="text" onChange={this.updateText.bind(this)}/>
                    <p>msg</p>
                    <input type="text" onChange={this.updateText.bind(this)}/>
                    <button>enviar</button>
                </form>
            </div>
        );
    }
}

export default ChatRooms;
