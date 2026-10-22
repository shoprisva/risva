
const products = [
    {
        id: 1,
        name: "Graphic Tank Top",
        category: "Tops",
        price: 1299,
        color: "Washed black",
        sizes: ["XS", "S", "M", "L", "XL"],
        tag: "New drop",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",
        description: "A relaxed graphic top for layering, everyday outfits, and late-night plans."
    },
    {
        id: 2,
        name: "Baggy Cargo Pants",
        category: "Bottoms",
        price: 2499,
        color: "Olive grey",
        sizes: ["XS", "S", "M", "L", "XL"],
        tag: "Street favourite",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
        description: "Roomy utility-inspired trousers with a relaxed streetwear silhouette."
    },
    {
        id: 3,
        name: "Vintage Blue Denim",
        category: "Bottoms",
        price: 2199,
        color: "Faded blue",
        sizes: ["XS", "S", "M", "L", "XL"],
        tag: "Everyday",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
        description: "A throwback-inspired denim staple to style your own way."
    },
    {
        id: 4,
        name: "Everyday Shoulder Bag",
        category: "Bags",
        price: 1899,
        color: "Charcoal",
        sizes: ["One size"],
        tag: "New drop",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
        description: "A grab-and-go bag for daily essentials and everyday fits."
    },
    {
        id: 5,
        name: "Reworked Denim Jacket",
        category: "Reworked",
        price: 2899,
        color: "One of a kind",
        sizes: ["S", "M"],
        tag: "One of one",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=85",
        description: "A one-off reworked denim layer. Check its fit and condition before purchase."
    },
    {
        id: 6,
        name: "Patchwork Tote",
        category: "Reworked",
        price: 999,
        color: "Mixed denim",
        sizes: ["One size"],
        tag: "Upcycled",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
        description: "A practical carry-all with a one-of-a-kind, upcycled spirit."
    },
    {
        id: 7,
        name: "Oversized Logo Tee",
        category: "Tops",
        price: 1499,
        color: "Bone white",
        sizes: ["XS", "S", "M", "L", "XL"],
        tag: "Easy fit",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
        description: "An easy oversized tee made for layering and repeat wears."
    },
    {
        id: 8,
        name: "Vintage Wash Shorts",
        category: "Bottoms",
        price: 1699,
        color: "Faded blue",
        sizes: ["XS", "S", "M", "L"],
        tag: "Throwback",
        image: "https://images.unsplash.com/photo-1506629905607-d9a6a1e1f0e7?auto=format&fit=crop&w=800&q=85",
        description: "Casual denim shorts with a relaxed, throwback feel."
    }
];

let currentFilter = "All";
let cart = [];
let selectedSizes = {};

const money = amount => "₹" + amount.toLocaleString("en-IN");

const productsElement = document.getElementById("products");
const productOverlay = document.getElementById("productOverlay");
const cartOverlay = document.getElementById("cartOverlay");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const toastElement = document.getElementById("toast");

function renderProducts() {
    const filteredProducts = products.filter(product =>
        currentFilter === "All" || product.category === currentFilter
    );

    productsElement.innerHTML = filteredProducts.map(product => `
        <article class="product-card" data-product="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="tag">${product.tag}</span>
                <button class="heart" data-view="${product.id}"
                        aria-label="View ${product.name}">♡</button>
            </div>
            <div class="product-info">
                <div>
                    <strong>${product.name}</strong>
                    <small>${product.color}</small>
                </div>
                <span class="price">${money(product.price)}</span>
            </div>
        </article>
    `).join("");
}

document.getElementById("filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    currentFilter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach(filterButton => {
        filterButton.classList.toggle(
            "active",
            filterButton.dataset.filter === currentFilter
        );
    });

    renderProducts();
});

function setFilter(filter) {
    currentFilter = filter;

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });

    renderProducts();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll("[data-style]").forEach(card => {
    card.addEventListener("click", () => setFilter(card.dataset.style));
});

document.getElementById("reworkedButton").addEventListener("click", () => {
    setFilter("Reworked");
});

productsElement.addEventListener("click", event => {
    const heart = event.target.closest("[data-view]");
    const card = event.target.closest("[data-product]");

    if (heart) {
        openProduct(Number(heart.dataset.view));
    } else if (card) {
        openProduct(Number(card.dataset.product));
    }
});

function openProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    if (!selectedSizes[id]) selectedSizes[id] = product.sizes[0];

    document.getElementById("productDetails").innerHTML = `
        <div class="product-modal">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <p class="eyebrow">${product.category} / RISVA EDIT</p>
                <h2>${product.name}</h2>
                <strong>${money(product.price)}</strong>
                <p>${product.description}</p>
                <p><strong>Colour:</strong> ${product.color}</p>
                <p class="eyebrow">CHOOSE YOUR SIZE</p>
                <div class="size-row">
                    ${product.sizes.map(size => `
                        <button class="size ${selectedSizes[id] === size ? "selected" : ""}"
                                data-size="${size}" data-id="${id}">${size}</button>
                    `).join("")}
                </div>
                <button class="button full" id="addToCart">
                    Add to bag — ${money(product.price)}
                </button>
            </div>
        </div>
    `;

    productOverlay.classList.add("show");
    document.body.classList.add("modal-open");
}

document.getElementById("productDetails").addEventListener("click", event => {
    const sizeButton = event.target.closest("[data-size]");

    if (sizeButton) {
        selectedSizes[Number(sizeButton.dataset.id)] = sizeButton.dataset.size;
        openProduct(Number(sizeButton.dataset.id));
    }

    if (event.target.closest("#addToCart")) {
        const id = Number(document.querySelector("[data-size].selected").dataset.id);
        addToCart(id);
    }
});

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const size = selectedSizes[id] || product.sizes[0];
    const existing = cart.find(item => item.id === id && item.size === size);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, size, quantity: 1 });
    }

    closeOverlay(productOverlay);
    updateCart();
    showToast("Added to your bag ♡");
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartHeadingCount").textContent = `(${count})`;

    const cartItems = document.getElementById("cartItems");
    const cartSummary = document.getElementById("cartSummary");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty">
                Your bag is looking a little empty.<br>
                Go find something that feels like you ♡
            </p>
        `;
        cartSummary.innerHTML = "";
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        const product = products.find(p => p.id === item.id);

        return `
            <div class="cart-line">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <strong>${product.name}</strong>
                    <small>Size: ${item.size} · ${product.color}</small>
                    <strong>${money(product.price * item.quantity)}</strong>
                    <div class="qty">
                        <button data-qty="${index}" data-change="-1"
                                aria-label="Decrease quantity">−</button>
                        <span>${item.quantity}</span>
                        <button data-qty="${index}" data-change="1"
                                aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <button class="close" style="position:static"
                        data-remove="${index}" aria-label="Remove item">×</button>
            </div>
        `;
    }).join("");

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);

    cartSummary.innerHTML = `
        <div class="cart-total">
            <span>Subtotal</span><strong>${money(total)}</strong>
        </div>
        <p class="demo-notice">Demo store. Shipping and payment are not connected.</p>
        <button class="button full" id="checkoutButton">Continue to checkout ↗</button>
    `;
}

document.getElementById("cartItems").addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-qty]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
        const index = Number(quantityButton.dataset.qty);
        cart[index].quantity += Number(quantityButton.dataset.change);

        if (cart[index].quantity <= 0) cart.splice(index, 1);
        updateCart();
    }

    if (removeButton) {
        cart.splice(Number(removeButton.dataset.remove), 1);
        updateCart();
    }
});

document.getElementById("openCart").addEventListener("click", () => {
    updateCart();
    cartOverlay.classList.add("show");
    document.body.classList.add("modal-open");
});

document.getElementById("cartSummary").addEventListener("click", event => {
    if (!event.target.closest("#checkoutButton")) return;
    if (!cart.length) return;

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);

    document.getElementById("checkoutSummary").textContent =
        `Your demo total is ${money(total)}. No payment will be taken.`;

    closeOverlay(cartOverlay);
    checkoutOverlay.classList.add("show");
    document.body.classList.add("modal-open");
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
    event.preventDefault();
    closeOverlay(checkoutOverlay);
    cart = [];
    updateCart();
    event.target.reset();
    showToast("Demo checkout complete! No real order was placed.");
});

document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        closeOverlay(document.getElementById(button.dataset.close));
    });
});

document.querySelectorAll(".overlay").forEach(overlay => {
    overlay.addEventListener("click", event => {
        if (event.target === overlay) closeOverlay(overlay);
    });
});

function closeOverlay(overlay) {
    overlay.classList.remove("show");

    if (!document.querySelector(".overlay.show")) {
        document.body.classList.remove("modal-open");
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".overlay.show").forEach(closeOverlay);
    }
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

document.getElementById("signupForm").addEventListener("submit", event => {
    event.preventDefault();
    event.target.reset();
    showToast("Thanks for your interest! Signup is demo-only.");
});

let toastTimer;

function showToast(message) {
    toastElement.textContent = message;
    toastElement.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastElement.classList.remove("show");
    }, 2600);
}

renderProducts();
updateCart();
