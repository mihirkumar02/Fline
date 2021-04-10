import React, { useEffect, useState } from 'react'

const MyProducts = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetch('/myproducts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data.myprods);
        })
    }, [])



    return (
        <div className="container tableContainer">
            <table className="responsive-table centered">
                    <thead className="white">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => 
                            {
                                if(index > 0){
                                    return (
                                        <tr key={index} className="orange lighten-2">
                                            <td>{item.name}</td>
                                            <td><b>{item.description}</b></td>
                                            <td><b>{item.quantity}</b></td>
                                            <td><b>{item.price}</b></td>
                                            <td><b>{item.discount} %</b></td>
                            
                                        </tr>
                                    )
                                }
                            }
                        )}
                    </tbody>
                </table>
        </div>
    )
}

export default MyProducts;
