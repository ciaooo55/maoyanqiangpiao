/*
[rewrite_local]
^https:\/\/h5\.moutai519\.com\.cn\/xhr\/front\/trade\/priority\/rushPurchase url script-request-body https://raw.githubusercontent.com/ciaooo55/maoyanqiangpiao/refs/heads/main/111/zhangxueyou.222.7.12.js

[mitm]
hostname = h5.moutai519.com.cn
*/

const TOTAL_TIMES   = 5000;  // 总请求次数（可改）
const CONCURRENCY   = 20;    // 并发数（可改）
const GAP_MS        = 10;    // 单个请求发起前的可选延迟（毫秒，节流用，可改；为 0 表示不延迟）

// === 你的需求 ===
const NOTIFY_EVERY  = 50;    // 每 50 次完成弹一次窗
const LOG_EVERY     = 20;    // 每 20 次打印一次日志，且打印完整响应体
const SUCCESS_POPUPS= 10;    // 成功时连续弹窗次数
// =================

const FLAG_HEADER   = "X-QX-Replay";

(async () => {
  try {
    const url     = $request.url;
    const method  = $request.method;
    const headers = $request.headers || {};
    const body    = $request.body;

    // 防止递归触发
    if (headers[FLAG_HEADER]) {
      return $done({});
    }

    const baseHeaders = { ...headers, [FLAG_HEADER]: "1" };
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    let nextIndex = 0;                  // 下一个要取的序号（1..TOTAL_TIMES）
    let finished = 0;                   // 已完成数
    let success  = 0;                   // 成功次数（code === 2000）
    let nonJson  = 0;                   // 响应非 JSON 次数
    let errors   = 0;                   // fetch 失败次数

    // 取号函数（确保单线程下的原子性）
    const takeIndex = () => {
      if (nextIndex >= TOTAL_TIMES) return null;
      nextIndex += 1;
      return nextIndex;
    };

    // 单次请求执行
    const doOne = async (i) => {
      if (GAP_MS > 0) await sleep(GAP_MS);
      let parsed = null;
      let rawBody = "";
      try {
        const resp = await $task.fetch({
          url,
          method,
          headers: baseHeaders,
          body
        });
        const sc = resp.statusCode;
        rawBody = typeof resp.body === "string" ? resp.body : (resp.body || "");
        let ok = false;

        try {
          parsed = JSON.parse(rawBody);
          if (parsed && parsed.code === 2000) ok = true;
        } catch {
          nonJson += 1;
        }

        // 日志节流：仅每 LOG_EVERY 次打印一次，且打印完整响应体
        if (i % LOG_EVERY === 0) {
          console.log(`[#${i}] Status: ${sc}`);
          console.log(`[#${i}] Body: ${rawBody}`);
        }

        if (ok) {
          success += 1;
          // 抢购成功连续弹窗 N 次
          for (let k = 1; k <= SUCCESS_POPUPS; k++) {
            $notify(
              "rushPurchase",
              `成功(${success}) #${i} 第${k}/${SUCCESS_POPUPS}次`,
              rawBody && rawBody.length <= 500 ? rawBody : "code=2000"
            );
          }
        }
      } catch (e) {
        errors += 1;
        console.log(`[rush_concurrent] Error #${i}: ${String(e)}`);
      } finally {
        finished += 1;
        // 每 NOTIFY_EVERY 次做一次分段通知
        if (finished % NOTIFY_EVERY === 0) {
          $notify(
            "rushPurchase",
            `已完成 ${finished}/${TOTAL_TIMES}`,
            `成功: ${success} | 非JSON: ${nonJson} | 错误: ${errors}`
          );
        }
      }
    };

    // 工人：不断领取任务直到没有
    const worker = async (wid) => {
      while (true) {
        const i = takeIndex();
        if (i === null) break;
        await doOne(i);
      }
    };

    // 启动并发池
    const workers = [];
    const poolSize = Math.max(1, Math.min(CONCURRENCY, TOTAL_TIMES));
    for (let w = 0; w < poolSize; w++) {
      workers.push(worker(w + 1));
    }
    await Promise.all(workers);

    // 结束汇总通知
    $notify(
      "rushPurchase",
      `全部完成 ${finished}/${TOTAL_TIMES}`,
      `成功: ${success} | 非JSON: ${nonJson} | 错误: ${errors}`
    );

    $done({});
  } catch (e) {
    console.log("[rush_concurrent] Fatal:", e);
    $notify("rushPurchase", "脚本异常", String(e));
    $done({});
  }
})();
