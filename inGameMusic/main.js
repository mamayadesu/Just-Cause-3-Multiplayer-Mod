'use strict';

var getVehicles = require("./vehicles.js").getVehicles;

function findMyVehicle(vehicle) {
    var vehicles = getVehicles();
    for(var i in vehicles) {
        if(vehicle.modelHash == vehicles[i].hash) {
            return { "index": i, "data": vehicles[i] };
        }
    }
    return null;
}

var settings = require("./client_package/ui/settings.js");

var ve = settings.ve;
var defaultVehicles = settings.defaultVehicles;
var synchronizeAudiofiles = [];
var synchronizeAudiofilesDef = [];
setTimeout(function() {
    for(var v in defaultVehicles) {
        if(defaultVehicles[v].synchronization == true) {
            synchronizeAudiofilesDef[v] = {
                "currentTime": 0,
                "maxDurationForSync": defaultVehicles[v].maxDurationForSync,
                "part": 0,
            };
            if(defaultVehicles[v].startAtRandomPosition) {
                synchronizeAudiofilesDef[v].currentTime = rand(0, defaultVehicles[v].maxDurationForSync);
                console.log("[inGameMusic] "+v+" music started at random position ("+synchronizeAudiofilesDef[v].currentTime+"/"+synchronizeAudiofilesDef[v].maxDurationForSync+")");
            }
        }
    }

    for(var v in ve) {
        if(ve[v].synchronization == true) {
            synchronizeAudiofiles[v] = {
                "currentTime": 0,
                "maxDurationForSync": ve[v].maxDurationForSync,
                "part": 0
            };
            if(ve[v].startAtRandomPosition) {
                synchronizeAudiofiles[v].currentTime = rand(0, ve[v].maxDurationForSync);
                console.log("[inGameMusic] Music for \""+v+"\" started at random position ("+synchronizeAudiofiles[v].currentTime+"/"+synchronizeAudiofilesDef[v].maxDurationForSync+")");
            }
        }
    }
        
    var synchronization = setInterval(function() {
        for(var v in synchronizeAudiofilesDef) {
            synchronizeAudiofilesDef[v].currentTime++;
            for(var k in defaultVehicles[v].parts) {
                if(synchronizeAudiofilesDef[v].currentTime >= defaultVehicles[v].parts[k]) {
                    synchronizeAudiofilesDef[v].part = k;
                }
            }
            if(synchronizeAudiofilesDef[v].currentTime >= synchronizeAudiofilesDef[v].maxDurationForSync) {
                synchronizeAudiofilesDef[v].currentTime = 0;
                synchronizeAudiofilesDef[v].part = 0;
            }
        }
    
        for(var v in synchronizeAudiofiles) {
            synchronizeAudiofiles[v].currentTime++;
            for(var k in ve[v].parts) {
                if(synchronizeAudiofiles[v].currentTime >= ve[v].parts[k]) {
                    synchronizeAudiofiles[v].part = k;
                }
            }
            if(synchronizeAudiofiles[v].currentTime >= synchronizeAudiofiles[v].maxDurationForSync) {
                synchronizeAudiofiles[v].currentTime = 0;
                synchronizeAudiofiles[v].part = 0;
            }
        }
    }, 1000);
}, 1000);
jcmp.events.AddRemoteCallable("inGameMusic_OnReturnPlayerStateBits", (player, playerStateBits1, playerStateBits2) => {
    if((playerStateBits1 == 1 || playerStateBits1 == 9) && playerStateBits2 == 0 && ! player.__INGAMEMUSIC__doesUseWingsuit) {
        player.__INGAMEMUSIC__doesUseWingsuit = true;
        var ct = 0;
        if(defaultVehicles["wingsuit"].startAtRandomPosition == true) {
            ct = rand(0, defaultVehicles["wingsuit"].duration);
        }
        if(defaultVehicles["wingsuit"].synchronization == true) {
            ct = synchronizeAudiofilesDef["wingsuit"].currentTime;
        }
        jcmp.events.CallRemote("inGameMusic_wingsuit_start", player, ct);
    }
    if(((playerStateBits1 != 1 && playerStateBits1 != 9) || playerStateBits2 != 0) && player.__INGAMEMUSIC__doesUseWingsuit == true) {
        player.__INGAMEMUSIC__doesUseWingsuit = false;
        jcmp.events.CallRemote('inGameMusic_wingsuit_stop', player);
    }
});

jcmp.events.Add("PlayerReady", (player) => {
    player.__INGAMEMUSIC__wingsuitChecker = setInterval(function() {
        jcmp.events.CallRemote("inGameMusic_GetPlayerStateBits", player);
    }, 1000, player);
});

jcmp.events.Add("PlayerDestroyed", (player) => {
    clearInterval(player.__INGAMEMUSIC__wingsuitChecker);
});

jcmp.events.Add("PlayerVehicleEntered", (player, vehicle, seat) => {
    var vehicles = getVehicles();
    var v = findMyVehicle(vehicle);
    if(v == null) {
        return;
    }
    v = v.data;
    var k1;
    jcmp.events.CallRemote("inGameMusic_PlayerVehicleEntered", player, v);
    var ct = 0;
    var part = 0;
    for(var k in ve) {
        k1 = k.split("*")[0];
        if(v.model_name.substr(0, k1.length) == k1) {
            if(ve[k].synchronization == true) {
                ct = synchronizeAudiofiles[k].currentTime;
            }
            if(typeof synchronizeAudiofiles[k] != "undefined") {
                part = synchronizeAudiofiles[k].part;
            }
            jcmp.events.CallRemote("inGameMusic_fv_start", player, k, ct, part);
            return;
        }
    }
    switch(v.type) {
        case "helicopter":
            if(typeof synchronizeAudiofilesDef["helicopter"] != "undefined") {
                ct = synchronizeAudiofilesDef["helicopter"].currentTime;
                part = synchronizeAudiofilesDef["helicopter"].part;
            }
            jcmp.events.CallRemote("inGameMusic_inhelicopterui_start", player, ct, part);
            break;
        
        case "plane":
            if(typeof synchronizeAudiofilesDef["plane"] != "undefined") {
                ct = synchronizeAudiofilesDef["plane"].currentTime;
                part = synchronizeAudiofilesDef["plane"].part;
            }
            jcmp.events.CallRemote("inGameMusic_inplaneui_start", player, ct, part);
            break;
        
        case "car":
            if(typeof synchronizeAudiofilesDef["car"] != "undefined") {
                ct = synchronizeAudiofilesDef["car"].currentTime;
                part = synchronizeAudiofilesDef["car"].part;
            }
            jcmp.events.CallRemote("inGameMusic_incarui_start", player, ct, part);
            break;
        
        case "bike":
            if(typeof synchronizeAudiofilesDef["bike"] != "undefined") {
                ct = synchronizeAudiofilesDef["bike"].currentTime;
                part = synchronizeAudiofilesDef["bike"].part;
            }
            jcmp.events.CallRemote("inGameMusic_onbikeui_start", player, ct, part);
            break;
        
        case "boat":
            if(typeof synchronizeAudiofilesDef["boat"] != "undefined") {
                ct = synchronizeAudiofilesDef["boat"].currentTime;
                part = synchronizeAudiofilesDef["boat"].part;
            }
            jcmp.events.CallRemote("inGameMusic_inboatui_start", player, ct, part);
            break;
    }
});

jcmp.events.Add("PlayerVehicleExited", (player, vehicle, seat) => {
    var vehicles = getVehicles();
    var v = findMyVehicle(vehicle);
    if(v == null) {
        return;
    }
    v = v.data;
    var k1;
    jcmp.events.CallRemote("inGameMusic_PlayerVehicleExited", player, v);
    for(var k in ve) {
        k1 = k.split("*")[0];
        if(v.model_name.substr(0, k1.length) == k1) {
            jcmp.events.CallRemote("inGameMusic_fv_stop", player, k);
            return;
        }
    }
    switch(v.type) {
        case "helicopter":
            jcmp.events.CallRemote("inGameMusic_inhelicopterui_stop", player);
            break;
        
        case "plane":
            jcmp.events.CallRemote("inGameMusic_inplaneui_stop", player);
            break;
        
        case "car":
            jcmp.events.CallRemote("inGameMusic_incarui_stop", player);
            break;
        
        case "bike":
            jcmp.events.CallRemote("inGameMusic_onbikeui_stop", player);
            break;
        
        case "boat":
            jcmp.events.CallRemote("inGameMusic_inboatui_stop", player);
            break;
    }
});

jcmp.events.Add("PlayerDeath", (player, killer, reason) => {
    jcmp.events.CallRemote("inGameMusic_deathui", player);
});

function rand(min, max) {
    if(min == undefined || max == undefined) {
        return null;
    }
    min = parseInt(min, 10)
    max = parseInt(max, 10)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}