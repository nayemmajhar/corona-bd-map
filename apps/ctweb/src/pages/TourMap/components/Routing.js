import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper"
import { withLeaflet } from "react-leaflet";
import "./MovingMarker"
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

    const routeMarker = L.icon({
      iconUrl: '/images/checkpoint.png',
      iconSize: [0, 0],
    });
    
    const cusTomIcon = L.icon({
      iconUrl: '/images/bikeIconMarker.png',
      iconSize: [25, 25],
    });

    const {map, markers} = this.props;
    console.log("TheKing--> createLeafLetElement", markers);

    let wapointList = [];
    markers.map(x => wapointList.push(L.latLng(x.lat, x.lng)));

    var myMovingMarker = undefined;
    
    let leafletElement = new L.Routing.Control({
      waypoints: wapointList,
      createMarker: function(i, point, n){

        return L.marker(point.latLng, {
               draggable: true,
               bounceOnAdd: true,
               icon: routeMarker
          })},
        
			router: new L.Routing.GraphHopper( ctKielApi.graphHopperKey , {
				urlParameters: {
				vehicle: 'bike'
				}
      }),
      lineOptions: {
        styles: [
          {
            color: "#ed4f00",
            opacity: .8,
            weight: 5
          }
        ]
      },
      

      addWaypoints: true,
      draggableWaypoints: true,
      fitSelectedRoutes: false,
      showAlternatives: false,
      routeWhileDragging: true,
      snakingSpeed: 200,
      animate:true,
    }).addTo(map.leafletElement);

    leafletElement.on('routesfound', function (e) {
      let distance = e.routes[0].summary.totalDistance;
      console.log('routing distance: ' + distance);
      console.log('look inside: ', e.routes);

      

      

      if(myMovingMarker && myMovingMarker.isRunning())
      {
         //do nothing
      }
      else{

        myMovingMarker = L.Marker.movingMarker([wapointList[0],wapointList[0]],[1], {icon: cusTomIcon});
        e.routes[0].coordinates.map(x =>{ myMovingMarker.addLatLng(x, [50]); });
        myMovingMarker.addTo(map.leafletElement);

        
        
        //var myMovingMarker2 = L.Marker.movingMarker([wapointList[1],wapointList[2]],[20000]).addTo(map.leafletElement);

        myMovingMarker.start();
      }

      
      
    });

    console.log("look at leaflet", leafletElement);
    console.log("TheKing--> Done");


    //var route = L.layerGroup([
    //  L.marker(wapointList[0]),
    //  L.polyline([wapointList[0], wapointList[3]]),
    //  L.marker(wapointList[3])
    //], { snakingPause: 200 });
    //console.log(route);
    //route.addTo(map.leafletElement).snakeIn();

    


    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
