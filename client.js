function openChat() {
    document.getElementById("chatjoin").className = "hidden";
    document.getElementById("chatclose").className = "colordiv";
}

function closeChat() {
    document.getElementById("chatjoin").className = "";
    document.getElementById("chatclose").className = "hidden";
}
function closeNews() {
    document.getElementById("newclose").className = "hidden";
}

function swapStream(newStreamer) {

    document.getElementById("live_embed_player_flash").data =
        "http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + newStreamer;
}

var gameName = "pokemon";
var streamMaxCount = 5;
var grabStreamFirstBit = "https://api.twitch.tv/kraken/search/streams?q=";
var grabStreamSecondBit = "&callback=?&limit=";

function initStream() {
    $.getJSON(
        grabStreamFirstBit + gameName + grabStreamSecondBit + streamMaxCount,
        function (json) {

            var streams = json.streams; //dados completos do stream
            var stream;
            var name;
            for (var i = 0; i < streams.length; i++) { //ver cada streamer individualmente
                stream = streams[i].channel; //pegar dados do canal do streamer
                name = stream.display_name; //nome do streamer
                $('#listaStreamers').append( // player logo
                    "<div class=\"item\" onclick=\"swapStream('" +
                    name + "'); openStream();\"><img src=\"" +
                    stream.logo + "\" class=\"streamerLogo\" />" +
                    "<span class=\"streamerName\">" + name + "</span></div>"
                    );
            }
        }
    );
}

function openStream() {
    document.getElementById("stream").className = "";
    document.getElementById("listaStreamers").className = "hidden";
    document.getElementById("xstream").className = "";
}

function closeStream() {
    document.getElementById("stream").className = "hidden";
    document.getElementById("listaStreamers").className = "";
    swapStream("");
    document.getElementById("xstream").className = "hidden";
}

function onHover(url, id) {
    
    document.getElementById(id).src = url;
    
}

