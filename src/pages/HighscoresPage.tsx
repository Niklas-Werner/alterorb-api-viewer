import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { HighscoresList } from '../components/HighscoresList';
import { Layout } from '../components/layout/Layout';
import { fetchHighscores } from '../store/data/actions';
import { getFetchingHighscores, getHighscores } from '../store/data/selectors';
import { useActionCreatorEffect } from '../utils';

const getHighscoresListEntries = createSelector(
    [getHighscores],
    (highscores) => {
        if (!highscores)
            return null;
        return highscores.map<[string, number]>(entry => [
            entry.displayName!,
            entry.orbPoints!
        ]);
    }
)

export function HighscoresPage() {
    const fetchingHighscores = useSelector(getFetchingHighscores);
    const highscoresListEntries = useSelector(getHighscoresListEntries);

    useActionCreatorEffect(fetchHighscores);

    return (
        <Layout title='Highscores'>
            {fetchingHighscores &&
                <p>Fetching highscores list...</p>
            }
            {highscoresListEntries &&
                <HighscoresList title='Top 10 Orb Points' scoreLabel='Orb Points' highscores={highscoresListEntries} />
            }
        </Layout>
    );
}
