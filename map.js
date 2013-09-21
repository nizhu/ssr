google.maps.visualRefresh = true;
var destLatLng = new google.maps.LatLng(-33.916078, 151.200475);
var map;

function addDestMaker(){
  new google.maps.Marker({
    position: destLatLng,
    map: map,
    title: 'We are here!'
  });
}

function hasSensor(position){
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  var originLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions-panel"));
  var request = {
    origin: originLatLng,
    destination: destLatLng,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
  directionsVisible = true;
}

function initialize() {
  var mapOptions = {
      zoom: 17,
      // minZoom: 10,
      // draggable: false,
      // panControl: true,
      // zoomControl: true,
      center: destLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    addDestMaker(map);

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(hasSensor);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
