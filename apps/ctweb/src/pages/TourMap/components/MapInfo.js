import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";

class MapInfo extends MapControl {
  constructor(props, context) {
    super(props);
    props.leaflet.map.addEventListener("mousemove", ev => {
      this.panelDiv.innerHTML = `<h2><span>Lat: ${ev.latlng.lat.toFixed(
        4
      )}</span>&nbsp;<span>Lng: ${ev.latlng.lng.toFixed(4)}</span></h2>`;
      console.log(this.panelDiv.innerHTML);
    });
  }

  createLeafletElement(opts) {
    const dir = window.MQ.routing.directions();
    dir.route({
      locations: ["Hyderabad", "Tirupati", "Chennai"]
    });
    return () =>
      window.MQ.routing.routeLayer({
        directions: dir,
        fitBounds: true
      });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(MapInfo);
