import React from 'react';
import { Link } from 'react-router-dom';

const SellerHome = () => {
    return (
        <div className="container">
            <div className="row sellerHome">
                <div className="col s12 m6">
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
                <div className="col s12 m6">
                    <div className="card dashboardBox">
                        <div className="center">
                            <h4>Inventory</h4>
                        </div>
                        {/* picture */}
                        <div className="center sellerOption">
                            <button
                                className="btn waves-effect waves-light orange accent-3"
                                type="button"  
                             >
                                <Link to="/seller/inventory">View</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerHome;