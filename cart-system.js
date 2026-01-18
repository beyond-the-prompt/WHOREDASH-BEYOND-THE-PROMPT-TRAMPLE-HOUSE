// WhoreDash Cart Management System
class WhoreDashCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('whoredashCart')) || [];
        this.init();
    }
    
    init() {
        // Update badge on load
        this.updateBadge();
        
        // Setup event listeners
        this.setupButtonHandlers();
        
        // Listen for storage changes (multi-tab support)
        window.addEventListener('storage', (e) => {
            if (e.key === 'whoredashCart') {
                this.cart = JSON.parse(e.newValue) || [];
                this.updateBadge();
            }
        });
    }
    
    setupButtonHandlers() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachHandlers());
        } else {
            this.attachHandlers();
        }
    }
    
    attachHandlers() {
        // Use setTimeout to ensure all dynamic content is loaded
        setTimeout(() => {
            const buttons = document.querySelectorAll('button[data-book-whore], button[data-add-to-cart], button');
            
            buttons.forEach(button => {
                const text = button.textContent.trim();
                
                // Check if it's a cart-related button
                if (text.includes('Book') || text.includes('Add to Cart') || 
                    button.hasAttribute('data-book-whore') || button.hasAttribute('data-add-to-cart')) {
                    
                    // Remove any existing listeners
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    
                    // Add new listener
                    newButton.addEventListener('click', (e) => this.handleAddToCart(e));
                    
                    // Ensure button is clickable
                    newButton.style.position = 'relative';
                    newButton.style.zIndex = '100';
                    newButton.style.cursor = 'pointer';
                    newButton.style.pointerEvents = 'auto';
                }
            });
        }, 500);
    }
    
    handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.currentTarget;
        const card = button.closest('.bg-gray-800') || button.closest('[class*="card"]') || button.closest('div[class*="rounded"]');
        
        if (!card) {
            console.warn('Could not find parent card');
            return;
        }
        
        // Extract item details
        let item = {};
        
        // Check for data attributes first
        if (button.dataset.name) {
            item = {
                id: button.dataset.id || Date.now(),
                name: button.dataset.name,
                price: button.dataset.price || '0',
                image: button.dataset.image || '',
                services: button.dataset.services ? button.dataset.services.split(',') : [],
                type: button.dataset.type || 'product'
            };
        } else {
            // Extract from card elements
            const nameEl = card.querySelector('h3') || card.querySelector('[class*="font-bold"]');
            const priceEl = card.querySelector('.text-primary') || card.querySelector('[class*="price"]');
            const imageEl = card.querySelector('img') || card.querySelector('video');
            
            if (!nameEl || !priceEl) {
                console.warn('Could not find item details');
                return;
            }
            
            const name = nameEl.textContent.trim();
            const priceText = priceEl.textContent;
            const price = priceText.replace(/[^0-9]/g, '');
            const imageSrc = imageEl ? (imageEl.src || imageEl.querySelector('source')?.src || '') : '';
            
            // Determine item type
            let type = 'product';
            const buttonText = button.textContent.trim();
            if (buttonText.includes('Book This Bitch')) type = 'escort';
            else if (buttonText.includes('Book Session')) type = 'tattoo';
            else if (buttonText.includes('Add to Cart')) type = 'product';
            
            item = {
                id: Date.now(),
                name: name,
                price: price,
                image: imageSrc,
                type: type
            };
        }
        
        // Add to cart
        this.addItem(item);
    }
    
    addItem(item) {
        this.cart.push(item);
        this.saveCart();
        this.updateBadge();
        this.showNotification(`✓ ${item.name} added to cart!`);
        
        // Animate button
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent.trim().includes('Book') || btn.textContent.trim().includes('Add')) {
                btn.classList.add('scale-animation');
                setTimeout(() => btn.classList.remove('scale-animation'), 300);
            }
        });
    }
    
    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateBadge();
    }
    
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateBadge();
    }
    
    saveCart() {
        localStorage.setItem('whoredashCart', JSON.stringify(this.cart));
    }
    
    updateBadge() {
        const count = this.cart.length;
        
        // Update all cart badges in the document
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = count;
            if (count > 0) {
                badge.style.display = 'block';
            }
        });
        
        // Update badges in shadow DOM (navbar)
        const navbars = document.querySelectorAll('custom-navbar');
        navbars.forEach(navbar => {
            if (navbar.shadowRoot) {
                const shadowBadges = navbar.shadowRoot.querySelectorAll('.cart-badge');
                shadowBadges.forEach(badge => {
                    badge.textContent = count;
                    if (count > 0) {
                        badge.style.display = 'block';
                    }
                });
            }
        });
    }
    
    showNotification(message) {
        // Remove any existing notifications
        const existing = document.querySelectorAll('.cart-notification');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification fixed top-24 right-4 bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-lg shadow-2xl z-[10000]';
        notification.style.animation = 'slideInRight 0.3s ease';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
    
    getCart() {
        return this.cart;
    }
    
    getTotal() {
        return this.cart.reduce((total, item) => total + parseInt(item.price || 0), 0);
    }
}

// Initialize cart globally
window.whoreDashCart = new WhoreDashCart();

// Add CSS animations
if (!document.getElementById('cart-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-styles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        
        .scale-animation {
            animation: scaleButton 0.3s ease;
        }
        
        @keyframes scaleButton {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.95); }
        }
        
        button {
            position: relative;
            z-index: 100;
            cursor: pointer !important;
            pointer-events: auto !important;
        }
        
        .cart-notification {
            font-weight: 600;
            letter-spacing: 0.5px;
        }
    `;
    document.head.appendChild(style);
}
