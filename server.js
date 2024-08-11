const express = require('express');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', flashcardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});