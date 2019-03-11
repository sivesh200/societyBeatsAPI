const Societys          = require('../../models').Societys;
const SocietyStructureMapping          = require('../../models').society_structure_mapping;
const MasterCategory          = require('../../models').master_category;
const FlatInfo = require('../../models').society_flat_info;
const TowerInfo = require('../../models').society_tower_info;
const authService   = require('./../../services/AuthService');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    //let societys = req.societys;
    let err, societys;
    [err, societys] = await to(Societys.findAll({
        include: [
           { model: SocietyStructureMapping, where: { parent_id: 0 }},           
        ]    
      }));
     
      if (societys.length > 0 || societys.length != undefined) {

        for (var i = 0, len = societys.length; i < len; i++) {

            var item = societys[i];
            let zone,tower;

            // Zone
            [err, zone] = await to(SocietyStructureMapping.findAll({
                where: {
                    society_id: item.id,                    
                    status:1,
                    parent_id:{[Op.ne]: 0}
                }
            }));

            if (zone != undefined) {
                societys[i].zone = zone;
            }

            // Tower
            [err, tower] = await to(TowerInfo.findAll({
                where: {
                    society_id: item.id,
                    status:1
                }
            }));

            if (tower != undefined) {
                societys[i].tower = tower;
            }
        }
    }

    return ReS(res, {societys:societys});
}
module.exports.get = get;

const get1 = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let societys = req.societys;
    Societys.findOne({ where: {status: '1'} }).then(society => {
        societys=society;
        return res.json({success:true, message:'it worked', data:societys});
    });
    
}
module.exports.get1 = get1;

const get2 = function(req, res){
	let user = {
        "societys": [
            {
                "id": 1,
                "society_token_no": "dkjd343ddfjj",
                "society_name": "Aditya Mega City, Inirapuram",
                "alternate_name": null,
                "logo": null,
                "username": "test",
                "password": "test",
                "brief_info": null,
                "configuration_status": null,
                "status": 1,
                "note": null,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2018-04-13T00:00:00.000Z",
                "updated_at": "2018-04-13T00:00:00.000Z",
                "society_structure_mappings": [
                    // {
                    //     "master_category_id": 1,
                    //     "master_category_title": "Zone"
                    // },
                    // {
                    //     "master_category_id": 2,
                    //     "master_category_title": "Block"
                    // },
                    {
                        "master_category_id": 4,
                        "master_category_title": "Tower"
                    }
                ]
            },
            {
                "id": 2,
                "society_token_no": "sdsdsfwyeuwddd",
                "society_name": "Jaipurias Sunrise Greens",
                "alternate_name": null,
                "logo": null,
                "username": "test",
                "password": "test",
                "brief_info": null,
                "configuration_status": null,
                "status": 1,
                "note": null,
                "created_by": 1,
                "updated_by": 1,
                "created_at": "2018-04-13T00:00:00.000Z",
                "updated_at": "2018-04-13T00:00:00.000Z",
                "society_structure_mappings": [
                    {
                        "master_category_id": 3,
                        "master_category_title": "Avenue"
                    },
                    {
                        "master_category_id": 4,
                        "master_category_title": "Tower"
                    }
                ]
            }
        ],
        "success": true
    };
	return res.json(user);
}
module.exports.get2 = get2

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let Societys = req.Societys;
    let err, companies;

    [err, companies] = await to(user.getCompanies({include: [ {association: Company.Users} ] }));
    //[err, companies] = await to(user);

    let companies_json =[]
    for( let i in companies){
        let company = companies[i];
        let users =  company.Users;
        let company_info = company.toWeb();
        let users_info = [];
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        company_info.users = users_info;
        companies_json.push(company_info);
    }

    console.log('c t', companies_json);
    return ReS(res, {companies:companies_json});
}
module.exports.getAll = getAll;

// function randomString(length, chars) {
//     var mask = '';
//     if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
//     if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     if (chars.indexOf('#') > -1) mask += '0123456789';
//     if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
//     var result = '';
//     for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
//     return result;
// }

// console.log(randomString(16, 'aA'));
// console.log(randomString(32, '#aA'));
// console.log(randomString(64, '#A!'));