const SocietyNotices = require('../../models').society_notices;

const GetNotices = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(SocietyNotices.findAll({}));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });

}
module.exports.GetNotices = GetNotices


// Update 
const UpdateNotices = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyNotices.findOne({
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
module.exports.UpdateNotices = UpdateNotices