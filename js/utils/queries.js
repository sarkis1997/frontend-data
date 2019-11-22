import { mapData } from './fetchData.js'
export const url_NMVW07 = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";
export let URI = `https://hdl.handle.net/20.500.11840/termmaster2`;

export function makeQuery(URI) { return `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  <${URI}> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  ?cho dct:spatial ?herkomstSub .
  
} GROUP BY ?herkomstSuper ?herkomstSuperLabel
`
}

function checkURIchild(url, query) {
	mapData(url, query)
		.then(
			data => {
					data.forEach(
						item => {
							if (item.qty < 1) {
								return
							}

							console.log(item)
							URI = item.geoURI;
							item.nestedGeo = mapData(url, makeQuery(URI))
						}
					)
			}
		)
}



checkURIchild(url_NMVW07, makeQuery(URI));











