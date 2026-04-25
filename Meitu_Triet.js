/**
 * @name Meitu VIP Unlock
 * @author Nguyễn Hữu Triết
 * @desc Mở khóa VIP cho Meitu (api-sub.meitu.com vN/user/vip_info_by_group.json).
 */

const body = $response.body;

if (!body) {
    $done({});
} else {
    try {
        const obj = JSON.parse(body);

        obj.data = {
            active_sub_type: 2,
            account_type: 1,
            sub_type_name: "续期",
            active_sub_order_id: "7069961436604422668",
            trial_period_invalid_time: "",
            current_order_invalid_time: "32662173600000",
            active_order_id: "7069961436340181123",
            limit_type: 0,
            active_sub_type_name: "续期",
            use_vip: true,
            have_valid_contract: true,
            derive_type_name: "普通会员",
            derive_type: 1,
            in_trial_period: false,
            is_vip: true,
            membership: {
                id: "4",
                display_name: "Meitu会员",
                level: 1,
                level_name: "普通会员"
            },
            active_promotion_status_list: [2],
            sub_type: 2,
            account_id: "1230010086",
            invalid_time: "32662195199000",
            valid_time: "1546992000000",
            active_product_id: "0",
            active_promotion_status: 2,
            show_renew_flag: true
        };

        if (obj.meta && typeof obj.meta === "object") {
            obj.meta.code = 0;
            obj.meta.msg = "ok";
        }
        if ("code" in obj) obj.code = 0;
        if ("ret" in obj) obj.ret = 0;
        if ("error" in obj) obj.error = null;

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("[Meitu_Triet] error: " + e.message);
        $done({});
    }
}
