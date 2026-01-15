document.addEventListener('DOMContentLoaded', () => {

    // Project Data with Extended Fields for Detail Modal
    const projects = [
        {
            title: "Tropical Pop",
            client: "Farm Rio",
            year: 2026,
            image: "assets/abacaxi.jpg",
            category: "commercial",
            services: ["3D Modeling", "Animation"],
            company: "Farm Rio",
            description: "A vibrant tropical-themed campaign featuring 3D fruit animations that bring summer vibes to life. The project involved creating photorealistic pineapple renders with dynamic lighting and playful motion graphics.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "animation", name: "Gui Sousa" },
                { role: "direction", name: "Farm Rio Team" }
            ],
            gallery: ["assets/abacaxi.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
        },
        {
            title: "Neo Tokyo",
            client: "Kodansha",
            year: 2026,
            image: "assets/akira.jpg",
            category: "commercial",
            services: ["3D Animation", "Compositing"],
            company: "Kodansha",
            description: "Tribute piece inspired by the iconic Akira aesthetic. Cyberpunk cityscapes with neon-drenched atmospheres and high-contrast lighting create an immersive dystopian world.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "shading", name: "Gui Sousa" },
                { role: "compositing", name: "Gui Sousa" }
            ],
            gallery: ["assets/akira.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "Urban Cycle",
            client: "Cannondale",
            year: 2025,
            image: "assets/bike.jpg",
            category: "commercial",
            services: ["Product Visualization", "Animation"],
            company: "Cannondale",
            description: "Product visualization showcasing the sleek design and engineering of urban cycling. Dynamic camera movements highlight every detail of the bike's frame and components.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "lighting", name: "Gui Sousa" }
            ],
            gallery: ["assets/bike.jpg", "assets/project_square_1.png"]
        },
        {
            title: "Mini Automotive",
            client: "Hot Wheels",
            year: 2025,
            image: "assets/carrin.jpg",
            category: "commercial",
            services: ["Product Animation", "3D Modeling"],
            company: "Hot Wheels",
            description: "Miniature car collection brought to life with macro-style 3D renders. Each model features authentic details and nostalgic toy aesthetics with modern rendering techniques.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "animation", name: "Gui Sousa" }
            ],
            gallery: ["assets/carrin.jpg", "assets/project_wide_1.png"]
        },
        {
            title: "Portrait Study",
            client: "Vogue",
            year: 2025,
            image: "assets/djully.jpg",
            category: "commercial",
            services: ["3D Portraiture", "Lighting Design"],
            company: "Vogue",
            description: "Editorial portrait study exploring the intersection of fashion and 3D art. Soft lighting and careful attention to skin textures create an intimate, magazine-worthy aesthetic.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "lighting", name: "Gui Sousa" },
                { role: "art direction", name: "Vogue Team" }
            ],
            gallery: ["assets/djully.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "Sunday Vibes",
            client: "Personal Work",
            year: 2025,
            image: "assets/domingo.jpg",
            category: "personal",
            services: ["3D Illustration", "Scene Design"],
            company: "Personal",
            description: "A personal exploration of cozy Sunday aesthetics. Warm colors and soft lighting evoke the feeling of lazy weekend mornings with coffee and good company.",
            credits: [
                { role: "everything", name: "Gui Sousa" }
            ],
            gallery: ["assets/domingo.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
        },
        {
            title: "Life Lately",
            client: "Editorial",
            year: 2024,
            image: "assets/life-lately.jpg",
            category: "personal",
            services: ["Scene Design", "Storytelling"],
            company: "Self-Initiated",
            description: "Visual diary entries translated into 3D scenes. Each composition captures everyday moments with artistic interpretation and emotional depth.",
            credits: [
                { role: "concept", name: "Gui Sousa" },
                { role: "execution", name: "Gui Sousa" }
            ],
            gallery: ["assets/life-lately.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "Gaming Setup",
            client: "Sony",
            year: 2024,
            image: "assets/ps3-fone.jpg",
            category: "commercial",
            services: ["Product Visualization", "Lifestyle Render"],
            company: "Sony",
            description: "Gaming lifestyle visualization featuring iconic PlayStation hardware. The scene captures the essence of gaming culture with carefully composed product placement.",
            credits: [
                { role: "modeling", name: "Gui Sousa" },
                { role: "compositing", name: "Gui Sousa" }
            ],
            gallery: ["assets/ps3-fone.jpg", "assets/project_square_1.png"]
        },
        {
            title: "Twisted Reality",
            client: "Adult Swim",
            year: 2024,
            image: "assets/twisted.jpg",
            category: "commercial",
            services: ["Character Design", "Animation"],
            company: "Adult Swim",
            description: "Surreal animated sequences for late-night programming. Bold colors and unconventional character designs push the boundaries of traditional broadcast graphics.",
            credits: [
                { role: "design", name: "Gui Sousa" },
                { role: "animation", name: "Gui Sousa" }
            ],
            gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "Ethereal Monolith",
            client: "Nat Geo",
            year: 2023,
            image: "assets/project_tall_1.png",
            category: "commercial",
            services: ["Environment Design", "Lighting"],
            company: "National Geographic",
            description: "Abstract environmental piece exploring monumental forms in nature. Atmospheric lighting and scale create a sense of wonder and discovery.",
            credits: [
                { role: "environment", name: "Gui Sousa" },
                { role: "lighting", name: "Gui Sousa" }
            ],
            gallery: ["assets/project_tall_1.png", "assets/project_square_1.png"]
        },
        {
            title: "Neon Skyline",
            client: "Blade Runner",
            year: 2023,
            image: "assets/project_wide_1.png",
            category: "commercial",
            services: ["Environment Design", "Compositing"],
            company: "Warner Bros",
            description: "Futuristic cityscape inspired by cyberpunk aesthetics. Towering structures bathed in neon light create an immersive vision of tomorrow's megacities.",
            credits: [
                { role: "environment", name: "Gui Sousa" },
                { role: "compositing", name: "Gui Sousa" }
            ],
            gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "Golden Fractal",
            client: "Rolex",
            year: 2023,
            image: "assets/project_square_1.png",
            category: "commercial",
            services: ["Abstract Design", "Motion Graphics"],
            company: "Rolex",
            description: "Luxury brand piece featuring abstract golden forms. Mathematical precision meets organic flow in this exploration of timeless elegance.",
            credits: [
                { role: "design", name: "Gui Sousa" },
                { role: "animation", name: "Gui Sousa" }
            ],
            gallery: ["assets/project_square_1.png", "assets/project_wide_1.png"]
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
            // Find the original index in the full projects array
            const originalIndex = projects.findIndex(p => p.title === project.title);

            const article = document.createElement('article');
            article.className = 'project-tile';
            article.tabIndex = 0;
            article.setAttribute('data-index', originalIndex);

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

            // Click handler to open project modal
            article.addEventListener('click', () => {
                openProjectModal(originalIndex);
            });

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
    const heroTitle = document.querySelector('.hero-title'); // Title target
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
            const fadeStart = 0;
            // Desktop (>1200px): 400 | Mobile/Tablet (<1200px): 120 (much faster for logo overlap)
            const isSmallScreen = window.innerWidth < 1200;
            const fadeEnd = isSmallScreen ? 120 : 400;

            let opacity = 1;

            if (scrollY > fadeStart) {
                opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
                if (opacity < 0) opacity = 0;
            }

            if (heroTagline) {
                heroTagline.style.opacity = opacity;
                heroTagline.style.transform = `translateY(${scrollY * 0.2}px)`; // Subtle push down
            }

            if (heroTitle) {
                heroTitle.style.opacity = opacity;
                heroTitle.style.transform = `translateY(${scrollY * 0.2}px)`; // Subtle push down
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

    // ============================================
    // PROJECT DETAIL MODAL
    // ============================================

    const projectModal = document.getElementById('project-modal');
    const projectModalClose = document.querySelector('.project-modal-close');
    const modalTitle = document.querySelector('.project-modal-title');
    const modalRight = document.querySelector('.modal-right');
    const modalLeft = document.querySelector('.modal-left');

    // Desktop: Forward scroll from left column to right column (gallery)
    if (modalLeft && modalRight) {
        modalLeft.addEventListener('wheel', (e) => {
            // Only on desktop (1024px+)
            if (window.innerWidth >= 1024) {
                modalRight.scrollTop += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Open Project Modal
    function openProjectModal(projectIndex) {
        const project = projects[projectIndex];
        if (!project || !projectModal) return;

        // Populate Title
        modalTitle.textContent = project.title;

        // Populate Year
        const yearField = document.querySelector('[data-field="year"]');
        if (yearField) yearField.textContent = project.year;

        // Populate Services
        const servicesField = document.querySelector('[data-field="services"]');
        if (servicesField) {
            servicesField.textContent = project.services ? project.services.join(', ') : '';
        }

        // Populate Company
        const companyField = document.querySelector('[data-field="company"]');
        if (companyField) companyField.textContent = project.company || '';

        // Populate Description
        const descField = document.querySelector('[data-field="description"]');
        if (descField) descField.textContent = project.description || '';

        // Populate Credits
        const creditsField = document.querySelector('[data-field="credits"]');
        if (creditsField && project.credits) {
            creditsField.innerHTML = project.credits.map(credit => `
                <div class="credit-item">
                    <span class="credit-role">${credit.role}</span>
                    <span class="credit-name">${credit.name}</span>
                </div>
            `).join('');
        }

        // Populate Gallery
        if (modalRight && project.gallery) {
            modalRight.innerHTML = project.gallery.map(img => `
                <div class="gallery-image-wrapper">
                    <button class="fullscreen-btn" aria-label="View fullscreen" data-src="${img}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                    </button>
                    <img src="${img}" alt="${project.title}" loading="lazy">
                </div>
            `).join('');

            // Add click handlers for fullscreen buttons
            modalRight.querySelectorAll('.fullscreen-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const src = btn.getAttribute('data-src');
                    openImageLightbox(src);
                });
            });

            // Add click handlers on images themselves (desktop feature)
            modalRight.querySelectorAll('.gallery-image-wrapper img').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openImageLightbox(img.src);
                });
            });
        }

        // Show Modal
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // Close Project Modal
    function closeProjectModal() {
        if (!projectModal) return;

        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scroll
    }

    // Close Method 1: Close Button
    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    // Close Method 2: ESC Key (only if lightbox is NOT open)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            // Don't close modal if lightbox is open - let lightbox ESC handler take priority
            if (imageLightbox && imageLightbox.classList.contains('active')) {
                return; // Let the lightbox ESC handler deal with it
            }
            closeProjectModal();
        }
    });

    // Close Method 3: Click on Backdrop (not on modal content)
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            // Only close if clicking directly on the overlay, not the content
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // ============================================
    // IMAGE LIGHTBOX
    // ============================================

    const imageLightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Open Lightbox
    function openImageLightbox(src) {
        if (!imageLightbox || !lightboxImage) return;

        lightboxImage.src = src;
        imageLightbox.classList.add('active');
        imageLightbox.setAttribute('aria-hidden', 'false');
    }

    // Close Lightbox
    function closeImageLightbox() {
        if (!imageLightbox) return;

        imageLightbox.classList.remove('active');
        imageLightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
    }

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeImageLightbox);
    }

    // Click outside image to close
    if (imageLightbox) {
        imageLightbox.addEventListener('click', (e) => {
            if (e.target === imageLightbox) {
                closeImageLightbox();
            }
        });
    }

    // ESC key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageLightbox && imageLightbox.classList.contains('active')) {
            closeImageLightbox();
        }
    });

});
