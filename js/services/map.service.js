// const API_KEY = 'AIzaSyC3LI_ZNfIbwBoylgUCgrmHlQB6dTCHHyg'

import {API_KEY} from './api.js';

export const mapService = {
	initMap,
	addMarker,
	panTo,
	clickLoc,
	getLngAndLat,
};

var gMap;
var gLat;
var gLng;

function initMap(lat = 32.0749831, lng = 34.9120554) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: {lat, lng},
			zoom: 15,
		});
		google.maps.event.addListener(gMap, 'click', function (event) {
			let elModal = document.querySelector('.modal');
			elModal.classList.add('open');
			var elBtn = document.querySelector('.submitLocationBtn');
			gLat = event.latLng.lat();
			gLng = event.latLng.lng();
			getLngAndLat(gLat, gLng);
			elBtn.addEventListener('click', onAddLocation);
		});
	});
}

function getLngAndLat() {
	let pos = {lat: gLat, lng: gLng};
	return pos;
}

function addMarker(loc) {
	var marker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!',
	});
	return marker;
}

function clickLoc(loc) {}

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}

// function onDone() {
// 	let pos = mapService.getLngAndLat();
// 	let name = document.querySelector('.modalText').value;
// 	var currLocation = {
// 		id: 'id' + Math.random().toString(16).slice(2),
// 		lat: pos.lat,
// 		lng: pos.lng,
// 		name: name,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// 	locService.manageLocation(currLocation);
// 	onCloseModal();
// }
