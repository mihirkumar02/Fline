import React, { useState, useContext } from 'react';
import M from 'materialize-css';
import { UserContext } from '../../App';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const {dispatch} = useContext(UserContext);

    const emailHandler = e => {
        e.preventDefault();
        fetch('/forgot', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                type: "buyer"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } 
            
            if(!data.success){
                M.toast({ html: data.message, classes:"red darken-3" });
            } else {
                M.toast({ html: data.message, classes:"green darken-2"});
                dispatch({type: "USERTYPE", payload: "buyer"})
                setEmail("");
            }
        })
    }

    return (
        <section id="formPage">
            <div className="container">
                <div className="card verifyBox center">
                    <h6>Forgot Password?</h6>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className="btn waves-effect waves-light green darken-1"
                        type="submit"
                        onClick={e => emailHandler(e)}
                    >
                        Send Email 
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;
