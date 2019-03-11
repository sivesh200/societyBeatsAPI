const SocietyNotification = require('../../models').society_notification;


// Update 
const UpdateNotification = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(SocietyNotification.findOne({
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
module.exports.UpdateNotification = UpdateNotification