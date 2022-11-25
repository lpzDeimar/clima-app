const fs = require('fs');

const fetch = require('node-fetch');
const URL_BASE = lugar =>
	`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`;
const URL_TEMP = 'https://api.openweathermap.org/data/2.5/weather?';

class Busquedas {
	historial = [];
	dbPath = './db/database.json';

	constructor() {
		this.leerDB();
	}

	get paramsMapbox() {
		const params = new URLSearchParams({
			access_token: process.env.MAPBOX_KEY,
			language: 'es',
		});
		return params.toString();
	}

	paramsTemp(lon, lat) {
		const params = new URLSearchParams({
			lat,
			lon,
			appid: process.env.OPENWEATHER_KEY,
			units: 'metric',
			lang: 'es',
		});
		return params.toString();
	}

	async ciudad(lugar = '') {
		try {
			const res = await fetch(`${URL_BASE(lugar) + this.paramsMapbox}`);
			const resp = await res.json();

			return resp.features.map(item => ({
				id: item.id,
				nombre: item.place_name,
				lng: item.center[0],
				lat: item.center[1],
			}));
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	async climaLugar(lon, lat) {
		try {
			const res = await fetch(`${URL_TEMP + this.paramsTemp(lon, lat)}`);
			const resp = await res.json();

			return {
				desc: resp.weather[0].description,
				min: resp.main.temp_min,
				max: resp.main.temp_max,
				temp: resp.main.temp,
			};
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	agregarHistorial(lugar = '') {
		// prevenir duplicado
		this.historial = Array.from(new Set([...this.historial, lugar]));
		this.guardarDB();
	}

	guardarDB() {
		const payload = {
			historial: this.historial,
		};

		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}

	leerDB() {
		if (!fs.existsSync(this.dbPath)) {
			return;
		}
		this.historial = this.historial.splice(0, 5);
		this.historial = JSON.parse(
			fs.readFileSync(this.dbPath, {
				encoding: 'utf8',
			})
		).historial;
	}
}

module.exports = Busquedas;
