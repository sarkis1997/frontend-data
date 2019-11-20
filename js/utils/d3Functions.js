export function createGroupCircles(selector, width, height, data) {
	//select a element and append things to it
	//parameters are selector, width and height, so the function can be re-used.
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
}