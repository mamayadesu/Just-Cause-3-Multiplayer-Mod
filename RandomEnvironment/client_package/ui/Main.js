function Main() {
    
    this.hour = document.getElementById("hour");
    this.minute = document.getElementById("minute");
    this.colon = document.getElementById("colon");
    
    this.main = function() {
        setInterval(function() {
            var main = window.__MAIN;
            if(main.colon.style.opacity == 1) {
                main.colon.style.opacity = 0;
            } else if(main.colon.style.opacity == 0) {
                main.colon.style.opacity = 1;
            }
        }, 500);
        
        jcmp.AddEvent("RandomEnvironment_SetTime", this.setTime);
    }
    
    this.setTime = function(hour, minute) {
        var sminute = minute+"";
        var shour = hour+"";
        if(sminute.length == 1) {
            sminute = "0"+sminute;
        }
        this.hour.innerHTML = shour;
        this.minute.innerHTML = sminute;
    }
}