let url = $request.url;
let body = $request.body;

// Bắt mọi request liên quan tới việc tạo Filter / Ảnh
if (url.includes("generateFilteredImage") || url.includes("applyFilter") || url.includes("generateFilter")) {
  // Ném thẳng request sang Vercel của mày
  $done({
    url: "https://locket-vercel.vercel.app/api/filter",
    body: body
  });
} else {
  // Đối với các API Locket khác, tự động bật cờ VIP
  try {
    let obj = JSON.parse($response.body);
    if (obj) {
      function scan(o) {
        for (let k in o) {
          if (typeof o[k] === 'object' && o[k] !== null) {
            scan(o[k]);
          } else {
            let key = k.toLowerCase();
            if (key.includes('gold') || key.includes('premium') || key.includes('pro')) {
              o[k] = true;
            }
            if (key.includes('duration') || key.includes('limit')) {
              if (typeof o[k] === 'number') o[k] = 45;
            }
          }
        }
      }
      scan(obj);
      $done({ body: JSON.stringify(obj) });
    } else {
      $done({});
    }
  } catch (e) {
    $done({});
  }
}
