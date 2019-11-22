import { mapData } from './fetchData.js'

export function addToList(url, query) {
	mapData(url, query)
		.then(
			data => {
				data.forEach(item => {
					let select = document.querySelector('#select');
					let option = document.createElement('option')
					option.value = 's'
					option.innerHTML = item.geoName
					select.appendChild(option)
				})
			})
}
