window._EVENTS = {
    // Is useless anymore
    "inGameMusic_PlayerVehicleEntered": function(vehicleData) {
        //document.getElementById("reload_block").style.display = "";
        //document.getElementById("reloaded").style.display = "none";
    },
    "inGameMusic_PlayerVehicleExited": function(vehicleData) {
        //document.getElementById("reload_block").style.display = "none";
        //document.getElementById("reloaded").style.display = "none";
    },
    
    
    
    "inGameMusic_deathui_start": function(killer_name, death_message) {
        window.stopNP();
        window.nowPlaying = document.getElementById("death");
        // Is useless anymore
        /*if(typeof window.nowPlaying.wasReloaded == "undefined") {
            window.reloadAudio(window.nowPlaying, true);
            setTimeout(function() {
                window._EVENTS.inGameMusic_deathui_start(killer_name, death_message);
            }, 2000, killer_name, death_message);
            return;
        }*/
        document.getElementById("death").currentTime = 0;
        //document.getElementById("death").volume = window.audioVolume;
        document.getElementById("death").volume = 1;
        document.getElementById("death").play();
        document.getElementById("death").onended = function() {
            window.stopNP();
        }
        window.__IGM__debugLog("Playing death music...");
        // Is useless anymore
        /*if(window.de.death.isReloadingNeeded) {
            window.checkIsReloaded(null, document.getElementById("death"));
        }*/
    },
    "inGameMusic_deathui_stop": function() {
        document.getElementById("death").pause();
        window.nowPlaying = null;
        window.__IGM__debugLog("Stopping death music...");
    },
    
    
    
    "inGameMusic_inhelicopterui_start": function(ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById("helicopter");
        if(window.de.helicopter.startAtRandomPosition && ! window.de.helicopter.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting helicopter music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting helicopter music at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById("helicopter").currentTime = 0;
            document.getElementById("helicopter").play();
            window.__IGM__debugLog("Helicopter music ended. Playing again...");
        }
        window.nowPlaying.play();
        // Is useless anymore
        /*if(window.de.helicopter.isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_inhelicopterui_start", document.getElementById("helicopter"))) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing helicopter music...");
    },
    "inGameMusic_inhelicopterui_stop": function() {
        window.__IGM__debugLog("Stopping helicopter music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Helicopter music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying.id != "helicopter" && window.nowPlaying != null) {
                window.__IGM__debugLog("Helicopter music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != "helicopter" || window.nowPlaying.volume <= 0.01)) {
                document.getElementById("helicopter").pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped helicopter music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_inplaneui_start": function(ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById("plane");
        if(window.de.plane.startAtRandomPosition && ! window.de.plane.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting plane music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting plane music at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById("plane").currentTime = 0;
            document.getElementById("plane").play();
            window.__IGM__debugLog("Plane music ended. Playing again...");
        }
        window.nowPlaying.play();
        // Is useless anymore
        /*if(window.de.plane.isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_inplaneui_start", document.getElementById("plane"))) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing plane music...");
    },
    "inGameMusic_inplaneui_stop": function() {
        window.__IGM__debugLog("Stopping plane music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Plane music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying != null && window.nowPlaying.id != "plane") {
                window.__IGM__debugLog("Plane music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != "plane" || window.nowPlaying.volume <= 0.01)) {
                document.getElementById("plane").pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped plane music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_incarui_start": function(ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById("car");
        if(window.de.car.startAtRandomPosition && ! window.de.car.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting car music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting car music at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById("car").currentTime = 0;
            document.getElementById("car").play();
            window.__IGM__debugLog("Car music ended. Playing again...");
        }
        document.getElementById("car").play();
        // Is useless anymore
        /*if(window.de.car.isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_incarui_start", document.getElementById("car"))) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing car music...");
    },
    "inGameMusic_incarui_stop": function() {
        window.__IGM__debugLog("Stopping car music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Car music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying.id != "car" && window.nowPlaying != null) {
                window.__IGM__debugLog("Car music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != "car" || window.nowPlaying.volume <= 0.01)) {
                document.getElementById("car").pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped car music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_onbikeui_start": function(ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById("bike");
        if(window.de.bike.startAtRandomPosition && ! window.de.bike.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting bike music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting bike music at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById("bike").currentTime = 0;
            document.getElementById("bike").play();
            window.__IGM__debugLog("Bike music ended. Playing again...");
        }
        window.nowPlaying.play();
        // Is useless anymore
        /*if(window.de.bike.isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_onbikeui_start", document.getElementById("bike"))) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing bike music...");
    },
    "inGameMusic_onbikeui_stop": function() {
        window.__IGM__debugLog("Stopping bike music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Bike music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying != null && window.nowPlaying.id != "bike") {
                window.__IGM__debugLog("Bike music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != "bike" || window.nowPlaying.volume <= 0.01)) {
                document.getElementById("bike").pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped bike music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_inboatui_start": function(ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById("boat");
        if(window.de.boat.startAtRandomPosition && ! window.de.boat.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting boat music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting boat music at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById("boat").currentTime = 0;
            document.getElementById("boat").play();
            window.__IGM__debugLog("Boat music ended. Playing again...");
        }
        document.getElementById("boat").play();
        // Is useless anymore
        /*if(window.de.boat.isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_inboatui_start", document.getElementById("boat"))) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing boat music...");
    },
    "inGameMusic_inboatui_stop": function() {
        window.__IGM__debugLog("Stopping boat music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Boat music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying.id != "boat" && window.nowPlaying != null) {
                window.__IGM__debugLog("Boat music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != "boat" || window.nowPlaying.volume <= 0.01)) {
                document.getElementById("boat").pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped boat music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_fv_start": function(vi, ct) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        window.stopNP();
        window.nowPlaying = document.getElementById(vi);
        if(window.ve[vi].startAtRandomPosition && ! window.ve[vi].synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting music for \""+vi+"\" music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting music for \""+vi+"\" at "+ct+" s.");
        }
        window.nowPlaying.currentTime = ct;
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            document.getElementById(vi).currentTime = 0;
            document.getElementById(vi).play();
            window.__IGM__debugLog("Music for \""+vi+"\" ended. Playing again...");
        }
        window.nowPlaying.play();
        // Is useless anymore
        /*if(window.ve[vi].isReloadingNeeded && ! window.checkIsReloaded("inGameMusic_fv_start", document.getElementById(vi), vi)) {
            window.loadingText.style.display = "";
            return;
        }*/
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing music for \""+vi+"\"...");
        
    },
    "inGameMusic_fv_stop": function(vi) {
        window.__IGM__debugLog("Stopping music for \""+vi+"\"...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Music for \""+vi+"\" can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying != null && window.nowPlaying.id != vi) {
                window.__IGM__debugLog("Music for \""+vi+"\" IS NOT playing now! Force stopping... (\""+window.nowPlaying.id+"\" / \""+vi+"\")");
            }
            if(window.nowPlaying != null && (window.nowPlaying.id != vi || window.nowPlaying.volume <= 0.01)) {
                document.getElementById(vi).pause();
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped music for \""+vi+"\".");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10, vi);
    }
}
