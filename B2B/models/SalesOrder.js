const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('../models/Product');

const SalesOrder = sequelize.define('SalesOrder', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  mobileNumber: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  products: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false, defaultValue: [] }
});

SalesOrder.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(SalesOrder, { through: 'OrderProducts' });
module.exports = SalesOrder;
