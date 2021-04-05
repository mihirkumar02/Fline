import React, { useEffect } from 'react'

const MyProducts = () => {
    useEffect(() => {
        fetch('/myproducts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Type": "seller"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default MyProducts;
