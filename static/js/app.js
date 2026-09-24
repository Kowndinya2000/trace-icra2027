/* TRACE project page: no frameworks, analytics, or external runtime requests. */
'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-menu');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('is-open', !expanded);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});

// Native controls remain available; chapters seek without opening a second player.
const overviewVideo = document.querySelector('#overview-video');
const chapterButtons = [...document.querySelectorAll('[data-seek]')];
let pendingSeek = null;
overviewVideo.addEventListener('loadedmetadata', () => {
  if (pendingSeek !== null) {
    overviewVideo.currentTime = pendingSeek;
    pendingSeek = null;
  }
});
chapterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const time = Number(button.dataset.seek);
    if (overviewVideo.readyState >= 1) overviewVideo.currentTime = time;
    else { pendingSeek = time; overviewVideo.load(); }
    overviewVideo.play().catch(() => { /* The native play control remains available. */ });
  });
});
overviewVideo.addEventListener('timeupdate', () => {
  chapterButtons.forEach((button, index) => {
    const start = Number(button.dataset.seek);
    const end = chapterButtons[index + 1] ? Number(chapterButtons[index + 1].dataset.seek) : Infinity;
    const active = overviewVideo.currentTime >= start && overviewVideo.currentTime < end;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
});

// WAI-ARIA tab pattern, including arrow / Home / End navigation and roving focus.
function wireTabs(tablist, onSelect) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const select = (tab, moveFocus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (onSelect) onSelect(tab, tabs.indexOf(tab));
    if (moveFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true);
    });
  });
  return (index, moveFocus = false) => select(tabs[(index + tabs.length) % tabs.length], moveFocus);
}
document.querySelectorAll('.segmented-control').forEach(tablist => wireTabs(tablist));

const methodNames = {
  replay: 'Teacher Replay',
  'online-teacher': 'Online Teacher',
  trace: 'TRACE',
  pmbs: 'PMBS',
  spiral: 'Spiral'
};

// Edit static/data/scenes.json to add or remove clips. A null src is an explicit
// placeholder, not a fake link. Only the selected scene creates a media request.
function createGallery(gallery, scenes) {
  const key = gallery.dataset.gallery;
  const method = methodNames[key];
  let selected = 0;
  let currentVideo = null;
  const top = document.createElement('div');
  top.className = 'gallery-top';
  const title = document.createElement('strong');
  title.textContent = method + ' / SCENE BROWSER';
  const counter = document.createElement('span');
  counter.setAttribute('aria-live', 'polite');
  top.append(title, counter);

  const panels = document.createElement('div');
  scenes.forEach((scene, index) => {
    const panel = document.createElement('div');
    panel.className = 'gallery-stage';
    panel.id = `${key}-scene-panel-${index}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${key}-scene-tab-${index}`);
    panel.hidden = index !== 0;
    panels.append(panel);
  });
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  const tabs = document.createElement('div');
  tabs.className = 'scene-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', method + ' scenes');
  scenes.forEach((scene, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `${key}-scene-tab-${index}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === 0));
    button.setAttribute('aria-controls', `${key}-scene-panel-${index}`);
    button.setAttribute('aria-label', `${method}: ${scene.label}`);
    button.tabIndex = index === 0 ? 0 : -1;
    button.textContent = String(index + 1).padStart(2, '0');
    tabs.append(button);
  });
  const arrows = document.createElement('div');
  arrows.className = 'gallery-arrows';
  const prev = document.createElement('button');
  const next = document.createElement('button');
  prev.type = next.type = 'button';
  prev.textContent = '←'; next.textContent = '→';
  prev.setAttribute('aria-label', `Previous ${method} scene`);
  next.setAttribute('aria-label', `Next ${method} scene`);
  arrows.append(prev, next);
  controls.append(tabs, arrows);
  const caption = document.createElement('p');
  caption.className = 'scene-caption';
  gallery.replaceChildren(top, panels, controls, caption);

  function render(index) {
    selected = index;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.removeAttribute('src');
      currentVideo.load();
      currentVideo = null;
    }
    // Remove inactive players so forty populated slots do not preload forty clips.
    [...panels.children].forEach(panel => panel.replaceChildren());
    const scene = scenes[index];
    const stage = panels.children[index];
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    caption.textContent = scene.caption || `${method} · ${scene.label} · Video coming soon`;
    if (scene.src) {
      const video = document.createElement('video');
      video.className = 'scene-video';
      video.controls = true; video.playsInline = true; video.preload = 'none';
      video.src = scene.src;
      if (scene.poster) video.poster = scene.poster;
      video.setAttribute('aria-label', `${method}, ${scene.label}`);
      if (scene.captions) {
        const track = document.createElement('track');
        track.kind = 'captions'; track.src = scene.captions; track.srclang = 'en'; track.label = 'English';
        video.append(track);
      }
      video.addEventListener('error', () => {
        caption.textContent = `${method} · ${scene.label} · This video is currently unavailable.`;
      });
      stage.append(video);
      currentVideo = video;
    } else {
      // Decorative frame carries no outcome or fabricated trial imagery.
      stage.innerHTML = '<span class="gallery-corner top-left" aria-hidden="true"></span><div class="scene-placeholder"><div class="placeholder-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 8h4m-4 8h4m10-8h4m-4 8h4m-10-7 4 3-4 3Z"/></svg></div><h4></h4><p>Full scene video</p><span>Coming soon</span></div><span class="gallery-corner bottom-right" aria-hidden="true"></span>';
      stage.querySelector('h4').textContent = scene.label;
    }
  }
  const choose = wireTabs(tabs, (_, index) => render(index));
  prev.addEventListener('click', () => choose(selected - 1));
  next.addEventListener('click', () => choose(selected + 1));
  render(0);
}

const defaultScenes = () => Array.from({length: 8}, (_, index) => ({label: `Scene ${String(index + 1).padStart(2, '0')}`, src: null, poster: null, caption: null}));
fetch('static/data/scenes.json', {cache: 'no-cache'})
  .then(response => { if (!response.ok) throw new Error('Scene manifest unavailable'); return response.json(); })
  .then(data => {
    document.querySelectorAll('[data-gallery]').forEach(gallery => {
      const scenes = data[gallery.dataset.gallery];
      createGallery(gallery, Array.isArray(scenes) && scenes.length ? scenes : defaultScenes());
    });
  })
  .catch(() => document.querySelectorAll('[data-gallery]').forEach(gallery => createGallery(gallery, defaultScenes())));

// Only one video plays at a time, even after clips are added later.
document.addEventListener('play', event => {
  if (event.target.tagName === 'VIDEO') {
    document.querySelectorAll('video').forEach(video => { if (video !== event.target) video.pause(); });
  }
}, true);

const dialog = document.querySelector('#figure-dialog');
let figureOpener = null;
document.querySelectorAll('[data-figure]').forEach(button => {
  button.addEventListener('click', () => {
    figureOpener = button;
    document.querySelector('#figure-dialog-title').textContent = button.dataset.title;
    const image = document.querySelector('#dialog-image');
    image.src = button.dataset.figure;
    image.alt = button.querySelector('img').alt;
    document.querySelector('#dialog-download').href = button.dataset.figure;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (figureOpener) figureOpener.focus();
});
