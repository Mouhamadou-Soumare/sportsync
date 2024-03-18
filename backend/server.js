const axios = require('axios');
const express = require('express');
const cors = require('cors');
const liveMatchesRouter = require('./routes/apifootball'); 
const authRouter = require('./routes/authentication');
const newsRouter = require('./routes/jsonactus');
const path = require('path'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.use('/footballapi', liveMatchesRouter);

app.use('/auth', authRouter);

app.use('/news', newsRouter);



app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("An error occurred");
});

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);




app.use('/', router);



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
