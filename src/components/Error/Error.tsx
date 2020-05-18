import React from 'react';
import './Error.scss';
import {useHistory} from 'react-router-dom';

function Error() {
    const history = useHistory();
    return (
        <div className="Error">
            <div className="error--code">404</div>
            <div className="error--message">The page you're looking for does not exist.</div>
             <button className="go--back margin-top-10" onClick={() => history.goBack()}>Go back</button>
        </div>
    )
}

export default Error;