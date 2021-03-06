import React from 'react';
import './Footer.scss';

export function Footer() {
    return (
        <footer>
            <hr />
            <div className='footer-content'>
                <nav>
                    <ul>
                        <li>
                            <a href='https://alterorb.net/'>AlterOrb</a>
                        </li>
                        <li>
                            <a href='https://github.com/Niklas-Werner/alterorb-api-viewer'>View on GitHub</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
