import { url_NMVW07, herkomst, subHerkomst } from './utils/queries.js';
import { mapData } from './utils/fetchData.js';
import { createGroupCircles,  } from './utils/d3Functions.js';

async function createViz(url, query) {
	createGroupCircles('.chart', 1000, 750, await mapData(url, query));
}

createViz(url_NMVW07, herkomst);
createViz(url_NMVW07, subHerkomst);
