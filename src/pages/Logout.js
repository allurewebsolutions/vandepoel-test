import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../redux/actions';
import {Redirect} from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.users.isLoggedIn
    }));

    if (isLoggedIn) dispatch(userLogout(localStorage.token));

    return (isLoggedIn ? <Redirect to={'/'}/> : null);
};

export default Logout;
