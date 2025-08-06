

// 移动端菜单功能
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        // 移动端菜单切换
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            // 切换汉堡菜单动画
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // 点击菜单项时关闭移动端菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // 重置汉堡菜单动画
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });

        // 点击外部区域关闭移动端菜单
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

// 导航栏滚动效果
function initNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 移动端触摸优化
function initMobileTouch() {
    if ('ontouchstart' in window) {
        // 为移动端添加触摸反馈
        document.querySelectorAll('.service-card, .case-card, .news-card').forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }
}

// 轮播图功能
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 显示第一张幻灯片
    showSlide(0);

    // 每2秒切换一次
    setInterval(nextSlide, 2000);
}

// 初始化轮播图
if (document.querySelector('.hero-slider')) {
    initSlider();
}

// 滚动动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .case-card, .news-card, .stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 数字计数动画
function animateNumbers() {
    const statItems = document.querySelectorAll('.stat-item h3');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000; // 2秒动画
                const step = finalValue / (duration / 16); // 60fps
                let currentValue = 0;

                const timer = setInterval(() => {
                    currentValue += step;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : '');
                }, 16);

                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    statItems.forEach(item => {
        observer.observe(item);
    });
}

// 表单处理
function handleForm() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // 获取表单数据
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // 简单的表单验证
            if (!data.name || !data.email || !data.phone || !data.message) {
                alert('请填写所有必填字段');
                return;
            }

            // 模拟表单提交
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;

            // 模拟API调用
            setTimeout(() => {
                alert('感谢您的咨询！我们会尽快与您联系。');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initNavbarScroll();
    initMobileTouch();
    initNavigationHighlight();
    initSlider();
    initParticleSystem();

    // 动画和交互功能
    animateOnScroll();
    animateNumbers();



    // 其他功能
    createBackToTop();
    lazyLoadImages();
    mobileOptimizations();

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 返回顶部功能
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    `;

    document.body.appendChild(backToTop);

    // 滚动时显示/隐藏返回顶部按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // 点击返回顶部
    backToTop.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        window.scrollTo({
            top: 0,
            behavior: isMobile ? 'auto' : 'smooth'
        });
    });

    // 悬停效果（PC端）
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = '#2980b9';
        backToTop.style.transform = 'translateY(-2px)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = '#3498db';
        backToTop.style.transform = 'translateY(0)';
    });

    // 移动端触摸反馈
    if ('ontouchstart' in window) {
        backToTop.addEventListener('touchstart', () => {
            backToTop.style.background = '#2980b9';
            backToTop.style.transform = 'scale(0.95)';
        });

        backToTop.addEventListener('touchend', () => {
            backToTop.style.background = '#3498db';
            backToTop.style.transform = 'scale(1)';
        });
    }
}

// 初始化返回顶部功能
document.addEventListener('DOMContentLoaded', createBackToTop);

// 性能优化：图片懒加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 移动端优化功能
function mobileOptimizations() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // 移动端性能优化
        document.body.classList.add('mobile-device');

        // 减少动画复杂度
        const animatedElements = document.querySelectorAll('.service-card, .case-card, .news-card');
        animatedElements.forEach(element => {
            element.style.transition = 'transform 0.3s ease';
        });

        // 优化触摸体验
        document.querySelectorAll('button, .cta-button, .submit-btn').forEach(button => {
            button.style.minHeight = '44px'; // iOS推荐的最小触摸目标
        });

        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// 窗口大小改变时重新检测
window.addEventListener('resize', () => {
    mobileOptimizations();
});

// 初始化懒加载
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// 初始化移动端优化
document.addEventListener('DOMContentLoaded', mobileOptimizations);

// 导航栏高亮功能
function initNavigationHighlight() {
    const sections = [
        { id: 'home' },
        { id: 'services' },
        { id: 'cases' },
        { id: 'about' },
        { id: 'news' },
        { id: 'contact' }
    ];

    const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));

    // 节流函数，优化滚动性能
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100; // 偏移量，避免导航栏遮挡
        let currentSection = sections[0].id;

        // 找到当前可视区域对应的section
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id);
            if (section && section.offsetTop <= scrollPos) {
                currentSection = sections[i].id;
                break;
            }
        }

        // 更新导航链接高亮状态
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });


    }

    // 平滑滚动到指定section
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // 减去导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // 绑定导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.substring(1); // 移除#号

            // 移除所有active类
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // 添加active类到当前点击的链接
            this.classList.add('active');

            // 平滑滚动到目标section
            smoothScrollToSection(targetId);

            // 移动端：点击后关闭菜单
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.nav-toggle').classList.remove('active');
            }
        });
    });

    // 监听滚动事件，使用节流优化性能
    const throttledUpdate = throttle(updateActiveNavLink, 100);
    window.addEventListener('scroll', throttledUpdate);

    // 处理URL哈希变化
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && sections.find(section => section.id === hash)) {
            // 延迟执行，确保DOM已更新
            setTimeout(() => {
                smoothScrollToSection(hash);
                updateActiveNavLink();
            }, 100);
        }
    }

    // 监听URL哈希变化
    window.addEventListener('hashchange', handleHashChange);

    // 初始化时执行一次
    updateActiveNavLink();

    // 如果URL中有哈希，处理它
    if (window.location.hash) {
        handleHashChange();
    }
}

// 初始化导航栏高亮功能
document.addEventListener('DOMContentLoaded', initNavigationHighlight);

// ===== 导航栏滚动阴影 =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 数字增长动画 =====
function animateNumber(el, target, duration = 1200) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    function update() {
        start += step;
        if (start >= target) {
            el.textContent = target + '+';
        } else {
            el.textContent = start + '+';
            requestAnimationFrame(update);
        }
    }
    update();
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.stat-item h3').forEach(el => {
        const num = parseInt(el.textContent);
        animateNumber(el, num);
    });
});

// ===== 平滑滚动优化（锚点跳转） =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 粒子系统动画增强 =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.colors = [
            'rgba(255, 119, 198, 0.8)',  // 粉色
            'rgba(120, 219, 255, 0.8)',  // 蓝色
            'rgba(255, 255, 119, 0.8)',  // 黄色
            'rgba(255, 255, 255, 0.8)',  // 白色
            'rgba(255, 119, 255, 0.8)'   // 紫色
        ];
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 80; // 增加粒子数量
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // 更新脉冲
            particle.pulse += particle.pulseSpeed;

            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // 鼠标交互增强
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx * force * 0.002;
                particle.vy += dy * force * 0.002;
            }

            // 绘制粒子（带脉冲效果）
            const pulseSize = Math.max(0.5, particle.size + Math.sin(particle.pulse) * 2);
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('0.8)', `${0.6 + Math.sin(particle.pulse) * 0.2})`);
            this.ctx.fill();

            // 绘制发光效果
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('0.8)', '0.1)');
            this.ctx.fill();

            // 绘制连接线（增强版）
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 0.15 * (1 - distance / 120);
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();

                    // 添加彩色连接线
                    if (distance < 80) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = particle.color.replace('0.8)', `${opacity * 2})`);
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化粒子系统
function initParticleSystem() {
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
}

// ===== 其他原有交互和动画保持不变 ===== 