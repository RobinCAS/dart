module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("User", {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER
  }
);

  return Task;
};
