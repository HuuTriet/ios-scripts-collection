try {
  let obj = JSON.parse($response.body);
  if (obj && obj.entries) {
    obj.entries.feature_gates = JSON.stringify({
      app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled",
      locket_views: "enabled", long_captions: "enabled", longer_video: "enabled",
      unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled",
      remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled",
      streak_recovery: "enabled"
    });
    obj.entries.video_duration_limit = "45";
    obj.entries.max_video_length_seconds = "45";
    obj.entries.camera_roll_enabled = "true";
    obj.entries.library_upload_enabled = "true";
  }
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
