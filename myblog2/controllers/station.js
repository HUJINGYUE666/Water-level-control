var Station_model = require("../models/station_model")
var moment = require('moment')

exports.second = async function (req, res, next) {
    var uid = req.session.user_id;
    var today = moment().subtract(7, 'days').format('YYYY-MM-DD');
    var stationId = req.body.stationId;
    var toEndData = {}
    toEndData.word = await new Promise((resolve, reject) => {
        Station_model.sel_second_by_data(uid, today, function (err, data) {
            // console.log(data)
            resolve(data)
        })
    })
    await Station_model.sel_chart_by_data(uid, today, stationId, function (err, data) {
        toEndData.num = data
        // console.log(toEndData.word[0].photo_day)
        res.json(toEndData)
    })
}

exports.history = function (req, res, next) {
    var uid = req.session.user_id;
    var now = req.body.now;
    var stationId = req.body.stationId;
    Station_model.sel_history_by_data(uid, now, stationId, function (err, data) {
        if (data.length > 0) {
            // console.log(data);
            res.json({ //result
                code: 1,
                msg: '成功',
                data
            })
        } else {
            res.json({
                code: 0,
                msg: '失败'
            })
        }
    })
}

exports.near = function (req, res, next) {
    var uid = req.session.user_id;
    var stationId = req.body.stationId;
    Station_model.sel_near_by_data(uid, stationId,function (err, data) {
        if (data.length > 0) {
            // console.log(data);
            res.json({ //result
                code: 1,
                msg: '成功',
                data
            })
        } else {
            res.json({
                code: 0,
                msg: '失败'
            })
        }
    })
}

exports.more = function (req, res, next) {
    var uid = req.session.user_id;
    var stationId = req.body.stationId;
    Station_model.sel_more_by_data(uid, stationId, function (err, data) {
        if (data.length > 0) {
            // console.log(data);
            res.json({ //result
                code: 1,
                msg: '成功',
                data
            })
        } else {
            res.json({
                code: 0,
                msg: '失败'
            })
        }
    })
}

exports.third = function (req, res, next) {
    var uid = req.session.user_id;
    var time = moment().subtract(1, 'days').format('YYYY-MM-DD');
    Station_model.sel_third_by_data(uid, time, function (err, data) {
        if (data.length > 0) {
            // console.log(data);
            res.json({ //result
                code: 1,
                msg: '成功',
                data
            })
        } else {
            res.json({
                code: 0,
                msg: '失败'
            })
        }
    })
}