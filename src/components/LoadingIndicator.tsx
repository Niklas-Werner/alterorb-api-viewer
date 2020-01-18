import React from 'react';
import { useSelector } from 'react-redux';

export default function LoadingIndicator() {
    const loading = useSelector(state => state.global.loading);
    const error = useSelector(state => state.global.error);

    return <section>
        <p>{loading && 'Loading...'}</p>
        <p>{error && 'Error: ' + error}</p>
    </section>;
}
