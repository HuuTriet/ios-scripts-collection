/*
 * Locket Gold — RevenueCat response patcher
 * Patched: null-safe, offerings-aware, no User-Agent dependency
 */

const url = $request.url;
const body = $response.body;

// Chỉ xử lý khi có body
if (body) {
  try {
    let obj = JSON.parse(body);

    // ---------- Guard: subscriber phải tồn tại ----------
    if (!obj.subscriber) {
      // Response lạ (lỗi API, format thay đổi) — trả nguyên trạng, không crash
      $done({ body: body });
      return;
    }

    const sub = obj.subscriber;

    // ---------- Entitlements ----------
    if (!sub.entitlements) sub.entitlements = {};
    sub.entitlements.premium = {
      expires_date: "9999-12-31T23:59:59Z",
      product_identifier: "locket_premium",
      purchase_date: "2024-01-01T00:00:00Z"
    };

    // ---------- Subscriptions (nếu app kiểm tra) ----------
    if (!sub.subscriptions) sub.subscriptions = {};
    sub.subscriptions.locket_premium = {
      expires_date: "9999-12-31T23:59:59Z",
      purchase_date: "2024-01-01T00:00:00Z",
      period_type: "normal",
      store: "app_store"
    };

    // ---------- Bỏ management_url gây nhiễu ----------
    if (sub.management_url) delete sub.management_url;

    // ---------- Offerings endpoint ----------
    // Nếu URL chứa "/offerings", trả về offering giả để paywall không chặn
    if (url.includes("/offerings")) {
      // RevenueCat v1 trả về { offerings: [...], current_offering_id: ... }
      // Nếu body gốc không có offerings, thêm vào để app không bị nil
      if (!obj.offerings) {
        obj.offerings = [
          {
            identifier: "default",
            description: "Default offering",
            packages: [
              {
                identifier: "$rc_monthly",
                platform_product_identifier: "locket_premium_monthly"
              }
            ]
          }
        ];
      }
      if (!obj.current_offering_id) obj.current_offering_id = "default";
    }

    // ---------- Trả kết quả ----------
    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    // JSON hỏng hoặc lỗi bất ngờ — trả nguyên body, không làm sập app
    $done({ body: body });
  }
} else {
  // Không có body (304, lỗi mạng) — trả nguyên trạng
  $done({});
}
