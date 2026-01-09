document.addEventListener('DOMContentLoaded', () => {

    // Project Data with New Assets
    const projects = [
        {
            title: "Tropical Pop",
            client: "Farm Rio",
            year: 2026,
            image: "assets/abacaxi.jpg",
            category: "commercial"
        },
        {
            title: "Neo Tokyo",
            client: "Kodansha",
            year: 2026,
            image: "assets/akira.jpg",
            category: "commercial"
        },
        {
            title: "Urban Cycle",
            client: "Cannondale",
            year: 2025,
            image: "assets/bike.jpg",
            category: "commercial"
        },
        {
            title: "Mini Automotive",
            client: "Hot Wheels",
            year: 2025,
            image: "assets/carrin.jpg",
            category: "commercial"
        },
        {
            title: "Portrait Study",
            client: "Vogue",
            year: 2025,
            image: "assets/djully.jpg",
            category: "commercial"
        },
        {
            title: "Sunday Vibes",
            client: "Personal Work",
            year: 2025,
            image: "assets/domingo.jpg",
            category: "personal"
        },
        {
            title: "Life Lately",
            client: "Editorial",
            year: 2024,
            image: "assets/life-lately.jpg",
            category: "personal"
        },
        {
            title: "Gaming Setup",
            client: "Sony",
            year: 2024,
            image: "assets/ps3-fone.jpg",
            category: "commercial"
        },
        {
            title: "Twisted Reality",
            client: "Adult Swim",
            year: 2024,
            image: "assets/twisted.jpg",
            category: "commercial"
        },
        // Adding previously generated abstracts as fillers
        {
            title: "Ethereal Monolith",
            client: "Nat Geo",
            year: 2023,
            image: "assets/project_tall_1.png",
            category: "commercial"
        },
        {
            title: "Neon Skyline",
            client: "Blade Runner",
            year: 2023,
            image: "assets/project_wide_1.png",
            category: "commercial"
        },
        {
            title: "Golden Fractal",
            client: "Rolex",
            year: 2023,
            image: "assets/project_square_1.png",
            category: "commercial"
        }
    ];

    const gridContainer = document.getElementById('project-grid');

    // Render Projects Function
    function renderProjects(filter = 'all') {
        if (!gridContainer) return;

        // Clear current grid
        gridContainer.innerHTML = '';

        const filteredProjects = projects.filter(project => {
            if (filter === 'all') return true;
            return project.category === filter;
        });

        filteredProjects.forEach((project, index) => {
            const article = document.createElement('article');
            article.className = 'project-tile';
            article.tabIndex = 0;

            // Priority loading for first few items
            const loadingAttr = index < 4 ? '' : 'loading="lazy"';

            article.innerHTML = `
                <div class="image-wrapper">
                    <img src="${project.image}" alt="${project.title} - ${project.client}" ${loadingAttr}>
                    <div class="tile-overlay">
                        <div class="overlay-content">
                            <h3>${project.title}</h3>
                            <span class="client-name">${project.client}</span>
                            <span class="project-year">${project.year}</span>
                        </div>
                    </div>
                </div>
            `;
            // Add Fade In Animation for filter switch
            article.style.animation = `fadeHero 0.5s ease-out forwards ${index * 0.05}s`;
            article.style.opacity = '0'; // Start hidden for animation

            gridContainer.appendChild(article);
        });
    }

    // Initial Render
    renderProjects('all');

    // Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const worksSection = document.getElementById('works'); // Target for scroll

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            // Render
            const filterValue = btn.getAttribute('data-filter');
            renderProjects(filterValue);

            // User Req: Mobile - Scroll to top of section when filtering
            if (window.innerWidth < 1200 && worksSection) {
                const offset = 100; // Little buffer
                const top = worksSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // Elements
    const heroSection = document.getElementById('hero');
    const heroTagline = document.querySelector('.hero-tagline'); // Tagline target
    const heroVideo = document.querySelector('.video-background');
    const projectTiles = document.querySelectorAll('.project-tile');

    // Avatar Wrapper Element
    const profileWrapper = document.querySelector('.profile-wrapper');
    const filterCapsule = document.getElementById('project-filter');

    // New Sidebar/Modal Logic
    const avatarTrigger = document.getElementById('avatar-trigger');
    const profileModal = document.getElementById('profile-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // 1. Scroll Reveal for Avatar (Desktop) AND Filter (Desktop)
    const heroObserverOptions = {
        root: null,
        threshold: 0.1 // Trigger when 10% of hero is visible (or rather when it leaves)
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Logic: 
            // entry.isIntersecting === true means Hero is on screen.
            // entry.isIntersecting === false means Hero is scroleld away.

            const isHeroVisible = entry.isIntersecting;

            // Desktop Logic Checks
            const isDesktop = window.matchMedia("(min-width: 1200px)").matches;

            if (isDesktop) {
                if (!isHeroVisible && entry.boundingClientRect.top < 0) {
                    // Hero is GONE (scrolled down)
                    if (profileWrapper) profileWrapper.classList.add('visible');
                    if (filterCapsule) filterCapsule.classList.add('visible');
                } else {
                    // Hero is VISIBLE
                    if (profileWrapper) profileWrapper.classList.remove('visible');
                    if (filterCapsule) filterCapsule.classList.remove('visible');
                }
            } else {
                // Mobile/Tablet Logic (No scroll reveal needed mostly, but good cleanup)
                // Actually mobile filter is always visible so we don't toggle class 'visible' which handles opacity
                // But let's ensure we don't accidentally hide it if CSS relies on it
            }
        });
    }, heroObserverOptions);

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    function toggleModal(show) {
        if (show) {
            profileModal.classList.add('active');
            profileModal.setAttribute('aria-hidden', 'false');
        } else {
            profileModal.classList.remove('active');
            profileModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (avatarTrigger) {
        avatarTrigger.addEventListener('click', () => toggleModal(true));
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleModal(false));
    }

    // Close on outside click
    if (profileModal) {
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                toggleModal(false);
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && profileModal.classList.contains('active')) {
            toggleModal(false);
        }
    });

    // 2. Parallax Effect for Video & Tagline Fade
    let lastScrollY = window.scrollY;

    function updateParallax() {
        const scrollY = window.scrollY;

        // Parallax Video
        if (scrollY < window.innerHeight) {
            const translateY = scrollY * 0.5;
            if (heroVideo) {
                heroVideo.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }

            // Text Fade Out
            if (heroTagline) {
                // Fade out quickly: 0 to 200px
                const fadeStart = 0;
                const fadeEnd = 200;
                let opacity = 1;

                if (scrollY > fadeStart) {
                    opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
                    if (opacity < 0) opacity = 0;
                }
                heroTagline.style.opacity = opacity;
                heroTagline.style.transform = `translateY(${scrollY * 0.2}px)`; // Subtle push down
            }
        }

        lastScrollY = scrollY;
        requestAnimationFrame(updateParallax);
    }
    requestAnimationFrame(updateParallax);

    // 3. Scroll Reveal for Project Tiles (Optional now since we forced opacity: 1, but good for future)
    // We kept opacity: 1 in CSS so this just adds class 'revealed' which might trigger other transforms if added
    const tileObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const tileObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, tileObserverOptions);

    projectTiles.forEach(tile => {
        tileObserver.observe(tile);
    });

    // 5. Email Copy Feature
    const emailCopyBtn = document.getElementById('email-copy-btn');
    if (emailCopyBtn) {
        emailCopyBtn.addEventListener('click', async () => {
            const email = 'souugui@gmail.com';
            try {
                await navigator.clipboard.writeText(email);

                // Visual Feedback
                emailCopyBtn.classList.add('copied');

                // Reset after 2 seconds
                setTimeout(() => {
                    emailCopyBtn.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }

    // 6. Footer Email Copy Feature
    const footerEmailBtn = document.getElementById('footer-email-btn');
    if (footerEmailBtn) {
        footerEmailBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            // Prevent scroll to top since href="#"
            const email = 'souugui@gmail.com';
            try {
                await navigator.clipboard.writeText(email);

                // Text Feedback
                const originalText = footerEmailBtn.textContent;
                footerEmailBtn.textContent = 'Copied!';

                // Reset after 2 seconds
                setTimeout(() => {
                    footerEmailBtn.textContent = originalText;
                }, 2000);

            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    }

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Handle "Back to Top" (href="#")
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
