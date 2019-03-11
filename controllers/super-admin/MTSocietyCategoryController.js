const MTSocietyCategory = require('../../models').master_category;
var constants = require('../../middleware/constants');

const GetAllSocietyCategory = async function (req, res) {

    let err, data;

    [err, data] = await to(MTSocietyCategory.findAll({
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
module.exports.GetAllSocietyCategory = GetAllSocietyCategory

const CreateSocietyCategory = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;

    body.status = 1;
    [err, response] = await to(MTSocietyCategory.create(body));

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
module.exports.CreateSocietyCategory = CreateSocietyCategory

const UpdateSocietyCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTSocietyCategory.findOne({
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
module.exports.UpdateSocietyCategory = UpdateSocietyCategory

const DeleteSocietyCategory = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(MTSocietyCategory.findOne({
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
module.exports.DeleteSocietyCategory = DeleteSocietyCategory