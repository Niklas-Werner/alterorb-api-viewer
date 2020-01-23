import React, { PropsWithChildren, useEffect, ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import './Layout.scss';

export function Layout(props: PropsWithChildren<{
    title?: string;
    stickyButton?: ReactNode;
}>) {
    const { title, stickyButton, children } = props;

    useEffect(() => {
        document.title = (title ? `${title} - ` : '') + 'AlterOrb API Viewer';
    }, [title]);

    return <>
        <Header />

        <main>
            {title &&
                <h2>{title}</h2>
            }
            {stickyButton &&
                <div className='sticky-button-container'>
                    <div className='sticky-button'>
                        {stickyButton}
                    </div>
                </div>
            }
            {children}
        </main>

        <Footer />
    </>;
}
