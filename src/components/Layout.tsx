import React, { PropsWithChildren } from 'react';
import './Layout.scss';

export function Layout(props: PropsWithChildren<{
    title: string;
}>) {
    const { title, children } = props;

    return <>
        <h2>{title}</h2>

        {children}
    </>;
}
