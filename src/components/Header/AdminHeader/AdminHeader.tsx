import React, {useContext} from 'react';
import './AdminHeader.scss';
import IconButton from '../../../elements/IconButton/IconButton';
import LogOut from '../../../components/LogOut/LogOut';
import { Menu as MenuIcon } from '@material-ui/icons';
import {SideMenuContext} from '../../../providers/SideMenuProvider';

function AdminHeader() {
    const context = useContext(SideMenuContext);
    const clickHandler = () => {
        context.toggleSideMenu();
    }
    return (
        <header className="AdminHeader padding-left-right-20 padding-top-bottom-15">
            <IconButton 
                className="menu--button"
                color="#fff" 
                iconElement={<MenuIcon />} 
                clickHandler={clickHandler} 
                margin="margin-right-10" 
                waveColor="rgba(255, 255, 255, 0.4)" />
            <div className="application--name">
                <span>ADMIN</span>
                <span className="colored--text">DESK</span>
            </div>
            <div className="button--container">
                <LogOut />
            </div>
        </header>
    )
}

export default AdminHeader;