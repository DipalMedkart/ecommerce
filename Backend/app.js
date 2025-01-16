const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");

const multer = require('multer');
const fileUpload = require("express-fileupload")

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");


// cloudinary.config({
//   cloud_name: 'dly8ti3co',  // Replace with your Cloudinary cloud name
//   api_key: '569453454331936',       // Replace with your Cloudinary API key
//   api_secret: 'OCS4_4mPeid2-mbtN-ZzIiux71s', // Replace with your Cloudinary API secret
// });


dotenv.config();
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
