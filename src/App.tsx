import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GamePage } from './pages/GamesPage';
import { HighscoresPage } from './pages/HighscoresPage';
import { IndexPage } from './pages/IndexPage';
import { PlayersPage } from './pages/PlayersPage';
import { SelectedGameRoute, SelectedPlayerRoute } from './routes';

export default function App() {
    return <>
        <SelectedGameRoute path='/games/:name' />
        <SelectedPlayerRoute path='/players/:name' />

        <Switch>
            <Route path='/highscores'>
                <HighscoresPage />
            </Route>

            <Route path='/games'>
                <GamePage />
            </Route>

            <Route path='/players'>
                <PlayersPage />
            </Route>

            <Route>
                <IndexPage />
            </Route>
        </Switch>
    </>;
}
