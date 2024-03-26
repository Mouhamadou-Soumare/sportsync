import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = process.env;
console.log(API_KEY);
// async function getFixtures() {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split('T')[0];
//     try {
//         const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
//             headers: {
//                 'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
//                 'x-rapidapi-key': API_KEY
//             },
//             params: {
//                 league: '78',
//                 date: formattedDate,
//                 season: '2023',
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching fixtures:', error);
//         throw new Error('Error fetching fixtures');
//     }
// }

// router.get('/direct', async (req, res) => {
//     try {
//         const fixtures = await getFixtures();
//         res.json(fixtures);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }); 

// router.get('/topscorers', async (req, res) => {
//   const competitions = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 13, 15, 39, 45, 61, 65, 66, 78, 81, 135, 137, 140, 143]; // Identifiants des compétitions spécifiées
//   const topScorersList = [];

//   try {
//     for (const competition of competitions) {
//       const options = {
//         method: 'GET',
//         url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
//         params: {
//           league: competition,
//           season: '2023' // Mettez à jour avec la saison en cours
//         },
//         headers: {
//           'X-RapidAPI-Key': API_KEY,
//           'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
//         },
//       };

//       const response = await axios.request(options);
//       const topScorers = response.data.response;

//       // Ajouter les meilleurs buteurs de cette compétition à la liste globale
//       topScorersList.push(...topScorers);
//     }

//     // Regrouper les buteurs par leur nom et calculer le total des buts marqués
//     const totalGoalsByPlayer = {};
//     topScorersList.forEach(player => {
//       const playerName = player.player.name;
//       const goals = player.statistics[0].goals.total;
//       const photo = player.player.photo;
//       const team = player.statistics[0].team.name;
//       const teamLogo = player.statistics[0].team.logo;
//       const matchesPlayed = player.statistics[0].games.appearences;

//       if (totalGoalsByPlayer[playerName]) {
//         totalGoalsByPlayer[playerName].goals += goals;
//         totalGoalsByPlayer[playerName].matchesPlayed += matchesPlayed;
//       } else {
//         totalGoalsByPlayer[playerName] = {
//           goals: goals,
//           photo: photo,
//           team: team,
//           teamLogo: teamLogo,
//           matchesPlayed: matchesPlayed
//         };
//       }
//     });

//     // Trier les joueurs en fonction du total des buts marqués
//     const sortedTopScorers = Object.keys(totalGoalsByPlayer)
//       .map(playerName => ({
//         name: playerName,
//         totalGoals: totalGoalsByPlayer[playerName].goals,
//         photo: totalGoalsByPlayer[playerName].photo,
//         team: totalGoalsByPlayer[playerName].team,
//         teamLogo: totalGoalsByPlayer[playerName].teamLogo,
//         matchesPlayed: totalGoalsByPlayer[playerName].matchesPlayed
//       }))
//       .sort((a, b) => b.totalGoals - a.totalGoals);

//     res.json(sortedTopScorers);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des meilleurs buteurs :', error);
//     res.status(500).json({ error: 'Erreur lors de la récupération des meilleurs buteurs' });
//   }
// });

// router.get('/standings/:leagueId', async (req, res) => {
//     const { leagueId } = req.params;
//     const options = {
//       method: 'GET',
//       url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
//       params: {
//         season: '2023',
//         league: leagueId
//       },
//       headers: {
//         'X-RapidAPI-Key': '6419a35e0amsh9ceaae77c044f25p1b6faajsn7ec061e70504',
//         'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//       }
//     };
  
//     try {
//       const response = await axios.request(options);
//       res.json(response.data);
//     } catch (error) {
//       console.error('Error fetching standings:', error);
//       res.status(500).json({ error: 'Error fetching standings' });
//     }
//   });

export default router;
