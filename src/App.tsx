import { Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/GamesPage';
import { HighscoresPage } from './pages/HighscoresPage';
import { IndexPage } from './pages/IndexPage';
import { PlayersPage } from './pages/PlayersPage';
import { SettingsPage } from './pages/SettingsPage';
import { SelectedGameRoute, SelectedPlayerAndGameRoute, SelectedPlayerRoute } from './routes';

function Empty() { return null; }

export default function App() {
    return <>
        <Routes>
            <Route path='/games/:game?' element={<SelectedGameRoute />} />
            <Route path='/players/:player/games/:game?' element={<SelectedPlayerAndGameRoute />} />
            <Route path='/players/:player?' element={<SelectedPlayerRoute />} />
            <Route path='/*' element={<Empty />} />
        </Routes>

        <Routes>
            <Route path='/highscores/*' element={<HighscoresPage />} />
            <Route path='/games/*' element={<GamePage />} />
            <Route path='/players/*' element={<PlayersPage />} />
            <Route path='/settings/*' element={<SettingsPage />} />
            <Route path='/*' element={<IndexPage />} />
        </Routes>
    </>;
}
