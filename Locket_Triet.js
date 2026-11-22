/**
 * @name Locket Gold Bypass
 * @author Nguyễn Hữu Triết (patched by ollie)
 * @desc Null-safe, offerings-aware, no User-Agent dependency
 */

$notify("Locket Debug", "RevenueCat Script ĐÃ CHẠY", $request.url);

const body = $response.body;

if (!body) {
  $done({});
  return;
}

try {
  const obj = JSON.parse(body);

  // Guard: subscriber phải tồn tại, nếu không thì trả nguyên trạng
  if (!obj.subscriber) {
    $done({ body: body });
    return;
  }

  const sub = obj.subscriber;

  // ---------- Entitlements ----------
  if (!sub.entitlements) sub.entitlements = {};
  sub.entitlements.Gold = {
    expires_date: "9999-12-31T23:59:59Z",
    product_identifier: "locket_gold_yearly",
    purchase_date: "2024-01-01T00:00:00Z",
    original_purchase_date: "2024-01-01T00:00:00Z",
    store: "app_store",
    ownership_type: "PURCHASED",
    period_type: "normal",
    is_sandbox: false
  };

  // ---------- Subscriptions ----------
  if (!sub.subscriptions) sub.subscriptions = {};
  sub.subscriptions.locket_gold_yearly = {
    expires_date: "9999-12-31T23:59:59Z",
    purchase_date: "2024-01-01T00:00:00Z",
    original_purchase_date: "2024-01-01T00:00:00Z",
    store: "app_store",
    ownership_type: "PURCHASED",
    period_type: "normal",
    is_sandbox: false
  };

  // Bỏ management_url gây nhiễu
  if (sub.management_url) delete sub.management_url;

  // ---------- Endpoint /offerings ----------
  if ($request.url && $request.url.includes("/offerings")) {
    if (!obj.offerings) {
      obj.offerings = [
        {
          identifier: "default",
          description: "Default offering",
          packages: [
            {
              identifier: "$rc_monthly",
              platform_product_identifier: "locket_gold_yearly"
            }
          ]
        }
      ];
    }
    if (!obj.current_offering_id) obj.current_offering_id = "default";
  }

  $done({ body: JSON.stringify(obj) });

} catch (e) {
  // JSON lỗi → trả nguyên body gốc, không làm sập app
  $done({ body: body });
}
