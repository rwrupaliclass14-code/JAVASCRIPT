//call all html element//
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");
const inputDiscount = document.getElementById("input-discount");
const inputPrice = document.getElementById("input-price");
const inputRating = document.getElementById("input-rating");
const inputImg = document.getElementById("input-img");
const inputId = document.getElementById("id");

const addProductBtn = document.getElementById("add-product-btn");
const editProductBtn = document.getElementById("edit-product-btn");

const inputSearch = document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");

const productTbody = document.getElementById("product-tbody");

const editBtn = document.getElementById("edit-btn");
const deleteBtn = document.getElementById("delete-btn");

const searchCategory = document.getElementById("search-category")
const priceFilter = document.getElementById("price-filter");

let allProducts = JSON.parse(localStorage.getItem("products")) || [];

const handleProduct = () => {
    const products = {
        name: inputName.value,
        description: inputDescription.value,
        category: inputCategory.value,
        discount: inputDiscount.value,
        price: inputPrice.value,
        rating: inputRating.value,
        img: inputImg.value,
    }
    allProducts.push(products);
    localStorage.setItem("products", JSON.stringify(allProducts));
    displayProducts();
};

//event action function//
addProductBtn.addEventListener("click", handleProduct);
//display the product//
const displayProducts = () => {
    productTbody.innerHTML = "";
    allProducts.forEach((element, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = ` <th scope="row">${index + 1}</th>
                            <td>
                                <img src="${element.img}" alt="product photo" height="100">
                            </td>
                            <td class="align-middle">${element.name}</td>
                            <td class="align-middle">${element.category}</td>
                            <td class="align-middle">${element.price}</td>
                            <td class="align-middle text-wrap"
                             style="width:300px;">${element.description}</td>
                            <td>${element.discount}</td>
                            <td align-middle text-center text-nowrap>${element.rating} 🌟🌟</td>
            <td class="align-middle text-center text-nowrap">
              <button  class="btn btn-warning rounded" onclick="editAndUpdate(${index})">Edit</button>
              <button class="btn btn-danger rounded" onclick="deleteProduct(${index})">Delete</button>
            </td>`;
        productTbody.appendChild(tr);
    });
};
//remove the products//
const deleteProduct = (index) => {
    allProducts.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(allProducts));
    displayProducts();
};

//product edit and update 
const editAndUpdate = (index) => {
    inputId.value = index;
    inputName.value = allProducts[index].name;
    inputCategory.value = allProducts[index].category;
    inputDescription.value = allProducts[index].description;
    inputPrice.value = allProducts[index].price;
    inputDiscount.value = allProducts[index].discount;
    inputRating.value = allProducts[index].rating;
    inputImg.value = allProducts[index].img;
    addProductBtn.className = "d-none";
    editProductBtn.classList.remove("d-none");
};

editProductBtn.addEventListener("click", editProductBtn);

//search product //
const searchProduct = () => {
    let search = inputSearch.value.toLowerCase();
    allProducts = allProducts.filter
        (products =>
            products.name.toLowerCase().includes(search) ||
            products.category.toLowerCase().includes(search)
        );
    displayProducts();
};

const handleReset = () => {
    inputSearch.value = "";
    allProducts = JSON.parse(localStorage.getItem("product")) || [];
    displayProducts();
};

searchBtn.addEventListener("click", searchProduct);
resetBtn.addEventListener("click", handleReset);

displayProducts();
