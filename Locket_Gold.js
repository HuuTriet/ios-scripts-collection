var body = $response.body;
var obj = JSON.parse(body);

if (obj.subscriber) {
    obj.subscriber.entitlements = {
        "gold": {
            "expires_date": "2099-12-31T23:59:59Z",
            "product_identifier": "locket_gold_yearly",
            "purchase_date": "2023-01-01T00:00:00Z"
        }
    };
    obj.subscriber.subscriptions = {
        "locket_gold_yearly": {
            "billing_issues_detected_at": null,
            "expires_date": "2099-12-31T23:59:59Z",
            "is_sandbox": false,
            "original_purchase_date": "2023-01-01T00:00:00Z",
            "ownership_type": "PURCHASED",
            "period_type": "normal",
            "store": "app_store",
            "unsubscribe_detected_at": null
        }
    };
}

$done({body: JSON.stringify(obj)});
