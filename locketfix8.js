try {
  let obj = JSON.parse($response.body);
  if (obj && obj.subscriber) {
    let d = "9999-12-31T23:59:59Z";
    obj.subscriber.entitlements = {
      "Gold": { "expires_date": d, "product_identifier": "locket_1600_1y" },
      "premium": { "expires_date": d, "product_identifier": "locket_1600_1y" },
      "pro": { "expires_date": d, "product_identifier": "locket_1600_1y" },
      "locket_gold": { "expires_date": d, "product_identifier": "locket_1600_1y" }
    };
    obj.subscriber.subscriptions = {
      "locket_1600_1y": {
        "expires_date": d,
        "purchase_date": "2024-01-01T00:00:00Z",
        "original_purchase_date": "2024-01-01T00:00:00Z",
        "store": "app_store",
        "ownership_type": "PURCHASED"
      }
    };
  }
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
