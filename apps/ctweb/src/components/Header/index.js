import React from 'react';
import Logo from './../Logo/index';
import Navigation from './components/Navigation';
import './css/header.css'

class Header extends React.Component{
    render(){
        return( 
            <header className="header" style={{'backgroundColor':'#e9e5e0'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mb-12 mb-lg-0">
                            <Logo />
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;