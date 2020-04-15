import React, { Component, createRef } from "react";
import L from 'leaflet'
import { Map, TileLayer, withLeaflet, MapControl, Popup, Marker, Polyline, Pane, GeoJSON } from "react-leaflet";
import ctKielApi from './../../helpers/ctKielApi'
import {areaData} from './../../helpers/areaData';
import axios from 'axios'
import Image from './../../helpers/Image'
import { ClipLoader, DotLoader, BarLoader, PropagateLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 1000;
  position: absolute;
  top: 80px;
  left: 50%;
`;




class PlaceMap extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,

      lat: 54.34,
      lng: 10.13,
      zoom: 15,
      isMapInit: false,
      markers: [
        {
          lat: 54.322818512961135,
          lng: 10.143492221832275,
        },
      
        {
          lat: 54.338740125896415,
          lng: 10.12313961982727,
        },

        {
          lat: 54.364258145372155,
          lng: 10.115532875061035,
        },
      ]
    };
  }

  componentDidMount() {

    const { id } = this.props.match.params
    const url = ctKielApi.URL + '/places/' + id
    
    axios.get(url).then(response => response.data)
    .then((data) => {
        this.setState({
            places: data.places,
            place: data.place,
            lat: data.place.lat,
            lng: data.place.lon,
            loading: false,
        })
    }).catch(function (error) {
        console.log(error);
    })
  }

  onClickMaker(){
    console.log("Here");
  }

  render() {
    const { lat, lng, zoom, place } = this.state;
    const position = [lat, lng];

    return (
    <div className="clearfix">
        <PropagateLoader
            css={override}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={this.state.loading}
          />


        <Map center={position} className="place-map" zoom={zoom} minZoom={10} maxZoom={30}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            />

            <TileLayer
              url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            />
            {
              this.state.places &&
              this.state.places.map((x,i) => {
				var currentPlace = ''
				if(x.id == place.id){
					var currentPlace= ' current-place'
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
                      onClick={this.onClickMaker.bind(this)}
                    >
                    <Popup className="place-popup">
                      <p><strong>{x.title}</strong></p>
                      <p>Website: { x.websites }</p>
                      <p><a href={ctKielApi.siteUrl +'/place/' + x.id} target="_blank" >Details</a></p>
                    </Popup>
                  </Marker>
                )
              })
            }
            <GeoJSON data={areaData} />
        </Map>
        <section className="py-6 bg-gray-100">
            <div className="container">
                <div className="text-center pb-lg-4">
                    <p className="subtitle text-secondary">Explore the beauty of Kiel </p>
					{
						place &&
						<h2 className="mb-5">{place.title}</h2>
					}
                </div>
                {
                place &&
                <div className="row justify-content-md-center">
					<div className="col-lg-5">
						<div className="place-information">
							<h4>{place.title}</h4>
							<p>{place.description}</p>
							<p>Type: <b>{place.type}</b></p>
							{
								place.websites && place.websites !== 'None' &&
								<p>Website: <a href={place.websites} target="_blank">{place.websites}</a></p>
							}
						</div>
					</div>
					<div className="col-lg-5">
						<Image src={'/images/places/'+place.images} alt={place.title} class="place_grid_item_inner_image img-fluid" />
					</div>
                </div>
                }
            </div>
        </section>
    </div>
    );
  }
}

export default PlaceMap;