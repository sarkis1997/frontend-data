import { changeColorOnQtyCircle, changeColorOnQtySidebar } from './changeColorOnQty.js';
import { createNodes, createLinks } from './fetchData.js';
import { makeQuery } from "./queries.js";

export async function createFramework(url, d) {

	//pre-defined variables to use
	let width = 800;
	let height = 500;
	let dataqty = d.map(item => { return item.qty });
	let radiusScale = d3.scaleSqrt().domain([d3.min(dataqty), d3.max(dataqty)]).range([5, 35]);

	let links = [{source: d[2], target: d[1]}];
	let childNodes;

	console.log(links)
	let svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'graph')
	//	.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");

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
		.append('link')
		.attr('stroke-width', function(d) {
			return 3;
		})
		.style('stroke', 'red');


	let nodeGroup = d3.select('.nodeGroup');
	let linkGroup = d3.select('.linkGroup');

	nodeGroup
		.selectAll('circle')
		.on('click', function(d) {
			makeNewData(d)
		});

	async function makeNewData(d) {
		let oldData = d;

		childNodes = await createNodes(url, makeQuery(d.geoURI));
		links = childNodes.map(item => { return ({source: d, target: item}) });
		console.log(links)

		redraw(childNodes, links);
	}

	function redraw(childNodes, links) {
		groupTheNodes
			.append('g')
			.attr('class', 'childNodes')
			.selectAll('circle')
			.data(childNodes)
			.enter()
			.append('circle')
			.attr("r", function(d) {
				return radiusScale(d.qty)
			});

	}

	let simulation = d3.forceSimulation()
		.force("link", d3.forceLink(links).distance(20).strength(0.5))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2));

	simulation
		.nodes(d)
		.on('tick', ticked);

	function ticked() {
		link
			.attr('x1', function (d) { return d.source.x })
			.attr('y1', function (d) { return d.source.y })
			.attr('x2', function (d) { return d.target.x })
			.attr('y2', function (d) { return d.target.y });

		node
			.attr('cx', function(d) {
				return d.x;
			})
			.attr('cy', function(d) {
				return d.y;
			})
	}

}




	/*

	let svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height)
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");


	let node = svg.selectAll('.node')
		.data(nodes)
		.enter().append('circle')
		.attr('class', 'node')
		.attr('r', width * 0.03);


	let link = svg.selectAll('.link')
		.data(links)
		.enter().append('line')
		.attr('class', 'link')
		.attr('x1', function (d) { return d.source.x })
		.attr('y1', function (d) { return d.source.y })
		.attr('x2', function (d) { return d.target.x })
		.attr('y2', function (d) { return d.target.y })

	let simulation = d3.forceSimulation()
		.nodes(nodes)
		.on('tick', function() {
			node.attr('cx', function (d) { return d.x; })
				.attr('cy', function (d) { return d.y; })
		})
		.force("charge", d3.forceManyBody())
		.force('link', d3.forceLink(links))
}


	 */