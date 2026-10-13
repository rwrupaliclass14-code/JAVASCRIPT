
const cardContainer = document.getElementById("card-container");

//display products//
const fetchProduct = () => {
    cardContainer.innerHTML = "";
    let cartItem = JSON.parse(localStorage.getItem("carts")) || [];

    // set quantity//
    cartItem.forEach((element) => {
        if (!element.qty || element.qty < 1) {
            element.qty = 1;
        }
    });

    localStorage.setItem("carts", JSON.stringify(cartItem));

    // Display each product
    cartItem.forEach((element, index) => {

        let p = `
            <div class="card w-100 shadow-sm mb-3">

                <div class="card-body d-flex align-items-center gap-3 flex-wrap">

                    <img src="${element.thumbnail}"
                        class="img-fluid rounded"
                        style="width:150px; height:150px; object-fit:contain;"
                        alt="${element.title}">

                    <div class="flex-grow-1">

                        <h5 class="card-title">${element.title}</h5>

                        <p class="card-text">${element.description}</p>

                        <p>Category: ${element.category}</p>

                        <p>Rating: ⭐ ${element.rating}</p>

                        <p>Stock: ${element.stock}</p>

                        <h6>Price: $${element.price}</h6>

                        <div class="d-flex align-items-center gap-2 mt-3">
                            <button class="btn btn-primary"
                                onclick="qtyDecrement(${index})"> - </button>

                            <span class="fw-bold">${element.qty}</span>

                            <button class="btn btn-primary"
                                onclick="qtyIncrement(${index})"
                                ${element.qty >= element.stock ? "disabled" : ""}> + </button>
                            <button class="btn btn-danger"
                                onclick="removeProduct(${index})">
                                Remove
                            </button>

                        </div>

                        <p class="mt-3 mb-0 fw-bold">
                            Total: $${(element.price * element.qty).toFixed(2)}
                        </p>

                    </div>

                </div>
            </div>
        `;

        cardContainer.insertAdjacentHTML("beforeend", p);
    });

    // Bill function//
    let bill = `
        <div class="card w-100 border-primary mt-2 mb-4">
            <div class="card-body">
                <h4 class="card-title">Bill Summary</h4>
                <h5 id="bill-total" class="text-success"></h5>
            </div>
        </div>
    `;

    cardContainer.insertAdjacentHTML("beforeend", bill);

    calculateBill();
};


//increament in quentity//
const qtyIncrement = (index) => {
    let cartItem = JSON.parse(localStorage.getItem("carts")) || [];
    if (cartItem[index].qty < cartItem[index].stock) {
        cartItem[index].qty++;
    }
    localStorage.setItem("carts", JSON.stringify(cartItem));
    fetchProduct();
};


//dicreament quantity
const qtyDecrement = (index) => {
    let cartItem = JSON.parse(localStorage.getItem("carts")) || [];
    if (cartItem[index].qty > 1) {
        cartItem[index].qty--;
    } else {
        // remove product jab 0 ho
        cartItem.splice(index, 1);
    }
    localStorage.setItem("carts", JSON.stringify(cartItem));
    fetchProduct();
};


//remove product//
const removeProduct = (index) => {
    let cartItem = JSON.parse(localStorage.getItem("carts")) || [];
    cartItem.splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(cartItem));
    fetchProduct();
};




fetchProduct();
