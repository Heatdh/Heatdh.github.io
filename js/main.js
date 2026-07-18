/* ============================================
   RAYEN DHAHRI — Main JavaScript
   Theme, particles, scroll effects, navigation,
   typing, counters, compression visualization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Theme Toggle ---
  // Initial theme is applied by the inline <head> script to avoid a flash;
  // here we wire up the toggle and keep the meta theme-color in sync.
  const themeColors = { dark: '#0a0a12', light: '#f4f5fa' };

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = themeColors[theme];
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  applyTheme(currentTheme());

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // --- Page Loader ---
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 300);
    });
    // Fallback: hide after 2s
    setTimeout(() => loader.classList.add('hidden'), 2000);
  }

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Mobile Nav Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    const setOpen = (open) => {
      navToggle.classList.toggle('open', open);
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', () => {
      setOpen(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) setOpen(false);
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal, .stagger-children');
  if (reveals.length) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(el => observer.observe(el));
    } else {
      // No IO support or reduced motion: show everything immediately
      reveals.forEach(el => el.classList.add('visible'));
    }
  }

  // --- Typing Effect ---
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const strings = [
      'Machine Learning Research Scientist',
      'Efficient AI & Model Compression',
      'Edge & On-Device Inference',
      'Computer Vision & LLMs'
    ];
    if (prefersReducedMotion) {
      typedEl.textContent = strings[0];
    } else {
      let stringIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let isPaused = false;

      function typeEffect() {
        const current = strings[stringIndex];

        if (isPaused) {
          isPaused = false;
          isDeleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }

        if (!isDeleting) {
          typedEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) {
            isPaused = true;
            setTimeout(typeEffect, 100);
            return;
          }
          setTimeout(typeEffect, 70 + Math.random() * 40);
        } else {
          typedEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            setTimeout(typeEffect, 500);
            return;
          }
          setTimeout(typeEffect, 35);
        }
      }

      setTimeout(typeEffect, 1000);
    }
  }

  // --- Particle Canvas (theme-aware, cursor-interactive) ---
  const canvas = document.getElementById('particles-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 180;
    const mouse = { x: null, y: null };

    const PALETTES = {
      dark: {
        dots: [[0, 212, 255], [139, 92, 246], [244, 114, 182], [34, 211, 238]],
        line: [139, 92, 246],
        lineAlpha: 0.12,
        dotAlpha: 0.5
      },
      light: {
        dots: [[0, 119, 194], [109, 40, 217], [219, 39, 119], [14, 116, 144]],
        line: [109, 40, 217],
        lineAlpha: 0.1,
        dotAlpha: 0.35
      }
    };

    let palette = PALETTES[currentTheme()];
    window.addEventListener('themechange', (e) => {
      palette = PALETTES[e.detail.theme] || PALETTES.dark;
      particles.forEach(p => p.recolor());
    });

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alphaScale = Math.random() * 0.8 + 0.2;
        this.recolor();
      }

      recolor() {
        this.color = palette.dots[Math.floor(Math.random() * palette.dots.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle drift away from the cursor
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 90) {
            const push = (90 - dist) / 90 * 0.03;
            this.vx += (dx / dist) * push;
            this.vy += (dy / dist) * push;
          }
        }
        // Cap speed so pushes don't accumulate
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > 0.8) {
          this.vx = (this.vx / speed) * 0.8;
          this.vy = (this.vy / speed) * 0.8;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const a = palette.dotAlpha * this.alphaScale;
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${a})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      const [lr, lg, lb] = palette.line;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * palette.lineAlpha;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        // Faint link from particles to the cursor
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST) {
            const opacity = (1 - dist / MOUSE_DIST) * palette.lineAlpha * 1.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });
    window.addEventListener('pointerleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  // --- Animated Stat Counters ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length) {
    const runCounter = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statNumbers.forEach(el => counterObserver.observe(el));
    } else {
      statNumbers.forEach(runCounter);
    }
  }

  // --- Category Filter (projects & blog) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.glass-card[data-category]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;

        projectCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  // --- Compression Visualization (homepage) ---
  const vizCanvas = document.getElementById('compression-canvas');
  if (vizCanvas) {
    const vctx = vizCanvas.getContext('2d');
    const LAYERS = [6, 10, 12, 10, 4];
    const TARGET_SPARSITY = 0.8;
    const weightsEl = document.getElementById('viz-weights');
    const sparsityEl = document.getElementById('viz-sparsity');
    const statusEl = document.getElementById('viz-status');
    const replayBtn = document.getElementById('viz-replay');

    let nodes = [];      // [{x, y, layer}]
    let edges = [];      // [{a, b, w, alive, alpha}]
    let pulses = [];     // [{edge, t, speed}]
    let pruneQueue = [];
    let phase = 'dense'; // dense -> pruning -> sparse
    let phaseStart = performance.now();
    let hoverNode = null;
    let vizAnim = null;
    let dpr = Math.max(window.devicePixelRatio || 1, 1);

    function vizColors() {
      const styles = getComputedStyle(document.documentElement);
      return {
        edge: styles.getPropertyValue('--accent-purple').trim() || '#8b5cf6',
        edgeStrong: styles.getPropertyValue('--accent-blue').trim() || '#00d4ff',
        node: styles.getPropertyValue('--accent-cyan').trim() || '#22d3ee',
        highlight: styles.getPropertyValue('--accent-pink').trim() || '#f472b6',
        text: styles.getPropertyValue('--text-muted').trim() || '#6a6a8a'
      };
    }
    let colors = vizColors();
    window.addEventListener('themechange', () => { colors = vizColors(); });

    function cssSize() {
      const rect = vizCanvas.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    }

    function layout() {
      dpr = Math.max(window.devicePixelRatio || 1, 1);
      const { w, h } = cssSize();
      vizCanvas.width = Math.round(w * dpr);
      vizCanvas.height = Math.round(h * dpr);
      vctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const padX = Math.max(w * 0.08, 40);
      const padY = 36;
      LAYERS.forEach((count, li) => {
        const x = padX + (w - padX * 2) * (li / (LAYERS.length - 1));
        for (let ni = 0; ni < count; ni++) {
          const y = padY + (h - padY * 2) * (count === 1 ? 0.5 : ni / (count - 1));
          nodes.push({ x, y, layer: li });
        }
      });
    }

    function buildNetwork() {
      edges = [];
      pulses = [];
      let offset = 0;
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const aStart = offset;
        const bStart = offset + LAYERS[li];
        for (let i = 0; i < LAYERS[li]; i++) {
          for (let j = 0; j < LAYERS[li + 1]; j++) {
            edges.push({
              a: aStart + i,
              b: bStart + j,
              w: Math.random(),
              alive: true,
              alpha: 1
            });
          }
        }
        offset += LAYERS[li];
      }
      // Prune weakest weights first — magnitude pruning, like the real thing
      pruneQueue = edges.slice().sort((e1, e2) => e1.w - e2.w)
        .slice(0, Math.floor(edges.length * TARGET_SPARSITY));
      phase = 'dense';
      phaseStart = performance.now();
      updateReadout();
    }

    function aliveCount() {
      return edges.reduce((n, e) => n + (e.alive ? 1 : 0), 0);
    }

    function updateReadout() {
      if (!weightsEl) return;
      const alive = aliveCount();
      weightsEl.textContent = alive + ' / ' + edges.length;
      sparsityEl.textContent = Math.round((1 - alive / edges.length) * 100) + '%';
      statusEl.textContent = phase === 'dense' ? 'dense baseline'
        : phase === 'pruning' ? 'pruning…'
        : 'sparse & fast';
    }

    function spawnPulse() {
      const aliveEdges = edges.filter(e => e.alive);
      if (!aliveEdges.length) return;
      pulses.push({
        edge: aliveEdges[Math.floor(Math.random() * aliveEdges.length)],
        t: 0,
        speed: 0.012 + Math.random() * 0.015
      });
    }

    function step(now) {
      const elapsed = now - phaseStart;

      if (phase === 'dense' && elapsed > 1400) {
        phase = 'pruning';
        phaseStart = now;
        updateReadout();
      } else if (phase === 'pruning') {
        // Remove a few edges per frame until the queue is empty
        const toPrune = Math.max(1, Math.floor(pruneQueue.length / 140));
        for (let k = 0; k < toPrune && pruneQueue.length; k++) {
          pruneQueue.shift().alive = false;
        }
        updateReadout();
        if (!pruneQueue.length) {
          phase = 'sparse';
          phaseStart = now;
          updateReadout();
        }
      }

      // Fade pruned edges out smoothly
      edges.forEach(e => {
        if (!e.alive && e.alpha > 0) e.alpha = Math.max(0, e.alpha - 0.03);
      });

      // Keep the surviving network "computing"
      if (Math.random() < (phase === 'sparse' ? 0.35 : 0.15)) spawnPulse();
      pulses = pulses.filter(p => p.edge.alive && p.t <= 1);
      pulses.forEach(p => { p.t += p.speed; });
    }

    function draw() {
      const { w, h } = cssSize();
      vctx.clearRect(0, 0, w, h);

      const highlightSet = hoverNode === null ? null : new Set([hoverNode]);

      // Edges
      edges.forEach(e => {
        if (e.alpha <= 0) return;
        const na = nodes[e.a], nb = nodes[e.b];
        const isHl = highlightSet && (highlightSet.has(e.a) || highlightSet.has(e.b));
        const base = e.alive ? (0.08 + e.w * 0.35) : 0.3;
        vctx.beginPath();
        vctx.moveTo(na.x, na.y);
        vctx.lineTo(nb.x, nb.y);
        vctx.strokeStyle = isHl ? colors.highlight : (e.w > 0.75 ? colors.edgeStrong : colors.edge);
        vctx.globalAlpha = (isHl ? Math.min(base * 2.5, 0.9) : base) * e.alpha;
        vctx.lineWidth = isHl ? 1.6 : (0.5 + e.w);
        vctx.stroke();
      });

      // Pulses
      pulses.forEach(p => {
        const na = nodes[p.edge.a], nb = nodes[p.edge.b];
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;
        vctx.beginPath();
        vctx.arc(x, y, 2.2, 0, Math.PI * 2);
        vctx.fillStyle = colors.edgeStrong;
        vctx.globalAlpha = 0.9;
        vctx.fill();
      });

      // Nodes
      nodes.forEach((n, idx) => {
        const degree = edges.reduce((d, e) => d + ((e.alive && (e.a === idx || e.b === idx)) ? 1 : 0), 0);
        const r = 3 + Math.min(degree * 0.25, 4);
        vctx.beginPath();
        vctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        vctx.fillStyle = idx === hoverNode ? colors.highlight : colors.node;
        vctx.globalAlpha = degree === 0 ? 0.25 : 0.9;
        vctx.fill();
      });

      vctx.globalAlpha = 1;
    }

    function loop(now) {
      step(now);
      draw();
      vizAnim = requestAnimationFrame(loop);
    }

    function renderStatic() {
      // Reduced motion: jump straight to the pruned network, no animation
      pruneQueue.forEach(e => { e.alive = false; e.alpha = 0; });
      pruneQueue = [];
      phase = 'sparse';
      updateReadout();
      draw();
    }

    vizCanvas.addEventListener('pointermove', (e) => {
      const rect = vizCanvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best = null, bestDist = 22;
      nodes.forEach((n, idx) => {
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < bestDist) { best = idx; bestDist = d; }
      });
      hoverNode = best;
      if (prefersReducedMotion) draw();
    });
    vizCanvas.addEventListener('pointerleave', () => {
      hoverNode = null;
      if (prefersReducedMotion) draw();
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        buildNetwork();
        if (prefersReducedMotion) renderStatic();
      });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        layout();
        if (prefersReducedMotion) renderStatic(); else draw();
      }, 150);
    });

    document.addEventListener('visibilitychange', () => {
      if (prefersReducedMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(vizAnim);
      } else {
        vizAnim = requestAnimationFrame(loop);
      }
    });

    layout();
    buildNetwork();
    if (prefersReducedMotion) {
      renderStatic();
    } else {
      vizAnim = requestAnimationFrame(loop);
    }
  }
});
