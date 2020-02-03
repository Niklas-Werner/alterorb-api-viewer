import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PlayerAchievementsList } from '../components/PlayerAchievementsList';
import { PlayerGamesList } from '../components/PlayerGamesList';
import { PlayerInfoDisplay } from '../components/PlayerInfoDisplay';
import { SearchPlayerForm } from '../components/SearchPlayerForm';
import { fetchGameAchievements, fetchGames, fetchPlayer, fetchPlayerAchievements } from '../store/data/actions';
import { getSelectedGame, getSelectedPlayerAndGameAchievementsData, getSelectedPlayerInfo } from '../store/ui/selectors';
import { useDispatchEffect } from '../utils';
import './PlayersPage.scss';

export function PlayersPage() {
    const selectedGame = useSelector(getSelectedGame);
    const selectedPlayerInfo = useSelector(getSelectedPlayerInfo);
    const achievementsData = useSelector(getSelectedPlayerAndGameAchievementsData);

    useDispatchEffect(dispatch => {
        if (selectedPlayerInfo)
            dispatch(fetchPlayer(selectedPlayerInfo.name));
        if (selectedPlayerInfo?.uuid)
            dispatch(fetchPlayerAchievements(selectedPlayerInfo.uuid));
        dispatch(fetchGames());
        if (selectedGame)
            dispatch(fetchGameAchievements(selectedGame.id!));
    }, [selectedPlayerInfo, selectedGame]);

    return (
        <Layout
            title={selectedPlayerInfo ? `Player: ${selectedPlayerInfo.name}` : 'Players'}
            stickyButton={selectedPlayerInfo &&
                <Link
                    to={selectedGame ? `/players/${selectedPlayerInfo.name}` : '/players'}
                    className='close-button'
                    title={selectedGame ? 'Close game' : 'Back to player search'} />
            }
        >
            {!selectedPlayerInfo && <>
                <SearchPlayerForm />
                <p>No player selected.</p>
            </>}
            {selectedPlayerInfo &&
                <PlayerInfoDisplay info={selectedPlayerInfo} />
            }
            <PlayerGamesList contentGameKey={selectedGame?.jagexName}>
                {achievementsData === 'fetching' &&
                    <p>Fetching achievements...</p>
                }
                {Array.isArray(achievementsData) &&
                    <PlayerAchievementsList achievements={achievementsData} />
                }
            </PlayerGamesList>
        </Layout>
    );
}
