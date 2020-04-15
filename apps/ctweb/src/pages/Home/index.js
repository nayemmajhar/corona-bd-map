import React from 'react';
import ReactDOM from 'react-dom';
import ServiceStatic from './components/ServiceStatic';

class Home extends React.Component{

    render(){
        return(
            <div id="fk-home">
                <ServiceStatic />
            </div>
        )
    }
}

export default Home