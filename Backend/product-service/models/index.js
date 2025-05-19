const { sequelize } = require("../config/db"); 

const Brand = require("./Brand");
const Colour = require("./Colour");
const ProductCategory = require("./ProductCategory");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const ProductItem = require("./ProductItem");
const ProductReview = require("./ProductReview");
const RatingType = require("./RatingType");
const RatingProduct = require("./RatingProduct");
const SizeCategory = require("./SizeCategory");
const SizeOption = require("./SizeOption");
const HomepageSection = require("./HomepageSection");
const HomepageSectionProduct = require("./HomepageSectionProduct");
const Discount = require("./Discount");
const ProductDiscount = require("./ProductDiscount");
const Coupon = require("./Coupon");
const UserCoupon = require("./UserCoupon");
const CategoryDiscount = require("./CategoryDiscount");
const CouponCategory = require("./CouponCategory");



/* Associations */

// A Brand has many Products.
Brand.hasMany(Product, { foreignKey: "brand_id", onDelete: "CASCADE" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });

// A ProductCategory has many Products.
ProductCategory.hasMany(Product, { foreignKey: "product_category_id", onDelete: "CASCADE" });
Product.belongsTo(ProductCategory, { foreignKey: "product_category_id" });

// Self-referencing association for ProductCategory (parent/child).
ProductCategory.hasMany(ProductCategory, { foreignKey: "parent_category_id", as: "Subcategories" });
ProductCategory.belongsTo(ProductCategory, { foreignKey: "parent_category_id", as: "ParentCategory" });

// A Product has many ProductItems.
Product.hasMany(ProductItem, { foreignKey: "product_id", onDelete: "CASCADE" });
ProductItem.belongsTo(Product, { foreignKey: "product_id" });

// A Colour has many ProductItems.
Colour.hasMany(ProductItem, { foreignKey: "colour_id", onDelete: "CASCADE" });
ProductItem.belongsTo(Colour, { foreignKey: "colour_id" });

// A SizeOption has many ProductItems.
SizeOption.hasMany(ProductItem, { foreignKey: "size_id", onDelete: "CASCADE" });
ProductItem.belongsTo(SizeOption, { foreignKey: "size_id" });

// A ProductItem has many ProductImages.
ProductItem.hasMany(ProductImage, { foreignKey: "product_item_id", onDelete: "CASCADE" });
ProductImage.belongsTo(ProductItem, { foreignKey: "product_item_id" });

// A Product has many ProductReviews.
Product.hasMany(ProductReview, { foreignKey: "product_id", onDelete: "CASCADE" });
ProductReview.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE"  });

// A ProductReview has many RatingProducts.
Product.hasMany(RatingProduct, { foreignKey: "product_id", onDelete: "CASCADE" });
RatingProduct.belongsTo(Product, { foreignKey: "product_id" });

// A RatingType has many RatingProducts.
RatingType.hasMany(RatingProduct, { foreignKey: "rating_type_id", onDelete: "CASCADE" });
RatingProduct.belongsTo(RatingType, { foreignKey: "rating_type_id" });

// A SizeCategory has many SizeOptions.
SizeCategory.hasMany(SizeOption, { foreignKey: "size_category_id", onDelete: "CASCADE" });
SizeOption.belongsTo(SizeCategory, { foreignKey: "size_category_id" });

// A SizeCategory has many ProductCategories.
SizeCategory.hasMany(ProductCategory, { foreignKey: "size_category_id", onDelete: "CASCADE" });
ProductCategory.belongsTo(SizeCategory, { foreignKey: "size_category_id" });

// HomepageSection has many HomepageSectionProducts
HomepageSection.hasMany(HomepageSectionProduct, { foreignKey: "section_id", onDelete: "CASCADE" });
HomepageSectionProduct.belongsTo(HomepageSection, { foreignKey: "section_id" });

// Product has many HomepageSectionProducts
Product.hasMany(HomepageSectionProduct, { foreignKey: "product_id", onDelete: "CASCADE" });
HomepageSectionProduct.belongsTo(Product, { foreignKey: "product_id" });

// A Discount can be applied to many ProductItems via ProductDiscount.
Discount.belongsToMany(ProductItem, {
  through: ProductDiscount,
  foreignKey: "discount_id",
  otherKey: "product_item_id",
});
ProductItem.belongsToMany(Discount, {
  through: ProductDiscount,
  foreignKey: "product_item_id",
  otherKey: "discount_id",
});

// A Coupon has many UserCoupons
Coupon.hasMany(UserCoupon, { foreignKey: "coupon_id", onDelete: "CASCADE" });
UserCoupon.belongsTo(Coupon, { foreignKey: "coupon_id" });

// A Discount can be applied to many ProductCategories via CategoryDiscount.
Discount.belongsToMany(ProductCategory, {
  through: CategoryDiscount,
  foreignKey: "discount_id",
  otherKey: "product_category_id"
});
ProductCategory.belongsToMany(Discount, {
  through: CategoryDiscount,
  foreignKey: "product_category_id",
  otherKey: "discount_id"
});

// A Coupon can be applied to many ProductCategories via CouponCategory.
Coupon.belongsToMany(ProductCategory, {
  through: CouponCategory,
  foreignKey: "coupon_id",
  otherKey: "product_category_id"
});
ProductCategory.belongsToMany(Coupon, {
  through: CouponCategory,
  foreignKey: "product_category_id",
  otherKey: "coupon_id"
});



module.exports = {
  sequelize, 
  Brand,
  Colour,
  ProductCategory,
  Product,
  ProductImage,
  ProductItem,
  ProductReview,
  RatingType,
  RatingProduct,
  SizeCategory,
  SizeOption,
  HomepageSection,
  HomepageSectionProduct,
  Discount,
  ProductDiscount,
  Coupon,
  UserCoupon,
  CategoryDiscount,
  CouponCategory
};
