const MTSOS = require('../../models').society_sos_category;
var constants = require('../../middleware/constants');

const GetAllSOSCategory = async function (req, res) {

    let err, data;

    [err, data] = await to(MTSOS.findAll({
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
module.exports.GetAllSOSCategory = GetAllSOSCategory

const CreateSOSCategory = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;

    body.status = 1;
    [err, response] = await to(MTSOS.create(body));

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
module.exports.CreateSOSCategory = CreateSOSCategory

const UpdateSOSCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTSOS.findOne({
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
module.exports.UpdateSOSCategory = UpdateSOSCategory

const DeleteSOSCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTSOS.findOne({
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
module.exports.DeleteSOSCategory = DeleteSOSCategory