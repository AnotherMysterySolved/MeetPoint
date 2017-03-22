"use strict";

$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWgY0ASwb81g1E0AVT5pvTR1DiDtXx1c4",
    authDomain: "meetpoint-8e687.firebaseapp.com",
    databaseURL: "https://meetpoint-8e687.firebaseio.com",
    storageBucket: "meetpoint-8e687.appspot.com",
    messagingSenderId: "800664455878"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var leadsRef = database.ref();
  leadsRef.on('value', function(snapshot) {
    $('#user-data').empty();
    snapshot.forEach(function(childSnapshot) {
    var row = drawRows(childSnapshot);
    $("#user-data").append(row);
    });
});

$("#submit-btn").on("click", function(event) {
  var name = $("#name").val().trim();
  var startLocation = $("#startLocation").val().trim();

  var url = "https://maps.googleapis.com/maps/api/geocode/json";
  var key = "AIzaSyBDX_eXekJVgS9WjggIhZRQbvNXlbFQDsc";
  var address = $("#startLocation").val();

  url += "?" + $.param({
        "api_key": key,
        "address": address
      });

  $.ajax({
    url: url,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var formattedAddress = response.results[0].formatted_address;
    var latitude = response.results[0].geometry.location.lat;
    var longitude = response.results[0].geometry.location.lng;
    var coordinates = "(" + latitude + ", " + longitude + ")";

    database.ref().push({
      name: name,
      startLocation: startLocation,
      latitude: latitude,
      longitude: longitude
    });

    $("form").trigger("reset");
})

})

})

function getLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
   } else {
       $('#startLocation').val($('#startLocation').val() + "Geolocation is not supported by this browser.");
   }
}

function showPosition(position) {
   var currentLat = position.coords.latitude;
   var currentLng = position.coords.longitude;

   var geocoder  = new google.maps.Geocoder();             // create a geocoder object
   var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);    // turn coordinates into an object          
   geocoder.geocode({'latLng': location}, function (results, status) {
   if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
      var add=results[0].formatted_address;         // if address found, pass to processing function
      $('#startLocation').val($('#startLocation').val() + add);
      console.log("add: " + add);
    }
  })
 }


function drawRows(childSnapshot) {
  var row = $("<tr class='new-row'>"); //New row in table to store the items below
      row.append("<td class='added-name' style='width: 390px !important'>" + childSnapshot.val().name + "</td>"); //User name
      row.append("<td class='added-location'>" + childSnapshot.val().startLocation + "</td>"); //User location
  return row;
}

function currentToAddress(startLocation) {

}