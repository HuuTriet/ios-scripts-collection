let headers = $request.headers;
for (let key in headers) {
  if (key.toLowerCase() === "x-revenuecat-etag" || key.toLowerCase() === "if-none-match") {
    delete headers[key];
  }
}
$done({ headers: headers });
