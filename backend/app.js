require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./routers/user.router');
const reportRouter = require('./routers/report.router');
// const auth0Routes = require('./routers/Auth0');

require('./middleware/Auth0');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(cookieParser());
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use('/users', userRouter);
app.use('/reports', reportRouter);
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
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
      res.json({ message: 'Logout successful' });
    });
  });
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});
app.get('/', (req, res) => {
  res.send('Home Page');
});


const CONNECTION_URL = 'mongodb://localhost:27017/users';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {})
  .then(() => app.listen(3000, () => console.log(`Server running on port ${3000}`)))
  .catch((error) => console.log(error.message));
