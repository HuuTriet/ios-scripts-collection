let body = $response.body;
try {
  let obj = JSON.parse(body);
  if (obj && obj.entries) {
    
    // Cấu trúc chuẩn của Firebase phải bọc trong {"value": "..."}
    obj.entries.feature_gates = {
      "value": JSON.stringify({
        app_icon_picker: "enabled", 
        camera_roll: "enabled", 
        camera_theme: "enabled",
        locket_views: "enabled", 
        long_captions: "enabled", 
        longer_video: "enabled",
        unlimited_friends: "enabled", 
        priority_support: "enabled", 
        profile_badge: "enabled",
        remove_ads: "enabled", 
        video: "enabled", 
        custom_widget_frames: "enabled",
        streak_recovery: "enabled",
        photobooth: "enabled",
        photobooth_filters: "enabled",
        camera_filters: "enabled"
      })
    };

    // Bơm cờ video 45s (đúng format)
    obj.entries.video_duration_limit = { "value": "45" };
    obj.entries.max_video_length_seconds = { "value": "45" };
    obj.entries.camera_roll_enabled = { "value": "true" };
    obj.entries.library_upload_enabled = { "value": "true" };
    obj.entries.photobooth_enabled = { "value": "true" };
  }
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
