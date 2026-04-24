#!/bin/bash
# 更新域名脚本

OLD_DOMAIN="ai-box2026.github.io/ai-tools-nav"
NEW_DOMAIN="www.aitools.ren"

# 更新 index.html
sed -i '' "s|https://aiworktools.github.io/ai-tools-nav|https://$NEW_DOMAIN|g" index.html
sed -i '' "s|https://ai-box2026.github.io/ai-tools-nav|https://$NEW_DOMAIN|g" index.html

# 更新 sitemap.xml
sed -i '' "s|ai-box2026.github.io/ai-tools-nav|$NEW_DOMAIN|g" sitemap.xml

# 更新 robots.txt
sed -i '' "s|ai-box2026.github.io/ai-tools-nav|$NEW_DOMAIN|g" robots.txt

# 更新其他 HTML 文件
for file in *.html; do
    sed -i '' "s|https://aiworktools.github.io/ai-tools-nav|https://$NEW_DOMAIN|g" "$file"
    sed -i '' "s|https://ai-box2026.github.io/ai-tools-nav|https://$NEW_DOMAIN|g" "$file"
done

echo "域名更新完成！"
