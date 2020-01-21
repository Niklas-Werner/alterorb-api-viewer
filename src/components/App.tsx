import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePage from './GamePage';
import HighscoresPage from './HighscoresPage';
import IndexPage from './IndexPage';
import PlayerPage from './PlayerPage';
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
                <PlayerPage />
            </Route>

            <Route>
                <IndexPage />
            </Route>
        </Switch>
    </>;
}
