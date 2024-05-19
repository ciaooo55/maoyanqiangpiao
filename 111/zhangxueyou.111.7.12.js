const response = {
  "code": 200,
  "msg": "",
  "data": [
    {
      "showTicketClassId": 21071025,
      "ticketClassId": 21071025,
      "performanceId": 323031,
      "showId": 1879517,
      "ticketPrice": 2280.00,
      "sellPrice": 2280.00,
      "setNumber": 1,
      "set": false,
      "description": null,
      "ticketName": "内场",
      "editStatus": 1,
      "stockable": true,
      "rgb": "",
      "rectIds": null,
      "ticketLevel": "",
      "setDiscountInfoList": null,
      "baseTicketID": 0,
      "salesPlanVO": {
        "salesPlanId": 21071025,
        "showId": 1879517,
        "ticketClassId": 21071025,
        "name": "",
        "tpId": 1249,
        "tpName": "猫眼自营",
        "tpServiceNo": "10105335",
        "set": false,
        "setNum": 1,
        "ticketPrice": 2280.00,
        "supplierPrice": 2211.60,
        "sellPrice": 2280.00,
        "maxBuyLimit": 4,
        "minBuyLimit": 0,
        "currentAmount": 4,
        "salesTip": "渠道真票保证",
        "hasInventory": true,
        "sellStatus": 3,
        "sellPriceList": [2280.00, 4560.00, 6840.00, 9120.00, 11400.00, 13680.00, 15960.00, 18240.00, 20520.00, 22800.00, 25080.00, 27360.00, 29640.00, 31920.00, 34200.00, 36480.00, 38760.00, 41040.00, 43320.00, 45600.00],
        "selfSupply": true,
        "labels": [
          {
            "type": 1,
            "desc": "官方票源"
          }
        ],
        "ticketName": "内场",
        "canSellBySellChannel": true,
        "premium": false
      },
      "memberInfoVO": null,
      "discountSum": 0.00,
      "onSaleTime": null,
      "specificTimeSale": 0,
      "maxBuyLimit": 0,
      "minBuyLimit": 0,
      "userBuyLimit": 4,
      "remainingStock": 4,
      "tpId": 1249,
      "salesPlanId": 21071025,
      "supplierPrice": 2211.60,
      "showStatus": 0,
      "discount": null,
      "sortWeight": 0,
      "activityRuleList": null
    },
    // 更多数据项...
  ],
  "paging": null,
  "attrMaps": {
    "serverTime": null
  },
  "success": true
};

// 将response对象转换为JSON字符串
const jsonResponse = JSON.stringify(response, null, 2);
console.log(jsonResponse);
