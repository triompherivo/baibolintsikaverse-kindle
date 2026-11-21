(() => {
  "use strict";
  const base = new URL("./", document.currentScript.src);
  const getURL = (path) => new URL(String(path).replace(/^\/+/, ""), base).href;
  const routes = /* @__PURE__ */ new Set();
  const listeners = /* @__PURE__ */ new Set();
  const currentTab = { id: 1, get url() {
    return location.href;
  } };
  const channel = typeof BroadcastChannel === "function" ? new BroadcastChannel("bv-kindle-storage") : null;
  const tell = (changes) => {
    for (const listener of listeners) listener(changes, "local");
  };
  if (channel) channel.onmessage = (event) => tell(event.data);
  let db;
  function database() {
    if (!db) db = new Promise((resolve, reject) => {
      const request = indexedDB.open("BaibolintsikaVerseKindle", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("settings");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch((error) => {
      db = null;
      throw error;
    });
    return db;
  }
  async function store(mode, apply) {
    const connection = await database();
    return new Promise((resolve, reject) => {
      const transaction = connection.transaction("settings", mode);
      let result;
      transaction.oncomplete = () => resolve(result);
      transaction.onabort = () => reject(transaction.error || Error("Enregistrement interrompu."));
      try {
        result = apply(transaction.objectStore("settings"));
      } catch (error) {
        transaction.abort();
        reject(error);
      }
    });
  }
  const storage = {
    async get(keys) {
      const defaults = typeof keys === "string" ? { [keys]: void 0 } : Array.isArray(keys) ? Object.fromEntries(keys.map((key) => [key, void 0])) : { ...keys };
      return store("readonly", (entries) => {
        for (const key of Object.keys(defaults)) {
          const request = entries.get(key);
          request.onsuccess = () => {
            if (request.result !== void 0) defaults[key] = request.result;
            else if (defaults[key] === void 0) delete defaults[key];
          };
        }
        return defaults;
      });
    },
    async set(values) {
      const changes = await store("readwrite", (entries) => {
        const result = {};
        for (const [key, newValue] of Object.entries(values)) {
          const request = entries.get(key);
          request.onsuccess = () => {
            result[key] = { oldValue: request.result, newValue };
          };
          entries.put(newValue, key);
        }
        return result;
      });
      tell(changes);
      if (channel) channel.postMessage(changes);
    },
    async remove(keys) {
      const changes = await store("readwrite", (entries) => {
        const result = {};
        for (const key of Array.isArray(keys) ? keys : [keys]) {
          const request = entries.get(key);
          request.onsuccess = () => {
            result[key] = { oldValue: request.result };
          };
          entries.delete(key);
        }
        return result;
      });
      tell(changes);
      if (channel) channel.postMessage(changes);
    }
  };
  const session = {};
  const sessionStorageShim = {
    async get(key) {
      return Object.hasOwn(session, key) ? { [key]: session[key] } : {};
    },
    async set(values) {
      Object.assign(session, values);
    },
    async remove(key) {
      delete session[key];
    }
  };
  const BibleRequests = /* @__PURE__ */ new Set(["passage", "search", "crossrefs"]);
  let worker, sequence = 0;
  const pending = /* @__PURE__ */ new Map();
  function bibleRequest(message) {
    if (!worker) {
      worker = new Worker(getURL("bible-worker.js"));
      worker.onmessage = ({ data }) => {
        const callback = pending.get(data.id);
        pending.delete(data.id);
        if (callback) callback(data.response);
      };
      worker.onerror = () => {
        for (const callback of pending.values()) callback({ ok: false, error: "Le moteur Bible a \xE9t\xE9 interrompu." });
        pending.clear();
        worker.terminate();
        worker = null;
      };
    }
    const id = ++sequence;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        resolve({ ok: false, error: "Impossible de charger la Bible dans le d\xE9lai pr\xE9vu." });
      }, 3e4);
      pending.set(id, (response) => {
        clearTimeout(timer);
        resolve(response);
      });
      worker.postMessage({ id, message });
    });
  }
  function navigate(url) {
    const target = new URL(url, base);
    if (!["http:", "https:"].includes(target.protocol) || target.username || target.password) {
      throw Error("Adresse de lecture invalide.");
    }
    if (target.origin === base.origin && target.pathname.startsWith(base.pathname)) {
      if (new URLSearchParams(location.search).has("scriptures")) target.searchParams.set("scriptures", "1");
      location.assign(target.href);
    } else {
      const link = document.createElement("a");
      link.href = target.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.append(link);
      link.click();
      link.remove();
    }
    return { id: currentTab.id, url: target.href };
  }
  let reminderTimer;
  function reminder(hour) {
    clearTimeout(reminderTimer);
    if (hour === null) return;
    if (!Number.isInteger(hour) || hour < 0 || hour > 23) throw Error("Heure invalide.");
    const now = /* @__PURE__ */ new Date(), next = new Date(now);
    next.setHours(hour, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    reminderTimer = setTimeout(() => {
      const notice = document.getElementById("kindle-reminder");
      notice.hidden = false;
      notice.textContent = "Votre lecture du jour est pr\xEAte dans Bible en 90 jours.";
      reminder(hour);
    }, next - now);
  }
  async function sendMessage(message) {
    if (BibleRequests.has(message.type)) return bibleRequest(message);
    if (message.type === "definition:source-tab") {
      try {
        const tab = navigate(message.config.sourceUrl);
        return { ok: true, value: { opened: Boolean(tab) } };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }
    for (const route of routes) {
      const result = route(message, { url: location.href, frameId: 0 });
      if (result === void 0) continue;
      const reply = await result;
      if (reply.ok || message.type !== "definition:request") return reply;
      if (!/fetch|r[ée]seau|load failed/i.test(reply.error || "")) return reply;
      try {
        const response = await fetch(new URL("../kindle-source", base), {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message.request)
        });
        const body = await response.json();
        return response.ok ? { ok: true, value: body } : { ok: false, error: body.error };
      } catch {
        return reply;
      }
    }
    return { ok: false, error: "Action indisponible dans le lecteur Kindle." };
  }
  globalThis.browser = {
    runtime: {
      getURL,
      sendMessage,
      getPlatformInfo: async () => ({ os: "kindle" }),
      getManifest: () => ({ name: "BaibolintsikaVerse Kindle" }),
      onMessage: { addListener: (listener) => routes.add(listener) },
      async sendNativeMessage(_host, message) {
        try {
          if (message.command === "reading-reminder") reminder(message.hour);
          else if (message.command === "reading-reveal-teny") document.getElementById("personal-teny-folder").click();
          else throw Error("Action indisponible dans le lecteur Kindle.");
          return { ok: true };
        } catch (error) {
          return { ok: false, error: error.message };
        }
      }
    },
    storage: { local: storage, session: sessionStorageShim, onChanged: { addListener: (listener) => listeners.add(listener) } },
    tabs: {
      create: async ({ url }) => navigate(url),
      getCurrent: async () => currentTab,
      get: async (id) => {
        if (id !== currentTab.id) throw Error("Onglet inaccessible au lecteur web.");
        return currentTab;
      }
    }
  };
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, "clipboard", { value: {
      async writeText(text) {
        const field = document.createElement("textarea");
        field.value = text;
        field.style.position = "fixed";
        field.style.left = "-9999px";
        (document.querySelector("dialog[open]") || document.body).append(field);
        const previous = document.activeElement;
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (previous) previous.focus();
        if (!copied) throw Error("Copie indisponible dans ce navigateur.");
      }
    } });
  }
})();
