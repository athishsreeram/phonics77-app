/* js/analytics.js – privacy-first client-side analytics (no 3rd party) */
'use strict';

const analytics = (() => {
  const SESSION_KEY = 'ph_session';
  const EVENTS_KEY  = 'ph_events';

  function getSession() {
    let s = {};
    try { s = JSON.parse(sessionStorage.getItem(SESSION_KEY)) || {}; } catch(e) {}
    if (!s.id) {
      s.id = `s_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      s.start = Date.now();
      s.page  = window.location.pathname;
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch(e) {}
    }
    return s;
  }

  function logEvent(type, data = {}) {
    const event = {
      type,
      ts: Date.now(),
      session: getSession().id,
      url: window.location.pathname,
      ...data,
    };
    try {
      const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
      events.push(event);
      // Keep only the last 500 events to save space
      if (events.length > 500) events.splice(0, events.length - 500);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch(e) {}
    console.debug('[Analytics]', event);

    // Optionally forward to your own API endpoint:
    // fetch('/api/log-events', { method:'POST', body:JSON.stringify(event), headers:{'Content-Type':'application/json'} }).catch(()=>{});
  }

  function trackActivityStart(activityId) {
    logEvent('activity_start', { activityId });
    // Navigation is handled by activity-gating.js
  }

  function trackActivityComplete(activityId, score = null) {
    logEvent('activity_complete', { activityId, score });
  }

  function trackPageView() {
    logEvent('page_view');
  }

  function getEvents() {
    try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]'); } catch(e) { return []; }
  }

  function clearEvents() {
    try { localStorage.removeItem(EVENTS_KEY); } catch(e) {}
  }

  // Auto-track page view on load
  trackPageView();

  return { trackActivityStart, trackActivityComplete, trackPageView, logEvent, getEvents, clearEvents };
})();
