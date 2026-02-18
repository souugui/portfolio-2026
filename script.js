document.addEventListener('DOMContentLoaded', () => {

    // Project Data with Extended Fields for Detail Modal
    const projects = [
        {
            title: "pineapple jar",
            client: "personal project",
            year: 2023,
            image: "assets/abacaxi.jpg",
            category: "personal",
            services: ["3D modeling", "lookdev"],
            description: "I was starting to study geometry nodes in blender and used a common known object in Brazil, the Pineapple jar - found primarly in our grandma's houses - to exercise procedural modeling and lookdev",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" },
            ],
            gallery: ["assets/abacaxi.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
        },
        {
            title: "air diffuser",
            client: "personal project",
            year: 2023,
            image: "assets/akira.jpg",
            category: "personal",
            services: ["modeling", "lookdev", "animation"],
            description: "project developed with the intention to get better understanding of modeling and shading as well as animation",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" },
                { role: "animation", name: "gui sousa" }
            ],
            gallery: ["assets/akira.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "pedal",
            client: "personal project",
            year: 2025,
            image: "assets/bike.jpg",
            category: "personal",
            services: ["product visualization", "animation"],
            company: "Cannondale",
            description: "Product visualization showcasing the sleek design and engineering of urban cycling. Dynamic camera movements highlight every detail of the bike's frame and components.",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" }
            ],
            gallery: ["assets/bike.jpg", "assets/project_square_1.png"]
        },
        {
            title: "rampage rally",
            client: "clint jones (aka pwnisher)",
            year: 2025,
            image: "assets/carrin.jpg",
            category: "commercial",
            services: ["animation", "lookdev"],
            description: "clinton jones, aka pwnisher, does this 1-month challenges regularly to gather the 3d community to exercise their skills and create 6 seconds animations with the provided template. the name of this challenge was rampage rally, mine was inspired by my childhood, when i used to play in my backyard with my toys.",
            credits: [
                { role: "layout", name: "clinton jones" },
                { role: "base animation", name: "clinton jones" },
                { role: "animation", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" }
            ],
            gallery: ["assets/carrin.jpg", "assets/project_wide_1.png"]
        },
        {
            title: "daily objects",
            client: "personal project",
            year: 2024,
            image: "assets/djully.jpg",
            category: "personal",
            services: ["modeling", "lookdev"],
            description: "project developed to exercise modeling and lookdev for daily objects",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" },
            ],
            gallery: ["assets/djully.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "36 day of type",
            client: "personal project",
            year: 2023,
            image: "assets/domingo.jpg",
            category: "personal",
            services: ["layout", "lookdev", "compositing"],
            description: "36 days of type is an annual project that invites designers, illustrator and visual artists to express their unique interpretation of the letters and numbers of the latin alphabet. in 2023 I created my version around the theme 'football', in which i assembled the scenes using pre-made assets, set up lighting, and handled final compositing with a time limit to finish each letter within 3˜5 hours, which didn't work for every letter, but it was a great challenge to be part of.",
            credits: [
                { role: "layout", name: "gui sousa" }
                { role: "lookdev", name: "gui sousa" }
                { role: "compositing", name: "gui sousa" }                
            ],
            gallery: ["assets/domingo.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
        },
        {
            title: "life lately",
            client: "personal project",
            year: 2025,
            image: "assets/life-lately.jpg",
            category: "personal",
            services: ["layout", "lookdev", "animation"],
            description: "short animations exploring different geometry nodes, using pre made assets to express a busy moment in my life",
            credits: [
                { role: "layout", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" }
                { role: "animation", name: "gui sousa" }
            ],
            gallery: ["assets/life-lately.jpg", "assets/project_tall_1.png"]
        },
        {
            title: "mega builds",
            client: "personal project",
            year: 2024,
            image: "assets/ps3-fone.jpg",
            category: "personal",
            services: ["modeling", "lookdev", "animation", "compositing"],
            description: "I was at the mall with my girlfriend when we passed by the toys store and imediately saw this box of 'Mega Construções', a toy we used to play a lot when we were kids and I knew I had to create something about it that week.",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" },
                { role: "animation", name: "gui sousa" }
                { role: "compositing", name: "gui sousa" }
            ],
            gallery: ["assets/ps3-fone.jpg", "assets/project_square_1.png"]
        },
        {
            title: "halftime show twisted tea",
            client: "twisted tea",
            year: 2024,
            image: "assets/twisted.jpg",
            category: "commercial",
            services: ["lookdev", "animation"],
            company: "twisted tea",
            description: "twisted tea was the sponsor for the 2024 Grey Cup Halftime Show and 647 media contacted me to create an animated 3d asset they could use in the video they were animating for the client, so we decided for a 360 animation of their can to provide flexibility for the editors and quickness to deliver, as it took only two days from contact to render.",
            credits: [
                { role: "lookdev", name: "gui sousa" },
                { role: "animation", name: "gui sousa" }
                { role: "art direction", name: "thiago nunes" }
            ],
            gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "causos",
            client: "personal project",
            year: 2022,
            image: "assets/project_tall_1.png",
            category: "personal",
            services: ["modeling", "lookdev", "animation"],
            description: "This project was idealized by Vitória Coelho, who wanted to team up to create a title design based on an urban legend called 'loira do banheiro'(bathroom blonde - a legend that, through her research, originated in a small town called Guaratinguetá involving a famous family from the city and a runway daughter). I was responsible for the 3d side of it (modeling, lookdev, animation) while she directed the final look and added the sound design, 2d animations and video edited.",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" }
                { role: "animation", name: "gui sousa" }
                { role: "sound design", name: "vitória coelho" }
                { role: "video editing", name: "vitória coelho" }
                { role: "art direction", name: "vitória coelho" }
                { role: "2d motion", name: "vitória coelho" }
            ],
            gallery: ["assets/project_tall_1.png", "assets/project_square_1.png"]
        },
        {
            title: "led screen scenarios",
            client: "hora 1 - globo tv",
            year: 2024,
            image: "assets/project_wide_1.png",
            category: "commercial",
            services: ["layout", "animation", "compositing", "2d motion", "content research"],
            company: "Globo TV",
            description: "environments for broadcasting that I had the opportunity to create for the new LED screen debuted by TV Globo on March 24, while working with the Hora 1 team. the goal on the first one was to create an immersive scene to illustrate middle east conflicts, so the host could introduce different stories about the topic, it was done within 3 hours from start to finish (with overnight rendering), using pre made assets, geometry nodes and compositing to unify the final look. the second one was created within two hours using geometry nodes in blender to create the destruction levels of the house's ceilling and help explain different grades of hurricanes when Hurricane Milton, a Category 3 storm, made landfall on Florida's west coast with winds reaching 120 mph",
            credits: [
                { role: "layout", name: "gui sousa" },
                { role: "animation", name: "gui sousa" },
                { role: "compositing", name: "gui sousa" }
                { role: "2d motion", name: "gui sousa" }
                { role: "content research", name: "gui sousa" }
            ],
            gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "weather explainer",
            client: "hora 1 - globo tv",
            year: 2024,
            image: "assets/project_square_1.png",
            category: "commercial",
            services: ["layout", "camera animation", "compositing", "2d motion"],
            company: "Globo TV",
            description: "environments for the weather report moment that I had the opportunity to create for the new LED screen debuted by TV Globo on March 24, while working with the Hora 1 team. the first one is about animal care, so I got animated assets to created the environment based on the meteorologist request. the second one is about the difference between two temperature measurement methods",
            credits: [
                { role: "layout", name: "gui sousa" },
                { role: "camera animation", name: "gui sousa" },
                { role: "compositing", name: "gui sousa" }
                { role: "2d motion", name: "gui sousa" }
            ],
            gallery: ["assets/project_square_1.png", "assets/project_wide_1.png"]
        }
        {
            title: "led screen r&d",
            client: "hora 1 - globo tv",
            year: 2024,
            image: "assets/project_wide_1.png",
            category: "commercial",
            services: ["layout", "animation", "compositing", "2d motion", "content research"],
            company: "Globo TV",
            description: "r&d I did for environments to hora 1 LED screen scenario debuted by TV Globo on March 24. the goal on the first one was to create an immersive scene to illustrate the 2024 american elections, so the host could introduce different stories about the topic, using pre made assets to get full accuracy from the research I did on different versions of the oval office. the second one was modeled almost entirely by me, and the goal was to be thematic scenario for volleyball topics. the third was created when we thought Vinicius Jr was going to win the ballon do'r, so we got it done before to be the possible scenario in case it happened (it should've happen actually)",
            credits: [
                { role: "layout", name: "gui sousa" },
                { role: "animation", name: "gui sousa" },
                { role: "compositing", name: "gui sousa" }
                { role: "2d motion", name: "gui sousa" }
                { role: "content research", name: "gui sousa" }
            ],
            gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "voepass airplane crash",
            client: "g1 news portal",
            year: 2025,
            image: "assets/project_wide_1.png",
            category: "commercial",
            services: ["modeling", "lookdev", "animation", "video editing", "2d motion", "content research"],
            company: "Globo TV",
            description: "animation created for G1's special page marking the one-year anniversary of the Voepass airplane crash in Vinhedo, São Paulo. We bought the airplane model and recreated the shader as well as the animation following the steps of the accident, from outside to inside of the plane using flight radar and black box records",
            credits: [
                { role: "modeling", name: "gui sousa" },
                { role: "lookdev", name: "gui sousa" },
                { role: "animation", name: "gui sousa" }
                { role: "video editing", name: "gui sousa" }
                { role: "2d motion", name: "gui sousa" }
                { role: "content research", name: "gui sousa" }
            ],
            gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
        },
        {
            title: "beverage can animation",
            client: "truly",
            year: 2024,
            image: "assets/twisted.jpg",
            category: "commercial",
            services: ["lookdev", "animation"],
            company: "truly",
            description: "647 media contacted me to create an animated 3d asset they could use in the video they were animating for the client, so we decided for a 360 animation of their can to provide flexibility for the editors and quickness to deliver, as it took only two days from contact to render.",
            credits: [
                { role: "lookdev", name: "gui sousa" },
                { role: "animation", name: "gui sousa" }
                { role: "art direction", name: "thiago nunes" }
            ],
            gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
        },                        
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
