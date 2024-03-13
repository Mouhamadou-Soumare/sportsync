const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getLiveMatches() {
    const competitions = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'FRA', 'CL'];
    const currentDate = new Date();
    const currentTime = currentDate.getTime(); 

    const requests = competitions.map(async competition => {
        try {
            const response = await axios.get(`https://api.football-data.org/v4/competitions/${competition}/matches`, {
                params: {
                    status: 'IN_PLAY'
                },
                headers: {
                    'X-Auth-Token': '3cb809794f2c438eba932eda52dfd01e' 
                }
            });
            const matches = response.data.matches.map(match => {
                const startTime = new Date(match.utcDate).toLocaleTimeString(); 
                const matchStartTime = new Date(match.utcDate).getTime(); 
                const elapsedMilliseconds = currentTime - matchStartTime; 
                const currentMinute = Math.floor(elapsedMilliseconds / (1000 * 60)); 
                return {
                    ...match,
                    startTime: startTime,
                    currentMinute: currentMinute
                };
            });
            return matches;
        } catch (error) {
            console.error(`Error fetching matches for competition ${competition}: ${error.message}`);
            return [];
        }
    });

    try {
        const liveMatches = await Promise.all(requests);
        return liveMatches.flat(); 
    } catch (error) {
        console.error(`Error retrieving live matches: ${error.message}`);
        return [];
    }
}



router.get('/', async (req, res) => {
    try {
        const liveMatches = await getLiveMatches();
        if (liveMatches.length === 0) {
            return res.status(404).json({ message: 'Aucun match en cours.' });
        }
        res.json(liveMatches);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
