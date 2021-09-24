// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Catagory.hasMany(Product, {
    foreignKey: 'catagory_id',
    onDelete: 'SET NULL',
});

Product.belongsTo(Catagory, {
    foreignKey: 'catagory_id,'
});

Tag.belongsToMany(Product, {
    through: ProductTag
});

Product.belongsToMany(Tag, {
    through: ProductTag
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};