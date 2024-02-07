import { v2 as cloudinary } from "cloudinary";
// "dmeakrcx3",
// "742439943443317",
// "S57gH4TtDHhkaMYIz2XPTZ8PE8k",
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
