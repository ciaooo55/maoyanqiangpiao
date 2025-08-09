/*
[rewrite_local]
^https:\/\/h5\.moutai519\.com\.cn\/xhr\/front\/trade\/priority\/rushPurchase url script-request-body https://raw.githubusercontent.com/ciaooo55/maoyanqiangpiao/refs/heads/main/111/zhangxueyou.222.7.12.js

[mitm]
hostname = h5.moutai519.com.cn
*/
// 完全克隆 rushPurchase 请求，重放 10 次，每次间隔 30ms
// code != 2000 弹窗继续尝试，code == 2000 弹窗成功
const TIMES = 10;   // 重放次数
const GAP_MS = 30;  // 间隔毫秒
const FLAG_HEADER = "X-QX-Replay";

(async () => {
  try {
    const url = $request.url;
    const method = $request.method;
    const headers = $request.headers;
    const body = $request.body;

    if (headers[FLAG_HEADER]) {
      return $done({});
    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    for (let i = 0; i < TIMES; i++) {
      if (i > 0) await sleep(GAP_MS);

      $task.fetch({
        url,
        method,
        headers: { ...headers, [FLAG_HEADER]: "1" },
        body
      }).then(resp => {
        // 日志输出完整响应
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
      }).catch(err => {
        console.log(`[rush_clone] Error #${i+1}:`, err);
      });
    }

    $done({});
  } catch (e) {
    console.log("[rush_clone] Fatal error:", e);
    $done({});
  }
})();
