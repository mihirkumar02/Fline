import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import M from 'materialize-css';

const SellerEmailVerified = () => {
    const { token } = useParams();

    useEffect(() => {
        fetch(`/verifyemail/${token}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "seller"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } 

            if(data.success){
                M.toast({ html: data.message, classes: "green darken-2"})
            }
        })
    }, [token])

    return (
        <section id="formPage">
            <div className="container">
                <div className="card verifyBox center">
                    <button
                        className="btn waves-effect waves-light green darken-1"
                        type="button"
                     >
                     <Link to="/seller/login">
                        Proceed to Login
                     </Link>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SellerEmailVerified;
