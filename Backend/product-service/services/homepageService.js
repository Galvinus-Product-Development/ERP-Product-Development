const { HomepageSection, HomepageSectionProduct, Product, ProductItem, ProductImage } = require("../models");

const getProductsBySection = async (sectionName) => {
  try {
    const section = await HomepageSection.findOne({ where: { section_name: sectionName } });
    if (!section) return [];

    const mappings = await HomepageSectionProduct.findAll({
      where: { section_id: section.section_id },
      include: [
        {
          model: Product,
          attributes: ['product_id', 'product_name'],
          include: [
            {
              model: ProductItem,
              attributes: ['sale_price', 'original_price', 'qty_in_stocks', 'product_item_id'],
              include: [
                {
                  model: ProductImage,
                  attributes: ['image_url'],
                },
              ],
            },
          ],
        },
      ],
      order: [['priority', 'ASC']],
    });

   // console.dir(mappings, { depth: null });
   return mappings
   .filter(entry => entry.Product)
   .map((entry) => {
     const product = entry.Product;
     const firstItem = Array.isArray(product.ProductItems) ? product.ProductItems[0] : null;
     const firstImage = Array.isArray(firstItem?.ProductImages) ? firstItem.ProductImages[0] : null;

     return {
       product_id: product.product_id,
       product_name: product.product_name,
       ProductItems: [
         {
           sale_price: firstItem?.sale_price || null,
           original_price: firstItem?.original_price || null,
           qty_in_stocks: firstItem?.qty_in_stocks || 0,
           product_item_id: firstItem?.product_item_id || null,
           ProductImages: [
             {
               image_url: firstImage?.image_url || null,
             },
           ],
         },
       ],
     };
   });

  } catch (error) {
    console.error("Error in getProductsBySection:", error);
    return [];
  }
};

module.exports = {
  getProductsBySection,
};
