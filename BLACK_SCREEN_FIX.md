# 🔧 黑屏问题诊断与修复

## ✅ 已完成的修复

### 1. 禁用烟花效果
- ❌ 移除了烟花 Canvas
- ❌ 隐藏了烟花提示文字
- ✅ 保留了气球效果

### 2. 配置更新
```javascript
// script.js 顶部配置
const ENABLE_FIREWORKS = false;  // 已禁用
const ENABLE_BALLOONS = true;    // 保留气球
```

---

## 🔍 背景黑屏问题诊断

### 第一步：测试背景是否正常

打开 `test-background.html` 文件：

**如果能看到彩色渐变背景 ✅**
→ 说明浏览器支持，问题在主页面，继续第二步

**如果仍然是黑屏 ❌**
→ 浏览器兼容性问题，查看"浏览器兼容性"部分

---

### 第二步：清除浏览器缓存

#### 方法1：强制刷新（最简单）
```
按 Ctrl + Shift + Delete
或
按 Ctrl + F5
```

#### 方法2：使用控制台
按 `F12` 打开开发者工具，在 Console 输入：
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload(true);
```

#### 方法3：手动清除
**Chrome/Edge:**
1. 按 `Ctrl + Shift + Delete`
2. 选择"缓存的图片和文件"
3. 时间范围选择"全部时间"
4. 点击"清除数据"

**Firefox:**
1. 按 `Ctrl + Shift + Delete`
2. 选择"缓存"
3. 点击"立即清除"

---

### 第三步：检查浏览器控制台

按 `F12` 打开开发者工具，查看：

#### Console（控制台）标签
查找错误信息：
```
❌ Failed to load resource: styles.css
❌ Uncaught ReferenceError
❌ CSS parse error
```

#### Network（网络）标签
1. 刷新页面 (`F5`)
2. 查找 `styles.css`
3. 检查状态码是否为 `200`
4. 如果是 `404` → CSS文件路径错误

#### Elements（元素）标签
1. 找到 `<div class="guide-overlay">`
2. 右键 → 检查
3. 在 Styles 面板查看：
   - `background` 属性是否存在
   - 是否有红色删除线（表示无效）

---

## 🌐 浏览器兼容性检查

### 检查您的浏览器版本

**最低要求：**
- Chrome/Edge: 88+
- Firefox: 87+
- Safari: 14+
- Opera: 74+

**查看浏览器版本：**
在地址栏输入：
- Chrome/Edge: `chrome://version`
- Firefox: `about:support`
- Safari: Safari → 关于 Safari

---

## 🛠️ 常见问题与解决方案

### 问题1：CSS文件未加载

**症状：** 页面完全无样式，文字堆叠

**解决：**
1. 检查文件结构：
```
day/
├── index.html
├── styles.css  ← 必须在同一目录
├── script.js
└── test-background.html
```

2. 检查 `index.html` 中的引用：
```html
<link rel="stylesheet" href="styles.css">
```

---

### 问题2：backdrop-filter 不支持

**症状：** 背景是彩色的，但毛玻璃效果无效

**检测：**
按 F12，在控制台输入：
```javascript
CSS.supports('backdrop-filter', 'blur(10px)');
```

**返回 false：** 浏览器不支持

**解决：** 升级浏览器或使用替代方案

---

### 问题3：动画被禁用

**症状：** 背景有颜色但不移动

**检查：**
- Windows 设置 → 辅助功能 → 显示 → 动画效果（确保已开启）
- Firefox: `about:config` → `layout.css.prefetch.enabled`

---

### 问题4：硬件加速问题

**症状：** 背景闪烁或显示错误

**解决：**
**Chrome/Edge:**
1. 设置 → 系统
2. 关闭"使用硬件加速模式"
3. 重启浏览器

**Firefox:**
1. 设置 → 常规
2. 性能 → 取消勾选"使用推荐的性能设置"
3. 取消勾选"使用硬件加速"

---

## 🔬 深度诊断

### 使用浏览器开发者工具

#### 1. 查看实际应用的样式

```javascript
// 在控制台运行
const overlay = document.getElementById('guideOverlay');
const styles = window.getComputedStyle(overlay);
console.log('Background:', styles.background);
console.log('Background-color:', styles.backgroundColor);
console.log('Display:', styles.display);
console.log('Z-index:', styles.zIndex);
console.log('Opacity:', styles.opacity);
console.log('Visibility:', styles.visibility);
```

#### 2. 强制应用背景

```javascript
// 在控制台运行
const overlay = document.getElementById('guideOverlay');
overlay.style.background = 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #ff6b9d)';
overlay.style.backgroundSize = '400% 400%';
```

如果这样能显示背景，说明CSS文件有问题。

---

## 🎨 替代背景方案

### 方案1：简化背景（兼容性最好）

在 `styles.css` 中找到 `.guide-overlay`，替换为：

```css
.guide-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 简化版背景 */
    background: #764ba2;  /* 纯色背景 */
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
```

### 方案2：静态渐变

```css
.guide-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 静态渐变（不移动） */
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #ff6b9d);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
```

### 方案3：图片背景

```css
.guide-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('background.jpg'); /* 需要准备图片 */
    background-size: cover;
    background-position: center;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
```

---

## 📱 移动端测试

如果在PC上黑屏，用手机访问：

1. 将文件上传到服务器或使用本地服务器
2. 在手机浏览器打开
3. 如果手机正常显示 → PC浏览器问题
4. 如果手机也黑屏 → 代码问题

---

## 🐛 逐步排查法

### 1. 最小化测试

创建 `minimal-test.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            background: linear-gradient(135deg, #667eea, #ff6b9d);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
    </style>
</head>
<body>
    <div>测试</div>
</body>
</html>
```

**能看到紫-粉渐变？**
✅ 是 → 浏览器支持，问题在代码
❌ 否 → 浏览器不支持渐变

### 2. 逐步添加功能

1. 先让纯色背景工作
2. 再添加渐变
3. 再添加动画
4. 最后添加其他元素

---

## 📊 诊断检查清单

打印此清单，逐项检查：

- [ ] 已清除浏览器缓存
- [ ] 已强制刷新页面 (Ctrl+F5)
- [ ] `styles.css` 文件存在且在正确位置
- [ ] 浏览器控制台无错误
- [ ] 浏览器版本符合要求
- [ ] `test-background.html` 显示正常
- [ ] 网络标签显示 CSS 加载成功
- [ ] Elements 标签中可以看到 `.guide-overlay`
- [ ] Computed styles 显示 background 属性
- [ ] 动画效果已启用（系统设置）

---

## 💡 快速修复建议

### 如果您现在就想看到效果：

1. **打开 `test-background.html`**
   - 这是一个简化版，肯定能看到彩色背景

2. **使用无痕模式**
   - 按 `Ctrl + Shift + N`
   - 在无痕窗口打开 `index.html`

3. **更换浏览器**
   - 下载最新版 Chrome
   - 用新浏览器打开

---

## 📞 仍然无法解决？

### 提供以下信息：

1. **浏览器信息：**
   - 浏览器名称和版本
   - 操作系统

2. **控制台信息：**
   - 按 F12 → Console 标签
   - 截图所有红色错误

3. **test-background.html 结果：**
   - 能看到彩色背景吗？
   - 截图

4. **Network 信息：**
   - F12 → Network 标签
   - 刷新页面
   - 截图 styles.css 的状态

---

## 🎯 临时解决方案

### 使用纯色背景（100%有效）

在 `styles.css` 第 85 行，将：
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #ff6b9d 100%);
```

改为：
```css
background: #764ba2; /* 深紫色纯色背景 */
```

**优点：** 绝对能显示，兼容所有浏览器
**缺点：** 失去渐变和动画效果

---

**请先尝试打开 `test-background.html`，然后告诉我结果！** 🔍

