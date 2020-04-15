import React, { Component, createRef } from "react";
import L from 'leaflet'
import { Map, TileLayer, withLeaflet, MapControl, Popup, Marker, Polyline, Pane, GeoJSON } from "react-leaflet";
import ctKielApi from '../../helpers/ctKielApi'
import {areaData} from './../../helpers/areaData';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Image from '../../helpers/Image'
import CTMakers from './../../helpers/CTMakers'

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



class Places extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      lat: 54.34,
      lng: 10.13,
      zoom: 11,
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
    
    const url = ctKielApi.URL + '/places'

    axios.get(url).then(response => response.data)
    .then((data) => {
        this.setState({
            places: data.places,
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
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
      <div className="clearfix">
        <PropagateLoader
            css={override}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={this.state.loading}
          />

        <Map center={position} className="place-maps" zoom={zoom} minZoom={10} maxZoom={30}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            />

            <TileLayer
              url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            />

            <CTMakers places={this.state.places} />
            
            <GeoJSON data={areaData} />
        </Map>
        <section className="py-6 bg-gray-100 place-list">
            <div className="container">
                <div className="text-center pb-lg-4">
                    <p className="subtitle text-secondary">Explore the beauty of Kiel </p>
                    <h2 className="mb-5">Places of Kiel</h2>
                </div>
                <div className="row">
                  {
                    this.state.places &&
                    this.state.places.map((x) => {

                      const link = '/place/'+x.id
                      
                      return(
                        <div className="col-lg-4 mb-3 mb-lg-0 text-center">
                          <div className="place_grid_item">
                              <div className="place_grid_item_post_thumbnail">
                              <Link to={link} title={x.title}>
                                <Image src={'/images/places/'+x.images} alt={x.title} class="place_grid_item_inner_image img-fluid" />
                                 
                              </Link>
                              </div>
                              <div className="place_grid_item_inner_content">
                                  <h5 className="place_grid_item_post_title">{x.title}</h5>
                                  <div className="place_grid_item_post_excerpt">{x.title}</div>
                              </div>
                          </div>
                      </div>
                      )
                    })
                  }
                  </div>
            </div>
        </section>
      </div>
    );
  }
}

export default Places;