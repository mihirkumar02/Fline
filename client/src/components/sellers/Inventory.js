import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const MyProducts = () => {
    const [products, setProducts] = useState([])

    const history = useHistory();

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

    const fetchEditForm = (id) => {
        history.push(`/seller/product/${id}/edit`)
    }

    const deleteProduct = (id) => {
        fetch(`/product/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                M.toast({ html: "Product Removed!", classes:"green darken-2" });
                history.push('/seller/');
            }
        })
    }

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
                          <th>Edit</th>
                          <th>Delete</th>
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
                                            <td><i onClick={() => fetchEditForm(item._id)} className="edit material-icons">edit</i></td> 
                                            <td><i onClick={() => deleteProduct(item._id)} className="edit material-icons">delete</i></td> 
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
