class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: sticky;
                    top: 0;
                    z-index: 999;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                /* Top promotional banner */
                .promo-banner {
                    background: linear-gradient(90deg, #6b21a8 0%, #c026d3 25%, #ec4899 50%, #c026d3 75%, #6b21a8 100%);
                    background-size: 200% 100%;
                    animation: bannerGradient 5s linear infinite;
                    padding: 12px 0;
                    text-align: center;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                @keyframes bannerGradient {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 200% 0%; }
                }
                
                /* Main navbar */
                nav {
                    background: rgba(17, 24, 39, 0.95);
                    backdrop-filter: blur(16px);
                    border-bottom: 2px solid rgba(192, 38, 211, 0.3);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 20px rgba(107, 33, 168, 0.2);
                }
                
                nav.scrolled {
                    background: rgba(17, 24, 39, 0.98);
                    backdrop-filter: blur(20px);
                    box-shadow: 0 8px 32px rgba(107, 33, 168, 0.4);
                    border-bottom-color: rgba(192, 38, 211, 0.5);
                }
                
                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                
                /* Logo section */
                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    text-decoration: none;
                    position: relative;
                }
                
                .logo-icon {
                    width: 48px;
                    height: 48px;
                    position: relative;
                    animation: logoFloat 3s ease-in-out infinite;
                }
                
                @keyframes logoFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-5px) rotate(5deg); }
                }
                
                .logo-circle {
                    fill: none;
                    stroke: url(#logoGradient);
                    stroke-width: 3;
                    filter: drop-shadow(0 0 10px rgba(192, 38, 211, 0.8));
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .logo-text {
                    font-size: 28px;
                    font-weight: 900;
                    letter-spacing: 2px;
                    background: linear-gradient(135deg, #6b21a8 0%, #c026d3 50%, #ec4899 100%);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: gradientShift 4s ease infinite;
                    filter: drop-shadow(0 0 20px rgba(192, 38, 211, 0.5));
                    font-family: 'Arial Black', sans-serif;
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                /* Desktop navigation */
                .desktop-nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }
                
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                    list-style: none;
                }
                
                .nav-link {
                    color: #e5e7eb;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 15px;
                    letter-spacing: 0.5px;
                    position: relative;
                    padding: 8px 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-transform: uppercase;
                }
                
                .nav-link::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #c026d3, #ec4899);
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 2px;
                }
                
                .nav-link:hover {
                    color: #ec4899;
                    transform: translateY(-2px);
                }
                
                .nav-link:hover::before {
                    width: 100%;
                }
                
                /* Cart icon */
                .cart-wrapper {
                    position: relative;
                    color: #e5e7eb;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .cart-wrapper:hover {
                    color: #ec4899;
                    transform: scale(1.1);
                }
                
                .cart-icon {
                    width: 24px;
                    height: 24px;
                }
                
                .cart-badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: linear-gradient(135deg, #ec4899, #c026d3);
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 10px;
                    min-width: 18px;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(236, 72, 153, 0.6);
                    animation: badgePop 0.3s ease;
                }
                
                @keyframes badgePop {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                /* Login button */
                .login-btn {
                    background: linear-gradient(135deg, #6b21a8, #c026d3, #ec4899);
                    background-size: 200% 200%;
                    color: white;
                    font-weight: 700;
                    padding: 10px 24px;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(192, 38, 211, 0.4);
                    letter-spacing: 0.5px;
                    border: 2px solid transparent;
                    animation: buttonGradient 3s ease infinite;
                }
                
                @keyframes buttonGradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .login-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(192, 38, 211, 0.6);
                    border-color: rgba(236, 72, 153, 0.5);
                }
                
                /* Mobile menu */
                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 8px;
                    transition: all 0.3s ease;
                }
                
                .mobile-toggle:hover {
                    transform: rotate(90deg);
                    color: #ec4899;
                }
                
                .hamburger {
                    width: 24px;
                    height: 24px;
                }
                
                .mobile-nav {
                    display: none;
                    background: rgba(17, 24, 39, 0.98);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(192, 38, 211, 0.3);
                    padding: 1rem 0;
                }
                
                .mobile-nav.active {
                    display: block;
                    animation: slideDown 0.3s ease;
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .mobile-nav a {
                    display: block;
                    color: #e5e7eb;
                    text-decoration: none;
                    padding: 0.75rem 0;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    padding-left: 1rem;
                }
                
                .mobile-nav a:hover {
                    color: #ec4899;
                    border-left-color: #ec4899;
                    padding-left: 1.5rem;
                }
                
                .mobile-login {
                    margin-top: 1rem;
                    padding-left: 0 !important;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none;
                    }
                    
                    .mobile-toggle {
                        display: block;
                    }
                    
                    .logo-text {
                        font-size: 20px;
                    }
                    
                    .logo-icon {
                        width: 36px;
                        height: 36px;
                    }
                }
            </style>
            
            <!-- Promotional Banner -->
            <div class="promo-banner">
                🔥 FREE DELIVERY OVER $100 • 24/7 AVAILABLE • 100% DISCREET 🔥
            </div>
            
            <!-- Main Navigation -->
            <nav>
                <div class="container">
                    <div class="nav-content">
                        <!-- Logo -->
                        <a href="index.html" class="logo-section">
                            <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#6b21a8;stop-opacity:1" />
                                        <stop offset="50%" style="stop-color:#c026d3;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="45" class="logo-circle"/>
                                <path d="M 30 50 L 45 65 L 70 35" stroke="url(#logoGradient)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="drop-shadow(0 0 5px rgba(192, 38, 211, 0.8))"/>
                            </svg>
                            <span class="logo-text">WHORE-DASH™</span>
                        </a>
                        
                        <!-- Desktop Navigation -->
                        <div class="desktop-nav">
                            <ul class="nav-links">
                                <li><a href="index.html" class="nav-link">Home</a></li>
                                <li><a href="whores.html" class="nav-link">Whores</a></li>
                                <li><a href="weed.html" class="nav-link">Weed</a></li>
                                <li><a href="booze.html" class="nav-link">Alcohol</a></li>
                                <li><a href="toys.html" class="nav-link">Toys</a></li>
                                <li><a href="tattoos.html" class="nav-link">Tattoos</a></li>
                                <li><a href="gallery.html" class="nav-link">Gallery</a></li>
                            </ul>
                            <a href="cart.html" class="cart-wrapper">
                                <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <span class="cart-badge">0</span>
                            </a>
                            <a href="login.html" class="login-btn">LOGIN</a>
                        </div>
                        
                        <!-- Mobile Toggle -->
                        <button class="mobile-toggle" id="mobileToggle">
                            <svg class="hamburger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Mobile Navigation -->
                    <div class="mobile-nav" id="mobileNav">
                        <div class="container">
                            <a href="index.html">Home</a>
                            <a href="whores.html">Whores</a>
                            <a href="weed.html">Weed</a>
                            <a href="booze.html">Alcohol</a>
                            <a href="toys.html">Toys</a>
                            <a href="tattoos.html">Tattoos</a>
                            <a href="gallery.html">Gallery</a>
                            <a href="cart.html">Cart</a>
                            <a href="login.html" class="login-btn mobile-login">LOGIN</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        this.setupScrollEffect();
        this.setupMobileMenu();
    }
    
    setupScrollEffect() {
        const nav = this.shadowRoot.querySelector('nav');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupMobileMenu() {
        const toggle = this.shadowRoot.getElementById('mobileToggle');
        const menu = this.shadowRoot.getElementById('mobileNav');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                });
            });
        }
    }
}

customElements.define('custom-navbar', CustomNavbar);
