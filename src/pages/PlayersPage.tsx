import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/layout/Layout';
import { PlayerAchievementsList } from '../components/PlayerAchievementsList';
import { PlayerGamesList } from '../components/PlayerGamesList';
import { SearchPlayerForm } from '../components/SearchPlayerForm';
import { formatLargeInteger, formatFractionAsPercentage } from '../shared';
import { fetchGameAchievements, fetchGames, fetchPlayer, fetchPlayerAchievements } from '../store/data/actions';
import { getSelectedGame, getSelectedPlayerAndGameAchievementsData, getSelectedPlayerData, getSelectedPlayerInfo, PlayerInfo } from '../store/ui/selectors';
import { useDispatchEffect } from '../utils';
import './PlayersPage.scss';

export function PlayersPage() {
    const selectedGame = useSelector(getSelectedGame);
    const selectedPlayerInfo = useSelector(getSelectedPlayerInfo);
    const { data: player } = useSelector(getSelectedPlayerData) ?? {};
    const achievementsData = useSelector(getSelectedPlayerAndGameAchievementsData);

    useDispatchEffect(dispatch => {
        if (selectedPlayerInfo)
            dispatch(fetchPlayer(selectedPlayerInfo.name));
        if (player)
            dispatch(fetchPlayerAchievements(player.uuid!));
        dispatch(fetchGames());
        if (selectedGame)
            dispatch(fetchGameAchievements(selectedGame.id!));
    }, [selectedPlayerInfo, player, selectedGame]);

    return (
        <Layout title={selectedPlayerInfo ? `Player: ${selectedPlayerInfo.name}` : 'Players'}>
            {!selectedPlayerInfo && <>
                <SearchPlayerForm />
                <p>No player selected.</p>
            </>}
            {selectedPlayerInfo &&
                <SelectedPlayerInfo info={selectedPlayerInfo} />
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

function SelectedPlayerInfo(props: {
    info: PlayerInfo;
}) {
    const { fetching, achievements, maxAchievements, points, maxPoints } = props.info;

    const achievementsPercentage = achievements !== undefined && maxAchievements !== undefined ? formatFractionAsPercentage(achievements, maxAchievements) : '';
    const pointsPercentage = points !== undefined && maxPoints !== undefined ? formatFractionAsPercentage(points, maxPoints) : '';

    return <>
        <div className='selected-player-info-table'>
            <span className='key'>Achievements</span>
            <span className='value simple-progress-bar' title={achievementsPercentage}>
                <span className='bar-content' style={{ width: achievementsPercentage }}></span>
                {achievements !== undefined ? String(achievements) : '?'} / {maxAchievements !== undefined ? formatLargeInteger(maxAchievements) : '?'}
            </span>
            <span className='key'>Orb Points</span>
            <span className='value simple-progress-bar' title={pointsPercentage}>
                <span className='bar-content' style={{ width: pointsPercentage }}></span>
                {points !== undefined ? formatLargeInteger(points) : '?'} / {maxPoints !== undefined ? formatLargeInteger(maxPoints) : '?'}
            </span>
        </div>
        {fetching &&
            <p>Loading...</p>
        }
    </>;
}
