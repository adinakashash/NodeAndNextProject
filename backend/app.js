require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONECTION_URL,{}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));

    