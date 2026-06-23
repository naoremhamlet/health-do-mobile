import { carts } from "./data";

function getCartDetailById(id) {
    return carts.filter(el => el === id);
}

function getAllCartDetail() {
    return carts;
}


export
{
    getCartDetailById,
    getAllCartDetail
}