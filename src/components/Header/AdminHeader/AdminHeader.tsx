import React from 'react';
import './AdminHeader.scss';
import IconButton from '../../elements/IconButton/IconButton';
import { Menu as MenuIcon } from '@material-ui/icons';

function AdminHeader() {
    const clickHandler = () => {
        console.log('Menu click')
    }
    return (
        <header className="AdminHeader padding-left-right-20 padding-top-bottom-15">
            <IconButton color="#fff" iconElement={<MenuIcon />} clickHandler={clickHandler} margin="margin-right-10" waveColor="rgba(255, 255, 255, 0.8)" />
            <div className="application--name">
                <span>ADMIN</span>
                <span className="colored--text">DESK</span>
            </div>
            <div className="button--container">
                <div>Logout button here</div>
            </div>
        </header>
    )
}

export default AdminHeader;