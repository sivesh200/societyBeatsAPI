const society_visitors = require('../../models').society_visitors;

const GetAllVisitors = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(society_visitors.findAll({
        where: {
            flat_id: user.flat_id
        }
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });

}
module.exports.GetAllVisitors = GetAllVisitors;

const CreateVisitorsPass = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;

    body.user_id = user.id;
    body.flat_id=user.flat_id;
    body.status = 1;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(society_visitors.create(body));


    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully Pass Generated.'
    });
}
module.exports.CreateVisitorsPass = CreateVisitorsPass;