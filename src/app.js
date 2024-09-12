const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');
const app = express();
require('dotenv').config();
const { swaggerDocument, swaggerUi } = require('./config/swagger');
const PORT = process.env.PORT || 3000;


// Set EJS as the view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
app.use('/api/swaggerdocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port 3000');
  });
});
