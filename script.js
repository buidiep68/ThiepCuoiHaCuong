// ====== Global Config ======
const config = {
    brideName: 'Vũ Thị Hải Hà',
    groomName: 'Phạm Văn Cường',
    weddingDateISO: '2025-09-28T10:30:00+07:00', // Định dạng ISO với múi giờ
    ceremonyAddress: 'Thôn Hy Hà, xã Ngọc Lâm, tỉnh Hưng Yên',
    receptionAddress: 'Thôn Minh Thành, xã Hồng Minh, tỉnh Hưng Yên',
    mapQueryBride: 'Thôn Hy Hà, xã Ngọc Lâm, tỉnh Hưng Yên',
    mapQueryGroom: 'Thôn Minh Thành, xã Hồng Minh, tỉnh Hưng Yên',
    phones: { bride: 'tel:0376362912', groom: 'tel:0973908720' },
    formspreeEndpoint: '', // Ví dụ: 'https://formspree.io/f/xxxxxx' nếu dùng Formspree
    wishesEndpoint: '', // REST endpoint lưu Lời chúc (POST/GET). Bỏ trống để dùng localStorage
    heroImages: [
        'images/hero/hero1.jpg',
        'images/hero/hero2.jpg',
        'images/hero/hero3.jpg'
    ],
    heroAutoplayMs: 3000,
};

// ====== Global Functions ======
function initHeroCarousel() {
    const slider = document.getElementById('heroSlider');
    const dotsEl = document.getElementById('heroDots');
    if (!slider || !dotsEl) return;

    // Clear existing content
    dotsEl.innerHTML = '';

    const images = Array.isArray(config.heroImages) && config.heroImages.length ? config.heroImages : [];
    if (images.length === 0) return;

    let index = 0;
    let timer = null;
    const slidesCount = images.length;

    function update() {
        if (slider) {
            slider.style.transform = `translateX(-${index * 100}%)`;
        }
        const dots = dotsEl.querySelectorAll('.carousel__dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
        index = (i + slidesCount) % slidesCount;
        update();
        restart();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restart() {
        if (timer) clearInterval(timer);
        if (slidesCount > 1) timer = setInterval(next, config.heroAutoplayMs || 3000);
    }

    // Create dots
    images.forEach((src, idx) => {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ảnh ${idx + 1}`);
        dot.addEventListener('click', () => goTo(idx));
        dotsEl.appendChild(dot);
    });

    // Initialize with first image
    update();
    if (slidesCount > 1) restart();
}

document.addEventListener('DOMContentLoaded', () => {
    // Debug: Log mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('Mobile device detected:', isMobile);
    console.log('User agent:', navigator.userAgent);

    // URL params: ?guest=Tên%20bạn
    const url = new URL(window.location.href);
    const guestParam = url.searchParams.get('guest');

    // ====== Header/Nav ======
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
        document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));
    }

    // Smooth scroll for same-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const el = document.querySelector(targetId);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ====== Hero Carousel ======
    // Initialize carousel
    initHeroCarousel();

    // ====== Content binding ======
    document.getElementById('brideName')?.append();
    document.getElementById('groomName')?.append();
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText('brideName', config.brideName);
    setText('groomName', config.groomName);
    setText('brideNameCard', config.brideName);
    setText('groomNameCard', config.groomName);
    setText('ceremonyAddress', config.ceremonyAddress);
    setText('receptionAddress', config.receptionAddress);
    setText('footerNames', `${config.brideName} & ${config.groomName}`);
    const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Thêm tên khách mời nếu có
    if (guestParam) {
        const overline = document.querySelector('.hero .overline');
        if (overline) overline.textContent = `Trân trọng kính mời: ${decodeURIComponent(guestParam)}`;
    }

    // ====== Countdown ======
    const weddingDate = new Date(config.weddingDateISO);
    const dd = document.getElementById('dd');
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    function updateCountdown() {
        const now = new Date();
        const diffMs = weddingDate.getTime() - now.getTime();
        if (diffMs <= 0) {
            if (dd) dd.textContent = '00';
            if (hh) hh.textContent = '00';
            if (mm) mm.textContent = '00';
            if (ss) ss.textContent = '00';
            return;
        }
        const totalSec = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;
        if (dd) dd.textContent = String(days).padStart(2, '0');
        if (hh) hh.textContent = String(hours).padStart(2, '0');
        if (mm) mm.textContent = String(minutes).padStart(2, '0');
        if (ss) ss.textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Cập nhật text ngày cưới hiển thị
    const dateText = document.getElementById('weddingDateText');
    try {
        const dateObj = new Date(config.weddingDateISO);
        const weekday = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][dateObj.getDay()];
        const ddn = String(dateObj.getDate()).padStart(2, '0');
        const mon = String(dateObj.getMonth() + 1).padStart(2, '0');
        const h = String(dateObj.getHours()).padStart(2, '0');
        const m = String(dateObj.getMinutes()).padStart(2, '0');
        if (dateText) dateText.textContent = `${weekday}, ${ddn}/${mon}/${dateObj.getFullYear()} • ${h}:${m}`;
    } catch { }

    // ====== Add to Calendar (ICS) ======
    document.getElementById('addToCalendar')?.addEventListener('click', () => {
        const dtStart = new Date(config.weddingDateISO);
        const dtEnd = new Date(dtStart.getTime() + 2 * 60 * 60 * 1000); // +2h
        function toICSDate(d) {
            const pad = n => String(n).padStart(2, '0');
            const yyyy = d.getUTCFullYear();
            const mm = pad(d.getUTCMonth() + 1);
            const dd = pad(d.getUTCDate());
            const hh = pad(d.getUTCHours());
            const mi = pad(d.getUTCMinutes());
            const ss = pad(d.getUTCSeconds());
            return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
        }
        const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nDTSTAMP:${toICSDate(new Date())}\nDTSTART:${toICSDate(dtStart)}\nDTEND:${toICSDate(dtEnd)}\nSUMMARY:Đám cưới ${config.brideName} & ${config.groomName}\nLOCATION:${config.receptionAddress}\nDESCRIPTION:Mong bạn đến chung vui!\nEND:VEVENT\nEND:VCALENDAR`;
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wedding-invite.ics';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
    });

    // ====== Maps & Call buttons ======
    document.getElementById('openMapsBride')?.addEventListener('click', () => {
        const q = encodeURIComponent(config.mapQueryBride || config.ceremonyAddress);
        window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
    });
    document.getElementById('openMapsGroom')?.addEventListener('click', () => {
        const q = encodeURIComponent(config.mapQueryGroom || config.receptionAddress);
        window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
    });
    document.getElementById('callBride')?.addEventListener('click', () => window.location.href = config.phones.bride);
    document.getElementById('callGroom')?.addEventListener('click', () => window.location.href = config.phones.groom);

    // Set iframe maps
    const brideFrame = document.getElementById('mapFrameBride');
    const groomFrame = document.getElementById('mapFrameGroom');
    if (brideFrame) brideFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(config.mapQueryBride || config.ceremonyAddress)}&z=15&output=embed`;
    if (groomFrame) groomFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(config.mapQueryGroom || config.receptionAddress)}&z=15&output=embed`;

    // ====== Lazy Loading Animation ======
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, observerOptions);

        // Observe all gallery images
        document.querySelectorAll('.gallery__img').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers - just show all images
        document.querySelectorAll('.gallery__img').forEach(img => {
            img.classList.add('loaded');
        });
    }

    // ====== Image Error Handling ======
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            console.log('Image failed to load:', this.src);
            // Add fallback or retry logic here if needed
        });

        img.addEventListener('load', function () {
            console.log('Image loaded successfully:', this.src);
        });
    });

    // ====== Gallery Lightbox ======
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    document.querySelectorAll('.gallery__img').forEach(img => {
        // Click to open lightbox
        img.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightboxImg.src = img.getAttribute('src');
                lightbox.classList.add('show');
            }
        });

        // Touch feedback for mobile
        img.addEventListener('touchstart', () => {
            img.style.transform = 'translateY(-4px) scale(0.98)';
        });

        img.addEventListener('touchend', () => {
            img.style.transform = '';
        });

        // Keyboard accessibility
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                img.click();
            }
        });

        // Make images focusable
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Xem ảnh phóng to');
    });
    // Enable lightbox for any element with data-lightbox (e.g., QR images)
    document.querySelectorAll('[data-lightbox]').forEach(el => {
        el.addEventListener('click', () => {
            const src = el.getAttribute('src') || el.getAttribute('data-src');
            if (src && lightbox && lightboxImg) {
                lightboxImg.src = src;
                lightbox.classList.add('show');
            }
        });
    });
    document.getElementById('lightboxClose')?.addEventListener('click', () => lightbox?.classList.remove('show'));
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('show'); });

    // ====== RSVP Form ======
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpStatus = document.getElementById('rsvpStatus');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const payload = Object.fromEntries(formData.entries());
            try {
                if (config.formspreeEndpoint) {
                    const res = await fetch(config.formspreeEndpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: formData });
                    if (!res.ok) throw new Error('Gửi thất bại');
                } else {
                    // Lưu localStorage nếu không cấu hình Formspree
                    const all = JSON.parse(localStorage.getItem('rsvps') || '[]');
                    all.push({ ...payload, time: new Date().toISOString() });
                    localStorage.setItem('rsvps', JSON.stringify(all));
                }
                rsvpForm.reset();
                if (rsvpStatus) rsvpStatus.textContent = 'Cảm ơn bạn! Chúng tôi đã ghi nhận thông tin.';
                setTimeout(() => { if (rsvpStatus) rsvpStatus.textContent = ''; }, 4000);
            } catch (err) {
                if (rsvpStatus) rsvpStatus.textContent = 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.';
            }
        });
    }

    // ====== Guestbook (localStorage) ======
    const wishForm = document.getElementById('wishForm');
    const wishesList = document.getElementById('wishesList');
    async function loadWishes() {
        if (!wishesList) return;
        wishesList.innerHTML = '';

        let items = [];
        if (config.wishesEndpoint) {
            try {
                const res = await fetch(config.wishesEndpoint, { headers: { 'Accept': 'application/json' } });
                if (res.ok) {
                    const data = await res.json();
                    // Kỳ vọng mảng [{name, message, time}]
                    items = Array.isArray(data) ? data : [];
                }
            } catch (_) { /* fallback phía dưới */ }
        }
        if (items.length === 0) {
            items = JSON.parse(localStorage.getItem('wishes') || '[]');
        }

        items.forEach(w => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="name">${escapeHtml(w.name)}</span>: <span>${escapeHtml(w.message)}</span>`;
            wishesList.appendChild(li);
        });
    }
    function escapeHtml(str) {
        return String(str)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }
    if (wishForm) {
        wishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('wishName').value.trim();
            const message = document.getElementById('wishMessage').value.trim();
            if (!name || !message) return;
            const item = { name, message, time: new Date().toISOString() };

            let savedRemote = false;
            if (config.wishesEndpoint) {
                try {
                    const res = await fetch(config.wishesEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(item)
                    });
                    savedRemote = res.ok;
                } catch (_) { savedRemote = false; }
            }

            if (!savedRemote) {
                const list = JSON.parse(localStorage.getItem('wishes') || '[]');
                list.unshift(item);
                localStorage.setItem('wishes', JSON.stringify(list.slice(0, 200)));
            }

            wishForm.reset();
            loadWishes();
        });
        loadWishes();
    }

    // ====== Copy to clipboard for bank numbers ======
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetSel = btn.getAttribute('data-copy');
            if (!targetSel) return;
            const el = document.querySelector(targetSel);
            if (!el) return;
            const text = el.textContent.trim();
            try {
                await navigator.clipboard.writeText(text);
                btn.textContent = 'Đã sao chép';
                setTimeout(() => btn.textContent = 'Sao chép', 1500);
            } catch (_) {
                const ta = document.createElement('textarea');
                ta.value = text; document.body.appendChild(ta); ta.select();
                document.execCommand('copy'); ta.remove();
            }
        });
    });

    // ====== Music control ======
    const audio = document.getElementById('bgm');
    const musicToggle = document.getElementById('musicToggle');
    let userInteracted = false;
    function setMusicState(playing) {
        if (!musicToggle) return;
        musicToggle.classList.toggle('paused', !playing);
        musicToggle.innerHTML = playing ? '<i class="ri-pause-line"></i>' : '<i class="ri-music-2-line"></i>';
    }
    function tryPlay() {
        if (!audio) return;
        audio.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    }
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(ev => {
        window.addEventListener(ev, () => { if (!userInteracted) { userInteracted = true; tryPlay(); } }, { once: true });
    });
    musicToggle?.addEventListener('click', () => {
        if (!audio) return;
        if (audio.paused) { audio.play(); setMusicState(true); } else { audio.pause(); setMusicState(false); }
    });


    // Expose for quick customization in console
    window.__INVITE_CONFIG__ = config;

    // Debug function to manually spawn hearts
    window.debugHearts = function () {
        const heartLayer = document.getElementById('heartLayer');
        if (!heartLayer) {
            console.log('❌ Heart layer not found!');
            return;
        }

        console.log('✅ Heart layer found:', heartLayer);
        console.log('Current heart count:', heartLayer.children.length);

        // Force spawn a heart
        const heart = document.createElement('div');
        heart.className = 'fall-item heart';
        heart.textContent = '💖';
        heart.style.left = '50%';
        heart.style.top = '-50px';
        heart.style.position = 'absolute';
        heart.style.fontSize = '30px';
        heart.style.color = '#ff6b9d';
        heart.style.zIndex = '1000';
        heart.style.opacity = '1';
        heart.style.display = 'block';

        heartLayer.appendChild(heart);
        console.log('💖 Debug heart spawned!');

        // Remove after 5 seconds
        setTimeout(() => {
            heart.remove();
            console.log('💖 Debug heart removed');
        }, 5000);
    };

    // ====== Image Manager ======
    class ImageManager {
        constructor() {
            this.images = JSON.parse(localStorage.getItem('weddingImages') || '[]');
            this.currentTab = 'upload';
            this.init();
        }

        init() {
            this.bindEvents();
            this.renderImageGrid();
            this.updateAssignImages();
        }

        bindEvents() {
            // Toggle panel
            document.getElementById('imageManagerToggle')?.addEventListener('click', () => {
                this.togglePanel();
            });

            document.getElementById('imageManagerClose')?.addEventListener('click', () => {
                this.hidePanel();
            });

            // Tab switching
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.switchTab(e.target.dataset.tab);
                });
            });

            // File upload
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');

            if (uploadArea && fileInput) {
                uploadArea.addEventListener('click', () => fileInput.click());
                uploadArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    uploadArea.classList.add('dragover');
                });
                uploadArea.addEventListener('dragleave', () => {
                    uploadArea.classList.remove('dragover');
                });
                uploadArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    uploadArea.classList.remove('dragover');
                    this.handleFileDrop(e.dataTransfer.files);
                });

                fileInput.addEventListener('change', (e) => {
                    this.handleFileSelect(e.target.files);
                });
            }

            // Search and filter
            document.getElementById('searchImages')?.addEventListener('input', (e) => {
                this.filterImages(e.target.value);
            });

            document.getElementById('filterCategory')?.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.image-manager')) {
                    this.hidePanel();
                }
            });
        }

        togglePanel() {
            const panel = document.getElementById('imageManagerPanel');
            if (panel) {
                panel.classList.toggle('show');
                if (panel.classList.contains('show')) {
                    this.renderImageGrid();
                    this.updateAssignImages();
                }
            }
        }

        hidePanel() {
            const panel = document.getElementById('imageManagerPanel');
            if (panel) {
                panel.classList.remove('show');
            }
        }

        switchTab(tabName) {
            this.currentTab = tabName;

            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabName);
            });

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.toggle('active', content.id === tabName + 'Tab');
            });

            // Refresh content based on tab
            if (tabName === 'manage') {
                this.renderImageGrid();
            } else if (tabName === 'assign') {
                this.updateAssignImages();
            }
        }

        async handleFileSelect(files) {
            await this.processFiles(Array.from(files));
        }

        async handleFileDrop(files) {
            await this.processFiles(Array.from(files));
        }

        async processFiles(files) {
            const imageFiles = files.filter(file => file.type.startsWith('image/'));

            if (imageFiles.length === 0) {
                alert('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, GIF)');
                return;
            }

            for (const file of imageFiles) {
                try {
                    const imageData = await this.fileToImageData(file);
                    this.addImage(imageData);
                } catch (error) {
                    console.error('Error processing file:', error);
                    alert(`Lỗi xử lý file ${file.name}: ${error.message}`);
                }
            }

            this.renderImageGrid();
            this.updateAssignImages();
            this.showUploadPreview();

            // Thông báo thành công
            if (imageFiles.length > 0) {
                alert(`Đã upload thành công ${imageFiles.length} ảnh!`);
            }
        }

        fileToImageData(file) {
            return new Promise((resolve, reject) => {
                // Kiểm tra kích thước file (giới hạn 15MB)
                if (file.size > 15 * 1024 * 1024) {
                    reject(new Error('File quá lớn. Vui lòng chọn ảnh dưới 15MB'));
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        // Nén ảnh để giảm dung lượng
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        // Giới hạn kích thước tối đa
                        const maxWidth = 800;
                        const maxHeight = 600;

                        let { width, height } = img;
                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width *= ratio;
                            height *= ratio;
                        }

                        canvas.width = width;
                        canvas.height = height;

                        // Vẽ ảnh đã nén
                        ctx.drawImage(img, 0, 0, width, height);

                        // Chuyển thành Base64 với chất lượng thấp hơn
                        const compressedData = canvas.toDataURL('image/jpeg', 0.6);

                        resolve({
                            id: Date.now() + Math.random(),
                            name: file.name,
                            data: compressedData,
                            size: file.size,
                            type: file.type,
                            width: width,
                            height: height,
                            category: 'other',
                            uploadDate: new Date().toISOString()
                        });
                    };
                    img.onerror = reject;
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        addImage(imageData) {
            this.images.push(imageData);
            this.saveImages();
        }

        removeImage(imageId) {
            this.images = this.images.filter(img => img.id !== imageId);
            this.saveImages();
            this.renderImageGrid();
            this.updateAssignImages();
        }

        updateImageCategory(imageId, category) {
            const image = this.images.find(img => img.id === imageId);
            if (image) {
                image.category = category;
                this.saveImages();
                this.renderImageGrid();
                this.updateAssignImages();

                // Thông báo thành công
                const categoryNames = {
                    'hero': 'Banner chính',
                    'gallery': 'Album ảnh',
                    'couple': 'Ảnh cặp đôi',
                    'other': 'Chưa phân loại'
                };

                console.log(`Đã phân loại ảnh "${image.name}" vào danh mục "${categoryNames[category]}"`);
            }
        }

        saveImages() {
            try {
                // Kiểm tra dung lượng trước khi lưu
                const dataString = JSON.stringify(this.images);
                const dataSize = new Blob([dataString]).size;
                const maxSize = 2 * 1024 * 1024 * 1024; // 2GB limit

                if (dataSize > maxSize) {
                    // Nếu vượt quá, xóa ảnh cũ nhất
                    this.images.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
                    while (this.images.length > 0) {
                        this.images.shift(); // Xóa ảnh cũ nhất
                        const newDataString = JSON.stringify(this.images);
                        const newDataSize = new Blob([newDataString]).size;

                        if (newDataSize <= maxSize) {
                            break;
                        }
                    }

                    if (this.images.length === 0) {
                        alert('⚠️ Dung lượng localStorage đã đầy (2GB). Vui lòng xóa một số ảnh cũ trước khi upload ảnh mới.');
                        return;
                    }

                    alert(`⚠️ Dung lượng quá lớn (vượt quá 2GB). Đã tự động xóa một số ảnh cũ nhất.`);
                }

                localStorage.setItem('weddingImages', JSON.stringify(this.images));
                console.log(`Đã lưu ${this.images.length} ảnh. Dung lượng: ${(dataSize / 1024 / 1024).toFixed(2)}MB`);

            } catch (error) {
                console.error('Lỗi khi lưu ảnh:', error);
                if (error.name === 'QuotaExceededError') {
                    alert('❌ Dung lượng localStorage đã đầy (2GB)! Vui lòng xóa một số ảnh cũ trước khi upload ảnh mới.');
                } else {
                    alert(`❌ Lỗi khi lưu ảnh: ${error.message}`);
                }
            }
        }

        renderImageGrid() {
            const grid = document.getElementById('imageGrid');
            if (!grid) return;

            grid.innerHTML = '';

            this.images.forEach(image => {
                const item = document.createElement('div');
                item.className = 'image-item';
                item.innerHTML = `
                    <img src="${image.data}" alt="${image.name}" loading="lazy">
                    <div class="image-item__category">${image.category}</div>
                    <div class="image-item__overlay">
                        <button class="image-item__btn" onclick="imageManager.updateImageCategory('${image.id}', 'hero')">Hero</button>
                        <button class="image-item__btn" onclick="imageManager.updateImageCategory('${image.id}', 'gallery')">Gallery</button>
                        <button class="image-item__btn" onclick="imageManager.updateImageCategory('${image.id}', 'couple')">Couple</button>
                        <button class="image-item__btn delete" onclick="imageManager.removeImage('${image.id}')">Xóa</button>
                    </div>
                `;
                grid.appendChild(item);
            });
        }

        filterImages(searchTerm) {
            const items = document.querySelectorAll('.image-item');
            items.forEach(item => {
                const img = item.querySelector('img');
                const name = img.alt.toLowerCase();
                const matches = name.includes(searchTerm.toLowerCase());
                item.style.display = matches ? 'block' : 'none';
            });
        }

        filterByCategory(category) {
            const items = document.querySelectorAll('.image-item');
            items.forEach(item => {
                const categoryEl = item.querySelector('.image-item__category');
                const itemCategory = categoryEl.textContent;
                const matches = !category || itemCategory === category;
                item.style.display = matches ? 'block' : 'none';
            });
        }

        updateAssignImages() {
            const categories = ['hero', 'gallery', 'couple'];

            categories.forEach(category => {
                const container = document.getElementById(category + 'AssignImages');
                if (!container) return;

                const categoryImages = this.images.filter(img => img.category === category);

                if (categoryImages.length === 0) {
                    container.classList.add('empty');
                    container.innerHTML = '';
                    return;
                }

                container.classList.remove('empty');
                container.innerHTML = '';

                categoryImages.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image.data;
                    img.alt = image.name;
                    img.draggable = true;
                    img.dataset.imageId = image.id;

                    // Add drag and drop functionality
                    img.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', image.id);
                    });

                    container.appendChild(img);
                });
            });
        }

        showUploadPreview() {
            const preview = document.getElementById('uploadPreview');
            if (!preview) return;

            preview.innerHTML = '';
            const recentImages = this.images.slice(-6); // Show last 6 images

            recentImages.forEach(image => {
                const img = document.createElement('img');
                img.src = image.data;
                img.alt = image.name;
                preview.appendChild(img);
            });
        }

        getImagesByCategory(category) {
            return this.images.filter(img => img.category === category);
        }

        // Apply images to website sections
        applyImagesToWebsite() {
            // Update hero carousel
            const heroImages = this.getImagesByCategory('hero');
            if (heroImages.length > 0) {
                this.updateHeroCarousel(heroImages);
            }

            // Update gallery
            const galleryImages = this.getImagesByCategory('gallery');
            if (galleryImages.length > 0) {
                this.updateGallery(galleryImages);
            }

            // Update couple avatars
            const coupleImages = this.getImagesByCategory('couple');
            if (coupleImages.length >= 2) {
                this.updateCoupleAvatars(coupleImages);
            }
        }

        updateHeroCarousel(images) {
            // Update config with new images
            config.heroImages = images.map(img => img.data);

            // Reinitialize carousel
            this.reinitializeHeroCarousel();
        }

        updateGallery(images) {
            const galleryGrid = document.getElementById('galleryGrid');
            if (!galleryGrid) return;

            galleryGrid.innerHTML = '';
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = image.data;
                img.alt = image.name;
                img.className = 'gallery__img';
                img.addEventListener('click', () => this.openLightbox(image.data));
                galleryGrid.appendChild(img);
            });
        }

        updateCoupleAvatars(images) {
            const avatars = document.querySelectorAll('.avatar');
            if (avatars.length >= 2) {
                avatars[0].style.backgroundImage = `url('${images[0].data}')`;
                avatars[1].style.backgroundImage = `url('${images[1].data}')`;
            }
        }

        reinitializeHeroCarousel() {
            // Reinitialize the hero carousel with new images
            initHeroCarousel();
        }

        openLightbox(imageSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');

            if (lightbox && lightboxImg) {
                lightboxImg.src = imageSrc;
                lightbox.classList.add('show');
            }
        }
    }

    // Initialize image manager
    const imageManager = new ImageManager();

    // Global function for assign buttons
    window.assignImages = function (category) {
        const images = imageManager.getImagesByCategory(category);
        if (images.length > 0) {
            try {
                imageManager.applyImagesToWebsite();
                alert(`✅ Đã áp dụng ${images.length} ảnh vào ${category === 'hero' ? 'banner chính' : category === 'gallery' ? 'album ảnh' : 'ảnh cặp đôi'}`);

                // Refresh trang để xem thay đổi
                setTimeout(() => {
                    if (confirm('Bạn có muốn refresh trang để xem thay đổi không?')) {
                        location.reload();
                    }
                }, 1000);
            } catch (error) {
                console.error('Error applying images:', error);
                alert(`❌ Lỗi khi áp dụng ảnh: ${error.message}`);
            }
        } else {
            alert(`⚠️ Không có ảnh nào trong danh mục "${category}". Vui lòng upload ảnh và phân loại trước.`);
        }
    };

    // Global function to clear all images
    window.clearAllImages = function () {
        if (confirm('⚠️ Bạn có chắc chắn muốn xóa TẤT CẢ ảnh? Hành động này không thể hoàn tác!')) {
            try {
                localStorage.removeItem('weddingImages');
                imageManager.images = [];
                imageManager.renderImageGrid();
                imageManager.updateAssignImages();
                updateStorageInfo();
                alert('✅ Đã xóa tất cả ảnh!');
            } catch (error) {
                console.error('Error clearing images:', error);
                alert(`❌ Lỗi khi xóa ảnh: ${error.message}`);
            }
        }
    };

    // Function to update storage info
    function updateStorageInfo() {
        const storageInfo = document.getElementById('storageInfo');
        if (!storageInfo) return;

        try {
            const data = localStorage.getItem('weddingImages');
            if (!data) {
                storageInfo.textContent = '0 ảnh (0MB)';
                return;
            }

            const images = JSON.parse(data);
            const dataSize = new Blob([data]).size;
            const sizeMB = (dataSize / 1024 / 1024).toFixed(2);

            storageInfo.textContent = `${images.length} ảnh (${sizeMB}MB)`;
        } catch (error) {
            storageInfo.textContent = 'Lỗi tính toán';
        }
    }

    // Update storage info when switching to manage tab
    document.addEventListener('DOMContentLoaded', () => {
        // ... existing code ...

        // Add event listener for manage tab
        document.querySelector('[data-tab="manage"]')?.addEventListener('click', () => {
            setTimeout(updateStorageInfo, 100);
        });
    });

    // ====== Falling effects (petals, snow & hearts) ======
    (function initFallingEffects() {
        const petalLayer = document.getElementById('petalLayer');
        const snowLayer = document.getElementById('snowLayer');
        const heartLayer = document.getElementById('heartLayer');
        if (!petalLayer || !snowLayer || !heartLayer) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const rand = (min, max) => Math.random() * (max - min) + min;

        function spawnItem(layer, type) {
            const el = document.createElement('div');
            el.className = `fall-item ${type}`;
            el.style.left = rand(-5, 100) + 'vw';
            el.style.top = '-50px';
            el.style.position = 'absolute';
            el.style.zIndex = '100';
            el.style.opacity = '1';
            el.style.display = 'block';

            // Different sizes for different types
            let fontSize;
            let textContent;
            let animationDuration;

            if (type === 'snow') {
                fontSize = rand(10, 14);
                textContent = '✦';
                animationDuration = `${rand(8, 16)}s, ${rand(3, 6)}s`;
            } else if (type === 'heart') {
                fontSize = rand(20, 30);
                // Try different heart symbols for better compatibility
                const hearts = ['💖', '❤️', '💕', '💗', '♥️'];
                textContent = hearts[Math.floor(Math.random() * hearts.length)];
                animationDuration = `${rand(10, 18)}s, ${rand(4, 8)}s, ${rand(1, 2)}s`;
                console.log('Creating heart element:', el, 'with text:', textContent);
            } else { // petal
                fontSize = rand(10, 18);
                textContent = '❀';
                animationDuration = `${rand(8, 16)}s, ${rand(3, 6)}s`;
            }

            el.style.fontSize = fontSize + 'px';
            el.style.animationDuration = animationDuration;
            el.style.setProperty('--sway', `${rand(20, 40)}px`);
            el.textContent = textContent;

            // Force visibility
            el.style.color = '#ff6b9d';
            el.style.textShadow = '0 2px 8px rgba(255, 107, 157, 0.6)';

            layer.appendChild(el);
            el.addEventListener('animationend', () => el.remove());

            // Debug log for hearts
            if (type === 'heart') {
                console.log('Heart element added to DOM:', el);
                console.log('Heart layer children count:', layer.children.length);
            }
        }

        let petalCount = 0, snowCount = 0, heartCount = 0;
        const PETAL_MAX = 20;
        const SNOW_MAX = 18;
        const HEART_MAX = 15;

        setInterval(() => {
            if (document.hidden) return;
            if (petalCount < PETAL_MAX) { spawnItem(petalLayer, 'petal'); petalCount++; }
        }, 800);

        setInterval(() => {
            if (document.hidden) return;
            if (snowCount < SNOW_MAX) { spawnItem(snowLayer, 'snow'); snowCount++; }
        }, 1100);

        setInterval(() => {
            if (document.hidden) return;
            if (heartCount < HEART_MAX) {
                spawnItem(heartLayer, 'heart');
                heartCount++;
                console.log('💖 Heart spawned! Count:', heartCount);
            }
        }, 1500);

        // Gradually allow more by removing on end
        petalLayer.addEventListener('animationend', (e) => { if (e.target.classList.contains('petal')) petalCount = Math.max(0, petalCount - 1); });
        snowLayer.addEventListener('animationend', (e) => { if (e.target.classList.contains('snow')) snowCount = Math.max(0, snowCount - 1); });
        heartLayer.addEventListener('animationend', (e) => { if (e.target.classList.contains('heart')) heartCount = Math.max(0, heartCount - 1); });
    })();
}); 