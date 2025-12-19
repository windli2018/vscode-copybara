# Copybara Icon 说明

## 当前图标

我已创建了一个简单的 Copybara SVG 图标 (`media/copybara-icon.svg`),包含:
- 蓝色圆形背景 (Google 蓝色 #4285f4)
- 白色大写字母 "C" (代表 Copybara)
- 顶部的双向箭头 (代表代码转换和同步)

## 如果需要 PNG 格式

VSCode Marketplace 要求扩展图标必须是 PNG 格式。您需要将 SVG 转换为 PNG:

### 转换方法:

1. **使用在线工具**:
   - 访问 https://svgtopng.com/ 或类似网站
   - 上传 `media/copybara-icon.svg`
   - 导出为 128x128 PNG
   - 保存为 `media/copybara-icon.png`

2. **使用 Inkscape** (如果已安装):
   ```bash
   inkscape media/copybara-icon.svg --export-type=png --export-filename=media/copybara-icon.png -w 128 -h 128
   ```

3. **使用 ImageMagick**:
   ```bash
   convert -background none media/copybara-icon.svg -resize 128x128 media/copybara-icon.png
   ```

### 转换后更新配置

将 `package.json` 中的图标路径改为 PNG:

```json
{
  "icon": "media/copybara-icon.png",
  "contributes": {
    "languages": [{
      "icon": {
        "dark": "./media/copybara-icon.png",
        "light": "./media/copybara-icon.png"
      }
    }]
  }
}
```

## 替代方案

如果您有 Copybara 的官方 logo 或想要使用其他设计:
1. 将新图标保存为 `media/copybara-icon.png` (128x128 或更大,正方形)
2. 确保 `package.json` 中的路径正确

## 当前临时方案

目前配置使用 SVG 文件。如果在发布到 VSCode Marketplace 时遇到问题,请按照上述步骤转换为 PNG。
