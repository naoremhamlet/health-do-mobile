import { products } from "./data";

let myProducts = JSON.parse(JSON.stringify(products))

function getProductById(id) {
    return products.find(el => el.id === id)
}

function getProducts() {
    return myProducts;
}

function sortProducts(type) {
    console.log(type)
    if(type === "Price: Low to High")
        myProducts.sort((a,b) => a.price - b.price);
    if(type === "Price: High to Low")
        myProducts.sort((a,b) => b.price - a.price);
    if(type === "Popular")
        myProducts.sort((a,b) => b.rating - a.rating);
    if(type === "Newest")
        myProducts.sort((a,b) => a.id - b.id);
}

function filterProducts(value) {
    let filterVal = [];

    if(value?.length) {
        value.map(e => {
            filterVal = [...filterVal, ...products.filter(p => p.tags?.includes(e) || p.dietaryType === e)]
        })
    } else {
        filterVal = products;
    }
    
    myProducts = JSON.parse(JSON.stringify(filterVal));
}


export
{
    getProducts,
    sortProducts,
    filterProducts,
    getProductById
};