import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PlayerInfoDisplay } from '../components/PlayerInfoDisplay';
import { fetchOwnPlayerData } from '../store/config/actions';
import { getOwnPlayerInfo } from '../store/config/selectors';
import { fetchGames, fetchPlayer, fetchPlayerAchievements } from '../store/data/actions';
import { useActionCreatorEffect, useDispatchEffect } from '../utils';
import './IndexPage.scss';

export function IndexPage() {
    const ownPlayerInfo = useSelector(getOwnPlayerInfo);

    useActionCreatorEffect(fetchOwnPlayerData);

    useDispatchEffect(dispatch => {
        if (ownPlayerInfo)
            dispatch(fetchPlayer(ownPlayerInfo.name));
        if (ownPlayerInfo?.uuid)
            dispatch(fetchPlayerAchievements(ownPlayerInfo.uuid));
        dispatch(fetchGames());
    }, [ownPlayerInfo]);

    return (
        <Layout>
            <ul className='box-link-list'>
                <li>
                    <Link to={ownPlayerInfo ? `/players/${ownPlayerInfo.name}` : '/settings'}>
                        <h3>My Scores</h3>
                        {ownPlayerInfo ?
                            <PlayerInfoDisplay info={ownPlayerInfo} />
                            :
                            <p>Set your name on the settings page to see your scores here.</p>
                        }
                    </Link>
                </li>
                <li>
                    <Link to='/highscores'>
                        <h3>Highscores</h3>
                        <p>
                            Top 10 players by orb points.
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/games'>
                        <h3>Games</h3>
                        <p>
                            List of games and achievements.
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/players'>
                        <h3>Players</h3>
                        <p>
                            Search for players.
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/settings'>
                        <h3>Settings</h3>
                        <p>
                            ⚙
                        </p>
                    </Link>
                </li>
            </ul>
        </Layout>
    );
}
