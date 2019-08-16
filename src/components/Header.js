import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainMenu from './MainMenu';
import logo from '../logo.png'

const Header = () => {
    return (
        <div className="header navbar navbar-expand-sm navbar-light bg-light mb-4">
            <Link className="logo navbar-brand" to="/"><img alt={"Logo"} src={logo}/></Link>
            <MainMenu/>
        </div>
    )
};

export default Header
