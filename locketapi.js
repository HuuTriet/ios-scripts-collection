let body = $response.body;
try {
  let obj = JSON.parse(body);
  // Quét đệ quy tìm mọi cờ premium của server Locket
  function forcePremium(o) {
    for (let k in o) {
      if (typeof o[k] === 'object' && o[k] !== null) {
        forcePremium(o[k]);
      } else {
        let key = k.toLowerCase();
        // Bật mọi thể loại Gold / Premium / Pro
        if (key.includes('gold') || key.includes('premium') || key.includes('pro') || key === 'ispro' || key === 'haspremium') {
          o[k] = true;
        }
        // Ép mọi thể loại limit video lên 45
        if (key.includes('limit') || key.includes('duration')) {
          if (typeof o[k] === 'number') o[k] = 45;
        }
      }
    }
  }
  forcePremium(obj);
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
