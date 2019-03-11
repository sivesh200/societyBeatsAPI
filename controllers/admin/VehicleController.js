const Vehicles = require('../../models').society_vehicles;
const VehiclesInOut = require('../../models').society_vehicle_in_out;
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
var constants = require('../../middleware/constants');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetVehicles = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Vehicles.findAll({
        where: {
            society_id: user.society_id,
            status: constants.Status.ACTIVE,
            number: {
                [Op.like]: '%' + body.number + '%'
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

                //inOutInfo
                [err, inOutInfo] = await to(VehiclesInOut.findOne({
                    where: {
                        society_id: user.society_id,
                        vehicle_id: item.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }));

                if (inOutInfo != undefined) {
                    if (inOutInfo.status == constants.InOutStatus.IN) {
                        data[i].in_out_status = constants.InOutStatus.OUT;
                    } else {
                        data[i].in_out_status = constants.InOutStatus.IN;
                    }
                } else {
                    data[i].in_out_status = constants.InOutStatus.IN;
                }
                

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
module.exports.GetVehicles = GetVehicles

const GetVehiclesInOut = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    // Filter only In Vehicles
    if(body.status!=undefined && body.status!=null)
    {
        [err, data] = await to(VehiclesInOut.findAll({
            where: {
                society_id: user.society_id,
                status:body.status,
            },        
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    }
    else
    {
        [err, data] = await to(VehiclesInOut.findAll({
            where: {
                society_id: user.society_id,
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        }));
    }   

    if (data != undefined) {

        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                [err, vehiclesInfo] = await to(Vehicles.findOne({
                    where: {
                        society_id: user.society_id,
                        id: item.vehicle_id
                    }
                }));

                if (vehiclesInfo != undefined && vehiclesInfo != null) {

                    //flat_info
                    [err, flatInfo] = await to(FlatInfo.findOne({
                        where: {
                            society_id: user.society_id,
                            id: vehiclesInfo.flat_id
                        }
                    }));

                    if (flatInfo != null && flatInfo != undefined) {
                        vehiclesInfo.flat_info = flatInfo;

                        //tower_info
                        [err, towerInfo] = await to(TowerInfo.findOne({
                            where: {
                                society_id: user.society_id,
                                id: flatInfo.tower_id
                            }
                        }));

                        if (towerInfo != null && towerInfo != undefined) {
                            vehiclesInfo.tower_info = towerInfo;
                        }
                    }

                    data[i].vehicle_info = vehiclesInfo;
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
module.exports.GetVehiclesInOut = GetVehiclesInOut

const VehiclesInOutStatusUpdate = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.society_id = user.society_id;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(VehiclesInOut.create(body));

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
module.exports.VehiclesInOutStatusUpdate = VehiclesInOutStatusUpdate

const CreateVehicle = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    const body = req.body;
    user = req.user;

    body.status = constants.Status.ACTIVE;
    body.society_id = user.society_id;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(Vehicles.create(body));

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
module.exports.CreateVehicle = CreateVehicle;

const GetAllVehicle = async function (req, res) {

    let err, user, data;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Vehicles.findAll({
        where: {
            society_id: user.society_id
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                //inOutInfo
                [err, inOutInfo] = await to(VehiclesInOut.findOne({
                    where: {
                        society_id: user.society_id,
                        vehicle_id: item.id
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ]
                }));

                if (inOutInfo != undefined) {
                    if (inOutInfo.status == constants.InOutStatus.IN) {
                        data[i].in_out_status = constants.InOutStatus.OUT;
                    } else {
                        data[i].in_out_status = constants.InOutStatus.IN;
                    }
                } else {
                    data[i].in_out_status = constants.InOutStatus.IN;
                }
                

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
module.exports.GetAllVehicle = GetAllVehicle

const UpdateVehicle = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Vehicles.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
        }
    }));

    if (data == undefined || data == "") {
        return ReE(res, 'Record not found.');
    }

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
module.exports.UpdateVehicle = UpdateVehicle;

const DeleteVehicle = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(Vehicles.findOne({
        where: {
            id: body.id,
            society_id: user.society_id
        }
    }));

    if (data == undefined || data == "") {
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
module.exports.DeleteVehicle = DeleteVehicle;
