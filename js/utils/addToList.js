import { mapData } from './fetchData.js'
import { createViz } from '../app.js'
import { url_NMVW07, makeQuery } from '../utils/queries.js';

export function addToList(url, query) {
	mapData(url, query)
		.then(
			data => {
				data.forEach(item => {
					let select = document.querySelector('#select');
					select.addEventListener('change', checkSelection)
					let option = document.createElement('option')
					option.value = item.geoURI
					option.innerHTML = item.geoName;
					select.appendChild(option)
				})
			})
}

function checkSelection() {
	var selectedURI = this.options[select.selectedIndex].value;
	createViz(url_NMVW07, makeQuery(selectedURI))
}