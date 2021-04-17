import React, { useEffect } from 'react'

const BuyerHome = () => {
    useEffect(() => {
        fetch('/allproducts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "buyer"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }, [])

    return (
        <div className="container">
            <section id="carouselHolder">

            </section>
            <section id="productCards">

            </section>
            
        </div>
    )
}

export default BuyerHome;