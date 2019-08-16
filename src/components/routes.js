import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import Header from '../components/Header';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Logout from '../pages/Logout';
import EventRegistration from "../pages/EventRegistration";
import RegistrationSuccess from "../pages/RegistrationSuccess";

// paths that will not redirect to login for admin users
const privatePaths = ['/client', '/clients-all', '/project', '/projects-all'];
const windowPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
const showHeader = !(window.location.pathname.indexOf('media') > -1);

const Routes = () => {
    const {clientID, isAdmin, isLoggedIn} = useSelector(store => ({
        clientID: store.users.clientID,
        isAdmin: store.users.isAdmin,
        isLoggedIn: store.users.isLoggedIn
    }));

    if ((window.location.pathname === '/') && isLoggedIn && clientID && !isAdmin) return <Redirect to={'/client/' + clientID}/>;
    if (privatePaths.includes(windowPath) && (isLoggedIn !== null) && !isLoggedIn) return <Redirect to={'/login'}/>;

    return (
        <div>
            {showHeader && <Header/>}
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" render={() => <Register/>}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/event-registration" component={EventRegistration}/>
            <Route exact path="/success" component={RegistrationSuccess}/>
        </div>

    )
};

export default Routes;
