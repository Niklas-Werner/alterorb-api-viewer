import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import GamesList from './GamesList';
import { SelectedGameRoute } from './routes';
import SelectedGamePage from './SelectedGamePage';
import HighscoresList from './HighscoresList';

export default function App() {
    return <>
        <nav>
            <ul>
                <li>
                    <Link to='/highscores'>Highscores</Link>
                </li>
                <li>
                    <Link to='/games'>Games</Link>
                </li>
            </ul>
        </nav>

        <SelectedGameRoute path='/games/:game' />

        <Switch>
            <Route path='/highscores'>
                <HighscoresList />
            </Route>

            <Route path='/games/:game'>
                <SelectedGamePage />
            </Route>

            <Route path='/games'>
                <GamesList />
            </Route>

            <Route>
                {/* <TestPage /> */}
            </Route>
        </Switch>
    </>;
}
