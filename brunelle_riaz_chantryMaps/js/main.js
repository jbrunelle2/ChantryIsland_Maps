(function() {
		"use strict";
	var map = new google.maps.Map(document.querySelector('.map-wrapper')), 
	preloader = document.querySelector('.preload-wrapper'),
	
	//ImportthegeocodeAPI
	geocoder = new google.maps.Geocoder(),
	geocodeButton = document.querySelector('.geocode'),
	
	//directionsdisplay
	directionsService = new google.maps.DirectionsService(),
	directionsDisplay, 
	locations = [],
	
	marker;
	
	
	 var image = 'images/marker_1.png';
        var chantryMarker = new google.maps.Marker({
          position: {lat: 44.499911, lng: -81.373562},
          map: map,
          icon: image
        });
	function initMap(position) {
		//save location
		locations[0] = { lat: position.coords.latitude, lng: position.coords.longitude };
		
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
		map.setZoom(14);

			marker = new google.maps.Marker({
			position : { lat: position.coords.latitude, lng: position.coords.longitude },
			map: map,
			title: "Map Marker"
		});
		preloader.classList.add('hide-preloader');
	
	}
	
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	} else {
		console.log('An error has occured, please try again later or contact the administrator.');
	}

	function handleError(){
		console.log('An error has occured, please try again later or contact the administrator.');
	}
	
	function codeAddress(){
		var address = document.querySelector('.address').value;
		
		geocoder.geocode({ 'address' : address}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK){
				//push location into array
				locations[1] = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
				
				map.setCenter(results[0].geometry.location);
				
				if(marker) {
					marker.setMap(null);
					
					marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
						
						});
				
				
						calcRoute(results[0].geometry.location);
				}else{
					console.log('Geocode was not successful for the following reason: ', status);
					}
				}
		});
		
	}
	
	function calcRoute(codedLoc) {
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: 'DRIVING'
		};
		
		directionsService.route(request, function(response, status) {
			if (status == 'OK') {
				directionsDisplay.setDirections(response);
				}
			});
		}
	geocodeButton.addEventListener('click', codeAddress, false);
	
	
	//This
	
	
	//figure out how to make waypoints, draggable route, build upon with API reference.
	
	//initMap();
	//call that shit
	
})();