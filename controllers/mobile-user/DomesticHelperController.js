const DomesticHelper = require('../../models').society_domestic_helper;
const DomesticHelperCategory = require('../../models').society_domestic_helper_category;
const UsersDomesticHelper = require('../../models').users_domestic_helper;

const GetDomesticHelperByCategory = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(DomesticHelper.findAll({
        where: {
            category_id: params.category_id,
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }));

    if (data != undefined) {
        if (data.length > 0 || data.length != undefined) {

            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];

                // category Info
                [err, categoryInfo] = await to(DomesticHelperCategory.findOne({
                    where: {
                        id: item.category_id
                    }
                }));

                if (categoryInfo != null && categoryInfo != undefined) {
                    data[i].category_info = categoryInfo;
                }

                // Check Tag / Untag
                data[i].isTag="False";
                [err, tagUntag] = await to(UsersDomesticHelper.findOne({
                    where: {
                        flat_id:user.flat_id,
                        domestic_helper_id: item.id
                    }
                }));

                if(tagUntag!=undefined && tagUntag!=null)
                {
                    data[i].isTag="True";
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
module.exports.GetDomesticHelperByCategory = GetDomesticHelperByCategory

const GetDomesticHelperCategory = async function (req, res) {

    let err, user, data;
    user = req.user;

    [err, data] = await to(DomesticHelperCategory.findAll({}));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.GetDomesticHelperCategory = GetDomesticHelperCategory

const SearchDomesticHelperByCategory = async function (req, res) {

    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(DomesticHelper.findAll({
        where:         
        {
            category_id: params.category_id,
            first_name: {
                $like: '%' + params.name + "%"
            }
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
module.exports.SearchDomesticHelperByCategory = SearchDomesticHelperByCategory

const TagDomesticHelper = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, user, response, data;
    user = req.user;
    const body = req.body;

    body.flat_id= user.flat_id;
    body.user_id = user.id;
    body.status = 1;
    body.created_by = user.id;
    body.updated_by = user.id;

    [err, response] = await to(UsersDomesticHelper.create(body));

    if (err) {
        if (err.message == 'Validation error') err = 'Please enter required filed.';
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Successfully Taged.'
    });
}
module.exports.TagDomesticHelper = TagDomesticHelper

const UntagDomesticHelper = async function (req, res) {

    let err, user, data, response;
    user = req.user;
    const body = req.body;

    [err, data] = await to(UsersDomesticHelper.findOne({
        where: {
            flat_id:user.flat_id,
            domestic_helper_id: body.domestic_helper_id
        }
    }));

    data.set(body);

    [err, response] = await to(data.destroy());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Untaged successfully.'
    });
}
module.exports.UntagDomesticHelper = UntagDomesticHelper