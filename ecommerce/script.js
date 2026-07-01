// ==========================
// ShopEasy - script.js
// ==========================

// ---------- Cart ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

function updateCartCount() {

    if (!cartCount) return;

    let count = 0;

    cart.forEach(item => {

        count += item.quantity || 1;

    });

    cartCount.innerText = count;

}

updateCartCount();

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productCard = this.parentElement;

        const product = {
    name: productCard.querySelector("h3").innerText,
    price: productCard.querySelector(".price").innerText,
    image: productCard.querySelector("img").src,
    quantity: 1
};

// Check if the product already exists
const existingProduct = cart.find(item => item.name === product.name);

if (existingProduct) {
    existingProduct.quantity++;
} else {
    cart.push(product);
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

showToast(product.name + " added to cart");

    });

});

// ---------- Search ----------

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const name = card.querySelector("h3").innerText.toLowerCase();

            if (name.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// ---------- Dark Mode ----------

const darkBtn = document.createElement("button");

darkBtn.innerHTML = "🌙";

darkBtn.style.position = "fixed";
darkBtn.style.bottom = "20px";
darkBtn.style.right = "20px";
darkBtn.style.padding = "12px";
darkBtn.style.border = "none";
darkBtn.style.borderRadius = "50%";
darkBtn.style.cursor = "pointer";
darkBtn.style.fontSize = "18px";
darkBtn.style.background = "#2563eb";
darkBtn.style.color = "#fff";
darkBtn.style.zIndex = "999";

document.body.appendChild(darkBtn);

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

});

// ---------- Toast ----------

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "90px";
    toast.style.right = "20px";
    toast.style.background = "#16a34a";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "6px";
    toast.style.fontWeight = "bold";
    toast.style.boxShadow = "0 5px 15px rgba(0,0,0,.2)";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}

// ---------- Newsletter ----------

const newsletter = document.querySelector(".newsletter form");

if (newsletter) {

    newsletter.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input").value;

        if (email === "") {

            alert("Please enter your email.");

            return;

        }

        alert("Thank you for subscribing!");

        this.reset();

    });

}

// ---------- Smooth Scroll ----------

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

    });

});

// ---------- Scroll Animation ----------

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

});

document.querySelectorAll(".product-card, .category-card, .feature").forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".6s";

    observer.observe(item);

});

// ---------- Loading ----------

window.addEventListener("load", () => {

    console.log("ShopEasy Loaded Successfully");

});

// ---------- Footer Year ----------

const year = new Date().getFullYear();

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML = `© ${year} ShopEasy. All Rights Reserved.`;

}

// ---------- User Login Check ----------

const userLink = document.getElementById("userLink");

if (userLink) {

    if (localStorage.getItem("loggedIn") === "true") {

        userLink.href = "profile.html";

    } else {

        userLink.href = "login.html";

    }

}


// ================= Wishlist =================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".wishlist-icon").forEach(icon => {

    icon.addEventListener("click", function () {

        const card = this.parentElement;

        const product = {

            name: card.querySelector("h3").innerText,
            price: card.querySelector(".price").innerText,
            image: card.querySelector("img").src,
            quantity: 1

        };

        const exists = wishlist.find(item => item.name === product.name);

        if (!exists) {

            wishlist.push(product);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            this.innerHTML = '<i class="fas fa-heart" style="color:red"></i>';

            showToast(product.name + " added to Wishlist ❤️");

        } else {

            showToast("Already in Wishlist");

        }

    });

});