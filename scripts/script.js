// Showing Active Nav Routes

const path = window.location.pathname;
// console.log(path);

// For desktop view
if (path.includes("index.html") || path === "/") {
  document
    .getElementById("nav-home")
    ?.classList.add("text-primary", "font-bold");
}

// For mobile view
if (path.includes("index.html") || path === "/") {
  document
    .getElementById("nav-home-mbl")
    ?.classList.add("text-primary", "font-bold");
}

// For desktop view
if (path.includes("products.html")) {
  document
    .getElementById("nav-products")
    ?.classList.add("text-primary", "font-bold");
}

// Loading All Data By Default
if (path.includes("products.html")) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => loadAllData(data));
}

// For mobile view
if (path.includes("products.html")) {
  document
    .getElementById("nav-products-mbl")
    ?.classList.add("text-primary", "font-bold");
}

// Customizing Category Tag
const formatCategory = (categoryStr) => {
  return categoryStr
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

// Loading All Data
const loadData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => displayHomeCards(res));
};

// Showed 3 Cards In Home Page Dynamically
const displayHomeCards = (productsData) => {
  const homeCardsContainer = document.getElementById("home-cards");
  if (!homeCardsContainer) return;
  homeCardsContainer.innerHTML = "";

  const firstThree = productsData.slice(0, 3);
  firstThree.forEach((product) => {
    // console.log(product);
    const cardDiv = document.createElement("div");
    cardDiv.classList = "card bg-base-100 shadow-sm mt-16";
    cardDiv.innerHTML = `
    <figure>
              <img
                src=${product.image}
                class="h-[400px] p-4"
                alt="Shoes"
              />
            </figure>
            <div class="px-5 space-y-4">
              <!-- Category & Rating -->
              <div class="flex items-center justify-between mt-5">
                <p
                  class="bg-purple-300 text-purple-700 inline-block px-2 text-xs rounded-full"
                >
                  ${formatCategory(product.category)}
                </p>

                <div>
                  <i class="fa-solid fa-star text-orange-500"></i>
                  ${product.rating.rate} (${product.rating.count})
                </div>
              </div>
              <h2 class="card-title">${product.title}</h2>
              <p class="font-bold text-xl">$${product.price}</p>

              <div class="mb-5 grid grid-cols-2 gap-4">
                <button class="btn">
                  <i class="fa-regular fa-eye"></i> Details
                </button>
                <button class="btn btn-primary">
                  <i class="fa-solid fa-cart-shopping"></i> Add
                </button>
              </div>
            </div>
    `;
    homeCardsContainer.appendChild(cardDiv);
  });
};

// To Load Category Nav
const loadCategoryNav = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((result) => loadCategories(result));
};

// To Load Category Nav Buttons
const loadCategories = (categories) => {
  // console.log(categories);

  const productsNav = document.getElementById("products-nav");
  if (!productsNav) return;
  productsNav.innerHTML = "";

  const allDataBtn = document.createElement("button");
  allDataBtn.className = "btn rounded-full lesson-btn active";
  allDataBtn.textContent = "All";

  allDataBtn.addEventListener("click", () => {
    removeActive();
    allDataBtn.classList.add("active");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => loadAllData(data));
  });

  productsNav.appendChild(allDataBtn);

  categories.forEach((category) => {
    // console.log(category);
    const btn = document.createElement("button");
    btn.classList = "btn rounded-full";
    btn.textContent = formatCategory(category);
    btn.addEventListener("click", () => {
      removeActive();
      btn.classList.add("active", "lesson-btn");
      loadCategoryData(category);
    });
    productsNav.appendChild(btn);
  });
};

// Removing Class
const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

// Loading All Data For Product Page
const loadAllData = (allData) => {
  const productCardContainer = document.getElementById("product-card");
  productCardContainer.innerHTML = "";
  allData.forEach((product) => {
    // console.log(product);
    const cardData = document.createElement("div");
    cardData.classList = "card bg-base-100 shadow-sm";
    cardData.innerHTML = `
    <figure>
              <img
                src=${product.image}
                class="h-[400px] p-4"
                alt="Shoes"
              />
            </figure>
            <div class="px-5 space-y-4">
              <!-- Category & Rating -->
              <div class="flex items-center justify-between mt-5">
                <p
                  class="bg-purple-300 text-purple-700 inline-block px-2 text-xs rounded-full"
                >
                  ${formatCategory(product.category)}
                </p>

                <div>
                  <i class="fa-solid fa-star text-orange-500"></i>
                  ${product.rating.rate} (${product.rating.count})
                </div>
              </div>
              <h2 class="card-title">${product.title}</h2>
              <p class="font-bold text-xl">$${product.price}</p>

              <div class="mb-5 grid grid-cols-2 gap-4">
                <button class="btn" onClick="productDetails(${product.id})">
                  <i class="fa-regular fa-eye"></i> Details
                </button>
                <button class="btn btn-primary">
                  <i class="fa-solid fa-cart-shopping"></i> Add
                </button>
              </div>
            </div>
    `;
    productCardContainer.appendChild(cardData);
  });
};

// Loading Data Based On Category
const loadCategoryData = (category) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((res) => loadAllData(res));
};

// To Get Single Product Detail By Id
const productDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((result) => displayModal(result));
};

// Display Modal
const displayModal = (data) => {
  console.log(data);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <h3 class="text-2xl font-semibold">${data.title}</h3>
  <p class="py-4">${data.description}</p>
  <p class="py-4"><span class="text-2xl font-semibold">Price: $${data.price}</p>
  `;
  document.getElementById("word_modal").showModal();
};

loadCategoryNav();
loadData();
