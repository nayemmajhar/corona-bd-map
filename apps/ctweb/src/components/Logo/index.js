import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../img/logo.png'

class Logo extends React.Component{
    render(){
        return(
            <div className="d-flex align-items-center">
                <NavLink to="/" className="navbar-brand py-1">Corona Bangladesh</NavLink>
            </div>
        )
    }
}

export default Logo;