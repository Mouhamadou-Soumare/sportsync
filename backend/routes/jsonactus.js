import { readFileSync, writeFileSync } from 'fs';
import express from 'express';
import multer from 'multer'; // Importer multer



const router = express.Router();

const githubpagenews = 'https://mouhamadou-soumare.github.io/sportsyncnewsapi/news.json';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/assets")
    },
    filename: function (req, file, cb) {
      return cb(null, `${file.originalname}`)
    }
  })

  const upload = multer({storage})


router.get('/list-all', (req, res) => {
    try {
        const newsData = getNewsData();
        res.json(newsData);

    } catch (error) {
        console.error('Error retrieving news:', error);
        res.status(500).json({ error: 'Internal Server Error listing' });
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const newsData = getNewsData();
        const news = newsData.find(news => news.id.toString() === id.toString());

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (error) {
        console.error('Error retrieving news by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add-news',  upload.single('file'), (req, res) => { 
    try {
        const currentDate = new Date().toISOString().slice(0, 10);

        const newsData = getNewsData();

        const lastId = newsData.length > 0 ? newsData[newsData.length - 1].id : 0;

        console.log(req);

        const newNews = {
            id: lastId + 1,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: currentDate,
            image: req.file ? "http://localhost:3000/assets/" + req.file.filename : ''

        };

        newsData.push(newNews);

        writeNewsData(newsData);

        res.status(201).json({ message: 'News added successfully', id: newNews.id });
    } catch (error) {
        console.error('Error adding news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getNewsData() {
    try {
        const response = await axios.get(GITHUB_PAGES_URL);
        return response.data;
    } catch (error) {
        console.error('Error retrieving news:', error);
        throw new Error('Unable to fetch news data from GitHub Pages');
    }
}

function writeNewsData(newsData) {
    writeFileSync('../backend/news.json', JSON.stringify(newsData, null, 2));
}

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    try {
        let newsData = getNewsData();
        
        const index = newsData.findIndex(news => news.id.toString() === id.toString());
        if (index === -1) {
            return res.status(404).json({ message: 'News not found' });
        }

        newsData.splice(index, 1);

        newsData = newsData.map((news, index) => {
            news.id = index + 1;
            return news;
        });

        writeNewsData(newsData);

        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    try {
        const newsData = getNewsData();
        const index = newsData.findIndex(news => news.id.toString() === id.toString());
        if (index === -1) {
            return res.status(404).json({ message: 'News not found' });
        }
        const updatedNews = { ...newsData[index], ...req.body };
        newsData[index] = updatedNews;
        writeNewsData(newsData);
        res.status(200).json({ message: 'News updated successfully', news: updatedNews });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
