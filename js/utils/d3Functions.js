export function createSVG(selector, width, height) {
	//select a element and append things to it
	//parameters are selector, width and height, so the function can be re-used.
	d3.select(selector)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("class", "groupCircles")
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");
}

export function createCircles(findSelector, searchSelector, data) {
	d3.select(findSelector).selectAll(searchSelector)
		.data(data)
		.enter()
		.append("circle")
		.attr("class", ".circle")
}
