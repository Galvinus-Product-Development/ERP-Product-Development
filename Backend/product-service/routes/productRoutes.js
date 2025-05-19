const express = require("express");
const ProductController = require("../controllers/productController");
//const { } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { logIncomingRequestBody, productValidator, productUpdateValidator, validateUuidParam } = require("../validators/productValidator");
//const { uploadProductImage } = require("../middlewares/upload");

const router = express.Router();

// Public routes
router.get("/by-category/:category_name", ProductController.getProductsByCategory);
router.get("/product-statuses", ProductController.getProductStatuses);
// Get all products
router.get("/", ProductController.getAllProducts); 
// Get a single product by ID
router.get("/:product_id", validateUuidParam("product_id"), validationHandler, ProductController.getProduct); 
// Admin-only routes (with authentication and validation)
// Create a new product with variants
router.post("/", logIncomingRequestBody, productValidator, validationHandler, (req, res, next) => {  
    console.log("Validated Data: ", req.body); // Log validated data  
    ProductController.addProduct(req, res).catch(next); // Catch potential errors  
});   

router.put("/:product_id",  validateUuidParam("product_id"), productUpdateValidator,  validationHandler, ProductController.updateProduct); 
router.delete("/:product_id",  validateUuidParam("product_id"), validationHandler, ProductController.deleteRestoreProduct);

router.patch("/:product_id/restore",  validateUuidParam("product_id"), validationHandler, ProductController.deleteRestoreProduct); 




module.exports = router;
