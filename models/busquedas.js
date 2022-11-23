const axios = require('axios');

class Busquedas {
	historial = ['Madrid', 'San jose', 'Bogota'];

	constructor() {
		// TODO: leer DB si existe
	}

	async ciudad(lugar = '') {
		// Pericón http
		// console.log('ciudad: ' + lugar);

		try {
			const resp = await axios.get(
				'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today'
			);
			console.log(resp.data);
			return []; // Retornar las ciudades que coinciden
		} catch (error) {
			return [];
		}
	}
}

module.exports = Busquedas;
