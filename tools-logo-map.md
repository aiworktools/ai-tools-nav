# 工具Logo映射表

## 10个核心工具Logo（使用emoji作为临时方案）

| 工具名称 | 原emoji | 建议替换为 | 获取方式 |
|---------|---------|-----------|---------|
| 飞书妙记 | 🎙️ | 飞书Logo | 官网SVG |
| 通义听悟 | 👂 | 阿里/通义Logo | 官网SVG |
| 讯飞听见 | 🎧 | 讯飞Logo | 官网PNG |
| Kimi | 🌙 | Kimi Logo | 官网ICO转PNG |
| WPS AI | 📄 | WPS Logo | 官网ICO |
| 美图AI PPT | 🎨 | 美图Logo | 官网ICO |
| 文心一言 | 🧠 | 百度Logo | 官网ICO |
| 豆包 | 🫘 | 豆包Logo | 官网ICO |
| Notion AI | 📝 | Notion Logo | 官网ICO |
| Gamma | 🌟 | Gamma Logo | 官网SVG |

## 替代方案：使用高质量Icon库

### 方案A：使用Simple Icons
很多工具在 Simple Icons 上有SVG：
- https://simpleicons.org/?q=notion
- https://simpleicons.org/?q=baidu

### 方案B：使用官方Favicon转PNG
```bash
# 转换ICO到PNG
sips -s format png favicon.ico --out logo.png
```

### 方案C：使用CDN链接
- 飞书: https://cdn.jsdelivr.net/gh/alibaba/iconfont/...
- 阿里系: https://img.alicdn.com/...

## 推荐做法

由于批量下载logo存在：
1. 格式不统一（ICO/SVG/PNG）
2. 尺寸不一致
3. 版权问题

**建议**：
1. 先用emoji占位，保证功能完整
2. 逐个手动下载官方logo，统一处理成64x64 PNG
3. 或使用Iconfont的Symbol方式统一引入

## 快速实现

先用这个CSS统一emoji样式：
```css
.tool-icon {
    font-size: 2.5rem;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-radius: 12px;
}
```
