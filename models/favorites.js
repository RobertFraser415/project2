'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favorites.belongsTo(models.user)
      models.favorites.belongsTo(models.recipe)
    }
  };
  favorites.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    day: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorites',
  });
  return favorites;
};