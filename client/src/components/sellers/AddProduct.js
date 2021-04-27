import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imageCount, setImageCount] = useState("");
    const [urls, setUrls] = useState(undefined);
    let imageNumber, urlsObject, count, tempUrls = [];

    const history = useHistory();

    useEffect(() => {
        if(urls){
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
                    discount,
                    urls
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({ html: data.error, classes: "red darken-3"})
                } else {
                    M.toast({ html: "Product Added!", classes:"green darken-2" });
                    setUrls(undefined) 
                    history.push('/seller/');
                }
            })
        }
    }, [urls])

    const productSubmit = e => {
        e.preventDefault();
        count = 0;
        if(imageCount){
            for(imageNumber = 0; imageNumber < imageCount; imageNumber++){
                const data = new FormData();
                data.append("file", image[imageNumber])
                data.append("upload_preset", "flinepreset")
                data.append("cloud_name", "flinecloud")
    
                fetch("https://api.cloudinary.com/v1_1/flinecloud/image/upload", {
                    method: "post",
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    tempUrls.push(data.url);
                    urlsObject = Object.assign({}, tempUrls) // the trick which worked
                    // Converting array (tempUrls) to object.. doing this step for all urls in loop
                    count++;
                    if(count === imageCount){
                        setUrls(urlsObject)
                        setImageCount("")
                        setImage("")
                    } 
                })
                .catch(err => console.log(err))
            }
        }        
    }

    const updateImages = (files) => {
        setImageCount(files.length)
        setImage(files)
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
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Upload Images</span>
                                    <input 
                                        type="file"
                                        multiple
                                        onChange={e => updateImages(e.target.files)}
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
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

