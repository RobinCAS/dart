module.exports = function(sequelize, DataTypes) {

  var comment = sequelize.define("comment", {
    comment_id: DataTypes.UUID,
    app_id:DataTypes.UUID,
    user_sso:DataTypes.INTEGER,
    comment:DataTypes.TEXT
  },{
     classMethods: {
      associate: function(models){
        comment.belongsTo(models.dart_app, {foreignKey: 'app_id'})
       }
     }
  });

  comment.removeAttribute('id');

  return comment;

};
