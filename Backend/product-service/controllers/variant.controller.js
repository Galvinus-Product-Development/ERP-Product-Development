const VariantService = require('../services/variant.service');
const ApiResponse  = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
// const { uploadVariantImage } = require('../middlewares/upload');

const addVariantWithImages = asyncHandler(async (req, res) => {
    const variantData = req.body;
    const productId = req.params.productId;
    const images = req.files || [];
    
    const result = await VariantService.addVariantWithImages(productId, variantData, images);
    
    new ApiResponse(res, 201, {
        success:true,
        data:result,
        message: 'Variant added successfully with images'
    });
});

const addVariantImages  = asyncHandler(async (req, res) => {
    const productItemId = req.params.productItemId;
    const images = req.files || [];
    
    const variant = await VariantService.addVariantImages(productItemId, images);
    
    new ApiResponse(res, 200, {
        success:true,
        data:variant,
        message: 'Variant images uploaded successfully'
    });
});

const updateVariant = asyncHandler(async (req, res) => {
    const updatedVariant = await VariantService.updateVariant(
      req.params.variantId,
      req.body,
      req.files || [] // Pass uploaded files if any
    );
    
    new ApiResponse(res, 200, {
      success: true,
      data: updatedVariant,
      message: req.files?.length > 0 
        ? 'Variant updated with images successfully' 
        : 'Variant updated successfully'
    });
  });

const deleteVariant = asyncHandler(async (req, res) => {
    const result=await VariantService.deleteVariant(req.params.variantId);
    
    new ApiResponse(res, 200, {
        success: true,
        data:result,
        message: 'Variant deleted successfully'
    });
});
const deleteVariantImage = asyncHandler(async (req, res) => {
    const result = await VariantService.deleteVariantImage(req.params.imageId);
    
    new ApiResponse(res, 200, {
      success: true,
      data: result,
      message: 'Variant image deleted successfully'
    });
  });

const getProductVariants = asyncHandler(async (req, res) => {
    const variants = await VariantService.getProductVariants(req.params.productId);
    
    new ApiResponse(res, 200, {
        success:true,
        data:variants
    });
});


module.exports = {
    addVariantWithImages,
    addVariantImages,
    updateVariant,
    deleteVariant,
    getProductVariants,
    deleteVariantImage 
};