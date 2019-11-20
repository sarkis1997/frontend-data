import { url_NMVW07, herkomst, subHerkomst } from './utils/queries.js';
import { mapDataQty, mapDataGeoName } from './utils/fetchData.js';
import { createSVG, createCircles } from './utils/d3Functions.js';

async function createViz(url, query) {

	createSVG('.chart', 1000, 750);
	let qty = await mapDataQty(url, query);
	console.log(qty)
	createCircles('.groupCircles', '.circle', qty)

}

createViz(url_NMVW07, herkomst);
createViz(url_NMVW07, subHerkomst);
