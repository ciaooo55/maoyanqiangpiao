/*
 * 脚本功能：修改指定链接的响应体中的字段值
 */


const responseBody = {"code":200,"msg":"","data":[{"showId":1879517,"name":"加载成功","performanceId":323031,"startTimeDateFormatted":"2024-06-15","startTimeWeekFormatted":"周六","startTimeTimeFormatted":"19:00","startTime":1700000000000,"endTime":1718456400000,"onSaleTime":0,"offSaleTime":0,"hasInventory":true,"showStatus":0,"showType":1,"showNote":"","areaUrl":null,"areaSvg":null,"areaSvgUrl":null,"showSeatType":0,"setExplain":"","showOrderLimitVO":{"maxBuyLimitPerOrder":4,"maxBuyLimitPerUser":4,"userAlreadyBuyNum":0,"userRemainBuyNum":4},"unusualStatus":0,"needFaceCheck":false,"seatMode":0,"hasDiscount":false,"minSellPrice":null,"preSelectVO":null,"soldOut":false,"normal":true,"default":false}],"paging":null,"attrMaps":{"serverTime":1715588112318},"success":true};

$done({body: JSON.stringify(responseBody)});
