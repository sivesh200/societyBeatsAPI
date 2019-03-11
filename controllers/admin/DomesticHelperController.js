const DomesticHelper = require('../../models').society_domestic_helper;
const DomesticHelperInOut = require('../../models').society_domestic_helper_in_out;
const Category = require('../../models').society_domestic_helper_category;

const common = require('../../bal/common');
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const CreateDomesticHelper = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.society_id = user.society_id;
    body.public_id = common.cryptorandomString(20);
    body.created_by = user.id;
    body.updated_by = user.id;

    if (body.image != undefined && body.image != null) {
        [err, imageName] = await to(common.base64FileUpload(body.image, constants.Upload.DOMESTIC_HELPER));
        body.image = imageName;
    }

    if (body.kyc_document1 != undefined && body.kyc_document1 != null) {
        [err, imageName] = await to(common.base64FileUpload(body.kyc_document1, constants.Upload.KYC));
        body.kyc_document1 = imageName;
    }

    if (body.kyc_document2 != undefined && body.kyc_document2 != null) {
        [err, imageName] = await to(common.base64FileUpload(body.kyc_document2, constants.Upload.KYC));
        body.kyc_document2 = imageName;
    }

    [err, response] = await to(DomesticHelper.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added.',
        data: response
    });
}
module.exports.CreateDomesticHelper = CreateDomesticHelper;

const GetDomesticHelper = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    var params = body.keyword;

    if (params == undefined) {
        return ReS(res, {
            message: 'Search keywork is requried.'
        }, 204);
    }
    else {
        
        var paramsArray = params.split('-');

        if (paramsArray != undefined && paramsArray[0] != undefined && paramsArray[0] == "E") {
            [err, data] = await to(DomesticHelper.findAll({
                where: {
                    society_id: user.society_id,
                    status: constants.Status.ACTIVE,
                    [Op.or]: [{
                        id: {
                            [Op.like]: '%' + paramsArray[1] + '%'
                        }
                    }],
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            }));
        }
        else {

            [err, data] = await to(DomesticHelper.findAll({
                where: {
                    society_id: user.society_id,
                    status: constants.Status.ACTIVE,
                    [Op.or]: [{
                        first_name: {
                            [Op.like]: '%' + body.keyword + '%'
                        }
                    }, {
                        last_name: {
                            [Op.like]: '%' + body.keyword + '%'
                        }
                    }, {
                        phone: {
                            [Op.like]: '%' + body.keyword + '%'
                        }
                    }],

                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            }));
        }
    }

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //inOutInfo
                [err, inOutInfo] = await to(DomesticHelperInOut.findOne({
                    where: {
                        society_id: user.society_id,
                        staff_id: item.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }));

                if (inOutInfo != undefined) {
                    if (inOutInfo.status == constants.InOutStatus.IN) {
                        data[i].in_out_status = constants.InOutStatus.OUT;
                    } else {
                        data[i].in_out_status = constants.InOutStatus.IN;
                    }
                } else {
                    data[i].in_out_status = constants.InOutStatus.IN;
                }

                // category Info
                [err, categoryInfo] = await to(Category.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.category_id
                    }
                }));

                if (categoryInfo != null && categoryInfo != undefined) {
                    data[i].category_info = categoryInfo;
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
module.exports.GetDomesticHelper = GetDomesticHelper

const GetAllDomesticHelper = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    [err, data] = await to(DomesticHelper.findAll({
        where: {
            society_id: user.society_id
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //inOutInfo
                [err, inOutInfo] = await to(DomesticHelperInOut.findOne({
                    where: {
                        society_id: user.society_id,
                        staff_id: item.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }));

                if (inOutInfo != undefined) {
                    if (inOutInfo.status == constants.InOutStatus.IN) {
                        data[i].in_out_status = constants.InOutStatus.OUT;
                    } else {
                        data[i].in_out_status = constants.InOutStatus.IN;
                    }
                } else {
                    data[i].in_out_status = constants.InOutStatus.IN;
                }

                // category Info
                [err, categoryInfo] = await to(Category.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.category_id
                    }
                }));

                if (categoryInfo != null && categoryInfo != undefined) {
                    data[i].category_info = categoryInfo;
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
module.exports.GetAllDomesticHelper = GetAllDomesticHelper

const GetDomesticHelperInOut = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    // Filter only In / Out  Domestic Helper
    if (body.status != undefined && body.status != null) {
        [err, data] = await to(DomesticHelperInOut.findAll({
            where: {
                society_id: user.society_id,
                status: body.status,
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    } else {
        [err, data] = await to(DomesticHelperInOut.findAll({
            where: {
                society_id: user.society_id,
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

                [err, domesticHelperInfo] = await to(DomesticHelper.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.domestic_helper_id
                    }
                }));

                if (domesticHelperInfo != undefined && domesticHelperInfo != null) {


                    // category Info
                    [err, categoryInfo] = await to(Category.findOne({
                        where: {
                            society_id: user.society_id,
                            id: domesticHelperInfo.category_id
                        }
                    }));

                    if (categoryInfo != null && categoryInfo != undefined) {
                        domesticHelperInfo.category_info = categoryInfo;
                    }

                    data[i].domestic_helper_info = domesticHelperInfo;

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
module.exports.GetDomesticHelperInOut = GetDomesticHelperInOut

const DomesticHelperInOutStatusUpdate = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.society_id = user.society_id;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(DomesticHelperInOut.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added.',
        data: response
    });
}
module.exports.DomesticHelperInOutStatusUpdate = DomesticHelperInOutStatusUpdate

const UpdateDomesticHelper = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(DomesticHelper.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

    data.set(body);

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Updated successfully.'
    });
}
module.exports.UpdateDomesticHelper = UpdateDomesticHelper;

const DeleteDomesticHelper = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(DomesticHelper.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

    data.set(body);

    [err, response] = await to(data.destroy());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Delete Successfully.'
    });
}
module.exports.DeleteDomesticHelper = DeleteDomesticHelper;
