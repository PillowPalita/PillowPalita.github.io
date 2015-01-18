//on load script
cleanLoadSetKeys();

$('#pkmName').on('input',function(){ //pokemon search name handler
	//change #pkmName to affect a different input
	displayTable();
});


//go go write those pokemons!
displayTable();



function cleanLoadSetKeys() {
	exports.BattlePokedexKeys = [];
	var p = exports.BattlePokedex;
	for(var key in p)
		if (p[key].num > 0)
			exports.BattlePokedexKeys.push(key);
}

function sortKeys(keysToSort, container, type) {
	var i, tmp;
	if (type == '')
		for (var n = keysToSort.length; n > 1; --n) {
	        for (i = 0; i < n-1; ++i) {
	            if (keysToSort[i] > keysToSort[i+1]) {
	            	swap(keysToSort, i);
	            }
	        }
		}
	else
		for (var n = keysToSort.length; n > 1; --n) {
	        for (i = 0; i < n-1; ++i) {
	            if (deepFind(container[keysToSort[i]], type) > deepFind(container[keysToSort[i+1]], type)) {
	            	swap(keysToSort, i);
	            }
	        }
		}
}

//bubble sort assistant, for cases where the base value isn't enough
function deepFind(obj, path){
    for (var i=0,path = path.split('.'), len=path.length; i<len; i++)
        obj = obj[path[i]];
    return obj;
};

//bubble sort assistant
function swap(container, i) {
	tmp = container[i];
    container[i] = container[i+1];
    container[i+1] = tmp;
}

function displayTable() {
	$('#list').empty();
	var str = $('#pkmName').val();
	if (str === '')
		$.each(exports.BattlePokedexKeys, function(key, value) {
			drawRow(value, exports.BattlePokedex[value]);
		});
	else //limits displayed data to that in #pkmName
		$.each(exports.BattlePokedexKeys, function(key, value) {
			if (value.indexOf(str) > -1)
				drawRow(value, exports.BattlePokedex[value]);
		});
}

function drawRow(key, value) {
	if (value.forme == null) { //avoids megas and event pokemon from being drawn
		var str = '<p style="border:1px dashed cyan">' + key + ':';
		$.each(value, function(key, value) {
			try {
				if ($.isArray(value)) {
					$.each(value, function(key, value) {
						str += "[" + key + ":" + value + "]";
					});
				} else if (Object.keys(value).length > 0) {
					str += "{" + key;
						$.each(value, function(key, value) {
							str += "(" + key + ":" + value + ")";
						});

					str += value + "}";
				}
			} catch(err) {
				str += "(" + key + ":" + value + ")";
			}
		});

		$('#list').append(str + '</p>'); //write it!
	}
}


///Orders keys by given type
function orderBy(type) {
	if (type === 'name') { //special case requires no type
		sortKeys(exports.BattlePokedexKeys, exports.BattlePokedex, '');
	} else {
		sortKeys(exports.BattlePokedexKeys, exports.BattlePokedex, type);
	}
	displayTable();
}

function reverseOrder() {
	exports.BattlePokedexKeys.reverse();
	displayTable();
}