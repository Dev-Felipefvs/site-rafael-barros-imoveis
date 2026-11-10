/* =========================================================
   Rafael Barros Corretor de Imóveis — interações
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP = '5582998314023';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;

  /* ---------- Dados dos projetos (EDITAR conforme o portfólio real) ---------- */
  var PROJECTS = {
    familia: {
      index: '01',
      title: 'Lançamento com área de lazer',
      cat: 'Empreendimento',
      desc: 'Torre residencial com piscina, área verde e lazer completo para a família.',
      facts: [['Tipo', 'Empreendimento'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-01.jpg', 'Lançamento com área de lazer']]
    },
    sonho: {
      index: '02',
      title: 'A 5 minutos da Pajuçara',
      cat: 'Empreendimento',
      desc: 'Edifício a poucos passos da Praia da Pajuçara, próximo à Praça Lions — ótimo para morar ou investir.',
      facts: [['Tipo', 'Empreendimento'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-02.jpg', 'A 5 minutos da Pajuçara']]
    },
    chave: {
      index: '03',
      title: 'Vista aérea do empreendimento',
      cat: 'Empreendimento',
      desc: 'Empreendimento residencial em região valorizada de Maceió, com fácil acesso e boa infraestrutura no entorno.',
      facts: [['Tipo', 'Empreendimento'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-03.jpg', 'Vista aérea do empreendimento']]
    },
    reconhecimento: {
      index: '04',
      title: 'Localização privilegiada',
      cat: 'Lazer e detalhes',
      desc: 'Condomínio cercado de área verde, perto de comércio, escolas e serviços.',
      facts: [['Tipo', 'Lazer e detalhes'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-04.jpg', 'Localização privilegiada']]
    },
    conquistei: {
      index: '05',
      title: 'Condomínio ao pôr do sol',
      cat: 'Empreendimento',
      desc: 'Condomínio fechado com portaria e torres residenciais, ideal para quem busca segurança e conforto.',
      facts: [['Tipo', 'Empreendimento'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-05.jpg', 'Condomínio ao pôr do sol'], ['assets/img/varanda.jpg', 'Varanda gourmet']]
    },
    obra: {
      index: '06',
      title: 'Área de lazer completa',
      cat: 'Lazer e detalhes',
      desc: 'Piscina, espaço gourmet e áreas de convivência para aproveitar sem sair de casa.',
      facts: [['Tipo', 'Lazer e detalhes'], ['Cidade', 'Maceió — AL'], ['Informações', 'Valores e disponibilidade sob consulta']],
      images: [['assets/img/imovel-06.jpg', 'Área de lazer completa']]
    }
  };

  /* ---------- Pronto: dispara animações do hero ---------- */
  function ready() {
    requestAnimationFrame(function () { body.classList.add('is-ready'); });
  }
  // A cortina de abertura dura ~1,6s; o hero entra logo depois
  if (reduceMotion) { ready(); }
  else { setTimeout(ready, 1350); }

  /* ---------- Header ---------- */
  var header = document.getElementById('header');
  var lastY = window.scrollY;
  var waFloat = document.querySelector('.wa-float');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    // Esconde o header ao rolar para baixo e mostra ao subir
    if (!body.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > 600 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    waFloat.classList.toggle('is-visible', y > window.innerHeight * 0.7);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
    body.classList.toggle('is-locked', open);
    if (open) header.classList.remove('is-hidden');
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && menu.classList.contains('is-open')) setMenu(false);
  });

  /* ---------- Reveal ao rolar ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Parallax suave (hero e CTA) ---------- */
  var heroMedia = document.querySelector('.hero__media');
  var ctaMedia = document.querySelector('.cta__media');
  var cta = document.querySelector('.cta');
  var ticking = false;

  function parallax() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    if (y < vh * 1.2) heroMedia.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    var r = cta.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      var p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
      ctaMedia.style.transform = 'translate3d(0,' + (p * -60).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  if (!reduceMotion) {
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
    parallax();
  }

  /* ---------- Link ativo no menu ---------- */
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = ['inicio', 'sobre', 'projetos', 'servicos', 'contato']
    .map(function (id) { return document.getElementById(id); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ---------- Filtro de projetos ---------- */
  var grid = document.getElementById('projects-grid');
  var cards = grid.querySelectorAll('.project');
  var filters = document.querySelectorAll('.filter');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      grid.classList.toggle('is-filtered', f !== 'all');
      cards.forEach(function (card) {
        var show = f === 'all' || card.dataset.cat === f;
        card.classList.toggle('is-hidden', !show);
        card.classList.remove('is-entering');
        if (show) {
          card.classList.add('is-visible');
          void card.offsetWidth; // reinicia a animação
          card.classList.add('is-entering');
        }
      });
    });
  });

  /* ---------- Modais ---------- */
  var lastFocus = null;
  var openModalEl = null;

  function focusables(el) {
    return Array.prototype.filter.call(
      el.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'),
      function (n) { return n.offsetParent !== null; }
    );
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    openModalEl = modal;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('is-locked');
    var panel = modal.querySelector('.modal__panel');
    panel.scrollTop = 0;
    setTimeout(function () {
      var close = modal.querySelector('.modal__close');
      if (close) close.focus();
    }, 50);
  }

  function closeModal() {
    if (!openModalEl) return;
    openModalEl.classList.remove('is-open');
    openModalEl.setAttribute('aria-hidden', 'true');
    body.classList.remove('is-locked');
    openModalEl = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open-modal]');
    if (opener) { openModal(opener.dataset.openModal); return; }
    var closer = e.target.closest('[data-close-modal]');
    if (closer && openModalEl) {
      // links internos dentro do modal: fecha e segue a âncora
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!openModalEl) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
      return;
    }
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var f = focusables(openModalEl);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (openModalEl.id === 'project-modal') {
      if (e.key === 'ArrowRight') stepProject(1);
      if (e.key === 'ArrowLeft') stepProject(-1);
    }
  });

  /* ---------- Modal de projeto ---------- */
  var order = Object.keys(PROJECTS);
  var current = null;
  var pmImage = document.getElementById('pm-image');
  var pmThumbs = document.getElementById('pm-thumbs');

  function setImage(src, alt) {
    if (pmImage.getAttribute('src') === src) return;
    pmImage.classList.add('is-fading');
    var img = new Image();
    img.onload = img.onerror = function () {
      pmImage.src = src;
      pmImage.alt = alt;
      requestAnimationFrame(function () { pmImage.classList.remove('is-fading'); });
    };
    img.src = src;
  }

  function renderProject(key) {
    var p = PROJECTS[key];
    if (!p) return;
    current = key;
    document.getElementById('pm-index').textContent = p.index;
    document.getElementById('pm-cat').textContent = p.cat;
    document.getElementById('pm-title').textContent = p.title;
    document.getElementById('pm-desc').textContent = p.desc;

    var facts = document.getElementById('pm-facts');
    facts.innerHTML = '';
    p.facts.forEach(function (f) {
      var row = document.createElement('div');
      var dt = document.createElement('dt'); dt.textContent = f[0];
      var dd = document.createElement('dd'); dd.textContent = f[1];
      row.appendChild(dt); row.appendChild(dd); facts.appendChild(row);
    });

    setImage(p.images[0][0], p.images[0][1]);
    pmThumbs.innerHTML = '';
    if (p.images.length > 1) {
      p.images.forEach(function (im, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ver imagem ' + (i + 1) + ': ' + im[1]);
        if (i === 0) b.classList.add('is-active');
        var t = document.createElement('img');
        t.src = im[0].replace('.jpg', '-sm.jpg');
        t.alt = '';
        b.appendChild(t);
        b.addEventListener('click', function () {
          pmThumbs.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
          b.classList.add('is-active');
          setImage(im[0], im[1]);
        });
        pmThumbs.appendChild(b);
      });
    }
  }

  function stepProject(dir) {
    var i = order.indexOf(current);
    renderProject(order[(i + dir + order.length) % order.length]);
  }

  document.querySelectorAll('[data-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      renderProject(btn.dataset.project);
      openModal('project-modal');
    });
  });
  document.getElementById('pm-prev').addEventListener('click', function () { stepProject(-1); });
  document.getElementById('pm-next').addEventListener('click', function () { stepProject(1); });

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form__status');
  var tel = document.getElementById('f-tel');

  // máscara simples de telefone
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    tel.value = out;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['f-nome', 'f-tel', 'f-msg'].forEach(function (id) {
      var input = document.getElementById(id);
      var valid = input.value.trim().length > (id === 'f-tel' ? 9 : 1);
      input.parentElement.classList.toggle('is-invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    var email = document.getElementById('f-email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.parentElement.classList.add('is-invalid');
      if (ok) email.focus();
      ok = false;
    } else {
      email.parentElement.classList.remove('is-invalid');
    }
    if (!ok) { status.textContent = 'Por favor, preencha os campos destacados.'; return; }

    var data = new FormData(form);
    var lines = [
      'Olá, Rafael! Vim pelo site e gostaria de falar sobre um imóvel.',
      '',
      '*Nome:* ' + data.get('nome'),
      '*Telefone:* ' + data.get('telefone')
    ];
    if (data.get('email')) lines.push('*E-mail:* ' + data.get('email'));
    lines.push('*Interesse:* ' + data.get('tipo'));
    lines.push('', '*O que procuro:*', data.get('mensagem'));

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    status.textContent = 'Abrindo o WhatsApp para concluir o envio…';
    window.open(url, '_blank', 'noopener');
  });

  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      el.parentElement.classList.remove('is-invalid');
      status.textContent = '';
    });
  });

  /* ---------- Ano no rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
