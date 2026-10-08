const cartContainer = document.getElementById("cart-container");
let stockMap = {}; // API se stock: { id: stock }

const getCart = () => JSON.parse(localStorage.getItem("carts")) || [];
const saveCart = (cart) => localStorage.setItem("carts", JSON.stringify(cart));

// API se saare products ka stock lana
const fetchStock = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    const data = await res.json();
    data.products.forEach((p) => (stockMap[p.id] = p.stock));
};

// Same id wale products ko ek karna (quantity jod do)
const mergeDuplicates = (cart) => {
    const merged = {};
    cart.forEach((item) => {
        if (merged[item.id]) merged[item.id].quantity += item.quantity || 1;
        else merged[item.id] = { ...item, quantity: item.quantity || 1 };
    });
    return Object.values(merged);
};

// Cart screen par dikhana
const displayCart = () => {
    const cart = mergeDuplicates(getCart());
    saveCart(cart);

    if (!cart.length) {
        cartContainer.innerHTML = `<h4 class="text-center my-5">Cart khali hai</h4>`;
        return;
    }

    let grandTotal = 0;

    cartContainer.innerHTML = cart.map((item) => {
        const stock = stockMap[item.id] ?? 0;
        // discount ke baad price x quantity
        const total = item.price * (1 - item.discountPercentage / 100) * item.quantity;
        grandTotal += total;

        return `
        <div class="card col-7 my-4">
            <div class="card-body d-flex">
                <img src="${item.thumbnail}" height="150" width="150" class="rounded me-3">
                <div>
                    <h5>${item.title}</h5>
                    <p>Price -/ ${item.price} USD | Discount ${item.discountPercentage}%</p>
                    <p class="fw-bold">Total: ${total.toFixed(2)} USD</p>
                    <small class="text-muted">Stock: ${stock}</small>
                    <div class="d-flex gap-3 mt-2">
                        <div>
                            <button class="btn btn-info" onclick="changeQty(${item.id}, 1)">+</button>
                            <span class="fw-bold mx-3">${item.quantity}</span>
                            <button class="btn btn-info" onclick="changeQty(${item.id}, -1)">-</button>
                        </div>
                        <button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join("") + `<h4 class="my-3">Grand Total: ${grandTotal.toFixed(2)} USD</h4>`;
};

// + aur - dono ek hi function se (change = +1 ya -1)
const changeQty = (id, change) => {
    const cart = getCart();
    const item = cart.find((p) => p.id === id);
    const newQty = item.quantity + change;

    if (newQty < 1) return; // 1 se kam nahi
    if (newQty > stockMap[id]) {
        alert(`Sirf ${stockMap[id]} item stock me hain`); // stock se zyada nahi
        return;
    }

    item.quantity = newQty;
    saveCart(cart);
    displayCart();
};

// Remove: localStorage se bhi hatao
const removeItem = (id) => {
    saveCart(getCart().filter((p) => p.id !== id));
    displayCart();
};

// Pehle stock lao, phir cart dikhao
fetchStock().then(displayCart);