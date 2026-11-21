import { WASI, File, Directory, OpenFile, PreopenDirectory } from "./vendor/wasi/index.js";
function mount(files) {
  const root = new Directory(/* @__PURE__ */ new Map());
  for (const file of files) {
    const parts = String(file.name).split("/").filter(Boolean);
    if (!parts.length || parts.some((part) => part === ".." || part.includes("\\"))) throw Error("Chemin de dictionnaire invalide.");
    let dir = root;
    for (const part of parts.slice(0, -1)) {
      if (!dir.contents.has(part)) dir.contents.set(part, new Directory(/* @__PURE__ */ new Map()));
      dir = dir.contents.get(part);
      if (!(dir instanceof Directory)) throw Error("Chemin de dictionnaire ambigu.");
    }
    dir.contents.set(parts.at(-1), new File(new Uint8Array(file.bytes)));
  }
  return root;
}
onmessage = async (event) => {
  try {
    const { files, main } = event.data;
    if (!Array.isArray(files) || !files.length || files.length > 1e4) throw Error("S\xE9lectionnez un paquet de dictionnaire.");
    const bytes = files.reduce((sum, file) => sum + file.bytes.byteLength, 0);
    if (bytes > 256 * 1024 * 1024) throw Error("Le paquet d\xE9passe 256 Mio.");
    const root = mount(files), stdout = new File(new Uint8Array()), stderr = new File(new Uint8Array());
    const wasi = new WASI(["definition-dictionaries", main ? "/input/" + main : "/input"], ["TMPDIR=/input", "HOME=/input"], [new OpenFile(new File(new Uint8Array())), new OpenFile(stdout), new OpenFile(stderr), new PreopenDirectory("/input", root.contents)]);
    const response = await fetch(new URL("./vendor/dictionaries/dictionaries.wasm", import.meta.url));
    if (!response.ok) throw Error("Moteur de dictionnaires introuvable.");
    const module = await WebAssembly.compile(await response.arrayBuffer());
    const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: wasi.wasiImport });
    const exit = wasi.start(instance);
    const output = new TextDecoder().decode(stdout.data).trim();
    if (exit !== 0) throw Error(new TextDecoder().decode(stderr.data).slice(-2e3) || "\xC9chec du moteur de dictionnaires.");
    const result = JSON.parse(output);
    if (result.error) throw Error(result.error);
    postMessage({ ok: true, value: result });
  } catch (error) {
    postMessage({ ok: false, error: error.message });
  }
};
