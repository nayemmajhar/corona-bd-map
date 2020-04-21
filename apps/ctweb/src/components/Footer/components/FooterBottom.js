import React from 'react';
import Logo from '../../Logo'


class FooterBottom extends React.Component {
    render(){
        return(
        <div className="container-fluid py-2 bg-gray-800 text-gray-300">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="">
                        <Logo />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <p className="copyright-text text-sm mb-md-0 text-md-right">© CoronaMeter Bangladesh.</p>
                </div>
            </div>
        </div>
        )
    }
}

export default FooterBottom;