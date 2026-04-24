// AI办公效率工具箱 - 主脚本

// ==================== 状态管理 ====================
let currentCategory = 'all';
let currentSearch = '';
let currentFilters = [];
let filteredTools = [];

// ==================== DOM元素 ====================
const toolsGrid = document.getElementById('tools-grid');
const modal = document.getElementById('tool-modal');
const modalBody = document.getElementById('modal-body');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchStats = document.getElementById('search-stats');
const emptyState = document.getElementById('empty-state');
const toolsCount = document.getElementById('tools-count');
const backToTop = document.getElementById('back-to-top');

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    initToolsCount();
    renderTools();
    initEventListeners();
    initBackToTop();
    initSearchFromURL();
});

// 初始化工具数量
function initToolsCount() {
    if (toolsCount) {
        toolsCount.textContent = toolsData.length;
    }
}

// ==================== 事件监听 ====================
function initEventListeners() {
    // 分类按钮
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setCategory(category);
        });
    });

    // 筛选标签
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            toggleFilter(filter, e.target);
        });
    });

    // 搜索输入
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            setSearch(e.target.value);
        }, 300));

        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('focused');
        });
    }

    // 清除搜索
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            clearSearch();
        });
    }

    // 弹窗关闭
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ==================== 分类筛选 ====================
function setCategory(category) {
    currentCategory = category;
    
    // 更新按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    renderTools();
    updateURL();
}

// ==================== 搜索功能 ====================
function setSearch(query) {
    currentSearch = query.trim().toLowerCase();
    
    // 显示/隐藏清除按钮
    if (searchClear) {
        searchClear.style.display = currentSearch ? 'block' : 'none';
    }
    
    renderTools();
    updateURL();
}

function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
    }
    setSearch('');
}

// ==================== 高级筛选 ====================
function toggleFilter(filter, element) {
    const index = currentFilters.indexOf(filter);
    
    if (index > -1) {
        currentFilters.splice(index, 1);
        element.classList.remove('active');
    } else {
        currentFilters.push(filter);
        element.classList.add('active');
    }
    
    renderTools();
}

function clearFilters() {
    currentFilters = [];
    currentCategory = 'all';
    currentSearch = '';
    
    // 重置UI
    document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    
    renderTools();
    updateURL();
}

// ==================== 工具筛选逻辑 ====================
function filterTools() {
    filteredTools = toolsData.filter(tool => {
        // 分类筛选
        if (currentCategory !== 'all' && tool.category !== currentCategory) {
            return false;
        }
        
        // 搜索筛选
        if (currentSearch) {
            const searchFields = [
                tool.name,
                tool.tagline,
                tool.categoryName,
                tool.bestFor,
                tool.myExperience,
                ...(tool.pros || []),
                ...(tool.cons || [])
            ].join(' ').toLowerCase();
            
            if (!searchFields.includes(currentSearch)) {
                return false;
            }
        }
        
        // 高级筛选
        for (const filter of currentFilters) {
            if (!matchesFilter(tool, filter)) {
                return false;
            }
        }
        
        return true;
    });
    
    return filteredTools;
}

function matchesFilter(tool, filter) {
    switch (filter) {
        case 'free':
            return tool.price && tool.price.includes('免费');
        case 'high-rated':
            return tool.rating >= 4.5;
        case 'domestic':
            // 国产工具特征
            const domesticKeywords = ['飞书', '钉钉', '腾讯', '阿里', '字节', '百度', '讯飞', 'WPS', '美图', '剪映', '千图', '稿定', 'ProcessOn', '墨刀', 'MasterGo', '即时设计'];
            return domesticKeywords.some(kw => tool.name.includes(kw)) || 
                   (tool.url && (tool.url.includes('.cn') || !tool.cons?.some(c => c.includes('翻墙'))));
        case 'nocode':
            return !tool.cons?.some(c => c.includes('代码') || c.includes('编程'));
        default:
            return true;
    }
}

// ==================== 渲染工具列表 ====================
function renderTools() {
    const tools = filterTools();
    
    // 更新统计
    if (searchStats) {
        if (currentSearch || currentFilters.length > 0 || currentCategory !== 'all') {
            searchStats.textContent = `找到 ${tools.length} 个工具`;
            searchStats.style.display = 'block';
        } else {
            searchStats.style.display = 'none';
        }
    }
    
    // 空状态
    if (tools.length === 0) {
        toolsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // 渲染工具卡片
    toolsGrid.innerHTML = tools.map(tool => createToolCard(tool)).join('');
    
    // 绑定卡片点击事件
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const toolId = parseInt(card.dataset.id);
            openModal(toolId);
        });
    });
}

function createToolCard(tool) {
    const ratingStars = '★'.repeat(Math.floor(tool.rating)) + (tool.rating % 1 >= 0.5 ? '½' : '');
    const priceClass = tool.price.includes('免费') ? 'price-free' : 'price-paid';
    
    // 处理图标：图片或emoji
    const iconHtml = tool.iconType === 'image' 
        ? `<img src="${tool.icon}" alt="${tool.name}logo" loading="lazy" onerror="this.style.display='none'; this.parentElement.textContent='🔧';">`
        : tool.icon;
    
    return `
        <article class="tool-card" data-id="${tool.id}" role="listitem" tabindex="0">
            <div class="tool-header">
                <div class="tool-icon">${iconHtml}</div>
                <div class="tool-meta">
                    <span class="tool-category">${tool.categoryName}</span>
                    <span class="tool-rating" title="评分: ${tool.rating}">${ratingStars} ${tool.rating}</span>
                </div>
            </div>
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-tagline">${tool.tagline}</p>
            <div class="tool-footer">
                <span class="tool-price ${priceClass}">${tool.price}</span>
                <span class="tool-arrow">→</span>
            </div>
        </article>
    `;
}

// ==================== 弹窗详情 ====================
function openModal(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    if (!tool) return;
    
    const ratingStars = '★'.repeat(Math.floor(tool.rating)) + '☆'.repeat(5 - Math.floor(tool.rating));
    
    // 处理弹窗图标
    const modalIconHtml = tool.iconType === 'image'
        ? `<img src="${tool.icon}" alt="${tool.name} logo" style="width: 64px; height: 64px; border-radius: 12px;" loading="lazy" onerror="this.style.display='none'; this.parentElement.textContent='🔧';">`
        : `<div style="font-size: 3rem;">${tool.icon}</div>`;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">${modalIconHtml}</div>
            <div class="modal-title-group">
                <h2 id="modal-title">${tool.name}</h2>
                <span class="modal-category">${tool.categoryName}</span>
            </div>
        </div>
        
        <div class="modal-rating-row">
            <span class="modal-rating">${ratingStars} ${tool.rating}分</span>
            <span class="modal-price">${tool.price}</span>
        </div>
        
        <p class="modal-tagline">${tool.tagline}</p>
        
        <div class="modal-section">
            <h3>✅ 优点</h3>
            <ul class="modal-list pros">
                ${tool.pros.map(pro => `<li>${pro}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>⚠️ 缺点</h3>
            <ul class="modal-list cons">
                ${tool.cons.map(con => `<li>${con}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>🎯 适合谁</h3>
            <p>${tool.bestFor}</p>
        </div>
        
        <div class="modal-section highlight">
            <h3>📝 我的使用体验</h3>
            <p>${tool.myExperience}</p>
        </div>
        
        <div class="modal-section">
            <h3>💡 使用技巧</h3>
            <p class="modal-tips">${tool.tips}</p>
        </div>
        
        <div class="modal-actions">
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                访问官网
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
            </a>
            <button class="btn-secondary" onclick="shareTool('${tool.name}')">
                分享工具
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ==================== 分享功能 ====================
function shareTool(toolName) {
    const shareData = {
        title: `${toolName} - AI办公效率工具箱`,
        text: `发现一个好用的AI工具：${toolName}，推荐给你！`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`).then(() => {
            showToast('链接已复制到剪贴板');
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ==================== URL管理 ====================
function updateURL() {
    const params = new URLSearchParams();
    
    if (currentCategory !== 'all') {
        params.set('category', currentCategory);
    }
    
    if (currentSearch) {
        params.set('search', currentSearch);
    }
    
    if (currentFilters.length > 0) {
        params.set('filters', currentFilters.join(','));
    }
    
    const newURL = params.toString() 
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
}

function initSearchFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    const category = params.get('category');
    if (category && categories[category]) {
        setCategory(category);
    }
    
    const search = params.get('search');
    if (search && searchInput) {
        searchInput.value = search;
        setSearch(search);
    }
    
    const filters = params.get('filters');
    if (filters) {
        filters.split(',').forEach(filter => {
            const element = document.querySelector(`[data-filter="${filter}"]`);
            if (element) {
                toggleFilter(filter, element);
            }
        });
    }
}

// ==================== 回到顶部 ====================
function initBackToTop() {
    if (!backToTop) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, 100));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== 工具函数 ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 全局暴露 ====================
window.clearFilters = clearFilters;
window.shareTool = shareTool;
