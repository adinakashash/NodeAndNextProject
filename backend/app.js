require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const reportRouter = require("./routers/report.router");
const workerRouter = require("./routers/worker.router")
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/reports", reportRouter);
app.use("/workers", workerRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONECTION_URL,{}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));

// const express = require("express");

// const { OAuth2Client } = require('google-auth-library');
// const User = require("./models/user.schema");
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const JWT_SECRET = process.env.JWT_KEY;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const dotenv =require('dotenv');
// dotenv.config();

// const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// const app = express();
// const PORT = 3000;
// app.use(cors());
// app.use(express.json());

// app.post("/google-auth", async (req, res) => {
//   const { credential } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const email = payload?.email;

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         email,
//         name: payload.name || 'No Name',
//         authSource: 'google',
//       });
//     }

//     const token = jwt.sign({ user }, JWT_SECRET);
//     res.status(200).cookie('token', token, { httpOnly: true }).json({ payload });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
