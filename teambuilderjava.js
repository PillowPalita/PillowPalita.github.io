
var exports;
loadData();

function loadData() {
	console.warn("Loading...");

$(document).ready(
	$.get("https://play.pokemonshowdown.com/data/pokedex.js?baa727b9", function(data) {
		console.warn("Loaded. " + data);
		eval(data);
		console.warn(exports);
		//displayTable();
	}));

}


function displayTable() {

	$.each(exports.BattlePokedex, function(idx, obj) {
		$.append("<p>" + obj+"</p>");
	});


}