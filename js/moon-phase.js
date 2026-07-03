// 月相计算器（纯算法，无需 API）
(function () {
  // 计算月相（0=新月, 0.5=满月）
  function getMoonPhase(year, month, day) {
    var c = e = jd = 0;
    if (month <= 2) { year -= 1; month += 12; }
    var a = Math.floor(year / 100);
    var b = 2 - a + Math.floor(a / 4);
    jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
    var daysSinceNew = jd - 2451550.1;
    var newMoons = daysSinceNew / 29.53058867;
    var phase = newMoons - Math.floor(newMoons);
    return phase;
  }

  function getPhaseName(phase) {
    if (phase < 0.03 || phase >= 0.97) return { name: '新月', emoji: '🌑', fishing: 'good' };
    if (phase < 0.13) return { name: '蛾眉月', emoji: '🌒', fishing: 'good' };
    if (phase < 0.24) return { name: '上弦月', emoji: '🌓', fishing: 'great' };
    if (phase < 0.36) return { name: '盈凸月', emoji: '🌔', fishing: 'good' };
    if (phase < 0.47) return { name: '满月', emoji: '🌕', fishing: 'best' };
    if (phase < 0.53) return { name: '满月', emoji: '🌕', fishing: 'best' };
    if (phase < 0.64) return { name: '亏凸月', emoji: '🌖', fishing: 'good' };
    if (phase < 0.75) return { name: '下弦月', emoji: '🌗', fishing: 'great' };
    if (phase < 0.86) return { name: '残月', emoji: '🌘', fishing: 'good' };
    return { name: '新月', emoji: '🌑', fishing: 'good' };
  }

  function getFishingScore(phase) {
    // 新月和满月前后3天最佳
    var distToNew = Math.min(phase, 1 - phase);
    var distToFull = Math.abs(phase - 0.5);
    var score = Math.min(distToNew, distToFull);
    if (score < 0.08) return 'best';
    if (score < 0.18) return 'great';
    if (score < 0.3) return 'good';
    return 'fair';
  }

  function drawMoon(phase, svgId) {
    var svg = document.getElementById(svgId || 'moon-svg');
    if (!svg) return;
    var w = parseInt(svg.getAttribute('width')) || 180;
    var h = parseInt(svg.getAttribute('height')) || 180;
    var cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 8;
    var x = cx - r, y = cy - r, d = r * 2;

    svg.innerHTML = '';
    // 阴影圆
    var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    shadow.setAttribute('cx', cx); shadow.setAttribute('cy', cy);
    shadow.setAttribute('r', r);
    shadow.setAttribute('fill', '#c8d6e0');
    svg.appendChild(shadow);

    // 亮面
    var lit, xform;
    if (phase <= 0.5) {
      // 右侧亮（盈月）
      lit = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      lit.setAttribute('cx', cx);
      lit.setAttribute('cy', cy);
      lit.setAttribute('rx', r * (1 - 2 * phase));
      lit.setAttribute('ry', r);
      lit.setAttribute('fill', '#f5e6b8');
      svg.appendChild(lit);
    } else {
      // 左侧亮（亏月）
      lit = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      lit.setAttribute('cx', cx);
      lit.setAttribute('cy', cy);
      lit.setAttribute('rx', r * (2 * phase - 1));
      lit.setAttribute('ry', r);
      lit.setAttribute('fill', '#f5e6b8');
      svg.appendChild(lit);
    }

    // 边框
    var edge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    edge.setAttribute('cx', cx); edge.setAttribute('cy', cy);
    edge.setAttribute('r', r);
    edge.setAttribute('fill', 'none');
    edge.setAttribute('stroke', 'rgba(0,0,0,0.15)');
    edge.setAttribute('stroke-width', '1');
    svg.appendChild(edge);
  }

  function buildCalendar() {
    var grid = document.getElementById('moon-calendar');
    var monthSelect = document.getElementById('cal-month');
    if (!grid || !monthSelect) return;

    var now = new Date();
    var year = now.getFullYear();
    var month = parseInt(monthSelect.value) || (now.getMonth() + 1);
    var firstDay = new Date(year, month - 1, 1).getDay();
    var daysInMonth = new Date(year, month, 0).getDate();
    var today = todayStr();

    var headers = ['日', '一', '二', '三', '四', '五', '六'];
    var html = '';
    headers.forEach(function (h) {
      html += '<div class="cal-day cal-day-header">' + h + '</div>';
    });

    for (var i = 0; i < firstDay; i++) {
      html += '<div class="cal-day empty"></div>';
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var dateStr = year + '-' + String(month).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var phase = getMoonPhase(year, month, d);
      var score = getFishingScore(phase);
      var cls = 'cal-day ' + score;
      if (dateStr === today) cls += ' today';
      var phaseInfo = getPhaseName(phase);
      html += '<div class="' + cls + '" title="' + phaseInfo.name + ' ' + phaseInfo.emoji + '">' + d + '</div>';
    }

    grid.innerHTML = html;
  }

  function updateToday() {
    var display = document.getElementById('moon-display');
    if (!display) return;
    var now = new Date();
    var phase = getMoonPhase(now.getFullYear(), now.getMonth() + 1, now.getDate());
    var info = getPhaseName(phase);
    var pct = Math.round((1 - Math.abs(phase - 0.5) * 2) * 100);
    document.getElementById('moon-phase-name').textContent = info.emoji + ' ' + info.name;
    document.getElementById('moon-date').textContent = '今天 · ' + formatDate(todayStr()) + ' ' + getWeekDay(todayStr());
    document.getElementById('moon-illum').textContent = '月面照亮 ' + pct + '%';

    // 钓鱼建议
    var score = getFishingScore(phase);
    var tipMap = {
      'best': '今晚鱼口极佳，月相非常理想！',
      'great': '不错的钓鱼时机，推荐出钓',
      'good': '一般水平，可以一试',
      'fair': '鱼口一般，建议择日'
    };
    document.getElementById('moon-tip').textContent = tipMap[score] || '';
    document.getElementById('moon-tip').style.color = score === 'best' ? 'var(--amber)' : score === 'great' ? 'var(--teal)' : 'var(--text-muted)';

    drawMoon(phase);
  }

  // 切换月份
  if (document.getElementById('cal-month')) {
    document.getElementById('cal-month').addEventListener('change', buildCalendar);
    var now = new Date();
    document.getElementById('cal-month').value = now.getMonth() + 1;
    updateToday();
    buildCalendar();
  }

  // 暴露供其他页面使用
  window.getMoonPhase = getMoonPhase;
  window.getFishingScore = getFishingScore;
  window.getPhaseName = getPhaseName;
})();
