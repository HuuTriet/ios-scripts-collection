let body = $response.body;
try {
  let obj = JSON.parse(body);
  if (obj && obj.entries) {
    
    // 1. Feature Gates (Bơm thẳng, đéo cần check User-Agent)
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
    
    // 2. Upsell Features
    obj.entries.upsell_features = {
      "value": JSON.stringify({ 
        app_icon_picker: true, 
        camera_roll: true, 
        camera_theme: true, 
        locket_views: true, 
        remove_ads: true, 
        custom_widget_frames: true 
      })
    };
    
    // 3. Ép Video và Thư viện ảnh
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
