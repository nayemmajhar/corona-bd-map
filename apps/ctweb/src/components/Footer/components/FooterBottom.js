import React from 'react';
import Logo from '../../Logo'


class FooterBottom extends React.Component {
    render(){
        return(
            <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-left">
                            <Logo />
                        </div>
                        <div className="col-md-6">
                            <p className="text-sm mb-md-0 text-md-right">© CoronaMeter Bangladesh.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterBottom;