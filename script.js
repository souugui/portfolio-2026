document.addEventListener('DOMContentLoaded', () => {

    // Flag to check if initialized
    let isInitialized = false;

    // Global Initialization Function
    window.initPortfolio = function (projectsData) {
        if (isInitialized) return;
        isInitialized = true;

        const projects = projectsData;


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

                const isVideo = /\.(mp4|mov|mkv|webm|m4v)$/i.test(project.image);
                // Encode each path segment individually so spaces and special chars work
                const mediaSrc = project.image.split('/').map(encodeURIComponent).join('/');

                const mediaHTML = isVideo
                    ? `<video src="${mediaSrc}" autoplay muted loop playsinline></video>`
                    : `<img src="${mediaSrc}" alt="${project.title} - ${project.client}" ${loadingAttr}>`;

                article.innerHTML = `
                <div class="image-wrapper">
                    ${mediaHTML}
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

        // ── Grid Masonry: calculate row spans after images load ──────────


        function applyMasonrySpans() {
            const ITEM_GAP = 16;
            const tiles = gridContainer.querySelectorAll('.project-tile');
            tiles.forEach(tile => {
                // Reset so we get the natural content height
                tile.style.gridRowEnd = '';
                const height = tile.getBoundingClientRect().height;
                // span = height + gap → places next item exactly GAP px below
                tile.style.gridRowEnd = `span ${Math.ceil(height) + ITEM_GAP}`;
            });
        }

        function waitForImagesAndApply() {
            const imgs = [...gridContainer.querySelectorAll('img')];
            const videos = [...gridContainer.querySelectorAll('video')];
            const media = [...imgs, ...videos];
            let loaded = 0;
            if (media.length === 0) { applyMasonrySpans(); return; }

            function onLoaded() {
                loaded++;
                if (loaded === media.length) applyMasonrySpans();
            }

            imgs.forEach(img => {
                if (img.complete) { onLoaded(); }
                else {
                    img.addEventListener('load', onLoaded);
                    img.addEventListener('error', onLoaded);
                }
            });

            videos.forEach(video => {
                if (video.readyState >= 1) { onLoaded(); } // HAVE_METADATA
                else {
                    video.addEventListener('loadedmetadata', onLoaded);
                    video.addEventListener('error', onLoaded);
                }
            });
        }

        waitForImagesAndApply();

        // Re-apply on resize (column count changes between breakpoints)
        window.addEventListener('resize', applyMasonrySpans);

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
                waitForImagesAndApply();

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
        document.querySelectorAll('a[href^="#"]:not(.project-link)').forEach(anchor => {
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

            // Populate My Role
            const myRoleField = document.querySelector('[data-field="my role"]');
            if (myRoleField) {
                myRoleField.textContent = project['my role'] ? project['my role'].join(', ') : '';
            }

            // Populate Company
            const companyField = document.querySelector('[data-field="company"]');
            if (companyField) {
                companyField.textContent = project.company || '';
                // Hide the entire meta-item row when there's no company
                const companyItem = companyField.closest('.meta-item');
                if (companyItem) {
                    companyItem.style.display = project.company ? '' : 'none';
                }
            }

            // Populate Description
            const descField = document.querySelector('[data-field="description"]');
            if (descField) descField.textContent = project.description || '';

            // Populate Link (optional)
            const linkField = document.querySelector('[data-field="link"]');
            if (linkField) {
                if (project.link) {
                    linkField.href = project.link.url;
                    linkField.textContent = project.link.label;
                    linkField.style.display = '';
                } else {
                    linkField.style.display = 'none';
                }
            }

            // Populate Credits
            const creditsField = document.querySelector('[data-field="credits"]');
            if (creditsField) {
                const creditsColumn = creditsField.closest('.meta-column-right');
                const hasCredits = project.credits && project.credits.length > 0;
                if (creditsColumn) {
                    creditsColumn.style.display = hasCredits ? '' : 'none';
                }
                if (hasCredits) {
                    creditsField.innerHTML = project.credits.map(credit => `
                <div class="credit-item">
                    <span class="credit-role">${credit.role}</span>
                    <span class="credit-name">${credit.name}</span>
                </div>
            `).join('');
                }
            }

            // Populate Gallery
            if (modalRight && project.gallery) {
                const isVid = (src) => /\.(mp4|mov|mkv|webm|m4v)$/i.test(src);
                const isVimeo = (src) => src.startsWith('https://player.vimeo.com');
                const encodeSrc = (src) => src.split('/').map(encodeURIComponent).join('/');

                modalRight.innerHTML = project.gallery.map(item => {
                    const src = encodeSrc(item);
                    let media;
                    if (isVimeo(item)) {
                        const sep = item.includes('?') ? '&' : '?';
                        const vimeoSrc = item + sep + 'controls=0&autoplay=0&muted=1&loop=0&title=0&byline=0&portrait=0';
                        media = `<div class="gallery-vimeo-wrapper">
                            <iframe src="${vimeoSrc}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen></iframe>
                            <div class="vimeo-click-shield"></div>
                            <button class="video-play-btn" aria-label="Play video">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg>
                            </button>
                            <button class="video-fullscreen-btn" aria-label="View fullscreen">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <polyline points="9 21 3 21 3 15"></polyline>
                                    <line x1="21" y1="3" x2="14" y2="10"></line>
                                    <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                            </button>
                        </div>`;
                    } else if (isVid(item)) {
                        media = `<div class="gallery-video-wrapper">
                            <video src="${src}" muted playsinline preload="metadata"></video>
                            <button class="video-play-btn" aria-label="Play video">
                                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"></polygon></svg>
                            </button>
                            <button class="video-fullscreen-btn" aria-label="View fullscreen">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <polyline points="9 21 3 21 3 15"></polyline>
                                    <line x1="21" y1="3" x2="14" y2="10"></line>
                                    <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                            </button>
                        </div>`;
                    } else {
                        media = `<img src="${src}" alt="${project.title}" loading="lazy">`;
                    }
                    return `
                <div class="gallery-image-wrapper">
                    ${(!isVid(item) && !isVimeo(item)) ? `<button class="fullscreen-btn" aria-label="View fullscreen" data-src="${src}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                    </button>` : ''}
                    ${media}
                </div>`;
                }).join('');

                // Fullscreen button handlers (images only)
                modalRight.querySelectorAll('.fullscreen-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openImageLightbox(btn.getAttribute('data-src'));
                    });
                });

                // Click-to-lightbox on images themselves
                modalRight.querySelectorAll('.gallery-image-wrapper img').forEach(img => {
                    img.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openImageLightbox(img.src);
                    });
                });

                // Video: play/pause on click, fading play button, fullscreen button
                modalRight.querySelectorAll('.gallery-video-wrapper').forEach(wrapper => {
                    const video = wrapper.querySelector('video');
                    const playBtn = wrapper.querySelector('.video-play-btn');
                    const fsBtn = wrapper.querySelector('.video-fullscreen-btn');

                    function showPlayBtn() {
                        playBtn.classList.remove('hidden');
                    }
                    function hidePlayBtn() {
                        playBtn.classList.add('fading');
                        setTimeout(() => {
                            playBtn.classList.add('hidden');
                            playBtn.classList.remove('fading');
                        }, 300);
                    }

                    function togglePlay() {
                        if (video.paused) {
                            video.play();
                            hidePlayBtn();
                        } else {
                            video.pause();
                            showPlayBtn();
                        }
                    }

                    video.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
                    playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
                    video.addEventListener('ended', showPlayBtn);

                    // Native fullscreen
                    fsBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (video.requestFullscreen) video.requestFullscreen();
                        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
                    });
                });

                // Vimeo: load SDK once, wire same play/pause/fullscreen logic via Vimeo.Player API
                const vimeoWrappers = modalRight.querySelectorAll('.gallery-vimeo-wrapper');
                if (vimeoWrappers.length > 0) {
                    function initVimeoPlayers() {
                        vimeoWrappers.forEach(wrapper => {
                            const iframe = wrapper.querySelector('iframe');
                            const playBtn = wrapper.querySelector('.video-play-btn');
                            const fsBtn = wrapper.querySelector('.video-fullscreen-btn');
                            const player = new Vimeo.Player(iframe);

                            const shield = wrapper.querySelector('.vimeo-click-shield');

                            function showPlayBtn() { playBtn.classList.remove('hidden'); }
                            function hidePlayBtn() {
                                playBtn.classList.add('fading');
                                setTimeout(() => { playBtn.classList.add('hidden'); playBtn.classList.remove('fading'); }, 300);
                            }
                            function togglePlay() {
                                player.getPaused().then(paused => {
                                    if (paused) { player.play(); hidePlayBtn(); }
                                    else { player.pause(); showPlayBtn(); }
                                });
                            }

                            shield.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
                            playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
                            player.on('ended', showPlayBtn);
                            player.on('pause', showPlayBtn);

                            fsBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                player.requestFullscreen().catch(() => {
                                    if (iframe.requestFullscreen) iframe.requestFullscreen();
                                });
                            });
                        });
                    }

                    if (window.Vimeo) {
                        initVimeoPlayers();
                    } else {
                        const sdkScript = document.createElement('script');
                        sdkScript.src = 'https://player.vimeo.com/api/player.js';
                        sdkScript.onload = initVimeoPlayers;
                        document.head.appendChild(sdkScript);
                    }
                }
            }


            // Show Modal
            projectModal.classList.add('active');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            document.body.classList.add('project-modal-open');
        }

        // Close Project Modal
        function closeProjectModal() {
            if (!projectModal) return;

            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scroll
            document.body.classList.remove('project-modal-open');
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

    };
});
