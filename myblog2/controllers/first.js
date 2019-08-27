var First_model = require("../models/first_model")
var moment = require('moment');
exports.getNum = function (req, res, next) {//获取用户当天的数据，其中有用户管理的地域的各个站的数据
  var oneAgo = moment().subtract(1,"days").format()
  var username = req.session.username;
  First_model.do_getNum(username, oneAgo, function (err, data) {//用户管理区域的当天各个站数据
    res.json(data);
  })
}
exports.getStatModeNum = async function (req, res, next) {//这个是控制第一个轮播的统计表，对应前端页面swiperOne/StatisticsMode页面的当天，3天，7天
  var oneAgo = moment().subtract(1,"days").format()
  var threeAgo = moment().subtract(3, "days").format();
  var sevenAgo = moment().subtract(7, "days").format();
  var username = req.session.username;
  var fullData = {};
  await First_model.do_getNum(username, oneAgo,function (err, data) {//用户管理区域的当天各个站数据
    fullData.now = data;
  })
  await First_model.do_getThreeNum(username, threeAgo, function (err, data) {//用户管理区域的三天前各个站的数据
    fullData.threeNum = data;
  })
  await First_model.do_getSevenNum(username, sevenAgo, function (err, data) {//用户管理区域的七天前各个站的数据
    fullData.sevenNum = data;
    res.json(fullData)
  })
}
exports.getStationInfo = function(req,res,next){//区域统计，用于前端的区域统计
  var username = req.session.username;
  First_model.do_getStationInfo(username,function(err,data){//根据用户名去找到用户管理的所有的站
    res.json(data)
  })
}

exports.getBasinInfo = function(req,res,next){//根据用户找到该用户所在流域的当天情况，data中有读数和各个该流域的站信息
  var username = req.session.username;
  var oneAgo = moment().subtract(1,"days").format()
  First_model.do_getBasinInfo(username,oneAgo,function(err,data){
    res.json(data)
  })
}

exports.getLastThree = function(req,res,next){//获取用户最近浏览过的站信息
  var username = req.session.username;
  First_model.do_getLastThree(username,function(err,data){
    res.json(data)
  })
}

exports.getStationDetail = async function(req,res,next){//用户点击站详情的页面接口
  var stationId= req.params.stationid
  var nowTime = moment().format()
  var toEndData = {}
  toEndData.word = await new Promise((resolve,reject)=>{//该站的文字信息
    First_model.do_getStationDetail(stationId,function(err,data){
      resolve(data)
    })
  }) 
  await First_model.do_upLastTime(nowTime,stationId,function(err,data){//更新最后查看时间
    console.log(data)
  })
  await First_model.do_getSevenNumByStation(toEndData.word[0].photo_day,stationId,function(err,data){//该站的七天数据，用于echarts折线图
    toEndData.num = data
    console.log(toEndData.word[0].photo_day)
    res.json(toEndData)
  })
}

exports.getBreak = function(req,res,next){//获取故障站的个数
  var username = req.session.username;
  First_model.do_getBreak(username,function(err,data){
    res.json(data)
  })
}

exports.getMapMark = function(req,res,next){//地图模式的地标数据
  var username = req.session.username;
  First_model.do_getMapMark(username,function(err,data){
    res.json(data)
  })
}