import React, {useState} from 'react';
import './LogIn.scss';
import Input, {ResultInterface} from '../elements/Input/Input';
import Button from '../elements/Button/Button';

function LogIn() {
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

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            email: email.value,
            password: password.value
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
                        placeholder="Password"
                        value={password.value}
                        changeCallback={changeHandler}
                        valid={password.valid}
                    />

                    <Button text="Log in" backgroundColor="accent--three" />
                </form>
            </div>
        </div>
    )
}

export default LogIn;