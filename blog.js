// Blog Page Functionality
class BlogManager {
    constructor() {
        this.articles = document.querySelectorAll('.blog-card');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        this.currentFilter = 'all';
        this.articlesPerPage = 6;
        this.currentPage = 1;
        
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupLoadMore();
        this.setupArticleInteractions();
        this.setupNewsletterForm();
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const category = button.dataset.category;
                this.currentFilter = category;
                this.currentPage = 1;
                
                // Filter articles
                this.filterArticles(category);
            });
        });
    }

    filterArticles(category) {
        this.articles.forEach((article, index) => {
            const articleCategory = article.dataset.category;
            const shouldShow = category === 'all' || articleCategory === category;
            
            if (shouldShow) {
                article.style.display = 'block';
                article.style.animation = 'fadeInUp 0.5s ease forwards';
                article.style.animationDelay = `${index * 0.1}s`;
            } else {
                article.style.display = 'none';
            }
        });

        // Update load more button visibility
        this.updateLoadMoreButton();
    }

    setupLoadMore() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMoreArticles();
            });
        }
    }

    loadMoreArticles() {
        // Simulate loading more articles
        const button = this.loadMoreBtn;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;

        setTimeout(() => {
            // In a real application, you would fetch more articles from an API
            this.showNotification('All articles loaded!', 'info');
            
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.display = 'none'; // Hide button after loading all
        }, 1500);
    }

    updateLoadMoreButton() {
        const visibleArticles = Array.from(this.articles).filter(article => 
            article.style.display !== 'none'
        );
        
        if (visibleArticles.length <= this.articlesPerPage) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
        }
    }

    setupArticleInteractions() {
        this.articles.forEach(article => {
            // Add click handler to read full article
            article.addEventListener('click', () => {
                this.openArticle(article);
            });

            // Add hover effects
            article.addEventListener('mouseenter', () => {
                article.style.transform = 'translateY(-5px)';
            });

            article.addEventListener('mouseleave', () => {
                article.style.transform = 'translateY(0)';
            });
        });

        // Featured article read more button
        const readMoreBtn = document.querySelector('.read-more-btn');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                this.openFeaturedArticle();
            });
        }
    }

    openArticle(articleElement) {
        const title = articleElement.querySelector('h3').textContent;
        const category = articleElement.querySelector('.blog-category').textContent;
        
        // In a real application, this would navigate to the full article page
        this.showNotification(`Opening article: "${title}"`, 'info');
        
        // Simulate article opening with a modal or navigation
        console.log(`Opening article: ${title} in category: ${category}`);
    }

    openFeaturedArticle() {
        this.showNotification('Opening featured article...', 'info');
        console.log('Opening featured article');
    }

    setupNewsletterForm() {
        const form = document.querySelector('.blog-newsletter .newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(form);
            });
        }
    }

    async handleNewsletterSubscription(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        button.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.background = '#10b981';
            
            this.showNotification('🎉 Successfully subscribed to our newsletter!', 'success');
            
            // Reset form
            form.querySelector('input[type="email"]').value = '';
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
            
        } catch (error) {
            // Show error state
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            button.style.background = '#ef4444';
            
            this.showNotification('Something went wrong. Please try again.', 'error');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }
    }

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.blog-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `blog-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;

        const styles = `
            .blog-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 2000;
                max-width: 400px;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease;
            }
            
            .blog-notification.success {
                background: #10b981;
                color: white;
            }
            
            .blog-notification.error {
                background: #ef4444;
                color: white;
            }
            
            .blog-notification.info {
                background: var(--primary-color);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.5rem;
                gap: 1rem;
            }
            
            .close-notification {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
            }
            
            .close-notification:hover {
                opacity: 1;
            }
        `;

        if (!document.querySelector('#blog-notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'blog-notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Close functionality
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});