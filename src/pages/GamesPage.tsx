import React from 'react';
import { useSelector } from 'react-redux';
import { AchievementsList } from '../components/AchievementsList';
import { GamesList } from '../components/GamesList';
import { Layout } from '../components/layout/Layout';
import { fetchGameAchievements } from '../store/data/actions';
import { getSelectedGame, getSelectedGameAchievementsData } from '../store/ui/selectors';
import { useDispatchEffect } from '../utils';

export function GamePage() {
    const selectedGame = useSelector(getSelectedGame);
    const selectedGameAchievements = useSelector(getSelectedGameAchievementsData);

    useDispatchEffect(dispatch => {
        if (selectedGame)
            dispatch(fetchGameAchievements(selectedGame.id!));
    }, [selectedGame]);

    return (
        <Layout title={selectedGame ? `Game: ${selectedGame.fancyName}` : 'Games'}>
            <GamesList contentGameKey={selectedGame?.jagexName}>
                {selectedGameAchievements?.fetching &&
                    <p>Fetching achievements...</p>
                }
                {selectedGameAchievements?.data &&
                    <AchievementsList achievements={selectedGameAchievements.data} />
                }
            </GamesList>
        </Layout>
    );
}