document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupScrollBehavior();
    setupMessageInteractions();
    setupTableInteractions();
}

function setupScrollBehavior() {
    const messages = document.querySelectorAll('.message-wrapper');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        message.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(message);
    });
}

function setupMessageInteractions() {
    const bubbles = document.querySelectorAll('.message-bubble');
    
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            if (this.classList.contains('manus')) {
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            }
        });

        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('manus')) {
                this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    });
}

function setupTableInteractions() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('mouseover', function() {
                this.style.opacity = '0.8';
            });

            row.addEventListener('mouseout', function() {
                this.style.opacity = '1';
            });
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    .message-bubble {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .data-table tbody tr {
        transition: opacity 0.2s ease-out;
    }

    @media (max-width: 768px) {
        .message-bubble {
            transition: all 0.2s ease-out;
        }
    }
`;
document.head.appendChild(style);

console.log('✓ Equilíbrio Perfeito - Chat inicializado com sucesso');
