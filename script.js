document.addEventListener('DOMContentLoaded', () => {

    // Flag to check if initialized
    let isInitialized = false;

    // Global Initialization Function
    window.initPortfolio = function (projectsData) {
        if (isInitialized) return;
        isInitialized = true;

        const projects = projectsData;


        // Custom White Square Cursor with Hard Cyan Drop Shadow
        const customCursor = document.getElementById('custom-cursor');
        if (customCursor) {
            window.addEventListener('pointermove', (e) => {
                customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }, { passive: true });
            window.addEventListener('pointerdown', () => customCursor.classList.add('is-pressed'));
            window.addEventListener('pointerup', () => customCursor.classList.remove('is-pressed'));
            window.addEventListener('pointercancel', () => customCursor.classList.remove('is-pressed'));
            window.addEventListener('blur', () => customCursor.classList.remove('is-pressed'));
        }

        const gridContainer = document.getElementById('project-grid');
        const carouselViewport = document.getElementById('carousel-viewport');
        let setLength = 0;

        // Split multi-word titles into balanced lines (e.g., "HALFTIME SHOW ASSET" -> ["HALFTIME", "SHOW ASSET"])
        function splitTitleIntoLines(title) {
            const words = title.trim().toUpperCase().split(/\s+/);
            if (words.length <= 1) return words;
            if (words.length === 2) {
                if (words[0].length <= 3 || words[1].length <= 3) {
                    return [words.join(' ')];
                }
                return [words[0], words[1]];
            }

            let bestSplit = 1;
            let bestDiff = Infinity;
            for (let i = 1; i < words.length; i++) {
                const line1 = words.slice(0, i).join(' ');
                const line2 = words.slice(i).join(' ');
                const diff = Math.abs(line1.length - line2.length);
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestSplit = i;
                }
            }
            return [
                words.slice(0, bestSplit).join(' '),
                words.slice(bestSplit).join(' ')
            ];
        }

        // Scale EVERY line of the project title independently so each line fills 100% of the thumbnail width
        function fitCardOverlays() {
            if (!gridContainer) return;
            gridContainer.querySelectorAll('.carousel-card').forEach(card => {
                const cardW = card.clientWidth;
                const cardH = card.clientHeight;
                if (!cardW || !cardH) return;

                const innerW = cardW - 12; // 6px left + 6px right padding
                if (innerW <= 0) return;

                card.querySelectorAll('.overlay-title-line').forEach(lineEl => {
                    lineEl.style.fontSize = '60px';
                    const naturalW = lineEl.scrollWidth;
                    if (naturalW > 0) {
                        const fittedSize = 60 * (innerW / naturalW);
                        lineEl.style.fontSize = `${fittedSize.toFixed(2)}px`;
                    }
                });
            });
        }

        // Render Projects into Seamless Infinite Horizontal Carousel
        function renderProjects(filter = 'all') {
            if (!gridContainer) return;

            const filteredProjects = projects.filter(project => {
                if (filter === 'all') return true;
                return project.category === filter;
            });

            // Repeat filteredProjects 6x so one complete cycle is always divisible by BOTH 3 (stagger) and 2 (cyan/orange alternation)
            const oneCycle = [
                ...filteredProjects, ...filteredProjects, ...filteredProjects,
                ...filteredProjects, ...filteredProjects, ...filteredProjects
            ];
            setLength = oneCycle.length;

            // Duplicate oneCycle twice for seamless infinite wrapping
            const allItems = [...oneCycle, ...oneCycle];

            gridContainer.innerHTML = allItems.map((project, idx) => {
                const originalIndex = projects.findIndex(p => p.title === project.title);
                const isVideo = /\.(mp4|mov|mkv|webm|m4v)$/i.test(project.image);
                const mediaSrc = project.image.split('/').map(encodeURIComponent).join('/');
                const mediaHTML = isVideo
                    ? `<video src="${mediaSrc}" autoplay muted loop playsinline></video>`
                    : `<img src="${mediaSrc}" alt="${project.title} - ${project.client}" draggable="false">`;
                const colorVariant = idx % 2 === 0 ? 'cyan' : 'orange';
                const clientLabel = project.category === 'personal' ? 'personal project' : project.client;
                const titleLinesHTML = splitTitleIntoLines(project.title)
                    .map(line => `<span class="overlay-title-line">${line}</span>`)
                    .join('');

                return `
                    <article class="carousel-card" tabindex="0" data-index="${originalIndex}" data-stagger="${idx % 3}" data-color-variant="${colorVariant}">
                        ${mediaHTML}
                        <div class="tile-overlay">
                            <span class="overlay-year">${project.year}</span>
                            <div class="overlay-bottom">
                                <span class="overlay-client">${clientLabel}</span>
                                <div class="overlay-title">${titleLinesHTML}</div>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');

            // Re-fit overlay typography as media and fonts finish loading
            gridContainer.querySelectorAll('img').forEach(img => {
                if (img.complete) {
                    fitCardOverlays();
                } else {
                    img.addEventListener('load', fitCardOverlays, { once: true });
                }
            });
            gridContainer.querySelectorAll('video').forEach(vid => {
                vid.addEventListener('loadedmetadata', fitCardOverlays, { once: true });
            });
            requestAnimationFrame(() => {
                fitCardOverlays();
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(fitCardOverlays);
                }
            });
        }

        // Initial Render
        renderProjects('all');
        window.addEventListener('resize', fitCardOverlays);

        // Infinite Auto-Scroll + Click & Drag + Shift/Trackpad Wheel + 4-Corner Homography Skew
        let isDown = false;
        let prevX = 0;
        let downX = 0;
        let downY = 0;
        let maxDragDist = 0;
        let clickedCard = null;
        let hasCapture = false;
        let targetX = 0;
        let currentX = 0;
        let velocity = 0;
        let smoothShear = 0;
        const autoSpeed = 0.9; // Right-to-left drift speed

        if (carouselViewport && gridContainer) {
            carouselViewport.addEventListener('pointerdown', (e) => {
                if (e.button !== undefined && e.button !== 0) return;
                isDown = true;
                hasCapture = false;
                prevX = e.clientX;
                downX = e.clientX;
                downY = e.clientY;
                maxDragDist = 0;
                clickedCard = e.target.closest('.carousel-card');
                velocity = 0;
            });

            carouselViewport.addEventListener('pointermove', (e) => {
                if (!isDown) return;
                const dx = e.clientX - prevX;
                prevX = e.clientX;
                const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
                if (dist > maxDragDist) maxDragDist = dist;

                if (maxDragDist > 5 && !hasCapture) {
                    try {
                        carouselViewport.setPointerCapture(e.pointerId);
                        hasCapture = true;
                    } catch (err) {}
                }

                targetX += dx * 1.35;
                velocity = dx;
            });

            carouselViewport.addEventListener('pointerup', (e) => {
                if (!isDown) return;
                isDown = false;
                if (hasCapture) {
                    try { carouselViewport.releasePointerCapture(e.pointerId); } catch (err) {}
                    hasCapture = false;
                }
                if (maxDragDist <= 6 && clickedCard) {
                    const idx = Number(clickedCard.getAttribute('data-index'));
                    if (!Number.isNaN(idx)) {
                        openProjectModal(idx);
                    }
                }
                clickedCard = null;
            });

            carouselViewport.addEventListener('pointercancel', () => {
                isDown = false;
                hasCapture = false;
                clickedCard = null;
            });

            // Horizontal Trackpad Swipe (deltaX) + Shift & Scroll Wheel (shiftKey + deltaY)
            carouselViewport.addEventListener('wheel', (e) => {
                const isHorizontalTrackpad = Math.abs(e.deltaX) > Math.abs(e.deltaY);
                const isShiftWheel = e.shiftKey && e.deltaY !== 0;

                if (isHorizontalTrackpad || isShiftWheel) {
                    e.preventDefault();
                    const scrollDelta = isHorizontalTrackpad && e.deltaX !== 0 ? e.deltaX : e.deltaY;
                    targetX -= scrollDelta * 1.25;
                    velocity = -scrollDelta * 0.35;
                }
            }, { passive: false });

            function getOneSetWidth() {
                const cards = gridContainer.querySelectorAll('.carousel-card');
                if (cards.length <= setLength || setLength === 0) return 0;
                return cards[setLength].offsetLeft - cards[0].offsetLeft;
            }

            function tickCarousel() {
                const oneSetWidth = getOneSetWidth();
                if (!isDown) {
                    targetX -= autoSpeed;
                    targetX += velocity;
                    velocity *= 0.92;
                }
                if (oneSetWidth > 0) {
                    while (targetX <= -oneSetWidth) {
                        targetX += oneSetWidth;
                        currentX += oneSetWidth;
                    }
                    while (targetX > 0) {
                        targetX -= oneSetWidth;
                        currentX -= oneSetWidth;
                    }
                }
                const prevCurrent = currentX;
                currentX += (targetX - currentX) * 0.1;
                const delta = currentX - prevCurrent;

                const userVelocity = -(delta + autoSpeed);
                const targetShear = Math.max(-0.20, Math.min(0.20, userVelocity * 0.0085));
                smoothShear += (targetShear - smoothShear) * 0.18;

                gridContainer.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

                const cards = gridContainer.querySelectorAll('.carousel-card');
                if (Math.abs(smoothShear) > 0.002) {
                    const vw = window.innerWidth;
                    const updates = [];
                    cards.forEach(card => {
                        const approxLeft = card.offsetLeft + currentX;
                        const W = card.offsetWidth;
                        if (approxLeft + W < -400 || approxLeft > vw + 400) return;
                        const H = card.offsetHeight;
                        if (!W || !H) return;

                        const taper = H * Math.abs(smoothShear) * 0.9;
                        let dxR, dxL;
                        if (smoothShear >= 0) {
                            dxR = H * smoothShear;
                            dxL = dxR + taper;
                        } else {
                            dxL = H * smoothShear;
                            dxR = dxL - taper;
                        }

                        const k = W / Math.max(40, W - (dxL - dxR));
                        const m10 = (-k * dxL) / H;
                        const m13 = (1 - k) / H;
                        const m30 = k * dxL;
                        const m33 = k;

                        updates.push({
                            card,
                            matrix: `matrix3d(1,0,0,0, ${m10.toFixed(6)},1,0,${m13.toFixed(6)}, 0,0,1,0, ${m30.toFixed(2)},0,0,${m33.toFixed(5)})`
                        });
                    });
                    for (let i = 0; i < updates.length; i++) {
                        updates[i].card.style.transform = updates[i].matrix;
                    }
                } else {
                    cards.forEach(card => {
                        if (card.style.transform) card.style.transform = '';
                    });
                }

                requestAnimationFrame(tickCarousel);
            }
            requestAnimationFrame(tickCarousel);
        }

        // Filter Logic
        const filterButtons = document.querySelectorAll('.filter-btn');
        const worksSection = document.getElementById('works'); // Target for scroll

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                targetX = 0;
                currentX = 0;
                velocity = 0;
                renderProjects(filterValue);

                if (window.innerWidth < 1200 && worksSection) {
                    const offset = 100;
                    const top = worksSection.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        // Elements
        const heroSection = document.getElementById('hero');
        const stickyViewport = document.querySelector('.opening-sticky-viewport');
        const souuguiWordmark = document.getElementById('souugui-wordmark');
        const cyanLayer = document.getElementById('opening-cyan-layer');
        const orangeTagline = document.getElementById('opening-orange-tagline');
        const taglineText = document.getElementById('opening-tagline-text');
        const videoStage = document.getElementById('opening-video-stage');
        const videoFrame = document.getElementById('opening-video-frame');
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

        const portraitHeroQuery = window.matchMedia('(max-width: 1199px) and (orientation: portrait)');

        function updateOpeningScroll() {
            if (!heroSection) return;

            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const isPortraitHero = portraitHeroQuery.matches;

            // Use stickyViewport.offsetHeight (exact CSS 100vh in px) so totalScroll & revealHeight
            // match CSS 470vh and margin-top: -20vh to the exact pixel across mobile & desktop browsers
            const stickyVh = stickyViewport ? stickyViewport.offsetHeight : vh;
            const videoFrameH = videoFrame ? videoFrame.offsetHeight : stickyVh;
            const totalScroll = Math.max(1, heroSection.offsetHeight - stickyVh);

            // Reserve the final 20vh of #hero scroll for revealing the WORKS title in the bottom 20% of the screen
            const revealHeight = stickyVh * 0.20;
            const choreoScroll = Math.max(1, totalScroll - revealHeight);
            const p = clamp01(scrollY / choreoScroll);

            // Lift the orange banner by exactly revealHeight over the final 20vh so its bottom edge meets the top of WORKS flush
            const revealProgress = clamp01((scrollY - choreoScroll) / Math.max(1, revealHeight));
            const revealLiftedPx = revealProgress * revealHeight;

            // Stage 1A (0.00 -> 0.22)
            const s1Move = rangeProgress(p, 0.0, 0.22);

            // Stage 1B (0.18 -> 0.30): Wipe reveal of "animated and static storytelling"
            const s1Tagline = rangeProgress(p, 0.18, 0.30);
            if (taglineText) {
                const clipRight = (1 - s1Tagline) * 100;
                taglineText.style.clipPath = `inset(0 ${clipRight.toFixed(1)}% 0 0)`;
            }

            // Stage 2A (0.31 -> 0.45), Stage 2B (0.45 -> 0.55), Lock (0.55 -> 0.65), Stage 3A (0.65 -> 0.79)
            const s2a = rangeProgress(p, 0.31, 0.45);
            const s2b = rangeProgress(p, 0.45, 0.55);
            const s3a = rangeProgress(p, 0.65, 0.79);

            if (isPortraitHero) {
                // Portrait phone/tablet coordinates for the 2-line wordmark and square showreel:
                // - At p = 0.00: baseline of 'i' (60.53vw) aligns flush with bottom of screen (vh - 0.6053 * vw)
                // - At p = 0.22: top of 'uu' (7.33vw) aligns flush with top of screen (-0.0733 * vw),
                //   and baseline of 'i' (60.53vw - 7.33vw = 53.20vw) aligns with the bottom of the cyan shape
                const startWordmarkY = vh - 0.6202 * vw;
                const endWordmarkY = -0.0751 * vw;
                const stopYPx = Math.min(stickyVh * 0.62, 0.70 * vw);
                const lockY = Math.max(0, (stickyVh - videoFrameH) / 2);

                const groupShift2B = -(stopYPx - lockY) * s2b;
                const groupShift3A = -(lockY + videoFrameH) * s3a;
                const totalGroupShiftPx = groupShift2B + groupShift3A;

                if (cyanLayer) {
                    cyanLayer.style.transform = `translate3d(0, ${totalGroupShiftPx.toFixed(1)}px, 0)`;
                }

                if (souuguiWordmark) {
                    if (p <= 0.22) {
                        const curY = startWordmarkY * (1 - s1Move) + endWordmarkY * s1Move;
                        souuguiWordmark.style.transform = `translate3d(0, ${curY.toFixed(1)}px, 0)`;
                    } else {
                        const curY = endWordmarkY + totalGroupShiftPx;
                        souuguiWordmark.style.transform = `translate3d(0, ${curY.toFixed(1)}px, 0)`;
                    }
                }

                if (orangeTagline) {
                    if (p <= 0.22) {
                        const orangeY = stickyVh * (1 - s1Move);
                        orangeTagline.style.transform = `translate3d(0, ${orangeY.toFixed(1)}px, 0)`;
                    } else {
                        orangeTagline.style.transform = `translate3d(0, ${totalGroupShiftPx.toFixed(1)}px, 0)`;
                    }
                }

                if (videoStage) {
                    if (p <= 0.45) {
                        const curY = stickyVh * (1 - s2a) + stopYPx * s2a;
                        videoStage.style.transform = `translate3d(0, ${curY.toFixed(1)}px, 0)`;
                    } else if (p <= 0.55) {
                        const curY = stopYPx + groupShift2B;
                        videoStage.style.transform = `translate3d(0, ${curY.toFixed(1)}px, 0)`;
                    } else if (p <= 0.65) {
                        videoStage.style.transform = `translate3d(0, ${lockY.toFixed(1)}px, 0)`;
                    } else {
                        const curY = lockY + groupShift3A - revealLiftedPx;
                        videoStage.style.transform = `translate3d(0, ${curY.toFixed(1)}px, 0)`;
                    }
                }
            } else {
                // Desktop and landscape phone/tablet choreography
                // At 102vw wide, the v2 wordmark's rounded u bottoms are 22.76vw below its SVG top.
                // The straight u terminals sit 0.28vw above them: align those terminals to the orange edge.
                const wordmarkUBottomVw = 22.76;
                const wordmarkStraightUBottomVw = wordmarkUBottomVw - 0.28;
                const wordmarkSettledVw = 17.85 - wordmarkStraightUBottomVw;
                const groupUpVw = -26.8 * s2b;
                const groupUpVh = -100 * s3a;

                if (cyanLayer) {
                    cyanLayer.style.transform = `translate3d(0, calc(${groupUpVh.toFixed(2)}vh + ${groupUpVw.toFixed(2)}vw), 0)`;
                }

                if (souuguiWordmark) {
                    if (p <= 0.22) {
                        const vhPart = 101 * (1 - s1Move);
                        const vwPart = -wordmarkUBottomVw * (1 - s1Move) + wordmarkSettledVw * s1Move;
                        souuguiWordmark.style.transform = `translate3d(0, calc(${vhPart.toFixed(2)}vh + ${vwPart.toFixed(2)}vw), 0)`;
                    } else {
                        const vwPart = wordmarkSettledVw + groupUpVw;
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
                        videoStage.style.transform = 'translate3d(0, 0, 0)';
                    } else {
                        const vhPart = -100 * s3a;
                        videoStage.style.transform = `translate3d(0, calc(${vhPart.toFixed(2)}vh - ${revealLiftedPx.toFixed(1)}px), 0)`;
                    }
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
            // Appears when the ending position of the souugui wordmark animation is reached (p >= 0.21)
            // Becomes translucent only while the button's center sits over the visible video frame
            // and disappears when reaching the works section (scrollY >= totalScroll)
            if (skipWorksBtn) {
                const showSkipBtn = p >= 0.21 && scrollY < totalScroll;
                skipWorksBtn.classList.toggle('visible', showSkipBtn);
                let overVideo = false;
                if (showSkipBtn && videoFrame) {
                    const buttonRect = skipWorksBtn.getBoundingClientRect();
                    const videoRect = videoFrame.getBoundingClientRect();
                    const videoContentTop = videoRect.top + videoFrame.clientTop;
                    const buttonCenterX = (buttonRect.left + buttonRect.right) / 2;
                    const buttonCenterY = (buttonRect.top + buttonRect.bottom) / 2;
                    overVideo = buttonCenterX >= videoRect.left &&
                        buttonCenterX <= videoRect.right &&
                        buttonCenterY >= videoContentTop &&
                        buttonCenterY <= videoRect.bottom;
                }
                skipWorksBtn.classList.toggle('in-showreel', overVideo);
            }

            // Profile Modal Trigger & Mobile/Tablet Filter Reveal:
            // Show ONLY when the user has scrolled into the #works section body (past the bottom-20% WORKS wipe-in)
            const shouldShowWorksUI = scrollY >= totalScroll + stickyVh * 0.35;
            if (profileWrapper) {
                profileWrapper.classList.toggle('visible', shouldShowWorksUI);
            }
            if (filterCapsule) {
                filterCapsule.classList.toggle('visible', shouldShowWorksUI);
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
