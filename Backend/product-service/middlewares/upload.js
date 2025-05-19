const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
//const s3 = require("../config/aws");
require("dotenv").config();

// Initialize S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"]; // Allowed file types

const upload = (type) => {
  let bucketName;

  if (type === "brand") {
    bucketName = process.env.AWS_BRAND_BUCKET_NAME;
  } else if (type === "product") {
    bucketName = process.env.AWS_PRODUCT_BUCKET_NAME;
  } else {
    throw new Error("Invalid upload type specified!");
  }

  return multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    //acl: "public-read", // Allows public access
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set content type
    key: function (req, file, cb) {
      try {
        const fileExtension = file.originalname.split(".").pop();
        let fileName;

        if (type === "brand") {
          if (!req.body.brand_name) {
            return cb(new Error("Brand name is required for brand image upload!"), false);
          }
          const brandName = req.body.brand_name.trim().replace(/\s+/g, "_").toLowerCase();
          fileName = `brands/${brandName}_${Date.now()}.${fileExtension}`;
        } else if (type === "product") {
          if (!req.params.product_item_id) {
            return cb(new Error("Product Item ID is required for product image upload!"), false);
          }
          fileName = `products/${req.params.product_item_id}_${Date.now()}.${fileExtension}`;
        }

        cb(null, fileName);
      } catch (error) {
        cb(error, null);
      }
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, GIF, and WebP images are allowed!"), false);
    }
    cb(null, true);
  },
});
};

module.exports = { uploadBrandImage: upload("brand"), uploadProductImage: upload("product") };