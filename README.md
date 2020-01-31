# NMVW's collection origin
<img src="https://github.com/sarkis1997/frontend-data/blob/master/media/screenshot_d3.png">

## Target audience
This app is for the client.\
The client knows what kind of objects they have and from where, but it's never been visualised.\
This data visualisations brings better insight in the collection they own.

## Install
1. Run the terminal
2. `git clone https://github.com/sarkis1997/frontend-data`
3. Open the complete file in your code editor of choice.

## Concept
I came with the idea to make something like a collapsible force layout (https://bl.ocks.org/mbostock/1062288). The idea is to collect a type of collection and to show the geolocations of it. Each circle will stand for a continent and the size of it will stand for the amount. I've chosen for this style of data visualization, because I think that the interaction fits good in my concept. And it's also scalable. If I would like I could bring the whole collection in map. First I'll bring up the type of object and after the geolocation with the size. If the geolocation sublevel items, it will be clickable. On click the sublevels will be shown. This way the user can see in a glance where most of the objects come from.

## Features
* Circles that visualise the quantity of objects with its size and color.
* Hover over circles to show its metadata.
* Legend that shows what each color stands for.
* Reset button to reset the visualisation.
* Clickable nodes with toggle function.
* Draggable nodes

## API
The API is a dataset of around 700.000 objects of the NMVW. 
I have fetched all the objects.

To be more specific, I have fetched on geographical location starting on the top level and going down levels untill the lowest level. I just need to count the amount of object per geographical location.

* [Geographical location](https://collectie.wereldculturen.nl/thesaurus/?query=search=purl=[termmaster2]&showtype=record#/query/662d3ba5-da86-4dd1-a76f-90863ec0a547)
* Objects

### Queries
<details>
  <summary>show</summary>
  
  ## Query for fetching the top geolocations and their object quantity
  `{URI}` is a variable which is used to pass in child notes URI and fetch its data.
  ```javascript
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
  ```
  
</details>

## Update pattern
[Go to 'Update pattern' wiki](https://github.com/sarkis1997/frontend-data/wiki/Update-Pattern)

## Data transformation code
[Go to 'Transforming data' wiki](https://github.com/sarkis1997/frontend-data/wiki/Transforming-data)

## License
<a href="https://github.com/sarkis1997/frontend-data/blob/master/LICENSE">MIT</a> @ Sarkis Moeradjan
