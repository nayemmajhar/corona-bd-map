import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Timeline extends Component{

    render(){

        const { spots } = this.props

        return(
               <div className="tour-timeline">
                   {
                       spots.map((spot,index) => {
                           const link = '/place/'+spot.id
                           return(
                            <Link to={link} target="_blank">
                            <div key={index} className="timeline-item">
                                <div className="ct-tour-media">
                                    <div className="ct-tour-img">
                                        <div className="ct-tour-image-overlap">
                                            <div className="ct-tour-image-box">
                                                <div className="ct-tour-image-box-inner">
                                                    <i className={ spot.marker }></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ct-tour-body">
                                        <div className="ct-tour-content">
                                            <div className="ct-tour-content-box">
                                                <img src={"/images/places/"+ spot.images} className="img-fluid" />
                                                <div className="ct-tour-place-text">
                                                    <h4 className="ct-tour-place-title">{ spot.title }</h4>
                                                    <p>Addressoioioio: <a herf="#">{ spot.address }</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                           )
                       })
                   }
               </div>
            )
    }
}
export default Timeline;