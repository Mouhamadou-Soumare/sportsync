const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;

// Multiple routing
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

router1.get('/posts', async function (req, res, next) {
    console.log("get posts");

    const options = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred"); 
    }
});

router2.get('/posts/:id', async function (req, res, next) {
    console.log("get post by id");

    const postId = req.params.id;
    const options = {
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

router3.get('/posts/:id/comments', async function (req, res, next) {
    console.log("get post comments by id");

    const postId = req.params.id;
    const options = {
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.use(router1);
app.use(router2);
app.use(router3);


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
