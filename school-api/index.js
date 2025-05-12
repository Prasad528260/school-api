const express = require('express');
const app = express();
const schoolRouter = require('./routes/schoolRoutes'); // Path to the file where the routes are defined

app.use(express.json());
app.use('/api', schoolRouter);  // Prefix all routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
