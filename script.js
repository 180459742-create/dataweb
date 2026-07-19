const futureItems = [
  {key:"caviar",name:"国产鲟鱼子酱",bg:"assets/02-620803fb.png",wheel:"assets/03-48509ad6.png",problem:"assets/05-ce826234.png",action:"assets/06-762002ef.png"},
  {key:"matcha",name:"国产抹茶",bg:"assets/07-7b27db84.png",wheel:"assets/08-533700ac.png",problem:"assets/10-22d7a677.png",action:"assets/11-68b0245f.png"},
  {key:"foie",name:"国产鹅肝",bg:"assets/12-873ae662.png",wheel:"assets/13-08a56cd2.png",problem:"assets/15-906f6cdd.png",action:"assets/16-542f810e.png"},
  {key:"truffle",name:"国产黑松露",bg:"assets/17-6cad7881.png",wheel:"assets/18-09140bef.png",problem:"assets/20-e4ebf1a1.png",action:"assets/21-e87e1985.png"}
];
const derivativeItems = [
  {name:"鱼子酱巧克力",icon:"assets/update/deriv-caviar-chocolate.png",card:"assets/update/deriv-card-caviar-chocolate.png"},
  {name:"鱼子酱护肤品",icon:"assets/update/deriv-caviar-skincare.png",card:"assets/update/deriv-card-caviar-skincare.png"},
  {name:"鲑鱼鱼油",icon:"assets/update/deriv-fish-oil.png",card:"assets/update/deriv-card-fish-oil.png"},
  {name:"鲟鱼胶原蛋白多肽",icon:"assets/update/deriv-sturgeon-protein.png",card:"assets/update/deriv-card-sturgeon-protein.png"},
  {name:"黑松露薯片",icon:"assets/update/deriv-truffle-chips.png",card:"assets/update/deriv-card-truffle-chips.png"},
  {name:"鹅肝冰激凌",icon:"assets/update/deriv-foie-icecream.png",card:"assets/update/deriv-card-foie-icecream.png"},
  {name:"高端食材儿童辅食",icon:"assets/update/deriv-foie-babyfood.png",card:"assets/update/deriv-card-babyfood.png"},
  {name:"橄榄香皂",icon:"assets/update/deriv-olive-soap.png",card:"assets/update/deriv-card-olive-soap.png"},
  {name:"橄榄雕",icon:"assets/update/deriv-olive-carving.png",card:"assets/update/deriv-card-olive-carving.png"},
  {name:"藏红花精油",icon:"assets/update/deriv-saffron-oil.png",card:"assets/update/deriv-card-saffron-oil.png"},
  {name:"黑松露调味汁",icon:"assets/update/deriv-sauce.png",card:"assets/update/deriv-card-truffle-sauce.png"},
  {name:"抹茶拉面",icon:"assets/update/deriv-matcha-ramen-icon.png",card:"assets/update/deriv-card-matcha-ramen.png"}
];
const impactHoverItems = [
  {name:"山东临朐鹅肝",icon:"assets/update/impact-foie-real.png",desc:"2023年山东临朐全县出栏朗德鹅达<span>500万只</span>，加工鹅肝<span>5000余吨</span>，占全国产量的<span>70%</span>。全球市场约<span>20%</span>。据统计，临朐县的鹅肝产业已经带动当地<span>6000余人就业</span>。",source:"《工人日报》（2024年9月3日）"},
  {name:"贵州抹茶",icon:"assets/update/impact-matcha-real.png",desc:"贵州铜仁依托“龙头企业＋联盟企业＋专业合作社＋农户”合作形式，与全省<span>22个</span>县市区<span>61家</span>茶企签订联盟协议成立贵州茶联盟，带动<span>30多家</span>碾茶企业和<span>20多万</span>茶农增效增收，形成竞争力较强的产业集群。",source:"《贵州日报》（2025年12月16日）"},
  {name:"云南黑松露",icon:"assets/update/impact-truffle-real.png",desc:"云南楚雄大力推广野生菌林地承包保育，2025年南华县五街镇咪黑们村开们小组户均分红达<span>12360元</span>。2025年全州“包山育菌”面积达<span>26.716万亩</span>，松茸亩产最高达<span>15公斤</span>，野生菌总产值达<span>98.2亿元</span>。",source:"《楚雄日报》（2026年6月15日 第02版）"},
  {name:"国产鱼子酱",icon:"assets/update/impact-caviar-real.png",desc:"据四川天全县人民政府提供的数据显示，产业发展带动全县<span>19个村</span>集体经济组织获利<span>139.3万元</span>，辐射周边近<span>3000户</span>农户增收。与此同时，团结村成功创建省级乡村振兴示范村。",source:"（2024年天全县政府工作报告）"}
];

function $(q, root=document){ return root.querySelector(q); }
function $$(q, root=document){ return Array.from(root.querySelectorAll(q)); }
const clamp = (v, min=0, max=1) => Math.max(min, Math.min(max, v));

function sectionProgress(el){
  if(!el) return 0;
  const rect = el.getBoundingClientRect();
  const total = Math.max(1, el.offsetHeight - window.innerHeight);
  return clamp(-rect.top / total);
}

const reversibleReveals = $$('.reveal,.chapter-video,.impact-flow');
let lastScrollY = window.scrollY;
function updateReveals(){
  const currentY = window.scrollY;
  const scrollingUp = currentY < lastScrollY;
  const vh = window.innerHeight;
  reversibleReveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    const visible = rect.bottom > vh * 0.08 && rect.top < vh * 0.84;
    if(scrollingUp){
      if(rect.top > vh * 0.62 || rect.bottom < vh * 0.06) el.classList.remove('in');
      else if(visible) el.classList.add('in');
    }else if(visible){
      el.classList.add('in');
    }
  });
  lastScrollY = currentY;
}

$('#startExplore')?.addEventListener('click', () => $('#intro')?.scrollIntoView({behavior:'smooth'}));

function updateHero(){
  const hero = $('#home');
  const stage = $('.hero-stage', hero);
  if(!hero || !stage) return;
  const p = sectionProgress(hero);
  // 封面保持整屏锁定：滚动先驱动中央视频扩展，扩展完成后才释放到下一段内容。
  const cover = clamp((p - 0.015) / 0.86);
  const converge = clamp(p / 0.48);
  const enterP = clamp((p - 0.76) / 0.16);
  const btnP = clamp((p - 0.87) / 0.08);

  const easeCover = cover < 0.5 ? 2 * cover * cover : 1 - Math.pow(-2 * cover + 2, 2) / 2;
  const smallW = window.innerWidth < 700
    ? Math.min(300, window.innerWidth * 0.68)
    : Math.min(420, window.innerWidth * 0.32);
  const smallH = Math.min(window.innerHeight * 0.42, smallW / (4096 / 2160));
  const fullW = window.innerWidth;
  const fullH = window.innerHeight;
  stage.style.setProperty('--hero-w', `${smallW + (fullW - smallW) * easeCover}px`);
  stage.style.setProperty('--hero-h', `${smallH + (fullH - smallH) * easeCover}px`);
  stage.style.setProperty('--hero-radius', `${20 * (1 - easeCover)}px`);
  stage.style.setProperty('--hero-scale', '1');
  stage.style.setProperty('--hero-cover', cover.toFixed(3));
  stage.style.setProperty('--hero-top-y', `${converge * 250}px`);
  stage.style.setProperty('--hero-bottom-y', `${-converge * 235}px`);
  stage.style.setProperty('--hero-top-opacity', Math.max(0, 1 - converge * 1.5).toFixed(3));
  stage.style.setProperty('--hero-bottom-opacity', Math.max(0, 1 - converge * 1.5).toFixed(3));
  stage.style.setProperty('--hero-side-fade', clamp((p - 0.10) / 0.24).toFixed(3));
  stage.style.setProperty('--hero-enter-opacity', enterP.toFixed(3));
  stage.style.setProperty('--hero-btn-opacity', btnP.toFixed(3));
  stage.style.setProperty('--hero-enter-shift', `${(1 - enterP) * 48}px`);
}

function updateChapterVideos(){
  $$('.chapter-video').forEach(ch => {
    const r = ch.getBoundingClientRect();
    const p = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
    ch.style.setProperty('--scale', (1 + p * .1).toFixed(3));
  });
}

function updateDots(){
  const sections = ['home','intro','market','reason','impact','future','map'];
  let cur = 'home';
  for(const id of sections){
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top < window.innerHeight * .45) cur = id;
  }
  $$('.side-progress a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}

function updateScienceScenes(){
  $$('.science-scene').forEach(scene => {
    const p = sectionProgress(scene);
    const center = $('.center-dish', scene);
    if(center){
      const cp = clamp((p - 0.02) / 0.16);
      center.style.transform = `translate(-50%,-50%) scale(${(1 + cp * 0.08).toFixed(3)})`;
    }
    $$('.scene-card', scene).forEach(card => {
      const threshold = parseFloat(card.dataset.threshold || 0);
      const cp = clamp((p - threshold) / 0.15);
      const fromLeft = card.classList.contains('sc-top-left') || card.classList.contains('sc-bottom-left');
      const topCard = card.classList.contains('sc-top-left') || card.classList.contains('sc-top-right');
      const x = (1 - cp) * (fromLeft ? -120 : 120);
      const y = (1 - cp) * (topCard ? -18 : 18);
      card.style.opacity = cp.toFixed(3);
      card.style.transform = `translate(${x}px, ${y}px) scale(${(0.96 + cp * 0.04).toFixed(3)})`;
      card.style.filter = `blur(${((1 - cp) * 1.8).toFixed(2)}px)`;
    });
  });
}

function updateLogisticsScene(){
  const scene = $('#logisticsScene');
  if(!scene) return;
  const p = sectionProgress(scene);
  const map = $('.route-map', scene);
  const phase = $('.transport-phase', scene);

  // 第一阶段：路线图完整呈现；继续滚动后，路线图渐隐并切换到运输工具时效页。
  const mapFade = 1 - clamp((p - 0.18) / 0.20);
  if(map){
    map.style.opacity = mapFade.toFixed(3);
    map.style.transform = `translateY(${(1 - mapFade) * -28}px) scale(${(1 - (1 - mapFade) * 0.04).toFixed(3)})`;
  }
  if(phase){
    const bg = clamp((p - 0.30) / 0.12);
    phase.style.setProperty('--transport-bg', bg.toFixed(3));
    phase.style.setProperty('--transport-line', clamp((p - 0.38) / 0.10).toFixed(3));
  }

  // 第二阶段：三行从左侧进入，飞机最快、列车居中、轮船最慢；文字和交通工具同步移动。
  const rows = [$('.plane-row', scene), $('.train-row', scene), $('.ship-row', scene)];
  const thresholds = [0.42, 0.54, 0.66];
  const durations = [0.12, 0.17, 0.23];
  const distances = [-420, -340, -280];
  rows.forEach((row, i) => {
    if(!row) return;
    const rp = clamp((p - thresholds[i]) / durations[i]);
    row.style.opacity = rp.toFixed(3);
    row.style.transform = `translateX(${(1 - rp) * distances[i]}px)`;
  });
  const source = $('.transport-source', scene);
  if(source) source.style.opacity = clamp((p - 0.82) / 0.10).toFixed(3);
}

function updateTimelineScene(){
  const scene = $('#timelineScene');
  if(!scene) return;
  const p = sectionProgress(scene);
  const reveal = $('.timeline-reveal', scene);
  if(reveal){
    const visible = clamp((p - 0.06) / 0.88);
    reveal.style.clipPath = `inset(0 0 ${(1 - visible) * 100}% 0)`;
  }
}

$('#truffleToggle')?.addEventListener('click', e => e.currentTarget.classList.toggle('flipped'));

const iconRoot = $('#derivIcons');
const detail = $('#derivDetail');
if(iconRoot && detail){
  const groups = [derivativeItems.slice(0,4), derivativeItems.slice(4,8), derivativeItems.slice(8,12)];
  iconRoot.innerHTML = groups.map((group, gi) => `
    <div class="icon-strip">
      ${group.map((it, i) => {
        const idx = gi*4 + i;
        return `<button class="deriv-icon${it.thumbnailCard ? ' deriv-icon-card' : ''}" data-i="${idx}" title="${it.name}" aria-label="${it.name}"><img src="${it.icon}" alt="${it.name}"><span>${it.name}</span></button>`;
      }).join('')}
    </div>`).join('');
  function showDerivative(i){
    $$('.deriv-icon', iconRoot).forEach((b, idx) => b.classList.toggle('active', idx === i));
    detail.innerHTML = `<figure class="deriv-preview"><img src="${derivativeItems[i].card}" alt="${derivativeItems[i].name}产品详情卡"></figure>`;
  }
  showDerivative(0);
  iconRoot.addEventListener('mouseover', e => {
    const btn = e.target.closest('.deriv-icon');
    if(!btn) return;
    showDerivative(+btn.dataset.i);
  });
  iconRoot.addEventListener('focusin', e => {
    const btn = e.target.closest('.deriv-icon');
    if(!btn) return;
    showDerivative(+btn.dataset.i);
  });
  iconRoot.addEventListener('click', e => {
    const btn = e.target.closest('.deriv-icon');
    if(!btn) return;
    showDerivative(+btn.dataset.i);
  });
}

const impactRoot = $('#impactHoverIcons');
const impactDetail = $('#impactHoverDetail');
if(impactRoot && impactDetail){
  impactRoot.innerHTML = impactHoverItems.map((it, i) => `
    <button class="impact-hotspot" data-i="${i}" aria-label="${it.name}" title="${it.name}">
      <img src="${it.icon}" alt="${it.name}">
    </button>`).join('');

  const cardClasses = ['is-soft-a','is-soft-b','is-soft-c','is-soft-d'];
  function activateImpact(i){
    const it = impactHoverItems[i];
    $$('.impact-hotspot', impactRoot).forEach((btn, idx) => btn.classList.toggle('active', idx === i));
    impactDetail.classList.remove('empty');
    impactDetail.innerHTML = `<div class="impact-case-card ${cardClasses[i] || ''}">
      <p>${it.desc}</p>
      <small>${it.source || ''}</small>
    </div>`;
  }
  function resetImpact(){
    $$('.impact-hotspot', impactRoot).forEach(btn => btn.classList.remove('active'));
    impactDetail.innerHTML = '';
    impactDetail.classList.add('empty');
  }
  resetImpact();
  impactRoot.addEventListener('mouseover', e => {
    const btn = e.target.closest('.impact-hotspot');
    if(!btn) return;
    activateImpact(+btn.dataset.i);
  });
  impactRoot.addEventListener('focusin', e => {
    const btn = e.target.closest('.impact-hotspot');
    if(!btn) return;
    activateImpact(+btn.dataset.i);
  });
  impactRoot.addEventListener('mouseleave', resetImpact);
}

const gooseChart = $('#gooseChart');
const gooseTooltip = $('#gooseTooltip');
if(gooseChart && gooseTooltip){
  function showGoose(btn){
    $$('.goose-point', gooseChart).forEach(p => p.classList.toggle('active', p === btn));
    gooseTooltip.innerHTML = `${btn.dataset.year}<br><span>${btn.dataset.value}</span>`;
    if(btn.classList.contains('goose-2019')){
      gooseTooltip.style.left = '43.5%';
      gooseTooltip.style.top = '6%';
    }else{
      gooseTooltip.style.left = '70%';
      gooseTooltip.style.top = '61%';
    }
    gooseTooltip.classList.add('show');
  }
  function hideGoose(){
    $$('.goose-point', gooseChart).forEach(p => p.classList.remove('active'));
    gooseTooltip.classList.remove('show');
  }
  $$('.goose-point', gooseChart).forEach(btn => {
    btn.addEventListener('mouseenter', () => showGoose(btn));
    btn.addEventListener('focus', () => showGoose(btn));
    btn.addEventListener('click', () => showGoose(btn));
  });
  gooseChart.addEventListener('mouseleave', hideGoose);
}

let activeFuture = 0;
let showingAction = false;
function renderFuture(spin=false){
  const it = futureItems[activeFuture];
  const bg = $('#futureBg');
  const wheel = $('#futureWheel');
  const txt = $('#futureText');
  if(bg) bg.src = it.bg;
  if(wheel){
    wheel.src = it.wheel;
    wheel.alt = it.name;
    if(spin){
      wheel.classList.add('spin');
      setTimeout(() => wheel.classList.remove('spin'), 720);
    }
  }
  if(txt){
    txt.src = showingAction ? it.action : it.problem;
    txt.alt = it.name + (showingAction ? '举措篇' : '困境篇');
  }

}
$('.future-wheel-viewport')?.addEventListener('click', () => { activeFuture = (activeFuture + 1) % futureItems.length; showingAction = false; renderFuture(true); });
$('#futureTextCard')?.addEventListener('click', () => { showingAction = !showingAction; renderFuture(true); });
renderFuture(false);

window.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight'){ activeFuture = (activeFuture + 1) % futureItems.length; showingAction = false; renderFuture(true); }
  if(e.key === 'ArrowLeft'){ activeFuture = (activeFuture + futureItems.length - 1) % futureItems.length; showingAction = false; renderFuture(true); }
});

function updateAll(){
  updateReveals();
  updateHero();
  updateChapterVideos();
  updateDots();
  updateScienceScenes();
  updateLogisticsScene();
  updateTimelineScene();
}
window.addEventListener('scroll', updateAll, {passive:true});
window.addEventListener('resize', updateAll);
updateAll();
