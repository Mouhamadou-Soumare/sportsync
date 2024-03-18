import React from 'react';
import useLiveFixtures from '../hooks/useLiveFixtures';

function AllFixtures() {
  const { fixtures, loading, error } = useLiveFixtures();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0  lg:max-w-none lg:items-center">
        <h2 className="text-6xl text-center font-semibold leading-6 text-gray-900 mt-24 mb-14">Les matchs en cours</h2>
        
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compétition</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opposition</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temps</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voir en détails</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fixtures.map((fixture) => (
              <tr key={fixture.fixture.id}>
                <td className="px-6 py-4 whitespace-nowrap flex flex-row">
                  <img src={fixture.league.logo} className="h-8 w-8 mr-2" alt={fixture.league.name} />
                  {fixture.league.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-evenly	">
                   <div className='flex flex-row items-center'>{fixture.teams.home.name}<img src={fixture.teams.home.logo} className="h-8 w-8 ml-3" alt={fixture.teams.home.name} />
                    </div> <div className='pr-3 pl-3 text-sm  leading-6 text-white mr-3 bg-green-700 hover:bg-green-900 p-1 rounded-lg font-bold 	 '> {fixture.goals.home} - {fixture.goals.away}</div>
                     <div className='flex flex-row items-center'>
                    <img src={fixture.teams.away.logo} className="h-8 w-8 mr-3" alt={fixture.teams.away.name} /> {fixture.teams.away.name}</div> 
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{fixture.status?.elapsed !== undefined ? `${fixture.status.elapsed}'` : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap"><a href={`/details/${fixture.fixture.id}`} className="text-indigo-600 hover:text-indigo-900">Voir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default AllFixtures;
