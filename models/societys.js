'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Societys', {
    society_token_no: { type: DataTypes.STRING },
    society_name: { type: DataTypes.STRING },
    alternate_name: { type: DataTypes.STRING },
    logo: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    brief_info: { type: DataTypes.STRING },
    full_address: { type: DataTypes.STRING },
    configuration_status: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    note: { type: DataTypes.STRING },
    zone: { type: DataTypes.STRING },
    tower: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER },
    updated_by: { type: DataTypes.INTEGER },
  }, {underscored: true});

  Model.associate = function(models){
      //this.Users = this.belongsToMany(models.User, {through: 'UserCompany'});
      Model.hasMany(models.User,{
        foreignkey:"society_id"
      });
  
      Model.hasMany(models.society_contact_info,{
        foreignkey:"society_id"
      });
  
      Model.hasMany(models.society_structure_mapping,{
        foreignkey:"society_id"
      });
  };

  Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

  return Model;
};