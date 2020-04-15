import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
    render(){
        return(
            <header id="fk-header" className="container">
                <div class="row">
                    <div className="col-sm-4">FreedomKiel</div>
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-9">Navigation</div>
                            <div className="col-sm-3">Login</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;