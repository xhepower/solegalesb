const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Ingreso, IngresoSchema } = require('./ingreso.model');
const { Cuenta, CuentaSchema } = require('./cuenta.model');
const { Concepto, ConceptoSchema } = require('./concepto.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Ingreso.init(IngresoSchema, Ingreso.config(sequelize));
  Cuenta.init(CuentaSchema, Cuenta.config(sequelize));
  Concepto.init(ConceptoSchema, Concepto.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  Ingreso.associate(sequelize.models);
  Cuenta.associate(sequelize.models);
  Concepto.associate(sequelize.models);
}

module.exports = setupModels;
