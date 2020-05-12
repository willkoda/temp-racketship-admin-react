import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import axios from '../auxiliary/axios';

interface Props {
    accessToken: string | null;
    clientID: string | null;
    uid: string | null;
}

function tokenValidation(Component: any) {
    return function EnhancedComponent(props: Props) {
        const history = useHistory();
        const validateToken = useCallback(async () => {
            console.log('validate token use cb')
            try {
                await axios.get('/auth/validate_token');
            }
            catch (error) {
                console.log(error)
                history.push('/login', {message: 'Please log-in before continuing.'});
            }
        }, [history]);
        
        return (
            <Component validateToken={validateToken} {...props} />
        )
    }
}

export default tokenValidation;