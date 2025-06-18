const express = require("express");
const router = express.Router();
const  ratingTypeController  = require("../controllers/ratingTypeController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateRatingType, validateRatingTypeIdParam } = require("../validators/ratingTypeValidator");

router.get("/", ratingTypeController.getAllRatingTypes);

router.post("/",   validateRatingType, validationHandler, ratingTypeController.addRatingType); // Admin-only
router.put("/:rating_type_id",  validateRatingTypeIdParam, validateRatingType, validationHandler, ratingTypeController.updateRatingType); // Admin-only
router.delete("/:rating_type_id",   validateRatingTypeIdParam, validationHandler, ratingTypeController.deleteRatingType); // Admin-only

module.exports = router;
