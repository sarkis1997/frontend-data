import { mapDataQty } from "./fetchData.js";
import { changeColorOnQtyCircle, changeColorOnQtySidebar } from './changeColorOnQty.js';



export function createGroupCircles(selector, width, height, data) {
	let qty = mapDataQty(data);
	let radiusScale = d3.scaleSqrt().domain([d3.min(qty), d3.max(qty)]).range([5, 35]);

	d3.selectAll('circle')
		.data(data)
		.exit().remove();

	let circles = d3.select(selector)

		.selectAll('circle')
		.data(data)
		.enter()
		.append("circle")
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")")
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
			.force("x", d3.forceX(width / 2).strength(0.001))
			.force("y", d3.forceY(width / 2).strength(0.001))
			.force("collide", d3.forceCollide(function(d) {
				return radiusScale(d.qty) + 3
			}))
}