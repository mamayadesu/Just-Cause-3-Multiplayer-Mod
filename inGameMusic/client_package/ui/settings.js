'use strict';

if(typeof module == "undefined") {
    var module = {};
}

module.exports = {
    
    /*
     * ========== PARAMETERS ==========
     * filename: It is used only for individual vehicles ("ve").
     
     * startAtRandomPosition: It works only if `synchronization` is not enabled.
                              When the player gets into the car, the track is reproduced from a random position
                              
     * synchronization: It is more useful when a track very long (for example, radio station).
                        For example, two players sit in one car and at them will play a track at identical position
     
     * maxDurationForSync: It works only if `synchronization` is enabled.
                           As synchronization is on the server side and the server can't read the audiofile, it is necessary to specify here, for example, audio file duration (in seconds).
                           You have to check and calculate file duration via any media player (Windows Media Player, etc.). 2930 seconds = 48 minutes and 50 seconds
     *
     */
    ve: {
        "v4202_plane_capstone_fighterjet_*": {
            "filename"              : "cs7_thunderhawk.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v4500_plane_solar_smallfloatprop_civilian_01": {
            "filename"              : "stria_ghibli_3.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v0405_car_mugello_moderncircuitracer_civilian_01": {
            "filename"              : "f1.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v0403_car_mugello_modernecosuper_civilian_01": {
            "filename"              : "verdeleon_3.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v0005_car_autostraad_minetruck_commercial_01": {
            "filename"              : "belaz.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v0803_car_na_monstertruck_civilian_*": {
            "filename"              : "monstertruck.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "v1202_boat_capstone_corvette_*": {
            "filename"              : "corvette.ogg",
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        }
    },
    
    /*
     * The same, but for default sounds (car.ogg, plane.ogg, etc.)
     */
    
    defaultVehicles: {
        "death": {
            // There is nothing...
        },
        "helicopter": {
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "plane": {
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "car": {
            "startAtRandomPosition" : false,
            "synchronization"       : true,
            "maxDurationForSync"    : 2930
        },
        "bike": {
            "startAtRandomPosition" : false,
            "synchronization"       : true,
            "maxDurationForSync"    : 1741
        },
        "boat": {
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "maxDurationForSync"    : 0
        },
        "wingsuit": {
            "startAtRandomPosition" : false,
            "synchronization"       : false,
            "duration"              : 487, // If you want to enable `startAtRandomPosition`, you must to check "wingsuit.ogg", calculate duration and fill it.
            "maxDurationForSync"    : 0
        },
    },
    
    timeOfFadeOutAtAnExitFromVehicle: 3,
    defaultVolume: 30
}
