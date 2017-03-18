// JavaScript Document
(function() {
		"use strict";
	var map = new google.maps.Map(document.querySelector('.map-wrapper')), 
	preloader = document.querySelector('.preload-wrapper'),
	
	//ImportthegeocodeAPI
	geocoder = new google.maps.Geocoder(),
	geocodeButton = document.querySelector('.geocode'),
	
	//Distance Matrix
	distanceService = new google.maps.DistanceMatrixService(),
		
	//directionsdisplay
	directionsService = new google.maps.DirectionsService(),
	directionsDisplay, 
	locations = [],
	image = '../images/marker_1.png',
	marker;
	
	

	function initMap(position) {
		//save location
		locations[0] = { lat: position.coords.latitude, lng: position.coords.longitude };
		
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		
		map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
		map.setZoom(14);
		
		marker = new google.maps.Marker({
		position : { lat: position.coords.latitude, lng: position.coords.longitude },
		map: map,			title: "Map Marker",
		//icon: image,
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
						position: results[0].geometry.location,
						//icon: image,
						});
				
				
						calcRoute(results[0].geometry.location);
				}else{
					console.log('Geocode was not successful for the following reason: ', status);
					}
				}
		});
		
	}
	
	function calcRoute() {
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: 'DRIVING'
		};
		
		directionsService.route(request, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
				}
			});
		}
	//Distance Matrix
	
	distanceService.getDistanceMatrix({
		origin: locations[0],
		destination: locations[1],
		travelMode: 'DRIVING',
	}, function(response, status){

		if (status !=='OK'){
			alert('Error: ' + status);
		} else {
			var outputDiv = document.querySelector('.output');
			outputDiv.innerHTML = '';
			outputDiv.innerHTML += response;
		}

	}
	);
	
	geocodeButton.addEventListener('click', codeAddress, false);
	
})();