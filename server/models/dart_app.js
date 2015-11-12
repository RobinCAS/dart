module.exports = function(sequelize, DataTypes) {

  var dart_app = sequelize.define("dart_app", {
    app_id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    app_name:DataTypes.TEXT,
    app_desc:DataTypes.TEXT,
    app_category:DataTypes.STRING,
    app_impact: DataTypes.STRING,
    app_class:DataTypes.STRING,
    app_owner:DataTypes.TEXT,
    app_link:DataTypes.TEXT,
    app_func_owner:DataTypes.TEXT
  },{
     classMethods: {
      associate: function(models){
        dart_app.hasMany(models.comment, {foreignKey: 'app_id'})
       }
     }
  });

  dart_app.removeAttribute('id');
  return dart_app;

};
