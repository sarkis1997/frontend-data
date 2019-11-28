# frontend-data 
Interactive data visualisation

## NMVW's collection origin

## Install
1. Run the terminal
2. `git clone https://github.com/sarkis1997/frontend-data`
3. Open the complete file in your code editor of choice.

## The assignment
The assignment was to make a interactive data visualisation which uses external data. \
The visualisation should be made with D3 and plain HTML, CSS and JavaScript.
    
## Concept
I came with the idea to make something like a collapsible force layout (https://bl.ocks.org/mbostock/1062288). The idea is to collect a type of collection and to show the geolocations of it. Each circle will stand for a continent and the size of it will stand for the amount. I've chosen for this style of data visualization, because I think that the interaction fits good in my concept. And it's also scalable. If I would like I could bring the whole collection in map. First I'll bring up the type of object and after the geolocation with the size.

<img src="https://github.com/sarkis1997/functional-programming/blob/master/src/assets/concept.png">

## Target audience
This app is for the client.\
The client knows what kind of objects they have and from where, but it's never been visualised.\
This data visualisations brings better insight in the collection they own.

## Features
* Sidebar which showes the geolocation name and the quantity of object that it contains.
* Circles that visualise the quantity of object with its size and color.
* Click on circles to show its metadata in the sidebar.
* Legend that shows what each color stands for.
* Filter and update visualisation by list choice.
* IN PROGRESS (collapsable child nodes).

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

  THE `{URI}` is set dynamically
  
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
  ```
  
</details>

## Interaction
* Filtering by list choice
* (IN PROGRESS) click on circle to show childs.

## Functional programming
[Go to code](https://github.com/sarkis1997/frontend-data/wiki/functional-programming)

## License
<a href="https://github.com/sarkis1997/functional-programming/blob/master/LICENSE">MIT</a> @ Sarkis Moeradjan
