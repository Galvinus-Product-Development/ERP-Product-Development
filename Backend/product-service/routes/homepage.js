const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepageController");

router.get("/featured", homepageController.getFeaturedProducts);
router.get("/recommended", homepageController.getRecommendedProducts);
router.get("/suggested", homepageController.getSuggestedProducts);
router.get("/you-may-also-like", homepageController.getYouMayAlsoLikeProducts);

module.exports = router;
