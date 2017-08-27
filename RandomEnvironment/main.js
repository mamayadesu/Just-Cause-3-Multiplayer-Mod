'use strict';

var log = require("./log");

var time = {
    hour: 12,
    minute: 0,
    changeInterval: 3000,
    startFromRandomTime: true
}

var weathers = [
    'base',
    'rain',
    'overcast',
    'thunderstorm',
    'fog',
    'snow'
];

var __WEATHER_ENABLED = true;
var __TIME_ENABLED = true;
var __TIME_HIDDEN = false;

var waitForChangeWeather;

var WEATHER_NOW = 'base';

setInterval(function() {
    if(time.minute == 59) {
        time.minute = 0;
        if(time.hour == 23) {
            time.hour = 0;
        } else {
            time.hour++;
        }
    } else {
        time.minute++;
    }
    if(__TIME_ENABLED) {
        setTimeForAll(time.hour, time.minute);
    }
}, time.changeInterval);

jcmp.events.Add("PlayerReady", (player) => {
    setTimeout(function() {
        if(__TIME_HIDDEN) {
            jcmp.events.CallRemote("RandomEnvironment_HideTime", player);
        }
    }, 1000);
    setTimeout(function() {
        setTime(player, time.hour, time.minute);
        setWeather(player, WEATHER_NOW);
    }, 10000);
});

jcmp.events.Add("RandomEnvironment_Time", (hour, minute) => {
    setTimeForAll(hour, minute);
});

jcmp.events.Add("RandomEnvironment_SetTimeEnabled", (enabled) => {
    if(enabled) {
        __TIME_ENABLED = true;
        log("Time enabled by another plugin.");
        setTimeForAll(time.hour, time.minute);
    } else {
        __TIME_ENABLED = false;
        log("Time DISABLED by another plugin.");
    }
});

jcmp.events.Add("RandomEnvironment_SetWeatherEnabled", (enabled) => {
    if(enabled) {
        __WEATHER_ENABLED = true;
        log("Weather enabled by another plugin.");
        setWeatherForAll(WEATHER_NOW);
    } else {
        __WEATHER_ENABLED = false;
        log("Weather DISABLED by another plugin.");
    }
});

jcmp.events.Add("RandomEnvironment_ResetWeatherSettings", () => {
    log("Reset weather settings...");
    resetWeatherSettings();
    log("Weather settings has been reset by another plugin.");
});

jcmp.events.Add("RandomEnvironment_ResetTimeSettings", () => {
    log("Reset time settings...");
    resetTimeSettings();
    log("Time settings has been reset by another plugin.");
});

jcmp.events.Add("RandomEnvironment_HideTime", () => {
    log("Time was hidden by another plugin.");
    __TIME_HIDDEN = true;
    jcmp.players.forEach((p) => {
        jcmp.events.CallRemote("RandomEnvironment_HideTime", p);
    });
});

jcmp.events.Add("RandomEnvironment_ShowTime", () => {
    log("Time was shown by another plugin.");
    __TIME_HIDDEN = false;
    jcmp.players.forEach((p) => {
        jcmp.events.CallRemote("RandomEnvironment_ShowTime", p);
    });
});

jcmp.events.Add("RandomEnvironment_Weather", (weather, duration) => {
    clearTimeout(waitForChangeWeather);
    if(duration == 0) {
        duration = rand(600, 1200);
    }
    
    if(weather == "random") {
        runRandomWeather();
    } else {
        setWeatherForAll(weather);
    }
});

function setTime(player, hour, minute) {
    if(! __TIME_ENABLED) {
        log("setTime(player.name = \""+player.name+"\", "+hour+", "+minute+"): Time disabled by another plugin.");
        return;
    }
    jcmp.events.CallRemote("RandomEnvironment_SetTime", player, hour, minute);
}

function setTimeForAll(hour, minute) {
    hour = parseInt(hour);
    minute = parseInt(minute);
    time.hour = hour;
    time.minute = minute;
    if(! __TIME_ENABLED) {
        log("setTimeForAll("+hour+", "+minute+"): Time disabled by another plugin.");
        return;
    }
    var players = jcmp.players;
    var player;
    for(var k in players) {
        player = players[k];
        setTime(player, hour, minute);
    }
}

function setWeather(player, w) {
    var weather;
    if(! __WEATHER_ENABLED) {
        log("setWeather(player.name = \""+player.name+"\", "+w+"): Weather disabled by another plugin.");
        return;
    }
    if(typeof w == "string") {
        weather = weathers.indexOf(w);
        if(w == -1) {
            log("SetWeather: Wrong weather name \""+w+"\"");
            return;
        }
    } else if(typeof w == "number") {
        if(typeof weathers[w] == "undefined") {
            log("SetWeather: Wrong weather id \""+w+"\"");
            return;
        }
        weather = w;
    } else {
        log("SetWeather: Incorrect type of weather name/id ("+typeof w+")");
        return;
    }
    jcmp.events.CallRemote("RandomEnvironment_SetWeather", player, weather);
}

function setWeatherForAll(w) {
    var weather;
    if(! __WEATHER_ENABLED) {
        log("setWeatherForAll("+w+"): Weather disabled by another plugin.");
        return;
    }
    if(typeof w == "string") {
        weather = weathers.indexOf(w);
        if(weather == -1) {
            log("SetWeatherForAll: Wrong weather name \""+w+"\"");
            return;
        }
    } else if(typeof w == "number") {
        if(typeof weathers[w] == "undefined") {
            log("SetWeatherForAll: Wrong weather id \""+w+"\"");
            return;
        }
        weather = w;
    } else {
        log("SetWeatherForAll: Incorrect type of weather name/id ("+typeof w+")");
        return;
    }
    
    WEATHER_NOW = weathers[weather];
    log("Server has changed weather on: "+WEATHER_NOW);
    var players = jcmp.players;
    var player;
    for(var k in players) {
        player = players[k];
        setWeather(player, weather);
    }
}

function getRandomWeather() {
    var chances;
    if(time.hour >= 1 && time.hour <= 6) {
        chances = {
            rain: 38,
            thunderstorm: 17,
            fog: 43,
            snow: 2
        };
    } else {
        chances = {
            rain: 53,
            thunderstorm: 20,
            fog: 25,
            snow: 2
        };
    }
    var random = rand(0, 99);
    if(random <= chances.rain) {
        return 'rain';
    } else if(random > chances.rain && random <= (100 - chances.fog - chances.snow)) {
        return 'thunderstorm';
    } else if(random > chances.rain + chances.thunderstorm && random <= (100 - chances.snow)) {
        return 'fog';
    } else if(random >= 100 - chances.snow) {
        return 'snow';
    }
}

function runRandomWeather() {
    var weather = getRandomWeather();
    var timeout, duration;
    if(weather == "rain" || weather == "thunderstorm") {
        setWeatherForAll('overcast');
        if(weather == "thunderstorm") {
            timeout = rand(60, 120);
            duration = rand(600, 1800);
        } else {
            timeout = rand(90, 240);
            duration = rand(300, 900);
        }
        log("Soon weather will be changed on: "+weather);
        waitForChangeWeather = setTimeout(function() {
            setWeatherForAll(weather);
            waitForChangeWeather = setTimeout(function() {
                setWeatherForAll('base');
                waitForChangeWeather = setTimeout(runRandomWeather, rand(900, 2100) * 1000);
            }, duration * 1000);
        }, timeout * 1000, weather, duration);
    } else if(weather == "fog") {
        setWeatherForAll('fog');
        if(time.hour <= 1 && time.hour >= 6) {
            duration = rand(900, 1800);
        } else {
            duration = rand(180, 600);
        }
        waitForChangeWeather = setTimeout(function() {
            setWeatherForAll('base');
            waitForChangeWeather = setTimeout(runRandomWeather, rand(600, 2100) * 1000);
        }, duration * 1000);
    } else if(weather == "snow") {
        setWeatherForAll('snow');
        duration = 3600;
        waitForChangeWeather = setTimeout(function() {
            setWeatherForAll('base');
            waitForChangeWeather = setTimeout(runRandomWeather, rand(600, 2100) * 1000);
        }, duration * 1000);
    }
    return weather;
}

function rand(min, max) {
    if(min == undefined || max == undefined) {
        return null;
    }
    min = parseInt(min, 10)
    max = parseInt(max, 10)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetWeatherSettings() {
    if(rand(0, 100) > 50) {
        log("Server started with random weather: "+runRandomWeather());
    } else {
        var r = rand(600, 1800);
        log("Random weather will be started after "+r);
        waitForChangeWeather = setTimeout(runRandomWeather, r * 1000);
    }
}

function resetTimeSettings() {
    if(time.startFromRandomTime) {
        time.hour = rand(0, 23);
        time.minute = rand(0, 59);
        var sminute = time.minute+"";
        if(sminute.length == 1) {
            sminute = "0"+sminute;
        }
        log("Server started with random time "+time.hour+":"+sminute);
    } else {
        var sminute = time.minute;
        if(sminute.length == 1) {
            sminute += "0"+sminute;
        }
        log("Server started with time "+time.hour+":"+sminute+" (you can change after start time in '/packages/RandomEnvironment/main.js')");
    }
}
setTimeout(function() {
    resetWeatherSettings();
    resetTimeSettings();
}, 1000);