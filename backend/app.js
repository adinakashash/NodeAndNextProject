
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./routers/user.router');
const workerRouter = require('./routers/user.router');
const reportRouter = require('./routers/report.router');
const http = require("http");
const { Server } = require("socket.io");
const Report = require("./models/report.schema");

require('./middleware/Auth0');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET || 'SECRET', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}

app.use('/users', userRouter);
app.use('/workers',workerRouter)
app.use('/reports', ensureAuthenticated,ensureWorker, reportRouter);
// app.use('/add', ensureAuthenticated, additionalRoutes);

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const user = req.user;
  res.cookie('user', JSON.stringify(user));
  res.redirect('/additional-info');
});

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session', error: err });
      }
      res.clearCookie('connect.sid');
      res.clearCookie('user');
      res.json({ message: 'Logout successful' });
    });
  });
});

app.get('/', (req, res) => {
  res.send('Home Page');
});
app.get('/additional-info', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  email = req.user.email
  if (!email)
    res.redirect('http://localhost:3001/additional');
  res.redirect('http://localhost:3001/login')
});
function ensureWorker(req, res, next) {
  if (req.isAuthenticated() && req.user.isWorker) {
    return next();
  } else {
    res.status(403).json({ message: 'Forbidden: Not a worker' });
  }
}
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const userConnections = {}; 

io.on('connection', (socket) => {
  console.log('A new user has connected', socket.id);

  socket.on('register', (userId) => {
    userConnections[userId] = socket.id;
  });
;
  socket.on('message', async (message) => {
    const { text, timestamp, username, reportId } = message;

    // Fetch the report from the database
    console.log(reportId);
    const report = await Report.findById(reportId);
    console.log(report);

    if (!report) return;

    const allowedUsers = [report.reportedBy.googleId, report.handledBy];

    // Find the recipient socket ID
    console.log(userConnections);
    const recipientSocketId = userConnections[allowedUsers.find(userId => userConnections[userId] !== socket.id)];
    
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
    // Remove user connection
    for (const [userId, socketId] of Object.entries(userConnections)) {
      if (socketId === socket.id) {
        delete userConnections[userId];
        break;
      }
    }
  });
});
const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb://localhost:27017';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {})
  .then(() => app.listen(3000, () => console.log(`Server running on port ${3000}`)))
  .catch((error) => console.log(error.message));
