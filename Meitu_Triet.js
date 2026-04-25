/**
 * @name Meitu VIP Unlock
 * @author Nguyễn Hữu Triết
 * @desc Mở khóa VIP Meitu. Merge field thay vì ghi đè để giữ nguyên dữ liệu user gốc.
 */

const body = $response.body;

if (!body) {
    $done({});
} else {
    try {
        const obj = JSON.parse(body);

        const vipPatch = {
            is_vip: true,
            vip_type: 1,
            expire_time: "2099-12-31 23:59:59",
            in_valid_time: true,
            is_valid_user: true,
            membership: {
                id: "1",
                display_name: "Meitu VIP",
                level: 1,
                level_name: "Premium"
            },
            active_sub_type: 2,
            show_renew_flag: true,
            is_lifelong_vip: true,
            is_continuous_month: false
        };

        obj.data = Object.assign({}, obj.data || {}, vipPatch);

        if (obj.meta && typeof obj.meta === "object") {
            obj.meta.code = 0;
            obj.meta.msg = "ok";
        }
        if ("code" in obj) obj.code = 0;
        if ("ret" in obj) obj.ret = 0;
        if ("error" in obj) obj.error = null;

        console.log("[Meitu_Triet] VIP patched: " + ($request.url || ""));
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("[Meitu_Triet] Error: " + e.message);
        $done({});
    }
}
