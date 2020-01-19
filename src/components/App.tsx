import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import GamePage from './GamePage';
import HighscoresPage from './HighscoresPage';
import IndexPage from './IndexPage';
import PlayerPage from './PlayerPage';
import { SelectedGameRoute, SelectedPlayerRoute } from './routes';

export default function App() {
    return <>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Index</Link>
                </li>
                <li>
                    <Link to='/highscores'>Highscores</Link>
                </li>
                <li>
                    <Link to='/games'>Games</Link>
                </li>
                <li>
                    <Link to='/players'>Players</Link>
                </li>
            </ul>
        </nav>

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
