
// Add the following in the <head> of your HTML to link to Google's Places Library:
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDX_eXekJVgS9WjggIhZRQbvNXlbFQDsc&libraries=places"></script>
//
// Add the following in the <body> of your HTML to get the input box for Google's autocomplete:
// <div id="locationField">
//   <input id="autocomplete" placeholder="Enter your address" type="text"></input>
// </div>

"use strict";

$(document).ready(function() {


// Google autocomplete function for HTML element "#autocomplete"
  function init() {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }
  google.maps.event.addDomListener(window, 'load', init);

});