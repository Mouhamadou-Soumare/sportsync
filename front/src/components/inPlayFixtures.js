import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline';
import useLiveFixtures from '../hooks/useLiveFixtures';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function InPlayFixtures() {
  const matches = useLiveFixtures();

  const getMinutesPlayed = (startUtcDate) => {
    const startTimestamp = new Date(startUtcDate).getTime();
    const currentTimestamp = new Date().getTime();
    const elapsedMilliseconds = currentTimestamp - startTimestamp;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    return elapsedMinutes;
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold leading-6 text-gray-900 mt-24 mb-14">Les matchs en cours</h2>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <div key={match.id} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <img src={match.competition.emblem} className="h-6 w-6 text-white" alt={match.competition.name} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{match.competition.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <div>
                <img src={match.homeTeam.crest} className="h-8 w-8 mr-2" alt={match.homeTeam.shortName} />
                <span className="text-lg font-semibold">{match.homeTeam.shortName}</span>
              </div>
              <p className="ml-2 flex items-baseline text-sm font-semibold">
                Score: {match.score.fullTime.home} - {match.score.fullTime.away}
              </p>
              <div>
                <img src={match.awayTeam.crest} className="h-8 w-8 ml-2 mr-2" alt={match.awayTeam.shortName} />
                <span className="text-lg font-semibold">{match.awayTeam.shortName}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <p className="font-medium text-indigo-600 hover:text-indigo-500">
                  Minutes jouées: {getMinutesPlayed(match.utcDate)}
                  </p>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
