import { mapDataGeoName, mapDataQty } from "./fetchData.js";
import { changeColorOnQtyCircle, changeColorOnQtySidebar } from './changeColorOnQty.js';



export function createGroupCircles(selector, width, height, data) {
	let geoName = mapDataGeoName(data);
	let qty = mapDataQty(data);
	let radiusScale = d3.scaleSqrt().domain([d3.min(qty), d3.max(qty)]).range([5, 30]);

	let circles = d3.select(selector)
		.append("g")
		.attr("class", "groupCircles")
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")")
		.selectAll('.circle')

		.data(data)
		.enter()
		.append("circle")
		.attr("class", function(data, index){
			return 'item'+index;})
		.attr("r", function(d) {
			return radiusScale(d.qty)
		})
		.attr("fill", function(d) {
			return changeColorOnQtyCircle(d.qty)
		})
		.on("click", function(d) {
			changeColorOnQtySidebar(d.qty, document.querySelector('.sidebar'))
			document.querySelector('.sidebar h1').innerHTML = "Location: " + d.geoName;
			if (d.qty <= 1) {
				document.querySelector('.sidebar h2').innerHTML = "Object: " + d.qty;
			} else {
				document.querySelector('.sidebar h2').innerHTML = "Objects: " + d.qty;
			}
		});

	// collection of forces
	// where the circles will go and interact
		d3.forceSimulation()
			.nodes(data)
			.on("tick", function() {
			circles
				.attr("cx", function (d) {
					return d.x
				})
				.attr("cy", function (d) {
					return d.y
				})
		})
			.force("x", d3.forceX(width / 2).strength(0.005))
			.force("y", d3.forceY(width / 2).strength(0.005))
			.force("collide", d3.forceCollide(function(d) {
				return radiusScale(d.qty) + 3
			}))

}