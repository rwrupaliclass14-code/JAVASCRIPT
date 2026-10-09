//Create ecommerce admin panel were user can store add/update/delete product.
//user can search, filter and short products by name, price act. product add to card quantity increment/decrement based bill

/* first we get all element */
const inputName = document.getElementById("input-name");
const inputCategory = document.getElementById("input-category");
const inputDescription = document.getElementById("input-description");
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

/*** input se value get kar k local storage mai store karta hai ***/

let allProduct = JSON.parse(localStorage.getItem("product")) || [];

const handleProduct = () => {

    const product = {  // object while creation of project

        name: inputName.value,
        category: inputCategory.value,
        description: inputDescription.value,
        discount: inputDiscount.value,
        rating: inputRating.value,
        price: inputPrice.value,
        img: inputImg.value,

    };
    allProduct.push(product); // object ki value ko array me add karna //
    localStorage.setItem("product", JSON.stringify(allProduct)); //object value ko string mai convert krega//
    displayProducts();
};
const editProduct = () => {
    const id = inputId.value;

    // Product ko update karo
    allProduct[id] = {
        name: inputName.value,
        category: inputCategory.value,
        description: inputDescription.value,
        discount: inputDiscount.value,
        rating: inputRating.value,
        price: inputPrice.value,
        img: inputImg.value
    };

    // Updated data ko Local Storage me save karo
    localStorage.setItem("product", JSON.stringify(allProduct));

    // Table ko update karo
    displayProducts();

    // 2 second baad page reload
    setTimeout(() => location.reload(), 2000);
};

editProductBtn.addEventListener("click", editProduct);
addProductBtn.addEventListener("click", handleProduct);
/*** displayProduct name ka function ***/

const displayProducts = () => {
    productTbody.innerHTML = "";
    allProduct.forEach((product, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<th scope="row">${i + 1}</th>
            <td>
              <img
                height="100"
                src="${product.img}"
                alt=""
              />
            </td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td width="200">${product.description}</td>
            <td>${product.price}</td>
            <td>${product.discount}</td>
            <td>${product.rating}</td>
            <td class="">
              <button class="btn btn-warning" onclick="setProductForEdit(${i})">Edit</button>
              <button class="btn btn-danger ms-3" onclick="removeProduct(${i})">Delete</button>
            </td>`;
        productTbody.appendChild(tr);
    });
};

//product ko remove karne k liye function//

const removeProduct = (i) => {
    allProduct.splice(i, 1);
    displayProducts();
}


const setProductForEdit = (i) => {
    inputId.value = i;  //hidden field mai update hone wali product ko set karna 
    inputName.value = allProduct[i].name;
    inputCategory.value = allProduct[i].category;
    inputDescription.value = allProduct[i].description;
    inputPrice.value = allProduct[i].price;
    inputDiscount.value = allProduct[i].discount;
    inputRating.value = allProduct[i].rating;
    inputImg.value = allProduct[i].img;
    addProductBtn.className = "d-none";
    editProductBtn.className = "btn btn-warning";
    document.documentElement.scrollTop = 0;
};

const searchProduct = () => {

    let search = inputSearch.value.toLowerCase();

    allProduct = allProduct.filter
        (product =>
            product.name.toLowerCase().includes(search) || //array element me search karta hai element he ya nhi/ true of false//
            product.category.toLowerCase().includes(search)
        );

    displayProducts();
};
//handlereset inputsearch ki value ko empty kar ke local storage se data get kar k display krega//
const handleReset = () => {
    inputSearch.value = "";
    allProduct = JSON.parse(localStorage.getItem("product")) || [];
    displayProducts();
};

searchBtn.addEventListener("click", searchProduct);
resetBtn.addEventListener("click", handleReset);

displayProducts();

//when admin select category option in drop down menu execute function
// Category select karne par function chalega
searchCategory.onchange = () => {

    // select se chuni hui category lo
    let search = searchCategory.value;

    allProduct = JSON.parse(localStorage.getItem("product")) || [];

    // "all" nahi hai to hi filter karo
    if (search !== "all") {
        allProduct = allProduct.filter(product =>
            product.category === search
        );
    }

    displayProducts();
};
//when admin select option in drop down menu execute function
priceFilter.onchange = () => {

    if (priceFilter.value == "max") {
        allProduct.sort((a, b) => b.price - a.price);
    }
    else if (priceFilter.value == "min") {
        allProduct.sort((a, b) => a.price - b.price);
    }
    else {
        allProduct = JSON.parse(localStorage.getItem("product")) || [];
    }
    displayProducts();
}