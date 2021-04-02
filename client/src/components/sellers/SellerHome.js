import React from 'react';
import { Link } from 'react-router-dom';

const SellerHome = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m4">
                    <div className="card dashboardBox">
                        <div className="center">
                            <h4>Add a Product</h4>
                        </div>
                        {/* picture */}
                        <div className="center sellerOption">
                            <button
                                className="btn waves-effect waves-light pink accent-3"
                                type="button"  
                             >
                                <Link to="/seller/product/add">Add</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerHome;