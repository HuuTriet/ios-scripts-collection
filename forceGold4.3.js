// ============================================================ //
// Locket Remote Config Rewrite
// Endpoint: firebaseremoteconfig.googleapis.com
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);
if (ua.includes("Locket")) {
  obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
  obj.entries = obj.entries || {};
  
  // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
  Object.assign(obj.entries, {
    feature_gates: JSON.stringify({ app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", locket_views: "enabled", long_captions: "enabled", longer_video: "enabled", unlimited_friends: "enabled", priority_support: "enabled", profile_badge: "enabled", remove_ads: "enabled", video: "enabled", custom_widget_frames: "enabled", streak_recovery: "enabled" }),
    upsell_features: JSON.stringify({ app_icon_picker: true, camera_roll: true, camera_theme: true, locket_views: true, remove_ads: true, custom_widget_frames: true }),
    paywall_presentation_config: JSON.stringify({ uid: "paywall_testflight", onboarding: false, after_sent_moment: false, on_foreground: false, interval: 2592000, profile_banner: true }),
    feature_discovery_popup_config: JSON.stringify({ tag: "LOCKET GOLD NMS", tag_gradient: true, tag_style: "gold_gradient", title: "Đã Kich Hoạt ", feature_set: [ { title: "Youtube @NightmarketServer ✨", body: "Nhớ Follow Kênh Ủng Hộ Mình Nhé ", imageURL: "https://i.postimg.cc/15BPkqNN/173376ce-0cb2-411c-80db-fe9adc931718.png" } ], primary_button_title: "Xong", campaign: "locket_gold_welcome_v3", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59", use_local_time_zone: true }),
    android_subscribe_gold_button_enabled: "false",
    profile_badge_visible: "true",
    lunar_new_year_app_icon_enabled: "true",
  });

  // 2. CHẶN QUẢNG CÁO & TẮT TRACKING (SENTRY)
  Object.assign(obj.entries, {
    history_ads_mode: "off", history_ads_prefetch_count: "0", history_ads_prefetch_immediate: "false", history_ads_prefetch_reroute: "false", history_ads_dynamic_insertion: "false", history_ads_refresh_prefetch_on_foreground: "false", history_ads_floor_price: "0", history_ads_floor_price_att: "0", history_ad_log_displayed_on_background: "false", history_ads_debug_menu: "false", sentry_sample_rate: "0", sentry_network_tracing: "false", sentry_performance_tracking: "false", sentry_trace_sample_rate: "0", sentry_profiles_sample_rate: "0"
  });

  // 3. CAMERA, VIDEO, FILTERS & UPLOAD QUALITY
  Object.assign(obj.entries, {
    camera_roll_enabled: "true", library_upload_enabled: "true", video_duration_limit: "45", max_video_length_seconds: "45"
  });
}
$done({ body: JSON.stringify(obj) });
