import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper"
import { withLeaflet } from "react-leaflet";
import ctKielApi from "./../../../helpers/ctKielApi"

class Routing extends MapLayer {


  componentWillReceiveProps(newProps){
    console.log("inside componentWillRecieveProps ", newProps);
  }

  updateLeafletElement(){
    console.log("TheKing--> updateLeafletElement ", this.props);
    console.log("TheKing--> updateLeafletElement ", this);
  }

  createLeafletElement() {
    
    const {map, markers} = this.props;
    console.log("TheKing--> createLeafLetElement", markers);

    let wapointList = [];
    markers.map(x => wapointList.push(L.latLng(x.lat, x.lng)));
    
    let leafletElement = new L.Routing.Control({
			waypoints: wapointList,
			router: new L.Routing.GraphHopper( ctKielApi.graphHopperKey , {
				urlParameters: {
				vehicle: 'bike'
				}
      }),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: true,
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: false,
    }).addTo(map.leafletElement);

    

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
