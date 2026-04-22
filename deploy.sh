#!/bin/bash
set -e
OWNER="yangqingtaobeijing"
REPO="vibe-showcase"
BASE_URL="https://raw.githubusercontent.com/${OWNER}/${REPO}/gh-pages"

echo "📦 构建项目..."
npm run build

echo "📥 拉取线上数据（线上数据优先）..."
for file in projects.json; do
  local_file="dist/data/${file}"
  remote_content=$(curl -sf "${BASE_URL}/data/${file}" 2>/dev/null || echo "")
  if [ -n "$remote_content" ] && [ "$remote_content" != "[]" ] && [ "$remote_content" != "{}" ]; then
    echo "$remote_content" > "$local_file"
    echo "  ✓ 使用线上 data/${file}"
  else
    echo "  - 线上 data/${file} 为空，保留本地构建产物"
  fi
done

echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
