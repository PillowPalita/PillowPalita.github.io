displayTable();

//exports.BattlePokedex

function displayTable() {
	$.each(exports.BattlePokedex, function(key, value){
		$('body').append('<p style="border:1px dashed cyan">');
		$.each(value, function(key, value){
			$('body').append("{" + key + " " + value + "}");
		});
		$('body').append("</p>");
	});
}