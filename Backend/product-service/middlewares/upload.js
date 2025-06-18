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

  switch (type) {
    case "brand":
        bucketName = process.env.AWS_BRAND_BUCKET_NAME;
        break;
    case "product":
        bucketName = process.env.AWS_PRODUCT_BUCKET_NAME;
        break;
    case "variant":
        bucketName = process.env.AWS_VARIANT_BUCKET_NAME;
        break;
    default:
        throw new Error("Invalid upload type specified!");
}

  return multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    //acl: "public-read", // Allows public access
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set content type
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
  },
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
          const name = req.body.product_name?.trim().replace(/\s+/g, "_").toLowerCase() || "product";
          fileName = `products/${name}_${Date.now()}.${fileExtension}`;
        } else if (type === "variant") {
          console.log("📦 Received body in uploadVariantImage: ", req.body);
          const rawColour = req.body.colour || req.body.colour_name || req.body.colour_id || '';
          const rawSize = req.body.size || req.body.size_name || req.body.size_id || '';

          const colour = String(rawColour).trim().replace(/\s+/g, "_").toLowerCase();
          const size = String(rawSize).trim().replace(/\s+/g, "_").toLowerCase();

          const baseName = [colour, size].filter(Boolean).join("_") || "variant";

          fileName = `variants/${baseName}_${Date.now()}.${fileExtension}`;
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

module.exports = { uploadBrandImage: upload("brand"), uploadProductImage: upload("product"), uploadVariantImage: upload("variant") };