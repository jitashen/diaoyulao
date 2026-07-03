// 常见淡水鱼图鉴
(function () {
  var species = [
    { name: '鲫鱼', emoji: '🐟', alias: '鲫瓜子', habitat: '静水、缓流，底层', season: '全年，春秋最佳',
      desc: '最常见的目标鱼之一，适应性极强。喜欢在水草区、石缝间觅食，群居性。',
      tips: '用腥香饵料，调漂灵顿适中。春冬钓深，夏秋钓浅。蚯蚓、红虫、商品饵都有效。' },
    { name: '鲤鱼', emoji: '🐠', alias: '鲤子、鲤拐子', habitat: '底层，喜欢泥底有障碍物处', season: '全年，夏季活跃',
      desc: '体型大、力气足，搏鱼手感好。谨慎机警，吃口较狡猾。',
      tips: '钓组偏钝，用玉米、红薯、商品饵。夜钓效果更佳。中钩后控鱼要稳，小心钻草。' },
    { name: '草鱼', emoji: '🐟', alias: '草棒、草混子', habitat: '中下层，近岸水草区', season: '春末到秋初',
      desc: '以水草为食，也可吃昆虫。生长快，体型大，拉力凶猛。',
      tips: '嫩草、玉米、商品草鱼饵。浮钓效果好。遛鱼要有耐心，第一次冲击力极强。' },
    { name: '鲢鳙', emoji: '🐟', alias: '白鲢、花鲢、胖头', habitat: '中上层水域', season: '夏季最佳',
      desc: '滤食性，以浮游生物为食。白鲢好跳，花鲢头大。群居，密度常较大。',
      tips: '酸臭饵料，雾化要好。用大号浮漂，钓浮。手竿硬调，海竿更好。' },
    { name: '翘嘴', emoji: '🐟', alias: '翘嘴鲌、白鱼', habitat: '中上层，开阔水面', season: '夏秋季',
      desc: '掠食性鱼类，追食小鱼虾。速度极快，爆发力强。肉质极为鲜美。',
      tips: '路亚首选对象鱼。用亮片、米诺、波爬。早晚窗口期最佳。看到水面炸水就是翘嘴在追食。' },
    { name: '黑鱼', emoji: '🐉', alias: '乌鳢、乌鱼、火头', habitat: '底层，水草芦苇丛中', season: '夏秋季',
      desc: '凶猛掠食者，护幼性强。肉食性，吃小鱼虾青蛙。耐低氧。',
      tips: '雷蛙打黑最佳，用雷强竿。黑鱼护仔期间攻击性最强。中钩后洗鳃容易脱钩，要压竿。' },
    { name: '罗非', emoji: '🐠', alias: '越南鱼、福寿鱼', habitat: '中下层，喜欢温暖水域', season: '夏秋季',
      desc: '热带鱼，气温低于10°C会冻死。繁殖快，贪吃，容易钓。',
      tips: '用腥饵，近岸浅水即可。调漂简单，抓顿口。喜欢群居，遇上就是连竿。' },
    { name: '黄辣丁', emoji: '🐟', alias: '黄颡鱼、黄辣丁、昂刺', habitat: '底层，石缝树根处', season: '春夏秋季',
      desc: '小型底层鱼，身上有刺有毒（刺痛但无大碍）。怕光，夜行性。',
      tips: '蚯蚓钓底最佳。夜钓效果好，雨后水浑更容易上。小心背鳍和侧鳍的刺。' },
    { name: '鳊鱼', emoji: '🐟', alias: '武昌鱼、团头鲂', habitat: '中下层，水草区', season: '全年',
      desc: '身形扁侧，群居。吃草也吃小虫。肉质细嫩。',
      tips: '用商品饵或嫩玉米。离底10-20公分钓。群居鱼种，打窝后常能连竿。' },
    { name: '鲶鱼', emoji: '🐍', alias: '鲇鱼、土鲶', habitat: '底层，洞隙深潭', season: '夏季夜晚',
      desc: '夜行性掠食者，须上有味蕾，黑暗中靠嗅觉和触觉捕食。',
      tips: '用鸡肝、鸭肠、大蚯蚓、小鱼。夜钓最佳。重铅到底，竿要硬线要粗。' },
    { name: '鲈鱼', emoji: '🐟', alias: '加州鲈、花鲈', habitat: '中下层，有障碍物处', season: '春秋最佳',
      desc: '路亚明星鱼种，攻击性强。喜欢藏在水草、倒树、石堆中伏击猎物。',
      tips: '软虫、硬饵、水面系都有效。抛投到位后慢收，偶尔停顿最诱鱼。' },
    { name: '鳜鱼', emoji: '🐟', alias: '桂花鱼、季花鱼', habitat: '底层，石底硬底', season: '春秋',
      desc: '伏击性掠食者，肉质极佳。有"淡水石斑"之称。背鳍有硬刺。',
      tips: '活虾钓鳜效果最好。VIB、铅头钩跳底。喜欢流水口、乱石区。' },
    { name: '青鱼', emoji: '🐋', alias: '乌青、青鲩', habitat: '中底层，大水面', season: '春秋',
      desc: '淡水"巨物"代表，最大可达百余斤。以螺蛳为主要食物。',
      tips: '螺蛳打窝螺蛳钓，新鲜玉米也好用。竿要长要硬，线组要大。遛鱼以小时计。' },
    { name: '白条', emoji: '🐟', alias: '餐条、白鲦', habitat: '上层水面', season: '全年',
      desc: '小型鱼类，群居，在水面抢食。很多钓友入门的第一条鱼。',
      tips: '用小钩细线，半水钓。浮钓拉饵频率要高。油炸白条是经典下酒菜。' },
    { name: '马口', emoji: '🐟', alias: '马口鱼、桃花鱼', habitat: '溪流山涧清水中', season: '夏季',
      desc: '溪流鱼，要求水质极好。公鱼繁殖期色彩艳丽。嘴大，凶猛。',
      tips: '溪流路亚经典对象鱼，亮片最有效。手竿用腥饵，钓流水缓流区。' },
  ];

  function renderSpecies(filter) {
    var el = document.getElementById('species-list');
    if (!el) return;
    filter = (filter || '').toLowerCase().trim();
    var filtered = filter ? species.filter(function (s) {
      return s.name.indexOf(filter) !== -1 || s.alias.indexOf(filter) !== -1 || s.habitat.indexOf(filter) !== -1;
    }) : species;

    if (filtered.length === 0) {
      el.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">没有找到匹配的鱼种</p>';
      return;
    }

    var html = '';
    filtered.forEach(function (s) {
      html += '<div class="card">' +
        '<div class="species-card">' +
        '<div class="species-emoji">' + s.emoji + '</div>' +
        '<div class="species-info">' +
        '<h4>' + s.name + '</h4>' +
        '<div class="species-meta">' +
        '<span>别名: ' + s.alias + '</span>' +
        '<span>🏞️ ' + s.habitat + '</span>' +
        '<span>📅 ' + s.season + '</span>' +
        '</div>' +
        '<p class="species-desc">' + s.desc + '</p>' +
        '<div class="species-tips">💡 钓法: ' + s.tips + '</div>' +
        '</div></div></div>';
    });
    el.innerHTML = html;
  }

  if (document.getElementById('species-list')) {
    renderSpecies('');
    document.getElementById('species-search-input').addEventListener('input', function () {
      renderSpecies(this.value);
    });
  }
})();
