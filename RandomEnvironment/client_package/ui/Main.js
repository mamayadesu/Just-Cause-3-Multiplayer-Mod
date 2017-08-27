function Main() {
    
    this.hour = document.getElementById("hour");
    this.minute = document.getElementById("minute");
    this.colon = document.getElementById("colon");
    this.time = document.getElementById("time");
    
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
        jcmp.AddEvent("RandomEnvironment_ShowTimeEl", this.showTime);
        jcmp.AddEvent("RandomEnvironment_HideTimeEl", this.hideTime);
        this.time.bottom = 4;
        this.time.left = 10;
        document.onkeydown = function(e) {
            var main = window.__MAIN;
            if(e.which == 16) {
                if(main.time.bottom < 74) {
                    main.time.bottom += 10;
                    main.time.left += 10;
                } else {
                    main.time.bottom = 4;
                    main.time.left = 10;
                }
                main.time.style.bottom = main.time.bottom+"px";
                main.time.style.left = main.time.left+"px";
            }
        }
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
    
    this.hideTime = function() {
        var main = window.__MAIN;
        main.time.style.display = "none";
    }
    
    this.showTime = function() {
        var main = window.__MAIN;
        main.time.style.display = "";
    }
}