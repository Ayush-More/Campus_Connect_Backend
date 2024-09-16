const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsaz1qd6e",
  api_key: "185723985897728",
  api_secret: "ArYvPAvJQ0FfPqYTlIPr6BkrH3M",
});

module.exports = cloudinary;
