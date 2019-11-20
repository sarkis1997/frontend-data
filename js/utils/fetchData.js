//function for fetching complete dataset with query
function fetchData(url, query) {
	return fetch(url+"?query="+ encodeURIComponent(query) +"&format=json")
		.then(response => response.json(response))
		.then(
			data => {
				return data.results.bindings;
			})
}

//function for mapping data objects into geoName and Qty and returning that as item
export function mapData(url, query) {
	return fetchData(url, query)
		.then(
			// result is the promiseValue Array
			data => {
				//mapping through the array and returning for each item the geoName and qty
				return data.map(
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

// function to receive the quantity of each item
export function mapDataQty(url, query) {
	return fetchData(url, query)
		.then(
			// result is the promiseValue Array
			data => {
				//mapping through the array and returning for each item the qty
				return data.map(
					item => {
						return item.choCount.value;
					}
				)
			})
}

// function to receive the geo name of each item
export function mapDataGeoName(url, query) {
	return fetchData(url, query)
		.then(
			// result is the promiseValue Array
			data => {
				//mapping through the array and returning for each item the geoName
				return data.map(
					item => {
						return item.geoName.value;
					}
				)
			})
}


