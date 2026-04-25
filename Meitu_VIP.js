var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

if (obj.data) {
    obj.data.is_vip = true;
    obj.data.vip_type = 1;
    obj.data.expire_time = "2030-12-31 23:59:59";
}

$done({body: JSON.stringify(obj)});
