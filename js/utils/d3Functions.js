import { changeColorOnQtyCircle, changeColorOnQtySidebar } from './changeColorOnQty.js';
import { createNodes, createLinks } from './fetchData.js';
import { makeQuery } from "./queries.js";

export async function createFramework(url, d) {

	//pre-defined variables to use
	let width = 800;
	let height = 500;
	let dataqty = d.map(item => { return item.qty });
	let radiusScale = d3.scaleSqrt().domain([d3.min(dataqty), d3.max(dataqty)]).range([5, 35]);

	let links = [];

	let childNodes;

	let nodes;

	let simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(20).strength(0.5))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2))
		.on('tick', ticked);


	(function startTick() {
		nodes = d;
		simulation
			.nodes(nodes)
			.on('tick', ticked)
	})();

	let svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'graph')

	let allNodes = d3.select('.graph');

	let groupTheNodes = allNodes
		.append('g')
		.attr('class', 'allNodes');

	let node = groupTheNodes
		.append('g')
		.attr('class', 'nodeGroup')
		.selectAll('circle')
		.data(d)
		.enter()
		.append('circle')
		.attr("r", function(d) {
			return radiusScale(d.qty)
		});



	let link = svg
		.append('g')
		.attr('class', 'linkGroup')
		.selectAll('line')
		.data(links)
		.enter()
		.append('line')
		.attr('stroke-width', function(d) {
			return 3;
		})
		.style('stroke', 'red');


	let nodeGroup = d3.select('.nodeGroup');
	let linkGroup = d3.select('.linkGroup');

	let children = d3.selectAll('childNodes')

	nodeGroup
		.selectAll('circle')
		.on('click', function(d) {
			makeNewData(d)
		});

	async function makeNewData(d) {

		childNodes = await createNodes(url, makeQuery(d.geoURI));
		links = childNodes.map(item => { return ({source: d, target: item}) });

		link = d3.selectAll('.linkGroup')
			.selectAll('line')
			.data(links)
			.enter()
			.merge(link)
			.append('line')
			.attr('stroke-width', 2)
			.style('stroke', 'green');

		console.log(links)

		simulation
			.on('tick', ticked);

		redraw(childNodes, links);
	}

	function redraw(childNodes, links) {

		nodes = childNodes;

		nodeGroup
			.selectAll('circle')
			.data(childNodes)
			.enter()
			.append('circle')
			.attr("r", function(d) {
				return radiusScale(d.qty)
			});
		simulation
			.nodes(nodes)
			.on('tick', ticked)
	}

	function ticked() {
		link
			.attr('x1', function (d) { return d.source.x })
			.attr('y1', function (d) { return d.source.y })
			.attr('x2', function (d) { return d.target.x })
			.attr('y2', function (d) { return d.target.y });

		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })

	}
}


////// verder kijken naar de update pattern