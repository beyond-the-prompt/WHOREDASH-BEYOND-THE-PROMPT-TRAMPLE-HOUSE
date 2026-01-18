// Age Verification, Back to Top, Recently Viewed - Quick Features

// Age Verification System
(function() {
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (!ageVerified) {
        // Create age gate
        const ageGate = document.createElement('div');
        ageGate.id = 'age-gate';
        ageGate.className = 'fixed inset-0 bg-black/95 backdrop-blur-sm z-[10001] flex items-center justify-center';
        ageGate.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-2xl max-w-md border-2 border-primary shadow-2xl animate-fade-in">
                <div class="text-center mb-6">
                    <div class="text-6xl mb-4">🔞</div>
                    <h2 class="text-3xl font-bold mb-2 text-primary">Age Verification</h2>
                    <p class="text-gray-300">You must be 18+ to enter</p>
                </div>
                <div class="flex gap-4">
                    <button onclick="window.verifyAge(true)" class="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105">
                        I'm 18+ ✓
                    </button>
                    <button onclick="window.verifyAge(false)" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all">
                        Under 18
                    </button>
                </div>
                <p class="text-xs text-gray-500 text-center mt-4">By entering, you confirm legal age</p>
            </div>
        `;
        document.body.appendChild(ageGate);
        document.body.style.overflow = 'hidden';
    }
})();

// Age verification function
window.verifyAge = function(isOldEnough) {
    if (isOldEnough) {
        localStorage.setItem('ageVerified', 'true');
        const gate = document.getElementById('age-gate');
        if (gate) {
            gate.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                gate.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    } else {
        window.location.href = 'https://www.google.com';
    }
};

// Back to Top Button
(function() {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-2xl z-[9999] transition-all transform hover:scale-110';
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
    backToTop.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(backToTop);
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

// Recently Viewed Products
window.addToRecentlyViewed = function(product) {
    let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Remove if already exists
    recent = recent.filter(p => p.id !== product.id);
    
    // Add to beginning
    recent.unshift(product);
    
    // Keep only last 10
    if (recent.length > 10) recent = recent.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
};

window.getRecentlyViewed = function() {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
};

// Auto-track product views (call this on product pages)
window.trackProductView = function() {
    const productCard = document.querySelector('.bg-gray-800 h3');
    if (productCard) {
        const name = productCard.textContent.trim();
        const priceEl = document.querySelector('.text-primary');
        const price = priceEl ? priceEl.textContent.replace(/[^0-9]/g, '') : '0';
        const image = document.querySelector('img, video');
        const imageSrc = image ? (image.src || image.querySelector('source')?.src || '') : '';
        
        window.addToRecentlyViewed({
            id: Date.now(),
            name: name,
            price: price,
            image: imageSrc,
            timestamp: new Date().toISOString()
        });
    }
};

// Add CSS for animations
if (!document.getElementById('quick-features-css')) {
    const style = document.createElement('style');
    style.id = 'quick-features-css';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.3s ease;
        }
        
        #back-to-top:hover {
            box-shadow: 0 10px 30px rgba(192, 38, 211, 0.5);
        }
        
        #age-gate {
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);
}

// Show recently viewed on home page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function() {
        const recent = window.getRecentlyViewed();
        if (recent.length > 0) {
            setTimeout(() => {
                const main = document.querySelector('main');
                if (main && !document.getElementById('recently-viewed')) {
                    const section = document.createElement('section');
                    section.id = 'recently-viewed';
                    section.className = 'mb-16';
                    section.innerHTML = `
                        <h2 class="text-3xl font-bold mb-6">Recently Viewed</h2>
                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            ${recent.slice(0, 5).map(item => `
                                <div class="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                                    ${item.image ? `<img src="${item.image}" class="w-full h-32 object-cover">` : 
                                    `<div class="w-full h-32 bg-gradient-to-br from-primary to-secondary"></div>`}
                                    <div class="p-3">
                                        <h3 class="font-bold text-sm mb-1 truncate">${item.name}</h3>
                                        <p class="text-primary font-bold">$${item.price}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    
                    // Insert before testimonials
                    const testimonials = document.querySelector('main section:last-of-type');
                    if (testimonials) {
                        testimonials.parentNode.insertBefore(section, testimonials);
                    } else {
                        main.appendChild(section);
                    }
                }
            }, 1000);
        }
    });
}

console.log('✓ Quick Features Loaded: Age Gate, Back to Top, Recently Viewed');
