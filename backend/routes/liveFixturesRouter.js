const express = require('express');
const router = express.Router();
const axios = require('axios');


const API_KEY = '6419a35e0amsh9ceaae77c044f25p1b6faajsn7ec061e70504';
/* 
async function getFixtures() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; 
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
            headers: {
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                'x-rapidapi-key': API_KEY
            },
            params: {
                league: '3',
                date: formattedDate,
                season: '2023'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        throw new Error('Error fetching fixtures');
    }
}

router.get('/direct', async (req, res) => {
    try {
        const fixtures = await getFixtures();
        res.json(fixtures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */

/* 
const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
    params: {
      league: '2', // Identifiant de la ligue pour les compétitions européennes (par exemple, Ligue des champions)
      season: '2023', // Remplacez par la saison en cours
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };
  
  router.get('/topscorers', async (req, res) => {
    try {
      const response = await axios.request(options);
      const topScorers = response.data.response;
      const topScorersList = topScorers.map(player => ({
        name: player.player.name,
        goals: player.statistics[0].goals.total
      }));
      res.json(topScorersList);
    } catch (error) {
      console.error('Erreur lors de la récupération des meilleurs buteurs:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des meilleurs buteurs' });
    }
  });
 */
module.exports = router;
