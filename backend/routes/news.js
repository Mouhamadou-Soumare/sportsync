const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/list-all', (req, res) => {
    try {
        const newsData = getNewsData();
        res.json(newsData);
    } catch (error) {
        console.error('Error retrieving news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const newsData = getNewsData();
        const news = newsData.find(news => news.id.toString() === id.toString());

        console.log(news);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (error) {
        console.error('Error retrieving news by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add-news', (req, res) => {
    try {
        const newsData = getNewsData();
        const newNews = req.body;
        newsData.push(newNews);
        fs.writeFileSync('../backend/news.json', JSON.stringify(newsData, null, 2));
        res.status(201).json({ message: 'News added successfully' });
    } catch (error) {
        console.error('Error adding news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



function getNewsData() {
    const rawData = fs.readFileSync('../backend/news.json');
    return JSON.parse(rawData);
}

function getNewsData() {
    const rawData = fs.readFileSync('../backend/news.json');
    return JSON.parse(rawData);
}

// Helper function to write news data to JSON file
function writeNewsData(newsData) {
    fs.writeFileSync('../backend/news.json', JSON.stringify(newsData, null, 2));
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
      fs.writeFileSync('../backend/news.json', JSON.stringify(newsData, null, 2));
      res.status(200).json({ message: 'News updated successfully', news: updatedNews });
    } catch (error) {
      console.error('Error updating news:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
