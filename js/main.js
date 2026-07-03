// 导航切换（移动端）
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }
  // 高亮当前页
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

// 工具函数
function todayStr() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function formatDate(dateStr) {
  var parts = dateStr.split('-');
  return parts[0] + '年' + parseInt(parts[1]) + '月' + parseInt(parts[2]) + '日';
}

function getWeekDay(dateStr) {
  var days = ['日', '一', '二', '三', '四', '五', '六'];
  return '周' + days[new Date(dateStr).getDay()];
}
