(function () {
    const courses = [
        {
            id: 1,
            title: "Java Programming Masterclass",
            desc: "From basics to advanced OOP, collections, and Spring Boot fundamentals.",
            price: 1299,
            mrp: 2499,
            icon: "☕",
            color: "#e67e22",
        },
        {
            id: 2,
            title: "Python for Beginners & Pros",
            desc: "Master Python syntax, data structures, web scraping, and automation.",
            price: 999,
            mrp: 1999,
            icon: "🐍",
            color: "#3776ab",
        },
        {
            id: 3,
            title: "Frontend Developer Bootcamp",
            desc: "HTML, CSS, JavaScript, React, and responsive design from scratch.",
            price: 1499,
            mrp: 2999,
            icon: "🎨",
            color: "#e74c3c",
        },
        {
            id: 4,
            title: "Backend Developer Path",
            desc: "Node.js, Express, databases, REST APIs, and authentication deep dive.",
            price: 1599,
            mrp: 3199,
            icon: "⚙️",
            color: "#2c3e50",
        },
        {
            id: 5,
            title: "Communication Skills Pro",
            desc: "Build confidence in speaking, listening, and professional writing.",
            price: 799,
            mrp: 1599,
            icon: "🗣️",
            color: "#27ae60",
        },
        {
            id: 6,
            title: "English Speaking Fluency",
            desc: "Daily practice, pronunciation drills, and real conversation scenarios.",
            price: 899,
            mrp: 1799,
            icon: "🇬🇧",
            color: "#2980b9",
        },
        {
            id: 7,
            title: "Full Stack Web Development",
            desc: "End-to-end MERN stack — MongoDB, Express, React, Node.js.",
            price: 2499,
            mrp: 4999,
            icon: "🌐",
            color: "#8e44ad",
        },
        {
            id: 8,
            title: "Data Science with Python",
            desc: "Pandas, NumPy, Matplotlib, and machine learning fundamentals.",
            price: 1999,
            mrp: 3999,
            icon: "📊",
            color: "#16a085",
        },
        {
            id: 9,
            title: "DSA in Java",
            desc: "Master algorithms, data structures, and ace coding interviews.",
            price: 1799,
            mrp: 3599,
            icon: "🧠",
            color: "#d35400",
        },
        {
            id: 10,
            title: "UI/UX Design Essentials",
            desc: "Figma, design thinking, user research, and prototyping skills.",
            price: 1199,
            mrp: 2399,
            icon: "✏️",
            color: "#c0392b",
        },
        {
            id: 11,
            title: "Digital Marketing 360°",
            desc: "SEO, social media, Google Ads, and content marketing strategies.",
            price: 1099,
            mrp: 2199,
            icon: "📱",
            color: "#f39c12",
        },
        {
            id: 12,
            title: "Cloud & DevOps Fundamentals",
            desc: "AWS, Docker, Kubernetes, CI/CD pipelines, and deployment.",
            price: 2199,
            mrp: 4399,
            icon: "☁️",
            color: "#3498db",
        },
    ];

    let cart = [];

    const coursesGrid = document.getElementById("coursesGrid");
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartItemsEl = document.getElementById("cartItems");
    const cartCountEl = document.getElementById("cartCount");
    const cartHeaderCountEl = document.getElementById("cartHeaderCount");
    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const grandTotalEl = document.getElementById("grandTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const toast = document.getElementById("toast");
    const successModal = document.getElementById("successModal");
    const successCloseBtn = document.getElementById("successCloseBtn");

    function formatPrice(amount) {
        return "₹" + amount.toLocaleString("en-IN");
    }

    function renderCourses() {
        let html = "";
        courses.forEach((course) => {
            const inCart = cart.includes(course.id);
            html += `
        <div class="course-card">
            <div class="course-banner" style="background: ${course.color};">
            ${course.icon}
            </div>
            <div class="course-body">
            <div class="course-title">${course.title}</div>
            <div class="course-desc">${course.desc}</div>
            <div class="course-meta">
                <div class="price">${formatPrice(course.price)}<small>${formatPrice(course.mrp)}</small></div>
                <button class="add-to-cart ${inCart ? "added" : ""}" data-id="${course.id}" ${inCart ? "disabled" : ""}>
                ${inCart ? "✓ In Cart" : "＋ Add to Cart"}
                </button>
            </div>
            </div>
        </div>
        `;
        });
        coursesGrid.innerHTML = html;

        document.querySelectorAll(".add-to-cart").forEach((btn) => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.dataset.id, 10);
                addToCart(id);
            });
        });
    }

    function addToCart(courseId) {
        if (cart.includes(courseId)) return;
        cart.push(courseId);
        renderCourses();
        updateCartUI();
        showToast("✅ Course added to cart!");
    }

    function removeFromCart(courseId) {
        cart = cart.filter((id) => id !== courseId);
        renderCourses();
        updateCartUI();
        showToast("🗑️ Course removed.");
    }

    function updateCartUI() {
        const count = cart.length;
        cartCountEl.textContent = count;
        cartHeaderCountEl.textContent = count;

        if (count === 0) {
            cartItemsEl.innerHTML = `
        <div class="cart-empty">
            <span>🛒</span>
            <p>Your cart is empty.<br>Add some courses to get started!</p>
        </div>
        `;
        } else {
            let html = "";
            cart.forEach((id) => {
                const course = courses.find((c) => c.id === id);
                if (!course) return;
                html += `
            <div class="cart-item">
            <div class="cart-item-icon" style="background: ${course.color};">
                ${course.icon}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${course.title}</div>
                <div class="cart-item-price">${formatPrice(course.price)}</div>
            </div>
            <button class="remove-item" data-id="${course.id}" title="Remove">✕</button>
            </div>
        `;
            });
            cartItemsEl.innerHTML = html;

            document.querySelectorAll(".remove-item").forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = parseInt(this.dataset.id, 10);
                    removeFromCart(id);
                });
            });
        }

        const subtotal = cart.reduce((sum, id) => {
            const course = courses.find((c) => c.id === id);
            return sum + (course ? course.price : 0);
        }, 0);
        const discount = Math.round(subtotal * 0.1);
        const grandTotal = subtotal - discount;

        subtotalEl.textContent = formatPrice(subtotal);
        discountEl.textContent = "−" + formatPrice(discount);
        grandTotalEl.textContent = formatPrice(grandTotal);

        checkoutBtn.disabled = count === 0;
    }

    let toastTimer = null;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    function openCart() {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("open");
    }

    function closeCart() {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("open");
    }

    function handleCheckout() {
        if (cart.length === 0) return;
        successModal.classList.add("open");
        closeCart();
    }

    function closeSuccessModal() {
        successModal.classList.remove("open");
        cart = [];
        renderCourses();
        updateCartUI();
        showToast("🎓 Happy learning!");
    }

    openCartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    checkoutBtn.addEventListener("click", handleCheckout);
    successCloseBtn.addEventListener("click", closeSuccessModal);

    successModal.addEventListener("click", function (e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    function init() {
        renderCourses();
        updateCartUI();
    }

    init();
})();
