
const TowerInfo = require('../../models').society_tower_info;
var constants = require('./../../middleware/constants');

const GetAllTower = async function (req, res) {

    let err, data;

    [err, data] = await to(TowerInfo.findAll({
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
module.exports.GetAllTower = GetAllTower
