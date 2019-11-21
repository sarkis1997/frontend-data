import { url_NMVW07, makeQuery } from './utils/queries.js';
import { mapData, mapDataGeoName, mapDataQty } from './utils/fetchData.js';
import { createGroupCircles,  } from './utils/d3Functions.js';

async function createViz(url, query) {

	function radiusScale() {
		return d3.scaleSqrt().domain([d3.min(qtyList), d3.max(qtyList)]).range([5, 50]);
	}

	createGroupCircles('.chart', 1000, 750, await mapData(url, query));
}

//createViz(url_NMVW07, makeQuery(URI));
