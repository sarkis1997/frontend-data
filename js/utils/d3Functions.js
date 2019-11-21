import { mapDataGeoName, mapDataQty } from "./fetchData.js";
import { changeColorOnQtySidebar, changeColorOnQtyCircle } from './changeColorOnQty.js';


export function createGroupCircles(selector, width, height, data) {
	let geoName = mapDataGeoName(data);
	let qty = mapDataQty(data);
	let radiusScale = d3.scaleSqrt().domain(d3.extent(qty)).range([5, 30]);

	d3.select(selector)
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

}