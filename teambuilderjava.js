var saveLocal = "//cdn.rawgit.com/Zarel/Pokemon-Showdown/master/data/";
var pokedexJSON;

loadData();
var exports;


function loadData() {
	console.warn("Loading...");

$(document).ready(
	$.get("test.js", function(data) {
		console.warn("Loaded.");
		pokedexJSON = data;
		eval(data);
		console.warn(exports.success);
		//displayTable();
	}));

}

/*function loadData() {
	console.warn("Loading...");
	exports = {};
	exports.BattlePokedex = {};
	$.getJSON(saveLocal + "pokedex.js", function(exports) {
		console.warn("Loaded.");
		pokedexJSON = data;
		displayTable();
	});
	console.warn(exports.BattlePokedex[0]);
}*/

function displayTable() {

	$.each(exports, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}