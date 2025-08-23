// 🎨 Clean Portfolio Script
// ========================

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.addScrollProgress();
    }

    addScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            const progressBarFill = document.querySelector('.scroll-progress-bar');
            if (progressBarFill) {
                progressBarFill.style.width = scrolled + '%';
            }
        });
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    setupMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.hamburger.classList.toggle('active');
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    this.navMenu?.classList.remove('active');
                    this.hamburger?.classList.remove('active');
                }
            });
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

class ContentManager {
    constructor() {
        this.data = this.getStaticData();
        this.init();
    }

    init() {
        this.loadContent();
        this.setupIntersectionObserver();
        this.setupModalHandlers();
    }

    getStaticData() {
        return {
            publications: [
                {
                    id: 1,
                    title: "Finding Myself in the Himalayas",
                    excerpt: "A personal journey through the mountains that changed my perspective on life and creativity.",
                    content: "The morning mist clung to the peaks as I stood at 4,000 meters above sea level, realizing that this journey was more than just a trek—it was a pilgrimage to understanding myself. Each step taught me something new about resilience, beauty, and the power of solitude.\\n\\nThe Himalayas have a way of stripping away everything unnecessary. In the thin air and vast silence, I found clarity that had eluded me for years. The physical challenge of climbing higher each day mirrored the mental journey I was undertaking—learning to push beyond my perceived limitations.\\n\\nOne particular morning, as I watched the sunrise paint Everest in shades of gold and pink, I understood that creativity isn't something you can force. Like the mountains themselves, it emerges naturally when you create the right conditions. The isolation, the physical exertion, the constant presence of something greater than yourself—all of these elements combined to unlock a creative flow I had never experienced before.",
                    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                    date: "2025-01-15",
                    readTime: "8 min read",
                    tags: ["travel", "self-discovery", "mountains"]
                },
                {
                    id: 2,
                    title: "The Art of Slow Travel",
                    excerpt: "Why rushing through destinations means missing the soul of a place.",
                    content: "In a world obsessed with checking off bucket lists, I discovered the profound beauty of staying longer, moving slower, and truly connecting with the places I visit. This revelation came to me during what was supposed to be a three-day stopover in a small Tuscan village that turned into a three-week stay.\\n\\nI had planned to rush through Italy in two weeks—Rome, Florence, Venice, the usual tourist trail. But a delayed train and a missed connection left me stranded in Montepulciano, a hilltop town I'd never heard of. What started as an inconvenience became one of the most transformative travel experiences of my life.\\n\\nWithout the pressure of a tight itinerary, I found myself settling into the rhythm of local life. I discovered the joy of morning espresso at the same café, where after just a few days, the barista began preparing my order before I even reached the counter.",
                    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
                    date: "2025-01-10",
                    readTime: "6 min read",
                    tags: ["travel", "mindfulness", "culture"]
                },
                {
                    id: 3,
                    title: "Creativity in Unexpected Places",
                    excerpt: "How a small village market inspired my greatest design breakthrough.",
                    content: "Sometimes inspiration strikes in the most unexpected places. This is the story of how colors, chaos, and conversations in a local market completely transformed my approach to design. I was struggling with a major client project—a brand identity for a sustainable fashion company—when I found myself wandering through a bustling market in Marrakech.\\n\\nI had been stuck for weeks, cycling through the same safe color palettes and predictable layouts. Everything felt sterile, corporate, disconnected from the passionate story the client wanted to tell. I was starting to doubt my abilities as a designer when I turned a corner and found myself immersed in sensory overload.\\n\\nThe market was a symphony of contradictions—organized chaos, beautiful disorder, structured spontaneity. Vendors called out in Arabic and French, spices filled the air with complex aromas, and everywhere I looked, colors clashed and somehow worked perfectly together.",
                    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400",
                    date: "2025-01-05",
                    readTime: "7 min read",
                    tags: ["creativity", "design", "inspiration"]
                },
                {
                    id: 4,
                    title: "Lessons from the Road",
                    excerpt: "What three years of travel taught me about human connection and empathy.",
                    content: "Travel isn't just about seeing new places—it's about becoming a better version of yourself. Here are the most important lessons I've learned from countless conversations with strangers who became friends, from moments of vulnerability in foreign places, and from the humbling experience of being constantly outside my comfort zone.\\n\\nAfter three years of almost continuous travel, I've collected more than just passport stamps and photographs. I've gathered insights about human nature, empathy, and connection that have fundamentally changed how I see the world and my place in it.\\n\\nThe first lesson came early, during a delayed flight in Istanbul. I was frustrated, tired, and just wanted to get to my destination. An elderly Turkish man sitting next to me noticed my distress and, despite speaking very little English, spent two hours teaching me a card game.",
                    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400",
                    date: "2024-12-28",
                    readTime: "10 min read",
                    tags: ["travel", "human-connection", "empathy"]
                }
            ],
            gallery: [
                {
                    id: 1,
                    title: "Portrait Session",
                    image: "./Photos/body.jpg",
                    category: "design"
                },
                {
                    id: 2,
                    title: "Cover Photo",
                    image: "./Photos/cover-photo1.jpg",
                    category: "design"
                },
                {
                    id: 3,
                    title: "WhatsApp Memories",
                    image: "./Photos/IMG-20250315-WA0187.jpg",
                    category: "travel"
                },
                {
                    id: 4,
                    title: "February 2024",
                    image: "./Photos/IMG20240214191810.jpg",
                    category: "travel"
                },
                {
                    id: 5,
                    title: "April Adventures",
                    image: "./Photos/IMG20240413105020.jpg",
                    category: "travel"
                },
                {
                    id: 6,
                    title: "June Moments",
                    image: "./Photos/IMG20240615181053.jpg",
                    category: "travel"
                },
                {
                    id: 7,
                    title: "August Journey",
                    image: "./Photos/IMG20240803102738.jpg",
                    category: "nature"
                },
                {
                    id: 8,
                    title: "Christmas 2024",
                    image: "./Photos/IMG20241225102533.jpg",
                    category: "travel"
                },
                {
                    id: 9,
                    title: "April 2025",
                    image: "./Photos/IMG20250405161626.jpg",
                    category: "travel"
                },
                {
                    id: 10,
                    title: "May Exploration",
                    image: "./Photos/IMG20250528174918.jpg",
                    category: "nature"
                },
                {
                    id: 11,
                    title: "June Adventures",
                    image: "./Photos/IMG20250621091450.jpg",
                    category: "travel"
                },
                {
                    id: 12,
                    title: "March 2023",
                    image: "./Photos/IMG_20230305_165652.jpg",
                    category: "travel"
                },
                {
                    id: 13,
                    title: "March 2025",
                    image: "./Photos/IMG_20250317_184541.jpg",
                    category: "nature"
                },
                {
                    id: 14,
                    title: "April Morning",
                    image: "./Photos/IMG_20250406_092224.jpg",
                    category: "travel"
                },
                {
                    id: 15,
                    title: "Special Capture",
                    image: "./Photos/IMG_E7138.jpg",
                    category: "travel"
                },
                {
                    id: 16,
                    title: "Main Portrait",
                    image: "./Photos/main image.jpg",
                    category: "design"
                }
            ]
        };
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe animated elements
        setTimeout(() => {
            document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
                observer.observe(el);
            });
        }, 100);
    }

    loadContent() {
        this.renderPublications();
        this.renderGallery();
        this.renderExplore();
    }

    renderPublications() {
        const container = document.getElementById('publications-grid');
        if (!container) return;

        // Create featured publication
        const featuredPub = this.data.publications[0];
        const featuredHtml = `
            <article class="publication-featured fade-in">
                <div class="publication-featured-image">
                    <img src="${featuredPub.image}" alt="${featuredPub.title}" loading="lazy">
                </div>
                <div class="publication-featured-content">
                    <span class="publication-featured-badge">Featured Article</span>
                    <h3 class="publication-featured-title">${featuredPub.title}</h3>
                    <p class="publication-featured-excerpt">${featuredPub.excerpt}</p>
                    <a href="#" class="publication-featured-cta" onclick="contentManager.openPublicationModal(${featuredPub.id})">
                        <span>Read Article</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;

        // Create regular publications
        const regularPubs = this.data.publications.slice(1);
        const regularHtml = regularPubs.map((pub, index) => `
            <article class="publication-item fade-in" style="animation-delay: ${(index + 1) * 0.1}s">
                <div class="publication-image-wrapper">
                    <img src="${pub.image}" alt="${pub.title}" class="publication-image" loading="lazy">
                    <div class="publication-overlay">
                        <div class="publication-tags">
                            ${pub.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="publication-content">
                    <div class="publication-meta">
                        <span class="publication-date">${new Date(pub.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}</span>
                        <span class="publication-read-time">${pub.readTime}</span>
                    </div>
                    <h3 class="publication-title">${pub.title}</h3>
                    <p class="publication-excerpt">${pub.excerpt}</p>
                    <button class="read-more" onclick="contentManager.openPublicationModal(${pub.id})">
                        <span class="read-text">Read Article</span>
                        <i class="fas fa-arrow-right read-icon"></i>
                    </button>
                </div>
            </article>
        `).join('');

        container.innerHTML = featuredHtml + regularHtml;
    }

    renderGallery() {
        const container = document.getElementById('gallery-grid');
        if (!container) return;

        const html = this.data.gallery.map((item, index) => `
            <div class="gallery-item fade-in" 
                 data-category="${item.category}" 
                 style="animation-delay: ${index * 0.05}s"
                 onclick="contentManager.openImageModal('${item.image}', '${item.title}')">
                <div class="gallery-image-wrapper">
                    <img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-overlay-content">
                            <h3 class="gallery-title">${item.title}</h3>
                            <span class="gallery-category">${item.category}</span>
                        </div>
                        <div class="gallery-zoom-icon">
                            <i class="fas fa-search-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        this.setupGalleryFilters();
    }

    renderExplore() {
        const container = document.getElementById('explore-grid');
        if (!container) return;

        container.innerHTML = `
            <!-- Featured Explore Item -->
            <div class="explore-featured fade-in">
                <div class="explore-featured-image">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="Mountain Adventures" loading="lazy">
                </div>
                <div class="explore-featured-content">
                    <span class="explore-featured-badge">Featured Journey</span>
                    <h3 class="explore-featured-title">Mountain Adventures</h3>
                    <p class="explore-featured-description">
                        Epic journeys through the world's most breathtaking peaks and hidden trails. 
                        Discover the stories behind each summit and the breathtaking moments that define true adventure.
                    </p>
                    <div class="explore-stats">
                        <div class="explore-stat">
                            <span class="explore-stat-number">2.3K</span>
                            <span class="explore-stat-label">Photos</span>
                        </div>
                        <div class="explore-stat">
                            <span class="explore-stat-number">15</span>
                            <span class="explore-stat-label">Countries</span>
                        </div>
                        <div class="explore-stat">
                            <span class="explore-stat-number">50+</span>
                            <span class="explore-stat-label">Peaks</span>
                        </div>
                    </div>
                    <a href="#gallery" class="explore-cta">
                        <span>View Gallery</span>
                        <i class="fas fa-images"></i>
                    </a>
                </div>
            </div>

            <!-- Sidebar Cards -->
            <div class="explore-sidebar">
                <div class="explore-card fade-in" style="animation-delay: 0.2s">
                    <div class="explore-card-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <h4 class="explore-card-title">Creative Process</h4>
                    <p class="explore-card-description">
                        The intersection of travel and creativity in my design work.
                    </p>
                    <a href="#publications" class="explore-card-link">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="explore-card fade-in" style="animation-delay: 0.3s">
                    <div class="explore-card-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h4 class="explore-card-title">Cultural Immersion</h4>
                    <p class="explore-card-description">
                        Deep connections with local communities and traditions.
                    </p>
                    <a href="#gallery" class="explore-card-link">
                        <span>Explore Stories</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="explore-card fade-in" style="animation-delay: 0.4s">
                    <div class="explore-card-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                    <h4 class="explore-card-title">Personal Growth</h4>
                    <p class="explore-card-description">
                        How travel shapes perspective and fosters creativity.
                    </p>
                    <a href="#about" class="explore-card-link">
                        <span>My Journey</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }

    setupGalleryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                galleryItems.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Modal handlers with proper close functionality
    setupModalHandlers() {
        // Publication modal handlers
        const publicationModal = document.getElementById('publication-modal');
        const publicationClose = document.getElementById('publication-modal-close');
        const publicationBackdrop = document.querySelector('.publication-modal-backdrop');

        if (publicationClose) {
            publicationClose.addEventListener('click', () => this.closePublicationModal());
        }
        if (publicationBackdrop) {
            publicationBackdrop.addEventListener('click', () => this.closePublicationModal());
        }

        // Image modal handlers
        const imageModal = document.getElementById('image-modal');
        const imageClose = document.querySelector('.image-modal-close');

        if (imageClose) {
            imageClose.addEventListener('click', () => this.closeImageModal());
        }
        if (imageModal) {
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    this.closeImageModal();
                }
            });
        }

        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePublicationModal();
                this.closeImageModal();
            }
        });
    }

    openPublicationModal(id) {
        const publication = this.data.publications.find(pub => pub.id === id);
        if (!publication) return;

        const modal = document.getElementById('publication-modal');
        const modalImg = document.getElementById('publication-modal-img');
        const modalTitle = document.getElementById('publication-modal-title');
        const modalExcerpt = document.getElementById('publication-modal-excerpt');
        const modalContent = document.getElementById('publication-modal-content');
        const modalDate = document.getElementById('publication-modal-date');

        if (modalImg) modalImg.src = publication.image;
        if (modalTitle) modalTitle.textContent = publication.title;
        if (modalExcerpt) modalExcerpt.textContent = publication.excerpt;
        if (modalContent) modalContent.innerHTML = this.formatPublicationContent(publication.content);
        if (modalDate) modalDate.textContent = new Date(publication.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePublicationModal() {
        const modal = document.getElementById('publication-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    formatPublicationContent(content) {
        return content.split('\\n\\n').map(paragraph => 
            `<p>${paragraph.trim()}</p>`
        ).join('');
    }

    openImageModal(imageSrc, title) {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const modalTitle = document.getElementById('image-modal-title');

        if (modal && modalImg && modalTitle) {
            modalImg.src = imageSrc;
            modalTitle.textContent = title;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeImageModal() {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Global sharing functions
function sharePublication(platform) {
    const title = document.getElementById('publication-modal-title')?.textContent || 'Check out this article';
    const excerpt = document.getElementById('publication-modal-excerpt')?.textContent || '';
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'x':
            shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}`;
            break;
        default:
            console.log('Unknown platform:', platform);
            return;
    }
    
    // Open in new window with proper dimensions
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        shareUrl, 
        'shareWindow', 
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
}

function copyPublicationLink() {
    const url = window.location.href;
    const title = document.getElementById('publication-modal-title')?.textContent || 'Check out this article';
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyNotification('Link copied to clipboard!');
        }).catch(err => {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('Link copied to clipboard!');
    } catch (err) {
        showCopyNotification('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// PDF Modal Functions
function openPDFModal(publicationType) {
    const publications = {
        'trading': {
            title: 'How to Start Trading Shares',
            author: 'Poshan Niraula',
            pdf: './Publications/How to Start Trading Shares - Poshan Niraula - Shweta Shardul, Vol 20.pdf'
        },
        'mathematics': {
            title: 'Problems Faced by Mathematics Students in Secondary Level',
            author: 'Poshan Niraula', 
            pdf: './Publications/Problems Faced by Mathematics Students in Secondary Level - Poshan Niraula - Shweta Shardul Vol XVIII.pdf'
        }
    };

    const publication = publications[publicationType];
    if (!publication) return;

    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const modalTitle = document.getElementById('pdf-modal-title');
    const modalAuthor = document.getElementById('pdf-modal-author');
    const downloadBtn = document.getElementById('pdf-download-btn');

    if (modalTitle) modalTitle.textContent = publication.title;
    if (modalAuthor) modalAuthor.textContent = publication.author;
    if (pdfViewer) pdfViewer.src = publication.pdf;
    
    if (downloadBtn) {
        downloadBtn.onclick = function() {
            const link = document.createElement('a');
            link.href = publication.pdf;
            link.download = publication.title + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Clear PDF source to stop loading
    if (pdfViewer) {
        pdfViewer.src = '';
    }
}

function sharePDF(platform) {
    const title = document.getElementById('pdf-modal-title')?.textContent || 'Check out this publication';
    const author = document.getElementById('pdf-modal-author')?.textContent || '';
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' by ' + author)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + ' by ' + author)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent('By ' + author)}`;
            break;
        default:
            console.log('Unknown platform:', platform);
            return;
    }
    
    // Open in new window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        shareUrl, 
        'shareWindow', 
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
}

function copyPDFLink() {
    const url = window.location.href;
    const title = document.getElementById('pdf-modal-title')?.textContent || 'Publication';
    
    navigator.clipboard.writeText(url).then(() => {
        showNotification(`Link to "${title}" copied to clipboard!`);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(`Link to "${title}" copied to clipboard!`);
    });
}

// ESC key handler for PDF modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const pdfModal = document.getElementById('pdf-modal');
        if (pdfModal && pdfModal.classList.contains('active')) {
            closePDFModal();
        }
    }
});

// Initialize everything
let themeManager, navigationManager, contentManager;

document.addEventListener('DOMContentLoaded', function() {
    themeManager = new ThemeManager();
    navigationManager = new NavigationManager();
    contentManager = new ContentManager();
});
