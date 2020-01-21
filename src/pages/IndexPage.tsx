import React from 'react';
import { Link } from 'react-router-dom';
import './IndexPage.scss';
import { Layout } from '../components/layout/Layout';

export function IndexPage() {
    return (
        <Layout>
            <ul className='box-link-list'>
                <li>
                    <Link to='/highscores'>
                        <h3>Highscores</h3>
                        <p>
                            Top 10 players by orb points.
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/games'>
                        <h3>Games</h3>
                        <p>
                            List of games and achievements.
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to='/players'>
                        <h3>Players</h3>
                        <p>
                            Search for players.
                        </p>
                    </Link>
                </li>
            </ul>
        </Layout>
    );
}
