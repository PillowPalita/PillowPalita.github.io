sortKeys();
displayTable();

//exports.BattlePokedex
function sortKeys() {
	exports.BattlePokedexKeys = [];
	for(var key in exports.BattlePokedex) {
		exports.BattlePokedexKeys.push(key);
	}
	exports.BattlePokedexKeys.sort();
}

function displayTable() {
	$.each(exports.BattlePokedexKeys, function(key, value) {
		
			drawRow(value, exports.BattlePokedex[value]);
			//drawTable(key, exports.BattlePokedex);
		
	});
	$('#title').html( 'Pokemons drawn: ' + count);
}

function drawRow(key, value) {
	if (value.forme == null) { //remove megas and event pokemon
		var str = '<p style="border:1px dashed cyan">' + key + ':';
		$.each(value, function(key, value) {
			try {
				if ($.isArray(value)) {
					$.each(value, function(key, value) {	str += "[" + key + ":" + value + "]";	});
				} else if (Object.keys(value).length > 0) {
					str += "{" + key;
						try	{
							$.each(value, function(key, value) {
								str += "(" + key + ":" + value + ")";
							});
						} catch (err) {
							console.warn(err);
						}

					str += value + "}";
				}
			} catch(err) {
				str += "(" + key + ":" + value + ")";
			}
		});
		$('body').append(str + '</p>');
	}
}
