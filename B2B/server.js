const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const SalesOrder = require('./models/SalesOrder');
const Product = require('./models/Product');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelize.sync();

// app.get('/', (req, res) => {
//   res.status(200).send({ message: "Api is running" })
// })
const fs = require('fs');
console.log(fs.existsSync('./uploads'))

if(!fs.existsSync('./uploads')){
  fs.mkdirSync('./uploads')
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.post('/createProduct', upload.single('image'), async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await Product.create({ name, price, stock, imageUrl });

    res.status(201).json({"message":"Product Created Successfully","data":product});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/getAllProducts', async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    res.json(err)
  }

});

app.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  try{
    await Product.update(req.body, { where: { id } });
    res.json({ message: 'Product updated',data:req.body });
  }catch(err){
    res.json(err)
  }

});

app.delete('/deleteProduct/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ message: 'Product deleted' });
});


app.post('/createOrder', async (req, res) => {
  try {
    const { products, ...orderData } = req.body;
    const order = await SalesOrder.create(orderData);
    console.log(order);

    await order.addProducts(products);
    await axios.post('https://third-party-api.com/salesOrder', order, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      },
    });

    res.status(201).json({order});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/getSales', async (req, res) => {
  const { name, email, mobileNumber, status, orderDate } = req.query;
  const where = {};

  if (name) where.name = name;
  if (email) where.email = email;
  if (mobileNumber) where.mobileNumber = mobileNumber;
  if (status) where.status = status;
  if (orderDate) where.orderDate = orderDate;

  try {
    const orders = await SalesOrder.findAll({ 
      where,
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price'], 
      }]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/salesorder/:id', async (req, res) => {
  const orderId = req.params.id;
  const { name, email, mobileNumber, status, orderDate } = req.body;

  try {
    const [updated] = await SalesOrder.update(
      { name, email, mobileNumber, status, orderDate },
      { where: { id: orderId } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updatedOrder = await SalesOrder.findByPk(orderId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/salesorder/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    const result = await SalesOrder.destroy({
      where: { id: orderId }
    });

    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
