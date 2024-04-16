const express = require('express');
const path = require('path');
const app = express();

const angular_app_name = "clothing_website"
// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '/dist/'+angular_app_name)));

// Handle all GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/'+angular_app_name+'/index.html'));
});

// Set port and start server
const PORT = process.env.PORT || 2880;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
