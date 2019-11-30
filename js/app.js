import { url_NMVW07, makeQuery, URI } from './utils/queries.js';
import { mapData } from './utils/fetchData.js';
import { createGroupCircles } from './utils/d3Functions.js';

export async function createViz(url, query) {
	createGroupCircles(1000, 750, await mapData(url, query));
}

createViz(url_NMVW07, makeQuery(URI));
