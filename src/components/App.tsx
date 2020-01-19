import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import GamesList from './GamesList';
import { SelectedGameRoute } from './routes';
import SelectedGamePage from './SelectedGamePage';

export default function App() {
    return <>
        <nav>
            <Link to='/games'>Games</Link>
        </nav>

        <SelectedGameRoute path='/games/:game' />

        <Switch>
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
