var enabled = false; // Is debug enabled?

(function(enabled) {
    window.isLogWindowVisible = true;
    if(! enabled) {
        window.__IGM__debugLog = function(text) {};
        window.isLogWindowVisible = false;
        return;
    }
    setTimeout(function() {
        document.getElementById("debug_tools").style.display = "";
    }, 1000);
    document.getElementById("debug").innerHTML = "<pre id='igmlog' style='color: white; font-family: Calibri; padding: 5%;'>*** inGameMusic log:\n</pre>";
    window.__IGM__debugLog = function(text) {
        document.getElementById("igmlog").innerHTML += "[INFO] ["+(new Date).toLocaleTimeString()+"] "+text+"\n";
    }
    window.onerror = function(error, url, line) {
        document.getElementById("igmlog").innerHTML += "[ERROR] ["+(new Date).toLocaleTimeString()+"] "+error+" <i>IN</i> "+url+" <i>ON LINE</i> "+line+"\n";
    }
    
})(enabled);