// Shared fixture behaviour: a tiny stand-in for the NJ ASP.NET wizard. State lives in sessionStorage.
window.NJ = {
  get(key, fallback) { try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, v) { sessionStorage.setItem(key, JSON.stringify(v)); },
  go(href) { location.href = href; },
};
