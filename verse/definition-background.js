(() => {
  "use strict";
  var _a, _b, _c, _d, _e, _f, _g;
  const browser = globalThis.browser || globalThis.chrome;
  const configs = /* @__PURE__ */ new Map(), rules = /* @__PURE__ */ new Map(), selections = /* @__PURE__ */ new Map();
  const rootURL = () => browser.runtime.getURL("");
  const ownPage = (url) => {
    try {
      const u = new URL(url), base = new URL(rootURL());
      const paths = ["reader.html", "popup.html"].map((page) => new URL(browser.runtime.getURL(page)).pathname);
      return u.protocol === base.protocol && u.host === base.host && !u.username && !u.password && paths.includes(u.pathname);
    } catch {
      return false;
    }
  };
  function httpURL(value) {
    const url = new URL(String(value));
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.href.length > 16384) throw Error("Adresse de source HTTP/HTTPS invalide.");
    return url.href;
  }
  function config(raw) {
    if (!raw || typeof raw.css !== "string" || raw.css.length > 1e5) throw Error("CSS de source invalide.");
    const themeVariables = {};
    for (const [name, value] of Object.entries(raw.themeVariables || {})) {
      if (/^--[a-zA-Z0-9-]+$/.test(name) && typeof value === "string" && value.length <= 300 && !/[;{}]/.test(value)) themeVariables[name] = value;
    }
    const fontCSS = typeof raw.fontCSS === "string" && raw.fontCSS.length < 1e6 && /^@font-face\{font-family:"SBL Hebrew";src:url\("data:font\/ttf;base64,[A-Za-z0-9+/=]+"\)/.test(raw.fontCSS) ? raw.fontCSS : "";
    return { css: raw.css, fontCSS, themeVariables, sourceUrl: httpURL(raw.sourceUrl), expires: Date.now() + 864e5 };
  }
  const area = () => browser.storage.session || browser.storage.local;
  async function saveConfig(tabId, value) {
    configs.set(tabId, value);
    await area().set({ ["definitionSourceTab:" + tabId]: value });
  }
  async function sourceConfig(sender) {
    var _a2;
    if (!Number.isInteger((_a2 = sender.tab) == null ? void 0 : _a2.id) || sender.frameId > 0) return null;
    const key = "definitionSourceTab:" + sender.tab.id;
    const value = configs.get(sender.tab.id) || (await area().get(key))[key];
    if (!value) return null;
    if (value.expires < Date.now()) {
      await release(sender.tab.id);
      return null;
    }
    try {
      if (new URL(sender.url).origin !== new URL(value.sourceUrl).origin) return null;
    } catch {
      return null;
    }
    return value;
  }
  async function framePolicy(message) {
    var _a2, _b2;
    if (!Number.isInteger(message.tabId)) return { enabled: false, reason: "popup" };
    const tab = await browser.tabs.get(message.tabId);
    if (!ownPage(tab.url)) throw Error("Le cadre doit appartenir \xE0 la fen\xEAtre D\xE9finition.");
    const source = new URL(httpURL(message.url));
    if (!((_a2 = browser.declarativeNetRequest) == null ? void 0 : _a2.updateSessionRules)) return { enabled: false, reason: "api" };
    const ownOrigin = new URL(rootURL());
    const safari = ownOrigin.protocol === "safari-web-extension:";
    let condition;
    if (safari) {
      const version = /\bVersion\/(\d+)(?:\.(\d+))?/.exec(((_b2 = globalThis.navigator) == null ? void 0 : _b2.userAgent) || "");
      const supported = version && (+version[1] > 18 || +version[1] === 18 && +(version[2] || 0) >= 4);
      if (!supported || !ownOrigin.hostname) return { enabled: false, reason: "unsupported" };
      condition = { initiatorDomains: [ownOrigin.hostname.toLowerCase()], requestDomains: [source.hostname], urlFilter: "|" + source.origin + "/", resourceTypes: ["sub_frame"] };
    } else {
      condition = { tabIds: [message.tabId], urlFilter: "|" + source.origin + "/", resourceTypes: ["sub_frame"] };
    }
    const ruleId = 18e4 + message.tabId;
    try {
      await browser.declarativeNetRequest.updateSessionRules({ removeRuleIds: [ruleId], addRules: [{
        id: ruleId,
        priority: 1,
        action: { type: "modifyHeaders", responseHeaders: [{ header: "x-frame-options", operation: "remove" }] },
        condition
      }] });
    } catch {
      rules.delete(message.tabId);
      try {
        await browser.declarativeNetRequest.updateSessionRules({ removeRuleIds: [ruleId] });
      } catch {
      }
      return { enabled: false, reason: "unsupported" };
    }
    rules.set(message.tabId, ruleId);
    return { enabled: true };
  }
  async function release(tabId) {
    var _a2;
    configs.delete(tabId);
    try {
      await area().remove("definitionSourceTab:" + tabId);
    } catch {
    }
    const ruleId = rules.get(tabId) || 18e4 + tabId;
    rules.delete(tabId);
    try {
      await ((_a2 = browser.declarativeNetRequest) == null ? void 0 : _a2.updateSessionRules({ removeRuleIds: [ruleId] }));
    } catch {
    }
    selections.delete(tabId);
    try {
      await area().remove("definitionSelectionReader:" + tabId);
    } catch {
    }
    for (const [readerId, value] of selections) if (value.originalTabId === tabId) {
      selections.delete(readerId);
      try {
        await area().remove("definitionSelectionReader:" + readerId);
      } catch {
      }
    }
  }
  async function navigation(tabId, url) {
    var _a2;
    if (!ownPage(url)) {
      const ruleId = rules.get(tabId) || 18e4 + tabId;
      rules.delete(tabId);
      try {
        await ((_a2 = browser.declarativeNetRequest) == null ? void 0 : _a2.updateSessionRules({ removeRuleIds: [ruleId] }));
      } catch {
      }
    }
    const selectionKey = "definitionSelectionReader:" + tabId;
    const selection = selections.get(tabId) || (await area().get(selectionKey))[selectionKey];
    if (selection) {
      let linked = false;
      try {
        linked = ownPage(url) && new URL(url).searchParams.get("selectionToken") === selection.token;
      } catch {
      }
      if (!linked || selection.expires < Date.now()) {
        selections.delete(tabId);
        await area().remove(selectionKey);
      }
    }
    for (const [readerId, value2] of selections) if (value2.originalTabId === tabId && value2.originalURL !== url) {
      selections.delete(readerId);
      await area().remove("definitionSelectionReader:" + readerId);
    }
    const key = "definitionSourceTab:" + tabId;
    const value = configs.get(tabId) || (await area().get(key))[key];
    if (!value) return;
    let sameOrigin = false;
    try {
      sameOrigin = new URL(url).origin === new URL(value.sourceUrl).origin;
    } catch {
    }
    if (value.expires < Date.now() || !sameOrigin) {
      configs.delete(tabId);
      await area().remove(key);
    }
  }
  async function createDefinitionReader(url, context, needsTabId) {
    var _a2, _b2, _c2, _d2;
    let settings = {};
    try {
      settings = await browser.storage.local.get(["definitionOpenMode", "definitionWindowWidth", "definitionWindowHeight"]);
    } catch {
    }
    if (settings.definitionOpenMode === "window" && ((_a2 = browser.windows) == null ? void 0 : _a2.create)) {
      const width = Math.round(Math.max(360, Math.min(1800, Number(settings.definitionWindowWidth) || 880)));
      const height = Math.round(Math.max(400, Math.min(1400, Number(settings.definitionWindowHeight) || 820)));
      const options = { url, type: "popup", width, height };
      for (const [key, input] of [["left", context.screenX], ["top", context.screenY]]) if (typeof input === "number" && Number.isFinite(input)) options[key] = Math.round(Math.max(-1e5, Math.min(1e5, input)));
      let created;
      try {
        created = await browser.windows.create(options);
        let tab = (_b2 = created == null ? void 0 : created.tabs) == null ? void 0 : _b2[0];
        if (!tab && Number.isInteger(created == null ? void 0 : created.id) && browser.tabs.query) tab = (await browser.tabs.query({ windowId: created.id }))[0];
        if (!needsTabId || Number.isInteger(tab == null ? void 0 : tab.id)) return tab || {};
      } catch {
      }
      if ((created == null ? void 0 : created.id) !== void 0) {
        try {
          await ((_d2 = (_c2 = browser.windows).remove) == null ? void 0 : _d2.call(_c2, created.id));
        } catch {
        }
      }
    }
    return browser.tabs.create({ url, active: true });
  }
  async function openDefinition(text, context = {}, sender = {}) {
    var _a2, _b2;
    if (typeof text !== "string" || !text.trim() || text.length > 2e3) throw Error("S\xE9lection vide ou trop longue.");
    const allowed = {};
    for (const key of ["url", "page_title", "page_lang", "page_dir", "sentence", "paragraph", "text_before", "text_after"]) {
      if (typeof context[key] === "string") allowed[key] = context[key].slice(0, key === "paragraph" ? 8e3 : 2e3);
    }
    const query = new URLSearchParams({ definition: text, definitionContext: JSON.stringify(allowed) });
    let linked;
    if (Number.isInteger((_a2 = sender.tab) == null ? void 0 : _a2.id) && !(sender.frameId > 0) && browser.tabs.sendMessage) {
      try {
        const original = await browser.tabs.get(sender.tab.id);
        const originalURL = original.url || sender.url;
        if (typeof originalURL !== "string" || !/^(https?:|file:)/.test(originalURL) || ownPage(originalURL)) throw Error("Page d\u2019origine non prise en charge.");
        const token = globalThis.crypto.randomUUID();
        const reply = await browser.tabs.sendMessage(original.id, { type: "definition:live-selection", action: "get", capture: true, token, baseline: text }, { frameId: 0 });
        if ((reply == null ? void 0 : reply.ok) && typeof ((_b2 = reply.value) == null ? void 0 : _b2.text) === "string") linked = { token, originalTabId: original.id, originalURL, expires: Date.now() + 15 * 60 * 1e3 };
      } catch {
      }
    }
    if (linked) {
      const reader = await createDefinitionReader("about:blank", context, true);
      linked.readerTabId = reader.id;
      query.set("selectionToken", linked.token);
      try {
        selections.set(reader.id, linked);
        await area().set({ ["definitionSelectionReader:" + reader.id]: linked });
        await browser.tabs.update(reader.id, { url: browser.runtime.getURL("reader.html") + "?" + query });
      } catch (error) {
        await release(reader.id);
        throw error;
      }
    } else await createDefinitionReader(browser.runtime.getURL("reader.html") + "?" + query, context, false);
    return { opened: true };
  }
  async function linkedOriginal(message, sender) {
    var _a2;
    if (!Number.isInteger((_a2 = sender.tab) == null ? void 0 : _a2.id) || sender.frameId > 0 || typeof message.token !== "string" || !/^[a-f0-9-]{32,80}$/i.test(message.token)) throw Error("S\xE9lection li\xE9e non autoris\xE9e.");
    const readerId = sender.tab.id, key = "definitionSelectionReader:" + readerId;
    const value = selections.get(readerId) || (await area().get(key))[key];
    if (!value || value.readerTabId !== readerId || value.token !== message.token || new URL(sender.url).searchParams.get("selectionToken") !== value.token) throw Error("Cette s\xE9lection appartient \xE0 une autre fen\xEAtre de recherche.");
    if (value.expires < Date.now()) {
      selections.delete(readerId);
      await area().remove(key);
      throw Error("La s\xE9lection li\xE9e \xE0 cette recherche a expir\xE9.");
    }
    let original;
    try {
      original = await browser.tabs.get(value.originalTabId);
    } catch {
      selections.delete(readerId);
      await area().remove(key);
      throw Error("La page d\u2019origine a \xE9t\xE9 ferm\xE9e.");
    }
    if (original.url !== value.originalURL) {
      selections.delete(readerId);
      await area().remove(key);
      throw Error("La page d\u2019origine a chang\xE9 ; aucune modification effectu\xE9e.");
    }
    return { value, readerId, key };
  }
  async function lookupContext(message, sender) {
    const { value } = await linkedOriginal(message, sender);
    const reply = await browser.tabs.sendMessage(value.originalTabId, { type: "definition:lookup-context" }, { frameId: 0 });
    if (!(reply == null ? void 0 : reply.context) || typeof reply.context !== "object" || Array.isArray(reply.context) || JSON.stringify(reply.context).length > 1e6) throw Error("Le contexte de la page n\u2019est plus disponible.");
    return reply.context;
  }
  async function liveSelection(message, sender) {
    if (!["get", "replace", "cut"].includes(message.action)) throw Error("Action de s\xE9lection non prise en charge.");
    if (message.action === "replace" && (typeof message.text !== "string" || message.text.length > 1e5)) throw Error("Texte de remplacement invalide.");
    const { value, readerId, key } = await linkedOriginal(message, sender);
    const reply = await browser.tabs.sendMessage(value.originalTabId, { type: "definition:live-selection", action: message.action, token: value.token, ...message.action === "replace" ? { text: message.text } : {} }, { frameId: 0 });
    if (!(reply == null ? void 0 : reply.ok)) throw Error((reply == null ? void 0 : reply.error) || "La s\xE9lection d\u2019origine n\u2019est plus disponible.");
    if (message.action !== "get") {
      selections.delete(readerId);
      await area().remove(key);
    }
    return reply.value;
  }
  async function handle(message, sender = {}) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h;
    if (message.type === "definition:open") return openDefinition(message.text, message.context, sender);
    if (message.type === "definition:source-config") return sourceConfig(sender);
    if (!ownPage(sender.url)) throw Error("Cette action est r\xE9serv\xE9e au module D\xE9finition.");
    if (message.type === "definition:selection") return liveSelection(message, sender);
    if (message.type === "definition:context") return lookupContext(message, sender);
    if (message.type === "definition:request") {
      const request = message.request;
      if (!request || typeof request !== "object") throw Error("Requ\xEAte de source invalide.");
      const url = httpURL(request.url), method = String(request.method || "GET").toUpperCase();
      if (!["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].includes(method)) throw Error("M\xE9thode HTTP non prise en charge.");
      const headers = {};
      for (const [key, value] of Object.entries(request.headers || {})) {
        if (!/^[A-Za-z0-9-]{1,80}$/.test(key) || /^(cookie|host|origin|referer|sec-|proxy-)/i.test(key) || typeof value !== "string" || /[\r\n]/.test(value)) throw Error("En-t\xEAte de requ\xEAte invalide.");
        headers[key] = value;
      }
      if (request.body !== void 0 && (typeof request.body !== "string" || request.body.length > 8e6)) throw Error("Corps de requ\xEAte invalide ou trop volumineux.");
      const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 3e4);
      const limit = Math.max(1024, Math.min(64 * 1024 * 1024, Number(request.maxBytes) || 8 * 1024 * 1024));
      try {
        const response = await fetch(url, { method, headers, body: ["GET", "HEAD"].includes(method) ? void 0 : request.body, credentials: request.credentials === "include" ? "include" : "omit", redirect: request.redirect === "error" ? "error" : "follow", signal: controller.signal });
        if (Number(response.headers.get("content-length")) > limit) throw Error("R\xE9ponse distante trop volumineuse.");
        const reader = (_a2 = response.body) == null ? void 0 : _a2.getReader(), chunks = [];
        let size = 0;
        if (reader) {
          for (; ; ) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > limit) {
              await reader.cancel();
              throw Error("R\xE9ponse distante trop volumineuse.");
            }
            chunks.push(value);
          }
        } else {
          const bytes2 = new Uint8Array(await response.arrayBuffer());
          size = bytes2.byteLength;
          if (size > limit) throw Error("R\xE9ponse distante trop volumineuse.");
          chunks.push(bytes2);
        }
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.byteLength;
        }
        const result = { status: response.status, ok: response.ok, url: response.url || url, headers: Object.fromEntries(response.headers.entries()) };
        if (request.responseType === "base64") {
          let binary = "";
          for (let at = 0; at < bytes.length; at += 32768) binary += String.fromCharCode(...bytes.subarray(at, at + 32768));
          result.body = btoa(binary);
          result.encoding = "base64";
        } else result.body = new TextDecoder().decode(bytes);
        return result;
      } finally {
        clearTimeout(timeout);
      }
    }
    if (message.type === "definition:frame-policy") return framePolicy(message);
    if (message.type === "definition:release-frame") {
      const tab = await browser.tabs.get(message.tabId);
      if (!ownPage(tab.url)) throw Error("Fen\xEAtre D\xE9finition attendue.");
      await release(message.tabId);
      return true;
    }
    if (message.type === "definition:source-tab") {
      const value = config(message.config);
      let tab;
      if (message.display === "window" && ((_b2 = browser.windows) == null ? void 0 : _b2.create)) {
        let window;
        try {
          window = await browser.windows.create({ url: "about:blank", type: "popup", width: 960, height: 780 });
          tab = (_c2 = window == null ? void 0 : window.tabs) == null ? void 0 : _c2[0];
          if (!Number.isInteger(tab == null ? void 0 : tab.id) && Number.isInteger(window == null ? void 0 : window.id)) tab = (_f2 = await ((_e2 = (_d2 = browser.tabs).query) == null ? void 0 : _e2.call(_d2, { windowId: window.id }))) == null ? void 0 : _f2[0];
          if (!Number.isInteger(tab == null ? void 0 : tab.id)) throw Error("Onglet de la fen\xEAtre indisponible.");
        } catch {
          if ((window == null ? void 0 : window.id) !== void 0) try {
            await ((_h = (_g2 = browser.windows).remove) == null ? void 0 : _h.call(_g2, window.id));
          } catch {
          }
          tab = null;
        }
      }
      if (!tab) tab = await browser.tabs.create({ url: "about:blank", active: true });
      try {
        await saveConfig(tab.id, value);
        await browser.tabs.update(tab.id, { url: value.sourceUrl });
      } catch (error) {
        await release(tab.id);
        throw error;
      }
      return { opened: true };
    }
    throw Error("Commande D\xE9finition inconnue.");
  }
  (_b = (_a = browser.tabs) == null ? void 0 : _a.onRemoved) == null ? void 0 : _b.addListener((tabId) => {
    void release(tabId);
  });
  (_d = (_c = browser.tabs) == null ? void 0 : _c.onUpdated) == null ? void 0 : _d.addListener((tabId, change) => {
    if (typeof change.url === "string") void navigation(tabId, change.url).catch(() => {
    });
  });
  (_f = (_e = browser.contextMenus) == null ? void 0 : _e.onClicked) == null ? void 0 : _f.addListener((info, tab) => {
    if (info.menuItemId === "bv-definition-selection" && info.selectionText) void openDefinition(info.selectionText, { url: info.pageUrl || (tab == null ? void 0 : tab.url) || "", page_title: (tab == null ? void 0 : tab.title) || "" }, { tab, url: info.pageUrl || (tab == null ? void 0 : tab.url) || "", frameId: info.frameId || 0 });
  });
  function installMenu() {
    var _a2, _b2;
    try {
      const operation = (_a2 = browser.contextMenus) == null ? void 0 : _a2.create({ id: "bv-definition-selection", title: "D\xE9finition \u2014 \xAB %s \xBB", contexts: ["selection"] }, () => {
        void browser.runtime.lastError;
      });
      (_b2 = operation == null ? void 0 : operation.catch) == null ? void 0 : _b2.call(operation, () => {
      });
    } catch {
    }
  }
  (_g = browser.runtime.onInstalled) == null ? void 0 : _g.addListener(installMenu);
  installMenu();
  globalThis.BVDefinitionBackground = { handle, httpURL, config };
})();
