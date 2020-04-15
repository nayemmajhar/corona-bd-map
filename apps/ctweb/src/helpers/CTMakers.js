import React, {Component} from 'react';
import { Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import {Link} from 'react-router-dom'

class CTMakers extends Component{

    render(){

        const { places, target } = this.props

        return(

                <div>
                {
                    places &&
                    places.map((x,i) => {

                        var currentPlace = ''
                        if(x.current){
                            var currentPlace= ' route-places'
                        }

                        const fontAwesomeIcon = L.divIcon({
                            html: '<i class="' + x.marker + '"></i>',
                            iconSize: [40, 40],
                            className: 'myDivIcon' + currentPlace
                        });
                        
                        return(
                        <Marker
                            position={[x.lat, x.lon]}
                            icon={fontAwesomeIcon}
                            >
                            <Popup>
                                <p><strong>{x.title}</strong></p>
                                <p>{x.address}</p>
                                {
                                    target?
                                    <Link to={'/place/' + x.id}  target="_blank">Details</Link>
                                    :
                                    <Link to={'/place/' + x.id} >Details</Link>
                                }
                            </Popup>
                        </Marker>
                        )
                    })
                }
                </div>
            )
    }
}
export default CTMakers;