var list = ['Pokedex', 'Movedex', 'Items', 'Abilities'];

//on load script
cleanLoadSetKeys();

$('#PokedexSearch').on('input', onInput);



$('#displayMode').on('change', function(){
	displayTable(this.value);
});


//go go write those pokemons!
displayTable();

$('#PokedexSearch').focus();


///loads all necessary keys
function cleanLoadSetKeys() {
	
	$.each(list, function(key,value){
		loadKeySet(exports['Battle' + value + 'Keys'] = [], exports['Battle' + value]);
		$('#' + value + 'Search').on('input', onInput);
	});
}
///assists cleanLoadSetKeys()
function loadKeySet(keyHolder, obj) {
	for(var key in obj)
		if (obj[key].num > 0)
			keyHolder.push(key);
}

//sorts by assigned data path
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

//bubble sort assistant, for cases where the base path isn't enough
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

//grabs data and sends it to displayRow
function displayTable(dex) {
	$('#list').empty();
	if (typeof dex == 'undefined') {
		var str = $('#PokedexSearch').val();
		dex = 'Pokedex';
	} else {
		var str = $('#'+ dex + 'Search').val(); //only works with a single movedex figure out 4
		
	}
	var keys = exports['Battle' + dex + 'Keys'];
	var values = exports['Battle' + dex];
	
	if (typeof str == 'undefined' || str == ''){
		$.each(keys, function(key, value) {
			drawRow(value, values[value]);
		});
	} else {//limits displayed data to that in #pkmName
		$('#list').append('<h2>Details</h2>');
		$.each(keys, function(key, value) {
			if (value.indexOf(str) > -1)
				drawRow(value, values[value]);
		});

		//abilities match
		str = str.toLowerCase();
		$('#list').append('<h2>Ability Details</h2>');
		$.each(keys, function(key, value) {
			$.each(values[value].abilities, function(key, innerValue) {
				if (innerValue.toLowerCase().indexOf(str) > -1) {
					drawRow(value, values[value]);
					return false;
				}
			});
		});
	}
}
//writes data to #list
function drawRow(key, value) {
	if (typeof value.formeLetter == null || value.formeLetter !== 'M') { //avoids megas and event pokemon from being drawn
		var str = "<p class=\"teamBuilderEntry\" onclick=\"pick('" + key + "')\">" + key + ":";
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


//event for text input
function onInput(){
	displayTable(this.id.replace('Search', ''));
};


function pick(key) {
	var proceed = true;

	$.each(list, function(idx, value) {
		
		$.each(exports['Battle' + value + 'Keys'], function(innerKey, innerValue){
			if (innerValue == key) {
				console.log("Testing: " + innerValue + " Found: " + value);
				$('#' + value + 'Search').prop('value', key);
				proceed = false;
				return false;	
			}
		});
		if (!proceed)
			return false;
	});
}