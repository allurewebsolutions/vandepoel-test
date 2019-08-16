import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const MainMenu = () => {
    const {isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.users.isLoggedIn
    }));

    return (
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="main-menu navbar-nav">
                <li className="nav-item nav-link"> {isLoggedIn ? <Link to="/event-registration">Event Registration</Link> : null}</li>
                <li className="nav-item nav-link"> {isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/register">Register</Link>}</li>
            </ul>
        </div>
    )
};

export default MainMenu;

