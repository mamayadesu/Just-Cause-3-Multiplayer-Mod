"use strict";

module.exports = ({ Command, manager }) => {
    manager.category("vehicle", "vehicle commands")
        .add(new Command(["vhealth"])
            .parameter("vhealth", "number", "vehicle hp")
            .description("Sets HP of your vehicle")
            .handler((player, hp) => {
                if(typeof player.vehicle === "undefined") {
                    freeroam.chat.send(player, "You must be in a vehicle to use this command.", freeroam.config.colours.command_fail);
                    return;
                }
                if(typeof player.vehicle._INVINCIBLITY != "undefined" && player.vehicle._INVINCIBLITY != null) {
                    freeroam.chat.send(player, "Your can't change HP of your car, because it's invincible. Use /usi (/unsetinvinciblity) to remove invinciblity.", freeroam.config.colours.command_fail);
                    return;
                }
                freeroam.chat.send(player, "Setting your vehicles HP to "+hp+".", freeroam.config.colours.command_success);
                player.vehicle.health = hp;
            })
        )
    
        .add(new Command(["vhp"])
            .description("Returns HP of your vehicle")
            .handler((player) => {
                if(typeof player.vehicle === "undefined") {
                    freeroam.chat.send(player, "You must be in a vehicle to use this command.", freeroam.config.colours.command_fail);
                    return;
                }
                var output = "HP of your vehicle is "+player.vehicle.health+".";
                if(typeof player.vehicle._INVINCIBLITY != "undefined" && player.vehicle._INVINCIBLITY != null) {
                    output += " Your vehicle is invincible!";
                }
                freeroam.chat.send(player, output, freeroam.config.colours.command_success);
            })
        )
    
        .add(new Command(["si", "setinvincible"])
            .description("Set your vehicle invincible")
            .handler((player) => {
                if(typeof player.vehicle === "undefined") {
                    freeroam.chat.send(player, "You must be in a vehicle to use this command.", freeroam.config.colours.command_fail);
                    return;
                }
                player.vehicle._INVINCIBLITY = setInterval(function(vehicle) {
                    if(typeof this._veh == "undefined") {
                        this._veh = vehicle;
                    }
                    this._veh.health = 700;
                }, 1, player.vehicle);
                freeroam.chat.send(player, "Now your vehicle is invincible!", freeroam.config.colours.command_success);
            })
        )
        
        .add(new Command(["usi", "unsetinvincible"])
            .description("Unsets your vehicle invincible")
            .handler((player) => {
                if(typeof player.vehicle === "undefined") {
                    freeroam.chat.send(player, "You must be in a vehicle to use this command.", freeroam.config.colours.command_fail);
                    return;
                }
                if(typeof player.vehicle._INVINCIBLITY != "undefined" && player.vehicle._INVINCIBLITY != null) {
                    clearInterval(player.vehicle._INVINCIBLITY);
                    player.vehicle._INVINCIBLITY = null;
                    freeroam.chat.send(player, "Now your vehicle is not invincible.", freeroam.config.colours.command_success);
                }
            })
        )
};
