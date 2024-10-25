const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes');

const app = express();
const PORT = 3000;
npm 

app.use(express.json());

console.log('PORT:', PORT);


app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);


app.use('/auth', router);

mongoose
  .connect("mongodb+srv://karthikvarmachekuri555:Kathik#555@cluster0.y7cmc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
