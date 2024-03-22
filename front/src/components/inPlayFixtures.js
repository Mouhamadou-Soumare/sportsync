import React from 'react';
import useLiveFixtures from '../hooks/useLiveFixtures';

function InPlayFixtures() {
  const { fixtures, loading, error } = useLiveFixtures();


  return (
    <div>
      <h2 className="text-4xl font-semibold leading-6 text-gray-900 mt-24 mb-14">Les matchs en cours</h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {fixtures.slice(0, 6).map((fixture) => (

    fixture.fixture.status.short !== "FT" && (
        <div key={fixture.fixture.id} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
                <div className="flex  rounded-md bg-slate-50 p-3 items-center">
                    <img src={fixture.league.logo} className="h-10 w-10 text-white" alt={fixture.league.name} aria-hidden="true" />
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{fixture.league.name}</p>
                </div>
            </dt>
            <dd className=" flex items-baseline pb-6 pt-4 sm:pb-7 gap-2 justify-center">
                <div className='flex flex-col items-center'>
                    <img src={fixture.teams.home.logo} className="h-8 w-8 mr-2" alt={fixture.teams.home.name} />
                    <span className="text-lg font-semibold">{fixture.teams.home.name}</span>
                </div>
                <p className="ml-2 mr-2 flex items-baseline items-center justify-center text-l font-semibold">
                    {fixture.goals.home} - {fixture.goals.away}
                </p>
                <div className='flex flex-col items-center'>
                    <img src={fixture.teams.away.logo} className="h-8 w-8 ml-2 mr-2" alt={fixture.teams.away.name} />
                    <span className="text-lg font-semibold">{fixture.teams.away.name}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                        <p className="font-medium text-green-700 hover:text-indigo-500">
                            {fixture.status?.elapsed !== undefined ? fixture.status.elapsed : 'N/A'}
                        </p>
                    </div>
                </div>
            </dd>
        </div>
    )
))}


      </dl>
      <div className="mt-10 flex items-center gap-x-6">
                    <a href="/allfixtures" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-900 ">
                      Voir toutes les matchs <span className="ml-2" aria-hidden="true">→</span>
                    </a>
    </div>
    </div>
  );
}

export default InPlayFixtures;
