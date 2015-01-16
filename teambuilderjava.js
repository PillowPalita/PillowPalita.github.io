var saveLocal = "//cdn.rawgit.com/Zarel/Pokemon-Showdown/master/data/";
var pokedexJSON;

loadData();

function loadData() {
	$.getJSON(saveLocal + "pokedex.js", function(data) {
		console.warn("asd");
		pokedexJSON = jQuery.parseJSON(data);
		displayTable();
	});
}

function displayTable() {

	$.each(data, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}