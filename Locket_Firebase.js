/**
 * @name Locket Gold — Firebase Remote Config Patcher
 * @desc Bật feature gates, chặn ads, mở video dài, filter, badge
 */

const body = $response.body;

if (!body) {
  $done({});
  return;
}

try {
  const obj = JSON.parse(body);

  if (!obj.entries) obj.entries = {};

  // ---------- 1. Feature gates (Gold) ----------
  obj.entries.feature_gates = JSON.stringify({
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
    streak_recovery: "enabled"
  });

  // ---------- 2. Upsell features ----------
  obj.entries.upsell_features = JSON.stringify({
    app_icon_picker: true,
    camera_roll: true,
    camera_theme: true,
    locket_views: true,
    remove_ads: true,
    custom_widget_frames: true
  });

  // ---------- 3. Tắt paywall popup ----------
  obj.entries.paywall_presentation_config = JSON.stringify({
    uid: "paywall_testflight",
    onboarding: false,
    after_sent_moment: false,
    on_foreground: false,
    interval: 2592000,
    profile_banner: true
  });

  // ---------- 4. Chặn ads & tracking ----------
  Object.assign(obj.entries, {
    history_ads_mode: "off",
    history_ads_prefetch_count: "0",
    history_ads_prefetch_immediate: "false",
    history_ads_prefetch_reroute: "false",
    history_ads_dynamic_insertion: "false",
    history_ads_refresh_prefetch_on_foreground: "false",
    history_ads_floor_price: "0",
    history_ads_floor_price_att: "0",
    history_ad_log_displayed_on_background: "false",
    history_ads_debug_menu: "false",
    sentry_sample_rate: "0",
    sentry_network_tracing: "false",
    sentry_performance_tracking: "false",
    sentry_trace_sample_rate: "0",
    sentry_profiles_sample_rate: "0"
  });

  // ---------- 5. Cờ Gold bổ sung ----------
  Object.assign(obj.entries, {
    android_subscribe_gold_button_enabled: "false",
    profile_badge_visible: "true",
    lunar_new_year_app_icon_enabled: "true"
  });

  // ---------- 6. Video dài 45s + thư viện ----------
  Object.assign(obj.entries, {
    video_duration_limit: "45",
    max_video_length_seconds: "45",
    camera_roll_enabled: "true",
    library_upload_enabled: "true"
  });

  $done({ body: JSON.stringify(obj) });

} catch (e) {
  $done({ body: body });
}
