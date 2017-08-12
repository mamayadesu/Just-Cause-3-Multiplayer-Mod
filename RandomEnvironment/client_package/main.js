const ui = new WebUIWindow('randomenvironment_ui', 'package://randomenvironment/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.AddRemoteCallable("RandomEnvironment_SetTime", (hour, minute) => {
    jcmp.world.SetTime(hour, minute, 0);
    jcmp.ui.CallEvent('RandomEnvironment_SetTime', hour, minute);
});

jcmp.events.AddRemoteCallable('RandomEnvironment_SetWeather', weather => {
    jcmp.world.weather = weather;
});