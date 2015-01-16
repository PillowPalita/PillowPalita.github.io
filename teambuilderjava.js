var saveLocal = "//cdn.rawgit.com/Zarel/Pokemon-Showdown/master/data/";
var pokedexJSON;

loadData();

function loadData() {
	console.warn("Loading...");
	$.getJSON(saveLocal + "pokedex.js?jsoncallback=?", function(data) {
		console.warn("Loaded.");
		pokedexJSON = jQuery.parseJSON(data);
		displayTable();
	});
}

function displayTable() {

	$.each(data, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}