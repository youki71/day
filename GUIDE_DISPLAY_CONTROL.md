# 🎯 引导页面显示控制说明

## 问题：打开页面没有看到引导页

### 原因
网站使用了 `localStorage` 来记录用户是否已经看过引导页面。如果您之前访问过并完成了引导，下次访问时会直接跳过，进入主页。

---

## ⚡ 快速解决方案

### 方法1：使用浏览器控制台（推荐）

1. 按 `F12` 打开浏览器开发者工具
2. 切换到 **Console（控制台）** 标签
3. 输入以下命令并按回车：

```javascript
localStorage.removeItem('hasSeenGuide');
location.reload();
```

✅ 页面会刷新并显示引导页面！

---

### 方法2：点击重新查看按钮

在网站右下角有一个 **粉色圆形按钮（❓）**

- 点击它可以随时重新查看引导页面
- 所有特效（气球、烟花）都会重新启动

---

### 方法3：使用浏览器的隐私模式

**Chrome/Edge:**
- 按 `Ctrl + Shift + N` 打开无痕窗口

**Firefox:**
- 按 `Ctrl + Shift + P` 打开隐私窗口

**Safari:**
- 按 `Command + Shift + N` 打开隐私窗口

在隐私模式下打开网站，每次都会显示引导页。

---

### 方法4：清除浏览器数据

**Chrome/Edge:**
1. 按 `Ctrl + Shift + Delete`
2. 选择"Cookie 和其他网站数据"
3. 点击"清除数据"

**Firefox:**
1. 按 `Ctrl + Shift + Delete`
2. 选择"Cookie"
3. 点击"立即清除"

---

## 🔧 永久配置选项

我已经在代码中添加了一个配置开关，您可以控制引导页的显示行为。

### 配置位置
📍 `script.js` 第 3 行

### 选项1：每次访问都显示引导页

```javascript
const ALWAYS_SHOW_GUIDE = true; // 每次都显示
```

**效果：**
- ✅ 每次打开网站都会显示引导页
- ✅ 适合展示、演示场景
- ❌ 用户可能觉得重复

---

### 选项2：只显示一次（默认）

```javascript
const ALWAYS_SHOW_GUIDE = false; // 只显示一次
```

**效果：**
- ✅ 首次访问显示引导页
- ✅ 再次访问直接进入主页
- ✅ 用户体验更好
- ✅ 可以通过 ❓ 按钮重新查看

---

## 📊 显示逻辑图

```
打开网站
    ↓
检查 localStorage 中的 hasSeenGuide
    ↓
┌─────────────────┬─────────────────┐
│  首次访问       │  再次访问       │
│  (null)         │  ('true')       │
└────┬────────────┴────┬────────────┘
     ↓                  ↓
显示引导页        ┌──────────────┐
     │            │ 检查配置     │
     │            └──┬───────┬───┘
     │               ↓       ↓
     │        ALWAYS_SHOW    直接进入
     │        = true         主页
     │               │
     └───────────────┘
                ↓
          显示引导页
```

---

## 🎮 用户控制方式

### 在引导页面时：

| 操作 | 效果 |
|------|------|
| 点击"跳过" | 关闭引导，进入主页 |
| 点击"继续" | 查看下一页 |
| 按 `ESC` | 关闭引导 |
| 按 `→` 或 `Enter` | 下一页 |
| 按 `←` | 上一页 |
| 点击进度点 | 跳转到指定页 |

### 在主页时：

| 操作 | 效果 |
|------|------|
| 点击右下角 ❓ | 重新打开引导页 |

---

## 🔍 开发者调试

### 查看 localStorage 状态

```javascript
// 查看是否已保存
console.log(localStorage.getItem('hasSeenGuide'));
// 输出: 'true' 或 null
```

### 手动设置状态

```javascript
// 标记为已看过
localStorage.setItem('hasSeenGuide', 'true');

// 标记为未看过
localStorage.removeItem('hasSeenGuide');
```

### 查看所有 localStorage 数据

```javascript
// 在控制台输入
console.table(localStorage);
```

---

## 📝 代码实现说明

### 初始化逻辑

```javascript
// 配置项
const ALWAYS_SHOW_GUIDE = false;

// 检查逻辑
const hasSeenGuide = localStorage.getItem('hasSeenGuide');

if (!hasSeenGuide || ALWAYS_SHOW_GUIDE) {
    // 显示引导页
    showGuideOverlay();
    initBalloons();
    initFireworks();
} else {
    // 隐藏引导页
    document.getElementById('guideOverlay').classList.add('hidden');
}
```

### 关闭引导时保存状态

```javascript
function closeGuide() {
    // 隐藏引导页
    guideOverlay.classList.add('hidden');
    
    // 停止特效
    stopBalloons();
    stopAutoFirework();
    
    // 保存状态，下次不再显示
    localStorage.setItem('hasSeenGuide', 'true');
}
```

### 重新查看引导

```javascript
function showGuideAgain() {
    // 显示引导页
    guideOverlay.classList.remove('hidden');
    
    // 重启特效
    initBalloons();
    initFireworks();
    
    // 注意：不会清除 localStorage，这样关闭后仍然不会再显示
}
```

---

## 🎨 自定义选项

### 1. 修改提示文字

如果想在首页添加"查看引导"链接：

```html
<!-- 在 index.html 中添加 -->
<button onclick="showGuideAgain()" style="position: fixed; top: 20px; right: 20px;">
    查看引导
</button>
```

### 2. 添加"不再显示"选项

在引导页面最后一页添加复选框：

```html
<label>
    <input type="checkbox" id="neverShowAgain">
    下次不再显示
</label>
```

修改 `closeGuide()` 函数：

```javascript
function closeGuide() {
    const neverShow = document.getElementById('neverShowAgain')?.checked;
    if (neverShow) {
        localStorage.setItem('hasSeenGuide', 'true');
    }
    // ... 其他代码
}
```

### 3. 设置过期时间

让引导页在一定时间后重新显示：

```javascript
function closeGuide() {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7); // 7天后过期
    
    localStorage.setItem('hasSeenGuide', 'true');
    localStorage.setItem('guideExpireDate', expireDate.toISOString());
}

// 检查时
const hasSeenGuide = localStorage.getItem('hasSeenGuide');
const expireDate = new Date(localStorage.getItem('guideExpireDate'));
const isExpired = expireDate < new Date();

if (!hasSeenGuide || isExpired) {
    showGuideOverlay();
}
```

---

## ❓ 常见问题

### Q1: 为什么我清除了 localStorage 还是看不到引导页？

**A:** 可能的原因：
1. 浏览器缓存问题，尝试强制刷新（`Ctrl + F5`）
2. 代码中 `ALWAYS_SHOW_GUIDE` 设置有误
3. 检查浏览器控制台是否有 JavaScript 错误

### Q2: 如何让特定用户看到引导页？

**A:** 可以在 URL 中添加参数：

```javascript
// 检查 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const forceGuide = urlParams.get('guide') === 'true';

if (!hasSeenGuide || ALWAYS_SHOW_GUIDE || forceGuide) {
    showGuideOverlay();
}
```

使用：`yoursite.com?guide=true`

### Q3: 右下角的 ❓ 按钮能隐藏吗？

**A:** 可以，在 `styles.css` 中添加：

```css
.show-guide-btn {
    display: none; /* 隐藏按钮 */
}
```

### Q4: 能否在移动端禁用引导页？

**A:** 可以添加设备检测：

```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!hasSeenGuide && !isMobile) {
    showGuideOverlay();
}
```

---

## 📚 相关文档

- `README.md` - 项目使用说明
- `CUSTOMIZE.md` - 内容自定义指南
- `GUIDE_CUSTOMIZATION.md` - 引导页面自定义
- `EFFECTS_GUIDE.md` - 特效说明
- `BUG_FIXES.md` - Bug 修复报告

---

## 💡 推荐配置

### 生产环境（分享给他人）
```javascript
const ALWAYS_SHOW_GUIDE = false; // 只显示一次
```
✅ 用户体验好，不会重复打扰

### 开发/演示环境
```javascript
const ALWAYS_SHOW_GUIDE = true; // 每次都显示
```
✅ 方便测试和展示

### 个人使用
```javascript
const ALWAYS_SHOW_GUIDE = false; // 只显示一次
// 需要时点击 ❓ 按钮重新查看
```
✅ 平衡体验和功能

---

**现在您可以完全控制引导页的显示了！** ✨

