/*
 * Xóa header gây cache 304 cho RevenueCat
 * Chạy ở cả request và response
 */

const targetRequestHeaders = ["If-None-Match", "if-none-match"];
const targetResponseHeaders = ["ETag", "etag", "X-RevenueCat-ETag", "x-revenuecat-etag"];

// Xóa header khỏi object (không phân biệt hoa thường)
function removeHeaders(headers, targets) {
  if (!headers) return;
  Object.keys(headers).forEach(key => {
    for (const t of targets) {
      if (key.toLowerCase() === t.toLowerCase()) {
        delete headers[key];
        break;
      }
    }
  });
}

// Request: xóa If-None-Match để server không trả 304
if ($request) {
  removeHeaders($request.headers, targetRequestHeaders);
}

// Response: xóa ETag / X-RevenueCat-ETag để không bị cache
if ($response) {
  removeHeaders($response.headers, targetResponseHeaders);
}

$done({});
