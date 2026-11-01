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
        const souuguiWordmark = document.getElementById('souugui-wordmark');
        const cyanLayer = document.getElementById('opening-cyan-layer');
        const orangeTagline = document.getElementById('opening-orange-tagline');
        const taglineText = document.getElementById('opening-tagline-text');
        const videoStage = document.getElementById('opening-video-stage');
        const phrase1 = document.getElementById('statement-phrase-1');
        const phrase2 = document.getElementById('statement-phrase-2');
        const worksHeader = document.querySelector('.works-header');
        const skipWorksBtn = document.getElementById('skip-to-works-btn');
        const projectTiles = document.querySelectorAll('.project-tile');

        // Avatar Wrapper Element
        const profileWrapper = document.querySelector('.profile-wrapper');
        const filterCapsule = document.getElementById('project-filter');

        // New Sidebar/Modal Logic
        const avatarTrigger = document.getElementById('avatar-trigger');
        const profileModal = document.getElementById('profile-modal');
        const closeModalBtn = document.querySelector('.close-modal');

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

        // 2. Opening Scrollytelling Choreography (Stages 1, 2, 3 + Bottom 20% WORKS Reveal + Filter Positioning)
        function clamp01(val) {
            return Math.max(0, Math.min(1, val));
        }

        function rangeProgress(p, start, end) {
            if (end <= start) return p >= end ? 1 : 0;
            return clamp01((p - start) / (end - start));
        }

        function updateOpeningScroll() {
            if (!heroSection) return;

            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const totalScroll = Math.max(1, heroSection.offsetHeight - vh);

            // Reserve the final 20vh of #hero scroll for revealing the WORKS title in the bottom 20% of the screen
            const revealHeight = vh * 0.20;
            const choreoScroll = Math.max(1, totalScroll - revealHeight);
            const p = clamp01(scrollY / choreoScroll);

            // How many pixels of the bottom-20% WORKS reveal have been scrolled (0 -> revealHeight)
            const revealLiftedPx = Math.max(0, Math.min(revealHeight, scrollY - choreoScroll));

            // Stage 1A (0.00 -> 0.22):
            // - souugui starts 1% further down (calc(101vh - 24.5vw)) so the bottom of the 'u' letters is slightly cut
            // - Slides up to -6.5vw, where the bottom straight part of 'u' sits at 17.85vw and 'g' descender extends to 20.71vw
            // - Simultaneously, the orange tagline banner (top: 17.85vw, z-index: 4, behind souugui at z-index: 5) rises from 100vh -> 0vh
            const s1Move = rangeProgress(p, 0.0, 0.22);

            // Stage 1B (0.18 -> 0.30):
            // - Wipe reveal of "animated and static storytelling" from left to right inside the orange strip
            const s1Tagline = rangeProgress(p, 0.18, 0.30);
            if (taglineText) {
                const clipRight = (1 - s1Tagline) * 100;
                taglineText.style.clipPath = `inset(0 ${clipRight.toFixed(1)}% 0 0)`;
            }

            // Stage 2A (0.31 -> 0.45):
            // - Showreel video stage rises from 100vh and STOPS wiping the orange banner at 26.8vw
            //   (leaving the orange tagline strip visible between 17.85vw and 26.8vw)
            // Stage 2B (0.45 -> 0.55):
            // - From 26.8vw, the showreel video, orange tagline banner, souugui wordmark, and cyan header
            //   all scroll up TOGETHER at the same speed (-26.8vw) until the video is centered vertically (0vw)
            // Showreel Lock / Hold (0.55 -> 0.65):
            // - Showreel stays locked centered vertically at 0vh so the user can watch before scrolling past
            // Stage 3A (0.65 -> 0.79):
            // - Video stage continues scrolling up from 0vh -> -100vh so the orange statement banner fills the screen
            const s2a = rangeProgress(p, 0.31, 0.45);
            const s2b = rangeProgress(p, 0.45, 0.55);
            const s3a = rangeProgress(p, 0.65, 0.79);

            // Combined upward shift of the header group (cyan + souugui + orange tagline) once Stage 2B begins
            const groupUpVw = -26.8 * s2b;
            const groupUpVh = -100 * s3a;

            if (cyanLayer) {
                cyanLayer.style.transform = `translate3d(0, calc(${groupUpVh.toFixed(2)}vh + ${groupUpVw.toFixed(2)}vw), 0)`;
            }

            if (souuguiWordmark) {
                if (p <= 0.22) {
                    const vhPart = 101 * (1 - s1Move);
                    const vwPart = -24.5 * (1 - s1Move) + (-6.5 * s1Move);
                    souuguiWordmark.style.transform = `translate3d(0, calc(${vhPart.toFixed(2)}vh + ${vwPart.toFixed(2)}vw), 0)`;
                } else {
                    const vwPart = -6.5 + groupUpVw;
                    souuguiWordmark.style.transform = `translate3d(0, calc(${groupUpVh.toFixed(2)}vh + ${vwPart.toFixed(2)}vw), 0)`;
                }
            }

            if (orangeTagline) {
                if (p <= 0.22) {
                    const orangeY = 100 * (1 - s1Move);
                    orangeTagline.style.transform = `translate3d(0, ${orangeY.toFixed(2)}vh, 0)`;
                } else {
                    orangeTagline.style.transform = `translate3d(0, calc(${groupUpVh.toFixed(2)}vh + ${groupUpVw.toFixed(2)}vw), 0)`;
                }
            }

            if (videoStage) {
                if (p <= 0.45) {
                    const vhPart = 100 * (1 - s2a);
                    const vwPart = 26.8 * s2a;
                    videoStage.style.transform = `translate3d(0, calc(${vhPart.toFixed(2)}vh + ${vwPart.toFixed(2)}vw), 0)`;
                } else if (p <= 0.55) {
                    const vwPart = 26.8 * (1 - s2b);
                    videoStage.style.transform = `translate3d(0, ${vwPart.toFixed(2)}vw, 0)`;
                } else if (p <= 0.65) {
                    // Locked centered vertically in the viewport (0.55 -> 0.65)
                    videoStage.style.transform = 'translate3d(0, 0, 0)';
                } else {
                    const vhPart = -100 * s3a;
                    // During the final 20vh of #hero scroll (revealLiftedPx: 0 -> 20vh),
                    // lift the orange statement banner up by 20vh to reveal the stationary WORKS title in the bottom 20%
                    videoStage.style.transform = `translate3d(0, calc(${vhPart.toFixed(2)}vh - ${revealLiftedPx.toFixed(1)}px), 0)`;
                }
            }

            // Stage 3B (0.81 -> 0.98):
            // - Horizontal text wipe while the orange statement banner is centered in the viewport
            const wipeOut = rangeProgress(p, 0.81, 0.92);
            const wipeIn = rangeProgress(p, 0.85, 0.98);
            if (phrase1 && phrase2) {
                phrase1.style.clipPath = `inset(0 0 0 ${(wipeOut * 100).toFixed(1)}%)`;
                phrase2.style.clipPath = `inset(0 ${((1 - wipeIn) * 100).toFixed(1)}% 0 0)`;
            }

            // Stage 3C — Stationary Bottom-20% Reveal of WORKS Title, then Moving Up Together at the Section Division:
            // Counter-translate only .works-header during the 20vh reveal so #works (.main-content) never has a transform
            // (preserving native CSS position: sticky on #project-filter with zero scroll flickering).
            if (worksHeader) {
                if (scrollY < choreoScroll) {
                    worksHeader.style.transform = `translate3d(0, ${revealHeight.toFixed(1)}px, 0)`;
                } else if (scrollY < totalScroll) {
                    const remainingToDivision = totalScroll - scrollY;
                    worksHeader.style.transform = `translate3d(0, -${remainingToDivision.toFixed(1)}px, 0)`;
                } else {
                    worksHeader.style.transform = 'none';
                }
            }

            // Right-side "works ↓" button:
            // Appears when the ending position of the souugui wordmark animation is reached (p >= 0.21),
            // placed below the 'i' letter, and disappears when the user reaches the works section (scrollY >= totalScroll)
            if (skipWorksBtn) {
                const showSkipBtn = p >= 0.21 && scrollY < totalScroll;
                skipWorksBtn.classList.toggle('visible', showSkipBtn);
            }

            // Desktop Avatar Reveal:
            const isDesktop = window.matchMedia("(min-width: 1200px)").matches;
            if (isDesktop && profileWrapper) {
                const shouldShowWorksUI = scrollY >= totalScroll + vh * 0.12;
                profileWrapper.classList.toggle('visible', shouldShowWorksUI);
            }

            requestAnimationFrame(updateOpeningScroll);
        }
        requestAnimationFrame(updateOpeningScroll);

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
