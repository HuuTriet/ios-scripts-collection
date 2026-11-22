let body = $response.body;
try {
  let obj = JSON.parse(body);
  
  // Hàm đệ quy quét sạch mọi ngóc ngách của JSON
  function forceHack(o) {
    for (let k in o) {
      if (typeof o[k] === 'object' && o[k] !== null) {
        forceHack(o[k]);
      } else {
        let key = k.toLowerCase();
        // Bật mọi thể loại Gold / Premium
        if (key.includes('gold') || key.includes('premium') || key === 'ispro') {
          o[k] = true;
        }
        // Ép mọi thể loại limit video lên 45
        if (key.includes('video') || key.includes('limit')) {
          if (typeof o[k] === 'number') o[k] = 45;
        }
      }
    }
  }
  
  forceHack(obj);
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
