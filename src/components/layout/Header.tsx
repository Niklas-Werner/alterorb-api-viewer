import React from 'react';
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
                            <NavLink to='/highscores' activeClassName='active'>Highscores</NavLink>
                        </li>
                        <li>
                            <NavLink to='/games' activeClassName='active'>Games</NavLink>
                        </li>
                        <li>
                            <NavLink to='/players' activeClassName='active'>Players</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <hr />
        </header>
    );
}
