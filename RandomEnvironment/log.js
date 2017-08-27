'use strict';

module.exports = function log(text) {
    var date = new Date;
    var d = date.getDate()+"",
        m = (date.getMonth() + 1)+"",
        y = date.getFullYear(),
        
        h = date.getHours()+"",
        mi = (date.getMinutes())+"",
        s = (date.getSeconds())+"";
    if(s.length == 1) {
        s = "0"+s;
    }
    if(mi.length == 1) {
        mi = "0"+mi;
    }
    if(h.length == 1) {
        h = "0"+h;
    }
    if(m.length == 1) {
        m = "0"+m;
    }
    if(d.length == 1) {
        d = "0"+d;
    }
    var formattedDate = y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;
    console.log("["+formattedDate+"]  [RandomEnvironment]: "+text);
}