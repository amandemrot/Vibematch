const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file, folder) => {
    try {
        const uploaded = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: "auto",
        });

        return uploaded.secure_url;
    } catch (error) {
        throw new Error("Cloudinary Upload Failed");
    }
};

module.exports = uploadToCloudinary;
