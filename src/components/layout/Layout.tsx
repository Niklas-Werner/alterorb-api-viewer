import React, { PropsWithChildren, useEffect } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import './Layout.scss';

export function Layout(props: PropsWithChildren<{
    title?: string;
}>) {
    const { title, children } = props;

    useEffect(() => {
        document.title = (title ? `${title} - ` : '') + 'AlterOrb API Viewer';
    }, [title]);

    return <>
        <Header />

        <main>
            {title &&
                <h2>{title}</h2>
            }
            {children}
        </main>

        <Footer />
    </>;
}
