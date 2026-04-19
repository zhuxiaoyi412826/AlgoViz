/**
 * 首页脚本
 */

// 主题管理
const ThemeManager = {
    STORAGE_KEY: 'algoviz-theme',
    
    init() {
        // 从 localStorage 读取或默认暗色主题
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.setTheme(savedTheme);
        
        // 绑定切换按钮
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    },
    
    setTheme(theme) {
        // 设置到 html 元素
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        console.log('Theme set to:', theme);
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        console.log('Toggle from', current, 'to', next);
        this.setTheme(next);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    initAnimations();
});

function initAnimations() {
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.card, .algo-category, .ds-selector').forEach(el => {
        observer.observe(el);
    });
}

// 平滑滚动到锚点
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
