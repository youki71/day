// ==================== 初始化 ====================
// 配置：是否每次都显示引导页面
const ALWAYS_SHOW_GUIDE = true; // 每次都显示引导页

// 配置：自动播放设置
const AUTO_PLAY_GUIDE = false; // 禁用自动播放，需要用户点击后才开始
const AUTO_PLAY_INTERVAL = 5000; // 自动切换间隔（毫秒），5000 = 5秒

// 配置：特效开关
const ENABLE_FIREWORKS = false; // 禁用烟花效果
const ENABLE_BALLOONS = true; // 保留气球效果

// 配置：背景音乐
const ENABLE_BACKGROUND_MUSIC = true; // 启用背景音乐
const BACKGROUND_MUSIC_URL = 'music.mp3'; // 背景音乐文件路径（请替换为您的音乐文件）

document.addEventListener('DOMContentLoaded', () => {
    // 检查是否已经看过引导页面
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    
    if (!hasSeenGuide || ALWAYS_SHOW_GUIDE) {
        // 显示引导页面
        showGuideOverlay();
        // 根据配置初始化特效
        if (ENABLE_BALLOONS) {
            initBalloons();
        }
        if (ENABLE_FIREWORKS) {
            initFireworks();
        }
        // 启动自动播放
        if (AUTO_PLAY_GUIDE) {
            startAutoPlay();
        }
    } else {
        // 隐藏引导页面，直接进入主页
        document.getElementById('guideOverlay').classList.add('hidden');
    }
    
    // 初始化引导页面控制
    initGuideControls();
    
    // 初始化背景音乐
    initBackgroundMusic();
    
    initOpeningAnimation();
    initCountdown();
    initNavigation();
    initTabs();
    initScrollAnimations();
});

// ==================== 引导页面控制 ====================
let currentGuidePage = 1;
const totalGuidePages = 7;
let autoPlayTimer = null;
let isAutoPlaying = false;

function showGuideOverlay() {
    document.getElementById('guideOverlay').classList.remove('hidden');
    // 预处理所有引导页的逐字结构，确保后续页正常逐字出现
    prepareTypingForAllPages();
    // 确保初始激活页立即进入逐字动画
    const initialActive = document.querySelector('.guide-page.active');
    initTypingForPage(initialActive);
}

// 自动播放功能
function startAutoPlay(forceStart = false) {
    // 如果不是强制启动，检查配置
    if (!forceStart && !AUTO_PLAY_GUIDE) return;
    stopAutoPlay(); // 先停止之前的
    isAutoPlaying = true;
    updateAutoPlayButton(); // 更新按钮状态
    // 基于当前页的逐字动画总时长进行动态调度
    scheduleAutoNext();
}

function stopAutoPlay() {
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }
    isAutoPlaying = false;
    updateAutoPlayButton(); // 更新按钮状态
}

function pauseAutoPlay() {
    stopAutoPlay();
}

function resumeAutoPlay() {
    if (AUTO_PLAY_GUIDE && !isAutoPlaying) {
        startAutoPlay();
    }
}

// 切换自动播放状态
function toggleAutoPlay() {
    const toggleBtn = document.getElementById('autoplayToggle');
    
    if (isAutoPlaying) {
        pauseAutoPlay();
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('paused');
        toggleBtn.querySelector('.play-icon').textContent = '▶';
    } else {
        resumeAutoPlay();
        toggleBtn.classList.remove('paused');
        toggleBtn.classList.add('playing');
        toggleBtn.querySelector('.play-icon').textContent = '⏸';
    }
}

// 更新自动播放按钮状态
function updateAutoPlayButton() {
    const toggleBtn = document.getElementById('autoplayToggle');
    if (!toggleBtn) return;
    
    if (isAutoPlaying) {
        toggleBtn.classList.remove('paused');
        toggleBtn.classList.add('playing');
        toggleBtn.querySelector('.play-icon').textContent = '⏸';
    } else {
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('paused');
        toggleBtn.querySelector('.play-icon').textContent = '▶';
    }
}

// ==================== 背景音乐控制 ====================
let backgroundMusic = null;
let isMusicPlaying = false;

function initBackgroundMusic() {
    if (ENABLE_BACKGROUND_MUSIC) {
        backgroundMusic = document.getElementById('backgroundMusic');
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3; // 设置音量为30%
        }
    }
}

function playBackgroundMusic() {
    if (backgroundMusic && ENABLE_BACKGROUND_MUSIC) {
        backgroundMusic.play()
            .then(() => {
                isMusicPlaying = true;
                console.log('✅ 背景音乐开始播放');
            })
            .catch(err => {
                console.log('⚠️ 音乐播放失败（可能需要用户交互）:', err.message);
            });
    }
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        isMusicPlaying = false;
        console.log('⏸️ 背景音乐已暂停');
    }
}

// ==================== 开始引导旅程 ====================
function startGuideJourney() {
    console.log('🎬 用户点击开始旅程');
    
    // 播放背景音乐
    playBackgroundMusic();
    
    // 强制开始自动播放（绕过 AUTO_PLAY_GUIDE 配置）
    startAutoPlay(true);
    
    // 切换到下一页
    nextGuidePage();
}

function nextGuidePage() {
    if (currentGuidePage < totalGuidePages) {
        const currentPage = document.querySelector(`.guide-page[data-page="${currentGuidePage}"]`);
        const nextPage = document.querySelector(`.guide-page[data-page="${currentGuidePage + 1}"]`);
        // 直接切换页面（移除过场动画）
        currentPage.classList.remove('active', 'leaving');
        nextPage.classList.add('active');
        // 激活后初始化并启动逐字打字动画
        initTypingForPage(nextPage);
        currentGuidePage++;
        updateProgressDots();
        // 如果自动播放正在进行，按新页面内容重新调度下一次切换
        if (isAutoPlaying) {
            scheduleAutoNext();
        }
    } else {
        // 已经是最后一页，自动关闭
        if (isAutoPlaying) {
            stopAutoPlay();
            setTimeout(() => {
                closeGuide();
            }, 1000);
        }
    }
}

function previousGuidePage() {
    if (currentGuidePage > 1) {
        const currentPage = document.querySelector(`.guide-page[data-page="${currentGuidePage}"]`);
        const prevPage = document.querySelector(`.guide-page[data-page="${currentGuidePage - 1}"]`);
        // 直接切换页面（移除过场动画）
        currentPage.classList.remove('active', 'leaving');
        prevPage.classList.add('active');
        // 激活后初始化并启动逐字打字动画
        initTypingForPage(prevPage);
        currentGuidePage--;
        updateProgressDots();
    }
}

function goToGuidePage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalGuidePages && pageNum !== currentGuidePage) {
        const currentPage = document.querySelector(`.guide-page[data-page="${currentGuidePage}"]`);
        const targetPage = document.querySelector(`.guide-page[data-page="${pageNum}"]`);
        // 直接切换页面（移除过场动画）
        currentPage.classList.remove('active', 'leaving');
        targetPage.classList.add('active');
        // 激活后初始化并启动逐字打字动画
        initTypingForPage(targetPage);
        currentGuidePage = pageNum;
        updateProgressDots();
        if (isAutoPlaying) {
            scheduleAutoNext();
        }
    }
}

// 将 love-typewriter 行拆分为逐字 span，并在激活页启动动画
function initTypingForPage(pageEl) {
    if (!pageEl) return;
    const lines = pageEl.querySelectorAll('.love-typewriter');
    if (!lines.length) return;

    lines.forEach(line => {
        if (line.dataset.prepared === 'true') return;
        const text = line.textContent || '';
        const frag = document.createDocumentFragment();
        // 清空原文本，按字符拆分
        line.textContent = '';
        [...text].forEach((ch, idx) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch;
            span.style.setProperty('--char-index', idx);
            frag.appendChild(span);
        });
        line.appendChild(frag);
        line.dataset.prepared = 'true';
    });

    // 下一帧打上 typing 类，触发逐字动画（保留每行延迟）
    // 页面级顺序：根据整页字符总量为每行设置顺序延迟
    applyPageSequentialDelays(pageEl);
    requestAnimationFrame(() => {
        lines.forEach(line => line.classList.add('typing'));
    });
}

// 智能分行：将过长的 love-typewriter 行按标点优先和长度阈值拆分
function splitTextSmart(text, maxChars) {
    const parts = [];
    let buf = '';
    const punctuationRegex = /[，。！？、；：,…,.!?]/;
    for (const ch of text.trim()) {
        buf += ch;
        const atPunc = punctuationRegex.test(ch);
        if ((atPunc && buf.length >= Math.floor(maxChars * 0.6)) || buf.length >= maxChars) {
            parts.push(buf.trim());
            buf = '';
        }
    }
    if (buf.trim()) parts.push(buf.trim());
    return parts.length ? parts : [text.trim()];
}

// 针对每页的 love-lines 容器进行分行重排
function reflowLoveLinesForPage(pageEl) {
    try {
        if (!pageEl || pageEl.dataset.reflowed === 'true') return;
        const containers = Array.from(pageEl.querySelectorAll('.love-lines'));
        if (!containers.length) return;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const MAX_CHARS = isMobile ? 12 : 16;

        containers.forEach(container => {
            const oldLines = Array.from(container.querySelectorAll('.love-typewriter'));
            if (!oldLines.length) return;
            // 如果不存在超长行则不改动该容器
            const needs = oldLines.some(l => ((l.textContent || '').trim().length > MAX_CHARS));
            if (!needs) return;

            const newTexts = [];
            oldLines.forEach(line => {
                const txt = (line.textContent || '').trim();
                if (!txt) return;
                const segments = splitTextSmart(txt, MAX_CHARS);
                segments.forEach(seg => newTexts.push(seg));
            });

      // 构建新的行（不在此处设置行延时，由页面级函数统一计算）
      const frag = document.createDocumentFragment();
      newTexts.forEach((seg, idx) => {
        const p = document.createElement('p');
        p.className = 'love-line love-typewriter';
        p.textContent = seg;
        frag.appendChild(p);
      });

            container.innerHTML = '';
            container.appendChild(frag);
        });

        pageEl.dataset.reflowed = 'true';
    } catch (err) {
        console.warn('reflowLoveLinesForPage error:', err);
  }
}

// 页面级顺序延迟：将整页视为一个整体，从第一行第一个字开始到最后一个字结束
function applyPageSequentialDelays(pageEl) {
    if (!pageEl) return;
    const lines = Array.from(pageEl.querySelectorAll('.love-typewriter'));
    let prevChars = 0;
    lines.forEach(line => {
        const charCount = line.querySelectorAll('.char').length || ((line.textContent || '').length);
        // 每行的首字延迟 = 前面所有字符数量 * 每字符速度
        line.style.setProperty('--line-delay', `calc(${prevChars} * var(--char-speed))`);
        prevChars += charCount;
    });
}

// 预处理：为所有引导页的 love-typewriter 文本拆分字符，避免后续页未初始化
function prepareTypingForAllPages() {
    const pages = document.querySelectorAll('.guide-page');
    pages.forEach(page => {
        // 先对超长行进行智能分行，避免单行过长导致显示异常
        reflowLoveLinesForPage(page);
        const lines = page.querySelectorAll('.love-typewriter');
        lines.forEach(line => {
            if (line.dataset.prepared === 'true') return;
            const text = line.textContent || '';
            const frag = document.createDocumentFragment();
            line.textContent = '';
            [...text].forEach((ch, idx) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = ch;
                span.style.setProperty('--char-index', idx);
                frag.appendChild(span);
            });
            line.appendChild(frag);
            line.dataset.prepared = 'true';
        });
        // 按页计算整页的顺序延迟，让整页作为一个整体逐字出现
        applyPageSequentialDelays(page);
        // 仅当该页为激活页时添加 typing 以触发动画；其他页在切换时由 initTypingForPage 添加
        if (page.classList.contains('active')) {
            requestAnimationFrame(() => {
                page.querySelectorAll('.love-typewriter').forEach(line => line.classList.add('typing'));
            });
        }
    });
}

function updateProgressDots() {
    const dots = document.querySelectorAll('.guide-progress .progress-dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentGuidePage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function closeGuide() {
    const guideOverlay = document.getElementById('guideOverlay');
    guideOverlay.classList.add('hidden');
    
    // 停止气球和烟花特效，节省资源
    stopBalloons();
    stopAutoFirework();
    
    // 停止背景音乐
    stopBackgroundMusic();
    
    // 停止自动播放
    stopAutoPlay();
    
    // 保存到本地存储，下次访问不再显示
    localStorage.setItem('hasSeenGuide', 'true');
}

function showGuideAgain() {
    // 重置到第一页
    const allPages = document.querySelectorAll('.guide-page');
    allPages.forEach(page => {
        page.classList.remove('active', 'leaving');
    });
    
    const firstPage = document.querySelector('.guide-page[data-page="1"]');
    if (firstPage) {
        firstPage.classList.add('active');
    }
    
    currentGuidePage = 1;
    updateProgressDots();
    
    // 显示引导页面
    const guideOverlay = document.getElementById('guideOverlay');
    guideOverlay.classList.remove('hidden');
    // 预处理并立即为当前激活页启动逐字动画
    prepareTypingForAllPages();
    initTypingForPage(document.querySelector('.guide-page.active'));
    
    // 根据配置重新启动特效
    if (ENABLE_BALLOONS) {
        initBalloons();
    }
    if (ENABLE_FIREWORKS) {
        initFireworks();
    }
    
    // 启动自动播放
    if (AUTO_PLAY_GUIDE) {
        startAutoPlay();
    }
}

// 添加进度点点击事件
function initGuideControls() {
    const progressDots = document.querySelectorAll('.guide-progress .progress-dot');
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pauseAutoPlay(); // 用户点击进度点时暂停自动播放
            goToGuidePage(index + 1);
        });
    });
}

// 键盘导航（只绑定一次）
document.addEventListener('keydown', (e) => {
    const guideOverlay = document.getElementById('guideOverlay');
    if (!guideOverlay || guideOverlay.classList.contains('hidden')) return;
    
    // 用户操作时暂停自动播放
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        pauseAutoPlay();
        nextGuidePage();
    } else if (e.key === 'ArrowLeft') {
        pauseAutoPlay();
        previousGuidePage();
    } else if (e.key === 'Escape') {
        pauseAutoPlay();
        closeGuide();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        // 空格键暂停/恢复自动播放
        e.preventDefault();
        if (isAutoPlaying) {
            pauseAutoPlay();
        } else {
            resumeAutoPlay();
        }
    }
});

// ==================== 开场动画 ====================
function initOpeningAnimation() {
    const openingAnimation = document.getElementById('openingAnimation');
    const homeContent = document.getElementById('homeContent');
    
    // 点击任意位置关闭开场动画
    openingAnimation.addEventListener('click', () => {
        openingAnimation.classList.add('hidden');
        homeContent.style.opacity = '1';
    });
    
    // 3秒后自动关闭
    setTimeout(() => {
        openingAnimation.classList.add('hidden');
        homeContent.style.opacity = '1';
    }, 3000);
}

// ==================== 倒计时功能 ====================
function initCountdown() {
    // 设置你们的纪念日开始日期（可以修改这里）
    const startDate = new Date('2020-01-01 00:00:00').getTime();
    
    // 更新显示的日期
    const startDateElement = document.getElementById('startDate');
    const dateObj = new Date(startDate);
    startDateElement.textContent = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = now - startDate;
        
        // 计算时间
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // 更新显示
        document.getElementById('years').textContent = years;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==================== 导航功能 ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // 滚动时高亮当前导航
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== 标签页切换 ====================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加活动状态
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// ==================== 滚动动画 ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item, .photo-item, .game-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== 游戏模态框 ====================
function closeGameModal() {
    document.getElementById('gameModal').classList.remove('active');
    document.getElementById('gameContent').innerHTML = '';
}

// ==================== 爱情问答游戏 ====================
function startQuizGame() {
    const questions = [
        {
            question: '我们第一次见面你穿的什么颜色的裙子？',
            options: ['白色', '黄色', '红色'],
            correct: 0
        },
        {
            question: '我最喜欢的颜色是什么？',
            options: ['红色', '蓝色', '绿色'],
            correct: 2
        },
        {
            question: '我最喜欢干的事情是什么',
            options: ['睡觉', '打游戏', '运动'],
            correct: 2
        },
        {
            question: '我们以前约会干的最多的事情是什么？',
            options: ['看电影', '旅行', '做饭',],
            correct: 0
        },
        {
            question: '我对你说的最多的话是？',
            options: ['我爱你', '想你了', '吃饭了吗', '晚安'],
            correct: 3
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let startTime = Date.now();
    
    const gameContent = document.getElementById('gameContent');
    
    function showQuestion() {
        const q = questions[currentQuestion];
        gameContent.innerHTML = `
            <div class="quiz-game">
                <h2>爱情问答 ❤️</h2>
                <p>问题 ${currentQuestion + 1} / ${questions.length}</p>
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <div class="quiz-options">
                        ${q.options.map((option, index) => `
                            <div class="quiz-option" data-index="${index}">${option}</div>
                        `).join('')}
                    </div>
                </div>
                <button class="quiz-submit" onclick="checkQuizAnswer()">确认答案</button>
            </div>
        `;
        
        // 选项点击事件
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    window.checkQuizAnswer = function() {
        const selected = document.querySelector('.quiz-option.selected');
        if (!selected) {
            alert('请选择一个答案！');
            return;
        }
        
        const answer = parseInt(selected.getAttribute('data-index'));
        if (answer === questions[currentQuestion].correct) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            const endTime = Date.now();
            const timeTaken = Math.floor((endTime - startTime) / 1000);
            showCertificate('爱情问答', score, questions.length, timeTaken);
            closeGameModal();
        }
    };
    
    document.getElementById('gameModal').classList.add('active');
    showQuestion();
}

// ==================== 记忆配对游戏 ====================
function startMemoryGame() {
    const symbols = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💗'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime = Date.now();
    
    const gameContent = document.getElementById('gameContent');
    gameContent.innerHTML = `
        <div class="memory-game">
            <h2>记忆配对 🎴</h2>
            <div class="memory-stats">
                <span>配对: <strong id="matched">0</strong> / 8</span>
                <span>步数: <strong id="moves">0</strong></span>
            </div>
            <div class="memory-grid">
                ${cards.map((symbol, index) => `
                    <div class="memory-card" data-index="${index}" data-symbol="${symbol}">
                        <div class="card-front">?</div>
                        <div class="card-back">${symbol}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', function() {
            if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
                this.classList.add('flipped');
                flippedCards.push(this);
                
                if (flippedCards.length === 2) {
                    moves++;
                    document.getElementById('moves').textContent = moves;
                    
                    const [card1, card2] = flippedCards;
                    const symbol1 = card1.getAttribute('data-symbol');
                    const symbol2 = card2.getAttribute('data-symbol');
                    
                    setTimeout(() => {
                        if (symbol1 === symbol2) {
                            card1.classList.add('matched');
                            card2.classList.add('matched');
                            matchedPairs++;
                            document.getElementById('matched').textContent = matchedPairs;
                            
                            if (matchedPairs === 8) {
                                const endTime = Date.now();
                                const timeTaken = Math.floor((endTime - startTime) / 1000);
                                setTimeout(() => {
                                    showCertificate('记忆配对', moves, `${moves}步`, timeTaken);
                                    closeGameModal();
                                }, 500);
                            }
                        } else {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                        }
                        flippedCards = [];
                    }, 800);
                }
            }
        });
    });
    
    document.getElementById('gameModal').classList.add('active');
}

// ==================== 拼图游戏 ====================
function startPuzzleGame() {
    const PUZZLE_IMAGE = '1.jpg'; // 可改为 1-9.jpg 中任意一张
    let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 表示空格（右下角）
    let moves = 0;
    let startTime = Date.now();

    function shuffle() {
        for (let i = 0; i < 100; i++) {
            const emptyIndex = tiles.indexOf(0);
            const validMoves = getValidMoves(emptyIndex);
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
        }
    }

    function getValidMoves(emptyIndex) {
        const moves = [];
        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;

        if (row > 0) moves.push(emptyIndex - 3); // 上
        if (row < 2) moves.push(emptyIndex + 3); // 下
        if (col > 0) moves.push(emptyIndex - 1); // 左
        if (col < 2) moves.push(emptyIndex + 1); // 右

        return moves;
    }

    function getBgPosForTile(tile) {
        const idx = tile - 1; // 0..7
        const r = Math.floor(idx / 3);
        const c = idx % 3;
        const x = c === 0 ? '0%' : c === 1 ? '50%' : '100%';
        const y = r === 0 ? '0%' : r === 1 ? '50%' : '100%';
        return `${x} ${y}`;
    }

    function checkWin() {
        return tiles.every((tile, index) => tile === index + 1 || (index === 8 && tile === 0));
    }

    function renderPuzzle() {
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `
            <div class="puzzle-game">
                <h2>照片拼图 🧩</h2>
                <div class="puzzle-info">
                    <p>步数: <strong id="puzzleMoves">${moves}</strong></p>
                    <p>点击方块与空位交换，拼出完整照片</p>
                </div>
                <div class="puzzle-grid">
                    ${tiles.map((tile, index) => `
                        <div class="puzzle-piece ${tile === 0 ? 'empty' : ''}" data-index="${index}" ${tile === 0 ? '' : `style="background-image: url('${PUZZLE_IMAGE}'); background-size: 300% 300%; background-position: ${getBgPosForTile(tile)}; background-repeat: no-repeat;"`}>
                        </div>
                    `).join('')}
                </div>
                <div class="puzzle-controls">
                    <button class="puzzle-btn" onclick="shufflePuzzle()">重新开始</button>
                </div>
            </div>
        `;

        document.querySelectorAll('.puzzle-piece').forEach(piece => {
            piece.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const emptyIndex = tiles.indexOf(0);
                const validMoves = getValidMoves(emptyIndex);
                
                if (validMoves.includes(index)) {
                    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
                    moves++;
                    renderPuzzle();

                    if (checkWin()) {
                        const endTime = Date.now();
                        const timeTaken = Math.floor((endTime - startTime) / 1000);
                        setTimeout(() => {
                            showCertificate('照片拼图', moves, `${moves}步`, timeTaken);
                            closeGameModal();
                        }, 300);
                    }
                }
            });
        });
    }

    window.shufflePuzzle = function() {
        moves = 0;
        startTime = Date.now();
        shuffle();
        renderPuzzle();
    };

    shuffle();
    document.getElementById('gameModal').classList.add('active');
    renderPuzzle();
}

// ==================== 证书生成 ====================
function showCertificate(gameName, score, scoreText, timeTaken) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    document.getElementById('certGameName').textContent = gameName;
    document.getElementById('certTime').textContent = `${timeTaken}秒`;
    
    if (gameName === '爱情问答') {
        document.getElementById('certScore').textContent = `${score}/${scoreText} 正确`;
    } else {
        document.getElementById('certScore').textContent = scoreText;
    }
    
    document.getElementById('certDate').textContent = `${dateStr} ${timeStr}`;
    
    document.getElementById('certificateModal').classList.add('active');
}

function closeCertificate() {
    document.getElementById('certificateModal').classList.remove('active');
}

// ==================== 下载证书 ====================
function downloadCertificate() {
    // 使用 html2canvas 库可以实现真实的图片下载
    // 这里提供一个简单的提示
    alert('证书已保存到您的相册！\n\n提示：要实现真实的证书下载功能，可以集成 html2canvas 库。');
    
    // 真实实现方法（需要引入 html2canvas）：
    /*
    html2canvas(document.getElementById('certificate')).then(canvas => {
        const link = document.createElement('a');
        link.download = '爱情证书.png';
        link.href = canvas.toDataURL();
        link.click();
    });
    */
}

// ==================== 平滑滚动增强 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 气球动画 ====================
let balloonInterval = null;

function initBalloons() {
    const container = document.getElementById('balloonsContainer');
    if (!container) return;
    
    // 清除之前的定时器，避免重复
    if (balloonInterval) {
        clearInterval(balloonInterval);
        balloonInterval = null;
    }
    
    const colors = ['pink', 'purple', 'blue', 'yellow', 'red'];
    
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = `balloon balloon-${colors[Math.floor(Math.random() * colors.length)]}`;
        
        // 随机位置
        const startX = Math.random() * 100;
        balloon.style.left = `${startX}%`;
        
        container.appendChild(balloon);
        
        // 使用 GSAP 动画
        if (typeof gsap !== 'undefined') {
            const duration = 8 + Math.random() * 4;
            const endY = -150 - Math.random() * 100;
            const sway = (Math.random() - 0.5) * 100;
            
            gsap.to(balloon, {
                y: `${endY}vh`,
                x: `${sway}px`,
                rotation: Math.random() * 360,
                duration: duration,
                ease: "power1.inOut",
                onComplete: () => {
                    balloon.remove();
                }
            });
            
            // 摇摆动画
            gsap.to(balloon, {
                x: `+=${Math.random() * 40 - 20}`,
                duration: 2 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
    
    // 定期创建气球
    balloonInterval = setInterval(createBalloon, 2000);
    
    // 初始创建几个气球
    for (let i = 0; i < 3; i++) {
        setTimeout(createBalloon, i * 800);
    }
}

function stopBalloons() {
    if (balloonInterval) {
        clearInterval(balloonInterval);
        balloonInterval = null;
    }
}

// ==================== 烟花效果 ====================
let fireworksInitialized = false;
let autoFireworkTimeout = null;

function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    // 避免重复初始化
    if (fireworksInitialized) {
        // 重新启动自动烟花
        startAutoFirework();
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const guideOverlay = document.getElementById('guideOverlay');
    
    // 设置画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子类
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
            this.size = Math.random() * 3 + 2;
        }
        
        update() {
            this.velocity.x *= 0.98;
            this.velocity.y *= 0.98;
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // 添加光晕效果
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    let particles = [];
    const colors = ['#ff6b9d', '#a29bfe', '#74b9ff', '#feca57', '#ff6b6b', '#f093fb'];
    
    function createFirework(x, y) {
        const particleCount = 60;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, color));
        }
        
        // 添加额外的中心爆炸效果
        for (let i = 0; i < 20; i++) {
            const particle = new Particle(x, y, '#ffffff');
            particle.size = Math.random() * 2 + 1;
            particle.decay = 0.02;
            particles.push(particle);
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.alpha > 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    // 点击触发烟花（只绑定一次）
    const handleClick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createFirework(x, y);
    };
    guideOverlay.addEventListener('click', handleClick);
    
    // 自动触发烟花
    function autoFirework() {
        if (!guideOverlay.classList.contains('hidden')) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 0.7);
            createFirework(x, y);
            
            autoFireworkTimeout = setTimeout(autoFirework, 2000 + Math.random() * 3000);
        }
    }
    
    // 启动自动烟花
    function startAutoFirework() {
        stopAutoFirework();
        autoFireworkTimeout = setTimeout(autoFirework, 1000);
    }
    
    animate();
    startAutoFirework();
    fireworksInitialized = true;
}

function stopAutoFirework() {
    if (autoFireworkTimeout) {
        clearTimeout(autoFireworkTimeout);
        autoFireworkTimeout = null;
    }
}

function startAutoFirework() {
    const guideOverlay = document.getElementById('guideOverlay');
    if (!guideOverlay) return;
    
    stopAutoFirework();
    
    function autoFirework() {
        if (!guideOverlay.classList.contains('hidden')) {
            const canvas = document.getElementById('fireworksCanvas');
            if (canvas) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * (canvas.height * 0.7);
                // 触发点击事件来创建烟花
                const event = new MouseEvent('click', {
                    clientX: x + canvas.getBoundingClientRect().left,
                    clientY: y + canvas.getBoundingClientRect().top
                });
                guideOverlay.dispatchEvent(event);
            }
            
            autoFireworkTimeout = setTimeout(autoFirework, 2000 + Math.random() * 3000);
        }
    }
    
    autoFireworkTimeout = setTimeout(autoFirework, 1000);
}
// 解析 CSS 时长字符串为毫秒
function parseCssDurationToMs(value) {
    if (!value) return 0;
    const v = value.toString().trim();
    if (v.endsWith('ms')) return parseFloat(v);
    if (v.endsWith('s')) return parseFloat(v) * 1000;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
}

// 计算当前页逐字动画的总时长（最长一行的最后一个字符结束时间）
function getPageTypingTotalMs(pageEl) {
    if (!pageEl) return AUTO_PLAY_INTERVAL;
    const lines = pageEl.querySelectorAll('.love-typewriter');
    if (!lines.length) return AUTO_PLAY_INTERVAL; // 无情话行，使用固定间隔

    const rootStyles = getComputedStyle(document.documentElement);
    const pageStyles = getComputedStyle(pageEl);
    const charAnimDuration = 300; // charReveal 动画时长（与 CSS 保持一致 0.3s）

    let maxMs = 0;
    lines.forEach(line => {
        const style = getComputedStyle(line);
        const lineDelay = parseCssDurationToMs(style.getPropertyValue('--line-delay')) || 0;
        const charCount = line.querySelectorAll('.char').length || (line.textContent ? line.textContent.length : 0);
        const lastCharIndex = Math.max(charCount - 1, 0);

        // 优先读取行或页面上的 --char-speed，其次回退到 :root
        const charSpeedVal = style.getPropertyValue('--char-speed')
            || pageStyles.getPropertyValue('--char-speed')
            || rootStyles.getPropertyValue('--char-speed');
        const charSpeed = parseCssDurationToMs(charSpeedVal) || 50; // 默认 50ms/字

        const total = lineDelay + lastCharIndex * charSpeed + charAnimDuration;
        if (total > maxMs) maxMs = total;
    });

    // 页面级停顿：让每一页在完成后稍作停留（优先页面变量，其次根级变量）
    const pagePauseVal = pageStyles.getPropertyValue('--page-pause') || rootStyles.getPropertyValue('--page-pause');
    const pagePauseMs = parseCssDurationToMs(pagePauseVal) || 2000; // 默认 2s 停顿
    return maxMs + pagePauseMs;
}

// 动态调度下一次自动切页：等待当前页的逐字动画完成
function scheduleAutoNext() {
    if (!isAutoPlaying) return;
    const guideOverlay = document.getElementById('guideOverlay');
    if (guideOverlay && guideOverlay.classList.contains('hidden')) {
        stopAutoPlay();
        return;
    }
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }

    const currentPage = document.querySelector(`.guide-page[data-page="${currentGuidePage}"]`);
    const waitMs = getPageTypingTotalMs(currentPage);
    autoPlayTimer = setTimeout(() => {
        if (currentGuidePage >= totalGuidePages) {
            stopAutoPlay();
            setTimeout(() => {
                closeGuide();
            }, AUTO_PLAY_INTERVAL);
            return;
        }
        nextGuidePage();
    }, waitMs);
}

