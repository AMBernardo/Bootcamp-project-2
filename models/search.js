module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    search: DataTypes.STRING,
    price: DataTypes.DECIMAL(15, 2)
  });

  return Search;
};
