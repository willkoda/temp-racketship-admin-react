import React from 'react';
import './Loading.scss';
import {CircularProgress} from '@material-ui/core';

interface Props {
    margin?: string;
}

function Loading(props: Props) {
    return (
        <div className={`Loading ${props.margin}`}>
            <CircularProgress />
            <p className="margin-top-10">Loading Please Wait</p>
        </div>
    )
}

export default Loading;