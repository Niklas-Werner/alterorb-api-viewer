import React from 'react';
import HighscoresList from './HighscoresList';
import { Layout } from './Layout';

export default function HighscoresPage() {
    return (
        <Layout title='Highscores'>
            <HighscoresList />
        </Layout>
    );
}
