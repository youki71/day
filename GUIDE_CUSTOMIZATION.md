# 💝 引导页面自定义指南

本文档将帮助您自定义引导动画页面的内容，包括情话、说明和页面数量。

## 📖 引导页面结构

引导页面共有 **5 页**：
1. **欢迎页** - 介绍网站
2. **情话页 1** - 第一句情话
3. **情话页 2** - 第二句情话
4. **情话页 3** - 第三句情话
5. **使用说明页** - 网站功能介绍

---

## ✏️ 修改情话内容

### 修改现有情话

📍 位置：`index.html` 第 35-113 行

找到对应的情话页面，修改 `<p class="guide-love-text">` 中的内容：

#### 情话页 1（第 2 页）

```html
<p class="guide-love-text fade-in-up">
    遇见你的那一刻<br>
    我就知道<br>
    余生的所有惊喜<br>
    都是为你而准备
</p>
```

**替换示例：**
```html
<p class="guide-love-text fade-in-up">
    你是我的星辰<br>
    照亮我的黑夜<br>
    你是我的春天<br>
    温暖我的心房
</p>
```

#### 情话页 2（第 3 页）

```html
<p class="guide-love-text fade-in-up">
    我想和你一起<br>
    看春天的花开<br>
    夏天的海浪<br>
    秋天的落叶<br>
    冬天的雪花<br>
    以及余生的每一天
</p>
```

#### 情话页 3（第 4 页）

```html
<p class="guide-love-text fade-in-up">
    在茫茫人海中<br>
    我找到了你<br>
    这是我的万幸<br>
    也是我的宿命<br>
    <br>
    从此<br>
    我的世界因你而精彩
</p>
```

**提示：**
- 使用 `<br>` 标签换行
- 保持文字简洁，每行不超过 15 个字
- 可以添加空行 `<br>` 来增加段落间距

---

## ➕ 添加更多情话页面

如果您想添加更多情话页面，请按以下步骤操作：

### 步骤 1：在 HTML 中添加新页面

📍 位置：`index.html` 在第 5 页（说明页）**之前**插入

```html
<!-- 页面4：情话页4（新增）-->
<div class="guide-page" data-page="4">
    <div class="guide-content">
        <div class="guide-icon animate-rotate">💝</div>
        <h2 class="guide-quote fade-in">"</h2>
        <p class="guide-love-text fade-in-up">
            你的新情话内容<br>
            可以是诗句<br>
            也可以是真情告白
        </p>
        <h2 class="guide-quote-end fade-in">"</h2>
        <button class="guide-btn fade-in-up delay-2" onclick="nextGuidePage()">
            继续 →
        </button>
    </div>
    <div class="guide-progress">
        <span class="progress-dot"></span>
        <span class="progress-dot"></span>
        <span class="progress-dot"></span>
        <span class="progress-dot active"></span>
        <span class="progress-dot"></span>
        <span class="progress-dot"></span> <!-- 新增进度点 -->
    </div>
</div>
```

### 步骤 2：更新页面编号

添加新页面后，需要更新后续页面的 `data-page` 编号：
- 如果在第 4 页位置插入，原来的第 4 页变成第 5 页
- 原来的第 5 页（说明页）变成第 6 页

### 步骤 3：更新所有进度指示器

在**每个页面**的 `guide-progress` 中添加新的进度点：

```html
<div class="guide-progress">
    <span class="progress-dot"></span>
    <span class="progress-dot"></span>
    <span class="progress-dot"></span>
    <span class="progress-dot"></span>
    <span class="progress-dot"></span>
    <span class="progress-dot"></span> <!-- 新增 -->
</div>
```

### 步骤 4：更新 JavaScript 总页数

📍 位置：`script.js` 第 23 行

```javascript
const totalGuidePages = 5;  // 改为新的总页数
```

**示例：** 如果添加了 1 页，改为：
```javascript
const totalGuidePages = 6;
```

---

## 🎨 修改图标和动画

每个页面都有一个动画图标，您可以自定义：

### 可用图标示例

```
💕 💖 💗 💝 💓 💞 💘 ❤️ 💜 💙 💚 💛 🧡
🌹 🌺 🌸 🌼 🌻 🌷 
⭐ ✨ 💫 🌟 
🎈 🎁 🎀 
```

### 可用动画类

```html
<!-- 放大缩小 -->
<div class="guide-icon animate-scale">💕</div>

<!-- 心跳 -->
<div class="guide-icon animate-heart">❤️</div>

<!-- 脉冲发光 -->
<div class="guide-icon animate-pulse">💖</div>

<!-- 3D 旋转 -->
<div class="guide-icon animate-rotate">💝</div>

<!-- 上下弹跳 -->
<div class="guide-icon animate-bounce">✨</div>
```

---

## 📄 修改欢迎页

📍 位置：`index.html` 第 13-33 行

```html
<h1 class="guide-title fade-in-up">欢迎来到我们的爱情故事</h1>
<p class="guide-subtitle fade-in-up delay-1">Welcome to Our Love Story</p>
<div class="guide-text fade-in-up delay-2">
    <p>这里珍藏着我们最美好的回忆</p>
    <p>每一个瞬间，都值得被铭记</p>
</div>
```

**自定义示例：**
```html
<h1 class="guide-title fade-in-up">小明 ❤️ 小红的爱情故事</h1>
<p class="guide-subtitle fade-in-up delay-1">Our Sweet Love Journey</p>
<div class="guide-text fade-in-up delay-2">
    <p>从 2020.01.01 开始</p>
    <p>我们的故事永不落幕</p>
</div>
```

---

## 📋 修改使用说明

📍 位置：`index.html` 第 115-148 行

修改说明页的功能介绍：

```html
<div class="instruction-item">
    <span class="instruction-icon">🏠</span>
    <p><strong>首页</strong>：查看我们在一起的时间倒计时</p>
</div>
```

您可以：
- 修改图标
- 修改功能名称
- 修改功能描述
- 添加或删除功能说明项

---

## 🎨 修改引导页面颜色

📍 位置：`styles.css` 第 79-87 行

```css
.guide-overlay {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    background-size: 400% 400%;
    animation: gradientMove 15s ease infinite;
}
```

### 配色方案推荐：

**浪漫粉紫色（当前）**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
```

**温暖橙红色**
```css
background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #f093fb 100%);
```

**清新蓝绿色**
```css
background: linear-gradient(135deg, #48dbfb 0%, #0abde3 50%, #00d2d3 100%);
```

**优雅紫金色**
```css
background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 50%, #fdcb6e 100%);
```

---

## ⚙️ 高级设置

### 关闭本地存储（每次都显示引导页面）

📍 位置：`script.js` 第 89-95 行

**注释掉**这一行：
```javascript
// localStorage.setItem('hasSeenGuide', 'true');
```

### 修改页面切换动画时间

📍 位置：`script.js` 第 37-42 行

```javascript
setTimeout(() => {
    currentPage.classList.remove('active', 'leaving');
    nextPage.classList.add('active');
    currentGuidePage++;
    updateProgressDots();
}, 300);  // 改为 500 = 0.5秒，1000 = 1秒
```

### 修改文字淡入延迟

📍 位置：`index.html` 修改 class

```html
<!-- delay-1 = 0.2秒延迟 -->
<p class="guide-subtitle fade-in-up delay-1">文字内容</p>

<!-- delay-2 = 0.4秒延迟 -->
<div class="guide-text fade-in-up delay-2">文字内容</div>

<!-- delay-3 = 0.6秒延迟 -->
<button class="guide-btn fade-in-up delay-3">按钮</button>
```

---

## 🔑 键盘快捷键

引导页面支持键盘操作：
- `→` 或 `Enter` - 下一页
- `←` - 上一页
- `Esc` - 关闭引导页面

---

## 💡 创意建议

### 1. 主题化情话
- **春夏秋冬主题**：每页对应一个季节
- **时间线主题**：按你们的故事发展顺序
- **诗词主题**：使用经典诗句

### 2. 添加特殊页面
- **照片页**：插入一张特别的照片
- **视频页**：嵌入一段视频
- **倒计时页**：显示特殊日期倒计时

### 3. 互动元素
- 添加背景音乐
- 添加粒子效果
- 添加更多动画

---

## 📝 示例：完整的情话页面

```html
<!-- 情话页面模板 -->
<div class="guide-page" data-page="2">
    <div class="guide-content">
        <!-- 选择一个图标和动画 -->
        <div class="guide-icon animate-heart">❤️</div>
        
        <!-- 开始引号 -->
        <h2 class="guide-quote fade-in">"</h2>
        
        <!-- 情话内容（建议 4-8 行）-->
        <p class="guide-love-text fade-in-up">
            你是我生命中<br>
            最美的意外<br>
            <br>
            从此以后<br>
            我的世界因你而精彩
        </p>
        
        <!-- 结束引号 -->
        <h2 class="guide-quote-end fade-in">"</h2>
        
        <!-- 继续按钮 -->
        <button class="guide-btn fade-in-up delay-2" onclick="nextGuidePage()">
            继续 →
        </button>
    </div>
    
    <!-- 进度指示器（根据总页数调整点的数量）-->
    <div class="guide-progress">
        <span class="progress-dot"></span>
        <span class="progress-dot active"></span>
        <span class="progress-dot"></span>
        <span class="progress-dot"></span>
        <span class="progress-dot"></span>
    </div>
</div>
```

---

## ❓ 常见问题

**Q: 如何删除某一页？**
A: 删除对应的 `<div class="guide-page">` 块，更新后续页面编号和总页数。

**Q: 情话太长无法完全显示？**
A: 建议每页不超过 8 行，如果内容多可以分成多页。

**Q: 如何添加图片背景？**
A: 在 `.guide-page` 的 CSS 中添加 `background-image`。

**Q: 能否让某些用户跳过引导页面？**
A: 可以在 localStorage 中设置标记，或添加 URL 参数判断。

---

## 💝 写情话的小技巧

1. **真实**：写出你真实的感受
2. **具体**：用具体的场景和细节
3. **简洁**：每行 5-15 字最佳
4. **韵律**：注意节奏和押韵
5. **情感**：带着感情去写

**示例结构：**
```
第一句：表达感受
第二句：具体场景
第三句：对未来的期许
第四句：总结升华
```

---

祝您创建一个独一无二的爱情网站！💕

