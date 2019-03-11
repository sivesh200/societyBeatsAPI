const SOS = require('../../models').society_sos;
const User = require('../../models').User;
const SOSCategory = require('../../models').society_sos_category;


const GetEmergencyContactNumber = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(SOS.findAll({
        where: {
            society_id: user.society_id
        }
    }));

    [err, SOSCategoryData] = await to(SOSCategory.findAll({}));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                if (SOSCategoryData != undefined) {
                    var categoryName = SOSCategoryData.filter(x => x.id === item.category_id);
                    if(categoryName!=null && categoryName.length>0)
                    {
                        data[i].category_name = categoryName[0].title;
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
module.exports.GetEmergencyContactNumber = GetEmergencyContactNumber

const GetCategory = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(SOSCategory.findAll({}));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetCategory = GetCategory

const CreateContact = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;

    body.user_id = user.id;
    body.status = 1;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(SOS.create(body));

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
module.exports.CreateContact = CreateContact

const UpdateContact = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SOS.findOne({
        where: {
            user_id: user.id,
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
module.exports.UpdateContact = UpdateContact

const DeleteContact = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SOS.findOne({
        where: {
            user_id: user.id,
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
module.exports.DeleteContact = DeleteContact