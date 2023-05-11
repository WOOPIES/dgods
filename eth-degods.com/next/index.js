(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.ethereumjs = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            (function(global) {
                "use strict";

                function compare(e, t) {
                    if (e === t) return 0;
                    for (var r = e.length, n = t.length, i = 0, a = Math.min(r, n); i < a; ++i)
                        if (e[i] !== t[i]) {
                            r = e[i], n = t[i];
                            break
                        }
                    return r < n ? -1 : n < r ? 1 : 0
                }

                function isBuffer(e) {
                    return global.Buffer && "function" == typeof global.Buffer.isBuffer ? global.Buffer.isBuffer(e) : !(null == e || !e._isBuffer)
                }

                function pToString(e) {
                    return Object.prototype.toString.call(e)
                }

                function isView(e) {
                    return !isBuffer(e) && ("function" == typeof global.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer))))
                }

                function getName(e) {
                    if (util.isFunction(e)) {
                        if (functionsHaveNames) return e.name;
                        var t = e.toString().match(regex);
                        return t && t[1]
                    }
                }

                function truncate(e, t) {
                    return "string" == typeof e ? e.length < t ? e : e.slice(0, t) : e
                }

                function inspect(e) {
                    if (functionsHaveNames || !util.isFunction(e)) return util.inspect(e);
                    var t = getName(e);
                    return "[Function" + (t ? ": " + t : "") + "]"
                }

                function getMessage(e) {
                    return truncate(inspect(e.actual), 128) + " " + e.operator + " " + truncate(inspect(e.expected), 128)
                }

                function fail(e, t, r, n, i) {
                    throw new assert.AssertionError({
                        message: r,
                        actual: e,
                        expected: t,
                        operator: n,
                        stackStartFunction: i
                    })
                }

                function ok(e, t) {
                    e || fail(e, !0, t, "==", assert.ok)
                }

                function _deepEqual(e, t, r, n) {
                    if (e === t) return !0;
                    if (isBuffer(e) && isBuffer(t)) return 0 === compare(e, t);
                    if (util.isDate(e) && util.isDate(t)) return e.getTime() === t.getTime();
                    if (util.isRegExp(e) && util.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
                    if (null !== e && "object" == typeof e || null !== t && "object" == typeof t) {
                        if (isView(e) && isView(t) && pToString(e) === pToString(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === compare(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
                        if (isBuffer(e) !== isBuffer(t)) return !1;
                        var i = (n = n || {
                            actual: [],
                            expected: []
                        }).actual.indexOf(e);
                        return -1 !== i && i === n.expected.indexOf(t) || (n.actual.push(e), n.expected.push(t), objEquiv(e, t, r, n))
                    }
                    return r ? e === t : e == t
                }

                function isArguments(e) {
                    return "[object Arguments]" == Object.prototype.toString.call(e)
                }

                function objEquiv(e, t, r, n) {
                    if (null === e || void 0 === e || null === t || void 0 === t) return !1;
                    if (util.isPrimitive(e) || util.isPrimitive(t)) return e === t;
                    if (r && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
                    var i = isArguments(e),
                        a = isArguments(t);
                    if (i && !a || !i && a) return !1;
                    if (i) return e = pSlice.call(e), t = pSlice.call(t), _deepEqual(e, t, r);
                    var s, o, u = objectKeys(e),
                        f = objectKeys(t);
                    if (u.length !== f.length) return !1;
                    for (u.sort(), f.sort(), o = u.length - 1; o >= 0; o--)
                        if (u[o] !== f[o]) return !1;
                    for (o = u.length - 1; o >= 0; o--)
                        if (s = u[o], !_deepEqual(e[s], t[s], r, n)) return !1;
                    return !0
                }

                function notDeepStrictEqual(e, t, r) {
                    _deepEqual(e, t, !0) && fail(e, t, r, "notDeepStrictEqual", notDeepStrictEqual)
                }

                function expectedException(e, t) {
                    if (!e || !t) return !1;
                    if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
                    try {
                        if (e instanceof t) return !0
                    } catch (e) {}
                    return !Error.isPrototypeOf(t) && !0 === t.call({}, e)
                }

                function _tryBlock(e) {
                    var t;
                    try {
                        e()
                    } catch (e) {
                        t = e
                    }
                    return t
                }

                function _throws(e, t, r, n) {
                    var i;
                    if ("function" != typeof t) throw new TypeError('"block" argument must be a function');
                    "string" == typeof r && (n = r, r = null), i = _tryBlock(t), n = (r && r.name ? " (" + r.name + ")." : ".") + (n ? " " + n : "."), e && !i && fail(i, r, "Missing expected exception" + n);
                    var a = "string" == typeof n,
                        s = !e && util.isError(i),
                        o = !e && i && !r;
                    if ((s && a && expectedException(i, r) || o) && fail(i, r, "Got unwanted exception" + n), e && i && r && !expectedException(i, r) || !e && i) throw i
                }
                var util = require("util/"),
                    hasOwn = Object.prototype.hasOwnProperty,
                    pSlice = Array.prototype.slice,
                    functionsHaveNames = "foo" === function() {}.name,
                    assert = module.exports = ok,
                    regex = /\s*function\s+([^\(\s]*)\s*/;
                assert.AssertionError = function(e) {
                    this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = getMessage(this), this.generatedMessage = !0);
                    var t = e.stackStartFunction || fail;
                    if (Error.captureStackTrace) Error.captureStackTrace(this, t);
                    else {
                        var r = new Error;
                        if (r.stack) {
                            var n = r.stack,
                                i = getName(t),
                                a = n.indexOf("\n" + i);
                            if (a >= 0) {
                                var s = n.indexOf("\n", a + 1);
                                n = n.substring(s + 1)
                            }
                            this.stack = n
                        }
                    }
                }, util.inherits(assert.AssertionError, Error), assert.fail = fail, assert.ok = ok, assert.equal = function(e, t, r) {
                    e != t && fail(e, t, r, "==", assert.equal)
                }, assert.notEqual = function(e, t, r) {
                    e == t && fail(e, t, r, "!=", assert.notEqual)
                }, assert.deepEqual = function(e, t, r) {
                    _deepEqual(e, t, !1) || fail(e, t, r, "deepEqual", assert.deepEqual)
                }, assert.deepStrictEqual = function(e, t, r) {
                    _deepEqual(e, t, !0) || fail(e, t, r, "deepStrictEqual", assert.deepStrictEqual)
                }, assert.notDeepEqual = function(e, t, r) {
                    _deepEqual(e, t, !1) && fail(e, t, r, "notDeepEqual", assert.notDeepEqual)
                }, assert.notDeepStrictEqual = notDeepStrictEqual, assert.strictEqual = function(e, t, r) {
                    e !== t && fail(e, t, r, "===", assert.strictEqual)
                }, assert.notStrictEqual = function(e, t, r) {
                    e === t && fail(e, t, r, "!==", assert.notStrictEqual)
                }, assert.throws = function(e, t, r) {
                    _throws(!0, e, t, r)
                }, assert.doesNotThrow = function(e, t, r) {
                    _throws(!1, e, t, r)
                }, assert.ifError = function(e) {
                    if (e) throw e
                };
                var objectKeys = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) hasOwn.call(e, r) && t.push(r);
                    return t
                };

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "util/": 103
        }],
        2: [function(require, module, exports) {
            "use strict";

            function placeHoldersCount(o) {
                var r = o.length;
                if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === o[r - 2] ? 2 : "=" === o[r - 1] ? 1 : 0
            }

            function byteLength(o) {
                return 3 * o.length / 4 - placeHoldersCount(o)
            }

            function toByteArray(o) {
                var r, e, t, u, n, p = o.length;
                u = placeHoldersCount(o), n = new Arr(3 * p / 4 - u), e = u > 0 ? p - 4 : p;
                var a = 0;
                for (r = 0; r < e; r += 4) t = revLookup[o.charCodeAt(r)] << 18 | revLookup[o.charCodeAt(r + 1)] << 12 | revLookup[o.charCodeAt(r + 2)] << 6 | revLookup[o.charCodeAt(r + 3)], n[a++] = t >> 16 & 255, n[a++] = t >> 8 & 255, n[a++] = 255 & t;
                return 2 === u ? (t = revLookup[o.charCodeAt(r)] << 2 | revLookup[o.charCodeAt(r + 1)] >> 4, n[a++] = 255 & t) : 1 === u && (t = revLookup[o.charCodeAt(r)] << 10 | revLookup[o.charCodeAt(r + 1)] << 4 | revLookup[o.charCodeAt(r + 2)] >> 2, n[a++] = t >> 8 & 255, n[a++] = 255 & t), n
            }

            function tripletToBase64(o) {
                return lookup[o >> 18 & 63] + lookup[o >> 12 & 63] + lookup[o >> 6 & 63] + lookup[63 & o]
            }

            function encodeChunk(o, r, e) {
                for (var t, u = [], n = r; n < e; n += 3) t = (o[n] << 16) + (o[n + 1] << 8) + o[n + 2], u.push(tripletToBase64(t));
                return u.join("")
            }

            function fromByteArray(o) {
                for (var r, e = o.length, t = e % 3, u = "", n = [], p = 0, a = e - t; p < a; p += 16383) n.push(encodeChunk(o, p, p + 16383 > a ? a : p + 16383));
                return 1 === t ? (r = o[e - 1], u += lookup[r >> 2], u += lookup[r << 4 & 63], u += "==") : 2 === t && (r = (o[e - 2] << 8) + o[e - 1], u += lookup[r >> 10], u += lookup[r >> 4 & 63], u += lookup[r << 2 & 63], u += "="), n.push(u), n.join("")
            }
            exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
            for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;
            revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;

        }, {}],
        3: [function(require, module, exports) {
            function check(e) {
                if (e.length < 8) return !1;
                if (e.length > 72) return !1;
                if (48 !== e[0]) return !1;
                if (e[1] !== e.length - 2) return !1;
                if (2 !== e[2]) return !1;
                var r = e[3];
                if (0 === r) return !1;
                if (5 + r >= e.length) return !1;
                if (2 !== e[4 + r]) return !1;
                var n = e[5 + r];
                return 0 !== n && (6 + r + n === e.length && (!(128 & e[4]) && (!(r > 1 && 0 === e[4] && !(128 & e[5])) && (!(128 & e[r + 6]) && !(n > 1 && 0 === e[r + 6] && !(128 & e[r + 7]))))))
            }

            function decode(e) {
                if (e.length < 8) throw new Error("DER sequence length is too short");
                if (e.length > 72) throw new Error("DER sequence length is too long");
                if (48 !== e[0]) throw new Error("Expected DER sequence");
                if (e[1] !== e.length - 2) throw new Error("DER sequence length is invalid");
                if (2 !== e[2]) throw new Error("Expected DER integer");
                var r = e[3];
                if (0 === r) throw new Error("R length is zero");
                if (5 + r >= e.length) throw new Error("R length is too long");
                if (2 !== e[4 + r]) throw new Error("Expected DER integer (2)");
                var n = e[5 + r];
                if (0 === n) throw new Error("S length is zero");
                if (6 + r + n !== e.length) throw new Error("S length is invalid");
                if (128 & e[4]) throw new Error("R value is negative");
                if (r > 1 && 0 === e[4] && !(128 & e[5])) throw new Error("R value excessively padded");
                if (128 & e[r + 6]) throw new Error("S value is negative");
                if (n > 1 && 0 === e[r + 6] && !(128 & e[r + 7])) throw new Error("S value excessively padded");
                return {
                    r: e.slice(4, 4 + r),
                    s: e.slice(6 + r)
                }
            }

            function encode(e, r) {
                var n = e.length,
                    t = r.length;
                if (0 === n) throw new Error("R length is zero");
                if (0 === t) throw new Error("S length is zero");
                if (n > 33) throw new Error("R length is too long");
                if (t > 33) throw new Error("S length is too long");
                if (128 & e[0]) throw new Error("R value is negative");
                if (128 & r[0]) throw new Error("S value is negative");
                if (n > 1 && 0 === e[0] && !(128 & e[1])) throw new Error("R value excessively padded");
                if (t > 1 && 0 === r[0] && !(128 & r[1])) throw new Error("S value excessively padded");
                var o = Buffer.allocUnsafe(6 + n + t);
                return o[0] = 48, o[1] = o.length - 2, o[2] = 2, o[3] = e.length, e.copy(o, 4), o[4 + n] = 2, o[5 + n] = r.length, r.copy(o, 6 + n), o
            }
            var Buffer = require("safe-buffer").Buffer;
            module.exports = {
                check: check,
                decode: decode,
                encode: encode
            };

        }, {
            "safe-buffer": 82
        }],
        4: [function(require, module, exports) {
            ! function(t, i) {
                "use strict";

                function r(t, i) {
                    if (!t) throw new Error(i || "Assertion failed")
                }

                function h(t, i) {
                    t.super_ = i;
                    var r = function() {};
                    r.prototype = i.prototype, t.prototype = new r, t.prototype.constructor = t
                }

                function n(t, i, r) {
                    if (n.isBN(t)) return t;
                    this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== i && "be" !== i || (r = i, i = 10), this._init(t || 0, i || 10, r || "be"))
                }

                function e(t, i, r) {
                    for (var h = 0, n = Math.min(t.length, r), e = i; e < n; e++) {
                        var o = t.charCodeAt(e) - 48;
                        h <<= 4, h |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o
                    }
                    return h
                }

                function o(t, i, r, h) {
                    for (var n = 0, e = Math.min(t.length, r), o = i; o < e; o++) {
                        var s = t.charCodeAt(o) - 48;
                        n *= h, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                    }
                    return n
                }

                function s(t) {
                    for (var i = new Array(t.bitLength()), r = 0; r < i.length; r++) {
                        var h = r / 26 | 0,
                            n = r % 26;
                        i[r] = (t.words[h] & 1 << n) >>> n
                    }
                    return i
                }

                function u(t, i, r) {
                    r.negative = i.negative ^ t.negative;
                    var h = t.length + i.length | 0;
                    r.length = h, h = h - 1 | 0;
                    var n = 0 | t.words[0],
                        e = 0 | i.words[0],
                        o = n * e,
                        s = 67108863 & o,
                        u = o / 67108864 | 0;
                    r.words[0] = s;
                    for (var a = 1; a < h; a++) {
                        for (var l = u >>> 26, m = 67108863 & u, f = Math.min(a, i.length - 1), d = Math.max(0, a - t.length + 1); d <= f; d++) {
                            var p = a - d | 0;
                            l += (o = (n = 0 | t.words[p]) * (e = 0 | i.words[d]) + m) / 67108864 | 0, m = 67108863 & o
                        }
                        r.words[a] = 0 | m, u = 0 | l
                    }
                    return 0 !== u ? r.words[a] = 0 | u : r.length--, r.strip()
                }

                function a(t, i, r) {
                    r.negative = i.negative ^ t.negative, r.length = t.length + i.length;
                    for (var h = 0, n = 0, e = 0; e < r.length - 1; e++) {
                        var o = n;
                        n = 0;
                        for (var s = 67108863 & h, u = Math.min(e, i.length - 1), a = Math.max(0, e - t.length + 1); a <= u; a++) {
                            var l = e - a,
                                m = (0 | t.words[l]) * (0 | i.words[a]),
                                f = 67108863 & m;
                            s = 67108863 & (f = f + s | 0), n += (o = (o = o + (m / 67108864 | 0) | 0) + (f >>> 26) | 0) >>> 26, o &= 67108863
                        }
                        r.words[e] = s, h = o, o = n
                    }
                    return 0 !== h ? r.words[e] = h : r.length--, r.strip()
                }

                function l(t, i, r) {
                    return (new m).mulp(t, i, r)
                }

                function m(t, i) {
                    this.x = t, this.y = i
                }

                function f(t, i) {
                    this.name = t, this.p = new n(i, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                }

                function d() {
                    f.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }

                function p() {
                    f.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }

                function M() {
                    f.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }

                function v() {
                    f.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }

                function g(t) {
                    if ("string" == typeof t) {
                        var i = n._prime(t);
                        this.m = i.p, this.prime = i
                    } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                }

                function c(t) {
                    g.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                }
                "object" == typeof t ? t.exports = n : i.BN = n, n.BN = n, n.wordSize = 26;
                var w;
                try {
                    w = require("buffer").Buffer
                } catch (t) {}
                n.isBN = function(t) {
                    return t instanceof n || null !== t && "object" == typeof t && t.constructor.wordSize === n.wordSize && Array.isArray(t.words)
                }, n.max = function(t, i) {
                    return t.cmp(i) > 0 ? t : i
                }, n.min = function(t, i) {
                    return t.cmp(i) < 0 ? t : i
                }, n.prototype._init = function(t, i, h) {
                    if ("number" == typeof t) return this._initNumber(t, i, h);
                    if ("object" == typeof t) return this._initArray(t, i, h);
                    "hex" === i && (i = 16), r(i === (0 | i) && i >= 2 && i <= 36);
                    var n = 0;
                    "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === i ? this._parseHex(t, n) : this._parseBase(t, i, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === h && this._initArray(this.toArray(), i, h)
                }, n.prototype._initNumber = function(t, i, h) {
                    t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === h && this._initArray(this.toArray(), i, h)
                }, n.prototype._initArray = function(t, i, h) {
                    if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                    this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                    for (var n = 0; n < this.length; n++) this.words[n] = 0;
                    var e, o, s = 0;
                    if ("be" === h)
                        for (n = t.length - 1, e = 0; n >= 0; n -= 3) o = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[e] |= o << s & 67108863, this.words[e + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, e++);
                    else if ("le" === h)
                        for (n = 0, e = 0; n < t.length; n += 3) o = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[e] |= o << s & 67108863, this.words[e + 1] = o >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, e++);
                    return this.strip()
                }, n.prototype._parseHex = function(t, i) {
                    this.length = Math.ceil((t.length - i) / 6), this.words = new Array(this.length);
                    for (var r = 0; r < this.length; r++) this.words[r] = 0;
                    var h, n, o = 0;
                    for (r = t.length - 6, h = 0; r >= i; r -= 6) n = e(t, r, r + 6), this.words[h] |= n << o & 67108863, this.words[h + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, h++);
                    r + 6 !== i && (n = e(t, i, r + 6), this.words[h] |= n << o & 67108863, this.words[h + 1] |= n >>> 26 - o & 4194303), this.strip()
                }, n.prototype._parseBase = function(t, i, r) {
                    this.words = [0], this.length = 1;
                    for (var h = 0, n = 1; n <= 67108863; n *= i) h++;
                    h--, n = n / i | 0;
                    for (var e = t.length - r, s = e % h, u = Math.min(e, e - s) + r, a = 0, l = r; l < u; l += h) a = o(t, l, l + h, i), this.imuln(n), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
                    if (0 !== s) {
                        var m = 1;
                        for (a = o(t, l, t.length, i), l = 0; l < s; l++) m *= i;
                        this.imuln(m), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a)
                    }
                }, n.prototype.copy = function(t) {
                    t.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) t.words[i] = this.words[i];
                    t.length = this.length, t.negative = this.negative, t.red = this.red
                }, n.prototype.clone = function() {
                    var t = new n(null);
                    return this.copy(t), t
                }, n.prototype._expand = function(t) {
                    for (; this.length < t;) this.words[this.length++] = 0;
                    return this
                }, n.prototype.strip = function() {
                    for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                    return this._normSign()
                }, n.prototype._normSign = function() {
                    return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                }, n.prototype.inspect = function() {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                };
                var y = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                    b = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    _ = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
                n.prototype.toString = function(t, i) {
                    t = t || 10, i = 0 | i || 1;
                    var h;
                    if (16 === t || "hex" === t) {
                        h = "";
                        for (var n = 0, e = 0, o = 0; o < this.length; o++) {
                            var s = this.words[o],
                                u = (16777215 & (s << n | e)).toString(16);
                            h = 0 !== (e = s >>> 24 - n & 16777215) || o !== this.length - 1 ? y[6 - u.length] + u + h : u + h, (n += 2) >= 26 && (n -= 26, o--)
                        }
                        for (0 !== e && (h = e.toString(16) + h); h.length % i != 0;) h = "0" + h;
                        return 0 !== this.negative && (h = "-" + h), h
                    }
                    if (t === (0 | t) && t >= 2 && t <= 36) {
                        var a = b[t],
                            l = _[t];
                        h = "";
                        var m = this.clone();
                        for (m.negative = 0; !m.isZero();) {
                            var f = m.modn(l).toString(t);
                            h = (m = m.idivn(l)).isZero() ? f + h : y[a - f.length] + f + h
                        }
                        for (this.isZero() && (h = "0" + h); h.length % i != 0;) h = "0" + h;
                        return 0 !== this.negative && (h = "-" + h), h
                    }
                    r(!1, "Base should be between 2 and 36")
                }, n.prototype.toNumber = function() {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                }, n.prototype.toJSON = function() {
                    return this.toString(16)
                }, n.prototype.toBuffer = function(t, i) {
                    return r(void 0 !== w), this.toArrayLike(w, t, i)
                }, n.prototype.toArray = function(t, i) {
                    return this.toArrayLike(Array, t, i)
                }, n.prototype.toArrayLike = function(t, i, h) {
                    var n = this.byteLength(),
                        e = h || Math.max(1, n);
                    r(n <= e, "byte array longer than desired length"), r(e > 0, "Requested array length <= 0"), this.strip();
                    var o, s, u = "le" === i,
                        a = new t(e),
                        l = this.clone();
                    if (u) {
                        for (s = 0; !l.isZero(); s++) o = l.andln(255), l.iushrn(8), a[s] = o;
                        for (; s < e; s++) a[s] = 0
                    } else {
                        for (s = 0; s < e - n; s++) a[s] = 0;
                        for (s = 0; !l.isZero(); s++) o = l.andln(255), l.iushrn(8), a[e - s - 1] = o
                    }
                    return a
                }, Math.clz32 ? n.prototype._countBits = function(t) {
                    return 32 - Math.clz32(t)
                } : n.prototype._countBits = function(t) {
                    var i = t,
                        r = 0;
                    return i >= 4096 && (r += 13, i >>>= 13), i >= 64 && (r += 7, i >>>= 7), i >= 8 && (r += 4, i >>>= 4), i >= 2 && (r += 2, i >>>= 2), r + i
                }, n.prototype._zeroBits = function(t) {
                    if (0 === t) return 26;
                    var i = t,
                        r = 0;
                    return 0 == (8191 & i) && (r += 13, i >>>= 13), 0 == (127 & i) && (r += 7, i >>>= 7), 0 == (15 & i) && (r += 4, i >>>= 4), 0 == (3 & i) && (r += 2, i >>>= 2), 0 == (1 & i) && r++, r
                }, n.prototype.bitLength = function() {
                    var t = this.words[this.length - 1],
                        i = this._countBits(t);
                    return 26 * (this.length - 1) + i
                }, n.prototype.zeroBits = function() {
                    if (this.isZero()) return 0;
                    for (var t = 0, i = 0; i < this.length; i++) {
                        var r = this._zeroBits(this.words[i]);
                        if (t += r, 26 !== r) break
                    }
                    return t
                }, n.prototype.byteLength = function() {
                    return Math.ceil(this.bitLength() / 8)
                }, n.prototype.toTwos = function(t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }, n.prototype.fromTwos = function(t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }, n.prototype.isNeg = function() {
                    return 0 !== this.negative
                }, n.prototype.neg = function() {
                    return this.clone().ineg()
                }, n.prototype.ineg = function() {
                    return this.isZero() || (this.negative ^= 1), this
                }, n.prototype.iuor = function(t) {
                    for (; this.length < t.length;) this.words[this.length++] = 0;
                    for (var i = 0; i < t.length; i++) this.words[i] = this.words[i] | t.words[i];
                    return this.strip()
                }, n.prototype.ior = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuor(t)
                }, n.prototype.or = function(t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }, n.prototype.uor = function(t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }, n.prototype.iuand = function(t) {
                    var i;
                    i = this.length > t.length ? t : this;
                    for (var r = 0; r < i.length; r++) this.words[r] = this.words[r] & t.words[r];
                    return this.length = i.length, this.strip()
                }, n.prototype.iand = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuand(t)
                }, n.prototype.and = function(t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }, n.prototype.uand = function(t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }, n.prototype.iuxor = function(t) {
                    var i, r;
                    this.length > t.length ? (i = this, r = t) : (i = t, r = this);
                    for (var h = 0; h < r.length; h++) this.words[h] = i.words[h] ^ r.words[h];
                    if (this !== i)
                        for (; h < i.length; h++) this.words[h] = i.words[h];
                    return this.length = i.length, this.strip()
                }, n.prototype.ixor = function(t) {
                    return r(0 == (this.negative | t.negative)), this.iuxor(t)
                }, n.prototype.xor = function(t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }, n.prototype.uxor = function(t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }, n.prototype.inotn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var i = 0 | Math.ceil(t / 26),
                        h = t % 26;
                    this._expand(i), h > 0 && i--;
                    for (var n = 0; n < i; n++) this.words[n] = 67108863 & ~this.words[n];
                    return h > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - h), this.strip()
                }, n.prototype.notn = function(t) {
                    return this.clone().inotn(t)
                }, n.prototype.setn = function(t, i) {
                    r("number" == typeof t && t >= 0);
                    var h = t / 26 | 0,
                        n = t % 26;
                    return this._expand(h + 1), this.words[h] = i ? this.words[h] | 1 << n : this.words[h] & ~(1 << n), this.strip()
                }, n.prototype.iadd = function(t) {
                    var i;
                    if (0 !== this.negative && 0 === t.negative) return this.negative = 0, i = this.isub(t), this.negative ^= 1, this._normSign();
                    if (0 === this.negative && 0 !== t.negative) return t.negative = 0, i = this.isub(t), t.negative = 1, i._normSign();
                    var r, h;
                    this.length > t.length ? (r = this, h = t) : (r = t, h = this);
                    for (var n = 0, e = 0; e < h.length; e++) i = (0 | r.words[e]) + (0 | h.words[e]) + n, this.words[e] = 67108863 & i, n = i >>> 26;
                    for (; 0 !== n && e < r.length; e++) i = (0 | r.words[e]) + n, this.words[e] = 67108863 & i, n = i >>> 26;
                    if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++;
                    else if (r !== this)
                        for (; e < r.length; e++) this.words[e] = r.words[e];
                    return this
                }, n.prototype.add = function(t) {
                    var i;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, i = this.sub(t), t.negative ^= 1, i) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, i = t.sub(this), this.negative = 1, i) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }, n.prototype.isub = function(t) {
                    if (0 !== t.negative) {
                        t.negative = 0;
                        var i = this.iadd(t);
                        return t.negative = 1, i._normSign()
                    }
                    if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                    var r = this.cmp(t);
                    if (0 === r) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                    var h, n;
                    r > 0 ? (h = this, n = t) : (h = t, n = this);
                    for (var e = 0, o = 0; o < n.length; o++) e = (i = (0 | h.words[o]) - (0 | n.words[o]) + e) >> 26, this.words[o] = 67108863 & i;
                    for (; 0 !== e && o < h.length; o++) e = (i = (0 | h.words[o]) + e) >> 26, this.words[o] = 67108863 & i;
                    if (0 === e && o < h.length && h !== this)
                        for (; o < h.length; o++) this.words[o] = h.words[o];
                    return this.length = Math.max(this.length, o), h !== this && (this.negative = 1), this.strip()
                }, n.prototype.sub = function(t) {
                    return this.clone().isub(t)
                };
                var k = function(t, i, r) {
                    var h, n, e, o = t.words,
                        s = i.words,
                        u = r.words,
                        a = 0,
                        l = 0 | o[0],
                        m = 8191 & l,
                        f = l >>> 13,
                        d = 0 | o[1],
                        p = 8191 & d,
                        M = d >>> 13,
                        v = 0 | o[2],
                        g = 8191 & v,
                        c = v >>> 13,
                        w = 0 | o[3],
                        y = 8191 & w,
                        b = w >>> 13,
                        _ = 0 | o[4],
                        k = 8191 & _,
                        A = _ >>> 13,
                        x = 0 | o[5],
                        S = 8191 & x,
                        Z = x >>> 13,
                        q = 0 | o[6],
                        R = 8191 & q,
                        B = q >>> 13,
                        N = 0 | o[7],
                        L = 8191 & N,
                        I = N >>> 13,
                        z = 0 | o[8],
                        T = 8191 & z,
                        E = z >>> 13,
                        O = 0 | o[9],
                        j = 8191 & O,
                        K = O >>> 13,
                        P = 0 | s[0],
                        F = 8191 & P,
                        C = P >>> 13,
                        D = 0 | s[1],
                        H = 8191 & D,
                        J = D >>> 13,
                        U = 0 | s[2],
                        G = 8191 & U,
                        Q = U >>> 13,
                        V = 0 | s[3],
                        W = 8191 & V,
                        X = V >>> 13,
                        Y = 0 | s[4],
                        $ = 8191 & Y,
                        tt = Y >>> 13,
                        it = 0 | s[5],
                        rt = 8191 & it,
                        ht = it >>> 13,
                        nt = 0 | s[6],
                        et = 8191 & nt,
                        ot = nt >>> 13,
                        st = 0 | s[7],
                        ut = 8191 & st,
                        at = st >>> 13,
                        lt = 0 | s[8],
                        mt = 8191 & lt,
                        ft = lt >>> 13,
                        dt = 0 | s[9],
                        pt = 8191 & dt,
                        Mt = dt >>> 13;
                    r.negative = t.negative ^ i.negative, r.length = 19;
                    var vt = (a + (h = Math.imul(m, F)) | 0) + ((8191 & (n = (n = Math.imul(m, C)) + Math.imul(f, F) | 0)) << 13) | 0;
                    a = ((e = Math.imul(f, C)) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, h = Math.imul(p, F), n = (n = Math.imul(p, C)) + Math.imul(M, F) | 0, e = Math.imul(M, C);
                    var gt = (a + (h = h + Math.imul(m, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, J) | 0) + Math.imul(f, H) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, J) | 0) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, h = Math.imul(g, F), n = (n = Math.imul(g, C)) + Math.imul(c, F) | 0, e = Math.imul(c, C), h = h + Math.imul(p, H) | 0, n = (n = n + Math.imul(p, J) | 0) + Math.imul(M, H) | 0, e = e + Math.imul(M, J) | 0;
                    var ct = (a + (h = h + Math.imul(m, G) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, Q) | 0) + Math.imul(f, G) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, Q) | 0) + (n >>> 13) | 0) + (ct >>> 26) | 0, ct &= 67108863, h = Math.imul(y, F), n = (n = Math.imul(y, C)) + Math.imul(b, F) | 0, e = Math.imul(b, C), h = h + Math.imul(g, H) | 0, n = (n = n + Math.imul(g, J) | 0) + Math.imul(c, H) | 0, e = e + Math.imul(c, J) | 0, h = h + Math.imul(p, G) | 0, n = (n = n + Math.imul(p, Q) | 0) + Math.imul(M, G) | 0, e = e + Math.imul(M, Q) | 0;
                    var wt = (a + (h = h + Math.imul(m, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, X) | 0) + Math.imul(f, W) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, X) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, h = Math.imul(k, F), n = (n = Math.imul(k, C)) + Math.imul(A, F) | 0, e = Math.imul(A, C), h = h + Math.imul(y, H) | 0, n = (n = n + Math.imul(y, J) | 0) + Math.imul(b, H) | 0, e = e + Math.imul(b, J) | 0, h = h + Math.imul(g, G) | 0, n = (n = n + Math.imul(g, Q) | 0) + Math.imul(c, G) | 0, e = e + Math.imul(c, Q) | 0, h = h + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(M, W) | 0, e = e + Math.imul(M, X) | 0;
                    var yt = (a + (h = h + Math.imul(m, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, tt) | 0) + Math.imul(f, $) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, tt) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, h = Math.imul(S, F), n = (n = Math.imul(S, C)) + Math.imul(Z, F) | 0, e = Math.imul(Z, C), h = h + Math.imul(k, H) | 0, n = (n = n + Math.imul(k, J) | 0) + Math.imul(A, H) | 0, e = e + Math.imul(A, J) | 0, h = h + Math.imul(y, G) | 0, n = (n = n + Math.imul(y, Q) | 0) + Math.imul(b, G) | 0, e = e + Math.imul(b, Q) | 0, h = h + Math.imul(g, W) | 0, n = (n = n + Math.imul(g, X) | 0) + Math.imul(c, W) | 0, e = e + Math.imul(c, X) | 0, h = h + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(M, $) | 0, e = e + Math.imul(M, tt) | 0;
                    var bt = (a + (h = h + Math.imul(m, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ht) | 0) + Math.imul(f, rt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, ht) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, h = Math.imul(R, F), n = (n = Math.imul(R, C)) + Math.imul(B, F) | 0, e = Math.imul(B, C), h = h + Math.imul(S, H) | 0, n = (n = n + Math.imul(S, J) | 0) + Math.imul(Z, H) | 0, e = e + Math.imul(Z, J) | 0, h = h + Math.imul(k, G) | 0, n = (n = n + Math.imul(k, Q) | 0) + Math.imul(A, G) | 0, e = e + Math.imul(A, Q) | 0, h = h + Math.imul(y, W) | 0, n = (n = n + Math.imul(y, X) | 0) + Math.imul(b, W) | 0, e = e + Math.imul(b, X) | 0, h = h + Math.imul(g, $) | 0, n = (n = n + Math.imul(g, tt) | 0) + Math.imul(c, $) | 0, e = e + Math.imul(c, tt) | 0, h = h + Math.imul(p, rt) | 0, n = (n = n + Math.imul(p, ht) | 0) + Math.imul(M, rt) | 0, e = e + Math.imul(M, ht) | 0;
                    var _t = (a + (h = h + Math.imul(m, et) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ot) | 0) + Math.imul(f, et) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, ot) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, h = Math.imul(L, F), n = (n = Math.imul(L, C)) + Math.imul(I, F) | 0, e = Math.imul(I, C), h = h + Math.imul(R, H) | 0, n = (n = n + Math.imul(R, J) | 0) + Math.imul(B, H) | 0, e = e + Math.imul(B, J) | 0, h = h + Math.imul(S, G) | 0, n = (n = n + Math.imul(S, Q) | 0) + Math.imul(Z, G) | 0, e = e + Math.imul(Z, Q) | 0, h = h + Math.imul(k, W) | 0, n = (n = n + Math.imul(k, X) | 0) + Math.imul(A, W) | 0, e = e + Math.imul(A, X) | 0, h = h + Math.imul(y, $) | 0, n = (n = n + Math.imul(y, tt) | 0) + Math.imul(b, $) | 0, e = e + Math.imul(b, tt) | 0, h = h + Math.imul(g, rt) | 0, n = (n = n + Math.imul(g, ht) | 0) + Math.imul(c, rt) | 0, e = e + Math.imul(c, ht) | 0, h = h + Math.imul(p, et) | 0, n = (n = n + Math.imul(p, ot) | 0) + Math.imul(M, et) | 0, e = e + Math.imul(M, ot) | 0;
                    var kt = (a + (h = h + Math.imul(m, ut) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, at) | 0) + Math.imul(f, ut) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, at) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, h = Math.imul(T, F), n = (n = Math.imul(T, C)) + Math.imul(E, F) | 0, e = Math.imul(E, C), h = h + Math.imul(L, H) | 0, n = (n = n + Math.imul(L, J) | 0) + Math.imul(I, H) | 0, e = e + Math.imul(I, J) | 0, h = h + Math.imul(R, G) | 0, n = (n = n + Math.imul(R, Q) | 0) + Math.imul(B, G) | 0, e = e + Math.imul(B, Q) | 0, h = h + Math.imul(S, W) | 0, n = (n = n + Math.imul(S, X) | 0) + Math.imul(Z, W) | 0, e = e + Math.imul(Z, X) | 0, h = h + Math.imul(k, $) | 0, n = (n = n + Math.imul(k, tt) | 0) + Math.imul(A, $) | 0, e = e + Math.imul(A, tt) | 0, h = h + Math.imul(y, rt) | 0, n = (n = n + Math.imul(y, ht) | 0) + Math.imul(b, rt) | 0, e = e + Math.imul(b, ht) | 0, h = h + Math.imul(g, et) | 0, n = (n = n + Math.imul(g, ot) | 0) + Math.imul(c, et) | 0, e = e + Math.imul(c, ot) | 0, h = h + Math.imul(p, ut) | 0, n = (n = n + Math.imul(p, at) | 0) + Math.imul(M, ut) | 0, e = e + Math.imul(M, at) | 0;
                    var At = (a + (h = h + Math.imul(m, mt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ft) | 0) + Math.imul(f, mt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, ft) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, h = Math.imul(j, F), n = (n = Math.imul(j, C)) + Math.imul(K, F) | 0, e = Math.imul(K, C), h = h + Math.imul(T, H) | 0, n = (n = n + Math.imul(T, J) | 0) + Math.imul(E, H) | 0, e = e + Math.imul(E, J) | 0, h = h + Math.imul(L, G) | 0, n = (n = n + Math.imul(L, Q) | 0) + Math.imul(I, G) | 0, e = e + Math.imul(I, Q) | 0, h = h + Math.imul(R, W) | 0, n = (n = n + Math.imul(R, X) | 0) + Math.imul(B, W) | 0, e = e + Math.imul(B, X) | 0, h = h + Math.imul(S, $) | 0, n = (n = n + Math.imul(S, tt) | 0) + Math.imul(Z, $) | 0, e = e + Math.imul(Z, tt) | 0, h = h + Math.imul(k, rt) | 0, n = (n = n + Math.imul(k, ht) | 0) + Math.imul(A, rt) | 0, e = e + Math.imul(A, ht) | 0, h = h + Math.imul(y, et) | 0, n = (n = n + Math.imul(y, ot) | 0) + Math.imul(b, et) | 0, e = e + Math.imul(b, ot) | 0, h = h + Math.imul(g, ut) | 0, n = (n = n + Math.imul(g, at) | 0) + Math.imul(c, ut) | 0, e = e + Math.imul(c, at) | 0, h = h + Math.imul(p, mt) | 0, n = (n = n + Math.imul(p, ft) | 0) + Math.imul(M, mt) | 0, e = e + Math.imul(M, ft) | 0;
                    var xt = (a + (h = h + Math.imul(m, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, Mt) | 0) + Math.imul(f, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(f, Mt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, h = Math.imul(j, H), n = (n = Math.imul(j, J)) + Math.imul(K, H) | 0, e = Math.imul(K, J), h = h + Math.imul(T, G) | 0, n = (n = n + Math.imul(T, Q) | 0) + Math.imul(E, G) | 0, e = e + Math.imul(E, Q) | 0, h = h + Math.imul(L, W) | 0, n = (n = n + Math.imul(L, X) | 0) + Math.imul(I, W) | 0, e = e + Math.imul(I, X) | 0, h = h + Math.imul(R, $) | 0, n = (n = n + Math.imul(R, tt) | 0) + Math.imul(B, $) | 0, e = e + Math.imul(B, tt) | 0, h = h + Math.imul(S, rt) | 0, n = (n = n + Math.imul(S, ht) | 0) + Math.imul(Z, rt) | 0, e = e + Math.imul(Z, ht) | 0, h = h + Math.imul(k, et) | 0, n = (n = n + Math.imul(k, ot) | 0) + Math.imul(A, et) | 0, e = e + Math.imul(A, ot) | 0, h = h + Math.imul(y, ut) | 0, n = (n = n + Math.imul(y, at) | 0) + Math.imul(b, ut) | 0, e = e + Math.imul(b, at) | 0, h = h + Math.imul(g, mt) | 0, n = (n = n + Math.imul(g, ft) | 0) + Math.imul(c, mt) | 0, e = e + Math.imul(c, ft) | 0;
                    var St = (a + (h = h + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, Mt) | 0) + Math.imul(M, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(M, Mt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, h = Math.imul(j, G), n = (n = Math.imul(j, Q)) + Math.imul(K, G) | 0, e = Math.imul(K, Q), h = h + Math.imul(T, W) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(E, W) | 0, e = e + Math.imul(E, X) | 0, h = h + Math.imul(L, $) | 0, n = (n = n + Math.imul(L, tt) | 0) + Math.imul(I, $) | 0, e = e + Math.imul(I, tt) | 0, h = h + Math.imul(R, rt) | 0, n = (n = n + Math.imul(R, ht) | 0) + Math.imul(B, rt) | 0, e = e + Math.imul(B, ht) | 0, h = h + Math.imul(S, et) | 0, n = (n = n + Math.imul(S, ot) | 0) + Math.imul(Z, et) | 0, e = e + Math.imul(Z, ot) | 0, h = h + Math.imul(k, ut) | 0, n = (n = n + Math.imul(k, at) | 0) + Math.imul(A, ut) | 0, e = e + Math.imul(A, at) | 0, h = h + Math.imul(y, mt) | 0, n = (n = n + Math.imul(y, ft) | 0) + Math.imul(b, mt) | 0, e = e + Math.imul(b, ft) | 0;
                    var Zt = (a + (h = h + Math.imul(g, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, Mt) | 0) + Math.imul(c, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(c, Mt) | 0) + (n >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, h = Math.imul(j, W), n = (n = Math.imul(j, X)) + Math.imul(K, W) | 0, e = Math.imul(K, X), h = h + Math.imul(T, $) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(E, $) | 0, e = e + Math.imul(E, tt) | 0, h = h + Math.imul(L, rt) | 0, n = (n = n + Math.imul(L, ht) | 0) + Math.imul(I, rt) | 0, e = e + Math.imul(I, ht) | 0, h = h + Math.imul(R, et) | 0, n = (n = n + Math.imul(R, ot) | 0) + Math.imul(B, et) | 0, e = e + Math.imul(B, ot) | 0, h = h + Math.imul(S, ut) | 0, n = (n = n + Math.imul(S, at) | 0) + Math.imul(Z, ut) | 0, e = e + Math.imul(Z, at) | 0, h = h + Math.imul(k, mt) | 0, n = (n = n + Math.imul(k, ft) | 0) + Math.imul(A, mt) | 0, e = e + Math.imul(A, ft) | 0;
                    var qt = (a + (h = h + Math.imul(y, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(y, Mt) | 0) + Math.imul(b, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(b, Mt) | 0) + (n >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, h = Math.imul(j, $), n = (n = Math.imul(j, tt)) + Math.imul(K, $) | 0, e = Math.imul(K, tt), h = h + Math.imul(T, rt) | 0, n = (n = n + Math.imul(T, ht) | 0) + Math.imul(E, rt) | 0, e = e + Math.imul(E, ht) | 0, h = h + Math.imul(L, et) | 0, n = (n = n + Math.imul(L, ot) | 0) + Math.imul(I, et) | 0, e = e + Math.imul(I, ot) | 0, h = h + Math.imul(R, ut) | 0, n = (n = n + Math.imul(R, at) | 0) + Math.imul(B, ut) | 0, e = e + Math.imul(B, at) | 0, h = h + Math.imul(S, mt) | 0, n = (n = n + Math.imul(S, ft) | 0) + Math.imul(Z, mt) | 0, e = e + Math.imul(Z, ft) | 0;
                    var Rt = (a + (h = h + Math.imul(k, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, Mt) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(A, Mt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, h = Math.imul(j, rt), n = (n = Math.imul(j, ht)) + Math.imul(K, rt) | 0, e = Math.imul(K, ht), h = h + Math.imul(T, et) | 0, n = (n = n + Math.imul(T, ot) | 0) + Math.imul(E, et) | 0, e = e + Math.imul(E, ot) | 0, h = h + Math.imul(L, ut) | 0, n = (n = n + Math.imul(L, at) | 0) + Math.imul(I, ut) | 0, e = e + Math.imul(I, at) | 0, h = h + Math.imul(R, mt) | 0, n = (n = n + Math.imul(R, ft) | 0) + Math.imul(B, mt) | 0, e = e + Math.imul(B, ft) | 0;
                    var Bt = (a + (h = h + Math.imul(S, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, Mt) | 0) + Math.imul(Z, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(Z, Mt) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, h = Math.imul(j, et), n = (n = Math.imul(j, ot)) + Math.imul(K, et) | 0, e = Math.imul(K, ot), h = h + Math.imul(T, ut) | 0, n = (n = n + Math.imul(T, at) | 0) + Math.imul(E, ut) | 0, e = e + Math.imul(E, at) | 0, h = h + Math.imul(L, mt) | 0, n = (n = n + Math.imul(L, ft) | 0) + Math.imul(I, mt) | 0, e = e + Math.imul(I, ft) | 0;
                    var Nt = (a + (h = h + Math.imul(R, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(R, Mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(B, Mt) | 0) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, h = Math.imul(j, ut), n = (n = Math.imul(j, at)) + Math.imul(K, ut) | 0, e = Math.imul(K, at), h = h + Math.imul(T, mt) | 0, n = (n = n + Math.imul(T, ft) | 0) + Math.imul(E, mt) | 0, e = e + Math.imul(E, ft) | 0;
                    var Lt = (a + (h = h + Math.imul(L, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, Mt) | 0) + Math.imul(I, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(I, Mt) | 0) + (n >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, h = Math.imul(j, mt), n = (n = Math.imul(j, ft)) + Math.imul(K, mt) | 0, e = Math.imul(K, ft);
                    var It = (a + (h = h + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, Mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
                    a = ((e = e + Math.imul(E, Mt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863;
                    var zt = (a + (h = Math.imul(j, pt)) | 0) + ((8191 & (n = (n = Math.imul(j, Mt)) + Math.imul(K, pt) | 0)) << 13) | 0;
                    return a = ((e = Math.imul(K, Mt)) + (n >>> 13) | 0) + (zt >>> 26) | 0, zt &= 67108863, u[0] = vt, u[1] = gt, u[2] = ct, u[3] = wt, u[4] = yt, u[5] = bt, u[6] = _t, u[7] = kt, u[8] = At, u[9] = xt, u[10] = St, u[11] = Zt, u[12] = qt, u[13] = Rt, u[14] = Bt, u[15] = Nt, u[16] = Lt, u[17] = It, u[18] = zt, 0 !== a && (u[19] = a, r.length++), r
                };
                Math.imul || (k = u), n.prototype.mulTo = function(t, i) {
                    var r = this.length + t.length;
                    return 10 === this.length && 10 === t.length ? k(this, t, i) : r < 63 ? u(this, t, i) : r < 1024 ? a(this, t, i) : l(this, t, i)
                }, m.prototype.makeRBT = function(t) {
                    for (var i = new Array(t), r = n.prototype._countBits(t) - 1, h = 0; h < t; h++) i[h] = this.revBin(h, r, t);
                    return i
                }, m.prototype.revBin = function(t, i, r) {
                    if (0 === t || t === r - 1) return t;
                    for (var h = 0, n = 0; n < i; n++) h |= (1 & t) << i - n - 1, t >>= 1;
                    return h
                }, m.prototype.permute = function(t, i, r, h, n, e) {
                    for (var o = 0; o < e; o++) h[o] = i[t[o]], n[o] = r[t[o]]
                }, m.prototype.transform = function(t, i, r, h, n, e) {
                    this.permute(e, t, i, r, h, n);
                    for (var o = 1; o < n; o <<= 1)
                        for (var s = o << 1, u = Math.cos(2 * Math.PI / s), a = Math.sin(2 * Math.PI / s), l = 0; l < n; l += s)
                            for (var m = u, f = a, d = 0; d < o; d++) {
                                var p = r[l + d],
                                    M = h[l + d],
                                    v = r[l + d + o],
                                    g = h[l + d + o],
                                    c = m * v - f * g;
                                g = m * g + f * v, v = c, r[l + d] = p + v, h[l + d] = M + g, r[l + d + o] = p - v, h[l + d + o] = M - g, d !== s && (c = u * m - a * f, f = u * f + a * m, m = c)
                            }
                }, m.prototype.guessLen13b = function(t, i) {
                    var r = 1 | Math.max(i, t),
                        h = 1 & r,
                        n = 0;
                    for (r = r / 2 | 0; r; r >>>= 1) n++;
                    return 1 << n + 1 + h
                }, m.prototype.conjugate = function(t, i, r) {
                    if (!(r <= 1))
                        for (var h = 0; h < r / 2; h++) {
                            var n = t[h];
                            t[h] = t[r - h - 1], t[r - h - 1] = n, n = i[h], i[h] = -i[r - h - 1], i[r - h - 1] = -n
                        }
                }, m.prototype.normalize13b = function(t, i) {
                    for (var r = 0, h = 0; h < i / 2; h++) {
                        var n = 8192 * Math.round(t[2 * h + 1] / i) + Math.round(t[2 * h] / i) + r;
                        t[h] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return t
                }, m.prototype.convert13b = function(t, i, h, n) {
                    for (var e = 0, o = 0; o < i; o++) e += 0 | t[o], h[2 * o] = 8191 & e, e >>>= 13, h[2 * o + 1] = 8191 & e, e >>>= 13;
                    for (o = 2 * i; o < n; ++o) h[o] = 0;
                    r(0 === e), r(0 == (-8192 & e))
                }, m.prototype.stub = function(t) {
                    for (var i = new Array(t), r = 0; r < t; r++) i[r] = 0;
                    return i
                }, m.prototype.mulp = function(t, i, r) {
                    var h = 2 * this.guessLen13b(t.length, i.length),
                        n = this.makeRBT(h),
                        e = this.stub(h),
                        o = new Array(h),
                        s = new Array(h),
                        u = new Array(h),
                        a = new Array(h),
                        l = new Array(h),
                        m = new Array(h),
                        f = r.words;
                    f.length = h, this.convert13b(t.words, t.length, o, h), this.convert13b(i.words, i.length, a, h), this.transform(o, e, s, u, h, n), this.transform(a, e, l, m, h, n);
                    for (var d = 0; d < h; d++) {
                        var p = s[d] * l[d] - u[d] * m[d];
                        u[d] = s[d] * m[d] + u[d] * l[d], s[d] = p
                    }
                    return this.conjugate(s, u, h), this.transform(s, u, f, e, h, n), this.conjugate(f, e, h), this.normalize13b(f, h), r.negative = t.negative ^ i.negative, r.length = t.length + i.length, r.strip()
                }, n.prototype.mul = function(t) {
                    var i = new n(null);
                    return i.words = new Array(this.length + t.length), this.mulTo(t, i)
                }, n.prototype.mulf = function(t) {
                    var i = new n(null);
                    return i.words = new Array(this.length + t.length), l(this, t, i)
                }, n.prototype.imul = function(t) {
                    return this.clone().mulTo(t, this)
                }, n.prototype.imuln = function(t) {
                    r("number" == typeof t), r(t < 67108864);
                    for (var i = 0, h = 0; h < this.length; h++) {
                        var n = (0 | this.words[h]) * t,
                            e = (67108863 & n) + (67108863 & i);
                        i >>= 26, i += n / 67108864 | 0, i += e >>> 26, this.words[h] = 67108863 & e
                    }
                    return 0 !== i && (this.words[h] = i, this.length++), this
                }, n.prototype.muln = function(t) {
                    return this.clone().imuln(t)
                }, n.prototype.sqr = function() {
                    return this.mul(this)
                }, n.prototype.isqr = function() {
                    return this.imul(this.clone())
                }, n.prototype.pow = function(t) {
                    var i = s(t);
                    if (0 === i.length) return new n(1);
                    for (var r = this, h = 0; h < i.length && 0 === i[h]; h++, r = r.sqr());
                    if (++h < i.length)
                        for (var e = r.sqr(); h < i.length; h++, e = e.sqr()) 0 !== i[h] && (r = r.mul(e));
                    return r
                }, n.prototype.iushln = function(t) {
                    r("number" == typeof t && t >= 0);
                    var i, h = t % 26,
                        n = (t - h) / 26,
                        e = 67108863 >>> 26 - h << 26 - h;
                    if (0 !== h) {
                        var o = 0;
                        for (i = 0; i < this.length; i++) {
                            var s = this.words[i] & e,
                                u = (0 | this.words[i]) - s << h;
                            this.words[i] = u | o, o = s >>> 26 - h
                        }
                        o && (this.words[i] = o, this.length++)
                    }
                    if (0 !== n) {
                        for (i = this.length - 1; i >= 0; i--) this.words[i + n] = this.words[i];
                        for (i = 0; i < n; i++) this.words[i] = 0;
                        this.length += n
                    }
                    return this.strip()
                }, n.prototype.ishln = function(t) {
                    return r(0 === this.negative), this.iushln(t)
                }, n.prototype.iushrn = function(t, i, h) {
                    r("number" == typeof t && t >= 0);
                    var n;
                    n = i ? (i - i % 26) / 26 : 0;
                    var e = t % 26,
                        o = Math.min((t - e) / 26, this.length),
                        s = 67108863 ^ 67108863 >>> e << e,
                        u = h;
                    if (n -= o, n = Math.max(0, n), u) {
                        for (var a = 0; a < o; a++) u.words[a] = this.words[a];
                        u.length = o
                    }
                    if (0 === o);
                    else if (this.length > o)
                        for (this.length -= o, a = 0; a < this.length; a++) this.words[a] = this.words[a + o];
                    else this.words[0] = 0, this.length = 1;
                    var l = 0;
                    for (a = this.length - 1; a >= 0 && (0 !== l || a >= n); a--) {
                        var m = 0 | this.words[a];
                        this.words[a] = l << 26 - e | m >>> e, l = m & s
                    }
                    return u && 0 !== l && (u.words[u.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
                }, n.prototype.ishrn = function(t, i, h) {
                    return r(0 === this.negative), this.iushrn(t, i, h)
                }, n.prototype.shln = function(t) {
                    return this.clone().ishln(t)
                }, n.prototype.ushln = function(t) {
                    return this.clone().iushln(t)
                }, n.prototype.shrn = function(t) {
                    return this.clone().ishrn(t)
                }, n.prototype.ushrn = function(t) {
                    return this.clone().iushrn(t)
                }, n.prototype.testn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var i = t % 26,
                        h = (t - i) / 26,
                        n = 1 << i;
                    return !(this.length <= h) && !!(this.words[h] & n)
                }, n.prototype.imaskn = function(t) {
                    r("number" == typeof t && t >= 0);
                    var i = t % 26,
                        h = (t - i) / 26;
                    if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= h) return this;
                    if (0 !== i && h++, this.length = Math.min(h, this.length), 0 !== i) {
                        var n = 67108863 ^ 67108863 >>> i << i;
                        this.words[this.length - 1] &= n
                    }
                    return this.strip()
                }, n.prototype.maskn = function(t) {
                    return this.clone().imaskn(t)
                }, n.prototype.iaddn = function(t) {
                    return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                }, n.prototype._iaddn = function(t) {
                    this.words[0] += t;
                    for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) this.words[i] -= 67108864, i === this.length - 1 ? this.words[i + 1] = 1 : this.words[i + 1]++;
                    return this.length = Math.max(this.length, i + 1), this
                }, n.prototype.isubn = function(t) {
                    if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                    if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                    if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                    else
                        for (var i = 0; i < this.length && this.words[i] < 0; i++) this.words[i] += 67108864, this.words[i + 1] -= 1;
                    return this.strip()
                }, n.prototype.addn = function(t) {
                    return this.clone().iaddn(t)
                }, n.prototype.subn = function(t) {
                    return this.clone().isubn(t)
                }, n.prototype.iabs = function() {
                    return this.negative = 0, this
                }, n.prototype.abs = function() {
                    return this.clone().iabs()
                }, n.prototype._ishlnsubmul = function(t, i, h) {
                    var n, e = t.length + h;
                    this._expand(e);
                    var o, s = 0;
                    for (n = 0; n < t.length; n++) {
                        o = (0 | this.words[n + h]) + s;
                        var u = (0 | t.words[n]) * i;
                        s = ((o -= 67108863 & u) >> 26) - (u / 67108864 | 0), this.words[n + h] = 67108863 & o
                    }
                    for (; n < this.length - h; n++) s = (o = (0 | this.words[n + h]) + s) >> 26, this.words[n + h] = 67108863 & o;
                    if (0 === s) return this.strip();
                    for (r(-1 === s), s = 0, n = 0; n < this.length; n++) s = (o = -(0 | this.words[n]) + s) >> 26, this.words[n] = 67108863 & o;
                    return this.negative = 1, this.strip()
                }, n.prototype._wordDiv = function(t, i) {
                    var r = this.length - t.length,
                        h = this.clone(),
                        e = t,
                        o = 0 | e.words[e.length - 1];
                    0 !== (r = 26 - this._countBits(o)) && (e = e.ushln(r), h.iushln(r), o = 0 | e.words[e.length - 1]);
                    var s, u = h.length - e.length;
                    if ("mod" !== i) {
                        (s = new n(null)).length = u + 1, s.words = new Array(s.length);
                        for (var a = 0; a < s.length; a++) s.words[a] = 0
                    }
                    var l = h.clone()._ishlnsubmul(e, 1, u);
                    0 === l.negative && (h = l, s && (s.words[u] = 1));
                    for (var m = u - 1; m >= 0; m--) {
                        var f = 67108864 * (0 | h.words[e.length + m]) + (0 | h.words[e.length + m - 1]);
                        for (f = Math.min(f / o | 0, 67108863), h._ishlnsubmul(e, f, m); 0 !== h.negative;) f--, h.negative = 0, h._ishlnsubmul(e, 1, m), h.isZero() || (h.negative ^= 1);
                        s && (s.words[m] = f)
                    }
                    return s && s.strip(), h.strip(), "div" !== i && 0 !== r && h.iushrn(r), {
                        div: s || null,
                        mod: h
                    }
                }, n.prototype.divmod = function(t, i, h) {
                    if (r(!t.isZero()), this.isZero()) return {
                        div: new n(0),
                        mod: new n(0)
                    };
                    var e, o, s;
                    return 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, i), "mod" !== i && (e = s.div.neg()), "div" !== i && (o = s.mod.neg(), h && 0 !== o.negative && o.iadd(t)), {
                        div: e,
                        mod: o
                    }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), i), "mod" !== i && (e = s.div.neg()), {
                        div: e,
                        mod: s.mod
                    }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), i), "div" !== i && (o = s.mod.neg(), h && 0 !== o.negative && o.isub(t)), {
                        div: s.div,
                        mod: o
                    }) : t.length > this.length || this.cmp(t) < 0 ? {
                        div: new n(0),
                        mod: this
                    } : 1 === t.length ? "div" === i ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === i ? {
                        div: null,
                        mod: new n(this.modn(t.words[0]))
                    } : {
                        div: this.divn(t.words[0]),
                        mod: new n(this.modn(t.words[0]))
                    } : this._wordDiv(t, i)
                }, n.prototype.div = function(t) {
                    return this.divmod(t, "div", !1).div
                }, n.prototype.mod = function(t) {
                    return this.divmod(t, "mod", !1).mod
                }, n.prototype.umod = function(t) {
                    return this.divmod(t, "mod", !0).mod
                }, n.prototype.divRound = function(t) {
                    var i = this.divmod(t);
                    if (i.mod.isZero()) return i.div;
                    var r = 0 !== i.div.negative ? i.mod.isub(t) : i.mod,
                        h = t.ushrn(1),
                        n = t.andln(1),
                        e = r.cmp(h);
                    return e < 0 || 1 === n && 0 === e ? i.div : 0 !== i.div.negative ? i.div.isubn(1) : i.div.iaddn(1)
                }, n.prototype.modn = function(t) {
                    r(t <= 67108863);
                    for (var i = (1 << 26) % t, h = 0, n = this.length - 1; n >= 0; n--) h = (i * h + (0 | this.words[n])) % t;
                    return h
                }, n.prototype.idivn = function(t) {
                    r(t <= 67108863);
                    for (var i = 0, h = this.length - 1; h >= 0; h--) {
                        var n = (0 | this.words[h]) + 67108864 * i;
                        this.words[h] = n / t | 0, i = n % t
                    }
                    return this.strip()
                }, n.prototype.divn = function(t) {
                    return this.clone().idivn(t)
                }, n.prototype.egcd = function(t) {
                    r(0 === t.negative), r(!t.isZero());
                    var i = this,
                        h = t.clone();
                    i = 0 !== i.negative ? i.umod(t) : i.clone();
                    for (var e = new n(1), o = new n(0), s = new n(0), u = new n(1), a = 0; i.isEven() && h.isEven();) i.iushrn(1), h.iushrn(1), ++a;
                    for (var l = h.clone(), m = i.clone(); !i.isZero();) {
                        for (var f = 0, d = 1; 0 == (i.words[0] & d) && f < 26; ++f, d <<= 1);
                        if (f > 0)
                            for (i.iushrn(f); f-- > 0;)(e.isOdd() || o.isOdd()) && (e.iadd(l), o.isub(m)), e.iushrn(1), o.iushrn(1);
                        for (var p = 0, M = 1; 0 == (h.words[0] & M) && p < 26; ++p, M <<= 1);
                        if (p > 0)
                            for (h.iushrn(p); p-- > 0;)(s.isOdd() || u.isOdd()) && (s.iadd(l), u.isub(m)), s.iushrn(1), u.iushrn(1);
                        i.cmp(h) >= 0 ? (i.isub(h), e.isub(s), o.isub(u)) : (h.isub(i), s.isub(e), u.isub(o))
                    }
                    return {
                        a: s,
                        b: u,
                        gcd: h.iushln(a)
                    }
                }, n.prototype._invmp = function(t) {
                    r(0 === t.negative), r(!t.isZero());
                    var i = this,
                        h = t.clone();
                    i = 0 !== i.negative ? i.umod(t) : i.clone();
                    for (var e = new n(1), o = new n(0), s = h.clone(); i.cmpn(1) > 0 && h.cmpn(1) > 0;) {
                        for (var u = 0, a = 1; 0 == (i.words[0] & a) && u < 26; ++u, a <<= 1);
                        if (u > 0)
                            for (i.iushrn(u); u-- > 0;) e.isOdd() && e.iadd(s), e.iushrn(1);
                        for (var l = 0, m = 1; 0 == (h.words[0] & m) && l < 26; ++l, m <<= 1);
                        if (l > 0)
                            for (h.iushrn(l); l-- > 0;) o.isOdd() && o.iadd(s), o.iushrn(1);
                        i.cmp(h) >= 0 ? (i.isub(h), e.isub(o)) : (h.isub(i), o.isub(e))
                    }
                    var f;
                    return (f = 0 === i.cmpn(1) ? e : o).cmpn(0) < 0 && f.iadd(t), f
                }, n.prototype.gcd = function(t) {
                    if (this.isZero()) return t.abs();
                    if (t.isZero()) return this.abs();
                    var i = this.clone(),
                        r = t.clone();
                    i.negative = 0, r.negative = 0;
                    for (var h = 0; i.isEven() && r.isEven(); h++) i.iushrn(1), r.iushrn(1);
                    for (;;) {
                        for (; i.isEven();) i.iushrn(1);
                        for (; r.isEven();) r.iushrn(1);
                        var n = i.cmp(r);
                        if (n < 0) {
                            var e = i;
                            i = r, r = e
                        } else if (0 === n || 0 === r.cmpn(1)) break;
                        i.isub(r)
                    }
                    return r.iushln(h)
                }, n.prototype.invm = function(t) {
                    return this.egcd(t).a.umod(t)
                }, n.prototype.isEven = function() {
                    return 0 == (1 & this.words[0])
                }, n.prototype.isOdd = function() {
                    return 1 == (1 & this.words[0])
                }, n.prototype.andln = function(t) {
                    return this.words[0] & t
                }, n.prototype.bincn = function(t) {
                    r("number" == typeof t);
                    var i = t % 26,
                        h = (t - i) / 26,
                        n = 1 << i;
                    if (this.length <= h) return this._expand(h + 1), this.words[h] |= n, this;
                    for (var e = n, o = h; 0 !== e && o < this.length; o++) {
                        var s = 0 | this.words[o];
                        e = (s += e) >>> 26, s &= 67108863, this.words[o] = s
                    }
                    return 0 !== e && (this.words[o] = e, this.length++), this
                }, n.prototype.isZero = function() {
                    return 1 === this.length && 0 === this.words[0]
                }, n.prototype.cmpn = function(t) {
                    var i = t < 0;
                    if (0 !== this.negative && !i) return -1;
                    if (0 === this.negative && i) return 1;
                    this.strip();
                    var h;
                    if (this.length > 1) h = 1;
                    else {
                        i && (t = -t), r(t <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        h = n === t ? 0 : n < t ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -h : h
                }, n.prototype.cmp = function(t) {
                    if (0 !== this.negative && 0 === t.negative) return -1;
                    if (0 === this.negative && 0 !== t.negative) return 1;
                    var i = this.ucmp(t);
                    return 0 !== this.negative ? 0 | -i : i
                }, n.prototype.ucmp = function(t) {
                    if (this.length > t.length) return 1;
                    if (this.length < t.length) return -1;
                    for (var i = 0, r = this.length - 1; r >= 0; r--) {
                        var h = 0 | this.words[r],
                            n = 0 | t.words[r];
                        if (h !== n) {
                            h < n ? i = -1 : h > n && (i = 1);
                            break
                        }
                    }
                    return i
                }, n.prototype.gtn = function(t) {
                    return 1 === this.cmpn(t)
                }, n.prototype.gt = function(t) {
                    return 1 === this.cmp(t)
                }, n.prototype.gten = function(t) {
                    return this.cmpn(t) >= 0
                }, n.prototype.gte = function(t) {
                    return this.cmp(t) >= 0
                }, n.prototype.ltn = function(t) {
                    return -1 === this.cmpn(t)
                }, n.prototype.lt = function(t) {
                    return -1 === this.cmp(t)
                }, n.prototype.lten = function(t) {
                    return this.cmpn(t) <= 0
                }, n.prototype.lte = function(t) {
                    return this.cmp(t) <= 0
                }, n.prototype.eqn = function(t) {
                    return 0 === this.cmpn(t)
                }, n.prototype.eq = function(t) {
                    return 0 === this.cmp(t)
                }, n.red = function(t) {
                    return new g(t)
                }, n.prototype.toRed = function(t) {
                    return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                }, n.prototype.fromRed = function() {
                    return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                }, n.prototype._forceRed = function(t) {
                    return this.red = t, this
                }, n.prototype.forceRed = function(t) {
                    return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
                }, n.prototype.redAdd = function(t) {
                    return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                }, n.prototype.redIAdd = function(t) {
                    return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                }, n.prototype.redSub = function(t) {
                    return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                }, n.prototype.redISub = function(t) {
                    return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                }, n.prototype.redShl = function(t) {
                    return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                }, n.prototype.redMul = function(t) {
                    return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                }, n.prototype.redIMul = function(t) {
                    return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                }, n.prototype.redSqr = function() {
                    return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                }, n.prototype.redISqr = function() {
                    return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                }, n.prototype.redSqrt = function() {
                    return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                }, n.prototype.redInvm = function() {
                    return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                }, n.prototype.redNeg = function() {
                    return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                }, n.prototype.redPow = function(t) {
                    return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                };
                var A = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };
                f.prototype._tmp = function() {
                    var t = new n(null);
                    return t.words = new Array(Math.ceil(this.n / 13)), t
                }, f.prototype.ireduce = function(t) {
                    var i, r = t;
                    do {
                        this.split(r, this.tmp), i = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                    } while (i > this.n);
                    var h = i < this.n ? -1 : r.ucmp(this.p);
                    return 0 === h ? (r.words[0] = 0, r.length = 1) : h > 0 ? r.isub(this.p) : r.strip(), r
                }, f.prototype.split = function(t, i) {
                    t.iushrn(this.n, 0, i)
                }, f.prototype.imulK = function(t) {
                    return t.imul(this.k)
                }, h(d, f), d.prototype.split = function(t, i) {
                    for (var r = Math.min(t.length, 9), h = 0; h < r; h++) i.words[h] = t.words[h];
                    if (i.length = r, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                    var n = t.words[9];
                    for (i.words[i.length++] = 4194303 & n, h = 10; h < t.length; h++) {
                        var e = 0 | t.words[h];
                        t.words[h - 10] = (4194303 & e) << 4 | n >>> 22, n = e
                    }
                    n >>>= 22, t.words[h - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
                }, d.prototype.imulK = function(t) {
                    t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                    for (var i = 0, r = 0; r < t.length; r++) {
                        var h = 0 | t.words[r];
                        i += 977 * h, t.words[r] = 67108863 & i, i = 64 * h + (i / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                }, h(p, f), h(M, f), h(v, f), v.prototype.imulK = function(t) {
                    for (var i = 0, r = 0; r < t.length; r++) {
                        var h = 19 * (0 | t.words[r]) + i,
                            n = 67108863 & h;
                        h >>>= 26, t.words[r] = n, i = h
                    }
                    return 0 !== i && (t.words[t.length++] = i), t
                }, n._prime = function(t) {
                    if (A[t]) return A[t];
                    var i;
                    if ("k256" === t) i = new d;
                    else if ("p224" === t) i = new p;
                    else if ("p192" === t) i = new M;
                    else {
                        if ("p25519" !== t) throw new Error("Unknown prime " + t);
                        i = new v
                    }
                    return A[t] = i, i
                }, g.prototype._verify1 = function(t) {
                    r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
                }, g.prototype._verify2 = function(t, i) {
                    r(0 == (t.negative | i.negative), "red works only with positives"), r(t.red && t.red === i.red, "red works only with red numbers")
                }, g.prototype.imod = function(t) {
                    return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
                }, g.prototype.neg = function(t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }, g.prototype.add = function(t, i) {
                    this._verify2(t, i);
                    var r = t.add(i);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
                }, g.prototype.iadd = function(t, i) {
                    this._verify2(t, i);
                    var r = t.iadd(i);
                    return r.cmp(this.m) >= 0 && r.isub(this.m), r
                }, g.prototype.sub = function(t, i) {
                    this._verify2(t, i);
                    var r = t.sub(i);
                    return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
                }, g.prototype.isub = function(t, i) {
                    this._verify2(t, i);
                    var r = t.isub(i);
                    return r.cmpn(0) < 0 && r.iadd(this.m), r
                }, g.prototype.shl = function(t, i) {
                    return this._verify1(t), this.imod(t.ushln(i))
                }, g.prototype.imul = function(t, i) {
                    return this._verify2(t, i), this.imod(t.imul(i))
                }, g.prototype.mul = function(t, i) {
                    return this._verify2(t, i), this.imod(t.mul(i))
                }, g.prototype.isqr = function(t) {
                    return this.imul(t, t.clone())
                }, g.prototype.sqr = function(t) {
                    return this.mul(t, t)
                }, g.prototype.sqrt = function(t) {
                    if (t.isZero()) return t.clone();
                    var i = this.m.andln(3);
                    if (r(i % 2 == 1), 3 === i) {
                        var h = this.m.add(new n(1)).iushrn(2);
                        return this.pow(t, h)
                    }
                    for (var e = this.m.subn(1), o = 0; !e.isZero() && 0 === e.andln(1);) o++, e.iushrn(1);
                    r(!e.isZero());
                    var s = new n(1).toRed(this),
                        u = s.redNeg(),
                        a = this.m.subn(1).iushrn(1),
                        l = this.m.bitLength();
                    for (l = new n(2 * l * l).toRed(this); 0 !== this.pow(l, a).cmp(u);) l.redIAdd(u);
                    for (var m = this.pow(l, e), f = this.pow(t, e.addn(1).iushrn(1)), d = this.pow(t, e), p = o; 0 !== d.cmp(s);) {
                        for (var M = d, v = 0; 0 !== M.cmp(s); v++) M = M.redSqr();
                        r(v < p);
                        var g = this.pow(m, new n(1).iushln(p - v - 1));
                        f = f.redMul(g), m = g.redSqr(), d = d.redMul(m), p = v
                    }
                    return f
                }, g.prototype.invm = function(t) {
                    var i = t._invmp(this.m);
                    return 0 !== i.negative ? (i.negative = 0, this.imod(i).redNeg()) : this.imod(i)
                }, g.prototype.pow = function(t, i) {
                    if (i.isZero()) return new n(1).toRed(this);
                    if (0 === i.cmpn(1)) return t.clone();
                    var r = new Array(16);
                    r[0] = new n(1).toRed(this), r[1] = t;
                    for (var h = 2; h < r.length; h++) r[h] = this.mul(r[h - 1], t);
                    var e = r[0],
                        o = 0,
                        s = 0,
                        u = i.bitLength() % 26;
                    for (0 === u && (u = 26), h = i.length - 1; h >= 0; h--) {
                        for (var a = i.words[h], l = u - 1; l >= 0; l--) {
                            var m = a >> l & 1;
                            e !== r[0] && (e = this.sqr(e)), 0 !== m || 0 !== o ? (o <<= 1, o |= m, (4 === ++s || 0 === h && 0 === l) && (e = this.mul(e, r[o]), s = 0, o = 0)) : s = 0
                        }
                        u = 26
                    }
                    return e
                }, g.prototype.convertTo = function(t) {
                    var i = t.umod(this.m);
                    return i === t ? i.clone() : i
                }, g.prototype.convertFrom = function(t) {
                    var i = t.clone();
                    return i.red = null, i
                }, n.mont = function(t) {
                    return new c(t)
                }, h(c, g), c.prototype.convertTo = function(t) {
                    return this.imod(t.ushln(this.shift))
                }, c.prototype.convertFrom = function(t) {
                    var i = this.imod(t.mul(this.rinv));
                    return i.red = null, i
                }, c.prototype.imul = function(t, i) {
                    if (t.isZero() || i.isZero()) return t.words[0] = 0, t.length = 1, t;
                    var r = t.imul(i),
                        h = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = r.isub(h).iushrn(this.shift),
                        e = n;
                    return n.cmp(this.m) >= 0 ? e = n.isub(this.m) : n.cmpn(0) < 0 && (e = n.iadd(this.m)), e._forceRed(this)
                }, c.prototype.mul = function(t, i) {
                    if (t.isZero() || i.isZero()) return new n(0)._forceRed(this);
                    var r = t.mul(i),
                        h = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        e = r.isub(h).iushrn(this.shift),
                        o = e;
                    return e.cmp(this.m) >= 0 ? o = e.isub(this.m) : e.cmpn(0) < 0 && (o = e.iadd(this.m)), o._forceRed(this)
                }, c.prototype.invm = function(t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            }("undefined" == typeof module || module, this);

        }, {
            "buffer": 6
        }],
        5: [function(require, module, exports) {
            function Rand(t) {
                this.rand = t
            }
            var r;
            if (module.exports = function(t) {
                    return r || (r = new Rand(null)), r.generate(t)
                }, module.exports.Rand = Rand, Rand.prototype.generate = function(t) {
                    return this._rand(t)
                }, Rand.prototype._rand = function(t) {
                    if (this.rand.getBytes) return this.rand.getBytes(t);
                    for (var r = new Uint8Array(t), e = 0; e < r.length; e++) r[e] = this.rand.getByte();
                    return r
                }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? Rand.prototype._rand = function(t) {
                var r = new Uint8Array(t);
                return self.crypto.getRandomValues(r), r
            } : self.msCrypto && self.msCrypto.getRandomValues ? Rand.prototype._rand = function(t) {
                var r = new Uint8Array(t);
                return self.msCrypto.getRandomValues(r), r
            } : "object" == typeof window && (Rand.prototype._rand = function() {
                throw new Error("Not implemented yet")
            });
            else try {
                var crypto = require("crypto");
                if ("function" != typeof crypto.randomBytes) throw new Error("Not supported");
                Rand.prototype._rand = function(t) {
                    return crypto.randomBytes(t)
                }
            } catch (t) {}

        }, {
            "crypto": 6
        }],
        6: [function(require, module, exports) {

        }, {}],
        7: [function(require, module, exports) {
            (function(Buffer) {
                const Sha3 = require("js-sha3"),
                    hashLengths = [224, 256, 384, 512];
                var hash = function(t) {
                    if (void 0 !== t && -1 == hashLengths.indexOf(t)) throw new Error("Unsupported hash length");
                    this.content = [], this.bitcount = t ? "keccak_" + t : "keccak_512"
                };
                hash.prototype.update = function(t) {
                    if (Buffer.isBuffer(t)) this.content.push(t);
                    else {
                        if ("string" != typeof t) throw new Error("Unsupported argument to update");
                        this.content.push(new Buffer(t))
                    }
                    return this
                }, hash.prototype.digest = function(t) {
                    var e = Sha3[this.bitcount](Buffer.concat(this.content));
                    if ("hex" === t) return e;
                    if ("binary" === t || void 0 === t) return new Buffer(e, "hex").toString("binary");
                    throw new Error("Unsupported encoding for digest: " + t)
                }, module.exports = {
                    SHA3Hash: hash
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "buffer": 8,
            "js-sha3": 55
        }],
        8: [function(require, module, exports) {
            "use strict";

            function typedArraySupport() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }

            function createBuffer(e) {
                if (e > K_MAX_LENGTH) throw new RangeError("Invalid typed array length");
                var t = new Uint8Array(e);
                return t.__proto__ = Buffer.prototype, t
            }

            function Buffer(e, t, r) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return allocUnsafe(e)
                }
                return from(e, t, r)
            }

            function from(e, t, r) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return isArrayBuffer(e) ? fromArrayBuffer(e, t, r) : "string" == typeof e ? fromString(e, t) : fromObject(e)
            }

            function assertSize(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (e < 0) throw new RangeError('"size" argument must not be negative')
            }

            function alloc(e, t, r) {
                return assertSize(e), e <= 0 ? createBuffer(e) : void 0 !== t ? "string" == typeof r ? createBuffer(e).fill(t, r) : createBuffer(e).fill(t) : createBuffer(e)
            }

            function allocUnsafe(e) {
                return assertSize(e), createBuffer(e < 0 ? 0 : 0 | checked(e))
            }

            function fromString(e, t) {
                if ("string" == typeof t && "" !== t || (t = "utf8"), !Buffer.isEncoding(t)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | byteLength(e, t),
                    n = createBuffer(r),
                    f = n.write(e, t);
                return f !== r && (n = n.slice(0, f)), n
            }

            function fromArrayLike(e) {
                for (var t = e.length < 0 ? 0 : 0 | checked(e.length), r = createBuffer(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                return r
            }

            function fromArrayBuffer(e, t, r) {
                if (t < 0 || e.byteLength < t) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < t + (r || 0)) throw new RangeError("'length' is out of bounds");
                var n;
                return n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r), n.__proto__ = Buffer.prototype, n
            }

            function fromObject(e) {
                if (Buffer.isBuffer(e)) {
                    var t = 0 | checked(e.length),
                        r = createBuffer(t);
                    return 0 === r.length ? r : (e.copy(r, 0, 0, t), r)
                }
                if (e) {
                    if (isArrayBufferView(e) || "length" in e) return "number" != typeof e.length || numberIsNaN(e.length) ? createBuffer(0) : fromArrayLike(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return fromArrayLike(e.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function checked(e) {
                if (e >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
                return 0 | e
            }

            function SlowBuffer(e) {
                return +e != e && (e = 0), Buffer.alloc(+e)
            }

            function byteLength(e, t) {
                if (Buffer.isBuffer(e)) return e.length;
                if (isArrayBufferView(e) || isArrayBuffer(e)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var r = e.length;
                if (0 === r) return 0;
                for (var n = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return utf8ToBytes(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return base64ToBytes(e).length;
                    default:
                        if (n) return utf8ToBytes(e).length;
                        t = ("" + t).toLowerCase(), n = !0
                }
            }

            function slowToString(e, t, r) {
                var n = !1;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                if (r >>>= 0, t >>>= 0, r <= t) return "";
                for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                        return hexSlice(this, t, r);
                    case "utf8":
                    case "utf-8":
                        return utf8Slice(this, t, r);
                    case "ascii":
                        return asciiSlice(this, t, r);
                    case "latin1":
                    case "binary":
                        return latin1Slice(this, t, r);
                    case "base64":
                        return base64Slice(this, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return utf16leSlice(this, t, r);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), n = !0
                }
            }

            function swap(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }

            function bidirectionalIndexOf(e, t, r, n, f) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, numberIsNaN(r) && (r = f ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (f) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!f) return -1;
                    r = 0
                }
                if ("string" == typeof t && (t = Buffer.from(t, n)), Buffer.isBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, f);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? f ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, f);
                throw new TypeError("val must be string, number or Buffer")
            }

            function arrayIndexOf(e, t, r, n, f) {
                function i(e, t) {
                    return 1 === o ? e[t] : e.readUInt16BE(t * o)
                }
                var o = 1,
                    u = e.length,
                    s = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    o = 2, u /= 2, s /= 2, r /= 2
                }
                var a;
                if (f) {
                    var h = -1;
                    for (a = r; a < u; a++)
                        if (i(e, a) === i(t, -1 === h ? 0 : a - h)) {
                            if (-1 === h && (h = a), a - h + 1 === s) return h * o
                        } else -1 !== h && (a -= a - h), h = -1
                } else
                    for (r + s > u && (r = u - s), a = r; a >= 0; a--) {
                        for (var c = !0, l = 0; l < s; l++)
                            if (i(e, a + l) !== i(t, l)) {
                                c = !1;
                                break
                            }
                        if (c) return a
                    }
                return -1
            }

            function hexWrite(e, t, r, n) {
                r = Number(r) || 0;
                var f = e.length - r;
                n ? (n = Number(n)) > f && (n = f) : n = f;
                var i = t.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                n > i / 2 && (n = i / 2);
                for (var o = 0; o < n; ++o) {
                    var u = parseInt(t.substr(2 * o, 2), 16);
                    if (numberIsNaN(u)) return o;
                    e[r + o] = u
                }
                return o
            }

            function utf8Write(e, t, r, n) {
                return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
            }

            function asciiWrite(e, t, r, n) {
                return blitBuffer(asciiToBytes(t), e, r, n)
            }

            function latin1Write(e, t, r, n) {
                return asciiWrite(e, t, r, n)
            }

            function base64Write(e, t, r, n) {
                return blitBuffer(base64ToBytes(t), e, r, n)
            }

            function ucs2Write(e, t, r, n) {
                return blitBuffer(utf16leToBytes(t, e.length - r), e, r, n)
            }

            function base64Slice(e, t, r) {
                return 0 === t && r === e.length ? base64.fromByteArray(e) : base64.fromByteArray(e.slice(t, r))
            }

            function utf8Slice(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], f = t; f < r;) {
                    var i = e[f],
                        o = null,
                        u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (f + u <= r) {
                        var s, a, h, c;
                        switch (u) {
                            case 1:
                                i < 128 && (o = i);
                                break;
                            case 2:
                                128 == (192 & (s = e[f + 1])) && (c = (31 & i) << 6 | 63 & s) > 127 && (o = c);
                                break;
                            case 3:
                                s = e[f + 1], a = e[f + 2], 128 == (192 & s) && 128 == (192 & a) && (c = (15 & i) << 12 | (63 & s) << 6 | 63 & a) > 2047 && (c < 55296 || c > 57343) && (o = c);
                                break;
                            case 4:
                                s = e[f + 1], a = e[f + 2], h = e[f + 3], 128 == (192 & s) && 128 == (192 & a) && 128 == (192 & h) && (c = (15 & i) << 18 | (63 & s) << 12 | (63 & a) << 6 | 63 & h) > 65535 && c < 1114112 && (o = c)
                        }
                    }
                    null === o ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), n.push(o), f += u
                }
                return decodeCodePointsArray(n)
            }

            function decodeCodePointsArray(e) {
                var t = e.length;
                if (t <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, e);
                for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += MAX_ARGUMENTS_LENGTH));
                return r
            }

            function asciiSlice(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var f = t; f < r; ++f) n += String.fromCharCode(127 & e[f]);
                return n
            }

            function latin1Slice(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var f = t; f < r; ++f) n += String.fromCharCode(e[f]);
                return n
            }

            function hexSlice(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                for (var f = "", i = t; i < r; ++i) f += toHex(e[i]);
                return f
            }

            function utf16leSlice(e, t, r) {
                for (var n = e.slice(t, r), f = "", i = 0; i < n.length; i += 2) f += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return f
            }

            function checkOffset(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
            }

            function checkInt(e, t, r, n, f, i) {
                if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > f || t < i) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range")
            }

            function checkIEEE754(e, t, r, n, f, i) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function writeFloat(e, t, r, n, f) {
                return t = +t, r >>>= 0, f || checkIEEE754(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), ieee754.write(e, t, r, n, 23, 4), r + 4
            }

            function writeDouble(e, t, r, n, f) {
                return t = +t, r >>>= 0, f || checkIEEE754(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), ieee754.write(e, t, r, n, 52, 8), r + 8
            }

            function base64clean(e) {
                if ((e = e.trim().replace(INVALID_BASE64_RE, "")).length < 2) return "";
                for (; e.length % 4 != 0;) e += "=";
                return e
            }

            function toHex(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function utf8ToBytes(e, t) {
                t = t || 1 / 0;
                for (var r, n = e.length, f = null, i = [], o = 0; o < n; ++o) {
                    if ((r = e.charCodeAt(o)) > 55295 && r < 57344) {
                        if (!f) {
                            if (r > 56319) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (o + 1 === n) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            f = r;
                            continue
                        }
                        if (r < 56320) {
                            (t -= 3) > -1 && i.push(239, 191, 189), f = r;
                            continue
                        }
                        r = 65536 + (f - 55296 << 10 | r - 56320)
                    } else f && (t -= 3) > -1 && i.push(239, 191, 189);
                    if (f = null, r < 128) {
                        if ((t -= 1) < 0) break;
                        i.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        i.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return i
            }

            function asciiToBytes(e) {
                for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                return t
            }

            function utf16leToBytes(e, t) {
                for (var r, n, f, i = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = (r = e.charCodeAt(o)) >> 8, f = r % 256, i.push(f), i.push(n);
                return i
            }

            function base64ToBytes(e) {
                return base64.toByteArray(base64clean(e))
            }

            function blitBuffer(e, t, r, n) {
                for (var f = 0; f < n && !(f + r >= t.length || f >= e.length); ++f) t[f + r] = e[f];
                return f
            }

            function isArrayBuffer(e) {
                return e instanceof ArrayBuffer || null != e && null != e.constructor && "ArrayBuffer" === e.constructor.name && "number" == typeof e.byteLength
            }

            function isArrayBufferView(e) {
                return "function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(e)
            }

            function numberIsNaN(e) {
                return e !== e
            }
            var base64 = require("base64-js"),
                ieee754 = require("ieee754");
            exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50;
            var K_MAX_LENGTH = 2147483647;
            exports.kMaxLength = K_MAX_LENGTH, Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport(), Buffer.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), Buffer.poolSize = 8192, Buffer.from = function(e, t, r) {
                return from(e, t, r)
            }, Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, Buffer.alloc = function(e, t, r) {
                return alloc(e, t, r)
            }, Buffer.allocUnsafe = function(e) {
                return allocUnsafe(e)
            }, Buffer.allocUnsafeSlow = function(e) {
                return allocUnsafe(e)
            }, Buffer.isBuffer = function(e) {
                return null != e && !0 === e._isBuffer
            }, Buffer.compare = function(e, t) {
                if (!Buffer.isBuffer(e) || !Buffer.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var r = e.length, n = t.length, f = 0, i = Math.min(r, n); f < i; ++f)
                    if (e[f] !== t[f]) {
                        r = e[f], n = t[f];
                        break
                    }
                return r < n ? -1 : n < r ? 1 : 0
            }, Buffer.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
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
                        return !0;
                    default:
                        return !1
                }
            }, Buffer.concat = function(e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return Buffer.alloc(0);
                var r;
                if (void 0 === t)
                    for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                var n = Buffer.allocUnsafe(t),
                    f = 0;
                for (r = 0; r < e.length; ++r) {
                    var i = e[r];
                    if (!Buffer.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
                    i.copy(n, f), f += i.length
                }
                return n
            }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
                return this
            }, Buffer.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
                return this
            }, Buffer.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
                return this
            }, Buffer.prototype.toString = function() {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : slowToString.apply(this, arguments)
            }, Buffer.prototype.equals = function(e) {
                if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === Buffer.compare(this, e)
            }, Buffer.prototype.inspect = function() {
                var e = "",
                    t = exports.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, Buffer.prototype.compare = function(e, t, r, n, f) {
                if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === f && (f = this.length), t < 0 || r > e.length || n < 0 || f > this.length) throw new RangeError("out of range index");
                if (n >= f && t >= r) return 0;
                if (n >= f) return -1;
                if (t >= r) return 1;
                if (t >>>= 0, r >>>= 0, n >>>= 0, f >>>= 0, this === e) return 0;
                for (var i = f - n, o = r - t, u = Math.min(i, o), s = this.slice(n, f), a = e.slice(t, r), h = 0; h < u; ++h)
                    if (s[h] !== a[h]) {
                        i = s[h], o = a[h];
                        break
                    }
                return i < o ? -1 : o < i ? 1 : 0
            }, Buffer.prototype.includes = function(e, t, r) {
                return -1 !== this.indexOf(e, t, r)
            }, Buffer.prototype.indexOf = function(e, t, r) {
                return bidirectionalIndexOf(this, e, t, r, !0)
            }, Buffer.prototype.lastIndexOf = function(e, t, r) {
                return bidirectionalIndexOf(this, e, t, r, !1)
            }, Buffer.prototype.write = function(e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var f = this.length - t;
                if ((void 0 === r || r > f) && (r = f), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var i = !1;;) switch (n) {
                    case "hex":
                        return hexWrite(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return utf8Write(this, e, t, r);
                    case "ascii":
                        return asciiWrite(this, e, t, r);
                    case "latin1":
                    case "binary":
                        return latin1Write(this, e, t, r);
                    case "base64":
                        return base64Write(this, e, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return ucs2Write(this, e, t, r);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), i = !0
                }
            }, Buffer.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var MAX_ARGUMENTS_LENGTH = 4096;
            Buffer.prototype.slice = function(e, t) {
                var r = this.length;
                e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                var n = this.subarray(e, t);
                return n.__proto__ = Buffer.prototype, n
            }, Buffer.prototype.readUIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
                for (var n = this[e], f = 1, i = 0; ++i < t && (f *= 256);) n += this[e + i] * f;
                return n
            }, Buffer.prototype.readUIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
                for (var n = this[e + --t], f = 1; t > 0 && (f *= 256);) n += this[e + --t] * f;
                return n
            }, Buffer.prototype.readUInt8 = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 1, this.length), this[e]
            }, Buffer.prototype.readUInt16LE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
            }, Buffer.prototype.readUInt16BE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, Buffer.prototype.readUInt32LE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, Buffer.prototype.readUInt32BE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, Buffer.prototype.readIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
                for (var n = this[e], f = 1, i = 0; ++i < t && (f *= 256);) n += this[e + i] * f;
                return f *= 128, n >= f && (n -= Math.pow(2, 8 * t)), n
            }, Buffer.prototype.readIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
                for (var n = t, f = 1, i = this[e + --n]; n > 0 && (f *= 256);) i += this[e + --n] * f;
                return f *= 128, i >= f && (i -= Math.pow(2, 8 * t)), i
            }, Buffer.prototype.readInt8 = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, Buffer.prototype.readInt16LE = function(e, t) {
                e >>>= 0, t || checkOffset(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, Buffer.prototype.readInt16BE = function(e, t) {
                e >>>= 0, t || checkOffset(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, Buffer.prototype.readInt32LE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, Buffer.prototype.readInt32BE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, Buffer.prototype.readFloatLE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), ieee754.read(this, e, !0, 23, 4)
            }, Buffer.prototype.readFloatBE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 4, this.length), ieee754.read(this, e, !1, 23, 4)
            }, Buffer.prototype.readDoubleLE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 8, this.length), ieee754.read(this, e, !0, 52, 8)
            }, Buffer.prototype.readDoubleBE = function(e, t) {
                return e >>>= 0, t || checkOffset(e, 8, this.length), ieee754.read(this, e, !1, 52, 8)
            }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
                e = +e, t >>>= 0, r >>>= 0, n || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var f = 1,
                    i = 0;
                for (this[t] = 255 & e; ++i < r && (f *= 256);) this[t + i] = e / f & 255;
                return t + r
            }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
                e = +e, t >>>= 0, r >>>= 0, n || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var f = r - 1,
                    i = 1;
                for (this[t + f] = 255 & e; --f >= 0 && (i *= 256);) this[t + f] = e / i & 255;
                return t + r
            }, Buffer.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var f = Math.pow(2, 8 * r - 1);
                    checkInt(this, e, t, r, f - 1, -f)
                }
                var i = 0,
                    o = 1,
                    u = 0;
                for (this[t] = 255 & e; ++i < r && (o *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / o >> 0) - u & 255;
                return t + r
            }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var f = Math.pow(2, 8 * r - 1);
                    checkInt(this, e, t, r, f - 1, -f)
                }
                var i = r - 1,
                    o = 1,
                    u = 0;
                for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / o >> 0) - u & 255;
                return t + r
            }, Buffer.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, Buffer.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, Buffer.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, Buffer.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, Buffer.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, Buffer.prototype.writeFloatLE = function(e, t, r) {
                return writeFloat(this, e, t, !0, r)
            }, Buffer.prototype.writeFloatBE = function(e, t, r) {
                return writeFloat(this, e, t, !1, r)
            }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
                return writeDouble(this, e, t, !0, r)
            }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
                return writeDouble(this, e, t, !1, r)
            }, Buffer.prototype.copy = function(e, t, r, n) {
                if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var f, i = n - r;
                if (this === e && r < t && t < n)
                    for (f = i - 1; f >= 0; --f) e[f + t] = this[f + r];
                else if (i < 1e3)
                    for (f = 0; f < i; ++f) e[f + t] = this[f + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
                return i
            }, Buffer.prototype.fill = function(e, t, r, n) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
                        var f = e.charCodeAt(0);
                        f < 256 && (e = f)
                    }
                    if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);
                var i;
                if ("number" == typeof e)
                    for (i = t; i < r; ++i) this[i] = e;
                else {
                    var o = Buffer.isBuffer(e) ? e : new Buffer(e, n),
                        u = o.length;
                    for (i = 0; i < r - t; ++i) this[i + t] = o[i % u]
                }
                return this
            };
            var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

        }, {
            "base64-js": 2,
            "ieee754": 50
        }],
        9: [function(require, module, exports) {
            function CipherBase(t) {
                Transform.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
            }
            var Buffer = require("safe-buffer").Buffer,
                Transform = require("stream").Transform,
                StringDecoder = require("string_decoder").StringDecoder,
                inherits = require("inherits");
            inherits(CipherBase, Transform), CipherBase.prototype.update = function(t, e, r) {
                "string" == typeof t && (t = Buffer.from(t, e));
                var i = this._update(t);
                return this.hashMode ? this : (r && (i = this._toString(i, r)), i)
            }, CipherBase.prototype.setAutoPadding = function() {}, CipherBase.prototype.getAuthTag = function() {
                throw new Error("trying to get auth tag in unsupported state")
            }, CipherBase.prototype.setAuthTag = function() {
                throw new Error("trying to set auth tag in unsupported state")
            }, CipherBase.prototype.setAAD = function() {
                throw new Error("trying to set aad in unsupported state")
            }, CipherBase.prototype._transform = function(t, e, r) {
                var i;
                try {
                    this.hashMode ? this._update(t) : this.push(this._update(t))
                } catch (t) {
                    i = t
                } finally {
                    r(i)
                }
            }, CipherBase.prototype._flush = function(t) {
                var e;
                try {
                    this.push(this.__final())
                } catch (t) {
                    e = t
                }
                t(e)
            }, CipherBase.prototype._finalOrDigest = function(t) {
                var e = this.__final() || Buffer.alloc(0);
                return t && (e = this._toString(e, t, !0)), e
            }, CipherBase.prototype._toString = function(t, e, r) {
                if (this._decoder || (this._decoder = new StringDecoder(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
                var i = this._decoder.write(t);
                return r && (i += this._decoder.end()), i
            }, module.exports = CipherBase;

        }, {
            "inherits": 51,
            "safe-buffer": 82,
            "stream": 97,
            "string_decoder": 98
        }],
        10: [function(require, module, exports) {
            (function(Buffer) {
                function isArray(r) {
                    return Array.isArray ? Array.isArray(r) : "[object Array]" === objectToString(r)
                }

                function isBoolean(r) {
                    return "boolean" == typeof r
                }

                function isNull(r) {
                    return null === r
                }

                function isNullOrUndefined(r) {
                    return null == r
                }

                function isNumber(r) {
                    return "number" == typeof r
                }

                function isString(r) {
                    return "string" == typeof r
                }

                function isSymbol(r) {
                    return "symbol" == typeof r
                }

                function isUndefined(r) {
                    return void 0 === r
                }

                function isRegExp(r) {
                    return "[object RegExp]" === objectToString(r)
                }

                function isObject(r) {
                    return "object" == typeof r && null !== r
                }

                function isDate(r) {
                    return "[object Date]" === objectToString(r)
                }

                function isError(r) {
                    return "[object Error]" === objectToString(r) || r instanceof Error
                }

                function isFunction(r) {
                    return "function" == typeof r
                }

                function isPrimitive(r) {
                    return null === r || "boolean" == typeof r || "number" == typeof r || "string" == typeof r || "symbol" == typeof r || void 0 === r
                }

                function objectToString(r) {
                    return Object.prototype.toString.call(r)
                }
                exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = Buffer.isBuffer;

            }).call(this, {
                "isBuffer": require("../../is-buffer/index.js")
            })
        }, {
            "../../is-buffer/index.js": 52
        }],
        11: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function HashNoConstructor(s) {
                    Base.call(this, "digest"), this._hash = s, this.buffers = []
                }

                function Hash(s) {
                    Base.call(this, "digest"), this._hash = s
                }
                var inherits = require("inherits"),
                    md5 = require("./md5"),
                    RIPEMD160 = require("ripemd160"),
                    sha = require("sha.js"),
                    Base = require("cipher-base");
                inherits(HashNoConstructor, Base), HashNoConstructor.prototype._update = function(s) {
                    this.buffers.push(s)
                }, HashNoConstructor.prototype._final = function() {
                    var s = Buffer.concat(this.buffers),
                        t = this._hash(s);
                    return this.buffers = null, t
                }, inherits(Hash, Base), Hash.prototype._update = function(s) {
                    this._hash.update(s)
                }, Hash.prototype._final = function() {
                    return this._hash.digest()
                }, module.exports = function(s) {
                    return "md5" === (s = s.toLowerCase()) ? new HashNoConstructor(md5) : new Hash("rmd160" === s || "ripemd160" === s ? new RIPEMD160 : sha(s))
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "./md5": 13,
            "buffer": 8,
            "cipher-base": 9,
            "inherits": 51,
            "ripemd160": 80,
            "sha.js": 90
        }],
        12: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function toArray(e) {
                    if (e.length % intSize != 0) {
                        var r = e.length + (intSize - e.length % intSize);
                        e = Buffer.concat([e, zeroBuffer], r)
                    }
                    for (var t = new Array(e.length >>> 2), n = 0, i = 0; n < e.length; n += intSize, i++) t[i] = e.readInt32LE(n);
                    return t
                }
                var intSize = 4,
                    zeroBuffer = new Buffer(intSize);
                zeroBuffer.fill(0);
                var charSize = 8,
                    hashSize = 16;
                module.exports = function(e, r) {
                    var t = r(toArray(e), e.length * charSize);
                    e = new Buffer(hashSize);
                    for (var n = 0; n < t.length; n++) e.writeInt32LE(t[n], n << 2, !0);
                    return e
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "buffer": 8
        }],
        13: [function(require, module, exports) {
            "use strict";

            function core_md5(d, _) {
                d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
                for (var m = 1732584193, f = -271733879, i = -1732584194, h = 271733878, g = 0; g < d.length; g += 16) {
                    var n = m,
                        r = f,
                        e = i,
                        a = h;
                    f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, i = md5_ff(i, h = md5_ff(h, m = md5_ff(m, f, i, h, d[g + 0], 7, -680876936), f, i, d[g + 1], 12, -389564586), m, f, d[g + 2], 17, 606105819), h, m, d[g + 3], 22, -1044525330), i = md5_ff(i, h = md5_ff(h, m = md5_ff(m, f, i, h, d[g + 4], 7, -176418897), f, i, d[g + 5], 12, 1200080426), m, f, d[g + 6], 17, -1473231341), h, m, d[g + 7], 22, -45705983), i = md5_ff(i, h = md5_ff(h, m = md5_ff(m, f, i, h, d[g + 8], 7, 1770035416), f, i, d[g + 9], 12, -1958414417), m, f, d[g + 10], 17, -42063), h, m, d[g + 11], 22, -1990404162), i = md5_ff(i, h = md5_ff(h, m = md5_ff(m, f, i, h, d[g + 12], 7, 1804603682), f, i, d[g + 13], 12, -40341101), m, f, d[g + 14], 17, -1502002290), h, m, d[g + 15], 22, 1236535329), i = md5_gg(i, h = md5_gg(h, m = md5_gg(m, f, i, h, d[g + 1], 5, -165796510), f, i, d[g + 6], 9, -1069501632), m, f, d[g + 11], 14, 643717713), h, m, d[g + 0], 20, -373897302), i = md5_gg(i, h = md5_gg(h, m = md5_gg(m, f, i, h, d[g + 5], 5, -701558691), f, i, d[g + 10], 9, 38016083), m, f, d[g + 15], 14, -660478335), h, m, d[g + 4], 20, -405537848), i = md5_gg(i, h = md5_gg(h, m = md5_gg(m, f, i, h, d[g + 9], 5, 568446438), f, i, d[g + 14], 9, -1019803690), m, f, d[g + 3], 14, -187363961), h, m, d[g + 8], 20, 1163531501), i = md5_gg(i, h = md5_gg(h, m = md5_gg(m, f, i, h, d[g + 13], 5, -1444681467), f, i, d[g + 2], 9, -51403784), m, f, d[g + 7], 14, 1735328473), h, m, d[g + 12], 20, -1926607734), i = md5_hh(i, h = md5_hh(h, m = md5_hh(m, f, i, h, d[g + 5], 4, -378558), f, i, d[g + 8], 11, -2022574463), m, f, d[g + 11], 16, 1839030562), h, m, d[g + 14], 23, -35309556), i = md5_hh(i, h = md5_hh(h, m = md5_hh(m, f, i, h, d[g + 1], 4, -1530992060), f, i, d[g + 4], 11, 1272893353), m, f, d[g + 7], 16, -155497632), h, m, d[g + 10], 23, -1094730640), i = md5_hh(i, h = md5_hh(h, m = md5_hh(m, f, i, h, d[g + 13], 4, 681279174), f, i, d[g + 0], 11, -358537222), m, f, d[g + 3], 16, -722521979), h, m, d[g + 6], 23, 76029189), i = md5_hh(i, h = md5_hh(h, m = md5_hh(m, f, i, h, d[g + 9], 4, -640364487), f, i, d[g + 12], 11, -421815835), m, f, d[g + 15], 16, 530742520), h, m, d[g + 2], 23, -995338651), i = md5_ii(i, h = md5_ii(h, m = md5_ii(m, f, i, h, d[g + 0], 6, -198630844), f, i, d[g + 7], 10, 1126891415), m, f, d[g + 14], 15, -1416354905), h, m, d[g + 5], 21, -57434055), i = md5_ii(i, h = md5_ii(h, m = md5_ii(m, f, i, h, d[g + 12], 6, 1700485571), f, i, d[g + 3], 10, -1894986606), m, f, d[g + 10], 15, -1051523), h, m, d[g + 1], 21, -2054922799), i = md5_ii(i, h = md5_ii(h, m = md5_ii(m, f, i, h, d[g + 8], 6, 1873313359), f, i, d[g + 15], 10, -30611744), m, f, d[g + 6], 15, -1560198380), h, m, d[g + 13], 21, 1309151649), i = md5_ii(i, h = md5_ii(h, m = md5_ii(m, f, i, h, d[g + 4], 6, -145523070), f, i, d[g + 11], 10, -1120210379), m, f, d[g + 2], 15, 718787259), h, m, d[g + 9], 21, -343485551), m = safe_add(m, n), f = safe_add(f, r), i = safe_add(i, e), h = safe_add(h, a)
                }
                return [m, f, i, h]
            }

            function md5_cmn(d, _, m, f, i, h) {
                return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, h)), i), m)
            }

            function md5_ff(d, _, m, f, i, h, g) {
                return md5_cmn(_ & m | ~_ & f, d, _, i, h, g)
            }

            function md5_gg(d, _, m, f, i, h, g) {
                return md5_cmn(_ & f | m & ~f, d, _, i, h, g)
            }

            function md5_hh(d, _, m, f, i, h, g) {
                return md5_cmn(_ ^ m ^ f, d, _, i, h, g)
            }

            function md5_ii(d, _, m, f, i, h, g) {
                return md5_cmn(m ^ (_ | ~f), d, _, i, h, g)
            }

            function safe_add(d, _) {
                var m = (65535 & d) + (65535 & _);
                return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
            }

            function bit_rol(d, _) {
                return d << _ | d >>> 32 - _
            }
            var makeHash = require("./make-hash");
            module.exports = function(d) {
                return makeHash(d, core_md5)
            };

        }, {
            "./make-hash": 12
        }],
        14: [function(require, module, exports) {
            "use strict";
            var elliptic = exports;
            elliptic.version = require("../package.json").version, elliptic.utils = require("./elliptic/utils"), elliptic.rand = require("brorand"), elliptic.curve = require("./elliptic/curve"), elliptic.curves = require("./elliptic/curves"), elliptic.ec = require("./elliptic/ec"), elliptic.eddsa = require("./elliptic/eddsa");

        }, {
            "../package.json": 29,
            "./elliptic/curve": 17,
            "./elliptic/curves": 20,
            "./elliptic/ec": 21,
            "./elliptic/eddsa": 24,
            "./elliptic/utils": 28,
            "brorand": 5
        }],
        15: [function(require, module, exports) {
            "use strict";

            function BaseCurve(t, e) {
                this.type = t, this.p = new BN(e.p, 16), this.red = e.prime ? BN.red(e.prime) : BN.mont(this.p), this.zero = new BN(0).toRed(this.red), this.one = new BN(1).toRed(this.red), this.two = new BN(2).toRed(this.red), this.n = e.n && new BN(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
                var n = this.n && this.p.div(this.n);
                !n || n.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
            }

            function BasePoint(t, e) {
                this.curve = t, this.type = e, this.precomputed = null
            }
            var BN = require("bn.js"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                getNAF = utils.getNAF,
                getJSF = utils.getJSF,
                assert = utils.assert;
            module.exports = BaseCurve, BaseCurve.prototype.point = function() {
                throw new Error("Not implemented")
            }, BaseCurve.prototype.validate = function() {
                throw new Error("Not implemented")
            }, BaseCurve.prototype._fixedNafMul = function(t, e) {
                assert(t.precomputed);
                var n = t._getDoubles(),
                    r = getNAF(e, 1),
                    i = (1 << n.step + 1) - (n.step % 2 == 0 ? 2 : 1);
                i /= 3;
                for (var o = [], s = 0; s < r.length; s += n.step) {
                    for (var a = 0, e = s + n.step - 1; e >= s; e--) a = (a << 1) + r[e];
                    o.push(a)
                }
                for (var p = this.jpoint(null, null, null), u = this.jpoint(null, null, null), d = i; d > 0; d--) {
                    for (s = 0; s < o.length; s++)(a = o[s]) === d ? u = u.mixedAdd(n.points[s]) : a === -d && (u = u.mixedAdd(n.points[s].neg()));
                    p = p.add(u)
                }
                return p.toP()
            }, BaseCurve.prototype._wnafMul = function(t, e) {
                var n = 4,
                    r = t._getNAFPoints(n);
                n = r.wnd;
                for (var i = r.points, o = getNAF(e, n), s = this.jpoint(null, null, null), a = o.length - 1; a >= 0; a--) {
                    for (var e = 0; a >= 0 && 0 === o[a]; a--) e++;
                    if (a >= 0 && e++, s = s.dblp(e), a < 0) break;
                    var p = o[a];
                    assert(0 !== p), s = "affine" === t.type ? p > 0 ? s.mixedAdd(i[p - 1 >> 1]) : s.mixedAdd(i[-p - 1 >> 1].neg()) : p > 0 ? s.add(i[p - 1 >> 1]) : s.add(i[-p - 1 >> 1].neg())
                }
                return "affine" === t.type ? s.toP() : s
            }, BaseCurve.prototype._wnafMulAdd = function(t, e, n, r, i) {
                for (var o = this._wnafT1, s = this._wnafT2, a = this._wnafT3, p = 0, u = 0; u < r; u++) {
                    var d = (N = e[u])._getNAFPoints(t);
                    o[u] = d.wnd, s[u] = d.points
                }
                for (u = r - 1; u >= 1; u -= 2) {
                    var l = u - 1,
                        h = u;
                    if (1 === o[l] && 1 === o[h]) {
                        var f = [e[l], null, null, e[h]];
                        0 === e[l].y.cmp(e[h].y) ? (f[1] = e[l].add(e[h]), f[2] = e[l].toJ().mixedAdd(e[h].neg())) : 0 === e[l].y.cmp(e[h].y.redNeg()) ? (f[1] = e[l].toJ().mixedAdd(e[h]), f[2] = e[l].add(e[h].neg())) : (f[1] = e[l].toJ().mixedAdd(e[h]), f[2] = e[l].toJ().mixedAdd(e[h].neg()));
                        var c = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                            g = getJSF(n[l], n[h]);
                        p = Math.max(g[0].length, p), a[l] = new Array(p), a[h] = new Array(p);
                        for (b = 0; b < p; b++) {
                            var v = 0 | g[0][b],
                                m = 0 | g[1][b];
                            a[l][b] = c[3 * (v + 1) + (m + 1)], a[h][b] = 0, s[l] = f
                        }
                    } else a[l] = getNAF(n[l], o[l]), a[h] = getNAF(n[h], o[h]), p = Math.max(a[l].length, p), p = Math.max(a[h].length, p)
                }
                for (var y = this.jpoint(null, null, null), w = this._wnafT4, u = p; u >= 0; u--) {
                    for (var B = 0; u >= 0;) {
                        for (var A = !0, b = 0; b < r; b++) w[b] = 0 | a[b][u], 0 !== w[b] && (A = !1);
                        if (!A) break;
                        B++, u--
                    }
                    if (u >= 0 && B++, y = y.dblp(B), u < 0) break;
                    for (b = 0; b < r; b++) {
                        var N, _ = w[b];
                        0 !== _ && (_ > 0 ? N = s[b][_ - 1 >> 1] : _ < 0 && (N = s[b][-_ - 1 >> 1].neg()), y = "affine" === N.type ? y.mixedAdd(N) : y.add(N))
                    }
                }
                for (u = 0; u < r; u++) s[u] = null;
                return i ? y : y.toP()
            }, BaseCurve.BasePoint = BasePoint, BasePoint.prototype.eq = function() {
                throw new Error("Not implemented")
            }, BasePoint.prototype.validate = function() {
                return this.curve.validate(this)
            }, BaseCurve.prototype.decodePoint = function(t, e) {
                t = utils.toArray(t, e);
                var n = this.p.byteLength();
                if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * n) return 6 === t[0] ? assert(t[t.length - 1] % 2 == 0) : 7 === t[0] && assert(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + n), t.slice(1 + n, 1 + 2 * n));
                if ((2 === t[0] || 3 === t[0]) && t.length - 1 === n) return this.pointFromX(t.slice(1, 1 + n), 3 === t[0]);
                throw new Error("Unknown point format")
            }, BasePoint.prototype.encodeCompressed = function(t) {
                return this.encode(t, !0)
            }, BasePoint.prototype._encode = function(t) {
                var e = this.curve.p.byteLength(),
                    n = this.getX().toArray("be", e);
                return t ? [this.getY().isEven() ? 2 : 3].concat(n) : [4].concat(n, this.getY().toArray("be", e))
            }, BasePoint.prototype.encode = function(t, e) {
                return utils.encode(this._encode(e), t)
            }, BasePoint.prototype.precompute = function(t) {
                if (this.precomputed) return this;
                var e = {
                    doubles: null,
                    naf: null,
                    beta: null
                };
                return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
            }, BasePoint.prototype._hasDoubles = function(t) {
                if (!this.precomputed) return !1;
                var e = this.precomputed.doubles;
                return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
            }, BasePoint.prototype._getDoubles = function(t, e) {
                if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
                for (var n = [this], r = this, i = 0; i < e; i += t) {
                    for (var o = 0; o < t; o++) r = r.dbl();
                    n.push(r)
                }
                return {
                    step: t,
                    points: n
                }
            }, BasePoint.prototype._getNAFPoints = function(t) {
                if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
                for (var e = [this], n = (1 << t) - 1, r = 1 === n ? null : this.dbl(), i = 1; i < n; i++) e[i] = e[i - 1].add(r);
                return {
                    wnd: t,
                    points: e
                }
            }, BasePoint.prototype._getBeta = function() {
                return null
            }, BasePoint.prototype.dblp = function(t) {
                for (var e = this, n = 0; n < t; n++) e = e.dbl();
                return e
            };

        }, {
            "../../elliptic": 14,
            "bn.js": 4
        }],
        16: [function(require, module, exports) {
            "use strict";

            function EdwardsCurve(t) {
                this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, Base.call(this, "edwards", t), this.a = new BN(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new BN(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new BN(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), assert(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
            }

            function Point(t, r, e, i, d) {
                Base.BasePoint.call(this, t, "projective"), null === r && null === e && null === i ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new BN(r, 16), this.y = new BN(e, 16), this.z = i ? new BN(i, 16) : this.curve.one, this.t = d && new BN(d, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
            }
            var curve = require("../curve"),
                elliptic = require("../../elliptic"),
                BN = require("bn.js"),
                inherits = require("inherits"),
                Base = curve.base,
                assert = elliptic.utils.assert;
            inherits(EdwardsCurve, Base), module.exports = EdwardsCurve, EdwardsCurve.prototype._mulA = function(t) {
                return this.mOneA ? t.redNeg() : this.a.redMul(t)
            }, EdwardsCurve.prototype._mulC = function(t) {
                return this.oneC ? t : this.c.redMul(t)
            }, EdwardsCurve.prototype.jpoint = function(t, r, e, i) {
                return this.point(t, r, e, i)
            }, EdwardsCurve.prototype.pointFromX = function(t, r) {
                (t = new BN(t, 16)).red || (t = t.toRed(this.red));
                var e = t.redSqr(),
                    i = this.c2.redSub(this.a.redMul(e)),
                    d = this.one.redSub(this.c2.redMul(this.d).redMul(e)),
                    s = i.redMul(d.redInvm()),
                    u = s.redSqrt();
                if (0 !== u.redSqr().redSub(s).cmp(this.zero)) throw new Error("invalid point");
                var n = u.fromRed().isOdd();
                return (r && !n || !r && n) && (u = u.redNeg()), this.point(t, u)
            }, EdwardsCurve.prototype.pointFromY = function(t, r) {
                (t = new BN(t, 16)).red || (t = t.toRed(this.red));
                var e = t.redSqr(),
                    i = e.redSub(this.one),
                    d = e.redMul(this.d).redAdd(this.one),
                    s = i.redMul(d.redInvm());
                if (0 === s.cmp(this.zero)) {
                    if (r) throw new Error("invalid point");
                    return this.point(this.zero, t)
                }
                var u = s.redSqrt();
                if (0 !== u.redSqr().redSub(s).cmp(this.zero)) throw new Error("invalid point");
                return u.isOdd() !== r && (u = u.redNeg()), this.point(u, t)
            }, EdwardsCurve.prototype.validate = function(t) {
                if (t.isInfinity()) return !0;
                t.normalize();
                var r = t.x.redSqr(),
                    e = t.y.redSqr(),
                    i = r.redMul(this.a).redAdd(e),
                    d = this.c2.redMul(this.one.redAdd(this.d.redMul(r).redMul(e)));
                return 0 === i.cmp(d)
            }, inherits(Point, Base.BasePoint), EdwardsCurve.prototype.pointFromJSON = function(t) {
                return Point.fromJSON(this, t)
            }, EdwardsCurve.prototype.point = function(t, r, e, i) {
                return new Point(this, t, r, e, i)
            }, Point.fromJSON = function(t, r) {
                return new Point(t, r[0], r[1], r[2])
            }, Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
            }, Point.prototype.isInfinity = function() {
                return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
            }, Point.prototype._extDbl = function() {
                var t = this.x.redSqr(),
                    r = this.y.redSqr(),
                    e = this.z.redSqr();
                e = e.redIAdd(e);
                var i = this.curve._mulA(t),
                    d = this.x.redAdd(this.y).redSqr().redISub(t).redISub(r),
                    s = i.redAdd(r),
                    u = s.redSub(e),
                    n = i.redSub(r),
                    h = d.redMul(u),
                    o = s.redMul(n),
                    l = d.redMul(n),
                    c = u.redMul(s);
                return this.curve.point(h, o, c, l)
            }, Point.prototype._projDbl = function() {
                var t, r, e, i = this.x.redAdd(this.y).redSqr(),
                    d = this.x.redSqr(),
                    s = this.y.redSqr();
                if (this.curve.twisted) {
                    var u = (o = this.curve._mulA(d)).redAdd(s);
                    if (this.zOne) t = i.redSub(d).redSub(s).redMul(u.redSub(this.curve.two)), r = u.redMul(o.redSub(s)), e = u.redSqr().redSub(u).redSub(u);
                    else {
                        var n = this.z.redSqr(),
                            h = u.redSub(n).redISub(n);
                        t = i.redSub(d).redISub(s).redMul(h), r = u.redMul(o.redSub(s)), e = u.redMul(h)
                    }
                } else {
                    var o = d.redAdd(s),
                        n = this.curve._mulC(this.c.redMul(this.z)).redSqr(),
                        h = o.redSub(n).redSub(n);
                    t = this.curve._mulC(i.redISub(o)).redMul(h), r = this.curve._mulC(o).redMul(d.redISub(s)), e = o.redMul(h)
                }
                return this.curve.point(t, r, e)
            }, Point.prototype.dbl = function() {
                return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
            }, Point.prototype._extAdd = function(t) {
                var r = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
                    e = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
                    i = this.t.redMul(this.curve.dd).redMul(t.t),
                    d = this.z.redMul(t.z.redAdd(t.z)),
                    s = e.redSub(r),
                    u = d.redSub(i),
                    n = d.redAdd(i),
                    h = e.redAdd(r),
                    o = s.redMul(u),
                    l = n.redMul(h),
                    c = s.redMul(h),
                    p = u.redMul(n);
                return this.curve.point(o, l, p, c)
            }, Point.prototype._projAdd = function(t) {
                var r, e, i = this.z.redMul(t.z),
                    d = i.redSqr(),
                    s = this.x.redMul(t.x),
                    u = this.y.redMul(t.y),
                    n = this.curve.d.redMul(s).redMul(u),
                    h = d.redSub(n),
                    o = d.redAdd(n),
                    l = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(u),
                    c = i.redMul(h).redMul(l);
                return this.curve.twisted ? (r = i.redMul(o).redMul(u.redSub(this.curve._mulA(s))), e = h.redMul(o)) : (r = i.redMul(o).redMul(u.redSub(s)), e = this.curve._mulC(h).redMul(o)), this.curve.point(c, r, e)
            }, Point.prototype.add = function(t) {
                return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
            }, Point.prototype.mul = function(t) {
                return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
            }, Point.prototype.mulAdd = function(t, r, e) {
                return this.curve._wnafMulAdd(1, [this, r], [t, e], 2, !1)
            }, Point.prototype.jmulAdd = function(t, r, e) {
                return this.curve._wnafMulAdd(1, [this, r], [t, e], 2, !0)
            }, Point.prototype.normalize = function() {
                if (this.zOne) return this;
                var t = this.z.redInvm();
                return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
            }, Point.prototype.neg = function() {
                return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
            }, Point.prototype.getX = function() {
                return this.normalize(), this.x.fromRed()
            }, Point.prototype.getY = function() {
                return this.normalize(), this.y.fromRed()
            }, Point.prototype.eq = function(t) {
                return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
            }, Point.prototype.eqXToP = function(t) {
                var r = t.toRed(this.curve.red).redMul(this.z);
                if (0 === this.x.cmp(r)) return !0;
                for (var e = t.clone(), i = this.curve.redN.redMul(this.z);;) {
                    if (e.iadd(this.curve.n), e.cmp(this.curve.p) >= 0) return !1;
                    if (r.redIAdd(i), 0 === this.x.cmp(r)) return !0
                }
                return !1
            }, Point.prototype.toP = Point.prototype.normalize, Point.prototype.mixedAdd = Point.prototype.add;

        }, {
            "../../elliptic": 14,
            "../curve": 17,
            "bn.js": 4,
            "inherits": 51
        }],
        17: [function(require, module, exports) {
            "use strict";
            var curve = exports;
            curve.base = require("./base"), curve.short = require("./short"), curve.mont = require("./mont"), curve.edwards = require("./edwards");

        }, {
            "./base": 15,
            "./edwards": 16,
            "./mont": 18,
            "./short": 19
        }],
        18: [function(require, module, exports) {
            "use strict";

            function MontCurve(t) {
                Base.call(this, "mont", t), this.a = new BN(t.a, 16).toRed(this.red), this.b = new BN(t.b, 16).toRed(this.red), this.i4 = new BN(4).toRed(this.red).redInvm(), this.two = new BN(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
            }

            function Point(t, r, e) {
                Base.BasePoint.call(this, t, "projective"), null === r && null === e ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new BN(r, 16), this.z = new BN(e, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
            }
            var curve = require("../curve"),
                BN = require("bn.js"),
                inherits = require("inherits"),
                Base = curve.base,
                elliptic = require("../../elliptic"),
                utils = elliptic.utils;
            inherits(MontCurve, Base), module.exports = MontCurve, MontCurve.prototype.validate = function(t) {
                var r = t.normalize().x,
                    e = r.redSqr(),
                    i = e.redMul(r).redAdd(e.redMul(this.a)).redAdd(r);
                return 0 === i.redSqrt().redSqr().cmp(i)
            }, inherits(Point, Base.BasePoint), MontCurve.prototype.decodePoint = function(t, r) {
                return this.point(utils.toArray(t, r), 1)
            }, MontCurve.prototype.point = function(t, r) {
                return new Point(this, t, r)
            }, MontCurve.prototype.pointFromJSON = function(t) {
                return Point.fromJSON(this, t)
            }, Point.prototype.precompute = function() {}, Point.prototype._encode = function() {
                return this.getX().toArray("be", this.curve.p.byteLength())
            }, Point.fromJSON = function(t, r) {
                return new Point(t, r[0], r[1] || t.one)
            }, Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
            }, Point.prototype.isInfinity = function() {
                return 0 === this.z.cmpn(0)
            }, Point.prototype.dbl = function() {
                var t = this.x.redAdd(this.z).redSqr(),
                    r = this.x.redSub(this.z).redSqr(),
                    e = t.redSub(r),
                    i = t.redMul(r),
                    o = e.redMul(r.redAdd(this.curve.a24.redMul(e)));
                return this.curve.point(i, o)
            }, Point.prototype.add = function() {
                throw new Error("Not supported on Montgomery curve")
            }, Point.prototype.diffAdd = function(t, r) {
                var e = this.x.redAdd(this.z),
                    i = this.x.redSub(this.z),
                    o = t.x.redAdd(t.z),
                    n = t.x.redSub(t.z).redMul(e),
                    u = o.redMul(i),
                    d = r.z.redMul(n.redAdd(u).redSqr()),
                    s = r.x.redMul(n.redISub(u).redSqr());
                return this.curve.point(d, s)
            }, Point.prototype.mul = function(t) {
                for (var r = t.clone(), e = this, i = this.curve.point(null, null), o = this, n = []; 0 !== r.cmpn(0); r.iushrn(1)) n.push(r.andln(1));
                for (var u = n.length - 1; u >= 0; u--) 0 === n[u] ? (e = e.diffAdd(i, o), i = i.dbl()) : (i = e.diffAdd(i, o), e = e.dbl());
                return i
            }, Point.prototype.mulAdd = function() {
                throw new Error("Not supported on Montgomery curve")
            }, Point.prototype.jumlAdd = function() {
                throw new Error("Not supported on Montgomery curve")
            }, Point.prototype.eq = function(t) {
                return 0 === this.getX().cmp(t.getX())
            }, Point.prototype.normalize = function() {
                return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
            }, Point.prototype.getX = function() {
                return this.normalize(), this.x.fromRed()
            };

        }, {
            "../../elliptic": 14,
            "../curve": 17,
            "bn.js": 4,
            "inherits": 51
        }],
        19: [function(require, module, exports) {
            "use strict";

            function ShortCurve(r) {
                Base.call(this, "short", r), this.a = new BN(r.a, 16).toRed(this.red), this.b = new BN(r.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(r), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
            }

            function Point(r, e, t, d) {
                Base.BasePoint.call(this, r, "affine"), null === e && null === t ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new BN(e, 16), this.y = new BN(t, 16), d && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
            }

            function JPoint(r, e, t, d) {
                Base.BasePoint.call(this, r, "jacobian"), null === e && null === t && null === d ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new BN(0)) : (this.x = new BN(e, 16), this.y = new BN(t, 16), this.z = new BN(d, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
            }
            var curve = require("../curve"),
                elliptic = require("../../elliptic"),
                BN = require("bn.js"),
                inherits = require("inherits"),
                Base = curve.base,
                assert = elliptic.utils.assert;
            inherits(ShortCurve, Base), module.exports = ShortCurve, ShortCurve.prototype._getEndomorphism = function(r) {
                if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                    var e, t;
                    if (r.beta) e = new BN(r.beta, 16).toRed(this.red);
                    else {
                        var d = this._getEndoRoots(this.p);
                        e = (e = d[0].cmp(d[1]) < 0 ? d[0] : d[1]).toRed(this.red)
                    }
                    if (r.lambda) t = new BN(r.lambda, 16);
                    else {
                        var i = this._getEndoRoots(this.n);
                        0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(e)) ? t = i[0] : (t = i[1], assert(0 === this.g.mul(t).x.cmp(this.g.x.redMul(e))))
                    }
                    var n;
                    return n = r.basis ? r.basis.map(function(r) {
                        return {
                            a: new BN(r.a, 16),
                            b: new BN(r.b, 16)
                        }
                    }) : this._getEndoBasis(t), {
                        beta: e,
                        lambda: t,
                        basis: n
                    }
                }
            }, ShortCurve.prototype._getEndoRoots = function(r) {
                var e = r === this.p ? this.red : BN.mont(r),
                    t = new BN(2).toRed(e).redInvm(),
                    d = t.redNeg(),
                    i = new BN(3).toRed(e).redNeg().redSqrt().redMul(t);
                return [d.redAdd(i).fromRed(), d.redSub(i).fromRed()]
            }, ShortCurve.prototype._getEndoBasis = function(r) {
                for (var e, t, d, i, n, u, s, o, h, l = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), p = r, a = this.n.clone(), c = new BN(1), f = new BN(0), v = new BN(0), S = new BN(1), b = 0; 0 !== p.cmpn(0);) {
                    var I = a.div(p);
                    o = a.sub(I.mul(p)), h = v.sub(I.mul(c));
                    var y = S.sub(I.mul(f));
                    if (!d && o.cmp(l) < 0) e = s.neg(), t = c, d = o.neg(), i = h;
                    else if (d && 2 == ++b) break;
                    s = o, a = p, p = o, v = c, c = h, S = f, f = y
                }
                n = o.neg(), u = h;
                var A = d.sqr().add(i.sqr());
                return n.sqr().add(u.sqr()).cmp(A) >= 0 && (n = e, u = t), d.negative && (d = d.neg(), i = i.neg()), n.negative && (n = n.neg(), u = u.neg()), [{
                    a: d,
                    b: i
                }, {
                    a: n,
                    b: u
                }]
            }, ShortCurve.prototype._endoSplit = function(r) {
                var e = this.endo.basis,
                    t = e[0],
                    d = e[1],
                    i = d.b.mul(r).divRound(this.n),
                    n = t.b.neg().mul(r).divRound(this.n),
                    u = i.mul(t.a),
                    s = n.mul(d.a),
                    o = i.mul(t.b),
                    h = n.mul(d.b);
                return {
                    k1: r.sub(u).sub(s),
                    k2: o.add(h).neg()
                }
            }, ShortCurve.prototype.pointFromX = function(r, e) {
                (r = new BN(r, 16)).red || (r = r.toRed(this.red));
                var t = r.redSqr().redMul(r).redIAdd(r.redMul(this.a)).redIAdd(this.b),
                    d = t.redSqrt();
                if (0 !== d.redSqr().redSub(t).cmp(this.zero)) throw new Error("invalid point");
                var i = d.fromRed().isOdd();
                return (e && !i || !e && i) && (d = d.redNeg()), this.point(r, d)
            }, ShortCurve.prototype.validate = function(r) {
                if (r.inf) return !0;
                var e = r.x,
                    t = r.y,
                    d = this.a.redMul(e),
                    i = e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);
                return 0 === t.redSqr().redISub(i).cmpn(0)
            }, ShortCurve.prototype._endoWnafMulAdd = function(r, e, t) {
                for (var d = this._endoWnafT1, i = this._endoWnafT2, n = 0; n < r.length; n++) {
                    var u = this._endoSplit(e[n]),
                        s = r[n],
                        o = s._getBeta();
                    u.k1.negative && (u.k1.ineg(), s = s.neg(!0)), u.k2.negative && (u.k2.ineg(), o = o.neg(!0)), d[2 * n] = s, d[2 * n + 1] = o, i[2 * n] = u.k1, i[2 * n + 1] = u.k2
                }
                for (var h = this._wnafMulAdd(1, d, i, 2 * n, t), l = 0; l < 2 * n; l++) d[l] = null, i[l] = null;
                return h
            }, inherits(Point, Base.BasePoint), ShortCurve.prototype.point = function(r, e, t) {
                return new Point(this, r, e, t)
            }, ShortCurve.prototype.pointFromJSON = function(r, e) {
                return Point.fromJSON(this, r, e)
            }, Point.prototype._getBeta = function() {
                if (this.curve.endo) {
                    var r = this.precomputed;
                    if (r && r.beta) return r.beta;
                    var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                    if (r) {
                        var t = this.curve,
                            d = function(r) {
                                return t.point(r.x.redMul(t.endo.beta), r.y)
                            };
                        r.beta = e, e.precomputed = {
                            beta: null,
                            naf: r.naf && {
                                wnd: r.naf.wnd,
                                points: r.naf.points.map(d)
                            },
                            doubles: r.doubles && {
                                step: r.doubles.step,
                                points: r.doubles.points.map(d)
                            }
                        }
                    }
                    return e
                }
            }, Point.prototype.toJSON = function() {
                return this.precomputed ? [this.x, this.y, this.precomputed && {
                    doubles: this.precomputed.doubles && {
                        step: this.precomputed.doubles.step,
                        points: this.precomputed.doubles.points.slice(1)
                    },
                    naf: this.precomputed.naf && {
                        wnd: this.precomputed.naf.wnd,
                        points: this.precomputed.naf.points.slice(1)
                    }
                }] : [this.x, this.y]
            }, Point.fromJSON = function(r, e, t) {
                function d(e) {
                    return r.point(e[0], e[1], t)
                }
                "string" == typeof e && (e = JSON.parse(e));
                var i = r.point(e[0], e[1], t);
                if (!e[2]) return i;
                var n = e[2];
                return i.precomputed = {
                    beta: null,
                    doubles: n.doubles && {
                        step: n.doubles.step,
                        points: [i].concat(n.doubles.points.map(d))
                    },
                    naf: n.naf && {
                        wnd: n.naf.wnd,
                        points: [i].concat(n.naf.points.map(d))
                    }
                }, i
            }, Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
            }, Point.prototype.isInfinity = function() {
                return this.inf
            }, Point.prototype.add = function(r) {
                if (this.inf) return r;
                if (r.inf) return this;
                if (this.eq(r)) return this.dbl();
                if (this.neg().eq(r)) return this.curve.point(null, null);
                if (0 === this.x.cmp(r.x)) return this.curve.point(null, null);
                var e = this.y.redSub(r.y);
                0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(r.x).redInvm()));
                var t = e.redSqr().redISub(this.x).redISub(r.x),
                    d = e.redMul(this.x.redSub(t)).redISub(this.y);
                return this.curve.point(t, d)
            }, Point.prototype.dbl = function() {
                if (this.inf) return this;
                var r = this.y.redAdd(this.y);
                if (0 === r.cmpn(0)) return this.curve.point(null, null);
                var e = this.curve.a,
                    t = this.x.redSqr(),
                    d = r.redInvm(),
                    i = t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),
                    n = i.redSqr().redISub(this.x.redAdd(this.x)),
                    u = i.redMul(this.x.redSub(n)).redISub(this.y);
                return this.curve.point(n, u)
            }, Point.prototype.getX = function() {
                return this.x.fromRed()
            }, Point.prototype.getY = function() {
                return this.y.fromRed()
            }, Point.prototype.mul = function(r) {
                return r = new BN(r, 16), this._hasDoubles(r) ? this.curve._fixedNafMul(this, r) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [r]) : this.curve._wnafMul(this, r)
            }, Point.prototype.mulAdd = function(r, e, t) {
                var d = [this, e],
                    i = [r, t];
                return this.curve.endo ? this.curve._endoWnafMulAdd(d, i) : this.curve._wnafMulAdd(1, d, i, 2)
            }, Point.prototype.jmulAdd = function(r, e, t) {
                var d = [this, e],
                    i = [r, t];
                return this.curve.endo ? this.curve._endoWnafMulAdd(d, i, !0) : this.curve._wnafMulAdd(1, d, i, 2, !0)
            }, Point.prototype.eq = function(r) {
                return this === r || this.inf === r.inf && (this.inf || 0 === this.x.cmp(r.x) && 0 === this.y.cmp(r.y))
            }, Point.prototype.neg = function(r) {
                if (this.inf) return this;
                var e = this.curve.point(this.x, this.y.redNeg());
                if (r && this.precomputed) {
                    var t = this.precomputed,
                        d = function(r) {
                            return r.neg()
                        };
                    e.precomputed = {
                        naf: t.naf && {
                            wnd: t.naf.wnd,
                            points: t.naf.points.map(d)
                        },
                        doubles: t.doubles && {
                            step: t.doubles.step,
                            points: t.doubles.points.map(d)
                        }
                    }
                }
                return e
            }, Point.prototype.toJ = function() {
                return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
            }, inherits(JPoint, Base.BasePoint), ShortCurve.prototype.jpoint = function(r, e, t) {
                return new JPoint(this, r, e, t)
            }, JPoint.prototype.toP = function() {
                if (this.isInfinity()) return this.curve.point(null, null);
                var r = this.z.redInvm(),
                    e = r.redSqr(),
                    t = this.x.redMul(e),
                    d = this.y.redMul(e).redMul(r);
                return this.curve.point(t, d)
            }, JPoint.prototype.neg = function() {
                return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
            }, JPoint.prototype.add = function(r) {
                if (this.isInfinity()) return r;
                if (r.isInfinity()) return this;
                var e = r.z.redSqr(),
                    t = this.z.redSqr(),
                    d = this.x.redMul(e),
                    i = r.x.redMul(t),
                    n = this.y.redMul(e.redMul(r.z)),
                    u = r.y.redMul(t.redMul(this.z)),
                    s = d.redSub(i),
                    o = n.redSub(u);
                if (0 === s.cmpn(0)) return 0 !== o.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
                var h = s.redSqr(),
                    l = h.redMul(s),
                    p = d.redMul(h),
                    a = o.redSqr().redIAdd(l).redISub(p).redISub(p),
                    c = o.redMul(p.redISub(a)).redISub(n.redMul(l)),
                    f = this.z.redMul(r.z).redMul(s);
                return this.curve.jpoint(a, c, f)
            }, JPoint.prototype.mixedAdd = function(r) {
                if (this.isInfinity()) return r.toJ();
                if (r.isInfinity()) return this;
                var e = this.z.redSqr(),
                    t = this.x,
                    d = r.x.redMul(e),
                    i = this.y,
                    n = r.y.redMul(e).redMul(this.z),
                    u = t.redSub(d),
                    s = i.redSub(n);
                if (0 === u.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
                var o = u.redSqr(),
                    h = o.redMul(u),
                    l = t.redMul(o),
                    p = s.redSqr().redIAdd(h).redISub(l).redISub(l),
                    a = s.redMul(l.redISub(p)).redISub(i.redMul(h)),
                    c = this.z.redMul(u);
                return this.curve.jpoint(p, a, c)
            }, JPoint.prototype.dblp = function(r) {
                if (0 === r) return this;
                if (this.isInfinity()) return this;
                if (!r) return this.dbl();
                if (this.curve.zeroA || this.curve.threeA) {
                    for (var e = this, t = 0; t < r; t++) e = e.dbl();
                    return e
                }
                for (var d = this.curve.a, i = this.curve.tinv, n = this.x, u = this.y, s = this.z, o = s.redSqr().redSqr(), h = u.redAdd(u), t = 0; t < r; t++) {
                    var l = n.redSqr(),
                        p = h.redSqr(),
                        a = p.redSqr(),
                        c = l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),
                        f = n.redMul(p),
                        v = c.redSqr().redISub(f.redAdd(f)),
                        S = f.redISub(v),
                        b = c.redMul(S);
                    b = b.redIAdd(b).redISub(a);
                    var I = h.redMul(s);
                    t + 1 < r && (o = o.redMul(a)), n = v, s = I, h = b
                }
                return this.curve.jpoint(n, h.redMul(i), s)
            }, JPoint.prototype.dbl = function() {
                return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
            }, JPoint.prototype._zeroDbl = function() {
                var r, e, t;
                if (this.zOne) {
                    var d = this.x.redSqr(),
                        i = this.y.redSqr(),
                        n = i.redSqr(),
                        u = this.x.redAdd(i).redSqr().redISub(d).redISub(n);
                    u = u.redIAdd(u);
                    var s = d.redAdd(d).redIAdd(d),
                        o = s.redSqr().redISub(u).redISub(u),
                        h = n.redIAdd(n);
                    h = (h = h.redIAdd(h)).redIAdd(h), r = o, e = s.redMul(u.redISub(o)).redISub(h), t = this.y.redAdd(this.y)
                } else {
                    var l = this.x.redSqr(),
                        p = this.y.redSqr(),
                        a = p.redSqr(),
                        c = this.x.redAdd(p).redSqr().redISub(l).redISub(a);
                    c = c.redIAdd(c);
                    var f = l.redAdd(l).redIAdd(l),
                        v = f.redSqr(),
                        S = a.redIAdd(a);
                    S = (S = S.redIAdd(S)).redIAdd(S), r = v.redISub(c).redISub(c), e = f.redMul(c.redISub(r)).redISub(S), t = (t = this.y.redMul(this.z)).redIAdd(t)
                }
                return this.curve.jpoint(r, e, t)
            }, JPoint.prototype._threeDbl = function() {
                var r, e, t;
                if (this.zOne) {
                    var d = this.x.redSqr(),
                        i = this.y.redSqr(),
                        n = i.redSqr(),
                        u = this.x.redAdd(i).redSqr().redISub(d).redISub(n);
                    u = u.redIAdd(u);
                    var s = d.redAdd(d).redIAdd(d).redIAdd(this.curve.a),
                        o = s.redSqr().redISub(u).redISub(u);
                    r = o;
                    var h = n.redIAdd(n);
                    h = (h = h.redIAdd(h)).redIAdd(h), e = s.redMul(u.redISub(o)).redISub(h), t = this.y.redAdd(this.y)
                } else {
                    var l = this.z.redSqr(),
                        p = this.y.redSqr(),
                        a = this.x.redMul(p),
                        c = this.x.redSub(l).redMul(this.x.redAdd(l));
                    c = c.redAdd(c).redIAdd(c);
                    var f = a.redIAdd(a),
                        v = (f = f.redIAdd(f)).redAdd(f);
                    r = c.redSqr().redISub(v), t = this.y.redAdd(this.z).redSqr().redISub(p).redISub(l);
                    var S = p.redSqr();
                    S = (S = (S = S.redIAdd(S)).redIAdd(S)).redIAdd(S), e = c.redMul(f.redISub(r)).redISub(S)
                }
                return this.curve.jpoint(r, e, t)
            }, JPoint.prototype._dbl = function() {
                var r = this.curve.a,
                    e = this.x,
                    t = this.y,
                    d = this.z,
                    i = d.redSqr().redSqr(),
                    n = e.redSqr(),
                    u = t.redSqr(),
                    s = n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),
                    o = e.redAdd(e),
                    h = (o = o.redIAdd(o)).redMul(u),
                    l = s.redSqr().redISub(h.redAdd(h)),
                    p = h.redISub(l),
                    a = u.redSqr();
                a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a);
                var c = s.redMul(p).redISub(a),
                    f = t.redAdd(t).redMul(d);
                return this.curve.jpoint(l, c, f)
            }, JPoint.prototype.trpl = function() {
                if (!this.curve.zeroA) return this.dbl().add(this);
                var r = this.x.redSqr(),
                    e = this.y.redSqr(),
                    t = this.z.redSqr(),
                    d = e.redSqr(),
                    i = r.redAdd(r).redIAdd(r),
                    n = i.redSqr(),
                    u = this.x.redAdd(e).redSqr().redISub(r).redISub(d),
                    s = (u = (u = (u = u.redIAdd(u)).redAdd(u).redIAdd(u)).redISub(n)).redSqr(),
                    o = d.redIAdd(d);
                o = (o = (o = o.redIAdd(o)).redIAdd(o)).redIAdd(o);
                var h = i.redIAdd(u).redSqr().redISub(n).redISub(s).redISub(o),
                    l = e.redMul(h);
                l = (l = l.redIAdd(l)).redIAdd(l);
                var p = this.x.redMul(s).redISub(l);
                p = (p = p.redIAdd(p)).redIAdd(p);
                var a = this.y.redMul(h.redMul(o.redISub(h)).redISub(u.redMul(s)));
                a = (a = (a = a.redIAdd(a)).redIAdd(a)).redIAdd(a);
                var c = this.z.redAdd(u).redSqr().redISub(t).redISub(s);
                return this.curve.jpoint(p, a, c)
            }, JPoint.prototype.mul = function(r, e) {
                return r = new BN(r, e), this.curve._wnafMul(this, r)
            }, JPoint.prototype.eq = function(r) {
                if ("affine" === r.type) return this.eq(r.toJ());
                if (this === r) return !0;
                var e = this.z.redSqr(),
                    t = r.z.redSqr();
                if (0 !== this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0)) return !1;
                var d = e.redMul(this.z),
                    i = t.redMul(r.z);
                return 0 === this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)
            }, JPoint.prototype.eqXToP = function(r) {
                var e = this.z.redSqr(),
                    t = r.toRed(this.curve.red).redMul(e);
                if (0 === this.x.cmp(t)) return !0;
                for (var d = r.clone(), i = this.curve.redN.redMul(e);;) {
                    if (d.iadd(this.curve.n), d.cmp(this.curve.p) >= 0) return !1;
                    if (t.redIAdd(i), 0 === this.x.cmp(t)) return !0
                }
                return !1
            }, JPoint.prototype.inspect = function() {
                return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
            }, JPoint.prototype.isInfinity = function() {
                return 0 === this.z.cmpn(0)
            };

        }, {
            "../../elliptic": 14,
            "../curve": 17,
            "bn.js": 4,
            "inherits": 51
        }],
        20: [function(require, module, exports) {
            "use strict";

            function PresetCurve(f) {
                "short" === f.type ? this.curve = new elliptic.curve.short(f) : "edwards" === f.type ? this.curve = new elliptic.curve.edwards(f) : this.curve = new elliptic.curve.mont(f), this.g = this.curve.g, this.n = this.curve.n, this.hash = f.hash, assert(this.g.validate(), "Invalid curve"), assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
            }

            function defineCurve(f, e) {
                Object.defineProperty(curves, f, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        var a = new PresetCurve(e);
                        return Object.defineProperty(curves, f, {
                            configurable: !0,
                            enumerable: !0,
                            value: a
                        }), a
                    }
                })
            }
            var curves = exports,
                hash = require("hash.js"),
                elliptic = require("../elliptic"),
                assert = elliptic.utils.assert;
            curves.PresetCurve = PresetCurve, defineCurve("p192", {
                type: "short",
                prime: "p192",
                p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
                b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
                n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
                hash: hash.sha256,
                gRed: !1,
                g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
            }), defineCurve("p224", {
                type: "short",
                prime: "p224",
                p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
                b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
                n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
                hash: hash.sha256,
                gRed: !1,
                g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
            }), defineCurve("p256", {
                type: "short",
                prime: null,
                p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
                a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
                b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
                n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
                hash: hash.sha256,
                gRed: !1,
                g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
            }), defineCurve("p384", {
                type: "short",
                prime: null,
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
                a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
                b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
                n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
                hash: hash.sha384,
                gRed: !1,
                g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
            }), defineCurve("p521", {
                type: "short",
                prime: null,
                p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
                a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
                b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
                n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
                hash: hash.sha512,
                gRed: !1,
                g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
            }), defineCurve("curve25519", {
                type: "mont",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "76d06",
                b: "1",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: hash.sha256,
                gRed: !1,
                g: ["9"]
            }), defineCurve("ed25519", {
                type: "edwards",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "-1",
                c: "1",
                d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: hash.sha256,
                gRed: !1,
                g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
            });
            var pre;
            try {
                pre = require("./precomputed/secp256k1")
            } catch (f) {
                pre = void 0
            }
            defineCurve("secp256k1", {
                type: "short",
                prime: "k256",
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
                a: "0",
                b: "7",
                n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
                h: "1",
                hash: hash.sha256,
                beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
                lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
                basis: [{
                    a: "3086d221a7d46bcde86c90e49284eb15",
                    b: "-e4437ed6010e88286f547fa90abfe4c3"
                }, {
                    a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                    b: "3086d221a7d46bcde86c90e49284eb15"
                }],
                gRed: !1,
                g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", pre]
            });

        }, {
            "../elliptic": 14,
            "./precomputed/secp256k1": 27,
            "hash.js": 37
        }],
        21: [function(require, module, exports) {
            "use strict";

            function EC(e) {
                if (!(this instanceof EC)) return new EC(e);
                "string" == typeof e && (assert(elliptic.curves.hasOwnProperty(e), "Unknown curve " + e), e = elliptic.curves[e]), e instanceof elliptic.curves.PresetCurve && (e = {
                    curve: e
                }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash
            }
            var BN = require("bn.js"),
                HmacDRBG = require("hmac-drbg"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert,
                KeyPair = require("./key"),
                Signature = require("./signature");
            module.exports = EC, EC.prototype.keyPair = function(e) {
                return new KeyPair(this, e)
            }, EC.prototype.keyFromPrivate = function(e, t) {
                return KeyPair.fromPrivate(this, e, t)
            }, EC.prototype.keyFromPublic = function(e, t) {
                return KeyPair.fromPublic(this, e, t)
            }, EC.prototype.genKeyPair = function(e) {
                e || (e = {});
                for (var t = new HmacDRBG({
                        hash: this.hash,
                        pers: e.pers,
                        persEnc: e.persEnc || "utf8",
                        entropy: e.entropy || elliptic.rand(this.hash.hmacStrength),
                        entropyEnc: e.entropy && e.entropyEnc || "utf8",
                        nonce: this.n.toArray()
                    }), r = this.n.byteLength(), n = this.n.sub(new BN(2));;) {
                    var i = new BN(t.generate(r));
                    if (!(i.cmp(n) > 0)) return i.iaddn(1), this.keyFromPrivate(i)
                }
            }, EC.prototype._truncateToN = function(e, t) {
                var r = 8 * e.byteLength() - this.n.bitLength();
                return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
            }, EC.prototype.sign = function(e, t, r, n) {
                "object" == typeof r && (n = r, r = null), n || (n = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new BN(e, 16));
                for (var i = this.n.byteLength(), s = t.getPrivate().toArray("be", i), u = e.toArray("be", i), o = new HmacDRBG({
                        hash: this.hash,
                        entropy: s,
                        nonce: u,
                        pers: n.pers,
                        persEnc: n.persEnc || "utf8"
                    }), c = this.n.sub(new BN(1)), h = 0; !0; h++) {
                    var a = n.k ? n.k(h) : new BN(o.generate(this.n.byteLength()));
                    if (!((a = this._truncateToN(a, !0)).cmpn(1) <= 0 || a.cmp(c) >= 0)) {
                        var p = this.g.mul(a);
                        if (!p.isInfinity()) {
                            var m = p.getX(),
                                v = m.umod(this.n);
                            if (0 !== v.cmpn(0)) {
                                var y = a.invm(this.n).mul(v.mul(t.getPrivate()).iadd(e));
                                if (0 !== (y = y.umod(this.n)).cmpn(0)) {
                                    var l = (p.getY().isOdd() ? 1 : 0) | (0 !== m.cmp(v) ? 2 : 0);
                                    return n.canonical && y.cmp(this.nh) > 0 && (y = this.n.sub(y), l ^= 1), new Signature({
                                        r: v,
                                        s: y,
                                        recoveryParam: l
                                    })
                                }
                            }
                        }
                    }
                }
            }, EC.prototype.verify = function(e, t, r, n) {
                e = this._truncateToN(new BN(e, 16)), r = this.keyFromPublic(r, n);
                var i = (t = new Signature(t, "hex")).r,
                    s = t.s;
                if (i.cmpn(1) < 0 || i.cmp(this.n) >= 0) return !1;
                if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
                var u = s.invm(this.n),
                    o = u.mul(e).umod(this.n),
                    c = u.mul(i).umod(this.n);
                if (!this.curve._maxwellTrick) return !(h = this.g.mulAdd(o, r.getPublic(), c)).isInfinity() && 0 === h.getX().umod(this.n).cmp(i);
                var h = this.g.jmulAdd(o, r.getPublic(), c);
                return !h.isInfinity() && h.eqXToP(i)
            }, EC.prototype.recoverPubKey = function(e, t, r, n) {
                assert((3 & r) === r, "The recovery param is more than two bits"), t = new Signature(t, n);
                var i = this.n,
                    s = new BN(e),
                    u = t.r,
                    o = t.s,
                    c = 1 & r,
                    h = r >> 1;
                if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && h) throw new Error("Unable to find sencond key candinate");
                u = h ? this.curve.pointFromX(u.add(this.curve.n), c) : this.curve.pointFromX(u, c);
                var a = t.r.invm(i),
                    p = i.sub(s).mul(a).umod(i),
                    m = o.mul(a).umod(i);
                return this.g.mulAdd(p, u, m)
            }, EC.prototype.getKeyRecoveryParam = function(e, t, r, n) {
                if (null !== (t = new Signature(t, n)).recoveryParam) return t.recoveryParam;
                for (var i = 0; i < 4; i++) {
                    var s;
                    try {
                        s = this.recoverPubKey(e, t, i)
                    } catch (e) {
                        continue
                    }
                    if (s.eq(r)) return i
                }
                throw new Error("Unable to find valid recovery factor")
            };

        }, {
            "../../elliptic": 14,
            "./key": 22,
            "./signature": 23,
            "bn.js": 4,
            "hmac-drbg": 49
        }],
        22: [function(require, module, exports) {
            "use strict";

            function KeyPair(i, t) {
                this.ec = i, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc)
            }
            var BN = require("bn.js"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert;
            module.exports = KeyPair, KeyPair.fromPublic = function(i, t, e) {
                return t instanceof KeyPair ? t : new KeyPair(i, {
                    pub: t,
                    pubEnc: e
                })
            }, KeyPair.fromPrivate = function(i, t, e) {
                return t instanceof KeyPair ? t : new KeyPair(i, {
                    priv: t,
                    privEnc: e
                })
            }, KeyPair.prototype.validate = function() {
                var i = this.getPublic();
                return i.isInfinity() ? {
                    result: !1,
                    reason: "Invalid public key"
                } : i.validate() ? i.mul(this.ec.curve.n).isInfinity() ? {
                    result: !0,
                    reason: null
                } : {
                    result: !1,
                    reason: "Public key * N != O"
                } : {
                    result: !1,
                    reason: "Public key is not a point"
                }
            }, KeyPair.prototype.getPublic = function(i, t) {
                return "string" == typeof i && (t = i, i = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, i) : this.pub
            }, KeyPair.prototype.getPrivate = function(i) {
                return "hex" === i ? this.priv.toString(16, 2) : this.priv
            }, KeyPair.prototype._importPrivate = function(i, t) {
                this.priv = new BN(i, t || 16), this.priv = this.priv.umod(this.ec.curve.n)
            }, KeyPair.prototype._importPublic = function(i, t) {
                if (i.x || i.y) return "mont" === this.ec.curve.type ? assert(i.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || assert(i.x && i.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(i.x, i.y));
                this.pub = this.ec.curve.decodePoint(i, t)
            }, KeyPair.prototype.derive = function(i) {
                return i.mul(this.priv).getX()
            }, KeyPair.prototype.sign = function(i, t, e) {
                return this.ec.sign(i, this, t, e)
            }, KeyPair.prototype.verify = function(i, t) {
                return this.ec.verify(i, t, this)
            }, KeyPair.prototype.inspect = function() {
                return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
            };

        }, {
            "../../elliptic": 14,
            "bn.js": 4
        }],
        23: [function(require, module, exports) {
            "use strict";

            function Signature(t, r) {
                if (t instanceof Signature) return t;
                this._importDER(t, r) || (assert(t.r && t.s, "Signature without r or s"), this.r = new BN(t.r, 16), this.s = new BN(t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
            }

            function Position() {
                this.place = 0
            }

            function getLength(t, r) {
                var e = t[r.place++];
                if (!(128 & e)) return e;
                for (var n = 15 & e, i = 0, a = 0, c = r.place; a < n; a++, c++) i <<= 8, i |= t[c];
                return r.place = c, i
            }

            function rmPadding(t) {
                for (var r = 0, e = t.length - 1; !t[r] && !(128 & t[r + 1]) && r < e;) r++;
                return 0 === r ? t : t.slice(r)
            }

            function constructLength(t, r) {
                if (r < 128) t.push(r);
                else {
                    var e = 1 + (Math.log(r) / Math.LN2 >>> 3);
                    for (t.push(128 | e); --e;) t.push(r >>> (e << 3) & 255);
                    t.push(r)
                }
            }
            var BN = require("bn.js"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert;
            module.exports = Signature, Signature.prototype._importDER = function(t, r) {
                t = utils.toArray(t, r);
                var e = new Position;
                if (48 !== t[e.place++]) return !1;
                if (getLength(t, e) + e.place !== t.length) return !1;
                if (2 !== t[e.place++]) return !1;
                var n = getLength(t, e),
                    i = t.slice(e.place, n + e.place);
                if (e.place += n, 2 !== t[e.place++]) return !1;
                var a = getLength(t, e);
                if (t.length !== a + e.place) return !1;
                var c = t.slice(e.place, a + e.place);
                return 0 === i[0] && 128 & i[1] && (i = i.slice(1)), 0 === c[0] && 128 & c[1] && (c = c.slice(1)), this.r = new BN(i), this.s = new BN(c), this.recoveryParam = null, !0
            }, Signature.prototype.toDER = function(t) {
                var r = this.r.toArray(),
                    e = this.s.toArray();
                for (128 & r[0] && (r = [0].concat(r)), 128 & e[0] && (e = [0].concat(e)), r = rmPadding(r), e = rmPadding(e); !(e[0] || 128 & e[1]);) e = e.slice(1);
                var n = [2];
                constructLength(n, r.length), (n = n.concat(r)).push(2), constructLength(n, e.length);
                var i = n.concat(e),
                    a = [48];
                return constructLength(a, i.length), a = a.concat(i), utils.encode(a, t)
            };

        }, {
            "../../elliptic": 14,
            "bn.js": 4
        }],
        24: [function(require, module, exports) {
            "use strict";

            function EDDSA(t) {
                if (assert("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof EDDSA)) return new EDDSA(t);
                var t = elliptic.curves[t].curve;
                this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = hash.sha512
            }
            var hash = require("hash.js"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert,
                parseBytes = utils.parseBytes,
                KeyPair = require("./key"),
                Signature = require("./signature");
            module.exports = EDDSA, EDDSA.prototype.sign = function(t, e) {
                t = parseBytes(t);
                var i = this.keyFromSecret(e),
                    r = this.hashInt(i.messagePrefix(), t),
                    n = this.g.mul(r),
                    s = this.encodePoint(n),
                    o = this.hashInt(s, i.pubBytes(), t).mul(i.priv()),
                    u = r.add(o).umod(this.curve.n);
                return this.makeSignature({
                    R: n,
                    S: u,
                    Rencoded: s
                })
            }, EDDSA.prototype.verify = function(t, e, i) {
                t = parseBytes(t), e = this.makeSignature(e);
                var r = this.keyFromPublic(i),
                    n = this.hashInt(e.Rencoded(), r.pubBytes(), t),
                    s = this.g.mul(e.S());
                return e.R().add(r.pub().mul(n)).eq(s)
            }, EDDSA.prototype.hashInt = function() {
                for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
                return utils.intFromLE(t.digest()).umod(this.curve.n)
            }, EDDSA.prototype.keyFromPublic = function(t) {
                return KeyPair.fromPublic(this, t)
            }, EDDSA.prototype.keyFromSecret = function(t) {
                return KeyPair.fromSecret(this, t)
            }, EDDSA.prototype.makeSignature = function(t) {
                return t instanceof Signature ? t : new Signature(this, t)
            }, EDDSA.prototype.encodePoint = function(t) {
                var e = t.getY().toArray("le", this.encodingLength);
                return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
            }, EDDSA.prototype.decodePoint = function(t) {
                var e = (t = utils.parseBytes(t)).length - 1,
                    i = t.slice(0, e).concat(-129 & t[e]),
                    r = 0 != (128 & t[e]),
                    n = utils.intFromLE(i);
                return this.curve.pointFromY(n, r)
            }, EDDSA.prototype.encodeInt = function(t) {
                return t.toArray("le", this.encodingLength)
            }, EDDSA.prototype.decodeInt = function(t) {
                return utils.intFromLE(t)
            }, EDDSA.prototype.isPoint = function(t) {
                return t instanceof this.pointClass
            };

        }, {
            "../../elliptic": 14,
            "./key": 25,
            "./signature": 26,
            "hash.js": 37
        }],
        25: [function(require, module, exports) {
            "use strict";

            function KeyPair(e, t) {
                this.eddsa = e, this._secret = parseBytes(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = parseBytes(t.pub)
            }
            var elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert,
                parseBytes = utils.parseBytes,
                cachedProperty = utils.cachedProperty;
            KeyPair.fromPublic = function(e, t) {
                return t instanceof KeyPair ? t : new KeyPair(e, {
                    pub: t
                })
            }, KeyPair.fromSecret = function(e, t) {
                return t instanceof KeyPair ? t : new KeyPair(e, {
                    secret: t
                })
            }, KeyPair.prototype.secret = function() {
                return this._secret
            }, cachedProperty(KeyPair, "pubBytes", function() {
                return this.eddsa.encodePoint(this.pub())
            }), cachedProperty(KeyPair, "pub", function() {
                return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
            }), cachedProperty(KeyPair, "privBytes", function() {
                var e = this.eddsa,
                    t = this.hash(),
                    i = e.encodingLength - 1,
                    r = t.slice(0, e.encodingLength);
                return r[0] &= 248, r[i] &= 127, r[i] |= 64, r
            }), cachedProperty(KeyPair, "priv", function() {
                return this.eddsa.decodeInt(this.privBytes())
            }), cachedProperty(KeyPair, "hash", function() {
                return this.eddsa.hash().update(this.secret()).digest()
            }), cachedProperty(KeyPair, "messagePrefix", function() {
                return this.hash().slice(this.eddsa.encodingLength)
            }), KeyPair.prototype.sign = function(e) {
                return assert(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this)
            }, KeyPair.prototype.verify = function(e, t) {
                return this.eddsa.verify(e, t, this)
            }, KeyPair.prototype.getSecret = function(e) {
                return assert(this._secret, "KeyPair is public only"), utils.encode(this.secret(), e)
            }, KeyPair.prototype.getPublic = function(e) {
                return utils.encode(this.pubBytes(), e)
            }, module.exports = KeyPair;

        }, {
            "../../elliptic": 14
        }],
        26: [function(require, module, exports) {
            "use strict";

            function Signature(e, t) {
                this.eddsa = e, "object" != typeof t && (t = parseBytes(t)), Array.isArray(t) && (t = {
                    R: t.slice(0, e.encodingLength),
                    S: t.slice(e.encodingLength)
                }), assert(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof BN && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded
            }
            var BN = require("bn.js"),
                elliptic = require("../../elliptic"),
                utils = elliptic.utils,
                assert = utils.assert,
                cachedProperty = utils.cachedProperty,
                parseBytes = utils.parseBytes;
            cachedProperty(Signature, "S", function() {
                return this.eddsa.decodeInt(this.Sencoded())
            }), cachedProperty(Signature, "R", function() {
                return this.eddsa.decodePoint(this.Rencoded())
            }), cachedProperty(Signature, "Rencoded", function() {
                return this.eddsa.encodePoint(this.R())
            }), cachedProperty(Signature, "Sencoded", function() {
                return this.eddsa.encodeInt(this.S())
            }), Signature.prototype.toBytes = function() {
                return this.Rencoded().concat(this.Sencoded())
            }, Signature.prototype.toHex = function() {
                return utils.encode(this.toBytes(), "hex").toUpperCase()
            }, module.exports = Signature;

        }, {
            "../../elliptic": 14,
            "bn.js": 4
        }],
        27: [function(require, module, exports) {
            module.exports = {
                doubles: {
                    step: 4,
                    points: [
                        ["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],
                        ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],
                        ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],
                        ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],
                        ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],
                        ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],
                        ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],
                        ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],
                        ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],
                        ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],
                        ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],
                        ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],
                        ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],
                        ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],
                        ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],
                        ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],
                        ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],
                        ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],
                        ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],
                        ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],
                        ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],
                        ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],
                        ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],
                        ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],
                        ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],
                        ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],
                        ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],
                        ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],
                        ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],
                        ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],
                        ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],
                        ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],
                        ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],
                        ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],
                        ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],
                        ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],
                        ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],
                        ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],
                        ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],
                        ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],
                        ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],
                        ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],
                        ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],
                        ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],
                        ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],
                        ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],
                        ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],
                        ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],
                        ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],
                        ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],
                        ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],
                        ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],
                        ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],
                        ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],
                        ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],
                        ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],
                        ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],
                        ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],
                        ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],
                        ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],
                        ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],
                        ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],
                        ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],
                        ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],
                        ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]
                    ]
                },
                naf: {
                    wnd: 7,
                    points: [
                        ["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],
                        ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],
                        ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],
                        ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],
                        ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],
                        ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],
                        ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],
                        ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],
                        ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],
                        ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],
                        ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],
                        ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],
                        ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],
                        ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],
                        ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],
                        ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],
                        ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],
                        ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],
                        ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],
                        ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],
                        ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],
                        ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],
                        ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],
                        ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],
                        ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],
                        ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],
                        ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],
                        ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],
                        ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],
                        ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],
                        ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],
                        ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],
                        ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],
                        ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],
                        ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],
                        ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],
                        ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],
                        ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],
                        ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],
                        ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],
                        ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],
                        ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],
                        ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],
                        ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],
                        ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],
                        ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],
                        ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],
                        ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],
                        ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],
                        ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],
                        ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],
                        ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],
                        ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],
                        ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],
                        ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],
                        ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],
                        ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],
                        ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],
                        ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],
                        ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],
                        ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],
                        ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],
                        ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],
                        ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],
                        ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],
                        ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],
                        ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],
                        ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],
                        ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],
                        ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],
                        ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],
                        ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],
                        ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],
                        ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],
                        ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],
                        ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],
                        ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],
                        ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],
                        ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],
                        ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],
                        ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],
                        ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],
                        ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],
                        ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],
                        ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],
                        ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],
                        ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],
                        ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],
                        ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],
                        ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],
                        ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],
                        ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],
                        ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],
                        ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],
                        ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],
                        ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],
                        ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],
                        ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],
                        ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],
                        ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],
                        ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],
                        ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],
                        ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],
                        ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],
                        ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],
                        ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],
                        ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],
                        ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],
                        ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],
                        ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],
                        ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],
                        ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],
                        ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],
                        ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],
                        ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],
                        ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],
                        ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],
                        ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],
                        ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],
                        ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],
                        ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],
                        ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],
                        ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],
                        ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],
                        ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],
                        ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],
                        ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]
                    ]
                }
            };

        }, {}],
        28: [function(require, module, exports) {
            "use strict";

            function getNAF(t, r) {
                for (var i = [], n = 1 << r + 1, e = t.clone(); e.cmpn(1) >= 0;) {
                    var s;
                    if (e.isOdd()) {
                        var u = e.andln(n - 1);
                        s = u > (n >> 1) - 1 ? (n >> 1) - u : u, e.isubn(s)
                    } else s = 0;
                    i.push(s);
                    for (var l = 0 !== e.cmpn(0) && 0 === e.andln(n - 1) ? r + 1 : 1, o = 1; o < l; o++) i.push(0);
                    e.iushrn(l)
                }
                return i
            }

            function getJSF(t, r) {
                var i = [
                    [],
                    []
                ];
                t = t.clone(), r = r.clone();
                for (var n = 0, e = 0; t.cmpn(-n) > 0 || r.cmpn(-e) > 0;) {
                    var s = t.andln(3) + n & 3,
                        u = r.andln(3) + e & 3;
                    3 === s && (s = -1), 3 === u && (u = -1);
                    var l;
                    l = 0 == (1 & s) ? 0 : 3 !== (a = t.andln(7) + n & 7) && 5 !== a || 2 !== u ? s : -s, i[0].push(l);
                    var o;
                    if (0 == (1 & u)) o = 0;
                    else {
                        var a = r.andln(7) + e & 7;
                        o = 3 !== a && 5 !== a || 2 !== s ? u : -u
                    }
                    i[1].push(o), 2 * n === l + 1 && (n = 1 - n), 2 * e === o + 1 && (e = 1 - e), t.iushrn(1), r.iushrn(1)
                }
                return i
            }

            function cachedProperty(t, r, i) {
                var n = "_" + r;
                t.prototype[r] = function() {
                    return void 0 !== this[n] ? this[n] : this[n] = i.call(this)
                }
            }

            function parseBytes(t) {
                return "string" == typeof t ? utils.toArray(t, "hex") : t
            }

            function intFromLE(t) {
                return new BN(t, "hex", "le")
            }
            var utils = exports,
                BN = require("bn.js"),
                minAssert = require("minimalistic-assert"),
                minUtils = require("minimalistic-crypto-utils");
            utils.assert = minAssert, utils.toArray = minUtils.toArray, utils.zero2 = minUtils.zero2, utils.toHex = minUtils.toHex, utils.encode = minUtils.encode, utils.getNAF = getNAF, utils.getJSF = getJSF, utils.cachedProperty = cachedProperty, utils.parseBytes = parseBytes, utils.intFromLE = intFromLE;

        }, {
            "bn.js": 4,
            "minimalistic-assert": 63,
            "minimalistic-crypto-utils": 64
        }],
        29: [function(require, module, exports) {
            module.exports = {
                "_args": [
                    [
                        "elliptic@6.4.0",
                        "/Users/hdrewes/Documents/DEV/EthereumJS/browser-builds"
                    ]
                ],
                "_from": "elliptic@6.4.0",
                "_id": "elliptic@6.4.0",
                "_inBundle": false,
                "_integrity": "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
                "_location": "/elliptic",
                "_phantomChildren": {},
                "_requested": {
                    "type": "version",
                    "registry": true,
                    "raw": "elliptic@6.4.0",
                    "name": "elliptic",
                    "escapedName": "elliptic",
                    "rawSpec": "6.4.0",
                    "saveSpec": null,
                    "fetchSpec": "6.4.0"
                },
                "_requiredBy": [
                    "/browserify-sign",
                    "/create-ecdh",
                    "/secp256k1"
                ],
                "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",
                "_spec": "6.4.0",
                "_where": "/Users/hdrewes/Documents/DEV/EthereumJS/browser-builds",
                "author": {
                    "name": "Fedor Indutny",
                    "email": "fedor@indutny.com"
                },
                "bugs": {
                    "url": "https://github.com/indutny/elliptic/issues"
                },
                "dependencies": {
                    "bn.js": "^4.4.0",
                    "brorand": "^1.0.1",
                    "hash.js": "^1.0.0",
                    "hmac-drbg": "^1.0.0",
                    "inherits": "^2.0.1",
                    "minimalistic-assert": "^1.0.0",
                    "minimalistic-crypto-utils": "^1.0.0"
                },
                "description": "EC cryptography",
                "devDependencies": {
                    "brfs": "^1.4.3",
                    "coveralls": "^2.11.3",
                    "grunt": "^0.4.5",
                    "grunt-browserify": "^5.0.0",
                    "grunt-cli": "^1.2.0",
                    "grunt-contrib-connect": "^1.0.0",
                    "grunt-contrib-copy": "^1.0.0",
                    "grunt-contrib-uglify": "^1.0.1",
                    "grunt-mocha-istanbul": "^3.0.1",
                    "grunt-saucelabs": "^8.6.2",
                    "istanbul": "^0.4.2",
                    "jscs": "^2.9.0",
                    "jshint": "^2.6.0",
                    "mocha": "^2.1.0"
                },
                "files": [
                    "lib"
                ],
                "homepage": "https://github.com/indutny/elliptic",
                "keywords": [
                    "EC",
                    "Elliptic",
                    "curve",
                    "Cryptography"
                ],
                "license": "MIT",
                "main": "lib/elliptic.js",
                "name": "elliptic",
                "repository": {
                    "type": "git",
                    "url": "git+ssh://git@github.com/indutny/elliptic.git"
                },
                "scripts": {
                    "jscs": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                    "jshint": "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                    "lint": "npm run jscs && npm run jshint",
                    "test": "npm run lint && npm run unit",
                    "unit": "istanbul test _mocha --reporter=spec test/index.js",
                    "version": "grunt dist && git add dist/"
                },
                "version": "6.4.0"
            }

        }, {}],
        30: [function(require, module, exports) {
            module.exports = {
                "genesisGasLimit": {
                    "v": 5000,
                    "d": "Gas limit of the Genesis block."
                },
                "genesisDifficulty": {
                    "v": 17179869184,
                    "d": "Difficulty of the Genesis block."
                },
                "genesisNonce": {
                    "v": "0x0000000000000042",
                    "d": "the geneis nonce"
                },
                "genesisExtraData": {
                    "v": "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa",
                    "d": "extra data "
                },
                "genesisHash": {
                    "v": "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
                    "d": "genesis hash"
                },
                "genesisStateRoot": {
                    "v": "0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544",
                    "d": "the genesis state root"
                },
                "minGasLimit": {
                    "v": 5000,
                    "d": "Minimum the gas limit may ever be."
                },
                "gasLimitBoundDivisor": {
                    "v": 1024,
                    "d": "The bound divisor of the gas limit, used in update calculations."
                },
                "minimumDifficulty": {
                    "v": 131072,
                    "d": "The minimum that the difficulty may ever be."
                },
                "difficultyBoundDivisor": {
                    "v": 2048,
                    "d": "The bound divisor of the difficulty, used in the update calculations."
                },
                "durationLimit": {
                    "v": 13,
                    "d": "The decision boundary on the blocktime duration used to determine whether difficulty should go up or not."
                },
                "maximumExtraDataSize": {
                    "v": 32,
                    "d": "Maximum size extra data may be after Genesis."
                },
                "epochDuration": {
                    "v": 30000,
                    "d": "Duration between proof-of-work epochs."
                },
                "stackLimit": {
                    "v": 1024,
                    "d": "Maximum size of VM stack allowed."
                },
                "callCreateDepth": {
                    "v": 1024,
                    "d": "Maximum depth of call/create stack."
                },

                "tierStepGas": {
                    "v": [0, 2, 3, 5, 8, 10, 20],
                    "d": "Once per operation, for a selection of them."
                },
                "expGas": {
                    "v": 10,
                    "d": "Once per EXP instuction."
                },
                "expByteGas": {
                    "v": 10,
                    "d": "Times ceil(log256(exponent)) for the EXP instruction."
                },

                "sha3Gas": {
                    "v": 30,
                    "d": "Once per SHA3 operation."
                },
                "sha3WordGas": {
                    "v": 6,
                    "d": "Once per word of the SHA3 operation's data."
                },
                "sloadGas": {
                    "v": 50,
                    "d": "Once per SLOAD operation."
                },
                "sstoreSetGas": {
                    "v": 20000,
                    "d": "Once per SSTORE operation if the zeroness changes from zero."
                },
                "sstoreResetGas": {
                    "v": 5000,
                    "d": "Once per SSTORE operation if the zeroness does not change from zero."
                },
                "sstoreRefundGas": {
                    "v": 15000,
                    "d": "Once per SSTORE operation if the zeroness changes to zero."
                },
                "jumpdestGas": {
                    "v": 1,
                    "d": "Refunded gas, once per SSTORE operation if the zeroness changes to zero."
                },

                "logGas": {
                    "v": 375,
                    "d": "Per LOG* operation."
                },
                "logDataGas": {
                    "v": 8,
                    "d": "Per byte in a LOG* operation's data."
                },
                "logTopicGas": {
                    "v": 375,
                    "d": "Multiplied by the * of the LOG*, per LOG transaction. e.g. LOG0 incurs 0 * c_txLogTopicGas, LOG4 incurs 4 * c_txLogTopicGas."
                },

                "createGas": {
                    "v": 32000,
                    "d": "Once per CREATE operation & contract-creation transaction."
                },

                "callGas": {
                    "v": 40,
                    "d": "Once per CALL operation & message call transaction."
                },
                "callStipend": {
                    "v": 2300,
                    "d": "Free gas given at beginning of call."
                },
                "callValueTransferGas": {
                    "v": 9000,
                    "d": "Paid for CALL when the value transfor is non-zero."
                },
                "callNewAccountGas": {
                    "v": 25000,
                    "d": "Paid for CALL when the destination address didn't exist prior."
                },

                "suicideRefundGas": {
                    "v": 24000,
                    "d": "Refunded following a suicide operation."
                },

                "memoryGas": {
                    "v": 3,
                    "d": "Times the address of the (highest referenced byte in memory + 1). NOTE: referencing happens on read, write and in instructions such as RETURN and CALL."
                },
                "quadCoeffDiv": {
                    "v": 512,
                    "d": "Divisor for the quadratic particle of the memory cost equation."
                },

                "createDataGas": {
                    "v": 200,
                    "d": ""
                },
                "txGas": {
                    "v": 21000,
                    "d": "Per transaction. NOTE: Not payable on data of calls between transactions."
                },
                "txCreation": {
                    "v": 32000,
                    "d": "the cost of creating a contract via tx"
                },
                "txDataZeroGas": {
                    "v": 4,
                    "d": "Per byte of data attached to a transaction that equals zero. NOTE: Not payable on data of calls between transactions."
                },
                "txDataNonZeroGas": {
                    "v": 68,
                    "d": "Per byte of data attached to a transaction that is not equal to zero. NOTE: Not payable on data of calls between transactions."
                },

                "copyGas": {
                    "v": 3,
                    "d": "Multiplied by the number of 32-byte words that are copied (round up) for any *COPY operation and added."
                },

                "ecrecoverGas": {
                    "v": 3000,
                    "d": ""
                },
                "sha256Gas": {
                    "v": 60,
                    "d": ""
                },
                "sha256WordGas": {
                    "v": 12,
                    "d": ""
                },
                "ripemd160Gas": {
                    "v": 600,
                    "d": ""
                },
                "ripemd160WordGas": {
                    "v": 120,
                    "d": ""
                },
                "identityGas": {
                    "v": 15,
                    "d": ""
                },
                "identityWordGas": {
                    "v": 3,
                    "d": ""
                },
                "minerReward": {
                    "v": "5000000000000000000",
                    "d": "the amount a miner get rewarded for mining a block"
                },
                "ommerReward": {
                    "v": "625000000000000000",
                    "d": "The amount of wei a miner of an uncle block gets for being inculded in the blockchain"
                },
                "niblingReward": {
                    "v": "156250000000000000",
                    "d": "the amount a miner gets for inculding a uncle"
                },
                "homeSteadForkNumber": {
                    "v": 1150000,
                    "d": "the block that the Homestead fork started at"
                    Ethereum Signed Message: \n "+e.length.toString());return exports.sha3(Buffer.concat([r,e]))},exports.ecrecover=function(e,r,t,f){var o=Buffer.concat([exports.setLength(t,32),exports.setLength(f,32)],64),s=r-27;if(0!==s&&1!==s)throw new Error("
                    Invalid signature v value ");var n=secp256k1.recover(e,o,s);return secp256k1.publicKeyConvert(n,!1).slice(1)},exports.toRpcSig=function(e,r,t){if(27!==e&&28!==e)throw new Error("
                    Invalid recovery id ");return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r,32),exports.setLengthLeft(t,32),exports.toBuffer(e-27)]))},exports.fromRpcSig=function(e){if(65!==(e=exports.toBuffer(e)).length)throw new Error("
                    Invalid signature length ");var r=e[64];return r<27&&(r+=27),{v:r,r:e.slice(0,32),s:e.slice(32,64)}},exports.privateToAddress=function(e){return exports.publicToAddress(privateToPublic(e))},exports.isValidAddress=function(e){return/^0x[0-9a-fA-F]{40}$/i.test(e)},exports.toChecksumAddress=function(e){e=exports.stripHexPrefix(e).toLowerCase();for(var r=exports.sha3(e).toString("
                    hex "),t="
                    0x ",f=0;f<e.length;f++)parseInt(r[f],16)>=8?t+=e[f].toUpperCase():t+=e[f];return t},exports.isValidChecksumAddress=function(e){return exports.isValidAddress(e)&&exports.toChecksumAddress(e)===e},exports.generateAddress=function(e,r){return e=exports.toBuffer(e),r=new BN(r),r=r.isZero()?null:Buffer.from(r.toArray()),exports.rlphash([e,r]).slice(-20)},exports.isPrecompiled=function(e){var r=exports.unpad(e);return 1===r.length&&r[0]>0&&r[0]<5},exports.addHexPrefix=function(e){return"
                    string "!=typeof e?e:exports.isHexPrefixed(e)?e:"
                    0x "+e},exports.isValidSignature=function(e,r,t,f){var o=new BN("
                    7 fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0 ",16),s=new BN("
                    fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141 ",16);return 32===r.length&&32===t.length&&((27===e||28===e)&&(r=new BN(r),t=new BN(t),!(r.isZero()||r.gt(s)||t.isZero()||t.gt(s))&&(!1!==f||1!==new BN(t).cmp(o))))},exports.baToJSON=function(e){if(Buffer.isBuffer(e))return"
                    0x "+e.toString("
                    hex ");if(e instanceof Array){for(var r=[],t=0;t<e.length;t++)r.push(exports.baToJSON(e[t]));return r}},exports.defineProperties=function(e,r,t){if(e.raw=[],e._fields=[],e.toJSON=function(r){if(r){var t={};return e._fields.forEach(function(r){t[r]="
                    0x "+e[r].toString("
                    hex ")}),t}return exports.baToJSON(this.raw)},e.serialize=function(){return rlp.encode(e.raw)},r.forEach(function(r,t){function f(){return e.raw[t]}function o(f){"
                    00 "!==(f=exports.toBuffer(f)).toString("
                    hex ")||r.allowZero||(f=Buffer.allocUnsafe(0)),r.allowLess&&r.length?(f=exports.stripZeros(f),assert(r.length>=f.length,"
                    The field "+r.name+"
                    must not have more "+r.length+"
                    bytes ")):r.allowZero&&0===f.length||!r.length||assert(r.length===f.length,"
                    The field "+r.name+"
                    must have byte length of "+r.length),e.raw[t]=f}e._fields.push(r.name),Object.defineProperty(e,r.name,{enumerable:!0,configurable:!0,get:f,set:o}),r.default&&(e[r.name]=r.default),r.alias&&Object.defineProperty(e,r.alias,{enumerable:!1,configurable:!0,set:o,get:f})}),t)if("
                    string "==typeof t&&(t=Buffer.from(exports.stripHexPrefix(t),"
                    hex ")),Buffer.isBuffer(t)&&(t=rlp.decode(t)),Array.isArray(t)){if(t.length>e._fields.length)throw new Error("
                    wrong number of fields in data ");t.forEach(function(r,t){e[e._fields[t]]=exports.toBuffer(r)})}else{if("
                    object "!==(void 0===t?"
                    undefined ":_typeof(t)))throw new Error("
                    invalid data ");var f=Object.keys(t);r.forEach(function(r){-1!==f.indexOf(r.name)&&(e[r.name]=t[r.name]),-1!==f.indexOf(r.alias)&&(e[r.alias]=t[r.alias])})}};

                }).call(this, require("buffer").Buffer)
        }, {
            "assert": 1,
            "bn.js": 4,
            "buffer": 8,
            "create-hash": 11,
            "ethjs-util": 34,
            "keccak": 56,
            "rlp": 81,
            "secp256k1": 83
        }],
        33: [function(require, module, exports) {
            (function(Buffer) {
                const SHA3 = require("keccakjs"),
                    secp256k1 = require("secp256k1"),
                    assert = require("assert"),
                    rlp = require("rlp"),
                    BN = require("bn.js"),
                    createHash = require("create-hash");
                exports.MAX_INTEGER = new BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16), exports.TWO_POW256 = new BN("10000000000000000000000000000000000000000000000000000000000000000", 16), exports.SHA3_NULL_S = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470", exports.SHA3_NULL = new Buffer(exports.SHA3_NULL_S, "hex"), exports.SHA3_RLP_ARRAY_S = "1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", exports.SHA3_RLP_ARRAY = new Buffer(exports.SHA3_RLP_ARRAY_S, "hex"), exports.SHA3_RLP_S = "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421", exports.SHA3_RLP = new Buffer(exports.SHA3_RLP_S, "hex"), exports.BN = BN, exports.rlp = rlp, exports.secp256k1 = secp256k1, exports.zeros = function(e) {
                    var r = new Buffer(e);
                    return r.fill(0), r
                }, exports.setLengthLeft = exports.setLength = function(e, r, t) {
                    var f = exports.zeros(r);
                    return e = exports.toBuffer(e), t ? e.length < r ? (e.copy(f), f) : e.slice(0, r) : e.length < r ? (e.copy(f, r - e.length), f) : e.slice(-r)
                }, exports.setLengthRight = function(e, r) {
                    return exports.setLength(e, r, !0)
                }, exports.unpad = exports.stripZeros = function(e) {
                    for (var r = (e = exports.stripHexPrefix(e))[0]; e.length > 0 && "0" === r.toString();) r = (e = e.slice(1))[0];
                    return e
                }, exports.toBuffer = function(e) {
                    if (!Buffer.isBuffer(e))
                        if (Array.isArray(e)) e = new Buffer(e);
                        else if ("string" == typeof e) e = exports.isHexPrefixed(e) ? new Buffer(exports.padToEven(exports.stripHexPrefix(e)), "hex") : new Buffer(e);
                    else if ("number" == typeof e) e = exports.intToBuffer(e);
                    else if (null === e || void 0 === e) e = new Buffer([]);
                    else {
                        if (!e.toArray) throw new Error("invalid type");
                        e = new Buffer(e.toArray())
                    }
                    return e
                }, exports.intToHex = function(e) {
                    assert(e % 1 == 0, "number is not a integer"), assert(e >= 0, "number must be positive");
                    var r = e.toString(16);
                    return r.length % 2 && (r = "0" + r), "0x" + r
                }, exports.intToBuffer = function(e) {
                    var r = exports.intToHex(e);
                    return new Buffer(r.slice(2), "hex")
                }, exports.bufferToInt = function(e) {
                    return parseInt(exports.bufferToHex(e), 16)
                }, exports.bufferToHex = function(e) {
                    return 0 === (e = exports.toBuffer(e)).length ? 0 : "0x" + e.toString("hex")
                }, exports.fromSigned = function(e) {
                    return new BN(e).fromTwos(256)
                }, exports.toUnsigned = function(e) {
                    return new Buffer(e.toTwos(256).toArray())
                }, exports.sha3 = function(e, r) {
                    e = exports.toBuffer(e), r || (r = 256);
                    var t = new SHA3(r);
                    return e && t.update(e), new Buffer(t.digest("hex"), "hex")
                }, exports.sha256 = function(e) {
                    return e = exports.toBuffer(e), createHash("sha256").update(e).digest()
                }, exports.ripemd160 = function(e, r) {
                    e = exports.toBuffer(e);
                    var t = createHash("rmd160").update(e).digest();
                    return !0 === r ? exports.setLength(t, 32) : t
                }, exports.rlphash = function(e) {
                    return exports.sha3(rlp.encode(e))
                }, exports.isValidPrivate = function(e) {
                    return secp256k1.privateKeyVerify(e)
                }, exports.isValidPublic = function(e, r) {
                    return 64 === e.length ? secp256k1.publicKeyVerify(Buffer.concat([new Buffer([4]), e])) : !!r && secp256k1.publicKeyVerify(e)
                }, exports.pubToAddress = exports.publicToAddress = function(e, r) {
                    return e = exports.toBuffer(e), r && 64 !== e.length && (e = secp256k1.publicKeyConvert(e, !1).slice(1)), assert(64 === e.length), exports.sha3(e).slice(-20)
                };
                var privateToPublic = exports.privateToPublic = function(e) {
                    return e = exports.toBuffer(e), secp256k1.publicKeyCreate(e, !1).slice(1)
                };
                exports.importPublic = function(e) {
                    return 64 !== (e = exports.toBuffer(e)).length && (e = secp256k1.publicKeyConvert(e, !1).slice(1)), e
                }, exports.ecsign = function(e, r) {
                    var t = secp256k1.sign(e, r),
                        f = {};
                    return f.r = t.signature.slice(0, 32), f.s = t.signature.slice(32, 64), f.v = t.recovery + 27, f
                }, exports.ecrecover = function(e, r, t, f) {
                    var s = Buffer.concat([exports.setLength(t, 32), exports.setLength(f, 32)], 64),
                        o = exports.bufferToInt(r) - 27;
                    if (0 !== o && 1 !== o) throw new Error("Invalid signature v value");
                    var n = secp256k1.recover(e, s, o);
                    return secp256k1.publicKeyConvert(n, !1).slice(1)
                }, exports.toRpcSig = function(e, r, t) {
                    return exports.bufferToHex(Buffer.concat([r, t, exports.toBuffer(e - 27)]))
                }, exports.fromRpcSig = function(e) {
                    var r = (e = exports.toBuffer(e))[64];
                    return r < 27 && (r += 27), {
                        v: r,
                        r: e.slice(0, 32),
                        s: e.slice(32, 64)
                    }
                }, exports.privateToAddress = function(e) {
                    return exports.publicToAddress(privateToPublic(e))
                }, exports.isValidAddress = function(e) {
                    return /^0x[0-9a-fA-F]{40}$/i.test(e)
                }, exports.toChecksumAddress = function(e) {
                    e = exports.stripHexPrefix(e).toLowerCase();
                    for (var r = exports.sha3(e).toString("hex"), t = "0x", f = 0; f < e.length; f++) parseInt(r[f], 16) >= 8 ? t += e[f].toUpperCase() : t += e[f];
                    return t
                }, exports.isValidChecksumAddress = function(e) {
                    return exports.isValidAddress(e) && exports.toChecksumAddress(e) === e
                }, exports.generateAddress = function(e, r) {
                    return e = exports.toBuffer(e), r = new BN(r), r = r.isZero() ? null : new Buffer(r.toArray()), exports.rlphash([e, r]).slice(-20)
                }, exports.isPrecompiled = function(e) {
                    var r = exports.unpad(e);
                    return 1 === r.length && r[0] > 0 && r[0] < 5
                }, exports.isHexPrefixed = function(e) {
                    return "0x" === e.slice(0, 2)
                }, exports.stripHexPrefix = function(e) {
                    return "string" != typeof e ? e : exports.isHexPrefixed(e) ? e.slice(2) : e
                }, exports.addHexPrefix = function(e) {
                    return "string" != typeof e ? e : exports.isHexPrefixed(e) ? e : "0x" + e
                }, exports.padToEven = function(e) {
                    return e.length % 2 && (e = "0" + e), e
                }, exports.baToJSON = function(e) {
                    if (Buffer.isBuffer(e)) return "0x" + e.toString("hex");
                    if (e instanceof Array) {
                        for (var r = [], t = 0; t < e.length; t++) r.push(exports.baToJSON(e[t]));
                        return r
                    }
                }, exports.defineProperties = function(e, r, t) {
                    if (e.raw = [], e._fields = [], e.toJSON = function(r) {
                            if (r) {
                                var t = {};
                                return e._fields.forEach(function(r) {
                                    t[r] = "0x" + e[r].toString("hex")
                                }), t
                            }
                            return exports.baToJSON(this.raw)
                        }, e.serialize = function() {
                            return rlp.encode(e.raw)
                        }, r.forEach(function(r, t) {
                            function f() {
                                return e.raw[t]
                            }

                            function s(f) {
                                "00" !== (f = exports.toBuffer(f)).toString("hex") || r.allowZero || (f = new Buffer([])), r.allowLess && r.length ? (f = exports.stripZeros(f), assert(r.length >= f.length, "The field " + r.name + " must not have more " + r.length + " bytes")) : r.allowZero && 0 === f.length || !r.length || assert(r.length === f.length, "The field " + r.name + " must have byte length of " + r.length), e.raw[t] = f
                            }
                            e._fields.push(r.name), Object.defineProperty(e, r.name, {
                                enumerable: !0,
                                configurable: !0,
                                get: f,
                                set: s
                            }), r.default && (e[r.name] = r.default), r.alias && Object.defineProperty(e, r.alias, {
                                enumerable: !1,
                                configurable: !0,
                                set: s,
                                get: f
                            })
                        }), t)
                        if ("string" == typeof t && (t = new Buffer(exports.stripHexPrefix(t), "hex")), Buffer.isBuffer(t) && (t = rlp.decode(t)), Array.isArray(t)) {
                            if (t.length > e._fields.length) throw new Error("wrong number of fields in data");
                            t.forEach(function(r, t) {
                                e[e._fields[t]] = exports.toBuffer(r)
                            })
                        } else {
                            if ("object" != typeof t) throw new Error("invalid data");
                            for (var f in t) - 1 !== e._fields.indexOf(f) && (e[f] = t[f])
                        }
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "assert": 1,
            "bn.js": 4,
            "buffer": 8,
            "create-hash": 11,
            "keccakjs": 62,
            "rlp": 81,
            "secp256k1": 83
        }],
        34: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function padToEven(r) {
                    var e = r;
                    if ("string" != typeof e) throw new Error("[ethjs-util] while padding to even, value must be string, is currently " + typeof e + ", while padToEven.");
                    return e.length % 2 && (e = "0" + e), e
                }

                function intToHex(r) {
                    return "0x" + padToEven(r.toString(16))
                }

                function intToBuffer(r) {
                    var e = intToHex(r);
                    return new Buffer(e.slice(2), "hex")
                }

                function getBinarySize(r) {
                    if ("string" != typeof r) throw new Error("[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '" + typeof r + "'.");
                    return Buffer.byteLength(r, "utf8")
                }

                function arrayContainsArray(r, e, t) {
                    if (!0 !== Array.isArray(r)) throw new Error("[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '" + typeof r + "'");
                    if (!0 !== Array.isArray(e)) throw new Error("[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '" + typeof e + "'");
                    return e[Boolean(t) && "some" || "every"](function(e) {
                        return r.indexOf(e) >= 0
                    })
                }

                function toUtf8(r) {
                    return new Buffer(padToEven(stripHexPrefix(r).replace(/^0+|0+$/g, "")), "hex").toString("utf8")
                }

                function toAscii(r) {
                    var e = "",
                        t = 0,
                        i = r.length;
                    for ("0x" === r.substring(0, 2) && (t = 2); t < i; t += 2) {
                        var n = parseInt(r.substr(t, 2), 16);
                        e += String.fromCharCode(n)
                    }
                    return e
                }

                function fromUtf8(r) {
                    return "0x" + padToEven(new Buffer(r, "utf8").toString("hex")).replace(/^0+|0+$/g, "")
                }

                function fromAscii(r) {
                    for (var e = "", t = 0; t < r.length; t++) {
                        var i = r.charCodeAt(t).toString(16);
                        e += i.length < 2 ? "0" + i : i
                    }
                    return "0x" + e
                }

                function getKeys(r, e, t) {
                    if (!Array.isArray(r)) throw new Error("[ethjs-util] method getKeys expecting type Array as 'params' input, got '" + typeof r + "'");
                    if ("string" != typeof e) throw new Error("[ethjs-util] method getKeys expecting type String for input 'key' got '" + typeof e + "'.");
                    for (var i = [], n = 0; n < r.length; n++) {
                        var o = r[n][e];
                        if (t && !o) o = "";
                        else if ("string" != typeof o) throw new Error("invalid abi");
                        i.push(o)
                    }
                    return i
                }

                function isHexString(r, e) {
                    return !("string" != typeof r || !r.match(/^0x[0-9A-Fa-f]*$/)) && (!e || r.length === 2 + 2 * e)
                }
                var isHexPrefixed = require("is-hex-prefixed"),
                    stripHexPrefix = require("strip-hex-prefix");
                module.exports = {
                    arrayContainsArray: arrayContainsArray,
                    intToBuffer: intToBuffer,
                    getBinarySize: getBinarySize,
                    isHexPrefixed: isHexPrefixed,
                    stripHexPrefix: stripHexPrefix,
                    padToEven: padToEven,
                    intToHex: intToHex,
                    fromAscii: fromAscii,
                    fromUtf8: fromUtf8,
                    toAscii: toAscii,
                    toUtf8: toUtf8,
                    getKeys: getKeys,
                    isHexString: isHexString
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "buffer": 8,
            "is-hex-prefixed": 53,
            "strip-hex-prefix": 99
        }],
        35: [function(require, module, exports) {
            function EventEmitter() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function isFunction(e) {
                return "function" == typeof e
            }

            function isNumber(e) {
                return "number" == typeof e
            }

            function isObject(e) {
                return "object" == typeof e && null !== e
            }

            function isUndefined(e) {
                return void 0 === e
            }
            module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.prototype.setMaxListeners = function(e) {
                if (!isNumber(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, EventEmitter.prototype.emit = function(e) {
                var t, i, n, s, r, o;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                    if ((t = arguments[1]) instanceof Error) throw t;
                    var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw h.context = t, h
                }
                if (i = this._events[e], isUndefined(i)) return !1;
                if (isFunction(i)) switch (arguments.length) {
                    case 1:
                        i.call(this);
                        break;
                    case 2:
                        i.call(this, arguments[1]);
                        break;
                    case 3:
                        i.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        s = Array.prototype.slice.call(arguments, 1), i.apply(this, s)
                } else if (isObject(i))
                    for (s = Array.prototype.slice.call(arguments, 1), n = (o = i.slice()).length, r = 0; r < n; r++) o[r].apply(this, s);
                return !0
            }, EventEmitter.prototype.addListener = function(e, t) {
                var i;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, isFunction(t.listener) ? t.listener : t), this._events[e] ? isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, isObject(this._events[e]) && !this._events[e].warned && (i = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[e].length > i && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
            }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(e, t) {
                function i() {
                    this.removeListener(e, i), n || (n = !0, t.apply(this, arguments))
                }
                if (!isFunction(t)) throw TypeError("listener must be a function");
                var n = !1;
                return i.listener = t, this.on(e, i), this
            }, EventEmitter.prototype.removeListener = function(e, t) {
                var i, n, s, r;
                if (!isFunction(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (i = this._events[e], s = i.length, n = -1, i === t || isFunction(i.listener) && i.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (isObject(i)) {
                    for (r = s; r-- > 0;)
                        if (i[r] === t || i[r].listener && i[r].listener === t) {
                            n = r;
                            break
                        }
                    if (n < 0) return this;
                    1 === i.length ? (i.length = 0, delete this._events[e]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, EventEmitter.prototype.removeAllListeners = function(e) {
                var t, i;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (i = this._events[e], isFunction(i)) this.removeListener(e, i);
                else if (i)
                    for (; i.length;) this.removeListener(e, i[i.length - 1]);
                return delete this._events[e], this
            }, EventEmitter.prototype.listeners = function(e) {
                return this._events && this._events[e] ? isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, EventEmitter.prototype.listenerCount = function(e) {
                if (this._events) {
                    var t = this._events[e];
                    if (isFunction(t)) return 1;
                    if (t) return t.length
                }
                return 0
            }, EventEmitter.listenerCount = function(e, t) {
                return e.listenerCount(t)
            };

        }, {}],
        36: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function HashBase(t) {
                    Transform.call(this), this._block = new Buffer(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
                }
                var Transform = require("stream").Transform,
                    inherits = require("inherits");
                inherits(HashBase, Transform), HashBase.prototype._transform = function(t, e, r) {
                    var s = null;
                    try {
                        "buffer" !== e && (t = new Buffer(t, e)), this.update(t)
                    } catch (t) {
                        s = t
                    }
                    r(s)
                }, HashBase.prototype._flush = function(t) {
                    var e = null;
                    try {
                        this.push(this._digest())
                    } catch (t) {
                        e = t
                    }
                    t(e)
                }, HashBase.prototype.update = function(t, e) {
                    if (!Buffer.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
                    if (this._finalized) throw new Error("Digest already called");
                    Buffer.isBuffer(t) || (t = new Buffer(t, e || "binary"));
                    for (var r = this._block, s = 0; this._blockOffset + t.length - s >= this._blockSize;) {
                        for (var i = this._blockOffset; i < this._blockSize;) r[i++] = t[s++];
                        this._update(), this._blockOffset = 0
                    }
                    for (; s < t.length;) r[this._blockOffset++] = t[s++];
                    for (var o = 0, a = 8 * t.length; a > 0; ++o) this._length[o] += a, (a = this._length[o] / 4294967296 | 0) > 0 && (this._length[o] -= 4294967296 * a);
                    return this
                }, HashBase.prototype._update = function(t) {
                    throw new Error("_update is not implemented")
                }, HashBase.prototype.digest = function(t) {
                    if (this._finalized) throw new Error("Digest already called");
                    this._finalized = !0;
                    var e = this._digest();
                    return void 0 !== t && (e = e.toString(t)), e
                }, HashBase.prototype._digest = function() {
                    throw new Error("_digest is not implemented")
                }, module.exports = HashBase;

            }).call(this, require("buffer").Buffer)
        }, {
            "buffer": 8,
            "inherits": 51,
            "stream": 97
        }],
        37: [function(require, module, exports) {
            var hash = exports;
            hash.utils = require("./hash/utils"), hash.common = require("./hash/common"), hash.sha = require("./hash/sha"), hash.ripemd = require("./hash/ripemd"), hash.hmac = require("./hash/hmac"), hash.sha1 = hash.sha.sha1, hash.sha256 = hash.sha.sha256, hash.sha224 = hash.sha.sha224, hash.sha384 = hash.sha.sha384, hash.sha512 = hash.sha.sha512, hash.ripemd160 = hash.ripemd.ripemd160;

        }, {
            "./hash/common": 38,
            "./hash/hmac": 39,
            "./hash/ripemd": 40,
            "./hash/sha": 41,
            "./hash/utils": 48
        }],
        38: [function(require, module, exports) {
            "use strict";

            function BlockHash() {
                this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
            }
            var utils = require("./utils"),
                assert = require("minimalistic-assert");
            exports.BlockHash = BlockHash, BlockHash.prototype.update = function(t, i) {
                if (t = utils.toArray(t, i), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
                    var n = (t = this.pending).length % this._delta8;
                    this.pending = t.slice(t.length - n, t.length), 0 === this.pending.length && (this.pending = null), t = utils.join32(t, 0, t.length - n, this.endian);
                    for (var s = 0; s < t.length; s += this._delta32) this._update(t, s, s + this._delta32)
                }
                return this
            }, BlockHash.prototype.digest = function(t) {
                return this.update(this._pad()), assert(null === this.pending), this._digest(t)
            }, BlockHash.prototype._pad = function() {
                var t = this.pendingTotal,
                    i = this._delta8,
                    n = i - (t + this.padLength) % i,
                    s = new Array(n + this.padLength);
                s[0] = 128;
                for (var e = 1; e < n; e++) s[e] = 0;
                if (t <<= 3, "big" === this.endian) {
                    for (var h = 8; h < this.padLength; h++) s[e++] = 0;
                    s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = t >>> 24 & 255, s[e++] = t >>> 16 & 255, s[e++] = t >>> 8 & 255, s[e++] = 255 & t
                } else
                    for (s[e++] = 255 & t, s[e++] = t >>> 8 & 255, s[e++] = t >>> 16 & 255, s[e++] = t >>> 24 & 255, s[e++] = 0, s[e++] = 0, s[e++] = 0, s[e++] = 0, h = 8; h < this.padLength; h++) s[e++] = 0;
                return s
            };

        }, {
            "./utils": 48,
            "minimalistic-assert": 63
        }],
        39: [function(require, module, exports) {
            "use strict";

            function Hmac(t, i, e) {
                if (!(this instanceof Hmac)) return new Hmac(t, i, e);
                this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(utils.toArray(i, e))
            }
            var utils = require("./utils"),
                assert = require("minimalistic-assert");
            module.exports = Hmac, Hmac.prototype._init = function(t) {
                t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), assert(t.length <= this.blockSize);
                for (var i = t.length; i < this.blockSize; i++) t.push(0);
                for (i = 0; i < t.length; i++) t[i] ^= 54;
                for (this.inner = (new this.Hash).update(t), i = 0; i < t.length; i++) t[i] ^= 106;
                this.outer = (new this.Hash).update(t)
            }, Hmac.prototype.update = function(t, i) {
                return this.inner.update(t, i), this
            }, Hmac.prototype.digest = function(t) {
                return this.outer.update(this.inner.digest()), this.outer.digest(t)
            };

        }, {
            "./utils": 48,
            "minimalistic-assert": 63
        }],
        40: [function(require, module, exports) {
            "use strict";

            function RIPEMD160() {
                if (!(this instanceof RIPEMD160)) return new RIPEMD160;
                BlockHash.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
            }

            function f(t, s, h, i) {
                return t <= 15 ? s ^ h ^ i : t <= 31 ? s & h | ~s & i : t <= 47 ? (s | ~h) ^ i : t <= 63 ? s & i | h & ~i : s ^ (h | ~i)
            }

            function K(t) {
                return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
            }

            function Kh(t) {
                return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
            }
            var utils = require("./utils"),
                common = require("./common"),
                rotl32 = utils.rotl32,
                sum32 = utils.sum32,
                sum32_3 = utils.sum32_3,
                sum32_4 = utils.sum32_4,
                BlockHash = common.BlockHash;
            utils.inherits(RIPEMD160, BlockHash), exports.ripemd160 = RIPEMD160, RIPEMD160.blockSize = 512, RIPEMD160.outSize = 160, RIPEMD160.hmacStrength = 192, RIPEMD160.padLength = 64, RIPEMD160.prototype._update = function(t, h) {
                for (var i = this.h[0], u = this.h[1], o = this.h[2], e = this.h[3], l = this.h[4], n = i, m = u, c = o, a = e, _ = l, D = 0; D < 80; D++) {
                    var E = sum32(rotl32(sum32_4(i, f(D, u, o, e), t[r[D] + h], K(D)), s[D]), l);
                    i = l, l = e, e = rotl32(o, 10), o = u, u = E, E = sum32(rotl32(sum32_4(n, f(79 - D, m, c, a), t[rh[D] + h], Kh(D)), sh[D]), _), n = _, _ = a, a = rotl32(c, 10), c = m, m = E
                }
                E = sum32_3(this.h[1], o, a), this.h[1] = sum32_3(this.h[2], e, _), this.h[2] = sum32_3(this.h[3], l, n), this.h[3] = sum32_3(this.h[4], i, m), this.h[4] = sum32_3(this.h[0], u, c), this.h[0] = E
            }, RIPEMD160.prototype._digest = function(t) {
                return "hex" === t ? utils.toHex32(this.h, "little") : utils.split32(this.h, "little")
            };
            var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
                rh = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
                s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
                sh = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

        }, {
            "./common": 38,
            "./utils": 48
        }],
        41: [function(require, module, exports) {
            "use strict";
            exports.sha1 = require("./sha/1"), exports.sha224 = require("./sha/224"), exports.sha256 = require("./sha/256"), exports.sha384 = require("./sha/384"), exports.sha512 = require("./sha/512");

        }, {
            "./sha/1": 42,
            "./sha/224": 43,
            "./sha/256": 44,
            "./sha/384": 45,
            "./sha/512": 46
        }],
        42: [function(require, module, exports) {
            "use strict";

            function SHA1() {
                if (!(this instanceof SHA1)) return new SHA1;
                BlockHash.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
            }
            var utils = require("../utils"),
                common = require("../common"),
                shaCommon = require("./common"),
                rotl32 = utils.rotl32,
                sum32 = utils.sum32,
                sum32_5 = utils.sum32_5,
                ft_1 = shaCommon.ft_1,
                BlockHash = common.BlockHash,
                sha1_K = [1518500249, 1859775393, 2400959708, 3395469782];
            utils.inherits(SHA1, BlockHash), module.exports = SHA1, SHA1.blockSize = 512, SHA1.outSize = 160, SHA1.hmacStrength = 80, SHA1.padLength = 64, SHA1.prototype._update = function(t, h) {
                for (var s = this.W, i = 0; i < 16; i++) s[i] = t[h + i];
                for (; i < s.length; i++) s[i] = rotl32(s[i - 3] ^ s[i - 8] ^ s[i - 14] ^ s[i - 16], 1);
                var o = this.h[0],
                    r = this.h[1],
                    u = this.h[2],
                    e = this.h[3],
                    l = this.h[4];
                for (i = 0; i < s.length; i++) {
                    var m = ~~(i / 20),
                        n = sum32_5(rotl32(o, 5), ft_1(m, r, u, e), l, s[i], sha1_K[m]);
                    l = e, e = u, u = rotl32(r, 30), r = o, o = n
                }
                this.h[0] = sum32(this.h[0], o), this.h[1] = sum32(this.h[1], r), this.h[2] = sum32(this.h[2], u), this.h[3] = sum32(this.h[3], e), this.h[4] = sum32(this.h[4], l)
            }, SHA1.prototype._digest = function(t) {
                return "hex" === t ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
            };

        }, {
            "../common": 38,
            "../utils": 48,
            "./common": 47
        }],
        43: [function(require, module, exports) {
            "use strict";

            function SHA224() {
                if (!(this instanceof SHA224)) return new SHA224;
                SHA256.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
            }
            var utils = require("../utils"),
                SHA256 = require("./256");
            utils.inherits(SHA224, SHA256), module.exports = SHA224, SHA224.blockSize = 512, SHA224.outSize = 224, SHA224.hmacStrength = 192, SHA224.padLength = 64, SHA224.prototype._digest = function(t) {
                return "hex" === t ? utils.toHex32(this.h.slice(0, 7), "big") : utils.split32(this.h.slice(0, 7), "big")
            };

        }, {
            "../utils": 48,
            "./256": 44
        }],
        44: [function(require, module, exports) {
            "use strict";

            function SHA256() {
                if (!(this instanceof SHA256)) return new SHA256;
                BlockHash.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = sha256_K, this.W = new Array(64)
            }
            var utils = require("../utils"),
                common = require("../common"),
                shaCommon = require("./common"),
                assert = require("minimalistic-assert"),
                sum32 = utils.sum32,
                sum32_4 = utils.sum32_4,
                sum32_5 = utils.sum32_5,
                ch32 = shaCommon.ch32,
                maj32 = shaCommon.maj32,
                s0_256 = shaCommon.s0_256,
                s1_256 = shaCommon.s1_256,
                g0_256 = shaCommon.g0_256,
                g1_256 = shaCommon.g1_256,
                BlockHash = common.BlockHash,
                sha256_K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
            utils.inherits(SHA256, BlockHash), module.exports = SHA256, SHA256.blockSize = 512, SHA256.outSize = 256, SHA256.hmacStrength = 192, SHA256.padLength = 64, SHA256.prototype._update = function(s, h) {
                for (var t = this.W, i = 0; i < 16; i++) t[i] = s[h + i];
                for (; i < t.length; i++) t[i] = sum32_4(g1_256(t[i - 2]), t[i - 7], g0_256(t[i - 15]), t[i - 16]);
                var m = this.h[0],
                    o = this.h[1],
                    u = this.h[2],
                    e = this.h[3],
                    n = this.h[4],
                    a = this.h[5],
                    r = this.h[6],
                    l = this.h[7];
                for (assert(this.k.length === t.length), i = 0; i < t.length; i++) {
                    var _ = sum32_5(l, s1_256(n), ch32(n, a, r), this.k[i], t[i]),
                        c = sum32(s0_256(m), maj32(m, o, u));
                    l = r, r = a, a = n, n = sum32(e, _), e = u, u = o, o = m, m = sum32(_, c)
                }
                this.h[0] = sum32(this.h[0], m), this.h[1] = sum32(this.h[1], o), this.h[2] = sum32(this.h[2], u), this.h[3] = sum32(this.h[3], e), this.h[4] = sum32(this.h[4], n), this.h[5] = sum32(this.h[5], a), this.h[6] = sum32(this.h[6], r), this.h[7] = sum32(this.h[7], l)
            }, SHA256.prototype._digest = function(s) {
                return "hex" === s ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
            };

        }, {
            "../common": 38,
            "../utils": 48,
            "./common": 47,
            "minimalistic-assert": 63
        }],
        45: [function(require, module, exports) {
            "use strict";

            function SHA384() {
                if (!(this instanceof SHA384)) return new SHA384;
                SHA512.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
            }
            var utils = require("../utils"),
                SHA512 = require("./512");
            utils.inherits(SHA384, SHA512), module.exports = SHA384, SHA384.blockSize = 1024, SHA384.outSize = 384, SHA384.hmacStrength = 192, SHA384.padLength = 128, SHA384.prototype._digest = function(t) {
                return "hex" === t ? utils.toHex32(this.h.slice(0, 12), "big") : utils.split32(this.h.slice(0, 12), "big")
            };

        }, {
            "../utils": 48,
            "./512": 46
        }],
        46: [function(require, module, exports) {
            "use strict";

            function SHA512() {
                if (!(this instanceof SHA512)) return new SHA512;
                BlockHash.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = sha512_K, this.W = new Array(160)
            }

            function ch64_hi(t, h, r, i, s) {
                var _ = t & r ^ ~t & s;
                return _ < 0 && (_ += 4294967296), _
            }

            function ch64_lo(t, h, r, i, s, _) {
                var o = h & i ^ ~h & _;
                return o < 0 && (o += 4294967296), o
            }

            function maj64_hi(t, h, r, i, s) {
                var _ = t & r ^ t & s ^ r & s;
                return _ < 0 && (_ += 4294967296), _
            }

            function maj64_lo(t, h, r, i, s, _) {
                var o = h & i ^ h & _ ^ i & _;
                return o < 0 && (o += 4294967296), o
            }

            function s0_512_hi(t, h) {
                var r = rotr64_hi(t, h, 28) ^ rotr64_hi(h, t, 2) ^ rotr64_hi(h, t, 7);
                return r < 0 && (r += 4294967296), r
            }

            function s0_512_lo(t, h) {
                var r = rotr64_lo(t, h, 28) ^ rotr64_lo(h, t, 2) ^ rotr64_lo(h, t, 7);
                return r < 0 && (r += 4294967296), r
            }

            function s1_512_hi(t, h) {
                var r = rotr64_hi(t, h, 14) ^ rotr64_hi(t, h, 18) ^ rotr64_hi(h, t, 9);
                return r < 0 && (r += 4294967296), r
            }

            function s1_512_lo(t, h) {
                var r = rotr64_lo(t, h, 14) ^ rotr64_lo(t, h, 18) ^ rotr64_lo(h, t, 9);
                return r < 0 && (r += 4294967296), r
            }

            function g0_512_hi(t, h) {
                var r = rotr64_hi(t, h, 1) ^ rotr64_hi(t, h, 8) ^ shr64_hi(t, h, 7);
                return r < 0 && (r += 4294967296), r
            }

            function g0_512_lo(t, h) {
                var r = rotr64_lo(t, h, 1) ^ rotr64_lo(t, h, 8) ^ shr64_lo(t, h, 7);
                return r < 0 && (r += 4294967296), r
            }

            function g1_512_hi(t, h) {
                var r = rotr64_hi(t, h, 19) ^ rotr64_hi(h, t, 29) ^ shr64_hi(t, h, 6);
                return r < 0 && (r += 4294967296), r
            }

            function g1_512_lo(t, h) {
                var r = rotr64_lo(t, h, 19) ^ rotr64_lo(h, t, 29) ^ shr64_lo(t, h, 6);
                return r < 0 && (r += 4294967296), r
            }
            var utils = require("../utils"),
                common = require("../common"),
                assert = require("minimalistic-assert"),
                rotr64_hi = utils.rotr64_hi,
                rotr64_lo = utils.rotr64_lo,
                shr64_hi = utils.shr64_hi,
                shr64_lo = utils.shr64_lo,
                sum64 = utils.sum64,
                sum64_hi = utils.sum64_hi,
                sum64_lo = utils.sum64_lo,
                sum64_4_hi = utils.sum64_4_hi,
                sum64_4_lo = utils.sum64_4_lo,
                sum64_5_hi = utils.sum64_5_hi,
                sum64_5_lo = utils.sum64_5_lo,
                BlockHash = common.BlockHash,
                sha512_K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
            utils.inherits(SHA512, BlockHash), module.exports = SHA512, SHA512.blockSize = 1024, SHA512.outSize = 512, SHA512.hmacStrength = 192, SHA512.padLength = 128, SHA512.prototype._prepareBlock = function(t, h) {
                for (var r = this.W, i = 0; i < 32; i++) r[i] = t[h + i];
                for (; i < r.length; i += 2) {
                    var s = g1_512_hi(r[i - 4], r[i - 3]),
                        _ = g1_512_lo(r[i - 4], r[i - 3]),
                        o = r[i - 14],
                        u = r[i - 13],
                        l = g0_512_hi(r[i - 30], r[i - 29]),
                        n = g0_512_lo(r[i - 30], r[i - 29]),
                        e = r[i - 32],
                        m = r[i - 31];
                    r[i] = sum64_4_hi(s, _, o, u, l, n, e, m), r[i + 1] = sum64_4_lo(s, _, o, u, l, n, e, m)
                }
            }, SHA512.prototype._update = function(t, h) {
                this._prepareBlock(t, h);
                var r = this.W,
                    i = this.h[0],
                    s = this.h[1],
                    _ = this.h[2],
                    o = this.h[3],
                    u = this.h[4],
                    l = this.h[5],
                    n = this.h[6],
                    e = this.h[7],
                    m = this.h[8],
                    a = this.h[9],
                    c = this.h[10],
                    f = this.h[11],
                    v = this.h[12],
                    g = this.h[13],
                    H = this.h[14],
                    S = this.h[15];
                assert(this.k.length === r.length);
                for (var p = 0; p < r.length; p += 2) {
                    var A = H,
                        k = S,
                        B = s1_512_hi(m, a),
                        d = s1_512_lo(m, a),
                        j = ch64_hi(m, a, c, f, v, g),
                        y = ch64_lo(m, a, c, f, v, g),
                        b = this.k[p],
                        q = this.k[p + 1],
                        x = r[p],
                        W = r[p + 1],
                        w = sum64_5_hi(A, k, B, d, j, y, b, q, x, W),
                        z = sum64_5_lo(A, k, B, d, j, y, b, q, x, W);
                    A = s0_512_hi(i, s), k = s0_512_lo(i, s), B = maj64_hi(i, s, _, o, u, l), d = maj64_lo(i, s, _, o, u, l);
                    var K = sum64_hi(A, k, B, d),
                        L = sum64_lo(A, k, B, d);
                    H = v, S = g, v = c, g = f, c = m, f = a, m = sum64_hi(n, e, w, z), a = sum64_lo(e, e, w, z), n = u, e = l, u = _, l = o, _ = i, o = s, i = sum64_hi(w, z, K, L), s = sum64_lo(w, z, K, L)
                }
                sum64(this.h, 0, i, s), sum64(this.h, 2, _, o), sum64(this.h, 4, u, l), sum64(this.h, 6, n, e), sum64(this.h, 8, m, a), sum64(this.h, 10, c, f), sum64(this.h, 12, v, g), sum64(this.h, 14, H, S)
            }, SHA512.prototype._digest = function(t) {
                return "hex" === t ? utils.toHex32(this.h, "big") : utils.split32(this.h, "big")
            };

        }, {
            "../common": 38,
            "../utils": 48,
            "minimalistic-assert": 63
        }],
        47: [function(require, module, exports) {
            "use strict";

            function ft_1(r, t, o, n) {
                return 0 === r ? ch32(t, o, n) : 1 === r || 3 === r ? p32(t, o, n) : 2 === r ? maj32(t, o, n) : void 0
            }

            function ch32(r, t, o) {
                return r & t ^ ~r & o
            }

            function maj32(r, t, o) {
                return r & t ^ r & o ^ t & o
            }

            function p32(r, t, o) {
                return r ^ t ^ o
            }

            function s0_256(r) {
                return rotr32(r, 2) ^ rotr32(r, 13) ^ rotr32(r, 22)
            }

            function s1_256(r) {
                return rotr32(r, 6) ^ rotr32(r, 11) ^ rotr32(r, 25)
            }

            function g0_256(r) {
                return rotr32(r, 7) ^ rotr32(r, 18) ^ r >>> 3
            }

            function g1_256(r) {
                return rotr32(r, 17) ^ rotr32(r, 19) ^ r >>> 10
            }
            var utils = require("../utils"),
                rotr32 = utils.rotr32;
            exports.ft_1 = ft_1, exports.ch32 = ch32, exports.maj32 = maj32, exports.p32 = p32, exports.s0_256 = s0_256, exports.s1_256 = s1_256, exports.g0_256 = g0_256, exports.g1_256 = g1_256;

        }, {
            "../utils": 48
        }],
        48: [function(require, module, exports) {
            "use strict";

            function toArray(r, t) {
                if (Array.isArray(r)) return r.slice();
                if (!r) return [];
                var o = [];
                if ("string" == typeof r)
                    if (t) {
                        if ("hex" === t)
                            for ((r = r.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (r = "0" + r), n = 0; n < r.length; n += 2) o.push(parseInt(r[n] + r[n + 1], 16))
                    } else
                        for (var n = 0; n < r.length; n++) {
                            var e = r.charCodeAt(n),
                                s = e >> 8,
                                u = 255 & e;
                            s ? o.push(s, u) : o.push(u)
                        } else
                            for (n = 0; n < r.length; n++) o[n] = 0 | r[n];
                return o
            }

            function toHex(r) {
                for (var t = "", o = 0; o < r.length; o++) t += zero2(r[o].toString(16));
                return t
            }

            function htonl(r) {
                return (r >>> 24 | r >>> 8 & 65280 | r << 8 & 16711680 | (255 & r) << 24) >>> 0
            }

            function toHex32(r, t) {
                for (var o = "", n = 0; n < r.length; n++) {
                    var e = r[n];
                    "little" === t && (e = htonl(e)), o += zero8(e.toString(16))
                }
                return o
            }

            function zero2(r) {
                return 1 === r.length ? "0" + r : r
            }

            function zero8(r) {
                return 7 === r.length ? "0" + r : 6 === r.length ? "00" + r : 5 === r.length ? "000" + r : 4 === r.length ? "0000" + r : 3 === r.length ? "00000" + r : 2 === r.length ? "000000" + r : 1 === r.length ? "0000000" + r : r
            }

            function join32(r, t, o, n) {
                var e = o - t;
                assert(e % 4 == 0);
                for (var s = new Array(e / 4), u = 0, i = t; u < s.length; u++, i += 4) {
                    var h;
                    h = "big" === n ? r[i] << 24 | r[i + 1] << 16 | r[i + 2] << 8 | r[i + 3] : r[i + 3] << 24 | r[i + 2] << 16 | r[i + 1] << 8 | r[i], s[u] = h >>> 0
                }
                return s
            }

            function split32(r, t) {
                for (var o = new Array(4 * r.length), n = 0, e = 0; n < r.length; n++, e += 4) {
                    var s = r[n];
                    "big" === t ? (o[e] = s >>> 24, o[e + 1] = s >>> 16 & 255, o[e + 2] = s >>> 8 & 255, o[e + 3] = 255 & s) : (o[e + 3] = s >>> 24, o[e + 2] = s >>> 16 & 255, o[e + 1] = s >>> 8 & 255, o[e] = 255 & s)
                }
                return o
            }

            function rotr32(r, t) {
                return r >>> t | r << 32 - t
            }

            function rotl32(r, t) {
                return r << t | r >>> 32 - t
            }

            function sum32(r, t) {
                return r + t >>> 0
            }

            function sum32_3(r, t, o) {
                return r + t + o >>> 0
            }

            function sum32_4(r, t, o, n) {
                return r + t + o + n >>> 0
            }

            function sum32_5(r, t, o, n, e) {
                return r + t + o + n + e >>> 0
            }

            function sum64(r, t, o, n) {
                var e = r[t],
                    s = n + r[t + 1] >>> 0,
                    u = (s < n ? 1 : 0) + o + e;
                r[t] = u >>> 0, r[t + 1] = s
            }

            function sum64_hi(r, t, o, n) {
                return (t + n >>> 0 < t ? 1 : 0) + r + o >>> 0
            }

            function sum64_lo(r, t, o, n) {
                return t + n >>> 0
            }

            function sum64_4_hi(r, t, o, n, e, s, u, i) {
                var h = 0,
                    _ = t;
                return h += (_ = _ + n >>> 0) < t ? 1 : 0, h += (_ = _ + s >>> 0) < s ? 1 : 0, r + o + e + u + (h += (_ = _ + i >>> 0) < i ? 1 : 0) >>> 0
            }

            function sum64_4_lo(r, t, o, n, e, s, u, i) {
                return t + n + s + i >>> 0
            }

            function sum64_5_hi(r, t, o, n, e, s, u, i, h, _) {
                var l = 0,
                    f = t;
                return l += (f = f + n >>> 0) < t ? 1 : 0, l += (f = f + s >>> 0) < s ? 1 : 0, l += (f = f + i >>> 0) < i ? 1 : 0, r + o + e + u + h + (l += (f = f + _ >>> 0) < _ ? 1 : 0) >>> 0
            }

            function sum64_5_lo(r, t, o, n, e, s, u, i, h, _) {
                return t + n + s + i + _ >>> 0
            }

            function rotr64_hi(r, t, o) {
                return (t << 32 - o | r >>> o) >>> 0
            }

            function rotr64_lo(r, t, o) {
                return (r << 32 - o | t >>> o) >>> 0
            }

            function shr64_hi(r, t, o) {
                return r >>> o
            }

            function shr64_lo(r, t, o) {
                return (r << 32 - o | t >>> o) >>> 0
            }
            var assert = require("minimalistic-assert"),
                inherits = require("inherits");
            exports.inherits = inherits, exports.toArray = toArray, exports.toHex = toHex, exports.htonl = htonl, exports.toHex32 = toHex32, exports.zero2 = zero2, exports.zero8 = zero8, exports.join32 = join32, exports.split32 = split32, exports.rotr32 = rotr32, exports.rotl32 = rotl32, exports.sum32 = sum32, exports.sum32_3 = sum32_3, exports.sum32_4 = sum32_4, exports.sum32_5 = sum32_5, exports.sum64 = sum64, exports.sum64_hi = sum64_hi, exports.sum64_lo = sum64_lo, exports.sum64_4_hi = sum64_4_hi, exports.sum64_4_lo = sum64_4_lo, exports.sum64_5_hi = sum64_5_hi, exports.sum64_5_lo = sum64_5_lo, exports.rotr64_hi = rotr64_hi, exports.rotr64_lo = rotr64_lo, exports.shr64_hi = shr64_hi, exports.shr64_lo = shr64_lo;

        }, {
            "inherits": 51,
            "minimalistic-assert": 63
        }],
        49: [function(require, module, exports) {
            "use strict";

            function HmacDRBG(t) {
                if (!(this instanceof HmacDRBG)) return new HmacDRBG(t);
                this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
                var e = utils.toArray(t.entropy, t.entropyEnc || "hex"),
                    i = utils.toArray(t.nonce, t.nonceEnc || "hex"),
                    s = utils.toArray(t.pers, t.persEnc || "hex");
                assert(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, i, s)
            }
            var hash = require("hash.js"),
                utils = require("minimalistic-crypto-utils"),
                assert = require("minimalistic-assert");
            module.exports = HmacDRBG, HmacDRBG.prototype._init = function(t, e, i) {
                var s = t.concat(e).concat(i);
                this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
                for (var h = 0; h < this.V.length; h++) this.K[h] = 0, this.V[h] = 1;
                this._update(s), this._reseed = 1, this.reseedInterval = 281474976710656
            }, HmacDRBG.prototype._hmac = function() {
                return new hash.hmac(this.hash, this.K)
            }, HmacDRBG.prototype._update = function(t) {
                var e = this._hmac().update(this.V).update([0]);
                t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
            }, HmacDRBG.prototype.reseed = function(t, e, i, s) {
                "string" != typeof e && (s = i, i = e, e = null), t = utils.toArray(t, e), i = utils.toArray(i, s), assert(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i || [])), this._reseed = 1
            }, HmacDRBG.prototype.generate = function(t, e, i, s) {
                if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
                "string" != typeof e && (s = i, i = e, e = null), i && (i = utils.toArray(i, s || "hex"), this._update(i));
                for (var h = []; h.length < t;) this.V = this._hmac().update(this.V).digest(), h = h.concat(this.V);
                var r = h.slice(0, t);
                return this._update(i), this._reseed++, utils.encode(r, e)
            };

        }, {
            "hash.js": 37,
            "minimalistic-assert": 63,
            "minimalistic-crypto-utils": 64
        }],
        50: [function(require, module, exports) {
            exports.read = function(a, o, t, r, h) {
                var M, p, w = 8 * h - r - 1,
                    f = (1 << w) - 1,
                    e = f >> 1,
                    i = -7,
                    N = t ? h - 1 : 0,
                    n = t ? -1 : 1,
                    s = a[o + N];
                for (N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8);
                for (p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8);
                if (0 === M) M = 1 - e;
                else {
                    if (M === f) return p ? NaN : 1 / 0 * (s ? -1 : 1);
                    p += Math.pow(2, r), M -= e
                }
                return (s ? -1 : 1) * p * Math.pow(2, M - r)
            }, exports.write = function(a, o, t, r, h, M) {
                var p, w, f, e = 8 * M - h - 1,
                    i = (1 << e) - 1,
                    N = i >> 1,
                    n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    s = r ? 0 : M - 1,
                    u = r ? 1 : -1,
                    l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
                for (o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8);
                for (p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8);
                a[t + s - u] |= 128 * l
            };

        }, {}],
        51: [function(require, module, exports) {
            "function" == typeof Object.create ? module.exports = function(t, e) {
                t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : module.exports = function(t, e) {
                t.super_ = e;
                var o = function() {};
                o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
            };

        }, {}],
        52: [function(require, module, exports) {
            function isBuffer(f) {
                return !!f.constructor && "function" == typeof f.constructor.isBuffer && f.constructor.isBuffer(f)
            }

            function isSlowBuffer(f) {
                return "function" == typeof f.readFloatLE && "function" == typeof f.slice && isBuffer(f.slice(0, 0))
            }
            module.exports = function(f) {
                return null != f && (isBuffer(f) || isSlowBuffer(f) || !!f._isBuffer)
            };

        }, {}],
        53: [function(require, module, exports) {
            module.exports = function(e) {
                if ("string" != typeof e) throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof e + ", while checking isHexPrefixed.");
                return "0x" === e.slice(0, 2)
            };

        }, {}],
        54: [function(require, module, exports) {
            var toString = {}.toString;
            module.exports = Array.isArray || function(r) {
                return "[object Array]" == toString.call(r)
            };

        }, {}],
        55: [function(require, module, exports) {
            (function(global) {
                ! function(r, e) {
                    "use strict";
                    var n = "undefined" != typeof module;
                    n && (r = global).JS_SHA3_TEST && (r.navigator = {
                        userAgent: "Chrome"
                    });
                    var t = (r.JS_SHA3_TEST || !n) && -1 != navigator.userAgent.indexOf("Chrome"),
                        o = "0123456789abcdef".split(""),
                        a = [1, 256, 65536, 16777216],
                        c = [6, 1536, 393216, 100663296],
                        f = [0, 8, 16, 24],
                        u = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648],
                        i = [],
                        _ = [],
                        s = function(r) {
                            return v(r, 224, a)
                        },
                        k = function(r) {
                            return v(r, 256, a)
                        },
                        h = function(r) {
                            return v(r, 384, a)
                        },
                        d = function(r) {
                            return v(r, 224, c)
                        },
                        l = function(r) {
                            return v(r, 256, c)
                        },
                        A = function(r) {
                            return v(r, 384, c)
                        },
                        S = function(r) {
                            return v(r, 512, c)
                        },
                        v = function(e, n, c) {
                            var s = "string" != typeof e;
                            s && e.constructor == r.ArrayBuffer && (e = new Uint8Array(e)), void 0 === n && (n = 512, c = a);
                            var k, h, d, l, A, S, v, g, T, m, p, y, C, E, H, J, b, w, x, B, O, U, j, q, z, D, F, G, I, K, L, M, N, P, Q, R, V, W, X, Y, Z, $, rr, er, nr, tr, or, ar, cr, fr, ur, ir, _r, sr, kr, hr, dr, lr, Ar, Sr, vr, gr, Tr, mr, pr, yr, Cr = !1,
                                Er = 0,
                                Hr = 0,
                                Jr = e.length,
                                br = (1600 - 2 * n) / 32,
                                wr = 4 * br;
                            for (l = 0; l < 50; ++l) _[l] = 0;
                            k = 0;
                            do {
                                for (i[0] = k, l = 1; l < br + 1; ++l) i[l] = 0;
                                if (s)
                                    for (l = Hr; Er < Jr && l < wr; ++Er) i[l >> 2] |= e[Er] << f[3 & l++];
                                else
                                    for (l = Hr; Er < Jr && l < wr; ++Er)(h = e.charCodeAt(Er)) < 128 ? i[l >> 2] |= h << f[3 & l++] : h < 2048 ? (i[l >> 2] |= (192 | h >> 6) << f[3 & l++], i[l >> 2] |= (128 | 63 & h) << f[3 & l++]) : h < 55296 || h >= 57344 ? (i[l >> 2] |= (224 | h >> 12) << f[3 & l++], i[l >> 2] |= (128 | h >> 6 & 63) << f[3 & l++], i[l >> 2] |= (128 | 63 & h) << f[3 & l++]) : (h = 65536 + ((1023 & h) << 10 | 1023 & e.charCodeAt(++Er)), i[l >> 2] |= (240 | h >> 18) << f[3 & l++], i[l >> 2] |= (128 | h >> 12 & 63) << f[3 & l++], i[l >> 2] |= (128 | h >> 6 & 63) << f[3 & l++], i[l >> 2] |= (128 | 63 & h) << f[3 & l++]);
                                for (Hr = l - wr, Er == Jr && (i[l >> 2] |= c[3 & l], ++Er), k = i[br], Er > Jr && l < wr && (i[br - 1] |= 2147483648, Cr = !0), l = 0; l < br; ++l) _[l] ^= i[l];
                                for (d = 0; d < 48; d += 2) v = _[0] ^ _[10] ^ _[20] ^ _[30] ^ _[40], g = _[1] ^ _[11] ^ _[21] ^ _[31] ^ _[41], T = _[2] ^ _[12] ^ _[22] ^ _[32] ^ _[42], m = _[3] ^ _[13] ^ _[23] ^ _[33] ^ _[43], p = _[4] ^ _[14] ^ _[24] ^ _[34] ^ _[44], y = _[5] ^ _[15] ^ _[25] ^ _[35] ^ _[45], C = _[6] ^ _[16] ^ _[26] ^ _[36] ^ _[46], E = _[7] ^ _[17] ^ _[27] ^ _[37] ^ _[47], A = (H = _[8] ^ _[18] ^ _[28] ^ _[38] ^ _[48]) ^ (T << 1 | m >>> 31), S = (J = _[9] ^ _[19] ^ _[29] ^ _[39] ^ _[49]) ^ (m << 1 | T >>> 31), _[0] ^= A, _[1] ^= S, _[10] ^= A, _[11] ^= S, _[20] ^= A, _[21] ^= S, _[30] ^= A, _[31] ^= S, _[40] ^= A, _[41] ^= S, A = v ^ (p << 1 | y >>> 31), S = g ^ (y << 1 | p >>> 31), _[2] ^= A, _[3] ^= S, _[12] ^= A, _[13] ^= S, _[22] ^= A, _[23] ^= S, _[32] ^= A, _[33] ^= S, _[42] ^= A, _[43] ^= S, A = T ^ (C << 1 | E >>> 31), S = m ^ (E << 1 | C >>> 31), _[4] ^= A, _[5] ^= S, _[14] ^= A, _[15] ^= S, _[24] ^= A, _[25] ^= S, _[34] ^= A, _[35] ^= S, _[44] ^= A, _[45] ^= S, A = p ^ (H << 1 | J >>> 31), S = y ^ (J << 1 | H >>> 31), _[6] ^= A, _[7] ^= S, _[16] ^= A, _[17] ^= S, _[26] ^= A, _[27] ^= S, _[36] ^= A, _[37] ^= S, _[46] ^= A, _[47] ^= S, A = C ^ (v << 1 | g >>> 31), S = E ^ (g << 1 | v >>> 31), _[8] ^= A, _[9] ^= S, _[18] ^= A, _[19] ^= S, _[28] ^= A, _[29] ^= S, _[38] ^= A, _[39] ^= S, _[48] ^= A, _[49] ^= S, b = _[0], w = _[1], cr = _[11] << 4 | _[10] >>> 28, fr = _[10] << 4 | _[11] >>> 28, L = _[20] << 3 | _[21] >>> 29, M = _[21] << 3 | _[20] >>> 29, Tr = _[31] << 9 | _[30] >>> 23, mr = _[30] << 9 | _[31] >>> 23, nr = _[40] << 18 | _[41] >>> 14, tr = _[41] << 18 | _[40] >>> 14, V = _[2] << 1 | _[3] >>> 31, W = _[3] << 1 | _[2] >>> 31, x = _[13] << 12 | _[12] >>> 20, B = _[12] << 12 | _[13] >>> 20, ur = _[22] << 10 | _[23] >>> 22, ir = _[23] << 10 | _[22] >>> 22, N = _[33] << 13 | _[32] >>> 19, P = _[32] << 13 | _[33] >>> 19, pr = _[42] << 2 | _[43] >>> 30, yr = _[43] << 2 | _[42] >>> 30, dr = _[5] << 30 | _[4] >>> 2, lr = _[4] << 30 | _[5] >>> 2, X = _[14] << 6 | _[15] >>> 26, Y = _[15] << 6 | _[14] >>> 26, O = _[25] << 11 | _[24] >>> 21, U = _[24] << 11 | _[25] >>> 21, _r = _[34] << 15 | _[35] >>> 17, sr = _[35] << 15 | _[34] >>> 17, Q = _[45] << 29 | _[44] >>> 3, R = _[44] << 29 | _[45] >>> 3, F = _[6] << 28 | _[7] >>> 4, G = _[7] << 28 | _[6] >>> 4, Ar = _[17] << 23 | _[16] >>> 9, Sr = _[16] << 23 | _[17] >>> 9, Z = _[26] << 25 | _[27] >>> 7, $ = _[27] << 25 | _[26] >>> 7, j = _[36] << 21 | _[37] >>> 11, q = _[37] << 21 | _[36] >>> 11, kr = _[47] << 24 | _[46] >>> 8, hr = _[46] << 24 | _[47] >>> 8, or = _[8] << 27 | _[9] >>> 5, ar = _[9] << 27 | _[8] >>> 5, I = _[18] << 20 | _[19] >>> 12, K = _[19] << 20 | _[18] >>> 12, vr = _[29] << 7 | _[28] >>> 25, gr = _[28] << 7 | _[29] >>> 25, rr = _[38] << 8 | _[39] >>> 24, er = _[39] << 8 | _[38] >>> 24, z = _[48] << 14 | _[49] >>> 18, D = _[49] << 14 | _[48] >>> 18, _[0] = b ^ ~x & O, _[1] = w ^ ~B & U, _[10] = F ^ ~I & L, _[11] = G ^ ~K & M, _[20] = V ^ ~X & Z, _[21] = W ^ ~Y & $, _[30] = or ^ ~cr & ur, _[31] = ar ^ ~fr & ir, _[40] = dr ^ ~Ar & vr, _[41] = lr ^ ~Sr & gr, _[2] = x ^ ~O & j, _[3] = B ^ ~U & q, _[12] = I ^ ~L & N, _[13] = K ^ ~M & P, _[22] = X ^ ~Z & rr, _[23] = Y ^ ~$ & er, _[32] = cr ^ ~ur & _r, _[33] = fr ^ ~ir & sr, _[42] = Ar ^ ~vr & Tr, _[43] = Sr ^ ~gr & mr, _[4] = O ^ ~j & z, _[5] = U ^ ~q & D, _[14] = L ^ ~N & Q, _[15] = M ^ ~P & R, _[24] = Z ^ ~rr & nr, _[25] = $ ^ ~er & tr, _[34] = ur ^ ~_r & kr, _[35] = ir ^ ~sr & hr, _[44] = vr ^ ~Tr & pr, _[45] = gr ^ ~mr & yr, _[6] = j ^ ~z & b, _[7] = q ^ ~D & w, _[16] = N ^ ~Q & F, _[17] = P ^ ~R & G, _[26] = rr ^ ~nr & V, _[27] = er ^ ~tr & W, _[36] = _r ^ ~kr & or, _[37] = sr ^ ~hr & ar, _[46] = Tr ^ ~pr & dr, _[47] = mr ^ ~yr & lr, _[8] = z ^ ~b & x, _[9] = D ^ ~w & B, _[18] = Q ^ ~F & I, _[19] = R ^ ~G & K, _[28] = nr ^ ~V & X, _[29] = tr ^ ~W & Y, _[38] = kr ^ ~or & cr, _[39] = hr ^ ~ar & fr, _[48] = pr ^ ~dr & Ar, _[49] = yr ^ ~lr & Sr, _[0] ^= u[d], _[1] ^= u[d + 1]
                            } while (!Cr);
                            var xr = "";
                            if (t) b = _[0], w = _[1], x = _[2], B = _[3], O = _[4], U = _[5], j = _[6], q = _[7], z = _[8], D = _[9], F = _[10], G = _[11], I = _[12], K = _[13], L = _[14], M = _[15], xr += o[b >> 4 & 15] + o[15 & b] + o[b >> 12 & 15] + o[b >> 8 & 15] + o[b >> 20 & 15] + o[b >> 16 & 15] + o[b >> 28 & 15] + o[b >> 24 & 15] + o[w >> 4 & 15] + o[15 & w] + o[w >> 12 & 15] + o[w >> 8 & 15] + o[w >> 20 & 15] + o[w >> 16 & 15] + o[w >> 28 & 15] + o[w >> 24 & 15] + o[x >> 4 & 15] + o[15 & x] + o[x >> 12 & 15] + o[x >> 8 & 15] + o[x >> 20 & 15] + o[x >> 16 & 15] + o[x >> 28 & 15] + o[x >> 24 & 15] + o[B >> 4 & 15] + o[15 & B] + o[B >> 12 & 15] + o[B >> 8 & 15] + o[B >> 20 & 15] + o[B >> 16 & 15] + o[B >> 28 & 15] + o[B >> 24 & 15] + o[O >> 4 & 15] + o[15 & O] + o[O >> 12 & 15] + o[O >> 8 & 15] + o[O >> 20 & 15] + o[O >> 16 & 15] + o[O >> 28 & 15] + o[O >> 24 & 15] + o[U >> 4 & 15] + o[15 & U] + o[U >> 12 & 15] + o[U >> 8 & 15] + o[U >> 20 & 15] + o[U >> 16 & 15] + o[U >> 28 & 15] + o[U >> 24 & 15] + o[j >> 4 & 15] + o[15 & j] + o[j >> 12 & 15] + o[j >> 8 & 15] + o[j >> 20 & 15] + o[j >> 16 & 15] + o[j >> 28 & 15] + o[j >> 24 & 15], n >= 256 && (xr += o[q >> 4 & 15] + o[15 & q] + o[q >> 12 & 15] + o[q >> 8 & 15] + o[q >> 20 & 15] + o[q >> 16 & 15] + o[q >> 28 & 15] + o[q >> 24 & 15]), n >= 384 && (xr += o[z >> 4 & 15] + o[15 & z] + o[z >> 12 & 15] + o[z >> 8 & 15] + o[z >> 20 & 15] + o[z >> 16 & 15] + o[z >> 28 & 15] + o[z >> 24 & 15] + o[D >> 4 & 15] + o[15 & D] + o[D >> 12 & 15] + o[D >> 8 & 15] + o[D >> 20 & 15] + o[D >> 16 & 15] + o[D >> 28 & 15] + o[D >> 24 & 15] + o[F >> 4 & 15] + o[15 & F] + o[F >> 12 & 15] + o[F >> 8 & 15] + o[F >> 20 & 15] + o[F >> 16 & 15] + o[F >> 28 & 15] + o[F >> 24 & 15] + o[G >> 4 & 15] + o[15 & G] + o[G >> 12 & 15] + o[G >> 8 & 15] + o[G >> 20 & 15] + o[G >> 16 & 15] + o[G >> 28 & 15] + o[G >> 24 & 15]), 512 == n && (xr += o[I >> 4 & 15] + o[15 & I] + o[I >> 12 & 15] + o[I >> 8 & 15] + o[I >> 20 & 15] + o[I >> 16 & 15] + o[I >> 28 & 15] + o[I >> 24 & 15] + o[K >> 4 & 15] + o[15 & K] + o[K >> 12 & 15] + o[K >> 8 & 15] + o[K >> 20 & 15] + o[K >> 16 & 15] + o[K >> 28 & 15] + o[K >> 24 & 15] + o[L >> 4 & 15] + o[15 & L] + o[L >> 12 & 15] + o[L >> 8 & 15] + o[L >> 20 & 15] + o[L >> 16 & 15] + o[L >> 28 & 15] + o[L >> 24 & 15] + o[M >> 4 & 15] + o[15 & M] + o[M >> 12 & 15] + o[M >> 8 & 15] + o[M >> 20 & 15] + o[M >> 16 & 15] + o[M >> 28 & 15] + o[M >> 24 & 15]);
                            else
                                for (l = 0, d = n / 32; l < d; ++l) A = _[l], xr += o[A >> 4 & 15] + o[15 & A] + o[A >> 12 & 15] + o[A >> 8 & 15] + o[A >> 20 & 15] + o[A >> 16 & 15] + o[A >> 28 & 15] + o[A >> 24 & 15];
                            return xr
                        };
                    !r.JS_SHA3_TEST && n ? module.exports = {
                        sha3_512: S,
                        sha3_384: A,
                        sha3_256: l,
                        sha3_224: d,
                        keccak_512: v,
                        keccak_384: h,
                        keccak_256: k,
                        keccak_224: s
                    } : r && (r.sha3_512 = S, r.sha3_384 = A, r.sha3_256 = l, r.sha3_224 = d, r.keccak_512 = v, r.keccak_384 = h, r.keccak_256 = k, r.keccak_224 = s)
                }(this);

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        56: [function(require, module, exports) {
            "use strict";
            module.exports = require("./lib/api")(require("./lib/keccak"));

        }, {
            "./lib/api": 57,
            "./lib/keccak": 61
        }],
        57: [function(require, module, exports) {
            "use strict";
            var createKeccak = require("./keccak"),
                createShake = require("./shake");
            module.exports = function(e) {
                var r = createKeccak(e),
                    a = createShake(e);
                return function(e, c) {
                    switch ("string" == typeof e ? e.toLowerCase() : e) {
                        case "keccak224":
                            return new r(1152, 448, null, 224, c);
                        case "keccak256":
                            return new r(1088, 512, null, 256, c);
                        case "keccak384":
                            return new r(832, 768, null, 384, c);
                        case "keccak512":
                            return new r(576, 1024, null, 512, c);
                        case "sha3-224":
                            return new r(1152, 448, 6, 224, c);
                        case "sha3-256":
                            return new r(1088, 512, 6, 256, c);
                        case "sha3-384":
                            return new r(832, 768, 6, 384, c);
                        case "sha3-512":
                            return new r(576, 1024, 6, 512, c);
                        case "shake128":
                            return new a(1344, 256, 31, c);
                        case "shake256":
                            return new a(1088, 512, 31, c);
                        default:
                            throw new Error("Invald algorithm: " + e)
                    }
                }
            };

        }, {
            "./keccak": 58,
            "./shake": 59
        }],
        58: [function(require, module, exports) {
            "use strict";
            var Buffer = require("safe-buffer").Buffer,
                Transform = require("stream").Transform,
                inherits = require("inherits");
            module.exports = function(t) {
                function i(i, e, r, s, a) {
                    Transform.call(this, a), this._rate = i, this._capacity = e, this._delimitedSuffix = r, this._hashBitLength = s, this._options = a, this._state = new t, this._state.initialize(i, e), this._finalized = !1
                }
                return inherits(i, Transform), i.prototype._transform = function(t, i, e) {
                    var r = null;
                    try {
                        this.update(t, i)
                    } catch (t) {
                        r = t
                    }
                    e(r)
                }, i.prototype._flush = function(t) {
                    var i = null;
                    try {
                        this.push(this.digest())
                    } catch (t) {
                        i = t
                    }
                    t(i)
                }, i.prototype.update = function(t, i) {
                    if (!Buffer.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
                    if (this._finalized) throw new Error("Digest already called");
                    return Buffer.isBuffer(t) || (t = Buffer.from(t, i)), this._state.absorb(t), this
                }, i.prototype.digest = function(t) {
                    if (this._finalized) throw new Error("Digest already called");
                    this._finalized = !0, this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
                    var i = this._state.squeeze(this._hashBitLength / 8);
                    return void 0 !== t && (i = i.toString(t)), this._resetState(), i
                }, i.prototype._resetState = function() {
                    return this._state.initialize(this._rate, this._capacity), this
                }, i.prototype._clone = function() {
                    var t = new i(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
                    return this._state.copy(t._state), t._finalized = this._finalized, t
                }, i
            };

        }, {
            "inherits": 51,
            "safe-buffer": 82,
            "stream": 97
        }],
        59: [function(require, module, exports) {
            "use strict";
            var Buffer = require("safe-buffer").Buffer,
                Transform = require("stream").Transform,
                inherits = require("inherits");
            module.exports = function(t) {
                function i(i, e, r, s) {
                    Transform.call(this, s), this._rate = i, this._capacity = e, this._delimitedSuffix = r, this._options = s, this._state = new t, this._state.initialize(i, e), this._finalized = !1
                }
                return inherits(i, Transform), i.prototype._transform = function(t, i, e) {
                    var r = null;
                    try {
                        this.update(t, i)
                    } catch (t) {
                        r = t
                    }
                    e(r)
                }, i.prototype._flush = function() {}, i.prototype._read = function(t) {
                    this.push(this.squeeze(t))
                }, i.prototype.update = function(t, i) {
                    if (!Buffer.isBuffer(t) && "string" != typeof t) throw new TypeError("Data must be a string or a buffer");
                    if (this._finalized) throw new Error("Squeeze already called");
                    return Buffer.isBuffer(t) || (t = Buffer.from(t, i)), this._state.absorb(t), this
                }, i.prototype.squeeze = function(t, i) {
                    this._finalized || (this._finalized = !0, this._state.absorbLastFewBits(this._delimitedSuffix));
                    var e = this._state.squeeze(t);
                    return void 0 !== i && (e = e.toString(i)), e
                }, i.prototype._resetState = function() {
                    return this._state.initialize(this._rate, this._capacity), this
                }, i.prototype._clone = function() {
                    var t = new i(this._rate, this._capacity, this._delimitedSuffix, this._options);
                    return this._state.copy(t._state), t._finalized = this._finalized, t
                }, i
            };

        }, {
            "inherits": 51,
            "safe-buffer": 82,
            "stream": 97
        }],
        60: [function(require, module, exports) {
            "use strict";
            var P1600_ROUND_CONSTANTS = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
            exports.p1600 = function(r) {
                for (var N = 0; N < 24; ++N) {
                    var a = r[0] ^ r[10] ^ r[20] ^ r[30] ^ r[40],
                        v = r[1] ^ r[11] ^ r[21] ^ r[31] ^ r[41],
                        O = r[2] ^ r[12] ^ r[22] ^ r[32] ^ r[42],
                        S = r[3] ^ r[13] ^ r[23] ^ r[33] ^ r[43],
                        T = r[4] ^ r[14] ^ r[24] ^ r[34] ^ r[44],
                        _ = r[5] ^ r[15] ^ r[25] ^ r[35] ^ r[45],
                        t = r[6] ^ r[16] ^ r[26] ^ r[36] ^ r[46],
                        o = r[7] ^ r[17] ^ r[27] ^ r[37] ^ r[47],
                        s = r[8] ^ r[18] ^ r[28] ^ r[38] ^ r[48],
                        A = r[9] ^ r[19] ^ r[29] ^ r[39] ^ r[49],
                        C = s ^ (O << 1 | S >>> 31),
                        D = A ^ (S << 1 | O >>> 31),
                        P = r[0] ^ C,
                        R = r[1] ^ D,
                        U = r[10] ^ C,
                        c = r[11] ^ D,
                        e = r[20] ^ C,
                        f = r[21] ^ D,
                        i = r[30] ^ C,
                        n = r[31] ^ D,
                        p = r[40] ^ C,
                        u = r[41] ^ D;
                    C = a ^ (T << 1 | _ >>> 31), D = v ^ (_ << 1 | T >>> 31);
                    var x = r[2] ^ C,
                        b = r[3] ^ D,
                        d = r[12] ^ C,
                        g = r[13] ^ D,
                        h = r[22] ^ C,
                        j = r[23] ^ D,
                        k = r[32] ^ C,
                        l = r[33] ^ D,
                        m = r[42] ^ C,
                        q = r[43] ^ D;
                    C = O ^ (t << 1 | o >>> 31), D = S ^ (o << 1 | t >>> 31);
                    var w = r[4] ^ C,
                        y = r[5] ^ D,
                        z = r[14] ^ C,
                        B = r[15] ^ D,
                        E = r[24] ^ C,
                        F = r[25] ^ D,
                        G = r[34] ^ C,
                        H = r[35] ^ D,
                        I = r[44] ^ C,
                        J = r[45] ^ D;
                    C = T ^ (s << 1 | A >>> 31), D = _ ^ (A << 1 | s >>> 31);
                    var K = r[6] ^ C,
                        L = r[7] ^ D,
                        M = r[16] ^ C,
                        Q = r[17] ^ D,
                        V = r[26] ^ C,
                        W = r[27] ^ D,
                        X = r[36] ^ C,
                        Y = r[37] ^ D,
                        Z = r[46] ^ C,
                        $ = r[47] ^ D;
                    C = t ^ (a << 1 | v >>> 31), D = o ^ (v << 1 | a >>> 31);
                    var rr = r[8] ^ C,
                        Nr = r[9] ^ D,
                        ar = r[18] ^ C,
                        vr = r[19] ^ D,
                        Or = r[28] ^ C,
                        Sr = r[29] ^ D,
                        Tr = r[38] ^ C,
                        _r = r[39] ^ D,
                        tr = r[48] ^ C,
                        or = r[49] ^ D,
                        sr = P,
                        Ar = R,
                        Cr = c << 4 | U >>> 28,
                        Dr = U << 4 | c >>> 28,
                        Pr = e << 3 | f >>> 29,
                        Rr = f << 3 | e >>> 29,
                        Ur = n << 9 | i >>> 23,
                        cr = i << 9 | n >>> 23,
                        er = p << 18 | u >>> 14,
                        fr = u << 18 | p >>> 14,
                        ir = x << 1 | b >>> 31,
                        nr = b << 1 | x >>> 31,
                        pr = g << 12 | d >>> 20,
                        ur = d << 12 | g >>> 20,
                        xr = h << 10 | j >>> 22,
                        br = j << 10 | h >>> 22,
                        dr = l << 13 | k >>> 19,
                        gr = k << 13 | l >>> 19,
                        hr = m << 2 | q >>> 30,
                        jr = q << 2 | m >>> 30,
                        kr = y << 30 | w >>> 2,
                        lr = w << 30 | y >>> 2,
                        mr = z << 6 | B >>> 26,
                        qr = B << 6 | z >>> 26,
                        wr = F << 11 | E >>> 21,
                        yr = E << 11 | F >>> 21,
                        zr = G << 15 | H >>> 17,
                        Br = H << 15 | G >>> 17,
                        Er = J << 29 | I >>> 3,
                        Fr = I << 29 | J >>> 3,
                        Gr = K << 28 | L >>> 4,
                        Hr = L << 28 | K >>> 4,
                        Ir = Q << 23 | M >>> 9,
                        Jr = M << 23 | Q >>> 9,
                        Kr = V << 25 | W >>> 7,
                        Lr = W << 25 | V >>> 7,
                        Mr = X << 21 | Y >>> 11,
                        Qr = Y << 21 | X >>> 11,
                        Vr = $ << 24 | Z >>> 8,
                        Wr = Z << 24 | $ >>> 8,
                        Xr = rr << 27 | Nr >>> 5,
                        Yr = Nr << 27 | rr >>> 5,
                        Zr = ar << 20 | vr >>> 12,
                        $r = vr << 20 | ar >>> 12,
                        rN = Sr << 7 | Or >>> 25,
                        NN = Or << 7 | Sr >>> 25,
                        aN = Tr << 8 | _r >>> 24,
                        vN = _r << 8 | Tr >>> 24,
                        ON = tr << 14 | or >>> 18,
                        SN = or << 14 | tr >>> 18;
                    r[0] = sr ^ ~pr & wr, r[1] = Ar ^ ~ur & yr, r[10] = Gr ^ ~Zr & Pr, r[11] = Hr ^ ~$r & Rr, r[20] = ir ^ ~mr & Kr, r[21] = nr ^ ~qr & Lr, r[30] = Xr ^ ~Cr & xr, r[31] = Yr ^ ~Dr & br, r[40] = kr ^ ~Ir & rN, r[41] = lr ^ ~Jr & NN, r[2] = pr ^ ~wr & Mr, r[3] = ur ^ ~yr & Qr, r[12] = Zr ^ ~Pr & dr, r[13] = $r ^ ~Rr & gr, r[22] = mr ^ ~Kr & aN, r[23] = qr ^ ~Lr & vN, r[32] = Cr ^ ~xr & zr, r[33] = Dr ^ ~br & Br, r[42] = Ir ^ ~rN & Ur, r[43] = Jr ^ ~NN & cr, r[4] = wr ^ ~Mr & ON, r[5] = yr ^ ~Qr & SN, r[14] = Pr ^ ~dr & Er, r[15] = Rr ^ ~gr & Fr, r[24] = Kr ^ ~aN & er, r[25] = Lr ^ ~vN & fr, r[34] = xr ^ ~zr & Vr, r[35] = br ^ ~Br & Wr, r[44] = rN ^ ~Ur & hr, r[45] = NN ^ ~cr & jr, r[6] = Mr ^ ~ON & sr, r[7] = Qr ^ ~SN & Ar, r[16] = dr ^ ~Er & Gr, r[17] = gr ^ ~Fr & Hr, r[26] = aN ^ ~er & ir, r[27] = vN ^ ~fr & nr, r[36] = zr ^ ~Vr & Xr, r[37] = Br ^ ~Wr & Yr, r[46] = Ur ^ ~hr & kr, r[47] = cr ^ ~jr & lr, r[8] = ON ^ ~sr & pr, r[9] = SN ^ ~Ar & ur, r[18] = Er ^ ~Gr & Zr, r[19] = Fr ^ ~Hr & $r, r[28] = er ^ ~ir & mr, r[29] = fr ^ ~nr & qr, r[38] = Vr ^ ~Xr & Cr, r[39] = Wr ^ ~Yr & Dr, r[48] = hr ^ ~kr & Ir, r[49] = jr ^ ~lr & Jr, r[0] ^= P1600_ROUND_CONSTANTS[2 * N], r[1] ^= P1600_ROUND_CONSTANTS[2 * N + 1]
                }
            };

        }, {}],
        61: [function(require, module, exports) {
            "use strict";

            function Keccak() {
                this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.blockSize = null, this.count = 0, this.squeezing = !1
            }
            var Buffer = require("safe-buffer").Buffer,
                keccakState = require("./keccak-state-unroll");
            Keccak.prototype.initialize = function(t, e) {
                for (var s = 0; s < 50; ++s) this.state[s] = 0;
                this.blockSize = t / 8, this.count = 0, this.squeezing = !1
            }, Keccak.prototype.absorb = function(t) {
                for (var e = 0; e < t.length; ++e) this.state[~~(this.count / 4)] ^= t[e] << this.count % 4 * 8, this.count += 1, this.count === this.blockSize && (keccakState.p1600(this.state), this.count = 0)
            }, Keccak.prototype.absorbLastFewBits = function(t) {
                this.state[~~(this.count / 4)] ^= t << this.count % 4 * 8, 0 != (128 & t) && this.count === this.blockSize - 1 && keccakState.p1600(this.state), this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (this.blockSize - 1) % 4 * 8, keccakState.p1600(this.state), this.count = 0, this.squeezing = !0
            }, Keccak.prototype.squeeze = function(t) {
                this.squeezing || this.absorbLastFewBits(1);
                for (var e = Buffer.alloc(t), s = 0; s < t; ++s) e[s] = this.state[~~(this.count / 4)] >>> this.count % 4 * 8 & 255, this.count += 1, this.count === this.blockSize && (keccakState.p1600(this.state), this.count = 0);
                return e
            }, Keccak.prototype.copy = function(t) {
                for (var e = 0; e < 50; ++e) t.state[e] = this.state[e];
                t.blockSize = this.blockSize, t.count = this.count, t.squeezing = this.squeezing
            }, module.exports = Keccak;

        }, {
            "./keccak-state-unroll": 60,
            "safe-buffer": 82
        }],
        62: [function(require, module, exports) {
            module.exports = require("browserify-sha3").SHA3Hash;

        }, {
            "browserify-sha3": 7
        }],
        63: [function(require, module, exports) {
            function assert(r, e) {
                if (!r) throw new Error(e || "Assertion failed")
            }
            module.exports = assert, assert.equal = function(r, e, s) {
                if (r != e) throw new Error(s || "Assertion failed: " + r + " != " + e)
            };

        }, {}],
        64: [function(require, module, exports) {
            "use strict";

            function toArray(r, t) {
                if (Array.isArray(r)) return r.slice();
                if (!r) return [];
                var e = [];
                if ("string" != typeof r) {
                    for (n = 0; n < r.length; n++) e[n] = 0 | r[n];
                    return e
                }
                if ("hex" === t) {
                    (r = r.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (r = "0" + r);
                    for (n = 0; n < r.length; n += 2) e.push(parseInt(r[n] + r[n + 1], 16))
                } else
                    for (var n = 0; n < r.length; n++) {
                        var o = r.charCodeAt(n),
                            u = o >> 8,
                            i = 255 & o;
                        u ? e.push(u, i) : e.push(i)
                    }
                return e
            }

            function zero2(r) {
                return 1 === r.length ? "0" + r : r
            }

            function toHex(r) {
                for (var t = "", e = 0; e < r.length; e++) t += zero2(r[e].toString(16));
                return t
            }
            var utils = exports;
            utils.toArray = toArray, utils.zero2 = zero2, utils.toHex = toHex, utils.encode = function(r, t) {
                return "hex" === t ? toHex(r) : r
            };

        }, {}],
        65: [function(require, module, exports) {
            (function(process) {
                "use strict";

                function nextTick(e, n, c, r) {
                    if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');
                    var s, t, o = arguments.length;
                    switch (o) {
                        case 0:
                        case 1:
                            return process.nextTick(e);
                        case 2:
                            return process.nextTick(function() {
                                e.call(null, n)
                            });
                        case 3:
                            return process.nextTick(function() {
                                e.call(null, n, c)
                            });
                        case 4:
                            return process.nextTick(function() {
                                e.call(null, n, c, r)
                            });
                        default:
                            for (s = new Array(o - 1), t = 0; t < s.length;) s[t++] = arguments[t];
                            return process.nextTick(function() {
                                e.apply(null, s)
                            })
                    }
                }!process.version || 0 === process.version.indexOf("v0.") || 0 === process.version.indexOf("v1.") && 0 !== process.version.indexOf("v1.8.") ? module.exports = nextTick : module.exports = process.nextTick;

            }).call(this, require('_process'))
        }, {
            "_process": 66
        }],
        66: [function(require, module, exports) {
            function defaultSetTimout() {
                throw new Error("setTimeout has not been defined")
            }

            function defaultClearTimeout() {
                throw new Error("clearTimeout has not been defined")
            }

            function runTimeout(e) {
                if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0);
                try {
                    return cachedSetTimeout(e, 0)
                } catch (t) {
                    try {
                        return cachedSetTimeout.call(null, e, 0)
                    } catch (t) {
                        return cachedSetTimeout.call(this, e, 0)
                    }
                }
            }

            function runClearTimeout(e) {
                if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e);
                try {
                    return cachedClearTimeout(e)
                } catch (t) {
                    try {
                        return cachedClearTimeout.call(null, e)
                    } catch (t) {
                        return cachedClearTimeout.call(this, e)
                    }
                }
            }

            function cleanUpNextTick() {
                draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
            }

            function drainQueue() {
                if (!draining) {
                    var e = runTimeout(cleanUpNextTick);
                    draining = !0;
                    for (var t = queue.length; t;) {
                        for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, t = queue.length
                    }
                    currentQueue = null, draining = !1, runClearTimeout(e)
                }
            }

            function Item(e, t) {
                this.fun = e, this.array = t
            }

            function noop() {}
            var process = module.exports = {},
                cachedSetTimeout, cachedClearTimeout;
            ! function() {
                try {
                    cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout
                }
                try {
                    cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout
                }
            }();
            var queue = [],
                draining = !1,
                currentQueue, queueIndex = -1;
            process.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
            }, Item.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function(e) {
                return []
            }, process.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, process.cwd = function() {
                return "/"
            }, process.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, process.umask = function() {
                return 0
            };

        }, {}],
        67: [function(require, module, exports) {
            module.exports = require("./lib/_stream_duplex.js");

        }, {
            "./lib/_stream_duplex.js": 68
        }],
        68: [function(require, module, exports) {
            "use strict";

            function Duplex(e) {
                if (!(this instanceof Duplex)) return new Duplex(e);
                Readable.call(this, e), Writable.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", onend)
            }

            function onend() {
                this.allowHalfOpen || this._writableState.ended || processNextTick(onEndNT, this)
            }

            function onEndNT(e) {
                e.end()
            }

            function forEach(e, t) {
                for (var r = 0, i = e.length; r < i; r++) t(e[r], r)
            }
            var processNextTick = require("process-nextick-args"),
                objectKeys = Object.keys || function(e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
            module.exports = Duplex;
            var util = require("core-util-is");
            util.inherits = require("inherits");
            var Readable = require("./_stream_readable"),
                Writable = require("./_stream_writable");
            util.inherits(Duplex, Readable);
            for (var keys = objectKeys(Writable.prototype), v = 0; v < keys.length; v++) {
                var method = keys[v];
                Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method])
            }
            Object.defineProperty(Duplex.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                },
                set: function(e) {
                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                }
            }), Duplex.prototype._destroy = function(e, t) {
                this.push(null), this.end(), processNextTick(t, e)
            };

        }, {
            "./_stream_readable": 70,
            "./_stream_writable": 72,
            "core-util-is": 10,
            "inherits": 51,
            "process-nextick-args": 65
        }],
        69: [function(require, module, exports) {
            "use strict";

            function PassThrough(r) {
                if (!(this instanceof PassThrough)) return new PassThrough(r);
                Transform.call(this, r)
            }
            module.exports = PassThrough;
            var Transform = require("./_stream_transform"),
                util = require("core-util-is");
            util.inherits = require("inherits"), util.inherits(PassThrough, Transform), PassThrough.prototype._transform = function(r, s, i) {
                i(null, r)
            };

        }, {
            "./_stream_transform": 71,
            "core-util-is": 10,
            "inherits": 51
        }],
        70: [function(require, module, exports) {
            (function(process, global) {
                "use strict";

                function _uint8ArrayToBuffer(e) {
                    return Buffer.from(e)
                }

                function _isUint8Array(e) {
                    return Buffer.isBuffer(e) || e instanceof OurUint8Array
                }

                function prependListener(e, t, r) {
                    if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                    e._events && e._events[t] ? isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                }

                function ReadableState(e, t) {
                    Duplex = Duplex || require("./_stream_duplex"), e = e || {}, this.objectMode = !!e.objectMode, t instanceof Duplex && (this.objectMode = this.objectMode || !!e.readableObjectMode);
                    var r = e.highWaterMark,
                        n = this.objectMode ? 16 : 16384;
                    this.highWaterMark = r || 0 === r ? r : n, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new BufferList, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder), this.decoder = new StringDecoder(e.encoding), this.encoding = e.encoding)
                }

                function Readable(e) {
                    if (Duplex = Duplex || require("./_stream_duplex"), !(this instanceof Readable)) return new Readable(e);
                    this._readableState = new ReadableState(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), Stream.call(this)
                }

                function readableAddChunk(e, t, r, n, a) {
                    var i = e._readableState;
                    if (null === t) i.reading = !1, onEofChunk(e, i);
                    else {
                        var d;
                        a || (d = chunkInvalid(i, t)), d ? e.emit("error", d) : i.objectMode || t && t.length > 0 ? ("string" == typeof t || i.objectMode || Object.getPrototypeOf(t) === Buffer.prototype || (t = _uint8ArrayToBuffer(t)), n ? i.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : addChunk(e, i, t, !0) : i.ended ? e.emit("error", new Error("stream.push() after EOF")) : (i.reading = !1, i.decoder && !r ? (t = i.decoder.write(t), i.objectMode || 0 !== t.length ? addChunk(e, i, t, !1) : maybeReadMore(e, i)) : addChunk(e, i, t, !1))) : n || (i.reading = !1)
                    }
                    return needMoreData(i)
                }

                function addChunk(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r), e.read(0)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && emitReadable(e)), maybeReadMore(e, t)
                }

                function chunkInvalid(e, t) {
                    var r;
                    return _isUint8Array(t) || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk")), r
                }

                function needMoreData(e) {
                    return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                }

                function computeNewHighWaterMark(e) {
                    return e >= MAX_HWM ? e = MAX_HWM : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                }

                function howMuchToRead(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e !== e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = computeNewHighWaterMark(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
                }

                function onEofChunk(e, t) {
                    if (!t.ended) {
                        if (t.decoder) {
                            var r = t.decoder.end();
                            r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                        }
                        t.ended = !0, emitReadable(e)
                    }
                }

                function emitReadable(e) {
                    var t = e._readableState;
                    t.needReadable = !1, t.emittedReadable || (debug("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? processNextTick(emitReadable_, e) : emitReadable_(e))
                }

                function emitReadable_(e) {
                    debug("emit readable"), e.emit("readable"), flow(e)
                }

                function maybeReadMore(e, t) {
                    t.readingMore || (t.readingMore = !0, processNextTick(maybeReadMore_, e, t))
                }

                function maybeReadMore_(e, t) {
                    for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (debug("maybeReadMore read 0"), e.read(0), r !== t.length);) r = t.length;
                    t.readingMore = !1
                }

                function pipeOnDrain(e) {
                    return function() {
                        var t = e._readableState;
                        debug("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && EElistenerCount(e, "data") && (t.flowing = !0, flow(e))
                    }
                }

                function nReadingNextTick(e) {
                    debug("readable nexttick read 0"), e.read(0)
                }

                function resume(e, t) {
                    t.resumeScheduled || (t.resumeScheduled = !0, processNextTick(resume_, e, t))
                }

                function resume_(e, t) {
                    t.reading || (debug("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), flow(e), t.flowing && !t.reading && e.read(0)
                }

                function flow(e) {
                    var t = e._readableState;
                    for (debug("flow", t.flowing); t.flowing && null !== e.read(););
                }

                function fromList(e, t) {
                    if (0 === t.length) return null;
                    var r;
                    return t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : r = fromListPartial(e, t.buffer, t.decoder), r
                }

                function fromListPartial(e, t, r) {
                    var n;
                    return e < t.head.data.length ? (n = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : n = e === t.head.data.length ? t.shift() : r ? copyFromBufferString(e, t) : copyFromBuffer(e, t), n
                }

                function copyFromBufferString(e, t) {
                    var r = t.head,
                        n = 1,
                        a = r.data;
                    for (e -= a.length; r = r.next;) {
                        var i = r.data,
                            d = e > i.length ? i.length : e;
                        if (d === i.length ? a += i : a += i.slice(0, e), 0 === (e -= d)) {
                            d === i.length ? (++n, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = i.slice(d));
                            break
                        }++n
                    }
                    return t.length -= n, a
                }

                function copyFromBuffer(e, t) {
                    var r = Buffer.allocUnsafe(e),
                        n = t.head,
                        a = 1;
                    for (n.data.copy(r), e -= n.data.length; n = n.next;) {
                        var i = n.data,
                            d = e > i.length ? i.length : e;
                        if (i.copy(r, r.length - e, 0, d), 0 === (e -= d)) {
                            d === i.length ? (++a, n.next ? t.head = n.next : t.head = t.tail = null) : (t.head = n, n.data = i.slice(d));
                            break
                        }++a
                    }
                    return t.length -= a, r
                }

                function endReadable(e) {
                    var t = e._readableState;
                    if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                    t.endEmitted || (t.ended = !0, processNextTick(endReadableNT, t, e))
                }

                function endReadableNT(e, t) {
                    e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
                }

                function forEach(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) t(e[r], r)
                }

                function indexOf(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                var processNextTick = require("process-nextick-args");
                module.exports = Readable;
                var isArray = require("isarray"),
                    Duplex;
                Readable.ReadableState = ReadableState;
                var EE = require("events").EventEmitter,
                    EElistenerCount = function(e, t) {
                        return e.listeners(t).length
                    },
                    Stream = require("./internal/streams/stream"),
                    Buffer = require("safe-buffer").Buffer,
                    OurUint8Array = global.Uint8Array || function() {},
                    util = require("core-util-is");
                util.inherits = require("inherits");
                var debugUtil = require("util"),
                    debug = void 0;
                debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
                var BufferList = require("./internal/streams/BufferList"),
                    destroyImpl = require("./internal/streams/destroy"),
                    StringDecoder;
                util.inherits(Readable, Stream);
                var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
                Object.defineProperty(Readable.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), Readable.prototype.destroy = destroyImpl.destroy, Readable.prototype._undestroy = destroyImpl.undestroy, Readable.prototype._destroy = function(e, t) {
                    this.push(null), t(e)
                }, Readable.prototype.push = function(e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = Buffer.from(e, t), t = ""), r = !0), readableAddChunk(this, e, t, !1, r)
                }, Readable.prototype.unshift = function(e) {
                    return readableAddChunk(this, e, null, !0, !1)
                }, Readable.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }, Readable.prototype.setEncoding = function(e) {
                    return StringDecoder || (StringDecoder = require("string_decoder/").StringDecoder), this._readableState.decoder = new StringDecoder(e), this._readableState.encoding = e, this
                };
                var MAX_HWM = 8388608;
                Readable.prototype.read = function(e) {
                    debug("read", e), e = parseInt(e, 10);
                    var t = this._readableState,
                        r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return debug("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? endReadable(this) : emitReadable(this), null;
                    if (0 === (e = howMuchToRead(e, t)) && t.ended) return 0 === t.length && endReadable(this), null;
                    var n = t.needReadable;
                    debug("need readable", n), (0 === t.length || t.length - e < t.highWaterMark) && debug("length less than watermark", n = !0), t.ended || t.reading ? debug("reading or ended", n = !1) : n && (debug("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = howMuchToRead(r, t)));
                    var a;
                    return null === (a = e > 0 ? fromList(e, t) : null) ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && endReadable(this)), null !== a && this.emit("data", a), a
                }, Readable.prototype._read = function(e) {
                    this.emit("error", new Error("_read() is not implemented"))
                }, Readable.prototype.pipe = function(e, t) {
                    function r(e, t) {
                        debug("onunpipe"), e === l && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, a())
                    }

                    function n() {
                        debug("onend"), e.end()
                    }

                    function a() {
                        debug("cleanup"), e.removeListener("close", o), e.removeListener("finish", u), e.removeListener("drain", p), e.removeListener("error", d), e.removeListener("unpipe", r), l.removeListener("end", n), l.removeListener("end", s), l.removeListener("data", i), c = !0, !h.awaitDrain || e._writableState && !e._writableState.needDrain || p()
                    }

                    function i(t) {
                        debug("ondata"), b = !1, !1 !== e.write(t) || b || ((1 === h.pipesCount && h.pipes === e || h.pipesCount > 1 && -1 !== indexOf(h.pipes, e)) && !c && (debug("false write response, pause", l._readableState.awaitDrain), l._readableState.awaitDrain++, b = !0), l.pause())
                    }

                    function d(t) {
                        debug("onerror", t), s(), e.removeListener("error", d), 0 === EElistenerCount(e, "error") && e.emit("error", t)
                    }

                    function o() {
                        e.removeListener("finish", u), s()
                    }

                    function u() {
                        debug("onfinish"), e.removeListener("close", o), s()
                    }

                    function s() {
                        debug("unpipe"), l.unpipe(e)
                    }
                    var l = this,
                        h = this._readableState;
                    switch (h.pipesCount) {
                        case 0:
                            h.pipes = e;
                            break;
                        case 1:
                            h.pipes = [h.pipes, e];
                            break;
                        default:
                            h.pipes.push(e)
                    }
                    h.pipesCount += 1, debug("pipe count=%d opts=%j", h.pipesCount, t);
                    var f = (!t || !1 !== t.end) && e !== process.stdout && e !== process.stderr ? n : s;
                    h.endEmitted ? processNextTick(f) : l.once("end", f), e.on("unpipe", r);
                    var p = pipeOnDrain(l);
                    e.on("drain", p);
                    var c = !1,
                        b = !1;
                    return l.on("data", i), prependListener(e, "error", d), e.once("close", o), e.once("finish", u), e.emit("pipe", l), h.flowing || (debug("pipe resume"), l.resume()), e
                }, Readable.prototype.unpipe = function(e) {
                    var t = this._readableState,
                        r = {
                            hasUnpiped: !1
                        };
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);
                    if (!e) {
                        var n = t.pipes,
                            a = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                        for (var i = 0; i < a; i++) n[i].emit("unpipe", this, r);
                        return this
                    }
                    var d = indexOf(t.pipes, e);
                    return -1 === d ? this : (t.pipes.splice(d, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this)
                }, Readable.prototype.on = function(e, t) {
                    var r = Stream.prototype.on.call(this, e, t);
                    if ("data" === e) !1 !== this._readableState.flowing && this.resume();
                    else if ("readable" === e) {
                        var n = this._readableState;
                        n.endEmitted || n.readableListening || (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && emitReadable(this) : processNextTick(nReadingNextTick, this))
                    }
                    return r
                }, Readable.prototype.addListener = Readable.prototype.on, Readable.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (debug("resume"), e.flowing = !0, resume(this, e)), this
                }, Readable.prototype.pause = function() {
                    return debug("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (debug("pause"), this._readableState.flowing = !1, this.emit("pause")), this
                }, Readable.prototype.wrap = function(e) {
                    var t = this._readableState,
                        r = !1,
                        n = this;
                    e.on("end", function() {
                        if (debug("wrapped end"), t.decoder && !t.ended) {
                            var e = t.decoder.end();
                            e && e.length && n.push(e)
                        }
                        n.push(null)
                    }), e.on("data", function(a) {
                        debug("wrapped data"), t.decoder && (a = t.decoder.write(a)), (!t.objectMode || null !== a && void 0 !== a) && (t.objectMode || a && a.length) && (n.push(a) || (r = !0, e.pause()))
                    });
                    for (var a in e) void 0 === this[a] && "function" == typeof e[a] && (this[a] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(a));
                    for (var i = 0; i < kProxyEvents.length; i++) e.on(kProxyEvents[i], n.emit.bind(n, kProxyEvents[i]));
                    return n._read = function(t) {
                        debug("wrapped _read", t), r && (r = !1, e.resume())
                    }, n
                }, Readable._fromList = fromList;

            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./_stream_duplex": 68,
            "./internal/streams/BufferList": 73,
            "./internal/streams/destroy": 74,
            "./internal/streams/stream": 75,
            "_process": 66,
            "core-util-is": 10,
            "events": 35,
            "inherits": 51,
            "isarray": 54,
            "process-nextick-args": 65,
            "safe-buffer": 82,
            "string_decoder/": 98,
            "util": 6
        }],
        71: [function(require, module, exports) {
            "use strict";

            function TransformState(r) {
                this.afterTransform = function(t, n) {
                    return afterTransform(r, t, n)
                }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null
            }

            function afterTransform(r, t, n) {
                var e = r._transformState;
                e.transforming = !1;
                var i = e.writecb;
                if (!i) return r.emit("error", new Error("write callback called multiple times"));
                e.writechunk = null, e.writecb = null, null !== n && void 0 !== n && r.push(n), i(t);
                var a = r._readableState;
                a.reading = !1, (a.needReadable || a.length < a.highWaterMark) && r._read(a.highWaterMark)
            }

            function Transform(r) {
                if (!(this instanceof Transform)) return new Transform(r);
                Duplex.call(this, r), this._transformState = new TransformState(this);
                var t = this;
                this._readableState.needReadable = !0, this._readableState.sync = !1, r && ("function" == typeof r.transform && (this._transform = r.transform), "function" == typeof r.flush && (this._flush = r.flush)), this.once("prefinish", function() {
                    "function" == typeof this._flush ? this._flush(function(r, n) {
                        done(t, r, n)
                    }) : done(t)
                })
            }

            function done(r, t, n) {
                if (t) return r.emit("error", t);
                null !== n && void 0 !== n && r.push(n);
                var e = r._writableState,
                    i = r._transformState;
                if (e.length) throw new Error("Calling transform done when ws.length != 0");
                if (i.transforming) throw new Error("Calling transform done when still transforming");
                return r.push(null)
            }
            module.exports = Transform;
            var Duplex = require("./_stream_duplex"),
                util = require("core-util-is");
            util.inherits = require("inherits"), util.inherits(Transform, Duplex), Transform.prototype.push = function(r, t) {
                return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, r, t)
            }, Transform.prototype._transform = function(r, t, n) {
                throw new Error("_transform() is not implemented")
            }, Transform.prototype._write = function(r, t, n) {
                var e = this._transformState;
                if (e.writecb = n, e.writechunk = r, e.writeencoding = t, !e.transforming) {
                    var i = this._readableState;
                    (e.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, Transform.prototype._read = function(r) {
                var t = this._transformState;
                null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
            }, Transform.prototype._destroy = function(r, t) {
                var n = this;
                Duplex.prototype._destroy.call(this, r, function(r) {
                    t(r), n.emit("close")
                })
            };

        }, {
            "./_stream_duplex": 68,
            "core-util-is": 10,
            "inherits": 51
        }],
        72: [function(require, module, exports) {
            (function(process, global) {
                "use strict";

                function WriteReq(e, t, r) {
                    this.chunk = e, this.encoding = t, this.callback = r, this.next = null
                }

                function CorkedRequest(e) {
                    var t = this;
                    this.next = null, this.entry = null, this.finish = function() {
                        onCorkedFinish(t, e)
                    }
                }

                function _uint8ArrayToBuffer(e) {
                    return Buffer.from(e)
                }

                function _isUint8Array(e) {
                    return Buffer.isBuffer(e) || e instanceof OurUint8Array
                }

                function nop() {}

                function WritableState(e, t) {
                    Duplex = Duplex || require("./_stream_duplex"), e = e || {}, this.objectMode = !!e.objectMode, t instanceof Duplex && (this.objectMode = this.objectMode || !!e.writableObjectMode);
                    var r = e.highWaterMark,
                        i = this.objectMode ? 16 : 16384;
                    this.highWaterMark = r || 0 === r ? r : i, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var n = !1 === e.decodeStrings;
                    this.decodeStrings = !n, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                        onwrite(t, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new CorkedRequest(this)
                }

                function Writable(e) {
                    if (Duplex = Duplex || require("./_stream_duplex"), !(realHasInstance.call(Writable, this) || this instanceof Duplex)) return new Writable(e);
                    this._writableState = new WritableState(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), Stream.call(this)
                }

                function writeAfterEnd(e, t) {
                    var r = new Error("write after end");
                    e.emit("error", r), processNextTick(t, r)
                }

                function validChunk(e, t, r, i) {
                    var n = !0,
                        o = !1;
                    return null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), processNextTick(i, o), n = !1), n
                }

                function decodeChunk(e, t, r) {
                    return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = Buffer.from(t, r)), t
                }

                function writeOrBuffer(e, t, r, i, n, o) {
                    if (!r) {
                        var s = decodeChunk(t, i, n);
                        i !== s && (r = !0, n = "buffer", i = s)
                    }
                    var a = t.objectMode ? 1 : i.length;
                    t.length += a;
                    var f = t.length < t.highWaterMark;
                    if (f || (t.needDrain = !0), t.writing || t.corked) {
                        var u = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: i,
                            encoding: n,
                            isBuf: r,
                            callback: o,
                            next: null
                        }, u ? u.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                    } else doWrite(e, t, !1, a, i, n, o);
                    return f
                }

                function doWrite(e, t, r, i, n, o, s) {
                    t.writelen = i, t.writecb = s, t.writing = !0, t.sync = !0, r ? e._writev(n, t.onwrite) : e._write(n, o, t.onwrite), t.sync = !1
                }

                function onwriteError(e, t, r, i, n) {
                    --t.pendingcb, r ? (processNextTick(n, i), processNextTick(finishMaybe, e, t), e._writableState.errorEmitted = !0, e.emit("error", i)) : (n(i), e._writableState.errorEmitted = !0, e.emit("error", i), finishMaybe(e, t))
                }

                function onwriteStateUpdate(e) {
                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                }

                function onwrite(e, t) {
                    var r = e._writableState,
                        i = r.sync,
                        n = r.writecb;
                    if (onwriteStateUpdate(r), t) onwriteError(e, r, i, t, n);
                    else {
                        var o = needFinish(r);
                        o || r.corked || r.bufferProcessing || !r.bufferedRequest || clearBuffer(e, r), i ? asyncWrite(afterWrite, e, r, o, n) : afterWrite(e, r, o, n)
                    }
                }

                function afterWrite(e, t, r, i) {
                    r || onwriteDrain(e, t), t.pendingcb--, i(), finishMaybe(e, t)
                }

                function onwriteDrain(e, t) {
                    0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                }

                function clearBuffer(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var i = t.bufferedRequestCount,
                            n = new Array(i),
                            o = t.corkedRequestsFree;
                        o.entry = r;
                        for (var s = 0, a = !0; r;) n[s] = r, r.isBuf || (a = !1), r = r.next, s += 1;
                        n.allBuffers = a, doWrite(e, t, !0, t.length, n, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new CorkedRequest(t)
                    } else {
                        for (; r;) {
                            var f = r.chunk,
                                u = r.encoding,
                                l = r.callback;
                            if (doWrite(e, t, !1, t.objectMode ? 1 : f.length, f, u, l), r = r.next, t.writing) break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequestCount = 0, t.bufferedRequest = r, t.bufferProcessing = !1
                }

                function needFinish(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function callFinal(e, t) {
                    e._final(function(r) {
                        t.pendingcb--, r && e.emit("error", r), t.prefinished = !0, e.emit("prefinish"), finishMaybe(e, t)
                    })
                }

                function prefinish(e, t) {
                    t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, processNextTick(callFinal, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
                }

                function finishMaybe(e, t) {
                    var r = needFinish(t);
                    return r && (prefinish(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), r
                }

                function endWritable(e, t, r) {
                    t.ending = !0, finishMaybe(e, t), r && (t.finished ? processNextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1
                }

                function onCorkedFinish(e, t, r) {
                    var i = e.entry;
                    for (e.entry = null; i;) {
                        var n = i.callback;
                        t.pendingcb--, n(r), i = i.next
                    }
                    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                }
                var processNextTick = require("process-nextick-args");
                module.exports = Writable;
                var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick,
                    Duplex;
                Writable.WritableState = WritableState;
                var util = require("core-util-is");
                util.inherits = require("inherits");
                var internalUtil = {
                        deprecate: require("util-deprecate")
                    },
                    Stream = require("./internal/streams/stream"),
                    Buffer = require("safe-buffer").Buffer,
                    OurUint8Array = global.Uint8Array || function() {},
                    destroyImpl = require("./internal/streams/destroy");
                util.inherits(Writable, Stream), WritableState.prototype.getBuffer = function() {
                        for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                        return t
                    },
                    function() {
                        try {
                            Object.defineProperty(WritableState.prototype, "buffer", {
                                get: internalUtil.deprecate(function() {
                                    return this.getBuffer()
                                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (e) {}
                    }();
                var realHasInstance;
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (realHasInstance = Function.prototype[Symbol.hasInstance], Object.defineProperty(Writable, Symbol.hasInstance, {
                    value: function(e) {
                        return !!realHasInstance.call(this, e) || e && e._writableState instanceof WritableState
                    }
                })) : realHasInstance = function(e) {
                    return e instanceof this
                }, Writable.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                }, Writable.prototype.write = function(e, t, r) {
                    var i = this._writableState,
                        n = !1,
                        o = _isUint8Array(e) && !i.objectMode;
                    return o && !Buffer.isBuffer(e) && (e = _uint8ArrayToBuffer(e)), "function" == typeof t && (r = t, t = null), o ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = nop), i.ended ? writeAfterEnd(this, r) : (o || validChunk(this, i, e, r)) && (i.pendingcb++, n = writeOrBuffer(this, i, o, e, t, r)), n
                }, Writable.prototype.cork = function() {
                    this._writableState.corked++
                }, Writable.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || clearBuffer(this, e))
                }, Writable.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
                    return this._writableState.defaultEncoding = e, this
                }, Writable.prototype._write = function(e, t, r) {
                    r(new Error("_write() is not implemented"))
                }, Writable.prototype._writev = null, Writable.prototype.end = function(e, t, r) {
                    var i = this._writableState;
                    "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null !== e && void 0 !== e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || i.finished || endWritable(this, i, r)
                }, Object.defineProperty(Writable.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }), Writable.prototype.destroy = destroyImpl.destroy, Writable.prototype._undestroy = destroyImpl.undestroy, Writable.prototype._destroy = function(e, t) {
                    this.end(), t(e)
                };

            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./_stream_duplex": 68,
            "./internal/streams/destroy": 74,
            "./internal/streams/stream": 75,
            "_process": 66,
            "core-util-is": 10,
            "inherits": 51,
            "process-nextick-args": 65,
            "safe-buffer": 82,
            "util-deprecate": 100
        }],
        73: [function(require, module, exports) {
            "use strict";

            function _classCallCheck(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function copyBuffer(t, e, h) {
                t.copy(e, h)
            }
            var Buffer = require("safe-buffer").Buffer;
            module.exports = function() {
                function t() {
                    _classCallCheck(this, t), this.head = null, this.tail = null, this.length = 0
                }
                return t.prototype.push = function(t) {
                    var e = {
                        data: t,
                        next: null
                    };
                    this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
                }, t.prototype.unshift = function(t) {
                    var e = {
                        data: t,
                        next: this.head
                    };
                    0 === this.length && (this.tail = e), this.head = e, ++this.length
                }, t.prototype.shift = function() {
                    if (0 !== this.length) {
                        var t = this.head.data;
                        return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
                    }
                }, t.prototype.clear = function() {
                    this.head = this.tail = null, this.length = 0
                }, t.prototype.join = function(t) {
                    if (0 === this.length) return "";
                    for (var e = this.head, h = "" + e.data; e = e.next;) h += t + e.data;
                    return h
                }, t.prototype.concat = function(t) {
                    if (0 === this.length) return Buffer.alloc(0);
                    if (1 === this.length) return this.head.data;
                    for (var e = Buffer.allocUnsafe(t >>> 0), h = this.head, n = 0; h;) copyBuffer(h.data, e, n), n += h.data.length, h = h.next;
                    return e
                }, t
            }();

        }, {
            "safe-buffer": 82
        }],
        74: [function(require, module, exports) {
            "use strict";

            function destroy(t, e) {
                var r = this,
                    i = this._readableState && this._readableState.destroyed,
                    a = this._writableState && this._writableState.destroyed;
                i || a ? e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || processNextTick(emitErrorNT, this, t) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {
                    !e && t ? (processNextTick(emitErrorNT, r, t), r._writableState && (r._writableState.errorEmitted = !0)) : e && e(t)
                }))
            }

            function undestroy() {
                this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
            }

            function emitErrorNT(t, e) {
                t.emit("error", e)
            }
            var processNextTick = require("process-nextick-args");
            module.exports = {
                destroy: destroy,
                undestroy: undestroy
            };

        }, {
            "process-nextick-args": 65
        }],
        75: [function(require, module, exports) {
            module.exports = require("events").EventEmitter;

        }, {
            "events": 35
        }],
        76: [function(require, module, exports) {
            module.exports = require("./readable").PassThrough;

        }, {
            "./readable": 77
        }],
        77: [function(require, module, exports) {
            exports = module.exports = require("./lib/_stream_readable.js"), exports.Stream = exports, exports.Readable = exports, exports.Writable = require("./lib/_stream_writable.js"), exports.Duplex = require("./lib/_stream_duplex.js"), exports.Transform = require("./lib/_stream_transform.js"), exports.PassThrough = require("./lib/_stream_passthrough.js");

        }, {
            "./lib/_stream_duplex.js": 68,
            "./lib/_stream_passthrough.js": 69,
            "./lib/_stream_readable.js": 70,
            "./lib/_stream_transform.js": 71,
            "./lib/_stream_writable.js": 72
        }],
        78: [function(require, module, exports) {
            module.exports = require("./readable").Transform;

        }, {
            "./readable": 77
        }],
        79: [function(require, module, exports) {
            module.exports = require("./lib/_stream_writable.js");

        }, {
            "./lib/_stream_writable.js": 72
        }],
        80: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";

                function RIPEMD160() {
                    HashBase.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
                }

                function rotl(t, r) {
                    return t << r | t >>> 32 - r
                }

                function fn1(t, r, n, o, f, l, i, s) {
                    return rotl(t + (r ^ n ^ o) + l + i | 0, s) + f | 0
                }

                function fn2(t, r, n, o, f, l, i, s) {
                    return rotl(t + (r & n | ~r & o) + l + i | 0, s) + f | 0
                }

                function fn3(t, r, n, o, f, l, i, s) {
                    return rotl(t + ((r | ~n) ^ o) + l + i | 0, s) + f | 0
                }

                function fn4(t, r, n, o, f, l, i, s) {
                    return rotl(t + (r & o | n & ~o) + l + i | 0, s) + f | 0
                }

                function fn5(t, r, n, o, f, l, i, s) {
                    return rotl(t + (r ^ (n | ~o)) + l + i | 0, s) + f | 0
                }
                var inherits = require("inherits"),
                    HashBase = require("hash-base");
                inherits(RIPEMD160, HashBase), RIPEMD160.prototype._update = function() {
                    for (var t = new Array(16), r = 0; r < 16; ++r) t[r] = this._block.readInt32LE(4 * r);
                    var n = this._a,
                        o = this._b,
                        f = this._c,
                        l = this._d,
                        i = this._e;
                    i = fn1(i, n = fn1(n, o, f, l, i, t[0], 0, 11), o, f = rotl(f, 10), l, t[1], 0, 14), o = fn1(o = rotl(o, 10), f = fn1(f, l = fn1(l, i, n, o, f, t[2], 0, 15), i, n = rotl(n, 10), o, t[3], 0, 12), l, i = rotl(i, 10), n, t[4], 0, 5), l = fn1(l = rotl(l, 10), i = fn1(i, n = fn1(n, o, f, l, i, t[5], 0, 8), o, f = rotl(f, 10), l, t[6], 0, 7), n, o = rotl(o, 10), f, t[7], 0, 9), n = fn1(n = rotl(n, 10), o = fn1(o, f = fn1(f, l, i, n, o, t[8], 0, 11), l, i = rotl(i, 10), n, t[9], 0, 13), f, l = rotl(l, 10), i, t[10], 0, 14), f = fn1(f = rotl(f, 10), l = fn1(l, i = fn1(i, n, o, f, l, t[11], 0, 15), n, o = rotl(o, 10), f, t[12], 0, 6), i, n = rotl(n, 10), o, t[13], 0, 7), i = fn2(i = rotl(i, 10), n = fn1(n, o = fn1(o, f, l, i, n, t[14], 0, 9), f, l = rotl(l, 10), i, t[15], 0, 8), o, f = rotl(f, 10), l, t[7], 1518500249, 7), o = fn2(o = rotl(o, 10), f = fn2(f, l = fn2(l, i, n, o, f, t[4], 1518500249, 6), i, n = rotl(n, 10), o, t[13], 1518500249, 8), l, i = rotl(i, 10), n, t[1], 1518500249, 13), l = fn2(l = rotl(l, 10), i = fn2(i, n = fn2(n, o, f, l, i, t[10], 1518500249, 11), o, f = rotl(f, 10), l, t[6], 1518500249, 9), n, o = rotl(o, 10), f, t[15], 1518500249, 7), n = fn2(n = rotl(n, 10), o = fn2(o, f = fn2(f, l, i, n, o, t[3], 1518500249, 15), l, i = rotl(i, 10), n, t[12], 1518500249, 7), f, l = rotl(l, 10), i, t[0], 1518500249, 12), f = fn2(f = rotl(f, 10), l = fn2(l, i = fn2(i, n, o, f, l, t[9], 1518500249, 15), n, o = rotl(o, 10), f, t[5], 1518500249, 9), i, n = rotl(n, 10), o, t[2], 1518500249, 11), i = fn2(i = rotl(i, 10), n = fn2(n, o = fn2(o, f, l, i, n, t[14], 1518500249, 7), f, l = rotl(l, 10), i, t[11], 1518500249, 13), o, f = rotl(f, 10), l, t[8], 1518500249, 12), o = fn3(o = rotl(o, 10), f = fn3(f, l = fn3(l, i, n, o, f, t[3], 1859775393, 11), i, n = rotl(n, 10), o, t[10], 1859775393, 13), l, i = rotl(i, 10), n, t[14], 1859775393, 6), l = fn3(l = rotl(l, 10), i = fn3(i, n = fn3(n, o, f, l, i, t[4], 1859775393, 7), o, f = rotl(f, 10), l, t[9], 1859775393, 14), n, o = rotl(o, 10), f, t[15], 1859775393, 9), n = fn3(n = rotl(n, 10), o = fn3(o, f = fn3(f, l, i, n, o, t[8], 1859775393, 13), l, i = rotl(i, 10), n, t[1], 1859775393, 15), f, l = rotl(l, 10), i, t[2], 1859775393, 14), f = fn3(f = rotl(f, 10), l = fn3(l, i = fn3(i, n, o, f, l, t[7], 1859775393, 8), n, o = rotl(o, 10), f, t[0], 1859775393, 13), i, n = rotl(n, 10), o, t[6], 1859775393, 6), i = fn3(i = rotl(i, 10), n = fn3(n, o = fn3(o, f, l, i, n, t[13], 1859775393, 5), f, l = rotl(l, 10), i, t[11], 1859775393, 12), o, f = rotl(f, 10), l, t[5], 1859775393, 7), o = fn4(o = rotl(o, 10), f = fn4(f, l = fn3(l, i, n, o, f, t[12], 1859775393, 5), i, n = rotl(n, 10), o, t[1], 2400959708, 11), l, i = rotl(i, 10), n, t[9], 2400959708, 12), l = fn4(l = rotl(l, 10), i = fn4(i, n = fn4(n, o, f, l, i, t[11], 2400959708, 14), o, f = rotl(f, 10), l, t[10], 2400959708, 15), n, o = rotl(o, 10), f, t[0], 2400959708, 14), n = fn4(n = rotl(n, 10), o = fn4(o, f = fn4(f, l, i, n, o, t[8], 2400959708, 15), l, i = rotl(i, 10), n, t[12], 2400959708, 9), f, l = rotl(l, 10), i, t[4], 2400959708, 8), f = fn4(f = rotl(f, 10), l = fn4(l, i = fn4(i, n, o, f, l, t[13], 2400959708, 9), n, o = rotl(o, 10), f, t[3], 2400959708, 14), i, n = rotl(n, 10), o, t[7], 2400959708, 5), i = fn4(i = rotl(i, 10), n = fn4(n, o = fn4(o, f, l, i, n, t[15], 2400959708, 6), f, l = rotl(l, 10), i, t[14], 2400959708, 8), o, f = rotl(f, 10), l, t[5], 2400959708, 6), o = fn5(o = rotl(o, 10), f = fn4(f, l = fn4(l, i, n, o, f, t[6], 2400959708, 5), i, n = rotl(n, 10), o, t[2], 2400959708, 12), l, i = rotl(i, 10), n, t[4], 2840853838, 9), l = fn5(l = rotl(l, 10), i = fn5(i, n = fn5(n, o, f, l, i, t[0], 2840853838, 15), o, f = rotl(f, 10), l, t[5], 2840853838, 5), n, o = rotl(o, 10), f, t[9], 2840853838, 11), n = fn5(n = rotl(n, 10), o = fn5(o, f = fn5(f, l, i, n, o, t[7], 2840853838, 6), l, i = rotl(i, 10), n, t[12], 2840853838, 8), f, l = rotl(l, 10), i, t[2], 2840853838, 13), f = fn5(f = rotl(f, 10), l = fn5(l, i = fn5(i, n, o, f, l, t[10], 2840853838, 12), n, o = rotl(o, 10), f, t[14], 2840853838, 5), i, n = rotl(n, 10), o, t[1], 2840853838, 12), i = fn5(i = rotl(i, 10), n = fn5(n, o = fn5(o, f, l, i, n, t[3], 2840853838, 13), f, l = rotl(l, 10), i, t[8], 2840853838, 14), o, f = rotl(f, 10), l, t[11], 2840853838, 11), o = fn5(o = rotl(o, 10), f = fn5(f, l = fn5(l, i, n, o, f, t[6], 2840853838, 8), i, n = rotl(n, 10), o, t[15], 2840853838, 5), l, i = rotl(i, 10), n, t[13], 2840853838, 6), l = rotl(l, 10);
                    var s = this._a,
                        h = this._b,
                        e = this._c,
                        _ = this._d,
                        c = this._e;
                    c = fn5(c, s = fn5(s, h, e, _, c, t[5], 1352829926, 8), h, e = rotl(e, 10), _, t[14], 1352829926, 9), h = fn5(h = rotl(h, 10), e = fn5(e, _ = fn5(_, c, s, h, e, t[7], 1352829926, 9), c, s = rotl(s, 10), h, t[0], 1352829926, 11), _, c = rotl(c, 10), s, t[9], 1352829926, 13), _ = fn5(_ = rotl(_, 10), c = fn5(c, s = fn5(s, h, e, _, c, t[2], 1352829926, 15), h, e = rotl(e, 10), _, t[11], 1352829926, 15), s, h = rotl(h, 10), e, t[4], 1352829926, 5), s = fn5(s = rotl(s, 10), h = fn5(h, e = fn5(e, _, c, s, h, t[13], 1352829926, 7), _, c = rotl(c, 10), s, t[6], 1352829926, 7), e, _ = rotl(_, 10), c, t[15], 1352829926, 8), e = fn5(e = rotl(e, 10), _ = fn5(_, c = fn5(c, s, h, e, _, t[8], 1352829926, 11), s, h = rotl(h, 10), e, t[1], 1352829926, 14), c, s = rotl(s, 10), h, t[10], 1352829926, 14), c = fn4(c = rotl(c, 10), s = fn5(s, h = fn5(h, e, _, c, s, t[3], 1352829926, 12), e, _ = rotl(_, 10), c, t[12], 1352829926, 6), h, e = rotl(e, 10), _, t[6], 1548603684, 9), h = fn4(h = rotl(h, 10), e = fn4(e, _ = fn4(_, c, s, h, e, t[11], 1548603684, 13), c, s = rotl(s, 10), h, t[3], 1548603684, 15), _, c = rotl(c, 10), s, t[7], 1548603684, 7), _ = fn4(_ = rotl(_, 10), c = fn4(c, s = fn4(s, h, e, _, c, t[0], 1548603684, 12), h, e = rotl(e, 10), _, t[13], 1548603684, 8), s, h = rotl(h, 10), e, t[5], 1548603684, 9), s = fn4(s = rotl(s, 10), h = fn4(h, e = fn4(e, _, c, s, h, t[10], 1548603684, 11), _, c = rotl(c, 10), s, t[14], 1548603684, 7), e, _ = rotl(_, 10), c, t[15], 1548603684, 7), e = fn4(e = rotl(e, 10), _ = fn4(_, c = fn4(c, s, h, e, _, t[8], 1548603684, 12), s, h = rotl(h, 10), e, t[12], 1548603684, 7), c, s = rotl(s, 10), h, t[4], 1548603684, 6), c = fn4(c = rotl(c, 10), s = fn4(s, h = fn4(h, e, _, c, s, t[9], 1548603684, 15), e, _ = rotl(_, 10), c, t[1], 1548603684, 13), h, e = rotl(e, 10), _, t[2], 1548603684, 11), h = fn3(h = rotl(h, 10), e = fn3(e, _ = fn3(_, c, s, h, e, t[15], 1836072691, 9), c, s = rotl(s, 10), h, t[5], 1836072691, 7), _, c = rotl(c, 10), s, t[1], 1836072691, 15), _ = fn3(_ = rotl(_, 10), c = fn3(c, s = fn3(s, h, e, _, c, t[3], 1836072691, 11), h, e = rotl(e, 10), _, t[7], 1836072691, 8), s, h = rotl(h, 10), e, t[14], 1836072691, 6), s = fn3(s = rotl(s, 10), h = fn3(h, e = fn3(e, _, c, s, h, t[6], 1836072691, 6), _, c = rotl(c, 10), s, t[9], 1836072691, 14), e, _ = rotl(_, 10), c, t[11], 1836072691, 12), e = fn3(e = rotl(e, 10), _ = fn3(_, c = fn3(c, s, h, e, _, t[8], 1836072691, 13), s, h = rotl(h, 10), e, t[12], 1836072691, 5), c, s = rotl(s, 10), h, t[2], 1836072691, 14), c = fn3(c = rotl(c, 10), s = fn3(s, h = fn3(h, e, _, c, s, t[10], 1836072691, 13), e, _ = rotl(_, 10), c, t[0], 1836072691, 13), h, e = rotl(e, 10), _, t[4], 1836072691, 7), h = fn2(h = rotl(h, 10), e = fn2(e, _ = fn3(_, c, s, h, e, t[13], 1836072691, 5), c, s = rotl(s, 10), h, t[8], 2053994217, 15), _, c = rotl(c, 10), s, t[6], 2053994217, 5), _ = fn2(_ = rotl(_, 10), c = fn2(c, s = fn2(s, h, e, _, c, t[4], 2053994217, 8), h, e = rotl(e, 10), _, t[1], 2053994217, 11), s, h = rotl(h, 10), e, t[3], 2053994217, 14), s = fn2(s = rotl(s, 10), h = fn2(h, e = fn2(e, _, c, s, h, t[11], 2053994217, 14), _, c = rotl(c, 10), s, t[15], 2053994217, 6), e, _ = rotl(_, 10), c, t[0], 2053994217, 14), e = fn2(e = rotl(e, 10), _ = fn2(_, c = fn2(c, s, h, e, _, t[5], 2053994217, 6), s, h = rotl(h, 10), e, t[12], 2053994217, 9), c, s = rotl(s, 10), h, t[2], 2053994217, 12), c = fn2(c = rotl(c, 10), s = fn2(s, h = fn2(h, e, _, c, s, t[13], 2053994217, 9), e, _ = rotl(_, 10), c, t[9], 2053994217, 12), h, e = rotl(e, 10), _, t[7], 2053994217, 5), h = fn1(h = rotl(h, 10), e = fn2(e, _ = fn2(_, c, s, h, e, t[10], 2053994217, 15), c, s = rotl(s, 10), h, t[14], 2053994217, 8), _, c = rotl(c, 10), s, t[12], 0, 8), _ = fn1(_ = rotl(_, 10), c = fn1(c, s = fn1(s, h, e, _, c, t[15], 0, 5), h, e = rotl(e, 10), _, t[10], 0, 12), s, h = rotl(h, 10), e, t[4], 0, 9), s = fn1(s = rotl(s, 10), h = fn1(h, e = fn1(e, _, c, s, h, t[1], 0, 12), _, c = rotl(c, 10), s, t[5], 0, 5), e, _ = rotl(_, 10), c, t[8], 0, 14), e = fn1(e = rotl(e, 10), _ = fn1(_, c = fn1(c, s, h, e, _, t[7], 0, 6), s, h = rotl(h, 10), e, t[6], 0, 8), c, s = rotl(s, 10), h, t[2], 0, 13), c = fn1(c = rotl(c, 10), s = fn1(s, h = fn1(h, e, _, c, s, t[13], 0, 6), e, _ = rotl(_, 10), c, t[14], 0, 5), h, e = rotl(e, 10), _, t[0], 0, 15), h = fn1(h = rotl(h, 10), e = fn1(e, _ = fn1(_, c, s, h, e, t[3], 0, 13), c, s = rotl(s, 10), h, t[9], 0, 11), _, c = rotl(c, 10), s, t[11], 0, 11), _ = rotl(_, 10);
                    var a = this._b + f + _ | 0;
                    this._b = this._c + l + c | 0, this._c = this._d + i + s | 0, this._d = this._e + n + h | 0, this._e = this._a + o + e | 0, this._a = a
                }, RIPEMD160.prototype._digest = function() {
                    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
                    var t = new Buffer(20);
                    return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t
                }, module.exports = RIPEMD160;

            }).call(this, require("buffer").Buffer)
        }, {
            "buffer": 8,
            "hash-base": 36,
            "inherits": 51
        }],
        81: [function(require, module, exports) {
            (function(Buffer) {
                function safeParseInt(e, r) {
                    if ("00" === e.slice(0, 2)) throw new Error("invalid RLP: extra zeros");
                    return parseInt(e, r)
                }

                function encodeLength(e, r) {
                    if (e < 56) return new Buffer([e + r]);
                    var n = intToHex(e),
                        t = intToHex(r + 55 + n.length / 2);
                    return new Buffer(t + n, "hex")
                }

                function _decode(e) {
                    var r, n, t, i, f, a = [],
                        o = e[0];
                    if (o <= 127) return {
                        data: e.slice(0, 1),
                        remainder: e.slice(1)
                    };
                    if (o <= 183) {
                        if (r = o - 127, t = 128 === o ? new Buffer([]) : e.slice(1, r), 2 === r && t[0] < 128) throw new Error("invalid rlp encoding: byte must be less 0x80");
                        return {
                            data: t,
                            remainder: e.slice(r)
                        }
                    }
                    if (o <= 191) {
                        if (n = o - 182, r = safeParseInt(e.slice(1, n).toString("hex"), 16), (t = e.slice(n, r + n)).length < r) throw new Error("invalid RLP");
                        return {
                            data: t,
                            remainder: e.slice(r + n)
                        }
                    }
                    if (o <= 247) {
                        for (r = o - 191, i = e.slice(1, r); i.length;) f = _decode(i), a.push(f.data), i = f.remainder;
                        return {
                            data: a,
                            remainder: e.slice(r)
                        }
                    }
                    var u = (n = o - 246) + (r = safeParseInt(e.slice(1, n).toString("hex"), 16));
                    if (u > e.length) throw new Error("invalid rlp: total length is larger than the data");
                    if (0 === (i = e.slice(n, u)).length) throw new Error("invalid rlp, List has a invalid length");
                    for (; i.length;) f = _decode(i), a.push(f.data), i = f.remainder;
                    return {
                        data: a,
                        remainder: e.slice(u)
                    }
                }

                function isHexPrefixed(e) {
                    return "0x" === e.slice(0, 2)
                }

                function stripHexPrefix(e) {
                    return "string" != typeof e ? e : isHexPrefixed(e) ? e.slice(2) : e
                }

                function intToHex(e) {
                    var r = e.toString(16);
                    return r.length % 2 && (r = "0" + r), r
                }

                function padToEven(e) {
                    return e.length % 2 && (e = "0" + e), e
                }

                function intToBuffer(e) {
                    var r = intToHex(e);
                    return new Buffer(r, "hex")
                }

                function toBuffer(e) {
                    if (!Buffer.isBuffer(e))
                        if ("string" == typeof e) e = isHexPrefixed(e) ? new Buffer(padToEven(stripHexPrefix(e)), "hex") : new Buffer(e);
                        else if ("number" == typeof e) e = e ? intToBuffer(e) : new Buffer([]);
                    else if (null === e || void 0 === e) e = new Buffer([]);
                    else {
                        if (!e.toArray) throw new Error("invalid type");
                        e = new Buffer(e.toArray())
                    }
                    return e
                }
                const assert = require("assert");
                exports.encode = function(e) {
                    if (e instanceof Array) {
                        for (var r = [], n = 0; n < e.length; n++) r.push(exports.encode(e[n]));
                        var t = Buffer.concat(r);
                        return Buffer.concat([encodeLength(t.length, 192), t])
                    }
                    return 1 === (e = toBuffer(e)).length && e[0] < 128 ? e : Buffer.concat([encodeLength(e.length, 128), e])
                }, exports.decode = function(e, r) {
                    if (!e || 0 === e.length) return new Buffer([]);
                    var n = _decode(e = toBuffer(e));
                    return r ? n : (assert.equal(n.remainder.length, 0, "invalid remainder"), n.data)
                }, exports.getLength = function(e) {
                    if (!e || 0 === e.length) return new Buffer([]);
                    var r = (e = toBuffer(e))[0];
                    if (r <= 127) return e.length;
                    if (r <= 183) return r - 127;
                    if (r <= 191) return r - 182;
                    if (r <= 247) return r - 191;
                    var n = r - 246;
                    return n + safeParseInt(e.slice(1, n).toString("hex"), 16)
                };

            }).call(this, require("buffer").Buffer)
        }, {
            "assert": 1,
            "buffer": 8
        }],
        82: [function(require, module, exports) {
            function copyProps(f, r) {
                for (var e in f) r[e] = f[e]
            }

            function SafeBuffer(f, r, e) {
                return Buffer(f, r, e)
            }
            var buffer = require("buffer"),
                Buffer = buffer.Buffer;
            Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(f, r, e) {
                if ("number" == typeof f) throw new TypeError("Argument must not be a number");
                return Buffer(f, r, e)
            }, SafeBuffer.alloc = function(f, r, e) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                var u = Buffer(f);
                return void 0 !== r ? "string" == typeof e ? u.fill(r, e) : u.fill(r) : u.fill(0), u
            }, SafeBuffer.allocUnsafe = function(f) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                return Buffer(f)
            }, SafeBuffer.allocUnsafeSlow = function(f) {
                if ("number" != typeof f) throw new TypeError("Argument must be a number");
                return buffer.SlowBuffer(f)
            };

        }, {
            "buffer": 8
        }],
        83: [function(require, module, exports) {
            "use strict";
            module.exports = require("./lib")(require("./lib/elliptic"));

        }, {
            "./lib": 87,
            "./lib/elliptic": 86
        }],
        84: [function(require, module, exports) {
            (function(Buffer) {
                "use strict";
                var toString = Object.prototype.toString;
                exports.isArray = function(r, t) {
                    if (!Array.isArray(r)) throw TypeError(t)
                }, exports.isBoolean = function(r, t) {
                    if ("[object Boolean]" !== toString.call(r)) throw TypeError(t)
                }, exports.isBuffer = function(r, t) {
                    if (!Buffer.isBuffer(r)) throw TypeError(t)
                }, exports.isFunction = function(r, t) {
                    if ("[object Function]" !== toString.call(r)) throw TypeError(t)
                }, exports.isNumber = function(r, t) {
                    if ("[object Number]" !== toString.call(r)) throw TypeError(t)
                }, exports.isObject = function(r, t) {
                    if ("[object Object]" !== toString.call(r)) throw TypeError(t)
                }, exports.isBufferLength = function(r, t, o) {
                    if (r.length !== t) throw RangeError(o)
                }, exports.isBufferLength2 = function(r, t, o, e) {
                    if (r.length !== t && r.length !== o) throw RangeError(e)
                }, exports.isLengthGTZero = function(r, t) {
                    if (0 === r.length) throw RangeError(t)
                }, exports.isNumberInInterval = function(r, t, o, e) {
                    if (r <= t || r >= o) throw RangeError(e)
                };

            }).call(this, {
                "isBuffer": require("../../is-buffer/index.js")
            })
        }, {
            "../../is-buffer/index.js": 52
        }],
        85: [function(require, module, exports) {
            "use strict";
            var Buffer = require("safe-buffer").Buffer,
                bip66 = require("bip66"),
                EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([48, 129, 211, 2, 1, 1, 4, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 129, 133, 48, 129, 130, 2, 1, 1, 48, 44, 6, 7, 42, 134, 72, 206, 61, 1, 1, 2, 33, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 255, 255, 252, 47, 48, 6, 4, 1, 0, 4, 1, 7, 4, 33, 2, 121, 190, 102, 126, 249, 220, 187, 172, 85, 160, 98, 149, 206, 135, 11, 7, 2, 155, 252, 219, 45, 206, 40, 217, 89, 242, 129, 91, 22, 248, 23, 152, 2, 33, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 186, 174, 220, 230, 175, 72, 160, 59, 191, 210, 94, 140, 208, 54, 65, 65, 2, 1, 1, 161, 36, 3, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([48, 130, 1, 19, 2, 1, 1, 4, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 129, 165, 48, 129, 162, 2, 1, 1, 48, 44, 6, 7, 42, 134, 72, 206, 61, 1, 1, 2, 33, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 255, 255, 252, 47, 48, 6, 4, 1, 0, 4, 1, 7, 4, 65, 4, 121, 190, 102, 126, 249, 220, 187, 172, 85, 160, 98, 149, 206, 135, 11, 7, 2, 155, 252, 219, 45, 206, 40, 217, 89, 242, 129, 91, 22, 248, 23, 152, 72, 58, 218, 119, 38, 163, 196, 101, 93, 164, 251, 252, 14, 17, 8, 168, 253, 23, 180, 72, 166, 133, 84, 25, 156, 71, 208, 143, 251, 16, 212, 184, 2, 33, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 186, 174, 220, 230, 175, 72, 160, 59, 191, 210, 94, 140, 208, 54, 65, 65, 2, 1, 1, 161, 68, 3, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                ZERO_BUFFER_32 = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            exports.privateKeyExport = function(r, f, e) {
                var o = Buffer.from(e ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED);
                return r.copy(o, e ? 8 : 9), f.copy(o, e ? 181 : 214), o
            }, exports.privateKeyImport = function(r) {
                var f = r.length,
                    e = 0;
                if (!(f < e + 1 || 48 !== r[e]) && (e += 1, !(f < e + 1) && 128 & r[e])) {
                    var o = 127 & r[e];
                    if (e += 1, !(o < 1 || o > 2 || f < e + o)) {
                        var t = r[e + o - 1] | (o > 1 ? r[e + o - 2] << 8 : 0);
                        if (e += o, !(f < e + t || f < e + 3 || 2 !== r[e] || 1 !== r[e + 1] || 1 !== r[e + 2] || (e += 3, f < e + 2 || 4 !== r[e] || r[e + 1] > 32 || f < e + 2 + r[e + 1]))) return r.slice(e + 2, e + 2 + r[e + 1])
                    }
                }
            }, exports.signatureExport = function(r) {
                for (var f = Buffer.concat([Buffer.from([0]), r.r]), e = 33, o = 0; e > 1 && 0 === f[o] && !(128 & f[o + 1]); --e, ++o);
                for (var t = Buffer.concat([Buffer.from([0]), r.s]), i = 33, n = 0; i > 1 && 0 === t[n] && !(128 & t[n + 1]); --i, ++n);
                return bip66.encode(f.slice(o), t.slice(n))
            }, exports.signatureImport = function(r) {
                var f = Buffer.from(ZERO_BUFFER_32),
                    e = Buffer.from(ZERO_BUFFER_32);
                try {
                    var o = bip66.decode(r);
                    if (33 === o.r.length && 0 === o.r[0] && (o.r = o.r.slice(1)), o.r.length > 32) throw new Error("R length is too long");
                    if (33 === o.s.length && 0 === o.s[0] && (o.s = o.s.slice(1)), o.s.length > 32) throw new Error("S length is too long")
                } catch (r) {
                    return
                }
                return o.r.copy(f, 32 - o.r.length), o.s.copy(e, 32 - o.s.length), {
                    r: f,
                    s: e
                }
            }, exports.signatureImportLax = function(r) {
                var f = Buffer.from(ZERO_BUFFER_32),
                    e = Buffer.from(ZERO_BUFFER_32),
                    o = r.length,
                    t = 0;
                if (48 === r[t++]) {
                    var i = r[t++];
                    if (!(128 & i && (t += i - 128) > o) && 2 === r[t++]) {
                        var n = r[t++];
                        if (128 & n) {
                            if (i = n - 128, t + i > o) return;
                            for (; i > 0 && 0 === r[t]; t += 1, i -= 1);
                            for (n = 0; i > 0; t += 1, i -= 1) n = (n << 8) + r[t]
                        }
                        if (!(n > o - t)) {
                            var E = t;
                            if (t += n, 2 === r[t++]) {
                                var u = r[t++];
                                if (128 & u) {
                                    if (i = u - 128, t + i > o) return;
                                    for (; i > 0 && 0 === r[t]; t += 1, i -= 1);
                                    for (u = 0; i > 0; t += 1, i -= 1) u = (u << 8) + r[t]
                                }
                                if (!(u > o - t)) {
                                    var s = t;
                                    for (t += u; n > 0 && 0 === r[E]; n -= 1, E += 1);
                                    if (!(n > 32)) {
                                        var a = r.slice(E, E + n);
                                        for (a.copy(f, 32 - a.length); u > 0 && 0 === r[s]; u -= 1, s += 1);
                                        if (!(u > 32)) {
                                            var c = r.slice(s, s + u);
                                            return c.copy(e, 32 - c.length), {
                                                r: f,
                                                s: e
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

        }, {
            "bip66": 3,
            "safe-buffer": 82
        }],
        86: [function(require, module, exports) {
            "use strict";

            function loadCompressedPublicKey(e, r) {
                var n = new BN(r);
                if (n.cmp(ecparams.p) >= 0) return null;
                var s = (n = n.toRed(ecparams.red)).redSqr().redIMul(n).redIAdd(ecparams.b).redSqrt();
                return 3 === e !== s.isOdd() && (s = s.redNeg()), ec.keyPair({
                    pub: {
                        x: n,
                        y: s
                    }
                })
            }

            function loadUncompressedPublicKey(e, r, n) {
                var s = new BN(r),
                    a = new BN(n);
                if (s.cmp(ecparams.p) >= 0 || a.cmp(ecparams.p) >= 0) return null;
                if (s = s.toRed(ecparams.red), a = a.toRed(ecparams.red), (6 === e || 7 === e) && a.isOdd() !== (7 === e)) return null;
                var c = s.redSqr().redIMul(s);
                return a.redSqr().redISub(c.redIAdd(ecparams.b)).isZero() ? ec.keyPair({
                    pub: {
                        x: s,
                        y: a
                    }
                }) : null
            }

            function loadPublicKey(e) {
                var r = e[0];
                switch (r) {
                    case 2:
                    case 3:
                        return 33 !== e.length ? null : loadCompressedPublicKey(r, e.slice(1, 33));
                    case 4:
                    case 6:
                    case 7:
                        return 65 !== e.length ? null : loadUncompressedPublicKey(r, e.slice(1, 33), e.slice(33, 65));
                    default:
                        return null
                }
            }
            var Buffer = require("safe-buffer").Buffer,
                createHash = require("create-hash"),
                BN = require("bn.js"),
                EC = require("elliptic").ec,
                messages = require("../messages.json"),
                ec = new EC("secp256k1"),
                ecparams = ec.curve;
            exports.privateKeyVerify = function(e) {
                var r = new BN(e);
                return r.cmp(ecparams.n) < 0 && !r.isZero()
            }, exports.privateKeyExport = function(e, r) {
                var n = new BN(e);
                if (n.cmp(ecparams.n) >= 0 || n.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL);
                return Buffer.from(ec.keyFromPrivate(e).getPublic(r, !0))
            }, exports.privateKeyTweakAdd = function(e, r) {
                var n = new BN(r);
                if (n.cmp(ecparams.n) >= 0) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);
                if (n.iadd(new BN(e)), n.cmp(ecparams.n) >= 0 && n.isub(ecparams.n), n.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);
                return n.toArrayLike(Buffer, "be", 32)
            }, exports.privateKeyTweakMul = function(e, r) {
                var n = new BN(r);
                if (n.cmp(ecparams.n) >= 0 || n.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);
                return n.imul(new BN(e)), n.cmp(ecparams.n) && (n = n.umod(ecparams.n)), n.toArrayLike(Buffer, "be", 32)
            }, exports.publicKeyCreate = function(e, r) {
                var n = new BN(e);
                if (n.cmp(ecparams.n) >= 0 || n.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL);
                return Buffer.from(ec.keyFromPrivate(e).getPublic(r, !0))
            }, exports.publicKeyConvert = function(e, r) {
                var n = loadPublicKey(e);
                if (null === n) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                return Buffer.from(n.getPublic(r, !0))
            }, exports.publicKeyVerify = function(e) {
                return null !== loadPublicKey(e)
            }, exports.publicKeyTweakAdd = function(e, r, n) {
                var s = loadPublicKey(e);
                if (null === s) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                if ((r = new BN(r)).cmp(ecparams.n) >= 0) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);
                return Buffer.from(ecparams.g.mul(r).add(s.pub).encode(!0, n))
            }, exports.publicKeyTweakMul = function(e, r, n) {
                var s = loadPublicKey(e);
                if (null === s) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                if ((r = new BN(r)).cmp(ecparams.n) >= 0 || r.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);
                return Buffer.from(s.pub.mul(r).encode(!0, n))
            }, exports.publicKeyCombine = function(e, r) {
                for (var n = new Array(e.length), s = 0; s < e.length; ++s)
                    if (n[s] = loadPublicKey(e[s]), null === n[s]) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                for (var a = n[0].pub, c = 1; c < n.length; ++c) a = a.add(n[c].pub);
                if (a.isInfinity()) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL);
                return Buffer.from(a.encode(!0, r))
            }, exports.signatureNormalize = function(e) {
                var r = new BN(e.slice(0, 32)),
                    n = new BN(e.slice(32, 64));
                if (r.cmp(ecparams.n) >= 0 || n.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);
                var s = Buffer.from(e);
                return 1 === n.cmp(ec.nh) && ecparams.n.sub(n).toArrayLike(Buffer, "be", 32).copy(s, 32), s
            }, exports.signatureExport = function(e) {
                var r = e.slice(0, 32),
                    n = e.slice(32, 64);
                if (new BN(r).cmp(ecparams.n) >= 0 || new BN(n).cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);
                return {
                    r: r,
                    s: n
                }
            }, exports.signatureImport = function(e) {
                var r = new BN(e.r);
                r.cmp(ecparams.n) >= 0 && (r = new BN(0));
                var n = new BN(e.s);
                return n.cmp(ecparams.n) >= 0 && (n = new BN(0)), Buffer.concat([r.toArrayLike(Buffer, "be", 32), n.toArrayLike(Buffer, "be", 32)])
            }, exports.sign = function(e, r, n, s) {
                if ("function" == typeof n) {
                    var a = n;
                    n = function(n) {
                        var c = a(e, r, null, s, n);
                        if (!Buffer.isBuffer(c) || 32 !== c.length) throw new Error(messages.ECDSA_SIGN_FAIL);
                        return new BN(c)
                    }
                }
                var c = new BN(r);
                if (c.cmp(ecparams.n) >= 0 || c.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL);
                var o = ec.sign(e, r, {
                    canonical: !0,
                    k: n,
                    pers: s
                });
                return {
                    signature: Buffer.concat([o.r.toArrayLike(Buffer, "be", 32), o.s.toArrayLike(Buffer, "be", 32)]),
                    recovery: o.recoveryParam
                }
            }, exports.verify = function(e, r, n) {
                var s = {
                        r: r.slice(0, 32),
                        s: r.slice(32, 64)
                    },
                    a = new BN(s.r),
                    c = new BN(s.s);
                if (a.cmp(ecparams.n) >= 0 || c.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);
                if (1 === c.cmp(ec.nh) || a.isZero() || c.isZero()) return !1;
                var o = loadPublicKey(n);
                if (null === o) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                return ec.verify(e, s, {
                    x: o.pub.x,
                    y: o.pub.y
                })
            }, exports.recover = function(e, r, n, s) {
                var a = {
                        r: r.slice(0, 32),
                        s: r.slice(32, 64)
                    },
                    c = new BN(a.r),
                    o = new BN(a.s);
                if (c.cmp(ecparams.n) >= 0 || o.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);
                try {
                    if (c.isZero() || o.isZero()) throw new Error;
                    var u = ec.recoverPubKey(e, a, n);
                    return Buffer.from(u.encode(!0, s))
                } catch (e) {
                    throw new Error(messages.ECDSA_RECOVER_FAIL)
                }
            }, exports.ecdh = function(e, r) {
                var n = exports.ecdhUnsafe(e, r, !0);
                return createHash("sha256").update(n).digest()
            }, exports.ecdhUnsafe = function(e, r, n) {
                var s = loadPublicKey(e);
                if (null === s) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
                var a = new BN(r);
                if (a.cmp(ecparams.n) >= 0 || a.isZero()) throw new Error(messages.ECDH_FAIL);
                return Buffer.from(s.pub.mul(a).encode(!0, n))
            };

        }, {
            "../messages.json": 88,
            "bn.js": 4,
            "create-hash": 11,
            "elliptic": 14,
            "safe-buffer": 82
        }],
        87: [function(require, module, exports) {
            "use strict";

            function initCompressedValue(e, s) {
                return void 0 === e ? s : (assert.isBoolean(e, messages.COMPRESSED_TYPE_INVALID), e)
            }
            var assert = require("./assert"),
                der = require("./der"),
                messages = require("./messages.json");
            module.exports = function(e) {
                return {
                    privateKeyVerify: function(s) {
                        return assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), 32 === s.length && e.privateKeyVerify(s)
                    },
                    privateKeyExport: function(s, r) {
                        assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(s, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), r = initCompressedValue(r, !0);
                        var _ = e.privateKeyExport(s, r);
                        return der.privateKeyExport(s, _, r)
                    },
                    privateKeyImport: function(s) {
                        if (assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), (s = der.privateKeyImport(s)) && 32 === s.length && e.privateKeyVerify(s)) return s;
                        throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL)
                    },
                    privateKeyTweakAdd: function(s, r) {
                        return assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(s, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.TWEAK_TYPE_INVALID), assert.isBufferLength(r, 32, messages.TWEAK_LENGTH_INVALID), e.privateKeyTweakAdd(s, r)
                    },
                    privateKeyTweakMul: function(s, r) {
                        return assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(s, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.TWEAK_TYPE_INVALID), assert.isBufferLength(r, 32, messages.TWEAK_LENGTH_INVALID), e.privateKeyTweakMul(s, r)
                    },
                    publicKeyCreate: function(s, r) {
                        return assert.isBuffer(s, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(s, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), r = initCompressedValue(r, !0), e.publicKeyCreate(s, r)
                    },
                    publicKeyConvert: function(s, r) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), r = initCompressedValue(r, !0), e.publicKeyConvert(s, r)
                    },
                    publicKeyVerify: function(s) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), e.publicKeyVerify(s)
                    },
                    publicKeyTweakAdd: function(s, r, _) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.TWEAK_TYPE_INVALID), assert.isBufferLength(r, 32, messages.TWEAK_LENGTH_INVALID), _ = initCompressedValue(_, !0), e.publicKeyTweakAdd(s, r, _)
                    },
                    publicKeyTweakMul: function(s, r, _) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.TWEAK_TYPE_INVALID), assert.isBufferLength(r, 32, messages.TWEAK_LENGTH_INVALID), _ = initCompressedValue(_, !0), e.publicKeyTweakMul(s, r, _)
                    },
                    publicKeyCombine: function(s, r) {
                        assert.isArray(s, messages.EC_PUBLIC_KEYS_TYPE_INVALID), assert.isLengthGTZero(s, messages.EC_PUBLIC_KEYS_LENGTH_INVALID);
                        for (var _ = 0; _ < s.length; ++_) assert.isBuffer(s[_], messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s[_], 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);
                        return r = initCompressedValue(r, !0), e.publicKeyCombine(s, r)
                    },
                    signatureNormalize: function(s) {
                        return assert.isBuffer(s, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isBufferLength(s, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID), e.signatureNormalize(s)
                    },
                    signatureExport: function(s) {
                        assert.isBuffer(s, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isBufferLength(s, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID);
                        var r = e.signatureExport(s);
                        return der.signatureExport(r)
                    },
                    signatureImport: function(s) {
                        assert.isBuffer(s, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isLengthGTZero(s, messages.ECDSA_SIGNATURE_LENGTH_INVALID);
                        var r = der.signatureImport(s);
                        if (r) return e.signatureImport(r);
                        throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
                    },
                    signatureImportLax: function(s) {
                        assert.isBuffer(s, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isLengthGTZero(s, messages.ECDSA_SIGNATURE_LENGTH_INVALID);
                        var r = der.signatureImportLax(s);
                        if (r) return e.signatureImport(r);
                        throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
                    },
                    sign: function(s, r, _) {
                        assert.isBuffer(s, messages.MSG32_TYPE_INVALID), assert.isBufferLength(s, 32, messages.MSG32_LENGTH_INVALID), assert.isBuffer(r, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(r, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);
                        var E = null,
                            t = null;
                        return void 0 !== _ && (assert.isObject(_, messages.OPTIONS_TYPE_INVALID), void 0 !== _.data && (assert.isBuffer(_.data, messages.OPTIONS_DATA_TYPE_INVALID), assert.isBufferLength(_.data, 32, messages.OPTIONS_DATA_LENGTH_INVALID), E = _.data), void 0 !== _.noncefn && (assert.isFunction(_.noncefn, messages.OPTIONS_NONCEFN_TYPE_INVALID), t = _.noncefn)), e.sign(s, r, t, E)
                    },
                    verify: function(s, r, _) {
                        return assert.isBuffer(s, messages.MSG32_TYPE_INVALID), assert.isBufferLength(s, 32, messages.MSG32_LENGTH_INVALID), assert.isBuffer(r, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isBufferLength(r, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID), assert.isBuffer(_, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(_, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), e.verify(s, r, _)
                    },
                    recover: function(s, r, _, E) {
                        return assert.isBuffer(s, messages.MSG32_TYPE_INVALID), assert.isBufferLength(s, 32, messages.MSG32_LENGTH_INVALID), assert.isBuffer(r, messages.ECDSA_SIGNATURE_TYPE_INVALID), assert.isBufferLength(r, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID), assert.isNumber(_, messages.RECOVERY_ID_TYPE_INVALID), assert.isNumberInInterval(_, -1, 4, messages.RECOVERY_ID_VALUE_INVALID), E = initCompressedValue(E, !0), e.recover(s, r, _, E)
                    },
                    ecdh: function(s, r) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(r, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), e.ecdh(s, r)
                    },
                    ecdhUnsafe: function(s, r, _) {
                        return assert.isBuffer(s, messages.EC_PUBLIC_KEY_TYPE_INVALID), assert.isBufferLength2(s, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID), assert.isBuffer(r, messages.EC_PRIVATE_KEY_TYPE_INVALID), assert.isBufferLength(r, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID), _ = initCompressedValue(_, !0), e.ecdhUnsafe(s, r, _)
                    }
                }
            };

        }, {
            "./assert": 84,
            "./der": 85,
            "./messages.json": 88
        }],
        88: [function(require, module, exports) {
            module.exports = {
                "COMPRESSED_TYPE_INVALID": "compressed should be a boolean",
                "EC_PRIVATE_KEY_TYPE_INVALID": "private key should be a Buffer",
                "EC_PRIVATE_KEY_LENGTH_INVALID": "private key length is invalid",
                "EC_PRIVATE_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting private key is invalid",
                "EC_PRIVATE_KEY_TWEAK_MUL_FAIL": "tweak out of range",
                "EC_PRIVATE_KEY_EXPORT_DER_FAIL": "couldn't export to DER format",
                "EC_PRIVATE_KEY_IMPORT_DER_FAIL": "couldn't import from DER format",
                "EC_PUBLIC_KEYS_TYPE_INVALID": "public keys should be an Array",
                "EC_PUBLIC_KEYS_LENGTH_INVALID": "public keys Array should have at least 1 element",
                "EC_PUBLIC_KEY_TYPE_INVALID": "public key should be a Buffer",
                "EC_PUBLIC_KEY_LENGTH_INVALID": "public key length is invalid",
                "EC_PUBLIC_KEY_PARSE_FAIL": "the public key could not be parsed or is invalid",
                "EC_PUBLIC_KEY_CREATE_FAIL": "private was invalid, try again",
                "EC_PUBLIC_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting public key is invalid",
                "EC_PUBLIC_KEY_TWEAK_MUL_FAIL": "tweak out of range",
                "EC_PUBLIC_KEY_COMBINE_FAIL": "the sum of the public keys is not valid",
                "ECDH_FAIL": "scalar was invalid (zero or overflow)",
                "ECDSA_SIGNATURE_TYPE_INVALID": "signature should be a Buffer",
                "ECDSA_SIGNATURE_LENGTH_INVALID": "signature length is invalid",
                "ECDSA_SIGNATURE_PARSE_FAIL": "couldn't parse signature",
                "ECDSA_SIGNATURE_PARSE_DER_FAIL": "couldn't parse DER signature",
                "ECDSA_SIGNATURE_SERIALIZE_DER_FAIL": "couldn't serialize signature to DER format",
                "ECDSA_SIGN_FAIL": "nonce generation function failed or private key is invalid",
                "ECDSA_RECOVER_FAIL": "couldn't recover public key from signature",
                "MSG32_TYPE_INVALID": "message should be a Buffer",
                "MSG32_LENGTH_INVALID": "message length is invalid",
                "OPTIONS_TYPE_INVALID": "options should be an Object",
                "OPTIONS_DATA_TYPE_INVALID": "options.data should be a Buffer",
                "OPTIONS_DATA_LENGTH_INVALID": "options.data length is invalid",
                "OPTIONS_NONCEFN_TYPE_INVALID": "options.noncefn should be a Function",
                "RECOVERY_ID_TYPE_INVALID": "recovery should be a Number",
                "RECOVERY_ID_VALUE_INVALID": "recovery should have value between -1 and 4",
                "TWEAK_TYPE_INVALID": "tweak should be a Buffer",
                "TWEAK_LENGTH_INVALID": "tweak length is invalid"
            }

        }, {}],
        89: [function(require, module, exports) {
            function Hash(t, i) {
                this._block = Buffer.alloc(t), this._finalSize = i, this._blockSize = t, this._len = 0
            }
            var Buffer = require("safe-buffer").Buffer;
            Hash.prototype.update = function(t, i) {
                "string" == typeof t && (i = i || "utf8", t = Buffer.from(t, i));
                for (var e = this._block, s = this._blockSize, h = t.length, o = this._len, l = 0; l < h;) {
                    for (var r = o % s, _ = Math.min(h - l, s - r), n = 0; n < _; n++) e[r + n] = t[l + n];
                    l += _, (o += _) % s == 0 && this._update(e)
                }
                return this._len += h, this
            }, Hash.prototype.digest = function(t) {
                var i = this._len % this._blockSize;
                this._block[i] = 128, this._block.fill(0, i + 1), i >= this._finalSize && (this._update(this._block), this._block.fill(0));
                var e = 8 * this._len;
                if (e <= 4294967295) this._block.writeUInt32BE(e, this._blockSize - 4);
                else {
                    var s = 4294967295 & e,
                        h = (e - s) / 4294967296;
                    this._block.writeUInt32BE(h, this._blockSize - 8), this._block.writeUInt32BE(s, this._blockSize - 4)
                }
                this._update(this._block);
                var o = this._hash();
                return t ? o.toString(t) : o
            }, Hash.prototype._update = function() {
                throw new Error("_update must be implemented by subclass")
            }, module.exports = Hash;

        }, {
            "safe-buffer": 82
        }],
        90: [function(require, module, exports) {
            var exports = module.exports = function(e) {
                e = e.toLowerCase();
                var r = exports[e];
                if (!r) throw new Error(e + " is not supported (we accept pull requests)");
                return new r
            };
            exports.sha = require("./sha"), exports.sha1 = require("./sha1"), exports.sha224 = require("./sha224"), exports.sha256 = require("./sha256"), exports.sha384 = require("./sha384"), exports.sha512 = require("./sha512");

        }, {
            "./sha": 91,
            "./sha1": 92,
            "./sha224": 93,
            "./sha256": 94,
            "./sha384": 95,
            "./sha512": 96
        }],
        91: [function(require, module, exports) {
            function Sha() {
                this.init(), this._w = W, Hash.call(this, 64, 56)
            }

            function rotl5(t) {
                return t << 5 | t >>> 27
            }

            function rotl30(t) {
                return t << 30 | t >>> 2
            }

            function ft(t, i, r, h) {
                return 0 === t ? i & r | ~i & h : 2 === t ? i & r | i & h | r & h : i ^ r ^ h
            }
            var inherits = require("inherits"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                K = [1518500249, 1859775393, -1894007588, -899497514],
                W = new Array(80);
            inherits(Sha, Hash), Sha.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, Sha.prototype._update = function(t) {
                for (var i = this._w, r = 0 | this._a, h = 0 | this._b, s = 0 | this._c, e = 0 | this._d, n = 0 | this._e, _ = 0; _ < 16; ++_) i[_] = t.readInt32BE(4 * _);
                for (; _ < 80; ++_) i[_] = i[_ - 3] ^ i[_ - 8] ^ i[_ - 14] ^ i[_ - 16];
                for (var a = 0; a < 80; ++a) {
                    var o = ~~(a / 20),
                        f = rotl5(r) + ft(o, h, s, e) + n + i[a] + K[o] | 0;
                    n = e, e = s, s = rotl30(h), h = r, r = f
                }
                this._a = r + this._a | 0, this._b = h + this._b | 0, this._c = s + this._c | 0, this._d = e + this._d | 0, this._e = n + this._e | 0
            }, Sha.prototype._hash = function() {
                var t = Buffer.allocUnsafe(20);
                return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
            }, module.exports = Sha;

        }, {
            "./hash": 89,
            "inherits": 51,
            "safe-buffer": 82
        }],
        92: [function(require, module, exports) {
            function Sha1() {
                this.init(), this._w = W, Hash.call(this, 64, 56)
            }

            function rotl1(t) {
                return t << 1 | t >>> 31
            }

            function rotl5(t) {
                return t << 5 | t >>> 27
            }

            function rotl30(t) {
                return t << 30 | t >>> 2
            }

            function ft(t, i, r, h) {
                return 0 === t ? i & r | ~i & h : 2 === t ? i & r | i & h | r & h : i ^ r ^ h
            }
            var inherits = require("inherits"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                K = [1518500249, 1859775393, -1894007588, -899497514],
                W = new Array(80);
            inherits(Sha1, Hash), Sha1.prototype.init = function() {
                return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
            }, Sha1.prototype._update = function(t) {
                for (var i = this._w, r = 0 | this._a, h = 0 | this._b, s = 0 | this._c, e = 0 | this._d, n = 0 | this._e, _ = 0; _ < 16; ++_) i[_] = t.readInt32BE(4 * _);
                for (; _ < 80; ++_) i[_] = rotl1(i[_ - 3] ^ i[_ - 8] ^ i[_ - 14] ^ i[_ - 16]);
                for (var a = 0; a < 80; ++a) {
                    var o = ~~(a / 20),
                        f = rotl5(r) + ft(o, h, s, e) + n + i[a] + K[o] | 0;
                    n = e, e = s, s = rotl30(h), h = r, r = f
                }
                this._a = r + this._a | 0, this._b = h + this._b | 0, this._c = s + this._c | 0, this._d = e + this._d | 0, this._e = n + this._e | 0
            }, Sha1.prototype._hash = function() {
                var t = Buffer.allocUnsafe(20);
                return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
            }, module.exports = Sha1;

        }, {
            "./hash": 89,
            "inherits": 51,
            "safe-buffer": 82
        }],
        93: [function(require, module, exports) {
            function Sha224() {
                this.init(), this._w = W, Hash.call(this, 64, 56)
            }
            var inherits = require("inherits"),
                Sha256 = require("./sha256"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                W = new Array(64);
            inherits(Sha224, Sha256), Sha224.prototype.init = function() {
                return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
            }, Sha224.prototype._hash = function() {
                var t = Buffer.allocUnsafe(28);
                return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
            }, module.exports = Sha224;

        }, {
            "./hash": 89,
            "./sha256": 94,
            "inherits": 51,
            "safe-buffer": 82
        }],
        94: [function(require, module, exports) {
            function Sha256() {
                this.init(), this._w = W, Hash.call(this, 64, 56)
            }

            function ch(t, i, h) {
                return h ^ t & (i ^ h)
            }

            function maj(t, i, h) {
                return t & i | h & (t | i)
            }

            function sigma0(t) {
                return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
            }

            function sigma1(t) {
                return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
            }

            function gamma0(t) {
                return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
            }

            function gamma1(t) {
                return (t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10
            }
            var inherits = require("inherits"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                W = new Array(64);
            inherits(Sha256, Hash), Sha256.prototype.init = function() {
                return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
            }, Sha256.prototype._update = function(t) {
                for (var i = this._w, h = 0 | this._a, s = 0 | this._b, r = 0 | this._c, e = 0 | this._d, n = 0 | this._e, _ = 0 | this._f, a = 0 | this._g, f = 0 | this._h, u = 0; u < 16; ++u) i[u] = t.readInt32BE(4 * u);
                for (; u < 64; ++u) i[u] = gamma1(i[u - 2]) + i[u - 7] + gamma0(i[u - 15]) + i[u - 16] | 0;
                for (var o = 0; o < 64; ++o) {
                    var c = f + sigma1(n) + ch(n, _, a) + K[o] + i[o] | 0,
                        m = sigma0(h) + maj(h, s, r) | 0;
                    f = a, a = _, _ = n, n = e + c | 0, e = r, r = s, s = h, h = c + m | 0
                }
                this._a = h + this._a | 0, this._b = s + this._b | 0, this._c = r + this._c | 0, this._d = e + this._d | 0, this._e = n + this._e | 0, this._f = _ + this._f | 0, this._g = a + this._g | 0, this._h = f + this._h | 0
            }, Sha256.prototype._hash = function() {
                var t = Buffer.allocUnsafe(32);
                return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
            }, module.exports = Sha256;

        }, {
            "./hash": 89,
            "inherits": 51,
            "safe-buffer": 82
        }],
        95: [function(require, module, exports) {
            function Sha384() {
                this.init(), this._w = W, Hash.call(this, 128, 112)
            }
            var inherits = require("inherits"),
                SHA512 = require("./sha512"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                W = new Array(160);
            inherits(Sha384, SHA512), Sha384.prototype.init = function() {
                return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
            }, Sha384.prototype._hash = function() {
                function h(h, t, s) {
                    i.writeInt32BE(h, s), i.writeInt32BE(t, s + 4)
                }
                var i = Buffer.allocUnsafe(48);
                return h(this._ah, this._al, 0), h(this._bh, this._bl, 8), h(this._ch, this._cl, 16), h(this._dh, this._dl, 24), h(this._eh, this._el, 32), h(this._fh, this._fl, 40), i
            }, module.exports = Sha384;

        }, {
            "./hash": 89,
            "./sha512": 96,
            "inherits": 51,
            "safe-buffer": 82
        }],
        96: [function(require, module, exports) {
            function Sha512() {
                this.init(), this._w = W, Hash.call(this, 128, 112)
            }

            function Ch(h, t, i) {
                return i ^ h & (t ^ i)
            }

            function maj(h, t, i) {
                return h & t | i & (h | t)
            }

            function sigma0(h, t) {
                return (h >>> 28 | t << 4) ^ (t >>> 2 | h << 30) ^ (t >>> 7 | h << 25)
            }

            function sigma1(h, t) {
                return (h >>> 14 | t << 18) ^ (h >>> 18 | t << 14) ^ (t >>> 9 | h << 23)
            }

            function Gamma0(h, t) {
                return (h >>> 1 | t << 31) ^ (h >>> 8 | t << 24) ^ h >>> 7
            }

            function Gamma0l(h, t) {
                return (h >>> 1 | t << 31) ^ (h >>> 8 | t << 24) ^ (h >>> 7 | t << 25)
            }

            function Gamma1(h, t) {
                return (h >>> 19 | t << 13) ^ (t >>> 29 | h << 3) ^ h >>> 6
            }

            function Gamma1l(h, t) {
                return (h >>> 19 | t << 13) ^ (t >>> 29 | h << 3) ^ (h >>> 6 | t << 26)
            }

            function getCarry(h, t) {
                return h >>> 0 < t >>> 0 ? 1 : 0
            }
            var inherits = require("inherits"),
                Hash = require("./hash"),
                Buffer = require("safe-buffer").Buffer,
                K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
                W = new Array(160);
            inherits(Sha512, Hash), Sha512.prototype.init = function() {
                return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
            }, Sha512.prototype._update = function(h) {
                for (var t = this._w, i = 0 | this._ah, s = 0 | this._bh, r = 0 | this._ch, _ = 0 | this._dh, a = 0 | this._eh, e = 0 | this._fh, l = 0 | this._gh, n = 0 | this._hh, f = 0 | this._al, g = 0 | this._bl, u = 0 | this._cl, c = 0 | this._dl, m = 0 | this._el, o = 0 | this._fl, y = 0 | this._gl, C = 0 | this._hl, d = 0; d < 32; d += 2) t[d] = h.readInt32BE(4 * d), t[d + 1] = h.readInt32BE(4 * d + 4);
                for (; d < 160; d += 2) {
                    var b = t[d - 30],
                        p = t[d - 30 + 1],
                        G = Gamma0(b, p),
                        v = Gamma0l(p, b),
                        B = Gamma1(b = t[d - 4], p = t[d - 4 + 1]),
                        S = Gamma1l(p, b),
                        w = t[d - 14],
                        E = t[d - 14 + 1],
                        I = t[d - 32],
                        j = t[d - 32 + 1],
                        q = v + E | 0,
                        H = G + w + getCarry(q, v) | 0;
                    H = (H = H + B + getCarry(q = q + S | 0, S) | 0) + I + getCarry(q = q + j | 0, j) | 0, t[d] = H, t[d + 1] = q
                }
                for (var W = 0; W < 160; W += 2) {
                    H = t[W], q = t[W + 1];
                    var x = maj(i, s, r),
                        A = maj(f, g, u),
                        U = sigma0(i, f),
                        k = sigma0(f, i),
                        z = sigma1(a, m),
                        D = sigma1(m, a),
                        F = K[W],
                        J = K[W + 1],
                        L = Ch(a, e, l),
                        M = Ch(m, o, y),
                        N = C + D | 0,
                        O = n + z + getCarry(N, C) | 0;
                    O = (O = (O = O + L + getCarry(N = N + M | 0, M) | 0) + F + getCarry(N = N + J | 0, J) | 0) + H + getCarry(N = N + q | 0, q) | 0;
                    var P = k + A | 0,
                        Q = U + x + getCarry(P, k) | 0;
                    n = l, C = y, l = e, y = o, e = a, o = m, a = _ + O + getCarry(m = c + N | 0, c) | 0, _ = r, c = u, r = s, u = g, s = i, g = f, i = O + Q + getCarry(f = N + P | 0, N) | 0
                }
                this._al = this._al + f | 0, this._bl = this._bl + g | 0, this._cl = this._cl + u | 0, this._dl = this._dl + c | 0, this._el = this._el + m | 0, this._fl = this._fl + o | 0, this._gl = this._gl + y | 0, this._hl = this._hl + C | 0, this._ah = this._ah + i + getCarry(this._al, f) | 0, this._bh = this._bh + s + getCarry(this._bl, g) | 0, this._ch = this._ch + r + getCarry(this._cl, u) | 0, this._dh = this._dh + _ + getCarry(this._dl, c) | 0, this._eh = this._eh + a + getCarry(this._el, m) | 0, this._fh = this._fh + e + getCarry(this._fl, o) | 0, this._gh = this._gh + l + getCarry(this._gl, y) | 0, this._hh = this._hh + n + getCarry(this._hl, C) | 0
            }, Sha512.prototype._hash = function() {
                function h(h, i, s) {
                    t.writeInt32BE(h, s), t.writeInt32BE(i, s + 4)
                }
                var t = Buffer.allocUnsafe(64);
                return h(this._ah, this._al, 0), h(this._bh, this._bl, 8), h(this._ch, this._cl, 16), h(this._dh, this._dl, 24), h(this._eh, this._el, 32), h(this._fh, this._fl, 40), h(this._gh, this._gl, 48), h(this._hh, this._hl, 56), t
            }, module.exports = Sha512;

        }, {
            "./hash": 89,
            "inherits": 51,
            "safe-buffer": 82
        }],
        97: [function(require, module, exports) {
            function Stream() {
                EE.call(this)
            }
            module.exports = Stream;
            var EE = require("events").EventEmitter,
                inherits = require("inherits");
            inherits(Stream, EE), Stream.Readable = require("readable-stream/readable.js"), Stream.Writable = require("readable-stream/writable.js"), Stream.Duplex = require("readable-stream/duplex.js"), Stream.Transform = require("readable-stream/transform.js"), Stream.PassThrough = require("readable-stream/passthrough.js"), Stream.Stream = Stream, Stream.prototype.pipe = function(e, r) {
                function t(r) {
                    e.writable && !1 === e.write(r) && m.pause && m.pause()
                }

                function n() {
                    m.readable && m.resume && m.resume()
                }

                function a() {
                    u || (u = !0, e.end())
                }

                function o() {
                    u || (u = !0, "function" == typeof e.destroy && e.destroy())
                }

                function i(e) {
                    if (s(), 0 === EE.listenerCount(this, "error")) throw e
                }

                function s() {
                    m.removeListener("data", t), e.removeListener("drain", n), m.removeListener("end", a), m.removeListener("close", o), m.removeListener("error", i), e.removeListener("error", i), m.removeListener("end", s), m.removeListener("close", s), e.removeListener("close", s)
                }
                var m = this;
                m.on("data", t), e.on("drain", n), e._isStdio || r && !1 === r.end || (m.on("end", a), m.on("close", o));
                var u = !1;
                return m.on("error", i), e.on("error", i), m.on("end", s), m.on("close", s), e.on("close", s), e.emit("pipe", m), e
            };

        }, {
            "events": 35,
            "inherits": 51,
            "readable-stream/duplex.js": 67,
            "readable-stream/passthrough.js": 76,
            "readable-stream/readable.js": 77,
            "readable-stream/transform.js": 78,
            "readable-stream/writable.js": 79
        }],
        98: [function(require, module, exports) {
            "use strict";

            function _normalizeEncoding(t) {
                if (!t) return "utf8";
                for (var e;;) switch (t) {
                    case "utf8":
                    case "utf-8":
                        return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return "utf16le";
                    case "latin1":
                    case "binary":
                        return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                        return t;
                    default:
                        if (e) return;
                        t = ("" + t).toLowerCase(), e = !0
                }
            }

            function normalizeEncoding(t) {
                var e = _normalizeEncoding(t);
                if ("string" != typeof e && (Buffer.isEncoding === isEncoding || !isEncoding(t))) throw new Error("Unknown encoding: " + t);
                return e || t
            }

            function StringDecoder(t) {
                this.encoding = normalizeEncoding(t);
                var e;
                switch (this.encoding) {
                    case "utf16le":
                        this.text = utf16Text, this.end = utf16End, e = 4;
                        break;
                    case "utf8":
                        this.fillLast = utf8FillLast, e = 4;
                        break;
                    case "base64":
                        this.text = base64Text, this.end = base64End, e = 3;
                        break;
                    default:
                        return this.write = simpleWrite, void(this.end = simpleEnd)
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Buffer.allocUnsafe(e)
            }

            function utf8CheckByte(t) {
                return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : -1
            }

            function utf8CheckIncomplete(t, e, s) {
                var i = e.length - 1;
                if (i < s) return 0;
                var a = utf8CheckByte(e[i]);
                return a >= 0 ? (a > 0 && (t.lastNeed = a - 1), a) : --i < s ? 0 : (a = utf8CheckByte(e[i])) >= 0 ? (a > 0 && (t.lastNeed = a - 2), a) : --i < s ? 0 : (a = utf8CheckByte(e[i])) >= 0 ? (a > 0 && (2 === a ? a = 0 : t.lastNeed = a - 3), a) : 0
            }

            function utf8CheckExtraBytes(t, e, s) {
                if (128 != (192 & e[0])) return t.lastNeed = 0, "�".repeat(s);
                if (t.lastNeed > 1 && e.length > 1) {
                    if (128 != (192 & e[1])) return t.lastNeed = 1, "�".repeat(s + 1);
                    if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�".repeat(s + 2)
                }
            }

            function utf8FillLast(t) {
                var e = this.lastTotal - this.lastNeed,
                    s = utf8CheckExtraBytes(this, t, e);
                return void 0 !== s ? s : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this.lastNeed -= t.length))
            }

            function utf8Text(t, e) {
                var s = utf8CheckIncomplete(this, t, e);
                if (!this.lastNeed) return t.toString("utf8", e);
                this.lastTotal = s;
                var i = t.length - (s - this.lastNeed);
                return t.copy(this.lastChar, 0, i), t.toString("utf8", e, i)
            }

            function utf8End(t) {
                var e = t && t.length ? this.write(t) : "";
                return this.lastNeed ? e + "�".repeat(this.lastTotal - this.lastNeed) : e
            }

            function utf16Text(t, e) {
                if ((t.length - e) % 2 == 0) {
                    var s = t.toString("utf16le", e);
                    if (s) {
                        var i = s.charCodeAt(s.length - 1);
                        if (i >= 55296 && i <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], s.slice(0, -1)
                    }
                    return s
                }
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
            }

            function utf16End(t) {
                var e = t && t.length ? this.write(t) : "";
                if (this.lastNeed) {
                    var s = this.lastTotal - this.lastNeed;
                    return e + this.lastChar.toString("utf16le", 0, s)
                }
                return e
            }

            function base64Text(t, e) {
                var s = (t.length - e) % 3;
                return 0 === s ? t.toString("base64", e) : (this.lastNeed = 3 - s, this.lastTotal = 3, 1 === s ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - s))
            }

            function base64End(t) {
                var e = t && t.length ? this.write(t) : "";
                return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
            }

            function simpleWrite(t) {
                return t.toString(this.encoding)
            }

            function simpleEnd(t) {
                return t && t.length ? this.write(t) : ""
            }
            var Buffer = require("safe-buffer").Buffer,
                isEncoding = Buffer.isEncoding || function(t) {
                    switch ((t = "" + t) && t.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };
            exports.StringDecoder = StringDecoder, StringDecoder.prototype.write = function(t) {
                if (0 === t.length) return "";
                var e, s;
                if (this.lastNeed) {
                    if (void 0 === (e = this.fillLast(t))) return "";
                    s = this.lastNeed, this.lastNeed = 0
                } else s = 0;
                return s < t.length ? e ? e + this.text(t, s) : this.text(t, s) : e || ""
            }, StringDecoder.prototype.end = utf8End, StringDecoder.prototype.text = utf8Text, StringDecoder.prototype.fillLast = function(t) {
                if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
            };

        }, {
            "safe-buffer": 82
        }],
        99: [function(require, module, exports) {
            var isHexPrefixed = require("is-hex-prefixed");
            module.exports = function(e) {
                return "string" != typeof e ? e : isHexPrefixed(e) ? e.slice(2) : e
            };

        }, {
            "is-hex-prefixed": 53
        }],
        100: [function(require, module, exports) {
            (function(global) {
                function deprecate(r, e) {
                    if (config("noDeprecation")) return r;
                    var o = !1;
                    return function() {
                        if (!o) {
                            if (config("throwDeprecation")) throw new Error(e);
                            config("traceDeprecation") ? console.trace(e) : console.warn(e), o = !0
                        }
                        return r.apply(this, arguments)
                    }
                }

                function config(r) {
                    try {
                        if (!global.localStorage) return !1
                    } catch (r) {
                        return !1
                    }
                    var e = global.localStorage[r];
                    return null != e && "true" === String(e).toLowerCase()
                }
                module.exports = deprecate;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}],
        101: [function(require, module, exports) {
            "function" == typeof Object.create ? module.exports = function(t, e) {
                t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : module.exports = function(t, e) {
                t.super_ = e;
                var o = function() {};
                o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
            };

        }, {}],
        102: [function(require, module, exports) {
            module.exports = function(o) {
                return o && "object" == typeof o && "function" == typeof o.copy && "function" == typeof o.fill && "function" == typeof o.readUInt8
            };

        }, {}],
        103: [function(require, module, exports) {
            (function(process, global) {
                function inspect(e, r) {
                    var t = {
                        seen: [],
                        stylize: stylizeNoColor
                    };
                    return arguments.length >= 3 && (t.depth = arguments[2]), arguments.length >= 4 && (t.colors = arguments[3]), isBoolean(r) ? t.showHidden = r : r && exports._extend(t, r), isUndefined(t.showHidden) && (t.showHidden = !1), isUndefined(t.depth) && (t.depth = 2), isUndefined(t.colors) && (t.colors = !1), isUndefined(t.customInspect) && (t.customInspect = !0), t.colors && (t.stylize = stylizeWithColor), formatValue(t, e, t.depth)
                }

                function stylizeWithColor(e, r) {
                    var t = inspect.styles[r];
                    return t ? "inspect.colors[t][0]+"
                    m "+e+"
                    inspect.colors[t][1] + "m": e
                }

                function stylizeNoColor(e, r) {
                    return e
                }

                function arrayToHash(e) {
                    var r = {};
                    return e.forEach(function(e, t) {
                        r[e] = !0
                    }), r
                }

                function formatValue(e, r, t) {
                    if (e.customInspect && r && isFunction(r.inspect) && r.inspect !== exports.inspect && (!r.constructor || r.constructor.prototype !== r)) {
                        var n = r.inspect(t, e);
                        return isString(n) || (n = formatValue(e, n, t)), n
                    }
                    var i = formatPrimitive(e, r);
                    if (i) return i;
                    var o = Object.keys(r),
                        s = arrayToHash(o);
                    if (e.showHidden && (o = Object.getOwnPropertyNames(r)), isError(r) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return formatError(r);
                    if (0 === o.length) {
                        if (isFunction(r)) {
                            var u = r.name ? ": " + r.name : "";
                            return e.stylize("[Function" + u + "]", "special")
                        }
                        if (isRegExp(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");
                        if (isDate(r)) return e.stylize(Date.prototype.toString.call(r), "date");
                        if (isError(r)) return formatError(r)
                    }
                    var c = "",
                        a = !1,
                        l = ["{", "}"];
                    if (isArray(r) && (a = !0, l = ["[", "]"]), isFunction(r) && (c = " [Function" + (r.name ? ": " + r.name : "") + "]"), isRegExp(r) && (c = " " + RegExp.prototype.toString.call(r)), isDate(r) && (c = " " + Date.prototype.toUTCString.call(r)), isError(r) && (c = " " + formatError(r)), 0 === o.length && (!a || 0 == r.length)) return l[0] + c + l[1];
                    if (t < 0) return isRegExp(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special");
                    e.seen.push(r);
                    var p;
                    return p = a ? formatArray(e, r, t, s, o) : o.map(function(n) {
                        return formatProperty(e, r, t, s, n, a)
                    }), e.seen.pop(), reduceToSingleString(p, c, l)
                }

                function formatPrimitive(e, r) {
                    if (isUndefined(r)) return e.stylize("undefined", "undefined");
                    if (isString(r)) {
                        var t = "'" + JSON.stringify(r).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return e.stylize(t, "string")
                    }
                    return isNumber(r) ? e.stylize("" + r, "number") : isBoolean(r) ? e.stylize("" + r, "boolean") : isNull(r) ? e.stylize("null", "null") : void 0
                }

                function formatError(e) {
                    return "[" + Error.prototype.toString.call(e) + "]"
                }

                function formatArray(e, r, t, n, i) {
                    for (var o = [], s = 0, u = r.length; s < u; ++s) hasOwnProperty(r, String(s)) ? o.push(formatProperty(e, r, t, n, String(s), !0)) : o.push("");
                    return i.forEach(function(i) {
                        i.match(/^\d+$/) || o.push(formatProperty(e, r, t, n, i, !0))
                    }), o
                }

                function formatProperty(e, r, t, n, i, o) {
                    var s, u, c;
                    if ((c = Object.getOwnPropertyDescriptor(r, i) || {
                            value: r[i]
                        }).get ? u = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (u = e.stylize("[Setter]", "special")), hasOwnProperty(n, i) || (s = "[" + i + "]"), u || (e.seen.indexOf(c.value) < 0 ? (u = isNull(t) ? formatValue(e, c.value, null) : formatValue(e, c.value, t - 1)).indexOf("\n") > -1 && (u = o ? u.split("\n").map(function(e) {
                            return "  " + e
                        }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                            return "   " + e
                        }).join("\n")) : u = e.stylize("[Circular]", "special")), isUndefined(s)) {
                        if (o && i.match(/^\d+$/)) return u;
                        (s = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
                    }
                    return s + ": " + u
                }

                function reduceToSingleString(e, r, t) {
                    var n = 0;
                    return e.reduce(function(e, r) {
                        return n++, r.indexOf("\n") >= 0 && n++, e + r.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0) > 60 ? t[0] + ("" === r ? "" : r + "\n ") + " " + e.join(",\n  ") + " " + t[1] : t[0] + r + " " + e.join(", ") + " " + t[1]
                }

                function isArray(e) {
                    return Array.isArray(e)
                }

                function isBoolean(e) {
                    return "boolean" == typeof e
                }

                function isNull(e) {
                    return null === e
                }

                function isNullOrUndefined(e) {
                    return null == e
                }

                function isNumber(e) {
                    return "number" == typeof e
                }

                function isString(e) {
                    return "string" == typeof e
                }

                function isSymbol(e) {
                    return "symbol" == typeof e
                }

                function isUndefined(e) {
                    return void 0 === e
                }

                function isRegExp(e) {
                    return isObject(e) && "[object RegExp]" === objectToString(e)
                }

                function isObject(e) {
                    return "object" == typeof e && null !== e
                }

                function isDate(e) {
                    return isObject(e) && "[object Date]" === objectToString(e)
                }

                function isError(e) {
                    return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error)
                }

                function isFunction(e) {
                    return "function" == typeof e
                }

                function isPrimitive(e) {
                    return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
                }

                function objectToString(e) {
                    return Object.prototype.toString.call(e)
                }

                function pad(e) {
                    return e < 10 ? "0" + e.toString(10) : e.toString(10)
                }

                function timestamp() {
                    var e = new Date,
                        r = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(":");
                    return [e.getDate(), months[e.getMonth()], r].join(" ")
                }

                function hasOwnProperty(e, r) {
                    return Object.prototype.hasOwnProperty.call(e, r)
                }
                var formatRegExp = /%[sdj%]/g;
                exports.format = function(e) {
                    if (!isString(e)) {
                        for (var r = [], t = 0; t < arguments.length; t++) r.push(inspect(arguments[t]));
                        return r.join(" ")
                    }
                    for (var t = 1, n = arguments, i = n.length, o = String(e).replace(formatRegExp, function(e) {
                            if ("%%" === e) return "%";
                            if (t >= i) return e;
                            switch (e) {
                                case "%s":
                                    return String(n[t++]);
                                case "%d":
                                    return Number(n[t++]);
                                case "%j":
                                    try {
                                        return JSON.stringify(n[t++])
                                    } catch (e) {
                                        return "[Circular]"
                                    }
                                default:
                                    return e
                            }
                        }), s = n[t]; t < i; s = n[++t]) isNull(s) || !isObject(s) ? o += " " + s : o += " " + inspect(s);
                    return o
                }, exports.deprecate = function(e, r) {
                    if (isUndefined(global.process)) return function() {
                        return exports.deprecate(e, r).apply(this, arguments)
                    };
                    if (!0 === process.noDeprecation) return e;
                    var t = !1;
                    return function() {
                        if (!t) {
                            if (process.throwDeprecation) throw new Error(r);
                            process.traceDeprecation ? console.trace(r) : console.error(r), t = !0
                        }
                        return e.apply(this, arguments)
                    }
                };
                var debugs = {},
                    debugEnviron;
                exports.debuglog = function(e) {
                    if (isUndefined(debugEnviron) && (debugEnviron = process.env.NODE_DEBUG || ""), e = e.toUpperCase(), !debugs[e])
                        if (new RegExp("\\b" + e + "\\b", "i").test(debugEnviron)) {
                            var r = process.pid;
                            debugs[e] = function() {
                                var t = exports.format.apply(exports, arguments);
                                console.error("%s %d: %s", e, r, t)
                            }
                        } else debugs[e] = function() {};
                    return debugs[e]
                }, exports.inspect = inspect, inspect.colors = {
                    bold: [1, 22],
                    italic: [3, 23],
                    underline: [4, 24],
                    inverse: [7, 27],
                    white: [37, 39],
                    grey: [90, 39],
                    black: [30, 39],
                    blue: [34, 39],
                    cyan: [36, 39],
                    green: [32, 39],
                    magenta: [35, 39],
                    red: [31, 39],
                    yellow: [33, 39]
                }, inspect.styles = {
                    special: "cyan",
                    number: "yellow",
                    boolean: "yellow",
                    undefined: "grey",
                    null: "bold",
                    string: "green",
                    date: "magenta",
                    regexp: "red"
                }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = require("./support/isBuffer");
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                exports.log = function() {
                    console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments))
                }, exports.inherits = require("inherits"), exports._extend = function(e, r) {
                    if (!r || !isObject(r)) return e;
                    for (var t = Object.keys(r), n = t.length; n--;) e[t[n]] = r[t[n]];
                    return e
                };

            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {
            "./support/isBuffer": 102,
            "_process": 66,
            "inherits": 101
        }],
        104: [function(require, module, exports) {
            "use strict";
            module.exports = {
                Buffer: require("buffer"),
                BN: require("ethereumjs-util").BN,
                RLP: require("ethereumjs-util").rlp,
                Tx: require("ethereumjs-tx"),
                Util: require("ethereumjs-util")
            };

        }, {
            "buffer": 8,
            "ethereumjs-tx": 31,
            "ethereumjs-util": 33
        }]
    }, {}, [104])(104)
});
},
"homesteadRepriceForkNumber": {
    "v": 2463000,
    "d": "the block that the Homestead Reprice (EIP150) fork started at"
},
"timebombPeriod": {
    "v": 100000,
    "d": "Exponential difficulty timebomb period"
},
"freeBlockPeriod": {
    "v": 2
}
}

}, {}], 31: [function(require, module, exports) {
        (function(Buffer) {
            "use strict";

            function _classCallCheck(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var ethUtil = require("ethereumjs-util"),
                fees = require("ethereum-common/params.json"),
                BN = ethUtil.BN,
                N_DIV_2 = new BN("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0", 16),
                Transaction = function() {
                    function e(t) {
                        _classCallCheck(this, e), t = t || {};
                        var i = [{
                            name: "nonce",
                            length: 32,
                            allowLess: !0,
                            default: new Buffer([])
                        }, {
                            name: "gasPrice",
                            length: 32,
                            allowLess: !0,
                            default: new Buffer([])
                        }, {
                            name: "gasLimit",
                            alias: "gas",
                            length: 32,
                            allowLess: !0,
                            default: new Buffer([])
                        }, {
                            name: "to",
                            allowZero: !0,
                            length: 20,
                            default: new Buffer([])
                        }, {
                            name: "value",
                            length: 32,
                            allowLess: !0,
                            default: new Buffer([])
                        }, {
                            name: "data",
                            alias: "input",
                            allowZero: !0,
                            default: new Buffer([])
                        }, {
                            name: "v",
                            allowZero: !0,
                            default: new Buffer([28])
                        }, {
                            name: "r",
                            length: 32,
                            allowZero: !0,
                            allowLess: !0,
                            default: new Buffer([])
                        }, {
                            name: "s",
                            length: 32,
                            allowZero: !0,
                            allowLess: !0,
                            default: new Buffer([])
                        }];
                        ethUtil.defineProperties(this, i, t), Object.defineProperty(this, "from", {
                            enumerable: !0,
                            configurable: !0,
                            get: this.getSenderAddress.bind(this)
                        });
                        var r = ethUtil.bufferToInt(this.v),
                            s = Math.floor((r - 35) / 2);
                        s < 0 && (s = 0), this._chainId = s || t.chainId || 0, this._homestead = !0
                    }
                    return e.prototype.toCreationAddress = function() {
                        return "" === this.to.toString("hex")
                    }, e.prototype.hash = function(e) {
                        void 0 === e && (e = !0);
                        var t = void 0;
                        if (e) t = this.raw;
                        else if (this._chainId > 0) {
                            var i = this.raw.slice();
                            this.v = this._chainId, this.r = 0, this.s = 0, t = this.raw, this.raw = i
                        } else t = this.raw.slice(0, 6);
                        return ethUtil.rlphash(t)
                    }, e.prototype.getChainId = function() {
                        return this._chainId
                    }, e.prototype.getSenderAddress = function() {
                        if (this._from) return this._from;
                        var e = this.getSenderPublicKey();
                        return this._from = ethUtil.publicToAddress(e), this._from
                    }, e.prototype.getSenderPublicKey = function() {
                        if (!(this._senderPubKey && this._senderPubKey.length || this.verifySignature())) throw new Error("Invalid Signature");
                        return this._senderPubKey
                    }, e.prototype.verifySignature = function() {
                        var e = this.hash(!1);
                        if (this._homestead && 1 === new BN(this.s).cmp(N_DIV_2)) return !1;
                        try {
                            var t = ethUtil.bufferToInt(this.v);
                            this._chainId > 0 && (t -= 2 * this._chainId + 8), this._senderPubKey = ethUtil.ecrecover(e, t, this.r, this.s)
                        } catch (e) {
                            return !1
                        }
                        return !!this._senderPubKey
                    }, e.prototype.sign = function(e) {
                        var t = this.hash(!1),
                            i = ethUtil.ecsign(t, e);
                        this._chainId > 0 && (i.v += 2 * this._chainId + 8), Object.assign(this, i)
                    }, e.prototype.getDataFee = function() {
                        for (var e = this.raw[5], t = new BN(0), i = 0; i < e.length; i++) 0 === e[i] ? t.iaddn(fees.txDataZeroGas.v) : t.iaddn(fees.txDataNonZeroGas.v);
                        return t
                    }, e.prototype.getBaseFee = function() {
                        var e = this.getDataFee().iaddn(fees.txGas.v);
                        return this._homestead && this.toCreationAddress() && e.iaddn(fees.txCreation.v), e
                    }, e.prototype.getUpfrontCost = function() {
                        return new BN(this.gasLimit).imul(new BN(this.gasPrice)).iadd(new BN(this.value))
                    }, e.prototype.validate = function(e) {
                        var t = [];
                        return this.verifySignature() || t.push("Invalid Signature"), this.getBaseFee().cmp(new BN(this.gasLimit)) > 0 && t.push(["gas limit is too low. Need at least " + this.getBaseFee()]), void 0 === e || !1 === e ? 0 === t.length : t.join(" ")
                    }, e
                }();
            module.exports = Transaction;

        }).call(this, require("buffer").Buffer)
    }, {
        "buffer": 8,
        "ethereum-common/params.json": 30,
        "ethereumjs-util": 32
    }], 32: [function(require, module, exports) {
            (function(Buffer) {
                    "use strict";
                    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        },
                        createKeccakHash = require("keccak"),
                        secp256k1 = require("secp256k1"),
                        assert = require("assert"),
                        rlp = require("rlp"),
                        BN = require("bn.js"),
                        createHash = require("create-hash");
                    Object.assign(exports, require("ethjs-util")), exports.MAX_INTEGER = new BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16), exports.TWO_POW256 = new BN("10000000000000000000000000000000000000000000000000000000000000000", 16), exports.SHA3_NULL_S = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470", exports.SHA3_NULL = Buffer.from(exports.SHA3_NULL_S, "hex"), exports.SHA3_RLP_ARRAY_S = "1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347", exports.SHA3_RLP_ARRAY = Buffer.from(exports.SHA3_RLP_ARRAY_S, "hex"), exports.SHA3_RLP_S = "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421", exports.SHA3_RLP = Buffer.from(exports.SHA3_RLP_S, "hex"), exports.BN = BN, exports.rlp = rlp, exports.secp256k1 = secp256k1, exports.zeros = function(e) {
                        return Buffer.allocUnsafe(e).fill(0)
                    }, exports.setLengthLeft = exports.setLength = function(e, r, t) {
                        var f = exports.zeros(r);
                        return e = exports.toBuffer(e), t ? e.length < r ? (e.copy(f), f) : e.slice(0, r) : e.length < r ? (e.copy(f, r - e.length), f) : e.slice(-r)
                    }, exports.setLengthRight = function(e, r) {
                        return exports.setLength(e, r, !0)
                    }, exports.unpad = exports.stripZeros = function(e) {
                        for (var r = (e = exports.stripHexPrefix(e))[0]; e.length > 0 && "0" === r.toString();) r = (e = e.slice(1))[0];
                        return e
                    }, exports.toBuffer = function(e) {
                        if (!Buffer.isBuffer(e))
                            if (Array.isArray(e)) e = Buffer.from(e);
                            else if ("string" == typeof e) e = exports.isHexString(e) ? Buffer.from(exports.padToEven(exports.stripHexPrefix(e)), "hex") : Buffer.from(e);
                        else if ("number" == typeof e) e = exports.intToBuffer(e);
                        else if (null === e || void 0 === e) e = Buffer.allocUnsafe(0);
                        else {
                            if (!e.toArray) throw new Error("invalid type");
                            e = Buffer.from(e.toArray())
                        }
                        return e
                    }, exports.bufferToInt = function(e) {
                        return new BN(exports.toBuffer(e)).toNumber()
                    }, exports.bufferToHex = function(e) {
                        return "0x" + (e = exports.toBuffer(e)).toString("hex")
                    }, exports.fromSigned = function(e) {
                        return new BN(e).fromTwos(256)
                    }, exports.toUnsigned = function(e) {
                        return Buffer.from(e.toTwos(256).toArray())
                    }, exports.sha3 = function(e, r) {
                        return e = exports.toBuffer(e), r || (r = 256), createKeccakHash("keccak" + r).update(e).digest()
                    }, exports.sha256 = function(e) {
                        return e = exports.toBuffer(e), createHash("sha256").update(e).digest()
                    }, exports.ripemd160 = function(e, r) {
                        e = exports.toBuffer(e);
                        var t = createHash("rmd160").update(e).digest();
                        return !0 === r ? exports.setLength(t, 32) : t
                    }, exports.rlphash = function(e) {
                        return exports.sha3(rlp.encode(e))
                    }, exports.isValidPrivate = function(e) {
                        return secp256k1.privateKeyVerify(e)
                    }, exports.isValidPublic = function(e, r) {
                        return 64 === e.length ? secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), e])) : !!r && secp256k1.publicKeyVerify(e)
                    }, exports.pubToAddress = exports.publicToAddress = function(e, r) {
                        return e = exports.toBuffer(e), r && 64 !== e.length && (e = secp256k1.publicKeyConvert(e, !1).slice(1)), assert(64 === e.length), exports.sha3(e).slice(-20)
                    };
                    var privateToPublic = exports.privateToPublic = function(e) {
                        return e = exports.toBuffer(e), secp256k1.publicKeyCreate(e, !1).slice(1)
                    };
                    exports.importPublic = function(e) {
                            return 64 !== (e = exports.toBuffer(e)).length && (e = secp256k1.publicKeyConvert(e, !1).slice(1)), e
                        }, exports.ecsign = function(e, r) {
                            var t = secp256k1.sign(e, r),
                                f = {};
                            return f.r = t.signature.slice(0, 32), f.s = t.signature.slice(32, 64), f.v = t.recovery + 27, f
                        }, exports.hashPersonalMessage = function(e) {
                            var r = exports.toBuffer("