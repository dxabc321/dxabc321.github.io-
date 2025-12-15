// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换菜单图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
    
    // 点击导航链接后关闭移动菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // 恢复菜单图标
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // 2. 更新版权年份
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // 3. 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是页面内锚点链接
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 4. 表单提交处理（示例）
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 模拟表单提交
            alert(`感谢 ${name} 的留言！我们会尽快回复您。`);
            this.reset();
        });
    }
    
    // 5. 博客文章阅读时间估算
    function estimateReadingTime() {
        const articles = document.querySelectorAll('.blog-content');
        articles.forEach(article => {
            const text = article.textContent || article.innerText;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 假设平均阅读速度200字/分钟
            
            const timeElement = article.querySelector('.blog-meta span:nth-child(2)');
            if (timeElement) {
                timeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime}分钟阅读`;
            }
        });
    }
    
    // 初始化函数
    estimateReadingTime();
    
    // 6. 动态高亮当前页面导航
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightCurrentPage();
});