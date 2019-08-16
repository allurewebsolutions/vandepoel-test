import React from 'react';
import {useDispatch} from 'react-redux';
import Routes from './routes';
import {userLoggedIn} from '../redux/actions';
import {BrowserRouter as Router} from "react-router-dom";
import '../index.css';

const App = () => {
    const dispatch = useDispatch();

    // validate if user is logged in
    dispatch(userLoggedIn(localStorage.token));

    return <Router><Routes/></Router>;
};

export default App;


