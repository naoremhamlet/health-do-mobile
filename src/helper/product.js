import { products } from "./data";

function getProductById(id) {
    return products.find(el => el.id === id)
}

function getProducts() {
    return products;
}

// Pure sort — takes a list, returns a new sorted list. No shared mutable state,
// so it can't leak stale results into screens that didn't ask for them.
function sortProductList(list, type) {
    const sorted = [...list];
    if (type === "Price: Low to High")
        sorted.sort((a, b) => a.price - b.price);
    else if (type === "Price: High to Low")
        sorted.sort((a, b) => b.price - a.price);
    else if (type === "Popular")
        sorted.sort((a, b) => b.rating - a.rating);
    else if (type === "Newest")
        sorted.sort((a, b) => a.id - b.id);
    return sorted;
}

// Pure filter — takes a list and a set of active filter tags, returns the matches.
function filterProductList(list, activeFilters) {
    if (!activeFilters?.length) return list;
    const matched = new Set();
    activeFilters.forEach(filter => {
        list.forEach(p => {
            if (p.tags?.includes(filter) || p.dietaryType === filter) matched.add(p);
        });
    });
    return [...matched];
}

function getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(p => p.category === category);
}


export
{
    getProducts,
    sortProductList,
    filterProductList,
    getProductById,
    getProductsByCategory
};
