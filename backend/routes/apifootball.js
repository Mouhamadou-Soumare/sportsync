import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = '6419a35e0amsh9ceaae77c044f25p1b6faajsn7ec061e70504';

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
                league: '78',
                date: formattedDate,
                season: '2023',
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
});

router.get('/topscorers', async (req, res) => {
    const topScorersList = [];
    try {
        const options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
            params: {
                league: 2,
                season: '2023'
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            },
        };

        const response = await axios.request(options);
        const topScorers = response.data.response;
        topScorersList.push(...topScorers);

        const totalGoalsByPlayer = {};
        topScorersList.forEach(player => {
            const playerName = player.player.name;
            const goals = player.statistics[0].goals.total;
            const photo = player.player.photo;
            const team = player.statistics[0].team.name;
            const teamLogo = player.statistics[0].team.logo;
            const matchesPlayed = player.statistics[0].games.appearences;

            if (totalGoalsByPlayer[playerName]) {
                totalGoalsByPlayer[playerName].goals += goals;
                totalGoalsByPlayer[playerName].matchesPlayed += matchesPlayed;
            } else {
                totalGoalsByPlayer[playerName] = {
                    goals: goals,
                    photo: photo,
                    team: team,
                    teamLogo: teamLogo,
                    matchesPlayed: matchesPlayed
                };
            }
        });

        const sortedTopScorers = Object.keys(totalGoalsByPlayer)
            .map(playerName => ({
                name: playerName,
                totalGoals: totalGoalsByPlayer[playerName].goals,
                photo: totalGoalsByPlayer[playerName].photo,
                team: totalGoalsByPlayer[playerName].team,
                teamLogo: totalGoalsByPlayer[playerName].teamLogo,
                matchesPlayed: totalGoalsByPlayer[playerName].matchesPlayed
            }))
            .sort((a, b) => b.totalGoals - a.totalGoals);

        res.json(sortedTopScorers);
    } catch (error) {
        console.error('Erreur lors de la récupération des meilleurs buteurs :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des meilleurs buteurs' });
    }
});

export default router;
