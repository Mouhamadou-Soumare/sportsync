import React, { useState, useEffect } from 'react';
import useGetStandings from '../hooks/useGetStandings';

function Standings() {
  const [selectedLeague, setSelectedLeague] = useState('39');
  const { standings, loading, error } = useGetStandings(selectedLeague);


  let leagueName = '';
  let leagueLogo = '';
  let classement = [];

  useEffect(() => {
    if (!loading && standings.length > 0) {
      leagueName = standings[0].league.name;
      leagueLogo = standings[0].league.logo;
      classement = standings[0].league.standings;
    }
  }, [loading, standings]);

  console.log(classement[0]);
  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:max-w-none lg:items-center">
        <h2 className="text-6xl text-center font-semibold leading-6 text-gray-900 mt-24 mb-14">Classement du championnat</h2>
        <div className="flex justify-center mb-8 items-center gap-3">
          <label htmlFor="league" className="mr-2 font-semibold">Choisir le championnat :</label>
          <select id="league" value={selectedLeague} onChange={handleLeagueChange} className="rounded border border-gray-300 px-3 py-1">
            <option value="39">Premier League</option>
            <option value="61">Ligue 1</option>

            {/* Ajoutez d'autres options pour les autres championnats ici */}
          </select>
          <img src={leagueLogo} className='w-20' />
          </div>
        <table className="w-full border-collapse border border-gray-200">

          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipe</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches joués</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Victoires</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Défaites</th>
              {/* Ajoutez d'autres colonnes si nécessaire */}
            </tr>
          </thead>
       
          <tbody className="divide-y divide-gray-200">
          {/* {classement && classement[0].map((teamData, index) => (
           <tr key={index}>
           <td className="px-6 py-4 whitespace-nowrap">{teamData.rank}</td>
           <td className="px-6 py-4 whitespace-nowrap flex flex-row items-center gap-2"><img src={teamData.team.logo} className='w-6'></img>{teamData.team.name}</td>
           <td className="px-6 py-4 whitespace-nowrap">{teamData.all.played}</td>
           <td className="px-6 py-4 whitespace-nowrap">{teamData.all.win}</td>
           <td className="px-6 py-4 whitespace-nowrap">{teamData.all.lose}</td>
           {/* Ajoutez d'autres colonnes pour les données de l'équipe si nécessaire 
         </tr>
          ))} */}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Standings;
