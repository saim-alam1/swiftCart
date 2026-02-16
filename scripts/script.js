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
  homeCardsContainer.innerHTML = "";

  const firstThree = productsData.slice(0, 3);
  firstThree.forEach((product) => {
    console.log(product);
    const cardDiv = document.createElement("div");
    cardDiv.classList = "card bg-base-100 shadow-sm mt-16";
    cardDiv.innerHTML = `
    <figure>
              <img
                src=${product.image}
                class="h-[470px] p-4"
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
                  <i class="fa-light fa-cart-shopping"></i> Add
                </button>
              </div>
            </div>
    `;
    homeCardsContainer.appendChild(cardDiv);
  });
};

loadData();
