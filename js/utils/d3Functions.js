import { changeColorOnQtyCircle, changeColorOnQtySidebar } from './changeColorOnQty.js';
import { links, nodes } from './fetchData.js'

export async function createGroupCircles(data) {

	let width= 640;
	let height= 480;

	console.log(links);
	console.log(nodes);

	let svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height)
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");

	let link = svg.selectAll('.link')
		.data(links)
		.enter().append('line')
		.attr('class', 'link')
		.attr('x1', function (d) { return d.source.x })
		.attr('y1', function (d) { return d.source.y })
		.attr('x2', function (d) { return d.target.x })
		.attr('y2', function (d) { return d.target.y })

	let node = svg.selectAll('.node')
		.data(nodes)
		.enter().append('circle')
		.attr('class', 'node')
		.attr('r', width * 0.03);

	let simulation = d3.forceSimulation()
		.nodes(nodes)
		.on('tick', function() {
			node.attr('cx', function (d) { return d.x; })
				.attr('cy', function (d) { return d.y; })
		})



}