/**
 * @name CleanHeader Request
 * @desc Xóa If-None-Match để server không trả 304
 */

if ($request && $request.headers) {
  Object.keys($request.headers).forEach(key => {
    if (key.toLowerCase() === "if-none-match") {
      delete $request.headers[key];
    }
  });
}
$done({});
