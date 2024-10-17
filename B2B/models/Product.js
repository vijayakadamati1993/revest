const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  stock: { type: DataTypes.INTEGER },
  imageUrl: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Product;
sequelize.sync({ alter: true })
