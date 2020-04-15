import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';


class Navigation extends React.Component{

    render(){

        return(
            <div id="navbarCollapse" className="collapse navbar-collapse">
                <Nav className="navbar-nav ml-auto">
                    <NavItem className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/tours" className="nav-link">Bike Tours</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/kiel" className="nav-link">Places of Kiel</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/about" className="nav-link">About Us</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/about" className="nav-link">Help</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default withRouter(Navigation);