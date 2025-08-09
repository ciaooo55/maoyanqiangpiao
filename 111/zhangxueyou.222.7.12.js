/*
[rewrite_local]
^https:\/\/h5\.moutai519\.com\.cn\/xhr\/front\/trade\/priority\/rushPurchase url script-request-body https://raw.githubusercontent.com/ciaooo55/maoyanqiangpiao/refs/heads/main/111/zhangxueyou.222.7.12.js

[mitm]
hostname = h5.moutai519.com.cn
*/
const TIMES = 50;
const GAP_MS = 30;
const FLAG_HEADER = "X-QX-Replay";

(async () => {
  try {
    const url = $request.url;
    const method = $request.method;
    const headers = $request.headers;
    const body = $request.body;

    // 防止递归触发
    if (headers[FLAG_HEADER]) {
      return $done({});
    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    for (let i = 0; i < TIMES; i++) {
      if (i > 0) await sleep(GAP_MS);
      try {
        const resp = await $task.fetch({
          url,
          method,
          headers: { ...headers, [FLAG_HEADER]: "1" },
          body
        });
        // 日志打印完整响应
        console.log(`[#${i+1}] Status: ${resp.statusCode}`);
        console.log(`[#${i+1}] Body: ${resp.body}`);

        try {
          const json = JSON.parse(resp.body);
          if (json.code === 2000) {
            $notify("rushPurchase", `第${i+1}次`, "成功");
          } else {
            $notify("rushPurchase", `第${i+1}次`, "继续尝试");
          }
        } catch {
          $notify("rushPurchase", `第${i+1}次`, "响应非 JSON");
        }
      } catch (err) {
        console.log(`[rush_clone_notify] Error #${i+1}:`, err);
      }
    }

    // 所有请求完成后再结束脚本
    $done({});
  } catch (e) {
    console.log("[rush_clone_notify] Fatal:", e);
    $done({});
  }
})();
