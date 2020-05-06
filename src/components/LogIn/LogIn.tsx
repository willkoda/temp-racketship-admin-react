import React, {useState} from 'react';
import './LogIn.scss';
import Input, {ResultInterface} from '../elements/Input/Input';
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

    const formSubmitHandler = () => {

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
                        placeholder="Email" 
                        value={email.value} 
                        changeCallback={changeHandler} 
                        validatedProps={{email: true}} 
                        valid={email.valid} 
                        error={email.error} />

                    <Input
                        id="password"
                        placeholder="Password"
                        value={password.value}
                        changeCallback={changeHandler}
                        valid={password.valid}
                    />

                    <button style={{
                        backgroundColor: 'var(--accent-three-shade-one)',
                        color: '#fff',
                        padding: '12px 10px',
                        outline: 'none',
                        fontSize: '14px',
                        width: '100%',
                        border: 'none',
                        boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.2)'
                    }}>
                        Log in
                    </button>
                    {/*
                    <div className="block margin-top-20">
                        <CheckBox id="remember-me" text="Remember me" />
                        <Link to="/forgot-password" className="forgot--password--link">Forgot your password?</Link>
                    </div>

                    <Button margin="margin-top-10" text="Log In" buttonType="block" backgroundColor="var(--accent-four-shade-four)" /> */}
                </form>
            </div>
        </div>
    )
}

export default LogIn;