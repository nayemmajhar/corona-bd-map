import React, { Component, createRef } from "react";
import L from 'leaflet'
import { Map, TileLayer, withLeaflet, MapControl, Popup, Marker, Polyline, Pane, GeoJSON } from "react-leaflet";
import ctKielApi from './../../helpers/ctKielApi'
import axios from 'axios'
import Image from './../../helpers/Image'
import Routing from "./components/Routing";
import {areaData} from './../../helpers/areaData';
import CTMakers from './../../helpers/CTMakers'
import {Link} from 'react-router-dom'

import { ClipLoader, DotLoader, BarLoader, PropagateLoader } from "react-spinners";
import { css } from "@emotion/core";
import Timeline from "./components/Timeline";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 1000;
  position: absolute;
  top: 80px;
  left: 50%;
`;


class TourMap extends Component {
  constructor(props) {
    super();
    this.state = {
	  loading: true,
      lat: 54.32313137415068,
      lng: 10.139522552490234,
      zoom: 12,
      isMapInit: false,
      markers: []
    };
    
  }

  componentDidMount() {

    const { id } = this.props.match.params
    
		const url = ctKielApi.URL + '/tours/map/'+id
		axios.get(url).then(response => response.data)
		.then((data) => {		

			const markerData = []
			const spotsIds = []
			data.spots.map(x => {
				markerData.push({lat : x.lat, lng : x.lon})
				spotsIds.push(x.place_id)
			})

			data.places.map(x =>{

				if (spotsIds.includes(x.id)){
					x.current = true
				} else{
					x.current = false
				}
				return x;
			})

			const midSpot = Math.floor(markerData.length/2)

			this.setState({
				markers: markerData,
				tour: data.tour,
				places: data.places,
				spots: data.spots,
				lat: markerData[midSpot].lat,
				lng: markerData[midSpot].lng,
				loading: false,
			})
		}).catch(function (error) {
			console.log(error);
		})
	}

  // $FlowFixMe: ref
  refmarker = createRef()

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });

    console.log(map);
    
  };

  updatePosition = () => {
    const marker = this.refmarker.current
    if (marker != null) {
      this.setState({
        marker1: marker.leafletElement.getLatLng(),
      })
    }
  }


  render() {
    const { lat, lng, zoom, tour } = this.state;
	const position = [lat, lng];
	const { id } =  this.props.match.params
    
    return (
      <div className="clearfix tour-map-single">
		  <PropagateLoader
            css={override}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={this.state.loading}
          />
        <Map center={position} zoom={zoom} ref={this.saveMap} scrollWheelZoom={true}>
    
			<TileLayer
				url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
			/>
			<TileLayer
				url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
			/>
			{
				this.state.isMapInit && this.state.markers.length > 0?
					<Routing map={this.map} markers={this.state.markers}/>
				:''
			}

			<CTMakers places={this.state.places} target={true} />
			<GeoJSON data={areaData} />
		</Map>
		<section className="py-6 bg-gray-100">
			<div className="container">
				<div className="text-center pb-lg-4">
					<p className="subtitle text-secondary">Explore the beauty of Kiel </p>
					{
						tour &&
						<h2 className="mb-5">{tour.title}</h2>
					}
					{
					id == 2 &&
					<a href="/images/tours/tour2_printable.pdf" target="_blank"><strong>Print this map</strong></a>
							
					}
					{
					id == 1 &&
					<a href="/images/tours/tour1_printable.pdf" target="_blank"><strong>Print this map</strong></a>
							
					}
				</div>
				
				{
				tour &&
				<div className="row justify-content-md-center">
					<div className="col-lg-6">
						<div className="place-information">
							<div className="place-info-text" dangerouslySetInnerHTML={{__html: tour.description}} />
							<ul>
								<li>Start Point: {tour.start_point}</li>
								<li>Start Point: {tour.end_point}</li>
								<li>Tour Duration: {tour.duration}</li>
								<li>Highlights : {tour.major_spots}</li>
							</ul>
						</div>
						<div className="clearfix">
							<div className="timeline-item-wrap">
								<h4>Route Places</h4>
								<hr />
							</div>
							<Timeline spots={this.state.spots} />
						</div>
					</div>
					<div className="col-lg-4">
						<Image src={'/images/tours/'+tour.image} alt={tour.title} class="img-fluid" />
					</div>
				</div>
				}
			</div>
		</section>
      </div>
      
    );
  }
}

export default TourMap;