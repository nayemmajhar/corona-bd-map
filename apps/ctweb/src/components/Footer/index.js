import React from 'react';
import FooterBottom from './components/FooterBottom';

class Footer extends React.Component {
    render(){
        return(
            <footer className="position-relative z-index-10 d-print-none">
                <FooterBottom />
            </footer>
        )
    }
}

export default Footer;