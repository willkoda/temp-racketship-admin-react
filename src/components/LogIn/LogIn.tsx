import React, {useState} from 'react';
import './LogIn.scss';
import Input, {ResultInterface} from '../elements/Input/Input';
function LogIn() {
    const [email, setEmail] = useState('');

    const changeHandler = (result: ResultInterface) => {
        setEmail(result.value);
    };

    const formSubmitHandler = () => {

    }

    return (
        <div className="LogIn">
            <div className="login--window padding-top-bottom-40 padding-left-right-20">
                {/* {props.location.state ? <Notice text={props.location.state.message} /> : null} */}
                {/* <img src={props.pageConfiguration.header.logo} style={{height: '70px'}} alt="logo" className="margin-bottom-20"/> */}
                {/* <Heading level="two" alignment="center" text="Log in to your account" margin="margin-bottom-20" size="16px" color="var(--accent-four-shade-two)" /> */}
                <h1 className="font-weight-400">Log In</h1>
                <form onSubmit={formSubmitHandler}>
                    <Input id="email" placeholder="Email" value={email} changeCallback={changeHandler} />
                    {/*

                    <InputGroup
                        change={handleChange}
                        icon="ti-lock"
                        id="password"
                        origin="password"
                        placeholder="Password"
                        type="password"
                        margin="margin-top-20"
                        validators={{}}
                    />
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