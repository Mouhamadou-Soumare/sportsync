import React, { useState } from 'react';
import useGetTopScorers from '../hooks/useGetTopScorers';

function AllTopScorers() {
  const { topScorers, loading, error } = useGetTopScorers();
  const [sortByGoals, setSortByGoals] = useState('desc'); // Par défaut, tri décroissant

  const handleSortChange = () => {
    setSortByGoals(sortByGoals === 'desc' ? 'asc' : 'desc');
  };

  const sortedTopScorers = [...topScorers].sort((a, b) => {
    if (sortByGoals === 'desc') {
      return b.totalGoals - a.totalGoals;
    } else {
      return a.totalGoals - b.totalGoals;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0  lg:max-w-none lg:items-center">
        <h2 className="text-6xl text-center font-semibold leading-6 text-gray-900 mt-24 mb-14">Meilleurs buteurs</h2>
        <button onClick={handleSortChange}>
        {sortByGoals === 'desc' ? 'Sort Ascending' : 'Sort Descending'}
      </button>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du joueur</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationalité</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipe en club</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de buts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {sortedTopScorers.map((player) => (
              <tr key={player.name}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img src={player.photo} alt={player.name} className="w-8 h-8 mr-2 rounded-full" />
                  {player.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{player.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img src={player.teamLogo} alt={player.team} className="w-8 h-8 mr-2" />
                  {player.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{player.totalGoals}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default AllTopScorers;
