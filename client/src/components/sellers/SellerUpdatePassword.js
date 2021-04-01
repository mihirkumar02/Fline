import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SellerUpdatePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const history = useHistory();
    const { token } = useParams();

    const passwordHandler = e => {
        e.preventDefault();
        fetch(`/passwordupdate/${token}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                confirmpassword,
                type: "seller"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } 
            
            if(data.success){
                M.toast({ html: data.message, classes:"green darken-2"})
                history.push('/seller/login');
            }
        })
    }

    return (
        <section id="formPage">
            <div className="container">
                <div className="card verifyBox center">
                    <h6>Change Password</h6>
                    <input
                        name="password"
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmpassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        className="btn waves-effect waves-light green darken-1"
                        type="submit"
                        onClick={e => passwordHandler(e)}
                    >
                        Update
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SellerUpdatePassword;
