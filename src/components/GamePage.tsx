import React from 'react';
import { useSelector } from 'react-redux';
import GameAchievementsList from './AchievementsList';
import GamesList from './GamesList';
import { getSelectedGameAchievementsData, getSelectedGame } from '../store/ui/selectors';
import { useDispatchEffect } from '../utils';
import { fetchGameAchievements } from '../store/data/actions';
import { Layout } from './Layout';

export default function GamePage() {
    const selectedGame = useSelector(getSelectedGame);
    const selectedGameAchievements = useSelector(getSelectedGameAchievementsData);

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
                {selectedGameAchievements?.fetching ?
                    (
                        <p>Fetching achievements...</p>
                    ) : (
                        selectedGameAchievements?.data && (
                            <section>
                                <GameAchievementsList achievements={selectedGameAchievements.data} />
                            </section>
                        )
                    )
                }
            </div>
        </Layout>
    );
}
