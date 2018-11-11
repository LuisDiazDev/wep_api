import React from 'react'
import {Route, Switch} from 'react-router-dom';

//componentes
import App from './components/App'
import Home from './components/Home'
import ChatRooms from './components/ChatRooms'

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" componet={Home}/>
            <Route exact path="/chat" componet={ChatRooms}/>
        </Switch>
    </App>;

export default AppRoutes;