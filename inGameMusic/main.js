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

for(var v in defaultVehicles) {
    if(defaultVehicles[v].synchronization == true) {
        synchronizeAudiofilesDef[v] = {
            "currentTime": 0,
            "maxDurationForSync": defaultVehicles[v].maxDurationForSync
        };
    }
}

for(var v in ve) {
    if(ve[v].synchronization == true) {
        synchronizeAudiofiles[v] = {
            "currentTime": 0,
            "maxDurationForSync": ve[v].maxDurationForSync
        };
    }
}

var synchronization = setInterval(function() {
    for(var v in synchronizeAudiofilesDef) {
        synchronizeAudiofilesDef[v].currentTime++;
        if(synchronizeAudiofilesDef[v].currentTime >= synchronizeAudiofilesDef[v].maxDurationForSync) {
            synchronizeAudiofilesDef[v].currentTime = 0;
        }
    }
    
    for(var v in synchronizeAudiofiles) {
        synchronizeAudiofiles[v].currentTime++;
        if(synchronizeAudiofiles[v].currentTime >= synchronizeAudiofiles[v].maxDurationForSync) {
            synchronizeAudiofiles[v].currentTime = 0;
        }
    }
}, 1000);

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
    for(var k in ve) {
        k1 = k.split("*")[0];
        if(v.model_name.substr(0, k1.length) == k1) {
            if(ve[k].synchronization == true) {
                ct = synchronizeAudiofiles[k].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_fv_start", player, k, ct);
            return;
        }
    }
    switch(v.type) {
        case "helicopter":
            if(typeof synchronizeAudiofilesDef["helicopter"] != "undefined") {
                ct = synchronizeAudiofilesDef["helicopter"].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_inhelicopterui_start", player, ct);
            break;
        
        case "plane":
            if(typeof synchronizeAudiofilesDef["plane"] != "undefined") {
                ct = synchronizeAudiofilesDef["plane"].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_inplaneui_start", player, ct);
            break;
        
        case "car":
            if(typeof synchronizeAudiofilesDef["car"] != "undefined") {
                ct = synchronizeAudiofilesDef["car"].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_incarui_start", player, ct);
            break;
        
        case "bike":
            if(typeof synchronizeAudiofilesDef["bike"] != "undefined") {
                ct = synchronizeAudiofilesDef["bike"].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_onbikeui_start", player, ct);
            break;
        
        case "boat":
            if(typeof synchronizeAudiofilesDef["boat"] != "undefined") {
                ct = synchronizeAudiofilesDef["boat"].currentTime;
            }
            jcmp.events.CallRemote("inGameMusic_inboatui_start", player, ct);
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
