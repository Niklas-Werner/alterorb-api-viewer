import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/layout/Layout';
import { setOwnName } from '../store/config/actions';
import { getOwnName } from '../store/config/selectors';
import { useDispatchCallback } from '../utils';
import './SettingsPage.scss';

export function SettingsPage() {
    const ownName = useSelector(getOwnName);
    const onOwnNameChange = useDispatchCallback((dispatch, ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setOwnName(ev.target.value));
    }, []);

    return (
        <Layout title='Settings'>
            <label className='settings-label'>
                Your player name: <br />
                <input type='text' value={ownName} onChange={onOwnNameChange} />
            </label>
            <p className='settings-notice'>
                Settings are stored locally in your browser (using localStorage).
            </p>
        </Layout>
    );
}
