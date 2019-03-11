const Vehicles = require('../../models').society_vehicles;
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetAllVehicles = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(Vehicles.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {

        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.flat_id
                    }
                }));

                if (flatInfo != null && flatInfo != undefined) {
                    data[i].flat_info = flatInfo;

                    //tower_info
                    [err, towerInfo] = await to(TowerInfo.findOne({
                        where: {
                            society_id: user.society_id,
                            id: flatInfo.tower_id
                        }
                    }));

                    if (towerInfo != null && towerInfo != undefined) {
                        data[i].tower_info = towerInfo;
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
module.exports.GetAllVehicles = GetAllVehicles

const SearchVehiclesByNumber = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Vehicles.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE,
            number: {
                [Op.like]: '%' + params.number + '%'
            }
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //flat_info
                [err, flatInfo] = await to(FlatInfo.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.flat_id
                    }
                }));

                if (flatInfo != null && flatInfo != undefined) {
                    data[i].flat_info = flatInfo;

                    //tower_info
                    [err, towerInfo] = await to(TowerInfo.findOne({
                        where: {
                            society_id: user.society_id,
                            id: flatInfo.tower_id
                        }
                    }));

                    if (towerInfo != null && towerInfo != undefined) {
                        data[i].tower_info = towerInfo;
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
module.exports.SearchVehiclesByNumber = SearchVehiclesByNumber