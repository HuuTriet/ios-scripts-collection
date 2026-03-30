/**
 * @name Locket Gold Bypass
 * @author Nguyễn Hữu Triết (DE180336)
 */

const userAgent = $request.headers["User-Agent"] || $request.headers["user-agent"];
let responseObj = JSON.parse($response.body);

const appMapping = {
  'Locket': { entitlement: 'Gold', product: 'locket_gold_yearly' }
};

const premiumTemplate = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "9999-12-31T23:59:59Z",
  purchase_date: "2024-01-01T00:00:00Z",
  original_purchase_date: "2024-01-01T00:00:00Z",
  store: "app_store",
  store_transaction_id: "triet_dev_66886688",
};

const matchedApp = Object.keys(appMapping).find(key => userAgent.includes(key));

if (matchedApp) {
  const { entitlement, product } = appMapping[matchedApp];
  responseObj.subscriber.entitlements[entitlement] = { ...premiumTemplate, product_identifier: product };
  responseObj.subscriber.subscriptions[product] = premiumTemplate;
}

responseObj.subscriber.management_url = "https://github.com/HuuTriet";
$done({ body: JSON.stringify(responseObj) });
