var express = require('express');
var router = express.Router();
var User=require("../controllers/user");
var Blog=require("../controllers/blog");
var Station=require("../controllers/station");
var First = require("../controllers/first")
/* GET home page. */

router.post('/login',User.login);
router.post('/second',Station.second);
router.post('/history',Station.history);
router.post('/near',Station.near);
router.post('/more',Station.more);
//首页需要的数据
router.get('/first',First.getNum)
router.get('/statmodenum',First.getStatModeNum)
router.get('/areatotal',First.getStationInfo)
router.get('/basintotal',First.getBasinInfo)
router.get('/lastthree',First.getLastThree)
router.get('/stationdetail/:stationid',First.getStationDetail)
router.get('/getbreak',First.getBreak)
router.get('/getmapmark',First.getMapMark)

router.post('/third',Station.third);

module.exports = router;
