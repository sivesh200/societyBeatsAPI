const Visitor = require('../../models').society_visitors;
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetVisitor = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    if(body.status!=undefined && body.status!=null)
    {
        [err, data] = await to(Visitor.findAll({
            where: {
                society_id: user.society_id,
                status:body.status
            },        
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    }
    else
    {
        [err, data] = await to(Visitor.findAll({
            where: {
                society_id: user.society_id
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    }

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.flat_id
                    }
                }));
                if (flatInfo != null && flatInfo != undefined) {
                    data[i].flat_info = flatInfo;

                    //tower_info
                    [err, towerInfo] = await to(TowerInfo.findOne({
                        where: {
                            society_id: user.society_id,
                            id: flatInfo.tower_id
                        }
                    }));

                    if (towerInfo != null && towerInfo != undefined) {
                        data[i].tower_info = towerInfo;
                    }

                }
            }
        }
    }

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetVisitor = GetVisitor

const GetSearchVisitor = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Visitor.findAll({
        where: {
            society_id: user.society_id,
            [Op.or]: [{
                full_name: {
                    [Op.like]: '%' + body.keyword + '%'
                }
            }, {
                mobile_number: {
                    [Op.like]: '%' + body.keyword + '%'
                }
            }],

        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.flat_id
                    }
                }));
                if (flatInfo != null && flatInfo != undefined) {
                    data[i].flat_info = flatInfo;

                    //tower_info
                    [err, towerInfo] = await to(TowerInfo.findOne({
                        where: {
                            society_id: user.society_id,
                            id: flatInfo.tower_id
                        }
                    }));

                    if (towerInfo != null && towerInfo != undefined) {
                        data[i].tower_info = towerInfo;
                    }

                }
            }
        }
    }

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetSearchVisitor = GetSearchVisitor

const VisitorIn = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;
    var date = new Date();

    body.society_id = user.society_id;
    body.visit_date = common.getDateStringCustom(date);
    body.in = common.getDateStringCustom(date);
    body.status=constants.InOutStatus.IN;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(Visitor.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully Visitor Added.',
        data: response
    });
}
module.exports.VisitorIn = VisitorIn

const VisitorOut = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;   
    var date = new Date();

    [err, data] = await to(Visitor.findOne({
        where: {
            society_id:user.society_id,
            id: body.id            
        }
    }));

    if(data !=undefined)
    {
        body.out =  common.getDateStringCustom(date);
        body.status=constants.InOutStatus.OUT;
        body.updated_by = user.id;
    
        data.set(body);
    
        [err, response] = await to(data.save());
    }  

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Updated successfully.'
    });
}
module.exports.VisitorOut = VisitorOut