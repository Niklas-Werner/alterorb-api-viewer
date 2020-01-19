import React from 'react';
import { useSelector } from 'react-redux';
import GameAchievementsList from './AchievementsList';
import GamesList from './GamesList';
import { getSelectedGameAchievements, getSelectedGame } from '../store/ui/selectors';
import { useDispatchEffect } from '../utils';
import { fetchGameAchievements } from '../store/data/actions';
import { Layout } from './Layout';

export default function GamePage() {
    const selectedGame = useSelector(getSelectedGame);
    const selectedGameAchievements = useSelector(getSelectedGameAchievements);

    useDispatchEffect(dispatch => {
        if (selectedGame)
            dispatch(fetchGameAchievements(selectedGame.id!));
    }, [selectedGame]);

    return (
        <Layout title='Games'>
            <div style={{ display: 'flex' }}>
                <section>
                    <GamesList />
                </section>
                {selectedGameAchievements &&
                    <section>
                        <GameAchievementsList achievements={selectedGameAchievements} />
                    </section>
                }
            </div>
        </Layout>
    );
}
