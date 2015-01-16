var saveLocal = "//cdn.rawgit.com/Zarel/Pokemon-Showdown/master/data/";
var pokedexJSON;

loadData();

function loadData() {
	$.getJSON(saveLocal + "pokedex.js?callback=?", function(data) {
		pokedexJSON = data;
		displayTable();
	});
}

function displayTable() {

	$.each(data, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}