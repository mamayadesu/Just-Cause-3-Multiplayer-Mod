;(function($, document, window, undefined) {
    $(function() {
        
        $.ajax({
            "url": "settings.js",
            "success": function(code) {
                var toExec = code.replace("'use strict';", "");
                eval(toExec);
                window.ve = module.exports.ve;
                window.te = module.exports.timeOfFadeOutAtAnExitFromVehicle;
                window.de = module.exports.defaultVehicles;
                window.defvol = module.exports.defaultVolume;
                if(window.te < 0 || typeof(window.te) != "number") {
                    window.te = 0;
                }
                window.audioVolume = parseFloat((window.defvol / 100).toFixed(2));
                document.getElementById("volume").value = document.getElementById("volume_info").innerHTML = window.defvol;
                window.lve();
            }
        });
        
        document.onkeydown = function(e) {
            if(e.which == 86 || e.which == 77) { // "V" or "M" keys
                /*window.isSettingsWindowVisible = ! window.isSettingsWindowVisible;
                
                if(window.isSettingsWindowVisible) {
                    document.getElementById("settings").style.display = "";
                } else {
                    document.getElementById("settings").style.display = "none";
                }*/
                jcmp.CallEvent("inGameMusic_toggleSettings", window.isSettingsWindowVisible);
            }
        }
        
        jcmp.AddEvent("inGameMusic_toggleSettings", function() {
            window.isSettingsWindowVisible = ! window.isSettingsWindowVisible;
            
            if(window.isSettingsWindowVisible) {
                document.getElementById("settings").style.display = "";
            } else {
                document.getElementById("settings").style.display = "none";
            }
            //document.getElementById("reloaded").style.display = "none";
        });
        
        document.getElementById("volume").onchange = function() {
            window.audioVolume = this.value / 100;
            document.getElementById("volume_info").innerHTML = this.value;
            if(window.nowPlaying != null) {
                window.nowPlaying.volume = window.audioVolume;
            }
        }
        
        // Is useless anymore
        /*
        document.getElementById("reload").onclick = window.reloadAudio = function(null_, n, ca) { // null_ is using for MouseEvent (if onclick called)
            //jcmp.CallEvent("inGameMusic_reload");
            //location.reload();
            if(ca != true) {
                setTimeout(function() {
                    var reloaded = document.getElementById("reloaded");
                    if(reloaded.innerHTML == "") {
                        reloaded.innerHTML = "<font style='color: orange;'>Something went wrong.<br>Cannot reload audio</font>";
                    }
                }, 250);
            }
            if(n == null || typeof n == "undefined" || ! n instanceof HTMLElement) {
                n = window.nowPlaying;
            }
            if(typeof n.pause == "function") {
                n.pause();
            }
            var elData = {
                "src": n.src,
                "id": n.id
            };
            console.log.apply(console, [elData.id, elData.src]);
            var audio = document.getElementById("audio");
            try {
                audio.removeChild(n);
            } catch(e) {
                window.__IGM__debugLog("Failed to remove (\""+n.id+"\", \""+n.src+"\"). Skipping...");
                try {
                    n.id = Math.random();
                } catch(e) {
                    window.__IGM__debugLog("Failed to set random id.");
                }
            }
            if(n == window.nowPlaying) {
                window.nowPlaying = null;
            }
            var newEl = document.createElement("audio");
            audio.appendChild(newEl);
            newEl.setAttribute("src", elData.src);
            newEl.setAttribute("id", elData.id);
            newEl.load();
            newEl.wasReloaded = true;
            if(ca != true) {
                document.getElementById("reloaded").style.display = "";
            }
            window.__IGM__debugLog("Reloading "+newEl.id+"...");
        }
        */
        
        document.getElementById("log_button").onclick = function() {
            window.isLogWindowVisible = ! window.isLogWindowVisible;
            
            if(window.isLogWindowVisible) {
                document.getElementById("debug").style.display = "";
                this.value = "Hide log";
            } else {
                document.getElementById("debug").style.display = "none";
                this.value = "Show log";
            }
        }
        
        window.isSettingsWindowVisible = false;
        window.wingsuitTimeout = null;
        //document.getElementById("reload_block").style.display = "none";
        //document.getElementById("reloaded").style.display = "none";
        document.getElementById("settings").style.display = "none";
        window.nowPlaying = null;
        window.se = null;
        window.__IGM__debugLog("DEBUG ENABLED!"); // DON'T TOUCH IT!!!
        
        window.stopNP = function() {
            if(window.nowPlaying != null) {
                window.__IGM__debugLog("Stopping "+window.nowPlaying.src);
                window.nowPlaying.pause();
                window.nowPlaying = null;
            }
        }
        
        // Is useless anymore
        /*
        window.checkIsReloaded = function(event, n, vi) {
            if(n == null || typeof n == "undefined") {
                n = window.nowPlaying;
            }
            if(typeof window.nowPlaying.wasReloaded == "undefined") {
                //window.nowPlaying.volume = 0.01;
                setTimeout(function() {
                    window.reloadAudio(null, n, true);
                    if(event != null && typeof event != "undefined") {
                        setTimeout(function() {
                            window._EVENTS[event](vi);
                        }, 10000, event, vi);
                    }
                }, 6000);
                return false;
            }
            return true;
        }
        
        window.reloadAll = function() {
            // This stupid fuck doesn't work correctly. Don't use it.
            var nodes = document.getElementById("audio").childNodes;
            var node;
            for(var k in nodes) {
                node = nodes[k];
                if(typeof node.tagName == "undefined" || node.tagName.toLowerCase() != "audio") {
                    continue;
                }
                window.__IGM__debugLog("Reloading element "+node.id);
                node.volume = 0;
                node.play();
                setTimeout(function() {
                    window.reloadAudio(null, node, false);
                }, 6000, node);
            }
            setTimeout(function() {
                window.__IGM__debugLog("All reloaded.");
            }, 6500, node);
        }*/
        
        //document.getElementById("death").id = "death";
        try {
            window.__IGM__debugLog("Loading death music...");
            document.getElementById("death").onload = function() {
                window.__IGM__debugLog("Death music loaded!");
            }
            document.getElementById("death").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load death music. "+JSON.stringify(e));
        }
        
        //document.getElementById("helicopter").id = "helicopter";
        try {
            window.__IGM__debugLog("Loading helicopter music...");
            document.getElementById("helicopter").onload = function() {
                window.__IGM__debugLog("helicopter music loaded!");
            }
            document.getElementById("helicopter").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load helicopter music. "+JSON.stringify(e));
        }
        
        //document.getElementById("plane").id = "plane";
        try {
            window.__IGM__debugLog("Loading plane music...");
            document.getElementById("plane").onload = function() {
                window.__IGM__debugLog("Plane music loaded!");
            }
            document.getElementById("plane").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load plane music. "+JSON.stringify(e));
        }
        
        //document.getElementById("car").id = "car";
        try {
            window.__IGM__debugLog("Loading car music...");
            document.getElementById("car").onload = function() {
                window.__IGM__debugLog("Car music loaded!");
            }
            document.getElementById("car").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load car music. "+JSON.stringify(e));
        }
        
        //document.getElementById("bike").id = "bike";
        try {
            window.__IGM__debugLog("Loading bike music...");
            document.getElementById("bike").onload = function() {
                window.__IGM__debugLog("Bike music loaded!");
            }
            document.getElementById("bike").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load bike music. "+JSON.stringify(e));
        }
        
        //document.getElementById("boat").id = "boat";
        try {
            window.__IGM__debugLog("Loading boat music...");
            document.getElementById("boat").onload = function() {
                window.__IGM__debugLog("Boat music loaded!");
            }
            document.getElementById("boat").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load boat music. "+JSON.stringify(e));
        }
        
        try {
            window.__IGM__debugLog("Loading wingsuit music...");
            document.getElementById("wingsuit").onload = function() {
                window.__IGM__debugLog("Wingsuit music loaded!");
            }
            document.getElementById("wingsuit").load();
        } catch(e) {
            window.__IGM__debugLog("Failed to load wingsuit music. "+JSON.stringify(e));
        }
        
        window.lve = function() {
            var audio = document.getElementById("audio");
            var newEl;
            for(var i in window.ve) {
                //document.getElementById("audio").innerHTML += "<audio id=\""+i+"\" src=\"music/"+window.ve[i]+"\"></audio>";
                newEl = document.createElement("audio");
                audio.appendChild(newEl);
                newEl.setAttribute("src", "music/"+window.ve[i].filename);
                newEl.setAttribute("id", i);
                //newEl.setAttribute("id", i);
                try {
                    //document.getElementById(i).id = i;
                    window.__IGM__debugLog("Loading music for \""+i+"\" (Filename \"music/"+window.ve[i].filename+"\")...");
                    //document.getElementById(i).onload = function() {
                    newEl.onload = function() {
                        window.__IGM__debugLog("Music for \""+i+"\" loaded!");
                    }
                    //document.getElementById(i).load();
                    newEl.load();
                } catch(e) {
                    window.__IGM__debugLog("Failed to load music for \""+i+"\". "+JSON.stringify(e));
                }
            }
        }
        
        window.mt_rand = function(min, max) {
            if(min == undefined || max == undefined) {
                return null;
            }
            min = parseInt(min, 10)
            max = parseInt(max, 10)
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        jcmp.AddEvent('inGameMusic_CPERROR', function(file, line, error, stringtrace) {
            window._EVENTS.inGameMusic_CPERROR(file, line, error, stringtrace);
        });
        
        jcmp.AddEvent('inGameMusic_PlayerVehicleEntered', function(vehicleData) {
            window._EVENTS.inGameMusic_PlayerVehicleEntered(vehicleData);
        });
        
        jcmp.AddEvent('inGameMusic_PlayerVehicleExited', function(vehicleData) {
            window._EVENTS.inGameMusic_PlayerVehicleExited(vehicleData);
        });
        
        jcmp.AddEvent('inGameMusic_deathui_start', function(killer_name, death_message) {
            window._EVENTS.inGameMusic_deathui_start(killer_name, death_message);
        });
        
        jcmp.AddEvent('inGameMusic_deathui_stop', function() {
            window._EVENTS.inGameMusic_deathui_stop();
        });
        
        jcmp.AddEvent('inGameMusic_inhelicopterui_start', function(ct) {
            window._EVENTS.inGameMusic_inhelicopterui_start(ct);
        });
        jcmp.AddEvent('inGameMusic_inhelicopterui_stop', function() {
            window._EVENTS.inGameMusic_inhelicopterui_stop();
        });
        
        
        
        jcmp.AddEvent('inGameMusic_inplaneui_start', function(ct) {
            window._EVENTS.inGameMusic_inplaneui_start(ct);
        });
        jcmp.AddEvent('inGameMusic_inplaneui_stop', function() {
            window._EVENTS.inGameMusic_inplaneui_stop();
        });
        
        
        
        jcmp.AddEvent('inGameMusic_incarui_start', function(ct) {
            window._EVENTS.inGameMusic_incarui_start(ct);
        });
        jcmp.AddEvent('inGameMusic_incarui_stop', function() {
            window._EVENTS.inGameMusic_incarui_stop();
        });
        
        
        
        jcmp.AddEvent('inGameMusic_onbikeui_start', function(ct) {
            window._EVENTS.inGameMusic_onbikeui_start(ct);
        });
        jcmp.AddEvent('inGameMusic_onbikeui_stop', function() {
            window._EVENTS.inGameMusic_onbikeui_stop();
        });
        
        
        
        jcmp.AddEvent('inGameMusic_inboatui_start', function(ct) {
            window._EVENTS.inGameMusic_inboatui_start(ct);
        });
        jcmp.AddEvent('inGameMusic_inboatui_stop', function() {
            window._EVENTS.inGameMusic_inboatui_stop();
        });
        
        
        
        jcmp.AddEvent('inGameMusic_wingsuit_start', function(ct) {
            if(window.wingsuitTimeout != null) {
                clearTimeout(window.wingsuitTimeout);
                window.wingsuitTimeout = null;
                window.__IGM__debugLog("Wingsuit was opened. Abort stopping.");
                return;
            }
            window._EVENTS.inGameMusic_wingsuit_start(ct);
        });
        jcmp.AddEvent('inGameMusic_wingsuit_stop', function() {
            window.__IGM__debugLog("Wingsuit was closed. If it won't be opened in 5 seconds, the music will be stopped.");
            window.wingsuitTimeout = setTimeout(function() {
                window._EVENTS.inGameMusic_wingsuit_stop();
                window.wingsuitTimeout = null;
            }, 5000);
        });
        
        
        
        jcmp.AddEvent('inGameMusic_fv_start', function(vi, ct) {
            window._EVENTS.inGameMusic_fv_start(vi, ct);
        });
        jcmp.AddEvent('inGameMusic_fv_stop', function(vi) {
            window._EVENTS.inGameMusic_fv_stop(vi);
        });
        
        setInterval(function() {
            if(window.nowPlaying != null) {
                document.getElementById("time").innerHTML = window.nowPlaying.currentTime.toFixed(1)+"/"+window.nowPlaying.duration.toFixed(1);
            } else {
                document.getElementById("time").innerHTML = "Doesn't playing.";
            }
        }, 50);
        
        window.loadingText = document.getElementById("loading");
        window.loadingText.style.opacity = 1;
        window.loadingText.oc = 1;
        window.loadingText.addOc = 0.025;
        window.loadingText.style.display = "none";
        setInterval(function() {
            if(window.loadingText.style.opacity >= 1 || window.loadingText.style.opacity <= 0) {
                window.loadingText.addOc *= -1;
            }
            window.loadingText.oc += window.loadingText.addOc;
            window.loadingText.style.opacity = window.loadingText.oc;
        }, 20);
        
        /*setTimeout(function() {
            window.reloadAll();
        }, 4000);*/
    });
})(jQuery, document, window);
