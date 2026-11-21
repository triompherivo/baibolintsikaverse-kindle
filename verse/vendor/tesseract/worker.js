"use strict";
var Tesseract = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_ocr_buffer();
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      init_ocr_buffer();
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      init_ocr_buffer();
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // scripts/ocr-buffer.mjs
  var import_buffer;
  var init_ocr_buffer = __esm({
    "scripts/ocr-buffer.mjs"() {
      import_buffer = __toESM(require_buffer(), 1);
    }
  });

  // node_modules/regenerator-runtime/runtime.js
  var require_runtime = __commonJS({
    "node_modules/regenerator-runtime/runtime.js"(exports, module) {
      init_ocr_buffer();
      var runtime = (function(exports2) {
        "use strict";
        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var defineProperty = Object.defineProperty || function(obj, key, desc) {
          obj[key] = desc.value;
        };
        var undefined2;
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return obj[key];
        }
        try {
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);
          defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
          return generator;
        }
        exports2.wrap = wrap;
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }
        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";
        var ContinueSentinel = {};
        function Generator() {
        }
        function GeneratorFunction() {
        }
        function GeneratorFunctionPrototype() {
        }
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, function() {
          return this;
        });
        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values2([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          IteratorPrototype = NativeIteratorPrototype;
        }
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = GeneratorFunctionPrototype;
        defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
        defineProperty(
          GeneratorFunctionPrototype,
          "constructor",
          { value: GeneratorFunction, configurable: true }
        );
        GeneratorFunction.displayName = define(
          GeneratorFunctionPrototype,
          toStringTagSymbol,
          "GeneratorFunction"
        );
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
              return this._invoke(method, arg);
            });
          });
        }
        exports2.isGeneratorFunction = function(genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };
        exports2.mark = function(genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };
        exports2.awrap = function(arg) {
          return { __await: arg };
        };
        function AsyncIterator(generator, PromiseImpl) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                return PromiseImpl.resolve(value.__await).then(function(value2) {
                  invoke("next", value2, resolve, reject);
                }, function(err) {
                  invoke("throw", err, resolve, reject);
                });
              }
              return PromiseImpl.resolve(value).then(function(unwrapped) {
                result.value = unwrapped;
                resolve(result);
              }, function(error) {
                return invoke("throw", error, resolve, reject);
              });
            }
          }
          var previousPromise;
          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(
              callInvokeWithMethodAndArg,
              // Avoid propagating failures to Promises returned by later
              // invocations of the iterator.
              callInvokeWithMethodAndArg
            ) : callInvokeWithMethodAndArg();
          }
          defineProperty(this, "_invoke", { value: enqueue });
        }
        defineIteratorMethods(AsyncIterator.prototype);
        define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
          return this;
        });
        exports2.AsyncIterator = AsyncIterator;
        exports2.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          if (PromiseImpl === void 0) PromiseImpl = Promise;
          var iter = new AsyncIterator(
            wrap(innerFn, outerFn, self, tryLocsList),
            PromiseImpl
          );
          return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
        };
        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;
          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }
            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }
              return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel) continue;
                  return delegateResult;
                }
              }
              if (context.method === "next") {
                context.sent = context._sent = context.arg;
              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }
                context.dispatchException(context.arg);
              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }
              state = GenStateExecuting;
              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                if (record.arg === ContinueSentinel) {
                  continue;
                }
                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }
        function maybeInvokeDelegate(delegate, context) {
          var methodName = context.method;
          var method = delegate.iterator[methodName];
          if (method === undefined2) {
            context.delegate = null;
            if (methodName === "throw" && delegate.iterator["return"]) {
              context.method = "return";
              context.arg = undefined2;
              maybeInvokeDelegate(delegate, context);
              if (context.method === "throw") {
                return ContinueSentinel;
              }
            }
            if (methodName !== "return") {
              context.method = "throw";
              context.arg = new TypeError(
                "The iterator does not provide a '" + methodName + "' method"
              );
            }
            return ContinueSentinel;
          }
          var record = tryCatch(method, delegate.iterator, context.arg);
          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }
          var info = record.arg;
          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined2;
            }
          } else {
            return info;
          }
          context.delegate = null;
          return ContinueSentinel;
        }
        defineIteratorMethods(Gp);
        define(Gp, toStringTagSymbol, "Generator");
        define(Gp, iteratorSymbol, function() {
          return this;
        });
        define(Gp, "toString", function() {
          return "[object Generator]";
        });
        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };
          if (1 in locs) {
            entry.catchLoc = locs[1];
          }
          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }
          this.tryEntries.push(entry);
        }
        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }
        function Context(tryLocsList) {
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }
        exports2.keys = function(val) {
          var object = Object(val);
          var keys2 = [];
          for (var key in object) {
            keys2.push(key);
          }
          keys2.reverse();
          return function next() {
            while (keys2.length) {
              var key2 = keys2.pop();
              if (key2 in object) {
                next.value = key2;
                next.done = false;
                return next;
              }
            }
            next.done = true;
            return next;
          };
        };
        function values2(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }
            if (typeof iterable.next === "function") {
              return iterable;
            }
            if (!isNaN(iterable.length)) {
              var i = -1, next = function next2() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next2.value = iterable[i];
                    next2.done = false;
                    return next2;
                  }
                }
                next2.value = undefined2;
                next2.done = true;
                return next2;
              };
              return next.next = next;
            }
          }
          return { next: doneResult };
        }
        exports2.values = values2;
        function doneResult() {
          return { value: undefined2, done: true };
        }
        Context.prototype = {
          constructor: Context,
          reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined2;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined2;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
              for (var name in this) {
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined2;
                }
              }
            }
          },
          stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }
            return this.rval;
          },
          dispatchException: function(exception) {
            if (this.done) {
              throw exception;
            }
            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;
              if (caught) {
                context.method = "next";
                context.arg = undefined2;
              }
              return !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;
              if (entry.tryLoc === "root") {
                return handle("end");
              }
              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");
                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },
          abrupt: function(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              finallyEntry = null;
            }
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }
            return this.complete(record);
          },
          complete: function(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }
            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }
            return ContinueSentinel;
          },
          finish: function(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },
          "catch": function(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values2(iterable),
              resultName,
              nextLoc
            };
            if (this.method === "next") {
              this.arg = undefined2;
            }
            return ContinueSentinel;
          }
        };
        return exports2;
      })(
        // If this script is executing as a CommonJS module, use module.exports
        // as the regeneratorRuntime namespace. Otherwise create a new empty
        // object. Either way, the resulting object will be used to initialize
        // the regeneratorRuntime variable at the top of this file.
        typeof module === "object" ? module.exports : {}
      );
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
          globalThis.regeneratorRuntime = runtime;
        } else {
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      }
    }
  });

  // node_modules/tesseract.js/src/worker-script/utils/arrayBufferToBase64.js
  var require_arrayBufferToBase64 = __commonJS({
    "node_modules/tesseract.js/src/worker-script/utils/arrayBufferToBase64.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = (arrayBuffer) => {
        let base64 = "";
        const encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        const bytes = new Uint8Array(arrayBuffer);
        const { byteLength } = bytes;
        const byteRemainder = byteLength % 3;
        const mainLength = byteLength - byteRemainder;
        let a;
        let b;
        let c;
        let d;
        let chunk;
        for (let i = 0; i < mainLength; i += 3) {
          chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          a = (chunk & 16515072) >> 18;
          b = (chunk & 258048) >> 12;
          c = (chunk & 4032) >> 6;
          d = chunk & 63;
          base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        if (byteRemainder === 1) {
          chunk = bytes[mainLength];
          a = (chunk & 252) >> 2;
          b = (chunk & 3) << 4;
          base64 += `${encodings[a] + encodings[b]}==`;
        } else if (byteRemainder === 2) {
          chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
          a = (chunk & 64512) >> 10;
          b = (chunk & 1008) >> 4;
          c = (chunk & 15) << 2;
          base64 += `${encodings[a] + encodings[b] + encodings[c]}=`;
        }
        return base64;
      };
    }
  });

  // node_modules/tesseract.js/src/constants/imageType.js
  var require_imageType = __commonJS({
    "node_modules/tesseract.js/src/constants/imageType.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = {
        COLOR: 0,
        GREY: 1,
        BINARY: 2
      };
    }
  });

  // node_modules/tesseract.js/src/worker-script/utils/dump.js
  var require_dump = __commonJS({
    "node_modules/tesseract.js/src/worker-script/utils/dump.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      var arrayBufferToBase64 = require_arrayBufferToBase64();
      var imageType = require_imageType();
      var deindent = (html) => {
        const lines = html.split("\n");
        if (lines[0].substring(0, 2) === "  ") {
          for (let i = 0; i < lines.length; i += 1) {
            if (lines[i].substring(0, 2) === "  ") {
              lines[i] = lines[i].slice(2);
            }
          }
        }
        return lines.join("\n");
      };
      module.exports = (TessModule, api, output, options) => {
        const enumToString = (value, prefix) => Object.keys(TessModule).filter((e) => e.startsWith(`${prefix}_`) && TessModule[e] === value).map((e) => e.slice(prefix.length + 1))[0];
        const getImage = (type) => {
          api.WriteImage(type, "/image.png");
          const pngBuffer = TessModule.FS.readFile("/image.png");
          const pngStr = `data:image/png;base64,${arrayBufferToBase64(pngBuffer.buffer)}`;
          TessModule.FS.unlink("/image.png");
          return pngStr;
        };
        const getPDFInternal = (title, textonly) => {
          const pdfRenderer = new TessModule.TessPDFRenderer("tesseract-ocr", "/", textonly);
          pdfRenderer.BeginDocument(title);
          pdfRenderer.AddImage(api);
          pdfRenderer.EndDocument();
          TessModule._free(pdfRenderer);
          return TessModule.FS.readFile("/tesseract-ocr.pdf");
        };
        return {
          text: output.text ? api.GetUTF8Text() : null,
          hocr: output.hocr ? deindent(api.GetHOCRText()) : null,
          tsv: output.tsv ? api.GetTSVText() : null,
          box: output.box ? api.GetBoxText() : null,
          unlv: output.unlv ? api.GetUNLVText() : null,
          osd: output.osd ? api.GetOsdText() : null,
          pdf: output.pdf ? getPDFInternal(options.pdfTitle ?? "Tesseract OCR Result", options.pdfTextOnly ?? false) : null,
          imageColor: output.imageColor ? getImage(imageType.COLOR) : null,
          imageGrey: output.imageGrey ? getImage(imageType.GREY) : null,
          imageBinary: output.imageBinary ? getImage(imageType.BINARY) : null,
          confidence: !options.skipRecognition ? api.MeanTextConf() : null,
          blocks: output.blocks && !options.skipRecognition ? JSON.parse(api.GetJSONText()).blocks : null,
          layoutBlocks: output.layoutBlocks && options.skipRecognition ? JSON.parse(api.GetJSONText()).blocks : null,
          psm: enumToString(api.GetPageSegMode(), "PSM"),
          oem: enumToString(api.oem(), "OEM"),
          version: api.Version(),
          debug: output.debug ? TessModule.FS.readFile("/debugInternal.txt", { encoding: "utf8", flags: "a+" }) : null
        };
      };
    }
  });

  // node_modules/tesseract.js/src/utils/getEnvironment.js
  var require_getEnvironment = __commonJS({
    "node_modules/tesseract.js/src/utils/getEnvironment.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = (key) => {
        const env = {};
        if (typeof WorkerGlobalScope !== "undefined") {
          env.type = "webworker";
        } else if (typeof document === "object") {
          env.type = "browser";
        } else if (typeof process === "object" && typeof __require === "function") {
          env.type = "node";
        }
        if (typeof key === "undefined") {
          return env;
        }
        return env[key];
      };
    }
  });

  // node_modules/bmp-js/lib/encoder.js
  var require_encoder = __commonJS({
    "node_modules/bmp-js/lib/encoder.js"(exports, module) {
      init_ocr_buffer();
      function BmpEncoder(imgData) {
        this.buffer = imgData.data;
        this.width = imgData.width;
        this.height = imgData.height;
        this.extraBytes = this.width % 4;
        this.rgbSize = this.height * (3 * this.width + this.extraBytes);
        this.headerInfoSize = 40;
        this.data = [];
        this.flag = "BM";
        this.reserved = 0;
        this.offset = 54;
        this.fileSize = this.rgbSize + this.offset;
        this.planes = 1;
        this.bitPP = 24;
        this.compress = 0;
        this.hr = 0;
        this.vr = 0;
        this.colors = 0;
        this.importantColors = 0;
      }
      BmpEncoder.prototype.encode = function() {
        var tempBuffer = new import_buffer.Buffer(this.offset + this.rgbSize);
        this.pos = 0;
        tempBuffer.write(this.flag, this.pos, 2);
        this.pos += 2;
        tempBuffer.writeUInt32LE(this.fileSize, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.reserved, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.offset, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.headerInfoSize, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.width, this.pos);
        this.pos += 4;
        tempBuffer.writeInt32LE(-this.height, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt16LE(this.planes, this.pos);
        this.pos += 2;
        tempBuffer.writeUInt16LE(this.bitPP, this.pos);
        this.pos += 2;
        tempBuffer.writeUInt32LE(this.compress, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.rgbSize, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.hr, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.vr, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.colors, this.pos);
        this.pos += 4;
        tempBuffer.writeUInt32LE(this.importantColors, this.pos);
        this.pos += 4;
        var i = 0;
        var rowBytes = 3 * this.width + this.extraBytes;
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var p = this.pos + y * rowBytes + x * 3;
            i++;
            tempBuffer[p] = this.buffer[i++];
            tempBuffer[p + 1] = this.buffer[i++];
            tempBuffer[p + 2] = this.buffer[i++];
          }
          if (this.extraBytes > 0) {
            var fillOffset = this.pos + y * rowBytes + this.width * 3;
            tempBuffer.fill(0, fillOffset, fillOffset + this.extraBytes);
          }
        }
        return tempBuffer;
      };
      module.exports = function(imgData, quality) {
        if (typeof quality === "undefined") quality = 100;
        var encoder = new BmpEncoder(imgData);
        var data = encoder.encode();
        return {
          data,
          width: imgData.width,
          height: imgData.height
        };
      };
    }
  });

  // node_modules/bmp-js/lib/decoder.js
  var require_decoder = __commonJS({
    "node_modules/bmp-js/lib/decoder.js"(exports, module) {
      init_ocr_buffer();
      function BmpDecoder(buffer, is_with_alpha) {
        this.pos = 0;
        this.buffer = buffer;
        this.is_with_alpha = !!is_with_alpha;
        this.bottom_up = true;
        this.flag = this.buffer.toString("utf-8", 0, this.pos += 2);
        if (this.flag != "BM") throw new Error("Invalid BMP File");
        this.parseHeader();
        this.parseRGBA();
      }
      BmpDecoder.prototype.parseHeader = function() {
        this.fileSize = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.reserved = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.offset = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.headerSize = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.width = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.height = this.buffer.readInt32LE(this.pos);
        this.pos += 4;
        this.planes = this.buffer.readUInt16LE(this.pos);
        this.pos += 2;
        this.bitPP = this.buffer.readUInt16LE(this.pos);
        this.pos += 2;
        this.compress = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.rawSize = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.hr = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.vr = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.colors = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        this.importantColors = this.buffer.readUInt32LE(this.pos);
        this.pos += 4;
        if (this.bitPP === 16 && this.is_with_alpha) {
          this.bitPP = 15;
        }
        if (this.bitPP < 15) {
          var len = this.colors === 0 ? 1 << this.bitPP : this.colors;
          this.palette = new Array(len);
          for (var i = 0; i < len; i++) {
            var blue = this.buffer.readUInt8(this.pos++);
            var green = this.buffer.readUInt8(this.pos++);
            var red = this.buffer.readUInt8(this.pos++);
            var quad = this.buffer.readUInt8(this.pos++);
            this.palette[i] = {
              red,
              green,
              blue,
              quad
            };
          }
        }
        if (this.height < 0) {
          this.height *= -1;
          this.bottom_up = false;
        }
      };
      BmpDecoder.prototype.parseRGBA = function() {
        var bitn = "bit" + this.bitPP;
        var len = this.width * this.height * 4;
        this.data = new import_buffer.Buffer(len);
        this[bitn]();
      };
      BmpDecoder.prototype.bit1 = function() {
        var xlen = Math.ceil(this.width / 8);
        var mode = xlen % 4;
        var y = this.height >= 0 ? this.height - 1 : -this.height;
        for (var y = this.height - 1; y >= 0; y--) {
          var line = this.bottom_up ? y : this.height - 1 - y;
          for (var x = 0; x < xlen; x++) {
            var b = this.buffer.readUInt8(this.pos++);
            var location = line * this.width * 4 + x * 8 * 4;
            for (var i = 0; i < 8; i++) {
              if (x * 8 + i < this.width) {
                var rgb = this.palette[b >> 7 - i & 1];
                this.data[location + i * 4] = 0;
                this.data[location + i * 4 + 1] = rgb.blue;
                this.data[location + i * 4 + 2] = rgb.green;
                this.data[location + i * 4 + 3] = rgb.red;
              } else {
                break;
              }
            }
          }
          if (mode != 0) {
            this.pos += 4 - mode;
          }
        }
      };
      BmpDecoder.prototype.bit4 = function() {
        if (this.compress == 2) {
          let setPixelData2 = function(rgbIndex) {
            var rgb2 = this.palette[rgbIndex];
            this.data[location] = 0;
            this.data[location + 1] = rgb2.blue;
            this.data[location + 2] = rgb2.green;
            this.data[location + 3] = rgb2.red;
            location += 4;
          };
          var setPixelData = setPixelData2;
          this.data.fill(255);
          var location = 0;
          var lines = this.bottom_up ? this.height - 1 : 0;
          var low_nibble = false;
          while (location < this.data.length) {
            var a = this.buffer.readUInt8(this.pos++);
            var b = this.buffer.readUInt8(this.pos++);
            if (a == 0) {
              if (b == 0) {
                if (this.bottom_up) {
                  lines--;
                } else {
                  lines++;
                }
                location = lines * this.width * 4;
                low_nibble = false;
                continue;
              } else if (b == 1) {
                break;
              } else if (b == 2) {
                var x = this.buffer.readUInt8(this.pos++);
                var y = this.buffer.readUInt8(this.pos++);
                if (this.bottom_up) {
                  lines -= y;
                } else {
                  lines += y;
                }
                location += y * this.width * 4 + x * 4;
              } else {
                var c = this.buffer.readUInt8(this.pos++);
                for (var i = 0; i < b; i++) {
                  if (low_nibble) {
                    setPixelData2.call(this, c & 15);
                  } else {
                    setPixelData2.call(this, (c & 240) >> 4);
                  }
                  if (i & 1 && i + 1 < b) {
                    c = this.buffer.readUInt8(this.pos++);
                  }
                  low_nibble = !low_nibble;
                }
                if ((b + 1 >> 1 & 1) == 1) {
                  this.pos++;
                }
              }
            } else {
              for (var i = 0; i < a; i++) {
                if (low_nibble) {
                  setPixelData2.call(this, b & 15);
                } else {
                  setPixelData2.call(this, (b & 240) >> 4);
                }
                low_nibble = !low_nibble;
              }
            }
          }
        } else {
          var xlen = Math.ceil(this.width / 2);
          var mode = xlen % 4;
          for (var y = this.height - 1; y >= 0; y--) {
            var line = this.bottom_up ? y : this.height - 1 - y;
            for (var x = 0; x < xlen; x++) {
              var b = this.buffer.readUInt8(this.pos++);
              var location = line * this.width * 4 + x * 2 * 4;
              var before = b >> 4;
              var after = b & 15;
              var rgb = this.palette[before];
              this.data[location] = 0;
              this.data[location + 1] = rgb.blue;
              this.data[location + 2] = rgb.green;
              this.data[location + 3] = rgb.red;
              if (x * 2 + 1 >= this.width) break;
              rgb = this.palette[after];
              this.data[location + 4] = 0;
              this.data[location + 4 + 1] = rgb.blue;
              this.data[location + 4 + 2] = rgb.green;
              this.data[location + 4 + 3] = rgb.red;
            }
            if (mode != 0) {
              this.pos += 4 - mode;
            }
          }
        }
      };
      BmpDecoder.prototype.bit8 = function() {
        if (this.compress == 1) {
          let setPixelData2 = function(rgbIndex) {
            var rgb2 = this.palette[rgbIndex];
            this.data[location] = 0;
            this.data[location + 1] = rgb2.blue;
            this.data[location + 2] = rgb2.green;
            this.data[location + 3] = rgb2.red;
            location += 4;
          };
          var setPixelData = setPixelData2;
          this.data.fill(255);
          var location = 0;
          var lines = this.bottom_up ? this.height - 1 : 0;
          while (location < this.data.length) {
            var a = this.buffer.readUInt8(this.pos++);
            var b = this.buffer.readUInt8(this.pos++);
            if (a == 0) {
              if (b == 0) {
                if (this.bottom_up) {
                  lines--;
                } else {
                  lines++;
                }
                location = lines * this.width * 4;
                continue;
              } else if (b == 1) {
                break;
              } else if (b == 2) {
                var x = this.buffer.readUInt8(this.pos++);
                var y = this.buffer.readUInt8(this.pos++);
                if (this.bottom_up) {
                  lines -= y;
                } else {
                  lines += y;
                }
                location += y * this.width * 4 + x * 4;
              } else {
                for (var i = 0; i < b; i++) {
                  var c = this.buffer.readUInt8(this.pos++);
                  setPixelData2.call(this, c);
                }
                if (b & true) {
                  this.pos++;
                }
              }
            } else {
              for (var i = 0; i < a; i++) {
                setPixelData2.call(this, b);
              }
            }
          }
        } else {
          var mode = this.width % 4;
          for (var y = this.height - 1; y >= 0; y--) {
            var line = this.bottom_up ? y : this.height - 1 - y;
            for (var x = 0; x < this.width; x++) {
              var b = this.buffer.readUInt8(this.pos++);
              var location = line * this.width * 4 + x * 4;
              if (b < this.palette.length) {
                var rgb = this.palette[b];
                this.data[location] = 0;
                this.data[location + 1] = rgb.blue;
                this.data[location + 2] = rgb.green;
                this.data[location + 3] = rgb.red;
              } else {
                this.data[location] = 0;
                this.data[location + 1] = 255;
                this.data[location + 2] = 255;
                this.data[location + 3] = 255;
              }
            }
            if (mode != 0) {
              this.pos += 4 - mode;
            }
          }
        }
      };
      BmpDecoder.prototype.bit15 = function() {
        var dif_w = this.width % 3;
        var _11111 = parseInt("11111", 2), _1_5 = _11111;
        for (var y = this.height - 1; y >= 0; y--) {
          var line = this.bottom_up ? y : this.height - 1 - y;
          for (var x = 0; x < this.width; x++) {
            var B = this.buffer.readUInt16LE(this.pos);
            this.pos += 2;
            var blue = (B & _1_5) / _1_5 * 255 | 0;
            var green = (B >> 5 & _1_5) / _1_5 * 255 | 0;
            var red = (B >> 10 & _1_5) / _1_5 * 255 | 0;
            var alpha = B >> 15 ? 255 : 0;
            var location = line * this.width * 4 + x * 4;
            this.data[location] = alpha;
            this.data[location + 1] = blue;
            this.data[location + 2] = green;
            this.data[location + 3] = red;
          }
          this.pos += dif_w;
        }
      };
      BmpDecoder.prototype.bit16 = function() {
        var dif_w = this.width % 2 * 2;
        this.maskRed = 31744;
        this.maskGreen = 992;
        this.maskBlue = 31;
        this.mask0 = 0;
        if (this.compress == 3) {
          this.maskRed = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.maskGreen = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.maskBlue = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.mask0 = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
        }
        var ns = [0, 0, 0];
        for (var i = 0; i < 16; i++) {
          if (this.maskRed >> i & 1) ns[0]++;
          if (this.maskGreen >> i & 1) ns[1]++;
          if (this.maskBlue >> i & 1) ns[2]++;
        }
        ns[1] += ns[0];
        ns[2] += ns[1];
        ns[0] = 8 - ns[0];
        ns[1] -= 8;
        ns[2] -= 8;
        for (var y = this.height - 1; y >= 0; y--) {
          var line = this.bottom_up ? y : this.height - 1 - y;
          for (var x = 0; x < this.width; x++) {
            var B = this.buffer.readUInt16LE(this.pos);
            this.pos += 2;
            var blue = (B & this.maskBlue) << ns[0];
            var green = (B & this.maskGreen) >> ns[1];
            var red = (B & this.maskRed) >> ns[2];
            var location = line * this.width * 4 + x * 4;
            this.data[location] = 0;
            this.data[location + 1] = blue;
            this.data[location + 2] = green;
            this.data[location + 3] = red;
          }
          this.pos += dif_w;
        }
      };
      BmpDecoder.prototype.bit24 = function() {
        for (var y = this.height - 1; y >= 0; y--) {
          var line = this.bottom_up ? y : this.height - 1 - y;
          for (var x = 0; x < this.width; x++) {
            var blue = this.buffer.readUInt8(this.pos++);
            var green = this.buffer.readUInt8(this.pos++);
            var red = this.buffer.readUInt8(this.pos++);
            var location = line * this.width * 4 + x * 4;
            this.data[location] = 0;
            this.data[location + 1] = blue;
            this.data[location + 2] = green;
            this.data[location + 3] = red;
          }
          this.pos += this.width % 4;
        }
      };
      BmpDecoder.prototype.bit32 = function() {
        if (this.compress == 3) {
          this.maskRed = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.maskGreen = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.maskBlue = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          this.mask0 = this.buffer.readUInt32LE(this.pos);
          this.pos += 4;
          for (var y = this.height - 1; y >= 0; y--) {
            var line = this.bottom_up ? y : this.height - 1 - y;
            for (var x = 0; x < this.width; x++) {
              var alpha = this.buffer.readUInt8(this.pos++);
              var blue = this.buffer.readUInt8(this.pos++);
              var green = this.buffer.readUInt8(this.pos++);
              var red = this.buffer.readUInt8(this.pos++);
              var location = line * this.width * 4 + x * 4;
              this.data[location] = alpha;
              this.data[location + 1] = blue;
              this.data[location + 2] = green;
              this.data[location + 3] = red;
            }
          }
        } else {
          for (var y = this.height - 1; y >= 0; y--) {
            var line = this.bottom_up ? y : this.height - 1 - y;
            for (var x = 0; x < this.width; x++) {
              var blue = this.buffer.readUInt8(this.pos++);
              var green = this.buffer.readUInt8(this.pos++);
              var red = this.buffer.readUInt8(this.pos++);
              var alpha = this.buffer.readUInt8(this.pos++);
              var location = line * this.width * 4 + x * 4;
              this.data[location] = alpha;
              this.data[location + 1] = blue;
              this.data[location + 2] = green;
              this.data[location + 3] = red;
            }
          }
        }
      };
      BmpDecoder.prototype.getData = function() {
        return this.data;
      };
      module.exports = function(bmpData) {
        var decoder = new BmpDecoder(bmpData);
        return decoder;
      };
    }
  });

  // node_modules/bmp-js/index.js
  var require_bmp_js = __commonJS({
    "node_modules/bmp-js/index.js"(exports, module) {
      init_ocr_buffer();
      var encode = require_encoder();
      var decode = require_decoder();
      module.exports = {
        encode,
        decode
      };
    }
  });

  // node_modules/tesseract.js/src/worker-script/utils/setImage.js
  var require_setImage = __commonJS({
    "node_modules/tesseract.js/src/worker-script/utils/setImage.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      var bmp = require_bmp_js();
      module.exports = (TessModule, api, image, angle = 0) => {
        const isBmp = image[0] === 66 && image[1] === 77 || image[1] === 66 && image[0] === 77;
        const exif = parseInt(image.slice(0, 500).join(" ").match(/1 18 0 3 0 0 0 1 0 (\d)/)?.[1], 10) || 1;
        if (isBmp) {
          const buf = import_buffer.Buffer.from(Array.from({ ...image, length: Object.keys(image).length }));
          const bmpBuf = bmp.decode(buf);
          TessModule.FS.writeFile("/input", bmp.encode(bmpBuf).data);
        } else {
          TessModule.FS.writeFile("/input", image);
        }
        const res = api.SetImageFile(exif, angle);
        if (res === 1) throw Error("Error attempting to read image.");
      };
    }
  });

  // node_modules/tesseract.js/src/worker-script/constants/defaultOutput.js
  var require_defaultOutput = __commonJS({
    "node_modules/tesseract.js/src/worker-script/constants/defaultOutput.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = {
        text: true,
        blocks: false,
        layoutBlocks: false,
        hocr: false,
        tsv: false,
        box: false,
        unlv: false,
        osd: false,
        pdf: false,
        imageColor: false,
        imageGrey: false,
        imageBinary: false,
        debug: false
      };
    }
  });

  // node_modules/tesseract.js/src/utils/log.js
  var require_log = __commonJS({
    "node_modules/tesseract.js/src/utils/log.js"(exports) {
      "use strict";
      init_ocr_buffer();
      var logging = false;
      exports.logging = logging;
      exports.setLogging = (_logging) => {
        logging = _logging;
      };
      exports.log = (...args) => logging ? console.log.apply(exports, args) : null;
    }
  });

  // node_modules/tesseract.js/src/constants/PSM.js
  var require_PSM = __commonJS({
    "node_modules/tesseract.js/src/constants/PSM.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = {
        OSD_ONLY: "0",
        AUTO_OSD: "1",
        AUTO_ONLY: "2",
        AUTO: "3",
        SINGLE_COLUMN: "4",
        SINGLE_BLOCK_VERT_TEXT: "5",
        SINGLE_BLOCK: "6",
        SINGLE_LINE: "7",
        SINGLE_WORD: "8",
        CIRCLE_WORD: "9",
        SINGLE_CHAR: "10",
        SPARSE_TEXT: "11",
        SPARSE_TEXT_OSD: "12",
        RAW_LINE: "13"
      };
    }
  });

  // node_modules/tesseract.js/src/worker-script/index.js
  var require_worker_script = __commonJS({
    "node_modules/tesseract.js/src/worker-script/index.js"(exports) {
      "use strict";
      init_ocr_buffer();
      require_runtime();
      var dump = require_dump();
      var env = require_getEnvironment()("type");
      var setImage = require_setImage();
      var defaultOutput = require_defaultOutput();
      var { log, setLogging } = require_log();
      var PSM = require_PSM();
      var TessModule;
      var api = null;
      var latestJob;
      var adapter = {};
      var params = {};
      var loadLanguageLangsWorker;
      var loadLanguageOptionsWorker;
      var dataFromCache = false;
      var load = async ({ workerId, jobId, payload: { options: { lstmOnly, corePath, logging } } }, res) => {
        setLogging(logging);
        const statusText = "initializing tesseract";
        if (!TessModule) {
          const Core = await adapter.getCore(lstmOnly, corePath, res);
          res.progress({ workerId, status: statusText, progress: 0 });
          await Core({
            TesseractProgress(percent) {
              latestJob.progress({
                workerId,
                jobId,
                status: "recognizing text",
                progress: Math.max(0, (percent - 30) / 70)
              });
            }
          }).then((tessModule) => {
            TessModule = tessModule;
            res.progress({ workerId, status: statusText, progress: 1 });
            res.resolve({ loaded: true });
          });
        } else {
          res.resolve({ loaded: true });
        }
      };
      var FS = async ({ workerId, payload: { method, args } }, res) => {
        log(`[${workerId}]: FS.${method}`);
        res.resolve(TessModule.FS[method](...args));
      };
      var loadLanguage = async ({
        workerId,
        payload: {
          langs,
          options: {
            langPath,
            dataPath,
            cachePath,
            cacheMethod,
            gzip = true,
            lstmOnly
          }
        }
      }, res) => {
        loadLanguageLangsWorker = langs;
        loadLanguageOptionsWorker = {
          langPath,
          dataPath,
          cachePath,
          cacheMethod,
          gzip,
          lstmOnly
        };
        const statusText = "loading language traineddata";
        const langsArr = typeof langs === "string" ? langs.split("+") : langs;
        let progress = 0;
        const loadAndGunzipFile = async (_lang) => {
          const lang = typeof _lang === "string" ? _lang : _lang.code;
          const readCache = ["refresh", "none"].includes(cacheMethod) ? () => Promise.resolve() : adapter.readCache;
          let data = null;
          let newData = false;
          try {
            const _data = await readCache(`${cachePath || "."}/${lang}.traineddata`);
            if (typeof _data !== "undefined") {
              log(`[${workerId}]: Load ${lang}.traineddata from cache`);
              data = _data;
              dataFromCache = true;
            } else {
              throw Error("Not found in cache");
            }
          } catch (e) {
            newData = true;
            log(`[${workerId}]: Load ${lang}.traineddata from ${langPath}`);
            if (typeof _lang === "string") {
              if (!["eng", "fra", "heb"].includes(lang)) throw Error("Langue OCR non install\xE9e.");
              const url = new URL("languages/" + lang + ".traineddata.gz", globalThis.location.href);
              const response = await fetch(url, { redirect: "error" });
              if (!response.ok) throw Error("Mod\xE8le OCR local introuvable.");
              data = new Uint8Array(await response.arrayBuffer());
            } else {
              data = _lang.data;
            }
          }
          progress += 0.5 / langsArr.length;
          if (res) res.progress({ workerId, status: statusText, progress });
          const isGzip = data[0] === 31 && data[1] === 139 || data[1] === 31 && data[0] === 139;
          if (isGzip) {
            data = adapter.gunzip(data);
          }
          if (TessModule) {
            if (dataPath) {
              try {
                TessModule.FS.mkdir(dataPath);
              } catch (err) {
                if (res) res.reject(err.toString());
              }
            }
            TessModule.FS.writeFile(`${dataPath || "."}/${lang}.traineddata`, data);
          }
          if (newData && ["write", "refresh", void 0].includes(cacheMethod)) {
            try {
              await adapter.writeCache(`${cachePath || "."}/${lang}.traineddata`, data);
            } catch (err) {
              log(`[${workerId}]: Failed to write ${lang}.traineddata to cache due to error:`);
              log(err.toString());
            }
          }
          progress += 0.5 / langsArr.length;
          if (Math.round(progress * 100) === 100) progress = 1;
          if (res) res.progress({ workerId, status: statusText, progress });
        };
        if (res) res.progress({ workerId, status: statusText, progress: 0 });
        try {
          await Promise.all(langsArr.map(loadAndGunzipFile));
          if (res) res.resolve(langs);
        } catch (err) {
          if (res) res.reject(err.toString());
        }
      };
      var setParameters = async ({ payload: { params: _params } }, res) => {
        const initParamNames = [
          "ambigs_debug_level",
          "user_words_suffix",
          "user_patterns_suffix",
          "user_patterns_suffix",
          "load_system_dawg",
          "load_freq_dawg",
          "load_unambig_dawg",
          "load_punc_dawg",
          "load_number_dawg",
          "load_bigram_dawg",
          "tessedit_ocr_engine_mode",
          "tessedit_init_config_only",
          "language_model_ngram_on",
          "language_model_use_sigmoidal_certainty"
        ];
        const initParamStr = Object.keys(_params).filter((k) => initParamNames.includes(k)).join(", ");
        if (initParamStr.length > 0) console.log(`Attempted to set parameters that can only be set during initialization: ${initParamStr}`);
        Object.keys(_params).filter((k) => !k.startsWith("tessjs_")).forEach((key) => {
          api.SetVariable(key, _params[key]);
        });
        params = { ...params, ..._params };
        if (typeof res !== "undefined") {
          res.resolve(params);
        }
      };
      var initialize = async ({
        workerId,
        payload: { langs: _langs, oem, config }
      }, res) => {
        const langs = typeof _langs === "string" ? _langs : _langs.map((l) => typeof l === "string" ? l : l.data).join("+");
        const statusText = "initializing api";
        try {
          res.progress({
            workerId,
            status: statusText,
            progress: 0
          });
          if (api !== null) {
            api.End();
          }
          let configFile;
          let configStr;
          if (config && typeof config === "object" && Object.keys(config).length > 0) {
            configStr = JSON.stringify(config).replace(/,/g, "\n").replace(/:/g, " ").replace(/["'{}]/g, "");
          } else if (config && typeof config === "string") {
            configStr = config;
          }
          if (typeof configStr === "string") {
            configFile = "/config";
            TessModule.FS.writeFile(configFile, configStr);
          }
          api = new TessModule.TessBaseAPI();
          let status = api.Init(null, langs, oem, configFile);
          if (status === -1) {
            if (["write", "refresh", void 0].includes(loadLanguageOptionsWorker.cacheMethod)) {
              const langsArr = langs.split("+");
              const delCachePromise = langsArr.map((lang) => adapter.deleteCache(`${loadLanguageOptionsWorker.cachePath || "."}/${lang}.traineddata`));
              await Promise.all(delCachePromise);
              const debugStr = TessModule.FS.readFile("/debugDev.txt", { encoding: "utf8", flags: "a+" });
              if (dataFromCache && /components are not present/.test(debugStr)) {
                log("Data from cache missing requested OEM model. Attempting to refresh cache with new language data.");
                await loadLanguage({ workerId, payload: { langs: loadLanguageLangsWorker, options: loadLanguageOptionsWorker } });
                status = api.Init(null, langs, oem, configFile);
                if (status === -1) {
                  log("Language data refresh failed.");
                  const delCachePromise2 = langsArr.map((lang) => adapter.deleteCache(`${loadLanguageOptionsWorker.cachePath || "."}/${lang}.traineddata`));
                  await Promise.all(delCachePromise2);
                } else {
                  log("Language data refresh successful.");
                }
              }
            }
          }
          if (status === -1) {
            res.reject("initialization failed");
          }
          res.progress({
            workerId,
            status: statusText,
            progress: 1
          });
          res.resolve();
        } catch (err) {
          res.reject(err.toString());
        }
      };
      var processOutput = (output) => {
        const workingOutput = JSON.parse(JSON.stringify(defaultOutput));
        const nonRecOutputs = ["imageColor", "imageGrey", "imageBinary", "layoutBlocks", "debug"];
        let recOutputCount = 0;
        for (const prop of Object.keys(output)) {
          workingOutput[prop] = output[prop];
        }
        for (const prop of Object.keys(workingOutput)) {
          if (workingOutput[prop]) {
            if (!nonRecOutputs.includes(prop)) {
              recOutputCount += 1;
            }
          }
        }
        const skipRecognition = recOutputCount === 0;
        return { workingOutput, skipRecognition };
      };
      var tessjsOptions = ["rectangle", "pdfTitle", "pdfTextOnly", "rotateAuto", "rotateRadians"];
      var recognize = async ({
        payload: {
          image,
          options,
          output
        }
      }, res) => {
        try {
          const optionsTess = {};
          if (typeof options === "object" && Object.keys(options).length > 0) {
            for (const param of Object.keys(options)) {
              if (!param.startsWith("tessjs_") && !tessjsOptions.includes(param)) {
                optionsTess[param] = options[param];
              }
            }
          }
          if (output.debug) {
            optionsTess.debug_file = "/debugInternal.txt";
            TessModule.FS.writeFile("/debugInternal.txt", "");
          }
          if (Object.keys(optionsTess).length > 0) {
            api.SaveParameters();
            for (const prop of Object.keys(optionsTess)) {
              api.SetVariable(prop, optionsTess[prop]);
            }
          }
          const { workingOutput, skipRecognition } = processOutput(output);
          let rotateRadiansFinal;
          if (options.rotateAuto) {
            const psmInit = api.GetPageSegMode();
            let psmEdit = false;
            if (![PSM.AUTO, PSM.AUTO_ONLY, PSM.OSD].includes(String(psmInit))) {
              psmEdit = true;
              api.SetVariable("tessedit_pageseg_mode", String(PSM.AUTO));
            }
            setImage(TessModule, api, image);
            api.FindLines();
            const rotateRadiansCalc = api.GetGradient ? api.GetGradient() : api.GetAngle();
            if (psmEdit) {
              api.SetVariable("tessedit_pageseg_mode", String(psmInit));
            }
            if (Math.abs(rotateRadiansCalc) >= 5e-3) {
              rotateRadiansFinal = rotateRadiansCalc;
              setImage(TessModule, api, image, rotateRadiansFinal);
            } else {
              if (psmEdit) {
                setImage(TessModule, api, image);
              }
              rotateRadiansFinal = 0;
            }
          } else {
            rotateRadiansFinal = options.rotateRadians || 0;
            setImage(TessModule, api, image, rotateRadiansFinal);
          }
          const rec = options.rectangle;
          if (typeof rec === "object") {
            api.SetRectangle(rec.left, rec.top, rec.width, rec.height);
          }
          if (!skipRecognition) {
            api.Recognize(null);
          } else {
            if (output.layoutBlocks) {
              api.AnalyseLayout();
            }
            log("Skipping recognition: all output options requiring recognition are disabled.");
          }
          const { pdfTitle } = options;
          const { pdfTextOnly } = options;
          const result = dump(TessModule, api, workingOutput, { pdfTitle, pdfTextOnly, skipRecognition });
          result.rotateRadians = rotateRadiansFinal;
          if (output.debug) TessModule.FS.unlink("/debugInternal.txt");
          if (Object.keys(optionsTess).length > 0) {
            api.RestoreParameters();
          }
          res.resolve(result);
        } catch (err) {
          res.reject(err.toString());
        }
      };
      var detect = async ({ payload: { image } }, res) => {
        try {
          setImage(TessModule, api, image);
          const results = new TessModule.OSResults();
          if (!api.DetectOS(results)) {
            res.resolve({
              tesseract_script_id: null,
              script: null,
              script_confidence: null,
              orientation_degrees: null,
              orientation_confidence: null
            });
          } else {
            const best = results.best_result;
            const oid = best.orientation_id;
            const sid = best.script_id;
            res.resolve({
              tesseract_script_id: sid,
              script: results.unicharset.get_script_from_script_id(sid),
              script_confidence: best.sconfidence,
              orientation_degrees: [0, 270, 180, 90][oid],
              orientation_confidence: best.oconfidence
            });
          }
        } catch (err) {
          res.reject(err.toString());
        }
      };
      var terminate = async (_, res) => {
        try {
          if (api !== null) {
            api.End();
          }
          res.resolve({ terminated: true });
        } catch (err) {
          res.reject(err.toString());
        }
      };
      exports.dispatchHandlers = (packet, send) => {
        const res = (status, data) => {
          const packetRes = {
            jobId: packet.jobId,
            workerId: packet.workerId,
            action: packet.action
          };
          send({
            ...packetRes,
            status,
            data
          });
        };
        res.resolve = res.bind(exports, "resolve");
        res.reject = res.bind(exports, "reject");
        res.progress = res.bind(exports, "progress");
        latestJob = res;
        ({
          load,
          FS,
          loadLanguage,
          initialize,
          setParameters,
          recognize,
          detect,
          terminate
        })[packet.action](packet, res).catch((err) => res.reject(err.toString()));
      };
      exports.setAdapter = (_adapter) => {
        adapter = _adapter;
      };
    }
  });

  // node_modules/wasm-feature-detect/dist/cjs/index.cjs
  var require_cjs = __commonJS({
    "node_modules/wasm-feature-detect/dist/cjs/index.cjs"(exports, module) {
      "use strict";
      init_ocr_buffer();
      var e = { bigInt: () => (async (e2) => {
        try {
          return (await WebAssembly.instantiate(e2)).instance.exports.b(BigInt(0)) === BigInt(0);
        } catch (e3) {
          return false;
        }
      })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 126, 1, 126, 3, 2, 1, 0, 7, 5, 1, 1, 98, 0, 0, 10, 6, 1, 4, 0, 32, 0, 11])), bulkMemory: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), exceptions: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11])), exceptionsFinal: () => (async () => {
        try {
          return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL"), (e2) => e2.codePointAt(0))), true;
        } catch (e2) {
          return false;
        }
      })(), extendedConst: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 3, 1, 0, 1, 11, 9, 1, 0, 65, 1, 65, 2, 106, 11, 0])), gc: () => (async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 95, 1, 120, 0])))(), jsStringBuiltins: () => (async () => {
        try {
          return await WebAssembly.instantiate(Uint8Array.from(atob("AGFzbQEAAAABBgFgAW8BfwIXAQ53YXNtOmpzLXN0cmluZwR0ZXN0AAA="), (e2) => e2.codePointAt(0)), {}, { builtins: ["js-string"] }), true;
        } catch (e2) {
          return false;
        }
      })(), jspi: () => (async () => "Suspending" in WebAssembly)(), memory64: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 3, 1, 4, 1])), multiMemory: () => (async () => {
        try {
          return new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 5, 2, 0, 0, 0, 0])), true;
        } catch (e2) {
          return false;
        }
      })(), multiValue: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 0, 2, 127, 127, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 65, 0, 11])), mutableGlobals: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1])), referenceTypes: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])), relaxedSimd: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 15, 1, 13, 0, 65, 1, 253, 15, 65, 2, 253, 15, 253, 128, 2, 11])), saturatedFloatToInt: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])), signExtensions: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])), simd: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])), sourcePhaseImports: () => (async () => {
        try {
          return await new Function('return import.source("data:application/wasm;charset=utf-8;base64,AGFzbQEAAAAACARuYW1lAgEA")')(), true;
        } catch (e2) {
          return e2 instanceof EvalError && Object.getPrototypeOf(WebAssembly.Module.prototype) !== Object.prototype;
        }
      })(), streamingCompilation: () => (async () => "compileStreaming" in WebAssembly)(), tailCall: async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 6, 1, 4, 0, 18, 0, 11])), threads: () => (async (e2) => {
        try {
          return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e2);
        } catch (e3) {
          return false;
        }
      })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11])), typeReflection: () => (async () => "Function" in WebAssembly)(), typedFunctionReferences: () => (async () => {
        try {
          return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABEANgAX8Bf2ABZAABf2AAAX8DBAMBAAIJBQEDAAEBChwDCwBBCkEqIAAUAGoLBwAgAEEBagsGANIBEAAL"), (e2) => e2.codePointAt(0))), true;
        } catch (e2) {
          return false;
        }
      })(), wideArithmetic: () => (async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 10, 1, 96, 4, 126, 126, 126, 126, 2, 126, 126, 3, 2, 1, 0, 10, 14, 1, 12, 0, 32, 0, 32, 1, 32, 2, 32, 3, 252, 19, 11])))() };
      module.exports = e;
    }
  });

  // node_modules/tesseract.js/src/worker-script/browser/getCore.js
  var require_getCore = __commonJS({
    "node_modules/tesseract.js/src/worker-script/browser/getCore.js"(exports, module) {
      init_ocr_buffer();
      var { simd, relaxedSimd } = require_cjs();
      module.exports = async (_lstmOnly, _corePath, reporter) => {
        if (!globalThis.TesseractCore) {
          const status = "loading tesseract core";
          reporter.progress({ status, progress: 0 });
          if (await relaxedSimd()) {
            importScripts("./tesseract-core-relaxedsimd-lstm.js");
          } else if (await simd()) {
            importScripts("./tesseract-core-simd-lstm.js");
          } else {
            importScripts("./tesseract-core-lstm.js");
          }
          if (!globalThis.TesseractCore) throw Error("Le moteur OCR local est introuvable.");
          reporter.progress({ status, progress: 1 });
        }
        return globalThis.TesseractCore;
      };
    }
  });

  // node_modules/zlibjs/bin/node-zlib.js
  var require_node_zlib = __commonJS({
    "node_modules/zlibjs/bin/node-zlib.js"(exports) {
      init_ocr_buffer();
      /** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
      (function() {
        "use strict";
        function q(b) {
          throw b;
        }
        var t = void 0, v = true;
        var B = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array && "undefined" !== typeof DataView;
        function G(b, a) {
          this.index = "number" === typeof a ? a : 0;
          this.m = 0;
          this.buffer = b instanceof (B ? Uint8Array : Array) ? b : new (B ? Uint8Array : Array)(32768);
          2 * this.buffer.length <= this.index && q(Error("invalid index"));
          this.buffer.length <= this.index && this.f();
        }
        G.prototype.f = function() {
          var b = this.buffer, a, c = b.length, d = new (B ? Uint8Array : Array)(c << 1);
          if (B) d.set(b);
          else for (a = 0; a < c; ++a) d[a] = b[a];
          return this.buffer = d;
        };
        G.prototype.d = function(b, a, c) {
          var d = this.buffer, e = this.index, f = this.m, g = d[e], k;
          c && 1 < a && (b = 8 < a ? (I[b & 255] << 24 | I[b >>> 8 & 255] << 16 | I[b >>> 16 & 255] << 8 | I[b >>> 24 & 255]) >> 32 - a : I[b] >> 8 - a);
          if (8 > a + f) g = g << a | b, f += a;
          else for (k = 0; k < a; ++k) g = g << 1 | b >> a - k - 1 & 1, 8 === ++f && (f = 0, d[e++] = I[g], g = 0, e === d.length && (d = this.f()));
          d[e] = g;
          this.buffer = d;
          this.m = f;
          this.index = e;
        };
        G.prototype.finish = function() {
          var b = this.buffer, a = this.index, c;
          0 < this.m && (b[a] <<= 8 - this.m, b[a] = I[b[a]], a++);
          B ? c = b.subarray(0, a) : (b.length = a, c = b);
          return c;
        };
        var aa = new (B ? Uint8Array : Array)(256), L;
        for (L = 0; 256 > L; ++L) {
          for (var R = L, ba = R, ca = 7, R = R >>> 1; R; R >>>= 1) ba <<= 1, ba |= R & 1, --ca;
          aa[L] = (ba << ca & 255) >>> 0;
        }
        var I = aa;
        function ha(b, a, c) {
          var d, e = "number" === typeof a ? a : a = 0, f = "number" === typeof c ? c : b.length;
          d = -1;
          for (e = f & 7; e--; ++a) d = d >>> 8 ^ S[(d ^ b[a]) & 255];
          for (e = f >> 3; e--; a += 8) d = d >>> 8 ^ S[(d ^ b[a]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 1]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 2]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 3]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 4]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 5]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 6]) & 255], d = d >>> 8 ^ S[(d ^ b[a + 7]) & 255];
          return (d ^ 4294967295) >>> 0;
        }
        var ia = [
          0,
          1996959894,
          3993919788,
          2567524794,
          124634137,
          1886057615,
          3915621685,
          2657392035,
          249268274,
          2044508324,
          3772115230,
          2547177864,
          162941995,
          2125561021,
          3887607047,
          2428444049,
          498536548,
          1789927666,
          4089016648,
          2227061214,
          450548861,
          1843258603,
          4107580753,
          2211677639,
          325883990,
          1684777152,
          4251122042,
          2321926636,
          335633487,
          1661365465,
          4195302755,
          2366115317,
          997073096,
          1281953886,
          3579855332,
          2724688242,
          1006888145,
          1258607687,
          3524101629,
          2768942443,
          901097722,
          1119000684,
          3686517206,
          2898065728,
          853044451,
          1172266101,
          3705015759,
          2882616665,
          651767980,
          1373503546,
          3369554304,
          3218104598,
          565507253,
          1454621731,
          3485111705,
          3099436303,
          671266974,
          1594198024,
          3322730930,
          2970347812,
          795835527,
          1483230225,
          3244367275,
          3060149565,
          1994146192,
          31158534,
          2563907772,
          4023717930,
          1907459465,
          112637215,
          2680153253,
          3904427059,
          2013776290,
          251722036,
          2517215374,
          3775830040,
          2137656763,
          141376813,
          2439277719,
          3865271297,
          1802195444,
          476864866,
          2238001368,
          4066508878,
          1812370925,
          453092731,
          2181625025,
          4111451223,
          1706088902,
          314042704,
          2344532202,
          4240017532,
          1658658271,
          366619977,
          2362670323,
          4224994405,
          1303535960,
          984961486,
          2747007092,
          3569037538,
          1256170817,
          1037604311,
          2765210733,
          3554079995,
          1131014506,
          879679996,
          2909243462,
          3663771856,
          1141124467,
          855842277,
          2852801631,
          3708648649,
          1342533948,
          654459306,
          3188396048,
          3373015174,
          1466479909,
          544179635,
          3110523913,
          3462522015,
          1591671054,
          702138776,
          2966460450,
          3352799412,
          1504918807,
          783551873,
          3082640443,
          3233442989,
          3988292384,
          2596254646,
          62317068,
          1957810842,
          3939845945,
          2647816111,
          81470997,
          1943803523,
          3814918930,
          2489596804,
          225274430,
          2053790376,
          3826175755,
          2466906013,
          167816743,
          2097651377,
          4027552580,
          2265490386,
          503444072,
          1762050814,
          4150417245,
          2154129355,
          426522225,
          1852507879,
          4275313526,
          2312317920,
          282753626,
          1742555852,
          4189708143,
          2394877945,
          397917763,
          1622183637,
          3604390888,
          2714866558,
          953729732,
          1340076626,
          3518719985,
          2797360999,
          1068828381,
          1219638859,
          3624741850,
          2936675148,
          906185462,
          1090812512,
          3747672003,
          2825379669,
          829329135,
          1181335161,
          3412177804,
          3160834842,
          628085408,
          1382605366,
          3423369109,
          3138078467,
          570562233,
          1426400815,
          3317316542,
          2998733608,
          733239954,
          1555261956,
          3268935591,
          3050360625,
          752459403,
          1541320221,
          2607071920,
          3965973030,
          1969922972,
          40735498,
          2617837225,
          3943577151,
          1913087877,
          83908371,
          2512341634,
          3803740692,
          2075208622,
          213261112,
          2463272603,
          3855990285,
          2094854071,
          198958881,
          2262029012,
          4057260610,
          1759359992,
          534414190,
          2176718541,
          4139329115,
          1873836001,
          414664567,
          2282248934,
          4279200368,
          1711684554,
          285281116,
          2405801727,
          4167216745,
          1634467795,
          376229701,
          2685067896,
          3608007406,
          1308918612,
          956543938,
          2808555105,
          3495958263,
          1231636301,
          1047427035,
          2932959818,
          3654703836,
          1088359270,
          936918e3,
          2847714899,
          3736837829,
          1202900863,
          817233897,
          3183342108,
          3401237130,
          1404277552,
          615818150,
          3134207493,
          3453421203,
          1423857449,
          601450431,
          3009837614,
          3294710456,
          1567103746,
          711928724,
          3020668471,
          3272380065,
          1510334235,
          755167117
        ], S = B ? new Uint32Array(ia) : ia;
        function ja() {
        }
        ;
        function ka(b) {
          this.buffer = new (B ? Uint16Array : Array)(2 * b);
          this.length = 0;
        }
        ka.prototype.getParent = function(b) {
          return 2 * ((b - 2) / 4 | 0);
        };
        ka.prototype.push = function(b, a) {
          var c, d, e = this.buffer, f;
          c = this.length;
          e[this.length++] = a;
          for (e[this.length++] = b; 0 < c; ) if (d = this.getParent(c), e[c] > e[d]) f = e[c], e[c] = e[d], e[d] = f, f = e[c + 1], e[c + 1] = e[d + 1], e[d + 1] = f, c = d;
          else break;
          return this.length;
        };
        ka.prototype.pop = function() {
          var b, a, c = this.buffer, d, e, f;
          a = c[0];
          b = c[1];
          this.length -= 2;
          c[0] = c[this.length];
          c[1] = c[this.length + 1];
          for (f = 0; ; ) {
            e = 2 * f + 2;
            if (e >= this.length) break;
            e + 2 < this.length && c[e + 2] > c[e] && (e += 2);
            if (c[e] > c[f]) d = c[f], c[f] = c[e], c[e] = d, d = c[f + 1], c[f + 1] = c[e + 1], c[e + 1] = d;
            else break;
            f = e;
          }
          return { index: b, value: a, length: this.length };
        };
        function T(b) {
          var a = b.length, c = 0, d = Number.POSITIVE_INFINITY, e, f, g, k, h, m, r, p, l, n;
          for (p = 0; p < a; ++p) b[p] > c && (c = b[p]), b[p] < d && (d = b[p]);
          e = 1 << c;
          f = new (B ? Uint32Array : Array)(e);
          g = 1;
          k = 0;
          for (h = 2; g <= c; ) {
            for (p = 0; p < a; ++p) if (b[p] === g) {
              m = 0;
              r = k;
              for (l = 0; l < g; ++l) m = m << 1 | r & 1, r >>= 1;
              n = g << 16 | p;
              for (l = m; l < e; l += h) f[l] = n;
              ++k;
            }
            ++g;
            k <<= 1;
            h <<= 1;
          }
          return [f, c, d];
        }
        ;
        function na(b, a) {
          this.k = oa;
          this.F = 0;
          this.input = B && b instanceof Array ? new Uint8Array(b) : b;
          this.b = 0;
          a && (a.lazy && (this.F = a.lazy), "number" === typeof a.compressionType && (this.k = a.compressionType), a.outputBuffer && (this.a = B && a.outputBuffer instanceof Array ? new Uint8Array(a.outputBuffer) : a.outputBuffer), "number" === typeof a.outputIndex && (this.b = a.outputIndex));
          this.a || (this.a = new (B ? Uint8Array : Array)(32768));
        }
        var oa = 2, pa = { NONE: 0, L: 1, t: oa, X: 3 }, qa = [], U;
        for (U = 0; 288 > U; U++) switch (v) {
          case 143 >= U:
            qa.push([U + 48, 8]);
            break;
          case 255 >= U:
            qa.push([U - 144 + 400, 9]);
            break;
          case 279 >= U:
            qa.push([U - 256 + 0, 7]);
            break;
          case 287 >= U:
            qa.push([U - 280 + 192, 8]);
            break;
          default:
            q("invalid literal: " + U);
        }
        na.prototype.h = function() {
          var b, a, c, d, e = this.input;
          switch (this.k) {
            case 0:
              c = 0;
              for (d = e.length; c < d; ) {
                a = B ? e.subarray(c, c + 65535) : e.slice(c, c + 65535);
                c += a.length;
                var f = a, g = c === d, k = t, h = t, m = t, r = t, p = t, l = this.a, n = this.b;
                if (B) {
                  for (l = new Uint8Array(this.a.buffer); l.length <= n + f.length + 5; ) l = new Uint8Array(l.length << 1);
                  l.set(this.a);
                }
                k = g ? 1 : 0;
                l[n++] = k | 0;
                h = f.length;
                m = ~h + 65536 & 65535;
                l[n++] = h & 255;
                l[n++] = h >>> 8 & 255;
                l[n++] = m & 255;
                l[n++] = m >>> 8 & 255;
                if (B) l.set(f, n), n += f.length, l = l.subarray(0, n);
                else {
                  r = 0;
                  for (p = f.length; r < p; ++r) l[n++] = f[r];
                  l.length = n;
                }
                this.b = n;
                this.a = l;
              }
              break;
            case 1:
              var s = new G(B ? new Uint8Array(this.a.buffer) : this.a, this.b);
              s.d(1, 1, v);
              s.d(1, 2, v);
              var u = ra(this, e), w, C, x;
              w = 0;
              for (C = u.length; w < C; w++) if (x = u[w], G.prototype.d.apply(s, qa[x]), 256 < x) s.d(u[++w], u[++w], v), s.d(u[++w], 5), s.d(u[++w], u[++w], v);
              else if (256 === x) break;
              this.a = s.finish();
              this.b = this.a.length;
              break;
            case oa:
              var D = new G(B ? new Uint8Array(this.a.buffer) : this.a, this.b), M, z, N, X, Y, qb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], da, Fa, ea, Ga, la, ta = Array(19), Ha, Z, ma, E, Ia;
              M = oa;
              D.d(1, 1, v);
              D.d(M, 2, v);
              z = ra(this, e);
              da = sa(this.U, 15);
              Fa = ua(da);
              ea = sa(this.T, 7);
              Ga = ua(ea);
              for (N = 286; 257 < N && 0 === da[N - 1]; N--) ;
              for (X = 30; 1 < X && 0 === ea[X - 1]; X--) ;
              var Ja = N, Ka = X, K = new (B ? Uint32Array : Array)(Ja + Ka), y, O, A, fa, J = new (B ? Uint32Array : Array)(316), H, F, P = new (B ? Uint8Array : Array)(19);
              for (y = O = 0; y < Ja; y++) K[O++] = da[y];
              for (y = 0; y < Ka; y++) K[O++] = ea[y];
              if (!B) {
                y = 0;
                for (fa = P.length; y < fa; ++y) P[y] = 0;
              }
              y = H = 0;
              for (fa = K.length; y < fa; y += O) {
                for (O = 1; y + O < fa && K[y + O] === K[y]; ++O) ;
                A = O;
                if (0 === K[y]) if (3 > A) for (; 0 < A--; ) J[H++] = 0, P[0]++;
                else for (; 0 < A; ) F = 138 > A ? A : 138, F > A - 3 && F < A && (F = A - 3), 10 >= F ? (J[H++] = 17, J[H++] = F - 3, P[17]++) : (J[H++] = 18, J[H++] = F - 11, P[18]++), A -= F;
                else if (J[H++] = K[y], P[K[y]]++, A--, 3 > A) for (; 0 < A--; ) J[H++] = K[y], P[K[y]]++;
                else for (; 0 < A; ) F = 6 > A ? A : 6, F > A - 3 && F < A && (F = A - 3), J[H++] = 16, J[H++] = F - 3, P[16]++, A -= F;
              }
              b = B ? J.subarray(0, H) : J.slice(0, H);
              la = sa(P, 7);
              for (E = 0; 19 > E; E++) ta[E] = la[qb[E]];
              for (Y = 19; 4 < Y && 0 === ta[Y - 1]; Y--) ;
              Ha = ua(la);
              D.d(N - 257, 5, v);
              D.d(X - 1, 5, v);
              D.d(Y - 4, 4, v);
              for (E = 0; E < Y; E++) D.d(ta[E], 3, v);
              E = 0;
              for (Ia = b.length; E < Ia; E++) if (Z = b[E], D.d(Ha[Z], la[Z], v), 16 <= Z) {
                E++;
                switch (Z) {
                  case 16:
                    ma = 2;
                    break;
                  case 17:
                    ma = 3;
                    break;
                  case 18:
                    ma = 7;
                    break;
                  default:
                    q("invalid code: " + Z);
                }
                D.d(b[E], ma, v);
              }
              var La = [Fa, da], Ma = [Ga, ea], Q, Na, ga, wa, Oa, Pa, Qa, Ra;
              Oa = La[0];
              Pa = La[1];
              Qa = Ma[0];
              Ra = Ma[1];
              Q = 0;
              for (Na = z.length; Q < Na; ++Q) if (ga = z[Q], D.d(Oa[ga], Pa[ga], v), 256 < ga) D.d(z[++Q], z[++Q], v), wa = z[++Q], D.d(Qa[wa], Ra[wa], v), D.d(z[++Q], z[++Q], v);
              else if (256 === ga) break;
              this.a = D.finish();
              this.b = this.a.length;
              break;
            default:
              q("invalid compression type");
          }
          return this.a;
        };
        function va(b, a) {
          this.length = b;
          this.N = a;
        }
        var xa = (function() {
          function b(a2) {
            switch (v) {
              case 3 === a2:
                return [257, a2 - 3, 0];
              case 4 === a2:
                return [258, a2 - 4, 0];
              case 5 === a2:
                return [259, a2 - 5, 0];
              case 6 === a2:
                return [260, a2 - 6, 0];
              case 7 === a2:
                return [261, a2 - 7, 0];
              case 8 === a2:
                return [262, a2 - 8, 0];
              case 9 === a2:
                return [263, a2 - 9, 0];
              case 10 === a2:
                return [264, a2 - 10, 0];
              case 12 >= a2:
                return [265, a2 - 11, 1];
              case 14 >= a2:
                return [266, a2 - 13, 1];
              case 16 >= a2:
                return [267, a2 - 15, 1];
              case 18 >= a2:
                return [268, a2 - 17, 1];
              case 22 >= a2:
                return [269, a2 - 19, 2];
              case 26 >= a2:
                return [270, a2 - 23, 2];
              case 30 >= a2:
                return [271, a2 - 27, 2];
              case 34 >= a2:
                return [
                  272,
                  a2 - 31,
                  2
                ];
              case 42 >= a2:
                return [273, a2 - 35, 3];
              case 50 >= a2:
                return [274, a2 - 43, 3];
              case 58 >= a2:
                return [275, a2 - 51, 3];
              case 66 >= a2:
                return [276, a2 - 59, 3];
              case 82 >= a2:
                return [277, a2 - 67, 4];
              case 98 >= a2:
                return [278, a2 - 83, 4];
              case 114 >= a2:
                return [279, a2 - 99, 4];
              case 130 >= a2:
                return [280, a2 - 115, 4];
              case 162 >= a2:
                return [281, a2 - 131, 5];
              case 194 >= a2:
                return [282, a2 - 163, 5];
              case 226 >= a2:
                return [283, a2 - 195, 5];
              case 257 >= a2:
                return [284, a2 - 227, 5];
              case 258 === a2:
                return [285, a2 - 258, 0];
              default:
                q("invalid length: " + a2);
            }
          }
          var a = [], c, d;
          for (c = 3; 258 >= c; c++) d = b(c), a[c] = d[2] << 24 | d[1] << 16 | d[0];
          return a;
        })(), ya = B ? new Uint32Array(xa) : xa;
        function ra(b, a) {
          function c(a2, c2) {
            var b2 = a2.N, d2 = [], f2 = 0, e2;
            e2 = ya[a2.length];
            d2[f2++] = e2 & 65535;
            d2[f2++] = e2 >> 16 & 255;
            d2[f2++] = e2 >> 24;
            var g2;
            switch (v) {
              case 1 === b2:
                g2 = [0, b2 - 1, 0];
                break;
              case 2 === b2:
                g2 = [1, b2 - 2, 0];
                break;
              case 3 === b2:
                g2 = [2, b2 - 3, 0];
                break;
              case 4 === b2:
                g2 = [3, b2 - 4, 0];
                break;
              case 6 >= b2:
                g2 = [4, b2 - 5, 1];
                break;
              case 8 >= b2:
                g2 = [5, b2 - 7, 1];
                break;
              case 12 >= b2:
                g2 = [6, b2 - 9, 2];
                break;
              case 16 >= b2:
                g2 = [7, b2 - 13, 2];
                break;
              case 24 >= b2:
                g2 = [8, b2 - 17, 3];
                break;
              case 32 >= b2:
                g2 = [9, b2 - 25, 3];
                break;
              case 48 >= b2:
                g2 = [10, b2 - 33, 4];
                break;
              case 64 >= b2:
                g2 = [11, b2 - 49, 4];
                break;
              case 96 >= b2:
                g2 = [12, b2 - 65, 5];
                break;
              case 128 >= b2:
                g2 = [13, b2 - 97, 5];
                break;
              case 192 >= b2:
                g2 = [14, b2 - 129, 6];
                break;
              case 256 >= b2:
                g2 = [15, b2 - 193, 6];
                break;
              case 384 >= b2:
                g2 = [16, b2 - 257, 7];
                break;
              case 512 >= b2:
                g2 = [17, b2 - 385, 7];
                break;
              case 768 >= b2:
                g2 = [18, b2 - 513, 8];
                break;
              case 1024 >= b2:
                g2 = [19, b2 - 769, 8];
                break;
              case 1536 >= b2:
                g2 = [20, b2 - 1025, 9];
                break;
              case 2048 >= b2:
                g2 = [21, b2 - 1537, 9];
                break;
              case 3072 >= b2:
                g2 = [22, b2 - 2049, 10];
                break;
              case 4096 >= b2:
                g2 = [23, b2 - 3073, 10];
                break;
              case 6144 >= b2:
                g2 = [24, b2 - 4097, 11];
                break;
              case 8192 >= b2:
                g2 = [25, b2 - 6145, 11];
                break;
              case 12288 >= b2:
                g2 = [26, b2 - 8193, 12];
                break;
              case 16384 >= b2:
                g2 = [27, b2 - 12289, 12];
                break;
              case 24576 >= b2:
                g2 = [28, b2 - 16385, 13];
                break;
              case 32768 >= b2:
                g2 = [29, b2 - 24577, 13];
                break;
              default:
                q("invalid distance");
            }
            e2 = g2;
            d2[f2++] = e2[0];
            d2[f2++] = e2[1];
            d2[f2++] = e2[2];
            var h2, k2;
            h2 = 0;
            for (k2 = d2.length; h2 < k2; ++h2) l[n++] = d2[h2];
            u[d2[0]]++;
            w[d2[3]]++;
            s = a2.length + c2 - 1;
            p = null;
          }
          var d, e, f, g, k, h = {}, m, r, p, l = B ? new Uint16Array(2 * a.length) : [], n = 0, s = 0, u = new (B ? Uint32Array : Array)(286), w = new (B ? Uint32Array : Array)(30), C = b.F, x;
          if (!B) {
            for (f = 0; 285 >= f; ) u[f++] = 0;
            for (f = 0; 29 >= f; ) w[f++] = 0;
          }
          u[256] = 1;
          d = 0;
          for (e = a.length; d < e; ++d) {
            f = k = 0;
            for (g = 3; f < g && d + f !== e; ++f) k = k << 8 | a[d + f];
            h[k] === t && (h[k] = []);
            m = h[k];
            if (!(0 < s--)) {
              for (; 0 < m.length && 32768 < d - m[0]; ) m.shift();
              if (d + 3 >= e) {
                p && c(p, -1);
                f = 0;
                for (g = e - d; f < g; ++f) x = a[d + f], l[n++] = x, ++u[x];
                break;
              }
              0 < m.length ? (r = za(a, d, m), p ? p.length < r.length ? (x = a[d - 1], l[n++] = x, ++u[x], c(r, 0)) : c(p, -1) : r.length < C ? p = r : c(r, 0)) : p ? c(p, -1) : (x = a[d], l[n++] = x, ++u[x]);
            }
            m.push(d);
          }
          l[n++] = 256;
          u[256]++;
          b.U = u;
          b.T = w;
          return B ? l.subarray(0, n) : l;
        }
        function za(b, a, c) {
          var d, e, f = 0, g, k, h, m, r = b.length;
          k = 0;
          m = c.length;
          a: for (; k < m; k++) {
            d = c[m - k - 1];
            g = 3;
            if (3 < f) {
              for (h = f; 3 < h; h--) if (b[d + h - 1] !== b[a + h - 1]) continue a;
              g = f;
            }
            for (; 258 > g && a + g < r && b[d + g] === b[a + g]; ) ++g;
            g > f && (e = d, f = g);
            if (258 === g) break;
          }
          return new va(f, a - e);
        }
        function sa(b, a) {
          var c = b.length, d = new ka(572), e = new (B ? Uint8Array : Array)(c), f, g, k, h, m;
          if (!B) for (h = 0; h < c; h++) e[h] = 0;
          for (h = 0; h < c; ++h) 0 < b[h] && d.push(h, b[h]);
          f = Array(d.length / 2);
          g = new (B ? Uint32Array : Array)(d.length / 2);
          if (1 === f.length) return e[d.pop().index] = 1, e;
          h = 0;
          for (m = d.length / 2; h < m; ++h) f[h] = d.pop(), g[h] = f[h].value;
          k = Aa(g, g.length, a);
          h = 0;
          for (m = f.length; h < m; ++h) e[f[h].index] = k[h];
          return e;
        }
        function Aa(b, a, c) {
          function d(b2) {
            var c2 = h[b2][m[b2]];
            c2 === a ? (d(b2 + 1), d(b2 + 1)) : --g[c2];
            ++m[b2];
          }
          var e = new (B ? Uint16Array : Array)(c), f = new (B ? Uint8Array : Array)(c), g = new (B ? Uint8Array : Array)(a), k = Array(c), h = Array(c), m = Array(c), r = (1 << c) - a, p = 1 << c - 1, l, n, s, u, w;
          e[c - 1] = a;
          for (n = 0; n < c; ++n) r < p ? f[n] = 0 : (f[n] = 1, r -= p), r <<= 1, e[c - 2 - n] = (e[c - 1 - n] / 2 | 0) + a;
          e[0] = f[0];
          k[0] = Array(e[0]);
          h[0] = Array(e[0]);
          for (n = 1; n < c; ++n) e[n] > 2 * e[n - 1] + f[n] && (e[n] = 2 * e[n - 1] + f[n]), k[n] = Array(e[n]), h[n] = Array(e[n]);
          for (l = 0; l < a; ++l) g[l] = c;
          for (s = 0; s < e[c - 1]; ++s) k[c - 1][s] = b[s], h[c - 1][s] = s;
          for (l = 0; l < c; ++l) m[l] = 0;
          1 === f[c - 1] && (--g[0], ++m[c - 1]);
          for (n = c - 2; 0 <= n; --n) {
            u = l = 0;
            w = m[n + 1];
            for (s = 0; s < e[n]; s++) u = k[n + 1][w] + k[n + 1][w + 1], u > b[l] ? (k[n][s] = u, h[n][s] = a, w += 2) : (k[n][s] = b[l], h[n][s] = l, ++l);
            m[n] = 0;
            1 === f[n] && d(n);
          }
          return g;
        }
        function ua(b) {
          var a = new (B ? Uint16Array : Array)(b.length), c = [], d = [], e = 0, f, g, k, h;
          f = 0;
          for (g = b.length; f < g; f++) c[b[f]] = (c[b[f]] | 0) + 1;
          f = 1;
          for (g = 16; f <= g; f++) d[f] = e, e += c[f] | 0, e <<= 1;
          f = 0;
          for (g = b.length; f < g; f++) {
            e = d[b[f]];
            d[b[f]] += 1;
            k = a[f] = 0;
            for (h = b[f]; k < h; k++) a[f] = a[f] << 1 | e & 1, e >>>= 1;
          }
          return a;
        }
        ;
        function Ba(b, a) {
          this.input = b;
          this.b = this.c = 0;
          this.g = {};
          a && (a.flags && (this.g = a.flags), "string" === typeof a.filename && (this.filename = a.filename), "string" === typeof a.comment && (this.w = a.comment), a.deflateOptions && (this.l = a.deflateOptions));
          this.l || (this.l = {});
        }
        Ba.prototype.h = function() {
          var b, a, c, d, e, f, g, k, h = new (B ? Uint8Array : Array)(32768), m = 0, r = this.input, p = this.c, l = this.filename, n = this.w;
          h[m++] = 31;
          h[m++] = 139;
          h[m++] = 8;
          b = 0;
          this.g.fname && (b |= Ca);
          this.g.fcomment && (b |= Da);
          this.g.fhcrc && (b |= Ea);
          h[m++] = b;
          a = (Date.now ? Date.now() : +/* @__PURE__ */ new Date()) / 1e3 | 0;
          h[m++] = a & 255;
          h[m++] = a >>> 8 & 255;
          h[m++] = a >>> 16 & 255;
          h[m++] = a >>> 24 & 255;
          h[m++] = 0;
          h[m++] = Sa;
          if (this.g.fname !== t) {
            g = 0;
            for (k = l.length; g < k; ++g) f = l.charCodeAt(g), 255 < f && (h[m++] = f >>> 8 & 255), h[m++] = f & 255;
            h[m++] = 0;
          }
          if (this.g.comment) {
            g = 0;
            for (k = n.length; g < k; ++g) f = n.charCodeAt(g), 255 < f && (h[m++] = f >>> 8 & 255), h[m++] = f & 255;
            h[m++] = 0;
          }
          this.g.fhcrc && (c = ha(h, 0, m) & 65535, h[m++] = c & 255, h[m++] = c >>> 8 & 255);
          this.l.outputBuffer = h;
          this.l.outputIndex = m;
          e = new na(r, this.l);
          h = e.h();
          m = e.b;
          B && (m + 8 > h.buffer.byteLength ? (this.a = new Uint8Array(m + 8), this.a.set(new Uint8Array(h.buffer)), h = this.a) : h = new Uint8Array(h.buffer));
          d = ha(r, t, t);
          h[m++] = d & 255;
          h[m++] = d >>> 8 & 255;
          h[m++] = d >>> 16 & 255;
          h[m++] = d >>> 24 & 255;
          k = r.length;
          h[m++] = k & 255;
          h[m++] = k >>> 8 & 255;
          h[m++] = k >>> 16 & 255;
          h[m++] = k >>> 24 & 255;
          this.c = p;
          B && m < h.length && (this.a = h = h.subarray(0, m));
          return h;
        };
        var Sa = 255, Ea = 2, Ca = 8, Da = 16;
        function V(b, a) {
          this.o = [];
          this.p = 32768;
          this.e = this.j = this.c = this.s = 0;
          this.input = B ? new Uint8Array(b) : b;
          this.u = false;
          this.q = Ta;
          this.K = false;
          if (a || !(a = {})) a.index && (this.c = a.index), a.bufferSize && (this.p = a.bufferSize), a.bufferType && (this.q = a.bufferType), a.resize && (this.K = a.resize);
          switch (this.q) {
            case Ua:
              this.b = 32768;
              this.a = new (B ? Uint8Array : Array)(32768 + this.p + 258);
              break;
            case Ta:
              this.b = 0;
              this.a = new (B ? Uint8Array : Array)(this.p);
              this.f = this.S;
              this.z = this.O;
              this.r = this.Q;
              break;
            default:
              q(Error("invalid inflate mode"));
          }
        }
        var Ua = 0, Ta = 1;
        V.prototype.i = function() {
          for (; !this.u; ) {
            var b = W(this, 3);
            b & 1 && (this.u = v);
            b >>>= 1;
            switch (b) {
              case 0:
                var a = this.input, c = this.c, d = this.a, e = this.b, f = a.length, g = t, k = t, h = d.length, m = t;
                this.e = this.j = 0;
                c + 1 >= f && q(Error("invalid uncompressed block header: LEN"));
                g = a[c++] | a[c++] << 8;
                c + 1 >= f && q(Error("invalid uncompressed block header: NLEN"));
                k = a[c++] | a[c++] << 8;
                g === ~k && q(Error("invalid uncompressed block header: length verify"));
                c + g > a.length && q(Error("input buffer is broken"));
                switch (this.q) {
                  case Ua:
                    for (; e + g > d.length; ) {
                      m = h - e;
                      g -= m;
                      if (B) d.set(a.subarray(c, c + m), e), e += m, c += m;
                      else for (; m--; ) d[e++] = a[c++];
                      this.b = e;
                      d = this.f();
                      e = this.b;
                    }
                    break;
                  case Ta:
                    for (; e + g > d.length; ) d = this.f({ B: 2 });
                    break;
                  default:
                    q(Error("invalid inflate mode"));
                }
                if (B) d.set(a.subarray(c, c + g), e), e += g, c += g;
                else for (; g--; ) d[e++] = a[c++];
                this.c = c;
                this.b = e;
                this.a = d;
                break;
              case 1:
                this.r(Va, Wa);
                break;
              case 2:
                for (var r = W(this, 5) + 257, p = W(this, 5) + 1, l = W(this, 4) + 4, n = new (B ? Uint8Array : Array)(Xa.length), s = t, u = t, w = t, C = t, x = t, D = t, M = t, z = t, N = t, z = 0; z < l; ++z) n[Xa[z]] = W(this, 3);
                if (!B) {
                  z = l;
                  for (l = n.length; z < l; ++z) n[Xa[z]] = 0;
                }
                s = T(n);
                C = new (B ? Uint8Array : Array)(r + p);
                z = 0;
                for (N = r + p; z < N; ) switch (x = Ya(this, s), x) {
                  case 16:
                    for (M = 3 + W(this, 2); M--; ) C[z++] = D;
                    break;
                  case 17:
                    for (M = 3 + W(this, 3); M--; ) C[z++] = 0;
                    D = 0;
                    break;
                  case 18:
                    for (M = 11 + W(this, 7); M--; ) C[z++] = 0;
                    D = 0;
                    break;
                  default:
                    D = C[z++] = x;
                }
                u = B ? T(C.subarray(0, r)) : T(C.slice(0, r));
                w = B ? T(C.subarray(r)) : T(C.slice(r));
                this.r(u, w);
                break;
              default:
                q(Error("unknown BTYPE: " + b));
            }
          }
          return this.z();
        };
        var Za = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Xa = B ? new Uint16Array(Za) : Za, $a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258], ab = B ? new Uint16Array($a) : $a, bb = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0], cb = B ? new Uint8Array(bb) : bb, db = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], eb = B ? new Uint16Array(db) : db, fb = [
          0,
          0,
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          3,
          4,
          4,
          5,
          5,
          6,
          6,
          7,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13
        ], gb = B ? new Uint8Array(fb) : fb, hb = new (B ? Uint8Array : Array)(288), $, ib;
        $ = 0;
        for (ib = hb.length; $ < ib; ++$) hb[$] = 143 >= $ ? 8 : 255 >= $ ? 9 : 279 >= $ ? 7 : 8;
        var Va = T(hb), jb = new (B ? Uint8Array : Array)(30), kb, lb;
        kb = 0;
        for (lb = jb.length; kb < lb; ++kb) jb[kb] = 5;
        var Wa = T(jb);
        function W(b, a) {
          for (var c = b.j, d = b.e, e = b.input, f = b.c, g = e.length, k; d < a; ) f >= g && q(Error("input buffer is broken")), c |= e[f++] << d, d += 8;
          k = c & (1 << a) - 1;
          b.j = c >>> a;
          b.e = d - a;
          b.c = f;
          return k;
        }
        function Ya(b, a) {
          for (var c = b.j, d = b.e, e = b.input, f = b.c, g = e.length, k = a[0], h = a[1], m, r; d < h && !(f >= g); ) c |= e[f++] << d, d += 8;
          m = k[c & (1 << h) - 1];
          r = m >>> 16;
          r > d && q(Error("invalid code length: " + r));
          b.j = c >> r;
          b.e = d - r;
          b.c = f;
          return m & 65535;
        }
        V.prototype.r = function(b, a) {
          var c = this.a, d = this.b;
          this.A = b;
          for (var e = c.length - 258, f, g, k, h; 256 !== (f = Ya(this, b)); ) if (256 > f) d >= e && (this.b = d, c = this.f(), d = this.b), c[d++] = f;
          else {
            g = f - 257;
            h = ab[g];
            0 < cb[g] && (h += W(this, cb[g]));
            f = Ya(this, a);
            k = eb[f];
            0 < gb[f] && (k += W(this, gb[f]));
            d >= e && (this.b = d, c = this.f(), d = this.b);
            for (; h--; ) c[d] = c[d++ - k];
          }
          for (; 8 <= this.e; ) this.e -= 8, this.c--;
          this.b = d;
        };
        V.prototype.Q = function(b, a) {
          var c = this.a, d = this.b;
          this.A = b;
          for (var e = c.length, f, g, k, h; 256 !== (f = Ya(this, b)); ) if (256 > f) d >= e && (c = this.f(), e = c.length), c[d++] = f;
          else {
            g = f - 257;
            h = ab[g];
            0 < cb[g] && (h += W(this, cb[g]));
            f = Ya(this, a);
            k = eb[f];
            0 < gb[f] && (k += W(this, gb[f]));
            d + h > e && (c = this.f(), e = c.length);
            for (; h--; ) c[d] = c[d++ - k];
          }
          for (; 8 <= this.e; ) this.e -= 8, this.c--;
          this.b = d;
        };
        V.prototype.f = function() {
          var b = new (B ? Uint8Array : Array)(this.b - 32768), a = this.b - 32768, c, d, e = this.a;
          if (B) b.set(e.subarray(32768, b.length));
          else {
            c = 0;
            for (d = b.length; c < d; ++c) b[c] = e[c + 32768];
          }
          this.o.push(b);
          this.s += b.length;
          if (B) e.set(e.subarray(a, a + 32768));
          else for (c = 0; 32768 > c; ++c) e[c] = e[a + c];
          this.b = 32768;
          return e;
        };
        V.prototype.S = function(b) {
          var a, c = this.input.length / this.c + 1 | 0, d, e, f, g = this.input, k = this.a;
          b && ("number" === typeof b.B && (c = b.B), "number" === typeof b.M && (c += b.M));
          2 > c ? (d = (g.length - this.c) / this.A[2], f = 258 * (d / 2) | 0, e = f < k.length ? k.length + f : k.length << 1) : e = k.length * c;
          B ? (a = new Uint8Array(e), a.set(k)) : a = k;
          return this.a = a;
        };
        V.prototype.z = function() {
          var b = 0, a = this.a, c = this.o, d, e = new (B ? Uint8Array : Array)(this.s + (this.b - 32768)), f, g, k, h;
          if (0 === c.length) return B ? this.a.subarray(32768, this.b) : this.a.slice(32768, this.b);
          f = 0;
          for (g = c.length; f < g; ++f) {
            d = c[f];
            k = 0;
            for (h = d.length; k < h; ++k) e[b++] = d[k];
          }
          f = 32768;
          for (g = this.b; f < g; ++f) e[b++] = a[f];
          this.o = [];
          return this.buffer = e;
        };
        V.prototype.O = function() {
          var b, a = this.b;
          B ? this.K ? (b = new Uint8Array(a), b.set(this.a.subarray(0, a))) : b = this.a.subarray(0, a) : (this.a.length > a && (this.a.length = a), b = this.a);
          return this.buffer = b;
        };
        function mb(b) {
          this.input = b;
          this.c = 0;
          this.G = [];
          this.R = false;
        }
        mb.prototype.i = function() {
          for (var b = this.input.length; this.c < b; ) {
            var a = new ja(), c = t, d = t, e = t, f = t, g = t, k = t, h = t, m = t, r = t, p = this.input, l = this.c;
            a.C = p[l++];
            a.D = p[l++];
            (31 !== a.C || 139 !== a.D) && q(Error("invalid file signature:" + a.C + "," + a.D));
            a.v = p[l++];
            switch (a.v) {
              case 8:
                break;
              default:
                q(Error("unknown compression method: " + a.v));
            }
            a.n = p[l++];
            m = p[l++] | p[l++] << 8 | p[l++] << 16 | p[l++] << 24;
            a.$ = new Date(1e3 * m);
            a.ba = p[l++];
            a.aa = p[l++];
            0 < (a.n & 4) && (a.W = p[l++] | p[l++] << 8, l += a.W);
            if (0 < (a.n & Ca)) {
              h = [];
              for (k = 0; 0 < (g = p[l++]); ) h[k++] = String.fromCharCode(g);
              a.name = h.join("");
            }
            if (0 < (a.n & Da)) {
              h = [];
              for (k = 0; 0 < (g = p[l++]); ) h[k++] = String.fromCharCode(g);
              a.w = h.join("");
            }
            0 < (a.n & Ea) && (a.P = ha(p, 0, l) & 65535, a.P !== (p[l++] | p[l++] << 8) && q(Error("invalid header crc16")));
            c = p[p.length - 4] | p[p.length - 3] << 8 | p[p.length - 2] << 16 | p[p.length - 1] << 24;
            p.length - l - 4 - 4 < 512 * c && (f = c);
            d = new V(p, { index: l, bufferSize: f });
            a.data = e = d.i();
            l = d.c;
            a.Y = r = (p[l++] | p[l++] << 8 | p[l++] << 16 | p[l++] << 24) >>> 0;
            ha(e, t, t) !== r && q(Error("invalid CRC-32 checksum: 0x" + ha(e, t, t).toString(16) + " / 0x" + r.toString(16)));
            a.Z = c = (p[l++] | p[l++] << 8 | p[l++] << 16 | p[l++] << 24) >>> 0;
            (e.length & 4294967295) !== c && q(Error("invalid input size: " + (e.length & 4294967295) + " / " + c));
            this.G.push(a);
            this.c = l;
          }
          this.R = v;
          var n = this.G, s, u, w = 0, C = 0, x;
          s = 0;
          for (u = n.length; s < u; ++s) C += n[s].data.length;
          if (B) {
            x = new Uint8Array(C);
            for (s = 0; s < u; ++s) x.set(n[s].data, w), w += n[s].data.length;
          } else {
            x = [];
            for (s = 0; s < u; ++s) x[s] = n[s].data;
            x = Array.prototype.concat.apply([], x);
          }
          return x;
        };
        function nb(b) {
          if ("string" === typeof b) {
            var a = b.split(""), c, d;
            c = 0;
            for (d = a.length; c < d; c++) a[c] = (a[c].charCodeAt(0) & 255) >>> 0;
            b = a;
          }
          for (var e = 1, f = 0, g = b.length, k, h = 0; 0 < g; ) {
            k = 1024 < g ? 1024 : g;
            g -= k;
            do
              e += b[h++], f += e;
            while (--k);
            e %= 65521;
            f %= 65521;
          }
          return (f << 16 | e) >>> 0;
        }
        ;
        function ob(b, a) {
          var c, d;
          this.input = b;
          this.c = 0;
          if (a || !(a = {})) a.index && (this.c = a.index), a.verify && (this.V = a.verify);
          c = b[this.c++];
          d = b[this.c++];
          switch (c & 15) {
            case pb:
              this.method = pb;
              break;
            default:
              q(Error("unsupported compression method"));
          }
          0 !== ((c << 8) + d) % 31 && q(Error("invalid fcheck flag:" + ((c << 8) + d) % 31));
          d & 32 && q(Error("fdict flag is not supported"));
          this.J = new V(b, { index: this.c, bufferSize: a.bufferSize, bufferType: a.bufferType, resize: a.resize });
        }
        ob.prototype.i = function() {
          var b = this.input, a, c;
          a = this.J.i();
          this.c = this.J.c;
          this.V && (c = (b[this.c++] << 24 | b[this.c++] << 16 | b[this.c++] << 8 | b[this.c++]) >>> 0, c !== nb(a) && q(Error("invalid adler-32 checksum")));
          return a;
        };
        var pb = 8;
        function rb(b, a) {
          this.input = b;
          this.a = new (B ? Uint8Array : Array)(32768);
          this.k = sb.t;
          var c = {}, d;
          if ((a || !(a = {})) && "number" === typeof a.compressionType) this.k = a.compressionType;
          for (d in a) c[d] = a[d];
          c.outputBuffer = this.a;
          this.I = new na(this.input, c);
        }
        var sb = pa;
        rb.prototype.h = function() {
          var b, a, c, d, e, f, g, k = 0;
          g = this.a;
          b = pb;
          switch (b) {
            case pb:
              a = Math.LOG2E * Math.log(32768) - 8;
              break;
            default:
              q(Error("invalid compression method"));
          }
          c = a << 4 | b;
          g[k++] = c;
          switch (b) {
            case pb:
              switch (this.k) {
                case sb.NONE:
                  e = 0;
                  break;
                case sb.L:
                  e = 1;
                  break;
                case sb.t:
                  e = 2;
                  break;
                default:
                  q(Error("unsupported compression type"));
              }
              break;
            default:
              q(Error("invalid compression method"));
          }
          d = e << 6 | 0;
          g[k++] = d | 31 - (256 * c + d) % 31;
          f = nb(this.input);
          this.I.b = k;
          g = this.I.h();
          k = g.length;
          B && (g = new Uint8Array(g.buffer), g.length <= k + 4 && (this.a = new Uint8Array(g.length + 4), this.a.set(g), g = this.a), g = g.subarray(0, k + 4));
          g[k++] = f >> 24 & 255;
          g[k++] = f >> 16 & 255;
          g[k++] = f >> 8 & 255;
          g[k++] = f & 255;
          return g;
        };
        exports.deflate = tb;
        exports.deflateSync = ub;
        exports.inflate = vb;
        exports.inflateSync = wb;
        exports.gzip = xb;
        exports.gzipSync = yb;
        exports.gunzip = zb;
        exports.gunzipSync = Ab;
        function tb(b, a, c) {
          process.nextTick(function() {
            var d, e;
            try {
              e = ub(b, c);
            } catch (f) {
              d = f;
            }
            a(d, e);
          });
        }
        function ub(b, a) {
          var c;
          c = new rb(b).h();
          a || (a = {});
          return a.H ? c : Bb(c);
        }
        function vb(b, a, c) {
          process.nextTick(function() {
            var d, e;
            try {
              e = wb(b, c);
            } catch (f) {
              d = f;
            }
            a(d, e);
          });
        }
        function wb(b, a) {
          var c;
          b.subarray = b.slice;
          c = new ob(b).i();
          a || (a = {});
          return a.noBuffer ? c : Bb(c);
        }
        function xb(b, a, c) {
          process.nextTick(function() {
            var d, e;
            try {
              e = yb(b, c);
            } catch (f) {
              d = f;
            }
            a(d, e);
          });
        }
        function yb(b, a) {
          var c;
          b.subarray = b.slice;
          c = new Ba(b).h();
          a || (a = {});
          return a.H ? c : Bb(c);
        }
        function zb(b, a, c) {
          process.nextTick(function() {
            var d, e;
            try {
              e = Ab(b, c);
            } catch (f) {
              d = f;
            }
            a(d, e);
          });
        }
        function Ab(b, a) {
          var c;
          b.subarray = b.slice;
          c = new mb(b).i();
          a || (a = {});
          return a.H ? c : Bb(c);
        }
        function Bb(b) {
          var a = new import_buffer.Buffer(b.length), c, d;
          c = 0;
          for (d = b.length; c < d; ++c) a[c] = b[c];
          return a;
        }
        ;
      }).call(exports);
    }
  });

  // node_modules/tesseract.js/src/worker-script/browser/gunzip.js
  var require_gunzip = __commonJS({
    "node_modules/tesseract.js/src/worker-script/browser/gunzip.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      module.exports = require_node_zlib().gunzipSync;
    }
  });

  // node_modules/idb-keyval/dist/index.js
  var dist_exports = {};
  __export(dist_exports, {
    clear: () => clear,
    createStore: () => createStore,
    del: () => del,
    delMany: () => delMany,
    entries: () => entries,
    get: () => get,
    getMany: () => getMany,
    keys: () => keys,
    promisifyRequest: () => promisifyRequest,
    set: () => set,
    setMany: () => setMany,
    update: () => update,
    values: () => values
  });
  function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.oncomplete = request.onsuccess = () => resolve(request.result);
      request.onabort = request.onerror = () => reject(request.error);
    });
  }
  function createStore(dbName, storeName) {
    let dbp;
    const getDB = () => {
      if (dbp)
        return dbp;
      const request = indexedDB.open(dbName);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName);
      dbp = promisifyRequest(request);
      dbp.then((db) => {
        db.onclose = () => dbp = void 0;
      }, () => {
        dbp = void 0;
      });
      return dbp;
    };
    return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }
  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("keyval-store", "keyval");
    }
    return defaultGetStoreFunc;
  }
  function get(key, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }
  function set(key, value, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.put(value, key);
      return promisifyRequest(store.transaction);
    });
  }
  function setMany(entries2, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      entries2.forEach((entry) => store.put(entry[1], entry[0]));
      return promisifyRequest(store.transaction);
    });
  }
  function getMany(keys2, customStore = defaultGetStore()) {
    return customStore("readonly", (store) => Promise.all(keys2.map((key) => promisifyRequest(store.get(key)))));
  }
  function update(key, updater, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => (
      // Need to create the promise manually.
      // If I try to chain promises, the transaction closes in browsers
      // that use a promise polyfill (IE10/11).
      new Promise((resolve, reject) => {
        const req = store.get(key);
        req.onsuccess = function() {
          try {
            store.put(updater(req.result), key);
            resolve(promisifyRequest(store.transaction));
          } catch (err) {
            reject(err);
          }
        };
        req.onerror = () => reject(req.error);
      })
    ));
  }
  function del(key, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.delete(key);
      return promisifyRequest(store.transaction);
    });
  }
  function delMany(keys2, customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      keys2.forEach((key) => store.delete(key));
      return promisifyRequest(store.transaction);
    });
  }
  function clear(customStore = defaultGetStore()) {
    return customStore("readwrite", (store) => {
      store.clear();
      return promisifyRequest(store.transaction);
    });
  }
  function eachCursor(store, callback) {
    store.openCursor().onsuccess = function() {
      if (!this.result)
        return;
      callback(this.result);
      this.result.continue();
    };
    return promisifyRequest(store.transaction);
  }
  function keys(customStore = defaultGetStore()) {
    return customStore("readonly", (store) => {
      if (store.getAllKeys) {
        return promisifyRequest(store.getAllKeys());
      }
      const items = [];
      return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
  }
  function values(customStore = defaultGetStore()) {
    return customStore("readonly", (store) => {
      if (store.getAll) {
        return promisifyRequest(store.getAll());
      }
      const items = [];
      return eachCursor(store, (cursor) => items.push(cursor.value)).then(() => items);
    });
  }
  function entries(customStore = defaultGetStore()) {
    return customStore("readonly", (store) => {
      if (store.getAll && store.getAllKeys) {
        return Promise.all([
          promisifyRequest(store.getAllKeys()),
          promisifyRequest(store.getAll())
        ]).then(([keys2, values2]) => keys2.map((key, i) => [key, values2[i]]));
      }
      const items = [];
      return eachCursor(store, (cursor) => items.push([cursor.key, cursor.value])).then(() => items);
    });
  }
  var defaultGetStoreFunc;
  var init_dist = __esm({
    "node_modules/idb-keyval/dist/index.js"() {
      init_ocr_buffer();
    }
  });

  // node_modules/tesseract.js/src/worker-script/browser/cache.js
  var require_cache = __commonJS({
    "node_modules/tesseract.js/src/worker-script/browser/cache.js"(exports, module) {
      "use strict";
      init_ocr_buffer();
      var { set: set2, get: get2, del: del2 } = (init_dist(), __toCommonJS(dist_exports));
      module.exports = {
        readCache: get2,
        writeCache: set2,
        deleteCache: del2,
        checkCache: (path) => get2(path).then((v) => typeof v !== "undefined")
      };
    }
  });

  // node_modules/tesseract.js/src/worker-script/browser/index.js
  var require_browser = __commonJS({
    "node_modules/tesseract.js/src/worker-script/browser/index.js"() {
      init_ocr_buffer();
      var worker = require_worker_script();
      var getCore = require_getCore();
      var gunzip = require_gunzip();
      var cache = require_cache();
      globalThis.addEventListener("message", ({ data }) => {
        worker.dispatchHandlers(data, (obj) => postMessage(obj));
      });
      worker.setAdapter({
        getCore,
        gunzip,
        fetch: () => {
        },
        ...cache
      });
    }
  });
  return require_browser();
})();
