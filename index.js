require('dotenv').config();
const {
	leerInput,
	inquirerMenu,
	pausa,
	listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

(async () => {
	const busquedas = new Busquedas();
	let opt;
	do {
		console.clear();
		opt = await inquirerMenu();

		switch (opt) {
			case 1: {
				// Mostrar mensaje
				const lugar = await leerInput('Ciudad');
				// Busquedas
				const lugares = await busquedas.ciudad(lugar);
				// Seleccione
				const idSelect = await listarLugares(lugares);

				if (idSelect === '0') continue;

				const { nombre, lng, lat } = lugares.find(
					lugares => lugares.id === idSelect
				);

				// Guardar en db
				busquedas.agregarHistorial(nombre);

				// Clima
				const { temp, min, max, desc } = await busquedas.climaLugar(lng, lat);

				// Mostrar result
				console.log('\ncity information\n'.green);
				console.log('City: '.green, nombre);
				console.log('Lat: '.green, lat);
				console.log('Lng: '.green, lng);
				console.log('Temp: '.green, temp);
				console.log('Min: '.green, min);
				console.log('Max: '.green, max);
				console.log('Description: '.green, desc);
				break;
			}
			case 2: {
				busquedas.historial.forEach((lugar, i) => {
					console.log(`${busquedas.historial.length - i}: ${lugar}`.green);
				});
				break;
			}
			default:
				break;
		}

		await pausa();
	} while (opt !== 0);
})();
