import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import sell from '../../sell.jpg';
import {UserContext} from '../../App';

const SellerLogin = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {dispatch} = useContext(UserContext);

    const loginHandler = e => {
        e.preventDefault();
        fetch('/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                type: "seller"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } else {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({type: "USER", payload:data.user})
                M.toast({ html: "Welcome " + data.user.username, classes:"green darken-2" });
                history.push('/seller/');
            }
        })
    }

    const switchUserType = () => {
        dispatch({type: "USERTYPE", payload: "buyer"})
        history.push('/login');
    }

    return (
        <section id="formPage">
            <div className="container">
                <div className="userOptions">
                    <div className="loginForm">
                        <div className="card formBox">
                            <div className="formHeader"> 
                                <h3>Login</h3>
                            </div>
                            <form>
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
                                <div className="formOptions">
                                   <button
                                      className="btn waves-effect waves-light green darken-1"
                                      type="submit"
                                      onClick={loginHandler}
                                   >
                                     Login
                                   </button>
                                   <div className="alternateOption">
                                     <h6><Link to="/seller/register">New Seller?</Link></h6>
                                   </div>
                                </div>
                                <div className="center">
                                    <div className="alternateOption">
                                         <h6><Link to="/seller/forgot">Forgot Password?</Link></h6>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="card imageBox">
                            <div className="formHeader"> 
                                <h3>Buy at Fline</h3>
                            </div>
                            <div className="center">
                                <div>
                                    <img className="optionsImage" src={sell} alt="Sell"/>
                                </div>
                            </div>
                            <div className="center sellerOption">
                                <button
                                    className="btn waves-effect waves-light pink accent-3"
                                    type="button"
                                    onClick={switchUserType}
                                 >
                                    Grab Some Products!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerLogin;
