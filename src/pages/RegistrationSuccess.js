import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const RegistrationSuccess = () => {
    const {isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.users.isLoggedIn
    }));

    if (!isLoggedIn) return (<Redirect to={'/'}/>);

    return <div className="container" style={{textAlign: 'center'}}><h1>SUCCESS!</h1></div>;
};


export default RegistrationSuccess;
