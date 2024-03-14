const axios = require('axios');
const express = require('express');
const cors = require('cors');
const liveMatchesRouter = require('./routes/liveFixturesRouter'); 
const authRouter = require('./routes/authentication');
const newsRouter = require('./routes/news');
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



router.get('/posts', asyncHandler(async (req, res) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.send(response.data);
}));

router.get('/posts/:id', asyncHandler(async (req, res) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.send(response.data);
}));

router.get('/posts/:id/comments', asyncHandler(async (req, res) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`);
    res.send(response.data);
}));

router.post('/posts', asyncHandler(async (req, res) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', req.body);
    res.status(201).send(response.data);
}));

router.post('/posts/:id/comments', asyncHandler(async (req, res) => {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`);
    res.send(response.data);
}));

router.delete('/posts/:id', asyncHandler(async (req, res) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.status(204).send();
}));

router.put('/posts/:id', asyncHandler(async (req, res) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body);
    res.send(response.data);
}));

app.use('/', router);



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
