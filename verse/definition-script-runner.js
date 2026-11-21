(function(root, factory) {
  "use strict";
  const api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  else api.bootstrap();
})(typeof globalThis !== "undefined" ? globalThis : this, function(root) {
  "use strict";
  const limits = Object.freeze({ code: 1e6, json: 1e6, html: 2e6, text: 1e6, requests: 50, fetch: 2e6, timeout: 15e3 });
  const clone = (value) => value === void 0 ? void 0 : JSON.parse(JSON.stringify(value));
  const error = (code, message) => Object.assign(new Error(message), { code });
  function jsonObject(value) {
    if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) throw error("invalidRequest", "Un objet JSON simple est attendu.");
    const serialized = JSON.stringify(value);
    if (serialized.length > limits.json) throw error("invalidRequest", "Objet JSON trop volumineux.");
    return JSON.parse(serialized);
  }
  function plainText(value) {
    if (typeof value !== "string" || value.length > limits.text) throw error("invalidRequest", "Texte absent ou trop volumineux.");
    return value;
  }
  function httpURL(value) {
    if (typeof value !== "string" || value.length > 16384 || /[\u0000-\u001f\u007f]/.test(value)) throw error("invalidRequest", "URL HTTP/HTTPS invalide.");
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      throw error("invalidRequest", "URL HTTP/HTTPS absolue attendue.");
    }
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw error("invalidRequest", "URL HTTP/HTTPS sans identifiants attendue.");
    return url.href;
  }
  function themeAPI(theme, document) {
    let variables = {};
    const exact = (name) => typeof name === "string" && name.startsWith("--") ? name : "--v-" + String(name || "").replace(/\./g, "-") + (String(name || "").includes(".") ? "" : "-base");
    let style;
    function update(raw) {
      variables = {};
      for (const [key, value] of Object.entries(raw || {})) if (/^--[\w-]+$/.test(key) && typeof value === "string" && value.length <= 300 && !/[;{}\u0000-\u001f]/.test(value)) variables[key] = value;
      if (document) {
        if (!style) {
          style = document.createElement("style");
          style.dataset.bvScriptTheme = "true";
          document.head.append(style);
        }
        style.textContent = ":root{" + Object.entries(variables).map(([key, value]) => key + ":" + value + ";").join("") + "}";
      }
    }
    update(theme && theme.variables || theme || {});
    const clamp = (value, fallback, maximum) => Number.isFinite(Number(value)) ? Math.min(maximum, Math.max(0, Number(value))) : fallback;
    const rgbName = (name) => {
      const value = String(name || "text");
      if (value.startsWith("--")) return value.endsWith("-rgb") ? value : value.replace(/-base$/, "") + "-rgb";
      return "--" + value.replace(/\./g, "-") + "-rgb";
    };
    const api = Object.freeze({ get id() {
      return theme && theme.id || null;
    }, get variables() {
      return clone(variables);
    }, get: (name) => variables[exact(name)] || "", cssVar: (name, fallback) => "var(" + exact(name) + (fallback === void 0 ? "" : ", " + String(fallback)) + ")", rgba: (name, alpha) => "rgba(var(" + rgbName(name) + "), " + clamp(alpha, 1, 1) + ")", mix: (name, amount, other = "text") => "color-mix(in srgb, var(" + exact(name) + ") " + clamp(amount, 80, 100) + "%, var(" + exact(other) + "))", apply: (element, values) => {
      const target = element || document && document.documentElement;
      if (!target || !target.style) throw error("invalidRequest", "\xC9l\xE9ment DOM attendu.");
      for (const [key, value] of Object.entries(values || variables)) if (/^--[\w-]+$/.test(key) && typeof value === "string" && !/[;{}\u0000-\u001f]/.test(value)) target.style.setProperty(key, value);
    } });
    return { api, update };
  }
  function createAPI(config, environment) {
    const document = environment.document, request = environment.request;
    const variables = clone(config.variables || {}), source = clone(config.source || null);
    if (source && source.options) delete source.options.code;
    let result = jsonObject(config.result || {}), cssStyle, disposed = false;
    const theme = themeAPI(config.theme || {}, document);
    const ensure = () => {
      if (disposed) throw error("disposed", "Le r\xE9sultat a \xE9t\xE9 ferm\xE9.");
    };
    const rpc = (method, args, gesture = false) => {
      ensure();
      if (gesture && !environment.hasGesture()) return Promise.reject(error("gestureRequired", "Cette action exige un clic ou une touche r\xE9cente."));
      return request(method, clone(args));
    };
    const publish = (value) => {
      ensure();
      result = jsonObject(value);
      const operation = request("result:set", { value: clone(result) });
      if (operation && operation.catch) operation.catch((cause) => environment.onError && environment.onError(cause));
      return clone(result);
    };
    const lookup = Object.freeze({ get query() {
      return String(variables.str || "");
    }, get language() {
      return String(variables.lang || "");
    }, get source() {
      return clone(source);
    }, getVariable: (name) => Object.prototype.hasOwnProperty.call(variables, name) ? clone(variables[name]) : void 0, activateLanguage: (language) => {
      if (typeof language !== "string" || !language || !Array.isArray(variables.langs) || !variables.langs.includes(language)) throw error("invalidRequest", "Langue indisponible dans cette recherche.");
      return rpc("lookup:language", { language });
    } });
    const getData = () => clone(result), patchData = (patch) => publish({ ...result, ...jsonObject(patch) });
    const api = Object.freeze({
      lookup,
      result: Object.freeze({ get: getData, getData, set: publish, setData: publish, patch: patchData, patchData }),
      output: Object.freeze({ setHtml: (html) => {
        ensure();
        if (typeof html !== "string" || html.length > limits.html) throw error("invalidRequest", "HTML absent ou trop volumineux.");
        document.body.innerHTML = html;
      }, setCss: (css) => {
        ensure();
        if (typeof css !== "string" || css.length > limits.text) throw error("invalidRequest", "CSS absent ou trop volumineux.");
        if (!cssStyle) {
          cssStyle = document.createElement("style");
          cssStyle.dataset.bvScriptCss = "true";
          document.head.append(cssStyle);
        }
        cssStyle.textContent = css;
      } }),
      theme: theme.api,
      actions: Object.freeze({ copyText: (value) => rpc("action:copyText", { text: plainText(value) }, true), openUrl: (url, options = {}) => rpc("action:openUrl", { url: httpURL(url), active: options.active !== false }, true), getSelection: () => rpc("action:getSelection", {}), replaceText: (value) => rpc("action:replaceText", { text: plainText(value) }, true), cut: () => rpc("action:cut", {}, true) }),
      dom: Object.freeze({ query: (selector, attribute = "textContent", all = false) => rpc("dom:query", { selector, attribute, all: all === true }), mutate: (operations) => rpc("dom:mutate", { operations }) })
    });
    return { api, updateTheme: theme.update, dispose() {
      disposed = true;
    }, result: () => clone(result) };
  }
  function fetchRequest(input, init = {}) {
    const url = httpURL(typeof input === "string" ? input : input && input.url), method = String(init.method || "GET").toUpperCase();
    if (!["GET", "HEAD", "POST"].includes(method)) throw error("invalidRequest", "M\xE9thode r\xE9seau non prise en charge.");
    const headers = {};
    const pairs = init.headers && typeof init.headers.entries === "function" ? [...init.headers.entries()] : Object.entries(init.headers || {});
    for (const [name, value] of pairs) {
      if (!/^(accept|content-type|accept-language)$/i.test(name)) throw error("invalidRequest", "En-t\xEAte r\xE9seau non autoris\xE9 : " + name);
      if (typeof value !== "string" || value.length > 1e3 || /[\r\n]/.test(value)) throw error("invalidRequest", "En-t\xEAte r\xE9seau invalide.");
      headers[name] = value;
    }
    if (init.body !== void 0 && (typeof init.body !== "string" || init.body.length > 1e5)) throw error("invalidRequest", "Corps r\xE9seau absent ou trop volumineux.");
    return { url, method, headers, ...init.body === void 0 ? {} : { body: init.body }, credentials: "omit" };
  }
  function bootstrap() {
    if (!root.document || root.parent === root) return;
    let started = false;
    root.addEventListener("message", (event) => {
      if (started || event.source !== root.parent || !event.data || event.data.type !== "bv-definition:script-init" || !event.ports || event.ports.length !== 1) return;
      const config = event.data.config;
      if (!config || typeof config.code !== "string" || config.code.length > limits.code) return;
      started = true;
      const port = event.ports[0], send = port.postMessage.bind(port), pending = /* @__PURE__ */ new Map();
      let counter = 0, inFlight = 0, lastGesture = -Infinity;
      const safeNow = Date.now.bind(Date), setTimer = root.setTimeout.bind(root), clearTimer = root.clearTimeout.bind(root);
      const sendError = (cause) => send({ type: "error", error: { code: cause && cause.code || "failed", message: String(cause && cause.message || cause) } });
      const request = (method, args) => new Promise((resolve, reject) => {
        if (++inFlight > limits.requests) {
          inFlight--;
          reject(error("busy", "Trop de requ\xEAtes simultan\xE9es."));
          return;
        }
        const id = ++counter, timer = setTimer(() => {
          pending.delete(id);
          inFlight--;
          reject(error("timeout", "La requ\xEAte a expir\xE9."));
        }, limits.timeout);
        pending.set(id, { resolve, reject, timer });
        send({ type: "request", id, method, args });
      });
      let runtime, disposed = false, currentResult = clone(config.result || {}), lastHTML = "", outputStyle;
      const guestRequest = (method, args) => {
        if (disposed) return Promise.reject(error("disposed", "R\xE9sultat ferm\xE9."));
        if (["action:copyText", "action:openUrl", "action:replaceText", "action:cut"].includes(method) && safeNow() - lastGesture >= 1e3) return Promise.reject(error("gestureRequired", "Cette action exige un clic ou une touche r\xE9cente."));
        if (method === "action:copyText" || method === "action:replaceText") plainText(args.text);
        if (method === "action:openUrl") args.url = httpURL(args.url);
        if (method === "fetch") args = fetchRequest(args.url, args);
        if (method === "result:set") currentResult = jsonObject(args.value);
        return request(method, args);
      };
      const render = (value) => {
        if (disposed || !value || typeof value.html !== "string" || value.html.length > limits.html || typeof value.styles !== "string" || value.styles.length > limits.text) return;
        currentResult = jsonObject(value.result || {});
        if (value.html !== lastHTML) {
          const active = root.document.activeElement, activeId = active == null ? void 0 : active.getAttribute("data-bv-qjs-id"), selection = active && typeof active.selectionStart === "number" ? { start: active.selectionStart, end: active.selectionEnd } : null;
          root.document.body.innerHTML = value.html;
          lastHTML = value.html;
          for (const node of root.document.body.querySelectorAll("script,iframe,object,embed,base,meta")) node.remove();
          for (const node of root.document.body.querySelectorAll("*")) for (const attribute of Array.from(node.attributes)) if (/^on/i.test(attribute.name)) node.removeAttribute(attribute.name);
          if (activeId) {
            const next = Array.from(root.document.querySelectorAll("[data-bv-qjs-id]")).find((node) => node.getAttribute("data-bv-qjs-id") === activeId);
            if (next) {
              next.focus({ preventScroll: true });
              if (selection && next.setSelectionRange) try {
                next.setSelectionRange(selection.start, selection.end);
              } catch {
              }
            }
          }
        }
        if (!outputStyle) {
          outputStyle = root.document.createElement("style");
          outputStyle.dataset.bvScriptOutput = "true";
          root.document.head.append(outputStyle);
        }
        if (outputStyle.textContent !== value.styles) outputStyle.textContent = value.styles;
      };
      const onEvent = (event2) => {
        var _a, _b;
        if (disposed || !runtime) return;
        if (event2.isTrusted && (event2.type === "click" || event2.type === "keydown")) lastGesture = safeNow();
        const target = (_b = (_a = event2.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, "[data-bv-qjs-id]");
        if (!target) return;
        if (event2.type === "click" && target.closest("a")) event2.preventDefault();
        runtime.dispatch({ id: target.getAttribute("data-bv-qjs-id"), type: event2.type, ..."value" in target ? { value: target.value } : {}, ..."checked" in target ? { checked: target.checked } : {}, key: event2.key, code: event2.code, altKey: event2.altKey, ctrlKey: event2.ctrlKey, shiftKey: event2.shiftKey, metaKey: event2.metaKey, button: event2.button });
      };
      for (const type of ["click", "keydown", "keyup", "input", "change", "submit", "pointerdown", "pointerup"]) root.document.addEventListener(type, onEvent, true);
      port.onmessage = (event2) => {
        const message = event2.data;
        if (!message || typeof message !== "object") return;
        if (message.type === "response" && pending.has(message.id)) {
          const operation = pending.get(message.id);
          pending.delete(message.id);
          inFlight--;
          clearTimer(operation.timer);
          if (message.ok) operation.resolve(clone(message.value));
          else operation.reject(error(message.error && message.error.code || "failed", message.error && message.error.message || "Action refus\xE9e."));
        } else if (message.type === "theme") runtime == null ? void 0 : runtime.updateTheme(message.variables);
        else if (message.type === "dispose") {
          disposed = true;
          runtime == null ? void 0 : runtime.dispose();
          for (const operation of pending.values()) {
            clearTimer(operation.timer);
            operation.reject(error("disposed", "R\xE9sultat ferm\xE9."));
          }
          pending.clear();
          port.close();
        }
      };
      port.start();
      Promise.resolve().then(async () => {
        var _a;
        if (!((_a = root.BVDefinitionQuickJS) == null ? void 0 : _a.createRuntime)) throw error("failed", "Interpr\xE9teur QuickJS/WASM absent.");
        runtime = await root.BVDefinitionQuickJS.createRuntime({ config, request: guestRequest, onRender: render, onError: sendError });
        const value = await runtime.run();
        send({ type: "done", value: clone(value), result: clone(currentResult) });
      }).catch(sendError);
    });
    root.parent.postMessage({ type: "bv-definition:script-ready" }, "*");
  }
  return Object.freeze({ limits, jsonObject, plainText, httpURL, themeAPI, createAPI, fetchRequest, bootstrap });
});
