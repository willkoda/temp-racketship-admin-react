import React from 'react';
import './LogOut.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {compose} from 'redux';
import withStoreConnection from '../../hoc/withStoreConnection';
import {storeRemoveToken, storeRemoveUser} from '../../auxiliary/dispatch';
import {useHistory} from 'react-router-dom';

interface Props {
    storeRemoveToken(): void;
    storeRemoveUser(): void;
}

function LogOut(props: Props) {
    const history = useHistory();

    const clickHandler = (e: React.MouseEvent) => {
        props.storeRemoveToken();
        props.storeRemoveUser();
        history.push('/')
    }

    return (
        <button className="LogOut" onClick={clickHandler} >
            <ExitToAppIcon />
        </button>
    )
}

export default compose(
    withStoreConnection({dispatchProps: [storeRemoveToken, storeRemoveUser]})
)(LogOut)