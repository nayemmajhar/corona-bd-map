import React from 'react';
import Logo from './../Logo/index';

class Header extends React.Component{
    render(){
        return( 
            <header className="header">
                <div className="container-fluid">
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