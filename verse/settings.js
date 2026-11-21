(() => {
  "use strict";
  const memory = {}, saved = {}, pending = {}, listeners = /* @__PURE__ */ new Set();
  let queue = Promise.resolve(), inFlight = {}, retryAt = 0, readFailed = false, writeFailed = false;
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const available = () => !readFailed && !writeFailed;
  function failure(kind, error) {
    if (available()) console.warn("BaibolintsikaVerse : sauvegarde des pr\xE9f\xE9rences indisponible.", error);
    if (kind === "read") readFailed = true;
    else writeFailed = true;
    notify();
  }
  function notify() {
    for (const listener of listeners) listener(available());
  }
  async function get(defaults) {
    try {
      const values = await browser.storage.local.get(defaults);
      for (const [key, value] of Object.entries(values)) {
        saved[key] = value;
        if (!Object.hasOwn(pending, key)) memory[key] = value;
      }
      readFailed = false;
      notify();
    } catch (error) {
      failure("read", error);
    }
    return { ...defaults, ...memory };
  }
  function set(values) {
    for (const [key, value] of Object.entries(values)) {
      memory[key] = JSON.parse(JSON.stringify(value));
      if (same(saved[key], value) && (!Object.hasOwn(inFlight, key) || same(inFlight[key], value))) delete pending[key];
      else pending[key] = memory[key];
    }
    queue = queue.then(async () => {
      if (!Object.keys(pending).length) return true;
      if (Date.now() < retryAt) return false;
      const batch = { ...pending };
      inFlight = batch;
      try {
        await browser.storage.local.set(batch);
        Object.assign(saved, batch);
        for (const [key, value] of Object.entries(batch)) if (same(pending[key], value)) delete pending[key];
        retryAt = 0;
        writeFailed = false;
        notify();
        return true;
      } catch (error) {
        retryAt = Date.now() + 3e4;
        failure("write", error);
        return false;
      } finally {
        inFlight = {};
      }
    });
    return queue;
  }
  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    for (const [key, change] of Object.entries(changes)) {
      saved[key] = change.newValue;
      if (!Object.hasOwn(pending, key)) {
        if (change.newValue === void 0) delete memory[key];
        else memory[key] = change.newValue;
      }
    }
  });
  globalThis.BVSettings = { get, set, get available() {
    return available();
  }, subscribe(listener) {
    listeners.add(listener);
    listener(available());
    return () => listeners.delete(listener);
  } };
})();
