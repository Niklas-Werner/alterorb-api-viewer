import React from 'react';
import './App.scss';
import GamesList from './GamesList';
import LoadingIndicator from './LoadingIndicator';

export default function App() {
    return (
        <main>
            <LoadingIndicator />
            <GamesList />
        </main>
    );
}
