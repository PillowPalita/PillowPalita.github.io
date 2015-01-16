var saveLocal = "//cdn.rawgit.com/Zarel/Pokemon-Showdown/master/data/";
var pokedexJSON;

loadData();
var exports;

function loadData() {
	console.warn("Loading...");
	exports.BattlePokedex = "";
	$.getJSON(saveLocal + "pokedex.js?jsoncallback=?", function(data) {
		console.warn("Loaded.");
		pokedexJSON = data;
		displayTable();
	});
}

function displayTable() {

	$.each(data, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}