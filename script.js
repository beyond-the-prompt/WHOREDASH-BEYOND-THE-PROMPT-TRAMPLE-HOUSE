
// SPA Navigation Router
class WhoreDashRouter {
    constructor() {
            this.routes = {
            '/': 'home',
            '/whores': 'whores',
            '/weed': 'weed',
            '/booze': 'booze',
            '/toys': 'toys',
            '/cart': 'cart',
            '/tattoos': 'tattoos',
            '/gallery': 'gallery'
        };
this.currentPage = 'home';
        this.cart = JSON.parse(localStorage.getItem('whoredashCart')) || [];
        this.init();
    }
    
    init() {
        // Handle initial load
        this.handleRoute();
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const path = new URL(link.href).pathname;
                history.pushState({}, '', path);
                this.handleRoute();
            }
        });
    }
    
    async handleRoute() {
        const path = window.location.pathname;
        const page = this.routes[path] || 'home';
        
        if (page !== this.currentPage) {
            this.currentPage = page;
            await this.loadPage(page);
            this.updateActiveNav();
        }
    }
    
    async loadPage(page) {
        const main = document.querySelector('main') || document.body.querySelector('.container');
        
        if (!main) return;
        
        // Show loading state
        main.innerHTML = `
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
            </div>
        `;
        
        // Load page content
        switch(page) {
            case 'home':
                await this.loadHomePage(main);
                break;
            case 'whores':
                await this.loadWhoresPage(main);
                break;
            case 'weed':
                await this.loadWeedPage(main);
                break;
            case 'booze':
                await this.loadBoozePage(main);
                break;
            case 'toys':
                await this.loadToysPage(main);
                break;
            case 'cart':
                await this.loadCartPage(main);
                break;
            case 'tattoos':
                await this.loadTattoosPage(main);
                break;
            case 'gallery':
                await this.loadGalleryPage(main);
                break;
        }
// Reinitialize components
        this.initPageComponents();
        feather.replace();
    }
    
    async loadHomePage(container) {
        const response = await fetch('/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            container.innerHTML = mainContent.innerHTML;
        } else {
            container.innerHTML = '<h1 class="text-4xl font-bold text-center py-20">Home Page</h1>';
        }
    }
    async loadWhoresPage(container) {
        const response = await fetch('/whores.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            container.innerHTML = mainContent.innerHTML;
            this.initWhoresPage();
        } else {
            container.innerHTML = '<h1 class="text-4xl font-bold text-center py-20">Whores Page</h1>';
        }
    }

    async loadTattoosPage(container) {
        const response = await fetch('/tattoos.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            container.innerHTML = mainContent.innerHTML;
            this.initTattoosPage();
        } else {
            container.innerHTML = '<h1 class="text-4xl font-bold text-center py-20">Tattoos Page</h1>';
        }
    }

    async loadGalleryPage(container) {
        const response = await fetch('/gallery.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            container.innerHTML = mainContent.innerHTML;
            this.initGalleryPage();
        } else {
            container.innerHTML = '<h1 class="text-4xl font-bold text-center py-20">Gallery Page</h1>';
        }
    }
async loadWeedPage(container) {
        container.innerHTML = `
            <section class="py-12">
                <h1 class="text-4xl font-bold mb-8 text-center text-primary">Devil's Lettuce</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="weed-container">
                    <!-- Weed products will load here -->
                </div>
            </section>
        `;
        this.loadWeedProducts();
    }
    
    async loadBoozePage(container) {
        container.innerHTML = `
            <section class="py-12">
                <h1 class="text-4xl font-bold mb-8 text-center text-primary">Liquid Courage</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="booze-container">
                    <!-- Booze products will load here -->
                </div>
            </section>
        `;
        this.loadBoozeProducts();
    }
    
    async loadToysPage(container) {
        container.innerHTML = `
            <section class="py-12">
                <h1 class="text-4xl font-bold mb-8 text-center text-primary">Fuck Machines</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="toys-container">
                    <!-- Sex toys will load here -->
                </div>
            </section>
        `;
        this.loadToyProducts();
    }
    async loadCartPage(container) {
        container.innerHTML = `
            <section class="py-12">
                <h1 class="text-4xl font-bold mb-8 text-center text-primary">Your Cart</h1>
                <div id="cart-container" class="space-y-4">
                    ${this.cart.length === 0 ? '<p class="text-center text-gray-400">Your cart is empty</p>' : ''}
                </div>
                ${this.cart.length > 0 ? `
                    <div class="mt-8 p-6 bg-gray-800 rounded-xl">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-bold">Order Summary</h3>
                            <span class="text-2xl font-bold text-primary">${this.calculateTotal().toFixed(2)}</span>
                        </div>
                        <button id="checkout-btn" class="w-full bg-secondary hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full">
                            Checkout Now
                        </button>
                    </div>
                ` : ''}
            </section>
        `;
        this.renderCartItems();
    }
updateActiveNav() {
        // Update navbar active state
        const navLinks = document.querySelectorAll('custom-navbar').shadowRoot?.querySelectorAll('a');
        if (navLinks) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === window.location.pathname) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    initPageComponents() {
        // Reattach event listeners
        this.initCartSystem();
        this.initMobileMenu();
        this.initAnimations();
    }
    // Page-specific initialization methods
    initWhoresPage() {
        const whoresContainer = document.getElementById('whores-container');
        if (whoresContainer) {
            this.loadWhores();
        }
    }

    initTattoosPage() {
        // Initialize tattoo page interactions if needed
        console.log('Tattoos page initialized');
    }

    initGalleryPage() {
        // Initialize gallery page interactions if needed
        console.log('Gallery page initialized');
    }
loadWhores() {
        // Mock whore data
        const mockWhores = [
            {
                id: 1,
                name: "Crystal Methany",
                video: "https://huggingface.co/spaces/buddybudboi/sinful-succubus-express-delivery/resolve/main/videos/N983XaMVfyzflBOVJ4jk%20(1).mp4",
                rating: 4.9,
                reviews: 420,
                price: 69,
                services: ["BBBJ", "Anal", "GFE"],
                distance: "24 min",
                description: "I'll suck your dick so good you'll forget your mom's name"
            },
            // Add more whores...
        ];
        
        const container = document.getElementById('whores-container');
        if (container) {
            mockWhores.forEach(whore => {
                const whoreCard = this.createWhoreCard(whore);
                container.appendChild(whoreCard);
            });
        }
    }
    
    createWhoreCard(whore) {
        const div = document.createElement('div');
        div.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-card';
        div.innerHTML = `
            <div class="relative">
                <video autoplay loop muted class="w-full h-64 object-cover">
                    <source src="${whore.video}" type="video/mp4">
                </video>
                <div class="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">${whore.distance} AWAY</div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold">${whore.name}</h3>
                    <div class="flex items-center">
                        <i data-feather="star" class="text-yellow-400 mr-1"></i>
                        <span>${whore.rating} (${whore.reviews})</span>
                    </div>
                </div>
                <p class="text-gray-300 mb-4">"${whore.description}"</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${whore.services.map(service => `<span class="bg-gray-700 px-3 py-1 rounded-full text-sm">${service}</span>`).join('')}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-primary">${whore.price}/hr</span>
                    <button class="bg-secondary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full book-whore-btn" 
                            data-id="${whore.id}" 
                            data-name="${whore.name}" 
                            data-price="${whore.price}">
                        Book This Bitch
                    </button>
                </div>
            </div>
        `;
        return div;
    }
    
    // Cart system
    initCartSystem() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-add-to-cart]')) {
                const button = e.target.closest('[data-add-to-cart]');
                const item = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image,
                    category: button.dataset.category
                };
                this.addToCart(item);
            }
            
            if (e.target.closest('.book-whore-btn')) {
                const button = e.target.closest('.book-whore-btn');
                const whore = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price)
                };
                this.addToCart(whore);
            }
            
            if (e.target.id === 'checkout-btn') {
                this.handleCheckout();
            }
        });
        
        // Update cart badge
        this.updateCartBadge();
    }
    
    addToCart(item) {
        this.cart.push(item);
        localStorage.setItem('whoredashCart', JSON.stringify(this.cart));
        this.updateCartBadge();
        this.showNotification(`${item.name} added to cart!`, 'success');
        
        // Dispatch event for cart button update
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
    
    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = this.cart.length;
        });
    }
    
    renderCartItems() {
        const container = document.getElementById('cart-container');
        if (!container) return;
        
        container.innerHTML = this.cart.map((item, index) => `
            <div class="flex items-center bg-gray-800 p-4 rounded-lg">
                <img src="${item.image || 'http://static.photos/people/100x100/' + (index + 1)}" 
                     alt="${item.name}" 
                     class="w-20 h-20 object-cover rounded-lg mr-4">
                <div class="flex-1">
                    <h4 class="font-bold">${item.name}</h4>
                    <p class="text-gray-400">${item.category || 'Service'}</p>
                </div>
                <span class="text-lg font-bold text-primary mr-4">${item.price}</span>
                <button class="text-red-400 hover:text-red-300 remove-cart-item" data-index="${index}">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        `).join('');
        
        // Add remove functionality
        container.querySelectorAll('.remove-cart-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.remove-cart-item').dataset.index);
                this.removeFromCart(index);
            });
        });
        
        feather.replace();
    }
    
    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('whoredashCart', JSON.stringify(this.cart));
        this.updateCartBadge();
        this.loadCartPage(document.querySelector('main') || document.body.querySelector('.container'));
        this.showNotification('Item removed from cart', 'warning');
    }
    
    calculateTotal() {
        return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
    
    handleCheckout() {
        this.showNotification('Proceeding to checkout...', 'success');
        setTimeout(() => {
            alert(`Checkout complete! Total: ${this.calculateTotal().toFixed(2)}\nThanks for your depraved order!`);
            this.cart = [];
            localStorage.removeItem('whoredashCart');
            this.updateCartBadge();
            this.loadCartPage(document.querySelector('main') || document.body.querySelector('.container'));
        }, 1000);
    }
    
    // Mobile menu
    initMobileMenu() {
        const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Close mobile menu when clicking a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }
    
    // Animations
    initAnimations() {
        this.animateOnScroll();
        window.addEventListener('scroll', () => this.animateOnScroll());
    }
    
    animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }
    
    // Notification system
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center animate-fade-in ${
            type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
        }`;
        
        notification.innerHTML = `
            <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="mr-2"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        feather.replace();
        
        setTimeout(() => {
            notification.classList.add('animate-fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    // Product loading methods
    async loadWeedProducts() {
        // Mock weed products
        const weedProducts = [
            { id: 1, name: "OG Fuck Kush", price: 50, image: "uploads/weed/ogkush.jpg", description: "Will get you higher than your ex's standards" },
            { id: 2, name: "Sour D-Cups", price: 60, image: "uploads/weed/sourdiesel.jpg", description: "So strong you'll forget you paid for sex" },
            { id: 3, name: "Gelato My Ass", price: 70, image: "uploads/weed/gelato.jpg", description: "Tastes better than a hooker's ass" },
            { id: 4, name: "Purple Haze", price: 55, image: "uploads/weed/purplehaze.jpg", description: "Trippy strain for when you want to see sounds" },
            { id: 5, name: "Wedding Cake", price: 75, image: "uploads/weed/weddingcake.jpg", description: "So good you'll want to marry it" },
            { id: 6, name: "Blue Dream", price: 65, image: "uploads/weed/bluedream.jpg", description: "Smooth high for smooth operators" },
        ];
        
        const container = document.getElementById('weed-container');
if (container) {
            container.innerHTML = weedProducts.map(product => `
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-card">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-300 mb-4">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-primary">${product.price}/eighth</span>
                            <button class="bg-secondary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" 
                                    data-add-to-cart 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}" 
                                    data-category="Weed">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    async loadBoozeProducts() {
        const boozeProducts = [
            { id: 4, name: "Jack Daniels", price: 30, image: "http://static.photos/food/320x240/1", description: "Whiskey for when you need liquid courage" },
            { id: 5, name: "Grey Goose", price: 50, image: "http://static.photos/food/320x240/2", description: "Vodka for when you want to forget everything" },
            { id: 6, name: "Patron", price: 70, image: "http://static.photos/food/320x240/3", description: "Tequila for when you want to make bad decisions" },
        ];
const container = document.getElementById('booze-container');
        if (container) {
            container.innerHTML = boozeProducts.map(product => `
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-card">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-300 mb-4">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-primary">${product.price}/bottle</span>
                            <button class="bg-secondary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" 
                                    data-add-to-cart 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}" 
                                    data-category="Booze">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    async loadToyProducts() {
        const toyProducts = [
            { id: 7, name: "Fleshlight 9000", price: 80, image: "http://static.photos/technology/320x240/1", description: "Better than the real thing (allegedly)" },
            { id: 8, name: "Anal Beads XL", price: 40, image: "http://static.photos/technology/320x240/2", description: "For when you want to explore new depths" },
            { id: 9, name: "Vibrator Deluxe", price: 60, image: "http://static.photos/technology/320x240/3", description: "Guaranteed orgasms or your money back" },
        ];
        
        const container = document.getElementById('toys-container');
        if (container) {
            container.innerHTML = toyProducts.map(product => `
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-card">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-300 mb-4">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-primary">${product.price}</span>
                            <button class="bg-secondary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" 
                                    data-add-to-cart 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.image}" 
                                    data-category="Toys">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.WhoreDashApp = new WhoreDashRouter();
    
    // Initialize feather icons
    feather.replace();
    
    // Initialize animations
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
    });
    
    // Initialize dark mode
    if (localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('custom-navbar')?.shadowRoot?.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Global event for cart updates
window.addEventListener('cartUpdated', () => {
    if (window.WhoreDashApp) {
        window.WhoreDashApp.updateCartBadge();
    }
});
