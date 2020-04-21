import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../img/logo.png'

class Logo extends React.Component{
    render(){
        return(
            <div className="d-flex align-items-center">
                <NavLink to="/" className="navbar-brand py-1"><img className="site-logo" src={logo} alt="Corona Meter Bangladesh" /> CoronaMeter Bangladesh</NavLink>
            </div>
        )
    }
}

export default Logo;