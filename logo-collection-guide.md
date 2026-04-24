# 官方Logo收集指南

## 标准规格
- **尺寸**: 64x64px
- **格式**: PNG (透明背景)
- **命名**: 工具英文名小写，空格转连字符
  - 例: `feishu-minutes.png`, `kimi-ai.png`

## 10个核心工具Logo来源

### 1. 飞书妙记
- **官网**: https://www.feishu.cn/product/minutes
- **Logo来源**: 飞书主品牌logo
- **下载**: https://www.feishu.cn/static/images/favicon.ico
- **处理**: ICO转PNG，取飞书蓝绿色图标

### 2. 通义听悟
- **官网**: https://tingwu.aliyun.com
- **Logo来源**: 阿里云/通义品牌
- **下载**: 阿里云官网logo库
- **处理**: SVG转PNG

### 3. 讯飞听见
- **官网**: https://www.iflyrec.com
- **Logo来源**: 科大讯飞品牌
- **下载**: 官网favicon
- **处理**: ICO转PNG

### 4. Kimi
- **官网**: https://kimi.moonshot.cn
- **Logo来源**: 月之暗面品牌
- **下载**: 官网favicon
- **处理**: ICO转PNG，取月亮图标

### 5. WPS AI
- **官网**: https://www.wps.cn
- **Logo来源**: WPS品牌
- **下载**: https://www.wps.cn/favicon.ico
- **处理**: ICO转PNG，取红色W图标

### 6. 美图AI PPT
- **官网**: https://www.designkit.com/ppt/
- **Logo来源**: 美图设计室
- **下载**: 官网favicon
- **处理**: ICO转PNG

### 7. 文心一言
- **官网**: https://yiyan.baidu.com
- **Logo来源**: 百度品牌
- **下载**: https://www.baidu.com/favicon.ico
- **处理**: 取熊掌图标

### 8. 豆包
- **官网**: https://www.doubao.com
- **Logo来源**: 字节跳动/豆包
- **下载**: 官网favicon
- **处理**: ICO转PNG

### 9. Notion AI
- **官网**: https://www.notion.so
- **Logo来源**: Notion品牌
- **下载**: https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg
- **处理**: SVG转PNG（黑色N图标）

### 10. Gamma
- **官网**: https://gamma.app
- **Logo来源**: Gamma品牌
- **下载**: 官网favicon或SVG
- **处理**: 取G字母图标

## 批量处理命令

```bash
# 进入logo目录
cd logos

# 转换所有ICO到PNG (macOS)
for f in *.ico; do
  sips -s format png "$f" --out "${f%.ico}.png" 2>/dev/null
done

# 调整所有图片为64x64
for f in *.png; do
  sips -Z 64 "$f" 2>/dev/null
done

# 删除原始ICO
rm *.ico 2>/dev/null
```

## 手动下载步骤

1. 打开工具官网
2. 右键查看网页源代码
3. 搜索 `<link rel="icon"` 或 `<link rel="shortcut icon"`
4. 复制href地址
5. 用curl或浏览器下载
6. 用sips或在线工具转换为64x64 PNG

## 替代来源

如果官网下载困难，可用：
- **Simple Icons**: https://simpleicons.org/
- **WorldVectorLogo**: https://worldvectorlogo.com/
- **Iconfinder**: https://www.iconfinder.com/

## 质量检查

每个logo需要检查：
- [ ] 尺寸是否为64x64px
- [ ] 是否有透明背景
- [ ] 是否清晰可辨认
- [ ] 文件大小是否<20KB

## 更新代码

收集完成后，修改 `tools-data.js`:

```javascript
{
    id: 1,
    name: "飞书妙记",
    icon: "logos/feishu-minutes.png",  // 从emoji改为图片路径
    // ...其他字段
}
```

并添加CSS:

```css
.tool-icon img {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    object-fit: contain;
}
```
