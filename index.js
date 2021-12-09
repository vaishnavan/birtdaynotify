const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


//end-points
app.use('/api/v1', require("./controller/birthday.controller"));

app.get('/', (req, res) => {
    res.json({ message: 'Birthday notification API' });
});

app.listen(port, () => {
    console.log(`server up and running on port ${port}`);
});

moongoose.connect(process.env.MONGO_DB, err => {
    if (!err) {
        console.log('mongodb connected');
    } else {
        console.log(err);
    }
});
