"use strict";
// Add the following in the <head> of your HTML to link to Google's Places Library:
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDX_eXekJVgS9WjggIhZRQbvNXlbFQDsc&libraries=places"></script>
//
// Add the following in the <body> of your HTML to get the input box for Google's autocomplete:
// <div id="locationField">
//   <input id="autocomplete" placeholder="Enter your address" type="text"></input>
// </div>


// Google autocomplete function for HTML element "#autocomplete"
  function init() {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }
  google.maps.event.addDomListener(window, 'load', init);


// Loading Google map
  var atlanta = {lat: 33.7489954, lng: -84.3879824};

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: atlanta
  });

  function createMarker(lat, lng) {
    
    var marker = new google.maps.Marker({
      position: atlanta,
      map: map
    });
  }

  createMarker(atlanta.lat, atlanta.lng)

