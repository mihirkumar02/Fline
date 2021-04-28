import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';

const EditProduct = () => {
    const history = useHistory();
    const {id} = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [urls, setUrls] = useState(undefined);


    useEffect(() => {
        fetch(`/product/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.product.name)
            setDescription(data.product.description)
            setQuantity(data.product.quantity)
            setPrice(data.product.price)
            setDiscount(data.product.discount)
            setUrls(data.product.photos)
        })
    }, [])

    const productUpdate = e => {
        e.preventDefault();
        fetch(`/product/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            },
            body: JSON.stringify({
                name,
                description,
                quantity,
                price,
                discount
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } 
            
            if(data.success){
                M.toast({ html: "Product Updated!", classes:"green darken-2" });
                history.push('/seller/');
            }
        })
    }

    return (
        <section id="formPage">
            <div className="container">
                <div className="addProductForm">
                    <div className="card signupFormBox">
                        <div className="formHeader"> 
                            <h3>Edit Product</h3>
                        </div>
                        <form>
                            <input
                              name="name"
                              type="text"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              required
                           />
                           <input
                              name="description"
                              type="text"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              required
                           />
                           {urls && Object.values.forEach(photo => {
                               <img src={photo} height="200px" width="200px"/>
                           })}
                           <input
                              name="quantity"
                              type="number"
                              value={quantity}
                              onChange={e => setQuantity(e.target.value)}
                              required
                           />
                           <input
                              name="price"
                              type="number"
                              value={price}
                              onChange={e => setPrice(e.target.value)}
                              required
                           />
                            <input
                              name="discount"
                              type="number"
                              value={discount}
                              onChange={e => setDiscount(e.target.value)}
                              required
                           />
                           <div className="formOptions">
                              <button
                                 className="btn signup waves-effect waves-light green darken-1"
                                 type="submit"
                                 onClick={productUpdate}
                              >
                                Update Product
                              </button>
                              <div className="alternateOption">
                                <h6><Link to="/seller/">Home</Link></h6>
                              </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProduct;

