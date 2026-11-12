gsap.registerPlugin(ScrollTrigger, Draggable);

/* ---------- buttery smooth scroll (Lenis) ---------- */
let lenis = null;
if (window.Lenis && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover)").matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
$("#yr").textContent = new Date().getFullYear();

/* ---------- split helpers ---------- */
function splitChars(el) {
  const text = el.textContent; el.textContent = "";
  return [...text].map(c => { const s = document.createElement("span"); s.className = "ch"; s.textContent = c; el.appendChild(s); return s; });
}
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent.trim());
  el.innerHTML = words.map(w => `<span class="w" aria-hidden="true"><i>${w}</i></span>`).join(" ");
  return $$(".w > i", el);
}

/* =========================================================
   WEBGL 3D SCENE (three.js)
   ========================================================= */
const ringEl = $("#ring3d"), rotEl = $("#rot");
let ringAngle = 0;
const state = { vel: 0, dragging: false, spin: { x: 0, y: 0 }, mouse: { x: 0, y: 0 } };
let gl = null;

function initGL() {
  if (!window.THREE) return null;
  const canvas = $("#gl");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05050f, 0.035);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);

  // core: glossy faceted gem + glowing wire shell
  const geo = new THREE.IcosahedronGeometry(1.5, 1);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x7c5cff, metalness: .75, roughness: .22, flatShading: true, emissive: 0x1a1055 });
  const core = new THREE.Mesh(geo, coreMat);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: .35 });
  const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.05, 2), wireMat);
  group.add(core, wire);

  // orbit rings
  const mkRing = (r, color, rx, ry) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, .014, 8, 160), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .8 }));
    m.rotation.set(rx, ry, 0); group.add(m); return m;
  };
  const r1 = mkRing(2.9, 0xff4d8d, 1.2, .2), r2 = mkRing(3.4, 0xffb938, .4, 1.1), r3 = mkRing(3.9, 0x22d3ee, 1.9, -.6);

  // small orbiting satellites
  const sats = [];
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Mesh(new THREE.OctahedronGeometry(.13 + Math.random() * .08),
      new THREE.MeshStandardMaterial({ color: [0xff4d8d, 0x22d3ee, 0xffb938][i % 3], emissive: [0x6a1030, 0x0a4a55, 0x5a3a00][i % 3], metalness: .5, roughness: .3 }));
    s.userData = { r: 3 + Math.random() * 1.2, sp: .3 + Math.random() * .5, off: Math.random() * 6.28, tilt: Math.random() * 1.5 };
    group.add(s); sats.push(s);
  }

  // lights
  scene.add(new THREE.AmbientLight(0xffffff, .35));
  const l1 = new THREE.PointLight(0x22d3ee, 2.2, 30); l1.position.set(5, 3, 5);
  const l2 = new THREE.PointLight(0xff4d8d, 2.2, 30); l2.position.set(-5, -3, 4);
  const l3 = new THREE.PointLight(0x7c5cff, 1.6, 30); l3.position.set(0, 5, -3);
  scene.add(l1, l2, l3);

  // particle field
  const N = innerWidth < 700 ? 1400 : 3200;
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const palette = [new THREE.Color(0x7c5cff), new THREE.Color(0x22d3ee), new THREE.Color(0xff4d8d), new THREE.Color(0xffb938)];
  for (let i = 0; i < N; i++) {
    const r = 5 + Math.random() * 18, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = r * Math.cos(ph);
    const c = palette[(Math.random() * 4) | 0]; col.set([c.r, c.g, c.b], i * 3);
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: .045, vertexColors: true, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(points);

  addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  });

  return { renderer, scene, camera, group, core, wire, coreMat, wireMat, rings: [r1, r2, r3], sats, points, lights: [l1, l2, l3] };
}

gl = initGL();

if (gl) {
  const { renderer, scene, camera, group, core, wire, coreMat, wireMat, rings, sats, points, lights } = gl;
  const mobile = () => innerWidth < 900;
  group.position.set(mobile() ? 0 : 2.6, mobile() ? 2.2 : 0, 0);
  group.scale.setScalar(0);
  gl.base = { x: 0, y: 0 };

  // pointer: parallax + drag-to-spin
  let lastX = 0, lastY = 0;
  addEventListener("pointermove", e => {
    state.mouse.x = e.clientX / innerWidth - .5;
    state.mouse.y = e.clientY / innerHeight - .5;
    if (state.dragging) {
      state.spin.y += (e.clientX - lastX) * .006;
      state.spin.x += (e.clientY - lastY) * .006;
    }
    lastX = e.clientX; lastY = e.clientY;
  });
  // only drag the object when pressing on the hero (empty area); other areas keep normal scrolling
  addEventListener("pointerdown", e => {
    if (e.target.closest("a,button,.card,.glass,.chip,.arena,.nav")) return;
    if (scrollY > innerHeight * .9) return;
    state.dragging = true; lastX = e.clientX; lastY = e.clientY;
  });
  addEventListener("pointerup", e => {
    if (state.dragging && Math.abs(e.clientX - lastX) < 3) pulse();
    state.dragging = false;
  });
  // click pulse (also fires on a plain click anywhere in the hero)
  function pulse() {
    if (reduce) return;
    gsap.timeline()
      .to(group.scale, { x: group.userData.s * 1.28, y: group.userData.s * 1.28, z: group.userData.s * 1.28, duration: .25, ease: "power2.out" })
      .to(group.scale, { x: group.userData.s, y: group.userData.s, z: group.userData.s, duration: 1, ease: "elastic.out(1,.4)" });
    gsap.fromTo(points.scale, { x: 1.18, y: 1.18, z: 1.18 }, { x: 1, y: 1, z: 1, duration: 1.4, ease: "power3.out" });
    gsap.fromTo(wireMat, { opacity: 1 }, { opacity: .35, duration: 1 });
    state.spin.y += 3; state.spin.x += 1;
  }
  group.userData.s = mobile() ? .7 : 1;

  gsap.ticker.add((t, dt) => {
    const d = dt / 1000;
    // inertial user spin that decays
    state.spin.x *= state.dragging ? 1 : .94;
    state.spin.y *= state.dragging ? 1 : .94;
    const idle = reduce ? 0 : 1;
    core.rotation.y += (.15 * idle + state.spin.y * .1) * (state.dragging ? 1 : 1) ;
    core.rotation.x += (.08 * idle + state.spin.x * .1);
    wire.rotation.y -= (.1 * idle) * d * 6 * .1 + state.spin.y * .04;
    wire.rotation.x += .05 * idle * d;
    rings[0].rotation.z += .004 * idle + state.spin.y * .02;
    rings[1].rotation.z -= .003 * idle + state.spin.y * .015;
    rings[2].rotation.x += .002 * idle + state.spin.x * .02;
    sats.forEach(s => {
      const u = s.userData, a = t * u.sp * idle + u.off;
      s.position.set(Math.cos(a) * u.r, Math.sin(a * .8) * u.r * Math.sin(u.tilt), Math.sin(a) * u.r * Math.cos(u.tilt));
      s.rotation.x += .02; s.rotation.y += .03;
    });
    points.rotation.y += (.0004 + state.vel * .00004) * idle;
    points.rotation.x += state.vel * .00001;
    state.vel *= .92;
    // mouse parallax on camera
    camera.position.x += (state.mouse.x * 1.6 - camera.position.x) * .05;
    camera.position.y += (-state.mouse.y * 1.1 - camera.position.y) * .05;
    camera.lookAt(0, 0, 0);
    // lights follow cursor for live reflections
    lights[0].position.x = 5 + state.mouse.x * 8; lights[0].position.y = 3 - state.mouse.y * 6;
    // keep the DOM tech ring locked to the gem on screen
    const v = group.position.clone().project(camera);
    const px = (v.x * .5 + .5) * innerWidth, py = (-v.y * .5 + .5) * innerHeight;
    const unit = innerHeight / (2 * Math.tan(27.5 * Math.PI / 180) * camera.position.z);
    ringEl.style.transform = "translate(" + px + "px," + py + "px)";
    ringEl.style.setProperty("--r", (unit * 2.75 * group.scale.x) + "px");
    ringAngle += (reduce ? 0 : .25) + state.spin.y * 1.2;
    rotEl.style.transform = "rotateX(-14deg) rotateY(" + ringAngle + "deg)";
    rotEl.style.setProperty("--a", ringAngle);
    renderer.render(scene, camera);
  });

  ScrollTrigger.create({ onUpdate: s => { state.vel = Math.min(Math.abs(s.getVelocity()) / 40, 60); } });

  // per-section choreography + colour shifts as you scroll
  const M = mobile();
  const stops = [
    // [section trigger, x, y, scale, core colour, wire colour]
    ["#about",      M ? 0 : 3.0, M ? 2.4 : 1.2, M ? .6 : .8, 0x22d3ee, 0xff4d8d],
    ["#what",       M ? 0 : 0,   M ? 2.4 : 0, M ? .6 : .9, 0xff4d8d, 0x7c5cff],
    ["#experience", M ? 0 : 3.0, M ? 2.4 : 0, M ? .6 : .85, 0xffb938, 0x22d3ee],
    ["#work",       0, M ? 2.4 : 3.1, .5, 0x7c5cff, 0xffb938],
    ["#playground", M ? 0 : 3.3, M ? 2.4 : 1.7, M ? .6 : .6, 0x22d3ee, 0x7c5cff],
    ["#skills",     M ? 0 : 3.3, M ? 2.4 : 1.7, M ? .6 : .65, 0xff4d8d, 0x22d3ee],
    ["#contact",    0, 0, M ? .7 : .85, 0x7c5cff, 0xff4d8d]
  ];
  const hex = h => new THREE.Color(h);
  stops.forEach(([sel, x, y, s, c1, c2]) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sel, start: "top 75%", end: "top 25%", scrub: 1 } });
    const cc = hex(c1), wc = hex(c2);
    tl.to(group.position, { x, y, ease: "power1.inOut" }, 0)
      .to(group.userData, { s, ease: "none", onUpdate: () => { if (!state.pulsing) group.scale.setScalar(group.userData.s); } }, 0)
      .to(coreMat.color, { r: cc.r, g: cc.g, b: cc.b }, 0)
      .to(wireMat.color, { r: wc.r, g: wc.g, b: wc.b }, 0);
  });
  // scroll rotation: whole group spins with page progress
  gsap.to(group.rotation, { y: Math.PI * 4, x: .6, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 1 } });

  // expose for intro
  gl.intro = () => gsap.to(group.scale, { x: group.userData.s, y: group.userData.s, z: group.userData.s, duration: 1.8, ease: "elastic.out(1,.55)" });
} else {
  $("#gl").style.display = "none";
}

/* ---------- loader + intro ---------- */
const heroChars = $$(".hero h1 .line").flatMap(splitChars);
gsap.set(heroChars, { yPercent: 110, rotationX: -90, transformOrigin: "50% 100% -40px" });
gsap.set([".hero .eyebrow", ".hero .lead", ".hero .cta > *", ".nav", ".hint-chip", ".scroll-hint"], { autoAlpha: 0 });
gsap.set([".hero .lead", ".hero .cta > *"], { y: 24 });
gsap.set(".nav", { y: -20 });

const counter = { v: 0 };
gsap.timeline({ defaults: { ease: "power3.out" } })
  .to(counter, { v: 100, duration: reduce ? .2 : 1.6, ease: "power2.inOut", onUpdate: () => ($("#count").textContent = Math.round(counter.v)) })
  .to("#bar", { scaleX: 1, duration: reduce ? .2 : 1.6, ease: "power2.inOut" }, 0)
  .to(".loader-inner", { y: -30, autoAlpha: 0, duration: .5 })
  .to("#loader", { yPercent: -100, duration: .9, ease: "expo.inOut" }, "-=.1")
  .add(() => gl && gl.intro(), "-=.6")
  .to(".nav", { autoAlpha: 1, y: 0, duration: .8 }, "-=.3")
  .to(".hero .eyebrow", { autoAlpha: 1, duration: .8 }, "<")
  .to(heroChars, { yPercent: 0, rotationX: 0, duration: 1.1, stagger: .05, ease: "back.out(1.4)" }, "<.1")
  .to(".hero .lead", { autoAlpha: 1, y: 0, duration: .8 }, "-=.6")
  .to(".hero .cta > *", { autoAlpha: 1, y: 0, stagger: .1, duration: .7 }, "-=.5")
  .to(".hint-chip", { autoAlpha: 1, stagger: .15, duration: .6 }, "-=.3")
  .to(".scroll-hint", { autoAlpha: 1, duration: .6 }, "-=.4")
  .set("#loader", { display: "none" })
  .add(() => ScrollTrigger.refresh());

if (!reduce) {
  gsap.to(".hero-copy", { yPercent: -18, autoAlpha: .2, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}

/* ---------- cursor ---------- */
if (fine && !reduce) {
  const c = $("#cursor"), d = $("#cursorDot");
  const cx = gsap.quickTo(c, "x", { duration: .45, ease: "power3" }), cy = gsap.quickTo(c, "y", { duration: .45, ease: "power3" });
  const dx = gsap.quickTo(d, "x", { duration: .1 }), dy = gsap.quickTo(d, "y", { duration: .1 });
  addEventListener("pointermove", e => { gsap.to([c, d], { opacity: 1, duration: .3, overwrite: "auto" }); cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); });
  document.addEventListener("pointerover", e => c.classList.toggle("hover", !!e.target.closest("a,.btn,.tilt,.chip")));
}

/* ---------- spotlight follows pointer on glass/cards ---------- */
document.addEventListener("pointermove", e => {
  const el = e.target.closest(".glass,.card");
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", (e.clientX - r.left) + "px");
  el.style.setProperty("--my", (e.clientY - r.top) + "px");
});

/* ---------- magnetic buttons ---------- */
if (fine && !reduce) {
  $$(".magnet").forEach(el => {
    const mx = gsap.quickTo(el, "x", { duration: .5, ease: "elastic.out(1,.5)" });
    const my = gsap.quickTo(el, "y", { duration: .5, ease: "elastic.out(1,.5)" });
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * .35); my((e.clientY - (r.top + r.height / 2)) * .35);
    });
    el.addEventListener("pointerleave", () => { mx(0); my(0); });
  });
}

/* ---------- 3D tilt ---------- */
if (fine && !reduce) {
  $$(".tilt").forEach(el => {
    const rx = gsap.quickTo(el, "rotationX", { duration: .5, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: .5, ease: "power3" });
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - .5) * 18);
      rx(-((e.clientY - r.top) / r.height - .5) * 18);
    });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}

/* ---------- scroll progress ---------- */
gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .2 } });

/* ---------- marquee ---------- */
if (!reduce) {
  const loop = gsap.to("#marquee", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
  ScrollTrigger.create({
    onUpdate: s => {
      const v = Math.min(Math.abs(s.getVelocity()) / 400, 6);
      gsap.to(loop, { timeScale: (s.direction === 1 ? 1 : -1) * (1 + v), duration: .3, overwrite: true });
      gsap.to(loop, { timeScale: s.direction === 1 ? 1 : -1, duration: 1.2, delay: .3, overwrite: "auto" });
    }
  });
}

/* ---------- reveals ---------- */
$$(".reveal-words").forEach(h => {
  gsap.from(splitWords(h), { yPercent: 115, rotationZ: 6, duration: 1, stagger: .045, ease: "power4.out", scrollTrigger: { trigger: h, start: "top 85%" } });
});
$$(".reveal").forEach(el => gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));

$$("[data-count]").forEach(el => {
  const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || "";
  const o = { v: 0 };
  gsap.to(o, { v: end, duration: 2, ease: "power2.out", onUpdate: () => (el.textContent = o.v.toFixed(dec) + suf), scrollTrigger: { trigger: el, start: "top 90%", once: true } });
});
gsap.from(".stat", { x: 60, rotationY: -35, autoAlpha: 0, stagger: .15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } });
/* ---------- stacked showcase panels ---------- */
const panels = $$(".panel");
panels.forEach((p, i) => {
  if (panels[i + 1]) gsap.to(p, { scale: .92, filter: "brightness(.6)", ease: "none",
    scrollTrigger: { trigger: panels[i + 1], start: "top 88%", end: "top 25%", scrub: true } });
});
// 01: layers fan apart in 3D
gsap.fromTo(".layer", { "--gap": "0px" }, { "--gap": "62px", duration: 1.6, ease: "elastic.out(1,.6)", scrollTrigger: { trigger: ".v1", start: "top 80%" } });
gsap.from(".layer", { autoAlpha: 0, duration: .8, stagger: .12, scrollTrigger: { trigger: ".v1", start: "top 80%" } });
// 02: bars grow, number counts
gsap.from(".bar", { scaleY: 0, duration: 1.4, stagger: .25, ease: "power4.out", scrollTrigger: { trigger: ".v2", start: "top 75%" } });
const bl = { v: 0 };
gsap.to(bl, { v: 500, duration: 2, ease: "power2.out", onUpdate: () => ($("#bigLead").textContent = Math.round(bl.v)), scrollTrigger: { trigger: ".v2", start: "top 75%" } });
// 03: path draws, dot travels, nodes pulse in, bugs tick off
(function () {
  const path = $("#flowPath"), dot = $("#flowDot"), len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.set(".bugs span", { y: 10 });
  const prog = { t: 0 };
  const setDot = () => { const p = path.getPointAtLength(prog.t * len); dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y); };
  setDot();
  gsap.timeline({ scrollTrigger: { trigger: ".v3", start: "top 75%" } })
    .to(path, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
    .to(prog, { t: 1, duration: 2, ease: "power2.inOut", onUpdate: setDot }, 0)
    .from(".fnode circle", { scale: 0, stagger: .6, duration: .6, ease: "back.out(2)" }, 0)
    .to(".bugs span", { opacity: 1, y: 0, stagger: .25, duration: .5 }, 1.2);
  if (!reduce) gsap.to(".fnode circle", { strokeWidth: 4, duration: 1, yoyo: true, repeat: -1, stagger: .3, ease: "sine.inOut" });
})();
// 04: 90 dots light up
ScrollTrigger.create({ trigger: ".v4", start: "top 75%", once: true, onEnter: () => {
  $$("#dots i").forEach((d, i) => gsap.delayedCall(i * .025, () => d.classList.add("on")));
  gsap.from(".stars", { scale: .6, autoAlpha: 0, duration: 1, ease: "elastic.out(1,.5)" });
} });

gsap.to("#tlFill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 70%", scrub: true } });
$$(".tl-item").forEach(el => gsap.from(el, { x: -50, rotationY: 25, autoAlpha: 0, transformPerspective: 900, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
gsap.from(".skill", { y: 80, rotationX: -40, transformPerspective: 900, autoAlpha: 0, stagger: .1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".skill-grid", start: "top 85%" } });

/* ---------- playground: draggable floating chips ---------- */
(function () {
  const arena = $("#arena");
  const names = ["React", "Angular", "Node.js", "Express", "MongoDB", "MySQL", "TypeScript", "Redux", "Zoho", "Zoho Development", "Tailwind", "Material UI", "Chakra UI", "Python", "Django", "PHP", "Git", "Figma", "Lead Gen", "Websites", "From Scratch", "AZ-900"];
  const hues = [260, 190, 330, 40, 150, 290];
  const chips = names.map((n, i) => {
    const c = document.createElement("div");
    c.className = "chip"; c.textContent = n; c.style.setProperty("--ch", hues[i % hues.length]);
    arena.appendChild(c); return c;
  });
  const place = () => {
    const W = arena.clientWidth, H = arena.clientHeight;
    // jittered grid so chips never start on top of each other
    const cols = Math.max(2, Math.round(Math.sqrt(chips.length * W / H))), rows = Math.ceil(chips.length / cols);
    const cw = W / cols, ch = H / rows;
    const order = chips.map((_, i) => i).sort(() => Math.random() - .5);
    chips.forEach((c, i) => {
      const k = order[i], col = k % cols, row = Math.floor(k / cols);
      const jx = Math.max(0, cw - c.offsetWidth - 12), jy = Math.max(0, ch - c.offsetHeight - 24);
      gsap.set(c, { x: Math.min(col * cw + 6 + Math.random() * jx, W - c.offsetWidth - 4), y: Math.min(row * ch + 8 + Math.random() * jy, H - c.offsetHeight - 14) });
    });
  };
  place();
  chips.forEach(c => {
    let float = !reduce && gsap.to(c, { y: "+=" + (10 + Math.random() * 14), rotation: (Math.random() - .5) * 8, duration: 2 + Math.random() * 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    Draggable.create(c, {
      bounds: arena, inertia: false,
      onPress() { float && float.pause(); gsap.to(c, { scale: 1.15, rotation: 0, duration: .25 }); c.style.zIndex = 5; },
      onRelease() {
        gsap.to(c, { scale: 1, duration: .6, ease: "elastic.out(1,.4)" });
        float && float.kill();
        if (!reduce) float = gsap.to(c, { y: "+=" + (10 + Math.random() * 14), duration: 2 + Math.random() * 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    });
  });
  // chips repel from cursor
  if (fine && !reduce) arena.addEventListener("pointermove", e => {
    const ar = arena.getBoundingClientRect();
    chips.forEach(c => {
      if (c._gsDragging) return;
      const r = c.getBoundingClientRect();
      const dx = (r.left + r.width / 2) - e.clientX, dy = (r.top + r.height / 2) - e.clientY;
      const dist = Math.hypot(dx, dy);
      if (dist < 90 && !Draggable.get(c).isPressed) gsap.to(c, { x: "+=" + (dx / dist) * 14, duration: .4, ease: "power2.out", overwrite: false });
    });
  });
  addEventListener("resize", () => ScrollTrigger.refresh());
})();

/* ---------- horizontal pinned work (desktop) ---------- */
ScrollTrigger.matchMedia({
  "(min-width: 901px)": () => {
    const track = $("#workTrack");
    const dist = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, { x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: "#work", pin: true, scrub: 1, end: () => "+=" + dist(), invalidateOnRefresh: true, anticipatePin: 1 } });
    $$(".card:not(.end)").forEach(card => {
      gsap.fromTo(card, { rotationY: 28, y: 40, scale: .92 }, { rotationY: -28, y: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 100%", end: "right 0%", scrub: true } });
    });
    gsap.from(".work-head > *", { y: 40, autoAlpha: 0, stagger: .1, duration: .9, scrollTrigger: { trigger: "#work", start: "top 80%" } });
  },
  "(max-width: 900px)": () => {
    $$(".card").forEach(card => gsap.from(card, { y: 60, autoAlpha: 0, duration: .9, scrollTrigger: { trigger: card, start: "top 90%" } }));
  }
});

/* ---------- restored extras: ring fade, floating orbs, panel parallax ---------- */
gsap.set("#ring3d", { autoAlpha: 0 });
gsap.to("#ring3d", { autoAlpha: 1, duration: 1.2, delay: 3.2 });
gsap.to("#ring3d", { autoAlpha: 0, ease: "none", immediateRender: false, scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true } });
if (!reduce) {
  gsap.to(".orb1", { x: -80, y: 70, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".orb2", { x: 90, y: -60, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" });
}
if (fine && !reduce) {
  $$(".panel").forEach(p => {
    const v = $(".p-visual", p);
    const rx = gsap.quickTo(v, "rotationX", { duration: .6, ease: "power3" }), ry = gsap.quickTo(v, "rotationY", { duration: .6, ease: "power3" });
    p.addEventListener("pointermove", e => { const r = p.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 16); rx(-((e.clientY - r.top) / r.height - .5) * 12); });
    p.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}

/* ---------- smooth anchors ---------- */
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const t = $(a.getAttribute("href")); if (!t) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(t, { duration: 1.6, easing: x => 1 - Math.pow(1 - x, 4) });
  else scrollTo({ top: t.getBoundingClientRect().top + scrollY, behavior: "auto" });
}));
addEventListener("load", () => ScrollTrigger.refresh());
