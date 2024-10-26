const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const repairRoutes = require('./routes/routes'); // Ensure this path is correct

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust this if your frontend is on a different port
  })
);

// Register routes with the '/api' prefix
app.use('/api', repairRoutes);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://shivavarma336:shiva123@cluster0.h97ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true, // Deprecated but still works for now
      useUnifiedTopology: true, // Deprecated but still works for now
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
