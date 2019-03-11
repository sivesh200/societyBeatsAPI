const Staff = require('../../models').society_staff;
const StaffInOut = require('../../models').society_staff_in_out;
const Category = require('../../models').society_domestic_helper_category;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const CreateStaff = async function (req, res) {

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
        [err, imageName] = await to(common.base64FileUpload(body.image, constants.Upload.STAFF_PROFILE));
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

    [err, response] = await to(Staff.create(body));

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
module.exports.CreateStaff = CreateStaff;

const GetStaff = async function (req, res) {

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
            [err, data] = await to(Staff.findAll({
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

            [err, data] = await to(Staff.findAll({
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
                [err, inOutInfo] = await to(StaffInOut.findOne({
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
module.exports.GetStaff = GetStaff

const GetAllStaff = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Staff.findAll({
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
                [err, inOutInfo] = await to(StaffInOut.findOne({
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
module.exports.GetAllStaff = GetAllStaff

const GetStaffInOut = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    // Filter only In / Out  Staff
    if (body.status != undefined && body.status != null) {
        [err, data] = await to(StaffInOut.findAll({
            where: {
                society_id: user.society_id,
                status: body.status,
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    } else {
        [err, data] = await to(StaffInOut.findAll({
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

                [err, staffInfo] = await to(Staff.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.staff_id
                    }
                }));

                if (staffInfo != undefined && staffInfo != null) {


                    // category Info
                    [err, categoryInfo] = await to(Category.findOne({
                        where: {
                            society_id: user.society_id,
                            id: staffInfo.category_id
                        }
                    }));

                    if (categoryInfo != null && categoryInfo != undefined) {
                        staffInfo.category_info = categoryInfo;
                    }

                    data[i].staff_info = staffInfo;

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
module.exports.GetStaffInOut = GetStaffInOut

const StaffInOutStatusUpdate = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.society_id = user.society_id;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(StaffInOut.create(body));

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
module.exports.StaffInOutStatusUpdate = StaffInOutStatusUpdate

const UpdateStaff = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Staff.findOne({
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
module.exports.UpdateStaff = UpdateStaff;

const DeleteStaff = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Staff.findOne({
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
module.exports.DeleteStaff = DeleteStaff;
