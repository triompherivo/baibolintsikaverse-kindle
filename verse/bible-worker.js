"use strict";
let route;
self.browser = {
  runtime: {
    getURL: (file) => new URL(file, location.href).href,
    onMessage: { addListener: (handler) => {
      route = handler;
    } }
  }
};
importScripts("compat.js", "books.js", "core.js", "background.js");
self.onmessage = async ({ data }) => {
  const response = await route(data.message, {});
  self.postMessage({ id: data.id, response });
};
