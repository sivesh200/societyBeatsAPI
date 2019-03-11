const SocietyNotices = require('../../models').society_notices;
var constants = require('../../middleware/constants');
const common = require('../../bal/common');

const GetNotices = async function (req, res) {

    let err, user, data;
    user = req.user;
    
    [err, data] = await to(SocietyNotices.findAll({
        where:{
            society_id:user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [['updatedAt', 'DESC']]
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetNotices = GetNotices

const CreateNotices = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.society_id = user.society_id;

    if (body.attachment1 != undefined && body.attachment1 != null) {
        [err, imageName] = await to(common.base64FileUpload(body.attachment1, constants.Upload.NOTICE));
        body.attachment1 = imageName;
    }

    if (body.attachment2 != undefined && body.attachment2 != null) {
        [err, imageName] = await to(common.base64FileUpload(body.attachment2, constants.Upload.NOTICE));
        body.attachment2 = imageName;
    }

    [err, response] = await to(SocietyNotices.create(body));

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
module.exports.CreateNotices = CreateNotices

const UpdateNotices = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;   

    [err, data] = await to(SocietyNotices.findOne({
        where: {
            id: body.id,
            society_id:user.society_id
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
module.exports.UpdateNotices = UpdateNotices

const DeleteNotices = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyNotices.findOne({
        where: {
            id: body.id,
            society_id:user.society_id
        }
    }));

    if(data==undefined || data=="")
    {
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
module.exports.DeleteNotices = DeleteNotices