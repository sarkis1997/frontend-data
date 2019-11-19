export function createSVG(selector, width, height) {
	d3.select(selector)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("class", "groupCircles")
		.attr("transform", "translate(" + width / 2.5 + ", " + height / 4 + ")");
}

export function createCircles(data) {
	d3.select('.groupCircles').selectAll('.groupCircles')
		.data(data)
		.enter()
		.append("circle")
		.attr("class", ".circle")
}
