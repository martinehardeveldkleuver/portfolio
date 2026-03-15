// Populate Profile Data
function loadProfile() {
    const emailBtn = document.getElementById('contact-email');
    if (emailBtn) emailBtn.href = `mailto:${data.profile.email}`;
}

// Populate Experience
// Populate Experience
function loadExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    data.experience.forEach(job => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');

        if (job.voluntary) {
            item.classList.add('timeline-item--voluntary');
        }

        let logoHtml = '';
        if (job.logo) {
            const extraClass = job.logoClass ? job.logoClass : '';
            logoHtml = `<img src="${job.logo}" alt="${job.company} Logo" class="experience-company-logo ${extraClass}">`;
        }

        const voluntaryBadge = job.voluntary
            ? `<span class="voluntary-badge">VOLUNTARY WORK</span>`
            : '';

        const summary = job.shortSummary || job.description;
        const pointsHtml = job.points && job.points.length > 0 
            ? `<ul class="timeline-points">${job.points.map(p => `<li>${p}</li>`).join('')}</ul>` 
            : '';

        item.innerHTML = `
            <div class="timeline-year">
                <span class="date-start">${job.startDate}</span>
                <span class="date-separator">to</span>
                <span class="date-end">${job.endDate}</span>
            </div>
            <div class="timeline-content">
                ${voluntaryBadge}
                <div class="timeline-company-row">
                    <h4 class="timeline-company">${job.company}</h4>
                    ${logoHtml}
                </div>
                <h3 class="timeline-role">${job.role}</h3>
                <div class="timeline-desc">${summary}</div>
                ${pointsHtml}
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Populate Projects
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    data.featuredProjects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        // Add image if available
        let imageHtml = '';
        if (project.image) {
            imageHtml = `<div class="project-image"><img src="${project.image}" alt="${project.title}"></div>`;
            card.querySelector('.project-tech')?.style.setProperty('margin-top', '1rem'); // Reset margin if image present

            // Make whole card clickable if link exists
            if (project.link && project.link !== "#") {
                card.style.cursor = "pointer";
                card.onclick = () => window.open(project.link, '_blank');
            }
        }

        const pointsHtml = project.points.map(p => `<li>${p}</li>`).join('');
        const techHtml = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        card.innerHTML = `
            ${imageHtml}
            <div class="project-content">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <div class="project-role">${project.role}</div>
                    <div class="project-company">${project.company}</div>
                </div>
                <hr class="project-divider">
                <ul class="project-points">
                    ${pointsHtml}
                </ul>
                <div class="project-tech">${techHtml}</div>
            </div>
        `;
        projectGrid.appendChild(card);
    });
}


// Populate Stats
function loadStats() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid || !data.impactStats) return;

    data.impactStats.forEach(stat => {
        const item = document.createElement('div');
        item.classList.add('stat-item');

        const detailHtml = stat.detail ? `<div class="stat-detail">${stat.detail}</div>` : '';

        item.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
            ${detailHtml}
        `;
        statsGrid.appendChild(item);
    });
}

// Glitch Effect - CSS handled

// Carousel Logic
// Carousel Logic
function loadCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    // create slides
    data.mediaSlides.forEach(slideData => {
        const slide = document.createElement('li');
        slide.classList.add('carousel-slide');

        slide.style.cursor = 'pointer';
        slide.onclick = () => {
            if (slideData.link && slideData.link !== '#') {
                window.open(slideData.link, '_blank');
            }
        };

        const labelHtml = slideData.label ? `<div class="slider-sub-label">${slideData.label}</div>` : '';
        const ctaHtml = slideData.ctaText ? `
            <div class="carousel-cta-wrapper">
                <button class="carousel-cta">${slideData.ctaText}</button>
            </div>` : '';

        slide.innerHTML = `
            <div class="media-image-wrapper">
                <img src="${slideData.image}" alt="${slideData.headline}" style="${slideData.customStyle || ''}">
            </div>
            <div class="carousel-caption">
                ${labelHtml}
                <h3>${slideData.headline}</h3>
                <p>${slideData.caption}</p>
                ${ctaHtml}
            </div>
        `;

        track.appendChild(slide);
    });

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    if (slides.length === 0) return;

    let currentIndex = 0;

    function updateSlidePosition() {
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back
        }
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Loop to end
        }
        updateSlidePosition();
    });
}

// Populate Case Studies
function loadCaseStudies() {
    const grid = document.querySelector('.case-studies-grid');
    if (!grid) return;

    data.caseStudies.forEach(cs => {
        const card = document.createElement('div');
        card.classList.add('case-study-card');

        card.innerHTML = `
            <div class="victory-label">${cs.victoryTitle}</div>
            <h3>${cs.title}</h3>
            <div class="case-study-meta">
                <div class="meta-block">
                    <h4>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        The Challenge
                    </h4>
                    <p>${cs.challenge}</p>
                </div>
                <div class="meta-block">
                    <h4>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.17a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        The System
                    </h4>
                    <p>${cs.system}</p>
                </div>
                <div class="meta-block result-block">
                    <div class="result-header">
                        <h4>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                            The Result
                        </h4>
                        <div class="highlight-metric">${cs.highlightMetric}</div>
                    </div>
                    <p>${cs.result}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Populate Press Logos
function loadPressLogos() {
    const grid = document.querySelector('.press-grid');
    if (!grid) return;

    data.pressLogos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Press Logo";
        img.classList.add('press-logo');

        // Make specific logos bigger as requested
        if (src.includes('algemeen') || src.includes('volkskrant')) {
            img.classList.add('press-logo-large');
        } else if (src.includes('bnr') || src.includes('hln')) {
            img.classList.add('press-logo-medium');
        } else if (src.includes('vrt')) {
            img.classList.add('press-logo-medium');
            img.classList.add('press-logo-inverted');
        }

        grid.appendChild(img);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProfile(); // NEW
    loadStats(); // NEW
    loadExperience(); // NEW
    loadCaseStudies();
    loadPressLogos();
    loadCarousel();
    initHeroAnimation();
    initScrollAnimations();
});

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Hero Background Animation (Grid/Particles)
function initHeroAnimation() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.classList.add('hero-canvas');
    heroSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Resize Handler
    function resize() {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
        initParticles();
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(197, 160, 40, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor(width * height / 15000); // Density based on area
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 50;

        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw Particles & Connections
        particles.forEach(p => {
            p.update();
            p.draw();

            // Connect nearby particles
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.strokeStyle = `rgba(197, 160, 40, ${0.1 * (1 - dist / 100)})`;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}
