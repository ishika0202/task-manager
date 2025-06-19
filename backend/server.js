const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
