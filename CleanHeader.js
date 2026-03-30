/**
 * @name CleanHeader
 * @author Nguyễn Hữu Triết
 */

let headers = $request.headers;
const targetHeader = "X-RevenueCat-ETag";

Object.keys(headers).forEach(key => {
  if (key.toLowerCase() === targetHeader.toLowerCase()) {
    delete headers[key];
  }
});

$done({ headers });
