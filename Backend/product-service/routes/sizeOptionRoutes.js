const express = require("express");
const router = express.Router();
const sizeOptionController = require("../controllers/sizeOptionController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { validateSizeOption, validateSizeIdParam } = require("../validators/sizeOptionValidator");

router.get("/", sizeOptionController.getSizeOptionsByCategory); //Public

router.post("/",  validateSizeOption, validationHandler, sizeOptionController.addSizeOption); // Admin only
router.put("/:size_id",  validateSizeIdParam, validateSizeOption, validationHandler, sizeOptionController.updateSizeOption); // Admin only
router.delete("/:size_id",  validateSizeIdParam, validationHandler, sizeOptionController.deleteSizeOption); // Admin only

module.exports = router;
