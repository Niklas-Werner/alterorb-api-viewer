import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { HighscoresList, HighscoresListEntry } from '../components/HighscoresList';
import { Layout } from '../components/layout/Layout';
import { getOwnName } from '../store/config/selectors';
import { fetchHighscores, fetchPlayer } from '../store/data/actions';
import { getFetchingHighscores, getHighscores, getPlayersData } from '../store/data/selectors';
import { useActionCreatorEffect, useDispatchEffect } from '../utils';

const getHighscoresListEntries = createSelector(
    [getHighscores, getOwnName, getPlayersData],
    (highscores, ownName, playersData) => {
        if (!highscores)
            return null;
        const entries = highscores.map<HighscoresListEntry>((entry, index) => ({
            rank: index + 1,
            name: entry.displayName!,
            score: entry.orbPoints!,
            highlight: entry.displayName === ownName
        }));
        if (!entries.some(entry => entry.highlight)) {
            if (playersData && playersData[ownName]?.data) {
                entries.push({
                    name: ownName,
                    score: playersData[ownName]?.data.orbPoints!,
                    highlight: true
                });
            }
        }
        return entries;
    }
);

export function HighscoresPage() {
    const fetchingHighscores = useSelector(getFetchingHighscores);
    const highscoresListEntries = useSelector(getHighscoresListEntries);
    const ownName = useSelector(getOwnName);

    useActionCreatorEffect(fetchHighscores);

    useDispatchEffect(dispatch => {
        if (ownName)
            dispatch(fetchPlayer(ownName));
    }, [ownName]);

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
