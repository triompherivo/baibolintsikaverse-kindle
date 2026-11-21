(function(root, factory) {
  const api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BVDefinitionAutomation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function(root) {
  "use strict";
  const limits = Object.freeze({ steps: 1e3, iterations: 500, depth: 8, timeout: 6e4, text: 1e6, nodes: 1e4 });
  const clone = (value) => value === void 0 ? void 0 : JSON.parse(JSON.stringify(value));
  const fail = (message) => new Error("Routine D\xE9finition : " + message);
  const field = (step, key, fallback) => step[key] !== void 0 ? step[key] : step.options && step.options[key] !== void 0 ? step.options[key] : fallback;
  const number = (value, fallback, maximum = limits.timeout) => Number.isFinite(Number(value)) ? Math.max(0, Math.min(maximum, Number(value))) : fallback;
  const cleanKey = (value) => typeof value === "string" && value && !["__proto__", "prototype", "constructor"].includes(value) ? value : null;
  function select(document, selector, scope) {
    if (!selector) return [];
    const type = typeof selector === "string" ? "css" : selector.type || "css";
    const value = typeof selector === "string" ? selector : selector.value || selector.selector || "";
    if (typeof value !== "string" || value.length > 1e4) throw fail("s\xE9lecteur invalide.");
    if (!value.trim()) return [];
    try {
      if (type === "css") return Array.from((scope || document).querySelectorAll(value)).slice(0, limits.nodes);
      if (type === "xpath") {
        const snapshot = document.evaluate(value, scope || document, null, 7, null), result = [];
        for (let index = 0; index < Math.min(snapshot.snapshotLength, limits.nodes); index++) result.push(snapshot.snapshotItem(index));
        return result;
      }
    } catch (error) {
      throw fail("s\xE9lecteur " + type + " invalide : " + error.message);
    }
    throw fail("type de s\xE9lecteur inconnu : " + type);
  }
  function visible(element) {
    if (!element || !element.isConnected || element.hidden) return false;
    const style = element.ownerDocument.defaultView.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && style.visibility !== "collapse" && element.getClientRects().length > 0;
  }
  function conditionMatches(document, selector, condition = {}, scope) {
    const elements = select(document, selector, scope), first = elements[0];
    const type = condition.type || condition.operator || "exists";
    const value = condition.value === void 0 ? "" : String(condition.value);
    const content = first ? first.textContent || "" : "";
    switch (type) {
      case "exists":
      case "elementExists":
        return elements.length > 0;
      case "notExists":
      case "elementMissing":
        return elements.length === 0;
      case "textContains":
      case "text-contains":
        return !!first && content.includes(value);
      case "textEquals":
      case "text-equals":
        return !!first && content === value;
      case "textMatches":
      case "text-regex":
        return !!first && new RegExp(value, condition.flags || "").test(content);
      case "countEq":
      case "countEquals":
      case "count-equals":
      case "elementCountEquals":
        return elements.length === Number(value);
      case "countGt":
      case "countGreaterThan":
      case "count-greater-than":
      case "elementCountGreaterThan":
        return elements.length > Number(value);
      case "countLt":
      case "countLessThan":
      case "count-less-than":
      case "elementCountLessThan":
        return elements.length < Number(value);
      case "attrContains":
      case "attributeContains":
      case "attribute-contains":
        return !!first && String(first.getAttribute(condition.attributeName || condition.attribute || condition.name || "") || "").includes(value);
      case "attrEquals":
      case "attributeEquals":
      case "attribute-equals":
        return !!first && first.getAttribute(condition.attributeName || condition.attribute || condition.name || "") === value;
      case "hasClass":
      case "has-class":
        return !!first && first.classList.contains(value);
      case "visible":
      case "isVisible":
        return elements.some(visible);
      case "hidden":
      case "isHidden":
        return !elements.some(visible);
      default:
        throw fail("condition inconnue : " + type);
    }
  }
  async function transform(value, transformations, render, variables) {
    let result = value;
    for (const operation of transformations || []) {
      const type = typeof operation === "string" ? operation : operation.type || operation.name;
      const argument = typeof operation === "object" ? operation.value === void 0 ? operation.argument : operation.value : "";
      const map = (fn) => Array.isArray(result) ? result.map((item) => fn(String(item))) : fn(String(result == null ? "" : result));
      switch (type) {
        case "trim":
        case "strip":
          result = map((item) => item.trim());
          break;
        case "normalize_whitespace":
        case "normalizeWhitespace":
          result = map((item) => item.trim().replace(/\s+/gu, " "));
          break;
        case "lowercase":
        case "downcase":
          result = map((item) => item.toLowerCase());
          break;
        case "uppercase":
        case "upcase":
          result = map((item) => item.toUpperCase());
          break;
        case "split":
          result = (Array.isArray(result) ? result : [result]).flatMap((item) => String(item).split(String(argument || "")));
          break;
        case "join":
          result = (Array.isArray(result) ? result : [result]).join(String(argument || ""));
          break;
        case "replace":
          result = map((item) => item.split(String(operation.pattern === void 0 ? operation.search === void 0 ? argument : operation.search : operation.pattern)).join(String(operation.replacement || "")));
          break;
        case "regex_replace":
          result = map((item) => item.replace(new RegExp(String(operation.pattern || ""), operation.flags || "g"), String(operation.replacement || "")));
          break;
        case "regex_match":
          result = map((item) => {
            const match = item.match(new RegExp(String(operation.pattern || ""), operation.flags || ""));
            return match ? match[1] === void 0 ? match[0] : match[1] : "";
          });
          break;
        case "default":
          if (result === "" || result == null || Array.isArray(result) && !result.length) result = argument;
          break;
        case "slice": {
          const value2 = String(argument || "").split(",").map(Number);
          result = Array.isArray(result) ? result.slice(value2[0] || 0, value2.length > 1 ? value2[1] : void 0) : String(result).slice(value2[0] || 0, value2.length > 1 ? value2[1] : void 0);
          break;
        }
        case "prefix":
        case "prepend":
          result = map((item) => String(argument || "") + item);
          break;
        case "suffix":
        case "append":
          result = map((item) => item + String(argument || ""));
          break;
        case "removeEmpty":
        case "compact":
          result = Array.isArray(result) ? result.filter((item) => item !== "" && item != null) : result;
          break;
        case "unique":
        case "uniq":
          result = Array.isArray(result) ? Array.from(new Set(result)) : result;
          break;
        case "liquid":
        case "template":
          if (!render) throw fail("moteur Liquid indisponible.");
          result = await render(String(operation.template === void 0 ? argument : operation.template), { ...variables, value: result });
          break;
        default:
          throw fail("transformation inconnue : " + type);
      }
    }
    return result;
  }
  function createRunner(options = {}) {
    const document = options.document || root.document;
    if (!document) throw fail("document requis.");
    const now = options.now || Date.now, sleep = options.sleep || ((milliseconds) => new Promise((resolve) => root.setTimeout(resolve, milliseconds)));
    const variables = clone(options.variables || {}), completed = /* @__PURE__ */ new Set(), opened = /* @__PURE__ */ new Set();
    let cancelled = false, running = false, stepCount = 0;
    const check = () => {
      if (cancelled || options.signal && options.signal.aborted) throw fail("ex\xE9cution annul\xE9e.");
      if (++stepCount > limits.steps) throw fail("limite d\u2019\xE9tapes atteinte.");
    };
    const wait = async (test, timeout = 5e3) => {
      const expires = now() + number(timeout, 5e3);
      while (true) {
        if (cancelled || options.signal && options.signal.aborted) throw fail("ex\xE9cution annul\xE9e.");
        const result = test();
        if (result) return result;
        if (now() >= expires) throw fail("d\xE9lai d\u2019attente d\xE9pass\xE9.");
        await sleep(Math.min(40, Math.max(1, expires - now())));
      }
    };
    const selector = (step) => field(step, "selector", field(step, "target", null));
    const dataKey = (step) => cleanKey(field(step, "key", field(step, "dataKey", field(step, "name", ""))));
    const targets = async (step, scope) => wait(() => {
      const values = select(document, selector(step), scope);
      return values.length ? values : null;
    }, field(step, "timeout", field(step, "timeoutMs", 5e3)));
    async function steps(list, data, scope, depth = 0) {
      if (depth > limits.depth) throw fail("boucles trop profond\xE9ment imbriqu\xE9es.");
      if (!Array.isArray(list)) throw fail("liste d\u2019\xE9tapes invalide.");
      for (const step of list) {
        check();
        if (!step || step.disabled === true || step.state === "disabled" || step.state === false) continue;
        const type = step.type, key = dataKey(step);
        if (options.onStep) await options.onStep({ type, label: step.label || "", id: step.id });
        switch (type) {
          case "wait": {
            const mode = field(step, "mode", field(step, "waitMode", "delay"));
            if (["delay", "fixed", "fixedDelay"].includes(mode)) await sleep(number(field(step, "delay", field(step, "delayMs", field(step, "timeout", 1e3))), 1e3));
            else await wait(() => conditionMatches(document, selector(step), mode === "element" || mode === "exists" ? { type: "exists" } : field(step, "condition", { type: "exists" }), scope), field(step, "timeout", field(step, "timeoutMs", 5e3)));
            break;
          }
          case "extract": {
            const elements = await targets(step, scope), attribute = field(step, "attribute", "textContent");
            const read = (element) => {
              if (["text", "textContent", "text-content"].includes(attribute)) return element.textContent || "";
              if (attribute === "innerHTML" || attribute === "innerHtml") return element.innerHTML;
              if (attribute === "outerHTML" || attribute === "outerHtml") return element.outerHTML;
              if (attribute === "value") return element.value || "";
              if (attribute === "class" || attribute === "className") return element.getAttribute("class") || "";
              if (attribute === "href" || attribute === "src") return element[attribute] || element.getAttribute(attribute) || "";
              return element.getAttribute(attribute === "custom" || attribute === "attr" ? field(step, "customAttributeName", field(step, "customAttribute", "")) : attribute) || "";
            };
            const all = field(step, "multiple", field(step, "all", field(step, "extractAll", false)));
            let value = all ? elements.map(read).filter((item) => item !== "") : read(elements[0]);
            const transformation = field(step, "transformations", field(step, "transforms", []));
            value = await transform(value, Array.isArray(transformation) ? transformation : [], options.renderTemplate, { ...variables, ...data });
            const template = field(step, "template", field(step, "liquidTemplate", void 0));
            if (template !== void 0) {
              if (!options.renderTemplate) throw fail("moteur Liquid indisponible.");
              value = await options.renderTemplate(String(template), { ...variables, ...data, value });
            }
            if (JSON.stringify(value).length > limits.text) throw fail("donn\xE9es extraites trop volumineuses.");
            if (key && !(field(step, "skipIfEmpty", false) && (value === "" || Array.isArray(value) && !value.length))) data[key] = value;
            break;
          }
          case "input": {
            const element = (await targets(step, scope))[0], input = field(step, "value", "");
            const value = options.renderTemplate ? await options.renderTemplate(String(input), { ...variables, ...data }) : String(input);
            if (value.length > limits.text) throw fail("texte \xE0 ins\xE9rer trop volumineux.");
            if (element.disabled || element.readOnly || element.type === "password") throw fail("champ prot\xE9g\xE9 ou non modifiable.");
            const view = document.defaultView;
            const write = (value2) => {
              if (element.isContentEditable) element.textContent = value2;
              else if ("value" in element) {
                const prototype = element.tagName === "TEXTAREA" ? view.HTMLTextAreaElement.prototype : element.tagName === "SELECT" ? view.HTMLSelectElement.prototype : view.HTMLInputElement.prototype;
                const setter = Object.getOwnPropertyDescriptor(prototype, "value");
                if (setter && setter.set) setter.set.call(element, value2);
                else element.value = value2;
              } else throw fail("\xE9l\xE9ment non modifiable.");
              element.dispatchEvent(new view.Event("input", { bubbles: true }));
            };
            if (["type", "typing", "emulateTyping"].includes(field(step, "mode", "insert"))) {
              write("");
              let typed = "";
              for (const character of value) {
                if (cancelled || options.signal && options.signal.aborted) throw fail("ex\xE9cution annul\xE9e.");
                element.dispatchEvent(new view.KeyboardEvent("keydown", { key: character, bubbles: true }));
                typed += character;
                write(typed);
                element.dispatchEvent(new view.KeyboardEvent("keyup", { key: character, bubbles: true }));
                await sleep(number(field(step, "typingDelay", 20), 20, 1e3));
              }
            } else write(value);
            element.dispatchEvent(new view.Event("change", { bubbles: true }));
            break;
          }
          case "click":
            (await targets(step, scope))[0].click();
            break;
          case "scroll": {
            const mode = field(step, "target", field(step, "mode", field(step, "targetType", "element")));
            if (mode === "element") (await targets(step, scope))[0].scrollIntoView({ behavior: "instant", block: "center" });
            else {
              const value = number(field(step, "value", field(step, "position", 0)), 0, 1e8);
              const top = mode === "percentage" || mode === "percent" ? Math.max(0, document.documentElement.scrollHeight - document.defaultView.innerHeight) * Math.min(100, value) / 100 : value;
              document.defaultView.scrollTo({ top, behavior: "instant" });
            }
            break;
          }
          case "remove": {
            for (const element of await targets(step, scope)) {
              if (field(step, "mode", "delete") === "hide") element.style.setProperty("display", "none", "important");
              else element.remove();
            }
            break;
          }
          case "adblock": {
            const values = field(step, "selectors", ["[data-ad]", ".advertisement", ".adsbygoogle", '[id^="google_ads_"]']);
            if (!Array.isArray(values) || values.length > 1e3) throw fail("liste de filtrage invalide.");
            for (const value of values) for (const element of select(document, value, scope)) element.style.setProperty("display", "none", "important");
            break;
          }
          case "script": {
            if (typeof options.executeScript !== "function") throw fail("ex\xE9cuteur JavaScript isol\xE9 indisponible.");
            const code = field(step, "code", "");
            if (typeof code !== "string" || code.length > limits.text) throw fail("code JavaScript invalide.");
            const value = await options.executeScript(code, { variables: clone(variables), data: clone(data), scope, document });
            if (key && value !== void 0) data[key] = clone(value);
            break;
          }
          case "loop": {
            const values = [], mode = field(step, "mode", field(step, "loopMode", "elements"));
            if (mode === "count") {
              const count = number(field(step, "count", 1), 1, limits.iterations);
              for (let index = 0; index < count; index++) {
                const value = {};
                await steps(step.children || [], value, scope, depth + 1);
                values.push(value);
              }
            } else if (["elements", "matchingElements", "matching"].includes(mode)) {
              const elements = (await targets(step, scope)).slice(0, number(field(step, "limit", field(step, "itemLimit", limits.iterations)), limits.iterations, limits.iterations));
              for (const element of elements) {
                const value = {};
                await steps(step.children || [], value, element, depth + 1);
                values.push(value);
              }
            } else if (["condition", "until", "untilCondition"].includes(mode)) {
              const expires = now() + number(field(step, "timeout", field(step, "timeoutMs", 5e3)), 5e3);
              while (!conditionMatches(document, selector(step), field(step, "condition", { type: "exists" }), scope)) {
                if (values.length >= limits.iterations || now() >= expires) throw fail("limite ou d\xE9lai de boucle atteint.");
                const value = {};
                await steps(step.children || [], value, scope, depth + 1);
                values.push(value);
                await sleep(10);
              }
            } else throw fail("mode de boucle inconnu : " + mode);
            if (key) data[key] = values;
            break;
          }
          default:
            throw fail("\xE9tape inconnue : " + type);
        }
      }
      return data;
    }
    async function runRoutine(routine, event = {}) {
      if (!routine || routine.disabled || routine.state === false || routine.state === "disabled") return { skipped: true, reason: "disabled", data: {} };
      if (running) throw fail("une routine est d\xE9j\xE0 en cours.");
      const routineId = routine.id || routine.name || JSON.stringify(routine.steps), behavior = routine.behavior || {}, frequency = behavior.runFrequency || "onOpen", kind = event.event || "open";
      if (frequency === "once" && completed.has(routineId)) return { skipped: true, reason: "once", data: {} };
      if (kind === "navigation" && frequency !== "onNavigation") return { skipped: true, reason: "frequency", data: {} };
      if (kind === "open" && frequency === "onOpen" && opened.has(routineId + ":" + (event.openId || "default"))) return { skipped: true, reason: "open", data: {} };
      const trigger = routine.trigger || { type: "always" };
      if (trigger.type === "manual" && kind !== "manual") return { skipped: true, reason: "manual", data: {} };
      if (trigger.type === "url") {
        const url = event.url || document.location && document.location.href || "", pattern = trigger.value || trigger.url || trigger.pattern || "";
        if (trigger.regex ? !new RegExp(pattern, trigger.flags || "").test(url) : !url.includes(pattern)) return { skipped: true, reason: "url", data: {} };
      } else if (trigger.type === "element" && !select(document, trigger.selector || trigger.value).length) return { skipped: true, reason: "element", data: {} };
      else if (!["always", "manual", "element", "url"].includes(trigger.type)) throw fail("d\xE9clencheur inconnu.");
      running = true;
      stepCount = 0;
      try {
        const data = await steps(routine.steps || [], {}, null);
        completed.add(routineId);
        opened.add(routineId + ":" + (event.openId || "default"));
        const key = cleanKey(behavior.dataKey || behavior.key);
        const result = key ? { [key]: data } : data;
        if (options.onExtract) await options.onExtract(clone(result), routine);
        return { skipped: false, data: result };
      } finally {
        running = false;
      }
    }
    async function runRoutines(source, event) {
      const routines = Array.isArray(source) ? source : source && source._definer && source._definer.wrapper && source._definer.wrapper.routines || source && source.routines || [];
      const results = [];
      for (const routine of routines) results.push(await runRoutine(routine, event));
      return results;
    }
    return Object.freeze({ runRoutine, runRoutines, cancel() {
      cancelled = true;
    }, get running() {
      return running;
    } });
  }
  function httpURL(value) {
    if (typeof value !== "string" || value.length > 16384 || /[\u0000-\u001f\u007f]/.test(value)) throw fail("adresse HTTP/HTTPS invalide.");
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      throw fail("adresse HTTP/HTTPS absolue attendue.");
    }
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw fail("adresse HTTP/HTTPS sans identifiants attendue.");
    return url;
  }
  function handleDOMRequest(document, method, args = {}) {
    if (method === "dom:query") {
      const nodes = select(document, args.selector).slice(0, args.all ? 1e3 : 1), attribute = args.attribute || "textContent";
      const values = nodes.map((node) => {
        if (node.type === "password") throw fail("champ prot\xE9g\xE9.");
        let value;
        if (attribute === "textContent") value = node.textContent || "";
        else if (attribute === "innerHTML" || attribute === "outerHTML") value = node[attribute] || "";
        else if (attribute === "value") value = node.value || "";
        else if (attribute === "href" || attribute === "src") value = node[attribute] || "";
        else if (/^(class|title|alt|aria-[\w-]+|data-[\w-]+)$/.test(attribute)) value = node.getAttribute(attribute) || "";
        else throw fail("attribut non autoris\xE9.");
        if (String(value).length > limits.text) throw fail("donn\xE9es DOM trop volumineuses.");
        return String(value);
      });
      if (JSON.stringify(values).length > limits.text) throw fail("donn\xE9es DOM trop volumineuses.");
      return args.all ? values : values[0] === void 0 ? null : values[0];
    }
    if (method !== "dom:mutate" || !Array.isArray(args.operations) || args.operations.length > 100) throw fail("op\xE9rations DOM invalides.");
    const operations = args.operations.map((operation) => {
      if (!operation || !["remove", "hide", "text", "value", "click", "scroll", "attribute"].includes(operation.type)) throw fail("op\xE9ration DOM non autoris\xE9e.");
      const nodes = select(document, operation.selector).slice(0, 100);
      if (nodes.some((node) => node.type === "password" || node.disabled || node.readOnly)) throw fail("champ prot\xE9g\xE9.");
      if (["text", "value", "attribute"].includes(operation.type) && (typeof operation.value !== "string" || operation.value.length > limits.text)) throw fail("valeur DOM invalide.");
      if (operation.type === "attribute" && !/^(class|title|alt|aria-[\w-]+|data-[\w-]+)$/.test(operation.name || "")) throw fail("attribut DOM non autoris\xE9.");
      return { ...operation, nodes };
    });
    let changed = 0;
    for (const operation of operations) for (const node of operation.nodes) {
      if (operation.type === "remove") node.remove();
      else if (operation.type === "hide") node.style.setProperty("display", "none", "important");
      else if (operation.type === "text") node.textContent = operation.value;
      else if (operation.type === "value") {
        if (!("value" in node)) throw fail("champ non modifiable.");
        node.value = operation.value;
        node.dispatchEvent(new document.defaultView.Event("input", { bubbles: true }));
        node.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));
      } else if (operation.type === "click") node.click();
      else if (operation.type === "scroll") node.scrollIntoView({ block: "center", behavior: "instant" });
      else if (operation.type === "attribute") node.setAttribute(operation.name, operation.value);
      changed++;
    }
    return { changed };
  }
  function createFetchBroker(options = {}) {
    const allowed = new Set((options.allowedOrigins || []).map((value) => httpURL(value).origin));
    const fetch = options.fetch || root.fetch && root.fetch.bind(root), now = options.now || Date.now;
    const maxBytes = number(options.maxBytes, 2e6, 1e7), timestamps = [];
    let inflight = 0;
    return async function(request) {
      if (!request || !allowed.size || !allowed.has(httpURL(request.url).origin)) throw fail("origine r\xE9seau non autoris\xE9e pour ce script.");
      if (!fetch) throw fail("transport r\xE9seau absent.");
      const timestamp = now();
      while (timestamps.length && timestamps[0] <= timestamp - 6e4) timestamps.shift();
      if (timestamps.length >= number(options.maxPerMinute, 20, 100) || inflight >= 3) throw fail("limite de requ\xEAtes r\xE9seau atteinte.");
      const method = String(request.method || "GET").toUpperCase();
      if (!["GET", "HEAD", "POST"].includes(method)) throw fail("m\xE9thode r\xE9seau interdite.");
      const headers = {};
      for (const [key, value] of Object.entries(request.headers || {})) {
        if (!/^(accept|content-type|accept-language)$/i.test(key) || typeof value !== "string" || value.length > 1e3 || /[\r\n]/.test(value)) throw fail("en-t\xEAte r\xE9seau interdit.");
        headers[key] = value;
      }
      if (request.body !== void 0 && (typeof request.body !== "string" || request.body.length > 1e5)) throw fail("corps r\xE9seau trop volumineux.");
      const controller = new AbortController(), timeout = root.setTimeout(() => controller.abort(), number(options.timeout, 15e3));
      timestamps.push(timestamp);
      inflight++;
      try {
        const response = await fetch(request.url, { method, headers, ...request.body === void 0 ? {} : { body: request.body }, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store", signal: controller.signal });
        if (response.url && !allowed.has(httpURL(response.url).origin)) throw fail("redirection r\xE9seau non autoris\xE9e.");
        const contentLength = Number(response.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > maxBytes) throw fail("r\xE9ponse r\xE9seau trop volumineuse.");
        let body;
        if (response.body && typeof response.body.getReader === "function") {
          const reader = response.body.getReader(), decoder = new TextDecoder();
          let bytes = 0;
          body = "";
          try {
            while (true) {
              const part = await reader.read();
              if (part.done) break;
              bytes += part.value.byteLength;
              if (bytes > maxBytes) {
                await reader.cancel();
                throw fail("r\xE9ponse r\xE9seau trop volumineuse.");
              }
              body += decoder.decode(part.value, { stream: true });
            }
            body += decoder.decode();
          } finally {
            reader.releaseLock();
          }
        } else {
          body = await response.text();
          if (new TextEncoder().encode(body).byteLength > maxBytes) throw fail("r\xE9ponse r\xE9seau trop volumineuse.");
        }
        const responseHeaders = {};
        for (const key of ["content-type", "content-language"]) if (response.headers.get(key)) responseHeaders[key] = response.headers.get(key);
        return { body, url: response.url || request.url, status: response.status, statusText: response.statusText, headers: responseHeaders };
      } finally {
        root.clearTimeout(timeout);
        inflight--;
      }
    };
  }
  function createScriptHost(container, options = {}) {
    if (!container || !container.ownerDocument) throw fail("conteneur DOM requis pour le script.");
    const document = container.ownerDocument, view = document.defaultView, iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts allow-modals");
    iframe.setAttribute("referrerpolicy", "no-referrer");
    iframe.setAttribute("title", options.title || "D\xE9finition \xB7 Script");
    iframe.style.cssText = "width:100%;min-height:240px;border:0;display:block";
    const config = clone(options.config || {});
    if (typeof config.code !== "string" || config.code.length > limits.text) throw fail("code script invalide.");
    const frameURL = new URL(options.frameURL, document.location.href);
    const currentURL = new URL(document.location.href), expectedURL = new URL("definition-script.html", currentURL);
    if (frameURL.protocol !== currentURL.protocol || frameURL.host !== currentURL.host || frameURL.username || frameURL.password || frameURL.pathname !== expectedURL.pathname) throw fail("le runtime Script doit appartenir \xE0 cette extension.");
    iframe.src = frameURL.href;
    let port, settled = false, disposed = false, timer, resolveReady, rejectReady, resolveDone, rejectDone;
    const ready = new Promise((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });
    const completion = new Promise((resolve, reject) => {
      resolveDone = resolve;
      rejectDone = reject;
    });
    ready.catch(() => {
    });
    completion.catch(() => {
    });
    const failRun = (error) => {
      if (!settled) {
        settled = true;
        rejectDone(error);
      }
      if (options.onError) options.onError(error);
    };
    const respond = (id, value, error) => {
      if (port && !disposed) port.postMessage(error ? { type: "response", id, ok: false, error: { code: error.code || "failed", message: String(error.message || error) } } : { type: "response", id, ok: true, value: clone(value) });
    };
    const rpc = async (message) => {
      if (!message || !Number.isSafeInteger(message.id) || message.id <= 0 || typeof message.method !== "string" || JSON.stringify(message.args || {}).length > limits.text * 2) return;
      try {
        const args = clone(message.args || {});
        if (message.method === "result:set") {
          if (!args.value || typeof args.value !== "object" || Array.isArray(args.value) || JSON.stringify(args.value).length > limits.text) throw fail("donn\xE9es de r\xE9sultat invalides.");
          if (options.onResult) await options.onResult(clone(args.value));
          respond(message.id, true);
        } else {
          if (!["fetch", "lookup:language", "action:copyText", "action:openUrl", "action:getSelection", "action:replaceText", "action:cut", "dom:query", "dom:mutate"].includes(message.method)) throw fail("commande Script interdite.");
          if (message.method === "action:openUrl") args.url = httpURL(args.url).href;
          if (message.method === "fetch") {
            if (!options.fetchBroker) throw fail("r\xE9seau non configur\xE9 pour ce script.");
            respond(message.id, await options.fetchBroker(args));
          } else {
            if (typeof options.onRequest !== "function") throw fail("action indisponible dans ce contexte.");
            respond(message.id, await options.onRequest(message.method, args));
          }
        }
      } catch (error) {
        respond(message.id, null, error);
      }
    };
    const listen = (event) => {
      if (disposed || event.source !== iframe.contentWindow || !event.data || event.data.type !== "bv-definition:script-ready" || port) return;
      const channel = new view.MessageChannel();
      port = channel.port1;
      port.onmessage = (event2) => {
        const message = event2.data;
        if (disposed || !message || typeof message !== "object") return;
        if (message.type === "request") void rpc(message);
        else if (message.type === "done") {
          if (!settled) {
            settled = true;
            view.clearTimeout(timer);
            resolveDone(clone(message));
          }
        } else if (message.type === "error") {
          view.clearTimeout(timer);
          failRun(Object.assign(new Error(message.error && message.error.message || "Erreur de script."), { code: message.error && message.error.code || "failed" }));
        }
      };
      port.start();
      iframe.contentWindow.postMessage({ type: "bv-definition:script-init", config }, "*", [channel.port2]);
      resolveReady(iframe);
    };
    view.addEventListener("message", listen);
    timer = view.setTimeout(() => {
      const error = fail("le script a d\xE9pass\xE9 le temps disponible.");
      rejectReady(error);
      failRun(error);
      dispose();
    }, number(options.timeout, 15e3));
    function dispose() {
      if (disposed) return;
      disposed = true;
      view.clearTimeout(timer);
      view.removeEventListener("message", listen);
      if (port) {
        port.postMessage({ type: "dispose" });
        port.close();
      }
      iframe.remove();
      const error = fail("r\xE9sultat Script ferm\xE9.");
      rejectReady(error);
      if (!settled) {
        settled = true;
        rejectDone(error);
      }
    }
    container.append(iframe);
    return Object.freeze({ iframe, ready, completion, dispose, updateTheme(variables) {
      if (port && !disposed) port.postMessage({ type: "theme", variables: clone(variables) });
    } });
  }
  return Object.freeze({ limits, select, visible, conditionMatches, transform, createRunner, httpURL, handleDOMRequest, createFetchBroker, createScriptHost });
});
