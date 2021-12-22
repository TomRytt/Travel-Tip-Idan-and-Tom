import {StorageService} from './storage-service.js';
import {mapService} from './map.service.js';

export const locService = {
	getLocs,
	manageLocation,
	getLocationById,
	removeLocation,
	addLocation,
};

const LOCATION_KEY = 'userLocationsDB';
const locs = StorageService.loadFromStorage(LOCATION_KEY) || [
	{name: 'Greatplace', lat: 32.047104, lng: 34.832384},
	{name: 'Neveragain', lat: 32.047201, lng: 34.832581},
];

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function manageLocation(location) {
	locs.push(location);
	StorageService.saveToStorage(LOCATION_KEY, locs);
}

function getLocationById(locationId) {
	const location = locs.find((location) => {
		return locationId === location.id;
	});
	return location;
}

function removeLocation(locationId) {
	var locationIdx = locs.findIndex((location) => {
		if (locationId === location.id) return location;
	});
	locs.splice(locationIdx, 1);
	StorageService.saveToStorage(LOCATION_KEY, locs);
}

function addLocation(name) {
	let pos = mapService.getLngAndLat();
	var currLocation = {
		id: 'id' + Math.random().toString(16).slice(2),
		lat: pos.lat,
		lng: pos.lng,
		name,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	locService.manageLocation(currLocation);
	return currLocation;
}
