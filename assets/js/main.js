const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const pageCache = new Map();

let progressBar;
let themeToggle;
let menuToggle;
let navLinks;
let revealObserver;
let statObserver;
let scrollTicking = false;
let isNavigating = false;

root.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");

function icon(name) {
  if (name === "moon") {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z"/></svg>';
  }

  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
}

function syncThemeButton() {
  if (!themeToggle) return;
  const isDark = root.dataset.theme === "dark";
  themeToggle.innerHTML = icon(isDark ? "sun" : "moon");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

function closeMenu() {
  navLinks?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function updateNavState(pathname) {
  const page = pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop() || "index.html";
    if (linkPage === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function parseHTML(html) {
  return new DOMParser().parseFromString(html, "text/html");
}

async function fetchPage(url) {
  const requestUrl = new URL(url, window.location.href);
  requestUrl.hash = "";
  const key = requestUrl.href;

  if (!pageCache.has(key)) {
    const response = await fetch(key, { headers: { "X-Requested-With": "fetch" } });
    if (!response.ok) throw new Error(`Unable to load ${key}`);
    pageCache.set(key, await response.text());
  }

  return parseHTML(pageCache.get(key));
}

function isLocalPageLink(link) {
  if (!link || link.target || link.hasAttribute("download")) return false;
  if (link.origin !== window.location.origin) return false;
  if (link.protocol !== "http:" && link.protocol !== "https:" && link.protocol !== "file:") return false;
  if (link.hash && link.pathname === window.location.pathname) return false;
  return link.pathname.endsWith(".html") || link.pathname.endsWith("/");
}

function scrollToPageTop() {
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousBehavior;
}

function swapPage(nextDocument, nextUrl) {
  const nextMain = nextDocument.querySelector("main");
  const currentMain = document.querySelector("main");
  if (!nextMain || !currentMain) {
    window.location.href = nextUrl.href;
    return;
  }

  document.title = nextDocument.title;

  const currentDescription = document.querySelector("meta[name='description']");
  const nextDescription = nextDocument.querySelector("meta[name='description']");
  if (currentDescription && nextDescription) {
    currentDescription.setAttribute("content", nextDescription.getAttribute("content") || "");
  }

  currentMain.replaceWith(nextMain);
  closeMenu();
  updateNavState(nextUrl.pathname);
  scrollToPageTop();
  initPage();
}

async function navigateTo(url, { replace = false, force = false } = {}) {
  if (isNavigating) return;
  const nextUrl = new URL(url, window.location.href);
  const samePage = nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search;
  if (samePage && !force) return;

  isNavigating = true;
  document.body.classList.add("is-routing");

  try {
    const nextDocument = await fetchPage(nextUrl);
    const commit = () => {
      swapPage(nextDocument, nextUrl);
      if (replace) {
        history.replaceState({}, "", nextUrl);
      } else {
        history.pushState({}, "", nextUrl);
      }
    };

    if (!reducedMotion && document.startViewTransition) {
      await document.startViewTransition(commit).finished;
    } else {
      commit();
    }
  } catch (error) {
    window.location.href = nextUrl.href;
  } finally {
    isNavigating = false;
    document.body.classList.remove("is-routing");
    updateScrollEffects();
  }
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !isLocalPageLink(link)) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    event.preventDefault();
    navigateTo(link.href);
  });

  window.addEventListener("popstate", () => {
    navigateTo(window.location.href, { replace: true, force: true });
  });
}

function prefetchLinkedPages() {
  const links = Array.from(document.querySelectorAll(".nav-links a, .nav-actions .btn, .hero-actions a"))
    .filter(isLocalPageLink);

  const warmCache = () => {
    links.forEach((link) => {
      fetchPage(link.href).catch(() => {});
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warmCache, { timeout: 1200 });
  } else {
    window.setTimeout(warmCache, 250);
  }
}

function initReveal(rootElement = document) {
  revealObserver?.disconnect();
  const revealItems = rootElement.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

function initLogos(rootElement = document) {
  rootElement.querySelectorAll(".logos").forEach((logos) => {
    if (reducedMotion || logos.querySelector(".logo-track")) return;

    const items = Array.from(logos.children);
    const track = document.createElement("div");
    track.className = "logo-track";
    [...items, ...items].forEach((item) => track.append(item.cloneNode(true)));

    logos.replaceChildren(track);
    logos.classList.add("is-marquee");
  });
}

function animateStat(stat) {
  const original = stat.dataset.value || stat.textContent.trim();
  const match = original.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return;

  const target = Number(match[1]);
  const suffix = match[2] || "";
  const duration = 1000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    const formatted = target % 1 === 0 ? Math.round(value) : value.toFixed(1);

    stat.textContent = `${formatted}${suffix}`;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initStats(rootElement = document) {
  statObserver?.disconnect();

  if (reducedMotion || !("IntersectionObserver" in window)) return;

  statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  rootElement.querySelectorAll(".stat strong").forEach((stat) => {
    stat.dataset.value = stat.textContent.trim();
    statObserver.observe(stat);
  });
}

function initMotionTargets(rootElement = document) {
  rootElement.querySelectorAll(".btn-primary").forEach((button, index) => {
    button.classList.add("magnetic");
    if (index === 0 && !reducedMotion) {
      button.classList.add("pulse-once");
    }
  });

  if (reducedMotion || !finePointer) return;

  rootElement.querySelectorAll(".magnetic").forEach((button) => {
    if (button.dataset.magneticBound) return;
    button.dataset.magneticBound = "true";

    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate3d(${x * 0.16}px, ${y * 0.22}px, 0)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  rootElement.querySelectorAll(".visual-panel").forEach((panel) => {
    if (panel.dataset.tiltBound) return;
    panel.dataset.tiltBound = "true";

    panel.addEventListener("pointermove", (event) => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      panel.style.setProperty("--visual-tilt-x", `${(-y * 3).toFixed(2)}deg`);
      panel.style.setProperty("--visual-tilt-y", `${(x * 4).toFixed(2)}deg`);
    });

    panel.addEventListener("pointerleave", () => {
      panel.style.setProperty("--visual-tilt-x", "0deg");
      panel.style.setProperty("--visual-tilt-y", "0deg");
    });
  });
}

function initFields(rootElement = document) {
  rootElement.querySelectorAll(".field input, .field select, .field textarea").forEach((control) => {
    if (control.dataset.fieldBound) return;
    control.dataset.fieldBound = "true";

    const field = control.closest(".field");
    const syncFilled = () => field?.classList.toggle("is-filled", Boolean(control.value.trim()));

    control.addEventListener("input", syncFilled);
    control.addEventListener("change", syncFilled);
    syncFilled();
  });
}

function initQuoteForm(rootElement = document) {
  const quoteForm = rootElement.querySelector("[data-quote-form]");
  if (!quoteForm || quoteForm.dataset.formBound) return;
  quoteForm.dataset.formBound = "true";

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    const fields = quoteForm.querySelectorAll("[data-required]");

    fields.forEach((field) => {
      const control = field.querySelector("input, select, textarea");
      const invalid = !control || !control.value.trim() || (control.type === "email" && !control.validity.valid);

      field.dataset.invalid = String(invalid);
      if (invalid) isValid = false;
    });

    const consent = quoteForm.querySelector("[name='consent']");
    const consentField = consent?.closest(".field");

    if (consent && !consent.checked) {
      consentField.dataset.invalid = "true";
      isValid = false;
    } else if (consentField) {
      consentField.dataset.invalid = "false";
    }

    const status = quoteForm.querySelector("[data-form-status]");

    if (!isValid) {
      status.textContent = "Please complete the highlighted fields.";
      return;
    }

    const submitButton = quoteForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.textContent = "Thanks. Your request has been prepared for the solutions team.";

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Request proposal";
      quoteForm.reset();
      initFields(quoteForm);
    }, 900);
  });
}

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleX(${scrollProgress})`;

  const hero = document.querySelector(".hero");
  if (hero && !reducedMotion) {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const parallax = window.scrollY < heroBottom ? window.scrollY * 0.3 : hero.offsetHeight * 0.3;
    hero.style.setProperty("--hero-parallax", `${parallax.toFixed(2)}px`);
  }
}

function initCustomCursor() {
  if (reducedMotion || !finePointer) return;

  root.classList.add("has-custom-cursor");

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.append(cursor);

  const cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pointerPosition = { x: cursorPosition.x, y: cursorPosition.y };

  window.addEventListener("pointermove", (event) => {
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    cursor.classList.add("is-visible");

    const target = event.target.closest("a, button, img, .visual-panel");
    cursor.classList.toggle("is-link", Boolean(target?.matches("a, button")));
    cursor.classList.toggle("is-image", Boolean(target?.matches("img, .visual-panel")));
    cursor.classList.toggle("is-cta", Boolean(target?.matches(".btn-primary")));
  });

  function moveCursor() {
    cursorPosition.x += (pointerPosition.x - cursorPosition.x) * 0.18;
    cursorPosition.y += (pointerPosition.y - cursorPosition.y) * 0.18;
    cursor.style.translate = `${cursorPosition.x}px ${cursorPosition.y}px`;
    requestAnimationFrame(moveCursor);
  }

  moveCursor();
}

function initShell() {
  progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.setAttribute("aria-hidden", "true");
  document.body.prepend(progressBar);

  themeToggle = document.querySelector("[data-theme-toggle]");
  menuToggle = document.querySelector("[data-menu-toggle]");
  navLinks = document.querySelector("[data-nav-links]");

  syncThemeButton();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    syncThemeButton();
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  bindNavigation();
  prefetchLinkedPages();
  initCustomCursor();

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateScrollEffects();
      scrollTicking = false;
    });
  });
}

function initPage() {
  const main = document.querySelector("main");
  initReveal(main);
  initLogos(main);
  initStats(main);
  initMotionTargets(main);
  initFields(main);
  initQuoteForm(main);
  prefetchLinkedPages();
  updateScrollEffects();
}

initShell();
initPage();
