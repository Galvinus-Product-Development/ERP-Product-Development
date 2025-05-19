const homepageService = require("../services/homepageService");

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await homepageService.getProductsBySection("featured");
    res.json(products);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const products = await homepageService.getProductsBySection("recommended");
    res.json(products);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    res.status(500).json({ error: "Failed to fetch recommended products" });
  }
};

const getSuggestedProducts = async (req, res) => {
  try {
    const products = await homepageService.getProductsBySection("suggested");
    res.json(products);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    res.status(500).json({ error: "Failed to fetch suggested products" });

  }
};

const getYouMayAlsoLikeProducts = async (req, res) => {
    try {
      const products = await homepageService.getProductsBySection("you-may-also-like");
      res.json(products);
    } catch (error) {
        console.error("Error in getFeaturedProducts:", error);
      res.status(500).json({ error: "Failed to fetch 'You May Also Like' products" });
    }
  };

module.exports = {
  getFeaturedProducts,
  getRecommendedProducts,
  getSuggestedProducts,
  getYouMayAlsoLikeProducts
};
