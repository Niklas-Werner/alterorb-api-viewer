import React, { Fragment, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatLargeInteger } from '../shared';
import { fetchGames } from '../store/data/actions';
import { getFetchingGames } from '../store/data/selectors';
import { getSortedGames } from '../store/ui/selectors';
import { useActionCreatorEffect } from '../utils';
import './GamesList.scss';

export function GamesList(props: PropsWithChildren<{
    contentGameKey?: string;
}>) {
    const { contentGameKey: selectedGameKey, children } = props;

    const fetchingGames = useSelector(getFetchingGames);
    const games = useSelector(getSortedGames);

    useActionCreatorEffect(fetchGames);

    if (fetchingGames)
        return <p>Fetching games list...</p>;

    if (!games)
        return <p>No games found.</p>;

    return <div className='games-table'>
        <span className='head name'>Game</span>
        <span className='head achievements'>Achieve&shy;ments</span>
        <span className='head points'>Orb Points</span>
        {games.map(game => {
            const unavailableClass = game.loginEnabled ? '' : 'unavailable';

            return (
                <Fragment key={game.jagexName}>
                    <span className={`name ${unavailableClass}`}>
                        <Link to={`/games/${game.jagexName}`}>{game.fancyName}</Link>
                    </span>
                    <span className={`achievements ${unavailableClass}`}>
                        {game.obtainableAchievements}
                    </span>
                    <span className={`points ${unavailableClass}`}>
                        {formatLargeInteger(game.obtainableOrbPoints ?? 0)}
                    </span>
                    {game.jagexName === selectedGameKey &&
                        <div className='content'>
                            {children}
                        </div>
                    }
                </Fragment>
            );
        })}
    </div>;
}
