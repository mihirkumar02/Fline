import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");

    const history = useHistory();

    const productSubmit = e => {
        e.preventDefault();
        fetch("/product/new", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            },
            body: JSON.stringify({
                name,
                description,
                category,
                quantity,
                price,
                discount
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: "red darken-3"})
            } else {
                M.toast({ html: "Product Added!", classes:"green darken-2" });
                history.push('/seller/');
            }
        })
    }

    return (
            <div className="container">
                <div className="addProductForm">
                    <div className="card signupFormBox">
                        <div className="formHeader"> 
                            <h3>New Product</h3>
                        </div>
                        <form>
                            <input
                              name="name"
                              type="text"
                              placeholder="Product Name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              required
                           />
                           <input
                              name="description"
                              type="text"
                              placeholder="Product Description"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              required
                           />
                            <select onChange={e => setCategory(e.target.value)}>
                              <option value="" disabled selected>Category</option>
                              <option value="Appliances">Appliances</option>
                              <option value="Baby Products">Baby Products</option>
                              <option value="Bags">Bags</option>
                              <option value="Beauty">Beauty</option>
                              <option value="Books">Books</option>
                              <option value="Cars">Cars</option>
                              <option value="Computers">Computers</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Fitness">Fitness</option>
                              <option value="Grocery">Grocery</option>
                              <option value="Kids Fashion">Kids' Fashion</option>
                              <option value="Luggage">Luggage</option>
                              <option value="Mens Fashion">Mens' Fashion</option>
                              <option value="Music">Music</option>
                              <option value="Mobiles">Mobiles</option>
                              <option value="Motorbikes">Motorbikes</option>
                              <option value="Movies">Movies</option>
                              <option value="Toys">Toys</option>
                              <option value="TV">TV</option>
                              <option value="Video Games">Video Games</option>
                              <option value="Womens Fashion">Womens' Fashion</option>
                            </select>
                           <input
                              name="quantity"
                              type="number"
                              placeholder="Quantity"
                              value={quantity}
                              onChange={e => setQuantity(e.target.value)}
                              required
                           />
                           <input
                              name="price"
                              type="number"
                              placeholder="Price"
                              value={price}
                              onChange={e => setPrice(e.target.value)}
                              required
                           />
                            <input
                              name="discount"
                              type="number"
                              placeholder="Discount"
                              value={discount}
                              onChange={e => setDiscount(e.target.value)}
                              required
                           />
                           <div className="formOptions">
                              <button
                                 className="btn signup waves-effect waves-light green darken-1"
                                 type="submit"
                                 onClick={productSubmit}
                              >
                                Add Product
                              </button>
                              <div className="alternateOption">
                                <h6><Link to="/seller/">Home</Link></h6>
                              </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AddProduct;

