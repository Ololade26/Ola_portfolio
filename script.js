// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if href is just '#' (used for modal triggers)
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download portfolio button functionality
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show download options modal
        const options = [
            {
                title: 'Download as ZIP from GitHub',
                url: 'https://github.com/Ololade26/Ola_portfolio/archive/refs/heads/main.zip',
                description: 'Download the entire portfolio as a ZIP file'
            },
            {
                title: 'Clone with Git',
                command: 'git clone https://github.com/Ololade26/Ola_portfolio.git',
                description: 'Clone the repository using Git'
            },
            {
                title: 'View on GitHub',
                url: 'https://github.com/Ololade26/Ola_portfolio',
                description: 'Visit the GitHub repository'
            }
        ];

        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        let html = '<h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Download Portfolio</h2>';
        
        options.forEach(option => {
            html += `
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 5px;">
                    <h3 style="margin-bottom: 0.5rem; color: #2c3e50;">${option.title}</h3>
                    <p style="margin-bottom: 0.5rem; color: #666;">${option.description}</p>
            `;
            
            if (option.url) {
                html += `<a href="${option.url}" target="_blank" style="display: inline-block; padding: 0.5rem 1rem; background: #3498db; color: white; text-decoration: none; border-radius: 5px; margin-top: 0.5rem;">Download</a>`;
            } else if (option.command) {
                html += `
                    <code style="display: block; padding: 0.5rem; background: #2c3e50; color: #2ecc71; border-radius: 3px; margin-top: 0.5rem; font-family: monospace; overflow-x: auto;">${option.command}</code>
                    <button class="copy-btn" data-command="${option.command}" style="padding: 0.5rem 1rem; background: #2ecc71; color: white; border: none; border-radius: 5px; margin-top: 0.5rem; cursor: pointer;">Copy Command</button>
                `;
            }
            
            html += '</div>';
        });

        html += `
            <button id="closeModal" style="width: 100%; padding: 1rem; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: bold;">Close</button>
        `;

        modalContent.innerHTML = html;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Add event listeners for copy buttons
        const copyButtons = modalContent.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const command = this.getAttribute('data-command');
                navigator.clipboard.writeText(command).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            });
        });

        // Close modal functionality
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.id === 'closeModal') {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }
        });
    });
}

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#3498db';
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
