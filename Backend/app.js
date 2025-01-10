const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product.routes');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.use('/auth', authRoutes);
app.use('/products', productRoutes);


app.get('/', (req, res) => {
    res.send('Backend is running!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});