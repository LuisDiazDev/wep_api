import React from 'react'
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//componentes
import App from './components/App'
import Home from './components/Home'
import ChatRooms from './components/ChatRooms/ChatRooms'
import FileUpload from './components/FileUpload/FileUpload'
import FacebookLogin from './components/FacebookLogin/FacebookLogin'
import Login from './components/Login/Login'

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/chat" component={ChatRooms}/>
            <PrivateRoute exact path="/fotos" component={FileUpload}/>
            <PrivateRoute exact path="/lf" component={FacebookLogin}/>
            <PrivateRoute exact path="/" component={Home}/>
        </Switch>
    </App>;

export default AppRoutes;