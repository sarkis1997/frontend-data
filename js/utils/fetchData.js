function fetchData(url, query) {
	return fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
		.then(response => response.json(response))
		.then(
			data => {
				return data.results.bindings;
			})
}

export function mapData(url, query) {
	return fetchData(url, query)
		.then(
			// result is the promiseValue Array
			result => {
				//mapping through the array and returning for each item the geoName and qty
				result.map(
					item => {
						let geoName = item.herkomstSuperLabel.value;
						let qty = item.choCount.value;
						return {
							geoName,
							qty
						}
					}
				)
			})
}