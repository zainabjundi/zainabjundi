"use strict";
/* products array*/ 

const products = [
    {
        id: 1,
        name: "CoreBook Pro X",
        category: "laptops",
        price: 999,
        oldPrice: 1199,
        emoji: "💻",
        desc: "Powerful and lightweight laptop for work, study, and entertainment.",
        rating: 5
    },
    {
        id: 2,
        name: "CoreBook Air",
        category: "laptops",
        price: 799,
        oldPrice: 949,
        emoji: "🖥️",
        desc: "Slim laptop with excellent performance and long battery life.",
        rating: 4
    },
    {
        id: 3,
        name: "CorePhone Ultra",
        category: "phones",
        price: 899,
        oldPrice: 1099,
        emoji: "📱",
        desc: "Modern smartphone with a powerful camera and fast processor.",
        rating: 5
    },
    {
        id: 4,
        name: "CorePhone Lite",
        category: "phones",
        price: 399,
        oldPrice: 499,
        emoji: "📲",
        desc: "Affordable smartphone with a beautiful display and reliable battery.",
        rating: 4
    },
    {
        id: 5,
        name: "Wireless Headphones",
        category: "accessories",
        price: 89,
        oldPrice: 129,
        emoji: "🎧",
        desc: "Enjoy clear sound and comfortable wireless listening.",
        rating: 5
    },
    {
        id: 6,
        name: "Smart Watch Pro",
        category: "accessories",
        price: 149,
        oldPrice: 199,
        emoji: "⌚",
        desc: "Track your activity, notifications, and daily health goals.",
        rating: 4
    },
    {
        id: 7,
        name: "Gaming Keyboard",
        category: "gaming",
        price: 69,
        oldPrice: 99,
        emoji: "⌨️",
        desc: "RGB gaming keyboard with fast and comfortable keys.",
        rating: 5
    },
    {
        id: 8,
        name: "Gaming Mouse",
        category: "gaming",
        price: 49,
        oldPrice: 79,
        emoji: "🖱️",
        desc: "High-precision gaming mouse designed for competitive players.",
        rating: 4
    }
];


/*variables*/

let cart = JSON.parse(localStorage.getItem("coretechCart")) || [];
let users = JSON.parse(localStorage.getItem("coretechUsers")) || [];
let currentUser = JSON.parse(localStorage.getItem("coretechCurrentUser")) || null;

/* seed the demo account shown in the login modal, if it doesn't exist yet*/

const demoAccountExists = users.some(function(user) {
    return user.email === "admin@gmail.com";
});

if (!demoAccountExists) {
    users.push({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456"
    });

    localStorage.setItem("coretechUsers", JSON.stringify(users));
}

let selectedCategory = "all";
let currentProducts = [...products];


/*html elemnts*/

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartButton = document.getElementById("cartBtn");
const closeCartButton = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutBtn");
const clearCartButton = document.getElementById("clearCartBtn");

const modal = document.getElementById("productModal");
const modalContent = document.getElementById("productDetails");
const closeModalButton = document.getElementById("closeProductModal");

const loginModal = document.getElementById("authModal");
const closeLoginButton = document.getElementById("closeAuthModal");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginButton = document.getElementById("loginBtn");
const logoutButton = document.getElementById("logoutBtn");
const usernameDisplay = document.getElementById("usernameDisplay");

const darkModeButton = document.getElementById("darkBtn");
const mobileMenuButton = document.getElementById("menuBtn");
const navMenu = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");
const newsletterForm = document.getElementById("newsletterForm");

const countdownDays = document.getElementById("days");
const countdownHours = document.getElementById("hours");
const countdownMinutes = document.getElementById("minutes");
const countdownSeconds = document.getElementById("seconds");


/* display products*/

function displayProducts(productList) {
    if (!productsContainer) {
        return;
    }

    if (productList.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try searching for another product.</p>
            </div>
        `;
        return;
    }

    productsContainer.innerHTML = "";

    productList.forEach(function(product) {
        const stars = "★".repeat(product.rating);

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                <span>${product.emoji}</span>
            </div>

            <div class="product-info">
                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.desc}</p>

                <div class="product-rating">
                    ${stars}
                </div>

                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    <span class="old-price">$${product.oldPrice}</span>
                </div>

                <div class="product-buttons">
                    <button
                        class="add-cart-button"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <button
                        class="details-button"
                        onclick="showProductDetails(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}


/* filter products*/

function filterProducts() {
    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    currentProducts = products.filter(function(product) {
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().indexOf(searchText) !== -1;

        return matchesCategory && matchesSearch;
    });

    sortProducts();
}


/* sort products*/

function sortProducts() {
    const sortValue = sortSelect ? sortSelect.value : "default";

    if (sortValue === "low") {
        currentProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    } else if (sortValue === "high") {
        currentProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    } else if (sortValue === "name") {
        currentProducts.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    displayProducts(currentProducts);
}


/* category buttons*/

const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.getAttribute("data-category");

        filterProducts();
    });
});


/* search*/
if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        filterProducts();
    });
}


/* sort*/

if (sortSelect) {
    sortSelect.addEventListener("change", function() {
        sortProducts();
    });
}


/* product details modal*/

function showProductDetails(productId) {
    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product || !modal || !modalContent) {
        return;
    }

    const stars = "★".repeat(product.rating);

    modalContent.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                ${product.emoji}
            </div>

            <div class="modal-product-info">
                <span>${product.category}</span>

                <h2>${product.name}</h2>

                <p>${product.desc}</p>

                <div class="product-rating">
                    ${stars}
                </div>

                <h3>$${product.price}</h3>

                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    modal.classList.add("active");
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", function() {
        modal.classList.remove("active");
    });
}

if (modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
}


/* login check*/

function checkLogin() {
    if (!currentUser) {
        alert("Please log in before adding products to your cart.");

        if (loginModal) {
            loginModal.classList.add("active");
        }

        return false;
    }

    return true;
}


/* add to cart*/

function addToCart(productId) {
    if (!checkLogin()) {
        return;
    }

    const product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }

    saveCart();
    displayCart();

    alert("Product added to cart.");
}


/* save cart*/

function saveCart() {
    localStorage.setItem("coretechCart", JSON.stringify(cart));
}


/* display cart*/

function displayCart() {
    if (!cartItemsContainer) {
        return;
    }

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="empty-cart">Your cart is empty.</p>
        `;
    }

    cart.forEach(function(item) {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.emoji}
            </div>

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>

                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>
            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal();
    updateCartCount();
}


/* increase quantity*/

function increaseQuantity(productId) {
    const item = cart.find(function(product) {
        return product.id === productId;
    });

    if (item) {
        item.quantity++;
    }

    saveCart();
    displayCart();
}


/*decrease quantity*/

function decreaseQuantity(productId) {
    const item = cart.find(function(product) {
        return product.id === productId;
    });

    if (item) {
        item.quantity--;
    }

    cart = cart.filter(function(product) {
        return product.quantity > 0;
    });

    saveCart();
    displayCart();
}


/* remove from cart*/

function removeFromCart(productId) {
    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    saveCart();
    displayCart();
}


/* cart total*/
function updateCartTotal() {
    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    if (cartTotal) {
        cartTotal.textContent = "$" + total;
    }
}


/* cart count*/

function updateCartCount() {
    const totalQuantity = cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}


/* open and close cart*/

if (cartButton) {
    cartButton.addEventListener("click", function() {
        cartSidebar.classList.add("active");
        displayCart();
    });
}

if (closeCartButton) {
    closeCartButton.addEventListener("click", function() {
        cartSidebar.classList.remove("active");
    });
}


/* clear cart*/

if (clearCartButton) {
    clearCartButton.addEventListener("click", function() {
        cart = [];
        saveCart();
        displayCart();
    });
}


/* checkout*/

if (checkoutButton) {
    checkoutButton.addEventListener("click", function() {
        if (!checkLogin()) {
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert("Thank you for your order!");

            cart = [];

            saveCart();
            displayCart();
        }
    });
}


/* login modal*/
if (loginButton) {
    loginButton.addEventListener("click", function() {
        loginModal.classList.add("active");
    });
}

if (closeLoginButton) {
    closeLoginButton.addEventListener("click", function() {
        loginModal.classList.remove("active");
    });
}


/* auth tab switching*/

if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener("click", function() {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
    });

    signupTab.addEventListener("click", function() {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
    });
}


/* login form*/

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value.trim();

        const password = document
            .getElementById("loginPassword")
            .value.trim();

        const loginMessage = document.getElementById("loginMessage");

        const user = users.find(function(item) {
            return item.email === email && item.password === password;
        });

        if (user) {
            currentUser = user;

            localStorage.setItem(
                "coretechCurrentUser",
                JSON.stringify(currentUser)
            );

            alert("Login successful!");

            loginModal.classList.remove("active");

            updateUserInterface();
        } else {
            if (loginMessage) {
                loginMessage.textContent =
                    "Incorrect email or password.";
            }
        }
    });
}


/* sign up form*/

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document
            .getElementById("signupName")
            .value.trim();

        const email = document
            .getElementById("signupEmail")
            .value.trim();

        const password = document
            .getElementById("signupPassword")
            .value.trim();

        const signupMessage = document.getElementById("signupMessage");

        if (name === "") {
            signupMessage.textContent = "Name is required.";
            return;
        }

        if (email.indexOf("@") === -1) {
            signupMessage.textContent = "Please enter a valid email.";
            return;
        }

        if (password.length < 6) {
            signupMessage.textContent =
                "Password must be at least 6 characters.";
            return;
        }

        const emailExists = users.some(function(user) {
            return user.email === email;
        });

        if (emailExists) {
            signupMessage.textContent =
                "This email already exists.";
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem(
            "coretechUsers",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        signupForm.reset();

        signupMessage.textContent =
            "You can now log in.";
    });
}


/* logout*/

if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        currentUser = null;

        localStorage.removeItem("coretechCurrentUser");

        updateUserInterface();

        alert("You have been logged out.");
    });
}


/* update user interface*/

function updateUserInterface() {
    if (currentUser) {
        if (loginButton) {
           loginButton.classList.add("hidden");
        }

        if (logoutButton) {
            logoutButton.classList.remove("hidden");
        }

        if (usernameDisplay) {
            usernameDisplay.textContent =
                "Welcome, " + currentUser.name;
            usernameDisplay.classList.remove("hidden");
        }
    } else {
        if (loginButton) {
            loginButton.classList.remove("hidden");
        }

        if (logoutButton) {
           logoutButton.classList.add("hidden");
        }

        if (usernameDisplay) {
            usernameDisplay.classList.add("hidden");
        }
    }
}


/* dark mode*/

if (darkModeButton) {
    darkModeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("coretechDarkMode", "enabled");
            darkModeButton.textContent = "☀️";
        } else {
            localStorage.setItem("coretechDarkMode", "disabled");
            darkModeButton.textContent = "🌙";
        }
    });
}

const savedDarkMode = localStorage.getItem("coretechDarkMode");

if (savedDarkMode === "enabled") {
    document.body.classList.add("dark");

    if (darkModeButton) {
        darkModeButton.textContent = "☀️";
    }
}


/* mobile menu*/

if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
}


/* contact form*/

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document
            .getElementById("contactName")
            .value.trim();

        const email = document
            .getElementById("contactEmail")
            .value.trim();

        const message = document
            .getElementById("contactMessage")
            .value.trim();

        const contactMessage =
            document.getElementById("contactResult");

        if (name === "" || email === "" || message === "") {
            contactMessage.textContent =
                "Please fill in all fields.";
            return;
        }

        if (email.indexOf("@") === -1) {
            contactMessage.textContent =
                "Please enter a valid email.";
            return;
        }

        contactMessage.textContent =
            "Message sent successfully.";

        contactForm.reset();
    });
}


/*newsletter form*/

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document
            .getElementById("newsletterEmail")
            .value.trim();

        const newsletterMessage =
            document.getElementById("newsletterResult");

        if (email === "") {
            newsletterMessage.textContent =
                "Please enter your email.";
            return;
        }

        if (email.indexOf("@") === -1) {
            newsletterMessage.textContent =
                "Please enter a valid email.";
            return;
        }

        newsletterMessage.textContent =
            "Thank you for subscribing!";

        newsletterForm.reset();
    });
}


/* countdown timer*/

const countdownDate = new Date();

countdownDate.setDate(countdownDate.getDate() + 7);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    if (countdownDays) {
        countdownDays.textContent = days;
    }

    if (countdownHours) {
        countdownHours.textContent = hours;
    }

    if (countdownMinutes) {
        countdownMinutes.textContent = minutes;
    }

    if (countdownSeconds) {
        countdownSeconds.textContent = seconds;
    }
}

setInterval(updateCountdown, 1000);

updateCountdown();


/* initialize website */

displayProducts(products);
displayCart();
updateUserInterface();
