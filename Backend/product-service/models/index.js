const { sequelize } = require("../config/db"); 

const Brand = require("./Brand");
const Colour = require("./Colour");
const VariantType = require("./VariantType");
const ProductCategory = require("./ProductCategory");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const ProductItem = require("./ProductItem");
const ProductVariantImage = require("./ProductVariantImage");
const ProductReview = require("./ProductReview");
const RatingType = require("./RatingType");
const RatingProduct = require("./RatingProduct");
const SizeOption = require("./SizeOption");
const HomepageSection = require("./HomepageSection");
const HomepageSectionProduct = require("./HomepageSectionProduct");
const Coupon = require('./Coupon');
const CouponReward = require('./CouponReward');
const CouponRule = require('./CouponRule');
const CouponRewardCategory = require('./CouponRewardCategory');
const CouponRewardProduct = require('./CouponRewardProduct');
const CouponRuleCategory = require('./CouponRuleCategory');
const CouponRuleProduct = require('./CouponRuleProduct');
const CouponUsage = require('./CouponUsage');


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

// Product - Product Image association
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Product Item - Product Variant Image association
ProductItem.hasMany(ProductVariantImage, { foreignKey: 'product_item_id', as: 'variantImages' });
ProductVariantImage.belongsTo(ProductItem, { foreignKey: 'product_item_id', as: 'productItem' });

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
ProductCategory.hasMany(SizeOption, { foreignKey: "product_category_id",  as: 'sizes', onDelete: "CASCADE" });
SizeOption.belongsTo(ProductCategory, { foreignKey: "product_category_id", as: 'category' });

// HomepageSection has many HomepageSectionProducts
HomepageSection.hasMany(HomepageSectionProduct, { foreignKey: "section_id", onDelete: "CASCADE" });
HomepageSectionProduct.belongsTo(HomepageSection, { foreignKey: "section_id" });

// Product has many HomepageSectionProducts
Product.hasMany(HomepageSectionProduct, { foreignKey: "product_id", onDelete: "CASCADE" });
HomepageSectionProduct.belongsTo(Product, { foreignKey: "product_id" });


  // Coupon associations
  Coupon.hasMany(CouponReward, { foreignKey: 'coupon_id', as: 'rewards' });
  CouponReward.belongsTo(Coupon, { foreignKey: 'coupon_id', as: 'coupon' });

  Coupon.hasMany(CouponRule, { foreignKey: 'coupon_id', as: 'rules' });
  CouponRule.belongsTo(Coupon, { foreignKey: 'coupon_id', as: 'coupon' });

  Coupon.hasMany(CouponUsage, { foreignKey: 'coupon_id', as: 'usages' });
  CouponUsage.belongsTo(Coupon, { foreignKey: 'coupon_id', as: 'coupon' });

  // Coupon Reward associations
  CouponReward.hasMany(CouponRewardCategory, { foreignKey: 'reward_id', as: 'rewardCategories' });
  CouponRewardCategory.belongsTo(CouponReward, { foreignKey: 'reward_id', as: 'reward' });

  CouponReward.hasMany(CouponRewardProduct, { foreignKey: 'reward_id', as: 'rewardProducts' });
  CouponRewardProduct.belongsTo(CouponReward, { foreignKey: 'reward_id', as: 'reward' });

  ProductCategory.hasMany(CouponRewardCategory, { foreignKey: 'product_category_id', as: 'couponRewards' });
  CouponRewardCategory.belongsTo(ProductCategory, { foreignKey: 'product_category_id', as: 'category' });

  Product.hasMany(CouponRewardProduct, { foreignKey: 'product_id', as: 'couponRewards' });
  CouponRewardProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Coupon Rule associations
  CouponRule.hasMany(CouponRuleCategory, { foreignKey: 'rule_id', as: 'ruleCategories' });
  CouponRuleCategory.belongsTo(CouponRule, { foreignKey: 'rule_id', as: 'rule' });

  CouponRule.hasMany(CouponRuleProduct, { foreignKey: 'rule_id', as: 'ruleProducts' });
  CouponRuleProduct.belongsTo(CouponRule, { foreignKey: 'rule_id', as: 'rule' });

  ProductCategory.hasMany(CouponRuleCategory, { foreignKey: 'product_category_id', as: 'couponRules' });
  CouponRuleCategory.belongsTo(ProductCategory, { foreignKey: 'product_category_id', as: 'category' });

  Product.hasMany(CouponRuleProduct, { foreignKey: 'product_id', as: 'couponRules' });
  CouponRuleProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });



module.exports = {
  sequelize, 
  Brand,
  Colour,
  ProductCategory,
  Product,
  ProductImage,
  ProductItem,
  ProductVariantImage,
  ProductReview,
  RatingType,
  RatingProduct,
  SizeOption,
  HomepageSection,
  HomepageSectionProduct,
  Coupon,
  CouponReward,
  CouponRule,
  CouponRewardCategory,
  CouponRewardProduct,
  CouponRuleCategory,
  CouponRuleProduct,
  CouponUsage,
  VariantType
};
