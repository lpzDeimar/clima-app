const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// const main = async () => {
// 	const texto = await leerInput();
// 	console.log(texto);
// };

// main();

(async () => {
	const busquedas = new Busquedas();
	let opt;
	do {
		opt = await inquirerMenu();

		switch (opt) {
			case 1: {
				// Mostrar mensaje

				const lugar = await leerInput('Ciudad');
				await busquedas.ciudad(lugar);

				// Busquedas
				// Seleccione
				// Clima
				// Mostrar result
				console.log('\ncity information\n'.green);
				console.log('City: \n'.gray);
				console.log('Lat: \n'.gray);
				console.log('Lng: \n'.gray);
				console.log('Temp: \n'.gray);
				console.log('Min: \n'.gray);
				console.log('Max: \n'.gray);
				break;
			}

			default:
				break;
		}

		await pausa();
	} while (opt !== 0);
})();
