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
			data => {
				return data.map(
					item => {
						let geoName = item.herkomstSuperLabel.value;
						let geoURI = item.herkomstSuper.value;
						let qty = item.choCount.value;
						return {
							geoName,
							geoURI,
							qty
						}
					}
					)
			})
}

export let links = [];
export let nodes = [];

function createLinks(url, query) {
	return mapData(url, query)
		.then(
			data => {
				data.map(
					item => {
						nodes.push({id: item.geoName})
						let parentNode = item.geoName;
						let childNodes = mapData(url, makeQuery(item.geoURI))
							.then(
								data => {
									return data.map(
										item => {
											nodes.push({id: item.geoName})
											links.push({source: parentNode, target: item.geoName})
										}
									)
								}
							)
					}
				)
			}
		)

	console.log(nodes)
}

import { url_NMVW07, makeQuery, URI } from './queries.js';

createLinks(url_NMVW07, makeQuery(URI));

