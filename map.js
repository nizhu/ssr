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
  var originLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  directionsDisplay.setMap(map);
  document.getElementById('directions-header').style.display = "block"
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
      center: destLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    addDestMaker(map);

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(hasSensor);
  } else {
    document.getElementById("directions-panel").appendChild("<p>Failed to locate position</p>");
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
