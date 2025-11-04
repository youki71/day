# 💕 结婚纪念日网站

一个精美的结婚纪念日网站，记录你们的爱情故事，包含时间线、照片墙、视频展示和互动小游戏。

## ✨ 功能特点

### 1. 首页
- 🎬 精美的开场动画（爱心跳动效果）
- ⏰ 实时倒计时显示（从你们在一起的日子开始计算）
- 📅 显示年、天、小时、分钟、秒

### 2. 我们的故事
- 📖 时间线展示你们的重要时刻
- 🎯 包含：初次相遇、第一次约会、确定关系、求婚、结婚等里程碑
- ✏️ 可以自定义添加更多故事节点

### 3. 记忆珍藏
- 📷 **照片墙**：展示你们的甜蜜照片
- 🎬 **视频回忆**：上传和播放重要时刻的视频
- 🔄 标签页切换，支持照片和视频两种模式

### 4. 互动专区
包含三个有趣的小游戏：

#### ❤️ 爱情问答
- 测试你对TA的了解程度
- 5道精心设计的问题
- 完成后获得专属证书

#### 🎴 记忆配对
- 翻牌配对游戏
- 找出所有成对的爱心
- 记录步数和时间

#### 🧩 爱情拼图
- 数字滑动拼图
- 将数字按顺序排列（1-8）
- 挑战最少步数完成

### 5. 电子证书
- 🎓 完成游戏后自动生成精美证书
- 📊 显示游戏名称、完成时间、得分等信息
- 💾 支持下载保存（需集成 html2canvas 库）

## 🚀 使用方法

### 快速开始

1. 直接在浏览器中打开 `index.html` 文件即可
2. 无需安装任何依赖或服务器

### 自定义内容

#### 修改纪念日日期

在 `script.js` 文件的第 16 行修改：

```javascript
const startDate = new Date('2020-01-01 00:00:00').getTime();
```

将 `'2020-01-01 00:00:00'` 改为你们的纪念日日期。

#### 修改时间线故事

在 `index.html` 文件中找到 `<!-- 我们的故事 - 时间线 -->` 部分，修改或添加时间线节点：

```html
<div class="timeline-item" data-aos="fade-right">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">2020年1月1日</div>
        <h3>初次相遇</h3>
        <p>你们的故事...</p>
    </div>
</div>
```

#### 添加真实照片

在 `index.html` 中找到照片占位符，替换为真实照片：

```html
<div class="photo-item">
    <img src="你的照片路径.jpg" alt="照片描述">
</div>
```

或者使用 CSS 背景图片：

```html
<div class="photo-item" style="background-image: url('你的照片路径.jpg'); background-size: cover;"></div>
```

#### 修改游戏问题

在 `script.js` 中找到 `startQuizGame` 函数，修改问答题目：

```javascript
const questions = [
    {
        question: '你的问题？',
        options: ['选项A', '选项B', '选项C', '选项D'],
        correct: 0  // 正确答案的索引（0-3）
    },
    // 添加更多问题...
];
```

## 🎨 自定义样式

### 修改颜色主题

在 `styles.css` 文件开头的 `:root` 部分修改颜色变量：

```css
:root {
    --primary-color: #ff6b9d;      /* 主色调 */
    --secondary-color: #c44569;    /* 次要色调 */
    --accent-color: #feca57;       /* 强调色 */
    --bg-gradient-start: #ffeef8;  /* 背景渐变起始色 */
    --bg-gradient-end: #fff5f7;    /* 背景渐变结束色 */
}
```

## 📦 增强功能（可选）

### 实现真实的证书下载

1. 在 `index.html` 的 `<head>` 部分添加：

```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
```

2. 在 `script.js` 中的 `downloadCertificate` 函数取消注释：

```javascript
function downloadCertificate() {
    html2canvas(document.getElementById('certificate')).then(canvas => {
        const link = document.createElement('a');
        link.download = '爱情证书.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
```

### 添加背景音乐

在 `<body>` 标签后添加：

```html
<audio autoplay loop>
    <source src="你的音乐文件.mp3" type="audio/mpeg">
</audio>
```

### 添加粒子效果

可以使用 particles.js 库添加浪漫的粒子背景效果。

## 📱 响应式设计

网站已经过响应式设计优化，在以下设备上都能完美显示：
- 💻 桌面电脑
- 📱 平板电脑
- 📱 智能手机

## 🌟 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript** - 交互功能
- **无需框架** - 纯原生代码，轻量高效

## 💡 提示

1. **个性化**：建议根据你们的实际情况修改所有文本内容
2. **照片**：准备好你们的照片，替换占位符
3. **视频**：可以上传到视频平台（如 B站、YouTube），然后嵌入链接
4. **分享**：可以部署到 GitHub Pages、Netlify 等免费托管平台
5. **备份**：记得保存好源代码，这是珍贵的回忆

## 🎁 部署到网上

### 使用 GitHub Pages（免费）

1. 在 GitHub 创建新仓库
2. 上传所有文件（index.html, styles.css, script.js）
3. 在仓库设置中启用 GitHub Pages
4. 获得一个免费的网址，可以分享给家人朋友

### 使用 Netlify（免费）

1. 访问 netlify.com
2. 注册账号
3. 拖拽文件夹到网页上传
4. 自动生成网址

## 📝 许可

此项目完全免费使用，可以根据需要自由修改。

## 💖 祝福

愿你们的爱情如同这个网站，历久弥新，永远美好！

---

**制作日期**：2025年11月
**版本**：1.0
**作者**：为爱而生 💕

