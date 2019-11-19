import { url_NMVW07, herkomst } from './utils/queries.js';
import { mapData } from './utils/fetchData.js';
import { createSVG, createCircles } from './utils/d3Functions.js';

function createViz(url, query) {
	let data;


	data = mapData(url, query)

	createSVG('.chart',1000, 750);
	console.log(data)

	createCircles('.groupCircles', '.circle', data)

}

createViz(url_NMVW07, herkomst);
