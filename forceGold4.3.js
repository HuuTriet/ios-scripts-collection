var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);
if (ua.includes("Locket")) {
  obj.entries = obj.entries || {};
  obj.entries.feature_gates = {
    "value": JSON.stringify({ 
      app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", 
      locket_views: "enabled", long_captions: "enabled", longer_video: "enabled", 
      unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled", 
      remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled", 
      streak_recovery: "enabled", photobooth: "enabled", photobooth_filters: "enabled" 
    })
  };
  obj.entries.upsell_features = {
    "value": JSON.stringify({ 
      app_icon_picker: true, camera_roll: true, camera_theme: true, 
      locket_views: true, remove_ads: true, custom_widget_frames: true 
    })
  };
  obj.entries.video_duration_limit = { "value": "45" };
  obj.entries.max_video_length_seconds = { "value": "45" };
}
$done({ body: JSON.stringify(obj) });
