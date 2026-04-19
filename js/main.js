/**
 * 首页脚本 - 主题切换
 */

function initTheme() {
    const savedTheme = localStorage.getItem('algoviz-theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('algoviz-theme', theme);
    
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '🌙' : '☀️';
        btn.style.background = theme === 'dark' ? '#1a1a2e' : '#ffffff';
        btn.style.borderColor = theme === 'dark' ? '#2d2d4a' : '#e2e8f0';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initAnimations();
});

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .algo-category, .ds-selector').forEach(function(el) {
        observer.observe(el);
    });
}
