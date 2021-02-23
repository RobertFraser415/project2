'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ingredient.belongsTo(models.recipe)
    }
  };
  ingredient.init({
    name: DataTypes.STRING,
    quantity: DataTypes.STRING,
    recipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ingredient',
  });
  return ingredient;
};