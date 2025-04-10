import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export function Header() {
    return (
        <header>
            <div className='header-content'>
                <Link to='/'>
                    <h1>AlterOrb API Viewer</h1>
                </Link>
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/highscores' className={({ isActive }) => isActive ? 'active' : ''}>Highscores</NavLink>
                        </li>
                        <li>
                            <NavLink to='/games' className={({ isActive }) => isActive ? 'active' : ''}>Games</NavLink>
                        </li>
                        <li>
                            <NavLink to='/players' className={({ isActive }) => isActive ? 'active' : ''}>Players</NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings' className={({ isActive }) => isActive ? 'active no-line' : 'no-line'}>⚙</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <hr />
        </header >
    );
}
