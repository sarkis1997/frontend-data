//this file contains all the queries which I import in my fetch function.
export const url_NMVW07 = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-07/sparql";

export const herkomst = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  ?cho dct:spatial ?herkomstSub .
  
} GROUP BY ?herkomstSuper ?herkomstSuperLabel
`;

export const subHerkomst = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  <https://hdl.handle.net/20.500.11840/termmaster8401> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  ?cho dct:spatial ?herkomstSub .
  
} GROUP BY ?herkomstSuper ?herkomstSuperLabel
`;

