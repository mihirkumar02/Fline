import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const MyProducts = () => {
    const [products, setProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [tbdId, setTbdId] = useState("")

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
 
    const Popup = () => {
        return (
          <div className="popup-box">
            <div className="inner-box">
              <span 
                className="material-icons close-icon"
                onClick={closePopup}
              >clear</span>
              <div className="popup-content">
                    <div className="center">
                        <h5>Are you sure?</h5>
                    </div>
                    <div className="deleteOptions">
                        <button 
                            className="btn waves-effect waves-light red darken-1"
                            onClick={() => deleteProduct(tbdId)}    
                        >
                            Confirm
                        </button>
                        <button 
                            className="btn waves-effect waves-light green darken-2"
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                    </div>
              </div>
            </div>
          </div>
        );
    };

    const openPopup = (id) => {
        setIsOpen(true)
        setTbdId(id) // id to be deleted (TBD)
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    const deleteProduct = (id) => {
        if(id){
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
                                if(index >= 0){
                                    return (
                                        <tr key={index} className="orange lighten-2">
                                            <td>{item.name}</td>
                                            <td><b>{item.description}</b></td>
                                            <td><b>{item.quantity}</b></td>
                                            <td><b>{item.price}</b></td>
                                            <td><b>{item.discount} %</b></td> 
                                            <td><i onClick={() => fetchEditForm(item._id)} className="edit material-icons">edit</i></td> 
                                            <td><i onClick={() => openPopup(item._id)} className="edit material-icons">delete</i></td> 
                                        </tr>
                                    )
                                }
                            }
                        )}
                    </tbody>
                </table>

                {isOpen ? <Popup/> : <></>}
        </div>
    )
}

export default MyProducts;
