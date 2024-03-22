import React from 'react';
import useGetTopScorers from '../hooks/useGetTopScorers';

function TopScorers() {
  const { topScorers, loading, error } = useGetTopScorers();
  return (
    <div>
      <h2 className="text-4xl font-semibold leading-6 text-gray-900 mt-24 mb-14">Les meilleurs buteurs</h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {topScorers.slice(0, 6).map((player) => (
          <div key={player.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="flex rounded-md bg-slate-50 p-3 items-center">
                <img src={player.photo} className="h-10 w-10 text-white" alt={player.name} aria-hidden="true" />
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{player.name}</p>
              </div>
            </dt>
            <dd className="flex items-baseline pb-6 pt-4 sm:pb-7 gap-2 justify-center">
              <div className='flex flex-col items-center'>
              <img src={player.teamLogo} className="h-10 w-10 text-white" alt={player.teamLogo} aria-hidden="true" />

                <span className="text-lg font-semibold">{player.team}</span>
              </div>
              <p className="ml-2 mr-2 flex items-baseline items-center justify-center text-l font-semibold">
                Buts: {player.totalGoals}
              </p>
              <div className='flex flex-col items-center'>
                <span className="text-lg font-semibold">Matches joués: {player.matchesPlayed}</span>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default TopScorers;
