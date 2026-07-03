// 钓鱼日志 - 使用 localStorage 存储
(function () {
  var STORAGE_KEY = 'fishing_logs';

  function getLogs() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }

  var state = { logs: getLogs(), editingId: null };
  state.logs.sort(function (a, b) { return b.date < a.date ? 1 : -1; });

  function render() {
    var listEl = document.getElementById('log-list');
    var statsEl = document.getElementById('log-stats');
    if (!listEl) return;

    // 统计
    var total = state.logs.length;
    var totalFish = state.logs.reduce(function (s, l) { return s + (parseFloat(l.weight) || 0); }, 0);
    if (statsEl) {
      var species = new Set(state.logs.map(function (l) { return l.species; }));
      statsEl.innerHTML =
        '<div class="stat-row">' +
        '<div class="stat-box"><div class="num">' + total + '</div><div class="label">总出钓</div></div>' +
        '<div class="stat-box"><div class="num">' + totalFish.toFixed(1) + '</div><div class="label">总渔获(斤)</div></div>' +
        '<div class="stat-box"><div class="num">' + (species.size || 0) + '</div><div class="label">鱼种数</div></div>' +
        '<div class="stat-box"><div class="num">' + (total > 0 ? (totalFish / total).toFixed(1) : 0) + '</div><div class="label">平均(斤)</div></div>' +
        '</div>';
    }

    if (state.logs.length === 0) {
      listEl.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">还没有记录，开始记录你的第一次出钓吧！</p>';
      return;
    }

    var html = '<table class="data-table"><thead><tr><th>日期</th><th>地点</th><th>鱼种</th><th>重量(斤)</th><th>天气</th><th>操作</th></tr></thead><tbody>';
    state.logs.forEach(function (log, idx) {
      html += '<tr>' +
        '<td>' + formatDate(log.date) + ' ' + getWeekDay(log.date) + '</td>' +
        '<td>' + escapeHtml(log.location) + '</td>' +
        '<td>' + escapeHtml(log.species) + '</td>' +
        '<td>' + (log.weight || '-') + '</td>' +
        '<td>' + weatherIcon(log.weather) + escapeHtml(log.weather) + '</td>' +
        '<td><button class="btn btn-sm btn-outline" onclick="editLog(' + idx + ')">编辑</button> <button class="btn btn-sm btn-danger" onclick="deleteLog(' + idx + ')">删除</button></td>' +
        '</tr>';
    });
    html += '</tbody></table>';
    listEl.innerHTML = html;
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function weatherIcon(w) {
    var map = { '晴': '☀️', '多云': '⛅', '阴': '☁️', '小雨': '🌦️', '中雨': '🌧️', '大雨': '🌧️', '阵雨': '🌦️', '雷阵雨': '⛈️' };
    return map[w] || '🌤️';
  }

  window.addLog = function () {
    var date = document.getElementById('log-date').value;
    var location = document.getElementById('log-location').value.trim();
    var species = document.getElementById('log-species').value.trim();
    var weight = document.getElementById('log-weight').value.trim();
    var weather = document.getElementById('log-weather').value;
    var notes = document.getElementById('log-notes').value.trim();

    if (!date || !location || !species) {
      alert('请至少填写日期、地点和鱼种');
      return;
    }

    if (state.editingId !== null) {
      state.logs[state.editingId] = { date: date, location: location, species: species, weight: weight, weather: weather, notes: notes };
      state.editingId = null;
      document.getElementById('log-submit').textContent = '添加记录';
    } else {
      state.logs.push({ date: date, location: location, species: species, weight: weight, weather: weather, notes: notes });
    }

    state.logs.sort(function (a, b) { return b.date < a.date ? 1 : -1; });
    saveLogs(state.logs);
    render();
    clearForm();
  };

  window.editLog = function (idx) {
    var log = state.logs[idx];
    document.getElementById('log-date').value = log.date;
    document.getElementById('log-location').value = log.location;
    document.getElementById('log-species').value = log.species;
    document.getElementById('log-weight').value = log.weight || '';
    document.getElementById('log-weather').value = log.weather || '晴';
    document.getElementById('log-notes').value = log.notes || '';
    state.editingId = idx;
    document.getElementById('log-submit').textContent = '更新记录';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.deleteLog = function (idx) {
    if (!confirm('确定删除这条记录？')) return;
    state.logs.splice(idx, 1);
    if (state.editingId === idx) { state.editingId = null; document.getElementById('log-submit').textContent = '添加记录'; }
    saveLogs(state.logs);
    render();
  };

  window.clearLogForm = function () {
    clearForm();
    state.editingId = null;
    document.getElementById('log-submit').textContent = '添加记录';
  };

  window.exportLogs = function () {
    if (state.logs.length === 0) { alert('没有记录可导出'); return; }
    var csv = '\uFEFF日期,地点,鱼种,重量(斤),天气,备注\n';
    state.logs.forEach(function (l) {
      csv += l.date + ',' + l.location + ',' + l.species + ',' + (l.weight || '') + ',' + (l.weather || '') + ',' + (l.notes || '') + '\n';
    });
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '钓鱼日志_' + todayStr() + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  function clearForm() {
    document.getElementById('log-date').value = todayStr();
    document.getElementById('log-location').value = '';
    document.getElementById('log-species').value = '';
    document.getElementById('log-weight').value = '';
    document.getElementById('log-weather').value = '晴';
    document.getElementById('log-notes').value = '';
  }

  // 初始化
  if (document.getElementById('log-date')) {
    document.getElementById('log-date').value = todayStr();
    render();
  }
})();
