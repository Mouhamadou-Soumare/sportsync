const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;


const router = express.Router();


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("An error occurred");
});

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Get
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

// Post
router.post('/posts', asyncHandler(async (req, res) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', req.body);
    res.status(201).send(response.data);
}));
router.post('/posts/:id/comments', asyncHandler(async (req, res) => {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`);
    res.send(response.data);
}));

//Delete
router.delete('/posts/:id', asyncHandler(async (req, res) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
    res.status(204).send();
}));

//Update
router.put('/posts/:id', asyncHandler(async (req, res) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`, req.body);
    res.send(response.data);
}));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
