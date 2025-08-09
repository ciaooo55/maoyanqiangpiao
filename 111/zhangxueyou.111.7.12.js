/*
[rewrite_local]
^https:\/\/h5\.moutai519\.com\.cn\/xhr\/front\/mall\/item\/purchaseInfoV2 url script-response-body https://raw.githubusercontent.com/ciaooo55/maoyanqiangpiao/refs/heads/main/111/zhangxueyou.111.7.12.js

[mitm]
hostname = h5.moutai519.com.cn
*/
let body = $response.body;
try {
  let obj = JSON.parse(body);
  if (obj?.data?.purchaseInfoMap) {
    for (const k in obj.data.purchaseInfoMap) {
      const pi = obj.data.purchaseInfoMap[k]?.purchaseInfo;
      if (!pi) continue;
      pi.inventory = 999;        // 充足库存
      pi.canAddCart = true;      // 可加购物车
      pi.disable = false;        // 未禁用
      pi.forbiddenBuyDesc = "";  // 无购买限制提示
      pi.inDeliveryArea = true;  // 配送范围有效
    }
  }
  body = JSON.stringify(obj);
} catch (e) { console.log("force_buy err:", e); }
$done({ body });
