
const productsContainer = document.getElementById("products-container");

const fetchProducts = () => {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
            displayProducts(data.products);
        });
}

//product display karne k liye function
const displayProducts = (products) => {
    products.forEach(element => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.width = "14rem";
        div.innerHTML = `
        <img src="${element.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${element.returnPolicy}</li>
                    <li class="list-group-item">${element.rating}</li>
                    <li class="list-group-item">price -/${element.price}</li>
                </ul>
                <div class="card-body">
                    <button class="btn btn-primary w-100" onclick = "addToCart(${element.id})" >Add to card</button>
                </div>`
        productsContainer.appendChild(div);
    });
};

const addToCart = (id) => {
    const cartList = JSON.parse(localStorage.getItem("carts")) || [];
    fetch("https://dummyjson.com/products/" + id)
        .then((res) => res.json())
        .then((data) => {
            cartList.push(data);
            localStorage.setItem("carts", JSON.stringify(cartList));
        });

    alert("Add to cart successfully !");
}

fetchProducts();