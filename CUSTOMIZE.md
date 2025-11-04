# 🎨 快速自定义指南

这是一份快速指南，帮助您轻松个性化您的结婚纪念日网站。

## 🔧 基础配置

### 1. 修改纪念日期

📍 位置：`script.js` 第 16 行

```javascript
// 将这个日期改成你们的纪念日
const startDate = new Date('2020-01-01 00:00:00').getTime();
```

**示例：**
- 如果你们是 2023年5月20日在一起的，改为：
  ```javascript
  const startDate = new Date('2023-05-20 00:00:00').getTime();
  ```

---

## 🎨 颜色主题

📍 位置：`styles.css` 第 7-22 行

```css
:root {
    --primary-color: #ff6b9d;      /* 主色：粉红色 */
    --secondary-color: #c44569;    /* 次要色：深粉色 */
    --accent-color: #feca57;       /* 强调色：金黄色 */
    --purple-accent: #a29bfe;      /* 紫色点缀 */
    --blue-accent: #74b9ff;        /* 蓝色点缀 */
}
```

### 流行配色方案：

**浪漫粉紫色（当前）**
```css
--primary-color: #ff6b9d;
--secondary-color: #c44569;
--purple-accent: #a29bfe;
```

**清新蓝绿色**
```css
--primary-color: #48dbfb;
--secondary-color: #0abde3;
--purple-accent: #1dd1a1;
```

**温暖橙红色**
```css
--primary-color: #ff6348;
--secondary-color: #ff4757;
--purple-accent: #ffa502;
```

**典雅紫金色**
```css
--primary-color: #a29bfe;
--secondary-color: #6c5ce7;
--purple-accent: #fdcb6e;
```

---

## 📝 修改时间线故事

📍 位置：`index.html` 第 88-134 行

找到 `<!-- 我们的故事 - 时间线 -->` 部分，每个故事节点格式如下：

```html
<div class="timeline-item" data-aos="fade-right">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">2020年1月1日</div>
        <h3>初次相遇</h3>
        <p>那是一个美好的开始，我们第一次相遇的那一刻...</p>
    </div>
</div>
```

### 如何添加新故事：

1. 复制整个 `<div class="timeline-item">...</div>` 块
2. 粘贴到时间线中合适的位置
3. 修改日期、标题和内容
4. 注意交替使用 `fade-right` 和 `fade-left`

**示例：**
```html
<div class="timeline-item" data-aos="fade-left">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">2021年7月7日</div>
        <h3>第一次旅行</h3>
        <p>我们一起去了海边，看日出日落，许下承诺...</p>
    </div>
</div>
```

---

## 📷 添加真实照片

### 方法 1：使用 img 标签（推荐）

📍 位置：`index.html` 第 137-171 行

将照片放在项目文件夹中（如创建 `images` 文件夹），然后修改：

```html
<!-- 原来的占位符 -->
<div class="photo-item">
    <div class="photo-placeholder">
        <span>📸</span>
        <p>第一次约会</p>
    </div>
</div>

<!-- 改为真实照片 -->
<div class="photo-item">
    <img src="images/first-date.jpg" alt="第一次约会" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### 方法 2：使用背景图片

```html
<div class="photo-item" style="background-image: url('images/wedding.jpg'); background-size: cover; background-position: center;">
</div>
```

---

## 🎯 修改游戏问题

📍 位置：`script.js` 第 78-100 行

找到 `startQuizGame` 函数中的 `questions` 数组：

```javascript
const questions = [
    {
        question: '我们第一次约会去了哪里？',
        options: ['电影院', '公园', '餐厅', '游乐园'],
        correct: 0  // 正确答案的索引（0-3）
    },
    // 添加更多问题...
];
```

### 添加新问题：

```javascript
{
    question: '我最喜欢的花是什么？',
    options: ['玫瑰', '百合', '郁金香', '向日葵'],
    correct: 2  // 郁金香是第3个选项，索引为2
},
```

---

## 🎬 添加视频

📍 位置：`index.html` 第 173-198 行

### 方法 1：嵌入本地视频

```html
<div class="video-item">
    <video controls style="width: 100%; height: 100%; object-fit: cover;">
        <source src="videos/wedding.mp4" type="video/mp4">
    </video>
</div>
```

### 方法 2：嵌入 YouTube/Bilibili 视频

```html
<div class="video-item">
    <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/你的视频ID" 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
```

---

## 🎵 添加背景音乐

📍 位置：`index.html` 在 `<body>` 标签后添加

```html
<body>
    <!-- 背景音乐 -->
    <audio id="bgMusic" loop>
        <source src="music/background.mp3" type="audio/mpeg">
    </audio>
    <button id="musicToggle" style="position: fixed; top: 100px; right: 20px; z-index: 9999;">
        🔊
    </button>

    <!-- 其他内容... -->
</body>
```

然后在 `script.js` 末尾添加：

```javascript
// 音乐控制
const music = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');
let isPlaying = false;

toggle.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        toggle.textContent = '🔇';
    } else {
        music.play();
        toggle.textContent = '🔊';
    }
    isPlaying = !isPlaying;
});
```

---

## 🌐 修改网站标题和图标

### 修改标题

📍 位置：`index.html` 第 6 行

```html
<title>我们的纪念日 💕</title>
<!-- 改为 -->
<title>小明❤️小红的爱情故事</title>
```

### 添加网站图标 (Favicon)

1. 准备一个 `favicon.ico` 或 `favicon.png` 文件
2. 放在项目根目录
3. 在 `<head>` 中添加：

```html
<link rel="icon" href="favicon.png" type="image/png">
```

---

## 💡 常见自定义

### 修改导航栏 Logo

📍 位置：`index.html` 第 26 行

```html
<div class="logo">💕 Our Love Story</div>
<!-- 改为 -->
<div class="logo">💑 小明 & 小红</div>
```

### 修改浮动爱心样式

📍 位置：`styles.css` 第 70-76 行

```css
.floating-heart {
    font-size: 2rem;        /* 修改大小 */
    opacity: 0.6;           /* 修改透明度 */
}
```

### 禁用浮动爱心

📍 位置：`index.html` 删除或注释第 10-21 行

```html
<!-- 
<div class="floating-hearts">
    ...
</div>
-->
```

---

## 📱 响应式调整

所有的响应式样式都在 `styles.css` 的末尾（从第 1400 行开始）。

如果想调整移动端显示，在 `@media (max-width: 768px)` 中修改。

---

## 🎁 部署到网上

### GitHub Pages（免费）

1. 在 GitHub 创建新仓库
2. 上传所有文件
3. 在仓库设置中启用 GitHub Pages
4. 选择 main 分支，保存
5. 几分钟后访问 `https://你的用户名.github.io/仓库名`

### Netlify（免费，更简单）

1. 访问 https://netlify.com
2. 注册账号
3. 点击 "Add new site" → "Deploy manually"
4. 拖拽整个文件夹到页面
5. 自动部署完成，获得网址

---

## ❓ 常见问题

**Q: 如何让开场动画更快消失？**
A: 修改 `script.js` 第 12 行的延时：
```javascript
setTimeout(() => {
    openingAnimation.classList.add('hidden');
    homeContent.style.opacity = '1';
}, 3000);  // 改为 1000 = 1秒，2000 = 2秒
```

**Q: 如何隐藏某个功能区？**
A: 在对应的 section 标签中添加 `style="display: none;"`

**Q: 照片显示不出来？**
A: 检查路径是否正确，确保照片文件名和路径大小写匹配。

---

## 💖 祝福

希望这份指南能帮助您创建一个完美的纪念网站！
如果遇到问题，可以参考 README.md 获取更多信息。

祝你们永远幸福！💕

