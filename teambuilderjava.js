//
//interface functions
//
function openTeamBuilder() {
    var el = document.getElementById("maindivtb");
    if (el.className == "hidden")
        el.className = "allowpointer";
    else {
        el.className = "hidden";
        document.getElementById("pokemonselect").className = "hidden";
        document.getElementById("chooseteam").className = "";
        document.getElementById("definepokemon").className = "hidden";
    }
}


function newTeam() {
    document.getElementById("pokemonselect").className = "";
    document.getElementById("chooseteam").className = "hidden";
}

function displayChooseTeam() {
    document.getElementById("pokemonselect").className = "hidden";
    document.getElementById("chooseteam").className = "";
}

function openPokemonSelect() {
    document.getElementById("pokemonselect").className = "hidden";
    document.getElementById("definepokemon").className = "";
}

function returnToList() {
    document.getElementById("pokemonselect").className = "";
    document.getElementById("definepokemon").className = "hidden";
}

//
//end of interface function
//
//start of builder code
//

var list = ['Pokedex'];//, 'Movedex', 'Items', 'Abilities'];

//on load script
cleanLoadSetKeys();

orderBy('name');


/*$('#displayMode').on('change', function () {
    displayTable(this.value);
});*/


//go go write those pokemons!
//displayTable();

//$('#PokedexSearch').focus();


///loads all necessary keys
function cleanLoadSetKeys() {

    $.each(list, function (key, value) {
        loadKeySet(exports['Battle' + value + 'Keys'] = [], exports['Battle' + value]);
        $('#' + value + 'Search').on('input', onInput);
    });
}
///assists cleanLoadSetKeys()
function loadKeySet(keyHolder, obj) {
    for (var key in obj)
        if (obj[key].num > 0)
            keyHolder.push(key);
}

//sorts by assigned data path
function sortKeys(keysToSort, container, type) {
    var i, tmp;
    if (type == '')
        for (var n = keysToSort.length; n > 1; --n) {
            for (i = 0; i < n - 1; ++i) {
                if (keysToSort[i] > keysToSort[i + 1]) {
                    swap(keysToSort, i);
                }
            }
        }
    else
        for (var n = keysToSort.length; n > 1; --n) {
            for (i = 0; i < n - 1; ++i) {
                if (deepFind(container[keysToSort[i]], type) > deepFind(container[keysToSort[i + 1]], type)) {
                    swap(keysToSort, i);
                }
            }
        }
}

//bubble sort assistant, for cases where the base path isn't enough
function deepFind(obj, path) {
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++)
        obj = obj[path[i]];
    return obj;
};

//bubble sort assistant
function swap(container, i) {
    tmp = container[i];
    container[i] = container[i + 1];
    container[i + 1] = tmp;
}

//grabs data and sends it to displayRow
function displayTable(dex) {
    $('#tbList').empty();
    if (typeof dex == 'undefined') { //por defeito usar este
        var str = $('#PokedexSearch').val();
        dex = 'Pokedex';
    } else {//senao descobrir input text selecionado e display tabela dele
        var str = $('#' + dex + 'Search').val(); //only works with a single movedex figure out 4
    }
    var keys = exports['Battle' + dex + 'Keys'];
    var values = exports['Battle' + dex];

    if (typeof str == 'undefined' || str == '') {
        /*
        $.each(keys, function (key, value) {
            drawRow(value, values[value]);
        });*/
    } else {//limits displayed data to that in #pkmName
        
        $('#tbList').append('<h2>Details</h2>');
        $.each(keys, function (key, value) {
            if (value.indexOf(str) > -1) {
                drawRow(value, values[value]);
        
            }
        });
        
        
        //abilities match
        /*str = str.toLowerCase();
        $('#tbList').append('<h2>Ability Details</h2>');
        $.each(keys, function (key, value) {
            $.each(values[value].abilities, function (key, innerValue) {
                if (innerValue.toLowerCase().indexOf(str) > -1) {
                    drawRow(value, values[value]);
                    return false;
                }
            });
        });*/
        
    }
}
//writes data to #tbList
function drawRow(key, value) {
    
    if (typeof value.formeLetter == null || value.formeLetter !== 'M') { //avoids megas and event pokemon from being drawn
        var str = "<div class=\"teamBuilderEntry\" onclick=\"pick('" + key + "')\" style=\"clear:left\">";
        
        var obj;
        str += '<div id="lTier" style="float: left">XX</div>' + 
             '<div id="limage" style="background-color: black; height: 30px; width: 30px; float: left"></div>' +
             '<div id="lname" style="float: left">' + value['species'] + '</div>';
        obj = value["types"];
        for (var i = 0; i < obj.length; i++) {
            str += "<div id=\"ltype" + i + "\" style=\"height: 30px; width: 30px; float: left; background: url('/imagens/types/" + obj[i] + ".png');background-repeat:no-repeat;\"></div>";
        }
        
        str += '<div id="lability" style="float: left; display: block">';
        var hiddenFound = false;
        $.each(value['abilities'], function (key, innerValue) {
            if (key == 'H') {
                hiddenFound = true;
                str += '</div><div id="lhiddenability" style="float: left">' + innerValue + '</div>';
                return false;
            }
            str += '<div id="lability' + key + '" style="display: block">' + innerValue + '</div>';
        });
        if (!hiddenFound)
            str += '</div><div id="lhiddenability" style="float: left" class="noHiddenAbility"></div>';
        
        str+= '<div style="float:right">'
        var total = 0;
        $.each(value['baseStats'], function (key, innerValue) {
            total += innerValue;
            str += '<div style="height: 30px; float: left"><div style="display: block">' + key +
            '</div><div style="display: block">' + innerValue + '</div></div>';
        });
        str += '<div style="height: 30px; float: left"><div style="display: block">BST' +
            '</div><div style="display: block">' + total + '</div></div></div>';
        


        $('#tbList').append(str + '</div>'); //write it!
    }
}


///Orders keys by given type
function orderBy(type) {
    if (type === 'name') { //special case requires no type
        sortKeys(exports.BattlePokedexKeys, exports.BattlePokedex, '');
    } else {
        sortKeys(exports.BattlePokedexKeys, exports.BattlePokedex, type);
    }
    //displayTable();
}

function reverseOrder() {
    exports.BattlePokedexKeys.reverse();
    displayTable();
}


//event for text input
function onInput() {
    displayTable(this.id.replace('Search', ''));
};


function pick(key) {
    var proceed = true;
    console.log(key + " was selected! Display everything!");
   $.each(list, function (idx, value) {

        $.each(exports['Battle' + value + 'Keys'], function (innerKey, innerValue) {
            if (innerValue == key) {
                $('#' + value + 'Search').prop('value', key);
                proceed = false;
                return false;
            }
        });
        if (!proceed)
            return false;
    });
}