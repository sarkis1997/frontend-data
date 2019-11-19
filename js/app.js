import { url_NMVW07, herkomst, subHerkomst } from './utils/queries.js';
import { mapData } from './utils/fetchData.js';
import { createSVG, createCircles } from './utils/d3Functions.js';

function createViz(url, query) {
	createSVG('.chart',1000, 750);

	mapData(url, query).then(data => {
		createCircles('.groupCircles', '.circle', data)
	})

}

createViz(url_NMVW07, herkomst);
createViz(url_NMVW07, subHerkomst);
