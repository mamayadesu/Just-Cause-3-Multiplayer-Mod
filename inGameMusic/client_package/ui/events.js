window._EVENTS = {
    "inGameMusic_CPERROR": function(file, line, error, stringtrace) {
        window.__IGM__debugLog("CPERROR \""+error+"\" in \""+file+"\" on line "+line+" (stringtrace: \""+stringtrace+"\").");
    },
    
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
    
    
    
    "inGameMusic_inhelicopterui_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting helicopter music cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("helicopter_"+part);
        } else {
            window.nowPlaying = document.getElementById("helicopter");
        }
        window.nowPlaying.veh = "helicopter";
        window.nowPlaying.part = part;
        if(window.de.helicopter.startAtRandomPosition && ! window.de.helicopter.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting helicopter music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting helicopter music at "+ct+" s.");
        }
        ct -= window.de.helicopter.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.helicopter.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_inhelicopterui_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Helicopter music ended. Playing again...");
                window._EVENTS.inGameMusic_inhelicopterui_start(0, 0, true);
            }
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
            if(window.nowPlaying.veh != "helicopter" && window.nowPlaying != null) {
                window.__IGM__debugLog("Helicopter music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "helicopter" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.helicopter.parts) {
                    if(k == 0) {
                        document.getElementById("helicopter").pause();
                    } else {
                        document.getElementById("helicopter_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped helicopter music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_inplaneui_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting plane music cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("plane_"+part);
        } else {
            window.nowPlaying = document.getElementById("plane");
        }
        window.nowPlaying.veh = "plane";
        window.nowPlaying.part = part;
        if(window.de.plane.startAtRandomPosition && ! window.de.plane.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting plane music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting plane music at "+ct+" s.");
        }
        ct -= window.de.plane.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.plane.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_inplaneui_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Plane music ended. Playing again...");
                window._EVENTS.inGameMusic_inplaneui_start(0, 0, true);
            }
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
            if(window.nowPlaying != null && window.nowPlaying.veh != "plane") {
                window.__IGM__debugLog("Plane music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "plane" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.plane.parts) {
                    if(k == 0) {
                        document.getElementById("plane").pause();
                    } else {
                        document.getElementById("plane_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped plane music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_incarui_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting car music cancelled, because window.se not null");
            return;
        }if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("car_"+part);
        } else {
            window.nowPlaying = document.getElementById("car");
        }
        window.nowPlaying.veh = "car";
        window.nowPlaying.part = part;
        if(window.de.car.startAtRandomPosition && ! window.de.car.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting car music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting car music at "+ct+" s.");
        }
        ct -= window.de.car.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.car.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_incarui_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Car music ended. Playing again...");
                window._EVENTS.inGameMusic_incarui_start(0, 0, true);
            }
        }
        window.nowPlaying.play();
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
            if(window.nowPlaying.veh != "car" && window.nowPlaying != null) {
                window.__IGM__debugLog("Car music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "car" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.car.parts) {
                    if(k == 0) {
                        document.getElementById("car").pause();
                    } else {
                        document.getElementById("car_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped car music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_onbikeui_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting bike music cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("bike_"+part);
        } else {
            window.nowPlaying = document.getElementById("bike");
        }
        window.nowPlaying.veh = "bike";
        window.nowPlaying.part = part;
        if(window.de.bike.startAtRandomPosition && ! window.de.bike.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting bike music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting bike music at "+ct+" s.");
        }
        ct -= window.de.bike.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.bike.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_onbikeui_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Bike music ended. Playing again...");
                window._EVENTS.inGameMusic_onbikeui_start(0, 0, true);
            }
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
            if(window.nowPlaying != null && window.nowPlaying.veh != "bike") {
                window.__IGM__debugLog("Bike music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "bike" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.bike.parts) {
                    if(k == 0) {
                        document.getElementById("bike").pause();
                    } else {
                        document.getElementById("bike_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped bike music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_inboatui_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting boat music cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("boat_"+part);
        } else {
            window.nowPlaying = document.getElementById("boat");
        }
        window.nowPlaying.veh = "boat";
        window.nowPlaying.part = part;
        if(window.de.boat.startAtRandomPosition && ! window.de.boat.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting boat music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting boat music at "+ct+" s.");
        }
        ct -= window.de.boat.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.boat.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_inboatui_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Boat music ended. Playing again...");
                window._EVENTS.inGameMusic_inboatui_start(0, 0, true);
            }
        }
        window.nowPlaying.play();
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
            if(window.nowPlaying.veh != "boat" && window.nowPlaying != null) {
                window.__IGM__debugLog("Boat music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "boat" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.boat.parts) {
                    if(k == 0) {
                        document.getElementById("boat").pause();
                    } else {
                        document.getElementById("boat_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped boat music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_wingsuit_start": function(ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting wingsuit music cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById("wingsuit_"+part);
        } else {
            window.nowPlaying = document.getElementById("wingsuit");
        }
        window.nowPlaying.veh = "wingsuit";
        window.nowPlaying.part = part;
        if(window.de.wingsuit.startAtRandomPosition && ! window.de.wingsuit.synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting wingsuit music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting wingsuit music at "+ct+" s.");
        }
        ct -= window.de.wingsuit.parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.__IGM__debugLog("Duration "+window.nowPlaying.duration);
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.de.wingsuit.parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_wingsuit_start(this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Wingsuit music ended. Playing again...");
                window._EVENTS.inGameMusic_wingsuit_start(0, 0, true);
            }
        }
        window.nowPlaying.play();
        window.loadingText.style.display = "none";
        window.__IGM__debugLog("Playing wingsuit music...");
    },
    "inGameMusic_wingsuit_stop": function() {
        window.__IGM__debugLog("Stopping wingsuit music...");
        if(window.nowPlaying == null) {
            window.__IGM__debugLog("Wingsuit music can't be stopped. Probably, it was reloaded.");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
        }
        window.se = setInterval(function() {
            if(window.nowPlaying.veh != "wingsuit" && window.nowPlaying != null) {
                window.__IGM__debugLog("Wingsuit music IS NOT playing now! Force stopping...");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != "wingsuit" || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.de.wingsuit.parts) {
                    if(k == 0) {
                        document.getElementById("wingsuit").pause();
                    } else {
                        document.getElementById("wingsuit_"+k).pause();
                    }
                }
                window.nowPlaying = null;
                window.__IGM__debugLog("Stopped wingsuit music.");
                clearInterval(window.se);
                window.se = null;
                return;
            }
            window.nowPlaying.volume -= parseFloat((0.01 / window.te).toFixed(3));
        }, 10);
    },
    
    
    
    "inGameMusic_fv_start": function(vi, ct, part, cancelIfSeStarted) {
        if(isNaN(ct) || ct < 0) {
            ct = 0;
        }
        if(isNaN(part) || part < 0) {
            part = 0;
        }
        if(cancelIfSeStarted && window.se != null) {
            window.__IGM__debugLog("Starting music for \""+vi+"\" cancelled, because window.se not null");
            return;
        }
        if(window.se != null) {
            clearInterval(window.se);
            window.se = null;
            window.nowPlaying.pause();
            window.nowPlaying.volume = 0;
        }
        window.stopNP();
        if(part > 0) {
            window.nowPlaying = document.getElementById(vi+"_"+part);
        } else {
            window.nowPlaying = document.getElementById(vi);
        }
        window.nowPlaying.veh = vi;
        window.nowPlaying.part = part;
        if(window.ve[vi].startAtRandomPosition && ! window.ve[vi].synchronization) {
            ct = window.mt_rand(0, window.nowPlaying.duration);
            window.__IGM__debugLog("Starting music for \""+vi+"\" music at random position ("+ct+"/"+window.nowPlaying.duration+")");
        } else {
            window.__IGM__debugLog("Starting music for \""+vi+"\" at "+ct+" s.");
        }
        ct -= window.ve[vi].parts[part];
        window.__IGM__debugLog("ct "+ct);
        window.nowPlaying.currentTime = ct;
        window.nowPlaying.volume = window.audioVolume;
        window.nowPlaying.onended = function() {
            var p = parseInt(this.part);
            if(p < window.ve[this.veh].parts.length - 1) {
                window.__IGM__debugLog("Playing next part");
                window._EVENTS.inGameMusic_fv_start(this.veh, this.currentTime, p + 1, true);
            } else {
                window.__IGM__debugLog("Music for \""+this.veh+"\" music ended. Playing again...");
                window._EVENTS.inGameMusic_fv_start(this.veh, 0, 0, true);
            }
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
            if(window.nowPlaying != null && window.nowPlaying.veh != vi) {
                window.__IGM__debugLog("Music for \""+vi+"\" IS NOT playing now! Force stopping... (\""+window.nowPlaying.id+"\" / \""+vi+"\")");
            }
            if(window.nowPlaying != null && (window.nowPlaying.veh != vi || window.nowPlaying.volume <= 0.01)) {
                for(var k in window.ve[vi].parts) {
                    if(k == 0) {
                        document.getElementById(vi).pause();
                    } else {
                        document.getElementById(vi+"_"+k).pause();
                    }
                }
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