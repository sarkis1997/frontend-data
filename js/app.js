import { url_NMVW07, herkomst } from './utils/queries.js';
import { mapData } from './utils/fetchData.js';
import { createSVG, createCircles } from './utils/d3Functions.js';

			createSVG('.chart',1000, 750)


mapData(url_NMVW07, herkomst);