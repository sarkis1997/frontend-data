export let fetchData = function(url, herkomst) {
	return fetch(url+"?query="+ encodeURIComponent(herkomst) +"&format=json")
		.then(response => response.json(response))
		.then(data => { return data.results.bindings })
};
