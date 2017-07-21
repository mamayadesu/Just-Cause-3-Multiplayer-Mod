'use strict';

const igm_ui = new WebUIWindow("igm_ui", "package://inGameMusicUI/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y)); // default location: package://inGameMusicUI/ui/index.html
igm_ui.autoResize = true;

/*jcmp.events.AddRemoteCallable("inGameMusic_reload", () => {
    igm_ui.Reload(true);
});*/

jcmp.events.AddRemoteCallable("inGameMusic_toggleSettings", toggle => {
    // ToDo: make check
    jcmp.ui.CallEvent("inGameMusic_toggleSettings");
});

jcmp.events.AddRemoteCallable("inGameMusic_deathui", () => {
    jcmp.ui.CallEvent('inGameMusic_deathui_start');
    setTimeout(function() {
        jcmp.ui.CallEvent('inGameMusic_deathui_stop');
    }, 4000);
});

jcmp.events.AddRemoteCallable("inGameMusic_PlayerVehicleEntered", () => {
    jcmp.ui.CallEvent('inGameMusic_PlayerVehicleEntered');
});

jcmp.events.AddRemoteCallable("inGameMusic_PlayerVehicleExited", () => {
    jcmp.ui.CallEvent('inGameMusic_PlayerVehicleExited');
});

jcmp.events.AddRemoteCallable("inGameMusic_inhelicopterui_start", (ct) => {
    jcmp.ui.CallEvent('inGameMusic_inhelicopterui_start', ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_inhelicopterui_stop", () => {
    jcmp.ui.CallEvent('inGameMusic_inhelicopterui_stop');
});



jcmp.events.AddRemoteCallable("inGameMusic_inplaneui_start", (ct) => {
    jcmp.ui.CallEvent('inGameMusic_inplaneui_start', ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_inplaneui_stop", () => {
    jcmp.ui.CallEvent('inGameMusic_inplaneui_stop');
});



jcmp.events.AddRemoteCallable("inGameMusic_incarui_start", (ct) => {
    jcmp.ui.CallEvent('inGameMusic_incarui_start', ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_incarui_stop", () => {
    jcmp.ui.CallEvent('inGameMusic_incarui_stop');
});



jcmp.events.AddRemoteCallable("inGameMusic_onbikeui_start", (ct) => {
    jcmp.ui.CallEvent('inGameMusic_onbikeui_start', ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_onbikeui_stop", () => {
    jcmp.ui.CallEvent('inGameMusic_onbikeui_stop');
});



jcmp.events.AddRemoteCallable("inGameMusic_inboatui_start", (ct) => {
    jcmp.ui.CallEvent('inGameMusic_inboatui_start', ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_inboatui_stop", () => {
    jcmp.ui.CallEvent('inGameMusic_inboatui_stop');
});

jcmp.events.AddRemoteCallable("inGameMusic_fv_start", (vi, ct) => {
    jcmp.ui.CallEvent('inGameMusic_fv_start', vi, ct);
});
jcmp.events.AddRemoteCallable("inGameMusic_fv_stop", (vi) => {
    jcmp.ui.CallEvent('inGameMusic_fv_stop', vi);
});
