require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
//import routes
const userRoute = require("./routes/users");
const folderRoute = require('./routes/files');
const todoRoute = require('./routes/todos');
//connect mongoodb 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err && console.log(err);
    console.log("Mongodb Connected");
})

//middleware 
const verifyAuth = require('./middlewares/verifyAuth');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"))

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

//api
app.get('/api', (req, res) => {
    res.sendFile(__dirname + "/api.html")
})



// router
app.use('/api/users', userRoute);
app.use('/api/folders', verifyAuth, folderRoute);
app.use('/api/todos', verifyAuth, todoRoute);





app.listen(process.env.PORT || 5000, () => {
    console.log("Starting Server...");
})