"use strict";
// Add the following in the <body> of your HTML to get the input box for Google's autocomplete:
//
// <div id="locationField">
//   <input id="autocomplete" placeholder="Enter your address" type="text"></input>
// </div>

$(document).ready(function() {


// Google autocomplete function for HTML element "#autocomplete"
  function init() {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }
  google.maps.event.addDomListener(window, 'load', init);

});