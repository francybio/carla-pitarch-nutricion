/* ==========================================================
   CARLA PITARCH — interacción
   ========================================================== */
(() => {
'use strict';

/* ----------------------------------------------------------
   DATOS
---------------------------------------------------------- */
const WA_NUMBER = '34621318084';
// minutos desde medianoche · 0 = domingo
const HOURS = { 0: null, 1: null, 2: [[540, 780], [960, 1140]], 3: null, 4: [[540, 780], [960, 1140]], 5: null, 6: null };
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const GOALS = [
  { id: 'digestion', n: 'Digestión e hinchazón', t: 'No se trata solo de quitar lo que te sienta mal: buscamos qué hay detrás de los síntomas y cuidamos tu microbiota para que toleres más y mejor.', link: ['#aprende', 'microbiota'] },
  { id: 'grasa', n: 'Perder grasa', t: 'Sin dietas milagro ni “semanas de castigo”. Comida real, saciante y hábitos que puedas mantener todo el año.', link: ['#plato'] },
  { id: 'deporte', n: 'Rendir entrenando', t: 'Adaptamos tu alimentación a tu entrenamiento y a tus objetivos. Lo que necesita un deportista de élite no tiene por qué ser lo que necesitas tú.', link: ['#aprende', 'deporte'] },
  { id: 'hierro', n: 'Hierro bajo', t: 'A veces no es cuestión de comer más hierro, sino de pequeños hábitos que afectan a su absorción. Y si sigue bajo, investigamos por qué.', link: ['#aprende', 'hierro'] },
  { id: 'colesterol', n: 'Colesterol', t: '¿Te sube aunque comas “bien” y hagas ejercicio? Hay motivos que quizá no estás teniendo en cuenta: los buscamos.', link: ['#aprende', 'colesterol'] },
  { id: 'habitos', n: 'Mejorar hábitos', t: 'Constancia por encima de la perfección: cambios pequeños que encajan en tu vida real y se quedan.', link: ['#consulta'] }
];

const MYTHS = [
  { q: 'El pan engorda.', a: 'mito', v: 'Mito.', e: 'El pan no tiene ninguna propiedad que engorde por sí solo. Muchas veces el problema es con qué lo acompañas (hola, crema de cacao). Un buen pan integral aporta fibra, vitaminas y minerales como el magnesio: úsalo en unas tostadas o para completar una ensalada.', src: ['Ver el reel', 'reel', 0] },
  { q: 'La vitamina C ayuda a absorber mejor el hierro.', a: 'real', v: 'Realidad.', e: 'Favorece el paso del hierro Fe³⁺ a Fe²⁺, una forma más soluble y fácilmente absorbible. Aliña con limón, añade pimiento o tomate y toma de postre fruta rica en vitamina C: naranja, kiwi, papaya o fresas.', src: ['Ver el carrusel', 'topic', 'hierro'] },
  { q: 'Cuanta más proteína tome, más músculo ganaré.', a: 'mito', v: 'No exactamente.', e: 'La mayoría de estudios coinciden en que a partir de 1,6–1,8 g/kg no se observan mayores beneficios en ganancia muscular. Si quieres ganar masa muscular, prioriza un entrenamiento de calidad, suficiente energía y un buen descanso.', src: ['Ver el carrusel', 'topic', 'deporte'] },
  { q: 'Si las legumbres me hinchan, lo mejor es eliminarlas.', a: 'mito', v: 'No siempre.', e: 'Las legumbres son alimentos muy saludables y muchas veces esas molestias tienen una explicación más sencilla de lo que parece. Quitarlas puede reducir los síntomas, pero no resuelve la causa y puede afectar a la diversidad de tu microbiota.', src: ['Ver el reel', 'reel', 1] },
  { q: 'Cocinar en una sartén de hierro fundido puede aportar hierro a la comida.', a: 'real', v: 'Realidad.', e: 'Cocinar en hierro fundido puede aumentar la cantidad de hierro de los alimentos, y la transferencia suele ser mayor en preparaciones húmedas y ácidas, como una salsa de tomate.', src: ['Ver el carrusel', 'topic', 'hierro'] },
  { q: 'Entrenar en ayunas me ayuda a perder más grasa.', a: 'mito', v: 'Depende.', e: 'Entrenar en ayunas puede fomentar la oxidación de grasas durante ese entrenamiento, pero oxidar grasas no significa quemar o perder grasa. La pérdida de grasa depende del déficit calórico generado a lo largo del día.', src: ['Ver el carrusel', 'topic', 'deporte'] },
  { q: 'Un café o un té justo después de comer no afecta al hierro.', a: 'mito', v: 'Mito.', e: 'Pueden reducir considerablemente la absorción del hierro no hemo: depende de la bebida, su concentración y la comida, llegando hasta un −90% en el caso del té. Si tienes las reservas bajas, sepáralos 1–2 horas de las comidas principales.', src: ['Ver el carrusel', 'topic', 'hierro'] },
  { q: 'Si como “sano” y hago ejercicio, mi colesterol no puede subir.', a: 'mito', v: 'Mito.', e: 'Una dieta muy “sana” puede ser alta en grasas saturadas (mantequilla, ghee, aceite de coco, quesos curados…). Y las hormonas también cuentan: en la transición a la menopausia, la caída del estradiol se asocia con un aumento del LDL.', src: ['Ver el carrusel', 'topic', 'colesterol'] },
  { q: 'Después de las vacaciones necesito un detox.', a: 'mito', v: 'Mito.', e: 'No necesitas compensar tus vacaciones con un detox, una dieta o dos semanas de castigo. Vuelve poco a poco a tus hábitos: tu salud se construye con lo que haces durante todo el año, no con lo que intentas arreglar en septiembre.', src: ['Leer más', 'topic', 'platos'] }
];

const FOODS = {
  veg: { n: 'Verdura', c: '#C5D3B6', items: [['brocoli', '🥦', 'Brócoli'], ['hojas', '🥬', 'Hojas verdes'], ['zanahoria', '🥕', 'Zanahoria'], ['tomate', '🍅', 'Tomate'], ['pimiento', '🫑', 'Pimiento'], ['pepino', '🥒', 'Pepino'], ['berenjena', '🍆', 'Berenjena']] },
  pro: { n: 'Proteína', c: '#EBB497', items: [['huevos', '🥚', 'Huevos'], ['pescado', '🐟', 'Pescado'], ['gambas', '🦐', 'Gambas'], ['pollo', '🍗', 'Pollo'], ['legumbres', '🫘', 'Legumbres']] },
  carb: { n: 'Carbohidrato de calidad', c: '#F6D98E', items: [['arroz', '🍚', 'Arroz integral'], ['patata', '🥔', 'Patata'], ['pan', '🍞', 'Pan integral'], ['boniato', '🍠', 'Boniato'], ['pasta', '🍝', 'Pasta integral']] },
  grasa: { n: 'Grasa saludable', c: '#D8ECBF', items: [['aguacate', '🥑', 'Aguacate'], ['aove', '🫒', 'AOVE'], ['frutos', '🥜', 'Frutos secos'], ['semillas', '🌻', 'Semillas']] },
  disfrute: { n: 'Lo que te haga disfrutar', c: '#F5DDB0', items: [['choco', '🍫', 'Chocolate negro'], ['fruta', '🍉', 'Fruta'], ['queso', '🧀', 'Queso'], ['cafe', '☕', 'Café']] }
};
const IDEAS = [
  { n: 'Bowl de garbanzos', sel: ['hojas', 'tomate', 'pepino', 'legumbres', 'boniato', 'aguacate', 'fruta'] },
  { n: 'Gambas con arroz', sel: ['brocoli', 'hojas', 'zanahoria', 'gambas', 'arroz', 'aove', 'choco'] },
  { n: 'Huevos y patata', sel: ['pimiento', 'tomate', 'hojas', 'huevos', 'patata', 'aove', 'cafe'] }
];
// zonas del plato en grados (0 = derecha, sentido horario)
const ZONES = { veg: [-78, 78], carb: [102, 168], pro: [192, 258] };

const EPISODES = [
  { src: 'assets/video/pan.mp4', poster: 'assets/img/pan_poster.jpg', thumb: 'assets/img/Dd6_Rm3RDR3_0.jpg', k: 'Reel · Nutri mitos', t: '¿El pan engorda?', d: 'Desmontamos otro mito nutricional.', time: '1:12' },
  { src: 'assets/video/legumbres.mp4', poster: 'assets/img/legumbres_poster.jpg', thumb: 'assets/img/Ddb2RsiMo7m_0.jpg', k: 'Reel · Nutri mitos', t: '¿Las legumbres te hinchan?', d: 'Antes de desterrarlas, hay algo que debes saber.', time: '1:09' },
  { src: 'assets/video/podcast.mp4', poster: 'assets/img/podcast_100.jpg', thumb: 'assets/img/podcast_25.jpg', k: 'Podcast · con Fit Generation', t: 'Microbiota, ansiedad y ánimo', d: 'Mitos sobre salud intestinal y la conexión intestino-cerebro.', time: '2:02', wide: true }
];

const TOPICS = [
  { id: 'hierro', n: 'Hierro bajo', slides: [0, 1, 2, 3, 4, 5, 6, 7].map(i => `DdUd4AFEZgi_${i}`), cap: '¿Tienes las reservas de hierro bajas y no sabes por qué? A veces no es solo cuestión de comer más hierro, sino de pequeños hábitos que afectan a su absorción.' },
  { id: 'deporte', n: 'Nutrición deportiva', slides: [0, 1, 2, 3, 4, 5].map(i => `Dd3ZfHFjFri_${i}`), cap: '5 mitos muy comunes entre personas que entrenan. Porque lo que necesita un deportista de élite no tiene por qué ser lo mismo que necesitas tú.' },
  { id: 'colesterol', n: 'Colesterol', slides: [0, 1, 2, 3, 4].map(i => `DdBeAdEjDIA_${i}`), cap: 'Mucha gente se sorprende cuando el colesterol sube a pesar de comer “bien”. No siempre se trata de comer menos grasa o de entrenar más.' },
  { id: 'microbiota', n: 'Microbiota · podcast', slides: [0, 1, 2, 3, 4, 5, 6].map(i => `Dd9Wgh6CDjN_${i}`), cap: '¿Eliminar lo que te sienta mal significa que has solucionado el problema? No siempre. Ideas del podcast con Fit Generation.' },
  { id: 'platos', n: 'Platos reales', slides: ['DeEiN1Dsc9c_0', 'DdGwgLAsvVM_0', 'DdrVuh_BBJ3_0', 'Dd6_Rm3RDR3_0', 'Ddb2RsiMo7m_0'], cap: 'Un plato nutritivo no tiene por qué llevarte horas de preparación. Sin báscula, sin cálculos, sin miedo.' }
];

/* ----------------------------------------------------------
   UTILIDADES
---------------------------------------------------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
const waLink = t => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
function scrollToEl(el, offset = -80) {
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.3 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* ----------------------------------------------------------
   HORARIO
---------------------------------------------------------- */
function madridNow() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value;
  return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday')), m: +g('hour') * 60 + +g('minute') };
}
const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
function renderStatus() {
  const { d, m } = madridNow();
  const h = HOURS[d];
  let open = false, text = '';
  if (h) {
    const cur = h.find(([a, b]) => m >= a && m < b);
    const next = h.find(([a]) => m < a);
    if (cur) { open = true; text = `En consulta ahora · hasta las ${hhmm(cur[1])}`; }
    else if (next) text = `Hoy hay consulta desde las ${hhmm(next[0])}`;
  }
  if (!text) {
    for (let i = 1; i <= 7; i++) {
      const nd = (d + i) % 7;
      if (HOURS[nd]) { text = `Próxima consulta: ${i === 1 ? 'mañana' : DAY_NAMES[nd].toLowerCase()} a las ${hhmm(HOURS[nd][0][0])}`; break; }
    }
  }
  $$('[data-status]').forEach(el => { el.classList.toggle('is-open', open); $('.status__text', el).textContent = text; });
  $('[data-hours]').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(i => {
    const x = HOURS[i];
    return `<li class="${i === d ? 'is-today' : ''} ${x ? '' : 'is-off'}"><span>${DAY_NAMES[i]}${i === d ? ' · hoy' : ''}</span><span>${x ? x.map(([a, b]) => `${hhmm(a)}–${hhmm(b)}`).join(' · ') : '—'}</span></li>`;
  }).join('');
}
function setupWa() {
  const href = waLink('¡Hola Carla! Me gustaría pedir información para una consulta de nutrición 🌿');
  $$('[data-wa]').forEach(a => a.setAttribute('href', href));
}

/* ----------------------------------------------------------
   HERO: objetivo + inclinación
---------------------------------------------------------- */
function setupGoals() {
  const box = $('.goal__chips');
  box.innerHTML = GOALS.map(g => `<button type="button" class="gchip" role="tab" aria-selected="false" data-g="${g.id}">${g.n}</button>`).join('');
  const txt = $('[data-goal-text]'), link = $('[data-goal-link]');
  box.addEventListener('click', e => {
    const b = e.target.closest('.gchip'); if (!b) return;
    const g = GOALS.find(x => x.id === b.dataset.g);
    $$('.gchip', box).forEach(c => c.setAttribute('aria-selected', String(c === b)));
    const p = document.createElement('p'); p.setAttribute('data-goal-text', ''); p.textContent = g.t;
    $('[data-goal-text]').replaceWith(p);
    link.hidden = false;
    link.textContent = g.link[1] ? 'Aprende más sobre esto →' : 'Ver cómo →';
    link.onclick = ev => { ev.preventDefault(); if (g.link[1]) setTopic(g.link[1]); scrollToEl($(g.link[0])); };
  });
  void txt;
}
function setupTilt() {
  const v = $('[data-tilt]');
  if (!v || reduce || window.matchMedia('(hover:none)').matches) return;
  const layers = $$('[data-depth]', v);
  let tx = 0, ty = 0, cx = 0, cy = 0;
  v.closest('.hero').addEventListener('pointermove', e => { const r = v.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; });
  (function loop() {
    cx += (tx - cx) * .08; cy += (ty - cy) * .08;
    layers.forEach(l => { const d = +l.dataset.depth; l.style.transform = `translate(${cx * d}px,${cy * d}px)`; });
    requestAnimationFrame(loop);
  })();
}

/* ----------------------------------------------------------
   JUEGO: ¿MITO O REALIDAD?
---------------------------------------------------------- */
function setupGame() {
  const stage = $('[data-stage]'), btns = $('[data-btns]'), dots = $('[data-dots]');
  let i = 0, score = 0, answered = false;
  dots.innerHTML = MYTHS.map(() => '<i></i>').join('');
  function dotState() { $$('i', dots).forEach((d, k) => d.classList.toggle('is-cur', k === i)); }
  function render() {
    answered = false;
    btns.classList.remove('is-next');
    const old = $('.gnext', btns); if (old) old.remove();
    if (i >= MYTHS.length) return end();
    const m = MYTHS[i];
    stage.innerHTML = `
      <div class="mcard" data-card>
        <div class="mface mface--front">
          <span class="mface__n">Frase ${i + 1} de ${MYTHS.length}</span>
          <p class="mface__q">“${m.q}”</p>
          <span class="mface__stamp mface__stamp--myth">Mito</span><span class="mface__stamp mface__stamp--real">Realidad</span>
          <span class="mface__hint"><span>← desliza: mito</span><span>realidad: desliza →</span></span>
        </div>
        <div class="mface mface--back"></div>
      </div>`;
    dotState();
    bindSwipe($('[data-card]', stage));
    if (hasGsap && !reduce) gsap.from('[data-card]', { y: 40, opacity: 0, rotate: -3, duration: .7, ease: 'power3.out' });
  }
  function answer(choice) {
    if (answered || i >= MYTHS.length) return;
    answered = true;
    const m = MYTHS[i], ok = choice === m.a;
    if (ok) score++;
    $('[data-score]').textContent = score;
    $$('i', dots)[i].classList.add(ok ? 'ok' : 'ko');
    const card = $('[data-card]', stage), back = $('.mface--back', card);
    back.classList.add(ok ? 'ok' : 'ko');
    back.innerHTML = `
      <span class="mface__res"><i>${ok ? '✓' : '✕'}</i>${ok ? '¡Bien visto!' : '¡Uy! Se te ha colado.'}</span>
      <div><p class="mface__verdict"><small>Carla dice</small>${m.v}</p><p class="mface__exp">${m.e}</p></div>
      <div class="mface__foot"><button type="button" class="mface__src" data-src>${m.src[0]} →</button><span class="mface__n">${m.a === 'mito' ? 'Era un mito' : 'Es realidad'}</span></div>`;
    $('[data-src]', back).addEventListener('click', () => goSource(m.src));
    card.style.transform = '';
    requestAnimationFrame(() => card.classList.add('is-flipped'));
    btns.classList.add('is-next');
    const next = document.createElement('button');
    next.type = 'button'; next.className = 'gnext';
    next.textContent = i === MYTHS.length - 1 ? 'Ver mi resultado →' : 'Siguiente frase →';
    next.addEventListener('click', () => { i++; render(); });
    btns.appendChild(next);
  }
  function end() {
    $$('i', dots).forEach(d => d.classList.remove('is-cur'));
    const msg = score === MYTHS.length ? '¡Nivel nutricionista! No se te escapa ni un mito.'
      : score >= 6 ? '¡Muy bien! Tienes buen ojo para los mitos… pero alguno se te ha colado.'
      : score >= 3 ? 'No está mal, aunque hay mitos que todavía se te cuelan. Para eso estoy.'
      : 'Esta vez han ganado los mitos. ¿Lo hablamos en consulta?';
    stage.innerHTML = `<div class="gend"><span class="mface__n">Tu resultado</span><p class="gend__score">${score}<small>/${MYTHS.length}</small></p><p>${msg}</p><div class="gend__ctas"><button type="button" class="btn btn--line" data-replay>Volver a jugar</button><a class="btn btn--forest" href="${waLink(`¡Hola Carla! He hecho ${score}/${MYTHS.length} en “¿Mito o realidad?” y me gustaría pedir una consulta 🌿`)}" target="_blank" rel="noopener">Pide tu consulta</a></div></div>`;
    btns.classList.add('is-next');
    $('[data-replay]', stage).addEventListener('click', () => { i = 0; score = 0; $('[data-score]').textContent = 0; $$('i', dots).forEach(d => d.className = ''); render(); });
  }
  function bindSwipe(card) {
    let sx = 0, dx = 0, down = false;
    const sm = $('.mface__stamp--myth', card), sr = $('.mface__stamp--real', card);
    card.addEventListener('pointerdown', e => { if (answered) return; down = true; sx = e.clientX; dx = 0; card.classList.add('is-drag'); card.setPointerCapture(e.pointerId); });
    card.addEventListener('pointermove', e => {
      if (!down) return;
      dx = e.clientX - sx;
      card.style.transform = `translateX(${dx}px) rotate(${dx * .04}deg)`;
      sm.style.opacity = Math.max(0, Math.min(1, -dx / 100));
      sr.style.opacity = Math.max(0, Math.min(1, dx / 100));
    });
    const up = () => {
      if (!down) return; down = false; card.classList.remove('is-drag');
      sm.style.opacity = sr.style.opacity = 0;
      if (Math.abs(dx) > 100) answer(dx < 0 ? 'mito' : 'real');
      else card.style.transform = '';
    };
    card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up);
  }
  $$('[data-answer]', btns).forEach(b => b.addEventListener('click', () => answer(b.dataset.answer)));
  document.addEventListener('keydown', e => {
    const r = $('#mitos').getBoundingClientRect();
    if (r.top > window.innerHeight * .6 || r.bottom < window.innerHeight * .4) return;
    if (e.key === 'ArrowLeft') answer('mito');
    if (e.key === 'ArrowRight') answer('real');
  });
  render();
}
function goSource(src) {
  if (src[1] === 'reel') { scrollToEl($('#reels')); setTimeout(() => playEpisode(src[2], true), 900); }
  else { setTopic(src[2]); scrollToEl($('#aprende')); }
}

/* ----------------------------------------------------------
   CONSTRUYE TU PLATO
---------------------------------------------------------- */
const plateSel = [];
function foodById(id) {
  for (const [g, grp] of Object.entries(FOODS)) { const it = grp.items.find(x => x[0] === id); if (it) return { g, id, e: it[1], n: it[2] }; }
  return null;
}
function placeItem(g) {
  const items = plateSel.filter(s => s.g === g && s.pos);
  const [a0, a1] = ZONES[g];
  let best = null, bestD = -1;
  for (let k = 0; k < 24; k++) {
    const a = (a0 + Math.random() * (a1 - a0)) * Math.PI / 180;
    const r = (g === 'veg' ? 50 : 62) + Math.random() * (g === 'veg' ? 92 : 78);
    const x = 200 + Math.cos(a) * r, y = 200 + Math.sin(a) * r;
    const dmin = items.reduce((m, s) => Math.min(m, Math.hypot(s.pos.x - x, s.pos.y - y)), 999);
    if (dmin > bestD) { bestD = dmin; best = { x, y }; }
    if (dmin > 62) break;
  }
  return best;
}
function renderPlate() {
  const box = $('[data-items]');
  box.innerHTML = plateSel.filter(s => ZONES[s.g]).map(s => `<button type="button" class="ditem" style="left:${s.pos.x / 4}%;top:${s.pos.y / 4}%" data-rm="${s.id}" aria-label="Quitar ${s.n}">${s.e}</button>`).join('');
  ['grasa', 'disfrute'].forEach(g => {
    $(`[data-bowl="${g}"] .bowl__items`).innerHTML = plateSel.filter(s => s.g === g).map(s => `<button type="button" data-rm="${s.id}" aria-label="Quitar ${s.n}">${s.e}</button>`).join('');
  });
  $$('.food').forEach(f => f.classList.toggle('is-in', plateSel.some(s => s.id === f.dataset.id)));
  const cnt = g => plateSel.filter(s => s.g === g).length;
  const c = { veg: cnt('veg'), pro: cnt('pro'), carb: cnt('carb'), grasa: cnt('grasa'), disfrute: cnt('disfrute') };
  $('.dish__zone--veg').classList.toggle('full', c.veg >= 2);
  $('.dish__zone--pro').classList.toggle('full', c.pro >= 1);
  $('.dish__zone--carb').classList.toggle('full', c.carb >= 1);
  const checks = [
    [c.veg >= 2, 'Verdura: la mitad del plato'],
    [c.pro >= 1, 'Una proteína'],
    [c.carb >= 1, 'Un carbohidrato de calidad'],
    [c.grasa >= 1, 'Grasa saludable'],
    [c.disfrute >= 1, 'Algo que te haga disfrutar']
  ];
  $('[data-checks]').innerHTML = checks.map(([ok, t]) => `<li class="${ok ? 'ok' : ''}"><i>✓</i>${t}</li>`).join('');
  const pct = Math.min(c.veg, 2) * 15 + (c.pro ? 20 : 0) + (c.carb ? 20 : 0) + (c.grasa ? 15 : 0) + (c.disfrute ? 15 : 0);
  $('[data-meter]').style.strokeDasharray = `${pct} 100`;
  $('[data-meter-n]').textContent = pct + '%';
  let msg;
  if (!plateSel.length) msg = 'Empieza por la verdura: debería ocupar la mitad del plato.';
  else if (c.veg < 2) msg = c.veg ? 'Bien empezado. Un poco más de verdura y llenas la mitad del plato.' : 'Falta verdura: que ocupe la mitad del plato.';
  else if (!c.pro) msg = 'Añade una proteína para nutrir tus tejidos y mantener la saciedad.';
  else if (!c.carb) msg = 'Un carbohidrato complejo te da energía constante y fibra para una buena digestión.';
  else if (c.carb > c.veg) msg = 'Ojo: hay más carbohidrato que verdura. Equilibra un poco el plato.';
  else if (!c.grasa) msg = 'Un toque de grasa saludable: tu salud hormonal y cerebral lo agradecen.';
  else if (!c.disfrute) msg = '¿Y aquello que te hace disfrutar del momento? También cuenta.';
  else msg = '¡Plato real, de un día real! Sin báscula, sin cálculos, sin miedo. ✨';
  $('[data-verdict]').textContent = msg;
}
function toggleFood(id) {
  const i = plateSel.findIndex(s => s.id === id);
  if (i > -1) plateSel.splice(i, 1);
  else { const f = foodById(id); if (!f) return; if (ZONES[f.g]) f.pos = placeItem(f.g); plateSel.push(f); }
  renderPlate();
}
function setupPlate() {
  $('[data-pantry]').innerHTML = Object.entries(FOODS).map(([g, grp]) => `
    <div class="pgroup" style="--c:${grp.c}"><h4><i></i>${grp.n}</h4><div>${grp.items.map(([id, e, n]) => `<button type="button" class="food" data-id="${id}" style="--c:${grp.c}"><span>${e}</span>${n}</button>`).join('')}</div></div>`).join('');
  $('[data-pantry]').addEventListener('click', e => { const b = e.target.closest('.food'); if (b) toggleFood(b.dataset.id); });
  $('.dish').addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) toggleFood(b.dataset.rm); });
  let ideaI = 0;
  $('[data-plate-idea]').addEventListener('click', () => {
    const idea = IDEAS[ideaI++ % IDEAS.length];
    plateSel.length = 0;
    idea.sel.forEach((id, k) => setTimeout(() => toggleFood(id), k * 130));
    $('[data-plate-idea]').textContent = `Idea: ${idea.n} · otra`;
  });
  $('[data-plate-reset]').addEventListener('click', () => { plateSel.length = 0; renderPlate(); });
  renderPlate();
}

/* ----------------------------------------------------------
   REELS (playlist)
---------------------------------------------------------- */
let epCur = 0;
function playEpisode(i, autoplay) {
  const frame = $('[data-frame]'), v = $('[data-video]');
  const ep = EPISODES[i];
  const changed = epCur !== i || !v.getAttribute('src');
  epCur = i;
  if (changed) {
    v.pause();
    v.setAttribute('src', ep.src);
    v.setAttribute('poster', ep.poster);
    $('[data-progress]').style.width = '0';
  }
  frame.classList.toggle('is-wide', !!ep.wide);
  $$('.ep').forEach((e, k) => e.classList.toggle('is-active', k === i));
  if (autoplay) { v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); }
}
function setupPlayer() {
  const list = $('[data-playlist]'), frame = $('[data-frame]'), v = $('[data-video]');
  list.innerHTML = EPISODES.map((e, i) => `
    <li><button type="button" class="ep" data-ep="${i}">
      <span class="ep__thumb"><img src="${e.thumb}" alt="" loading="lazy"></span>
      <span><span class="ep__k">${e.k}</span><span class="ep__t" style="display:block">${e.t}</span><span class="ep__d">${e.d}</span></span>
      <span><span class="ep__time">${e.time}</span><span class="ep__eq"><i></i><i></i><i></i></span></span>
    </button></li>`).join('');
  list.addEventListener('click', e => { const b = e.target.closest('[data-ep]'); if (b) playEpisode(+b.dataset.ep, true); });
  const sync = () => {
    frame.classList.toggle('is-playing', !v.paused);
    frame.classList.toggle('is-sound', !v.muted);
    $$('.ep').forEach((e, k) => e.classList.toggle('is-playing', k === epCur && !v.paused));
  };
  ['play', 'pause', 'volumechange', 'ended'].forEach(t => v.addEventListener(t, sync));
  v.addEventListener('timeupdate', () => { if (v.duration) $('[data-progress]').style.width = (v.currentTime / v.duration * 100) + '%'; });
  v.addEventListener('ended', () => playEpisode((epCur + 1) % EPISODES.length, true));
  const toggle = () => { if (!v.getAttribute('src')) return playEpisode(epCur, true); if (v.paused) { v.muted = false; v.play(); } else v.pause(); };
  $('[data-play]').addEventListener('click', toggle);
  v.addEventListener('click', toggle);
  $('[data-mute]').addEventListener('click', () => { v.muted = !v.muted; sync(); });
  new IntersectionObserver(([en]) => { if (!en.isIntersecting && !v.paused) v.pause(); }, { threshold: .15 }).observe(frame);
  playEpisode(0, false);
}

/* ----------------------------------------------------------
   APRENDE (carrusel por temas)
---------------------------------------------------------- */
let setTopic = () => {};
function setupLearn() {
  const tabs = $('[data-topics]'), track = $('[data-track]'), dots = $('[data-sdots]');
  tabs.innerHTML = TOPICS.map(t => `<button type="button" class="topic" role="tab" data-t="${t.id}">${t.n}<b>${t.slides.length}</b></button>`).join('');
  let cur = TOPICS[0];
  setTopic = id => {
    cur = TOPICS.find(t => t.id === id) || TOPICS[0];
    $$('.topic', tabs).forEach(b => b.setAttribute('aria-selected', String(b.dataset.t === cur.id)));
    track.innerHTML = cur.slides.map((s, i) => `<figure class="slide" style="animation-delay:${i * 60}ms"><img src="assets/img/${s}.jpg" alt="Diapositiva ${i + 1} de ${cur.slides.length} · ${cur.n}" loading="lazy" draggable="false"></figure>`).join('');
    dots.innerHTML = cur.slides.map((_, i) => `<button type="button" aria-label="Ir a la diapositiva ${i + 1}" data-d="${i}"></button>`).join('');
    $('[data-scap]').textContent = cur.cap;
    track.scrollLeft = 0;
    update();
  };
  const slideW = () => { const s = $('.slide', track); return s ? s.getBoundingClientRect().width + 18 : 300; };
  function update() {
    const idx = Math.round(track.scrollLeft / slideW());
    $$('button', dots).forEach((d, i) => d.classList.toggle('is-on', i === Math.min(idx, cur.slides.length - 1)));
    $('[data-prev]').disabled = track.scrollLeft < 10;
    $('[data-next]').disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 10;
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('.topic'); if (b) setTopic(b.dataset.t); });
  dots.addEventListener('click', e => { const b = e.target.closest('[data-d]'); if (b) track.scrollTo({ left: +b.dataset.d * slideW(), behavior: 'smooth' }); });
  $('[data-prev]').addEventListener('click', () => track.scrollBy({ left: -slideW(), behavior: 'smooth' }));
  $('[data-next]').addEventListener('click', () => track.scrollBy({ left: slideW(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  // arrastrar con ratón
  let down = false, sx = 0, sl = 0, moved = false;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
  window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-drag'); } track.scrollLeft = sl - dx; });
  window.addEventListener('pointerup', () => {
    if (!down) return; down = false; track.classList.remove('is-drag');
    if (moved) track.scrollTo({ left: Math.round(track.scrollLeft / slideW()) * slideW(), behavior: 'smooth' });
  });
  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') track.scrollBy({ left: slideW(), behavior: 'smooth' }); if (e.key === 'ArrowLeft') track.scrollBy({ left: -slideW(), behavior: 'smooth' }); });
  window.addEventListener('resize', update);
  setTopic('hierro');
}

/* ----------------------------------------------------------
   NAV, CONTADOR, SCROLL, LOADER
---------------------------------------------------------- */
function setupNav() {
  const nav = $('#nav'), burger = $('.burger'), menu = $('.menu');
  const setMenu = open => { burger.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open)); };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2 || a.hasAttribute('data-goal-link')) return;
    const t = $(id); if (!t) return;
    e.preventDefault(); setMenu(false); scrollToEl(t);
  }));
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = $$('.nav__links a');
  const io = new IntersectionObserver(ens => ens.forEach(en => { if (en.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['enfoque', 'mitos', 'plato', 'reels', 'aprende', 'consulta'].forEach(id => io.observe(document.getElementById(id)));
}
function setupCounter() {
  const el = $('[data-count]');
  new IntersectionObserver(([en], io) => {
    if (!en.isIntersecting) return; io.disconnect();
    const to = +el.dataset.count, t0 = performance.now();
    (function f(now) { const k = Math.min((now - t0) / 1800, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = (el.dataset.prefix || '') + Math.round(to * e); if (k < 1) requestAnimationFrame(f); })(t0);
  }, { threshold: .6 }).observe(el);
}
function setupScroll() {
  if (!hasGsap || reduce) { document.body.classList.add('no-gsap'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('[data-reveal]').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  gsap.fromTo('.about__media img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.footer__quote', { y: 60 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 30%', scrub: true } });
  $$('.steps li').forEach((li, k) => gsap.fromTo(li, { x: -40 }, { x: 0, ease: 'power3.out', duration: 1, delay: k * .08, scrollTrigger: { trigger: li, start: 'top 90%' } }));
}
function heroIntro() {
  if (!hasGsap || reduce) return;
  gsap.from('.hero__title .ln > span', { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: .12 });
  gsap.from('.hero__text > [data-hero]:not(.hero__title)', { opacity: 0, y: 26, duration: 1, ease: 'power3.out', stagger: .1, delay: .35 });
  gsap.from('.blob--main', { scale: .7, opacity: 0, duration: 1.6, ease: 'expo.out' });
  gsap.from('.blob--face, .badge, .leaf', { scale: 0, opacity: 0, duration: 1.1, ease: 'back.out(1.7)', stagger: .12, delay: .5 });
}
function runLoader() {
  const loader = $('.loader'), n = $('.loader__sub b');
  const segs = [['.seg--veg', 0, 50], ['.seg--pro', 50, 25], ['.seg--carb', 75, 25]];
  const t0 = performance.now(), D = reduce ? 200 : 2200;
  let done = false;
  (function f(now) {
    const k = Math.min((now - t0) / D, 1), p = (1 - Math.pow(1 - k, 2)) * 100;
    n.textContent = Math.round(p);
    segs.forEach(([s, off, len]) => {
      const fill = Math.max(0, Math.min(len, p - off));
      const el = $(s);
      if (!el) return;
      el.style.strokeDasharray = `${fill} 100`;
      el.style.strokeDashoffset = -off;
    });
    if (k < 1) requestAnimationFrame(f); else setTimeout(finish, 200);
  })(t0);
  function finish() {
    if (done) return; done = true;
    document.body.classList.remove('is-loading');
    if (hasGsap && !reduce) {
      gsap.to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut', onComplete: () => loader.remove() });
      setTimeout(heroIntro, 200);
    } else loader.remove();
  }
  setTimeout(finish, 5000);
}

/* ----------------------------------------------------------
   INIT
---------------------------------------------------------- */
function init() {
  setupWa();
  renderStatus(); setInterval(renderStatus, 60000);
  setupGoals();
  setupTilt();
  setupGame();
  setupPlate();
  setupPlayer();
  setupLearn();
  setupNav();
  setupCounter();
  setupScroll();
  runLoader();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
