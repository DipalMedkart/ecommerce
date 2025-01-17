const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dly8ti3co',  // Replace with your Cloudinary cloud name
    api_key: '569453454331936',       // Replace with your Cloudinary API key
    api_secret: 'OCS4_4mPeid2-mbtN-ZzIiux71s', // Replace with your Cloudinary API secret
  });


  cloudinary.uploader.upload('C:\\E-commerce\\images\\slide-7.jpg', {
    folder: 'products',  // Store image in the "products" folder
  }).then(result => {   
    console.log('Image uploaded:', result.secure_url);
  }).catch(error => {
    console.log('Error uploading image:', error);
  });