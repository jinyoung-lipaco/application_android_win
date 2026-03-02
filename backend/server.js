const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/children', require('./routes/children'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/month-groups', require('./routes/monthGroups'));
app.use('/api/empathy-polls', require('./routes/empathyPolls'));
app.use('/api/daily-questions', require('./routes/dailyQuestions'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/vote-campaigns', require('./routes/voteCampaigns'));
app.use('/api/approved-products', require('./routes/approvedProducts'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/review-campaigns', require('./routes/reviewCampaigns'));
app.use('/api/stars', require('./routes/stars'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/search', require('./routes/search'));
app.use('/api/lounge', require('./routes/lounge'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback to frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'prototype.html'));
});

// Error handler
app.use(require('./middleware/errorHandler'));

// Start server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ alter: false });
    console.log('Models synced');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

start();
