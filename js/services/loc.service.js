import {StorageService} from './storage-service.js';
export const locService = {
	getLocs,
	manageLocation,
	getLocationById,
	removeLocation,
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
