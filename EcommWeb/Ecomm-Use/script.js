/////

const inputSearch = document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");

var products = [];
const containerInput = document.getElementById("container-inp");
//fetch data to api//

const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    displayProducts(data.products);
};
// display the products//
const displayProducts = (apiProducts) => {
    products = apiProducts;
    //har products pe loop ghuma ke data fetch karna //
    apiProducts.forEach((products, item) => {
        var p = `<div class="card" style="width: 15rem;">
                <img src=" ${products.thumbnail}"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name : ${products.title}</h5>
                    <p class="card-text">Description : ${products.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Category : ${products.category}</li>
                    <li class="list-group-item">${products.rating} ⭐⭐⭐</li>
                    <li class="list-group-item">${products.returnPolicy}</li>
                    <li class="list-group-item">Price /- ${products.price}USD</li>
                </ul>
                <div class="card-body">
                    <button class="btn btn-primary w-100"
                        onclick="addCart(${products.id})">
                        Add To Cart
                    </button>
                </div>

            </div>`;
        containerInput.insertAdjacentHTML("beforeend", p);
    });

};

const addCart = (id) => {
    //id ke base single product ko find karna//
    var product = products.find(e => e.id == id);
    //local storage se data fetch karna//
    let cartItem = JSON.parse(localStorage.getItem('carts')) || [];

    let isrepeat = false;

    cartItem.forEach((element) => {
        if (element.id == id) {
            element.qty++
            localStorage.setItem('carts', JSON.stringify(cartItem));
            isrepeat = true;
        }
    });

    if (isrepeat == false) {
        product.qty = 1;
        cartItem.push(product);
        localStorage.setItem('carts', JSON.stringify(cartItem));
    }
    //local storage main data set karna//
    alert(`Product ${product.title} Added successfully`);
}
//add to card and store the data in local storage//



fetchProducts();