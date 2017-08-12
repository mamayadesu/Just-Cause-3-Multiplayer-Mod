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

jcmp.events.AddRemoteCallable("HeightIndicator_OnReturnPlayerStateBits", (player, playerStateBits1, playerStateBits2) => {
    if((playerStateBits1 == 1 || playerStateBits1 == 9) && playerStateBits2 == 0 && ! player.__HEIGHTINDICATOR__doesUseWingsuit) {
        player.__HEIGHTINDICATOR__doesUseWingsuit = true;
        jcmp.events.CallRemote("HeightIndicator_WingsuitOpened", player);
    }
    if(((playerStateBits1 != 1 && playerStateBits1 != 9) || playerStateBits2 != 0) && player.__HEIGHTINDICATOR__doesUseWingsuit == true) {
        player.__HEIGHTINDICATOR__doesUseWingsuit = false;
        jcmp.events.CallRemote('HeightIndicator_WingsuitClosed', player);
    }
});

jcmp.events.Add("PlayerReady", (player) => {
    player.__HEIGHTINDICATOR__wingsuitChecker = setInterval(function() {
        jcmp.events.CallRemote("HeightIndicator_GetPlayerStateBits", player);
    }, 1000, player);
});

jcmp.events.Add("PlayerDestroyed", (player) => {
    clearInterval(player.__HEIGHTINDICATOR__wingsuitChecker);
});

jcmp.events.Add("PlayerVehicleEntered", (player, vehicle, seat) => {
    var vehicles = getVehicles();
    var v = findMyVehicle(vehicle);
    if(v == null) {
        return;
    }
    v = v.data;
    if(v.type == "helicopter" || v.type == "plane") {
        jcmp.events.CallRemote("HeightIndicator_PlayerVehicleEntered", player);
    }
});

jcmp.events.Add("PlayerVehicleExited", (player, vehicle, seat) => {
    var vehicles = getVehicles();
    var v = findMyVehicle(vehicle);
    if(v == null) {
        return;
    }
    v = v.data;
    if(v.type == "helicopter" || v.type == "plane") {
        jcmp.events.CallRemote("HeightIndicator_PlayerVehicleExited", player);
    }
});