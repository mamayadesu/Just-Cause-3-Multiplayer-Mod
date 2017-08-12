"use strict";

module.exports = ({ Command, manager }) => {
    const weathers = [
        'base',
        'rain',
        'overcast',
        'thunderstorm',
        'fog',
        'snow'
    ];
    manager.category("RandomEnvironment", "commands for RandomEnvironment package")
        .add(new Command(["retime"])
            .parameter('hour', 'number', 'hour (0-23)')
            .parameter('minute', 'number', 'minute (0-59)')
            .description('Sets time for RandomEnvironment')
            .handler((player, hour, minute) => {
                if(! freeroam.utils.isAdmin(player)) {
                    freeroam.chat.send(player, 'You\'re not allowed to use this command', freeroam.config.colours.red)
                    return;
                }
                
                if(hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                    return 'usage';
                }
                
                let formattedTime = freeroam.utils.timeFormat(hour, minute);
                jcmp.events.Call("RandomEnvironment_Time", hour, minute);
                freeroam.chat.send(player, "Set time to "+formattedTime, freeroam.config.colours.command_success);
            })
        )
        
        .add(new Command(["reweather"])
            .parameter('weather', 'string', 'available presets: base, rain, overcast, thunderstorm, fog, snow and random', {
                hints: ['base', 'rain', 'overcast', 'thunderstorm', 'fog', 'snow']
            })
            .parameter('duration', 'number', 'duration of the weather (0 = random)')
            .description('Sets weather for RandomEnvironment')
            .handler((player, weather, duration) => {
                if(! freeroam.utils.isAdmin(player)) {
                    freeroam.chat.send(player, 'You\'re not allowed to use this command', freeroam.config.colours.red)
                    return;
                }
                
                if(duration < 0) {
                    freeroam.chat.send(player, 'Duration must be over 0', freeroam.config.colours.red)
                    return;
                }
                
                const idx = weathers.indexOf(weather);
                if(idx === -1 && weather != "random") {
                    return 'usage';
                }
                jcmp.events.Call("RandomEnvironment_Weather", weather, duration);
                freeroam.chat.send(player, "Set weather to "+weather, freeroam.config.colours.command_success);
            })
        )
};
