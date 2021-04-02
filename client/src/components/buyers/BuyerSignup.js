import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import buyer from '../../buyerSignup.svg';

const BuyerSignup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const signupHandler = e => {
        e.preventDefault();
        fetch('/register', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                contact,
                email,
                password,
                confirmpassword,
                type: "buyer"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } else {
                //dispatch
                M.toast({ html: data.message, classes:"green darken-2" });
                history.push('/login');
                // history.push('/verify');
            }
        })
    }

    return (
        <div className="container">
            <div className="signupOptions">
                <div className="signupForm">
                    <div className="card signupFormBox">
                        <div className="formHeader"> 
                            <h3>Signup</h3>
                        </div>
                        <form>
                            <input
                              name="name"
                              type="text"
                              placeholder="Name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              required
                           />
                           <input
                              name="contact"
                              type="text"
                              placeholder="Contact"
                              value={contact}
                              onChange={e => setContact(e.target.value)}
                              required
                           />
                           <input
                              name="email"
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              required
                           />
                           <input
                              name="password"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              required
                           />
                            <input
                              name="confirmpassword"
                              type="password"
                              placeholder="Confirm Password"
                              value={confirmpassword}
                              onChange={e => setConfirmPassword(e.target.value)}
                              required
                           />
                           <div className="formOptions">
                              <button
                                 className="btn signup waves-effect waves-light green darken-1"
                                 type="submit"
                                 onClick={signupHandler}
                              >
                                Create Account
                              </button>
                              <div className="alternateOption">
                                <h6><Link to="/login">Have an account?</Link></h6>
                              </div>
                           </div>
                        </form>
                    </div>
                </div>
                <div className="svgHolder">
                    <div>
                        <embed type="image/svg+xml" className="svg" src={buyer}>
                        </embed>
                    </div>
                    <h4 className="whiteText">Choose from a million products!</h4>
                </div>
            </div>
        </div>
    )
}

export default BuyerSignup;
