import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import sell from '../../sell.jpg';
import {UserContext} from '../../App';

const BuyerLogin = () => {
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
                type: "buyer"
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
                history.push('/');
            }
        })
    }

    const switchUserType = () => {
        dispatch({type: "USERTYPE", payload: "seller"})
        M.toast({html: "Seller's Section", classes: "purple darken-1"})
        history.push('/seller/login');
    }

    return (
        <section id="formPage">
            <div className="container">
                <div className="userOptions">
                    <div>
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
                                     <h6><Link to="/register">New User?</Link></h6>
                                   </div>
                                </div>
                                <div className="center">
                                    <div className="alternateOption">
                                         <h6><Link to="/forgot">Forgot Password?</Link></h6>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="card imageBox">
                            <div className="formHeader"> 
                                <h3>Sell at Fline</h3>
                            </div>
                            <div className="center">
                                <div>
                                    <img className="optionsImage" src={sell} alt="Sell"/>
                                </div>
                            </div>
                            <div className="center sellerOption">
                                <button
                                    className="btn waves-effect waves-light deep-orange"
                                    type="button"
                                    onClick={switchUserType}
                                 >
                                    Become a Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BuyerLogin;
