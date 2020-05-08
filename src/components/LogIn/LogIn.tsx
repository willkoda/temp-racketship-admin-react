import React, {useState} from 'react';
import './LogIn.scss';
import Input, {ResultInterface} from '../elements/Input/Input';
import Button from '../elements/Button/Button';
import axios from '../../auxiliary/axios';

import {storeSetToken, storeSetUser} from '../../auxiliary/dispatch';
import withStoreConnection from '../../hoc/withStoreConnection';
import {compose} from 'redux';

import {TokenStateInterface} from '../../redux/reducers/token-reducer';
import {UserStateInterface} from '../../redux/reducers/user-reducer';

interface Props {
    storeSetToken(params: TokenStateInterface): void;
    storeSetUser(params: UserStateInterface): void
}

function LogIn(props: Props) {
    const initialState = {value: '', valid: false, error: ''}
    const [email, setEmail] = useState({...initialState});
    const [password, setPassword] = useState({...initialState});

    const changeHandler = (result: ResultInterface) => {
        const newState = {...result};
        delete newState.origin

        switch(result.origin) {
            case 'email':
                    setEmail(newState);
                break;
            case 'password':
                    setPassword(newState);
                break;
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    };

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const requestData = {
            email: email.value,
            password: password.value
        }
        try {
            const response = await axios.post('/admin/sign_in', requestData);
            props.storeSetToken({
                accessToken: response.headers['access-token'],
                clientID: response.headers['client'],
                uid: response.headers['uid']
            });

            const {data} = response;
            props.storeSetUser({
                email: data.email,
                firstName: data.first_name,
                id: data.id,
                lastName: data.last_name,
                mobileNumber: data.mobile_number,
                role: data.role,
                verified: data.verified,
                verifiedOn: data.verified_on
            });

        } catch(error) {
            console.log(error);
            setEmail({...email, valid: false, error: 'Email or password is incorrect'});
        }
    }

    return (
        <div className="LogIn">
            <div className="login--window padding-top-bottom-40 padding-left-right-20">
                {/* {props.location.state ? <Notice text={props.location.state.message} /> : null} */}
                <h1 className="main--heading margin-bottom-10">
                    <span>Admin</span>
                    <span>Desk</span>
                </h1>
                <h2 className="font-weight-300 margin-bottom-20" style={{fontSize: '22px'}}>Log in</h2>
                <form onSubmit={formSubmitHandler}>
                    <Input 
                        id="email" 
                        inputBorderColor="var(--accent-one-shade-two)"
                        placeholder="Email" 
                        value={email.value} 
                        changeCallback={changeHandler} 
                        validatedProps={{email: true}} 
                        valid={email.valid} 
                        error={email.error} />

                    <Input
                        id="password"
                        inputBorderColor="var(--accent-one-shade-two)"
                        margin="margin-top-10"
                        placeholder="Password"
                        type="password"
                        value={password.value}
                        changeCallback={changeHandler}
                        valid={password.valid}
                    />

                    <Button text="Log in" backgroundColor="accent--three" waveColor="rgba(0, 0, 0, 0.15)" />
                </form>
            </div>
        </div>
    )
}

export default compose(
    withStoreConnection({dispatchProps: [storeSetToken, storeSetUser]})
)(LogIn);