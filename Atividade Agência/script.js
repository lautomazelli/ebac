
class Carousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.track = carouselElement.querySelector('.carousel-track');
        this.prevBtn = carouselElement.querySelector('.carousel-btn-prev');
        this.nextBtn = carouselElement.querySelector('.carousel-btn-next');
        this.currentIndex = 0;
        this.items = Array.from(this.track.children);
        this.itemsPerView = this.getItemsPerView();
        
        this.init();
    }
    
    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }
    
    init() {
        this.updateCarousel();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.updateCarousel();
        });
    }
    
    updateCarousel() {
        if (this.items.length === 0) return;
        
        const itemWidth = this.items[0].offsetWidth;
        const gap = 24;
        const offset = this.currentIndex * (itemWidth + gap);
        this.track.style.transform = `translateX(-${offset}px)`;
        
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
            this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
        }
    }
    
    next() {
        const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
}


class MobileMenu {
    constructor() {
        this.header = document.querySelector('.cabecalho-site');
        this.menuItens = document.querySelector('.menu-itens');
        this.botaoContato = document.querySelector('.cabecalho-botao');
        this.hamburgerBtn = null;
        this.overlay = null;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.createHamburgerButton();
        this.createOverlay();
        
        this.hamburgerBtn.addEventListener('click', () => this.toggleMenu());
        this.overlay.addEventListener('click', () => this.closeMenu());
        
        const links = this.menuItens.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
    createHamburgerButton() {
        this.hamburgerBtn = document.createElement('button');
        this.hamburgerBtn.className = 'hamburger-menu';
        this.hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        this.hamburgerBtn.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        const cabecalhoMenu = document.querySelector('.cabecalho-menu');
        cabecalhoMenu.insertBefore(this.hamburgerBtn, cabecalhoMenu.firstChild);
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'menu-overlay';
        document.body.appendChild(this.overlay);
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.hamburgerBtn.classList.add('active');
        this.menuItens.classList.add('active');
        this.overlay.classList.add('active');
        
        if (this.botaoContato) {
            this.botaoContato.style.display = 'none';
        }
        
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.isOpen = false;
        this.hamburgerBtn.classList.remove('active');
        this.menuItens.classList.remove('active');
        this.overlay.classList.remove('active');
        
        if (this.botaoContato) {
            this.botaoContato.style.display = '';
        }
        
        document.body.style.overflow = '';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        new Carousel(carousel);
    });
    
    if (document.querySelector('.cabecalho-site')) {
        new MobileMenu();
    }
});