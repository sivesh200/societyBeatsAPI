const UsersDomesticHelper = require('../../models').users_domestic_helper;
const DomesticHelperInOut = require('../../models').society_domestic_helper_in_out;

const Visitors = require('../../models').society_visitors;
const VisitorInOut = require('../../models').society_visitors_in_out;

const Vehicle = require('../../models').society_vehicles;
const VehicleInOut = require('../../models').society_vehicle_in_out;


const GetSecurity = async function (req, res) {

    let err, user, data, domesticHelperRes, visitorsRes, vehiclesRes;
    user = req.user;

    [err, visitorsRes] = await to(Visitors.findAll({
        where: {
            flat_id: user.flat_id
        }
    }));

    [err, vehiclesRes] = await to(Vehicle.findAll({
        where: {
            flat_id: user.flat_id
        }
    }));


    [err, domesticHelperRes] = await to(UsersDomesticHelper.findAll({
        where: {
            flat_id: user.flat_id
        }
    }));

    data = {
        "DomesticHelper": domesticHelperRes,
        "Vehicles": vehiclesRes,
        "Visitor": visitorsRes
    };

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetSecurity = GetSecurity;