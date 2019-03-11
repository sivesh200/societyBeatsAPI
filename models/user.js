'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    
    var Model = sequelize.define('User', {
        first: DataTypes.STRING,
        last: DataTypes.STRING,
        blood_group: DataTypes.STRING,
        gender: DataTypes.STRING,
        dob: DataTypes.STRING,
        profesion: DataTypes.STRING,
        picture: DataTypes.STRING,
        email: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: { msg: "email id invalid." } } },
        
          is_email_verified: {
            type:DataTypes.ENUM('True', 'False'),      
          },
          email2: {
            type:DataTypes.STRING,     
          },
          phone: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { len: { args: [7, 20], msg: "Phone number invalid, too short." }, isNumeric: { msg: "not a valid phone number." } } },
          is_phone_verified: {
            type:DataTypes.ENUM('True', 'False'),     
          },
          phone2: {
            type:DataTypes.STRING,     
          },      
        
        password: DataTypes.STRING,
        isPrivacyOn:DataTypes.INTEGER,
        family_details: DataTypes.STRING,
        familySize: DataTypes.STRING,
        relation: DataTypes.INTEGER,
        is_primary:{
            type:DataTypes.ENUM('True', 'False'),     
          },
          flat_id: {
            type:DataTypes.INTEGER,     
          },
          flat_token_no: {
            type:DataTypes.STRING,     
          },
        address: {
            type:DataTypes.STRING,     
          },
          city: {
            type:DataTypes.STRING,     
          },
          district: {
            type:DataTypes.STRING,     
          },
          state: {
            type:DataTypes.STRING,     
          },
          country: {
            type:DataTypes.STRING,     
          },
          zipcode: {
            type:DataTypes.STRING,     
          },
          landmark: {
            type:DataTypes.STRING,     
          },
          status: {
            type:DataTypes.INTEGER,     
          },
          type: {
            type:DataTypes.INTEGER,     
          },
          service_type: {
            type:DataTypes.INTEGER,     
          },
          device_id: {
            type:DataTypes.STRING,     
          },
          platform: {
            type:DataTypes.STRING,     
          },
          app_version: {
            type:DataTypes.STRING,     
          },
          push_id: {
            type:DataTypes.STRING,     
          },
    }, {underscored: true});

    Model.associate = function (models) {
        //this.Companies = this.belongsToMany(models.Company, { through: 'society_contact_info' });
    };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if (!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);

        if (!pass) TE('invalid password');

        return this;
    }

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};