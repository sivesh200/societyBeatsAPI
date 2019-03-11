const MTMaintanence = require('../../models').master_maintanence_services;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');

const GetAllMaintanenceCategory = async function (req, res) {

    let err, data;

    [err, data] = await to(MTMaintanence.findAll({
        where: {
            status: constants.Status.ACTIVE
        }
    }));

    if (err) {
        return ReE(res, err, 200);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetAllMaintanenceCategory = GetAllMaintanenceCategory

const CreateMaintanenceCategory = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;

    body.status = 1;
    if (body.image_url != undefined && body.image_url != null) {
        [err, imageName] = await to(common.base64FileUpload(body.image_url, constants.Upload.MAINTENANCE));
        body.image_url = imageName;
    }

    [err, response] = await to(MTMaintanence.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully added',
        data: response
    });
}
module.exports.CreateMaintanenceCategory = CreateMaintanenceCategory

const UpdateMaintanenceCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTMaintanence.findOne({
        where: {
            id: body.id
        }
    }));

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
module.exports.UpdateMaintanenceCategory = UpdateMaintanenceCategory

const DeleteMaintanenceCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTMaintanence.findOne({
        where: {
            id: body.id
        }
    }));

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
module.exports.DeleteMaintanenceCategory = DeleteMaintanenceCategory