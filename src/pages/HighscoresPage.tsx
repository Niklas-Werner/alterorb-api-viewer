import React from 'react';
import { HighscoresList } from '../components/HighscoresList';
import { Layout } from '../components/layout/Layout';

export function HighscoresPage() {
    return (
        <Layout title='Highscores'>
            <HighscoresList />
        </Layout>
    );
}
