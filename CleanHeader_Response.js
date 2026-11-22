/**
 * @name CleanHeader Response
 * @desc Xóa ETag / X-RevenueCat-ETag để không bị cache
 */

if ($response && $response.headers) {
  const targets = ["etag", "x-revenuecat-etag"];
  Object.keys($response.headers).forEach(key => {
    if (targets.includes(key.toLowerCase())) {
      delete $response.headers[key];
    }
  });
}
$done({});
