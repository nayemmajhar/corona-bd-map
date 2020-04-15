import React from 'react';

class Image extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <img
                src={this.props.src}
                alt={this.props.alt}
                className={this.props.class}
            />
        )
    }
}
export default Image;