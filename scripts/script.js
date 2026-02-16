// Showing Active Nav Routes

const path = window.location.pathname;
console.log(path);

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
