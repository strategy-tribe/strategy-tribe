var yD = Object.create;
var Td = Object.defineProperty;
var bD = Object.getOwnPropertyDescriptor;
var _D = Object.getOwnPropertyNames;
var CD = Object.getPrototypeOf,
  TD = Object.prototype.hasOwnProperty;
var f = (t, e) => () => (t && (e = t((t = 0))), e);
var kd = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  Ed = (t, e) => {
    for (var r in e) Td(t, r, { get: e[r], enumerable: !0 });
  },
  kD = (t, e, r, n) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let i of _D(e))
        !TD.call(t, i) &&
          i !== r &&
          Td(t, i, {
            get: () => e[i],
            enumerable: !(n = bD(e, i)) || n.enumerable,
          });
    return t;
  };
var Gc = (t, e, r) => (
  (r = t != null ? yD(CD(t)) : {}),
  kD(
    e || !t || !t.__esModule
      ? Td(r, 'default', { value: t, enumerable: !0 })
      : r,
    t
  )
);
var wd = f(() => {});
var ED,
  jc,
  Sd = f(() => {
    (ED =
      typeof global == 'object' &&
      global &&
      global.Object === Object &&
      global),
      (jc = ED);
  });
var wD,
  SD,
  pe,
  qr = f(() => {
    Sd();
    (wD = typeof self == 'object' && self && self.Object === Object && self),
      (SD = jc || wD || Function('return this')()),
      (pe = SD);
  });
var vD,
  Ue,
  so = f(() => {
    qr();
    (vD = pe.Symbol), (Ue = vD);
  });
function ID(t) {
  var e = AD.call(t, Ps),
    r = t[Ps];
  try {
    t[Ps] = void 0;
    var n = !0;
  } catch {}
  var i = LD.call(t);
  return n && (e ? (t[Ps] = r) : delete t[Ps]), i;
}
var Ub,
  AD,
  LD,
  Ps,
  zb,
  $b = f(() => {
    so();
    (Ub = Object.prototype),
      (AD = Ub.hasOwnProperty),
      (LD = Ub.toString),
      (Ps = Ue ? Ue.toStringTag : void 0);
    zb = ID;
  });
function ND(t) {
  return RD.call(t);
}
var OD,
  RD,
  Wb,
  qb = f(() => {
    (OD = Object.prototype), (RD = OD.toString);
    Wb = ND;
  });
function BD(t) {
  return t == null
    ? t === void 0
      ? MD
      : FD
    : Hb && Hb in Object(t)
    ? zb(t)
    : Wb(t);
}
var FD,
  MD,
  Hb,
  Ye,
  Yn = f(() => {
    so();
    $b();
    qb();
    (FD = '[object Null]'),
      (MD = '[object Undefined]'),
      (Hb = Ue ? Ue.toStringTag : void 0);
    Ye = BD;
  });
function PD(t) {
  return t != null && typeof t == 'object';
}
var ce,
  Hr = f(() => {
    ce = PD;
  });
function UD(t) {
  return typeof t == 'symbol' || (ce(t) && Ye(t) == DD);
}
var DD,
  Nr,
  lo = f(() => {
    Yn();
    Hr();
    DD = '[object Symbol]';
    Nr = UD;
  });
function zD(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n; )
    i[r] = e(t[r], r, t);
  return i;
}
var mr,
  co = f(() => {
    mr = zD;
  });
var $D,
  K,
  ee = f(() => {
    ($D = Array.isArray), (K = $D);
  });
function Yb(t) {
  if (typeof t == 'string') return t;
  if (K(t)) return mr(t, Yb) + '';
  if (Nr(t)) return jb ? jb.call(t) : '';
  var e = t + '';
  return e == '0' && 1 / t == -WD ? '-0' : e;
}
var WD,
  Gb,
  jb,
  Vb,
  Xb = f(() => {
    so();
    co();
    ee();
    lo();
    (WD = 1 / 0),
      (Gb = Ue ? Ue.prototype : void 0),
      (jb = Gb ? Gb.toString : void 0);
    Vb = Yb;
  });
function HD(t) {
  for (var e = t.length; e-- && qD.test(t.charAt(e)); );
  return e;
}
var qD,
  Kb,
  Zb = f(() => {
    qD = /\s/;
    Kb = HD;
  });
function jD(t) {
  return t && t.slice(0, Kb(t) + 1).replace(GD, '');
}
var GD,
  Qb,
  Jb = f(() => {
    Zb();
    GD = /^\s+/;
    Qb = jD;
  });
function YD(t) {
  var e = typeof t;
  return t != null && (e == 'object' || e == 'function');
}
var Wt,
  Fr = f(() => {
    Wt = YD;
  });
function QD(t) {
  if (typeof t == 'number') return t;
  if (Nr(t)) return t_;
  if (Wt(t)) {
    var e = typeof t.valueOf == 'function' ? t.valueOf() : t;
    t = Wt(e) ? e + '' : e;
  }
  if (typeof t != 'string') return t === 0 ? t : +t;
  t = Qb(t);
  var r = XD.test(t);
  return r || KD.test(t) ? ZD(t.slice(2), r ? 2 : 8) : VD.test(t) ? t_ : +t;
}
var t_,
  VD,
  XD,
  KD,
  ZD,
  e_,
  r_ = f(() => {
    Jb();
    Fr();
    lo();
    (t_ = 0 / 0),
      (VD = /^[-+]0x[0-9a-f]+$/i),
      (XD = /^0b[01]+$/i),
      (KD = /^0o[0-7]+$/i),
      (ZD = parseInt);
    e_ = QD;
  });
function t3(t) {
  if (!t) return t === 0 ? t : 0;
  if (((t = e_(t)), t === n_ || t === -n_)) {
    var e = t < 0 ? -1 : 1;
    return e * JD;
  }
  return t === t ? t : 0;
}
var n_,
  JD,
  la,
  vd = f(() => {
    r_();
    (n_ = 1 / 0), (JD = 17976931348623157e292);
    la = t3;
  });
function e3(t) {
  var e = la(t),
    r = e % 1;
  return e === e ? (r ? e - r : e) : 0;
}
var En,
  ca = f(() => {
    vd();
    En = e3;
  });
function r3(t) {
  return t;
}
var ze,
  Vn = f(() => {
    ze = r3;
  });
function s3(t) {
  if (!Wt(t)) return !1;
  var e = Ye(t);
  return e == i3 || e == o3 || e == n3 || e == a3;
}
var n3,
  i3,
  o3,
  a3,
  we,
  Ds = f(() => {
    Yn();
    Fr();
    (n3 = '[object AsyncFunction]'),
      (i3 = '[object Function]'),
      (o3 = '[object GeneratorFunction]'),
      (a3 = '[object Proxy]');
    we = s3;
  });
var l3,
  Yc,
  i_ = f(() => {
    qr();
    (l3 = pe['__core-js_shared__']), (Yc = l3);
  });
function c3(t) {
  return !!o_ && o_ in t;
}
var o_,
  a_,
  s_ = f(() => {
    i_();
    o_ = (function () {
      var t = /[^.]+$/.exec((Yc && Yc.keys && Yc.keys.IE_PROTO) || '');
      return t ? 'Symbol(src)_1.' + t : '';
    })();
    a_ = c3;
  });
function h3(t) {
  if (t != null) {
    try {
      return f3.call(t);
    } catch {}
    try {
      return t + '';
    } catch {}
  }
  return '';
}
var u3,
  f3,
  Xn,
  Ad = f(() => {
    (u3 = Function.prototype), (f3 = u3.toString);
    Xn = h3;
  });
function _3(t) {
  if (!Wt(t) || a_(t)) return !1;
  var e = we(t) ? b3 : d3;
  return e.test(Xn(t));
}
var p3,
  d3,
  m3,
  g3,
  x3,
  y3,
  b3,
  l_,
  c_ = f(() => {
    Ds();
    s_();
    Fr();
    Ad();
    (p3 = /[\\^$.*+?()[\]{}|]/g),
      (d3 = /^\[object .+?Constructor\]$/),
      (m3 = Function.prototype),
      (g3 = Object.prototype),
      (x3 = m3.toString),
      (y3 = g3.hasOwnProperty),
      (b3 = RegExp(
        '^' +
          x3
            .call(y3)
            .replace(p3, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ));
    l_ = _3;
  });
function C3(t, e) {
  return t?.[e];
}
var u_,
  f_ = f(() => {
    u_ = C3;
  });
function T3(t, e) {
  var r = u_(t, e);
  return l_(r) ? r : void 0;
}
var gr,
  gi = f(() => {
    c_();
    f_();
    gr = T3;
  });
var k3,
  Vc,
  h_ = f(() => {
    gi();
    qr();
    (k3 = gr(pe, 'WeakMap')), (Vc = k3);
  });
var p_,
  E3,
  d_,
  m_ = f(() => {
    Fr();
    (p_ = Object.create),
      (E3 = (function () {
        function t() {}
        return function (e) {
          if (!Wt(e)) return {};
          if (p_) return p_(e);
          t.prototype = e;
          var r = new t();
          return (t.prototype = void 0), r;
        };
      })()),
      (d_ = E3);
  });
function w3(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var g_,
  x_ = f(() => {
    g_ = w3;
  });
function S3() {}
var ue,
  Ld = f(() => {
    ue = S3;
  });
function v3(t, e) {
  var r = -1,
    n = t.length;
  for (e || (e = Array(n)); ++r < n; ) e[r] = t[r];
  return e;
}
var Xc,
  Id = f(() => {
    Xc = v3;
  });
function O3(t) {
  var e = 0,
    r = 0;
  return function () {
    var n = I3(),
      i = L3 - (n - r);
    if (((r = n), i > 0)) {
      if (++e >= A3) return arguments[0];
    } else e = 0;
    return t.apply(void 0, arguments);
  };
}
var A3,
  L3,
  I3,
  y_,
  b_ = f(() => {
    (A3 = 800), (L3 = 16), (I3 = Date.now);
    y_ = O3;
  });
function R3(t) {
  return function () {
    return t;
  };
}
var xr,
  Od = f(() => {
    xr = R3;
  });
var N3,
  ua,
  Rd = f(() => {
    gi();
    (N3 = (function () {
      try {
        var t = gr(Object, 'defineProperty');
        return t({}, '', {}), t;
      } catch {}
    })()),
      (ua = N3);
  });
var F3,
  __,
  C_ = f(() => {
    Od();
    Rd();
    Vn();
    (F3 = ua
      ? function (t, e) {
          return ua(t, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: xr(e),
            writable: !0,
          });
        }
      : ze),
      (__ = F3);
  });
var M3,
  Kc,
  Nd = f(() => {
    C_();
    b_();
    (M3 = y_(__)), (Kc = M3);
  });
function B3(t, e) {
  for (
    var r = -1, n = t == null ? 0 : t.length;
    ++r < n && e(t[r], r, t) !== !1;

  );
  return t;
}
var Zc,
  Fd = f(() => {
    Zc = B3;
  });
function P3(t, e, r, n) {
  for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
    if (e(t[o], o, t)) return o;
  return -1;
}
var Qc,
  Md = f(() => {
    Qc = P3;
  });
function D3(t) {
  return t !== t;
}
var T_,
  k_ = f(() => {
    T_ = D3;
  });
function U3(t, e, r) {
  for (var n = r - 1, i = t.length; ++n < i; ) if (t[n] === e) return n;
  return -1;
}
var E_,
  w_ = f(() => {
    E_ = U3;
  });
function z3(t, e, r) {
  return e === e ? E_(t, e, r) : Qc(t, T_, r);
}
var fa,
  Jc = f(() => {
    Md();
    k_();
    w_();
    fa = z3;
  });
function $3(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && fa(t, e, 0) > -1;
}
var tu,
  Bd = f(() => {
    Jc();
    tu = $3;
  });
function H3(t, e) {
  var r = typeof t;
  return (
    (e = e ?? W3),
    !!e &&
      (r == 'number' || (r != 'symbol' && q3.test(t))) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
  );
}
var W3,
  q3,
  xi,
  Us = f(() => {
    (W3 = 9007199254740991), (q3 = /^(?:0|[1-9]\d*)$/);
    xi = H3;
  });
function G3(t, e, r) {
  e == '__proto__' && ua
    ? ua(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 })
    : (t[e] = r);
}
var wn,
  ha = f(() => {
    Rd();
    wn = G3;
  });
function j3(t, e) {
  return t === e || (t !== t && e !== e);
}
var Gr,
  uo = f(() => {
    Gr = j3;
  });
function X3(t, e, r) {
  var n = t[e];
  (!(V3.call(t, e) && Gr(n, r)) || (r === void 0 && !(e in t))) && wn(t, e, r);
}
var Y3,
  V3,
  Sn,
  pa = f(() => {
    ha();
    uo();
    (Y3 = Object.prototype), (V3 = Y3.hasOwnProperty);
    Sn = X3;
  });
function K3(t, e, r, n) {
  var i = !r;
  r || (r = {});
  for (var o = -1, a = e.length; ++o < a; ) {
    var s = e[o],
      l = n ? n(r[s], t[s], s, r, t) : void 0;
    l === void 0 && (l = t[s]), i ? wn(r, s, l) : Sn(r, s, l);
  }
  return r;
}
var jr,
  fo = f(() => {
    pa();
    ha();
    jr = K3;
  });
function Z3(t, e, r) {
  return (
    (e = S_(e === void 0 ? t.length - 1 : e, 0)),
    function () {
      for (
        var n = arguments, i = -1, o = S_(n.length - e, 0), a = Array(o);
        ++i < o;

      )
        a[i] = n[e + i];
      i = -1;
      for (var s = Array(e + 1); ++i < e; ) s[i] = n[i];
      return (s[e] = r(a)), g_(t, this, s);
    }
  );
}
var S_,
  eu,
  Pd = f(() => {
    x_();
    S_ = Math.max;
    eu = Z3;
  });
function Q3(t, e) {
  return Kc(eu(t, e, ze), t + '');
}
var vn,
  da = f(() => {
    Vn();
    Pd();
    Nd();
    vn = Q3;
  });
function t5(t) {
  return typeof t == 'number' && t > -1 && t % 1 == 0 && t <= J3;
}
var J3,
  ma,
  ru = f(() => {
    J3 = 9007199254740991;
    ma = t5;
  });
function e5(t) {
  return t != null && ma(t.length) && !we(t);
}
var de,
  Yr = f(() => {
    Ds();
    ru();
    de = e5;
  });
function r5(t, e, r) {
  if (!Wt(r)) return !1;
  var n = typeof e;
  return (n == 'number' ? de(r) && xi(e, r.length) : n == 'string' && e in r)
    ? Gr(r[e], t)
    : !1;
}
var Mr,
  ho = f(() => {
    uo();
    Yr();
    Us();
    Fr();
    Mr = r5;
  });
function n5(t) {
  return vn(function (e, r) {
    var n = -1,
      i = r.length,
      o = i > 1 ? r[i - 1] : void 0,
      a = i > 2 ? r[2] : void 0;
    for (
      o = t.length > 3 && typeof o == 'function' ? (i--, o) : void 0,
        a && Mr(r[0], r[1], a) && ((o = i < 3 ? void 0 : o), (i = 1)),
        e = Object(e);
      ++n < i;

    ) {
      var s = r[n];
      s && t(e, s, n, o);
    }
    return e;
  });
}
var nu,
  Dd = f(() => {
    da();
    ho();
    nu = n5;
  });
function o5(t) {
  var e = t && t.constructor,
    r = (typeof e == 'function' && e.prototype) || i5;
  return t === r;
}
var i5,
  An,
  ga = f(() => {
    i5 = Object.prototype;
    An = o5;
  });
function a5(t, e) {
  for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
  return n;
}
var v_,
  A_ = f(() => {
    v_ = a5;
  });
function l5(t) {
  return ce(t) && Ye(t) == s5;
}
var s5,
  Ud,
  L_ = f(() => {
    Yn();
    Hr();
    s5 = '[object Arguments]';
    Ud = l5;
  });
var I_,
  c5,
  u5,
  f5,
  un,
  xa = f(() => {
    L_();
    Hr();
    (I_ = Object.prototype),
      (c5 = I_.hasOwnProperty),
      (u5 = I_.propertyIsEnumerable),
      (f5 = Ud(
        (function () {
          return arguments;
        })()
      )
        ? Ud
        : function (t) {
            return ce(t) && c5.call(t, 'callee') && !u5.call(t, 'callee');
          }),
      (un = f5);
  });
function h5() {
  return !1;
}
var O_,
  R_ = f(() => {
    O_ = h5;
  });
var M_,
  N_,
  p5,
  F_,
  d5,
  m5,
  fn,
  ya = f(() => {
    qr();
    R_();
    (M_ =
      typeof exports == 'object' && exports && !exports.nodeType && exports),
      (N_ =
        M_ &&
        typeof module == 'object' &&
        module &&
        !module.nodeType &&
        module),
      (p5 = N_ && N_.exports === M_),
      (F_ = p5 ? pe.Buffer : void 0),
      (d5 = F_ ? F_.isBuffer : void 0),
      (m5 = d5 || O_),
      (fn = m5);
  });
function z5(t) {
  return ce(t) && ma(t.length) && !!Zt[Ye(t)];
}
var g5,
  x5,
  y5,
  b5,
  _5,
  C5,
  T5,
  k5,
  E5,
  w5,
  S5,
  v5,
  A5,
  L5,
  I5,
  O5,
  R5,
  N5,
  F5,
  M5,
  B5,
  P5,
  D5,
  U5,
  Zt,
  B_,
  P_ = f(() => {
    Yn();
    ru();
    Hr();
    (g5 = '[object Arguments]'),
      (x5 = '[object Array]'),
      (y5 = '[object Boolean]'),
      (b5 = '[object Date]'),
      (_5 = '[object Error]'),
      (C5 = '[object Function]'),
      (T5 = '[object Map]'),
      (k5 = '[object Number]'),
      (E5 = '[object Object]'),
      (w5 = '[object RegExp]'),
      (S5 = '[object Set]'),
      (v5 = '[object String]'),
      (A5 = '[object WeakMap]'),
      (L5 = '[object ArrayBuffer]'),
      (I5 = '[object DataView]'),
      (O5 = '[object Float32Array]'),
      (R5 = '[object Float64Array]'),
      (N5 = '[object Int8Array]'),
      (F5 = '[object Int16Array]'),
      (M5 = '[object Int32Array]'),
      (B5 = '[object Uint8Array]'),
      (P5 = '[object Uint8ClampedArray]'),
      (D5 = '[object Uint16Array]'),
      (U5 = '[object Uint32Array]'),
      (Zt = {});
    Zt[O5] =
      Zt[R5] =
      Zt[N5] =
      Zt[F5] =
      Zt[M5] =
      Zt[B5] =
      Zt[P5] =
      Zt[D5] =
      Zt[U5] =
        !0;
    Zt[g5] =
      Zt[x5] =
      Zt[L5] =
      Zt[y5] =
      Zt[I5] =
      Zt[b5] =
      Zt[_5] =
      Zt[C5] =
      Zt[T5] =
      Zt[k5] =
      Zt[E5] =
      Zt[w5] =
      Zt[S5] =
      Zt[v5] =
      Zt[A5] =
        !1;
    B_ = z5;
  });
function $5(t) {
  return function (e) {
    return t(e);
  };
}
var Vr,
  po = f(() => {
    Vr = $5;
  });
var D_,
  zs,
  W5,
  zd,
  q5,
  Xr,
  $s = f(() => {
    Sd();
    (D_ =
      typeof exports == 'object' && exports && !exports.nodeType && exports),
      (zs =
        D_ &&
        typeof module == 'object' &&
        module &&
        !module.nodeType &&
        module),
      (W5 = zs && zs.exports === D_),
      (zd = W5 && jc.process),
      (q5 = (function () {
        try {
          var t = zs && zs.require && zs.require('util').types;
          return t || (zd && zd.binding && zd.binding('util'));
        } catch {}
      })()),
      (Xr = q5);
  });
var U_,
  H5,
  yi,
  Ws = f(() => {
    P_();
    po();
    $s();
    (U_ = Xr && Xr.isTypedArray), (H5 = U_ ? Vr(U_) : B_), (yi = H5);
  });
function Y5(t, e) {
  var r = K(t),
    n = !r && un(t),
    i = !r && !n && fn(t),
    o = !r && !n && !i && yi(t),
    a = r || n || i || o,
    s = a ? v_(t.length, String) : [],
    l = s.length;
  for (var c in t)
    (e || j5.call(t, c)) &&
      !(
        a &&
        (c == 'length' ||
          (i && (c == 'offset' || c == 'parent')) ||
          (o && (c == 'buffer' || c == 'byteLength' || c == 'byteOffset')) ||
          xi(c, l))
      ) &&
      s.push(c);
  return s;
}
var G5,
  j5,
  iu,
  $d = f(() => {
    A_();
    xa();
    ee();
    ya();
    Us();
    Ws();
    (G5 = Object.prototype), (j5 = G5.hasOwnProperty);
    iu = Y5;
  });
function V5(t, e) {
  return function (r) {
    return t(e(r));
  };
}
var ou,
  Wd = f(() => {
    ou = V5;
  });
var X5,
  z_,
  $_ = f(() => {
    Wd();
    (X5 = ou(Object.keys, Object)), (z_ = X5);
  });
function Q5(t) {
  if (!An(t)) return z_(t);
  var e = [];
  for (var r in Object(t)) Z5.call(t, r) && r != 'constructor' && e.push(r);
  return e;
}
var K5,
  Z5,
  ba,
  au = f(() => {
    ga();
    $_();
    (K5 = Object.prototype), (Z5 = K5.hasOwnProperty);
    ba = Q5;
  });
function J5(t) {
  return de(t) ? iu(t) : ba(t);
}
var vt,
  Ln = f(() => {
    $d();
    au();
    Yr();
    vt = J5;
  });
var t6,
  e6,
  r6,
  Ve,
  W_ = f(() => {
    pa();
    fo();
    Dd();
    Yr();
    ga();
    Ln();
    (t6 = Object.prototype),
      (e6 = t6.hasOwnProperty),
      (r6 = nu(function (t, e) {
        if (An(e) || de(e)) {
          jr(e, vt(e), t);
          return;
        }
        for (var r in e) e6.call(e, r) && Sn(t, r, e[r]);
      })),
      (Ve = r6);
  });
function n6(t) {
  var e = [];
  if (t != null) for (var r in Object(t)) e.push(r);
  return e;
}
var q_,
  H_ = f(() => {
    q_ = n6;
  });
function a6(t) {
  if (!Wt(t)) return q_(t);
  var e = An(t),
    r = [];
  for (var n in t) (n == 'constructor' && (e || !o6.call(t, n))) || r.push(n);
  return r;
}
var i6,
  o6,
  G_,
  j_ = f(() => {
    Fr();
    ga();
    H_();
    (i6 = Object.prototype), (o6 = i6.hasOwnProperty);
    G_ = a6;
  });
function s6(t) {
  return de(t) ? iu(t, !0) : G_(t);
}
var yr,
  bi = f(() => {
    $d();
    j_();
    Yr();
    yr = s6;
  });
function u6(t, e) {
  if (K(t)) return !1;
  var r = typeof t;
  return r == 'number' || r == 'symbol' || r == 'boolean' || t == null || Nr(t)
    ? !0
    : c6.test(t) || !l6.test(t) || (e != null && t in Object(e));
}
var l6,
  c6,
  _a,
  su = f(() => {
    ee();
    lo();
    (l6 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/), (c6 = /^\w*$/);
    _a = u6;
  });
var f6,
  Kn,
  qs = f(() => {
    gi();
    (f6 = gr(Object, 'create')), (Kn = f6);
  });
function h6() {
  (this.__data__ = Kn ? Kn(null) : {}), (this.size = 0);
}
var Y_,
  V_ = f(() => {
    qs();
    Y_ = h6;
  });
function p6(t) {
  var e = this.has(t) && delete this.__data__[t];
  return (this.size -= e ? 1 : 0), e;
}
var X_,
  K_ = f(() => {
    X_ = p6;
  });
function x6(t) {
  var e = this.__data__;
  if (Kn) {
    var r = e[t];
    return r === d6 ? void 0 : r;
  }
  return g6.call(e, t) ? e[t] : void 0;
}
var d6,
  m6,
  g6,
  Z_,
  Q_ = f(() => {
    qs();
    (d6 = '__lodash_hash_undefined__'),
      (m6 = Object.prototype),
      (g6 = m6.hasOwnProperty);
    Z_ = x6;
  });
function _6(t) {
  var e = this.__data__;
  return Kn ? e[t] !== void 0 : b6.call(e, t);
}
var y6,
  b6,
  J_,
  tC = f(() => {
    qs();
    (y6 = Object.prototype), (b6 = y6.hasOwnProperty);
    J_ = _6;
  });
function T6(t, e) {
  var r = this.__data__;
  return (
    (this.size += this.has(t) ? 0 : 1),
    (r[t] = Kn && e === void 0 ? C6 : e),
    this
  );
}
var C6,
  eC,
  rC = f(() => {
    qs();
    C6 = '__lodash_hash_undefined__';
    eC = T6;
  });
function Ca(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
var qd,
  nC = f(() => {
    V_();
    K_();
    Q_();
    tC();
    rC();
    Ca.prototype.clear = Y_;
    Ca.prototype.delete = X_;
    Ca.prototype.get = Z_;
    Ca.prototype.has = J_;
    Ca.prototype.set = eC;
    qd = Ca;
  });
function k6() {
  (this.__data__ = []), (this.size = 0);
}
var iC,
  oC = f(() => {
    iC = k6;
  });
function E6(t, e) {
  for (var r = t.length; r--; ) if (Gr(t[r][0], e)) return r;
  return -1;
}
var _i,
  Hs = f(() => {
    uo();
    _i = E6;
  });
function v6(t) {
  var e = this.__data__,
    r = _i(e, t);
  if (r < 0) return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : S6.call(e, r, 1), --this.size, !0;
}
var w6,
  S6,
  aC,
  sC = f(() => {
    Hs();
    (w6 = Array.prototype), (S6 = w6.splice);
    aC = v6;
  });
function A6(t) {
  var e = this.__data__,
    r = _i(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var lC,
  cC = f(() => {
    Hs();
    lC = A6;
  });
function L6(t) {
  return _i(this.__data__, t) > -1;
}
var uC,
  fC = f(() => {
    Hs();
    uC = L6;
  });
function I6(t, e) {
  var r = this.__data__,
    n = _i(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this;
}
var hC,
  pC = f(() => {
    Hs();
    hC = I6;
  });
function Ta(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
var Ci,
  Gs = f(() => {
    oC();
    sC();
    cC();
    fC();
    pC();
    Ta.prototype.clear = iC;
    Ta.prototype.delete = aC;
    Ta.prototype.get = lC;
    Ta.prototype.has = uC;
    Ta.prototype.set = hC;
    Ci = Ta;
  });
var O6,
  Ti,
  lu = f(() => {
    gi();
    qr();
    (O6 = gr(pe, 'Map')), (Ti = O6);
  });
function R6() {
  (this.size = 0),
    (this.__data__ = {
      hash: new qd(),
      map: new (Ti || Ci)(),
      string: new qd(),
    });
}
var dC,
  mC = f(() => {
    nC();
    Gs();
    lu();
    dC = R6;
  });
function N6(t) {
  var e = typeof t;
  return e == 'string' || e == 'number' || e == 'symbol' || e == 'boolean'
    ? t !== '__proto__'
    : t === null;
}
var gC,
  xC = f(() => {
    gC = N6;
  });
function F6(t, e) {
  var r = t.__data__;
  return gC(e) ? r[typeof e == 'string' ? 'string' : 'hash'] : r.map;
}
var ki,
  js = f(() => {
    xC();
    ki = F6;
  });
function M6(t) {
  var e = ki(this, t).delete(t);
  return (this.size -= e ? 1 : 0), e;
}
var yC,
  bC = f(() => {
    js();
    yC = M6;
  });
function B6(t) {
  return ki(this, t).get(t);
}
var _C,
  CC = f(() => {
    js();
    _C = B6;
  });
function P6(t) {
  return ki(this, t).has(t);
}
var TC,
  kC = f(() => {
    js();
    TC = P6;
  });
function D6(t, e) {
  var r = ki(this, t),
    n = r.size;
  return r.set(t, e), (this.size += r.size == n ? 0 : 1), this;
}
var EC,
  wC = f(() => {
    js();
    EC = D6;
  });
function ka(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
var mo,
  cu = f(() => {
    mC();
    bC();
    CC();
    kC();
    wC();
    ka.prototype.clear = dC;
    ka.prototype.delete = yC;
    ka.prototype.get = _C;
    ka.prototype.has = TC;
    ka.prototype.set = EC;
    mo = ka;
  });
function Hd(t, e) {
  if (typeof t != 'function' || (e != null && typeof e != 'function'))
    throw new TypeError(U6);
  var r = function () {
    var n = arguments,
      i = e ? e.apply(this, n) : n[0],
      o = r.cache;
    if (o.has(i)) return o.get(i);
    var a = t.apply(this, n);
    return (r.cache = o.set(i, a) || o), a;
  };
  return (r.cache = new (Hd.Cache || mo)()), r;
}
var U6,
  Ea,
  Gd = f(() => {
    cu();
    U6 = 'Expected a function';
    Hd.Cache = mo;
    Ea = Hd;
  });
function $6(t) {
  var e = Ea(t, function (n) {
      return r.size === z6 && r.clear(), n;
    }),
    r = e.cache;
  return e;
}
var z6,
  SC,
  vC = f(() => {
    Gd();
    z6 = 500;
    SC = $6;
  });
var W6,
  q6,
  H6,
  AC,
  LC = f(() => {
    vC();
    (W6 =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g),
      (q6 = /\\(\\)?/g),
      (H6 = SC(function (t) {
        var e = [];
        return (
          t.charCodeAt(0) === 46 && e.push(''),
          t.replace(W6, function (r, n, i, o) {
            e.push(i ? o.replace(q6, '$1') : n || r);
          }),
          e
        );
      })),
      (AC = H6);
  });
function G6(t) {
  return t == null ? '' : Vb(t);
}
var uu,
  jd = f(() => {
    Xb();
    uu = G6;
  });
function j6(t, e) {
  return K(t) ? t : _a(t, e) ? [t] : AC(uu(t));
}
var Ei,
  Ys = f(() => {
    ee();
    su();
    LC();
    jd();
    Ei = j6;
  });
function V6(t) {
  if (typeof t == 'string' || Nr(t)) return t;
  var e = t + '';
  return e == '0' && 1 / t == -Y6 ? '-0' : e;
}
var Y6,
  In,
  wa = f(() => {
    lo();
    Y6 = 1 / 0;
    In = V6;
  });
function X6(t, e) {
  e = Ei(e, t);
  for (var r = 0, n = e.length; t != null && r < n; ) t = t[In(e[r++])];
  return r && r == n ? t : void 0;
}
var wi,
  Vs = f(() => {
    Ys();
    wa();
    wi = X6;
  });
function K6(t, e, r) {
  var n = t == null ? void 0 : wi(t, e);
  return n === void 0 ? r : n;
}
var IC,
  OC = f(() => {
    Vs();
    IC = K6;
  });
function Z6(t, e) {
  for (var r = -1, n = e.length, i = t.length; ++r < n; ) t[i + r] = e[r];
  return t;
}
var Sa,
  fu = f(() => {
    Sa = Z6;
  });
function Q6(t) {
  return K(t) || un(t) || !!(RC && t && t[RC]);
}
var RC,
  NC,
  FC = f(() => {
    so();
    xa();
    ee();
    RC = Ue ? Ue.isConcatSpreadable : void 0;
    NC = Q6;
  });
function MC(t, e, r, n, i) {
  var o = -1,
    a = t.length;
  for (r || (r = NC), i || (i = []); ++o < a; ) {
    var s = t[o];
    e > 0 && r(s)
      ? e > 1
        ? MC(s, e - 1, r, n, i)
        : Sa(i, s)
      : n || (i[i.length] = s);
  }
  return i;
}
var On,
  va = f(() => {
    fu();
    FC();
    On = MC;
  });
function J6(t) {
  var e = t == null ? 0 : t.length;
  return e ? On(t, 1) : [];
}
var Ot,
  Yd = f(() => {
    va();
    Ot = J6;
  });
function t4(t) {
  return Kc(eu(t, void 0, Ot), t + '');
}
var BC,
  PC = f(() => {
    Yd();
    Pd();
    Nd();
    BC = t4;
  });
var e4,
  Aa,
  hu = f(() => {
    Wd();
    (e4 = ou(Object.getPrototypeOf, Object)), (Aa = e4);
  });
function s4(t) {
  if (!ce(t) || Ye(t) != r4) return !1;
  var e = Aa(t);
  if (e === null) return !0;
  var r = o4.call(e, 'constructor') && e.constructor;
  return typeof r == 'function' && r instanceof r && DC.call(r) == a4;
}
var r4,
  n4,
  i4,
  DC,
  o4,
  a4,
  UC,
  zC = f(() => {
    Yn();
    hu();
    Hr();
    (r4 = '[object Object]'),
      (n4 = Function.prototype),
      (i4 = Object.prototype),
      (DC = n4.toString),
      (o4 = i4.hasOwnProperty),
      (a4 = DC.call(Object));
    UC = s4;
  });
function l4(t, e, r) {
  var n = -1,
    i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e),
    (r = r > i ? i : r),
    r < 0 && (r += i),
    (i = e > r ? 0 : (r - e) >>> 0),
    (e >>>= 0);
  for (var o = Array(i); ++n < i; ) o[n] = t[n + e];
  return o;
}
var pu,
  Vd = f(() => {
    pu = l4;
  });
function x4(t) {
  return g4.test(t);
}
var c4,
  u4,
  f4,
  h4,
  p4,
  d4,
  m4,
  g4,
  $C,
  WC = f(() => {
    (c4 = '\\ud800-\\udfff'),
      (u4 = '\\u0300-\\u036f'),
      (f4 = '\\ufe20-\\ufe2f'),
      (h4 = '\\u20d0-\\u20ff'),
      (p4 = u4 + f4 + h4),
      (d4 = '\\ufe0e\\ufe0f'),
      (m4 = '\\u200d'),
      (g4 = RegExp('[' + m4 + c4 + p4 + d4 + ']'));
    $C = x4;
  });
function y4(t, e, r, n) {
  var i = -1,
    o = t == null ? 0 : t.length;
  for (n && o && (r = t[++i]); ++i < o; ) r = e(r, t[i], i, t);
  return r;
}
var qC,
  HC = f(() => {
    qC = y4;
  });
function b4() {
  (this.__data__ = new Ci()), (this.size = 0);
}
var GC,
  jC = f(() => {
    Gs();
    GC = b4;
  });
function _4(t) {
  var e = this.__data__,
    r = e.delete(t);
  return (this.size = e.size), r;
}
var YC,
  VC = f(() => {
    YC = _4;
  });
function C4(t) {
  return this.__data__.get(t);
}
var XC,
  KC = f(() => {
    XC = C4;
  });
function T4(t) {
  return this.__data__.has(t);
}
var ZC,
  QC = f(() => {
    ZC = T4;
  });
function E4(t, e) {
  var r = this.__data__;
  if (r instanceof Ci) {
    var n = r.__data__;
    if (!Ti || n.length < k4 - 1)
      return n.push([t, e]), (this.size = ++r.size), this;
    r = this.__data__ = new mo(n);
  }
  return r.set(t, e), (this.size = r.size), this;
}
var k4,
  JC,
  tT = f(() => {
    Gs();
    lu();
    cu();
    k4 = 200;
    JC = E4;
  });
function La(t) {
  var e = (this.__data__ = new Ci(t));
  this.size = e.size;
}
var Rn,
  Xs = f(() => {
    Gs();
    jC();
    VC();
    KC();
    QC();
    tT();
    La.prototype.clear = GC;
    La.prototype.delete = YC;
    La.prototype.get = XC;
    La.prototype.has = ZC;
    La.prototype.set = JC;
    Rn = La;
  });
function w4(t, e) {
  return t && jr(e, vt(e), t);
}
var eT,
  rT = f(() => {
    fo();
    Ln();
    eT = w4;
  });
function S4(t, e) {
  return t && jr(e, yr(e), t);
}
var nT,
  iT = f(() => {
    fo();
    bi();
    nT = S4;
  });
function A4(t, e) {
  if (e) return t.slice();
  var r = t.length,
    n = sT ? sT(r) : new t.constructor(r);
  return t.copy(n), n;
}
var lT,
  oT,
  v4,
  aT,
  sT,
  du,
  Xd = f(() => {
    qr();
    (lT =
      typeof exports == 'object' && exports && !exports.nodeType && exports),
      (oT =
        lT &&
        typeof module == 'object' &&
        module &&
        !module.nodeType &&
        module),
      (v4 = oT && oT.exports === lT),
      (aT = v4 ? pe.Buffer : void 0),
      (sT = aT ? aT.allocUnsafe : void 0);
    du = A4;
  });
function L4(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = 0, o = []; ++r < n; ) {
    var a = t[r];
    e(a, r, t) && (o[i++] = a);
  }
  return o;
}
var Ia,
  mu = f(() => {
    Ia = L4;
  });
function I4() {
  return [];
}
var gu,
  Kd = f(() => {
    gu = I4;
  });
var O4,
  R4,
  cT,
  N4,
  Oa,
  xu = f(() => {
    mu();
    Kd();
    (O4 = Object.prototype),
      (R4 = O4.propertyIsEnumerable),
      (cT = Object.getOwnPropertySymbols),
      (N4 = cT
        ? function (t) {
            return t == null
              ? []
              : ((t = Object(t)),
                Ia(cT(t), function (e) {
                  return R4.call(t, e);
                }));
          }
        : gu),
      (Oa = N4);
  });
function F4(t, e) {
  return jr(t, Oa(t), e);
}
var uT,
  fT = f(() => {
    fo();
    xu();
    uT = F4;
  });
var M4,
  B4,
  yu,
  Zd = f(() => {
    fu();
    hu();
    xu();
    Kd();
    (M4 = Object.getOwnPropertySymbols),
      (B4 = M4
        ? function (t) {
            for (var e = []; t; ) Sa(e, Oa(t)), (t = Aa(t));
            return e;
          }
        : gu),
      (yu = B4);
  });
function P4(t, e) {
  return jr(t, yu(t), e);
}
var hT,
  pT = f(() => {
    fo();
    Zd();
    hT = P4;
  });
function D4(t, e, r) {
  var n = e(t);
  return K(t) ? n : Sa(n, r(t));
}
var bu,
  Qd = f(() => {
    fu();
    ee();
    bu = D4;
  });
function U4(t) {
  return bu(t, vt, Oa);
}
var Ks,
  Jd = f(() => {
    Qd();
    xu();
    Ln();
    Ks = U4;
  });
function z4(t) {
  return bu(t, yr, yu);
}
var _u,
  tm = f(() => {
    Qd();
    Zd();
    bi();
    _u = z4;
  });
var $4,
  Cu,
  dT = f(() => {
    gi();
    qr();
    ($4 = gr(pe, 'DataView')), (Cu = $4);
  });
var W4,
  Tu,
  mT = f(() => {
    gi();
    qr();
    (W4 = gr(pe, 'Promise')), (Tu = W4);
  });
var q4,
  Si,
  em = f(() => {
    gi();
    qr();
    (q4 = gr(pe, 'Set')), (Si = q4);
  });
var gT,
  H4,
  xT,
  yT,
  bT,
  _T,
  G4,
  j4,
  Y4,
  V4,
  X4,
  go,
  Br,
  xo = f(() => {
    dT();
    lu();
    mT();
    em();
    h_();
    Yn();
    Ad();
    (gT = '[object Map]'),
      (H4 = '[object Object]'),
      (xT = '[object Promise]'),
      (yT = '[object Set]'),
      (bT = '[object WeakMap]'),
      (_T = '[object DataView]'),
      (G4 = Xn(Cu)),
      (j4 = Xn(Ti)),
      (Y4 = Xn(Tu)),
      (V4 = Xn(Si)),
      (X4 = Xn(Vc)),
      (go = Ye);
    ((Cu && go(new Cu(new ArrayBuffer(1))) != _T) ||
      (Ti && go(new Ti()) != gT) ||
      (Tu && go(Tu.resolve()) != xT) ||
      (Si && go(new Si()) != yT) ||
      (Vc && go(new Vc()) != bT)) &&
      (go = function (t) {
        var e = Ye(t),
          r = e == H4 ? t.constructor : void 0,
          n = r ? Xn(r) : '';
        if (n)
          switch (n) {
            case G4:
              return _T;
            case j4:
              return gT;
            case Y4:
              return xT;
            case V4:
              return yT;
            case X4:
              return bT;
          }
        return e;
      });
    Br = go;
  });
function Q4(t) {
  var e = t.length,
    r = new t.constructor(e);
  return (
    e &&
      typeof t[0] == 'string' &&
      Z4.call(t, 'index') &&
      ((r.index = t.index), (r.input = t.input)),
    r
  );
}
var K4,
  Z4,
  CT,
  TT = f(() => {
    (K4 = Object.prototype), (Z4 = K4.hasOwnProperty);
    CT = Q4;
  });
var J4,
  Ra,
  rm = f(() => {
    qr();
    (J4 = pe.Uint8Array), (Ra = J4);
  });
function tU(t) {
  var e = new t.constructor(t.byteLength);
  return new Ra(e).set(new Ra(t)), e;
}
var Na,
  ku = f(() => {
    rm();
    Na = tU;
  });
function eU(t, e) {
  var r = e ? Na(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var kT,
  ET = f(() => {
    ku();
    kT = eU;
  });
function nU(t) {
  var e = new t.constructor(t.source, rU.exec(t));
  return (e.lastIndex = t.lastIndex), e;
}
var rU,
  wT,
  ST = f(() => {
    rU = /\w*$/;
    wT = nU;
  });
function iU(t) {
  return AT ? Object(AT.call(t)) : {};
}
var vT,
  AT,
  LT,
  IT = f(() => {
    so();
    (vT = Ue ? Ue.prototype : void 0), (AT = vT ? vT.valueOf : void 0);
    LT = iU;
  });
function oU(t, e) {
  var r = e ? Na(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Eu,
  nm = f(() => {
    ku();
    Eu = oU;
  });
function wU(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case dU:
      return Na(t);
    case aU:
    case sU:
      return new n(+t);
    case mU:
      return kT(t, r);
    case gU:
    case xU:
    case yU:
    case bU:
    case _U:
    case CU:
    case TU:
    case kU:
    case EU:
      return Eu(t, r);
    case lU:
      return new n();
    case cU:
    case hU:
      return new n(t);
    case uU:
      return wT(t);
    case fU:
      return new n();
    case pU:
      return LT(t);
  }
}
var aU,
  sU,
  lU,
  cU,
  uU,
  fU,
  hU,
  pU,
  dU,
  mU,
  gU,
  xU,
  yU,
  bU,
  _U,
  CU,
  TU,
  kU,
  EU,
  OT,
  RT = f(() => {
    ku();
    ET();
    ST();
    IT();
    nm();
    (aU = '[object Boolean]'),
      (sU = '[object Date]'),
      (lU = '[object Map]'),
      (cU = '[object Number]'),
      (uU = '[object RegExp]'),
      (fU = '[object Set]'),
      (hU = '[object String]'),
      (pU = '[object Symbol]'),
      (dU = '[object ArrayBuffer]'),
      (mU = '[object DataView]'),
      (gU = '[object Float32Array]'),
      (xU = '[object Float64Array]'),
      (yU = '[object Int8Array]'),
      (bU = '[object Int16Array]'),
      (_U = '[object Int32Array]'),
      (CU = '[object Uint8Array]'),
      (TU = '[object Uint8ClampedArray]'),
      (kU = '[object Uint16Array]'),
      (EU = '[object Uint32Array]');
    OT = wU;
  });
function SU(t) {
  return typeof t.constructor == 'function' && !An(t) ? d_(Aa(t)) : {};
}
var wu,
  im = f(() => {
    m_();
    hu();
    ga();
    wu = SU;
  });
function AU(t) {
  return ce(t) && Br(t) == vU;
}
var vU,
  NT,
  FT = f(() => {
    xo();
    Hr();
    vU = '[object Map]';
    NT = AU;
  });
var MT,
  LU,
  BT,
  PT = f(() => {
    FT();
    po();
    $s();
    (MT = Xr && Xr.isMap), (LU = MT ? Vr(MT) : NT), (BT = LU);
  });
function OU(t) {
  return ce(t) && Br(t) == IU;
}
var IU,
  DT,
  UT = f(() => {
    xo();
    Hr();
    IU = '[object Set]';
    DT = OU;
  });
var zT,
  RU,
  $T,
  WT = f(() => {
    UT();
    po();
    $s();
    (zT = Xr && Xr.isSet), (RU = zT ? Vr(zT) : DT), ($T = RU);
  });
function Su(t, e, r, n, i, o) {
  var a,
    s = e & NU,
    l = e & FU,
    c = e & MU;
  if ((r && (a = i ? r(t, n, i, o) : r(t)), a !== void 0)) return a;
  if (!Wt(t)) return t;
  var u = K(t);
  if (u) {
    if (((a = CT(t)), !s)) return Xc(t, a);
  } else {
    var h = Br(t),
      p = h == HT || h == zU;
    if (fn(t)) return du(t, s);
    if (h == GT || h == qT || (p && !i)) {
      if (((a = l || p ? {} : wu(t)), !s))
        return l ? hT(t, nT(a, t)) : uT(t, eT(a, t));
    } else {
      if (!Ht[h]) return i ? t : {};
      a = OT(t, h, s);
    }
  }
  o || (o = new Rn());
  var d = o.get(t);
  if (d) return d;
  o.set(t, a),
    $T(t)
      ? t.forEach(function (E) {
          a.add(Su(E, e, r, E, t, o));
        })
      : BT(t) &&
        t.forEach(function (E, y) {
          a.set(y, Su(E, e, r, y, t, o));
        });
  var m = c ? (l ? _u : Ks) : l ? yr : vt,
    g = u ? void 0 : m(t);
  return (
    Zc(g || t, function (E, y) {
      g && ((y = E), (E = t[y])), Sn(a, y, Su(E, e, r, y, t, o));
    }),
    a
  );
}
var NU,
  FU,
  MU,
  qT,
  BU,
  PU,
  DU,
  UU,
  HT,
  zU,
  $U,
  WU,
  GT,
  qU,
  HU,
  GU,
  jU,
  YU,
  VU,
  XU,
  KU,
  ZU,
  QU,
  JU,
  tz,
  ez,
  rz,
  nz,
  iz,
  Ht,
  vu,
  om = f(() => {
    Xs();
    Fd();
    pa();
    rT();
    iT();
    Xd();
    Id();
    fT();
    pT();
    Jd();
    tm();
    xo();
    TT();
    RT();
    im();
    ee();
    ya();
    PT();
    Fr();
    WT();
    Ln();
    bi();
    (NU = 1),
      (FU = 2),
      (MU = 4),
      (qT = '[object Arguments]'),
      (BU = '[object Array]'),
      (PU = '[object Boolean]'),
      (DU = '[object Date]'),
      (UU = '[object Error]'),
      (HT = '[object Function]'),
      (zU = '[object GeneratorFunction]'),
      ($U = '[object Map]'),
      (WU = '[object Number]'),
      (GT = '[object Object]'),
      (qU = '[object RegExp]'),
      (HU = '[object Set]'),
      (GU = '[object String]'),
      (jU = '[object Symbol]'),
      (YU = '[object WeakMap]'),
      (VU = '[object ArrayBuffer]'),
      (XU = '[object DataView]'),
      (KU = '[object Float32Array]'),
      (ZU = '[object Float64Array]'),
      (QU = '[object Int8Array]'),
      (JU = '[object Int16Array]'),
      (tz = '[object Int32Array]'),
      (ez = '[object Uint8Array]'),
      (rz = '[object Uint8ClampedArray]'),
      (nz = '[object Uint16Array]'),
      (iz = '[object Uint32Array]'),
      (Ht = {});
    Ht[qT] =
      Ht[BU] =
      Ht[VU] =
      Ht[XU] =
      Ht[PU] =
      Ht[DU] =
      Ht[KU] =
      Ht[ZU] =
      Ht[QU] =
      Ht[JU] =
      Ht[tz] =
      Ht[$U] =
      Ht[WU] =
      Ht[GT] =
      Ht[qU] =
      Ht[HU] =
      Ht[GU] =
      Ht[jU] =
      Ht[ez] =
      Ht[rz] =
      Ht[nz] =
      Ht[iz] =
        !0;
    Ht[UU] = Ht[HT] = Ht[YU] = !1;
    vu = Su;
  });
function az(t) {
  return vu(t, oz);
}
var oz,
  Ut,
  jT = f(() => {
    om();
    oz = 4;
    Ut = az;
  });
function cz(t) {
  return vu(t, sz | lz);
}
var sz,
  lz,
  am,
  YT = f(() => {
    om();
    (sz = 1), (lz = 4);
    am = cz;
  });
function uz(t) {
  for (var e = -1, r = t == null ? 0 : t.length, n = 0, i = []; ++e < r; ) {
    var o = t[e];
    o && (i[n++] = o);
  }
  return i;
}
var Nn,
  VT = f(() => {
    Nn = uz;
  });
function hz(t) {
  return this.__data__.set(t, fz), this;
}
var fz,
  XT,
  KT = f(() => {
    fz = '__lodash_hash_undefined__';
    XT = hz;
  });
function pz(t) {
  return this.__data__.has(t);
}
var ZT,
  QT = f(() => {
    ZT = pz;
  });
function Au(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.__data__ = new mo(); ++e < r; ) this.add(t[e]);
}
var Fa,
  Lu = f(() => {
    cu();
    KT();
    QT();
    Au.prototype.add = Au.prototype.push = XT;
    Au.prototype.has = ZT;
    Fa = Au;
  });
function dz(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t)) return !0;
  return !1;
}
var Iu,
  sm = f(() => {
    Iu = dz;
  });
function mz(t, e) {
  return t.has(e);
}
var Ma,
  Ou = f(() => {
    Ma = mz;
  });
function yz(t, e, r, n, i, o) {
  var a = r & gz,
    s = t.length,
    l = e.length;
  if (s != l && !(a && l > s)) return !1;
  var c = o.get(t),
    u = o.get(e);
  if (c && u) return c == e && u == t;
  var h = -1,
    p = !0,
    d = r & xz ? new Fa() : void 0;
  for (o.set(t, e), o.set(e, t); ++h < s; ) {
    var m = t[h],
      g = e[h];
    if (n) var E = a ? n(g, m, h, e, t, o) : n(m, g, h, t, e, o);
    if (E !== void 0) {
      if (E) continue;
      p = !1;
      break;
    }
    if (d) {
      if (
        !Iu(e, function (y, T) {
          if (!Ma(d, T) && (m === y || i(m, y, r, n, o))) return d.push(T);
        })
      ) {
        p = !1;
        break;
      }
    } else if (!(m === g || i(m, g, r, n, o))) {
      p = !1;
      break;
    }
  }
  return o.delete(t), o.delete(e), p;
}
var gz,
  xz,
  Ru,
  lm = f(() => {
    Lu();
    sm();
    Ou();
    (gz = 1), (xz = 2);
    Ru = yz;
  });
function bz(t) {
  var e = -1,
    r = Array(t.size);
  return (
    t.forEach(function (n, i) {
      r[++e] = [i, n];
    }),
    r
  );
}
var JT,
  t1 = f(() => {
    JT = bz;
  });
function _z(t) {
  var e = -1,
    r = Array(t.size);
  return (
    t.forEach(function (n) {
      r[++e] = n;
    }),
    r
  );
}
var Ba,
  Nu = f(() => {
    Ba = _z;
  });
function Fz(t, e, r, n, i, o, a) {
  switch (r) {
    case Nz:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      (t = t.buffer), (e = e.buffer);
    case Rz:
      return !(t.byteLength != e.byteLength || !o(new Ra(t), new Ra(e)));
    case kz:
    case Ez:
    case vz:
      return Gr(+t, +e);
    case wz:
      return t.name == e.name && t.message == e.message;
    case Az:
    case Iz:
      return t == e + '';
    case Sz:
      var s = JT;
    case Lz:
      var l = n & Cz;
      if ((s || (s = Ba), t.size != e.size && !l)) return !1;
      var c = a.get(t);
      if (c) return c == e;
      (n |= Tz), a.set(t, e);
      var u = Ru(s(t), s(e), n, i, o, a);
      return a.delete(t), u;
    case Oz:
      if (cm) return cm.call(t) == cm.call(e);
  }
  return !1;
}
var Cz,
  Tz,
  kz,
  Ez,
  wz,
  Sz,
  vz,
  Az,
  Lz,
  Iz,
  Oz,
  Rz,
  Nz,
  e1,
  cm,
  r1,
  n1 = f(() => {
    so();
    rm();
    uo();
    lm();
    t1();
    Nu();
    (Cz = 1),
      (Tz = 2),
      (kz = '[object Boolean]'),
      (Ez = '[object Date]'),
      (wz = '[object Error]'),
      (Sz = '[object Map]'),
      (vz = '[object Number]'),
      (Az = '[object RegExp]'),
      (Lz = '[object Set]'),
      (Iz = '[object String]'),
      (Oz = '[object Symbol]'),
      (Rz = '[object ArrayBuffer]'),
      (Nz = '[object DataView]'),
      (e1 = Ue ? Ue.prototype : void 0),
      (cm = e1 ? e1.valueOf : void 0);
    r1 = Fz;
  });
function Dz(t, e, r, n, i, o) {
  var a = r & Mz,
    s = Ks(t),
    l = s.length,
    c = Ks(e),
    u = c.length;
  if (l != u && !a) return !1;
  for (var h = l; h--; ) {
    var p = s[h];
    if (!(a ? p in e : Pz.call(e, p))) return !1;
  }
  var d = o.get(t),
    m = o.get(e);
  if (d && m) return d == e && m == t;
  var g = !0;
  o.set(t, e), o.set(e, t);
  for (var E = a; ++h < l; ) {
    p = s[h];
    var y = t[p],
      T = e[p];
    if (n) var b = a ? n(T, y, p, e, t, o) : n(y, T, p, t, e, o);
    if (!(b === void 0 ? y === T || i(y, T, r, n, o) : b)) {
      g = !1;
      break;
    }
    E || (E = p == 'constructor');
  }
  if (g && !E) {
    var N = t.constructor,
      I = e.constructor;
    N != I &&
      'constructor' in t &&
      'constructor' in e &&
      !(
        typeof N == 'function' &&
        N instanceof N &&
        typeof I == 'function' &&
        I instanceof I
      ) &&
      (g = !1);
  }
  return o.delete(t), o.delete(e), g;
}
var Mz,
  Bz,
  Pz,
  i1,
  o1 = f(() => {
    Jd();
    (Mz = 1), (Bz = Object.prototype), (Pz = Bz.hasOwnProperty);
    i1 = Dz;
  });
function $z(t, e, r, n, i, o) {
  var a = K(t),
    s = K(e),
    l = a ? s1 : Br(t),
    c = s ? s1 : Br(e);
  (l = l == a1 ? Fu : l), (c = c == a1 ? Fu : c);
  var u = l == Fu,
    h = c == Fu,
    p = l == c;
  if (p && fn(t)) {
    if (!fn(e)) return !1;
    (a = !0), (u = !1);
  }
  if (p && !u)
    return (
      o || (o = new Rn()),
      a || yi(t) ? Ru(t, e, r, n, i, o) : r1(t, e, l, r, n, i, o)
    );
  if (!(r & Uz)) {
    var d = u && l1.call(t, '__wrapped__'),
      m = h && l1.call(e, '__wrapped__');
    if (d || m) {
      var g = d ? t.value() : t,
        E = m ? e.value() : e;
      return o || (o = new Rn()), i(g, E, r, n, o);
    }
  }
  return p ? (o || (o = new Rn()), i1(t, e, r, n, i, o)) : !1;
}
var Uz,
  a1,
  s1,
  Fu,
  zz,
  l1,
  c1,
  u1 = f(() => {
    Xs();
    lm();
    n1();
    o1();
    xo();
    ee();
    ya();
    Ws();
    (Uz = 1),
      (a1 = '[object Arguments]'),
      (s1 = '[object Array]'),
      (Fu = '[object Object]'),
      (zz = Object.prototype),
      (l1 = zz.hasOwnProperty);
    c1 = $z;
  });
function f1(t, e, r, n, i) {
  return t === e
    ? !0
    : t == null || e == null || (!ce(t) && !ce(e))
    ? t !== t && e !== e
    : c1(t, e, r, n, f1, i);
}
var Mu,
  um = f(() => {
    u1();
    Hr();
    Mu = f1;
  });
function Hz(t, e, r, n) {
  var i = r.length,
    o = i,
    a = !n;
  if (t == null) return !o;
  for (t = Object(t); i--; ) {
    var s = r[i];
    if (a && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return !1;
  }
  for (; ++i < o; ) {
    s = r[i];
    var l = s[0],
      c = t[l],
      u = s[1];
    if (a && s[2]) {
      if (c === void 0 && !(l in t)) return !1;
    } else {
      var h = new Rn();
      if (n) var p = n(c, u, l, t, e, h);
      if (!(p === void 0 ? Mu(u, c, Wz | qz, n, h) : p)) return !1;
    }
  }
  return !0;
}
var Wz,
  qz,
  h1,
  p1 = f(() => {
    Xs();
    um();
    (Wz = 1), (qz = 2);
    h1 = Hz;
  });
function Gz(t) {
  return t === t && !Wt(t);
}
var Bu,
  fm = f(() => {
    Fr();
    Bu = Gz;
  });
function jz(t) {
  for (var e = vt(t), r = e.length; r--; ) {
    var n = e[r],
      i = t[n];
    e[r] = [n, i, Bu(i)];
  }
  return e;
}
var d1,
  m1 = f(() => {
    fm();
    Ln();
    d1 = jz;
  });
function Yz(t, e) {
  return function (r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
var Pu,
  hm = f(() => {
    Pu = Yz;
  });
function Vz(t) {
  var e = d1(t);
  return e.length == 1 && e[0][2]
    ? Pu(e[0][0], e[0][1])
    : function (r) {
        return r === t || h1(r, t, e);
      };
}
var g1,
  x1 = f(() => {
    p1();
    m1();
    hm();
    g1 = Vz;
  });
function Xz(t, e) {
  return t != null && e in Object(t);
}
var y1,
  b1 = f(() => {
    y1 = Xz;
  });
function Kz(t, e, r) {
  e = Ei(e, t);
  for (var n = -1, i = e.length, o = !1; ++n < i; ) {
    var a = In(e[n]);
    if (!(o = t != null && r(t, a))) break;
    t = t[a];
  }
  return o || ++n != i
    ? o
    : ((i = t == null ? 0 : t.length),
      !!i && ma(i) && xi(a, i) && (K(t) || un(t)));
}
var Du,
  pm = f(() => {
    Ys();
    xa();
    ee();
    Us();
    ru();
    wa();
    Du = Kz;
  });
function Zz(t, e) {
  return t != null && Du(t, e, y1);
}
var Uu,
  dm = f(() => {
    b1();
    pm();
    Uu = Zz;
  });
function t8(t, e) {
  return _a(t) && Bu(e)
    ? Pu(In(t), e)
    : function (r) {
        var n = IC(r, t);
        return n === void 0 && n === e ? Uu(r, t) : Mu(e, n, Qz | Jz);
      };
}
var Qz,
  Jz,
  _1,
  C1 = f(() => {
    um();
    OC();
    dm();
    su();
    fm();
    hm();
    wa();
    (Qz = 1), (Jz = 2);
    _1 = t8;
  });
function e8(t) {
  return function (e) {
    return e?.[t];
  };
}
var zu,
  mm = f(() => {
    zu = e8;
  });
function r8(t) {
  return function (e) {
    return wi(e, t);
  };
}
var T1,
  k1 = f(() => {
    Vs();
    T1 = r8;
  });
function n8(t) {
  return _a(t) ? zu(In(t)) : T1(t);
}
var E1,
  w1 = f(() => {
    mm();
    k1();
    su();
    wa();
    E1 = n8;
  });
function i8(t) {
  return typeof t == 'function'
    ? t
    : t == null
    ? ze
    : typeof t == 'object'
    ? K(t)
      ? _1(t[0], t[1])
      : g1(t)
    : E1(t);
}
var Gt,
  br = f(() => {
    x1();
    C1();
    Vn();
    ee();
    w1();
    Gt = i8;
  });
function o8(t, e, r, n) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var a = t[i];
    e(n, a, r(a), t);
  }
  return n;
}
var S1,
  v1 = f(() => {
    S1 = o8;
  });
function a8(t) {
  return function (e, r, n) {
    for (var i = -1, o = Object(e), a = n(e), s = a.length; s--; ) {
      var l = a[t ? s : ++i];
      if (r(o[l], l, o) === !1) break;
    }
    return e;
  };
}
var A1,
  L1 = f(() => {
    A1 = a8;
  });
var s8,
  Pa,
  $u = f(() => {
    L1();
    (s8 = A1()), (Pa = s8);
  });
function l8(t, e) {
  return t && Pa(t, e, vt);
}
var Da,
  Wu = f(() => {
    $u();
    Ln();
    Da = l8;
  });
function c8(t, e) {
  return function (r, n) {
    if (r == null) return r;
    if (!de(r)) return t(r, n);
    for (
      var i = r.length, o = e ? i : -1, a = Object(r);
      (e ? o-- : ++o < i) && n(a[o], o, a) !== !1;

    );
    return r;
  };
}
var I1,
  O1 = f(() => {
    Yr();
    I1 = c8;
  });
var u8,
  _r,
  vi = f(() => {
    Wu();
    O1();
    (u8 = I1(Da)), (_r = u8);
  });
function f8(t, e, r, n) {
  return (
    _r(t, function (i, o, a) {
      e(n, i, r(i), a);
    }),
    n
  );
}
var R1,
  N1 = f(() => {
    vi();
    R1 = f8;
  });
function h8(t, e) {
  return function (r, n) {
    var i = K(r) ? S1 : R1,
      o = e ? e() : {};
    return i(r, t, Gt(n, 2), o);
  };
}
var F1,
  M1 = f(() => {
    v1();
    N1();
    br();
    ee();
    F1 = h8;
  });
var p8,
  qu,
  B1 = f(() => {
    qr();
    (p8 = function () {
      return pe.Date.now();
    }),
      (qu = p8);
  });
var P1,
  d8,
  m8,
  Ai,
  D1 = f(() => {
    da();
    uo();
    ho();
    bi();
    (P1 = Object.prototype),
      (d8 = P1.hasOwnProperty),
      (m8 = vn(function (t, e) {
        t = Object(t);
        var r = -1,
          n = e.length,
          i = n > 2 ? e[2] : void 0;
        for (i && Mr(e[0], e[1], i) && (n = 1); ++r < n; )
          for (var o = e[r], a = yr(o), s = -1, l = a.length; ++s < l; ) {
            var c = a[s],
              u = t[c];
            (u === void 0 || (Gr(u, P1[c]) && !d8.call(t, c))) && (t[c] = o[c]);
          }
        return t;
      })),
      (Ai = m8);
  });
function g8(t, e, r) {
  ((r !== void 0 && !Gr(t[e], r)) || (r === void 0 && !(e in t))) &&
    wn(t, e, r);
}
var Zs,
  gm = f(() => {
    ha();
    uo();
    Zs = g8;
  });
function x8(t) {
  return ce(t) && de(t);
}
var yo,
  Hu = f(() => {
    Yr();
    Hr();
    yo = x8;
  });
function y8(t, e) {
  if (!(e === 'constructor' && typeof t[e] == 'function') && e != '__proto__')
    return t[e];
}
var Qs,
  xm = f(() => {
    Qs = y8;
  });
function b8(t) {
  return jr(t, yr(t));
}
var U1,
  z1 = f(() => {
    fo();
    bi();
    U1 = b8;
  });
function _8(t, e, r, n, i, o, a) {
  var s = Qs(t, r),
    l = Qs(e, r),
    c = a.get(l);
  if (c) {
    Zs(t, r, c);
    return;
  }
  var u = o ? o(s, l, r + '', t, e, a) : void 0,
    h = u === void 0;
  if (h) {
    var p = K(l),
      d = !p && fn(l),
      m = !p && !d && yi(l);
    (u = l),
      p || d || m
        ? K(s)
          ? (u = s)
          : yo(s)
          ? (u = Xc(s))
          : d
          ? ((h = !1), (u = du(l, !0)))
          : m
          ? ((h = !1), (u = Eu(l, !0)))
          : (u = [])
        : UC(l) || un(l)
        ? ((u = s), un(s) ? (u = U1(s)) : (!Wt(s) || we(s)) && (u = wu(l)))
        : (h = !1);
  }
  h && (a.set(l, u), i(u, l, n, o, a), a.delete(l)), Zs(t, r, u);
}
var $1,
  W1 = f(() => {
    gm();
    Xd();
    nm();
    Id();
    im();
    xa();
    ee();
    Hu();
    ya();
    Ds();
    Fr();
    zC();
    Ws();
    xm();
    z1();
    $1 = _8;
  });
function q1(t, e, r, n, i) {
  t !== e &&
    Pa(
      e,
      function (o, a) {
        if ((i || (i = new Rn()), Wt(o))) $1(t, e, a, r, q1, n, i);
        else {
          var s = n ? n(Qs(t, a), o, a + '', t, e, i) : void 0;
          s === void 0 && (s = o), Zs(t, a, s);
        }
      },
      yr
    );
}
var H1,
  G1 = f(() => {
    Xs();
    gm();
    $u();
    W1();
    Fr();
    bi();
    xm();
    H1 = q1;
  });
function C8(t, e, r) {
  for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
    if (r(e, t[n])) return !0;
  return !1;
}
var Gu,
  ym = f(() => {
    Gu = C8;
  });
function k8(t, e, r, n) {
  var i = -1,
    o = tu,
    a = !0,
    s = t.length,
    l = [],
    c = e.length;
  if (!s) return l;
  r && (e = mr(e, Vr(r))),
    n
      ? ((o = Gu), (a = !1))
      : e.length >= T8 && ((o = Ma), (a = !1), (e = new Fa(e)));
  t: for (; ++i < s; ) {
    var u = t[i],
      h = r == null ? u : r(u);
    if (((u = n || u !== 0 ? u : 0), a && h === h)) {
      for (var p = c; p--; ) if (e[p] === h) continue t;
      l.push(u);
    } else o(e, h, n) || l.push(u);
  }
  return l;
}
var T8,
  j1,
  Y1 = f(() => {
    Lu();
    Bd();
    ym();
    co();
    po();
    Ou();
    T8 = 200;
    j1 = k8;
  });
var E8,
  Li,
  V1 = f(() => {
    Y1();
    va();
    da();
    Hu();
    (E8 = vn(function (t, e) {
      return yo(t) ? j1(t, On(e, 1, yo, !0)) : [];
    })),
      (Li = E8);
  });
function w8(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
var Xe,
  X1 = f(() => {
    Xe = w8;
  });
function S8(t, e, r) {
  var n = t == null ? 0 : t.length;
  return n
    ? ((e = r || e === void 0 ? 1 : En(e)), pu(t, e < 0 ? 0 : e, n))
    : [];
}
var be,
  K1 = f(() => {
    Vd();
    ca();
    be = S8;
  });
function v8(t, e, r) {
  var n = t == null ? 0 : t.length;
  return n
    ? ((e = r || e === void 0 ? 1 : En(e)),
      (e = n - e),
      pu(t, 0, e < 0 ? 0 : e))
    : [];
}
var Zn,
  Z1 = f(() => {
    Vd();
    ca();
    Zn = v8;
  });
function A8(t) {
  return typeof t == 'function' ? t : ze;
}
var Ua,
  ju = f(() => {
    Vn();
    Ua = A8;
  });
function L8(t, e) {
  var r = K(t) ? Zc : _r;
  return r(t, Ua(e));
}
var C,
  bm = f(() => {
    Fd();
    vi();
    ju();
    ee();
    C = L8;
  });
var Q1 = f(() => {
  bm();
});
function I8(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (!e(t[r], r, t)) return !1;
  return !0;
}
var J1,
  tk = f(() => {
    J1 = I8;
  });
function O8(t, e) {
  var r = !0;
  return (
    _r(t, function (n, i, o) {
      return (r = !!e(n, i, o)), r;
    }),
    r
  );
}
var ek,
  rk = f(() => {
    vi();
    ek = O8;
  });
function R8(t, e, r) {
  var n = K(t) ? J1 : ek;
  return r && Mr(t, e, r) && (e = void 0), n(t, Gt(e, 3));
}
var Je,
  nk = f(() => {
    tk();
    rk();
    br();
    ee();
    ho();
    Je = R8;
  });
function N8(t, e) {
  var r = [];
  return (
    _r(t, function (n, i, o) {
      e(n, i, o) && r.push(n);
    }),
    r
  );
}
var Yu,
  _m = f(() => {
    vi();
    Yu = N8;
  });
function F8(t, e) {
  var r = K(t) ? Ia : Yu;
  return r(t, Gt(e, 3));
}
var Rt,
  ik = f(() => {
    mu();
    _m();
    br();
    ee();
    Rt = F8;
  });
function M8(t) {
  return function (e, r, n) {
    var i = Object(e);
    if (!de(e)) {
      var o = Gt(r, 3);
      (e = vt(e)),
        (r = function (s) {
          return o(i[s], s, i);
        });
    }
    var a = t(e, r, n);
    return a > -1 ? i[o ? e[a] : a] : void 0;
  };
}
var ok,
  ak = f(() => {
    br();
    Yr();
    Ln();
    ok = M8;
  });
function P8(t, e, r) {
  var n = t == null ? 0 : t.length;
  if (!n) return -1;
  var i = r == null ? 0 : En(r);
  return i < 0 && (i = B8(n + i, 0)), Qc(t, Gt(e, 3), i);
}
var B8,
  sk,
  lk = f(() => {
    Md();
    br();
    ca();
    B8 = Math.max;
    sk = P8;
  });
var D8,
  nr,
  ck = f(() => {
    ak();
    lk();
    (D8 = ok(sk)), (nr = D8);
  });
function U8(t) {
  return t && t.length ? t[0] : void 0;
}
var $e,
  uk = f(() => {
    $e = U8;
  });
var fk = f(() => {
  uk();
});
function z8(t, e) {
  var r = -1,
    n = de(t) ? Array(t.length) : [];
  return (
    _r(t, function (i, o, a) {
      n[++r] = e(i, o, a);
    }),
    n
  );
}
var Vu,
  Cm = f(() => {
    vi();
    Yr();
    Vu = z8;
  });
function $8(t, e) {
  var r = K(t) ? mr : Vu;
  return r(t, Gt(e, 3));
}
var z,
  Tm = f(() => {
    co();
    br();
    Cm();
    ee();
    z = $8;
  });
function W8(t, e) {
  return On(z(t, e), 1);
}
var ir,
  hk = f(() => {
    va();
    Tm();
    ir = W8;
  });
function q8(t, e) {
  return t == null ? t : Pa(t, Ua(e), yr);
}
var km,
  pk = f(() => {
    $u();
    ju();
    bi();
    km = q8;
  });
function H8(t, e) {
  return t && Da(t, Ua(e));
}
var Em,
  dk = f(() => {
    Wu();
    ju();
    Em = H8;
  });
var G8,
  j8,
  Y8,
  wm,
  mk = f(() => {
    ha();
    M1();
    (G8 = Object.prototype),
      (j8 = G8.hasOwnProperty),
      (Y8 = F1(function (t, e, r) {
        j8.call(t, r) ? t[r].push(e) : wn(t, r, [e]);
      })),
      (wm = Y8);
  });
function V8(t, e) {
  return t > e;
}
var gk,
  xk = f(() => {
    gk = V8;
  });
function Z8(t, e) {
  return t != null && K8.call(t, e);
}
var X8,
  K8,
  yk,
  bk = f(() => {
    (X8 = Object.prototype), (K8 = X8.hasOwnProperty);
    yk = Z8;
  });
function Q8(t, e) {
  return t != null && Du(t, e, yk);
}
var B,
  _k = f(() => {
    bk();
    pm();
    B = Q8;
  });
function t$(t) {
  return typeof t == 'string' || (!K(t) && ce(t) && Ye(t) == J8);
}
var J8,
  _e,
  Xu = f(() => {
    Yn();
    ee();
    Hr();
    J8 = '[object String]';
    _e = t$;
  });
function e$(t, e) {
  return mr(e, function (r) {
    return t[r];
  });
}
var Ck,
  Tk = f(() => {
    co();
    Ck = e$;
  });
function r$(t) {
  return t == null ? [] : Ck(t, vt(t));
}
var _t,
  Sm = f(() => {
    Tk();
    Ln();
    _t = r$;
  });
function i$(t, e, r, n) {
  (t = de(t) ? t : _t(t)), (r = r && !n ? En(r) : 0);
  var i = t.length;
  return (
    r < 0 && (r = n$(i + r, 0)),
    _e(t) ? r <= i && t.indexOf(e, r) > -1 : !!i && fa(t, e, r) > -1
  );
}
var n$,
  re,
  kk = f(() => {
    Jc();
    Yr();
    Xu();
    ca();
    Sm();
    n$ = Math.max;
    re = i$;
  });
function a$(t, e, r) {
  var n = t == null ? 0 : t.length;
  if (!n) return -1;
  var i = r == null ? 0 : En(r);
  return i < 0 && (i = o$(n + i, 0)), fa(t, e, i);
}
var o$,
  Ku,
  Ek = f(() => {
    Jc();
    ca();
    o$ = Math.max;
    Ku = a$;
  });
function f$(t) {
  if (t == null) return !0;
  if (
    de(t) &&
    (K(t) ||
      typeof t == 'string' ||
      typeof t.splice == 'function' ||
      fn(t) ||
      yi(t) ||
      un(t))
  )
    return !t.length;
  var e = Br(t);
  if (e == s$ || e == l$) return !t.size;
  if (An(t)) return !ba(t).length;
  for (var r in t) if (u$.call(t, r)) return !1;
  return !0;
}
var s$,
  l$,
  c$,
  u$,
  dt,
  vm = f(() => {
    au();
    xo();
    xa();
    ee();
    Yr();
    ya();
    ga();
    Ws();
    (s$ = '[object Map]'),
      (l$ = '[object Set]'),
      (c$ = Object.prototype),
      (u$ = c$.hasOwnProperty);
    dt = f$;
  });
function p$(t) {
  return ce(t) && Ye(t) == h$;
}
var h$,
  wk,
  Sk = f(() => {
    Yn();
    Hr();
    h$ = '[object RegExp]';
    wk = p$;
  });
var vk,
  d$,
  Kr,
  Ak = f(() => {
    Sk();
    po();
    $s();
    (vk = Xr && Xr.isRegExp), (d$ = vk ? Vr(vk) : wk), (Kr = d$);
  });
function m$(t) {
  return t === void 0;
}
var xt,
  Lk = f(() => {
    xt = m$;
  });
function g$(t, e) {
  return t < e;
}
var Zu,
  Am = f(() => {
    Zu = g$;
  });
function x$(t, e) {
  var r = {};
  return (
    (e = Gt(e, 3)),
    Da(t, function (n, i, o) {
      wn(r, i, e(n, i, o));
    }),
    r
  );
}
var bo,
  Ik = f(() => {
    ha();
    Wu();
    br();
    bo = x$;
  });
function y$(t, e, r) {
  for (var n = -1, i = t.length; ++n < i; ) {
    var o = t[n],
      a = e(o);
    if (a != null && (s === void 0 ? a === a && !Nr(a) : r(a, s)))
      var s = a,
        l = o;
  }
  return l;
}
var za,
  Qu = f(() => {
    lo();
    za = y$;
  });
function b$(t) {
  return t && t.length ? za(t, ze, gk) : void 0;
}
var Cr,
  Ok = f(() => {
    Qu();
    xk();
    Vn();
    Cr = b$;
  });
var _$,
  Ii,
  Lm = f(() => {
    G1();
    Dd();
    (_$ = nu(function (t, e, r) {
      H1(t, e, r);
    })),
      (Ii = _$);
  });
function C$(t) {
  return t && t.length ? za(t, ze, Zu) : void 0;
}
var Qn,
  Rk = f(() => {
    Qu();
    Am();
    Vn();
    Qn = C$;
  });
function T$(t, e) {
  return t && t.length ? za(t, Gt(e, 2), Zu) : void 0;
}
var _o,
  Nk = f(() => {
    Qu();
    br();
    Am();
    _o = T$;
  });
function E$(t) {
  if (typeof t != 'function') throw new TypeError(k$);
  return function () {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !t.call(this);
      case 1:
        return !t.call(this, e[0]);
      case 2:
        return !t.call(this, e[0], e[1]);
      case 3:
        return !t.call(this, e[0], e[1], e[2]);
    }
    return !t.apply(this, e);
  };
}
var k$,
  Fk,
  Mk = f(() => {
    k$ = 'Expected a function';
    Fk = E$;
  });
function w$(t, e, r, n) {
  if (!Wt(t)) return t;
  e = Ei(e, t);
  for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o; ) {
    var l = In(e[i]),
      c = r;
    if (l === '__proto__' || l === 'constructor' || l === 'prototype') return t;
    if (i != a) {
      var u = s[l];
      (c = n ? n(u, l, s) : void 0),
        c === void 0 && (c = Wt(u) ? u : xi(e[i + 1]) ? [] : {});
    }
    Sn(s, l, c), (s = s[l]);
  }
  return t;
}
var Bk,
  Pk = f(() => {
    pa();
    Ys();
    Us();
    Fr();
    wa();
    Bk = w$;
  });
function S$(t, e, r) {
  for (var n = -1, i = e.length, o = {}; ++n < i; ) {
    var a = e[n],
      s = wi(t, a);
    r(s, a) && Bk(o, Ei(a, t), s);
  }
  return o;
}
var Ju,
  Im = f(() => {
    Vs();
    Pk();
    Ys();
    Ju = S$;
  });
function v$(t, e) {
  if (t == null) return {};
  var r = mr(_u(t), function (n) {
    return [n];
  });
  return (
    (e = Gt(e)),
    Ju(t, r, function (n, i) {
      return e(n, i[0]);
    })
  );
}
var Tr,
  Dk = f(() => {
    co();
    br();
    Im();
    tm();
    Tr = v$;
  });
function A$(t, e) {
  var r = t.length;
  for (t.sort(e); r--; ) t[r] = t[r].value;
  return t;
}
var Uk,
  zk = f(() => {
    Uk = A$;
  });
function L$(t, e) {
  if (t !== e) {
    var r = t !== void 0,
      n = t === null,
      i = t === t,
      o = Nr(t),
      a = e !== void 0,
      s = e === null,
      l = e === e,
      c = Nr(e);
    if (
      (!s && !c && !o && t > e) ||
      (o && a && l && !s && !c) ||
      (n && a && l) ||
      (!r && l) ||
      !i
    )
      return 1;
    if (
      (!n && !o && !c && t < e) ||
      (c && r && i && !n && !o) ||
      (s && r && i) ||
      (!a && i) ||
      !l
    )
      return -1;
  }
  return 0;
}
var $k,
  Wk = f(() => {
    lo();
    $k = L$;
  });
function I$(t, e, r) {
  for (
    var n = -1, i = t.criteria, o = e.criteria, a = i.length, s = r.length;
    ++n < a;

  ) {
    var l = $k(i[n], o[n]);
    if (l) {
      if (n >= s) return l;
      var c = r[n];
      return l * (c == 'desc' ? -1 : 1);
    }
  }
  return t.index - e.index;
}
var qk,
  Hk = f(() => {
    Wk();
    qk = I$;
  });
function O$(t, e, r) {
  e.length
    ? (e = mr(e, function (o) {
        return K(o)
          ? function (a) {
              return wi(a, o.length === 1 ? o[0] : o);
            }
          : o;
      }))
    : (e = [ze]);
  var n = -1;
  e = mr(e, Vr(Gt));
  var i = Vu(t, function (o, a, s) {
    var l = mr(e, function (c) {
      return c(o);
    });
    return { criteria: l, index: ++n, value: o };
  });
  return Uk(i, function (o, a) {
    return qk(o, a, r);
  });
}
var Gk,
  jk = f(() => {
    co();
    Vs();
    br();
    Cm();
    zk();
    po();
    Hk();
    Vn();
    ee();
    Gk = O$;
  });
var R$,
  Yk,
  Vk = f(() => {
    mm();
    (R$ = zu('length')), (Yk = R$);
  });
function H$(t) {
  for (var e = (Xk.lastIndex = 0); Xk.test(t); ) ++e;
  return e;
}
var Kk,
  N$,
  F$,
  M$,
  B$,
  P$,
  D$,
  Om,
  Rm,
  U$,
  Zk,
  Qk,
  Jk,
  z$,
  tE,
  eE,
  $$,
  W$,
  q$,
  Xk,
  rE,
  nE = f(() => {
    (Kk = '\\ud800-\\udfff'),
      (N$ = '\\u0300-\\u036f'),
      (F$ = '\\ufe20-\\ufe2f'),
      (M$ = '\\u20d0-\\u20ff'),
      (B$ = N$ + F$ + M$),
      (P$ = '\\ufe0e\\ufe0f'),
      (D$ = '[' + Kk + ']'),
      (Om = '[' + B$ + ']'),
      (Rm = '\\ud83c[\\udffb-\\udfff]'),
      (U$ = '(?:' + Om + '|' + Rm + ')'),
      (Zk = '[^' + Kk + ']'),
      (Qk = '(?:\\ud83c[\\udde6-\\uddff]){2}'),
      (Jk = '[\\ud800-\\udbff][\\udc00-\\udfff]'),
      (z$ = '\\u200d'),
      (tE = U$ + '?'),
      (eE = '[' + P$ + ']?'),
      ($$ = '(?:' + z$ + '(?:' + [Zk, Qk, Jk].join('|') + ')' + eE + tE + ')*'),
      (W$ = eE + tE + $$),
      (q$ = '(?:' + [Zk + Om + '?', Om, Qk, Jk, D$].join('|') + ')'),
      (Xk = RegExp(Rm + '(?=' + Rm + ')|' + q$ + W$, 'g'));
    rE = H$;
  });
function G$(t) {
  return $C(t) ? rE(t) : Yk(t);
}
var iE,
  oE = f(() => {
    Vk();
    WC();
    nE();
    iE = G$;
  });
function j$(t, e) {
  return Ju(t, e, function (r, n) {
    return Uu(t, n);
  });
}
var aE,
  sE = f(() => {
    Im();
    dm();
    aE = j$;
  });
var Y$,
  Co,
  lE = f(() => {
    sE();
    PC();
    (Y$ = BC(function (t, e) {
      return t == null ? {} : aE(t, e);
    })),
      (Co = Y$);
  });
function K$(t, e, r, n) {
  for (var i = -1, o = X$(V$((e - t) / (r || 1)), 0), a = Array(o); o--; )
    (a[n ? o : ++i] = t), (t += r);
  return a;
}
var V$,
  X$,
  cE,
  uE = f(() => {
    (V$ = Math.ceil), (X$ = Math.max);
    cE = K$;
  });
function Z$(t) {
  return function (e, r, n) {
    return (
      n && typeof n != 'number' && Mr(e, r, n) && (r = n = void 0),
      (e = la(e)),
      r === void 0 ? ((r = e), (e = 0)) : (r = la(r)),
      (n = n === void 0 ? (e < r ? 1 : -1) : la(n)),
      cE(e, r, n, t)
    );
  };
}
var fE,
  hE = f(() => {
    uE();
    ho();
    vd();
    fE = Z$;
  });
var Q$,
  Zr,
  pE = f(() => {
    hE();
    (Q$ = fE()), (Zr = Q$);
  });
function J$(t, e, r, n, i) {
  return (
    i(t, function (o, a, s) {
      r = n ? ((n = !1), o) : e(r, o, a, s);
    }),
    r
  );
}
var dE,
  mE = f(() => {
    dE = J$;
  });
function tW(t, e, r) {
  var n = K(t) ? qC : dE,
    i = arguments.length < 3;
  return n(t, Gt(e, 4), r, i, _r);
}
var Mt,
  gE = f(() => {
    HC();
    vi();
    br();
    mE();
    ee();
    Mt = tW;
  });
function eW(t, e) {
  var r = K(t) ? Ia : Yu;
  return r(t, Fk(Gt(e, 3)));
}
var Oi,
  xE = f(() => {
    mu();
    _m();
    br();
    ee();
    Mk();
    Oi = eW;
  });
function iW(t) {
  if (t == null) return 0;
  if (de(t)) return _e(t) ? iE(t) : t.length;
  var e = Br(t);
  return e == rW || e == nW ? t.size : ba(t).length;
}
var rW,
  nW,
  Nm,
  yE = f(() => {
    au();
    xo();
    Yr();
    Xu();
    oE();
    (rW = '[object Map]'), (nW = '[object Set]');
    Nm = iW;
  });
function oW(t, e) {
  var r;
  return (
    _r(t, function (n, i, o) {
      return (r = e(n, i, o)), !r;
    }),
    !!r
  );
}
var bE,
  _E = f(() => {
    vi();
    bE = oW;
  });
function aW(t, e, r) {
  var n = K(t) ? Iu : bE;
  return r && Mr(t, e, r) && (e = void 0), n(t, Gt(e, 3));
}
var Js,
  CE = f(() => {
    sm();
    br();
    _E();
    ee();
    ho();
    Js = aW;
  });
var sW,
  Fn,
  TE = f(() => {
    va();
    jk();
    da();
    ho();
    (sW = vn(function (t, e) {
      if (t == null) return [];
      var r = e.length;
      return (
        r > 1 && Mr(t, e[0], e[1])
          ? (e = [])
          : r > 2 && Mr(e[0], e[1], e[2]) && (e = [e[0]]),
        Gk(t, On(e, 1), [])
      );
    })),
      (Fn = sW);
  });
var lW,
  cW,
  kE,
  EE = f(() => {
    em();
    Ld();
    Nu();
    (lW = 1 / 0),
      (cW =
        Si && 1 / Ba(new Si([, -0]))[1] == lW
          ? function (t) {
              return new Si(t);
            }
          : ue),
      (kE = cW);
  });
function fW(t, e, r) {
  var n = -1,
    i = tu,
    o = t.length,
    a = !0,
    s = [],
    l = s;
  if (r) (a = !1), (i = Gu);
  else if (o >= uW) {
    var c = e ? null : kE(t);
    if (c) return Ba(c);
    (a = !1), (i = Ma), (l = new Fa());
  } else l = e ? [] : s;
  t: for (; ++n < o; ) {
    var u = t[n],
      h = e ? e(u) : u;
    if (((u = r || u !== 0 ? u : 0), a && h === h)) {
      for (var p = l.length; p--; ) if (l[p] === h) continue t;
      e && l.push(h), s.push(u);
    } else i(l, h, r) || (l !== s && l.push(h), s.push(u));
  }
  return s;
}
var uW,
  tf,
  Fm = f(() => {
    Lu();
    Bd();
    ym();
    Ou();
    EE();
    Nu();
    uW = 200;
    tf = fW;
  });
var hW,
  Mm,
  wE = f(() => {
    va();
    da();
    Fm();
    Hu();
    (hW = vn(function (t) {
      return tf(On(t, 1, yo, !0));
    })),
      (Mm = hW);
  });
function pW(t) {
  return t && t.length ? tf(t) : [];
}
var $a,
  SE = f(() => {
    Fm();
    $a = pW;
  });
function mW(t) {
  var e = ++dW;
  return uu(t) + e;
}
var dW,
  To,
  vE = f(() => {
    jd();
    dW = 0;
    To = mW;
  });
function gW(t, e, r) {
  for (var n = -1, i = t.length, o = e.length, a = {}; ++n < i; ) {
    var s = n < o ? e[n] : void 0;
    r(a, t[n], s);
  }
  return a;
}
var AE,
  LE = f(() => {
    AE = gW;
  });
function xW(t, e) {
  return AE(t || [], e || [], Sn);
}
var ef,
  IE = f(() => {
    pa();
    LE();
    ef = xW;
  });
var tt = f(() => {
  W_();
  jT();
  YT();
  VT();
  Od();
  D1();
  V1();
  K1();
  Z1();
  Q1();
  nk();
  ik();
  ck();
  fk();
  hk();
  Yd();
  bm();
  pk();
  dk();
  mk();
  _k();
  Vn();
  kk();
  Ek();
  ee();
  vm();
  Ds();
  Fr();
  Ak();
  Xu();
  Lk();
  Ln();
  X1();
  Tm();
  Ik();
  Ok();
  Lm();
  Rk();
  Nk();
  Ld();
  B1();
  lE();
  Dk();
  pE();
  gE();
  xE();
  yE();
  CE();
  TE();
  wE();
  SE();
  vE();
  Sm();
  IE();
});
function Wa(t) {
  console && console.error && console.error(`Error: ${t}`);
}
function tl(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
var OE = f(() => {});
function el(t) {
  let e = new Date().getTime(),
    r = t();
  return { time: new Date().getTime() - e, value: r };
}
var RE = f(() => {});
function rl(t) {
  function e() {}
  e.prototype = t;
  let r = new e();
  function n() {
    return typeof r.bar;
  }
  return n(), n(), t;
  (0, eval)(t);
}
var NE = f(() => {});
var qa = f(() => {
  OE();
  RE();
  NE();
});
function yW(t) {
  return bW(t) ? t.LABEL : t.name;
}
function bW(t) {
  return _e(t.LABEL) && t.LABEL !== '';
}
function rf(t) {
  return z(t, Ha);
}
function Ha(t) {
  function e(r) {
    return z(r, Ha);
  }
  if (t instanceof jt) {
    let r = { type: 'NonTerminal', name: t.nonTerminalName, idx: t.idx };
    return _e(t.label) && (r.label = t.label), r;
  } else {
    if (t instanceof Yt)
      return { type: 'Alternative', definition: e(t.definition) };
    if (t instanceof Qt)
      return { type: 'Option', idx: t.idx, definition: e(t.definition) };
    if (t instanceof Ce)
      return {
        type: 'RepetitionMandatory',
        idx: t.idx,
        definition: e(t.definition),
      };
    if (t instanceof Te)
      return {
        type: 'RepetitionMandatoryWithSeparator',
        idx: t.idx,
        separator: Ha(new St({ terminalType: t.separator })),
        definition: e(t.definition),
      };
    if (t instanceof me)
      return {
        type: 'RepetitionWithSeparator',
        idx: t.idx,
        separator: Ha(new St({ terminalType: t.separator })),
        definition: e(t.definition),
      };
    if (t instanceof Nt)
      return { type: 'Repetition', idx: t.idx, definition: e(t.definition) };
    if (t instanceof ge)
      return { type: 'Alternation', idx: t.idx, definition: e(t.definition) };
    if (t instanceof St) {
      let r = {
        type: 'Terminal',
        name: t.terminalType.name,
        label: yW(t.terminalType),
        idx: t.idx,
      };
      _e(t.label) && (r.terminalLabel = t.label);
      let n = t.terminalType.PATTERN;
      return t.terminalType.PATTERN && (r.pattern = Kr(n) ? n.source : n), r;
    } else {
      if (t instanceof or)
        return {
          type: 'Rule',
          name: t.name,
          orgText: t.orgText,
          definition: e(t.definition),
        };
      throw Error('non exhaustive match');
    }
  }
}
var Pr,
  jt,
  or,
  Yt,
  Qt,
  Ce,
  Te,
  Nt,
  me,
  ge,
  St,
  nf = f(() => {
    tt();
    (Pr = class {
      get definition() {
        return this._definition;
      }
      set definition(e) {
        this._definition = e;
      }
      constructor(e) {
        this._definition = e;
      }
      accept(e) {
        e.visit(this),
          C(this.definition, (r) => {
            r.accept(e);
          });
      }
    }),
      (jt = class extends Pr {
        constructor(e) {
          super([]),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
        set definition(e) {}
        get definition() {
          return this.referencedRule !== void 0
            ? this.referencedRule.definition
            : [];
        }
        accept(e) {
          e.visit(this);
        }
      }),
      (or = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.orgText = ''),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (Yt = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.ignoreAmbiguities = !1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (Qt = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (Ce = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (Te = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (Nt = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (me = class extends Pr {
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (ge = class extends Pr {
        get definition() {
          return this._definition;
        }
        set definition(e) {
          this._definition = e;
        }
        constructor(e) {
          super(e.definition),
            (this.idx = 1),
            (this.ignoreAmbiguities = !1),
            (this.hasPredicates = !1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
      }),
      (St = class {
        constructor(e) {
          (this.idx = 1),
            Ve(
              this,
              Tr(e, (r) => r !== void 0)
            );
        }
        accept(e) {
          e.visit(this);
        }
      });
  });
var ar,
  FE = f(() => {
    nf();
    ar = class {
      visit(e) {
        let r = e;
        switch (r.constructor) {
          case jt:
            return this.visitNonTerminal(r);
          case Yt:
            return this.visitAlternative(r);
          case Qt:
            return this.visitOption(r);
          case Ce:
            return this.visitRepetitionMandatory(r);
          case Te:
            return this.visitRepetitionMandatoryWithSeparator(r);
          case me:
            return this.visitRepetitionWithSeparator(r);
          case Nt:
            return this.visitRepetition(r);
          case ge:
            return this.visitAlternation(r);
          case St:
            return this.visitTerminal(r);
          case or:
            return this.visitRule(r);
          default:
            throw Error('non exhaustive match');
        }
      }
      visitNonTerminal(e) {}
      visitAlternative(e) {}
      visitOption(e) {}
      visitRepetition(e) {}
      visitRepetitionMandatory(e) {}
      visitRepetitionMandatoryWithSeparator(e) {}
      visitRepetitionWithSeparator(e) {}
      visitAlternation(e) {}
      visitTerminal(e) {}
      visitRule(e) {}
    };
  });
function Bm(t) {
  return (
    t instanceof Yt ||
    t instanceof Qt ||
    t instanceof Nt ||
    t instanceof Ce ||
    t instanceof Te ||
    t instanceof me ||
    t instanceof St ||
    t instanceof or
  );
}
function ko(t, e = []) {
  return t instanceof Qt || t instanceof Nt || t instanceof me
    ? !0
    : t instanceof ge
    ? Js(t.definition, (n) => ko(n, e))
    : t instanceof jt && re(e, t)
    ? !1
    : t instanceof Pr
    ? (t instanceof jt && e.push(t), Je(t.definition, (n) => ko(n, e)))
    : !1;
}
function Pm(t) {
  return t instanceof ge;
}
function kr(t) {
  if (t instanceof jt) return 'SUBRULE';
  if (t instanceof Qt) return 'OPTION';
  if (t instanceof ge) return 'OR';
  if (t instanceof Ce) return 'AT_LEAST_ONE';
  if (t instanceof Te) return 'AT_LEAST_ONE_SEP';
  if (t instanceof me) return 'MANY_SEP';
  if (t instanceof Nt) return 'MANY';
  if (t instanceof St) return 'CONSUME';
  throw Error('non exhaustive match');
}
var ME = f(() => {
  tt();
  nf();
});
var sr = f(() => {
  nf();
  FE();
  ME();
});
function BE(t, e, r) {
  return [
    new Qt({
      definition: [new St({ terminalType: t.separator })].concat(t.definition),
    }),
  ].concat(e, r);
}
var Jn,
  of = f(() => {
    tt();
    sr();
    Jn = class {
      walk(e, r = []) {
        C(e.definition, (n, i) => {
          let o = be(e.definition, i + 1);
          if (n instanceof jt) this.walkProdRef(n, o, r);
          else if (n instanceof St) this.walkTerminal(n, o, r);
          else if (n instanceof Yt) this.walkFlat(n, o, r);
          else if (n instanceof Qt) this.walkOption(n, o, r);
          else if (n instanceof Ce) this.walkAtLeastOne(n, o, r);
          else if (n instanceof Te) this.walkAtLeastOneSep(n, o, r);
          else if (n instanceof me) this.walkManySep(n, o, r);
          else if (n instanceof Nt) this.walkMany(n, o, r);
          else if (n instanceof ge) this.walkOr(n, o, r);
          else throw Error('non exhaustive match');
        });
      }
      walkTerminal(e, r, n) {}
      walkProdRef(e, r, n) {}
      walkFlat(e, r, n) {
        let i = r.concat(n);
        this.walk(e, i);
      }
      walkOption(e, r, n) {
        let i = r.concat(n);
        this.walk(e, i);
      }
      walkAtLeastOne(e, r, n) {
        let i = [new Qt({ definition: e.definition })].concat(r, n);
        this.walk(e, i);
      }
      walkAtLeastOneSep(e, r, n) {
        let i = BE(e, r, n);
        this.walk(e, i);
      }
      walkMany(e, r, n) {
        let i = [new Qt({ definition: e.definition })].concat(r, n);
        this.walk(e, i);
      }
      walkManySep(e, r, n) {
        let i = BE(e, r, n);
        this.walk(e, i);
      }
      walkOr(e, r, n) {
        let i = r.concat(n);
        C(e.definition, (o) => {
          let a = new Yt({ definition: [o] });
          this.walk(a, i);
        });
      }
    };
  });
function Eo(t) {
  if (t instanceof jt) return Eo(t.referencedRule);
  if (t instanceof St) return TW(t);
  if (Bm(t)) return _W(t);
  if (Pm(t)) return CW(t);
  throw Error('non exhaustive match');
}
function _W(t) {
  let e = [],
    r = t.definition,
    n = 0,
    i = r.length > n,
    o,
    a = !0;
  for (; i && a; )
    (o = r[n]),
      (a = ko(o)),
      (e = e.concat(Eo(o))),
      (n = n + 1),
      (i = r.length > n);
  return $a(e);
}
function CW(t) {
  let e = z(t.definition, (r) => Eo(r));
  return $a(Ot(e));
}
function TW(t) {
  return [t.terminalType];
}
var Dm = f(() => {
  tt();
  sr();
});
var af,
  Um = f(() => {
    af = '_~IN~_';
  });
function PE(t) {
  let e = {};
  return (
    C(t, (r) => {
      let n = new zm(r).startWalking();
      Ve(e, n);
    }),
    e
  );
}
function kW(t, e) {
  return t.name + e + af;
}
var zm,
  DE = f(() => {
    of();
    Dm();
    tt();
    Um();
    sr();
    zm = class extends Jn {
      constructor(e) {
        super(), (this.topProd = e), (this.follows = {});
      }
      startWalking() {
        return this.walk(this.topProd), this.follows;
      }
      walkTerminal(e, r, n) {}
      walkProdRef(e, r, n) {
        let i = kW(e.referencedRule, e.idx) + this.topProd.name,
          o = r.concat(n),
          a = new Yt({ definition: o }),
          s = Eo(a);
        this.follows[i] = s;
      }
    };
  });
function ut(t) {
  return t.charCodeAt(0);
}
function sf(t, e) {
  Array.isArray(t)
    ? t.forEach(function (r) {
        e.push(r);
      })
    : e.push(t);
}
function Ga(t, e) {
  if (t[e] === !0) throw 'duplicate flag ' + e;
  let r = t[e];
  t[e] = !0;
}
function wo(t) {
  if (t === void 0) throw Error('Internal Error - Should never get here!');
  return !0;
}
function nl() {
  throw Error('Internal Error - Should never get here!');
}
function $m(t) {
  return t.type === 'Character';
}
var Wm = f(() => {});
var il,
  ol,
  qm,
  UE = f(() => {
    Wm();
    il = [];
    for (let t = ut('0'); t <= ut('9'); t++) il.push(t);
    ol = [ut('_')].concat(il);
    for (let t = ut('a'); t <= ut('z'); t++) ol.push(t);
    for (let t = ut('A'); t <= ut('Z'); t++) ol.push(t);
    qm = [
      ut(' '),
      ut('\f'),
      ut(`
`),
      ut('\r'),
      ut('	'),
      ut('\v'),
      ut('	'),
      ut('\xA0'),
      ut('\u1680'),
      ut('\u2000'),
      ut('\u2001'),
      ut('\u2002'),
      ut('\u2003'),
      ut('\u2004'),
      ut('\u2005'),
      ut('\u2006'),
      ut('\u2007'),
      ut('\u2008'),
      ut('\u2009'),
      ut('\u200A'),
      ut('\u2028'),
      ut('\u2029'),
      ut('\u202F'),
      ut('\u205F'),
      ut('\u3000'),
      ut('\uFEFF'),
    ];
  });
var EW,
  lf,
  wW,
  al,
  zE = f(() => {
    Wm();
    UE();
    (EW = /[0-9a-fA-F]/),
      (lf = /[0-9]/),
      (wW = /[1-9]/),
      (al = class {
        constructor() {
          (this.idx = 0), (this.input = ''), (this.groupIdx = 0);
        }
        saveState() {
          return { idx: this.idx, input: this.input, groupIdx: this.groupIdx };
        }
        restoreState(e) {
          (this.idx = e.idx),
            (this.input = e.input),
            (this.groupIdx = e.groupIdx);
        }
        pattern(e) {
          (this.idx = 0),
            (this.input = e),
            (this.groupIdx = 0),
            this.consumeChar('/');
          let r = this.disjunction();
          this.consumeChar('/');
          let n = {
            type: 'Flags',
            loc: { begin: this.idx, end: e.length },
            global: !1,
            ignoreCase: !1,
            multiLine: !1,
            unicode: !1,
            sticky: !1,
          };
          for (; this.isRegExpFlag(); )
            switch (this.popChar()) {
              case 'g':
                Ga(n, 'global');
                break;
              case 'i':
                Ga(n, 'ignoreCase');
                break;
              case 'm':
                Ga(n, 'multiLine');
                break;
              case 'u':
                Ga(n, 'unicode');
                break;
              case 'y':
                Ga(n, 'sticky');
                break;
            }
          if (this.idx !== this.input.length)
            throw Error('Redundant input: ' + this.input.substring(this.idx));
          return { type: 'Pattern', flags: n, value: r, loc: this.loc(0) };
        }
        disjunction() {
          let e = [],
            r = this.idx;
          for (e.push(this.alternative()); this.peekChar() === '|'; )
            this.consumeChar('|'), e.push(this.alternative());
          return { type: 'Disjunction', value: e, loc: this.loc(r) };
        }
        alternative() {
          let e = [],
            r = this.idx;
          for (; this.isTerm(); ) e.push(this.term());
          return { type: 'Alternative', value: e, loc: this.loc(r) };
        }
        term() {
          return this.isAssertion() ? this.assertion() : this.atom();
        }
        assertion() {
          let e = this.idx;
          switch (this.popChar()) {
            case '^':
              return { type: 'StartAnchor', loc: this.loc(e) };
            case '$':
              return { type: 'EndAnchor', loc: this.loc(e) };
            case '\\':
              switch (this.popChar()) {
                case 'b':
                  return { type: 'WordBoundary', loc: this.loc(e) };
                case 'B':
                  return { type: 'NonWordBoundary', loc: this.loc(e) };
              }
              throw Error('Invalid Assertion Escape');
            case '(':
              this.consumeChar('?');
              let r;
              switch (this.popChar()) {
                case '=':
                  r = 'Lookahead';
                  break;
                case '!':
                  r = 'NegativeLookahead';
                  break;
              }
              wo(r);
              let n = this.disjunction();
              return (
                this.consumeChar(')'), { type: r, value: n, loc: this.loc(e) }
              );
          }
          return nl();
        }
        quantifier(e = !1) {
          let r,
            n = this.idx;
          switch (this.popChar()) {
            case '*':
              r = { atLeast: 0, atMost: 1 / 0 };
              break;
            case '+':
              r = { atLeast: 1, atMost: 1 / 0 };
              break;
            case '?':
              r = { atLeast: 0, atMost: 1 };
              break;
            case '{':
              let i = this.integerIncludingZero();
              switch (this.popChar()) {
                case '}':
                  r = { atLeast: i, atMost: i };
                  break;
                case ',':
                  let o;
                  this.isDigit()
                    ? ((o = this.integerIncludingZero()),
                      (r = { atLeast: i, atMost: o }))
                    : (r = { atLeast: i, atMost: 1 / 0 }),
                    this.consumeChar('}');
                  break;
              }
              if (e === !0 && r === void 0) return;
              wo(r);
              break;
          }
          if (!(e === !0 && r === void 0) && wo(r))
            return (
              this.peekChar(0) === '?'
                ? (this.consumeChar('?'), (r.greedy = !1))
                : (r.greedy = !0),
              (r.type = 'Quantifier'),
              (r.loc = this.loc(n)),
              r
            );
        }
        atom() {
          let e,
            r = this.idx;
          switch (this.peekChar()) {
            case '.':
              e = this.dotAll();
              break;
            case '\\':
              e = this.atomEscape();
              break;
            case '[':
              e = this.characterClass();
              break;
            case '(':
              e = this.group();
              break;
          }
          return (
            e === void 0 &&
              this.isPatternCharacter() &&
              (e = this.patternCharacter()),
            wo(e)
              ? ((e.loc = this.loc(r)),
                this.isQuantifier() && (e.quantifier = this.quantifier()),
                e)
              : nl()
          );
        }
        dotAll() {
          return (
            this.consumeChar('.'),
            {
              type: 'Set',
              complement: !0,
              value: [
                ut(`
`),
                ut('\r'),
                ut('\u2028'),
                ut('\u2029'),
              ],
            }
          );
        }
        atomEscape() {
          switch ((this.consumeChar('\\'), this.peekChar())) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              return this.decimalEscapeAtom();
            case 'd':
            case 'D':
            case 's':
            case 'S':
            case 'w':
            case 'W':
              return this.characterClassEscape();
            case 'f':
            case 'n':
            case 'r':
            case 't':
            case 'v':
              return this.controlEscapeAtom();
            case 'c':
              return this.controlLetterEscapeAtom();
            case '0':
              return this.nulCharacterAtom();
            case 'x':
              return this.hexEscapeSequenceAtom();
            case 'u':
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        }
        decimalEscapeAtom() {
          return { type: 'GroupBackReference', value: this.positiveInteger() };
        }
        characterClassEscape() {
          let e,
            r = !1;
          switch (this.popChar()) {
            case 'd':
              e = il;
              break;
            case 'D':
              (e = il), (r = !0);
              break;
            case 's':
              e = qm;
              break;
            case 'S':
              (e = qm), (r = !0);
              break;
            case 'w':
              e = ol;
              break;
            case 'W':
              (e = ol), (r = !0);
              break;
          }
          return wo(e) ? { type: 'Set', value: e, complement: r } : nl();
        }
        controlEscapeAtom() {
          let e;
          switch (this.popChar()) {
            case 'f':
              e = ut('\f');
              break;
            case 'n':
              e = ut(`
`);
              break;
            case 'r':
              e = ut('\r');
              break;
            case 't':
              e = ut('	');
              break;
            case 'v':
              e = ut('\v');
              break;
          }
          return wo(e) ? { type: 'Character', value: e } : nl();
        }
        controlLetterEscapeAtom() {
          this.consumeChar('c');
          let e = this.popChar();
          if (/[a-zA-Z]/.test(e) === !1) throw Error('Invalid ');
          return {
            type: 'Character',
            value: e.toUpperCase().charCodeAt(0) - 64,
          };
        }
        nulCharacterAtom() {
          return this.consumeChar('0'), { type: 'Character', value: ut('\0') };
        }
        hexEscapeSequenceAtom() {
          return this.consumeChar('x'), this.parseHexDigits(2);
        }
        regExpUnicodeEscapeSequenceAtom() {
          return this.consumeChar('u'), this.parseHexDigits(4);
        }
        identityEscapeAtom() {
          let e = this.popChar();
          return { type: 'Character', value: ut(e) };
        }
        classPatternCharacterAtom() {
          switch (this.peekChar()) {
            case `
`:
            case '\r':
            case '\u2028':
            case '\u2029':
            case '\\':
            case ']':
              throw Error('TBD');
            default:
              let e = this.popChar();
              return { type: 'Character', value: ut(e) };
          }
        }
        characterClass() {
          let e = [],
            r = !1;
          for (
            this.consumeChar('['),
              this.peekChar(0) === '^' && (this.consumeChar('^'), (r = !0));
            this.isClassAtom();

          ) {
            let n = this.classAtom(),
              i = n.type === 'Character';
            if ($m(n) && this.isRangeDash()) {
              this.consumeChar('-');
              let o = this.classAtom(),
                a = o.type === 'Character';
              if ($m(o)) {
                if (o.value < n.value)
                  throw Error('Range out of order in character class');
                e.push({ from: n.value, to: o.value });
              } else sf(n.value, e), e.push(ut('-')), sf(o.value, e);
            } else sf(n.value, e);
          }
          return (
            this.consumeChar(']'), { type: 'Set', complement: r, value: e }
          );
        }
        classAtom() {
          switch (this.peekChar()) {
            case ']':
            case `
`:
            case '\r':
            case '\u2028':
            case '\u2029':
              throw Error('TBD');
            case '\\':
              return this.classEscape();
            default:
              return this.classPatternCharacterAtom();
          }
        }
        classEscape() {
          switch ((this.consumeChar('\\'), this.peekChar())) {
            case 'b':
              return (
                this.consumeChar('b'), { type: 'Character', value: ut('\b') }
              );
            case 'd':
            case 'D':
            case 's':
            case 'S':
            case 'w':
            case 'W':
              return this.characterClassEscape();
            case 'f':
            case 'n':
            case 'r':
            case 't':
            case 'v':
              return this.controlEscapeAtom();
            case 'c':
              return this.controlLetterEscapeAtom();
            case '0':
              return this.nulCharacterAtom();
            case 'x':
              return this.hexEscapeSequenceAtom();
            case 'u':
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        }
        group() {
          let e = !0;
          switch ((this.consumeChar('('), this.peekChar(0))) {
            case '?':
              this.consumeChar('?'), this.consumeChar(':'), (e = !1);
              break;
            default:
              this.groupIdx++;
              break;
          }
          let r = this.disjunction();
          this.consumeChar(')');
          let n = { type: 'Group', capturing: e, value: r };
          return e && (n.idx = this.groupIdx), n;
        }
        positiveInteger() {
          let e = this.popChar();
          if (wW.test(e) === !1) throw Error('Expecting a positive integer');
          for (; lf.test(this.peekChar(0)); ) e += this.popChar();
          return parseInt(e, 10);
        }
        integerIncludingZero() {
          let e = this.popChar();
          if (lf.test(e) === !1) throw Error('Expecting an integer');
          for (; lf.test(this.peekChar(0)); ) e += this.popChar();
          return parseInt(e, 10);
        }
        patternCharacter() {
          let e = this.popChar();
          switch (e) {
            case `
`:
            case '\r':
            case '\u2028':
            case '\u2029':
            case '^':
            case '$':
            case '\\':
            case '.':
            case '*':
            case '+':
            case '?':
            case '(':
            case ')':
            case '[':
            case '|':
              throw Error('TBD');
            default:
              return { type: 'Character', value: ut(e) };
          }
        }
        isRegExpFlag() {
          switch (this.peekChar(0)) {
            case 'g':
            case 'i':
            case 'm':
            case 'u':
            case 'y':
              return !0;
            default:
              return !1;
          }
        }
        isRangeDash() {
          return this.peekChar() === '-' && this.isClassAtom(1);
        }
        isDigit() {
          return lf.test(this.peekChar(0));
        }
        isClassAtom(e = 0) {
          switch (this.peekChar(e)) {
            case ']':
            case `
`:
            case '\r':
            case '\u2028':
            case '\u2029':
              return !1;
            default:
              return !0;
          }
        }
        isTerm() {
          return this.isAtom() || this.isAssertion();
        }
        isAtom() {
          if (this.isPatternCharacter()) return !0;
          switch (this.peekChar(0)) {
            case '.':
            case '\\':
            case '[':
            case '(':
              return !0;
            default:
              return !1;
          }
        }
        isAssertion() {
          switch (this.peekChar(0)) {
            case '^':
            case '$':
              return !0;
            case '\\':
              switch (this.peekChar(1)) {
                case 'b':
                case 'B':
                  return !0;
                default:
                  return !1;
              }
            case '(':
              return (
                this.peekChar(1) === '?' &&
                (this.peekChar(2) === '=' || this.peekChar(2) === '!')
              );
            default:
              return !1;
          }
        }
        isQuantifier() {
          let e = this.saveState();
          try {
            return this.quantifier(!0) !== void 0;
          } catch {
            return !1;
          } finally {
            this.restoreState(e);
          }
        }
        isPatternCharacter() {
          switch (this.peekChar()) {
            case '^':
            case '$':
            case '\\':
            case '.':
            case '*':
            case '+':
            case '?':
            case '(':
            case ')':
            case '[':
            case '|':
            case '/':
            case `
`:
            case '\r':
            case '\u2028':
            case '\u2029':
              return !1;
            default:
              return !0;
          }
        }
        parseHexDigits(e) {
          let r = '';
          for (let i = 0; i < e; i++) {
            let o = this.popChar();
            if (EW.test(o) === !1) throw Error('Expecting a HexDecimal digits');
            r += o;
          }
          return { type: 'Character', value: parseInt(r, 16) };
        }
        peekChar(e = 0) {
          return this.input[this.idx + e];
        }
        popChar() {
          let e = this.peekChar(0);
          return this.consumeChar(void 0), e;
        }
        consumeChar(e) {
          if (e !== void 0 && this.input[this.idx] !== e)
            throw Error(
              "Expected: '" +
                e +
                "' but found: '" +
                this.input[this.idx] +
                "' at offset: " +
                this.idx
            );
          if (this.idx >= this.input.length)
            throw Error('Unexpected end of input');
          this.idx++;
        }
        loc(e) {
          return { begin: e, end: this.idx };
        }
      });
  });
var Ri,
  $E = f(() => {
    Ri = class {
      visitChildren(e) {
        for (let r in e) {
          let n = e[r];
          e.hasOwnProperty(r) &&
            (n.type !== void 0
              ? this.visit(n)
              : Array.isArray(n) &&
                n.forEach((i) => {
                  this.visit(i);
                }, this));
        }
      }
      visit(e) {
        switch (e.type) {
          case 'Pattern':
            this.visitPattern(e);
            break;
          case 'Flags':
            this.visitFlags(e);
            break;
          case 'Disjunction':
            this.visitDisjunction(e);
            break;
          case 'Alternative':
            this.visitAlternative(e);
            break;
          case 'StartAnchor':
            this.visitStartAnchor(e);
            break;
          case 'EndAnchor':
            this.visitEndAnchor(e);
            break;
          case 'WordBoundary':
            this.visitWordBoundary(e);
            break;
          case 'NonWordBoundary':
            this.visitNonWordBoundary(e);
            break;
          case 'Lookahead':
            this.visitLookahead(e);
            break;
          case 'NegativeLookahead':
            this.visitNegativeLookahead(e);
            break;
          case 'Character':
            this.visitCharacter(e);
            break;
          case 'Set':
            this.visitSet(e);
            break;
          case 'Group':
            this.visitGroup(e);
            break;
          case 'GroupBackReference':
            this.visitGroupBackReference(e);
            break;
          case 'Quantifier':
            this.visitQuantifier(e);
            break;
        }
        this.visitChildren(e);
      }
      visitPattern(e) {}
      visitFlags(e) {}
      visitDisjunction(e) {}
      visitAlternative(e) {}
      visitStartAnchor(e) {}
      visitEndAnchor(e) {}
      visitWordBoundary(e) {}
      visitNonWordBoundary(e) {}
      visitLookahead(e) {}
      visitNegativeLookahead(e) {}
      visitCharacter(e) {}
      visitSet(e) {}
      visitGroup(e) {}
      visitGroupBackReference(e) {}
      visitQuantifier(e) {}
    };
  });
var cf = f(() => {
  zE();
  $E();
});
function ja(t) {
  let e = t.toString();
  if (uf.hasOwnProperty(e)) return uf[e];
  {
    let r = SW.pattern(e);
    return (uf[e] = r), r;
  }
}
function WE() {
  uf = {};
}
var uf,
  SW,
  ff = f(() => {
    cf();
    (uf = {}), (SW = new al());
  });
function GE(t, e = !1) {
  try {
    let r = ja(t);
    return Hm(r.value, {}, r.flags.ignoreCase);
  } catch (r) {
    if (r.message === HE)
      e &&
        tl(`${sl}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let n = '';
      e &&
        (n = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),
        Wa(
          `${sl}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + n
        );
    }
  }
  return [];
}
function Hm(t, e, r) {
  switch (t.type) {
    case 'Disjunction':
      for (let i = 0; i < t.value.length; i++) Hm(t.value[i], e, r);
      break;
    case 'Alternative':
      let n = t.value;
      for (let i = 0; i < n.length; i++) {
        let o = n[i];
        switch (o.type) {
          case 'EndAnchor':
          case 'GroupBackReference':
          case 'Lookahead':
          case 'NegativeLookahead':
          case 'StartAnchor':
          case 'WordBoundary':
          case 'NonWordBoundary':
            continue;
        }
        let a = o;
        switch (a.type) {
          case 'Character':
            hf(a.value, e, r);
            break;
          case 'Set':
            if (a.complement === !0) throw Error(HE);
            C(a.value, (l) => {
              if (typeof l == 'number') hf(l, e, r);
              else {
                let c = l;
                if (r === !0) for (let u = c.from; u <= c.to; u++) hf(u, e, r);
                else {
                  for (let u = c.from; u <= c.to && u < Ya; u++) hf(u, e, r);
                  if (c.to >= Ya) {
                    let u = c.from >= Ya ? c.from : Ya,
                      h = c.to,
                      p = Mn(u),
                      d = Mn(h);
                    for (let m = p; m <= d; m++) e[m] = m;
                  }
                }
              }
            });
            break;
          case 'Group':
            Hm(a.value, e, r);
            break;
          default:
            throw Error('Non Exhaustive Match');
        }
        let s = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          (a.type === 'Group' && Gm(a) === !1) ||
          (a.type !== 'Group' && s === !1)
        )
          break;
      }
      break;
    default:
      throw Error('non exhaustive match!');
  }
  return _t(e);
}
function hf(t, e, r) {
  let n = Mn(t);
  (e[n] = n), r === !0 && vW(t, e);
}
function vW(t, e) {
  let r = String.fromCharCode(t),
    n = r.toUpperCase();
  if (n !== r) {
    let i = Mn(n.charCodeAt(0));
    e[i] = i;
  } else {
    let i = r.toLowerCase();
    if (i !== r) {
      let o = Mn(i.charCodeAt(0));
      e[o] = o;
    }
  }
}
function qE(t, e) {
  return nr(t.value, (r) => {
    if (typeof r == 'number') return re(e, r);
    {
      let n = r;
      return nr(e, (i) => n.from <= i && i <= n.to) !== void 0;
    }
  });
}
function Gm(t) {
  let e = t.quantifier;
  return e && e.atLeast === 0
    ? !0
    : t.value
    ? K(t.value)
      ? Je(t.value, Gm)
      : Gm(t.value)
    : !1;
}
function pf(t, e) {
  if (e instanceof RegExp) {
    let r = ja(e),
      n = new jm(t);
    return n.visit(r), n.found;
  } else return nr(e, (r) => re(t, r.charCodeAt(0))) !== void 0;
}
var HE,
  sl,
  jm,
  jE = f(() => {
    cf();
    tt();
    qa();
    ff();
    Ym();
    (HE = 'Complement Sets are not supported for first char optimization'),
      (sl = `Unable to use "first char" lexer optimizations:
`);
    jm = class extends Ri {
      constructor(e) {
        super(), (this.targetCharCodes = e), (this.found = !1);
      }
      visitChildren(e) {
        if (this.found !== !0) {
          switch (e.type) {
            case 'Lookahead':
              this.visitLookahead(e);
              return;
            case 'NegativeLookahead':
              this.visitNegativeLookahead(e);
              return;
          }
          super.visitChildren(e);
        }
      }
      visitCharacter(e) {
        re(this.targetCharCodes, e.value) && (this.found = !0);
      }
      visitSet(e) {
        e.complement
          ? qE(e, this.targetCharCodes) === void 0 && (this.found = !0)
          : qE(e, this.targetCharCodes) !== void 0 && (this.found = !0);
      }
    };
  });
function XE(t, e) {
  e = Ai(e, {
    useSticky: Xm,
    debug: !1,
    safeMode: !1,
    positionTracking: 'full',
    lineTerminatorCharacters: [
      '\r',
      `
`,
    ],
    tracer: (T, b) => b(),
  });
  let r = e.tracer;
  r('initCharCodeToOptimizedIndexMap', () => {
    GW();
  });
  let n;
  r('Reject Lexer.NA', () => {
    n = Oi(t, (T) => T[So] === fe.NA);
  });
  let i = !1,
    o;
  r('Transform Patterns', () => {
    (i = !1),
      (o = z(n, (T) => {
        let b = T[So];
        if (Kr(b)) {
          let N = b.source;
          return N.length === 1 &&
            N !== '^' &&
            N !== '$' &&
            N !== '.' &&
            !b.ignoreCase
            ? N
            : N.length === 2 &&
              N[0] === '\\' &&
              !re(
                [
                  'd',
                  'D',
                  's',
                  'S',
                  't',
                  'r',
                  'n',
                  't',
                  '0',
                  'c',
                  'b',
                  'B',
                  'f',
                  'v',
                  'w',
                  'W',
                ],
                N[1]
              )
            ? N[1]
            : e.useSticky
            ? VE(b)
            : YE(b);
        } else {
          if (we(b)) return (i = !0), { exec: b };
          if (typeof b == 'object') return (i = !0), b;
          if (typeof b == 'string') {
            if (b.length === 1) return b;
            {
              let N = b.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
                I = new RegExp(N);
              return e.useSticky ? VE(I) : YE(I);
            }
          } else throw Error('non exhaustive match');
        }
      }));
  });
  let a, s, l, c, u;
  r('misc mapping', () => {
    (a = z(n, (T) => T.tokenTypeIdx)),
      (s = z(n, (T) => {
        let b = T.GROUP;
        if (b !== fe.SKIPPED) {
          if (_e(b)) return b;
          if (xt(b)) return !1;
          throw Error('non exhaustive match');
        }
      })),
      (l = z(n, (T) => {
        let b = T.LONGER_ALT;
        if (b) return K(b) ? z(b, (I) => Ku(n, I)) : [Ku(n, b)];
      })),
      (c = z(n, (T) => T.PUSH_MODE)),
      (u = z(n, (T) => B(T, 'POP_MODE')));
  });
  let h;
  r('Line Terminator Handling', () => {
    let T = nw(e.lineTerminatorCharacters);
    (h = z(n, (b) => !1)),
      e.positionTracking !== 'onlyOffset' &&
        (h = z(n, (b) =>
          B(b, 'LINE_BREAKS')
            ? !!b.LINE_BREAKS
            : rw(b, T) === !1 && pf(T, b.PATTERN)
        ));
  });
  let p, d, m, g;
  r('Misc Mapping #2', () => {
    (p = z(n, tw)),
      (d = z(o, qW)),
      (m = Mt(
        n,
        (T, b) => {
          let N = b.GROUP;
          return _e(N) && N !== fe.SKIPPED && (T[N] = []), T;
        },
        {}
      )),
      (g = z(o, (T, b) => ({
        pattern: o[b],
        longerAlt: l[b],
        canLineTerminator: h[b],
        isCustom: p[b],
        short: d[b],
        group: s[b],
        push: c[b],
        pop: u[b],
        tokenTypeIdx: a[b],
        tokenType: n[b],
      })));
  });
  let E = !0,
    y = [];
  return (
    e.safeMode ||
      r('First Char Optimization', () => {
        y = Mt(
          n,
          (T, b, N) => {
            if (typeof b.PATTERN == 'string') {
              let I = b.PATTERN.charCodeAt(0),
                A = Mn(I);
              Vm(T, A, g[N]);
            } else if (K(b.START_CHARS_HINT)) {
              let I;
              C(b.START_CHARS_HINT, (A) => {
                let O = typeof A == 'string' ? A.charCodeAt(0) : A,
                  D = Mn(O);
                I !== D && ((I = D), Vm(T, D, g[N]));
              });
            } else if (Kr(b.PATTERN))
              if (b.PATTERN.unicode)
                (E = !1),
                  e.ensureOptimizations &&
                    Wa(`${sl}	Unable to analyze < ${b.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
              else {
                let I = GE(b.PATTERN, e.ensureOptimizations);
                dt(I) && (E = !1),
                  C(I, (A) => {
                    Vm(T, A, g[N]);
                  });
              }
            else
              e.ensureOptimizations &&
                Wa(`${sl}	TokenType: <${b.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),
                (E = !1);
            return T;
          },
          []
        );
      }),
    {
      emptyGroups: m,
      patternIdxToConfig: g,
      charCodeToPatternIdxToConfig: y,
      hasCustom: i,
      canBeOptimized: E,
    }
  );
}
function KE(t, e) {
  let r = [],
    n = LW(t);
  r = r.concat(n.errors);
  let i = IW(n.valid),
    o = i.valid;
  return (
    (r = r.concat(i.errors)),
    (r = r.concat(AW(o))),
    (r = r.concat(DW(o))),
    (r = r.concat(UW(o, e))),
    (r = r.concat(zW(o))),
    r
  );
}
function AW(t) {
  let e = [],
    r = Rt(t, (n) => Kr(n[So]));
  return (
    (e = e.concat(RW(r))),
    (e = e.concat(MW(r))),
    (e = e.concat(BW(r))),
    (e = e.concat(PW(r))),
    (e = e.concat(NW(r))),
    e
  );
}
function LW(t) {
  let e = Rt(t, (i) => !B(i, So)),
    r = z(e, (i) => ({
      message:
        'Token Type: ->' + i.name + "<- missing static 'PATTERN' property",
      type: ne.MISSING_PATTERN,
      tokenTypes: [i],
    })),
    n = Li(t, e);
  return { errors: r, valid: n };
}
function IW(t) {
  let e = Rt(t, (i) => {
      let o = i[So];
      return !Kr(o) && !we(o) && !B(o, 'exec') && !_e(o);
    }),
    r = z(e, (i) => ({
      message:
        'Token Type: ->' +
        i.name +
        "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
      type: ne.INVALID_PATTERN,
      tokenTypes: [i],
    })),
    n = Li(t, e);
  return { errors: r, valid: n };
}
function RW(t) {
  class e extends Ri {
    constructor() {
      super(...arguments), (this.found = !1);
    }
    visitEndAnchor(o) {
      this.found = !0;
    }
  }
  let r = Rt(t, (i) => {
    let o = i.PATTERN;
    try {
      let a = ja(o),
        s = new e();
      return s.visit(a), s.found;
    } catch {
      return OW.test(o.source);
    }
  });
  return z(r, (i) => ({
    message:
      `Unexpected RegExp Anchor Error:
	Token Type: ->` +
      i.name +
      `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: ne.EOI_ANCHOR_FOUND,
    tokenTypes: [i],
  }));
}
function NW(t) {
  let e = Rt(t, (n) => n.PATTERN.test(''));
  return z(e, (n) => ({
    message:
      'Token Type: ->' +
      n.name +
      "<- static 'PATTERN' must not match an empty string",
    type: ne.EMPTY_MATCH_PATTERN,
    tokenTypes: [n],
  }));
}
function MW(t) {
  class e extends Ri {
    constructor() {
      super(...arguments), (this.found = !1);
    }
    visitStartAnchor(o) {
      this.found = !0;
    }
  }
  let r = Rt(t, (i) => {
    let o = i.PATTERN;
    try {
      let a = ja(o),
        s = new e();
      return s.visit(a), s.found;
    } catch {
      return FW.test(o.source);
    }
  });
  return z(r, (i) => ({
    message:
      `Unexpected RegExp Anchor Error:
	Token Type: ->` +
      i.name +
      `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: ne.SOI_ANCHOR_FOUND,
    tokenTypes: [i],
  }));
}
function BW(t) {
  let e = Rt(t, (n) => {
    let i = n[So];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return z(e, (n) => ({
    message:
      'Token Type: ->' +
      n.name +
      "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: ne.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [n],
  }));
}
function PW(t) {
  let e = [],
    r = z(t, (o) =>
      Mt(
        t,
        (a, s) => (
          o.PATTERN.source === s.PATTERN.source &&
            !re(e, s) &&
            s.PATTERN !== fe.NA &&
            (e.push(s), a.push(s)),
          a
        ),
        []
      )
    );
  r = Nn(r);
  let n = Rt(r, (o) => o.length > 1);
  return z(n, (o) => {
    let a = z(o, (l) => l.name);
    return {
      message: `The same RegExp pattern ->${
        $e(o).PATTERN
      }<-has been used in all of the following Token Types: ${a.join(', ')} <-`,
      type: ne.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: o,
    };
  });
}
function DW(t) {
  let e = Rt(t, (n) => {
    if (!B(n, 'GROUP')) return !1;
    let i = n.GROUP;
    return i !== fe.SKIPPED && i !== fe.NA && !_e(i);
  });
  return z(e, (n) => ({
    message:
      'Token Type: ->' +
      n.name +
      "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: ne.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [n],
  }));
}
function UW(t, e) {
  let r = Rt(t, (i) => i.PUSH_MODE !== void 0 && !re(e, i.PUSH_MODE));
  return z(r, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: ne.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i],
  }));
}
function zW(t) {
  let e = [],
    r = Mt(
      t,
      (n, i, o) => {
        let a = i.PATTERN;
        return (
          a === fe.NA ||
            (_e(a)
              ? n.push({ str: a, idx: o, tokenType: i })
              : Kr(a) &&
                WW(a) &&
                n.push({ str: a.source, idx: o, tokenType: i })),
          n
        );
      },
      []
    );
  return (
    C(t, (n, i) => {
      C(r, ({ str: o, idx: a, tokenType: s }) => {
        if (i < a && $W(o, n.PATTERN)) {
          let l = `Token: ->${s.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
          e.push({
            message: l,
            type: ne.UNREACHABLE_PATTERN,
            tokenTypes: [n, s],
          });
        }
      });
    }),
    e
  );
}
function $W(t, e) {
  if (Kr(e)) {
    let r = e.exec(t);
    return r !== null && r.index === 0;
  } else {
    if (we(e)) return e(t, 0, [], {});
    if (B(e, 'exec')) return e.exec(t, 0, [], {});
    if (typeof e == 'string') return e === t;
    throw Error('non exhaustive match');
  }
}
function WW(t) {
  return (
    nr(
      ['.', '\\', '[', ']', '|', '^', '$', '(', ')', '?', '*', '+', '{'],
      (r) => t.source.indexOf(r) !== -1
    ) === void 0
  );
}
function YE(t) {
  let e = t.ignoreCase ? 'i' : '';
  return new RegExp(`^(?:${t.source})`, e);
}
function VE(t) {
  let e = t.ignoreCase ? 'iy' : 'y';
  return new RegExp(`${t.source}`, e);
}
function ZE(t, e, r) {
  let n = [];
  return (
    B(t, Va) ||
      n.push({
        message:
          'A MultiMode Lexer cannot be initialized without a <' +
          Va +
          `> property in its definition
`,
        type: ne.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE,
      }),
    B(t, df) ||
      n.push({
        message:
          'A MultiMode Lexer cannot be initialized without a <' +
          df +
          `> property in its definition
`,
        type: ne.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY,
      }),
    B(t, df) &&
      B(t, Va) &&
      !B(t.modes, t.defaultMode) &&
      n.push({
        message: `A MultiMode Lexer cannot be initialized with a ${Va}: <${t.defaultMode}>which does not exist
`,
        type: ne.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST,
      }),
    B(t, df) &&
      C(t.modes, (i, o) => {
        C(i, (a, s) => {
          if (xt(a))
            n.push({
              message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${s}>
`,
              type: ne.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED,
            });
          else if (B(a, 'LONGER_ALT')) {
            let l = K(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
            C(l, (c) => {
              !xt(c) &&
                !re(i, c) &&
                n.push({
                  message: `A MultiMode Lexer cannot be initialized with a longer_alt <${c.name}> on token <${a.name}> outside of mode <${o}>
`,
                  type: ne.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE,
                });
            });
          }
        });
      }),
    n
  );
}
function QE(t, e, r) {
  let n = [],
    i = !1,
    o = Nn(Ot(_t(t.modes))),
    a = Oi(o, (l) => l[So] === fe.NA),
    s = nw(r);
  return (
    e &&
      C(a, (l) => {
        let c = rw(l, s);
        if (c !== !1) {
          let h = { message: HW(l, c), type: c.issue, tokenType: l };
          n.push(h);
        } else
          B(l, 'LINE_BREAKS')
            ? l.LINE_BREAKS === !0 && (i = !0)
            : pf(s, l.PATTERN) && (i = !0);
      }),
    e &&
      !i &&
      n.push({
        message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
        type: ne.NO_LINE_BREAKS_FLAGS,
      }),
    n
  );
}
function JE(t) {
  let e = {},
    r = vt(t);
  return (
    C(r, (n) => {
      let i = t[n];
      if (K(i)) e[n] = [];
      else throw Error('non exhaustive match');
    }),
    e
  );
}
function tw(t) {
  let e = t.PATTERN;
  if (Kr(e)) return !1;
  if (we(e)) return !0;
  if (B(e, 'exec')) return !0;
  if (_e(e)) return !1;
  throw Error('non exhaustive match');
}
function qW(t) {
  return _e(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
function rw(t, e) {
  if (B(t, 'LINE_BREAKS')) return !1;
  if (Kr(t.PATTERN)) {
    try {
      pf(e, t.PATTERN);
    } catch (r) {
      return { issue: ne.IDENTIFY_TERMINATOR, errMsg: r.message };
    }
    return !1;
  } else {
    if (_e(t.PATTERN)) return !1;
    if (tw(t)) return { issue: ne.CUSTOM_LINE_BREAK };
    throw Error('non exhaustive match');
  }
}
function HW(t, e) {
  if (e.issue === ne.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === ne.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error('non exhaustive match');
}
function nw(t) {
  return z(t, (r) => (_e(r) ? r.charCodeAt(0) : r));
}
function Vm(t, e, r) {
  t[e] === void 0 ? (t[e] = [r]) : t[e].push(r);
}
function Mn(t) {
  return t < Ya ? t : mf[t];
}
function GW() {
  if (dt(mf)) {
    mf = new Array(65536);
    for (let t = 0; t < 65536; t++) mf[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
var So,
  Va,
  df,
  Xm,
  OW,
  FW,
  ew,
  Ya,
  mf,
  Ym = f(() => {
    cf();
    ll();
    tt();
    qa();
    jE();
    ff();
    (So = 'PATTERN'),
      (Va = 'defaultMode'),
      (df = 'modes'),
      (Xm = typeof new RegExp('(?:)').sticky == 'boolean');
    OW = /[^\\][$]/;
    FW = /[^\\[][\^]|^\^/;
    ew = {
      test: function (t) {
        let e = t.length;
        for (let r = this.lastIndex; r < e; r++) {
          let n = t.charCodeAt(r);
          if (n === 10) return (this.lastIndex = r + 1), !0;
          if (n === 13)
            return (
              t.charCodeAt(r + 1) === 10
                ? (this.lastIndex = r + 2)
                : (this.lastIndex = r + 1),
              !0
            );
        }
        return !1;
      },
      lastIndex: 0,
    };
    (Ya = 256), (mf = []);
  });
function ti(t, e) {
  let r = t.tokenTypeIdx;
  return r === e.tokenTypeIdx
    ? !0
    : e.isParent === !0 && e.categoryMatchesMap[r] === !0;
}
function Xa(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
function ei(t) {
  let e = jW(t);
  YW(e),
    XW(e),
    VW(e),
    C(e, (r) => {
      r.isParent = r.categoryMatches.length > 0;
    });
}
function jW(t) {
  let e = Ut(t),
    r = t,
    n = !0;
  for (; n; ) {
    r = Nn(Ot(z(r, (o) => o.CATEGORIES)));
    let i = Li(r, e);
    (e = e.concat(i)), dt(i) ? (n = !1) : (r = i);
  }
  return e;
}
function YW(t) {
  C(t, (e) => {
    Km(e) || ((aw[iw] = e), (e.tokenTypeIdx = iw++)),
      ow(e) && !K(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]),
      ow(e) || (e.CATEGORIES = []),
      KW(e) || (e.categoryMatches = []),
      ZW(e) || (e.categoryMatchesMap = {});
  });
}
function VW(t) {
  C(t, (e) => {
    (e.categoryMatches = []),
      C(e.categoryMatchesMap, (r, n) => {
        e.categoryMatches.push(aw[n].tokenTypeIdx);
      });
  });
}
function XW(t) {
  C(t, (e) => {
    sw([], e);
  });
}
function sw(t, e) {
  C(t, (r) => {
    e.categoryMatchesMap[r.tokenTypeIdx] = !0;
  }),
    C(e.CATEGORIES, (r) => {
      let n = t.concat(e);
      re(n, r) || sw(n, r);
    });
}
function Km(t) {
  return B(t, 'tokenTypeIdx');
}
function ow(t) {
  return B(t, 'CATEGORIES');
}
function KW(t) {
  return B(t, 'categoryMatches');
}
function ZW(t) {
  return B(t, 'categoryMatchesMap');
}
function lw(t) {
  return B(t, 'tokenTypeIdx');
}
var iw,
  aw,
  vo = f(() => {
    tt();
    (iw = 1), (aw = {});
  });
var Zm,
  Qm = f(() => {
    Zm = {
      buildUnableToPopLexerModeMessage(t) {
        return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
      },
      buildUnexpectedCharactersMessage(t, e, r, n, i) {
        return `unexpected character: ->${t.charAt(
          e
        )}<- at offset: ${e}, skipped ${r} characters.`;
      },
    };
  });
var ne,
  cl,
  fe,
  ll = f(() => {
    Ym();
    tt();
    qa();
    vo();
    Qm();
    ff();
    (function (t) {
      (t[(t.MISSING_PATTERN = 0)] = 'MISSING_PATTERN'),
        (t[(t.INVALID_PATTERN = 1)] = 'INVALID_PATTERN'),
        (t[(t.EOI_ANCHOR_FOUND = 2)] = 'EOI_ANCHOR_FOUND'),
        (t[(t.UNSUPPORTED_FLAGS_FOUND = 3)] = 'UNSUPPORTED_FLAGS_FOUND'),
        (t[(t.DUPLICATE_PATTERNS_FOUND = 4)] = 'DUPLICATE_PATTERNS_FOUND'),
        (t[(t.INVALID_GROUP_TYPE_FOUND = 5)] = 'INVALID_GROUP_TYPE_FOUND'),
        (t[(t.PUSH_MODE_DOES_NOT_EXIST = 6)] = 'PUSH_MODE_DOES_NOT_EXIST'),
        (t[(t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7)] =
          'MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE'),
        (t[(t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8)] =
          'MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY'),
        (t[(t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9)] =
          'MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST'),
        (t[(t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10)] =
          'LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED'),
        (t[(t.SOI_ANCHOR_FOUND = 11)] = 'SOI_ANCHOR_FOUND'),
        (t[(t.EMPTY_MATCH_PATTERN = 12)] = 'EMPTY_MATCH_PATTERN'),
        (t[(t.NO_LINE_BREAKS_FLAGS = 13)] = 'NO_LINE_BREAKS_FLAGS'),
        (t[(t.UNREACHABLE_PATTERN = 14)] = 'UNREACHABLE_PATTERN'),
        (t[(t.IDENTIFY_TERMINATOR = 15)] = 'IDENTIFY_TERMINATOR'),
        (t[(t.CUSTOM_LINE_BREAK = 16)] = 'CUSTOM_LINE_BREAK'),
        (t[(t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17)] =
          'MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE');
    })(ne || (ne = {}));
    cl = {
      deferDefinitionErrorsHandling: !1,
      positionTracking: 'full',
      lineTerminatorsPattern: /\n|\r\n?/g,
      lineTerminatorCharacters: [
        `
`,
        '\r',
      ],
      ensureOptimizations: !1,
      safeMode: !1,
      errorMessageProvider: Zm,
      traceInitPerf: !1,
      skipValidations: !1,
      recoveryEnabled: !0,
    };
    Object.freeze(cl);
    fe = class {
      constructor(e, r = cl) {
        if (
          ((this.lexerDefinition = e),
          (this.lexerDefinitionErrors = []),
          (this.lexerDefinitionWarning = []),
          (this.patternIdxToConfig = {}),
          (this.charCodeToPatternIdxToConfig = {}),
          (this.modes = []),
          (this.emptyGroups = {}),
          (this.trackStartLines = !0),
          (this.trackEndLines = !0),
          (this.hasCustom = !1),
          (this.canModeBeOptimized = {}),
          (this.TRACE_INIT = (i, o) => {
            if (this.traceInitPerf === !0) {
              this.traceInitIndent++;
              let a = new Array(this.traceInitIndent + 1).join('	');
              this.traceInitIndent < this.traceInitMaxIdent &&
                console.log(`${a}--> <${i}>`);
              let { time: s, value: l } = el(o),
                c = s > 10 ? console.warn : console.log;
              return (
                this.traceInitIndent < this.traceInitMaxIdent &&
                  c(`${a}<-- <${i}> time: ${s}ms`),
                this.traceInitIndent--,
                l
              );
            } else return o();
          }),
          typeof r == 'boolean')
        )
          throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
        this.config = Ve({}, cl, r);
        let n = this.config.traceInitPerf;
        n === !0
          ? ((this.traceInitMaxIdent = 1 / 0), (this.traceInitPerf = !0))
          : typeof n == 'number' &&
            ((this.traceInitMaxIdent = n), (this.traceInitPerf = !0)),
          (this.traceInitIndent = -1),
          this.TRACE_INIT('Lexer Constructor', () => {
            let i,
              o = !0;
            this.TRACE_INIT('Lexer Config handling', () => {
              if (
                this.config.lineTerminatorsPattern === cl.lineTerminatorsPattern
              )
                this.config.lineTerminatorsPattern = ew;
              else if (
                this.config.lineTerminatorCharacters ===
                cl.lineTerminatorCharacters
              )
                throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
              if (r.safeMode && r.ensureOptimizations)
                throw Error(
                  '"safeMode" and "ensureOptimizations" flags are mutually exclusive.'
                );
              (this.trackStartLines = /full|onlyStart/i.test(
                this.config.positionTracking
              )),
                (this.trackEndLines = /full/i.test(
                  this.config.positionTracking
                )),
                K(e)
                  ? (i = { modes: { defaultMode: Ut(e) }, defaultMode: Va })
                  : ((o = !1), (i = Ut(e)));
            }),
              this.config.skipValidations === !1 &&
                (this.TRACE_INIT('performRuntimeChecks', () => {
                  this.lexerDefinitionErrors =
                    this.lexerDefinitionErrors.concat(
                      ZE(
                        i,
                        this.trackStartLines,
                        this.config.lineTerminatorCharacters
                      )
                    );
                }),
                this.TRACE_INIT('performWarningRuntimeChecks', () => {
                  this.lexerDefinitionWarning =
                    this.lexerDefinitionWarning.concat(
                      QE(
                        i,
                        this.trackStartLines,
                        this.config.lineTerminatorCharacters
                      )
                    );
                })),
              (i.modes = i.modes ? i.modes : {}),
              C(i.modes, (s, l) => {
                i.modes[l] = Oi(s, (c) => xt(c));
              });
            let a = vt(i.modes);
            if (
              (C(i.modes, (s, l) => {
                this.TRACE_INIT(`Mode: <${l}> processing`, () => {
                  if (
                    (this.modes.push(l),
                    this.config.skipValidations === !1 &&
                      this.TRACE_INIT('validatePatterns', () => {
                        this.lexerDefinitionErrors =
                          this.lexerDefinitionErrors.concat(KE(s, a));
                      }),
                    dt(this.lexerDefinitionErrors))
                  ) {
                    ei(s);
                    let c;
                    this.TRACE_INIT('analyzeTokenTypes', () => {
                      c = XE(s, {
                        lineTerminatorCharacters:
                          this.config.lineTerminatorCharacters,
                        positionTracking: r.positionTracking,
                        ensureOptimizations: r.ensureOptimizations,
                        safeMode: r.safeMode,
                        tracer: this.TRACE_INIT,
                      });
                    }),
                      (this.patternIdxToConfig[l] = c.patternIdxToConfig),
                      (this.charCodeToPatternIdxToConfig[l] =
                        c.charCodeToPatternIdxToConfig),
                      (this.emptyGroups = Ve(
                        {},
                        this.emptyGroups,
                        c.emptyGroups
                      )),
                      (this.hasCustom = c.hasCustom || this.hasCustom),
                      (this.canModeBeOptimized[l] = c.canBeOptimized);
                  }
                });
              }),
              (this.defaultMode = i.defaultMode),
              !dt(this.lexerDefinitionErrors) &&
                !this.config.deferDefinitionErrorsHandling)
            ) {
              let l = z(this.lexerDefinitionErrors, (c) => c.message)
                .join(`-----------------------
`);
              throw new Error(
                `Errors detected in definition of Lexer:
` + l
              );
            }
            C(this.lexerDefinitionWarning, (s) => {
              tl(s.message);
            }),
              this.TRACE_INIT('Choosing sub-methods implementations', () => {
                if (
                  (Xm
                    ? ((this.chopInput = ze), (this.match = this.matchWithTest))
                    : ((this.updateLastIndex = ue),
                      (this.match = this.matchWithExec)),
                  o && (this.handleModes = ue),
                  this.trackStartLines === !1 && (this.computeNewColumn = ze),
                  this.trackEndLines === !1 &&
                    (this.updateTokenEndLineColumnLocation = ue),
                  /full/i.test(this.config.positionTracking))
                )
                  this.createTokenInstance = this.createFullToken;
                else if (/onlyStart/i.test(this.config.positionTracking))
                  this.createTokenInstance = this.createStartOnlyToken;
                else if (/onlyOffset/i.test(this.config.positionTracking))
                  this.createTokenInstance = this.createOffsetOnlyToken;
                else
                  throw Error(
                    `Invalid <positionTracking> config option: "${this.config.positionTracking}"`
                  );
                this.hasCustom
                  ? ((this.addToken = this.addTokenUsingPush),
                    (this.handlePayload = this.handlePayloadWithCustom))
                  : ((this.addToken = this.addTokenUsingMemberAccess),
                    (this.handlePayload = this.handlePayloadNoCustom));
              }),
              this.TRACE_INIT('Failed Optimization Warnings', () => {
                let s = Mt(
                  this.canModeBeOptimized,
                  (l, c, u) => (c === !1 && l.push(u), l),
                  []
                );
                if (r.ensureOptimizations && !dt(s))
                  throw Error(`Lexer Modes: < ${s.join(
                    ', '
                  )} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
              }),
              this.TRACE_INIT('clearRegExpParserCache', () => {
                WE();
              }),
              this.TRACE_INIT('toFastProperties', () => {
                rl(this);
              });
          });
      }
      tokenize(e, r = this.defaultMode) {
        if (!dt(this.lexerDefinitionErrors)) {
          let i = z(this.lexerDefinitionErrors, (o) => o.message)
            .join(`-----------------------
`);
          throw new Error(
            `Unable to Tokenize because Errors detected in definition of Lexer:
` + i
          );
        }
        return this.tokenizeInternal(e, r);
      }
      tokenizeInternal(e, r) {
        let n,
          i,
          o,
          a,
          s,
          l,
          c,
          u,
          h,
          p,
          d,
          m,
          g,
          E,
          y,
          T,
          b = e,
          N = b.length,
          I = 0,
          A = 0,
          O = this.hasCustom ? 0 : Math.floor(e.length / 10),
          D = new Array(O),
          J = [],
          st = this.trackStartLines ? 1 : void 0,
          R = this.trackStartLines ? 1 : void 0,
          L = JE(this.emptyGroups),
          v = this.trackStartLines,
          U = this.config.lineTerminatorsPattern,
          M = 0,
          H = [],
          j = [],
          it = [],
          ht = [];
        Object.freeze(ht);
        let x;
        function Et() {
          return H;
        }
        function Xt(bt) {
          let gt = Mn(bt),
            G = j[gt];
          return G === void 0 ? ht : G;
        }
        let _ = (bt) => {
          if (it.length === 1 && bt.tokenType.PUSH_MODE === void 0) {
            let gt =
              this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(
                bt
              );
            J.push({
              offset: bt.startOffset,
              line: bt.startLine,
              column: bt.startColumn,
              length: bt.image.length,
              message: gt,
            });
          } else {
            it.pop();
            let gt = Xe(it);
            (H = this.patternIdxToConfig[gt]),
              (j = this.charCodeToPatternIdxToConfig[gt]),
              (M = H.length);
            let G = this.canModeBeOptimized[gt] && this.config.safeMode === !1;
            j && G ? (x = Xt) : (x = Et);
          }
        };
        function qt(bt) {
          it.push(bt),
            (j = this.charCodeToPatternIdxToConfig[bt]),
            (H = this.patternIdxToConfig[bt]),
            (M = H.length),
            (M = H.length);
          let gt = this.canModeBeOptimized[bt] && this.config.safeMode === !1;
          j && gt ? (x = Xt) : (x = Et);
        }
        qt.call(this, r);
        let Pt,
          Fe = this.config.recoveryEnabled;
        for (; I < N; ) {
          l = null;
          let bt = b.charCodeAt(I),
            gt = x(bt),
            G = gt.length;
          for (n = 0; n < G; n++) {
            Pt = gt[n];
            let X = Pt.pattern;
            c = null;
            let ct = Pt.short;
            if (
              (ct !== !1
                ? bt === ct && (l = X)
                : Pt.isCustom === !0
                ? ((T = X.exec(b, I, D, L)),
                  T !== null
                    ? ((l = T[0]), T.payload !== void 0 && (c = T.payload))
                    : (l = null))
                : (this.updateLastIndex(X, I), (l = this.match(X, e, I))),
              l !== null)
            ) {
              if (((s = Pt.longerAlt), s !== void 0)) {
                let P = s.length;
                for (o = 0; o < P; o++) {
                  let Lt = H[s[o]],
                    Ct = Lt.pattern;
                  if (
                    ((u = null),
                    Lt.isCustom === !0
                      ? ((T = Ct.exec(b, I, D, L)),
                        T !== null
                          ? ((a = T[0]),
                            T.payload !== void 0 && (u = T.payload))
                          : (a = null))
                      : (this.updateLastIndex(Ct, I),
                        (a = this.match(Ct, e, I))),
                    a && a.length > l.length)
                  ) {
                    (l = a), (c = u), (Pt = Lt);
                    break;
                  }
                }
              }
              break;
            }
          }
          if (l !== null) {
            if (
              ((h = l.length),
              (p = Pt.group),
              p !== void 0 &&
                ((d = Pt.tokenTypeIdx),
                (m = this.createTokenInstance(l, I, d, Pt.tokenType, st, R, h)),
                this.handlePayload(m, c),
                p === !1 ? (A = this.addToken(D, A, m)) : L[p].push(m)),
              (e = this.chopInput(e, h)),
              (I = I + h),
              (R = this.computeNewColumn(R, h)),
              v === !0 && Pt.canLineTerminator === !0)
            ) {
              let X = 0,
                ct,
                P;
              U.lastIndex = 0;
              do (ct = U.test(l)), ct === !0 && ((P = U.lastIndex - 1), X++);
              while (ct === !0);
              X !== 0 &&
                ((st = st + X),
                (R = h - P),
                this.updateTokenEndLineColumnLocation(m, p, P, X, st, R, h));
            }
            this.handleModes(Pt, _, qt, m);
          } else {
            let X = I,
              ct = st,
              P = R,
              Lt = Fe === !1;
            for (; Lt === !1 && I < N; )
              for (e = this.chopInput(e, 1), I++, i = 0; i < M; i++) {
                let Ct = H[i],
                  pt = Ct.pattern,
                  V = Ct.short;
                if (
                  (V !== !1
                    ? b.charCodeAt(I) === V && (Lt = !0)
                    : Ct.isCustom === !0
                    ? (Lt = pt.exec(b, I, D, L) !== null)
                    : (this.updateLastIndex(pt, I), (Lt = pt.exec(e) !== null)),
                  Lt === !0)
                )
                  break;
              }
            if (
              ((g = I - X),
              (R = this.computeNewColumn(R, g)),
              (y =
                this.config.errorMessageProvider.buildUnexpectedCharactersMessage(
                  b,
                  X,
                  g,
                  ct,
                  P
                )),
              J.push({ offset: X, line: ct, column: P, length: g, message: y }),
              Fe === !1)
            )
              break;
          }
        }
        return (
          this.hasCustom || (D.length = A), { tokens: D, groups: L, errors: J }
        );
      }
      handleModes(e, r, n, i) {
        if (e.pop === !0) {
          let o = e.push;
          r(i), o !== void 0 && n.call(this, o);
        } else e.push !== void 0 && n.call(this, e.push);
      }
      chopInput(e, r) {
        return e.substring(r);
      }
      updateLastIndex(e, r) {
        e.lastIndex = r;
      }
      updateTokenEndLineColumnLocation(e, r, n, i, o, a, s) {
        let l, c;
        r !== void 0 &&
          ((l = n === s - 1),
          (c = l ? -1 : 0),
          (i === 1 && l === !0) ||
            ((e.endLine = o + c), (e.endColumn = a - 1 + -c)));
      }
      computeNewColumn(e, r) {
        return e + r;
      }
      createOffsetOnlyToken(e, r, n, i) {
        return { image: e, startOffset: r, tokenTypeIdx: n, tokenType: i };
      }
      createStartOnlyToken(e, r, n, i, o, a) {
        return {
          image: e,
          startOffset: r,
          startLine: o,
          startColumn: a,
          tokenTypeIdx: n,
          tokenType: i,
        };
      }
      createFullToken(e, r, n, i, o, a, s) {
        return {
          image: e,
          startOffset: r,
          endOffset: r + s - 1,
          startLine: o,
          endLine: o,
          startColumn: a,
          endColumn: a + s - 1,
          tokenTypeIdx: n,
          tokenType: i,
        };
      }
      addTokenUsingPush(e, r, n) {
        return e.push(n), r;
      }
      addTokenUsingMemberAccess(e, r, n) {
        return (e[r] = n), r++, r;
      }
      handlePayloadNoCustom(e, r) {}
      handlePayloadWithCustom(e, r) {
        r !== null && (e.payload = r);
      }
      matchWithTest(e, r, n) {
        return e.test(r) === !0 ? r.substring(n, e.lastIndex) : null;
      }
      matchWithExec(e, r) {
        let n = e.exec(r);
        return n !== null ? n[0] : null;
      }
    };
    fe.SKIPPED =
      'This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.';
    fe.NA = /NOT_APPLICABLE/;
  });
function Ao(t) {
  return Jm(t) ? t.LABEL : t.name;
}
function Jm(t) {
  return _e(t.LABEL) && t.LABEL !== '';
}
function zt(t) {
  return JW(t);
}
function JW(t) {
  let e = t.pattern,
    r = {};
  if (((r.name = t.name), xt(e) || (r.PATTERN = e), B(t, QW)))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return (
    B(t, cw) && (r.CATEGORIES = t[cw]),
    ei([r]),
    B(t, uw) && (r.LABEL = t[uw]),
    B(t, fw) && (r.GROUP = t[fw]),
    B(t, pw) && (r.POP_MODE = t[pw]),
    B(t, hw) && (r.PUSH_MODE = t[hw]),
    B(t, dw) && (r.LONGER_ALT = t[dw]),
    B(t, mw) && (r.LINE_BREAKS = t[mw]),
    B(t, gw) && (r.START_CHARS_HINT = t[gw]),
    r
  );
}
function Lo(t, e, r, n, i, o, a, s) {
  return {
    image: e,
    startOffset: r,
    endOffset: n,
    startLine: i,
    endLine: o,
    startColumn: a,
    endColumn: s,
    tokenTypeIdx: t.tokenTypeIdx,
    tokenType: t,
  };
}
function tg(t, e) {
  return ti(t, e);
}
var QW,
  cw,
  uw,
  fw,
  hw,
  pw,
  dw,
  mw,
  gw,
  hn,
  Io = f(() => {
    tt();
    ll();
    vo();
    (QW = 'parent'),
      (cw = 'categories'),
      (uw = 'label'),
      (fw = 'group'),
      (hw = 'push_mode'),
      (pw = 'pop_mode'),
      (dw = 'longer_alt'),
      (mw = 'line_breaks'),
      (gw = 'start_chars_hint');
    hn = zt({ name: 'EOF', pattern: fe.NA });
    ei([hn]);
  });
var gf,
  xw,
  pn,
  Ka = f(() => {
    Io();
    tt();
    sr();
    gf = {
      buildMismatchTokenMessage({
        expected: t,
        actual: e,
        previous: r,
        ruleName: n,
      }) {
        return `Expecting ${
          Jm(t) ? `--> ${Ao(t)} <--` : `token of type --> ${t.name} <--`
        } but found --> '${e.image}' <--`;
      },
      buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
        return 'Redundant input, expecting EOF but found: ' + t.image;
      },
      buildNoViableAltMessage({
        expectedPathsPerAlt: t,
        actual: e,
        previous: r,
        customUserDescription: n,
        ruleName: i,
      }) {
        let o = 'Expecting: ',
          s =
            `
but found: '` +
            $e(e).image +
            "'";
        if (n) return o + n + s;
        {
          let l = Mt(t, (p, d) => p.concat(d), []),
            c = z(l, (p) => `[${z(p, (d) => Ao(d)).join(', ')}]`),
            h = `one of these possible Token sequences:
${z(c, (p, d) => `  ${d + 1}. ${p}`).join(`
`)}`;
          return o + h + s;
        }
      },
      buildEarlyExitMessage({
        expectedIterationPaths: t,
        actual: e,
        customUserDescription: r,
        ruleName: n,
      }) {
        let i = 'Expecting: ',
          a =
            `
but found: '` +
            $e(e).image +
            "'";
        if (r) return i + r + a;
        {
          let l = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${z(t, (c) => `[${z(c, (u) => Ao(u)).join(',')}]`).join(' ,')}>`;
          return i + l + a;
        }
      },
    };
    Object.freeze(gf);
    (xw = {
      buildRuleNotFoundError(t, e) {
        return (
          'Invalid grammar, reference to a rule which is not defined: ->' +
          e.nonTerminalName +
          `<-
inside top level rule: ->` +
          t.name +
          '<-'
        );
      },
    }),
      (pn = {
        buildDuplicateFoundError(t, e) {
          function r(u) {
            return u instanceof St
              ? u.terminalType.name
              : u instanceof jt
              ? u.nonTerminalName
              : '';
          }
          let n = t.name,
            i = $e(e),
            o = i.idx,
            a = kr(i),
            s = r(i),
            l = o > 0,
            c = `->${a}${l ? o : ''}<- ${s ? `with argument: ->${s}<-` : ''}
                  appears more than once (${
                    e.length
                  } times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
          return (
            (c = c.replace(/[ \t]+/g, ' ')),
            (c = c.replace(
              /\s\s+/g,
              `
`
            )),
            c
          );
        },
        buildNamespaceConflictError(t) {
          return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
        },
        buildAlternationPrefixAmbiguityError(t) {
          let e = z(t.prefixPath, (i) => Ao(i)).join(', '),
            r = t.alternation.idx === 0 ? '' : t.alternation.idx;
          return `Ambiguous alternatives: <${t.ambiguityIndices.join(
            ' ,'
          )}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
        },
        buildAlternationAmbiguityError(t) {
          let e = z(t.prefixPath, (i) => Ao(i)).join(', '),
            r = t.alternation.idx === 0 ? '' : t.alternation.idx,
            n = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(
              ' ,'
            )}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
          return (
            (n =
              n +
              `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`),
            n
          );
        },
        buildEmptyRepetitionError(t) {
          let e = kr(t.repetition);
          return (
            t.repetition.idx !== 0 && (e += t.repetition.idx),
            `The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`
          );
        },
        buildTokenNameError(t) {
          return 'deprecated';
        },
        buildEmptyAlternationError(t) {
          return `Ambiguous empty alternative: <${
            t.emptyChoiceIdx + 1
          }> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
        },
        buildTooManyAlternativesError(t) {
          return `An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length + 1} alternatives.`;
        },
        buildLeftRecursionError(t) {
          let e = t.topLevelRule.name,
            r = z(t.leftRecursionPath, (o) => o.name),
            n = `${e} --> ${r.concat([e]).join(' --> ')}`;
          return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
        },
        buildInvalidRuleNameError(t) {
          return 'deprecated';
        },
        buildDuplicateRuleNameError(t) {
          let e;
          return (
            t.topLevelRule instanceof or
              ? (e = t.topLevelRule.name)
              : (e = t.topLevelRule),
            `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`
          );
        },
      });
  });
function yw(t, e) {
  let r = new eg(t, e);
  return r.resolveRefs(), r.errors;
}
var eg,
  bw = f(() => {
    Er();
    tt();
    sr();
    eg = class extends ar {
      constructor(e, r) {
        super(),
          (this.nameToTopRule = e),
          (this.errMsgProvider = r),
          (this.errors = []);
      }
      resolveRefs() {
        C(_t(this.nameToTopRule), (e) => {
          (this.currTopLevel = e), e.accept(this);
        });
      }
      visitNonTerminal(e) {
        let r = this.nameToTopRule[e.nonTerminalName];
        if (r) e.referencedRule = r;
        else {
          let n = this.errMsgProvider.buildRuleNotFoundError(
            this.currTopLevel,
            e
          );
          this.errors.push({
            message: n,
            type: Le.UNRESOLVED_SUBRULE_REF,
            ruleName: this.currTopLevel.name,
            unresolvedRefName: e.nonTerminalName,
          });
        }
      }
    };
  });
function _f(t, e, r = []) {
  r = Ut(r);
  let n = [],
    i = 0;
  function o(s) {
    return s.concat(be(t, i + 1));
  }
  function a(s) {
    let l = _f(o(s), e, r);
    return n.concat(l);
  }
  for (; r.length < e && i < t.length; ) {
    let s = t[i];
    if (s instanceof Yt) return a(s.definition);
    if (s instanceof jt) return a(s.definition);
    if (s instanceof Qt) n = a(s.definition);
    else if (s instanceof Ce) {
      let l = s.definition.concat([new Nt({ definition: s.definition })]);
      return a(l);
    } else if (s instanceof Te) {
      let l = [
        new Yt({ definition: s.definition }),
        new Nt({
          definition: [new St({ terminalType: s.separator })].concat(
            s.definition
          ),
        }),
      ];
      return a(l);
    } else if (s instanceof me) {
      let l = s.definition.concat([
        new Nt({
          definition: [new St({ terminalType: s.separator })].concat(
            s.definition
          ),
        }),
      ]);
      n = a(l);
    } else if (s instanceof Nt) {
      let l = s.definition.concat([new Nt({ definition: s.definition })]);
      n = a(l);
    } else {
      if (s instanceof ge)
        return (
          C(s.definition, (l) => {
            dt(l.definition) === !1 && (n = a(l.definition));
          }),
          n
        );
      if (s instanceof St) r.push(s.terminalType);
      else throw Error('non exhaustive match');
    }
    i++;
  }
  return n.push({ partialPath: r, suffixDef: be(t, i) }), n;
}
function Cf(t, e, r, n) {
  let i = 'EXIT_NONE_TERMINAL',
    o = [i],
    a = 'EXIT_ALTERNATIVE',
    s = !1,
    l = e.length,
    c = l - n - 1,
    u = [],
    h = [];
  for (
    h.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] });
    !dt(h);

  ) {
    let p = h.pop();
    if (p === a) {
      s && Xe(h).idx <= c && h.pop();
      continue;
    }
    let d = p.def,
      m = p.idx,
      g = p.ruleStack,
      E = p.occurrenceStack;
    if (dt(d)) continue;
    let y = d[0];
    if (y === i) {
      let T = { idx: m, def: be(d), ruleStack: Zn(g), occurrenceStack: Zn(E) };
      h.push(T);
    } else if (y instanceof St)
      if (m < l - 1) {
        let T = m + 1,
          b = e[T];
        if (r(b, y.terminalType)) {
          let N = { idx: T, def: be(d), ruleStack: g, occurrenceStack: E };
          h.push(N);
        }
      } else if (m === l - 1)
        u.push({
          nextTokenType: y.terminalType,
          nextTokenOccurrence: y.idx,
          ruleStack: g,
          occurrenceStack: E,
        }),
          (s = !0);
      else throw Error('non exhaustive match');
    else if (y instanceof jt) {
      let T = Ut(g);
      T.push(y.nonTerminalName);
      let b = Ut(E);
      b.push(y.idx);
      let N = {
        idx: m,
        def: y.definition.concat(o, be(d)),
        ruleStack: T,
        occurrenceStack: b,
      };
      h.push(N);
    } else if (y instanceof Qt) {
      let T = { idx: m, def: be(d), ruleStack: g, occurrenceStack: E };
      h.push(T), h.push(a);
      let b = {
        idx: m,
        def: y.definition.concat(be(d)),
        ruleStack: g,
        occurrenceStack: E,
      };
      h.push(b);
    } else if (y instanceof Ce) {
      let T = new Nt({ definition: y.definition, idx: y.idx }),
        b = y.definition.concat([T], be(d)),
        N = { idx: m, def: b, ruleStack: g, occurrenceStack: E };
      h.push(N);
    } else if (y instanceof Te) {
      let T = new St({ terminalType: y.separator }),
        b = new Nt({ definition: [T].concat(y.definition), idx: y.idx }),
        N = y.definition.concat([b], be(d)),
        I = { idx: m, def: N, ruleStack: g, occurrenceStack: E };
      h.push(I);
    } else if (y instanceof me) {
      let T = { idx: m, def: be(d), ruleStack: g, occurrenceStack: E };
      h.push(T), h.push(a);
      let b = new St({ terminalType: y.separator }),
        N = new Nt({ definition: [b].concat(y.definition), idx: y.idx }),
        I = y.definition.concat([N], be(d)),
        A = { idx: m, def: I, ruleStack: g, occurrenceStack: E };
      h.push(A);
    } else if (y instanceof Nt) {
      let T = { idx: m, def: be(d), ruleStack: g, occurrenceStack: E };
      h.push(T), h.push(a);
      let b = new Nt({ definition: y.definition, idx: y.idx }),
        N = y.definition.concat([b], be(d)),
        I = { idx: m, def: N, ruleStack: g, occurrenceStack: E };
      h.push(I);
    } else if (y instanceof ge)
      for (let T = y.definition.length - 1; T >= 0; T--) {
        let b = y.definition[T],
          N = {
            idx: m,
            def: b.definition.concat(be(d)),
            ruleStack: g,
            occurrenceStack: E,
          };
        h.push(N), h.push(a);
      }
    else if (y instanceof Yt)
      h.push({
        idx: m,
        def: y.definition.concat(be(d)),
        ruleStack: g,
        occurrenceStack: E,
      });
    else if (y instanceof or) h.push(t9(y, m, g, E));
    else throw Error('non exhaustive match');
  }
  return u;
}
function t9(t, e, r, n) {
  let i = Ut(r);
  i.push(t.name);
  let o = Ut(n);
  return (
    o.push(1), { idx: e, def: t.definition, ruleStack: i, occurrenceStack: o }
  );
}
var rg,
  xf,
  Za,
  yf,
  ul,
  bf,
  fl,
  hl = f(() => {
    tt();
    Dm();
    of();
    sr();
    (rg = class extends Jn {
      constructor(e, r) {
        super(),
          (this.topProd = e),
          (this.path = r),
          (this.possibleTokTypes = []),
          (this.nextProductionName = ''),
          (this.nextProductionOccurrence = 0),
          (this.found = !1),
          (this.isAtEndOfPath = !1);
      }
      startWalking() {
        if (((this.found = !1), this.path.ruleStack[0] !== this.topProd.name))
          throw Error("The path does not start with the walker's top Rule!");
        return (
          (this.ruleStack = Ut(this.path.ruleStack).reverse()),
          (this.occurrenceStack = Ut(this.path.occurrenceStack).reverse()),
          this.ruleStack.pop(),
          this.occurrenceStack.pop(),
          this.updateExpectedNext(),
          this.walk(this.topProd),
          this.possibleTokTypes
        );
      }
      walk(e, r = []) {
        this.found || super.walk(e, r);
      }
      walkProdRef(e, r, n) {
        if (
          e.referencedRule.name === this.nextProductionName &&
          e.idx === this.nextProductionOccurrence
        ) {
          let i = r.concat(n);
          this.updateExpectedNext(), this.walk(e.referencedRule, i);
        }
      }
      updateExpectedNext() {
        dt(this.ruleStack)
          ? ((this.nextProductionName = ''),
            (this.nextProductionOccurrence = 0),
            (this.isAtEndOfPath = !0))
          : ((this.nextProductionName = this.ruleStack.pop()),
            (this.nextProductionOccurrence = this.occurrenceStack.pop()));
      }
    }),
      (xf = class extends rg {
        constructor(e, r) {
          super(e, r),
            (this.path = r),
            (this.nextTerminalName = ''),
            (this.nextTerminalOccurrence = 0),
            (this.nextTerminalName = this.path.lastTok.name),
            (this.nextTerminalOccurrence = this.path.lastTokOccurrence);
        }
        walkTerminal(e, r, n) {
          if (
            this.isAtEndOfPath &&
            e.terminalType.name === this.nextTerminalName &&
            e.idx === this.nextTerminalOccurrence &&
            !this.found
          ) {
            let i = r.concat(n),
              o = new Yt({ definition: i });
            (this.possibleTokTypes = Eo(o)), (this.found = !0);
          }
        }
      }),
      (Za = class extends Jn {
        constructor(e, r) {
          super(),
            (this.topRule = e),
            (this.occurrence = r),
            (this.result = {
              token: void 0,
              occurrence: void 0,
              isEndOfRule: void 0,
            });
        }
        startWalking() {
          return this.walk(this.topRule), this.result;
        }
      }),
      (yf = class extends Za {
        walkMany(e, r, n) {
          if (e.idx === this.occurrence) {
            let i = $e(r.concat(n));
            (this.result.isEndOfRule = i === void 0),
              i instanceof St &&
                ((this.result.token = i.terminalType),
                (this.result.occurrence = i.idx));
          } else super.walkMany(e, r, n);
        }
      }),
      (ul = class extends Za {
        walkManySep(e, r, n) {
          if (e.idx === this.occurrence) {
            let i = $e(r.concat(n));
            (this.result.isEndOfRule = i === void 0),
              i instanceof St &&
                ((this.result.token = i.terminalType),
                (this.result.occurrence = i.idx));
          } else super.walkManySep(e, r, n);
        }
      }),
      (bf = class extends Za {
        walkAtLeastOne(e, r, n) {
          if (e.idx === this.occurrence) {
            let i = $e(r.concat(n));
            (this.result.isEndOfRule = i === void 0),
              i instanceof St &&
                ((this.result.token = i.terminalType),
                (this.result.occurrence = i.idx));
          } else super.walkAtLeastOne(e, r, n);
        }
      }),
      (fl = class extends Za {
        walkAtLeastOneSep(e, r, n) {
          if (e.idx === this.occurrence) {
            let i = $e(r.concat(n));
            (this.result.isEndOfRule = i === void 0),
              i instanceof St &&
                ((this.result.token = i.terminalType),
                (this.result.occurrence = i.idx));
          } else super.walkAtLeastOneSep(e, r, n);
        }
      });
  });
function kf(t) {
  if (t instanceof Qt || t === 'Option') return he.OPTION;
  if (t instanceof Nt || t === 'Repetition') return he.REPETITION;
  if (t instanceof Ce || t === 'RepetitionMandatory')
    return he.REPETITION_MANDATORY;
  if (t instanceof Te || t === 'RepetitionMandatoryWithSeparator')
    return he.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof me || t === 'RepetitionWithSeparator')
    return he.REPETITION_WITH_SEPARATOR;
  if (t instanceof ge || t === 'Alternation') return he.ALTERNATION;
  throw Error('non exhaustive match');
}
function Cw(t, e, r, n, i, o) {
  let a = pl(t, e, r),
    s = vw(a) ? Xa : ti;
  return o(a, n, s, i);
}
function Tw(t, e, r, n, i, o) {
  let a = dl(t, e, i, r),
    s = vw(a) ? Xa : ti;
  return o(a[0], s, n);
}
function kw(t, e, r, n) {
  let i = t.length,
    o = Je(t, (a) => Je(a, (s) => s.length === 1));
  if (e)
    return function (a) {
      let s = z(a, (l) => l.GATE);
      for (let l = 0; l < i; l++) {
        let c = t[l],
          u = c.length,
          h = s[l];
        if (!(h !== void 0 && h.call(this) === !1))
          t: for (let p = 0; p < u; p++) {
            let d = c[p],
              m = d.length;
            for (let g = 0; g < m; g++) {
              let E = this.LA(g + 1);
              if (r(E, d[g]) === !1) continue t;
            }
            return l;
          }
      }
    };
  if (o && !n) {
    let a = z(t, (l) => Ot(l)),
      s = Mt(
        a,
        (l, c, u) => (
          C(c, (h) => {
            B(l, h.tokenTypeIdx) || (l[h.tokenTypeIdx] = u),
              C(h.categoryMatches, (p) => {
                B(l, p) || (l[p] = u);
              });
          }),
          l
        ),
        {}
      );
    return function () {
      let l = this.LA(1);
      return s[l.tokenTypeIdx];
    };
  } else
    return function () {
      for (let a = 0; a < i; a++) {
        let s = t[a],
          l = s.length;
        t: for (let c = 0; c < l; c++) {
          let u = s[c],
            h = u.length;
          for (let p = 0; p < h; p++) {
            let d = this.LA(p + 1);
            if (r(d, u[p]) === !1) continue t;
          }
          return a;
        }
      }
    };
}
function Ew(t, e, r) {
  let n = Je(t, (o) => o.length === 1),
    i = t.length;
  if (n && !r) {
    let o = Ot(t);
    if (o.length === 1 && dt(o[0].categoryMatches)) {
      let s = o[0].tokenTypeIdx;
      return function () {
        return this.LA(1).tokenTypeIdx === s;
      };
    } else {
      let a = Mt(
        o,
        (s, l, c) => (
          (s[l.tokenTypeIdx] = !0),
          C(l.categoryMatches, (u) => {
            s[u] = !0;
          }),
          s
        ),
        []
      );
      return function () {
        let s = this.LA(1);
        return a[s.tokenTypeIdx] === !0;
      };
    }
  } else
    return function () {
      t: for (let o = 0; o < i; o++) {
        let a = t[o],
          s = a.length;
        for (let l = 0; l < s; l++) {
          let c = this.LA(l + 1);
          if (e(c, a[l]) === !1) continue t;
        }
        return !0;
      }
      return !1;
    };
}
function _w(t) {
  let e = new Array(t);
  for (let r = 0; r < t; r++) e[r] = [];
  return e;
}
function ng(t) {
  let e = [''];
  for (let r = 0; r < t.length; r++) {
    let n = t[r],
      i = [];
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      i.push(a + '_' + n.tokenTypeIdx);
      for (let s = 0; s < n.categoryMatches.length; s++) {
        let l = '_' + n.categoryMatches[s];
        i.push(a + l);
      }
    }
    e = i;
  }
  return e;
}
function e9(t, e, r) {
  for (let n = 0; n < t.length; n++) {
    if (n === r) continue;
    let i = t[n];
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      if (i[a] === !0) return !1;
    }
  }
  return !0;
}
function ww(t, e) {
  let r = z(t, (a) => _f([a], 1)),
    n = _w(r.length),
    i = z(r, (a) => {
      let s = {};
      return (
        C(a, (l) => {
          let c = ng(l.partialPath);
          C(c, (u) => {
            s[u] = !0;
          });
        }),
        s
      );
    }),
    o = r;
  for (let a = 1; a <= e; a++) {
    let s = o;
    o = _w(s.length);
    for (let l = 0; l < s.length; l++) {
      let c = s[l];
      for (let u = 0; u < c.length; u++) {
        let h = c[u].partialPath,
          p = c[u].suffixDef,
          d = ng(h);
        if (e9(i, d, l) || dt(p) || h.length === e) {
          let g = n[l];
          if (Ef(g, h) === !1) {
            g.push(h);
            for (let E = 0; E < d.length; E++) {
              let y = d[E];
              i[l][y] = !0;
            }
          }
        } else {
          let g = _f(p, a + 1, h);
          (o[l] = o[l].concat(g)),
            C(g, (E) => {
              let y = ng(E.partialPath);
              C(y, (T) => {
                i[l][T] = !0;
              });
            });
        }
      }
    }
  }
  return n;
}
function pl(t, e, r, n) {
  let i = new Tf(t, he.ALTERNATION, n);
  return e.accept(i), ww(i.result, r);
}
function dl(t, e, r, n) {
  let i = new Tf(t, r);
  e.accept(i);
  let o = i.result,
    s = new ig(e, t, r).startWalking(),
    l = new Yt({ definition: o }),
    c = new Yt({ definition: s });
  return ww([l, c], n);
}
function Ef(t, e) {
  t: for (let r = 0; r < t.length; r++) {
    let n = t[r];
    if (n.length === e.length) {
      for (let i = 0; i < n.length; i++) {
        let o = e[i],
          a = n[i];
        if ((o === a || a.categoryMatchesMap[o.tokenTypeIdx] !== void 0) === !1)
          continue t;
      }
      return !0;
    }
  }
  return !1;
}
function Sw(t, e) {
  return (
    t.length < e.length &&
    Je(t, (r, n) => {
      let i = e[n];
      return r === i || i.categoryMatchesMap[r.tokenTypeIdx];
    })
  );
}
function vw(t) {
  return Je(t, (e) => Je(e, (r) => Je(r, (n) => dt(n.categoryMatches))));
}
var he,
  ig,
  Tf,
  Qa = f(() => {
    tt();
    hl();
    of();
    vo();
    sr();
    (function (t) {
      (t[(t.OPTION = 0)] = 'OPTION'),
        (t[(t.REPETITION = 1)] = 'REPETITION'),
        (t[(t.REPETITION_MANDATORY = 2)] = 'REPETITION_MANDATORY'),
        (t[(t.REPETITION_MANDATORY_WITH_SEPARATOR = 3)] =
          'REPETITION_MANDATORY_WITH_SEPARATOR'),
        (t[(t.REPETITION_WITH_SEPARATOR = 4)] = 'REPETITION_WITH_SEPARATOR'),
        (t[(t.ALTERNATION = 5)] = 'ALTERNATION');
    })(he || (he = {}));
    (ig = class extends Jn {
      constructor(e, r, n) {
        super(),
          (this.topProd = e),
          (this.targetOccurrence = r),
          (this.targetProdType = n);
      }
      startWalking() {
        return this.walk(this.topProd), this.restDef;
      }
      checkIsTarget(e, r, n, i) {
        return e.idx === this.targetOccurrence && this.targetProdType === r
          ? ((this.restDef = n.concat(i)), !0)
          : !1;
      }
      walkOption(e, r, n) {
        this.checkIsTarget(e, he.OPTION, r, n) || super.walkOption(e, r, n);
      }
      walkAtLeastOne(e, r, n) {
        this.checkIsTarget(e, he.REPETITION_MANDATORY, r, n) ||
          super.walkOption(e, r, n);
      }
      walkAtLeastOneSep(e, r, n) {
        this.checkIsTarget(e, he.REPETITION_MANDATORY_WITH_SEPARATOR, r, n) ||
          super.walkOption(e, r, n);
      }
      walkMany(e, r, n) {
        this.checkIsTarget(e, he.REPETITION, r, n) || super.walkOption(e, r, n);
      }
      walkManySep(e, r, n) {
        this.checkIsTarget(e, he.REPETITION_WITH_SEPARATOR, r, n) ||
          super.walkOption(e, r, n);
      }
    }),
      (Tf = class extends ar {
        constructor(e, r, n) {
          super(),
            (this.targetOccurrence = e),
            (this.targetProdType = r),
            (this.targetRef = n),
            (this.result = []);
        }
        checkIsTarget(e, r) {
          e.idx === this.targetOccurrence &&
            this.targetProdType === r &&
            (this.targetRef === void 0 || e === this.targetRef) &&
            (this.result = e.definition);
        }
        visitOption(e) {
          this.checkIsTarget(e, he.OPTION);
        }
        visitRepetition(e) {
          this.checkIsTarget(e, he.REPETITION);
        }
        visitRepetitionMandatory(e) {
          this.checkIsTarget(e, he.REPETITION_MANDATORY);
        }
        visitRepetitionMandatoryWithSeparator(e) {
          this.checkIsTarget(e, he.REPETITION_MANDATORY_WITH_SEPARATOR);
        }
        visitRepetitionWithSeparator(e) {
          this.checkIsTarget(e, he.REPETITION_WITH_SEPARATOR);
        }
        visitAlternation(e) {
          this.checkIsTarget(e, he.ALTERNATION);
        }
      });
  });
function Aw(t) {
  let e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName,
  });
  return z(e, (r) =>
    Object.assign({ type: Le.CUSTOM_LOOKAHEAD_VALIDATION }, r)
  );
}
function Lw(t, e, r, n) {
  let i = ir(t, (l) => r9(l, r)),
    o = l9(t, e, r),
    a = ir(t, (l) => o9(l, r)),
    s = ir(t, (l) => i9(l, t, n, r));
  return i.concat(o, a, s);
}
function r9(t, e) {
  let r = new og();
  t.accept(r);
  let n = r.allProductions,
    i = wm(n, n9),
    o = Tr(i, (s) => s.length > 1);
  return z(_t(o), (s) => {
    let l = $e(s),
      c = e.buildDuplicateFoundError(t, s),
      u = kr(l),
      h = {
        message: c,
        type: Le.DUPLICATE_PRODUCTIONS,
        ruleName: t.name,
        dslName: u,
        occurrence: l.idx,
      },
      p = Iw(l);
    return p && (h.parameter = p), h;
  });
}
function n9(t) {
  return `${kr(t)}_#_${t.idx}_#_${Iw(t)}`;
}
function Iw(t) {
  return t instanceof St
    ? t.terminalType.name
    : t instanceof jt
    ? t.nonTerminalName
    : '';
}
function i9(t, e, r, n) {
  let i = [];
  if (Mt(e, (a, s) => (s.name === t.name ? a + 1 : a), 0) > 1) {
    let a = n.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: r });
    i.push({ message: a, type: Le.DUPLICATE_RULE_NAME, ruleName: t.name });
  }
  return i;
}
function Ow(t, e, r) {
  let n = [],
    i;
  return (
    re(e, t) ||
      ((i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `),
      n.push({ message: i, type: Le.INVALID_RULE_OVERRIDE, ruleName: t })),
    n
  );
}
function sg(t, e, r, n = []) {
  let i = [],
    o = wf(e.definition);
  if (dt(o)) return [];
  {
    let a = t.name;
    re(o, t) &&
      i.push({
        message: r.buildLeftRecursionError({
          topLevelRule: t,
          leftRecursionPath: n,
        }),
        type: Le.LEFT_RECURSION,
        ruleName: a,
      });
    let l = Li(o, n.concat([t])),
      c = ir(l, (u) => {
        let h = Ut(n);
        return h.push(u), sg(t, u, r, h);
      });
    return i.concat(c);
  }
}
function wf(t) {
  let e = [];
  if (dt(t)) return e;
  let r = $e(t);
  if (r instanceof jt) e.push(r.referencedRule);
  else if (
    r instanceof Yt ||
    r instanceof Qt ||
    r instanceof Ce ||
    r instanceof Te ||
    r instanceof me ||
    r instanceof Nt
  )
    e = e.concat(wf(r.definition));
  else if (r instanceof ge) e = Ot(z(r.definition, (o) => wf(o.definition)));
  else if (!(r instanceof St)) throw Error('non exhaustive match');
  let n = ko(r),
    i = t.length > 1;
  if (n && i) {
    let o = be(t);
    return e.concat(wf(o));
  } else return e;
}
function Rw(t, e) {
  let r = new ml();
  t.accept(r);
  let n = r.alternations;
  return ir(n, (o) => {
    let a = Zn(o.definition);
    return ir(a, (s, l) => {
      let c = Cf([s], [], ti, 1);
      return dt(c)
        ? [
            {
              message: e.buildEmptyAlternationError({
                topLevelRule: t,
                alternation: o,
                emptyChoiceIdx: l,
              }),
              type: Le.NONE_LAST_EMPTY_ALT,
              ruleName: t.name,
              occurrence: o.idx,
              alternative: l + 1,
            },
          ]
        : [];
    });
  });
}
function Nw(t, e, r) {
  let n = new ml();
  t.accept(n);
  let i = n.alternations;
  return (
    (i = Oi(i, (a) => a.ignoreAmbiguities === !0)),
    ir(i, (a) => {
      let s = a.idx,
        l = a.maxLookahead || e,
        c = pl(s, t, l, a),
        u = a9(c, a, t, r),
        h = s9(c, a, t, r);
      return u.concat(h);
    })
  );
}
function o9(t, e) {
  let r = new ml();
  t.accept(r);
  let n = r.alternations;
  return ir(n, (o) =>
    o.definition.length > 255
      ? [
          {
            message: e.buildTooManyAlternativesError({
              topLevelRule: t,
              alternation: o,
            }),
            type: Le.TOO_MANY_ALTS,
            ruleName: t.name,
            occurrence: o.idx,
          },
        ]
      : []
  );
}
function Fw(t, e, r) {
  let n = [];
  return (
    C(t, (i) => {
      let o = new ag();
      i.accept(o);
      let a = o.allProductions;
      C(a, (s) => {
        let l = kf(s),
          c = s.maxLookahead || e,
          u = s.idx,
          p = dl(u, i, l, c)[0];
        if (dt(Ot(p))) {
          let d = r.buildEmptyRepetitionError({
            topLevelRule: i,
            repetition: s,
          });
          n.push({
            message: d,
            type: Le.NO_NON_EMPTY_LOOKAHEAD,
            ruleName: i.name,
          });
        }
      });
    }),
    n
  );
}
function a9(t, e, r, n) {
  let i = [],
    o = Mt(
      t,
      (s, l, c) => (
        e.definition[c].ignoreAmbiguities === !0 ||
          C(l, (u) => {
            let h = [c];
            C(t, (p, d) => {
              c !== d &&
                Ef(p, u) &&
                e.definition[d].ignoreAmbiguities !== !0 &&
                h.push(d);
            }),
              h.length > 1 &&
                !Ef(i, u) &&
                (i.push(u), s.push({ alts: h, path: u }));
          }),
        s
      ),
      []
    );
  return z(o, (s) => {
    let l = z(s.alts, (u) => u + 1);
    return {
      message: n.buildAlternationAmbiguityError({
        topLevelRule: r,
        alternation: e,
        ambiguityIndices: l,
        prefixPath: s.path,
      }),
      type: Le.AMBIGUOUS_ALTS,
      ruleName: r.name,
      occurrence: e.idx,
      alternatives: s.alts,
    };
  });
}
function s9(t, e, r, n) {
  let i = Mt(
    t,
    (a, s, l) => {
      let c = z(s, (u) => ({ idx: l, path: u }));
      return a.concat(c);
    },
    []
  );
  return Nn(
    ir(i, (a) => {
      if (e.definition[a.idx].ignoreAmbiguities === !0) return [];
      let l = a.idx,
        c = a.path,
        u = Rt(
          i,
          (p) =>
            e.definition[p.idx].ignoreAmbiguities !== !0 &&
            p.idx < l &&
            Sw(p.path, c)
        );
      return z(u, (p) => {
        let d = [p.idx + 1, l + 1],
          m = e.idx === 0 ? '' : e.idx;
        return {
          message: n.buildAlternationPrefixAmbiguityError({
            topLevelRule: r,
            alternation: e,
            ambiguityIndices: d,
            prefixPath: p.path,
          }),
          type: Le.AMBIGUOUS_PREFIX_ALTS,
          ruleName: r.name,
          occurrence: m,
          alternatives: d,
        };
      });
    })
  );
}
function l9(t, e, r) {
  let n = [],
    i = z(e, (o) => o.name);
  return (
    C(t, (o) => {
      let a = o.name;
      if (re(i, a)) {
        let s = r.buildNamespaceConflictError(o);
        n.push({
          message: s,
          type: Le.CONFLICT_TOKENS_RULES_NAMESPACE,
          ruleName: a,
        });
      }
    }),
    n
  );
}
var og,
  ml,
  ag,
  gl = f(() => {
    tt();
    Er();
    sr();
    Qa();
    hl();
    vo();
    og = class extends ar {
      constructor() {
        super(...arguments), (this.allProductions = []);
      }
      visitNonTerminal(e) {
        this.allProductions.push(e);
      }
      visitOption(e) {
        this.allProductions.push(e);
      }
      visitRepetitionWithSeparator(e) {
        this.allProductions.push(e);
      }
      visitRepetitionMandatory(e) {
        this.allProductions.push(e);
      }
      visitRepetitionMandatoryWithSeparator(e) {
        this.allProductions.push(e);
      }
      visitRepetition(e) {
        this.allProductions.push(e);
      }
      visitAlternation(e) {
        this.allProductions.push(e);
      }
      visitTerminal(e) {
        this.allProductions.push(e);
      }
    };
    ml = class extends ar {
      constructor() {
        super(...arguments), (this.alternations = []);
      }
      visitAlternation(e) {
        this.alternations.push(e);
      }
    };
    ag = class extends ar {
      constructor() {
        super(...arguments), (this.allProductions = []);
      }
      visitRepetitionWithSeparator(e) {
        this.allProductions.push(e);
      }
      visitRepetitionMandatory(e) {
        this.allProductions.push(e);
      }
      visitRepetitionMandatoryWithSeparator(e) {
        this.allProductions.push(e);
      }
      visitRepetition(e) {
        this.allProductions.push(e);
      }
    };
  });
function Mw(t) {
  let e = Ai(t, { errMsgProvider: xw }),
    r = {};
  return (
    C(t.rules, (n) => {
      r[n.name] = n;
    }),
    yw(r, e.errMsgProvider)
  );
}
function Bw(t) {
  return (
    (t = Ai(t, { errMsgProvider: pn })),
    Lw(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName)
  );
}
var Pw = f(() => {
  tt();
  bw();
  gl();
  Ka();
});
function Ni(t) {
  return re(Ww, t.name);
}
var Dw,
  Uw,
  zw,
  $w,
  Ww,
  Ja,
  Oo,
  xl,
  yl,
  bl,
  ts = f(() => {
    tt();
    (Dw = 'MismatchedTokenException'),
      (Uw = 'NoViableAltException'),
      (zw = 'EarlyExitException'),
      ($w = 'NotAllInputParsedException'),
      (Ww = [Dw, Uw, zw, $w]);
    Object.freeze(Ww);
    (Ja = class extends Error {
      constructor(e, r) {
        super(e),
          (this.token = r),
          (this.resyncedTokens = []),
          Object.setPrototypeOf(this, new.target.prototype),
          Error.captureStackTrace &&
            Error.captureStackTrace(this, this.constructor);
      }
    }),
      (Oo = class extends Ja {
        constructor(e, r, n) {
          super(e, r), (this.previousToken = n), (this.name = Dw);
        }
      }),
      (xl = class extends Ja {
        constructor(e, r, n) {
          super(e, r), (this.previousToken = n), (this.name = Uw);
        }
      }),
      (yl = class extends Ja {
        constructor(e, r) {
          super(e, r), (this.name = $w);
        }
      }),
      (bl = class extends Ja {
        constructor(e, r, n) {
          super(e, r), (this.previousToken = n), (this.name = zw);
        }
      });
  });
function c9(t, e, r, n, i, o, a) {
  let s = this.getKeyForAutomaticLookahead(n, i),
    l = this.firstAfterRepMap[s];
  if (l === void 0) {
    let p = this.getCurrRuleFullName(),
      d = this.getGAstProductions()[p];
    (l = new o(d, i).startWalking()), (this.firstAfterRepMap[s] = l);
  }
  let c = l.token,
    u = l.occurrence,
    h = l.isEndOfRule;
  this.RULE_STACK.length === 1 && h && c === void 0 && ((c = hn), (u = 1)),
    !(c === void 0 || u === void 0) &&
      this.shouldInRepetitionRecoveryBeTried(c, u, a) &&
      this.tryInRepetitionRecovery(t, e, r, c);
}
var lg,
  ug,
  cg,
  Sf,
  fg = f(() => {
    Io();
    tt();
    ts();
    Um();
    Er();
    (lg = {}),
      (ug = 'InRuleRecoveryException'),
      (cg = class extends Error {
        constructor(e) {
          super(e), (this.name = ug);
        }
      }),
      (Sf = class {
        initRecoverable(e) {
          (this.firstAfterRepMap = {}),
            (this.resyncFollows = {}),
            (this.recoveryEnabled = B(e, 'recoveryEnabled')
              ? e.recoveryEnabled
              : lr.recoveryEnabled),
            this.recoveryEnabled && (this.attemptInRepetitionRecovery = c9);
        }
        getTokenToInsert(e) {
          let r = Lo(e, '', NaN, NaN, NaN, NaN, NaN, NaN);
          return (r.isInsertedInRecovery = !0), r;
        }
        canTokenTypeBeInsertedInRecovery(e) {
          return !0;
        }
        canTokenTypeBeDeletedInRecovery(e) {
          return !0;
        }
        tryInRepetitionRecovery(e, r, n, i) {
          let o = this.findReSyncTokenType(),
            a = this.exportLexerState(),
            s = [],
            l = !1,
            c = this.LA(1),
            u = this.LA(1),
            h = () => {
              let p = this.LA(0),
                d = this.errorMessageProvider.buildMismatchTokenMessage({
                  expected: i,
                  actual: c,
                  previous: p,
                  ruleName: this.getCurrRuleFullName(),
                }),
                m = new Oo(d, c, this.LA(0));
              (m.resyncedTokens = Zn(s)), this.SAVE_ERROR(m);
            };
          for (; !l; )
            if (this.tokenMatcher(u, i)) {
              h();
              return;
            } else if (n.call(this)) {
              h(), e.apply(this, r);
              return;
            } else
              this.tokenMatcher(u, o)
                ? (l = !0)
                : ((u = this.SKIP_TOKEN()), this.addToResyncTokens(u, s));
          this.importLexerState(a);
        }
        shouldInRepetitionRecoveryBeTried(e, r, n) {
          return !(
            n === !1 ||
            this.tokenMatcher(this.LA(1), e) ||
            this.isBackTracking() ||
            this.canPerformInRuleRecovery(
              e,
              this.getFollowsForInRuleRecovery(e, r)
            )
          );
        }
        getFollowsForInRuleRecovery(e, r) {
          let n = this.getCurrentGrammarPath(e, r);
          return this.getNextPossibleTokenTypes(n);
        }
        tryInRuleRecovery(e, r) {
          if (this.canRecoverWithSingleTokenInsertion(e, r))
            return this.getTokenToInsert(e);
          if (this.canRecoverWithSingleTokenDeletion(e)) {
            let n = this.SKIP_TOKEN();
            return this.consumeToken(), n;
          }
          throw new cg('sad sad panda');
        }
        canPerformInRuleRecovery(e, r) {
          return (
            this.canRecoverWithSingleTokenInsertion(e, r) ||
            this.canRecoverWithSingleTokenDeletion(e)
          );
        }
        canRecoverWithSingleTokenInsertion(e, r) {
          if (!this.canTokenTypeBeInsertedInRecovery(e) || dt(r)) return !1;
          let n = this.LA(1);
          return nr(r, (o) => this.tokenMatcher(n, o)) !== void 0;
        }
        canRecoverWithSingleTokenDeletion(e) {
          return this.canTokenTypeBeDeletedInRecovery(e)
            ? this.tokenMatcher(this.LA(2), e)
            : !1;
        }
        isInCurrentRuleReSyncSet(e) {
          let r = this.getCurrFollowKey(),
            n = this.getFollowSetFromFollowKey(r);
          return re(n, e);
        }
        findReSyncTokenType() {
          let e = this.flattenFollowSet(),
            r = this.LA(1),
            n = 2;
          for (;;) {
            let i = nr(e, (o) => tg(r, o));
            if (i !== void 0) return i;
            (r = this.LA(n)), n++;
          }
        }
        getCurrFollowKey() {
          if (this.RULE_STACK.length === 1) return lg;
          let e = this.getLastExplicitRuleShortName(),
            r = this.getLastExplicitRuleOccurrenceIndex(),
            n = this.getPreviousExplicitRuleShortName();
          return {
            ruleName: this.shortRuleNameToFullName(e),
            idxInCallingRule: r,
            inRule: this.shortRuleNameToFullName(n),
          };
        }
        buildFullFollowKeyStack() {
          let e = this.RULE_STACK,
            r = this.RULE_OCCURRENCE_STACK;
          return z(e, (n, i) =>
            i === 0
              ? lg
              : {
                  ruleName: this.shortRuleNameToFullName(n),
                  idxInCallingRule: r[i],
                  inRule: this.shortRuleNameToFullName(e[i - 1]),
                }
          );
        }
        flattenFollowSet() {
          let e = z(this.buildFullFollowKeyStack(), (r) =>
            this.getFollowSetFromFollowKey(r)
          );
          return Ot(e);
        }
        getFollowSetFromFollowKey(e) {
          if (e === lg) return [hn];
          let r = e.ruleName + e.idxInCallingRule + af + e.inRule;
          return this.resyncFollows[r];
        }
        addToResyncTokens(e, r) {
          return this.tokenMatcher(e, hn) || r.push(e), r;
        }
        reSyncTo(e) {
          let r = [],
            n = this.LA(1);
          for (; this.tokenMatcher(n, e) === !1; )
            (n = this.SKIP_TOKEN()), this.addToResyncTokens(n, r);
          return Zn(r);
        }
        attemptInRepetitionRecovery(e, r, n, i, o, a, s) {}
        getCurrentGrammarPath(e, r) {
          let n = this.getHumanReadableRuleStack(),
            i = Ut(this.RULE_OCCURRENCE_STACK);
          return {
            ruleStack: n,
            occurrenceStack: i,
            lastTok: e,
            lastTokOccurrence: r,
          };
        }
        getHumanReadableRuleStack() {
          return z(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
        }
      });
  });
function vf(t, e, r) {
  return r | e | t;
}
var Oxt,
  Af = f(() => {
    Oxt = 32 - 8;
  });
var _l,
  hg = f(() => {
    tt();
    Ka();
    Er();
    gl();
    Qa();
    _l = class {
      constructor(e) {
        var r;
        this.maxLookahead =
          (r = e?.maxLookahead) !== null && r !== void 0 ? r : lr.maxLookahead;
      }
      validate(e) {
        let r = this.validateNoLeftRecursion(e.rules);
        if (dt(r)) {
          let n = this.validateEmptyOrAlternatives(e.rules),
            i = this.validateAmbiguousAlternationAlternatives(
              e.rules,
              this.maxLookahead
            ),
            o = this.validateSomeNonEmptyLookaheadPath(
              e.rules,
              this.maxLookahead
            );
          return [...r, ...n, ...i, ...o];
        }
        return r;
      }
      validateNoLeftRecursion(e) {
        return ir(e, (r) => sg(r, r, pn));
      }
      validateEmptyOrAlternatives(e) {
        return ir(e, (r) => Rw(r, pn));
      }
      validateAmbiguousAlternationAlternatives(e, r) {
        return ir(e, (n) => Nw(n, r, pn));
      }
      validateSomeNonEmptyLookaheadPath(e, r) {
        return Fw(e, r, pn);
      }
      buildLookaheadForAlternation(e) {
        return Cw(
          e.prodOccurrence,
          e.rule,
          e.maxLookahead,
          e.hasPredicates,
          e.dynamicTokensEnabled,
          kw
        );
      }
      buildLookaheadForOptional(e) {
        return Tw(
          e.prodOccurrence,
          e.rule,
          e.maxLookahead,
          e.dynamicTokensEnabled,
          kf(e.prodType),
          Ew
        );
      }
    };
  });
function u9(t) {
  Lf.reset(), t.accept(Lf);
  let e = Lf.dslMethods;
  return Lf.reset(), e;
}
var If,
  pg,
  Lf,
  qw = f(() => {
    tt();
    Er();
    Af();
    sr();
    hg();
    (If = class {
      initLooksAhead(e) {
        (this.dynamicTokensEnabled = B(e, 'dynamicTokensEnabled')
          ? e.dynamicTokensEnabled
          : lr.dynamicTokensEnabled),
          (this.maxLookahead = B(e, 'maxLookahead')
            ? e.maxLookahead
            : lr.maxLookahead),
          (this.lookaheadStrategy = B(e, 'lookaheadStrategy')
            ? e.lookaheadStrategy
            : new _l({ maxLookahead: this.maxLookahead })),
          (this.lookAheadFuncsCache = new Map());
      }
      preComputeLookaheadFunctions(e) {
        C(e, (r) => {
          this.TRACE_INIT(`${r.name} Rule Lookahead`, () => {
            let {
              alternation: n,
              repetition: i,
              option: o,
              repetitionMandatory: a,
              repetitionMandatoryWithSeparator: s,
              repetitionWithSeparator: l,
            } = u9(r);
            C(n, (c) => {
              let u = c.idx === 0 ? '' : c.idx;
              this.TRACE_INIT(`${kr(c)}${u}`, () => {
                let h = this.lookaheadStrategy.buildLookaheadForAlternation({
                    prodOccurrence: c.idx,
                    rule: r,
                    maxLookahead: c.maxLookahead || this.maxLookahead,
                    hasPredicates: c.hasPredicates,
                    dynamicTokensEnabled: this.dynamicTokensEnabled,
                  }),
                  p = vf(this.fullRuleNameToShort[r.name], 256, c.idx);
                this.setLaFuncCache(p, h);
              });
            }),
              C(i, (c) => {
                this.computeLookaheadFunc(
                  r,
                  c.idx,
                  768,
                  'Repetition',
                  c.maxLookahead,
                  kr(c)
                );
              }),
              C(o, (c) => {
                this.computeLookaheadFunc(
                  r,
                  c.idx,
                  512,
                  'Option',
                  c.maxLookahead,
                  kr(c)
                );
              }),
              C(a, (c) => {
                this.computeLookaheadFunc(
                  r,
                  c.idx,
                  1024,
                  'RepetitionMandatory',
                  c.maxLookahead,
                  kr(c)
                );
              }),
              C(s, (c) => {
                this.computeLookaheadFunc(
                  r,
                  c.idx,
                  1536,
                  'RepetitionMandatoryWithSeparator',
                  c.maxLookahead,
                  kr(c)
                );
              }),
              C(l, (c) => {
                this.computeLookaheadFunc(
                  r,
                  c.idx,
                  1280,
                  'RepetitionWithSeparator',
                  c.maxLookahead,
                  kr(c)
                );
              });
          });
        });
      }
      computeLookaheadFunc(e, r, n, i, o, a) {
        this.TRACE_INIT(`${a}${r === 0 ? '' : r}`, () => {
          let s = this.lookaheadStrategy.buildLookaheadForOptional({
              prodOccurrence: r,
              rule: e,
              maxLookahead: o || this.maxLookahead,
              dynamicTokensEnabled: this.dynamicTokensEnabled,
              prodType: i,
            }),
            l = vf(this.fullRuleNameToShort[e.name], n, r);
          this.setLaFuncCache(l, s);
        });
      }
      getKeyForAutomaticLookahead(e, r) {
        let n = this.getLastExplicitRuleShortName();
        return vf(n, e, r);
      }
      getLaFuncFromCache(e) {
        return this.lookAheadFuncsCache.get(e);
      }
      setLaFuncCache(e, r) {
        this.lookAheadFuncsCache.set(e, r);
      }
    }),
      (pg = class extends ar {
        constructor() {
          super(...arguments),
            (this.dslMethods = {
              option: [],
              alternation: [],
              repetition: [],
              repetitionWithSeparator: [],
              repetitionMandatory: [],
              repetitionMandatoryWithSeparator: [],
            });
        }
        reset() {
          this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: [],
          };
        }
        visitOption(e) {
          this.dslMethods.option.push(e);
        }
        visitRepetitionWithSeparator(e) {
          this.dslMethods.repetitionWithSeparator.push(e);
        }
        visitRepetitionMandatory(e) {
          this.dslMethods.repetitionMandatory.push(e);
        }
        visitRepetitionMandatoryWithSeparator(e) {
          this.dslMethods.repetitionMandatoryWithSeparator.push(e);
        }
        visitRepetition(e) {
          this.dslMethods.repetition.push(e);
        }
        visitAlternation(e) {
          this.dslMethods.alternation.push(e);
        }
      }),
      (Lf = new pg());
  });
function gg(t, e) {
  isNaN(t.startOffset) === !0
    ? ((t.startOffset = e.startOffset), (t.endOffset = e.endOffset))
    : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function xg(t, e) {
  isNaN(t.startOffset) === !0
    ? ((t.startOffset = e.startOffset),
      (t.startColumn = e.startColumn),
      (t.startLine = e.startLine),
      (t.endOffset = e.endOffset),
      (t.endColumn = e.endColumn),
      (t.endLine = e.endLine))
    : t.endOffset < e.endOffset &&
      ((t.endOffset = e.endOffset),
      (t.endColumn = e.endColumn),
      (t.endLine = e.endLine));
}
function Hw(t, e, r) {
  t.children[r] === void 0 ? (t.children[r] = [e]) : t.children[r].push(e);
}
function Gw(t, e, r) {
  t.children[e] === void 0 ? (t.children[e] = [r]) : t.children[e].push(r);
}
var jw = f(() => {});
function yg(t, e) {
  Object.defineProperty(t, f9, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e,
  });
}
var f9,
  Yw = f(() => {
    f9 = 'name';
  });
function h9(t, e) {
  let r = vt(t),
    n = r.length;
  for (let i = 0; i < n; i++) {
    let o = r[i],
      a = t[o],
      s = a.length;
    for (let l = 0; l < s; l++) {
      let c = a[l];
      c.tokenTypeIdx === void 0 && this[c.name](c.children, e);
    }
  }
}
function Vw(t, e) {
  let r = function () {};
  yg(r, t + 'BaseSemantics');
  let n = {
    visit: function (i, o) {
      if ((K(i) && (i = i[0]), !xt(i))) return this[i.name](i.children, o);
    },
    validateVisitor: function () {
      let i = p9(this, e);
      if (!dt(i)) {
        let o = z(i, (a) => a.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o
    .join(
      `

`
    )
    .replace(
      /\n/g,
      `
	`
    )}`);
      }
    },
  };
  return (
    (r.prototype = n), (r.prototype.constructor = r), (r._RULE_NAMES = e), r
  );
}
function Xw(t, e, r) {
  let n = function () {};
  yg(n, t + 'BaseSemanticsWithDefaults');
  let i = Object.create(r.prototype);
  return (
    C(e, (o) => {
      i[o] = h9;
    }),
    (n.prototype = i),
    (n.prototype.constructor = n),
    n
  );
}
function p9(t, e) {
  return d9(t, e);
}
function d9(t, e) {
  let r = Rt(e, (i) => we(t[i]) === !1),
    n = z(r, (i) => ({
      msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
      type: bg.MISSING_METHOD,
      methodName: i,
    }));
  return Nn(n);
}
var bg,
  Kw = f(() => {
    tt();
    Yw();
    (function (t) {
      (t[(t.REDUNDANT_METHOD = 0)] = 'REDUNDANT_METHOD'),
        (t[(t.MISSING_METHOD = 1)] = 'MISSING_METHOD');
    })(bg || (bg = {}));
  });
var Ff,
  Zw = f(() => {
    jw();
    tt();
    Kw();
    Er();
    Ff = class {
      initTreeBuilder(e) {
        if (
          ((this.CST_STACK = []),
          (this.outputCst = e.outputCst),
          (this.nodeLocationTracking = B(e, 'nodeLocationTracking')
            ? e.nodeLocationTracking
            : lr.nodeLocationTracking),
          !this.outputCst)
        )
          (this.cstInvocationStateUpdate = ue),
            (this.cstFinallyStateUpdate = ue),
            (this.cstPostTerminal = ue),
            (this.cstPostNonTerminal = ue),
            (this.cstPostRule = ue);
        else if (/full/i.test(this.nodeLocationTracking))
          this.recoveryEnabled
            ? ((this.setNodeLocationFromToken = xg),
              (this.setNodeLocationFromNode = xg),
              (this.cstPostRule = ue),
              (this.setInitialNodeLocation =
                this.setInitialNodeLocationFullRecovery))
            : ((this.setNodeLocationFromToken = ue),
              (this.setNodeLocationFromNode = ue),
              (this.cstPostRule = this.cstPostRuleFull),
              (this.setInitialNodeLocation =
                this.setInitialNodeLocationFullRegular));
        else if (/onlyOffset/i.test(this.nodeLocationTracking))
          this.recoveryEnabled
            ? ((this.setNodeLocationFromToken = gg),
              (this.setNodeLocationFromNode = gg),
              (this.cstPostRule = ue),
              (this.setInitialNodeLocation =
                this.setInitialNodeLocationOnlyOffsetRecovery))
            : ((this.setNodeLocationFromToken = ue),
              (this.setNodeLocationFromNode = ue),
              (this.cstPostRule = this.cstPostRuleOnlyOffset),
              (this.setInitialNodeLocation =
                this.setInitialNodeLocationOnlyOffsetRegular));
        else if (/none/i.test(this.nodeLocationTracking))
          (this.setNodeLocationFromToken = ue),
            (this.setNodeLocationFromNode = ue),
            (this.cstPostRule = ue),
            (this.setInitialNodeLocation = ue);
        else
          throw Error(
            `Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`
          );
      }
      setInitialNodeLocationOnlyOffsetRecovery(e) {
        e.location = { startOffset: NaN, endOffset: NaN };
      }
      setInitialNodeLocationOnlyOffsetRegular(e) {
        e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN };
      }
      setInitialNodeLocationFullRecovery(e) {
        e.location = {
          startOffset: NaN,
          startLine: NaN,
          startColumn: NaN,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN,
        };
      }
      setInitialNodeLocationFullRegular(e) {
        let r = this.LA(1);
        e.location = {
          startOffset: r.startOffset,
          startLine: r.startLine,
          startColumn: r.startColumn,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN,
        };
      }
      cstInvocationStateUpdate(e) {
        let r = { name: e, children: Object.create(null) };
        this.setInitialNodeLocation(r), this.CST_STACK.push(r);
      }
      cstFinallyStateUpdate() {
        this.CST_STACK.pop();
      }
      cstPostRuleFull(e) {
        let r = this.LA(0),
          n = e.location;
        n.startOffset <= r.startOffset
          ? ((n.endOffset = r.endOffset),
            (n.endLine = r.endLine),
            (n.endColumn = r.endColumn))
          : ((n.startOffset = NaN), (n.startLine = NaN), (n.startColumn = NaN));
      }
      cstPostRuleOnlyOffset(e) {
        let r = this.LA(0),
          n = e.location;
        n.startOffset <= r.startOffset
          ? (n.endOffset = r.endOffset)
          : (n.startOffset = NaN);
      }
      cstPostTerminal(e, r) {
        let n = this.CST_STACK[this.CST_STACK.length - 1];
        Hw(n, r, e), this.setNodeLocationFromToken(n.location, r);
      }
      cstPostNonTerminal(e, r) {
        let n = this.CST_STACK[this.CST_STACK.length - 1];
        Gw(n, r, e), this.setNodeLocationFromNode(n.location, e.location);
      }
      getBaseCstVisitorConstructor() {
        if (xt(this.baseCstVisitorConstructor)) {
          let e = Vw(this.className, vt(this.gastProductionsCache));
          return (this.baseCstVisitorConstructor = e), e;
        }
        return this.baseCstVisitorConstructor;
      }
      getBaseCstVisitorConstructorWithDefaults() {
        if (xt(this.baseCstVisitorWithDefaultsConstructor)) {
          let e = Xw(
            this.className,
            vt(this.gastProductionsCache),
            this.getBaseCstVisitorConstructor()
          );
          return (this.baseCstVisitorWithDefaultsConstructor = e), e;
        }
        return this.baseCstVisitorWithDefaultsConstructor;
      }
      getLastExplicitRuleShortName() {
        let e = this.RULE_STACK;
        return e[e.length - 1];
      }
      getPreviousExplicitRuleShortName() {
        let e = this.RULE_STACK;
        return e[e.length - 2];
      }
      getLastExplicitRuleOccurrenceIndex() {
        let e = this.RULE_OCCURRENCE_STACK;
        return e[e.length - 1];
      }
    };
  });
var Mf,
  Qw = f(() => {
    Er();
    Mf = class {
      initLexerAdapter() {
        (this.tokVector = []), (this.tokVectorLength = 0), (this.currIdx = -1);
      }
      set input(e) {
        if (this.selfAnalysisDone !== !0)
          throw Error(
            "Missing <performSelfAnalysis> invocation at the end of the Parser's constructor."
          );
        this.reset(), (this.tokVector = e), (this.tokVectorLength = e.length);
      }
      get input() {
        return this.tokVector;
      }
      SKIP_TOKEN() {
        return this.currIdx <= this.tokVector.length - 2
          ? (this.consumeToken(), this.LA(1))
          : es;
      }
      LA(e) {
        let r = this.currIdx + e;
        return r < 0 || this.tokVectorLength <= r ? es : this.tokVector[r];
      }
      consumeToken() {
        this.currIdx++;
      }
      exportLexerState() {
        return this.currIdx;
      }
      importLexerState(e) {
        this.currIdx = e;
      }
      resetLexerState() {
        this.currIdx = -1;
      }
      moveToTerminatedState() {
        this.currIdx = this.tokVector.length - 1;
      }
      getLexerPosition() {
        return this.exportLexerState();
      }
    };
  });
var Bf,
  Jw = f(() => {
    tt();
    ts();
    Er();
    Ka();
    gl();
    sr();
    Bf = class {
      ACTION(e) {
        return e.call(this);
      }
      consume(e, r, n) {
        return this.consumeInternal(r, e, n);
      }
      subrule(e, r, n) {
        return this.subruleInternal(r, e, n);
      }
      option(e, r) {
        return this.optionInternal(r, e);
      }
      or(e, r) {
        return this.orInternal(r, e);
      }
      many(e, r) {
        return this.manyInternal(e, r);
      }
      atLeastOne(e, r) {
        return this.atLeastOneInternal(e, r);
      }
      CONSUME(e, r) {
        return this.consumeInternal(e, 0, r);
      }
      CONSUME1(e, r) {
        return this.consumeInternal(e, 1, r);
      }
      CONSUME2(e, r) {
        return this.consumeInternal(e, 2, r);
      }
      CONSUME3(e, r) {
        return this.consumeInternal(e, 3, r);
      }
      CONSUME4(e, r) {
        return this.consumeInternal(e, 4, r);
      }
      CONSUME5(e, r) {
        return this.consumeInternal(e, 5, r);
      }
      CONSUME6(e, r) {
        return this.consumeInternal(e, 6, r);
      }
      CONSUME7(e, r) {
        return this.consumeInternal(e, 7, r);
      }
      CONSUME8(e, r) {
        return this.consumeInternal(e, 8, r);
      }
      CONSUME9(e, r) {
        return this.consumeInternal(e, 9, r);
      }
      SUBRULE(e, r) {
        return this.subruleInternal(e, 0, r);
      }
      SUBRULE1(e, r) {
        return this.subruleInternal(e, 1, r);
      }
      SUBRULE2(e, r) {
        return this.subruleInternal(e, 2, r);
      }
      SUBRULE3(e, r) {
        return this.subruleInternal(e, 3, r);
      }
      SUBRULE4(e, r) {
        return this.subruleInternal(e, 4, r);
      }
      SUBRULE5(e, r) {
        return this.subruleInternal(e, 5, r);
      }
      SUBRULE6(e, r) {
        return this.subruleInternal(e, 6, r);
      }
      SUBRULE7(e, r) {
        return this.subruleInternal(e, 7, r);
      }
      SUBRULE8(e, r) {
        return this.subruleInternal(e, 8, r);
      }
      SUBRULE9(e, r) {
        return this.subruleInternal(e, 9, r);
      }
      OPTION(e) {
        return this.optionInternal(e, 0);
      }
      OPTION1(e) {
        return this.optionInternal(e, 1);
      }
      OPTION2(e) {
        return this.optionInternal(e, 2);
      }
      OPTION3(e) {
        return this.optionInternal(e, 3);
      }
      OPTION4(e) {
        return this.optionInternal(e, 4);
      }
      OPTION5(e) {
        return this.optionInternal(e, 5);
      }
      OPTION6(e) {
        return this.optionInternal(e, 6);
      }
      OPTION7(e) {
        return this.optionInternal(e, 7);
      }
      OPTION8(e) {
        return this.optionInternal(e, 8);
      }
      OPTION9(e) {
        return this.optionInternal(e, 9);
      }
      OR(e) {
        return this.orInternal(e, 0);
      }
      OR1(e) {
        return this.orInternal(e, 1);
      }
      OR2(e) {
        return this.orInternal(e, 2);
      }
      OR3(e) {
        return this.orInternal(e, 3);
      }
      OR4(e) {
        return this.orInternal(e, 4);
      }
      OR5(e) {
        return this.orInternal(e, 5);
      }
      OR6(e) {
        return this.orInternal(e, 6);
      }
      OR7(e) {
        return this.orInternal(e, 7);
      }
      OR8(e) {
        return this.orInternal(e, 8);
      }
      OR9(e) {
        return this.orInternal(e, 9);
      }
      MANY(e) {
        this.manyInternal(0, e);
      }
      MANY1(e) {
        this.manyInternal(1, e);
      }
      MANY2(e) {
        this.manyInternal(2, e);
      }
      MANY3(e) {
        this.manyInternal(3, e);
      }
      MANY4(e) {
        this.manyInternal(4, e);
      }
      MANY5(e) {
        this.manyInternal(5, e);
      }
      MANY6(e) {
        this.manyInternal(6, e);
      }
      MANY7(e) {
        this.manyInternal(7, e);
      }
      MANY8(e) {
        this.manyInternal(8, e);
      }
      MANY9(e) {
        this.manyInternal(9, e);
      }
      MANY_SEP(e) {
        this.manySepFirstInternal(0, e);
      }
      MANY_SEP1(e) {
        this.manySepFirstInternal(1, e);
      }
      MANY_SEP2(e) {
        this.manySepFirstInternal(2, e);
      }
      MANY_SEP3(e) {
        this.manySepFirstInternal(3, e);
      }
      MANY_SEP4(e) {
        this.manySepFirstInternal(4, e);
      }
      MANY_SEP5(e) {
        this.manySepFirstInternal(5, e);
      }
      MANY_SEP6(e) {
        this.manySepFirstInternal(6, e);
      }
      MANY_SEP7(e) {
        this.manySepFirstInternal(7, e);
      }
      MANY_SEP8(e) {
        this.manySepFirstInternal(8, e);
      }
      MANY_SEP9(e) {
        this.manySepFirstInternal(9, e);
      }
      AT_LEAST_ONE(e) {
        this.atLeastOneInternal(0, e);
      }
      AT_LEAST_ONE1(e) {
        return this.atLeastOneInternal(1, e);
      }
      AT_LEAST_ONE2(e) {
        this.atLeastOneInternal(2, e);
      }
      AT_LEAST_ONE3(e) {
        this.atLeastOneInternal(3, e);
      }
      AT_LEAST_ONE4(e) {
        this.atLeastOneInternal(4, e);
      }
      AT_LEAST_ONE5(e) {
        this.atLeastOneInternal(5, e);
      }
      AT_LEAST_ONE6(e) {
        this.atLeastOneInternal(6, e);
      }
      AT_LEAST_ONE7(e) {
        this.atLeastOneInternal(7, e);
      }
      AT_LEAST_ONE8(e) {
        this.atLeastOneInternal(8, e);
      }
      AT_LEAST_ONE9(e) {
        this.atLeastOneInternal(9, e);
      }
      AT_LEAST_ONE_SEP(e) {
        this.atLeastOneSepFirstInternal(0, e);
      }
      AT_LEAST_ONE_SEP1(e) {
        this.atLeastOneSepFirstInternal(1, e);
      }
      AT_LEAST_ONE_SEP2(e) {
        this.atLeastOneSepFirstInternal(2, e);
      }
      AT_LEAST_ONE_SEP3(e) {
        this.atLeastOneSepFirstInternal(3, e);
      }
      AT_LEAST_ONE_SEP4(e) {
        this.atLeastOneSepFirstInternal(4, e);
      }
      AT_LEAST_ONE_SEP5(e) {
        this.atLeastOneSepFirstInternal(5, e);
      }
      AT_LEAST_ONE_SEP6(e) {
        this.atLeastOneSepFirstInternal(6, e);
      }
      AT_LEAST_ONE_SEP7(e) {
        this.atLeastOneSepFirstInternal(7, e);
      }
      AT_LEAST_ONE_SEP8(e) {
        this.atLeastOneSepFirstInternal(8, e);
      }
      AT_LEAST_ONE_SEP9(e) {
        this.atLeastOneSepFirstInternal(9, e);
      }
      RULE(e, r, n = rs) {
        if (re(this.definedRulesNames, e)) {
          let a = {
            message: pn.buildDuplicateRuleNameError({
              topLevelRule: e,
              grammarName: this.className,
            }),
            type: Le.DUPLICATE_RULE_NAME,
            ruleName: e,
          };
          this.definitionErrors.push(a);
        }
        this.definedRulesNames.push(e);
        let i = this.defineRule(e, r, n);
        return (this[e] = i), i;
      }
      OVERRIDE_RULE(e, r, n = rs) {
        let i = Ow(e, this.definedRulesNames, this.className);
        this.definitionErrors = this.definitionErrors.concat(i);
        let o = this.defineRule(e, r, n);
        return (this[e] = o), o;
      }
      BACKTRACK(e, r) {
        return function () {
          this.isBackTrackingStack.push(1);
          let n = this.saveRecogState();
          try {
            return e.apply(this, r), !0;
          } catch (i) {
            if (Ni(i)) return !1;
            throw i;
          } finally {
            this.reloadRecogState(n), this.isBackTrackingStack.pop();
          }
        };
      }
      getGAstProductions() {
        return this.gastProductionsCache;
      }
      getSerializedGastProductions() {
        return rf(_t(this.gastProductionsCache));
      }
    };
  });
var Pf,
  tS = f(() => {
    tt();
    Af();
    ts();
    Qa();
    hl();
    Er();
    fg();
    Io();
    vo();
    Pf = class {
      initRecognizerEngine(e, r) {
        if (
          ((this.className = this.constructor.name),
          (this.shortRuleNameToFull = {}),
          (this.fullRuleNameToShort = {}),
          (this.ruleShortNameIdx = 256),
          (this.tokenMatcher = Xa),
          (this.subruleIdx = 0),
          (this.definedRulesNames = []),
          (this.tokensMap = {}),
          (this.isBackTrackingStack = []),
          (this.RULE_STACK = []),
          (this.RULE_OCCURRENCE_STACK = []),
          (this.gastProductionsCache = {}),
          B(r, 'serializedGrammar'))
        )
          throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
        if (K(e)) {
          if (dt(e))
            throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
          if (typeof e[0].startOffset == 'number')
            throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
        }
        if (K(e)) this.tokensMap = Mt(e, (o, a) => ((o[a.name] = a), o), {});
        else if (B(e, 'modes') && Je(Ot(_t(e.modes)), lw)) {
          let o = Ot(_t(e.modes)),
            a = $a(o);
          this.tokensMap = Mt(a, (s, l) => ((s[l.name] = l), s), {});
        } else if (Wt(e)) this.tokensMap = Ut(e);
        else
          throw new Error(
            '<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition'
          );
        this.tokensMap.EOF = hn;
        let n = B(e, 'modes') ? Ot(_t(e.modes)) : _t(e),
          i = Je(n, (o) => dt(o.categoryMatches));
        (this.tokenMatcher = i ? Xa : ti), ei(_t(this.tokensMap));
      }
      defineRule(e, r, n) {
        if (this.selfAnalysisDone)
          throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
        let i = B(n, 'resyncEnabled') ? n.resyncEnabled : rs.resyncEnabled,
          o = B(n, 'recoveryValueFunc')
            ? n.recoveryValueFunc
            : rs.recoveryValueFunc,
          a = this.ruleShortNameIdx << (4 + 8);
        this.ruleShortNameIdx++,
          (this.shortRuleNameToFull[a] = e),
          (this.fullRuleNameToShort[e] = a);
        let s;
        return (
          this.outputCst === !0
            ? (s = function (...u) {
                try {
                  this.ruleInvocationStateUpdate(a, e, this.subruleIdx),
                    r.apply(this, u);
                  let h = this.CST_STACK[this.CST_STACK.length - 1];
                  return this.cstPostRule(h), h;
                } catch (h) {
                  return this.invokeRuleCatch(h, i, o);
                } finally {
                  this.ruleFinallyStateUpdate();
                }
              })
            : (s = function (...u) {
                try {
                  return (
                    this.ruleInvocationStateUpdate(a, e, this.subruleIdx),
                    r.apply(this, u)
                  );
                } catch (h) {
                  return this.invokeRuleCatch(h, i, o);
                } finally {
                  this.ruleFinallyStateUpdate();
                }
              }),
          Object.assign(s, { ruleName: e, originalGrammarAction: r })
        );
      }
      invokeRuleCatch(e, r, n) {
        let i = this.RULE_STACK.length === 1,
          o = r && !this.isBackTracking() && this.recoveryEnabled;
        if (Ni(e)) {
          let a = e;
          if (o) {
            let s = this.findReSyncTokenType();
            if (this.isInCurrentRuleReSyncSet(s))
              if (((a.resyncedTokens = this.reSyncTo(s)), this.outputCst)) {
                let l = this.CST_STACK[this.CST_STACK.length - 1];
                return (l.recoveredNode = !0), l;
              } else return n(e);
            else {
              if (this.outputCst) {
                let l = this.CST_STACK[this.CST_STACK.length - 1];
                (l.recoveredNode = !0), (a.partialCstResult = l);
              }
              throw a;
            }
          } else {
            if (i) return this.moveToTerminatedState(), n(e);
            throw a;
          }
        } else throw e;
      }
      optionInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(512, r);
        return this.optionInternalLogic(e, r, n);
      }
      optionInternalLogic(e, r, n) {
        let i = this.getLaFuncFromCache(n),
          o;
        if (typeof e != 'function') {
          o = e.DEF;
          let a = e.GATE;
          if (a !== void 0) {
            let s = i;
            i = () => a.call(this) && s.call(this);
          }
        } else o = e;
        if (i.call(this) === !0) return o.call(this);
      }
      atLeastOneInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(1024, e);
        return this.atLeastOneInternalLogic(e, r, n);
      }
      atLeastOneInternalLogic(e, r, n) {
        let i = this.getLaFuncFromCache(n),
          o;
        if (typeof r != 'function') {
          o = r.DEF;
          let a = r.GATE;
          if (a !== void 0) {
            let s = i;
            i = () => a.call(this) && s.call(this);
          }
        } else o = r;
        if (i.call(this) === !0) {
          let a = this.doSingleRepetition(o);
          for (; i.call(this) === !0 && a === !0; )
            a = this.doSingleRepetition(o);
        } else
          throw this.raiseEarlyExitException(
            e,
            he.REPETITION_MANDATORY,
            r.ERR_MSG
          );
        this.attemptInRepetitionRecovery(
          this.atLeastOneInternal,
          [e, r],
          i,
          1024,
          e,
          bf
        );
      }
      atLeastOneSepFirstInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(1536, e);
        this.atLeastOneSepFirstInternalLogic(e, r, n);
      }
      atLeastOneSepFirstInternalLogic(e, r, n) {
        let i = r.DEF,
          o = r.SEP;
        if (this.getLaFuncFromCache(n).call(this) === !0) {
          i.call(this);
          let s = () => this.tokenMatcher(this.LA(1), o);
          for (; this.tokenMatcher(this.LA(1), o) === !0; )
            this.CONSUME(o), i.call(this);
          this.attemptInRepetitionRecovery(
            this.repetitionSepSecondInternal,
            [e, o, s, i, fl],
            s,
            1536,
            e,
            fl
          );
        } else
          throw this.raiseEarlyExitException(
            e,
            he.REPETITION_MANDATORY_WITH_SEPARATOR,
            r.ERR_MSG
          );
      }
      manyInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(768, e);
        return this.manyInternalLogic(e, r, n);
      }
      manyInternalLogic(e, r, n) {
        let i = this.getLaFuncFromCache(n),
          o;
        if (typeof r != 'function') {
          o = r.DEF;
          let s = r.GATE;
          if (s !== void 0) {
            let l = i;
            i = () => s.call(this) && l.call(this);
          }
        } else o = r;
        let a = !0;
        for (; i.call(this) === !0 && a === !0; )
          a = this.doSingleRepetition(o);
        this.attemptInRepetitionRecovery(
          this.manyInternal,
          [e, r],
          i,
          768,
          e,
          yf,
          a
        );
      }
      manySepFirstInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(1280, e);
        this.manySepFirstInternalLogic(e, r, n);
      }
      manySepFirstInternalLogic(e, r, n) {
        let i = r.DEF,
          o = r.SEP;
        if (this.getLaFuncFromCache(n).call(this) === !0) {
          i.call(this);
          let s = () => this.tokenMatcher(this.LA(1), o);
          for (; this.tokenMatcher(this.LA(1), o) === !0; )
            this.CONSUME(o), i.call(this);
          this.attemptInRepetitionRecovery(
            this.repetitionSepSecondInternal,
            [e, o, s, i, ul],
            s,
            1280,
            e,
            ul
          );
        }
      }
      repetitionSepSecondInternal(e, r, n, i, o) {
        for (; n(); ) this.CONSUME(r), i.call(this);
        this.attemptInRepetitionRecovery(
          this.repetitionSepSecondInternal,
          [e, r, n, i, o],
          n,
          1536,
          e,
          o
        );
      }
      doSingleRepetition(e) {
        let r = this.getLexerPosition();
        return e.call(this), this.getLexerPosition() > r;
      }
      orInternal(e, r) {
        let n = this.getKeyForAutomaticLookahead(256, r),
          i = K(e) ? e : e.DEF,
          a = this.getLaFuncFromCache(n).call(this, i);
        if (a !== void 0) return i[a].ALT.call(this);
        this.raiseNoAltException(r, e.ERR_MSG);
      }
      ruleFinallyStateUpdate() {
        if (
          (this.RULE_STACK.pop(),
          this.RULE_OCCURRENCE_STACK.pop(),
          this.cstFinallyStateUpdate(),
          this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1)
        ) {
          let e = this.LA(1),
            r = this.errorMessageProvider.buildNotAllInputParsedMessage({
              firstRedundant: e,
              ruleName: this.getCurrRuleFullName(),
            });
          this.SAVE_ERROR(new yl(r, e));
        }
      }
      subruleInternal(e, r, n) {
        let i;
        try {
          let o = n !== void 0 ? n.ARGS : void 0;
          return (
            (this.subruleIdx = r),
            (i = e.apply(this, o)),
            this.cstPostNonTerminal(
              i,
              n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.ruleName
            ),
            i
          );
        } catch (o) {
          throw this.subruleInternalError(o, n, e.ruleName);
        }
      }
      subruleInternalError(e, r, n) {
        throw (
          (Ni(e) &&
            e.partialCstResult !== void 0 &&
            (this.cstPostNonTerminal(
              e.partialCstResult,
              r !== void 0 && r.LABEL !== void 0 ? r.LABEL : n
            ),
            delete e.partialCstResult),
          e)
        );
      }
      consumeInternal(e, r, n) {
        let i;
        try {
          let o = this.LA(1);
          this.tokenMatcher(o, e) === !0
            ? (this.consumeToken(), (i = o))
            : this.consumeInternalError(e, o, n);
        } catch (o) {
          i = this.consumeInternalRecovery(e, r, o);
        }
        return (
          this.cstPostTerminal(
            n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.name,
            i
          ),
          i
        );
      }
      consumeInternalError(e, r, n) {
        let i,
          o = this.LA(0);
        throw (
          (n !== void 0 && n.ERR_MSG
            ? (i = n.ERR_MSG)
            : (i = this.errorMessageProvider.buildMismatchTokenMessage({
                expected: e,
                actual: r,
                previous: o,
                ruleName: this.getCurrRuleFullName(),
              })),
          this.SAVE_ERROR(new Oo(i, r, o)))
        );
      }
      consumeInternalRecovery(e, r, n) {
        if (
          this.recoveryEnabled &&
          n.name === 'MismatchedTokenException' &&
          !this.isBackTracking()
        ) {
          let i = this.getFollowsForInRuleRecovery(e, r);
          try {
            return this.tryInRuleRecovery(e, i);
          } catch (o) {
            throw o.name === ug ? n : o;
          }
        } else throw n;
      }
      saveRecogState() {
        let e = this.errors,
          r = Ut(this.RULE_STACK);
        return {
          errors: e,
          lexerState: this.exportLexerState(),
          RULE_STACK: r,
          CST_STACK: this.CST_STACK,
        };
      }
      reloadRecogState(e) {
        (this.errors = e.errors),
          this.importLexerState(e.lexerState),
          (this.RULE_STACK = e.RULE_STACK);
      }
      ruleInvocationStateUpdate(e, r, n) {
        this.RULE_OCCURRENCE_STACK.push(n),
          this.RULE_STACK.push(e),
          this.cstInvocationStateUpdate(r);
      }
      isBackTracking() {
        return this.isBackTrackingStack.length !== 0;
      }
      getCurrRuleFullName() {
        let e = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull[e];
      }
      shortRuleNameToFullName(e) {
        return this.shortRuleNameToFull[e];
      }
      isAtEndOfInput() {
        return this.tokenMatcher(this.LA(1), hn);
      }
      reset() {
        this.resetLexerState(),
          (this.subruleIdx = 0),
          (this.isBackTrackingStack = []),
          (this.errors = []),
          (this.RULE_STACK = []),
          (this.CST_STACK = []),
          (this.RULE_OCCURRENCE_STACK = []);
      }
    };
  });
var Df,
  eS = f(() => {
    ts();
    tt();
    Qa();
    Er();
    Df = class {
      initErrorHandler(e) {
        (this._errors = []),
          (this.errorMessageProvider = B(e, 'errorMessageProvider')
            ? e.errorMessageProvider
            : lr.errorMessageProvider);
      }
      SAVE_ERROR(e) {
        if (Ni(e))
          return (
            (e.context = {
              ruleStack: this.getHumanReadableRuleStack(),
              ruleOccurrenceStack: Ut(this.RULE_OCCURRENCE_STACK),
            }),
            this._errors.push(e),
            e
          );
        throw Error(
          'Trying to save an Error which is not a RecognitionException'
        );
      }
      get errors() {
        return Ut(this._errors);
      }
      set errors(e) {
        this._errors = e;
      }
      raiseEarlyExitException(e, r, n) {
        let i = this.getCurrRuleFullName(),
          o = this.getGAstProductions()[i],
          s = dl(e, o, r, this.maxLookahead)[0],
          l = [];
        for (let u = 1; u <= this.maxLookahead; u++) l.push(this.LA(u));
        let c = this.errorMessageProvider.buildEarlyExitMessage({
          expectedIterationPaths: s,
          actual: l,
          previous: this.LA(0),
          customUserDescription: n,
          ruleName: i,
        });
        throw this.SAVE_ERROR(new bl(c, this.LA(1), this.LA(0)));
      }
      raiseNoAltException(e, r) {
        let n = this.getCurrRuleFullName(),
          i = this.getGAstProductions()[n],
          o = pl(e, i, this.maxLookahead),
          a = [];
        for (let c = 1; c <= this.maxLookahead; c++) a.push(this.LA(c));
        let s = this.LA(0),
          l = this.errorMessageProvider.buildNoViableAltMessage({
            expectedPathsPerAlt: o,
            actual: a,
            previous: s,
            customUserDescription: r,
            ruleName: this.getCurrRuleFullName(),
          });
        throw this.SAVE_ERROR(new xl(l, this.LA(1), s));
      }
    };
  });
var Uf,
  rS = f(() => {
    hl();
    tt();
    Uf = class {
      initContentAssist() {}
      computeContentAssist(e, r) {
        let n = this.gastProductionsCache[e];
        if (xt(n)) throw Error(`Rule ->${e}<- does not exist in this grammar.`);
        return Cf([n], r, this.tokenMatcher, this.maxLookahead);
      }
      getNextPossibleTokenTypes(e) {
        let r = $e(e.ruleStack),
          i = this.getGAstProductions()[r];
        return new xf(i, e).startWalking();
      }
    };
  });
function Tl(t, e, r, n = !1) {
  $f(r);
  let i = Xe(this.recordingProdStack),
    o = we(e) ? e : e.DEF,
    a = new t({ definition: [], idx: r });
  return (
    n && (a.separator = e.SEP),
    B(e, 'MAX_LOOKAHEAD') && (a.maxLookahead = e.MAX_LOOKAHEAD),
    this.recordingProdStack.push(a),
    o.call(this),
    i.definition.push(a),
    this.recordingProdStack.pop(),
    Wf
  );
}
function x9(t, e) {
  $f(e);
  let r = Xe(this.recordingProdStack),
    n = K(t) === !1,
    i = n === !1 ? t : t.DEF,
    o = new ge({
      definition: [],
      idx: e,
      ignoreAmbiguities: n && t.IGNORE_AMBIGUITIES === !0,
    });
  B(t, 'MAX_LOOKAHEAD') && (o.maxLookahead = t.MAX_LOOKAHEAD);
  let a = Js(i, (s) => we(s.GATE));
  return (
    (o.hasPredicates = a),
    r.definition.push(o),
    C(i, (s) => {
      let l = new Yt({ definition: [] });
      o.definition.push(l),
        B(s, 'IGNORE_AMBIGUITIES')
          ? (l.ignoreAmbiguities = s.IGNORE_AMBIGUITIES)
          : B(s, 'GATE') && (l.ignoreAmbiguities = !0),
        this.recordingProdStack.push(l),
        s.ALT.call(this),
        this.recordingProdStack.pop();
    }),
    Wf
  );
}
function oS(t) {
  return t === 0 ? '' : `${t}`;
}
function $f(t) {
  if (t < 0 || t > iS) {
    let e = new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${iS + 1}`);
    throw ((e.KNOWN_RECORDER_ERROR = !0), e);
  }
}
var Wf,
  nS,
  iS,
  aS,
  sS,
  g9,
  zf,
  lS = f(() => {
    tt();
    sr();
    ll();
    vo();
    Io();
    Er();
    Af();
    Wf = {
      description: 'This Object indicates the Parser is during Recording Phase',
    };
    Object.freeze(Wf);
    (nS = !0),
      (iS = Math.pow(2, 8) - 1),
      (aS = zt({ name: 'RECORDING_PHASE_TOKEN', pattern: fe.NA }));
    ei([aS]);
    sS = Lo(
      aS,
      `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    );
    Object.freeze(sS);
    (g9 = {
      name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
      children: {},
    }),
      (zf = class {
        initGastRecorder(e) {
          (this.recordingProdStack = []), (this.RECORDING_PHASE = !1);
        }
        enableRecording() {
          (this.RECORDING_PHASE = !0),
            this.TRACE_INIT('Enable Recording', () => {
              for (let e = 0; e < 10; e++) {
                let r = e > 0 ? e : '';
                (this[`CONSUME${r}`] = function (n, i) {
                  return this.consumeInternalRecord(n, e, i);
                }),
                  (this[`SUBRULE${r}`] = function (n, i) {
                    return this.subruleInternalRecord(n, e, i);
                  }),
                  (this[`OPTION${r}`] = function (n) {
                    return this.optionInternalRecord(n, e);
                  }),
                  (this[`OR${r}`] = function (n) {
                    return this.orInternalRecord(n, e);
                  }),
                  (this[`MANY${r}`] = function (n) {
                    this.manyInternalRecord(e, n);
                  }),
                  (this[`MANY_SEP${r}`] = function (n) {
                    this.manySepFirstInternalRecord(e, n);
                  }),
                  (this[`AT_LEAST_ONE${r}`] = function (n) {
                    this.atLeastOneInternalRecord(e, n);
                  }),
                  (this[`AT_LEAST_ONE_SEP${r}`] = function (n) {
                    this.atLeastOneSepFirstInternalRecord(e, n);
                  });
              }
              (this.consume = function (e, r, n) {
                return this.consumeInternalRecord(r, e, n);
              }),
                (this.subrule = function (e, r, n) {
                  return this.subruleInternalRecord(r, e, n);
                }),
                (this.option = function (e, r) {
                  return this.optionInternalRecord(r, e);
                }),
                (this.or = function (e, r) {
                  return this.orInternalRecord(r, e);
                }),
                (this.many = function (e, r) {
                  this.manyInternalRecord(e, r);
                }),
                (this.atLeastOne = function (e, r) {
                  this.atLeastOneInternalRecord(e, r);
                }),
                (this.ACTION = this.ACTION_RECORD),
                (this.BACKTRACK = this.BACKTRACK_RECORD),
                (this.LA = this.LA_RECORD);
            });
        }
        disableRecording() {
          (this.RECORDING_PHASE = !1),
            this.TRACE_INIT('Deleting Recording methods', () => {
              let e = this;
              for (let r = 0; r < 10; r++) {
                let n = r > 0 ? r : '';
                delete e[`CONSUME${n}`],
                  delete e[`SUBRULE${n}`],
                  delete e[`OPTION${n}`],
                  delete e[`OR${n}`],
                  delete e[`MANY${n}`],
                  delete e[`MANY_SEP${n}`],
                  delete e[`AT_LEAST_ONE${n}`],
                  delete e[`AT_LEAST_ONE_SEP${n}`];
              }
              delete e.consume,
                delete e.subrule,
                delete e.option,
                delete e.or,
                delete e.many,
                delete e.atLeastOne,
                delete e.ACTION,
                delete e.BACKTRACK,
                delete e.LA;
            });
        }
        ACTION_RECORD(e) {}
        BACKTRACK_RECORD(e, r) {
          return () => !0;
        }
        LA_RECORD(e) {
          return es;
        }
        topLevelRuleRecord(e, r) {
          try {
            let n = new or({ definition: [], name: e });
            return (
              (n.name = e),
              this.recordingProdStack.push(n),
              r.call(this),
              this.recordingProdStack.pop(),
              n
            );
          } catch (n) {
            if (n.KNOWN_RECORDER_ERROR !== !0)
              try {
                n.message =
                  n.message +
                  `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
              } catch {
                throw n;
              }
            throw n;
          }
        }
        optionInternalRecord(e, r) {
          return Tl.call(this, Qt, e, r);
        }
        atLeastOneInternalRecord(e, r) {
          Tl.call(this, Ce, r, e);
        }
        atLeastOneSepFirstInternalRecord(e, r) {
          Tl.call(this, Te, r, e, nS);
        }
        manyInternalRecord(e, r) {
          Tl.call(this, Nt, r, e);
        }
        manySepFirstInternalRecord(e, r) {
          Tl.call(this, me, r, e, nS);
        }
        orInternalRecord(e, r) {
          return x9.call(this, e, r);
        }
        subruleInternalRecord(e, r, n) {
          if (($f(r), !e || B(e, 'ruleName') === !1)) {
            let s = new Error(`<SUBRULE${oS(
              r
            )}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(
              e
            )}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
            throw ((s.KNOWN_RECORDER_ERROR = !0), s);
          }
          let i = Xe(this.recordingProdStack),
            o = e.ruleName,
            a = new jt({
              idx: r,
              nonTerminalName: o,
              label: n?.LABEL,
              referencedRule: void 0,
            });
          return i.definition.push(a), this.outputCst ? g9 : Wf;
        }
        consumeInternalRecord(e, r, n) {
          if (($f(r), !Km(e))) {
            let a = new Error(`<CONSUME${oS(
              r
            )}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(
              e
            )}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
            throw ((a.KNOWN_RECORDER_ERROR = !0), a);
          }
          let i = Xe(this.recordingProdStack),
            o = new St({ idx: r, terminalType: e, label: n?.LABEL });
          return i.definition.push(o), sS;
        }
      });
  });
var qf,
  cS = f(() => {
    tt();
    qa();
    Er();
    qf = class {
      initPerformanceTracer(e) {
        if (B(e, 'traceInitPerf')) {
          let r = e.traceInitPerf,
            n = typeof r == 'number';
          (this.traceInitMaxIdent = n ? r : 1 / 0),
            (this.traceInitPerf = n ? r > 0 : r);
        } else
          (this.traceInitMaxIdent = 0), (this.traceInitPerf = lr.traceInitPerf);
        this.traceInitIndent = -1;
      }
      TRACE_INIT(e, r) {
        if (this.traceInitPerf === !0) {
          this.traceInitIndent++;
          let n = new Array(this.traceInitIndent + 1).join('	');
          this.traceInitIndent < this.traceInitMaxIdent &&
            console.log(`${n}--> <${e}>`);
          let { time: i, value: o } = el(r),
            a = i > 10 ? console.warn : console.log;
          return (
            this.traceInitIndent < this.traceInitMaxIdent &&
              a(`${n}<-- <${e}> time: ${i}ms`),
            this.traceInitIndent--,
            o
          );
        } else return r();
      }
    };
  });
function uS(t, e) {
  e.forEach((r) => {
    let n = r.prototype;
    Object.getOwnPropertyNames(n).forEach((i) => {
      if (i === 'constructor') return;
      let o = Object.getOwnPropertyDescriptor(n, i);
      o && (o.get || o.set)
        ? Object.defineProperty(t.prototype, i, o)
        : (t.prototype[i] = r.prototype[i]);
    });
  });
}
var fS = f(() => {});
var es,
  lr,
  rs,
  Le,
  kl,
  El,
  Er = f(() => {
    tt();
    qa();
    DE();
    Io();
    Ka();
    Pw();
    fg();
    qw();
    Zw();
    Qw();
    Jw();
    tS();
    eS();
    rS();
    lS();
    cS();
    fS();
    gl();
    es = Lo(hn, '', NaN, NaN, NaN, NaN, NaN, NaN);
    Object.freeze(es);
    (lr = Object.freeze({
      recoveryEnabled: !1,
      maxLookahead: 3,
      dynamicTokensEnabled: !1,
      outputCst: !0,
      errorMessageProvider: gf,
      nodeLocationTracking: 'none',
      traceInitPerf: !1,
      skipValidations: !1,
    })),
      (rs = Object.freeze({ recoveryValueFunc: () => {}, resyncEnabled: !0 }));
    (function (t) {
      (t[(t.INVALID_RULE_NAME = 0)] = 'INVALID_RULE_NAME'),
        (t[(t.DUPLICATE_RULE_NAME = 1)] = 'DUPLICATE_RULE_NAME'),
        (t[(t.INVALID_RULE_OVERRIDE = 2)] = 'INVALID_RULE_OVERRIDE'),
        (t[(t.DUPLICATE_PRODUCTIONS = 3)] = 'DUPLICATE_PRODUCTIONS'),
        (t[(t.UNRESOLVED_SUBRULE_REF = 4)] = 'UNRESOLVED_SUBRULE_REF'),
        (t[(t.LEFT_RECURSION = 5)] = 'LEFT_RECURSION'),
        (t[(t.NONE_LAST_EMPTY_ALT = 6)] = 'NONE_LAST_EMPTY_ALT'),
        (t[(t.AMBIGUOUS_ALTS = 7)] = 'AMBIGUOUS_ALTS'),
        (t[(t.CONFLICT_TOKENS_RULES_NAMESPACE = 8)] =
          'CONFLICT_TOKENS_RULES_NAMESPACE'),
        (t[(t.INVALID_TOKEN_NAME = 9)] = 'INVALID_TOKEN_NAME'),
        (t[(t.NO_NON_EMPTY_LOOKAHEAD = 10)] = 'NO_NON_EMPTY_LOOKAHEAD'),
        (t[(t.AMBIGUOUS_PREFIX_ALTS = 11)] = 'AMBIGUOUS_PREFIX_ALTS'),
        (t[(t.TOO_MANY_ALTS = 12)] = 'TOO_MANY_ALTS'),
        (t[(t.CUSTOM_LOOKAHEAD_VALIDATION = 13)] =
          'CUSTOM_LOOKAHEAD_VALIDATION');
    })(Le || (Le = {}));
    kl = class t {
      static performSelfAnalysis(e) {
        throw Error(
          'The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.'
        );
      }
      performSelfAnalysis() {
        this.TRACE_INIT('performSelfAnalysis', () => {
          let e;
          this.selfAnalysisDone = !0;
          let r = this.className;
          this.TRACE_INIT('toFastProps', () => {
            rl(this);
          }),
            this.TRACE_INIT('Grammar Recording', () => {
              try {
                this.enableRecording(),
                  C(this.definedRulesNames, (i) => {
                    let a = this[i].originalGrammarAction,
                      s;
                    this.TRACE_INIT(`${i} Rule`, () => {
                      s = this.topLevelRuleRecord(i, a);
                    }),
                      (this.gastProductionsCache[i] = s);
                  });
              } finally {
                this.disableRecording();
              }
            });
          let n = [];
          if (
            (this.TRACE_INIT('Grammar Resolving', () => {
              (n = Mw({ rules: _t(this.gastProductionsCache) })),
                (this.definitionErrors = this.definitionErrors.concat(n));
            }),
            this.TRACE_INIT('Grammar Validations', () => {
              if (dt(n) && this.skipValidations === !1) {
                let i = Bw({
                    rules: _t(this.gastProductionsCache),
                    tokenTypes: _t(this.tokensMap),
                    errMsgProvider: pn,
                    grammarName: r,
                  }),
                  o = Aw({
                    lookaheadStrategy: this.lookaheadStrategy,
                    rules: _t(this.gastProductionsCache),
                    tokenTypes: _t(this.tokensMap),
                    grammarName: r,
                  });
                this.definitionErrors = this.definitionErrors.concat(i, o);
              }
            }),
            dt(this.definitionErrors) &&
              (this.recoveryEnabled &&
                this.TRACE_INIT('computeAllProdsFollows', () => {
                  let i = PE(_t(this.gastProductionsCache));
                  this.resyncFollows = i;
                }),
              this.TRACE_INIT('ComputeLookaheadFunctions', () => {
                var i, o;
                (o = (i = this.lookaheadStrategy).initialize) === null ||
                  o === void 0 ||
                  o.call(i, { rules: _t(this.gastProductionsCache) }),
                  this.preComputeLookaheadFunctions(
                    _t(this.gastProductionsCache)
                  );
              })),
            !t.DEFER_DEFINITION_ERRORS_HANDLING && !dt(this.definitionErrors))
          )
            throw (
              ((e = z(this.definitionErrors, (i) => i.message)),
              new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`))
            );
        });
      }
      constructor(e, r) {
        (this.definitionErrors = []), (this.selfAnalysisDone = !1);
        let n = this;
        if (
          (n.initErrorHandler(r),
          n.initLexerAdapter(),
          n.initLooksAhead(r),
          n.initRecognizerEngine(e, r),
          n.initRecoverable(r),
          n.initTreeBuilder(r),
          n.initContentAssist(),
          n.initGastRecorder(r),
          n.initPerformanceTracer(r),
          B(r, 'ignoredIssues'))
        )
          throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
        this.skipValidations = B(r, 'skipValidations')
          ? r.skipValidations
          : lr.skipValidations;
      }
    };
    kl.DEFER_DEFINITION_ERRORS_HANDLING = !1;
    uS(kl, [Sf, If, Ff, Mf, Pf, Bf, Df, Uf, zf, qf]);
    El = class extends kl {
      constructor(e, r = lr) {
        let n = Ut(r);
        (n.outputCst = !0), super(e, n);
      }
    };
  });
var hS = f(() => {
  sr();
});
var pS = f(() => {});
var dS = f(() => {
  hS();
  pS();
});
var mS = f(() => {
  wd();
});
var Cg = f(() => {
  wd();
  Er();
  ll();
  Io();
  Qa();
  hg();
  Ka();
  ts();
  Qm();
  sr();
  sr();
  dS();
  mS();
});
var P0t,
  gS,
  D0t,
  U0t,
  wl,
  z0t,
  $0t,
  W0t,
  q0t,
  H0t,
  G0t,
  j0t,
  xS = f(() => {
    'use strict';
    Cg();
    (P0t = zt({ name: 'NewLine', pattern: /\r?\n/ })),
      (gS = zt({ name: 'WhiteSpace', pattern: /\s+/, group: fe.SKIPPED })),
      (D0t = zt({ name: 'Colon', pattern: /:/ })),
      (U0t = zt({ name: 'Text', pattern: /[^\n\r"]+/ })),
      (wl = zt({
        name: 'StringLiteral',
        pattern: /"(:?[^"\\]|\\(:?["/\\bfnrtv]|u[\dA-Fa-f]{4}))*"/,
      })),
      (z0t = zt({
        name: 'NumberLiteral',
        pattern: /(0|[1-9]\d*)(\.\d+)?([Ee][+-]?\d+)?/,
      })),
      ($0t = zt({ name: 'Comment', pattern: /%%.*\n/, group: fe.SKIPPED })),
      (W0t = zt({ name: 'Title', pattern: /title/i })),
      (q0t = zt({ name: 'AccDescription', pattern: /accdescr/i })),
      (H0t = zt({ name: 'AccTitle', pattern: /acctitle/i })),
      (G0t = zt({ name: 'LeftCurly', pattern: /{/ })),
      (j0t = zt({ name: 'RightCurly', pattern: /}/ }));
  });
var yS,
  bS,
  _S,
  Tg,
  kg,
  Hf,
  Eg,
  wg,
  Fi,
  Gf,
  CS,
  TS,
  Sg,
  ns,
  b9,
  vg,
  kS,
  ES = f(() => {
    'use strict';
    Cg();
    xS();
    (yS = zt({ name: 'OSINT', pattern: /osint(-elk)?/i })),
      (bS = zt({ name: 'Start', pattern: /start/i })),
      (_S = zt({ name: 'ShowData', pattern: /showdata/i })),
      (Tg = zt({ name: 'DataNodeName', pattern: /d_\w+/i })),
      (kg = zt({ name: 'ProcessNodeName', pattern: /p_\w+/i })),
      (Hf = zt({ name: 'Identifier', pattern: /[A-Za-z]\w*/ })),
      (Eg = zt({ name: 'LPara', pattern: /\(/ })),
      (wg = zt({ name: 'RPara', pattern: /\)/ })),
      (Fi = zt({ name: 'Comma', pattern: /,/ })),
      (Gf = zt({ name: 'Arrow', pattern: /-+>/ })),
      (CS = [gS, wl, wg, Eg, Fi, Gf, Tg, kg, yS, bS, _S, Hf]),
      (TS = new fe(CS)),
      (Sg = class extends El {
        constructor() {
          super(CS);
          this.diagram = this.RULE('diagram', () => {
            this.SUBRULE(this.hdr),
              this.MANY(() => {
                this.SUBRULE2(this.row);
              });
          });
          this.hdr = this.RULE('hdr', () => {
            this.CONSUME(yS),
              this.OPTION(() => {
                this.CONSUME(_S);
              });
          });
          this.row = this.RULE('row', () => {
            this.OR([
              { ALT: () => this.SUBRULE(this.startLink) },
              { ALT: () => this.SUBRULE(this.dataLink) },
              { ALT: () => this.SUBRULE(this.processLink) },
            ]);
          });
          this.startLink = this.RULE('startLink', () => {
            this.CONSUME(bS),
              this.CONSUME(Gf),
              this.AT_LEAST_ONE_SEP({
                SEP: Fi,
                DEF: () => {
                  this.SUBRULE(this.dataNode);
                },
              });
          });
          this.dataLink = this.RULE('dataLink', () => {
            this.CONSUME(Tg),
              this.CONSUME(Gf),
              this.AT_LEAST_ONE_SEP({
                SEP: Fi,
                DEF: () => {
                  this.SUBRULE(this.processNode);
                },
              });
          });
          this.processLink = this.RULE('processLink', () => {
            this.CONSUME(kg),
              this.CONSUME(Gf),
              this.AT_LEAST_ONE_SEP({
                SEP: Fi,
                DEF: () => {
                  this.SUBRULE(this.dataNode);
                },
              });
          });
          this.dataNode = this.RULE('dataNode', () => {
            this.CONSUME(Tg),
              this.CONSUME(Eg),
              this.CONSUME(Hf),
              this.CONSUME(Fi),
              this.CONSUME2(Hf),
              this.CONSUME2(Fi),
              this.CONSUME(wl),
              this.CONSUME3(Fi),
              this.CONSUME2(wl),
              this.CONSUME(wg);
          });
          this.processNode = this.RULE('processNode', () => {
            this.CONSUME(kg),
              this.CONSUME(Eg),
              this.CONSUME(Hf),
              this.CONSUME(Fi),
              this.CONSUME(wl),
              this.CONSUME(wg);
          });
          this.performSelfAnalysis();
        }
        reset() {
          super.reset();
        }
      }),
      (ns = new Sg()),
      (b9 = ns.getBaseCstVisitorConstructor()),
      (vg = class extends b9 {
        constructor() {
          super(), this.validateVisitor();
        }
        diagram(e) {
          return {
            type: 'diagram',
            showData: e.hdr[0]?.children?.ShowData !== void 0,
            rows: e.row?.map((r) => this.visit(r)) ?? [],
          };
        }
        hdr() {
          return { type: 'hdr' };
        }
        row(e) {
          let r = e.dataLink
              ? 'dataLink'
              : e.startLink
              ? 'startLink'
              : 'processLink',
            n = this.visit(e[r]?.[0] ?? []);
          return { type: r, data: n };
        }
        dataLink(e) {
          return {
            dataNode: e.DataNodeName[0].image,
            processNodes: e.processNode?.map((r) => this.visit(r)),
            length: e.Arrow[0].image.length,
          };
        }
        processLink(e) {
          return {
            processNode: e.ProcessNodeName[0].image,
            dataNodes: e.dataNode?.map((r) => this.visit(r)),
            length: e.Arrow[0].image.length,
          };
        }
        dataNode(e) {
          return {
            name: e.DataNodeName[0].image,
            dataType: e.Identifier[0].image,
            label: e.StringLiteral[0].image.slice(1, -1),
            data: e.StringLiteral[1].image.slice(1, -1),
            confidence: e.Identifier[1].image.toLowerCase(),
          };
        }
        processNode(e) {
          return {
            name: e.ProcessNodeName[0].image,
            label: e.Identifier[0].image,
            description: e.StringLiteral[0].image.slice(1, -1),
          };
        }
        startLink(e) {
          return {
            dataNodes: e.dataNode?.map((r) => this.visit(r)) ?? [],
            length: e.Arrow[0].image.length,
          };
        }
      }),
      (kS = new vg());
  });
var wS = f(() => {});
var SS = f(() => {});
function AS() {
  for (var t = 0, e = arguments.length, r = {}, n; t < e; ++t) {
    if (!(n = arguments[t] + '') || n in r || /[\s.]/.test(n))
      throw new Error('illegal type: ' + n);
    r[n] = [];
  }
  return new jf(r);
}
function jf(t) {
  this._ = t;
}
function C9(t, e) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var n = '',
        i = r.indexOf('.');
      if (
        (i >= 0 && ((n = r.slice(i + 1)), (r = r.slice(0, i))),
        r && !e.hasOwnProperty(r))
      )
        throw new Error('unknown type: ' + r);
      return { type: r, name: n };
    });
}
function T9(t, e) {
  for (var r = 0, n = t.length, i; r < n; ++r)
    if ((i = t[r]).name === e) return i.value;
}
function vS(t, e, r) {
  for (var n = 0, i = t.length; n < i; ++n)
    if (t[n].name === e) {
      (t[n] = _9), (t = t.slice(0, n).concat(t.slice(n + 1)));
      break;
    }
  return r != null && t.push({ name: e, value: r }), t;
}
var _9,
  Ag,
  LS = f(() => {
    _9 = { value: () => {} };
    jf.prototype = AS.prototype = {
      constructor: jf,
      on: function (t, e) {
        var r = this._,
          n = C9(t + '', r),
          i,
          o = -1,
          a = n.length;
        if (arguments.length < 2) {
          for (; ++o < a; )
            if ((i = (t = n[o]).type) && (i = T9(r[i], t.name))) return i;
          return;
        }
        if (e != null && typeof e != 'function')
          throw new Error('invalid callback: ' + e);
        for (; ++o < a; )
          if ((i = (t = n[o]).type)) r[i] = vS(r[i], t.name, e);
          else if (e == null) for (i in r) r[i] = vS(r[i], t.name, null);
        return this;
      },
      copy: function () {
        var t = {},
          e = this._;
        for (var r in e) t[r] = e[r].slice();
        return new jf(t);
      },
      call: function (t, e) {
        if ((i = arguments.length - 2) > 0)
          for (var r = new Array(i), n = 0, i, o; n < i; ++n)
            r[n] = arguments[n + 2];
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (o = this._[t], n = 0, i = o.length; n < i; ++n)
          o[n].value.apply(e, r);
      },
      apply: function (t, e, r) {
        if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
        for (var n = this._[t], i = 0, o = n.length; i < o; ++i)
          n[i].value.apply(e, r);
      },
    };
    Ag = AS;
  });
var Lg = f(() => {
  LS();
});
var Yf,
  Ig,
  Og = f(() => {
    (Yf = 'http://www.w3.org/1999/xhtml'),
      (Ig = {
        svg: 'http://www.w3.org/2000/svg',
        xhtml: Yf,
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/',
      });
  });
function ri(t) {
  var e = (t += ''),
    r = e.indexOf(':');
  return (
    r >= 0 && (e = t.slice(0, r)) !== 'xmlns' && (t = t.slice(r + 1)),
    Ig.hasOwnProperty(e) ? { space: Ig[e], local: t } : t
  );
}
var Vf = f(() => {
  Og();
});
function k9(t) {
  return function () {
    var e = this.ownerDocument,
      r = this.namespaceURI;
    return r === Yf && e.documentElement.namespaceURI === Yf
      ? e.createElement(t)
      : e.createElementNS(r, t);
  };
}
function E9(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xf(t) {
  var e = ri(t);
  return (e.local ? E9 : k9)(e);
}
var Rg = f(() => {
  Vf();
  Og();
});
function w9() {}
function Ro(t) {
  return t == null
    ? w9
    : function () {
        return this.querySelector(t);
      };
}
var Kf = f(() => {});
function IS(t) {
  typeof t != 'function' && (t = Ro(t));
  for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
    for (
      var o = e[i], a = o.length, s = (n[i] = new Array(a)), l, c, u = 0;
      u < a;
      ++u
    )
      (l = o[u]) &&
        (c = t.call(l, l.__data__, u, o)) &&
        ('__data__' in l && (c.__data__ = l.__data__), (s[u] = c));
  return new Jt(n, this._parents);
}
var OS = f(() => {
  Qr();
  Kf();
});
function Sl(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
var Ng = f(() => {});
function S9() {
  return [];
}
function vl(t) {
  return t == null
    ? S9
    : function () {
        return this.querySelectorAll(t);
      };
}
var Fg = f(() => {});
function v9(t) {
  return function () {
    return Sl(t.apply(this, arguments));
  };
}
function RS(t) {
  typeof t == 'function' ? (t = v9(t)) : (t = vl(t));
  for (var e = this._groups, r = e.length, n = [], i = [], o = 0; o < r; ++o)
    for (var a = e[o], s = a.length, l, c = 0; c < s; ++c)
      (l = a[c]) && (n.push(t.call(l, l.__data__, c, a)), i.push(l));
  return new Jt(n, i);
}
var NS = f(() => {
  Qr();
  Ng();
  Fg();
});
function Al(t) {
  return function () {
    return this.matches(t);
  };
}
function Zf(t) {
  return function (e) {
    return e.matches(t);
  };
}
var Ll = f(() => {});
function L9(t) {
  return function () {
    return A9.call(this.children, t);
  };
}
function I9() {
  return this.firstElementChild;
}
function FS(t) {
  return this.select(t == null ? I9 : L9(typeof t == 'function' ? t : Zf(t)));
}
var A9,
  MS = f(() => {
    Ll();
    A9 = Array.prototype.find;
  });
function R9() {
  return Array.from(this.children);
}
function N9(t) {
  return function () {
    return O9.call(this.children, t);
  };
}
function BS(t) {
  return this.selectAll(
    t == null ? R9 : N9(typeof t == 'function' ? t : Zf(t))
  );
}
var O9,
  PS = f(() => {
    Ll();
    O9 = Array.prototype.filter;
  });
function DS(t) {
  typeof t != 'function' && (t = Al(t));
  for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
    for (var o = e[i], a = o.length, s = (n[i] = []), l, c = 0; c < a; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && s.push(l);
  return new Jt(n, this._parents);
}
var US = f(() => {
  Qr();
  Ll();
});
function Qf(t) {
  return new Array(t.length);
}
var Mg = f(() => {});
function zS() {
  return new Jt(this._enter || this._groups.map(Qf), this._parents);
}
function Il(t, e) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = e);
}
var Bg = f(() => {
  Mg();
  Qr();
  Il.prototype = {
    constructor: Il,
    appendChild: function (t) {
      return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function (t, e) {
      return this._parent.insertBefore(t, e);
    },
    querySelector: function (t) {
      return this._parent.querySelector(t);
    },
    querySelectorAll: function (t) {
      return this._parent.querySelectorAll(t);
    },
  };
});
function $S(t) {
  return function () {
    return t;
  };
}
var WS = f(() => {});
function F9(t, e, r, n, i, o) {
  for (var a = 0, s, l = e.length, c = o.length; a < c; ++a)
    (s = e[a]) ? ((s.__data__ = o[a]), (n[a] = s)) : (r[a] = new Il(t, o[a]));
  for (; a < l; ++a) (s = e[a]) && (i[a] = s);
}
function M9(t, e, r, n, i, o, a) {
  var s,
    l,
    c = new Map(),
    u = e.length,
    h = o.length,
    p = new Array(u),
    d;
  for (s = 0; s < u; ++s)
    (l = e[s]) &&
      ((p[s] = d = a.call(l, l.__data__, s, e) + ''),
      c.has(d) ? (i[s] = l) : c.set(d, l));
  for (s = 0; s < h; ++s)
    (d = a.call(t, o[s], s, o) + ''),
      (l = c.get(d))
        ? ((n[s] = l), (l.__data__ = o[s]), c.delete(d))
        : (r[s] = new Il(t, o[s]));
  for (s = 0; s < u; ++s) (l = e[s]) && c.get(p[s]) === l && (i[s] = l);
}
function B9(t) {
  return t.__data__;
}
function qS(t, e) {
  if (!arguments.length) return Array.from(this, B9);
  var r = e ? M9 : F9,
    n = this._parents,
    i = this._groups;
  typeof t != 'function' && (t = $S(t));
  for (
    var o = i.length,
      a = new Array(o),
      s = new Array(o),
      l = new Array(o),
      c = 0;
    c < o;
    ++c
  ) {
    var u = n[c],
      h = i[c],
      p = h.length,
      d = P9(t.call(u, u && u.__data__, c, n)),
      m = d.length,
      g = (s[c] = new Array(m)),
      E = (a[c] = new Array(m)),
      y = (l[c] = new Array(p));
    r(u, h, g, E, y, d, e);
    for (var T = 0, b = 0, N, I; T < m; ++T)
      if ((N = g[T])) {
        for (T >= b && (b = T + 1); !(I = E[b]) && ++b < m; );
        N._next = I || null;
      }
  }
  return (a = new Jt(a, n)), (a._enter = s), (a._exit = l), a;
}
function P9(t) {
  return typeof t == 'object' && 'length' in t ? t : Array.from(t);
}
var HS = f(() => {
  Qr();
  Bg();
  WS();
});
function GS() {
  return new Jt(this._exit || this._groups.map(Qf), this._parents);
}
var jS = f(() => {
  Mg();
  Qr();
});
function YS(t, e, r) {
  var n = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == 'function'
      ? ((n = t(n)), n && (n = n.selection()))
      : (n = n.append(t + '')),
    e != null && ((i = e(i)), i && (i = i.selection())),
    r == null ? o.remove() : r(o),
    n && i ? n.merge(i).order() : i
  );
}
var VS = f(() => {});
function XS(t) {
  for (
    var e = t.selection ? t.selection() : t,
      r = this._groups,
      n = e._groups,
      i = r.length,
      o = n.length,
      a = Math.min(i, o),
      s = new Array(i),
      l = 0;
    l < a;
    ++l
  )
    for (
      var c = r[l], u = n[l], h = c.length, p = (s[l] = new Array(h)), d, m = 0;
      m < h;
      ++m
    )
      (d = c[m] || u[m]) && (p[m] = d);
  for (; l < i; ++l) s[l] = r[l];
  return new Jt(s, this._parents);
}
var KS = f(() => {
  Qr();
});
function ZS() {
  for (var t = this._groups, e = -1, r = t.length; ++e < r; )
    for (var n = t[e], i = n.length - 1, o = n[i], a; --i >= 0; )
      (a = n[i]) &&
        (o &&
          a.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(a, o),
        (o = a));
  return this;
}
var QS = f(() => {});
function JS(t) {
  t || (t = D9);
  function e(h, p) {
    return h && p ? t(h.__data__, p.__data__) : !h - !p;
  }
  for (
    var r = this._groups, n = r.length, i = new Array(n), o = 0;
    o < n;
    ++o
  ) {
    for (
      var a = r[o], s = a.length, l = (i[o] = new Array(s)), c, u = 0;
      u < s;
      ++u
    )
      (c = a[u]) && (l[u] = c);
    l.sort(e);
  }
  return new Jt(i, this._parents).order();
}
function D9(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
var tv = f(() => {
  Qr();
});
function ev() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
var rv = f(() => {});
function nv() {
  return Array.from(this);
}
var iv = f(() => {});
function ov() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var n = t[e], i = 0, o = n.length; i < o; ++i) {
      var a = n[i];
      if (a) return a;
    }
  return null;
}
var av = f(() => {});
function sv() {
  let t = 0;
  for (let e of this) ++t;
  return t;
}
var lv = f(() => {});
function cv() {
  return !this.node();
}
var uv = f(() => {});
function fv(t) {
  for (var e = this._groups, r = 0, n = e.length; r < n; ++r)
    for (var i = e[r], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
var hv = f(() => {});
function U9(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function z9(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function $9(t, e) {
  return function () {
    this.setAttribute(t, e);
  };
}
function W9(t, e) {
  return function () {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function q9(t, e) {
  return function () {
    var r = e.apply(this, arguments);
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
  };
}
function H9(t, e) {
  return function () {
    var r = e.apply(this, arguments);
    r == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, r);
  };
}
function pv(t, e) {
  var r = ri(t);
  if (arguments.length < 2) {
    var n = this.node();
    return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
  }
  return this.each(
    (e == null
      ? r.local
        ? z9
        : U9
      : typeof e == 'function'
      ? r.local
        ? H9
        : q9
      : r.local
      ? W9
      : $9)(r, e)
  );
}
var dv = f(() => {
  Vf();
});
function Jf(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
var Pg = f(() => {});
function G9(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function j9(t, e, r) {
  return function () {
    this.style.setProperty(t, e, r);
  };
}
function Y9(t, e, r) {
  return function () {
    var n = e.apply(this, arguments);
    n == null ? this.style.removeProperty(t) : this.style.setProperty(t, n, r);
  };
}
function mv(t, e, r) {
  return arguments.length > 1
    ? this.each(
        (e == null ? G9 : typeof e == 'function' ? Y9 : j9)(t, e, r ?? '')
      )
    : Mi(this.node(), t);
}
function Mi(t, e) {
  return (
    t.style.getPropertyValue(e) ||
    Jf(t).getComputedStyle(t, null).getPropertyValue(e)
  );
}
var Dg = f(() => {
  Pg();
});
function V9(t) {
  return function () {
    delete this[t];
  };
}
function X9(t, e) {
  return function () {
    this[t] = e;
  };
}
function K9(t, e) {
  return function () {
    var r = e.apply(this, arguments);
    r == null ? delete this[t] : (this[t] = r);
  };
}
function gv(t, e) {
  return arguments.length > 1
    ? this.each((e == null ? V9 : typeof e == 'function' ? K9 : X9)(t, e))
    : this.node()[t];
}
var xv = f(() => {});
function yv(t) {
  return t.trim().split(/^|\s+/);
}
function Ug(t) {
  return t.classList || new bv(t);
}
function bv(t) {
  (this._node = t), (this._names = yv(t.getAttribute('class') || ''));
}
function _v(t, e) {
  for (var r = Ug(t), n = -1, i = e.length; ++n < i; ) r.add(e[n]);
}
function Cv(t, e) {
  for (var r = Ug(t), n = -1, i = e.length; ++n < i; ) r.remove(e[n]);
}
function Z9(t) {
  return function () {
    _v(this, t);
  };
}
function Q9(t) {
  return function () {
    Cv(this, t);
  };
}
function J9(t, e) {
  return function () {
    (e.apply(this, arguments) ? _v : Cv)(this, t);
  };
}
function Tv(t, e) {
  var r = yv(t + '');
  if (arguments.length < 2) {
    for (var n = Ug(this.node()), i = -1, o = r.length; ++i < o; )
      if (!n.contains(r[i])) return !1;
    return !0;
  }
  return this.each((typeof e == 'function' ? J9 : e ? Z9 : Q9)(r, e));
}
var kv = f(() => {
  bv.prototype = {
    add: function (t) {
      var e = this._names.indexOf(t);
      e < 0 &&
        (this._names.push(t),
        this._node.setAttribute('class', this._names.join(' ')));
    },
    remove: function (t) {
      var e = this._names.indexOf(t);
      e >= 0 &&
        (this._names.splice(e, 1),
        this._node.setAttribute('class', this._names.join(' ')));
    },
    contains: function (t) {
      return this._names.indexOf(t) >= 0;
    },
  };
});
function tq() {
  this.textContent = '';
}
function eq(t) {
  return function () {
    this.textContent = t;
  };
}
function rq(t) {
  return function () {
    var e = t.apply(this, arguments);
    this.textContent = e ?? '';
  };
}
function Ev(t) {
  return arguments.length
    ? this.each(t == null ? tq : (typeof t == 'function' ? rq : eq)(t))
    : this.node().textContent;
}
var wv = f(() => {});
function nq() {
  this.innerHTML = '';
}
function iq(t) {
  return function () {
    this.innerHTML = t;
  };
}
function oq(t) {
  return function () {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? '';
  };
}
function Sv(t) {
  return arguments.length
    ? this.each(t == null ? nq : (typeof t == 'function' ? oq : iq)(t))
    : this.node().innerHTML;
}
var vv = f(() => {});
function aq() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Av() {
  return this.each(aq);
}
var Lv = f(() => {});
function sq() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Iv() {
  return this.each(sq);
}
var Ov = f(() => {});
function Rv(t) {
  var e = typeof t == 'function' ? t : Xf(t);
  return this.select(function () {
    return this.appendChild(e.apply(this, arguments));
  });
}
var Nv = f(() => {
  Rg();
});
function lq() {
  return null;
}
function Fv(t, e) {
  var r = typeof t == 'function' ? t : Xf(t),
    n = e == null ? lq : typeof e == 'function' ? e : Ro(e);
  return this.select(function () {
    return this.insertBefore(
      r.apply(this, arguments),
      n.apply(this, arguments) || null
    );
  });
}
var Mv = f(() => {
  Rg();
  Kf();
});
function cq() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Bv() {
  return this.each(cq);
}
var Pv = f(() => {});
function uq() {
  var t = this.cloneNode(!1),
    e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function fq() {
  var t = this.cloneNode(!0),
    e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Dv(t) {
  return this.select(t ? fq : uq);
}
var Uv = f(() => {});
function zv(t) {
  return arguments.length ? this.property('__data__', t) : this.node().__data__;
}
var $v = f(() => {});
function hq(t) {
  return function (e) {
    t.call(this, e, this.__data__);
  };
}
function pq(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = '',
        n = e.indexOf('.');
      return (
        n >= 0 && ((r = e.slice(n + 1)), (e = e.slice(0, n))),
        { type: e, name: r }
      );
    });
}
function dq(t) {
  return function () {
    var e = this.__on;
    if (e) {
      for (var r = 0, n = -1, i = e.length, o; r < i; ++r)
        (o = e[r]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (e[++n] = o);
      ++n ? (e.length = n) : delete this.__on;
    }
  };
}
function mq(t, e, r) {
  return function () {
    var n = this.__on,
      i,
      o = hq(e);
    if (n) {
      for (var a = 0, s = n.length; a < s; ++a)
        if ((i = n[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = r)),
            (i.value = e);
          return;
        }
    }
    this.addEventListener(t.type, o, r),
      (i = { type: t.type, name: t.name, value: e, listener: o, options: r }),
      n ? n.push(i) : (this.__on = [i]);
  };
}
function Wv(t, e, r) {
  var n = pq(t + ''),
    i,
    o = n.length,
    a;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var l = 0, c = s.length, u; l < c; ++l)
        for (i = 0, u = s[l]; i < o; ++i)
          if ((a = n[i]).type === u.type && a.name === u.name) return u.value;
    }
    return;
  }
  for (s = e ? mq : dq, i = 0; i < o; ++i) this.each(s(n[i], e, r));
  return this;
}
var qv = f(() => {});
function Hv(t, e, r) {
  var n = Jf(t),
    i = n.CustomEvent;
  typeof i == 'function'
    ? (i = new i(e, r))
    : ((i = n.document.createEvent('Event')),
      r
        ? (i.initEvent(e, r.bubbles, r.cancelable), (i.detail = r.detail))
        : i.initEvent(e, !1, !1)),
    t.dispatchEvent(i);
}
function gq(t, e) {
  return function () {
    return Hv(this, t, e);
  };
}
function xq(t, e) {
  return function () {
    return Hv(this, t, e.apply(this, arguments));
  };
}
function Gv(t, e) {
  return this.each((typeof e == 'function' ? xq : gq)(t, e));
}
var jv = f(() => {
  Pg();
});
function* Yv() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var n = t[e], i = 0, o = n.length, a; i < o; ++i)
      (a = n[i]) && (yield a);
}
var Vv = f(() => {});
function Jt(t, e) {
  (this._groups = t), (this._parents = e);
}
function Xv() {
  return new Jt([[document.documentElement]], Ol);
}
function yq() {
  return this;
}
var Ol,
  ni,
  Qr = f(() => {
    OS();
    NS();
    MS();
    PS();
    US();
    HS();
    Bg();
    jS();
    VS();
    KS();
    QS();
    tv();
    rv();
    iv();
    av();
    lv();
    uv();
    hv();
    dv();
    Dg();
    xv();
    kv();
    wv();
    vv();
    Lv();
    Ov();
    Nv();
    Mv();
    Pv();
    Uv();
    $v();
    qv();
    jv();
    Vv();
    Ol = [null];
    Jt.prototype = Xv.prototype = {
      constructor: Jt,
      select: IS,
      selectAll: RS,
      selectChild: FS,
      selectChildren: BS,
      filter: DS,
      data: qS,
      enter: zS,
      exit: GS,
      join: YS,
      merge: XS,
      selection: yq,
      order: ZS,
      sort: JS,
      call: ev,
      nodes: nv,
      node: ov,
      size: sv,
      empty: cv,
      each: fv,
      attr: pv,
      style: mv,
      property: gv,
      classed: Tv,
      text: Ev,
      html: Sv,
      raise: Av,
      lower: Iv,
      append: Rv,
      insert: Fv,
      remove: Bv,
      clone: Dv,
      datum: zv,
      on: Wv,
      dispatch: Gv,
      [Symbol.iterator]: Yv,
    };
    ni = Xv;
  });
function ft(t) {
  return typeof t == 'string'
    ? new Jt([[document.querySelector(t)]], [document.documentElement])
    : new Jt([[t]], Ol);
}
var Kv = f(() => {
  Qr();
});
function zg(t) {
  return typeof t == 'string'
    ? new Jt([document.querySelectorAll(t)], [document.documentElement])
    : new Jt([Sl(t)], Ol);
}
var Zv = f(() => {
  Ng();
  Qr();
});
var dn = f(() => {
  Ll();
  Vf();
  Kv();
  Zv();
  Qr();
  Kf();
  Fg();
  Dg();
});
var Qv = f(() => {});
function th(t, e, r) {
  (t.prototype = e.prototype = r), (r.constructor = t);
}
function $g(t, e) {
  var r = Object.create(t.prototype);
  for (var n in e) r[n] = e[n];
  return r;
}
var Jv = f(() => {});
function Fl() {}
function eA() {
  return this.rgb().formatHex();
}
function Sq() {
  return this.rgb().formatHex8();
}
function vq() {
  return lA(this).formatHsl();
}
function rA() {
  return this.rgb().formatRgb();
}
function Bi(t) {
  var e, r;
  return (
    (t = (t + '').trim().toLowerCase()),
    (e = bq.exec(t))
      ? ((r = e[1].length),
        (e = parseInt(e[1], 16)),
        r === 6
          ? nA(e)
          : r === 3
          ? new wr(
              ((e >> 8) & 15) | ((e >> 4) & 240),
              ((e >> 4) & 15) | (e & 240),
              ((e & 15) << 4) | (e & 15),
              1
            )
          : r === 8
          ? eh(
              (e >> 24) & 255,
              (e >> 16) & 255,
              (e >> 8) & 255,
              (e & 255) / 255
            )
          : r === 4
          ? eh(
              ((e >> 12) & 15) | ((e >> 8) & 240),
              ((e >> 8) & 15) | ((e >> 4) & 240),
              ((e >> 4) & 15) | (e & 240),
              (((e & 15) << 4) | (e & 15)) / 255
            )
          : null)
      : (e = _q.exec(t))
      ? new wr(e[1], e[2], e[3], 1)
      : (e = Cq.exec(t))
      ? new wr((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
      : (e = Tq.exec(t))
      ? eh(e[1], e[2], e[3], e[4])
      : (e = kq.exec(t))
      ? eh((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, e[4])
      : (e = Eq.exec(t))
      ? aA(e[1], e[2] / 100, e[3] / 100, 1)
      : (e = wq.exec(t))
      ? aA(e[1], e[2] / 100, e[3] / 100, e[4])
      : tA.hasOwnProperty(t)
      ? nA(tA[t])
      : t === 'transparent'
      ? new wr(NaN, NaN, NaN, 0)
      : null
  );
}
function nA(t) {
  return new wr((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function eh(t, e, r, n) {
  return n <= 0 && (t = e = r = NaN), new wr(t, e, r, n);
}
function Aq(t) {
  return (
    t instanceof Fl || (t = Bi(t)),
    t ? ((t = t.rgb()), new wr(t.r, t.g, t.b, t.opacity)) : new wr()
  );
}
function os(t, e, r, n) {
  return arguments.length === 1 ? Aq(t) : new wr(t, e, r, n ?? 1);
}
function wr(t, e, r, n) {
  (this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +n);
}
function iA() {
  return `#${No(this.r)}${No(this.g)}${No(this.b)}`;
}
function Lq() {
  return `#${No(this.r)}${No(this.g)}${No(this.b)}${No(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function oA() {
  let t = ih(this.opacity);
  return `${t === 1 ? 'rgb(' : 'rgba('}${Fo(this.r)}, ${Fo(this.g)}, ${Fo(
    this.b
  )}${t === 1 ? ')' : `, ${t})`}`;
}
function ih(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Fo(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function No(t) {
  return (t = Fo(t)), (t < 16 ? '0' : '') + t.toString(16);
}
function aA(t, e, r, n) {
  return (
    n <= 0
      ? (t = e = r = NaN)
      : r <= 0 || r >= 1
      ? (t = e = NaN)
      : e <= 0 && (t = NaN),
    new mn(t, e, r, n)
  );
}
function lA(t) {
  if (t instanceof mn) return new mn(t.h, t.s, t.l, t.opacity);
  if ((t instanceof Fl || (t = Bi(t)), !t)) return new mn();
  if (t instanceof mn) return t;
  t = t.rgb();
  var e = t.r / 255,
    r = t.g / 255,
    n = t.b / 255,
    i = Math.min(e, r, n),
    o = Math.max(e, r, n),
    a = NaN,
    s = o - i,
    l = (o + i) / 2;
  return (
    s
      ? (e === o
          ? (a = (r - n) / s + (r < n) * 6)
          : r === o
          ? (a = (n - e) / s + 2)
          : (a = (e - r) / s + 4),
        (s /= l < 0.5 ? o + i : 2 - o - i),
        (a *= 60))
      : (s = l > 0 && l < 1 ? 0 : a),
    new mn(a, s, l, t.opacity)
  );
}
function cA(t, e, r, n) {
  return arguments.length === 1 ? lA(t) : new mn(t, e, r, n ?? 1);
}
function mn(t, e, r, n) {
  (this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +n);
}
function sA(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function rh(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wg(t, e, r) {
  return (
    (t < 60
      ? e + ((r - e) * t) / 60
      : t < 180
      ? r
      : t < 240
      ? e + ((r - e) * (240 - t)) / 60
      : e) * 255
  );
}
var Rl,
  nh,
  is,
  Nl,
  Bn,
  bq,
  _q,
  Cq,
  Tq,
  kq,
  Eq,
  wq,
  tA,
  uA = f(() => {
    Jv();
    (Rl = 0.7),
      (nh = 1 / Rl),
      (is = '\\s*([+-]?\\d+)\\s*'),
      (Nl = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*'),
      (Bn = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*'),
      (bq = /^#([0-9a-f]{3,8})$/),
      (_q = new RegExp(`^rgb\\(${is},${is},${is}\\)$`)),
      (Cq = new RegExp(`^rgb\\(${Bn},${Bn},${Bn}\\)$`)),
      (Tq = new RegExp(`^rgba\\(${is},${is},${is},${Nl}\\)$`)),
      (kq = new RegExp(`^rgba\\(${Bn},${Bn},${Bn},${Nl}\\)$`)),
      (Eq = new RegExp(`^hsl\\(${Nl},${Bn},${Bn}\\)$`)),
      (wq = new RegExp(`^hsla\\(${Nl},${Bn},${Bn},${Nl}\\)$`)),
      (tA = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074,
      });
    th(Fl, Bi, {
      copy(t) {
        return Object.assign(new this.constructor(), this, t);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: eA,
      formatHex: eA,
      formatHex8: Sq,
      formatHsl: vq,
      formatRgb: rA,
      toString: rA,
    });
    th(
      wr,
      os,
      $g(Fl, {
        brighter(t) {
          return (
            (t = t == null ? nh : Math.pow(nh, t)),
            new wr(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        darker(t) {
          return (
            (t = t == null ? Rl : Math.pow(Rl, t)),
            new wr(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        rgb() {
          return this;
        },
        clamp() {
          return new wr(Fo(this.r), Fo(this.g), Fo(this.b), ih(this.opacity));
        },
        displayable() {
          return (
            -0.5 <= this.r &&
            this.r < 255.5 &&
            -0.5 <= this.g &&
            this.g < 255.5 &&
            -0.5 <= this.b &&
            this.b < 255.5 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        hex: iA,
        formatHex: iA,
        formatHex8: Lq,
        formatRgb: oA,
        toString: oA,
      })
    );
    th(
      mn,
      cA,
      $g(Fl, {
        brighter(t) {
          return (
            (t = t == null ? nh : Math.pow(nh, t)),
            new mn(this.h, this.s, this.l * t, this.opacity)
          );
        },
        darker(t) {
          return (
            (t = t == null ? Rl : Math.pow(Rl, t)),
            new mn(this.h, this.s, this.l * t, this.opacity)
          );
        },
        rgb() {
          var t = (this.h % 360) + (this.h < 0) * 360,
            e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
            r = this.l,
            n = r + (r < 0.5 ? r : 1 - r) * e,
            i = 2 * r - n;
          return new wr(
            Wg(t >= 240 ? t - 240 : t + 120, i, n),
            Wg(t, i, n),
            Wg(t < 120 ? t + 240 : t - 120, i, n),
            this.opacity
          );
        },
        clamp() {
          return new mn(sA(this.h), rh(this.s), rh(this.l), ih(this.opacity));
        },
        displayable() {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl() {
          let t = ih(this.opacity);
          return `${t === 1 ? 'hsl(' : 'hsla('}${sA(this.h)}, ${
            rh(this.s) * 100
          }%, ${rh(this.l) * 100}%${t === 1 ? ')' : `, ${t})`}`;
        },
      })
    );
  });
var oh = f(() => {
  uA();
});
function qg(t, e, r, n, i) {
  var o = t * t,
    a = o * t;
  return (
    ((1 - 3 * t + 3 * o - a) * e +
      (4 - 6 * o + 3 * a) * r +
      (1 + 3 * t + 3 * o - 3 * a) * n +
      a * i) /
    6
  );
}
function fA(t) {
  var e = t.length - 1;
  return function (r) {
    var n = r <= 0 ? (r = 0) : r >= 1 ? ((r = 1), e - 1) : Math.floor(r * e),
      i = t[n],
      o = t[n + 1],
      a = n > 0 ? t[n - 1] : 2 * i - o,
      s = n < e - 1 ? t[n + 2] : 2 * o - i;
    return qg((r - n / e) * e, a, i, o, s);
  };
}
var Hg = f(() => {});
function hA(t) {
  var e = t.length;
  return function (r) {
    var n = Math.floor(((r %= 1) < 0 ? ++r : r) * e),
      i = t[(n + e - 1) % e],
      o = t[n % e],
      a = t[(n + 1) % e],
      s = t[(n + 2) % e];
    return qg((r - n / e) * e, i, o, a, s);
  };
}
var pA = f(() => {
  Hg();
});
var Gg,
  dA = f(() => {
    Gg = (t) => () => t;
  });
function Iq(t, e) {
  return function (r) {
    return t + r * e;
  };
}
function Oq(t, e, r) {
  return (
    (t = Math.pow(t, r)),
    (e = Math.pow(e, r) - t),
    (r = 1 / r),
    function (n) {
      return Math.pow(t + n * e, r);
    }
  );
}
function mA(t) {
  return (t = +t) == 1
    ? ah
    : function (e, r) {
        return r - e ? Oq(e, r, t) : Gg(isNaN(e) ? r : e);
      };
}
function ah(t, e) {
  var r = e - t;
  return r ? Iq(t, r) : Gg(isNaN(t) ? e : t);
}
var gA = f(() => {
  dA();
});
function xA(t) {
  return function (e) {
    var r = e.length,
      n = new Array(r),
      i = new Array(r),
      o = new Array(r),
      a,
      s;
    for (a = 0; a < r; ++a)
      (s = os(e[a])), (n[a] = s.r || 0), (i[a] = s.g || 0), (o[a] = s.b || 0);
    return (
      (n = t(n)),
      (i = t(i)),
      (o = t(o)),
      (s.opacity = 1),
      function (l) {
        return (s.r = n(l)), (s.g = i(l)), (s.b = o(l)), s + '';
      }
    );
  };
}
var sh,
  Rq,
  Nq,
  yA = f(() => {
    oh();
    Hg();
    pA();
    gA();
    sh = (function t(e) {
      var r = mA(e);
      function n(i, o) {
        var a = r((i = os(i)).r, (o = os(o)).r),
          s = r(i.g, o.g),
          l = r(i.b, o.b),
          c = ah(i.opacity, o.opacity);
        return function (u) {
          return (
            (i.r = a(u)), (i.g = s(u)), (i.b = l(u)), (i.opacity = c(u)), i + ''
          );
        };
      }
      return (n.gamma = t), n;
    })(1);
    (Rq = xA(fA)), (Nq = xA(hA));
  });
function Jr(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (r) {
      return t * (1 - r) + e * r;
    }
  );
}
var lh = f(() => {});
function Fq(t) {
  return function () {
    return t;
  };
}
function Mq(t) {
  return function (e) {
    return t(e) + '';
  };
}
function Vg(t, e) {
  var r = (Yg.lastIndex = jg.lastIndex = 0),
    n,
    i,
    o,
    a = -1,
    s = [],
    l = [];
  for (t = t + '', e = e + ''; (n = Yg.exec(t)) && (i = jg.exec(e)); )
    (o = i.index) > r &&
      ((o = e.slice(r, o)), s[a] ? (s[a] += o) : (s[++a] = o)),
      (n = n[0]) === (i = i[0])
        ? s[a]
          ? (s[a] += i)
          : (s[++a] = i)
        : ((s[++a] = null), l.push({ i: a, x: Jr(n, i) })),
      (r = jg.lastIndex);
  return (
    r < e.length && ((o = e.slice(r)), s[a] ? (s[a] += o) : (s[++a] = o)),
    s.length < 2
      ? l[0]
        ? Mq(l[0].x)
        : Fq(e)
      : ((e = l.length),
        function (c) {
          for (var u = 0, h; u < e; ++u) s[(h = l[u]).i] = h.x(c);
          return s.join('');
        })
  );
}
var Yg,
  jg,
  bA = f(() => {
    lh();
    (Yg = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g),
      (jg = new RegExp(Yg.source, 'g'));
  });
function Xg(t, e, r, n, i, o) {
  var a, s, l;
  return (
    (a = Math.sqrt(t * t + e * e)) && ((t /= a), (e /= a)),
    (l = t * r + e * n) && ((r -= t * l), (n -= e * l)),
    (s = Math.sqrt(r * r + n * n)) && ((r /= s), (n /= s), (l /= s)),
    t * n < e * r && ((t = -t), (e = -e), (l = -l), (a = -a)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(e, t) * _A,
      skewX: Math.atan(l) * _A,
      scaleX: a,
      scaleY: s,
    }
  );
}
var _A,
  ch,
  CA = f(() => {
    (_A = 180 / Math.PI),
      (ch = {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
      });
  });
function TA(t) {
  let e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(
    t + ''
  );
  return e.isIdentity ? ch : Xg(e.a, e.b, e.c, e.d, e.e, e.f);
}
function kA(t) {
  return t == null
    ? ch
    : (uh || (uh = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
      uh.setAttribute('transform', t),
      (t = uh.transform.baseVal.consolidate())
        ? ((t = t.matrix), Xg(t.a, t.b, t.c, t.d, t.e, t.f))
        : ch);
}
var uh,
  EA = f(() => {
    CA();
  });
function wA(t, e, r, n) {
  function i(c) {
    return c.length ? c.pop() + ' ' : '';
  }
  function o(c, u, h, p, d, m) {
    if (c !== h || u !== p) {
      var g = d.push('translate(', null, e, null, r);
      m.push({ i: g - 4, x: Jr(c, h) }, { i: g - 2, x: Jr(u, p) });
    } else (h || p) && d.push('translate(' + h + e + p + r);
  }
  function a(c, u, h, p) {
    c !== u
      ? (c - u > 180 ? (u += 360) : u - c > 180 && (c += 360),
        p.push({ i: h.push(i(h) + 'rotate(', null, n) - 2, x: Jr(c, u) }))
      : u && h.push(i(h) + 'rotate(' + u + n);
  }
  function s(c, u, h, p) {
    c !== u
      ? p.push({ i: h.push(i(h) + 'skewX(', null, n) - 2, x: Jr(c, u) })
      : u && h.push(i(h) + 'skewX(' + u + n);
  }
  function l(c, u, h, p, d, m) {
    if (c !== h || u !== p) {
      var g = d.push(i(d) + 'scale(', null, ',', null, ')');
      m.push({ i: g - 4, x: Jr(c, h) }, { i: g - 2, x: Jr(u, p) });
    } else (h !== 1 || p !== 1) && d.push(i(d) + 'scale(' + h + ',' + p + ')');
  }
  return function (c, u) {
    var h = [],
      p = [];
    return (
      (c = t(c)),
      (u = t(u)),
      o(c.translateX, c.translateY, u.translateX, u.translateY, h, p),
      a(c.rotate, u.rotate, h, p),
      s(c.skewX, u.skewX, h, p),
      l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, h, p),
      (c = u = null),
      function (d) {
        for (var m = -1, g = p.length, E; ++m < g; ) h[(E = p[m]).i] = E.x(d);
        return h.join('');
      }
    );
  };
}
var Kg,
  Zg,
  SA = f(() => {
    lh();
    EA();
    (Kg = wA(TA, 'px, ', 'px)', 'deg)')), (Zg = wA(kA, ', ', ')', ')'));
  });
var Ml = f(() => {
  lh();
  bA();
  SA();
  yA();
});
function $l() {
  return Mo || (LA(Bq), (Mo = Ul.now() + ph));
}
function Bq() {
  Mo = 0;
}
function zl() {
  this._call = this._time = this._next = null;
}
function dh(t, e, r) {
  var n = new zl();
  return n.restart(t, e, r), n;
}
function IA() {
  $l(), ++as;
  for (var t = fh, e; t; )
    (e = Mo - t._time) >= 0 && t._call.call(void 0, e), (t = t._next);
  --as;
}
function vA() {
  (Mo = (hh = Ul.now()) + ph), (as = Pl = 0);
  try {
    IA();
  } finally {
    (as = 0), Dq(), (Mo = 0);
  }
}
function Pq() {
  var t = Ul.now(),
    e = t - hh;
  e > AA && ((ph -= e), (hh = t));
}
function Dq() {
  for (var t, e = fh, r, n = 1 / 0; e; )
    e._call
      ? (n > e._time && (n = e._time), (t = e), (e = e._next))
      : ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (fh = r)));
  (Dl = t), Qg(n);
}
function Qg(t) {
  if (!as) {
    Pl && (Pl = clearTimeout(Pl));
    var e = t - Mo;
    e > 24
      ? (t < 1 / 0 && (Pl = setTimeout(vA, t - Ul.now() - ph)),
        Bl && (Bl = clearInterval(Bl)))
      : (Bl || ((hh = Ul.now()), (Bl = setInterval(Pq, AA))), (as = 1), LA(vA));
  }
}
var as,
  Pl,
  Bl,
  AA,
  fh,
  Dl,
  hh,
  Mo,
  ph,
  Ul,
  LA,
  Jg = f(() => {
    (as = 0),
      (Pl = 0),
      (Bl = 0),
      (AA = 1e3),
      (hh = 0),
      (Mo = 0),
      (ph = 0),
      (Ul =
        typeof performance == 'object' && performance.now ? performance : Date),
      (LA =
        typeof window == 'object' && window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : function (t) {
              setTimeout(t, 17);
            });
    zl.prototype = dh.prototype = {
      constructor: zl,
      restart: function (t, e, r) {
        if (typeof t != 'function')
          throw new TypeError('callback is not a function');
        (r = (r == null ? $l() : +r) + (e == null ? 0 : +e)),
          !this._next &&
            Dl !== this &&
            (Dl ? (Dl._next = this) : (fh = this), (Dl = this)),
          (this._call = t),
          (this._time = r),
          Qg();
      },
      stop: function () {
        this._call && ((this._call = null), (this._time = 1 / 0), Qg());
      },
    };
  });
function mh(t, e, r) {
  var n = new zl();
  return (
    (e = e == null ? 0 : +e),
    n.restart(
      (i) => {
        n.stop(), t(i + e);
      },
      e,
      r
    ),
    n
  );
}
var OA = f(() => {
  Jg();
});
var gh = f(() => {
  Jg();
  OA();
});
function Pi(t, e, r, n, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (r in a) return;
  $q(t, r, {
    name: e,
    index: n,
    group: i,
    on: Uq,
    tween: zq,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: FA,
  });
}
function ql(t, e) {
  var r = Ie(t, e);
  if (r.state > FA) throw new Error('too late; already scheduled');
  return r;
}
function Ke(t, e) {
  var r = Ie(t, e);
  if (r.state > xh) throw new Error('too late; already running');
  return r;
}
function Ie(t, e) {
  var r = t.__transition;
  if (!r || !(r = r[e])) throw new Error('transition not found');
  return r;
}
function $q(t, e, r) {
  var n = t.__transition,
    i;
  (n[e] = r), (r.timer = dh(o, 0, r.time));
  function o(c) {
    (r.state = RA),
      r.timer.restart(a, r.delay, r.time),
      r.delay <= c && a(c - r.delay);
  }
  function a(c) {
    var u, h, p, d;
    if (r.state !== RA) return l();
    for (u in n)
      if (((d = n[u]), d.name === r.name)) {
        if (d.state === xh) return mh(a);
        d.state === NA
          ? ((d.state = Wl),
            d.timer.stop(),
            d.on.call('interrupt', t, t.__data__, d.index, d.group),
            delete n[u])
          : +u < e &&
            ((d.state = Wl),
            d.timer.stop(),
            d.on.call('cancel', t, t.__data__, d.index, d.group),
            delete n[u]);
      }
    if (
      (mh(function () {
        r.state === xh &&
          ((r.state = NA), r.timer.restart(s, r.delay, r.time), s(c));
      }),
      (r.state = yh),
      r.on.call('start', t, t.__data__, r.index, r.group),
      r.state === yh)
    ) {
      for (
        r.state = xh, i = new Array((p = r.tween.length)), u = 0, h = -1;
        u < p;
        ++u
      )
        (d = r.tween[u].value.call(t, t.__data__, r.index, r.group)) &&
          (i[++h] = d);
      i.length = h + 1;
    }
  }
  function s(c) {
    for (
      var u =
          c < r.duration
            ? r.ease.call(null, c / r.duration)
            : (r.timer.restart(l), (r.state = bh), 1),
        h = -1,
        p = i.length;
      ++h < p;

    )
      i[h].call(t, u);
    r.state === bh && (r.on.call('end', t, t.__data__, r.index, r.group), l());
  }
  function l() {
    (r.state = Wl), r.timer.stop(), delete n[e];
    for (var c in n) return;
    delete t.__transition;
  }
}
var Uq,
  zq,
  FA,
  RA,
  yh,
  xh,
  NA,
  bh,
  Wl,
  Sr = f(() => {
    Lg();
    gh();
    (Uq = Ag('start', 'end', 'cancel', 'interrupt')),
      (zq = []),
      (FA = 0),
      (RA = 1),
      (yh = 2),
      (xh = 3),
      (NA = 4),
      (bh = 5),
      (Wl = 6);
  });
function _h(t, e) {
  var r = t.__transition,
    n,
    i,
    o = !0,
    a;
  if (r) {
    e = e == null ? null : e + '';
    for (a in r) {
      if ((n = r[a]).name !== e) {
        o = !1;
        continue;
      }
      (i = n.state > yh && n.state < bh),
        (n.state = Wl),
        n.timer.stop(),
        n.on.call(i ? 'interrupt' : 'cancel', t, t.__data__, n.index, n.group),
        delete r[a];
    }
    o && delete t.__transition;
  }
}
var MA = f(() => {
  Sr();
});
function BA(t) {
  return this.each(function () {
    _h(this, t);
  });
}
var PA = f(() => {
  MA();
});
function Wq(t, e) {
  var r, n;
  return function () {
    var i = Ke(this, t),
      o = i.tween;
    if (o !== r) {
      n = r = o;
      for (var a = 0, s = n.length; a < s; ++a)
        if (n[a].name === e) {
          (n = n.slice()), n.splice(a, 1);
          break;
        }
    }
    i.tween = n;
  };
}
function qq(t, e, r) {
  var n, i;
  if (typeof r != 'function') throw new Error();
  return function () {
    var o = Ke(this, t),
      a = o.tween;
    if (a !== n) {
      i = (n = a).slice();
      for (var s = { name: e, value: r }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = s;
          break;
        }
      l === c && i.push(s);
    }
    o.tween = i;
  };
}
function DA(t, e) {
  var r = this._id;
  if (((t += ''), arguments.length < 2)) {
    for (var n = Ie(this.node(), r).tween, i = 0, o = n.length, a; i < o; ++i)
      if ((a = n[i]).name === t) return a.value;
    return null;
  }
  return this.each((e == null ? Wq : qq)(r, t, e));
}
function ss(t, e, r) {
  var n = t._id;
  return (
    t.each(function () {
      var i = Ke(this, n);
      (i.value || (i.value = {}))[e] = r.apply(this, arguments);
    }),
    function (i) {
      return Ie(i, n).value[e];
    }
  );
}
var Hl = f(() => {
  Sr();
});
function Ch(t, e) {
  var r;
  return (
    typeof e == 'number'
      ? Jr
      : e instanceof Bi
      ? sh
      : (r = Bi(e))
      ? ((e = r), sh)
      : Vg
  )(t, e);
}
var tx = f(() => {
  oh();
  Ml();
});
function Hq(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Gq(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function jq(t, e, r) {
  var n,
    i = r + '',
    o;
  return function () {
    var a = this.getAttribute(t);
    return a === i ? null : a === n ? o : (o = e((n = a), r));
  };
}
function Yq(t, e, r) {
  var n,
    i = r + '',
    o;
  return function () {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === n ? o : (o = e((n = a), r));
  };
}
function Vq(t, e, r) {
  var n, i, o;
  return function () {
    var a,
      s = r(this),
      l;
    return s == null
      ? void this.removeAttribute(t)
      : ((a = this.getAttribute(t)),
        (l = s + ''),
        a === l
          ? null
          : a === n && l === i
          ? o
          : ((i = l), (o = e((n = a), s))));
  };
}
function Xq(t, e, r) {
  var n, i, o;
  return function () {
    var a,
      s = r(this),
      l;
    return s == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((a = this.getAttributeNS(t.space, t.local)),
        (l = s + ''),
        a === l
          ? null
          : a === n && l === i
          ? o
          : ((i = l), (o = e((n = a), s))));
  };
}
function UA(t, e) {
  var r = ri(t),
    n = r === 'transform' ? Zg : Ch;
  return this.attrTween(
    t,
    typeof e == 'function'
      ? (r.local ? Xq : Vq)(r, n, ss(this, 'attr.' + t, e))
      : e == null
      ? (r.local ? Gq : Hq)(r)
      : (r.local ? Yq : jq)(r, n, e)
  );
}
var zA = f(() => {
  Ml();
  dn();
  Hl();
  tx();
});
function Kq(t, e) {
  return function (r) {
    this.setAttribute(t, e.call(this, r));
  };
}
function Zq(t, e) {
  return function (r) {
    this.setAttributeNS(t.space, t.local, e.call(this, r));
  };
}
function Qq(t, e) {
  var r, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (r = (n = o) && Zq(t, o)), r;
  }
  return (i._value = e), i;
}
function Jq(t, e) {
  var r, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (r = (n = o) && Kq(t, o)), r;
  }
  return (i._value = e), i;
}
function $A(t, e) {
  var r = 'attr.' + t;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != 'function') throw new Error();
  var n = ri(t);
  return this.tween(r, (n.local ? Qq : Jq)(n, e));
}
var WA = f(() => {
  dn();
});
function tH(t, e) {
  return function () {
    ql(this, t).delay = +e.apply(this, arguments);
  };
}
function eH(t, e) {
  return (
    (e = +e),
    function () {
      ql(this, t).delay = e;
    }
  );
}
function qA(t) {
  var e = this._id;
  return arguments.length
    ? this.each((typeof t == 'function' ? tH : eH)(e, t))
    : Ie(this.node(), e).delay;
}
var HA = f(() => {
  Sr();
});
function rH(t, e) {
  return function () {
    Ke(this, t).duration = +e.apply(this, arguments);
  };
}
function nH(t, e) {
  return (
    (e = +e),
    function () {
      Ke(this, t).duration = e;
    }
  );
}
function GA(t) {
  var e = this._id;
  return arguments.length
    ? this.each((typeof t == 'function' ? rH : nH)(e, t))
    : Ie(this.node(), e).duration;
}
var jA = f(() => {
  Sr();
});
function iH(t, e) {
  if (typeof e != 'function') throw new Error();
  return function () {
    Ke(this, t).ease = e;
  };
}
function YA(t) {
  var e = this._id;
  return arguments.length ? this.each(iH(e, t)) : Ie(this.node(), e).ease;
}
var VA = f(() => {
  Sr();
});
function oH(t, e) {
  return function () {
    var r = e.apply(this, arguments);
    if (typeof r != 'function') throw new Error();
    Ke(this, t).ease = r;
  };
}
function XA(t) {
  if (typeof t != 'function') throw new Error();
  return this.each(oH(this._id, t));
}
var KA = f(() => {
  Sr();
});
function ZA(t) {
  typeof t != 'function' && (t = Al(t));
  for (var e = this._groups, r = e.length, n = new Array(r), i = 0; i < r; ++i)
    for (var o = e[i], a = o.length, s = (n[i] = []), l, c = 0; c < a; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && s.push(l);
  return new cr(n, this._parents, this._name, this._id);
}
var QA = f(() => {
  dn();
  Bo();
});
function JA(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var e = this._groups,
      r = t._groups,
      n = e.length,
      i = r.length,
      o = Math.min(n, i),
      a = new Array(n),
      s = 0;
    s < o;
    ++s
  )
    for (
      var l = e[s], c = r[s], u = l.length, h = (a[s] = new Array(u)), p, d = 0;
      d < u;
      ++d
    )
      (p = l[d] || c[d]) && (h[d] = p);
  for (; s < n; ++s) a[s] = e[s];
  return new cr(a, this._parents, this._name, this._id);
}
var tL = f(() => {
  Bo();
});
function aH(t) {
  return (t + '')
    .trim()
    .split(/^|\s+/)
    .every(function (e) {
      var r = e.indexOf('.');
      return r >= 0 && (e = e.slice(0, r)), !e || e === 'start';
    });
}
function sH(t, e, r) {
  var n,
    i,
    o = aH(e) ? ql : Ke;
  return function () {
    var a = o(this, t),
      s = a.on;
    s !== n && (i = (n = s).copy()).on(e, r), (a.on = i);
  };
}
function eL(t, e) {
  var r = this._id;
  return arguments.length < 2
    ? Ie(this.node(), r).on.on(t)
    : this.each(sH(r, t, e));
}
var rL = f(() => {
  Sr();
});
function lH(t) {
  return function () {
    var e = this.parentNode;
    for (var r in this.__transition) if (+r !== t) return;
    e && e.removeChild(this);
  };
}
function nL() {
  return this.on('end.remove', lH(this._id));
}
var iL = f(() => {});
function oL(t) {
  var e = this._name,
    r = this._id;
  typeof t != 'function' && (t = Ro(t));
  for (var n = this._groups, i = n.length, o = new Array(i), a = 0; a < i; ++a)
    for (
      var s = n[a], l = s.length, c = (o[a] = new Array(l)), u, h, p = 0;
      p < l;
      ++p
    )
      (u = s[p]) &&
        (h = t.call(u, u.__data__, p, s)) &&
        ('__data__' in u && (h.__data__ = u.__data__),
        (c[p] = h),
        Pi(c[p], e, r, p, c, Ie(u, r)));
  return new cr(o, this._parents, e, r);
}
var aL = f(() => {
  dn();
  Bo();
  Sr();
});
function sL(t) {
  var e = this._name,
    r = this._id;
  typeof t != 'function' && (t = vl(t));
  for (var n = this._groups, i = n.length, o = [], a = [], s = 0; s < i; ++s)
    for (var l = n[s], c = l.length, u, h = 0; h < c; ++h)
      if ((u = l[h])) {
        for (
          var p = t.call(u, u.__data__, h, l),
            d,
            m = Ie(u, r),
            g = 0,
            E = p.length;
          g < E;
          ++g
        )
          (d = p[g]) && Pi(d, e, r, g, p, m);
        o.push(p), a.push(u);
      }
  return new cr(o, a, e, r);
}
var lL = f(() => {
  dn();
  Bo();
  Sr();
});
function cL() {
  return new cH(this._groups, this._parents);
}
var cH,
  uL = f(() => {
    dn();
    cH = ni.prototype.constructor;
  });
function uH(t, e) {
  var r, n, i;
  return function () {
    var o = Mi(this, t),
      a = (this.style.removeProperty(t), Mi(this, t));
    return o === a ? null : o === r && a === n ? i : (i = e((r = o), (n = a)));
  };
}
function fL(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function fH(t, e, r) {
  var n,
    i = r + '',
    o;
  return function () {
    var a = Mi(this, t);
    return a === i ? null : a === n ? o : (o = e((n = a), r));
  };
}
function hH(t, e, r) {
  var n, i, o;
  return function () {
    var a = Mi(this, t),
      s = r(this),
      l = s + '';
    return (
      s == null && (l = s = (this.style.removeProperty(t), Mi(this, t))),
      a === l ? null : a === n && l === i ? o : ((i = l), (o = e((n = a), s)))
    );
  };
}
function pH(t, e) {
  var r,
    n,
    i,
    o = 'style.' + e,
    a = 'end.' + o,
    s;
  return function () {
    var l = Ke(this, t),
      c = l.on,
      u = l.value[o] == null ? s || (s = fL(e)) : void 0;
    (c !== r || i !== u) && (n = (r = c).copy()).on(a, (i = u)), (l.on = n);
  };
}
function hL(t, e, r) {
  var n = (t += '') == 'transform' ? Kg : Ch;
  return e == null
    ? this.styleTween(t, uH(t, n)).on('end.style.' + t, fL(t))
    : typeof e == 'function'
    ? this.styleTween(t, hH(t, n, ss(this, 'style.' + t, e))).each(
        pH(this._id, t)
      )
    : this.styleTween(t, fH(t, n, e), r).on('end.style.' + t, null);
}
var pL = f(() => {
  Ml();
  dn();
  Sr();
  Hl();
  tx();
});
function dH(t, e, r) {
  return function (n) {
    this.style.setProperty(t, e.call(this, n), r);
  };
}
function mH(t, e, r) {
  var n, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && dH(t, a, r)), n;
  }
  return (o._value = e), o;
}
function dL(t, e, r) {
  var n = 'style.' + (t += '');
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != 'function') throw new Error();
  return this.tween(n, mH(t, e, r ?? ''));
}
var mL = f(() => {});
function gH(t) {
  return function () {
    this.textContent = t;
  };
}
function xH(t) {
  return function () {
    var e = t(this);
    this.textContent = e ?? '';
  };
}
function gL(t) {
  return this.tween(
    'text',
    typeof t == 'function'
      ? xH(ss(this, 'text', t))
      : gH(t == null ? '' : t + '')
  );
}
var xL = f(() => {
  Hl();
});
function yH(t) {
  return function (e) {
    this.textContent = t.call(this, e);
  };
}
function bH(t) {
  var e, r;
  function n() {
    var i = t.apply(this, arguments);
    return i !== r && (e = (r = i) && yH(i)), e;
  }
  return (n._value = t), n;
}
function yL(t) {
  var e = 'text';
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != 'function') throw new Error();
  return this.tween(e, bH(t));
}
var bL = f(() => {});
function _L() {
  for (
    var t = this._name,
      e = this._id,
      r = Th(),
      n = this._groups,
      i = n.length,
      o = 0;
    o < i;
    ++o
  )
    for (var a = n[o], s = a.length, l, c = 0; c < s; ++c)
      if ((l = a[c])) {
        var u = Ie(l, e);
        Pi(l, t, r, c, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new cr(n, this._parents, t, r);
}
var CL = f(() => {
  Bo();
  Sr();
});
function TL() {
  var t,
    e,
    r = this,
    n = r._id,
    i = r.size();
  return new Promise(function (o, a) {
    var s = { value: a },
      l = {
        value: function () {
          --i === 0 && o();
        },
      };
    r.each(function () {
      var c = Ke(this, n),
        u = c.on;
      u !== t &&
        ((e = (t = u).copy()),
        e._.cancel.push(s),
        e._.interrupt.push(s),
        e._.end.push(l)),
        (c.on = e);
    }),
      i === 0 && o();
  });
}
var kL = f(() => {
  Sr();
});
function cr(t, e, r, n) {
  (this._groups = t), (this._parents = e), (this._name = r), (this._id = n);
}
function EL(t) {
  return ni().transition(t);
}
function Th() {
  return ++_H;
}
var _H,
  ii,
  Bo = f(() => {
    dn();
    zA();
    WA();
    HA();
    jA();
    VA();
    KA();
    QA();
    tL();
    rL();
    iL();
    aL();
    lL();
    uL();
    pL();
    mL();
    xL();
    bL();
    CL();
    Hl();
    kL();
    _H = 0;
    ii = ni.prototype;
    cr.prototype = EL.prototype = {
      constructor: cr,
      select: oL,
      selectAll: sL,
      selectChild: ii.selectChild,
      selectChildren: ii.selectChildren,
      filter: ZA,
      merge: JA,
      selection: cL,
      transition: _L,
      call: ii.call,
      nodes: ii.nodes,
      node: ii.node,
      size: ii.size,
      empty: ii.empty,
      each: ii.each,
      on: eL,
      attr: UA,
      attrTween: $A,
      style: hL,
      styleTween: dL,
      text: gL,
      textTween: yL,
      remove: nL,
      tween: DA,
      delay: qA,
      duration: GA,
      ease: YA,
      easeVarying: XA,
      end: TL,
      [Symbol.iterator]: ii[Symbol.iterator],
    };
  });
function kh(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var wL = f(() => {});
var ex = f(() => {
  wL();
});
function TH(t, e) {
  for (var r; !(r = t.__transition) || !(r = r[e]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`);
  return r;
}
function SL(t) {
  var e, r;
  t instanceof cr
    ? ((e = t._id), (t = t._name))
    : ((e = Th()), ((r = CH).time = $l()), (t = t == null ? null : t + ''));
  for (var n = this._groups, i = n.length, o = 0; o < i; ++o)
    for (var a = n[o], s = a.length, l, c = 0; c < s; ++c)
      (l = a[c]) && Pi(l, t, e, c, a, r || TH(l, e));
  return new cr(n, this._parents, t, e);
}
var CH,
  vL = f(() => {
    Bo();
    Sr();
    ex();
    gh();
    CH = { time: null, delay: 0, duration: 250, ease: kh };
  });
var AL = f(() => {
  dn();
  PA();
  vL();
  ni.prototype.interrupt = BA;
  ni.prototype.transition = SL;
});
var Eh = f(() => {
  AL();
});
var LL = f(() => {});
var IL = f(() => {});
var OL = f(() => {});
function RL(t) {
  return [+t[0], +t[1]];
}
function kH(t) {
  return [RL(t[0]), RL(t[1])];
}
function rx(t) {
  return { type: t };
}
var Z1t,
  Q1t,
  J1t,
  tkt,
  ekt,
  rkt,
  NL = f(() => {
    Eh();
    LL();
    IL();
    OL();
    ({ abs: Z1t, max: Q1t, min: J1t } = Math);
    (tkt = {
      name: 'x',
      handles: ['w', 'e'].map(rx),
      input: function (t, e) {
        return t == null
          ? null
          : [
              [+t[0], e[0][1]],
              [+t[1], e[1][1]],
            ];
      },
      output: function (t) {
        return t && [t[0][0], t[1][0]];
      },
    }),
      (ekt = {
        name: 'y',
        handles: ['n', 's'].map(rx),
        input: function (t, e) {
          return t == null
            ? null
            : [
                [e[0][0], +t[0]],
                [e[1][0], +t[1]],
              ];
        },
        output: function (t) {
          return t && [t[0][1], t[1][1]];
        },
      }),
      (rkt = {
        name: 'xy',
        handles: ['n', 'w', 'e', 's', 'nw', 'ne', 'sw', 'se'].map(rx),
        input: function (t) {
          return t == null ? null : kH(t);
        },
        output: function (t) {
          return t;
        },
      });
  });
var FL = f(() => {
  NL();
});
function ML(t) {
  this._ += t[0];
  for (let e = 1, r = t.length; e < r; ++e) this._ += arguments[e] + t[e];
}
function wH(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return ML;
  let r = 10 ** e;
  return function (n) {
    this._ += n[0];
    for (let i = 1, o = n.length; i < o; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
function BL() {
  return new Do();
}
var nx,
  ix,
  Po,
  EH,
  Do,
  PL = f(() => {
    (nx = Math.PI), (ix = 2 * nx), (Po = 1e-6), (EH = ix - Po);
    Do = class {
      constructor(e) {
        (this._x0 = this._y0 = this._x1 = this._y1 = null),
          (this._ = ''),
          (this._append = e == null ? ML : wH(e));
      }
      moveTo(e, r) {
        this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 =
          +r)}`;
      }
      closePath() {
        this._x1 !== null &&
          ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
      }
      lineTo(e, r) {
        this._append`L${(this._x1 = +e)},${(this._y1 = +r)}`;
      }
      quadraticCurveTo(e, r, n, i) {
        this._append`Q${+e},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`;
      }
      bezierCurveTo(e, r, n, i, o, a) {
        this._append`C${+e},${+r},${+n},${+i},${(this._x1 = +o)},${(this._y1 =
          +a)}`;
      }
      arcTo(e, r, n, i, o) {
        if (((e = +e), (r = +r), (n = +n), (i = +i), (o = +o), o < 0))
          throw new Error(`negative radius: ${o}`);
        let a = this._x1,
          s = this._y1,
          l = n - e,
          c = i - r,
          u = a - e,
          h = s - r,
          p = u * u + h * h;
        if (this._x1 === null)
          this._append`M${(this._x1 = e)},${(this._y1 = r)}`;
        else if (p > Po)
          if (!(Math.abs(h * l - c * u) > Po) || !o)
            this._append`L${(this._x1 = e)},${(this._y1 = r)}`;
          else {
            let d = n - a,
              m = i - s,
              g = l * l + c * c,
              E = d * d + m * m,
              y = Math.sqrt(g),
              T = Math.sqrt(p),
              b = o * Math.tan((nx - Math.acos((g + p - E) / (2 * y * T))) / 2),
              N = b / T,
              I = b / y;
            Math.abs(N - 1) > Po && this._append`L${e + N * u},${r + N * h}`,
              this._append`A${o},${o},0,0,${+(h * d > u * m)},${(this._x1 =
                e + I * l)},${(this._y1 = r + I * c)}`;
          }
      }
      arc(e, r, n, i, o, a) {
        if (((e = +e), (r = +r), (n = +n), (a = !!a), n < 0))
          throw new Error(`negative radius: ${n}`);
        let s = n * Math.cos(i),
          l = n * Math.sin(i),
          c = e + s,
          u = r + l,
          h = 1 ^ a,
          p = a ? i - o : o - i;
        this._x1 === null
          ? this._append`M${c},${u}`
          : (Math.abs(this._x1 - c) > Po || Math.abs(this._y1 - u) > Po) &&
            this._append`L${c},${u}`,
          n &&
            (p < 0 && (p = (p % ix) + ix),
            p > EH
              ? this._append`A${n},${n},0,1,${h},${e - s},${
                  r - l
                }A${n},${n},0,1,${h},${(this._x1 = c)},${(this._y1 = u)}`
              : p > Po &&
                this._append`A${n},${n},0,${+(p >= nx)},${h},${(this._x1 =
                  e + n * Math.cos(o))},${(this._y1 = r + n * Math.sin(o))}`);
      }
      rect(e, r, n, i) {
        this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 =
          +r)}h${(n = +n)}v${+i}h${-n}Z`;
      }
      toString() {
        return this._;
      }
    };
    BL.prototype = Do.prototype;
  });
var ox = f(() => {
  PL();
});
var DL = f(() => {});
var UL = f(() => {});
var zL = f(() => {});
var $L = f(() => {});
var WL = f(() => {});
var qL = f(() => {});
var HL = f(() => {});
function GL(t) {
  return Math.abs((t = Math.round(t))) >= 1e21
    ? t.toLocaleString('en').replace(/,/g, '')
    : t.toString(10);
}
function Uo(t, e) {
  if (
    (r = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf('e')) < 0
  )
    return null;
  var r,
    n = t.slice(0, r);
  return [n.length > 1 ? n[0] + n.slice(2) : n, +t.slice(r + 1)];
}
var Gl = f(() => {});
function jL(t) {
  return (t = Uo(Math.abs(t))), t ? t[1] : NaN;
}
var YL = f(() => {
  Gl();
});
function VL(t, e) {
  return function (r, n) {
    for (
      var i = r.length, o = [], a = 0, s = t[0], l = 0;
      i > 0 &&
      s > 0 &&
      (l + s + 1 > n && (s = Math.max(1, n - l)),
      o.push(r.substring((i -= s), i + s)),
      !((l += s + 1) > n));

    )
      s = t[(a = (a + 1) % t.length)];
    return o.reverse().join(e);
  };
}
var XL = f(() => {});
function KL(t) {
  return function (e) {
    return e.replace(/[0-9]/g, function (r) {
      return t[+r];
    });
  };
}
var ZL = f(() => {});
function jl(t) {
  if (!(e = SH.exec(t))) throw new Error('invalid format: ' + t);
  var e;
  return new ax({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10],
  });
}
function ax(t) {
  (this.fill = t.fill === void 0 ? ' ' : t.fill + ''),
    (this.align = t.align === void 0 ? '>' : t.align + ''),
    (this.sign = t.sign === void 0 ? '-' : t.sign + ''),
    (this.symbol = t.symbol === void 0 ? '' : t.symbol + ''),
    (this.zero = !!t.zero),
    (this.width = t.width === void 0 ? void 0 : +t.width),
    (this.comma = !!t.comma),
    (this.precision = t.precision === void 0 ? void 0 : +t.precision),
    (this.trim = !!t.trim),
    (this.type = t.type === void 0 ? '' : t.type + '');
}
var SH,
  QL = f(() => {
    SH =
      /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    jl.prototype = ax.prototype;
    ax.prototype.toString = function () {
      return (
        this.fill +
        this.align +
        this.sign +
        this.symbol +
        (this.zero ? '0' : '') +
        (this.width === void 0 ? '' : Math.max(1, this.width | 0)) +
        (this.comma ? ',' : '') +
        (this.precision === void 0
          ? ''
          : '.' + Math.max(0, this.precision | 0)) +
        (this.trim ? '~' : '') +
        this.type
      );
    };
  });
function JL(t) {
  t: for (var e = t.length, r = 1, n = -1, i; r < e; ++r)
    switch (t[r]) {
      case '.':
        n = i = r;
        break;
      case '0':
        n === 0 && (n = r), (i = r);
        break;
      default:
        if (!+t[r]) break t;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? t.slice(0, n) + t.slice(i + 1) : t;
}
var tI = f(() => {});
function eI(t, e) {
  var r = Uo(t, e);
  if (!r) return t + '';
  var n = r[0],
    i = r[1],
    o = i - (sx = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    a = n.length;
  return o === a
    ? n
    : o > a
    ? n + new Array(o - a + 1).join('0')
    : o > 0
    ? n.slice(0, o) + '.' + n.slice(o)
    : '0.' + new Array(1 - o).join('0') + Uo(t, Math.max(0, e + o - 1))[0];
}
var sx,
  lx = f(() => {
    Gl();
  });
function cx(t, e) {
  var r = Uo(t, e);
  if (!r) return t + '';
  var n = r[0],
    i = r[1];
  return i < 0
    ? '0.' + new Array(-i).join('0') + n
    : n.length > i + 1
    ? n.slice(0, i + 1) + '.' + n.slice(i + 1)
    : n + new Array(i - n.length + 2).join('0');
}
var rI = f(() => {
  Gl();
});
var ux,
  nI = f(() => {
    Gl();
    lx();
    rI();
    ux = {
      '%': (t, e) => (t * 100).toFixed(e),
      b: (t) => Math.round(t).toString(2),
      c: (t) => t + '',
      d: GL,
      e: (t, e) => t.toExponential(e),
      f: (t, e) => t.toFixed(e),
      g: (t, e) => t.toPrecision(e),
      o: (t) => Math.round(t).toString(8),
      p: (t, e) => cx(t * 100, e),
      r: cx,
      s: eI,
      X: (t) => Math.round(t).toString(16).toUpperCase(),
      x: (t) => Math.round(t).toString(16),
    };
  });
function fx(t) {
  return t;
}
var iI = f(() => {});
function sI(t) {
  var e =
      t.grouping === void 0 || t.thousands === void 0
        ? fx
        : VL(oI.call(t.grouping, Number), t.thousands + ''),
    r = t.currency === void 0 ? '' : t.currency[0] + '',
    n = t.currency === void 0 ? '' : t.currency[1] + '',
    i = t.decimal === void 0 ? '.' : t.decimal + '',
    o = t.numerals === void 0 ? fx : KL(oI.call(t.numerals, String)),
    a = t.percent === void 0 ? '%' : t.percent + '',
    s = t.minus === void 0 ? '\u2212' : t.minus + '',
    l = t.nan === void 0 ? 'NaN' : t.nan + '';
  function c(h) {
    h = jl(h);
    var p = h.fill,
      d = h.align,
      m = h.sign,
      g = h.symbol,
      E = h.zero,
      y = h.width,
      T = h.comma,
      b = h.precision,
      N = h.trim,
      I = h.type;
    I === 'n'
      ? ((T = !0), (I = 'g'))
      : ux[I] || (b === void 0 && (b = 12), (N = !0), (I = 'g')),
      (E || (p === '0' && d === '=')) && ((E = !0), (p = '0'), (d = '='));
    var A =
        g === '$'
          ? r
          : g === '#' && /[boxX]/.test(I)
          ? '0' + I.toLowerCase()
          : '',
      O = g === '$' ? n : /[%p]/.test(I) ? a : '',
      D = ux[I],
      J = /[defgprs%]/.test(I);
    b =
      b === void 0
        ? 6
        : /[gprs]/.test(I)
        ? Math.max(1, Math.min(21, b))
        : Math.max(0, Math.min(20, b));
    function st(R) {
      var L = A,
        v = O,
        U,
        M,
        H;
      if (I === 'c') (v = D(R) + v), (R = '');
      else {
        R = +R;
        var j = R < 0 || 1 / R < 0;
        if (
          ((R = isNaN(R) ? l : D(Math.abs(R), b)),
          N && (R = JL(R)),
          j && +R == 0 && m !== '+' && (j = !1),
          (L = (j ? (m === '(' ? m : s) : m === '-' || m === '(' ? '' : m) + L),
          (v =
            (I === 's' ? aI[8 + sx / 3] : '') +
            v +
            (j && m === '(' ? ')' : '')),
          J)
        ) {
          for (U = -1, M = R.length; ++U < M; )
            if (((H = R.charCodeAt(U)), 48 > H || H > 57)) {
              (v = (H === 46 ? i + R.slice(U + 1) : R.slice(U)) + v),
                (R = R.slice(0, U));
              break;
            }
        }
      }
      T && !E && (R = e(R, 1 / 0));
      var it = L.length + R.length + v.length,
        ht = it < y ? new Array(y - it + 1).join(p) : '';
      switch (
        (T &&
          E &&
          ((R = e(ht + R, ht.length ? y - v.length : 1 / 0)), (ht = '')),
        d)
      ) {
        case '<':
          R = L + R + v + ht;
          break;
        case '=':
          R = L + ht + R + v;
          break;
        case '^':
          R = ht.slice(0, (it = ht.length >> 1)) + L + R + v + ht.slice(it);
          break;
        default:
          R = ht + L + R + v;
          break;
      }
      return o(R);
    }
    return (
      (st.toString = function () {
        return h + '';
      }),
      st
    );
  }
  function u(h, p) {
    var d = c(((h = jl(h)), (h.type = 'f'), h)),
      m = Math.max(-8, Math.min(8, Math.floor(jL(p) / 3))) * 3,
      g = Math.pow(10, -m),
      E = aI[8 + m / 3];
    return function (y) {
      return d(g * y) + E;
    };
  }
  return { format: c, formatPrefix: u };
}
var oI,
  aI,
  lI = f(() => {
    YL();
    XL();
    ZL();
    QL();
    tI();
    nI();
    lx();
    iI();
    (oI = Array.prototype.map),
      (aI = [
        'y',
        'z',
        'a',
        'f',
        'p',
        'n',
        '\xB5',
        'm',
        '',
        'k',
        'M',
        'G',
        'T',
        'P',
        'E',
        'Z',
        'Y',
      ]);
  });
function hx(t) {
  return (wh = sI(t)), (cI = wh.format), (uI = wh.formatPrefix), wh;
}
var wh,
  cI,
  uI,
  fI = f(() => {
    lI();
    hx({ thousands: ',', grouping: [3], currency: ['$', ''] });
  });
var hI = f(() => {
  fI();
});
var pI = f(() => {});
var dI = f(() => {});
var mI = f(() => {});
var gI = f(() => {});
function Dr(t, e, r, n) {
  function i(o) {
    return t((o = arguments.length === 0 ? new Date() : new Date(+o))), o;
  }
  return (
    (i.floor = (o) => (t((o = new Date(+o))), o)),
    (i.ceil = (o) => (t((o = new Date(o - 1))), e(o, 1), t(o), o)),
    (i.round = (o) => {
      let a = i(o),
        s = i.ceil(o);
      return o - a < s - o ? a : s;
    }),
    (i.offset = (o, a) => (
      e((o = new Date(+o)), a == null ? 1 : Math.floor(a)), o
    )),
    (i.range = (o, a, s) => {
      let l = [];
      if (
        ((o = i.ceil(o)),
        (s = s == null ? 1 : Math.floor(s)),
        !(o < a) || !(s > 0))
      )
        return l;
      let c;
      do l.push((c = new Date(+o))), e(o, s), t(o);
      while (c < o && o < a);
      return l;
    }),
    (i.filter = (o) =>
      Dr(
        (a) => {
          if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
        },
        (a, s) => {
          if (a >= a)
            if (s < 0) for (; ++s <= 0; ) for (; e(a, -1), !o(a); );
            else for (; --s >= 0; ) for (; e(a, 1), !o(a); );
        }
      )),
    r &&
      ((i.count = (o, a) => (
        px.setTime(+o), dx.setTime(+a), t(px), t(dx), Math.floor(r(px, dx))
      )),
      (i.every = (o) => (
        (o = Math.floor(o)),
        !isFinite(o) || !(o > 0)
          ? null
          : o > 1
          ? i.filter(n ? (a) => n(a) % o === 0 : (a) => i.count(0, a) % o === 0)
          : i
      ))),
    i
  );
}
var px,
  dx,
  Sh = f(() => {
    (px = new Date()), (dx = new Date());
  });
var Yl,
  AH,
  Vl,
  LH,
  xI,
  IH,
  yI = f(() => {
    Sh();
    (Yl = Dr(
      (t) => t.setHours(0, 0, 0, 0),
      (t, e) => t.setDate(t.getDate() + e),
      (t, e) =>
        (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5,
      (t) => t.getDate() - 1
    )),
      (AH = Yl.range),
      (Vl = Dr(
        (t) => {
          t.setUTCHours(0, 0, 0, 0);
        },
        (t, e) => {
          t.setUTCDate(t.getUTCDate() + e);
        },
        (t, e) => (e - t) / 864e5,
        (t) => t.getUTCDate() - 1
      )),
      (LH = Vl.range),
      (xI = Dr(
        (t) => {
          t.setUTCHours(0, 0, 0, 0);
        },
        (t, e) => {
          t.setUTCDate(t.getUTCDate() + e);
        },
        (t, e) => (e - t) / 864e5,
        (t) => Math.floor(t / 864e5)
      )),
      (IH = xI.range);
  });
function zo(t) {
  return Dr(
    (e) => {
      e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)),
        e.setHours(0, 0, 0, 0);
    },
    (e, r) => {
      e.setDate(e.getDate() + r * 7);
    },
    (e, r) =>
      (r - e - (r.getTimezoneOffset() - e.getTimezoneOffset()) * 6e4) / 6048e5
  );
}
function $o(t) {
  return Dr(
    (e) => {
      e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)),
        e.setUTCHours(0, 0, 0, 0);
    },
    (e, r) => {
      e.setUTCDate(e.getUTCDate() + r * 7);
    },
    (e, r) => (r - e) / 6048e5
  );
}
var Xl,
  ls,
  bI,
  _I,
  Di,
  CI,
  TI,
  kI,
  RH,
  NH,
  FH,
  MH,
  BH,
  PH,
  Kl,
  cs,
  EI,
  wI,
  Ui,
  SI,
  vI,
  AI,
  DH,
  UH,
  zH,
  $H,
  WH,
  qH,
  LI = f(() => {
    Sh();
    (Xl = zo(0)),
      (ls = zo(1)),
      (bI = zo(2)),
      (_I = zo(3)),
      (Di = zo(4)),
      (CI = zo(5)),
      (TI = zo(6)),
      (kI = Xl.range),
      (RH = ls.range),
      (NH = bI.range),
      (FH = _I.range),
      (MH = Di.range),
      (BH = CI.range),
      (PH = TI.range);
    (Kl = $o(0)),
      (cs = $o(1)),
      (EI = $o(2)),
      (wI = $o(3)),
      (Ui = $o(4)),
      (SI = $o(5)),
      (vI = $o(6)),
      (AI = Kl.range),
      (DH = cs.range),
      (UH = EI.range),
      (zH = wI.range),
      ($H = Ui.range),
      (WH = SI.range),
      (qH = vI.range);
  });
var oi,
  HH,
  ai,
  GH,
  II = f(() => {
    Sh();
    oi = Dr(
      (t) => {
        t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
      },
      (t, e) => {
        t.setFullYear(t.getFullYear() + e);
      },
      (t, e) => e.getFullYear() - t.getFullYear(),
      (t) => t.getFullYear()
    );
    oi.every = (t) =>
      !isFinite((t = Math.floor(t))) || !(t > 0)
        ? null
        : Dr(
            (e) => {
              e.setFullYear(Math.floor(e.getFullYear() / t) * t),
                e.setMonth(0, 1),
                e.setHours(0, 0, 0, 0);
            },
            (e, r) => {
              e.setFullYear(e.getFullYear() + r * t);
            }
          );
    (HH = oi.range),
      (ai = Dr(
        (t) => {
          t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
        },
        (t, e) => {
          t.setUTCFullYear(t.getUTCFullYear() + e);
        },
        (t, e) => e.getUTCFullYear() - t.getUTCFullYear(),
        (t) => t.getUTCFullYear()
      ));
    ai.every = (t) =>
      !isFinite((t = Math.floor(t))) || !(t > 0)
        ? null
        : Dr(
            (e) => {
              e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
                e.setUTCMonth(0, 1),
                e.setUTCHours(0, 0, 0, 0);
            },
            (e, r) => {
              e.setUTCFullYear(e.getUTCFullYear() + r * t);
            }
          );
    GH = ai.range;
  });
var gx = f(() => {
  yI();
  LI();
  II();
});
function xx(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function yx(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Zl(t, e, r) {
  return { y: t, m: e, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function bx(t) {
  var e = t.dateTime,
    r = t.date,
    n = t.time,
    i = t.periods,
    o = t.days,
    a = t.shortDays,
    s = t.months,
    l = t.shortMonths,
    c = Ql(i),
    u = Jl(i),
    h = Ql(o),
    p = Jl(o),
    d = Ql(a),
    m = Jl(a),
    g = Ql(s),
    E = Jl(s),
    y = Ql(l),
    T = Jl(l),
    b = {
      a: j,
      A: it,
      b: ht,
      B: x,
      c: null,
      d: BI,
      e: BI,
      f: d7,
      g: E7,
      G: S7,
      H: f7,
      I: h7,
      j: p7,
      L: $I,
      m: m7,
      M: g7,
      p: Et,
      q: Xt,
      Q: UI,
      s: zI,
      S: x7,
      u: y7,
      U: b7,
      V: _7,
      w: C7,
      W: T7,
      x: null,
      X: null,
      y: k7,
      Y: w7,
      Z: v7,
      '%': DI,
    },
    N = {
      a: _,
      A: qt,
      b: Pt,
      B: Fe,
      c: null,
      d: PI,
      e: PI,
      f: O7,
      g: $7,
      G: q7,
      H: A7,
      I: L7,
      j: I7,
      L: qI,
      m: R7,
      M: N7,
      p: bt,
      q: gt,
      Q: UI,
      s: zI,
      S: F7,
      u: M7,
      U: B7,
      V: P7,
      w: D7,
      W: U7,
      x: null,
      X: null,
      y: z7,
      Y: W7,
      Z: H7,
      '%': DI,
    },
    I = {
      a: st,
      A: R,
      b: L,
      B: v,
      c: U,
      d: FI,
      e: FI,
      f: s7,
      g: NI,
      G: RI,
      H: MI,
      I: MI,
      j: n7,
      L: a7,
      m: r7,
      M: i7,
      p: J,
      q: e7,
      Q: c7,
      s: u7,
      S: o7,
      u: KH,
      U: ZH,
      V: QH,
      w: XH,
      W: JH,
      x: M,
      X: H,
      y: NI,
      Y: RI,
      Z: t7,
      '%': l7,
    };
  (b.x = A(r, b)),
    (b.X = A(n, b)),
    (b.c = A(e, b)),
    (N.x = A(r, N)),
    (N.X = A(n, N)),
    (N.c = A(e, N));
  function A(G, X) {
    return function (ct) {
      var P = [],
        Lt = -1,
        Ct = 0,
        pt = G.length,
        V,
        kt,
        wt;
      for (ct instanceof Date || (ct = new Date(+ct)); ++Lt < pt; )
        G.charCodeAt(Lt) === 37 &&
          (P.push(G.slice(Ct, Lt)),
          (kt = OI[(V = G.charAt(++Lt))]) != null
            ? (V = G.charAt(++Lt))
            : (kt = V === 'e' ? ' ' : '0'),
          (wt = X[V]) && (V = wt(ct, kt)),
          P.push(V),
          (Ct = Lt + 1));
      return P.push(G.slice(Ct, Lt)), P.join('');
    };
  }
  function O(G, X) {
    return function (ct) {
      var P = Zl(1900, void 0, 1),
        Lt = D(P, G, (ct += ''), 0),
        Ct,
        pt;
      if (Lt != ct.length) return null;
      if ('Q' in P) return new Date(P.Q);
      if ('s' in P) return new Date(P.s * 1e3 + ('L' in P ? P.L : 0));
      if (
        (X && !('Z' in P) && (P.Z = 0),
        'p' in P && (P.H = (P.H % 12) + P.p * 12),
        P.m === void 0 && (P.m = 'q' in P ? P.q : 0),
        'V' in P)
      ) {
        if (P.V < 1 || P.V > 53) return null;
        'w' in P || (P.w = 1),
          'Z' in P
            ? ((Ct = yx(Zl(P.y, 0, 1))),
              (pt = Ct.getUTCDay()),
              (Ct = pt > 4 || pt === 0 ? cs.ceil(Ct) : cs(Ct)),
              (Ct = Vl.offset(Ct, (P.V - 1) * 7)),
              (P.y = Ct.getUTCFullYear()),
              (P.m = Ct.getUTCMonth()),
              (P.d = Ct.getUTCDate() + ((P.w + 6) % 7)))
            : ((Ct = xx(Zl(P.y, 0, 1))),
              (pt = Ct.getDay()),
              (Ct = pt > 4 || pt === 0 ? ls.ceil(Ct) : ls(Ct)),
              (Ct = Yl.offset(Ct, (P.V - 1) * 7)),
              (P.y = Ct.getFullYear()),
              (P.m = Ct.getMonth()),
              (P.d = Ct.getDate() + ((P.w + 6) % 7)));
      } else
        ('W' in P || 'U' in P) &&
          ('w' in P || (P.w = 'u' in P ? P.u % 7 : 'W' in P ? 1 : 0),
          (pt =
            'Z' in P
              ? yx(Zl(P.y, 0, 1)).getUTCDay()
              : xx(Zl(P.y, 0, 1)).getDay()),
          (P.m = 0),
          (P.d =
            'W' in P
              ? ((P.w + 6) % 7) + P.W * 7 - ((pt + 5) % 7)
              : P.w + P.U * 7 - ((pt + 6) % 7)));
      return 'Z' in P
        ? ((P.H += (P.Z / 100) | 0), (P.M += P.Z % 100), yx(P))
        : xx(P);
    };
  }
  function D(G, X, ct, P) {
    for (var Lt = 0, Ct = X.length, pt = ct.length, V, kt; Lt < Ct; ) {
      if (P >= pt) return -1;
      if (((V = X.charCodeAt(Lt++)), V === 37)) {
        if (
          ((V = X.charAt(Lt++)),
          (kt = I[V in OI ? X.charAt(Lt++) : V]),
          !kt || (P = kt(G, ct, P)) < 0)
        )
          return -1;
      } else if (V != ct.charCodeAt(P++)) return -1;
    }
    return P;
  }
  function J(G, X, ct) {
    var P = c.exec(X.slice(ct));
    return P ? ((G.p = u.get(P[0].toLowerCase())), ct + P[0].length) : -1;
  }
  function st(G, X, ct) {
    var P = d.exec(X.slice(ct));
    return P ? ((G.w = m.get(P[0].toLowerCase())), ct + P[0].length) : -1;
  }
  function R(G, X, ct) {
    var P = h.exec(X.slice(ct));
    return P ? ((G.w = p.get(P[0].toLowerCase())), ct + P[0].length) : -1;
  }
  function L(G, X, ct) {
    var P = y.exec(X.slice(ct));
    return P ? ((G.m = T.get(P[0].toLowerCase())), ct + P[0].length) : -1;
  }
  function v(G, X, ct) {
    var P = g.exec(X.slice(ct));
    return P ? ((G.m = E.get(P[0].toLowerCase())), ct + P[0].length) : -1;
  }
  function U(G, X, ct) {
    return D(G, e, X, ct);
  }
  function M(G, X, ct) {
    return D(G, r, X, ct);
  }
  function H(G, X, ct) {
    return D(G, n, X, ct);
  }
  function j(G) {
    return a[G.getDay()];
  }
  function it(G) {
    return o[G.getDay()];
  }
  function ht(G) {
    return l[G.getMonth()];
  }
  function x(G) {
    return s[G.getMonth()];
  }
  function Et(G) {
    return i[+(G.getHours() >= 12)];
  }
  function Xt(G) {
    return 1 + ~~(G.getMonth() / 3);
  }
  function _(G) {
    return a[G.getUTCDay()];
  }
  function qt(G) {
    return o[G.getUTCDay()];
  }
  function Pt(G) {
    return l[G.getUTCMonth()];
  }
  function Fe(G) {
    return s[G.getUTCMonth()];
  }
  function bt(G) {
    return i[+(G.getUTCHours() >= 12)];
  }
  function gt(G) {
    return 1 + ~~(G.getUTCMonth() / 3);
  }
  return {
    format: function (G) {
      var X = A((G += ''), b);
      return (
        (X.toString = function () {
          return G;
        }),
        X
      );
    },
    parse: function (G) {
      var X = O((G += ''), !1);
      return (
        (X.toString = function () {
          return G;
        }),
        X
      );
    },
    utcFormat: function (G) {
      var X = A((G += ''), N);
      return (
        (X.toString = function () {
          return G;
        }),
        X
      );
    },
    utcParse: function (G) {
      var X = O((G += ''), !0);
      return (
        (X.toString = function () {
          return G;
        }),
        X
      );
    },
  };
}
function At(t, e, r) {
  var n = t < 0 ? '-' : '',
    i = (n ? -t : t) + '',
    o = i.length;
  return n + (o < r ? new Array(r - o + 1).join(e) + i : i);
}
function VH(t) {
  return t.replace(YH, '\\$&');
}
function Ql(t) {
  return new RegExp('^(?:' + t.map(VH).join('|') + ')', 'i');
}
function Jl(t) {
  return new Map(t.map((e, r) => [e.toLowerCase(), r]));
}
function XH(t, e, r) {
  var n = We.exec(e.slice(r, r + 1));
  return n ? ((t.w = +n[0]), r + n[0].length) : -1;
}
function KH(t, e, r) {
  var n = We.exec(e.slice(r, r + 1));
  return n ? ((t.u = +n[0]), r + n[0].length) : -1;
}
function ZH(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.U = +n[0]), r + n[0].length) : -1;
}
function QH(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.V = +n[0]), r + n[0].length) : -1;
}
function JH(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.W = +n[0]), r + n[0].length) : -1;
}
function RI(t, e, r) {
  var n = We.exec(e.slice(r, r + 4));
  return n ? ((t.y = +n[0]), r + n[0].length) : -1;
}
function NI(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length) : -1;
}
function t7(t, e, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(r, r + 6));
  return n
    ? ((t.Z = n[1] ? 0 : -(n[2] + (n[3] || '00'))), r + n[0].length)
    : -1;
}
function e7(t, e, r) {
  var n = We.exec(e.slice(r, r + 1));
  return n ? ((t.q = n[0] * 3 - 3), r + n[0].length) : -1;
}
function r7(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.m = n[0] - 1), r + n[0].length) : -1;
}
function FI(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.d = +n[0]), r + n[0].length) : -1;
}
function n7(t, e, r) {
  var n = We.exec(e.slice(r, r + 3));
  return n ? ((t.m = 0), (t.d = +n[0]), r + n[0].length) : -1;
}
function MI(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.H = +n[0]), r + n[0].length) : -1;
}
function i7(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.M = +n[0]), r + n[0].length) : -1;
}
function o7(t, e, r) {
  var n = We.exec(e.slice(r, r + 2));
  return n ? ((t.S = +n[0]), r + n[0].length) : -1;
}
function a7(t, e, r) {
  var n = We.exec(e.slice(r, r + 3));
  return n ? ((t.L = +n[0]), r + n[0].length) : -1;
}
function s7(t, e, r) {
  var n = We.exec(e.slice(r, r + 6));
  return n ? ((t.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1;
}
function l7(t, e, r) {
  var n = jH.exec(e.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function c7(t, e, r) {
  var n = We.exec(e.slice(r));
  return n ? ((t.Q = +n[0]), r + n[0].length) : -1;
}
function u7(t, e, r) {
  var n = We.exec(e.slice(r));
  return n ? ((t.s = +n[0]), r + n[0].length) : -1;
}
function BI(t, e) {
  return At(t.getDate(), e, 2);
}
function f7(t, e) {
  return At(t.getHours(), e, 2);
}
function h7(t, e) {
  return At(t.getHours() % 12 || 12, e, 2);
}
function p7(t, e) {
  return At(1 + Yl.count(oi(t), t), e, 3);
}
function $I(t, e) {
  return At(t.getMilliseconds(), e, 3);
}
function d7(t, e) {
  return $I(t, e) + '000';
}
function m7(t, e) {
  return At(t.getMonth() + 1, e, 2);
}
function g7(t, e) {
  return At(t.getMinutes(), e, 2);
}
function x7(t, e) {
  return At(t.getSeconds(), e, 2);
}
function y7(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function b7(t, e) {
  return At(Xl.count(oi(t) - 1, t), e, 2);
}
function WI(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Di(t) : Di.ceil(t);
}
function _7(t, e) {
  return (t = WI(t)), At(Di.count(oi(t), t) + (oi(t).getDay() === 4), e, 2);
}
function C7(t) {
  return t.getDay();
}
function T7(t, e) {
  return At(ls.count(oi(t) - 1, t), e, 2);
}
function k7(t, e) {
  return At(t.getFullYear() % 100, e, 2);
}
function E7(t, e) {
  return (t = WI(t)), At(t.getFullYear() % 100, e, 2);
}
function w7(t, e) {
  return At(t.getFullYear() % 1e4, e, 4);
}
function S7(t, e) {
  var r = t.getDay();
  return (
    (t = r >= 4 || r === 0 ? Di(t) : Di.ceil(t)),
    At(t.getFullYear() % 1e4, e, 4)
  );
}
function v7(t) {
  var e = t.getTimezoneOffset();
  return (
    (e > 0 ? '-' : ((e *= -1), '+')) +
    At((e / 60) | 0, '0', 2) +
    At(e % 60, '0', 2)
  );
}
function PI(t, e) {
  return At(t.getUTCDate(), e, 2);
}
function A7(t, e) {
  return At(t.getUTCHours(), e, 2);
}
function L7(t, e) {
  return At(t.getUTCHours() % 12 || 12, e, 2);
}
function I7(t, e) {
  return At(1 + Vl.count(ai(t), t), e, 3);
}
function qI(t, e) {
  return At(t.getUTCMilliseconds(), e, 3);
}
function O7(t, e) {
  return qI(t, e) + '000';
}
function R7(t, e) {
  return At(t.getUTCMonth() + 1, e, 2);
}
function N7(t, e) {
  return At(t.getUTCMinutes(), e, 2);
}
function F7(t, e) {
  return At(t.getUTCSeconds(), e, 2);
}
function M7(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function B7(t, e) {
  return At(Kl.count(ai(t) - 1, t), e, 2);
}
function HI(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Ui(t) : Ui.ceil(t);
}
function P7(t, e) {
  return (t = HI(t)), At(Ui.count(ai(t), t) + (ai(t).getUTCDay() === 4), e, 2);
}
function D7(t) {
  return t.getUTCDay();
}
function U7(t, e) {
  return At(cs.count(ai(t) - 1, t), e, 2);
}
function z7(t, e) {
  return At(t.getUTCFullYear() % 100, e, 2);
}
function $7(t, e) {
  return (t = HI(t)), At(t.getUTCFullYear() % 100, e, 2);
}
function W7(t, e) {
  return At(t.getUTCFullYear() % 1e4, e, 4);
}
function q7(t, e) {
  var r = t.getUTCDay();
  return (
    (t = r >= 4 || r === 0 ? Ui(t) : Ui.ceil(t)),
    At(t.getUTCFullYear() % 1e4, e, 4)
  );
}
function H7() {
  return '+0000';
}
function DI() {
  return '%';
}
function UI(t) {
  return +t;
}
function zI(t) {
  return Math.floor(+t / 1e3);
}
var OI,
  We,
  jH,
  YH,
  GI = f(() => {
    gx();
    (OI = { '-': '', _: ' ', 0: '0' }),
      (We = /^\s*\d+/),
      (jH = /^%/),
      (YH = /[\\^$*+?|[\]().{}]/g);
  });
function _x(t) {
  return (
    (us = bx(t)),
    (jI = us.format),
    (YI = us.parse),
    (VI = us.utcFormat),
    (XI = us.utcParse),
    us
  );
}
var us,
  jI,
  YI,
  VI,
  XI,
  KI = f(() => {
    GI();
    _x({
      dateTime: '%x, %X',
      date: '%-m/%-d/%Y',
      time: '%-I:%M:%S %p',
      periods: ['AM', 'PM'],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    });
  });
var ZI = f(() => {
  KI();
});
var QI = f(() => {});
var JI = f(() => {});
function Wo(t) {
  return function () {
    return t;
  };
}
var t2 = f(() => {});
var Cx,
  e2,
  _Et,
  CEt,
  r2 = f(() => {
    (Cx = 1e-12), (e2 = Math.PI), (_Et = e2 / 2), (CEt = 2 * e2);
  });
function n2(t) {
  let e = 3;
  return (
    (t.digits = function (r) {
      if (!arguments.length) return e;
      if (r == null) e = null;
      else {
        let n = Math.floor(r);
        if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
        e = n;
      }
      return t;
    }),
    () => new Do(e)
  );
}
var i2 = f(() => {
  ox();
});
function o2(t) {
  return typeof t == 'object' && 'length' in t ? t : Array.from(t);
}
var wEt,
  a2 = f(() => {
    wEt = Array.prototype.slice;
  });
function s2(t) {
  this._context = t;
}
function si(t) {
  return new s2(t);
}
var Tx = f(() => {
  s2.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, e)
              : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
        default:
          this._context.lineTo(t, e);
          break;
      }
    },
  };
});
function l2(t) {
  return t[0];
}
function c2(t) {
  return t[1];
}
var u2 = f(() => {});
function kx(t, e) {
  var r = Wo(!0),
    n = null,
    i = si,
    o = null,
    a = n2(s);
  (t = typeof t == 'function' ? t : t === void 0 ? l2 : Wo(t)),
    (e = typeof e == 'function' ? e : e === void 0 ? c2 : Wo(e));
  function s(l) {
    var c,
      u = (l = o2(l)).length,
      h,
      p = !1,
      d;
    for (n == null && (o = i((d = a()))), c = 0; c <= u; ++c)
      !(c < u && r((h = l[c]), c, l)) === p &&
        ((p = !p) ? o.lineStart() : o.lineEnd()),
        p && o.point(+t(h, c, l), +e(h, c, l));
    if (d) return (o = null), d + '' || null;
  }
  return (
    (s.x = function (l) {
      return arguments.length
        ? ((t = typeof l == 'function' ? l : Wo(+l)), s)
        : t;
    }),
    (s.y = function (l) {
      return arguments.length
        ? ((e = typeof l == 'function' ? l : Wo(+l)), s)
        : e;
    }),
    (s.defined = function (l) {
      return arguments.length
        ? ((r = typeof l == 'function' ? l : Wo(!!l)), s)
        : r;
    }),
    (s.curve = function (l) {
      return arguments.length ? ((i = l), n != null && (o = i(n)), s) : i;
    }),
    (s.context = function (l) {
      return arguments.length
        ? (l == null ? (n = o = null) : (o = i((n = l))), s)
        : n;
    }),
    s
  );
}
var f2 = f(() => {
  a2();
  t2();
  Tx();
  i2();
  u2();
});
function Ex(t) {
  return new vh(t, !0);
}
function wx(t) {
  return new vh(t, !1);
}
var vh,
  h2 = f(() => {
    vh = class {
      constructor(e, r) {
        (this._context = e), (this._x = r);
      }
      areaStart() {
        this._line = 0;
      }
      areaEnd() {
        this._line = NaN;
      }
      lineStart() {
        this._point = 0;
      }
      lineEnd() {
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      }
      point(e, r) {
        switch (((e = +e), (r = +r), this._point)) {
          case 0: {
            (this._point = 1),
              this._line
                ? this._context.lineTo(e, r)
                : this._context.moveTo(e, r);
            break;
          }
          case 1:
            this._point = 2;
          default: {
            this._x
              ? this._context.bezierCurveTo(
                  (this._x0 = (this._x0 + e) / 2),
                  this._y0,
                  this._x0,
                  r,
                  e,
                  r
                )
              : this._context.bezierCurveTo(
                  this._x0,
                  (this._y0 = (this._y0 + r) / 2),
                  e,
                  this._y0,
                  e,
                  r
                );
            break;
          }
        }
        (this._x0 = e), (this._y0 = r);
      }
    };
  });
function tn() {}
var tc = f(() => {});
function fs(t, e, r) {
  t._context.bezierCurveTo(
    (2 * t._x0 + t._x1) / 3,
    (2 * t._y0 + t._y1) / 3,
    (t._x0 + 2 * t._x1) / 3,
    (t._y0 + 2 * t._y1) / 3,
    (t._x0 + 4 * t._x1 + e) / 6,
    (t._y0 + 4 * t._y1 + r) / 6
  );
}
function ec(t) {
  this._context = t;
}
function rc(t) {
  return new ec(t);
}
var nc = f(() => {
  ec.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 3:
          fs(this, this._x1, this._y1);
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
      }
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, e)
              : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          (this._point = 3),
            this._context.lineTo(
              (5 * this._x0 + this._x1) / 6,
              (5 * this._y0 + this._y1) / 6
            );
        default:
          fs(this, t, e);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = e);
    },
  };
});
function p2(t) {
  this._context = t;
}
function Sx(t) {
  return new p2(t);
}
var d2 = f(() => {
  tc();
  nc();
  p2.prototype = {
    areaStart: tn,
    areaEnd: tn,
    lineStart: function () {
      (this._x0 =
        this._x1 =
        this._x2 =
        this._x3 =
        this._x4 =
        this._y0 =
        this._y1 =
        this._y2 =
        this._y3 =
        this._y4 =
          NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 1: {
          this._context.moveTo(this._x2, this._y2), this._context.closePath();
          break;
        }
        case 2: {
          this._context.moveTo(
            (this._x2 + 2 * this._x3) / 3,
            (this._y2 + 2 * this._y3) / 3
          ),
            this._context.lineTo(
              (this._x3 + 2 * this._x2) / 3,
              (this._y3 + 2 * this._y2) / 3
            ),
            this._context.closePath();
          break;
        }
        case 3: {
          this.point(this._x2, this._y2),
            this.point(this._x3, this._y3),
            this.point(this._x4, this._y4);
          break;
        }
      }
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          (this._point = 1), (this._x2 = t), (this._y2 = e);
          break;
        case 1:
          (this._point = 2), (this._x3 = t), (this._y3 = e);
          break;
        case 2:
          (this._point = 3),
            (this._x4 = t),
            (this._y4 = e),
            this._context.moveTo(
              (this._x0 + 4 * this._x1 + t) / 6,
              (this._y0 + 4 * this._y1 + e) / 6
            );
          break;
        default:
          fs(this, t, e);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = e);
    },
  };
});
function m2(t) {
  this._context = t;
}
function vx(t) {
  return new m2(t);
}
var g2 = f(() => {
  nc();
  m2.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
    },
    lineEnd: function () {
      (this._line || (this._line !== 0 && this._point === 3)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          var r = (this._x0 + 4 * this._x1 + t) / 6,
            n = (this._y0 + 4 * this._y1 + e) / 6;
          this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
          break;
        case 3:
          this._point = 4;
        default:
          fs(this, t, e);
          break;
      }
      (this._x0 = this._x1),
        (this._x1 = t),
        (this._y0 = this._y1),
        (this._y1 = e);
    },
  };
});
function x2(t, e) {
  (this._basis = new ec(t)), (this._beta = e);
}
var Ax,
  y2 = f(() => {
    nc();
    x2.prototype = {
      lineStart: function () {
        (this._x = []), (this._y = []), this._basis.lineStart();
      },
      lineEnd: function () {
        var t = this._x,
          e = this._y,
          r = t.length - 1;
        if (r > 0)
          for (
            var n = t[0], i = e[0], o = t[r] - n, a = e[r] - i, s = -1, l;
            ++s <= r;

          )
            (l = s / r),
              this._basis.point(
                this._beta * t[s] + (1 - this._beta) * (n + l * o),
                this._beta * e[s] + (1 - this._beta) * (i + l * a)
              );
        (this._x = this._y = null), this._basis.lineEnd();
      },
      point: function (t, e) {
        this._x.push(+t), this._y.push(+e);
      },
    };
    Ax = (function t(e) {
      function r(n) {
        return e === 1 ? new ec(n) : new x2(n, e);
      }
      return (
        (r.beta = function (n) {
          return t(+n);
        }),
        r
      );
    })(0.85);
  });
function hs(t, e, r) {
  t._context.bezierCurveTo(
    t._x1 + t._k * (t._x2 - t._x0),
    t._y1 + t._k * (t._y2 - t._y0),
    t._x2 + t._k * (t._x1 - e),
    t._y2 + t._k * (t._y1 - r),
    t._x2,
    t._y2
  );
}
function Ah(t, e) {
  (this._context = t), (this._k = (1 - e) / 6);
}
var Lx,
  ic = f(() => {
    Ah.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            hs(this, this._x1, this._y1);
            break;
        }
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            (this._point = 2), (this._x1 = t), (this._y1 = e);
            break;
          case 2:
            this._point = 3;
          default:
            hs(this, t, e);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Lx = (function t(e) {
      function r(n) {
        return new Ah(n, e);
      }
      return (
        (r.tension = function (n) {
          return t(+n);
        }),
        r
      );
    })(0);
  });
function Lh(t, e) {
  (this._context = t), (this._k = (1 - e) / 6);
}
var Ix,
  Ox = f(() => {
    tc();
    ic();
    Lh.prototype = {
      areaStart: tn,
      areaEnd: tn,
      lineStart: function () {
        (this._x0 =
          this._x1 =
          this._x2 =
          this._x3 =
          this._x4 =
          this._x5 =
          this._y0 =
          this._y1 =
          this._y2 =
          this._y3 =
          this._y4 =
          this._y5 =
            NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            (this._point = 1), (this._x3 = t), (this._y3 = e);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = t), (this._y4 = e));
            break;
          case 2:
            (this._point = 3), (this._x5 = t), (this._y5 = e);
            break;
          default:
            hs(this, t, e);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Ix = (function t(e) {
      function r(n) {
        return new Lh(n, e);
      }
      return (
        (r.tension = function (n) {
          return t(+n);
        }),
        r
      );
    })(0);
  });
function Ih(t, e) {
  (this._context = t), (this._k = (1 - e) / 6);
}
var Rx,
  Nx = f(() => {
    ic();
    Ih.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._point = 0);
      },
      lineEnd: function () {
        (this._line || (this._line !== 0 && this._point === 3)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        switch (((t = +t), (e = +e), this._point)) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            hs(this, t, e);
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Rx = (function t(e) {
      function r(n) {
        return new Ih(n, e);
      }
      return (
        (r.tension = function (n) {
          return t(+n);
        }),
        r
      );
    })(0);
  });
function oc(t, e, r) {
  var n = t._x1,
    i = t._y1,
    o = t._x2,
    a = t._y2;
  if (t._l01_a > Cx) {
    var s = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
      l = 3 * t._l01_a * (t._l01_a + t._l12_a);
    (n = (n * s - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l),
      (i = (i * s - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / l);
  }
  if (t._l23_a > Cx) {
    var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
      u = 3 * t._l23_a * (t._l23_a + t._l12_a);
    (o = (o * c + t._x1 * t._l23_2a - e * t._l12_2a) / u),
      (a = (a * c + t._y1 * t._l23_2a - r * t._l12_2a) / u);
  }
  t._context.bezierCurveTo(n, i, o, a, t._x2, t._y2);
}
function b2(t, e) {
  (this._context = t), (this._alpha = e);
}
var Fx,
  Oh = f(() => {
    r2();
    ic();
    b2.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            this.point(this._x2, this._y2);
            break;
        }
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var r = this._x2 - t,
            n = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
          default:
            oc(this, t, e);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Fx = (function t(e) {
      function r(n) {
        return e ? new b2(n, e) : new Ah(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return t(+n);
        }),
        r
      );
    })(0.5);
  });
function _2(t, e) {
  (this._context = t), (this._alpha = e);
}
var Mx,
  C2 = f(() => {
    Ox();
    tc();
    Oh();
    _2.prototype = {
      areaStart: tn,
      areaEnd: tn,
      lineStart: function () {
        (this._x0 =
          this._x1 =
          this._x2 =
          this._x3 =
          this._x4 =
          this._x5 =
          this._y0 =
          this._y1 =
          this._y2 =
          this._y3 =
          this._y4 =
          this._y5 =
            NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3), this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3),
              this.point(this._x4, this._y4),
              this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var r = this._x2 - t,
            n = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            (this._point = 1), (this._x3 = t), (this._y3 = e);
            break;
          case 1:
            (this._point = 2),
              this._context.moveTo((this._x4 = t), (this._y4 = e));
            break;
          case 2:
            (this._point = 3), (this._x5 = t), (this._y5 = e);
            break;
          default:
            oc(this, t, e);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Mx = (function t(e) {
      function r(n) {
        return e ? new _2(n, e) : new Lh(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return t(+n);
        }),
        r
      );
    })(0.5);
  });
function T2(t, e) {
  (this._context = t), (this._alpha = e);
}
var Bx,
  k2 = f(() => {
    Nx();
    Oh();
    T2.prototype = {
      areaStart: function () {
        this._line = 0;
      },
      areaEnd: function () {
        this._line = NaN;
      },
      lineStart: function () {
        (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
          (this._l01_a =
            this._l12_a =
            this._l23_a =
            this._l01_2a =
            this._l12_2a =
            this._l23_2a =
            this._point =
              0);
      },
      lineEnd: function () {
        (this._line || (this._line !== 0 && this._point === 3)) &&
          this._context.closePath(),
          (this._line = 1 - this._line);
      },
      point: function (t, e) {
        if (((t = +t), (e = +e), this._point)) {
          var r = this._x2 - t,
            n = this._y2 - e;
          this._l23_a = Math.sqrt(
            (this._l23_2a = Math.pow(r * r + n * n, this._alpha))
          );
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3),
              this._line
                ? this._context.lineTo(this._x2, this._y2)
                : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            oc(this, t, e);
            break;
        }
        (this._l01_a = this._l12_a),
          (this._l12_a = this._l23_a),
          (this._l01_2a = this._l12_2a),
          (this._l12_2a = this._l23_2a),
          (this._x0 = this._x1),
          (this._x1 = this._x2),
          (this._x2 = t),
          (this._y0 = this._y1),
          (this._y1 = this._y2),
          (this._y2 = e);
      },
    };
    Bx = (function t(e) {
      function r(n) {
        return e ? new T2(n, e) : new Ih(n, 0);
      }
      return (
        (r.alpha = function (n) {
          return t(+n);
        }),
        r
      );
    })(0.5);
  });
function E2(t) {
  this._context = t;
}
function Px(t) {
  return new E2(t);
}
var w2 = f(() => {
  tc();
  E2.prototype = {
    areaStart: tn,
    areaEnd: tn,
    lineStart: function () {
      this._point = 0;
    },
    lineEnd: function () {
      this._point && this._context.closePath();
    },
    point: function (t, e) {
      (t = +t),
        (e = +e),
        this._point
          ? this._context.lineTo(t, e)
          : ((this._point = 1), this._context.moveTo(t, e));
    },
  };
});
function S2(t) {
  return t < 0 ? -1 : 1;
}
function v2(t, e, r) {
  var n = t._x1 - t._x0,
    i = e - t._x1,
    o = (t._y1 - t._y0) / (n || (i < 0 && -0)),
    a = (r - t._y1) / (i || (n < 0 && -0)),
    s = (o * i + a * n) / (n + i);
  return (
    (S2(o) + S2(a)) * Math.min(Math.abs(o), Math.abs(a), 0.5 * Math.abs(s)) || 0
  );
}
function A2(t, e) {
  var r = t._x1 - t._x0;
  return r ? ((3 * (t._y1 - t._y0)) / r - e) / 2 : e;
}
function Dx(t, e, r) {
  var n = t._x0,
    i = t._y0,
    o = t._x1,
    a = t._y1,
    s = (o - n) / 3;
  t._context.bezierCurveTo(n + s, i + s * e, o - s, a - s * r, o, a);
}
function Rh(t) {
  this._context = t;
}
function L2(t) {
  this._context = new I2(t);
}
function I2(t) {
  this._context = t;
}
function Ux(t) {
  return new Rh(t);
}
function zx(t) {
  return new L2(t);
}
var O2 = f(() => {
  Rh.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
        (this._point = 0);
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          Dx(this, this._t0, A2(this, this._t0));
          break;
      }
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line);
    },
    point: function (t, e) {
      var r = NaN;
      if (((t = +t), (e = +e), !(t === this._x1 && e === this._y1))) {
        switch (this._point) {
          case 0:
            (this._point = 1),
              this._line
                ? this._context.lineTo(t, e)
                : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            (this._point = 3), Dx(this, A2(this, (r = v2(this, t, e))), r);
            break;
          default:
            Dx(this, this._t0, (r = v2(this, t, e)));
            break;
        }
        (this._x0 = this._x1),
          (this._x1 = t),
          (this._y0 = this._y1),
          (this._y1 = e),
          (this._t0 = r);
      }
    },
  };
  (L2.prototype = Object.create(Rh.prototype)).point = function (t, e) {
    Rh.prototype.point.call(this, e, t);
  };
  I2.prototype = {
    moveTo: function (t, e) {
      this._context.moveTo(e, t);
    },
    closePath: function () {
      this._context.closePath();
    },
    lineTo: function (t, e) {
      this._context.lineTo(e, t);
    },
    bezierCurveTo: function (t, e, r, n, i, o) {
      this._context.bezierCurveTo(e, t, n, r, o, i);
    },
  };
});
function N2(t) {
  this._context = t;
}
function R2(t) {
  var e,
    r = t.length - 1,
    n,
    i = new Array(r),
    o = new Array(r),
    a = new Array(r);
  for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e)
    (i[e] = 1), (o[e] = 4), (a[e] = 4 * t[e] + 2 * t[e + 1]);
  for (
    i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1;
    e < r;
    ++e
  )
    (n = i[e] / o[e - 1]), (o[e] -= n), (a[e] -= n * a[e - 1]);
  for (i[r - 1] = a[r - 1] / o[r - 1], e = r - 2; e >= 0; --e)
    i[e] = (a[e] - i[e + 1]) / o[e];
  for (o[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e)
    o[e] = 2 * t[e + 1] - i[e + 1];
  return [i, o];
}
function $x(t) {
  return new N2(t);
}
var F2 = f(() => {
  N2.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x = []), (this._y = []);
    },
    lineEnd: function () {
      var t = this._x,
        e = this._y,
        r = t.length;
      if (r)
        if (
          (this._line
            ? this._context.lineTo(t[0], e[0])
            : this._context.moveTo(t[0], e[0]),
          r === 2)
        )
          this._context.lineTo(t[1], e[1]);
        else
          for (var n = R2(t), i = R2(e), o = 0, a = 1; a < r; ++o, ++a)
            this._context.bezierCurveTo(
              n[0][o],
              i[0][o],
              n[1][o],
              i[1][o],
              t[a],
              e[a]
            );
      (this._line || (this._line !== 0 && r === 1)) &&
        this._context.closePath(),
        (this._line = 1 - this._line),
        (this._x = this._y = null);
    },
    point: function (t, e) {
      this._x.push(+t), this._y.push(+e);
    },
  };
});
function Nh(t, e) {
  (this._context = t), (this._t = e);
}
function Wx(t) {
  return new Nh(t, 0.5);
}
function qx(t) {
  return new Nh(t, 0);
}
function Hx(t) {
  return new Nh(t, 1);
}
var M2 = f(() => {
  Nh.prototype = {
    areaStart: function () {
      this._line = 0;
    },
    areaEnd: function () {
      this._line = NaN;
    },
    lineStart: function () {
      (this._x = this._y = NaN), (this._point = 0);
    },
    lineEnd: function () {
      0 < this._t &&
        this._t < 1 &&
        this._point === 2 &&
        this._context.lineTo(this._x, this._y),
        (this._line || (this._line !== 0 && this._point === 1)) &&
          this._context.closePath(),
        this._line >= 0 &&
          ((this._t = 1 - this._t), (this._line = 1 - this._line));
    },
    point: function (t, e) {
      switch (((t = +t), (e = +e), this._point)) {
        case 0:
          (this._point = 1),
            this._line
              ? this._context.lineTo(t, e)
              : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
        default: {
          if (this._t <= 0)
            this._context.lineTo(this._x, e), this._context.lineTo(t, e);
          else {
            var r = this._x * (1 - this._t) + t * this._t;
            this._context.lineTo(r, this._y), this._context.lineTo(r, e);
          }
          break;
        }
      }
      (this._x = t), (this._y = e);
    },
  };
});
var B2 = f(() => {
  f2();
  d2();
  g2();
  nc();
  h2();
  y2();
  Ox();
  Nx();
  ic();
  C2();
  k2();
  Oh();
  w2();
  Tx();
  O2();
  F2();
  M2();
});
var P2 = f(() => {});
var D2 = f(() => {});
function zi(t, e, r) {
  (this.k = t), (this.x = e), (this.y = r);
}
function jx(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Gx;
  return t.__zoom;
}
var Gx,
  Yx = f(() => {
    zi.prototype = {
      constructor: zi,
      scale: function (t) {
        return t === 1 ? this : new zi(this.k * t, this.x, this.y);
      },
      translate: function (t, e) {
        return (t === 0) & (e === 0)
          ? this
          : new zi(this.k, this.x + this.k * t, this.y + this.k * e);
      },
      apply: function (t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y];
      },
      applyX: function (t) {
        return t * this.k + this.x;
      },
      applyY: function (t) {
        return t * this.k + this.y;
      },
      invert: function (t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
      },
      invertX: function (t) {
        return (t - this.x) / this.k;
      },
      invertY: function (t) {
        return (t - this.y) / this.k;
      },
      rescaleX: function (t) {
        return t
          .copy()
          .domain(t.range().map(this.invertX, this).map(t.invert, t));
      },
      rescaleY: function (t) {
        return t
          .copy()
          .domain(t.range().map(this.invertY, this).map(t.invert, t));
      },
      toString: function () {
        return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
      },
    };
    Gx = new zi(1, 0, 0);
    jx.prototype = zi.prototype;
  });
var U2 = f(() => {});
var z2 = f(() => {
  Eh();
  P2();
  D2();
  Yx();
  U2();
});
var $2 = f(() => {
  z2();
  Yx();
});
var gn = f(() => {
  wS();
  SS();
  FL();
  DL();
  oh();
  UL();
  zL();
  Lg();
  Qv();
  $L();
  ex();
  WL();
  HL();
  hI();
  pI();
  dI();
  Ml();
  ox();
  mI();
  qL();
  gI();
  QI();
  JI();
  dn();
  B2();
  gx();
  ZI();
  gh();
  Eh();
  $2();
});
var W2 = kd((Fh) => {
  'use strict';
  Object.defineProperty(Fh, '__esModule', { value: !0 });
  Fh.sanitizeUrl = void 0;
  var G7 = /^([^\w]*)(javascript|data|vbscript)/im,
    j7 = /&#(\w+)(^\w|;)?/g,
    Y7 = /&(newline|tab);/gi,
    V7 = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,
    X7 = /^.+(:|&colon;)/gim,
    K7 = ['.', '/'];
  function Z7(t) {
    return K7.indexOf(t[0]) > -1;
  }
  function Q7(t) {
    return t.replace(j7, function (e, r) {
      return String.fromCharCode(r);
    });
  }
  function J7(t) {
    var e = Q7(t || '')
      .replace(Y7, '')
      .replace(V7, '')
      .trim();
    if (!e) return 'about:blank';
    if (Z7(e)) return e;
    var r = e.match(X7);
    if (!r) return e;
    var n = r[0];
    return G7.test(n) ? 'about:blank' : e;
  }
  Fh.sanitizeUrl = J7;
});
var Kx = kd((Vx, Xx) => {
  (function (t, e) {
    typeof Vx == 'object' && typeof Xx < 'u'
      ? (Xx.exports = e())
      : typeof define == 'function' && define.amd
      ? define(e)
      : ((t = typeof globalThis < 'u' ? globalThis : t || self),
        (t.DOMPurify = e()));
  })(Vx, function () {
    'use strict';
    let {
        entries: t,
        setPrototypeOf: e,
        isFrozen: r,
        getPrototypeOf: n,
        getOwnPropertyDescriptor: i,
      } = Object,
      { freeze: o, seal: a, create: s } = Object,
      { apply: l, construct: c } = typeof Reflect < 'u' && Reflect;
    l ||
      (l = function (V, kt, wt) {
        return V.apply(kt, wt);
      }),
      o ||
        (o = function (V) {
          return V;
        }),
      a ||
        (a = function (V) {
          return V;
        }),
      c ||
        (c = function (V, kt) {
          return new V(...kt);
        });
    let u = I(Array.prototype.forEach),
      h = I(Array.prototype.pop),
      p = I(Array.prototype.push),
      d = I(String.prototype.toLowerCase),
      m = I(String.prototype.toString),
      g = I(String.prototype.match),
      E = I(String.prototype.replace),
      y = I(String.prototype.indexOf),
      T = I(String.prototype.trim),
      b = I(RegExp.prototype.test),
      N = A(TypeError);
    function I(pt) {
      return function (V) {
        for (
          var kt = arguments.length,
            wt = new Array(kt > 1 ? kt - 1 : 0),
            Ee = 1;
          Ee < kt;
          Ee++
        )
          wt[Ee - 1] = arguments[Ee];
        return l(pt, V, wt);
      };
    }
    function A(pt) {
      return function () {
        for (var V = arguments.length, kt = new Array(V), wt = 0; wt < V; wt++)
          kt[wt] = arguments[wt];
        return c(pt, kt);
      };
    }
    function O(pt, V, kt) {
      var wt;
      (kt = (wt = kt) !== null && wt !== void 0 ? wt : d), e && e(pt, null);
      let Ee = V.length;
      for (; Ee--; ) {
        let dr = V[Ee];
        if (typeof dr == 'string') {
          let Or = kt(dr);
          Or !== dr && (r(V) || (V[Ee] = Or), (dr = Or));
        }
        pt[dr] = !0;
      }
      return pt;
    }
    function D(pt) {
      let V = s(null);
      for (let [kt, wt] of t(pt)) V[kt] = wt;
      return V;
    }
    function J(pt, V) {
      for (; pt !== null; ) {
        let wt = i(pt, V);
        if (wt) {
          if (wt.get) return I(wt.get);
          if (typeof wt.value == 'function') return I(wt.value);
        }
        pt = n(pt);
      }
      function kt(wt) {
        return console.warn('fallback value for', wt), null;
      }
      return kt;
    }
    let st = o([
        'a',
        'abbr',
        'acronym',
        'address',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'content',
        'data',
        'datalist',
        'dd',
        'decorator',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'element',
        'em',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'map',
        'mark',
        'marquee',
        'menu',
        'menuitem',
        'meter',
        'nav',
        'nobr',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'picture',
        'pre',
        'progress',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'section',
        'select',
        'shadow',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr',
      ]),
      R = o([
        'svg',
        'a',
        'altglyph',
        'altglyphdef',
        'altglyphitem',
        'animatecolor',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'filter',
        'font',
        'g',
        'glyph',
        'glyphref',
        'hkern',
        'image',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'stop',
        'style',
        'switch',
        'symbol',
        'text',
        'textpath',
        'title',
        'tref',
        'tspan',
        'view',
        'vkern',
      ]),
      L = o([
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence',
      ]),
      v = o([
        'animate',
        'color-profile',
        'cursor',
        'discard',
        'font-face',
        'font-face-format',
        'font-face-name',
        'font-face-src',
        'font-face-uri',
        'foreignobject',
        'hatch',
        'hatchpath',
        'mesh',
        'meshgradient',
        'meshpatch',
        'meshrow',
        'missing-glyph',
        'script',
        'set',
        'solidcolor',
        'unknown',
        'use',
      ]),
      U = o([
        'math',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'mprescripts',
      ]),
      M = o([
        'maction',
        'maligngroup',
        'malignmark',
        'mlongdiv',
        'mscarries',
        'mscarry',
        'msgroup',
        'mstack',
        'msline',
        'msrow',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none',
      ]),
      H = o(['#text']),
      j = o([
        'accept',
        'action',
        'align',
        'alt',
        'autocapitalize',
        'autocomplete',
        'autopictureinpicture',
        'autoplay',
        'background',
        'bgcolor',
        'border',
        'capture',
        'cellpadding',
        'cellspacing',
        'checked',
        'cite',
        'class',
        'clear',
        'color',
        'cols',
        'colspan',
        'controls',
        'controlslist',
        'coords',
        'crossorigin',
        'datetime',
        'decoding',
        'default',
        'dir',
        'disabled',
        'disablepictureinpicture',
        'disableremoteplayback',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'face',
        'for',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'id',
        'inputmode',
        'integrity',
        'ismap',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'loop',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'multiple',
        'muted',
        'name',
        'nonce',
        'noshade',
        'novalidate',
        'nowrap',
        'open',
        'optimum',
        'pattern',
        'placeholder',
        'playsinline',
        'poster',
        'preload',
        'pubdate',
        'radiogroup',
        'readonly',
        'rel',
        'required',
        'rev',
        'reversed',
        'role',
        'rows',
        'rowspan',
        'spellcheck',
        'scope',
        'selected',
        'shape',
        'size',
        'sizes',
        'span',
        'srclang',
        'start',
        'src',
        'srcset',
        'step',
        'style',
        'summary',
        'tabindex',
        'title',
        'translate',
        'type',
        'usemap',
        'valign',
        'value',
        'width',
        'xmlns',
        'slot',
      ]),
      it = o([
        'accent-height',
        'accumulate',
        'additive',
        'alignment-baseline',
        'ascent',
        'attributename',
        'attributetype',
        'azimuth',
        'basefrequency',
        'baseline-shift',
        'begin',
        'bias',
        'by',
        'class',
        'clip',
        'clippathunits',
        'clip-path',
        'clip-rule',
        'color',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'cx',
        'cy',
        'd',
        'dx',
        'dy',
        'diffuseconstant',
        'direction',
        'display',
        'divisor',
        'dur',
        'edgemode',
        'elevation',
        'end',
        'fill',
        'fill-opacity',
        'fill-rule',
        'filter',
        'filterunits',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'fx',
        'fy',
        'g1',
        'g2',
        'glyph-name',
        'glyphref',
        'gradientunits',
        'gradienttransform',
        'height',
        'href',
        'id',
        'image-rendering',
        'in',
        'in2',
        'k',
        'k1',
        'k2',
        'k3',
        'k4',
        'kerning',
        'keypoints',
        'keysplines',
        'keytimes',
        'lang',
        'lengthadjust',
        'letter-spacing',
        'kernelmatrix',
        'kernelunitlength',
        'lighting-color',
        'local',
        'marker-end',
        'marker-mid',
        'marker-start',
        'markerheight',
        'markerunits',
        'markerwidth',
        'maskcontentunits',
        'maskunits',
        'max',
        'mask',
        'media',
        'method',
        'mode',
        'min',
        'name',
        'numoctaves',
        'offset',
        'operator',
        'opacity',
        'order',
        'orient',
        'orientation',
        'origin',
        'overflow',
        'paint-order',
        'path',
        'pathlength',
        'patterncontentunits',
        'patterntransform',
        'patternunits',
        'points',
        'preservealpha',
        'preserveaspectratio',
        'primitiveunits',
        'r',
        'rx',
        'ry',
        'radius',
        'refx',
        'refy',
        'repeatcount',
        'repeatdur',
        'restart',
        'result',
        'rotate',
        'scale',
        'seed',
        'shape-rendering',
        'specularconstant',
        'specularexponent',
        'spreadmethod',
        'startoffset',
        'stddeviation',
        'stitchtiles',
        'stop-color',
        'stop-opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke',
        'stroke-width',
        'style',
        'surfacescale',
        'systemlanguage',
        'tabindex',
        'targetx',
        'targety',
        'transform',
        'transform-origin',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'textlength',
        'type',
        'u1',
        'u2',
        'unicode',
        'values',
        'viewbox',
        'visibility',
        'version',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'width',
        'word-spacing',
        'wrap',
        'writing-mode',
        'xchannelselector',
        'ychannelselector',
        'x',
        'x1',
        'x2',
        'xmlns',
        'y',
        'y1',
        'y2',
        'z',
        'zoomandpan',
      ]),
      ht = o([
        'accent',
        'accentunder',
        'align',
        'bevelled',
        'close',
        'columnsalign',
        'columnlines',
        'columnspan',
        'denomalign',
        'depth',
        'dir',
        'display',
        'displaystyle',
        'encoding',
        'fence',
        'frame',
        'height',
        'href',
        'id',
        'largeop',
        'length',
        'linethickness',
        'lspace',
        'lquote',
        'mathbackground',
        'mathcolor',
        'mathsize',
        'mathvariant',
        'maxsize',
        'minsize',
        'movablelimits',
        'notation',
        'numalign',
        'open',
        'rowalign',
        'rowlines',
        'rowspacing',
        'rowspan',
        'rspace',
        'rquote',
        'scriptlevel',
        'scriptminsize',
        'scriptsizemultiplier',
        'selection',
        'separator',
        'separators',
        'stretchy',
        'subscriptshift',
        'supscriptshift',
        'symmetric',
        'voffset',
        'width',
        'xmlns',
      ]),
      x = o([
        'xlink:href',
        'xml:id',
        'xlink:title',
        'xml:space',
        'xmlns:xlink',
      ]),
      Et = a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
      Xt = a(/<%[\w\W]*|[\w\W]*%>/gm),
      _ = a(/\${[\w\W]*}/gm),
      qt = a(/^data-[\-\w.\u00B7-\uFFFF]/),
      Pt = a(/^aria-[\-\w]+$/),
      Fe = a(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
      ),
      bt = a(/^(?:\w+script|data):/i),
      gt = a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
      G = a(/^html$/i);
    var X = Object.freeze({
      __proto__: null,
      MUSTACHE_EXPR: Et,
      ERB_EXPR: Xt,
      TMPLIT_EXPR: _,
      DATA_ATTR: qt,
      ARIA_ATTR: Pt,
      IS_ALLOWED_URI: Fe,
      IS_SCRIPT_OR_DATA: bt,
      ATTR_WHITESPACE: gt,
      DOCTYPE_NAME: G,
    });
    let ct = () => (typeof window > 'u' ? null : window),
      P = function (V, kt) {
        if (typeof V != 'object' || typeof V.createPolicy != 'function')
          return null;
        let wt = null,
          Ee = 'data-tt-policy-suffix';
        kt && kt.hasAttribute(Ee) && (wt = kt.getAttribute(Ee));
        let dr = 'dompurify' + (wt ? '#' + wt : '');
        try {
          return V.createPolicy(dr, {
            createHTML(Or) {
              return Or;
            },
            createScriptURL(Or) {
              return Or;
            },
          });
        } catch {
          return (
            console.warn(
              'TrustedTypes policy ' + dr + ' could not be created.'
            ),
            null
          );
        }
      };
    function Lt() {
      let pt =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ct(),
        V = (ot) => Lt(ot);
      if (
        ((V.version = '3.0.5'),
        (V.removed = []),
        !pt || !pt.document || pt.document.nodeType !== 9)
      )
        return (V.isSupported = !1), V;
      let kt = pt.document,
        wt = kt.currentScript,
        { document: Ee } = pt,
        {
          DocumentFragment: dr,
          HTMLTemplateElement: Or,
          Node: Rs,
          Element: Dc,
          NodeFilter: Ns,
          NamedNodeMap: od = pt.NamedNodeMap || pt.MozNamedAttrMap,
          HTMLFormElement: ad,
          DOMParser: F,
          trustedTypes: W,
        } = pt,
        lt = Dc.prototype,
        It = J(lt, 'cloneNode'),
        Ft = J(lt, 'nextSibling'),
        Rr = J(lt, 'childNodes'),
        $r = J(lt, 'parentNode');
      if (typeof Or == 'function') {
        let ot = Ee.createElement('template');
        ot.content &&
          ot.content.ownerDocument &&
          (Ee = ot.content.ownerDocument);
      }
      let Kt,
        ln = '',
        {
          implementation: Hn,
          createNodeIterator: se,
          createDocumentFragment: Fs,
          getElementsByTagName: cn,
        } = Ee,
        { importNode: oD } = kt,
        Tn = {};
      V.isSupported =
        typeof t == 'function' &&
        typeof $r == 'function' &&
        Hn &&
        Hn.createHTMLDocument !== void 0;
      let {
          MUSTACHE_EXPR: sd,
          ERB_EXPR: ld,
          TMPLIT_EXPR: cd,
          DATA_ATTR: aD,
          ARIA_ATTR: sD,
          IS_SCRIPT_OR_DATA: lD,
          ATTR_WHITESPACE: gb,
        } = X,
        { IS_ALLOWED_URI: xb } = X,
        Me = null,
        yb = O({}, [...st, ...R, ...L, ...U, ...H]),
        Be = null,
        bb = O({}, [...j, ...it, ...ht, ...x]),
        ye = Object.seal(
          Object.create(null, {
            tagNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null,
            },
            attributeNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null,
            },
            allowCustomizedBuiltInElements: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: !1,
            },
          })
        ),
        Ms = null,
        ud = null,
        _b = !0,
        fd = !0,
        Cb = !1,
        Tb = !0,
        ra = !1,
        io = !1,
        hd = !1,
        pd = !1,
        na = !1,
        Uc = !1,
        zc = !1,
        kb = !0,
        Eb = !1,
        cD = 'user-content-',
        dd = !0,
        Bs = !1,
        ia = {},
        oa = null,
        wb = O({}, [
          'annotation-xml',
          'audio',
          'colgroup',
          'desc',
          'foreignobject',
          'head',
          'iframe',
          'math',
          'mi',
          'mn',
          'mo',
          'ms',
          'mtext',
          'noembed',
          'noframes',
          'noscript',
          'plaintext',
          'script',
          'style',
          'svg',
          'template',
          'thead',
          'title',
          'video',
          'xmp',
        ]),
        Sb = null,
        vb = O({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
        md = null,
        Ab = O({}, [
          'alt',
          'class',
          'for',
          'id',
          'label',
          'name',
          'pattern',
          'placeholder',
          'role',
          'summary',
          'title',
          'value',
          'style',
          'xmlns',
        ]),
        $c = 'http://www.w3.org/1998/Math/MathML',
        Wc = 'http://www.w3.org/2000/svg',
        Gn = 'http://www.w3.org/1999/xhtml',
        aa = Gn,
        gd = !1,
        xd = null,
        uD = O({}, [$c, Wc, Gn], m),
        oo,
        fD = ['application/xhtml+xml', 'text/html'],
        hD = 'text/html',
        Pe,
        sa = null,
        pD = Ee.createElement('form'),
        Lb = function (w) {
          return w instanceof RegExp || w instanceof Function;
        },
        yd = function (w) {
          if (!(sa && sa === w)) {
            if (
              ((!w || typeof w != 'object') && (w = {}),
              (w = D(w)),
              (oo =
                fD.indexOf(w.PARSER_MEDIA_TYPE) === -1
                  ? (oo = hD)
                  : (oo = w.PARSER_MEDIA_TYPE)),
              (Pe = oo === 'application/xhtml+xml' ? m : d),
              (Me = 'ALLOWED_TAGS' in w ? O({}, w.ALLOWED_TAGS, Pe) : yb),
              (Be = 'ALLOWED_ATTR' in w ? O({}, w.ALLOWED_ATTR, Pe) : bb),
              (xd =
                'ALLOWED_NAMESPACES' in w
                  ? O({}, w.ALLOWED_NAMESPACES, m)
                  : uD),
              (md =
                'ADD_URI_SAFE_ATTR' in w
                  ? O(D(Ab), w.ADD_URI_SAFE_ATTR, Pe)
                  : Ab),
              (Sb =
                'ADD_DATA_URI_TAGS' in w
                  ? O(D(vb), w.ADD_DATA_URI_TAGS, Pe)
                  : vb),
              (oa = 'FORBID_CONTENTS' in w ? O({}, w.FORBID_CONTENTS, Pe) : wb),
              (Ms = 'FORBID_TAGS' in w ? O({}, w.FORBID_TAGS, Pe) : {}),
              (ud = 'FORBID_ATTR' in w ? O({}, w.FORBID_ATTR, Pe) : {}),
              (ia = 'USE_PROFILES' in w ? w.USE_PROFILES : !1),
              (_b = w.ALLOW_ARIA_ATTR !== !1),
              (fd = w.ALLOW_DATA_ATTR !== !1),
              (Cb = w.ALLOW_UNKNOWN_PROTOCOLS || !1),
              (Tb = w.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
              (ra = w.SAFE_FOR_TEMPLATES || !1),
              (io = w.WHOLE_DOCUMENT || !1),
              (na = w.RETURN_DOM || !1),
              (Uc = w.RETURN_DOM_FRAGMENT || !1),
              (zc = w.RETURN_TRUSTED_TYPE || !1),
              (pd = w.FORCE_BODY || !1),
              (kb = w.SANITIZE_DOM !== !1),
              (Eb = w.SANITIZE_NAMED_PROPS || !1),
              (dd = w.KEEP_CONTENT !== !1),
              (Bs = w.IN_PLACE || !1),
              (xb = w.ALLOWED_URI_REGEXP || Fe),
              (aa = w.NAMESPACE || Gn),
              (ye = w.CUSTOM_ELEMENT_HANDLING || {}),
              w.CUSTOM_ELEMENT_HANDLING &&
                Lb(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                (ye.tagNameCheck = w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
              w.CUSTOM_ELEMENT_HANDLING &&
                Lb(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                (ye.attributeNameCheck =
                  w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
              w.CUSTOM_ELEMENT_HANDLING &&
                typeof w.CUSTOM_ELEMENT_HANDLING
                  .allowCustomizedBuiltInElements == 'boolean' &&
                (ye.allowCustomizedBuiltInElements =
                  w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
              ra && (fd = !1),
              Uc && (na = !0),
              ia &&
                ((Me = O({}, [...H])),
                (Be = []),
                ia.html === !0 && (O(Me, st), O(Be, j)),
                ia.svg === !0 && (O(Me, R), O(Be, it), O(Be, x)),
                ia.svgFilters === !0 && (O(Me, L), O(Be, it), O(Be, x)),
                ia.mathMl === !0 && (O(Me, U), O(Be, ht), O(Be, x))),
              w.ADD_TAGS && (Me === yb && (Me = D(Me)), O(Me, w.ADD_TAGS, Pe)),
              w.ADD_ATTR && (Be === bb && (Be = D(Be)), O(Be, w.ADD_ATTR, Pe)),
              w.ADD_URI_SAFE_ATTR && O(md, w.ADD_URI_SAFE_ATTR, Pe),
              w.FORBID_CONTENTS &&
                (oa === wb && (oa = D(oa)), O(oa, w.FORBID_CONTENTS, Pe)),
              dd && (Me['#text'] = !0),
              io && O(Me, ['html', 'head', 'body']),
              Me.table && (O(Me, ['tbody']), delete Ms.tbody),
              w.TRUSTED_TYPES_POLICY)
            ) {
              if (typeof w.TRUSTED_TYPES_POLICY.createHTML != 'function')
                throw N(
                  'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
                );
              if (typeof w.TRUSTED_TYPES_POLICY.createScriptURL != 'function')
                throw N(
                  'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
                );
              (Kt = w.TRUSTED_TYPES_POLICY), (ln = Kt.createHTML(''));
            } else
              Kt === void 0 && (Kt = P(W, wt)),
                Kt !== null &&
                  typeof ln == 'string' &&
                  (ln = Kt.createHTML(''));
            o && o(w), (sa = w);
          }
        },
        Ib = O({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
        Ob = O({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
        dD = O({}, ['title', 'style', 'font', 'a', 'script']),
        qc = O({}, R);
      O(qc, L), O(qc, v);
      let bd = O({}, U);
      O(bd, M);
      let mD = function (w) {
          let $ = $r(w);
          (!$ || !$.tagName) && ($ = { namespaceURI: aa, tagName: 'template' });
          let Y = d(w.tagName),
            Dt = d($.tagName);
          return xd[w.namespaceURI]
            ? w.namespaceURI === Wc
              ? $.namespaceURI === Gn
                ? Y === 'svg'
                : $.namespaceURI === $c
                ? Y === 'svg' && (Dt === 'annotation-xml' || Ib[Dt])
                : !!qc[Y]
              : w.namespaceURI === $c
              ? $.namespaceURI === Gn
                ? Y === 'math'
                : $.namespaceURI === Wc
                ? Y === 'math' && Ob[Dt]
                : !!bd[Y]
              : w.namespaceURI === Gn
              ? ($.namespaceURI === Wc && !Ob[Dt]) ||
                ($.namespaceURI === $c && !Ib[Dt])
                ? !1
                : !bd[Y] && (dD[Y] || !qc[Y])
              : !!(oo === 'application/xhtml+xml' && xd[w.namespaceURI])
            : !1;
        },
        ao = function (w) {
          p(V.removed, { element: w });
          try {
            w.parentNode.removeChild(w);
          } catch {
            w.remove();
          }
        },
        _d = function (w, $) {
          try {
            p(V.removed, { attribute: $.getAttributeNode(w), from: $ });
          } catch {
            p(V.removed, { attribute: null, from: $ });
          }
          if (($.removeAttribute(w), w === 'is' && !Be[w]))
            if (na || Uc)
              try {
                ao($);
              } catch {}
            else
              try {
                $.setAttribute(w, '');
              } catch {}
        },
        Rb = function (w) {
          let $, Y;
          if (pd) w = '<remove></remove>' + w;
          else {
            let Wr = g(w, /^[\r\n\t ]+/);
            Y = Wr && Wr[0];
          }
          oo === 'application/xhtml+xml' &&
            aa === Gn &&
            (w =
              '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
              w +
              '</body></html>');
          let Dt = Kt ? Kt.createHTML(w) : w;
          if (aa === Gn)
            try {
              $ = new F().parseFromString(Dt, oo);
            } catch {}
          if (!$ || !$.documentElement) {
            $ = Hn.createDocument(aa, 'template', null);
            try {
              $.documentElement.innerHTML = gd ? ln : Dt;
            } catch {}
          }
          let De = $.body || $.documentElement;
          return (
            w &&
              Y &&
              De.insertBefore(Ee.createTextNode(Y), De.childNodes[0] || null),
            aa === Gn
              ? cn.call($, io ? 'html' : 'body')[0]
              : io
              ? $.documentElement
              : De
          );
        },
        Nb = function (w) {
          return se.call(
            w.ownerDocument || w,
            w,
            Ns.SHOW_ELEMENT | Ns.SHOW_COMMENT | Ns.SHOW_TEXT,
            null,
            !1
          );
        },
        gD = function (w) {
          return (
            w instanceof ad &&
            (typeof w.nodeName != 'string' ||
              typeof w.textContent != 'string' ||
              typeof w.removeChild != 'function' ||
              !(w.attributes instanceof od) ||
              typeof w.removeAttribute != 'function' ||
              typeof w.setAttribute != 'function' ||
              typeof w.namespaceURI != 'string' ||
              typeof w.insertBefore != 'function' ||
              typeof w.hasChildNodes != 'function')
          );
        },
        Hc = function (w) {
          return typeof Rs == 'object'
            ? w instanceof Rs
            : w &&
                typeof w == 'object' &&
                typeof w.nodeType == 'number' &&
                typeof w.nodeName == 'string';
        },
        jn = function (w, $, Y) {
          Tn[w] &&
            u(Tn[w], (Dt) => {
              Dt.call(V, $, Y, sa);
            });
        },
        Fb = function (w) {
          let $;
          if ((jn('beforeSanitizeElements', w, null), gD(w))) return ao(w), !0;
          let Y = Pe(w.nodeName);
          if (
            (jn('uponSanitizeElement', w, { tagName: Y, allowedTags: Me }),
            w.hasChildNodes() &&
              !Hc(w.firstElementChild) &&
              (!Hc(w.content) || !Hc(w.content.firstElementChild)) &&
              b(/<[/\w]/g, w.innerHTML) &&
              b(/<[/\w]/g, w.textContent))
          )
            return ao(w), !0;
          if (!Me[Y] || Ms[Y]) {
            if (
              !Ms[Y] &&
              Bb(Y) &&
              ((ye.tagNameCheck instanceof RegExp && b(ye.tagNameCheck, Y)) ||
                (ye.tagNameCheck instanceof Function && ye.tagNameCheck(Y)))
            )
              return !1;
            if (dd && !oa[Y]) {
              let Dt = $r(w) || w.parentNode,
                De = Rr(w) || w.childNodes;
              if (De && Dt) {
                let Wr = De.length;
                for (let le = Wr - 1; le >= 0; --le)
                  Dt.insertBefore(It(De[le], !0), Ft(w));
              }
            }
            return ao(w), !0;
          }
          return (w instanceof Dc && !mD(w)) ||
            ((Y === 'noscript' || Y === 'noembed' || Y === 'noframes') &&
              b(/<\/no(script|embed|frames)/i, w.innerHTML))
            ? (ao(w), !0)
            : (ra &&
                w.nodeType === 3 &&
                (($ = w.textContent),
                ($ = E($, sd, ' ')),
                ($ = E($, ld, ' ')),
                ($ = E($, cd, ' ')),
                w.textContent !== $ &&
                  (p(V.removed, { element: w.cloneNode() }),
                  (w.textContent = $))),
              jn('afterSanitizeElements', w, null),
              !1);
        },
        Mb = function (w, $, Y) {
          if (kb && ($ === 'id' || $ === 'name') && (Y in Ee || Y in pD))
            return !1;
          if (!(fd && !ud[$] && b(aD, $))) {
            if (!(_b && b(sD, $))) {
              if (!Be[$] || ud[$]) {
                if (
                  !(
                    (Bb(w) &&
                      ((ye.tagNameCheck instanceof RegExp &&
                        b(ye.tagNameCheck, w)) ||
                        (ye.tagNameCheck instanceof Function &&
                          ye.tagNameCheck(w))) &&
                      ((ye.attributeNameCheck instanceof RegExp &&
                        b(ye.attributeNameCheck, $)) ||
                        (ye.attributeNameCheck instanceof Function &&
                          ye.attributeNameCheck($)))) ||
                    ($ === 'is' &&
                      ye.allowCustomizedBuiltInElements &&
                      ((ye.tagNameCheck instanceof RegExp &&
                        b(ye.tagNameCheck, Y)) ||
                        (ye.tagNameCheck instanceof Function &&
                          ye.tagNameCheck(Y))))
                  )
                )
                  return !1;
              } else if (!md[$]) {
                if (!b(xb, E(Y, gb, ''))) {
                  if (
                    !(
                      ($ === 'src' || $ === 'xlink:href' || $ === 'href') &&
                      w !== 'script' &&
                      y(Y, 'data:') === 0 &&
                      Sb[w]
                    )
                  ) {
                    if (!(Cb && !b(lD, E(Y, gb, '')))) {
                      if (Y) return !1;
                    }
                  }
                }
              }
            }
          }
          return !0;
        },
        Bb = function (w) {
          return w.indexOf('-') > 0;
        },
        Pb = function (w) {
          let $, Y, Dt, De;
          jn('beforeSanitizeAttributes', w, null);
          let { attributes: Wr } = w;
          if (!Wr) return;
          let le = {
            attrName: '',
            attrValue: '',
            keepAttr: !0,
            allowedAttributes: Be,
          };
          for (De = Wr.length; De--; ) {
            $ = Wr[De];
            let { name: kn, namespaceURI: Cd } = $;
            if (
              ((Y = kn === 'value' ? $.value : T($.value)),
              (Dt = Pe(kn)),
              (le.attrName = Dt),
              (le.attrValue = Y),
              (le.keepAttr = !0),
              (le.forceKeepAttr = void 0),
              jn('uponSanitizeAttribute', w, le),
              (Y = le.attrValue),
              le.forceKeepAttr || (_d(kn, w), !le.keepAttr))
            )
              continue;
            if (!Tb && b(/\/>/i, Y)) {
              _d(kn, w);
              continue;
            }
            ra &&
              ((Y = E(Y, sd, ' ')), (Y = E(Y, ld, ' ')), (Y = E(Y, cd, ' ')));
            let Db = Pe(w.nodeName);
            if (Mb(Db, Dt, Y)) {
              if (
                (Eb &&
                  (Dt === 'id' || Dt === 'name') &&
                  (_d(kn, w), (Y = cD + Y)),
                Kt &&
                  typeof W == 'object' &&
                  typeof W.getAttributeType == 'function' &&
                  !Cd)
              )
                switch (W.getAttributeType(Db, Dt)) {
                  case 'TrustedHTML': {
                    Y = Kt.createHTML(Y);
                    break;
                  }
                  case 'TrustedScriptURL': {
                    Y = Kt.createScriptURL(Y);
                    break;
                  }
                }
              try {
                Cd ? w.setAttributeNS(Cd, kn, Y) : w.setAttribute(kn, Y),
                  h(V.removed);
              } catch {}
            }
          }
          jn('afterSanitizeAttributes', w, null);
        },
        xD = function ot(w) {
          let $,
            Y = Nb(w);
          for (jn('beforeSanitizeShadowDOM', w, null); ($ = Y.nextNode()); )
            jn('uponSanitizeShadowNode', $, null),
              !Fb($) && ($.content instanceof dr && ot($.content), Pb($));
          jn('afterSanitizeShadowDOM', w, null);
        };
      return (
        (V.sanitize = function (ot) {
          let w =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            $,
            Y,
            Dt,
            De;
          if (
            ((gd = !ot), gd && (ot = '<!-->'), typeof ot != 'string' && !Hc(ot))
          )
            if (typeof ot.toString == 'function') {
              if (((ot = ot.toString()), typeof ot != 'string'))
                throw N('dirty is not a string, aborting');
            } else throw N('toString is not a function');
          if (!V.isSupported) return ot;
          if (
            (hd || yd(w),
            (V.removed = []),
            typeof ot == 'string' && (Bs = !1),
            Bs)
          ) {
            if (ot.nodeName) {
              let kn = Pe(ot.nodeName);
              if (!Me[kn] || Ms[kn])
                throw N(
                  'root node is forbidden and cannot be sanitized in-place'
                );
            }
          } else if (ot instanceof Rs)
            ($ = Rb('<!---->')),
              (Y = $.ownerDocument.importNode(ot, !0)),
              (Y.nodeType === 1 && Y.nodeName === 'BODY') ||
              Y.nodeName === 'HTML'
                ? ($ = Y)
                : $.appendChild(Y);
          else {
            if (!na && !ra && !io && ot.indexOf('<') === -1)
              return Kt && zc ? Kt.createHTML(ot) : ot;
            if ((($ = Rb(ot)), !$)) return na ? null : zc ? ln : '';
          }
          $ && pd && ao($.firstChild);
          let Wr = Nb(Bs ? ot : $);
          for (; (Dt = Wr.nextNode()); )
            Fb(Dt) || (Dt.content instanceof dr && xD(Dt.content), Pb(Dt));
          if (Bs) return ot;
          if (na) {
            if (Uc)
              for (De = Fs.call($.ownerDocument); $.firstChild; )
                De.appendChild($.firstChild);
            else De = $;
            return (
              (Be.shadowroot || Be.shadowrootmode) &&
                (De = oD.call(kt, De, !0)),
              De
            );
          }
          let le = io ? $.outerHTML : $.innerHTML;
          return (
            io &&
              Me['!doctype'] &&
              $.ownerDocument &&
              $.ownerDocument.doctype &&
              $.ownerDocument.doctype.name &&
              b(G, $.ownerDocument.doctype.name) &&
              (le =
                '<!DOCTYPE ' +
                $.ownerDocument.doctype.name +
                `>
` +
                le),
            ra &&
              ((le = E(le, sd, ' ')),
              (le = E(le, ld, ' ')),
              (le = E(le, cd, ' '))),
            Kt && zc ? Kt.createHTML(le) : le
          );
        }),
        (V.setConfig = function (ot) {
          yd(ot), (hd = !0);
        }),
        (V.clearConfig = function () {
          (sa = null), (hd = !1);
        }),
        (V.isValidAttribute = function (ot, w, $) {
          sa || yd({});
          let Y = Pe(ot),
            Dt = Pe(w);
          return Mb(Y, Dt, $);
        }),
        (V.addHook = function (ot, w) {
          typeof w == 'function' && ((Tn[ot] = Tn[ot] || []), p(Tn[ot], w));
        }),
        (V.removeHook = function (ot) {
          if (Tn[ot]) return h(Tn[ot]);
        }),
        (V.removeHooks = function (ot) {
          Tn[ot] && (Tn[ot] = []);
        }),
        (V.removeAllHooks = function () {
          Tn = {};
        }),
        V
      );
    }
    var Ct = Lt();
    return Ct;
  });
});
var Mh,
  Bh,
  tG,
  H2,
  q2,
  Pn,
  eG,
  rG,
  nG,
  iG,
  G2,
  oG,
  ie,
  aG,
  sG,
  li,
  en = f(() => {
    'use strict';
    (Mh = Gc(Kx(), 1)),
      (Bh = /<br\s*\/?>/gi),
      (tG = (t) => (t ? G2(t).replace(/\\n/g, '#br#').split('#br#') : [''])),
      (H2 = (t) => Mh.default.sanitize(t)),
      (q2 = (t, e) => {
        if (e.flowchart?.htmlLabels !== !1) {
          let r = e.securityLevel;
          r === 'antiscript' || r === 'strict'
            ? (t = H2(t))
            : r !== 'loose' &&
              ((t = G2(t)),
              (t = t.replace(/</g, '&lt;').replace(/>/g, '&gt;')),
              (t = t.replace(/=/g, '&equals;')),
              (t = iG(t)));
        }
        return t;
      }),
      (Pn = (t, e) =>
        t &&
        (e.dompurifyConfig
          ? (t = Mh.default.sanitize(q2(t, e), e.dompurifyConfig).toString())
          : (t = Mh.default
              .sanitize(q2(t, e), { FORBID_TAGS: ['style'] })
              .toString()),
        t)),
      (eG = (t, e) =>
        typeof t == 'string' ? Pn(t, e) : t.flat().map((r) => Pn(r, e))),
      (rG = (t) => Bh.test(t)),
      (nG = (t) => t.split(Bh)),
      (iG = (t) => t.replace(/#br#/g, '<br/>')),
      (G2 = (t) => t.replace(Bh, '#br#')),
      (oG = (t) => {
        let e = '';
        return (
          t &&
            ((e =
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              window.location.search),
            (e = e.replaceAll(/\(/g, '\\(')),
            (e = e.replaceAll(/\)/g, '\\)'))),
          e
        );
      }),
      (ie = (t) =>
        !(
          t === !1 ||
          ['false', 'null', '0'].includes(String(t).trim().toLowerCase())
        )),
      (aG = function (...t) {
        let e = t.filter((r) => !isNaN(r));
        return Math.max(...e);
      }),
      (sG = function (...t) {
        let e = t.filter((r) => !isNaN(r));
        return Math.min(...e);
      }),
      (li = {
        getRows: tG,
        sanitizeText: Pn,
        sanitizeTextOrArray: eG,
        hasBreaks: rG,
        splitBreaks: nG,
        lineBreakRegex: Bh,
        removeScript: H2,
        getUrl: oG,
        evaluate: ie,
        getMax: aG,
        getMin: sG,
      });
  });
var Ph,
  j2,
  Y2 = f(() => {
    (Ph = {
      min: { r: 0, g: 0, b: 0, s: 0, l: 0, a: 0 },
      max: { r: 255, g: 255, b: 255, h: 360, s: 100, l: 100, a: 1 },
      clamp: {
        r: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
        g: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
        b: (t) => (t >= 255 ? 255 : t < 0 ? 0 : t),
        h: (t) => t % 360,
        s: (t) => (t >= 100 ? 100 : t < 0 ? 0 : t),
        l: (t) => (t >= 100 ? 100 : t < 0 ? 0 : t),
        a: (t) => (t >= 1 ? 1 : t < 0 ? 0 : t),
      },
      toLinear: (t) => {
        let e = t / 255;
        return t > 0.03928 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
      },
      hue2rgb: (t, e, r) => (
        r < 0 && (r += 1),
        r > 1 && (r -= 1),
        r < 0.16666666666666666
          ? t + (e - t) * 6 * r
          : r < 0.5
          ? e
          : r < 0.6666666666666666
          ? t + (e - t) * (0.6666666666666666 - r) * 6
          : t
      ),
      hsl2rgb: ({ h: t, s: e, l: r }, n) => {
        if (!e) return r * 2.55;
        (t /= 360), (e /= 100), (r /= 100);
        let i = r < 0.5 ? r * (1 + e) : r + e - r * e,
          o = 2 * r - i;
        switch (n) {
          case 'r':
            return Ph.hue2rgb(o, i, t + 0.3333333333333333) * 255;
          case 'g':
            return Ph.hue2rgb(o, i, t) * 255;
          case 'b':
            return Ph.hue2rgb(o, i, t - 0.3333333333333333) * 255;
        }
      },
      rgb2hsl: ({ r: t, g: e, b: r }, n) => {
        (t /= 255), (e /= 255), (r /= 255);
        let i = Math.max(t, e, r),
          o = Math.min(t, e, r),
          a = (i + o) / 2;
        if (n === 'l') return a * 100;
        if (i === o) return 0;
        let s = i - o,
          l = a > 0.5 ? s / (2 - i - o) : s / (i + o);
        if (n === 's') return l * 100;
        switch (i) {
          case t:
            return ((e - r) / s + (e < r ? 6 : 0)) * 60;
          case e:
            return ((r - t) / s + 2) * 60;
          case r:
            return ((t - e) / s + 4) * 60;
          default:
            return -1;
        }
      },
    }),
      (j2 = Ph);
  });
var lG,
  V2,
  X2 = f(() => {
    (lG = {
      clamp: (t, e, r) =>
        e > r ? Math.min(e, Math.max(r, t)) : Math.min(r, Math.max(e, t)),
      round: (t) => Math.round(t * 1e10) / 1e10,
    }),
      (V2 = lG);
  });
var cG,
  K2,
  Z2 = f(() => {
    (cG = {
      dec2hex: (t) => {
        let e = Math.round(t).toString(16);
        return e.length > 1 ? e : `0${e}`;
      },
    }),
      (K2 = cG);
  });
var uG,
  nt,
  Dn = f(() => {
    Y2();
    X2();
    Z2();
    (uG = { channel: j2, lang: V2, unit: K2 }), (nt = uG);
  });
var ci,
  Oe,
  ac = f(() => {
    Dn();
    ci = {};
    for (let t = 0; t <= 255; t++) ci[t] = nt.unit.dec2hex(t);
    Oe = { ALL: 0, RGB: 1, HSL: 2 };
  });
var Zx,
  Q2,
  J2 = f(() => {
    ac();
    (Zx = class {
      constructor() {
        this.type = Oe.ALL;
      }
      get() {
        return this.type;
      }
      set(e) {
        if (this.type && this.type !== e)
          throw new Error(
            'Cannot change both RGB and HSL channels at the same time'
          );
        this.type = e;
      }
      reset() {
        this.type = Oe.ALL;
      }
      is(e) {
        return this.type === e;
      }
    }),
      (Q2 = Zx);
  });
var Qx,
  tO,
  eO = f(() => {
    Dn();
    J2();
    ac();
    (Qx = class {
      constructor(e, r) {
        (this.color = r),
          (this.changed = !1),
          (this.data = e),
          (this.type = new Q2());
      }
      set(e, r) {
        return (
          (this.color = r),
          (this.changed = !1),
          (this.data = e),
          (this.type.type = Oe.ALL),
          this
        );
      }
      _ensureHSL() {
        let e = this.data,
          { h: r, s: n, l: i } = e;
        r === void 0 && (e.h = nt.channel.rgb2hsl(e, 'h')),
          n === void 0 && (e.s = nt.channel.rgb2hsl(e, 's')),
          i === void 0 && (e.l = nt.channel.rgb2hsl(e, 'l'));
      }
      _ensureRGB() {
        let e = this.data,
          { r, g: n, b: i } = e;
        r === void 0 && (e.r = nt.channel.hsl2rgb(e, 'r')),
          n === void 0 && (e.g = nt.channel.hsl2rgb(e, 'g')),
          i === void 0 && (e.b = nt.channel.hsl2rgb(e, 'b'));
      }
      get r() {
        let e = this.data,
          r = e.r;
        return !this.type.is(Oe.HSL) && r !== void 0
          ? r
          : (this._ensureHSL(), nt.channel.hsl2rgb(e, 'r'));
      }
      get g() {
        let e = this.data,
          r = e.g;
        return !this.type.is(Oe.HSL) && r !== void 0
          ? r
          : (this._ensureHSL(), nt.channel.hsl2rgb(e, 'g'));
      }
      get b() {
        let e = this.data,
          r = e.b;
        return !this.type.is(Oe.HSL) && r !== void 0
          ? r
          : (this._ensureHSL(), nt.channel.hsl2rgb(e, 'b'));
      }
      get h() {
        let e = this.data,
          r = e.h;
        return !this.type.is(Oe.RGB) && r !== void 0
          ? r
          : (this._ensureRGB(), nt.channel.rgb2hsl(e, 'h'));
      }
      get s() {
        let e = this.data,
          r = e.s;
        return !this.type.is(Oe.RGB) && r !== void 0
          ? r
          : (this._ensureRGB(), nt.channel.rgb2hsl(e, 's'));
      }
      get l() {
        let e = this.data,
          r = e.l;
        return !this.type.is(Oe.RGB) && r !== void 0
          ? r
          : (this._ensureRGB(), nt.channel.rgb2hsl(e, 'l'));
      }
      get a() {
        return this.data.a;
      }
      set r(e) {
        this.type.set(Oe.RGB), (this.changed = !0), (this.data.r = e);
      }
      set g(e) {
        this.type.set(Oe.RGB), (this.changed = !0), (this.data.g = e);
      }
      set b(e) {
        this.type.set(Oe.RGB), (this.changed = !0), (this.data.b = e);
      }
      set h(e) {
        this.type.set(Oe.HSL), (this.changed = !0), (this.data.h = e);
      }
      set s(e) {
        this.type.set(Oe.HSL), (this.changed = !0), (this.data.s = e);
      }
      set l(e) {
        this.type.set(Oe.HSL), (this.changed = !0), (this.data.l = e);
      }
      set a(e) {
        (this.changed = !0), (this.data.a = e);
      }
    }),
      (tO = Qx);
  });
var fG,
  $i,
  sc = f(() => {
    eO();
    (fG = new tO({ r: 0, g: 0, b: 0, a: 0 }, 'transparent')), ($i = fG);
  });
var rO,
  qo,
  Jx = f(() => {
    sc();
    ac();
    (rO = {
      re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
      parse: (t) => {
        if (t.charCodeAt(0) !== 35) return;
        let e = t.match(rO.re);
        if (!e) return;
        let r = e[1],
          n = parseInt(r, 16),
          i = r.length,
          o = i % 4 === 0,
          a = i > 4,
          s = a ? 1 : 17,
          l = a ? 8 : 4,
          c = o ? 0 : -1,
          u = a ? 255 : 15;
        return $i.set(
          {
            r: ((n >> (l * (c + 3))) & u) * s,
            g: ((n >> (l * (c + 2))) & u) * s,
            b: ((n >> (l * (c + 1))) & u) * s,
            a: o ? ((n & u) * s) / 255 : 1,
          },
          t
        );
      },
      stringify: (t) => {
        let { r: e, g: r, b: n, a: i } = t;
        return i < 1
          ? `#${ci[Math.round(e)]}${ci[Math.round(r)]}${ci[Math.round(n)]}${
              ci[Math.round(i * 255)]
            }`
          : `#${ci[Math.round(e)]}${ci[Math.round(r)]}${ci[Math.round(n)]}`;
      },
    }),
      (qo = rO);
  });
var Dh,
  lc,
  nO = f(() => {
    Dn();
    sc();
    (Dh = {
      re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
      hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
      _hue2deg: (t) => {
        let e = t.match(Dh.hueRe);
        if (e) {
          let [, r, n] = e;
          switch (n) {
            case 'grad':
              return nt.channel.clamp.h(parseFloat(r) * 0.9);
            case 'rad':
              return nt.channel.clamp.h((parseFloat(r) * 180) / Math.PI);
            case 'turn':
              return nt.channel.clamp.h(parseFloat(r) * 360);
          }
        }
        return nt.channel.clamp.h(parseFloat(t));
      },
      parse: (t) => {
        let e = t.charCodeAt(0);
        if (e !== 104 && e !== 72) return;
        let r = t.match(Dh.re);
        if (!r) return;
        let [, n, i, o, a, s] = r;
        return $i.set(
          {
            h: Dh._hue2deg(n),
            s: nt.channel.clamp.s(parseFloat(i)),
            l: nt.channel.clamp.l(parseFloat(o)),
            a: a
              ? nt.channel.clamp.a(s ? parseFloat(a) / 100 : parseFloat(a))
              : 1,
          },
          t
        );
      },
      stringify: (t) => {
        let { h: e, s: r, l: n, a: i } = t;
        return i < 1
          ? `hsla(${nt.lang.round(e)}, ${nt.lang.round(r)}%, ${nt.lang.round(
              n
            )}%, ${i})`
          : `hsl(${nt.lang.round(e)}, ${nt.lang.round(r)}%, ${nt.lang.round(
              n
            )}%)`;
      },
    }),
      (lc = Dh);
  });
var Uh,
  ty,
  iO = f(() => {
    Jx();
    (Uh = {
      colors: {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyanaqua: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        transparent: '#00000000',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',
      },
      parse: (t) => {
        t = t.toLowerCase();
        let e = Uh.colors[t];
        if (e) return qo.parse(e);
      },
      stringify: (t) => {
        let e = qo.stringify(t);
        for (let r in Uh.colors) if (Uh.colors[r] === e) return r;
      },
    }),
      (ty = Uh);
  });
var oO,
  cc,
  aO = f(() => {
    Dn();
    sc();
    (oO = {
      re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
      parse: (t) => {
        let e = t.charCodeAt(0);
        if (e !== 114 && e !== 82) return;
        let r = t.match(oO.re);
        if (!r) return;
        let [, n, i, o, a, s, l, c, u] = r;
        return $i.set(
          {
            r: nt.channel.clamp.r(i ? parseFloat(n) * 2.55 : parseFloat(n)),
            g: nt.channel.clamp.g(a ? parseFloat(o) * 2.55 : parseFloat(o)),
            b: nt.channel.clamp.b(l ? parseFloat(s) * 2.55 : parseFloat(s)),
            a: c
              ? nt.channel.clamp.a(u ? parseFloat(c) / 100 : parseFloat(c))
              : 1,
          },
          t
        );
      },
      stringify: (t) => {
        let { r: e, g: r, b: n, a: i } = t;
        return i < 1
          ? `rgba(${nt.lang.round(e)}, ${nt.lang.round(r)}, ${nt.lang.round(
              n
            )}, ${nt.lang.round(i)})`
          : `rgb(${nt.lang.round(e)}, ${nt.lang.round(r)}, ${nt.lang.round(
              n
            )})`;
      },
    }),
      (cc = oO);
  });
var hG,
  Re,
  ui = f(() => {
    Jx();
    nO();
    iO();
    aO();
    ac();
    (hG = {
      format: { keyword: ty, hex: qo, rgb: cc, rgba: cc, hsl: lc, hsla: lc },
      parse: (t) => {
        if (typeof t != 'string') return t;
        let e = qo.parse(t) || cc.parse(t) || lc.parse(t) || ty.parse(t);
        if (e) return e;
        throw new Error(`Unsupported color format: "${t}"`);
      },
      stringify: (t) =>
        !t.changed && t.color
          ? t.color
          : t.type.is(Oe.HSL) || t.data.r === void 0
          ? lc.stringify(t)
          : t.a < 1 ||
            !Number.isInteger(t.r) ||
            !Number.isInteger(t.g) ||
            !Number.isInteger(t.b)
          ? cc.stringify(t)
          : qo.stringify(t),
    }),
      (Re = hG);
  });
var pG,
  zh,
  ey = f(() => {
    Dn();
    ui();
    (pG = (t, e) => {
      let r = Re.parse(t);
      for (let n in e) r[n] = nt.channel.clamp[n](e[n]);
      return Re.stringify(r);
    }),
      (zh = pG);
  });
var dG,
  xn,
  ry = f(() => {
    Dn();
    sc();
    ui();
    ey();
    (dG = (t, e, r = 0, n = 1) => {
      if (typeof t != 'number') return zh(t, { a: e });
      let i = $i.set({
        r: nt.channel.clamp.r(t),
        g: nt.channel.clamp.g(e),
        b: nt.channel.clamp.b(r),
        a: nt.channel.clamp.a(n),
      });
      return Re.stringify(i);
    }),
      (xn = dG);
  });
var mG,
  ny,
  sO = f(() => {
    Dn();
    ui();
    (mG = (t, e) => nt.lang.round(Re.parse(t)[e])), (ny = mG);
  });
var gG,
  lO,
  cO = f(() => {
    Dn();
    ui();
    (gG = (t) => {
      let { r: e, g: r, b: n } = Re.parse(t),
        i =
          0.2126 * nt.channel.toLinear(e) +
          0.7152 * nt.channel.toLinear(r) +
          0.0722 * nt.channel.toLinear(n);
      return nt.lang.round(i);
    }),
      (lO = gG);
  });
var xG,
  uO,
  fO = f(() => {
    cO();
    (xG = (t) => lO(t) >= 0.5), (uO = xG);
  });
var yG,
  yn,
  hO = f(() => {
    fO();
    (yG = (t) => !uO(t)), (yn = yG);
  });
var bG,
  $h,
  iy = f(() => {
    Dn();
    ui();
    (bG = (t, e, r) => {
      let n = Re.parse(t),
        i = n[e],
        o = nt.channel.clamp[e](i + r);
      return i !== o && (n[e] = o), Re.stringify(n);
    }),
      ($h = bG);
  });
var _G,
  Q,
  pO = f(() => {
    iy();
    (_G = (t, e) => $h(t, 'l', e)), (Q = _G);
  });
var CG,
  et,
  dO = f(() => {
    iy();
    (CG = (t, e) => $h(t, 'l', -e)), (et = CG);
  });
var TG,
  S,
  mO = f(() => {
    ui();
    ey();
    (TG = (t, e) => {
      let r = Re.parse(t),
        n = {};
      for (let i in e) e[i] && (n[i] = r[i] + e[i]);
      return zh(t, n);
    }),
      (S = TG);
  });
var kG,
  gO,
  xO = f(() => {
    ui();
    ry();
    (kG = (t, e, r = 50) => {
      let { r: n, g: i, b: o, a } = Re.parse(t),
        { r: s, g: l, b: c, a: u } = Re.parse(e),
        h = r / 100,
        p = h * 2 - 1,
        d = a - u,
        g = ((p * d === -1 ? p : (p + d) / (1 + p * d)) + 1) / 2,
        E = 1 - g,
        y = n * g + s * E,
        T = i * g + l * E,
        b = o * g + c * E,
        N = a * h + u * (1 - h);
      return xn(y, T, b, N);
    }),
      (gO = kG);
  });
var EG,
  q,
  yO = f(() => {
    ui();
    xO();
    (EG = (t, e = 100) => {
      let r = Re.parse(t);
      return (
        (r.r = 255 - r.r), (r.g = 255 - r.g), (r.b = 255 - r.b), gO(r, t, e)
      );
    }),
      (q = EG);
  });
var bO = f(() => {
  ry();
  sO();
  hO();
  pO();
  dO();
  mO();
  yO();
});
var Wi = f(() => {
  bO();
});
var Se,
  ps = f(() => {
    'use strict';
    Wi();
    Se = (t, e) => (e ? S(t, { s: -40, l: 10 }) : S(t, { s: -40, l: -10 }));
  });
var qi,
  Hi,
  uc = f(() => {
    'use strict';
    (qi = '#ffffff'), (Hi = '#f2f2f2');
  });
var oy,
  _O,
  CO = f(() => {
    'use strict';
    Wi();
    ps();
    uc();
    (oy = class {
      constructor() {
        (this.background = '#f4f4f4'),
          (this.primaryColor = '#fff4dd'),
          (this.noteBkgColor = '#fff5ad'),
          (this.noteTextColor = '#333'),
          (this.THEME_COLOR_LIMIT = 12),
          (this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
          (this.fontSize = '16px');
      }
      updateColors() {
        if (
          ((this.primaryTextColor =
            this.primaryTextColor || (this.darkMode ? '#eee' : '#333')),
          (this.secondaryColor =
            this.secondaryColor || S(this.primaryColor, { h: -120 })),
          (this.tertiaryColor =
            this.tertiaryColor || S(this.primaryColor, { h: 180, l: 5 })),
          (this.primaryBorderColor =
            this.primaryBorderColor || Se(this.primaryColor, this.darkMode)),
          (this.secondaryBorderColor =
            this.secondaryBorderColor ||
            Se(this.secondaryColor, this.darkMode)),
          (this.tertiaryBorderColor =
            this.tertiaryBorderColor || Se(this.tertiaryColor, this.darkMode)),
          (this.noteBorderColor =
            this.noteBorderColor || Se(this.noteBkgColor, this.darkMode)),
          (this.noteBkgColor = this.noteBkgColor || '#fff5ad'),
          (this.noteTextColor = this.noteTextColor || '#333'),
          (this.secondaryTextColor =
            this.secondaryTextColor || q(this.secondaryColor)),
          (this.tertiaryTextColor =
            this.tertiaryTextColor || q(this.tertiaryColor)),
          (this.lineColor = this.lineColor || q(this.background)),
          (this.arrowheadColor = this.arrowheadColor || q(this.background)),
          (this.textColor = this.textColor || this.primaryTextColor),
          (this.border2 = this.border2 || this.tertiaryBorderColor),
          (this.nodeBkg = this.nodeBkg || this.primaryColor),
          (this.mainBkg = this.mainBkg || this.primaryColor),
          (this.nodeBorder = this.nodeBorder || this.primaryBorderColor),
          (this.clusterBkg = this.clusterBkg || this.tertiaryColor),
          (this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor),
          (this.defaultLinkColor = this.defaultLinkColor || this.lineColor),
          (this.titleColor = this.titleColor || this.tertiaryTextColor),
          (this.edgeLabelBackground =
            this.edgeLabelBackground ||
            (this.darkMode
              ? et(this.secondaryColor, 30)
              : this.secondaryColor)),
          (this.nodeTextColor = this.nodeTextColor || this.primaryTextColor),
          (this.actorBorder = this.actorBorder || this.primaryBorderColor),
          (this.actorBkg = this.actorBkg || this.mainBkg),
          (this.actorTextColor = this.actorTextColor || this.primaryTextColor),
          (this.actorLineColor = this.actorLineColor || 'grey'),
          (this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg),
          (this.signalColor = this.signalColor || this.textColor),
          (this.signalTextColor = this.signalTextColor || this.textColor),
          (this.labelBoxBorderColor =
            this.labelBoxBorderColor || this.actorBorder),
          (this.labelTextColor = this.labelTextColor || this.actorTextColor),
          (this.loopTextColor = this.loopTextColor || this.actorTextColor),
          (this.activationBorderColor =
            this.activationBorderColor || et(this.secondaryColor, 10)),
          (this.activationBkgColor =
            this.activationBkgColor || this.secondaryColor),
          (this.sequenceNumberColor =
            this.sequenceNumberColor || q(this.lineColor)),
          (this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor),
          (this.altSectionBkgColor = this.altSectionBkgColor || 'white'),
          (this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor),
          (this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor),
          (this.excludeBkgColor = this.excludeBkgColor || '#eeeeee'),
          (this.taskBorderColor =
            this.taskBorderColor || this.primaryBorderColor),
          (this.taskBkgColor = this.taskBkgColor || this.primaryColor),
          (this.activeTaskBorderColor =
            this.activeTaskBorderColor || this.primaryColor),
          (this.activeTaskBkgColor =
            this.activeTaskBkgColor || Q(this.primaryColor, 23)),
          (this.gridColor = this.gridColor || 'lightgrey'),
          (this.doneTaskBkgColor = this.doneTaskBkgColor || 'lightgrey'),
          (this.doneTaskBorderColor = this.doneTaskBorderColor || 'grey'),
          (this.critBorderColor = this.critBorderColor || '#ff8888'),
          (this.critBkgColor = this.critBkgColor || 'red'),
          (this.todayLineColor = this.todayLineColor || 'red'),
          (this.taskTextColor = this.taskTextColor || this.textColor),
          (this.taskTextOutsideColor =
            this.taskTextOutsideColor || this.textColor),
          (this.taskTextLightColor = this.taskTextLightColor || this.textColor),
          (this.taskTextColor = this.taskTextColor || this.primaryTextColor),
          (this.taskTextDarkColor = this.taskTextDarkColor || this.textColor),
          (this.taskTextClickableColor =
            this.taskTextClickableColor || '#003163'),
          (this.personBorder = this.personBorder || this.primaryBorderColor),
          (this.personBkg = this.personBkg || this.mainBkg),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.transitionLabelColor =
            this.transitionLabelColor || this.textColor),
          (this.stateLabelColor =
            this.stateLabelColor || this.stateBkg || this.primaryTextColor),
          (this.stateBkg = this.stateBkg || this.mainBkg),
          (this.labelBackgroundColor =
            this.labelBackgroundColor || this.stateBkg),
          (this.compositeBackground =
            this.compositeBackground || this.background || this.tertiaryColor),
          (this.altBackground = this.altBackground || this.tertiaryColor),
          (this.compositeTitleBackground =
            this.compositeTitleBackground || this.mainBkg),
          (this.compositeBorder = this.compositeBorder || this.nodeBorder),
          (this.innerEndBackground = this.nodeBorder),
          (this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
          (this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.specialStateColor = this.lineColor),
          (this.cScale0 = this.cScale0 || this.primaryColor),
          (this.cScale1 = this.cScale1 || this.secondaryColor),
          (this.cScale2 = this.cScale2 || this.tertiaryColor),
          (this.cScale3 = this.cScale3 || S(this.primaryColor, { h: 30 })),
          (this.cScale4 = this.cScale4 || S(this.primaryColor, { h: 60 })),
          (this.cScale5 = this.cScale5 || S(this.primaryColor, { h: 90 })),
          (this.cScale6 = this.cScale6 || S(this.primaryColor, { h: 120 })),
          (this.cScale7 = this.cScale7 || S(this.primaryColor, { h: 150 })),
          (this.cScale8 =
            this.cScale8 || S(this.primaryColor, { h: 210, l: 150 })),
          (this.cScale9 = this.cScale9 || S(this.primaryColor, { h: 270 })),
          (this.cScale10 = this.cScale10 || S(this.primaryColor, { h: 300 })),
          (this.cScale11 = this.cScale11 || S(this.primaryColor, { h: 330 })),
          this.darkMode)
        )
          for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
            this['cScale' + r] = et(this['cScale' + r], 75);
        else
          for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
            this['cScale' + r] = et(this['cScale' + r], 25);
        for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
          this['cScaleInv' + r] =
            this['cScaleInv' + r] || q(this['cScale' + r]);
        for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
          this.darkMode
            ? (this['cScalePeer' + r] =
                this['cScalePeer' + r] || Q(this['cScale' + r], 10))
            : (this['cScalePeer' + r] =
                this['cScalePeer' + r] || et(this['cScale' + r], 10));
        this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
        for (let r = 0; r < this.THEME_COLOR_LIMIT; r++)
          this['cScaleLabel' + r] =
            this['cScaleLabel' + r] || this.scaleLabelColor;
        let e = this.darkMode ? -4 : -1;
        for (let r = 0; r < 5; r++)
          (this['surface' + r] =
            this['surface' + r] ||
            S(this.mainBkg, { h: 180, s: -15, l: e * (5 + r * 3) })),
            (this['surfacePeer' + r] =
              this['surfacePeer' + r] ||
              S(this.mainBkg, { h: 180, s: -15, l: e * (8 + r * 3) }));
        (this.classText = this.classText || this.textColor),
          (this.fillType0 = this.fillType0 || this.primaryColor),
          (this.fillType1 = this.fillType1 || this.secondaryColor),
          (this.fillType2 = this.fillType2 || S(this.primaryColor, { h: 64 })),
          (this.fillType3 =
            this.fillType3 || S(this.secondaryColor, { h: 64 })),
          (this.fillType4 = this.fillType4 || S(this.primaryColor, { h: -64 })),
          (this.fillType5 =
            this.fillType5 || S(this.secondaryColor, { h: -64 })),
          (this.fillType6 = this.fillType6 || S(this.primaryColor, { h: 128 })),
          (this.fillType7 =
            this.fillType7 || S(this.secondaryColor, { h: 128 })),
          (this.pie1 = this.pie1 || this.primaryColor),
          (this.pie2 = this.pie2 || this.secondaryColor),
          (this.pie3 = this.pie3 || this.tertiaryColor),
          (this.pie4 = this.pie4 || S(this.primaryColor, { l: -10 })),
          (this.pie5 = this.pie5 || S(this.secondaryColor, { l: -10 })),
          (this.pie6 = this.pie6 || S(this.tertiaryColor, { l: -10 })),
          (this.pie7 = this.pie7 || S(this.primaryColor, { h: 60, l: -10 })),
          (this.pie8 = this.pie8 || S(this.primaryColor, { h: -60, l: -10 })),
          (this.pie9 = this.pie9 || S(this.primaryColor, { h: 120, l: 0 })),
          (this.pie10 = this.pie10 || S(this.primaryColor, { h: 60, l: -20 })),
          (this.pie11 = this.pie11 || S(this.primaryColor, { h: -60, l: -20 })),
          (this.pie12 = this.pie12 || S(this.primaryColor, { h: 120, l: -10 })),
          (this.pieTitleTextSize = this.pieTitleTextSize || '25px'),
          (this.pieTitleTextColor =
            this.pieTitleTextColor || this.taskTextDarkColor),
          (this.pieSectionTextSize = this.pieSectionTextSize || '17px'),
          (this.pieSectionTextColor =
            this.pieSectionTextColor || this.textColor),
          (this.pieLegendTextSize = this.pieLegendTextSize || '17px'),
          (this.pieLegendTextColor =
            this.pieLegendTextColor || this.taskTextDarkColor),
          (this.pieStrokeColor = this.pieStrokeColor || 'black'),
          (this.pieStrokeWidth = this.pieStrokeWidth || '2px'),
          (this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || '2px'),
          (this.pieOuterStrokeColor = this.pieOuterStrokeColor || 'black'),
          (this.pieOpacity = this.pieOpacity || '0.7'),
          (this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
          (this.quadrant2Fill =
            this.quadrant2Fill || S(this.primaryColor, { r: 5, g: 5, b: 5 })),
          (this.quadrant3Fill =
            this.quadrant3Fill ||
            S(this.primaryColor, { r: 10, g: 10, b: 10 })),
          (this.quadrant4Fill =
            this.quadrant4Fill ||
            S(this.primaryColor, { r: 15, g: 15, b: 15 })),
          (this.quadrant1TextFill =
            this.quadrant1TextFill || this.primaryTextColor),
          (this.quadrant2TextFill =
            this.quadrant2TextFill ||
            S(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
          (this.quadrant3TextFill =
            this.quadrant3TextFill ||
            S(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
          (this.quadrant4TextFill =
            this.quadrant4TextFill ||
            S(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
          (this.quadrantPointFill =
            this.quadrantPointFill || yn(this.quadrant1Fill)
              ? Q(this.quadrant1Fill)
              : et(this.quadrant1Fill)),
          (this.quadrantPointTextFill =
            this.quadrantPointTextFill || this.primaryTextColor),
          (this.quadrantXAxisTextFill =
            this.quadrantXAxisTextFill || this.primaryTextColor),
          (this.quadrantYAxisTextFill =
            this.quadrantYAxisTextFill || this.primaryTextColor),
          (this.quadrantInternalBorderStrokeFill =
            this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantExternalBorderStrokeFill =
            this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantTitleFill =
            this.quadrantTitleFill || this.primaryTextColor),
          (this.requirementBackground =
            this.requirementBackground || this.primaryColor),
          (this.requirementBorderColor =
            this.requirementBorderColor || this.primaryBorderColor),
          (this.requirementBorderSize = this.requirementBorderSize || '1'),
          (this.requirementTextColor =
            this.requirementTextColor || this.primaryTextColor),
          (this.relationColor = this.relationColor || this.lineColor),
          (this.relationLabelBackground =
            this.relationLabelBackground ||
            (this.darkMode
              ? et(this.secondaryColor, 30)
              : this.secondaryColor)),
          (this.relationLabelColor =
            this.relationLabelColor || this.actorTextColor),
          (this.git0 = this.git0 || this.primaryColor),
          (this.git1 = this.git1 || this.secondaryColor),
          (this.git2 = this.git2 || this.tertiaryColor),
          (this.git3 = this.git3 || S(this.primaryColor, { h: -30 })),
          (this.git4 = this.git4 || S(this.primaryColor, { h: -60 })),
          (this.git5 = this.git5 || S(this.primaryColor, { h: -90 })),
          (this.git6 = this.git6 || S(this.primaryColor, { h: 60 })),
          (this.git7 = this.git7 || S(this.primaryColor, { h: 120 })),
          this.darkMode
            ? ((this.git0 = Q(this.git0, 25)),
              (this.git1 = Q(this.git1, 25)),
              (this.git2 = Q(this.git2, 25)),
              (this.git3 = Q(this.git3, 25)),
              (this.git4 = Q(this.git4, 25)),
              (this.git5 = Q(this.git5, 25)),
              (this.git6 = Q(this.git6, 25)),
              (this.git7 = Q(this.git7, 25)))
            : ((this.git0 = et(this.git0, 25)),
              (this.git1 = et(this.git1, 25)),
              (this.git2 = et(this.git2, 25)),
              (this.git3 = et(this.git3, 25)),
              (this.git4 = et(this.git4, 25)),
              (this.git5 = et(this.git5, 25)),
              (this.git6 = et(this.git6, 25)),
              (this.git7 = et(this.git7, 25))),
          (this.gitInv0 = this.gitInv0 || q(this.git0)),
          (this.gitInv1 = this.gitInv1 || q(this.git1)),
          (this.gitInv2 = this.gitInv2 || q(this.git2)),
          (this.gitInv3 = this.gitInv3 || q(this.git3)),
          (this.gitInv4 = this.gitInv4 || q(this.git4)),
          (this.gitInv5 = this.gitInv5 || q(this.git5)),
          (this.gitInv6 = this.gitInv6 || q(this.git6)),
          (this.gitInv7 = this.gitInv7 || q(this.git7)),
          (this.branchLabelColor =
            this.branchLabelColor ||
            (this.darkMode ? 'black' : this.labelTextColor)),
          (this.gitBranchLabel0 =
            this.gitBranchLabel0 || this.branchLabelColor),
          (this.gitBranchLabel1 =
            this.gitBranchLabel1 || this.branchLabelColor),
          (this.gitBranchLabel2 =
            this.gitBranchLabel2 || this.branchLabelColor),
          (this.gitBranchLabel3 =
            this.gitBranchLabel3 || this.branchLabelColor),
          (this.gitBranchLabel4 =
            this.gitBranchLabel4 || this.branchLabelColor),
          (this.gitBranchLabel5 =
            this.gitBranchLabel5 || this.branchLabelColor),
          (this.gitBranchLabel6 =
            this.gitBranchLabel6 || this.branchLabelColor),
          (this.gitBranchLabel7 =
            this.gitBranchLabel7 || this.branchLabelColor),
          (this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
          (this.tagLabelBackground =
            this.tagLabelBackground || this.primaryColor),
          (this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
          (this.tagLabelFontSize = this.tagLabelFontSize || '10px'),
          (this.commitLabelColor =
            this.commitLabelColor || this.secondaryTextColor),
          (this.commitLabelBackground =
            this.commitLabelBackground || this.secondaryColor),
          (this.commitLabelFontSize = this.commitLabelFontSize || '10px'),
          (this.attributeBackgroundColorOdd =
            this.attributeBackgroundColorOdd || qi),
          (this.attributeBackgroundColorEven =
            this.attributeBackgroundColorEven || Hi);
      }
      calculate(e) {
        if (typeof e != 'object') {
          this.updateColors();
          return;
        }
        let r = Object.keys(e);
        r.forEach((n) => {
          this[n] = e[n];
        }),
          this.updateColors(),
          r.forEach((n) => {
            this[n] = e[n];
          });
      }
    }),
      (_O = (t) => {
        let e = new oy();
        return e.calculate(t), e;
      });
  });
var ay,
  TO,
  kO = f(() => {
    'use strict';
    Wi();
    ps();
    (ay = class {
      constructor() {
        (this.background = '#333'),
          (this.primaryColor = '#1f2020'),
          (this.secondaryColor = Q(this.primaryColor, 16)),
          (this.tertiaryColor = S(this.primaryColor, { h: -160 })),
          (this.primaryBorderColor = q(this.background)),
          (this.secondaryBorderColor = Se(this.secondaryColor, this.darkMode)),
          (this.tertiaryBorderColor = Se(this.tertiaryColor, this.darkMode)),
          (this.primaryTextColor = q(this.primaryColor)),
          (this.secondaryTextColor = q(this.secondaryColor)),
          (this.tertiaryTextColor = q(this.tertiaryColor)),
          (this.lineColor = q(this.background)),
          (this.textColor = q(this.background)),
          (this.mainBkg = '#1f2020'),
          (this.secondBkg = 'calculated'),
          (this.mainContrastColor = 'lightgrey'),
          (this.darkTextColor = Q(q('#323D47'), 10)),
          (this.lineColor = 'calculated'),
          (this.border1 = '#81B1DB'),
          (this.border2 = xn(255, 255, 255, 0.25)),
          (this.arrowheadColor = 'calculated'),
          (this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
          (this.fontSize = '16px'),
          (this.labelBackground = '#181818'),
          (this.textColor = '#ccc'),
          (this.THEME_COLOR_LIMIT = 12),
          (this.nodeBkg = 'calculated'),
          (this.nodeBorder = 'calculated'),
          (this.clusterBkg = 'calculated'),
          (this.clusterBorder = 'calculated'),
          (this.defaultLinkColor = 'calculated'),
          (this.titleColor = '#F9FFFE'),
          (this.edgeLabelBackground = 'calculated'),
          (this.actorBorder = 'calculated'),
          (this.actorBkg = 'calculated'),
          (this.actorTextColor = 'calculated'),
          (this.actorLineColor = 'calculated'),
          (this.signalColor = 'calculated'),
          (this.signalTextColor = 'calculated'),
          (this.labelBoxBkgColor = 'calculated'),
          (this.labelBoxBorderColor = 'calculated'),
          (this.labelTextColor = 'calculated'),
          (this.loopTextColor = 'calculated'),
          (this.noteBorderColor = 'calculated'),
          (this.noteBkgColor = '#fff5ad'),
          (this.noteTextColor = 'calculated'),
          (this.activationBorderColor = 'calculated'),
          (this.activationBkgColor = 'calculated'),
          (this.sequenceNumberColor = 'black'),
          (this.sectionBkgColor = et('#EAE8D9', 30)),
          (this.altSectionBkgColor = 'calculated'),
          (this.sectionBkgColor2 = '#EAE8D9'),
          (this.excludeBkgColor = et(this.sectionBkgColor, 10)),
          (this.taskBorderColor = xn(255, 255, 255, 70)),
          (this.taskBkgColor = 'calculated'),
          (this.taskTextColor = 'calculated'),
          (this.taskTextLightColor = 'calculated'),
          (this.taskTextOutsideColor = 'calculated'),
          (this.taskTextClickableColor = '#003163'),
          (this.activeTaskBorderColor = xn(255, 255, 255, 50)),
          (this.activeTaskBkgColor = '#81B1DB'),
          (this.gridColor = 'calculated'),
          (this.doneTaskBkgColor = 'calculated'),
          (this.doneTaskBorderColor = 'grey'),
          (this.critBorderColor = '#E83737'),
          (this.critBkgColor = '#E83737'),
          (this.taskTextDarkColor = 'calculated'),
          (this.todayLineColor = '#DB5757'),
          (this.personBorder = this.primaryBorderColor),
          (this.personBkg = this.mainBkg),
          (this.labelColor = 'calculated'),
          (this.errorBkgColor = '#a44141'),
          (this.errorTextColor = '#ddd');
      }
      updateColors() {
        (this.secondBkg = Q(this.mainBkg, 16)),
          (this.lineColor = this.mainContrastColor),
          (this.arrowheadColor = this.mainContrastColor),
          (this.nodeBkg = this.mainBkg),
          (this.nodeBorder = this.border1),
          (this.clusterBkg = this.secondBkg),
          (this.clusterBorder = this.border2),
          (this.defaultLinkColor = this.lineColor),
          (this.edgeLabelBackground = Q(this.labelBackground, 25)),
          (this.actorBorder = this.border1),
          (this.actorBkg = this.mainBkg),
          (this.actorTextColor = this.mainContrastColor),
          (this.actorLineColor = this.mainContrastColor),
          (this.signalColor = this.mainContrastColor),
          (this.signalTextColor = this.mainContrastColor),
          (this.labelBoxBkgColor = this.actorBkg),
          (this.labelBoxBorderColor = this.actorBorder),
          (this.labelTextColor = this.mainContrastColor),
          (this.loopTextColor = this.mainContrastColor),
          (this.noteBorderColor = this.secondaryBorderColor),
          (this.noteBkgColor = this.secondBkg),
          (this.noteTextColor = this.secondaryTextColor),
          (this.activationBorderColor = this.border1),
          (this.activationBkgColor = this.secondBkg),
          (this.altSectionBkgColor = this.background),
          (this.taskBkgColor = Q(this.mainBkg, 23)),
          (this.taskTextColor = this.darkTextColor),
          (this.taskTextLightColor = this.mainContrastColor),
          (this.taskTextOutsideColor = this.taskTextLightColor),
          (this.gridColor = this.mainContrastColor),
          (this.doneTaskBkgColor = this.mainContrastColor),
          (this.taskTextDarkColor = this.darkTextColor),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.transitionLabelColor =
            this.transitionLabelColor || this.textColor),
          (this.stateLabelColor =
            this.stateLabelColor || this.stateBkg || this.primaryTextColor),
          (this.stateBkg = this.stateBkg || this.mainBkg),
          (this.labelBackgroundColor =
            this.labelBackgroundColor || this.stateBkg),
          (this.compositeBackground =
            this.compositeBackground || this.background || this.tertiaryColor),
          (this.altBackground = this.altBackground || '#555'),
          (this.compositeTitleBackground =
            this.compositeTitleBackground || this.mainBkg),
          (this.compositeBorder = this.compositeBorder || this.nodeBorder),
          (this.innerEndBackground = this.primaryBorderColor),
          (this.specialStateColor = '#f4f4f4'),
          (this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
          (this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
          (this.fillType0 = this.primaryColor),
          (this.fillType1 = this.secondaryColor),
          (this.fillType2 = S(this.primaryColor, { h: 64 })),
          (this.fillType3 = S(this.secondaryColor, { h: 64 })),
          (this.fillType4 = S(this.primaryColor, { h: -64 })),
          (this.fillType5 = S(this.secondaryColor, { h: -64 })),
          (this.fillType6 = S(this.primaryColor, { h: 128 })),
          (this.fillType7 = S(this.secondaryColor, { h: 128 })),
          (this.cScale1 = this.cScale1 || '#0b0000'),
          (this.cScale2 = this.cScale2 || '#4d1037'),
          (this.cScale3 = this.cScale3 || '#3f5258'),
          (this.cScale4 = this.cScale4 || '#4f2f1b'),
          (this.cScale5 = this.cScale5 || '#6e0a0a'),
          (this.cScale6 = this.cScale6 || '#3b0048'),
          (this.cScale7 = this.cScale7 || '#995a01'),
          (this.cScale8 = this.cScale8 || '#154706'),
          (this.cScale9 = this.cScale9 || '#161722'),
          (this.cScale10 = this.cScale10 || '#00296f'),
          (this.cScale11 = this.cScale11 || '#01629c'),
          (this.cScale12 = this.cScale12 || '#010029'),
          (this.cScale0 = this.cScale0 || this.primaryColor),
          (this.cScale1 = this.cScale1 || this.secondaryColor),
          (this.cScale2 = this.cScale2 || this.tertiaryColor),
          (this.cScale3 = this.cScale3 || S(this.primaryColor, { h: 30 })),
          (this.cScale4 = this.cScale4 || S(this.primaryColor, { h: 60 })),
          (this.cScale5 = this.cScale5 || S(this.primaryColor, { h: 90 })),
          (this.cScale6 = this.cScale6 || S(this.primaryColor, { h: 120 })),
          (this.cScale7 = this.cScale7 || S(this.primaryColor, { h: 150 })),
          (this.cScale8 = this.cScale8 || S(this.primaryColor, { h: 210 })),
          (this.cScale9 = this.cScale9 || S(this.primaryColor, { h: 270 })),
          (this.cScale10 = this.cScale10 || S(this.primaryColor, { h: 300 })),
          (this.cScale11 = this.cScale11 || S(this.primaryColor, { h: 330 }));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleInv' + e] =
            this['cScaleInv' + e] || q(this['cScale' + e]);
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScalePeer' + e] =
            this['cScalePeer' + e] || Q(this['cScale' + e], 10);
        for (let e = 0; e < 5; e++)
          (this['surface' + e] =
            this['surface' + e] ||
            S(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) })),
            (this['surfacePeer' + e] =
              this['surfacePeer' + e] ||
              S(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) }));
        this.scaleLabelColor =
          this.scaleLabelColor ||
          (this.darkMode ? 'black' : this.labelTextColor);
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleLabel' + e] =
            this['cScaleLabel' + e] || this.scaleLabelColor;
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['pie' + e] = this['cScale' + e];
        (this.pieTitleTextSize = this.pieTitleTextSize || '25px'),
          (this.pieTitleTextColor =
            this.pieTitleTextColor || this.taskTextDarkColor),
          (this.pieSectionTextSize = this.pieSectionTextSize || '17px'),
          (this.pieSectionTextColor =
            this.pieSectionTextColor || this.textColor),
          (this.pieLegendTextSize = this.pieLegendTextSize || '17px'),
          (this.pieLegendTextColor =
            this.pieLegendTextColor || this.taskTextDarkColor),
          (this.pieStrokeColor = this.pieStrokeColor || 'black'),
          (this.pieStrokeWidth = this.pieStrokeWidth || '2px'),
          (this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || '2px'),
          (this.pieOuterStrokeColor = this.pieOuterStrokeColor || 'black'),
          (this.pieOpacity = this.pieOpacity || '0.7'),
          (this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
          (this.quadrant2Fill =
            this.quadrant2Fill || S(this.primaryColor, { r: 5, g: 5, b: 5 })),
          (this.quadrant3Fill =
            this.quadrant3Fill ||
            S(this.primaryColor, { r: 10, g: 10, b: 10 })),
          (this.quadrant4Fill =
            this.quadrant4Fill ||
            S(this.primaryColor, { r: 15, g: 15, b: 15 })),
          (this.quadrant1TextFill =
            this.quadrant1TextFill || this.primaryTextColor),
          (this.quadrant2TextFill =
            this.quadrant2TextFill ||
            S(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
          (this.quadrant3TextFill =
            this.quadrant3TextFill ||
            S(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
          (this.quadrant4TextFill =
            this.quadrant4TextFill ||
            S(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
          (this.quadrantPointFill =
            this.quadrantPointFill || yn(this.quadrant1Fill)
              ? Q(this.quadrant1Fill)
              : et(this.quadrant1Fill)),
          (this.quadrantPointTextFill =
            this.quadrantPointTextFill || this.primaryTextColor),
          (this.quadrantXAxisTextFill =
            this.quadrantXAxisTextFill || this.primaryTextColor),
          (this.quadrantYAxisTextFill =
            this.quadrantYAxisTextFill || this.primaryTextColor),
          (this.quadrantInternalBorderStrokeFill =
            this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantExternalBorderStrokeFill =
            this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantTitleFill =
            this.quadrantTitleFill || this.primaryTextColor),
          (this.classText = this.primaryTextColor),
          (this.requirementBackground =
            this.requirementBackground || this.primaryColor),
          (this.requirementBorderColor =
            this.requirementBorderColor || this.primaryBorderColor),
          (this.requirementBorderSize = this.requirementBorderSize || '1'),
          (this.requirementTextColor =
            this.requirementTextColor || this.primaryTextColor),
          (this.relationColor = this.relationColor || this.lineColor),
          (this.relationLabelBackground =
            this.relationLabelBackground ||
            (this.darkMode
              ? et(this.secondaryColor, 30)
              : this.secondaryColor)),
          (this.relationLabelColor =
            this.relationLabelColor || this.actorTextColor),
          (this.git0 = Q(this.secondaryColor, 20)),
          (this.git1 = Q(this.pie2 || this.secondaryColor, 20)),
          (this.git2 = Q(this.pie3 || this.tertiaryColor, 20)),
          (this.git3 = Q(this.pie4 || S(this.primaryColor, { h: -30 }), 20)),
          (this.git4 = Q(this.pie5 || S(this.primaryColor, { h: -60 }), 20)),
          (this.git5 = Q(this.pie6 || S(this.primaryColor, { h: -90 }), 10)),
          (this.git6 = Q(this.pie7 || S(this.primaryColor, { h: 60 }), 10)),
          (this.git7 = Q(this.pie8 || S(this.primaryColor, { h: 120 }), 20)),
          (this.gitInv0 = this.gitInv0 || q(this.git0)),
          (this.gitInv1 = this.gitInv1 || q(this.git1)),
          (this.gitInv2 = this.gitInv2 || q(this.git2)),
          (this.gitInv3 = this.gitInv3 || q(this.git3)),
          (this.gitInv4 = this.gitInv4 || q(this.git4)),
          (this.gitInv5 = this.gitInv5 || q(this.git5)),
          (this.gitInv6 = this.gitInv6 || q(this.git6)),
          (this.gitInv7 = this.gitInv7 || q(this.git7)),
          (this.gitBranchLabel0 =
            this.gitBranchLabel0 || q(this.labelTextColor)),
          (this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
          (this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
          (this.gitBranchLabel3 =
            this.gitBranchLabel3 || q(this.labelTextColor)),
          (this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
          (this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
          (this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
          (this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
          (this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
          (this.tagLabelBackground =
            this.tagLabelBackground || this.primaryColor),
          (this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
          (this.tagLabelFontSize = this.tagLabelFontSize || '10px'),
          (this.commitLabelColor =
            this.commitLabelColor || this.secondaryTextColor),
          (this.commitLabelBackground =
            this.commitLabelBackground || this.secondaryColor),
          (this.commitLabelFontSize = this.commitLabelFontSize || '10px'),
          (this.attributeBackgroundColorOdd =
            this.attributeBackgroundColorOdd || Q(this.background, 12)),
          (this.attributeBackgroundColorEven =
            this.attributeBackgroundColorEven || Q(this.background, 2));
      }
      calculate(e) {
        if (typeof e != 'object') {
          this.updateColors();
          return;
        }
        let r = Object.keys(e);
        r.forEach((n) => {
          this[n] = e[n];
        }),
          this.updateColors(),
          r.forEach((n) => {
            this[n] = e[n];
          });
      }
    }),
      (TO = (t) => {
        let e = new ay();
        return e.calculate(t), e;
      });
  });
var sy,
  EO,
  wO = f(() => {
    'use strict';
    Wi();
    ps();
    uc();
    (sy = class {
      constructor() {
        (this.background = '#f4f4f4'),
          (this.primaryColor = '#ECECFF'),
          (this.secondaryColor = S(this.primaryColor, { h: 120 })),
          (this.secondaryColor = '#ffffde'),
          (this.tertiaryColor = S(this.primaryColor, { h: -160 })),
          (this.primaryBorderColor = Se(this.primaryColor, this.darkMode)),
          (this.secondaryBorderColor = Se(this.secondaryColor, this.darkMode)),
          (this.tertiaryBorderColor = Se(this.tertiaryColor, this.darkMode)),
          (this.primaryTextColor = q(this.primaryColor)),
          (this.secondaryTextColor = q(this.secondaryColor)),
          (this.tertiaryTextColor = q(this.tertiaryColor)),
          (this.lineColor = q(this.background)),
          (this.textColor = q(this.background)),
          (this.background = 'white'),
          (this.mainBkg = '#ECECFF'),
          (this.secondBkg = '#ffffde'),
          (this.lineColor = '#333333'),
          (this.border1 = '#9370DB'),
          (this.border2 = '#aaaa33'),
          (this.arrowheadColor = '#333333'),
          (this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
          (this.fontSize = '16px'),
          (this.labelBackground = '#e8e8e8'),
          (this.textColor = '#333'),
          (this.THEME_COLOR_LIMIT = 12),
          (this.nodeBkg = 'calculated'),
          (this.nodeBorder = 'calculated'),
          (this.clusterBkg = 'calculated'),
          (this.clusterBorder = 'calculated'),
          (this.defaultLinkColor = 'calculated'),
          (this.titleColor = 'calculated'),
          (this.edgeLabelBackground = 'calculated'),
          (this.actorBorder = 'calculated'),
          (this.actorBkg = 'calculated'),
          (this.actorTextColor = 'black'),
          (this.actorLineColor = 'grey'),
          (this.signalColor = 'calculated'),
          (this.signalTextColor = 'calculated'),
          (this.labelBoxBkgColor = 'calculated'),
          (this.labelBoxBorderColor = 'calculated'),
          (this.labelTextColor = 'calculated'),
          (this.loopTextColor = 'calculated'),
          (this.noteBorderColor = 'calculated'),
          (this.noteBkgColor = '#fff5ad'),
          (this.noteTextColor = 'calculated'),
          (this.activationBorderColor = '#666'),
          (this.activationBkgColor = '#f4f4f4'),
          (this.sequenceNumberColor = 'white'),
          (this.sectionBkgColor = 'calculated'),
          (this.altSectionBkgColor = 'calculated'),
          (this.sectionBkgColor2 = 'calculated'),
          (this.excludeBkgColor = '#eeeeee'),
          (this.taskBorderColor = 'calculated'),
          (this.taskBkgColor = 'calculated'),
          (this.taskTextLightColor = 'calculated'),
          (this.taskTextColor = this.taskTextLightColor),
          (this.taskTextDarkColor = 'calculated'),
          (this.taskTextOutsideColor = this.taskTextDarkColor),
          (this.taskTextClickableColor = 'calculated'),
          (this.activeTaskBorderColor = 'calculated'),
          (this.activeTaskBkgColor = 'calculated'),
          (this.gridColor = 'calculated'),
          (this.doneTaskBkgColor = 'calculated'),
          (this.doneTaskBorderColor = 'calculated'),
          (this.critBorderColor = 'calculated'),
          (this.critBkgColor = 'calculated'),
          (this.todayLineColor = 'calculated'),
          (this.sectionBkgColor = xn(102, 102, 255, 0.49)),
          (this.altSectionBkgColor = 'white'),
          (this.sectionBkgColor2 = '#fff400'),
          (this.taskBorderColor = '#534fbc'),
          (this.taskBkgColor = '#8a90dd'),
          (this.taskTextLightColor = 'white'),
          (this.taskTextColor = 'calculated'),
          (this.taskTextDarkColor = 'black'),
          (this.taskTextOutsideColor = 'calculated'),
          (this.taskTextClickableColor = '#003163'),
          (this.activeTaskBorderColor = '#534fbc'),
          (this.activeTaskBkgColor = '#bfc7ff'),
          (this.gridColor = 'lightgrey'),
          (this.doneTaskBkgColor = 'lightgrey'),
          (this.doneTaskBorderColor = 'grey'),
          (this.critBorderColor = '#ff8888'),
          (this.critBkgColor = 'red'),
          (this.todayLineColor = 'red'),
          (this.personBorder = this.primaryBorderColor),
          (this.personBkg = this.mainBkg),
          (this.labelColor = 'black'),
          (this.errorBkgColor = '#552222'),
          (this.errorTextColor = '#552222'),
          this.updateColors();
      }
      updateColors() {
        (this.cScale0 = this.cScale0 || this.primaryColor),
          (this.cScale1 = this.cScale1 || this.secondaryColor),
          (this.cScale2 = this.cScale2 || this.tertiaryColor),
          (this.cScale3 = this.cScale3 || S(this.primaryColor, { h: 30 })),
          (this.cScale4 = this.cScale4 || S(this.primaryColor, { h: 60 })),
          (this.cScale5 = this.cScale5 || S(this.primaryColor, { h: 90 })),
          (this.cScale6 = this.cScale6 || S(this.primaryColor, { h: 120 })),
          (this.cScale7 = this.cScale7 || S(this.primaryColor, { h: 150 })),
          (this.cScale8 = this.cScale8 || S(this.primaryColor, { h: 210 })),
          (this.cScale9 = this.cScale9 || S(this.primaryColor, { h: 270 })),
          (this.cScale10 = this.cScale10 || S(this.primaryColor, { h: 300 })),
          (this.cScale11 = this.cScale11 || S(this.primaryColor, { h: 330 })),
          (this['cScalePeer1'] =
            this['cScalePeer1'] || et(this.secondaryColor, 45)),
          (this['cScalePeer2'] =
            this['cScalePeer2'] || et(this.tertiaryColor, 40));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          (this['cScale' + e] = et(this['cScale' + e], 10)),
            (this['cScalePeer' + e] =
              this['cScalePeer' + e] || et(this['cScale' + e], 25));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleInv' + e] =
            this['cScaleInv' + e] || S(this['cScale' + e], { h: 180 });
        for (let e = 0; e < 5; e++)
          (this['surface' + e] =
            this['surface' + e] || S(this.mainBkg, { h: 30, l: -(5 + e * 5) })),
            (this['surfacePeer' + e] =
              this['surfacePeer' + e] ||
              S(this.mainBkg, { h: 30, l: -(7 + e * 5) }));
        if (
          ((this.scaleLabelColor =
            this.scaleLabelColor !== 'calculated' && this.scaleLabelColor
              ? this.scaleLabelColor
              : this.labelTextColor),
          this.labelTextColor !== 'calculated')
        ) {
          (this.cScaleLabel0 = this.cScaleLabel0 || q(this.labelTextColor)),
            (this.cScaleLabel3 = this.cScaleLabel3 || q(this.labelTextColor));
          for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
            this['cScaleLabel' + e] =
              this['cScaleLabel' + e] || this.labelTextColor;
        }
        (this.nodeBkg = this.mainBkg),
          (this.nodeBorder = this.border1),
          (this.clusterBkg = this.secondBkg),
          (this.clusterBorder = this.border2),
          (this.defaultLinkColor = this.lineColor),
          (this.titleColor = this.textColor),
          (this.edgeLabelBackground = this.labelBackground),
          (this.actorBorder = Q(this.border1, 23)),
          (this.actorBkg = this.mainBkg),
          (this.labelBoxBkgColor = this.actorBkg),
          (this.signalColor = this.textColor),
          (this.signalTextColor = this.textColor),
          (this.labelBoxBorderColor = this.actorBorder),
          (this.labelTextColor = this.actorTextColor),
          (this.loopTextColor = this.actorTextColor),
          (this.noteBorderColor = this.border2),
          (this.noteTextColor = this.actorTextColor),
          (this.taskTextColor = this.taskTextLightColor),
          (this.taskTextOutsideColor = this.taskTextDarkColor),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.transitionLabelColor =
            this.transitionLabelColor || this.textColor),
          (this.stateLabelColor =
            this.stateLabelColor || this.stateBkg || this.primaryTextColor),
          (this.stateBkg = this.stateBkg || this.mainBkg),
          (this.labelBackgroundColor =
            this.labelBackgroundColor || this.stateBkg),
          (this.compositeBackground =
            this.compositeBackground || this.background || this.tertiaryColor),
          (this.altBackground = this.altBackground || '#f0f0f0'),
          (this.compositeTitleBackground =
            this.compositeTitleBackground || this.mainBkg),
          (this.compositeBorder = this.compositeBorder || this.nodeBorder),
          (this.innerEndBackground = this.nodeBorder),
          (this.specialStateColor = this.lineColor),
          (this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
          (this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.classText = this.primaryTextColor),
          (this.fillType0 = this.primaryColor),
          (this.fillType1 = this.secondaryColor),
          (this.fillType2 = S(this.primaryColor, { h: 64 })),
          (this.fillType3 = S(this.secondaryColor, { h: 64 })),
          (this.fillType4 = S(this.primaryColor, { h: -64 })),
          (this.fillType5 = S(this.secondaryColor, { h: -64 })),
          (this.fillType6 = S(this.primaryColor, { h: 128 })),
          (this.fillType7 = S(this.secondaryColor, { h: 128 })),
          (this.pie1 = this.pie1 || this.primaryColor),
          (this.pie2 = this.pie2 || this.secondaryColor),
          (this.pie3 = this.pie3 || S(this.tertiaryColor, { l: -40 })),
          (this.pie4 = this.pie4 || S(this.primaryColor, { l: -10 })),
          (this.pie5 = this.pie5 || S(this.secondaryColor, { l: -30 })),
          (this.pie6 = this.pie6 || S(this.tertiaryColor, { l: -20 })),
          (this.pie7 = this.pie7 || S(this.primaryColor, { h: 60, l: -20 })),
          (this.pie8 = this.pie8 || S(this.primaryColor, { h: -60, l: -40 })),
          (this.pie9 = this.pie9 || S(this.primaryColor, { h: 120, l: -40 })),
          (this.pie10 = this.pie10 || S(this.primaryColor, { h: 60, l: -40 })),
          (this.pie11 = this.pie11 || S(this.primaryColor, { h: -90, l: -40 })),
          (this.pie12 = this.pie12 || S(this.primaryColor, { h: 120, l: -30 })),
          (this.pieTitleTextSize = this.pieTitleTextSize || '25px'),
          (this.pieTitleTextColor =
            this.pieTitleTextColor || this.taskTextDarkColor),
          (this.pieSectionTextSize = this.pieSectionTextSize || '17px'),
          (this.pieSectionTextColor =
            this.pieSectionTextColor || this.textColor),
          (this.pieLegendTextSize = this.pieLegendTextSize || '17px'),
          (this.pieLegendTextColor =
            this.pieLegendTextColor || this.taskTextDarkColor),
          (this.pieStrokeColor = this.pieStrokeColor || 'black'),
          (this.pieStrokeWidth = this.pieStrokeWidth || '2px'),
          (this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || '2px'),
          (this.pieOuterStrokeColor = this.pieOuterStrokeColor || 'black'),
          (this.pieOpacity = this.pieOpacity || '0.7'),
          (this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
          (this.quadrant2Fill =
            this.quadrant2Fill || S(this.primaryColor, { r: 5, g: 5, b: 5 })),
          (this.quadrant3Fill =
            this.quadrant3Fill ||
            S(this.primaryColor, { r: 10, g: 10, b: 10 })),
          (this.quadrant4Fill =
            this.quadrant4Fill ||
            S(this.primaryColor, { r: 15, g: 15, b: 15 })),
          (this.quadrant1TextFill =
            this.quadrant1TextFill || this.primaryTextColor),
          (this.quadrant2TextFill =
            this.quadrant2TextFill ||
            S(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
          (this.quadrant3TextFill =
            this.quadrant3TextFill ||
            S(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
          (this.quadrant4TextFill =
            this.quadrant4TextFill ||
            S(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
          (this.quadrantPointFill =
            this.quadrantPointFill || yn(this.quadrant1Fill)
              ? Q(this.quadrant1Fill)
              : et(this.quadrant1Fill)),
          (this.quadrantPointTextFill =
            this.quadrantPointTextFill || this.primaryTextColor),
          (this.quadrantXAxisTextFill =
            this.quadrantXAxisTextFill || this.primaryTextColor),
          (this.quadrantYAxisTextFill =
            this.quadrantYAxisTextFill || this.primaryTextColor),
          (this.quadrantInternalBorderStrokeFill =
            this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantExternalBorderStrokeFill =
            this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantTitleFill =
            this.quadrantTitleFill || this.primaryTextColor),
          (this.requirementBackground =
            this.requirementBackground || this.primaryColor),
          (this.requirementBorderColor =
            this.requirementBorderColor || this.primaryBorderColor),
          (this.requirementBorderSize = this.requirementBorderSize || '1'),
          (this.requirementTextColor =
            this.requirementTextColor || this.primaryTextColor),
          (this.relationColor = this.relationColor || this.lineColor),
          (this.relationLabelBackground =
            this.relationLabelBackground || this.labelBackground),
          (this.relationLabelColor =
            this.relationLabelColor || this.actorTextColor),
          (this.git0 = this.git0 || this.primaryColor),
          (this.git1 = this.git1 || this.secondaryColor),
          (this.git2 = this.git2 || this.tertiaryColor),
          (this.git3 = this.git3 || S(this.primaryColor, { h: -30 })),
          (this.git4 = this.git4 || S(this.primaryColor, { h: -60 })),
          (this.git5 = this.git5 || S(this.primaryColor, { h: -90 })),
          (this.git6 = this.git6 || S(this.primaryColor, { h: 60 })),
          (this.git7 = this.git7 || S(this.primaryColor, { h: 120 })),
          this.darkMode
            ? ((this.git0 = Q(this.git0, 25)),
              (this.git1 = Q(this.git1, 25)),
              (this.git2 = Q(this.git2, 25)),
              (this.git3 = Q(this.git3, 25)),
              (this.git4 = Q(this.git4, 25)),
              (this.git5 = Q(this.git5, 25)),
              (this.git6 = Q(this.git6, 25)),
              (this.git7 = Q(this.git7, 25)))
            : ((this.git0 = et(this.git0, 25)),
              (this.git1 = et(this.git1, 25)),
              (this.git2 = et(this.git2, 25)),
              (this.git3 = et(this.git3, 25)),
              (this.git4 = et(this.git4, 25)),
              (this.git5 = et(this.git5, 25)),
              (this.git6 = et(this.git6, 25)),
              (this.git7 = et(this.git7, 25))),
          (this.gitInv0 = this.gitInv0 || et(q(this.git0), 25)),
          (this.gitInv1 = this.gitInv1 || q(this.git1)),
          (this.gitInv2 = this.gitInv2 || q(this.git2)),
          (this.gitInv3 = this.gitInv3 || q(this.git3)),
          (this.gitInv4 = this.gitInv4 || q(this.git4)),
          (this.gitInv5 = this.gitInv5 || q(this.git5)),
          (this.gitInv6 = this.gitInv6 || q(this.git6)),
          (this.gitInv7 = this.gitInv7 || q(this.git7)),
          (this.gitBranchLabel0 =
            this.gitBranchLabel0 || q(this.labelTextColor)),
          (this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
          (this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
          (this.gitBranchLabel3 =
            this.gitBranchLabel3 || q(this.labelTextColor)),
          (this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
          (this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
          (this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
          (this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
          (this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
          (this.tagLabelBackground =
            this.tagLabelBackground || this.primaryColor),
          (this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
          (this.tagLabelFontSize = this.tagLabelFontSize || '10px'),
          (this.commitLabelColor =
            this.commitLabelColor || this.secondaryTextColor),
          (this.commitLabelBackground =
            this.commitLabelBackground || this.secondaryColor),
          (this.commitLabelFontSize = this.commitLabelFontSize || '10px'),
          (this.attributeBackgroundColorOdd =
            this.attributeBackgroundColorOdd || qi),
          (this.attributeBackgroundColorEven =
            this.attributeBackgroundColorEven || Hi);
      }
      calculate(e) {
        if (typeof e != 'object') {
          this.updateColors();
          return;
        }
        let r = Object.keys(e);
        r.forEach((n) => {
          this[n] = e[n];
        }),
          this.updateColors(),
          r.forEach((n) => {
            this[n] = e[n];
          });
      }
    }),
      (EO = (t) => {
        let e = new sy();
        return e.calculate(t), e;
      });
  });
var ly,
  SO,
  vO = f(() => {
    'use strict';
    Wi();
    ps();
    uc();
    (ly = class {
      constructor() {
        (this.background = '#f4f4f4'),
          (this.primaryColor = '#cde498'),
          (this.secondaryColor = '#cdffb2'),
          (this.background = 'white'),
          (this.mainBkg = '#cde498'),
          (this.secondBkg = '#cdffb2'),
          (this.lineColor = 'green'),
          (this.border1 = '#13540c'),
          (this.border2 = '#6eaa49'),
          (this.arrowheadColor = 'green'),
          (this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
          (this.fontSize = '16px'),
          (this.tertiaryColor = Q('#cde498', 10)),
          (this.primaryBorderColor = Se(this.primaryColor, this.darkMode)),
          (this.secondaryBorderColor = Se(this.secondaryColor, this.darkMode)),
          (this.tertiaryBorderColor = Se(this.tertiaryColor, this.darkMode)),
          (this.primaryTextColor = q(this.primaryColor)),
          (this.secondaryTextColor = q(this.secondaryColor)),
          (this.tertiaryTextColor = q(this.primaryColor)),
          (this.lineColor = q(this.background)),
          (this.textColor = q(this.background)),
          (this.THEME_COLOR_LIMIT = 12),
          (this.nodeBkg = 'calculated'),
          (this.nodeBorder = 'calculated'),
          (this.clusterBkg = 'calculated'),
          (this.clusterBorder = 'calculated'),
          (this.defaultLinkColor = 'calculated'),
          (this.titleColor = '#333'),
          (this.edgeLabelBackground = '#e8e8e8'),
          (this.actorBorder = 'calculated'),
          (this.actorBkg = 'calculated'),
          (this.actorTextColor = 'black'),
          (this.actorLineColor = 'grey'),
          (this.signalColor = '#333'),
          (this.signalTextColor = '#333'),
          (this.labelBoxBkgColor = 'calculated'),
          (this.labelBoxBorderColor = '#326932'),
          (this.labelTextColor = 'calculated'),
          (this.loopTextColor = 'calculated'),
          (this.noteBorderColor = 'calculated'),
          (this.noteBkgColor = '#fff5ad'),
          (this.noteTextColor = 'calculated'),
          (this.activationBorderColor = '#666'),
          (this.activationBkgColor = '#f4f4f4'),
          (this.sequenceNumberColor = 'white'),
          (this.sectionBkgColor = '#6eaa49'),
          (this.altSectionBkgColor = 'white'),
          (this.sectionBkgColor2 = '#6eaa49'),
          (this.excludeBkgColor = '#eeeeee'),
          (this.taskBorderColor = 'calculated'),
          (this.taskBkgColor = '#487e3a'),
          (this.taskTextLightColor = 'white'),
          (this.taskTextColor = 'calculated'),
          (this.taskTextDarkColor = 'black'),
          (this.taskTextOutsideColor = 'calculated'),
          (this.taskTextClickableColor = '#003163'),
          (this.activeTaskBorderColor = 'calculated'),
          (this.activeTaskBkgColor = 'calculated'),
          (this.gridColor = 'lightgrey'),
          (this.doneTaskBkgColor = 'lightgrey'),
          (this.doneTaskBorderColor = 'grey'),
          (this.critBorderColor = '#ff8888'),
          (this.critBkgColor = 'red'),
          (this.todayLineColor = 'red'),
          (this.personBorder = this.primaryBorderColor),
          (this.personBkg = this.mainBkg),
          (this.labelColor = 'black'),
          (this.errorBkgColor = '#552222'),
          (this.errorTextColor = '#552222');
      }
      updateColors() {
        (this.actorBorder = et(this.mainBkg, 20)),
          (this.actorBkg = this.mainBkg),
          (this.labelBoxBkgColor = this.actorBkg),
          (this.labelTextColor = this.actorTextColor),
          (this.loopTextColor = this.actorTextColor),
          (this.noteBorderColor = this.border2),
          (this.noteTextColor = this.actorTextColor),
          (this.cScale0 = this.cScale0 || this.primaryColor),
          (this.cScale1 = this.cScale1 || this.secondaryColor),
          (this.cScale2 = this.cScale2 || this.tertiaryColor),
          (this.cScale3 = this.cScale3 || S(this.primaryColor, { h: 30 })),
          (this.cScale4 = this.cScale4 || S(this.primaryColor, { h: 60 })),
          (this.cScale5 = this.cScale5 || S(this.primaryColor, { h: 90 })),
          (this.cScale6 = this.cScale6 || S(this.primaryColor, { h: 120 })),
          (this.cScale7 = this.cScale7 || S(this.primaryColor, { h: 150 })),
          (this.cScale8 = this.cScale8 || S(this.primaryColor, { h: 210 })),
          (this.cScale9 = this.cScale9 || S(this.primaryColor, { h: 270 })),
          (this.cScale10 = this.cScale10 || S(this.primaryColor, { h: 300 })),
          (this.cScale11 = this.cScale11 || S(this.primaryColor, { h: 330 })),
          (this['cScalePeer1'] =
            this['cScalePeer1'] || et(this.secondaryColor, 45)),
          (this['cScalePeer2'] =
            this['cScalePeer2'] || et(this.tertiaryColor, 40));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          (this['cScale' + e] = et(this['cScale' + e], 10)),
            (this['cScalePeer' + e] =
              this['cScalePeer' + e] || et(this['cScale' + e], 25));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleInv' + e] =
            this['cScaleInv' + e] || S(this['cScale' + e], { h: 180 });
        this.scaleLabelColor =
          this.scaleLabelColor !== 'calculated' && this.scaleLabelColor
            ? this.scaleLabelColor
            : this.labelTextColor;
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleLabel' + e] =
            this['cScaleLabel' + e] || this.scaleLabelColor;
        for (let e = 0; e < 5; e++)
          (this['surface' + e] =
            this['surface' + e] ||
            S(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) })),
            (this['surfacePeer' + e] =
              this['surfacePeer' + e] ||
              S(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) }));
        (this.nodeBkg = this.mainBkg),
          (this.nodeBorder = this.border1),
          (this.clusterBkg = this.secondBkg),
          (this.clusterBorder = this.border2),
          (this.defaultLinkColor = this.lineColor),
          (this.taskBorderColor = this.border1),
          (this.taskTextColor = this.taskTextLightColor),
          (this.taskTextOutsideColor = this.taskTextDarkColor),
          (this.activeTaskBorderColor = this.taskBorderColor),
          (this.activeTaskBkgColor = this.mainBkg),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.transitionLabelColor =
            this.transitionLabelColor || this.textColor),
          (this.stateLabelColor =
            this.stateLabelColor || this.stateBkg || this.primaryTextColor),
          (this.stateBkg = this.stateBkg || this.mainBkg),
          (this.labelBackgroundColor =
            this.labelBackgroundColor || this.stateBkg),
          (this.compositeBackground =
            this.compositeBackground || this.background || this.tertiaryColor),
          (this.altBackground = this.altBackground || '#f0f0f0'),
          (this.compositeTitleBackground =
            this.compositeTitleBackground || this.mainBkg),
          (this.compositeBorder = this.compositeBorder || this.nodeBorder),
          (this.innerEndBackground = this.primaryBorderColor),
          (this.specialStateColor = this.lineColor),
          (this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
          (this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
          (this.transitionColor = this.transitionColor || this.lineColor),
          (this.classText = this.primaryTextColor),
          (this.fillType0 = this.primaryColor),
          (this.fillType1 = this.secondaryColor),
          (this.fillType2 = S(this.primaryColor, { h: 64 })),
          (this.fillType3 = S(this.secondaryColor, { h: 64 })),
          (this.fillType4 = S(this.primaryColor, { h: -64 })),
          (this.fillType5 = S(this.secondaryColor, { h: -64 })),
          (this.fillType6 = S(this.primaryColor, { h: 128 })),
          (this.fillType7 = S(this.secondaryColor, { h: 128 })),
          (this.pie1 = this.pie1 || this.primaryColor),
          (this.pie2 = this.pie2 || this.secondaryColor),
          (this.pie3 = this.pie3 || this.tertiaryColor),
          (this.pie4 = this.pie4 || S(this.primaryColor, { l: -30 })),
          (this.pie5 = this.pie5 || S(this.secondaryColor, { l: -30 })),
          (this.pie6 = this.pie6 || S(this.tertiaryColor, { h: 40, l: -40 })),
          (this.pie7 = this.pie7 || S(this.primaryColor, { h: 60, l: -10 })),
          (this.pie8 = this.pie8 || S(this.primaryColor, { h: -60, l: -10 })),
          (this.pie9 = this.pie9 || S(this.primaryColor, { h: 120, l: 0 })),
          (this.pie10 = this.pie10 || S(this.primaryColor, { h: 60, l: -50 })),
          (this.pie11 = this.pie11 || S(this.primaryColor, { h: -60, l: -50 })),
          (this.pie12 = this.pie12 || S(this.primaryColor, { h: 120, l: -50 })),
          (this.pieTitleTextSize = this.pieTitleTextSize || '25px'),
          (this.pieTitleTextColor =
            this.pieTitleTextColor || this.taskTextDarkColor),
          (this.pieSectionTextSize = this.pieSectionTextSize || '17px'),
          (this.pieSectionTextColor =
            this.pieSectionTextColor || this.textColor),
          (this.pieLegendTextSize = this.pieLegendTextSize || '17px'),
          (this.pieLegendTextColor =
            this.pieLegendTextColor || this.taskTextDarkColor),
          (this.pieStrokeColor = this.pieStrokeColor || 'black'),
          (this.pieStrokeWidth = this.pieStrokeWidth || '2px'),
          (this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || '2px'),
          (this.pieOuterStrokeColor = this.pieOuterStrokeColor || 'black'),
          (this.pieOpacity = this.pieOpacity || '0.7'),
          (this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
          (this.quadrant2Fill =
            this.quadrant2Fill || S(this.primaryColor, { r: 5, g: 5, b: 5 })),
          (this.quadrant3Fill =
            this.quadrant3Fill ||
            S(this.primaryColor, { r: 10, g: 10, b: 10 })),
          (this.quadrant4Fill =
            this.quadrant4Fill ||
            S(this.primaryColor, { r: 15, g: 15, b: 15 })),
          (this.quadrant1TextFill =
            this.quadrant1TextFill || this.primaryTextColor),
          (this.quadrant2TextFill =
            this.quadrant2TextFill ||
            S(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
          (this.quadrant3TextFill =
            this.quadrant3TextFill ||
            S(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
          (this.quadrant4TextFill =
            this.quadrant4TextFill ||
            S(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
          (this.quadrantPointFill =
            this.quadrantPointFill || yn(this.quadrant1Fill)
              ? Q(this.quadrant1Fill)
              : et(this.quadrant1Fill)),
          (this.quadrantPointTextFill =
            this.quadrantPointTextFill || this.primaryTextColor),
          (this.quadrantXAxisTextFill =
            this.quadrantXAxisTextFill || this.primaryTextColor),
          (this.quadrantYAxisTextFill =
            this.quadrantYAxisTextFill || this.primaryTextColor),
          (this.quadrantInternalBorderStrokeFill =
            this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantExternalBorderStrokeFill =
            this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantTitleFill =
            this.quadrantTitleFill || this.primaryTextColor),
          (this.requirementBackground =
            this.requirementBackground || this.primaryColor),
          (this.requirementBorderColor =
            this.requirementBorderColor || this.primaryBorderColor),
          (this.requirementBorderSize = this.requirementBorderSize || '1'),
          (this.requirementTextColor =
            this.requirementTextColor || this.primaryTextColor),
          (this.relationColor = this.relationColor || this.lineColor),
          (this.relationLabelBackground =
            this.relationLabelBackground || this.edgeLabelBackground),
          (this.relationLabelColor =
            this.relationLabelColor || this.actorTextColor),
          (this.git0 = this.git0 || this.primaryColor),
          (this.git1 = this.git1 || this.secondaryColor),
          (this.git2 = this.git2 || this.tertiaryColor),
          (this.git3 = this.git3 || S(this.primaryColor, { h: -30 })),
          (this.git4 = this.git4 || S(this.primaryColor, { h: -60 })),
          (this.git5 = this.git5 || S(this.primaryColor, { h: -90 })),
          (this.git6 = this.git6 || S(this.primaryColor, { h: 60 })),
          (this.git7 = this.git7 || S(this.primaryColor, { h: 120 })),
          this.darkMode
            ? ((this.git0 = Q(this.git0, 25)),
              (this.git1 = Q(this.git1, 25)),
              (this.git2 = Q(this.git2, 25)),
              (this.git3 = Q(this.git3, 25)),
              (this.git4 = Q(this.git4, 25)),
              (this.git5 = Q(this.git5, 25)),
              (this.git6 = Q(this.git6, 25)),
              (this.git7 = Q(this.git7, 25)))
            : ((this.git0 = et(this.git0, 25)),
              (this.git1 = et(this.git1, 25)),
              (this.git2 = et(this.git2, 25)),
              (this.git3 = et(this.git3, 25)),
              (this.git4 = et(this.git4, 25)),
              (this.git5 = et(this.git5, 25)),
              (this.git6 = et(this.git6, 25)),
              (this.git7 = et(this.git7, 25))),
          (this.gitInv0 = this.gitInv0 || q(this.git0)),
          (this.gitInv1 = this.gitInv1 || q(this.git1)),
          (this.gitInv2 = this.gitInv2 || q(this.git2)),
          (this.gitInv3 = this.gitInv3 || q(this.git3)),
          (this.gitInv4 = this.gitInv4 || q(this.git4)),
          (this.gitInv5 = this.gitInv5 || q(this.git5)),
          (this.gitInv6 = this.gitInv6 || q(this.git6)),
          (this.gitInv7 = this.gitInv7 || q(this.git7)),
          (this.gitBranchLabel0 =
            this.gitBranchLabel0 || q(this.labelTextColor)),
          (this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor),
          (this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor),
          (this.gitBranchLabel3 =
            this.gitBranchLabel3 || q(this.labelTextColor)),
          (this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor),
          (this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor),
          (this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor),
          (this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor),
          (this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
          (this.tagLabelBackground =
            this.tagLabelBackground || this.primaryColor),
          (this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
          (this.tagLabelFontSize = this.tagLabelFontSize || '10px'),
          (this.commitLabelColor =
            this.commitLabelColor || this.secondaryTextColor),
          (this.commitLabelBackground =
            this.commitLabelBackground || this.secondaryColor),
          (this.commitLabelFontSize = this.commitLabelFontSize || '10px'),
          (this.attributeBackgroundColorOdd =
            this.attributeBackgroundColorOdd || qi),
          (this.attributeBackgroundColorEven =
            this.attributeBackgroundColorEven || Hi);
      }
      calculate(e) {
        if (typeof e != 'object') {
          this.updateColors();
          return;
        }
        let r = Object.keys(e);
        r.forEach((n) => {
          this[n] = e[n];
        }),
          this.updateColors(),
          r.forEach((n) => {
            this[n] = e[n];
          });
      }
    }),
      (SO = (t) => {
        let e = new ly();
        return e.calculate(t), e;
      });
  });
var cy,
  AO,
  LO = f(() => {
    'use strict';
    Wi();
    ps();
    uc();
    (cy = class {
      constructor() {
        (this.primaryColor = '#eee'),
          (this.contrast = '#707070'),
          (this.secondaryColor = Q(this.contrast, 55)),
          (this.background = '#ffffff'),
          (this.tertiaryColor = S(this.primaryColor, { h: -160 })),
          (this.primaryBorderColor = Se(this.primaryColor, this.darkMode)),
          (this.secondaryBorderColor = Se(this.secondaryColor, this.darkMode)),
          (this.tertiaryBorderColor = Se(this.tertiaryColor, this.darkMode)),
          (this.primaryTextColor = q(this.primaryColor)),
          (this.secondaryTextColor = q(this.secondaryColor)),
          (this.tertiaryTextColor = q(this.tertiaryColor)),
          (this.lineColor = q(this.background)),
          (this.textColor = q(this.background)),
          (this.mainBkg = '#eee'),
          (this.secondBkg = 'calculated'),
          (this.lineColor = '#666'),
          (this.border1 = '#999'),
          (this.border2 = 'calculated'),
          (this.note = '#ffa'),
          (this.text = '#333'),
          (this.critical = '#d42'),
          (this.done = '#bbb'),
          (this.arrowheadColor = '#333333'),
          (this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif'),
          (this.fontSize = '16px'),
          (this.THEME_COLOR_LIMIT = 12),
          (this.nodeBkg = 'calculated'),
          (this.nodeBorder = 'calculated'),
          (this.clusterBkg = 'calculated'),
          (this.clusterBorder = 'calculated'),
          (this.defaultLinkColor = 'calculated'),
          (this.titleColor = 'calculated'),
          (this.edgeLabelBackground = 'white'),
          (this.actorBorder = 'calculated'),
          (this.actorBkg = 'calculated'),
          (this.actorTextColor = 'calculated'),
          (this.actorLineColor = 'calculated'),
          (this.signalColor = 'calculated'),
          (this.signalTextColor = 'calculated'),
          (this.labelBoxBkgColor = 'calculated'),
          (this.labelBoxBorderColor = 'calculated'),
          (this.labelTextColor = 'calculated'),
          (this.loopTextColor = 'calculated'),
          (this.noteBorderColor = 'calculated'),
          (this.noteBkgColor = 'calculated'),
          (this.noteTextColor = 'calculated'),
          (this.activationBorderColor = '#666'),
          (this.activationBkgColor = '#f4f4f4'),
          (this.sequenceNumberColor = 'white'),
          (this.sectionBkgColor = 'calculated'),
          (this.altSectionBkgColor = 'white'),
          (this.sectionBkgColor2 = 'calculated'),
          (this.excludeBkgColor = '#eeeeee'),
          (this.taskBorderColor = 'calculated'),
          (this.taskBkgColor = 'calculated'),
          (this.taskTextLightColor = 'white'),
          (this.taskTextColor = 'calculated'),
          (this.taskTextDarkColor = 'calculated'),
          (this.taskTextOutsideColor = 'calculated'),
          (this.taskTextClickableColor = '#003163'),
          (this.activeTaskBorderColor = 'calculated'),
          (this.activeTaskBkgColor = 'calculated'),
          (this.gridColor = 'calculated'),
          (this.doneTaskBkgColor = 'calculated'),
          (this.doneTaskBorderColor = 'calculated'),
          (this.critBkgColor = 'calculated'),
          (this.critBorderColor = 'calculated'),
          (this.todayLineColor = 'calculated'),
          (this.personBorder = this.primaryBorderColor),
          (this.personBkg = this.mainBkg),
          (this.labelColor = 'black'),
          (this.errorBkgColor = '#552222'),
          (this.errorTextColor = '#552222');
      }
      updateColors() {
        (this.secondBkg = Q(this.contrast, 55)),
          (this.border2 = this.contrast),
          (this.actorBorder = Q(this.border1, 23)),
          (this.actorBkg = this.mainBkg),
          (this.actorTextColor = this.text),
          (this.actorLineColor = this.lineColor),
          (this.signalColor = this.text),
          (this.signalTextColor = this.text),
          (this.labelBoxBkgColor = this.actorBkg),
          (this.labelBoxBorderColor = this.actorBorder),
          (this.labelTextColor = this.text),
          (this.loopTextColor = this.text),
          (this.noteBorderColor = '#999'),
          (this.noteBkgColor = '#666'),
          (this.noteTextColor = '#fff'),
          (this.cScale0 = this.cScale0 || '#555'),
          (this.cScale1 = this.cScale1 || '#F4F4F4'),
          (this.cScale2 = this.cScale2 || '#555'),
          (this.cScale3 = this.cScale3 || '#BBB'),
          (this.cScale4 = this.cScale4 || '#777'),
          (this.cScale5 = this.cScale5 || '#999'),
          (this.cScale6 = this.cScale6 || '#DDD'),
          (this.cScale7 = this.cScale7 || '#FFF'),
          (this.cScale8 = this.cScale8 || '#DDD'),
          (this.cScale9 = this.cScale9 || '#BBB'),
          (this.cScale10 = this.cScale10 || '#999'),
          (this.cScale11 = this.cScale11 || '#777');
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleInv' + e] =
            this['cScaleInv' + e] || q(this['cScale' + e]);
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this.darkMode
            ? (this['cScalePeer' + e] =
                this['cScalePeer' + e] || Q(this['cScale' + e], 10))
            : (this['cScalePeer' + e] =
                this['cScalePeer' + e] || et(this['cScale' + e], 10));
        (this.scaleLabelColor =
          this.scaleLabelColor ||
          (this.darkMode ? 'black' : this.labelTextColor)),
          (this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1),
          (this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1);
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['cScaleLabel' + e] =
            this['cScaleLabel' + e] || this.scaleLabelColor;
        for (let e = 0; e < 5; e++)
          (this['surface' + e] =
            this['surface' + e] || S(this.mainBkg, { l: -(5 + e * 5) })),
            (this['surfacePeer' + e] =
              this['surfacePeer' + e] || S(this.mainBkg, { l: -(8 + e * 5) }));
        (this.nodeBkg = this.mainBkg),
          (this.nodeBorder = this.border1),
          (this.clusterBkg = this.secondBkg),
          (this.clusterBorder = this.border2),
          (this.defaultLinkColor = this.lineColor),
          (this.titleColor = this.text),
          (this.sectionBkgColor = Q(this.contrast, 30)),
          (this.sectionBkgColor2 = Q(this.contrast, 30)),
          (this.taskBorderColor = et(this.contrast, 10)),
          (this.taskBkgColor = this.contrast),
          (this.taskTextColor = this.taskTextLightColor),
          (this.taskTextDarkColor = this.text),
          (this.taskTextOutsideColor = this.taskTextDarkColor),
          (this.activeTaskBorderColor = this.taskBorderColor),
          (this.activeTaskBkgColor = this.mainBkg),
          (this.gridColor = Q(this.border1, 30)),
          (this.doneTaskBkgColor = this.done),
          (this.doneTaskBorderColor = this.lineColor),
          (this.critBkgColor = this.critical),
          (this.critBorderColor = et(this.critBkgColor, 10)),
          (this.todayLineColor = this.critBkgColor),
          (this.transitionColor = this.transitionColor || '#000'),
          (this.transitionLabelColor =
            this.transitionLabelColor || this.textColor),
          (this.stateLabelColor =
            this.stateLabelColor || this.stateBkg || this.primaryTextColor),
          (this.stateBkg = this.stateBkg || this.mainBkg),
          (this.labelBackgroundColor =
            this.labelBackgroundColor || this.stateBkg),
          (this.compositeBackground =
            this.compositeBackground || this.background || this.tertiaryColor),
          (this.altBackground = this.altBackground || '#f4f4f4'),
          (this.compositeTitleBackground =
            this.compositeTitleBackground || this.mainBkg),
          (this.stateBorder = this.stateBorder || '#000'),
          (this.innerEndBackground = this.primaryBorderColor),
          (this.specialStateColor = '#222'),
          (this.errorBkgColor = this.errorBkgColor || this.tertiaryColor),
          (this.errorTextColor = this.errorTextColor || this.tertiaryTextColor),
          (this.classText = this.primaryTextColor),
          (this.fillType0 = this.primaryColor),
          (this.fillType1 = this.secondaryColor),
          (this.fillType2 = S(this.primaryColor, { h: 64 })),
          (this.fillType3 = S(this.secondaryColor, { h: 64 })),
          (this.fillType4 = S(this.primaryColor, { h: -64 })),
          (this.fillType5 = S(this.secondaryColor, { h: -64 })),
          (this.fillType6 = S(this.primaryColor, { h: 128 })),
          (this.fillType7 = S(this.secondaryColor, { h: 128 }));
        for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
          this['pie' + e] = this['cScale' + e];
        (this.pie12 = this.pie0),
          (this.pieTitleTextSize = this.pieTitleTextSize || '25px'),
          (this.pieTitleTextColor =
            this.pieTitleTextColor || this.taskTextDarkColor),
          (this.pieSectionTextSize = this.pieSectionTextSize || '17px'),
          (this.pieSectionTextColor =
            this.pieSectionTextColor || this.textColor),
          (this.pieLegendTextSize = this.pieLegendTextSize || '17px'),
          (this.pieLegendTextColor =
            this.pieLegendTextColor || this.taskTextDarkColor),
          (this.pieStrokeColor = this.pieStrokeColor || 'black'),
          (this.pieStrokeWidth = this.pieStrokeWidth || '2px'),
          (this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || '2px'),
          (this.pieOuterStrokeColor = this.pieOuterStrokeColor || 'black'),
          (this.pieOpacity = this.pieOpacity || '0.7'),
          (this.quadrant1Fill = this.quadrant1Fill || this.primaryColor),
          (this.quadrant2Fill =
            this.quadrant2Fill || S(this.primaryColor, { r: 5, g: 5, b: 5 })),
          (this.quadrant3Fill =
            this.quadrant3Fill ||
            S(this.primaryColor, { r: 10, g: 10, b: 10 })),
          (this.quadrant4Fill =
            this.quadrant4Fill ||
            S(this.primaryColor, { r: 15, g: 15, b: 15 })),
          (this.quadrant1TextFill =
            this.quadrant1TextFill || this.primaryTextColor),
          (this.quadrant2TextFill =
            this.quadrant2TextFill ||
            S(this.primaryTextColor, { r: -5, g: -5, b: -5 })),
          (this.quadrant3TextFill =
            this.quadrant3TextFill ||
            S(this.primaryTextColor, { r: -10, g: -10, b: -10 })),
          (this.quadrant4TextFill =
            this.quadrant4TextFill ||
            S(this.primaryTextColor, { r: -15, g: -15, b: -15 })),
          (this.quadrantPointFill =
            this.quadrantPointFill || yn(this.quadrant1Fill)
              ? Q(this.quadrant1Fill)
              : et(this.quadrant1Fill)),
          (this.quadrantPointTextFill =
            this.quadrantPointTextFill || this.primaryTextColor),
          (this.quadrantXAxisTextFill =
            this.quadrantXAxisTextFill || this.primaryTextColor),
          (this.quadrantYAxisTextFill =
            this.quadrantYAxisTextFill || this.primaryTextColor),
          (this.quadrantInternalBorderStrokeFill =
            this.quadrantInternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantExternalBorderStrokeFill =
            this.quadrantExternalBorderStrokeFill || this.primaryBorderColor),
          (this.quadrantTitleFill =
            this.quadrantTitleFill || this.primaryTextColor),
          (this.requirementBackground =
            this.requirementBackground || this.primaryColor),
          (this.requirementBorderColor =
            this.requirementBorderColor || this.primaryBorderColor),
          (this.requirementBorderSize = this.requirementBorderSize || '1'),
          (this.requirementTextColor =
            this.requirementTextColor || this.primaryTextColor),
          (this.relationColor = this.relationColor || this.lineColor),
          (this.relationLabelBackground =
            this.relationLabelBackground || this.edgeLabelBackground),
          (this.relationLabelColor =
            this.relationLabelColor || this.actorTextColor),
          (this.git0 = et(this.pie1, 25) || this.primaryColor),
          (this.git1 = this.pie2 || this.secondaryColor),
          (this.git2 = this.pie3 || this.tertiaryColor),
          (this.git3 = this.pie4 || S(this.primaryColor, { h: -30 })),
          (this.git4 = this.pie5 || S(this.primaryColor, { h: -60 })),
          (this.git5 = this.pie6 || S(this.primaryColor, { h: -90 })),
          (this.git6 = this.pie7 || S(this.primaryColor, { h: 60 })),
          (this.git7 = this.pie8 || S(this.primaryColor, { h: 120 })),
          (this.gitInv0 = this.gitInv0 || q(this.git0)),
          (this.gitInv1 = this.gitInv1 || q(this.git1)),
          (this.gitInv2 = this.gitInv2 || q(this.git2)),
          (this.gitInv3 = this.gitInv3 || q(this.git3)),
          (this.gitInv4 = this.gitInv4 || q(this.git4)),
          (this.gitInv5 = this.gitInv5 || q(this.git5)),
          (this.gitInv6 = this.gitInv6 || q(this.git6)),
          (this.gitInv7 = this.gitInv7 || q(this.git7)),
          (this.branchLabelColor =
            this.branchLabelColor || this.labelTextColor),
          (this.gitBranchLabel0 = this.branchLabelColor),
          (this.gitBranchLabel1 = 'white'),
          (this.gitBranchLabel2 = this.branchLabelColor),
          (this.gitBranchLabel3 = 'white'),
          (this.gitBranchLabel4 = this.branchLabelColor),
          (this.gitBranchLabel5 = this.branchLabelColor),
          (this.gitBranchLabel6 = this.branchLabelColor),
          (this.gitBranchLabel7 = this.branchLabelColor),
          (this.tagLabelColor = this.tagLabelColor || this.primaryTextColor),
          (this.tagLabelBackground =
            this.tagLabelBackground || this.primaryColor),
          (this.tagLabelBorder = this.tagBorder || this.primaryBorderColor),
          (this.tagLabelFontSize = this.tagLabelFontSize || '10px'),
          (this.commitLabelColor =
            this.commitLabelColor || this.secondaryTextColor),
          (this.commitLabelBackground =
            this.commitLabelBackground || this.secondaryColor),
          (this.commitLabelFontSize = this.commitLabelFontSize || '10px'),
          (this.attributeBackgroundColorOdd =
            this.attributeBackgroundColorOdd || qi),
          (this.attributeBackgroundColorEven =
            this.attributeBackgroundColorEven || Hi);
      }
      calculate(e) {
        if (typeof e != 'object') {
          this.updateColors();
          return;
        }
        let r = Object.keys(e);
        r.forEach((n) => {
          this[n] = e[n];
        }),
          this.updateColors(),
          r.forEach((n) => {
            this[n] = e[n];
          });
      }
    }),
      (AO = (t) => {
        let e = new cy();
        return e.calculate(t), e;
      });
  });
var rn,
  Wh = f(() => {
    'use strict';
    CO();
    kO();
    wO();
    vO();
    LO();
    rn = {
      base: { getThemeVariables: _O },
      dark: { getThemeVariables: TO },
      default: { getThemeVariables: EO },
      forest: { getThemeVariables: SO },
      neutral: { getThemeVariables: AO },
    };
  });
var fi,
  IO = f(() => {
    'use strict';
    fi = {
      flowchart: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        diagramPadding: 8,
        htmlLabels: !0,
        nodeSpacing: 50,
        rankSpacing: 50,
        curve: 'basis',
        padding: 15,
        defaultRenderer: 'dagre-wrapper',
        wrappingWidth: 200,
      },
      sequence: {
        useMaxWidth: !0,
        hideUnusedParticipants: !1,
        activationWidth: 10,
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        mirrorActors: !0,
        forceMenus: !1,
        bottomMarginAdj: 1,
        rightAngles: !1,
        showSequenceNumbers: !1,
        actorFontSize: 14,
        actorFontFamily: '"Open Sans", sans-serif',
        actorFontWeight: 400,
        noteFontSize: 14,
        noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
        noteFontWeight: 400,
        noteAlign: 'center',
        messageFontSize: 16,
        messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
        messageFontWeight: 400,
        wrap: !1,
        wrapPadding: 10,
        labelBoxWidth: 50,
        labelBoxHeight: 20,
      },
      gantt: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        rightPadding: 75,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        sectionFontSize: 11,
        numberSectionStyles: 4,
        axisFormat: '%Y-%m-%d',
        topAxis: !1,
        displayMode: '',
        weekday: 'sunday',
      },
      journey: {
        useMaxWidth: !0,
        diagramMarginX: 50,
        diagramMarginY: 10,
        leftMargin: 150,
        width: 150,
        height: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        bottomMarginAdj: 1,
        rightAngles: !1,
        taskFontSize: 14,
        taskFontFamily: '"Open Sans", sans-serif',
        taskMargin: 50,
        activationWidth: 10,
        textPlacement: 'fo',
        actorColours: [
          '#8FBC8F',
          '#7CFC00',
          '#00FFFF',
          '#20B2AA',
          '#B0E0E6',
          '#FFFFE0',
        ],
        sectionFills: [
          '#191970',
          '#8B008B',
          '#4B0082',
          '#2F4F4F',
          '#800000',
          '#8B4513',
          '#00008B',
        ],
        sectionColours: ['#fff'],
      },
      class: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        arrowMarkerAbsolute: !1,
        dividerMargin: 10,
        padding: 5,
        textHeight: 10,
        defaultRenderer: 'dagre-wrapper',
        htmlLabels: !1,
      },
      state: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        dividerMargin: 10,
        sizeUnit: 5,
        padding: 8,
        textHeight: 10,
        titleShift: -15,
        noteMargin: 10,
        forkWidth: 70,
        forkHeight: 7,
        miniPadding: 2,
        fontSizeFactor: 5.02,
        fontSize: 24,
        labelHeight: 16,
        edgeLengthFactor: '20',
        compositTitleSize: 35,
        radius: 5,
        defaultRenderer: 'dagre-wrapper',
      },
      er: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        diagramPadding: 20,
        layoutDirection: 'TB',
        minEntityWidth: 100,
        minEntityHeight: 75,
        entityPadding: 15,
        stroke: 'gray',
        fill: 'honeydew',
        fontSize: 12,
      },
      pie: { useMaxWidth: !0, textPosition: 0.75 },
      quadrantChart: {
        useMaxWidth: !0,
        chartWidth: 500,
        chartHeight: 500,
        titleFontSize: 20,
        titlePadding: 10,
        quadrantPadding: 5,
        xAxisLabelPadding: 5,
        yAxisLabelPadding: 5,
        xAxisLabelFontSize: 16,
        yAxisLabelFontSize: 16,
        quadrantLabelFontSize: 16,
        quadrantTextTopPadding: 5,
        pointTextPadding: 5,
        pointLabelFontSize: 12,
        pointRadius: 5,
        xAxisPosition: 'top',
        yAxisPosition: 'left',
        quadrantInternalBorderStrokeWidth: 1,
        quadrantExternalBorderStrokeWidth: 2,
      },
      requirement: {
        useMaxWidth: !0,
        rect_fill: '#f9f9f9',
        text_color: '#333',
        rect_border_size: '0.5px',
        rect_border_color: '#bbb',
        rect_min_width: 200,
        rect_min_height: 200,
        fontSize: 14,
        rect_padding: 10,
        line_height: 20,
      },
      mindmap: { useMaxWidth: !0, padding: 10, maxNodeWidth: 200 },
      timeline: {
        useMaxWidth: !0,
        diagramMarginX: 50,
        diagramMarginY: 10,
        leftMargin: 150,
        width: 150,
        height: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        bottomMarginAdj: 1,
        rightAngles: !1,
        taskFontSize: 14,
        taskFontFamily: '"Open Sans", sans-serif',
        taskMargin: 50,
        activationWidth: 10,
        textPlacement: 'fo',
        actorColours: [
          '#8FBC8F',
          '#7CFC00',
          '#00FFFF',
          '#20B2AA',
          '#B0E0E6',
          '#FFFFE0',
        ],
        sectionFills: [
          '#191970',
          '#8B008B',
          '#4B0082',
          '#2F4F4F',
          '#800000',
          '#8B4513',
          '#00008B',
        ],
        sectionColours: ['#fff'],
        disableMulticolor: !1,
      },
      gitGraph: {
        useMaxWidth: !0,
        titleTopMargin: 25,
        diagramPadding: 8,
        nodeLabel: { width: 75, height: 100, x: -25, y: 0 },
        mainBranchName: 'main',
        mainBranchOrder: 0,
        showCommitLabel: !0,
        showBranches: !0,
        rotateCommitLabel: !0,
        arrowMarkerAbsolute: !1,
      },
      c4: {
        useMaxWidth: !0,
        diagramMarginX: 50,
        diagramMarginY: 10,
        c4ShapeMargin: 50,
        c4ShapePadding: 20,
        width: 216,
        height: 60,
        boxMargin: 10,
        c4ShapeInRow: 4,
        nextLinePaddingX: 0,
        c4BoundaryInRow: 2,
        personFontSize: 14,
        personFontFamily: '"Open Sans", sans-serif',
        personFontWeight: 'normal',
        external_personFontSize: 14,
        external_personFontFamily: '"Open Sans", sans-serif',
        external_personFontWeight: 'normal',
        systemFontSize: 14,
        systemFontFamily: '"Open Sans", sans-serif',
        systemFontWeight: 'normal',
        external_systemFontSize: 14,
        external_systemFontFamily: '"Open Sans", sans-serif',
        external_systemFontWeight: 'normal',
        system_dbFontSize: 14,
        system_dbFontFamily: '"Open Sans", sans-serif',
        system_dbFontWeight: 'normal',
        external_system_dbFontSize: 14,
        external_system_dbFontFamily: '"Open Sans", sans-serif',
        external_system_dbFontWeight: 'normal',
        system_queueFontSize: 14,
        system_queueFontFamily: '"Open Sans", sans-serif',
        system_queueFontWeight: 'normal',
        external_system_queueFontSize: 14,
        external_system_queueFontFamily: '"Open Sans", sans-serif',
        external_system_queueFontWeight: 'normal',
        boundaryFontSize: 14,
        boundaryFontFamily: '"Open Sans", sans-serif',
        boundaryFontWeight: 'normal',
        messageFontSize: 12,
        messageFontFamily: '"Open Sans", sans-serif',
        messageFontWeight: 'normal',
        containerFontSize: 14,
        containerFontFamily: '"Open Sans", sans-serif',
        containerFontWeight: 'normal',
        external_containerFontSize: 14,
        external_containerFontFamily: '"Open Sans", sans-serif',
        external_containerFontWeight: 'normal',
        container_dbFontSize: 14,
        container_dbFontFamily: '"Open Sans", sans-serif',
        container_dbFontWeight: 'normal',
        external_container_dbFontSize: 14,
        external_container_dbFontFamily: '"Open Sans", sans-serif',
        external_container_dbFontWeight: 'normal',
        container_queueFontSize: 14,
        container_queueFontFamily: '"Open Sans", sans-serif',
        container_queueFontWeight: 'normal',
        external_container_queueFontSize: 14,
        external_container_queueFontFamily: '"Open Sans", sans-serif',
        external_container_queueFontWeight: 'normal',
        componentFontSize: 14,
        componentFontFamily: '"Open Sans", sans-serif',
        componentFontWeight: 'normal',
        external_componentFontSize: 14,
        external_componentFontFamily: '"Open Sans", sans-serif',
        external_componentFontWeight: 'normal',
        component_dbFontSize: 14,
        component_dbFontFamily: '"Open Sans", sans-serif',
        component_dbFontWeight: 'normal',
        external_component_dbFontSize: 14,
        external_component_dbFontFamily: '"Open Sans", sans-serif',
        external_component_dbFontWeight: 'normal',
        component_queueFontSize: 14,
        component_queueFontFamily: '"Open Sans", sans-serif',
        component_queueFontWeight: 'normal',
        external_component_queueFontSize: 14,
        external_component_queueFontFamily: '"Open Sans", sans-serif',
        external_component_queueFontWeight: 'normal',
        wrap: !0,
        wrapPadding: 10,
        person_bg_color: '#08427B',
        person_border_color: '#073B6F',
        external_person_bg_color: '#686868',
        external_person_border_color: '#8A8A8A',
        system_bg_color: '#1168BD',
        system_border_color: '#3C7FC0',
        system_db_bg_color: '#1168BD',
        system_db_border_color: '#3C7FC0',
        system_queue_bg_color: '#1168BD',
        system_queue_border_color: '#3C7FC0',
        external_system_bg_color: '#999999',
        external_system_border_color: '#8A8A8A',
        external_system_db_bg_color: '#999999',
        external_system_db_border_color: '#8A8A8A',
        external_system_queue_bg_color: '#999999',
        external_system_queue_border_color: '#8A8A8A',
        container_bg_color: '#438DD5',
        container_border_color: '#3C7FC0',
        container_db_bg_color: '#438DD5',
        container_db_border_color: '#3C7FC0',
        container_queue_bg_color: '#438DD5',
        container_queue_border_color: '#3C7FC0',
        external_container_bg_color: '#B3B3B3',
        external_container_border_color: '#A6A6A6',
        external_container_db_bg_color: '#B3B3B3',
        external_container_db_border_color: '#A6A6A6',
        external_container_queue_bg_color: '#B3B3B3',
        external_container_queue_border_color: '#A6A6A6',
        component_bg_color: '#85BBF0',
        component_border_color: '#78A8D8',
        component_db_bg_color: '#85BBF0',
        component_db_border_color: '#78A8D8',
        component_queue_bg_color: '#85BBF0',
        component_queue_border_color: '#78A8D8',
        external_component_bg_color: '#CCCCCC',
        external_component_border_color: '#BFBFBF',
        external_component_db_bg_color: '#CCCCCC',
        external_component_db_border_color: '#BFBFBF',
        external_component_queue_bg_color: '#CCCCCC',
        external_component_queue_border_color: '#BFBFBF',
      },
      sankey: {
        useMaxWidth: !0,
        width: 600,
        height: 400,
        linkColor: 'gradient',
        nodeAlignment: 'justify',
        showValues: !0,
        prefix: '',
        suffix: '',
      },
      theme: 'default',
      maxTextSize: 5e4,
      darkMode: !1,
      fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
      logLevel: 5,
      securityLevel: 'strict',
      startOnLoad: !0,
      arrowMarkerAbsolute: !1,
      secure: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize'],
      deterministicIds: !1,
      fontSize: 16,
    };
  });
var OO,
  RO,
  NO,
  FO,
  uy = f(() => {
    'use strict';
    Wh();
    IO();
    (OO = {
      ...fi,
      deterministicIDSeed: void 0,
      themeCSS: void 0,
      themeVariables: rn.default.getThemeVariables(),
      sequence: {
        ...fi.sequence,
        messageFont: function () {
          return {
            fontFamily: this.messageFontFamily,
            fontSize: this.messageFontSize,
            fontWeight: this.messageFontWeight,
          };
        },
        noteFont: function () {
          return {
            fontFamily: this.noteFontFamily,
            fontSize: this.noteFontSize,
            fontWeight: this.noteFontWeight,
          };
        },
        actorFont: function () {
          return {
            fontFamily: this.actorFontFamily,
            fontSize: this.actorFontSize,
            fontWeight: this.actorFontWeight,
          };
        },
      },
      gantt: { ...fi.gantt, tickInterval: void 0, useWidth: void 0 },
      c4: {
        ...fi.c4,
        useWidth: void 0,
        personFont: function () {
          return {
            fontFamily: this.personFontFamily,
            fontSize: this.personFontSize,
            fontWeight: this.personFontWeight,
          };
        },
        external_personFont: function () {
          return {
            fontFamily: this.external_personFontFamily,
            fontSize: this.external_personFontSize,
            fontWeight: this.external_personFontWeight,
          };
        },
        systemFont: function () {
          return {
            fontFamily: this.systemFontFamily,
            fontSize: this.systemFontSize,
            fontWeight: this.systemFontWeight,
          };
        },
        external_systemFont: function () {
          return {
            fontFamily: this.external_systemFontFamily,
            fontSize: this.external_systemFontSize,
            fontWeight: this.external_systemFontWeight,
          };
        },
        system_dbFont: function () {
          return {
            fontFamily: this.system_dbFontFamily,
            fontSize: this.system_dbFontSize,
            fontWeight: this.system_dbFontWeight,
          };
        },
        external_system_dbFont: function () {
          return {
            fontFamily: this.external_system_dbFontFamily,
            fontSize: this.external_system_dbFontSize,
            fontWeight: this.external_system_dbFontWeight,
          };
        },
        system_queueFont: function () {
          return {
            fontFamily: this.system_queueFontFamily,
            fontSize: this.system_queueFontSize,
            fontWeight: this.system_queueFontWeight,
          };
        },
        external_system_queueFont: function () {
          return {
            fontFamily: this.external_system_queueFontFamily,
            fontSize: this.external_system_queueFontSize,
            fontWeight: this.external_system_queueFontWeight,
          };
        },
        containerFont: function () {
          return {
            fontFamily: this.containerFontFamily,
            fontSize: this.containerFontSize,
            fontWeight: this.containerFontWeight,
          };
        },
        external_containerFont: function () {
          return {
            fontFamily: this.external_containerFontFamily,
            fontSize: this.external_containerFontSize,
            fontWeight: this.external_containerFontWeight,
          };
        },
        container_dbFont: function () {
          return {
            fontFamily: this.container_dbFontFamily,
            fontSize: this.container_dbFontSize,
            fontWeight: this.container_dbFontWeight,
          };
        },
        external_container_dbFont: function () {
          return {
            fontFamily: this.external_container_dbFontFamily,
            fontSize: this.external_container_dbFontSize,
            fontWeight: this.external_container_dbFontWeight,
          };
        },
        container_queueFont: function () {
          return {
            fontFamily: this.container_queueFontFamily,
            fontSize: this.container_queueFontSize,
            fontWeight: this.container_queueFontWeight,
          };
        },
        external_container_queueFont: function () {
          return {
            fontFamily: this.external_container_queueFontFamily,
            fontSize: this.external_container_queueFontSize,
            fontWeight: this.external_container_queueFontWeight,
          };
        },
        componentFont: function () {
          return {
            fontFamily: this.componentFontFamily,
            fontSize: this.componentFontSize,
            fontWeight: this.componentFontWeight,
          };
        },
        external_componentFont: function () {
          return {
            fontFamily: this.external_componentFontFamily,
            fontSize: this.external_componentFontSize,
            fontWeight: this.external_componentFontWeight,
          };
        },
        component_dbFont: function () {
          return {
            fontFamily: this.component_dbFontFamily,
            fontSize: this.component_dbFontSize,
            fontWeight: this.component_dbFontWeight,
          };
        },
        external_component_dbFont: function () {
          return {
            fontFamily: this.external_component_dbFontFamily,
            fontSize: this.external_component_dbFontSize,
            fontWeight: this.external_component_dbFontWeight,
          };
        },
        component_queueFont: function () {
          return {
            fontFamily: this.component_queueFontFamily,
            fontSize: this.component_queueFontSize,
            fontWeight: this.component_queueFontWeight,
          };
        },
        external_component_queueFont: function () {
          return {
            fontFamily: this.external_component_queueFontFamily,
            fontSize: this.external_component_queueFontSize,
            fontWeight: this.external_component_queueFontWeight,
          };
        },
        boundaryFont: function () {
          return {
            fontFamily: this.boundaryFontFamily,
            fontSize: this.boundaryFontSize,
            fontWeight: this.boundaryFontWeight,
          };
        },
        messageFont: function () {
          return {
            fontFamily: this.messageFontFamily,
            fontSize: this.messageFontSize,
            fontWeight: this.messageFontWeight,
          };
        },
      },
      pie: { ...fi.pie, useWidth: 984 },
      requirement: { ...fi.requirement, useWidth: void 0 },
      gitGraph: { ...fi.gitGraph, useMaxWidth: !1 },
      sankey: { ...fi.sankey, useMaxWidth: !1 },
    }),
      (RO = (t, e = '') =>
        Object.keys(t).reduce(
          (r, n) =>
            Array.isArray(t[n])
              ? r
              : typeof t[n] == 'object' && t[n] !== null
              ? [...r, e + n, ...RO(t[n], '')]
              : [...r, e + n],
          []
        )),
      (NO = new Set(RO(OO, ''))),
      (FO = OO);
  });
var MO = kd((fy, hy) => {
  (function (t, e) {
    typeof fy == 'object' && typeof hy < 'u'
      ? (hy.exports = e())
      : typeof define == 'function' && define.amd
      ? define(e)
      : ((t = typeof globalThis < 'u' ? globalThis : t || self).dayjs = e());
  })(fy, function () {
    'use strict';
    var t = 1e3,
      e = 6e4,
      r = 36e5,
      n = 'millisecond',
      i = 'second',
      o = 'minute',
      a = 'hour',
      s = 'day',
      l = 'week',
      c = 'month',
      u = 'quarter',
      h = 'year',
      p = 'date',
      d = 'Invalid Date',
      m =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      g =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      E = {
        name: 'en',
        weekdays:
          'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months:
          'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
          ),
        ordinal: function (R) {
          var L = ['th', 'st', 'nd', 'rd'],
            v = R % 100;
          return '[' + R + (L[(v - 20) % 10] || L[v] || L[0]) + ']';
        },
      },
      y = function (R, L, v) {
        var U = String(R);
        return !U || U.length >= L
          ? R
          : '' + Array(L + 1 - U.length).join(v) + R;
      },
      T = {
        s: y,
        z: function (R) {
          var L = -R.utcOffset(),
            v = Math.abs(L),
            U = Math.floor(v / 60),
            M = v % 60;
          return (L <= 0 ? '+' : '-') + y(U, 2, '0') + ':' + y(M, 2, '0');
        },
        m: function R(L, v) {
          if (L.date() < v.date()) return -R(v, L);
          var U = 12 * (v.year() - L.year()) + (v.month() - L.month()),
            M = L.clone().add(U, c),
            H = v - M < 0,
            j = L.clone().add(U + (H ? -1 : 1), c);
          return +(-(U + (v - M) / (H ? M - j : j - M)) || 0);
        },
        a: function (R) {
          return R < 0 ? Math.ceil(R) || 0 : Math.floor(R);
        },
        p: function (R) {
          return (
            { M: c, y: h, w: l, d: s, D: p, h: a, m: o, s: i, ms: n, Q: u }[
              R
            ] ||
            String(R || '')
              .toLowerCase()
              .replace(/s$/, '')
          );
        },
        u: function (R) {
          return R === void 0;
        },
      },
      b = 'en',
      N = {};
    N[b] = E;
    var I = function (R) {
        return R instanceof J;
      },
      A = function R(L, v, U) {
        var M;
        if (!L) return b;
        if (typeof L == 'string') {
          var H = L.toLowerCase();
          N[H] && (M = H), v && ((N[H] = v), (M = H));
          var j = L.split('-');
          if (!M && j.length > 1) return R(j[0]);
        } else {
          var it = L.name;
          (N[it] = L), (M = it);
        }
        return !U && M && (b = M), M || (!U && b);
      },
      O = function (R, L) {
        if (I(R)) return R.clone();
        var v = typeof L == 'object' ? L : {};
        return (v.date = R), (v.args = arguments), new J(v);
      },
      D = T;
    (D.l = A),
      (D.i = I),
      (D.w = function (R, L) {
        return O(R, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
      });
    var J = (function () {
        function R(v) {
          (this.$L = A(v.locale, null, !0)), this.parse(v);
        }
        var L = R.prototype;
        return (
          (L.parse = function (v) {
            (this.$d = (function (U) {
              var M = U.date,
                H = U.utc;
              if (M === null) return new Date(NaN);
              if (D.u(M)) return new Date();
              if (M instanceof Date) return new Date(M);
              if (typeof M == 'string' && !/Z$/i.test(M)) {
                var j = M.match(m);
                if (j) {
                  var it = j[2] - 1 || 0,
                    ht = (j[7] || '0').substring(0, 3);
                  return H
                    ? new Date(
                        Date.UTC(
                          j[1],
                          it,
                          j[3] || 1,
                          j[4] || 0,
                          j[5] || 0,
                          j[6] || 0,
                          ht
                        )
                      )
                    : new Date(
                        j[1],
                        it,
                        j[3] || 1,
                        j[4] || 0,
                        j[5] || 0,
                        j[6] || 0,
                        ht
                      );
                }
              }
              return new Date(M);
            })(v)),
              (this.$x = v.x || {}),
              this.init();
          }),
          (L.init = function () {
            var v = this.$d;
            (this.$y = v.getFullYear()),
              (this.$M = v.getMonth()),
              (this.$D = v.getDate()),
              (this.$W = v.getDay()),
              (this.$H = v.getHours()),
              (this.$m = v.getMinutes()),
              (this.$s = v.getSeconds()),
              (this.$ms = v.getMilliseconds());
          }),
          (L.$utils = function () {
            return D;
          }),
          (L.isValid = function () {
            return this.$d.toString() !== d;
          }),
          (L.isSame = function (v, U) {
            var M = O(v);
            return this.startOf(U) <= M && M <= this.endOf(U);
          }),
          (L.isAfter = function (v, U) {
            return O(v) < this.startOf(U);
          }),
          (L.isBefore = function (v, U) {
            return this.endOf(U) < O(v);
          }),
          (L.$g = function (v, U, M) {
            return D.u(v) ? this[U] : this.set(M, v);
          }),
          (L.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (L.valueOf = function () {
            return this.$d.getTime();
          }),
          (L.startOf = function (v, U) {
            var M = this,
              H = !!D.u(U) || U,
              j = D.p(v),
              it = function (Fe, bt) {
                var gt = D.w(
                  M.$u ? Date.UTC(M.$y, bt, Fe) : new Date(M.$y, bt, Fe),
                  M
                );
                return H ? gt : gt.endOf(s);
              },
              ht = function (Fe, bt) {
                return D.w(
                  M.toDate()[Fe].apply(
                    M.toDate('s'),
                    (H ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(bt)
                  ),
                  M
                );
              },
              x = this.$W,
              Et = this.$M,
              Xt = this.$D,
              _ = 'set' + (this.$u ? 'UTC' : '');
            switch (j) {
              case h:
                return H ? it(1, 0) : it(31, 11);
              case c:
                return H ? it(1, Et) : it(0, Et + 1);
              case l:
                var qt = this.$locale().weekStart || 0,
                  Pt = (x < qt ? x + 7 : x) - qt;
                return it(H ? Xt - Pt : Xt + (6 - Pt), Et);
              case s:
              case p:
                return ht(_ + 'Hours', 0);
              case a:
                return ht(_ + 'Minutes', 1);
              case o:
                return ht(_ + 'Seconds', 2);
              case i:
                return ht(_ + 'Milliseconds', 3);
              default:
                return this.clone();
            }
          }),
          (L.endOf = function (v) {
            return this.startOf(v, !1);
          }),
          (L.$set = function (v, U) {
            var M,
              H = D.p(v),
              j = 'set' + (this.$u ? 'UTC' : ''),
              it = ((M = {}),
              (M[s] = j + 'Date'),
              (M[p] = j + 'Date'),
              (M[c] = j + 'Month'),
              (M[h] = j + 'FullYear'),
              (M[a] = j + 'Hours'),
              (M[o] = j + 'Minutes'),
              (M[i] = j + 'Seconds'),
              (M[n] = j + 'Milliseconds'),
              M)[H],
              ht = H === s ? this.$D + (U - this.$W) : U;
            if (H === c || H === h) {
              var x = this.clone().set(p, 1);
              x.$d[it](ht),
                x.init(),
                (this.$d = x.set(p, Math.min(this.$D, x.daysInMonth())).$d);
            } else it && this.$d[it](ht);
            return this.init(), this;
          }),
          (L.set = function (v, U) {
            return this.clone().$set(v, U);
          }),
          (L.get = function (v) {
            return this[D.p(v)]();
          }),
          (L.add = function (v, U) {
            var M,
              H = this;
            v = Number(v);
            var j = D.p(U),
              it = function (Et) {
                var Xt = O(H);
                return D.w(Xt.date(Xt.date() + Math.round(Et * v)), H);
              };
            if (j === c) return this.set(c, this.$M + v);
            if (j === h) return this.set(h, this.$y + v);
            if (j === s) return it(1);
            if (j === l) return it(7);
            var ht = ((M = {}), (M[o] = e), (M[a] = r), (M[i] = t), M)[j] || 1,
              x = this.$d.getTime() + v * ht;
            return D.w(x, this);
          }),
          (L.subtract = function (v, U) {
            return this.add(-1 * v, U);
          }),
          (L.format = function (v) {
            var U = this,
              M = this.$locale();
            if (!this.isValid()) return M.invalidDate || d;
            var H = v || 'YYYY-MM-DDTHH:mm:ssZ',
              j = D.z(this),
              it = this.$H,
              ht = this.$m,
              x = this.$M,
              Et = M.weekdays,
              Xt = M.months,
              _ = function (bt, gt, G, X) {
                return (bt && (bt[gt] || bt(U, H))) || G[gt].slice(0, X);
              },
              qt = function (bt) {
                return D.s(it % 12 || 12, bt, '0');
              },
              Pt =
                M.meridiem ||
                function (bt, gt, G) {
                  var X = bt < 12 ? 'AM' : 'PM';
                  return G ? X.toLowerCase() : X;
                },
              Fe = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: x + 1,
                MM: D.s(x + 1, 2, '0'),
                MMM: _(M.monthsShort, x, Xt, 3),
                MMMM: _(Xt, x),
                D: this.$D,
                DD: D.s(this.$D, 2, '0'),
                d: String(this.$W),
                dd: _(M.weekdaysMin, this.$W, Et, 2),
                ddd: _(M.weekdaysShort, this.$W, Et, 3),
                dddd: Et[this.$W],
                H: String(it),
                HH: D.s(it, 2, '0'),
                h: qt(1),
                hh: qt(2),
                a: Pt(it, ht, !0),
                A: Pt(it, ht, !1),
                m: String(ht),
                mm: D.s(ht, 2, '0'),
                s: String(this.$s),
                ss: D.s(this.$s, 2, '0'),
                SSS: D.s(this.$ms, 3, '0'),
                Z: j,
              };
            return H.replace(g, function (bt, gt) {
              return gt || Fe[bt] || j.replace(':', '');
            });
          }),
          (L.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (L.diff = function (v, U, M) {
            var H,
              j = D.p(U),
              it = O(v),
              ht = (it.utcOffset() - this.utcOffset()) * e,
              x = this - it,
              Et = D.m(this, it);
            return (
              (Et =
                ((H = {}),
                (H[h] = Et / 12),
                (H[c] = Et),
                (H[u] = Et / 3),
                (H[l] = (x - ht) / 6048e5),
                (H[s] = (x - ht) / 864e5),
                (H[a] = x / r),
                (H[o] = x / e),
                (H[i] = x / t),
                H)[j] || x),
              M ? Et : D.a(Et)
            );
          }),
          (L.daysInMonth = function () {
            return this.endOf(c).$D;
          }),
          (L.$locale = function () {
            return N[this.$L];
          }),
          (L.locale = function (v, U) {
            if (!v) return this.$L;
            var M = this.clone(),
              H = A(v, U, !0);
            return H && (M.$L = H), M;
          }),
          (L.clone = function () {
            return D.w(this.$d, this);
          }),
          (L.toDate = function () {
            return new Date(this.valueOf());
          }),
          (L.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (L.toISOString = function () {
            return this.$d.toISOString();
          }),
          (L.toString = function () {
            return this.$d.toUTCString();
          }),
          R
        );
      })(),
      st = J.prototype;
    return (
      (O.prototype = st),
      [
        ['$ms', n],
        ['$s', i],
        ['$m', o],
        ['$H', a],
        ['$W', s],
        ['$M', c],
        ['$y', h],
        ['$D', p],
      ].forEach(function (R) {
        st[R[1]] = function (L) {
          return this.$g(L, R[0], R[1]);
        };
      }),
      (O.extend = function (R, L) {
        return R.$i || (R(L, J, O), (R.$i = !0)), O;
      }),
      (O.locale = A),
      (O.isDayjs = I),
      (O.unix = function (R) {
        return O(1e3 * R);
      }),
      (O.en = N[b]),
      (O.Ls = N),
      (O.p = {}),
      O
    );
  });
});
var BO,
  hi,
  k,
  fc,
  nn,
  xe = f(() => {
    'use strict';
    (BO = Gc(MO(), 1)),
      (hi = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, fatal: 5 }),
      (k = {
        trace: (...t) => {},
        debug: (...t) => {},
        info: (...t) => {},
        warn: (...t) => {},
        error: (...t) => {},
        fatal: (...t) => {},
      }),
      (fc = function (t = 'fatal') {
        let e = hi.fatal;
        typeof t == 'string'
          ? ((t = t.toLowerCase()), t in hi && (e = hi[t]))
          : typeof t == 'number' && (e = t),
          (k.trace = () => {}),
          (k.debug = () => {}),
          (k.info = () => {}),
          (k.warn = () => {}),
          (k.error = () => {}),
          (k.fatal = () => {}),
          e <= hi.fatal &&
            (k.fatal = console.error
              ? console.error.bind(console, nn('FATAL'), 'color: orange')
              : console.log.bind(console, '\x1B[35m', nn('FATAL'))),
          e <= hi.error &&
            (k.error = console.error
              ? console.error.bind(console, nn('ERROR'), 'color: orange')
              : console.log.bind(console, '\x1B[31m', nn('ERROR'))),
          e <= hi.warn &&
            (k.warn = console.warn
              ? console.warn.bind(console, nn('WARN'), 'color: orange')
              : console.log.bind(console, '\x1B[33m', nn('WARN'))),
          e <= hi.info &&
            (k.info = console.info
              ? console.info.bind(console, nn('INFO'), 'color: lightblue')
              : console.log.bind(console, '\x1B[34m', nn('INFO'))),
          e <= hi.debug &&
            (k.debug = console.debug
              ? console.debug.bind(console, nn('DEBUG'), 'color: lightgreen')
              : console.log.bind(console, '\x1B[32m', nn('DEBUG'))),
          e <= hi.trace &&
            (k.trace = console.debug
              ? console.debug.bind(console, nn('TRACE'), 'color: lightgreen')
              : console.log.bind(console, '\x1B[32m', nn('TRACE')));
      }),
      (nn = (t) => `%c${(0, BO.default)().format('ss.SSS')} : ${t} : `);
  });
var ds,
  SG,
  py = f(() => {
    'use strict';
    uy();
    xe();
    (ds = (t) => {
      if (
        (k.debug('sanitizeDirective called with', t),
        !(typeof t != 'object' || t == null))
      ) {
        if (Array.isArray(t)) {
          t.forEach((e) => ds(e));
          return;
        }
        for (let e of Object.keys(t)) {
          if (
            (k.debug('Checking key', e),
            e.startsWith('__') ||
              e.includes('proto') ||
              e.includes('constr') ||
              !NO.has(e) ||
              t[e] == null)
          ) {
            k.debug('sanitize deleting key: ', e), delete t[e];
            continue;
          }
          if (typeof t[e] == 'object') {
            k.debug('sanitizing object', e), ds(t[e]);
            continue;
          }
          let r = ['themeCSS', 'fontFamily', 'altFontFamily'];
          for (let n of r)
            e.includes(n) &&
              (k.debug('sanitizing css option', e), (t[e] = SG(t[e])));
        }
        if (t.themeVariables)
          for (let e of Object.keys(t.themeVariables)) {
            let r = t.themeVariables[e];
            r?.match &&
              !r.match(/^[\d "#%(),.;A-Za-z]+$/) &&
              (t.themeVariables[e] = '');
          }
        k.debug('After sanitization', t);
      }
    }),
      (SG = (t) => {
        let e = 0,
          r = 0;
        for (let n of t) {
          if (e < r) return '{ /* ERROR: Unbalanced CSS */ }';
          n === '{' ? e++ : n === '}' && r++;
        }
        return e !== r ? '{ /* ERROR: Unbalanced CSS */ }' : t;
      });
  });
var qh,
  Ho,
  PO,
  Hh = f(() => {
    'use strict';
    (qh = /^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s),
      (Ho =
        /%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi),
      (PO = /\s*%%.*\n/gm);
  });
var ms,
  dy = f(() => {
    'use strict';
    ms = class extends Error {
      constructor(e) {
        super(e), (this.name = 'UnknownDiagramError');
      }
    };
  });
var Gh,
  hc,
  DO,
  my,
  UO,
  pc = f(() => {
    'use strict';
    xe();
    Hh();
    dy();
    (Gh = {}),
      (hc = function (t, e) {
        t = t
          .replace(qh, '')
          .replace(Ho, '')
          .replace(
            PO,
            `
`
          );
        for (let [r, { detector: n }] of Object.entries(Gh))
          if (n(t, e)) return r;
        throw new ms(
          `No diagram type detected matching given configuration for text: ${t}`
        );
      }),
      (DO = (...t) => {
        for (let { id: e, detector: r, loader: n } of t) my(e, r, n);
      }),
      (my = (t, e, r) => {
        Gh[t]
          ? k.error(`Detector with key ${t} already exists`)
          : (Gh[t] = { detector: e, loader: r }),
          k.debug(`Detector with key ${t} added${r ? ' with loader' : ''}`);
      }),
      (UO = (t) => Gh[t].loader);
  });
var gy,
  qe,
  xy = f(() => {
    'use strict';
    (gy = (t, e, { depth: r = 2, clobber: n = !1 } = {}) => {
      let i = { depth: r, clobber: n };
      return Array.isArray(e) && !Array.isArray(t)
        ? (e.forEach((o) => gy(t, o, i)), t)
        : Array.isArray(e) && Array.isArray(t)
        ? (e.forEach((o) => {
            t.includes(o) || t.push(o);
          }),
          t)
        : t === void 0 || r <= 0
        ? t != null && typeof t == 'object' && typeof e == 'object'
          ? Object.assign(t, e)
          : e
        : (e !== void 0 &&
            typeof t == 'object' &&
            typeof e == 'object' &&
            Object.keys(e).forEach((o) => {
              typeof e[o] == 'object' &&
              (t[o] === void 0 || typeof t[o] == 'object')
                ? (t[o] === void 0 && (t[o] = Array.isArray(e[o]) ? [] : {}),
                  (t[o] = gy(t[o], e[o], { depth: r - 1, clobber: n })))
                : (n || (typeof t[o] != 'object' && typeof e[o] != 'object')) &&
                  (t[o] = e[o]);
            }),
          t);
    }),
      (qe = gy);
  });
function dc(t, e) {
  if (!t) return e;
  let r = `curve${t.charAt(0).toUpperCase() + t.slice(1)}`;
  return AG[r] ?? e;
}
function RG(t, e) {
  let r = t.trim();
  if (r) return e.securityLevel !== 'loose' ? (0, WO.sanitizeUrl)(r) : r;
}
function GO(t, e) {
  return !t || !e
    ? 0
    : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function FG(t) {
  let e,
    r = 0;
  t.forEach((i) => {
    (r += GO(i, e)), (e = i);
  });
  let n = r / 2;
  return by(t, n);
}
function MG(t) {
  return t.length === 1 ? t[0] : FG(t);
}
function PG(t, e, r) {
  let n = structuredClone(r);
  k.info('our points', n),
    e !== 'start_left' && e !== 'start_right' && n.reverse();
  let i = 25 + t,
    o = by(n, i),
    a = 10 + t * 0.5,
    s = Math.atan2(n[0].y - o.y, n[0].x - o.x),
    l = { x: 0, y: 0 };
  return (
    e === 'start_left'
      ? ((l.x = Math.sin(s + Math.PI) * a + (n[0].x + o.x) / 2),
        (l.y = -Math.cos(s + Math.PI) * a + (n[0].y + o.y) / 2))
      : e === 'end_right'
      ? ((l.x = Math.sin(s - Math.PI) * a + (n[0].x + o.x) / 2 - 5),
        (l.y = -Math.cos(s - Math.PI) * a + (n[0].y + o.y) / 2 - 5))
      : e === 'end_left'
      ? ((l.x = Math.sin(s) * a + (n[0].x + o.x) / 2 - 5),
        (l.y = -Math.cos(s) * a + (n[0].y + o.y) / 2 - 5))
      : ((l.x = Math.sin(s) * a + (n[0].x + o.x) / 2),
        (l.y = -Math.cos(s) * a + (n[0].y + o.y) / 2)),
    l
  );
}
function mc(t) {
  let e = '',
    r = '';
  for (let n of t)
    n !== void 0 &&
      (n.startsWith('color:') || n.startsWith('text-align:')
        ? (r = r + n + ';')
        : (e = e + n + ';'));
  return { style: e, labelStyle: r };
}
function UG(t) {
  let e = '',
    r = '0123456789abcdef',
    n = r.length;
  for (let i = 0; i < t; i++) e += r.charAt(Math.floor(Math.random() * n));
  return e;
}
function GG(t, e) {
  return _y(t, e).height;
}
function Yh(t, e) {
  return _y(t, e).width;
}
function Ty(t, e) {
  return Ii({}, t, e);
}
var WO,
  vG,
  AG,
  LG,
  IG,
  qO,
  HO,
  OG,
  NG,
  zO,
  by,
  BG,
  $O,
  DG,
  zG,
  $G,
  WG,
  qG,
  HG,
  _y,
  yy,
  jh,
  jG,
  YG,
  Cy,
  ur,
  gs = f(() => {
    'use strict';
    WO = Gc(W2(), 1);
    gn();
    en();
    py();
    xe();
    pc();
    xy();
    Gd();
    Lm();
    Hh();
    (vG = '\u200B'),
      (AG = {
        curveBasis: rc,
        curveBasisClosed: Sx,
        curveBasisOpen: vx,
        curveBumpX: Ex,
        curveBumpY: wx,
        curveBundle: Ax,
        curveCardinalClosed: Ix,
        curveCardinalOpen: Rx,
        curveCardinal: Lx,
        curveCatmullRomClosed: Mx,
        curveCatmullRomOpen: Bx,
        curveCatmullRom: Fx,
        curveLinear: si,
        curveLinearClosed: Px,
        curveMonotoneX: Ux,
        curveMonotoneY: zx,
        curveNatural: $x,
        curveStep: Wx,
        curveStepAfter: Hx,
        curveStepBefore: qx,
      }),
      (LG =
        /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi),
      (IG = function (t, e) {
        let r = qO(t, /(?:init\b)|(?:initialize\b)/),
          n = {};
        if (Array.isArray(r)) {
          let a = r.map((s) => s.args);
          ds(a), (n = qe(n, [...a]));
        } else n = r.args;
        if (!n) return;
        let i = hc(t, e),
          o = 'config';
        return (
          n[o] !== void 0 &&
            (i === 'flowchart-v2' && (i = 'flowchart'),
            (n[i] = n[o]),
            delete n[o]),
          n
        );
      }),
      (qO = function (t, e = null) {
        try {
          let r = new RegExp(
            `[%]{2}(?![{]${LG.source})(?=[}][%]{2}).*
`,
            'ig'
          );
          (t = t.trim().replace(r, '').replace(/'/gm, '"')),
            k.debug(
              `Detecting diagram directive${
                e !== null ? ' type:' + e : ''
              } based on the text:${t}`
            );
          let n,
            i = [];
          for (; (n = Ho.exec(t)) !== null; )
            if (
              (n.index === Ho.lastIndex && Ho.lastIndex++,
              (n && !e) ||
                (e && n[1] && n[1].match(e)) ||
                (e && n[2] && n[2].match(e)))
            ) {
              let o = n[1] ? n[1] : n[2],
                a = n[3] ? n[3].trim() : n[4] ? JSON.parse(n[4].trim()) : null;
              i.push({ type: o, args: a });
            }
          return i.length === 0
            ? { type: t, args: null }
            : i.length === 1
            ? i[0]
            : i;
        } catch (r) {
          return (
            k.error(
              `ERROR: ${r.message} - Unable to parse directive type: '${e}' based on the text: '${t}'`
            ),
            { type: void 0, args: null }
          );
        }
      }),
      (HO = function (t) {
        return t.replace(Ho, '');
      }),
      (OG = function (t, e) {
        for (let [r, n] of e.entries()) if (n.match(t)) return r;
        return -1;
      });
    NG = (t, ...e) => {
      let r = t.split('.'),
        n = r.length - 1,
        i = r[n],
        o = window;
      for (let a = 0; a < n; a++)
        if (((o = o[r[a]]), !o)) {
          k.error(`Function name: ${t} not found in window`);
          return;
        }
      o[i](...e);
    };
    (zO = (t, e = 2) => {
      let r = Math.pow(10, e);
      return Math.round(t * r) / r;
    }),
      (by = (t, e) => {
        let r,
          n = e;
        for (let i of t) {
          if (r) {
            let o = GO(i, r);
            if (o < n) n -= o;
            else {
              let a = n / o;
              if (a <= 0) return r;
              if (a >= 1) return { x: i.x, y: i.y };
              if (a > 0 && a < 1)
                return {
                  x: zO((1 - a) * r.x + a * i.x, 5),
                  y: zO((1 - a) * r.y + a * i.y, 5),
                };
            }
          }
          r = i;
        }
        throw new Error(
          'Could not find a suitable point for the given distance'
        );
      }),
      (BG = (t, e, r) => {
        k.info(`our points ${JSON.stringify(e)}`),
          e[0] !== r && (e = e.reverse());
        let i = by(e, 25),
          o = t ? 10 : 5,
          a = Math.atan2(e[0].y - i.y, e[0].x - i.x),
          s = { x: 0, y: 0 };
        return (
          (s.x = Math.sin(a) * o + (e[0].x + i.x) / 2),
          (s.y = -Math.cos(a) * o + (e[0].y + i.y) / 2),
          s
        );
      });
    ($O = 0),
      (DG = () => (
        $O++, 'id-' + Math.random().toString(36).substr(2, 12) + '-' + $O
      ));
    (zG = (t) => UG(t.length)),
      ($G = function () {
        return {
          x: 0,
          y: 0,
          fill: void 0,
          anchor: 'start',
          style: '#666',
          width: 100,
          height: 100,
          textMargin: 0,
          rx: 0,
          ry: 0,
          valign: void 0,
          text: '',
        };
      }),
      (WG = function (t, e) {
        let r = e.text.replace(li.lineBreakRegex, ' '),
          [, n] = Cy(e.fontSize),
          i = t.append('text');
        i.attr('x', e.x),
          i.attr('y', e.y),
          i.style('text-anchor', e.anchor),
          i.style('font-family', e.fontFamily),
          i.style('font-size', n),
          i.style('font-weight', e.fontWeight),
          i.attr('fill', e.fill),
          e.class !== void 0 && i.attr('class', e.class);
        let o = i.append('tspan');
        return (
          o.attr('x', e.x + e.textMargin * 2),
          o.attr('fill', e.fill),
          o.text(r),
          i
        );
      }),
      (qG = Ea(
        (t, e, r) => {
          if (
            !t ||
            ((r = Object.assign(
              {
                fontSize: 12,
                fontWeight: 400,
                fontFamily: 'Arial',
                joinWith: '<br/>',
              },
              r
            )),
            li.lineBreakRegex.test(t))
          )
            return t;
          let n = t.split(' '),
            i = [],
            o = '';
          return (
            n.forEach((a, s) => {
              let l = Yh(`${a} `, r),
                c = Yh(o, r);
              if (l > e) {
                let { hyphenatedStrings: p, remainingWord: d } = HG(
                  a,
                  e,
                  '-',
                  r
                );
                i.push(o, ...p), (o = d);
              } else
                c + l >= e
                  ? (i.push(o), (o = a))
                  : (o = [o, a].filter(Boolean).join(' '));
              s + 1 === n.length && i.push(o);
            }),
            i.filter((a) => a !== '').join(r.joinWith)
          );
        },
        (t, e, r) =>
          `${t}${e}${r.fontSize}${r.fontWeight}${r.fontFamily}${r.joinWith}`
      )),
      (HG = Ea(
        (t, e, r = '-', n) => {
          n = Object.assign(
            { fontSize: 12, fontWeight: 400, fontFamily: 'Arial', margin: 0 },
            n
          );
          let i = [...t],
            o = [],
            a = '';
          return (
            i.forEach((s, l) => {
              let c = `${a}${s}`;
              if (Yh(c, n) >= e) {
                let h = l + 1,
                  p = i.length === h,
                  d = `${c}${r}`;
                o.push(p ? c : d), (a = '');
              } else a = c;
            }),
            { hyphenatedStrings: o, remainingWord: a }
          );
        },
        (t, e, r = '-', n) =>
          `${t}${e}${r}${n.fontSize}${n.fontWeight}${n.fontFamily}`
      ));
    (_y = Ea(
      (t, e) => {
        let {
          fontSize: r = 12,
          fontFamily: n = 'Arial',
          fontWeight: i = 400,
        } = e;
        if (!t) return { width: 0, height: 0 };
        let [, o] = Cy(r),
          a = ['sans-serif', n],
          s = t.split(li.lineBreakRegex),
          l = [],
          c = ft('body');
        if (!c.remove) return { width: 0, height: 0, lineHeight: 0 };
        let u = c.append('svg');
        for (let p of a) {
          let d = 0,
            m = { width: 0, height: 0, lineHeight: 0 };
          for (let g of s) {
            let E = $G();
            E.text = g || vG;
            let y = WG(u, E)
                .style('font-size', o)
                .style('font-weight', i)
                .style('font-family', p),
              T = (y._groups || y)[0][0].getBBox();
            if (T.width === 0 && T.height === 0)
              throw new Error('svg element not in render tree');
            (m.width = Math.round(Math.max(m.width, T.width))),
              (d = Math.round(T.height)),
              (m.height += d),
              (m.lineHeight = Math.round(Math.max(m.lineHeight, d)));
          }
          l.push(m);
        }
        u.remove();
        let h =
          isNaN(l[1].height) ||
          isNaN(l[1].width) ||
          isNaN(l[1].lineHeight) ||
          (l[0].height > l[1].height &&
            l[0].width > l[1].width &&
            l[0].lineHeight > l[1].lineHeight)
            ? 0
            : 1;
        return l[h];
      },
      (t, e) => `${t}${e.fontSize}${e.fontWeight}${e.fontFamily}`
    )),
      (yy = class {
        constructor(e = !1, r) {
          this.count = 0;
          (this.count = r ? r.length : 0),
            (this.next = e ? () => this.count++ : () => Date.now());
        }
      }),
      (jG = function (t) {
        return (
          (jh = jh || document.createElement('div')),
          (t = escape(t)
            .replace(/%26/g, '&')
            .replace(/%23/g, '#')
            .replace(/%3B/g, ';')),
          (jh.innerHTML = t),
          unescape(jh.textContent)
        );
      }),
      (YG = (t, e, r, n) => {
        if (!n) return;
        let i = t.node()?.getBBox();
        i &&
          t
            .append('text')
            .text(n)
            .attr('x', i.x + i.width / 2)
            .attr('y', -r)
            .attr('class', e);
      }),
      (Cy = (t) => {
        if (typeof t == 'number') return [t, t + 'px'];
        let e = parseInt(t ?? '', 10);
        return Number.isNaN(e)
          ? [void 0, void 0]
          : t === String(e)
          ? [e, t + 'px']
          : [e, t];
      });
    ur = {
      assignWithDepth: qe,
      wrapLabel: qG,
      calculateTextHeight: GG,
      calculateTextWidth: Yh,
      calculateTextDimensions: _y,
      cleanAndMerge: Ty,
      detectInit: IG,
      detectDirective: qO,
      isSubstringInArray: OG,
      interpolateToCurve: dc,
      calcLabelPosition: MG,
      calcCardinalityPosition: BG,
      calcTerminalLabelPosition: PG,
      formatUrl: RG,
      getStylesFromArray: mc,
      generateId: DG,
      random: zG,
      runFunc: NG,
      entityDecode: jG,
      insertTitle: YG,
      parseFontSize: Cy,
      InitIDGenerator: yy,
    };
  });
var Gi,
  vr,
  YO,
  xs,
  gc,
  Vh,
  VO,
  XO,
  KO,
  ky,
  ZO,
  rt,
  QO,
  JO,
  xc,
  VG,
  jO,
  XG,
  tR,
  Ar = f(() => {
    'use strict';
    xy();
    xe();
    Wh();
    uy();
    py();
    (Gi = Object.freeze(FO)),
      (vr = qe({}, Gi)),
      (xs = []),
      (gc = qe({}, Gi)),
      (Vh = (t, e) => {
        let r = qe({}, t),
          n = {};
        for (let i of e) QO(i), (n = qe(n, i));
        if (((r = qe(r, n)), n.theme && n.theme in rn)) {
          let i = qe({}, YO),
            o = qe(i.themeVariables || {}, n.themeVariables);
          r.theme &&
            r.theme in rn &&
            (r.themeVariables = rn[r.theme].getThemeVariables(o));
        }
        return (gc = r), tR(gc), gc;
      }),
      (VO = (t) => (
        (vr = qe({}, Gi)),
        (vr = qe(vr, t)),
        t.theme &&
          rn[t.theme] &&
          (vr.themeVariables = rn[t.theme].getThemeVariables(t.themeVariables)),
        Vh(vr, xs),
        vr
      )),
      (XO = (t) => {
        YO = qe({}, t);
      }),
      (KO = (t) => ((vr = qe(vr, t)), Vh(vr, xs), vr)),
      (ky = () => qe({}, vr)),
      (ZO = (t) => (tR(t), qe(gc, t), rt())),
      (rt = () => qe({}, gc)),
      (QO = (t) => {
        t &&
          (['secure', ...(vr.secure ?? [])].forEach((e) => {
            Object.hasOwn(t, e) &&
              (k.debug(`Denied attempt to modify a secure key ${e}`, t[e]),
              delete t[e]);
          }),
          Object.keys(t).forEach((e) => {
            e.startsWith('__') && delete t[e];
          }),
          Object.keys(t).forEach((e) => {
            typeof t[e] == 'string' &&
              (t[e].includes('<') ||
                t[e].includes('>') ||
                t[e].includes('url(data:')) &&
              delete t[e],
              typeof t[e] == 'object' && QO(t[e]);
          }));
      }),
      (JO = (t) => {
        ds(t),
          t.fontFamily &&
            (!t.themeVariables || !t.themeVariables.fontFamily) &&
            (t.themeVariables = { fontFamily: t.fontFamily }),
          xs.push(t),
          Vh(vr, xs);
      }),
      (xc = (t = vr) => {
        (xs = []), Vh(t, xs);
      }),
      (VG = {
        LAZY_LOAD_DEPRECATED:
          'The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.',
      }),
      (jO = {}),
      (XG = (t) => {
        jO[t] || (k.warn(VG[t]), (jO[t] = !0));
      }),
      (tR = (t) => {
        t &&
          (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) &&
          XG('LAZY_LOAD_DEPRECATED');
      });
  });
var By = {};
Ed(By, {
  clear: () => Ly,
  getAccDescription: () => Ny,
  getAccTitle: () => Oy,
  getDiagramTitle: () => My,
  setAccDescription: () => Ry,
  setAccTitle: () => Iy,
  setDiagramTitle: () => Fy,
});
var wy,
  Sy,
  vy,
  Ay,
  Ly,
  Iy,
  Oy,
  Ry,
  Ny,
  Fy,
  My,
  Py = f(() => {
    'use strict';
    en();
    Ar();
    (wy = ''),
      (Sy = ''),
      (vy = ''),
      (Ay = (t) => Pn(t, rt())),
      (Ly = () => {
        (wy = ''), (vy = ''), (Sy = '');
      }),
      (Iy = (t) => {
        wy = Ay(t).replace(/^\s+/g, '');
      }),
      (Oy = () => wy),
      (Ry = (t) => {
        vy = Ay(t).replace(
          /\n\s+/g,
          `
`
        );
      }),
      (Ny = () => vy),
      (Fy = (t) => {
        Sy = Ay(t);
      }),
      (My = () => Sy);
  });
var KG,
  eR,
  Uy,
  te,
  Go,
  ys,
  pi,
  Kh,
  Zh,
  Xh,
  Dy,
  on,
  Qh,
  Jh,
  tp,
  ep,
  ZG,
  QG,
  JG,
  tj,
  ej,
  rj,
  nj,
  zy,
  ij,
  oj,
  aj,
  sj,
  lj,
  cj,
  uj,
  fj,
  hj,
  pj,
  rR,
  dj,
  mj,
  gj,
  xj,
  yj,
  yc,
  nR,
  iR,
  bj,
  _j,
  Cj,
  Tj,
  kj,
  Ej,
  wj,
  Sj,
  oR,
  aR,
  vj,
  fr,
  $y = f(() => {
    'use strict';
    gn();
    gs();
    Ar();
    en();
    xe();
    Py();
    (KG = 'flowchart-'),
      (eR = 0),
      (Uy = rt()),
      (te = {}),
      (Go = []),
      (ys = {}),
      (pi = []),
      (Kh = {}),
      (Zh = {}),
      (Xh = 0),
      (Dy = !0),
      (Jh = []),
      (tp = (t) => li.sanitizeText(t, Uy)),
      (ep = function (t) {
        let e = Object.keys(te);
        for (let r of e) if (te[r].id === t) return te[r].domId;
        return t;
      }),
      (ZG = function (t, e, r, n, i, o, a = {}) {
        let s,
          l = t;
        l !== void 0 &&
          l.trim().length !== 0 &&
          (te[l] === void 0 &&
            (te[l] = {
              id: l,
              labelType: 'text',
              domId: KG + l + '-' + eR,
              styles: [],
              classes: [],
            }),
          eR++,
          e !== void 0
            ? ((Uy = rt()),
              (s = tp(e.text.trim())),
              (te[l].labelType = e.type),
              s[0] === '"' &&
                s[s.length - 1] === '"' &&
                (s = s.substring(1, s.length - 1)),
              (te[l].text = s))
            : te[l].text === void 0 && (te[l].text = t),
          r !== void 0 && (te[l].type = r),
          n?.forEach(function (c) {
            te[l].styles.push(c);
          }),
          i?.forEach(function (c) {
            te[l].classes.push(c);
          }),
          o !== void 0 && (te[l].dir = o),
          te[l].props === void 0
            ? (te[l].props = a)
            : a !== void 0 && Object.assign(te[l].props, a));
      }),
      (QG = function (t, e, r) {
        let o = { start: t, end: e, type: void 0, text: '', labelType: 'text' };
        k.info('abc78 Got edge...', o);
        let a = r.text;
        a !== void 0 &&
          ((o.text = tp(a.text.trim())),
          o.text[0] === '"' &&
            o.text[o.text.length - 1] === '"' &&
            (o.text = o.text.substring(1, o.text.length - 1)),
          (o.labelType = a.type)),
          r !== void 0 &&
            ((o.type = r.type), (o.stroke = r.stroke), (o.length = r.length)),
          Go.push(o);
      }),
      (JG = function (t, e, r) {
        k.info('addLink (abc78)', t, e, r);
        let n, i;
        for (n = 0; n < t.length; n++)
          for (i = 0; i < e.length; i++) QG(t[n], e[i], r);
      }),
      (tj = function (t, e) {
        t.forEach(function (r) {
          r === 'default'
            ? (Go.defaultInterpolate = e)
            : (Go[r].interpolate = e);
        });
      }),
      (ej = function (t, e) {
        t.forEach(function (r) {
          r === 'default'
            ? (Go.defaultStyle = e)
            : (ur.isSubstringInArray('fill', e) === -1 && e.push('fill:none'),
              (Go[r].style = e));
        });
      }),
      (rj = function (t, e) {
        t.split(',').forEach(function (r) {
          ys[r] === void 0 && (ys[r] = { id: r, styles: [], textStyles: [] }),
            e?.forEach(function (n) {
              if (n.match('color')) {
                let i = n.replace('fill', 'bgFill').replace('color', 'fill');
                ys[r].textStyles.push(i);
              }
              ys[r].styles.push(n);
            });
        });
      }),
      (nj = function (t) {
        (on = t),
          on.match(/.*</) && (on = 'RL'),
          on.match(/.*\^/) && (on = 'BT'),
          on.match(/.*>/) && (on = 'LR'),
          on.match(/.*v/) && (on = 'TB'),
          on === 'TD' && (on = 'TB');
      }),
      (zy = function (t, e) {
        t.split(',').forEach(function (r) {
          let n = r;
          te[n] !== void 0 && te[n].classes.push(e),
            Kh[n] !== void 0 && Kh[n].classes.push(e);
        });
      }),
      (ij = function (t, e) {
        t.split(',').forEach(function (r) {
          e !== void 0 && (Zh[Qh === 'gen-1' ? ep(r) : r] = tp(e));
        });
      }),
      (oj = function (t, e, r) {
        let n = ep(t);
        if (rt().securityLevel !== 'loose' || e === void 0) return;
        let i = [];
        if (typeof r == 'string') {
          i = r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          for (let o = 0; o < i.length; o++) {
            let a = i[o].trim();
            a.charAt(0) === '"' &&
              a.charAt(a.length - 1) === '"' &&
              (a = a.substr(1, a.length - 2)),
              (i[o] = a);
          }
        }
        i.length === 0 && i.push(t),
          te[t] !== void 0 &&
            ((te[t].haveCallback = !0),
            Jh.push(function () {
              let o = document.querySelector(`[id="${n}"]`);
              o !== null &&
                o.addEventListener(
                  'click',
                  function () {
                    ur.runFunc(e, ...i);
                  },
                  !1
                );
            }));
      }),
      (aj = function (t, e, r) {
        t.split(',').forEach(function (n) {
          te[n] !== void 0 &&
            ((te[n].link = ur.formatUrl(e, Uy)), (te[n].linkTarget = r));
        }),
          zy(t, 'clickable');
      }),
      (sj = function (t) {
        if (Zh.hasOwnProperty(t)) return Zh[t];
      }),
      (lj = function (t, e, r) {
        t.split(',').forEach(function (n) {
          oj(n, e, r);
        }),
          zy(t, 'clickable');
      }),
      (cj = function (t) {
        Jh.forEach(function (e) {
          e(t);
        });
      }),
      (uj = function () {
        return on.trim();
      }),
      (fj = function () {
        return te;
      }),
      (hj = function () {
        return Go;
      }),
      (pj = function () {
        return ys;
      }),
      (rR = function (t) {
        let e = ft('.mermaidTooltip');
        (e._groups || e)[0][0] === null &&
          (e = ft('body')
            .append('div')
            .attr('class', 'mermaidTooltip')
            .style('opacity', 0)),
          ft(t)
            .select('svg')
            .selectAll('g.node')
            .on('mouseover', function () {
              let i = ft(this);
              if (i.attr('title') === null) return;
              let a = this.getBoundingClientRect();
              e.transition().duration(200).style('opacity', '.9'),
                e
                  .text(i.attr('title'))
                  .style(
                    'left',
                    window.scrollX + a.left + (a.right - a.left) / 2 + 'px'
                  )
                  .style(
                    'top',
                    window.scrollY + a.top - 14 + document.body.scrollTop + 'px'
                  ),
                e.html(e.html().replace(/&lt;br\/&gt;/g, '<br/>')),
                i.classed('hover', !0);
            })
            .on('mouseout', function () {
              e.transition().duration(500).style('opacity', 0),
                ft(this).classed('hover', !1);
            });
      });
    Jh.push(rR);
    (dj = function (t = 'gen-1') {
      (te = {}),
        (ys = {}),
        (Go = []),
        (Jh = [rR]),
        (pi = []),
        (Kh = {}),
        (Xh = 0),
        (Zh = {}),
        (Dy = !0),
        (Qh = t),
        Ly();
    }),
      (mj = (t) => {
        Qh = t || 'gen-2';
      }),
      (gj = function () {
        return 'fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;';
      }),
      (xj = function (t, e, r) {
        let n = t.text.trim(),
          i = r.text;
        t === r && r.text.match(/\s/) && (n = void 0);
        function o(u) {
          let h = { boolean: {}, number: {}, string: {} },
            p = [],
            d;
          return {
            nodeList: u.filter(function (g) {
              let E = typeof g;
              return g.stmt && g.stmt === 'dir'
                ? ((d = g.value), !1)
                : g.trim() === ''
                ? !1
                : E in h
                ? h[E].hasOwnProperty(g)
                  ? !1
                  : (h[E][g] = !0)
                : p.includes(g)
                ? !1
                : p.push(g);
            }),
            dir: d,
          };
        }
        let a = [],
          { nodeList: s, dir: l } = o(a.concat.apply(a, e));
        if (((a = s), Qh === 'gen-1'))
          for (let u = 0; u < a.length; u++) a[u] = ep(a[u]);
        (n = n || 'subGraph' + Xh), (i = i || ''), (i = tp(i)), (Xh = Xh + 1);
        let c = {
          id: n,
          nodes: a,
          title: i.trim(),
          classes: [],
          dir: l,
          labelType: r.type,
        };
        return (
          k.info('Adding', c.id, c.nodes, c.dir),
          (c.nodes = aR(c, pi).nodes),
          pi.push(c),
          (Kh[n] = c),
          n
        );
      }),
      (yj = function (t) {
        for (let [e, r] of pi.entries()) if (r.id === t) return e;
        return -1;
      }),
      (yc = -1),
      (nR = []),
      (iR = function (t, e) {
        let r = pi[e].nodes;
        if (((yc = yc + 1), yc > 2e3)) return;
        if (((nR[yc] = e), pi[e].id === t)) return { result: !0, count: 0 };
        let n = 0,
          i = 1;
        for (; n < r.length; ) {
          let o = yj(r[n]);
          if (o >= 0) {
            let a = iR(t, o);
            if (a.result) return { result: !0, count: i + a.count };
            i = i + a.count;
          }
          n = n + 1;
        }
        return { result: !1, count: i };
      }),
      (bj = function (t) {
        return nR[t];
      }),
      (_j = function () {
        (yc = -1), pi.length > 0 && iR('none', pi.length - 1, 0);
      }),
      (Cj = function () {
        return pi;
      }),
      (Tj = () => (Dy ? ((Dy = !1), !0) : !1)),
      (kj = (t) => {
        let e = t.trim(),
          r = 'arrow_open';
        switch (e[0]) {
          case '<':
            (r = 'arrow_point'), (e = e.slice(1));
            break;
          case 'x':
            (r = 'arrow_cross'), (e = e.slice(1));
            break;
          case 'o':
            (r = 'arrow_circle'), (e = e.slice(1));
            break;
        }
        let n = 'normal';
        return (
          e.includes('=') && (n = 'thick'),
          e.includes('.') && (n = 'dotted'),
          { type: r, stroke: n }
        );
      }),
      (Ej = (t, e) => {
        let r = e.length,
          n = 0;
        for (let i = 0; i < r; ++i) e[i] === t && ++n;
        return n;
      }),
      (wj = (t) => {
        let e = t.trim(),
          r = e.slice(0, -1),
          n = 'arrow_open';
        switch (e.slice(-1)) {
          case 'x':
            (n = 'arrow_cross'),
              e[0] === 'x' && ((n = 'double_' + n), (r = r.slice(1)));
            break;
          case '>':
            (n = 'arrow_point'),
              e[0] === '<' && ((n = 'double_' + n), (r = r.slice(1)));
            break;
          case 'o':
            (n = 'arrow_circle'),
              e[0] === 'o' && ((n = 'double_' + n), (r = r.slice(1)));
            break;
        }
        let i = 'normal',
          o = r.length - 1;
        r[0] === '=' && (i = 'thick'), r[0] === '~' && (i = 'invisible');
        let a = Ej('.', r);
        return (
          a && ((i = 'dotted'), (o = a)), { type: n, stroke: i, length: o }
        );
      }),
      (Sj = (t, e) => {
        let r = wj(t),
          n;
        if (e) {
          if (((n = kj(e)), n.stroke !== r.stroke))
            return { type: 'INVALID', stroke: 'INVALID' };
          if (n.type === 'arrow_open') n.type = r.type;
          else {
            if (n.type !== r.type)
              return { type: 'INVALID', stroke: 'INVALID' };
            n.type = 'double_' + n.type;
          }
          return (
            n.type === 'double_arrow' && (n.type = 'double_arrow_point'),
            (n.length = r.length),
            n
          );
        }
        return r;
      }),
      (oR = (t, e) => {
        let r = !1;
        return (
          t.forEach((n) => {
            n.nodes.indexOf(e) >= 0 && (r = !0);
          }),
          r
        );
      }),
      (aR = (t, e) => {
        let r = [];
        return (
          t.nodes.forEach((n, i) => {
            oR(e, n) || r.push(t.nodes[i]);
          }),
          { nodes: r }
        );
      }),
      (vj = { firstGraph: Tj }),
      (fr = {
        defaultConfig: () => Gi.flowchart,
        setAccTitle: Iy,
        getAccTitle: Oy,
        getAccDescription: Ny,
        setAccDescription: Ry,
        addVertex: ZG,
        lookUpDomId: ep,
        addLink: JG,
        updateLinkInterpolate: tj,
        updateLink: ej,
        addClass: rj,
        setDirection: nj,
        setClass: zy,
        setTooltip: ij,
        getTooltip: sj,
        setClickEvent: lj,
        setLink: aj,
        bindFunctions: cj,
        getDirection: uj,
        getVertices: fj,
        getEdges: hj,
        getClasses: pj,
        clear: dj,
        setGen: mj,
        defaultStyle: gj,
        addSubGraph: xj,
        getDepthFirstPos: bj,
        indexNodes: _j,
        getSubGraphs: Cj,
        destructLink: Sj,
        lex: vj,
        exists: oR,
        makeUniq: aR,
        setDiagramTitle: Fy,
        getDiagramTitle: My,
      });
  });
var Wy,
  Aj,
  sR,
  Lj,
  lR,
  cR = f(() => {
    'use strict';
    ES();
    $y();
    (Wy = class extends Error {
      constructor(r, n) {
        super('Encountered errors while parsing text');
        this.parserErrors = r;
        this.lexerErrors = n;
        this.name = 'GrammarError';
      }
    }),
      (Aj = (t) => {
        let e = TS.tokenize(t);
        ns.input = e.tokens;
        let r = ns.diagram();
        if (ns.errors.length > 0 || e.errors.length > 0)
          throw new Wy(ns.errors, e.errors);
        let n = kS.visit(r);
        Lj(n);
      }),
      (sR = (t, e = !1) => {
        let r = t.label;
        e &&
          (console.log('type', t.dataType),
          (r +=
            `
` +
            (t.name.includes('_url_')
              ? `<a class='underline hover:text-main-light' href='${t.data}' target='_blank' rel='noopener noreferrer'>Click Here</a>`
              : t.data))),
          fr.addVertex(t.name, { text: r, type: 'lean_right' }, 'lean_right'),
          fr.setClass(t.name, 'conf_' + t.confidence);
      }),
      (Lj = (t) => {
        let e = { nodes: {}, edges: {} };
        fr.clear(),
          fr.setDirection('TB'),
          fr.addClass('conf_h', ['stroke:#1a8a0e', 'stroke-width:3px']),
          fr.addClass('conf_l', ['stroke:#bd0b11', 'stroke-width:3px']),
          fr.addClass('conf_m', ['stroke:#d47b06', 'stroke-width:3px']);
        let r = t.showData;
        for (let n of t.rows)
          if (n.type === 'startLink') {
            let { dataNodes: i, length: o } = n.data;
            if (i.length === 0)
              throw new Error('No data nodes found for start link');
            fr.addVertex('Start', { text: 'Start', type: 'circle' }, 'circle');
            for (let a of i) {
              if (e.nodes[a.name])
                throw new Error(`Duplicate data node ${a.name}`);
              (e.nodes[a.name] = {
                type: 'data',
                label: a.label,
                dataType: a.dataType,
                data: a.data,
              }),
                sR(a, r),
                fr.addLink(['Start'], [a.name], {
                  type: 'arrow_point',
                  length: o - 2,
                });
            }
          } else if (n.type === 'dataLink') {
            let { processNodes: i, dataNode: o, length: a } = n.data;
            if (!e.nodes[o]) throw new Error(`Data node ${o} not found`);
            if (i.length === 0)
              throw new Error(`No process nodes found for data node ${o}`);
            for (let s of i) {
              if (e.nodes[s.name])
                throw new Error(`Duplicate process node ${s.name}`);
              if (
                ((e.nodes[s.name] = {
                  type: 'process',
                  label: s.label,
                  description: s.description,
                }),
                fr.addVertex(
                  s.name,
                  { text: s.description, type: 'square' },
                  'square'
                ),
                e.edges[`${s.name}-${o}`])
              )
                throw new Error(`Duplicate edge ${s.name}-${o}`);
              (e.edges[`${s.name}-${o}`] = { parent: s.name, child: o }),
                fr.addLink([o], [s.name], {
                  type: 'arrow_point',
                  length: a - 2,
                });
            }
          } else if (n.type === 'processLink') {
            let { processNode: i, dataNodes: o, length: a } = n.data;
            if (!e.nodes[i]) throw new Error(`Process node ${i} not found`);
            if (o.length === 0)
              throw new Error(`No data nodes found for process node ${i}`);
            for (let s of o) {
              if (e.nodes[s.name])
                throw new Error(`Duplicate data node ${s.name}`);
              if (
                ((e.nodes[s.name] = {
                  type: 'data',
                  label: s.label,
                  dataType: s.dataType,
                  data: s.data,
                }),
                sR(s, r),
                e.edges[`${i}-${s.name}`])
              )
                throw new Error(`Duplicate edge ${i}-${s.name}`);
              (e.edges[`${i}-${s.name}`] = { parent: i, child: s.name }),
                fr.addLink([i], [s.name], {
                  type: 'arrow_point',
                  length: a - 2,
                });
            }
          }
        return e;
      }),
      (lR = { parser: {}, parse: Aj });
  });
var Ij,
  Oj,
  uR,
  fR = f(() => {
    'use strict';
    Wi();
    (Ij = (t, e) => {
      let r = ny,
        n = r(t, 'r'),
        i = r(t, 'g'),
        o = r(t, 'b');
      return xn(n, i, o, e);
    }),
      (Oj = (t) => `.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor || t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span,p {
    color: ${t.titleColor};
  }

  .label text,span,p {
    fill: ${t.nodeTextColor || t.textColor};
    color: ${t.nodeTextColor || t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${Ij(t.edgeLabelBackground, 0.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span,p {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
`),
      (uR = Oj);
  });
function pR(t, e) {
  t[e] ? t[e]++ : (t[e] = 1);
}
function dR(t, e) {
  --t[e] || delete t[e];
}
function bc(t, e, r, n) {
  var i = '' + e,
    o = '' + r;
  if (!t && i > o) {
    var a = i;
    (i = o), (o = a);
  }
  return i + hR + o + hR + (xt(n) ? Rj : n);
}
function Nj(t, e, r, n) {
  var i = '' + e,
    o = '' + r;
  if (!t && i > o) {
    var a = i;
    (i = o), (o = a);
  }
  var s = { v: i, w: o };
  return n && (s.name = n), s;
}
function qy(t, e) {
  return bc(t, e.v, e.w, e.name);
}
var Rj,
  jo,
  hR,
  Vt,
  rp = f(() => {
    tt();
    (Rj = '\0'),
      (jo = '\0'),
      (hR = ''),
      (Vt = class {
        constructor(e = {}) {
          (this._isDirected = B(e, 'directed') ? e.directed : !0),
            (this._isMultigraph = B(e, 'multigraph') ? e.multigraph : !1),
            (this._isCompound = B(e, 'compound') ? e.compound : !1),
            (this._label = void 0),
            (this._defaultNodeLabelFn = xr(void 0)),
            (this._defaultEdgeLabelFn = xr(void 0)),
            (this._nodes = {}),
            this._isCompound &&
              ((this._parent = {}),
              (this._children = {}),
              (this._children[jo] = {})),
            (this._in = {}),
            (this._preds = {}),
            (this._out = {}),
            (this._sucs = {}),
            (this._edgeObjs = {}),
            (this._edgeLabels = {});
        }
        isDirected() {
          return this._isDirected;
        }
        isMultigraph() {
          return this._isMultigraph;
        }
        isCompound() {
          return this._isCompound;
        }
        setGraph(e) {
          return (this._label = e), this;
        }
        graph() {
          return this._label;
        }
        setDefaultNodeLabel(e) {
          return we(e) || (e = xr(e)), (this._defaultNodeLabelFn = e), this;
        }
        nodeCount() {
          return this._nodeCount;
        }
        nodes() {
          return vt(this._nodes);
        }
        sources() {
          var e = this;
          return Rt(this.nodes(), function (r) {
            return dt(e._in[r]);
          });
        }
        sinks() {
          var e = this;
          return Rt(this.nodes(), function (r) {
            return dt(e._out[r]);
          });
        }
        setNodes(e, r) {
          var n = arguments,
            i = this;
          return (
            C(e, function (o) {
              n.length > 1 ? i.setNode(o, r) : i.setNode(o);
            }),
            this
          );
        }
        setNode(e, r) {
          return B(this._nodes, e)
            ? (arguments.length > 1 && (this._nodes[e] = r), this)
            : ((this._nodes[e] =
                arguments.length > 1 ? r : this._defaultNodeLabelFn(e)),
              this._isCompound &&
                ((this._parent[e] = jo),
                (this._children[e] = {}),
                (this._children[jo][e] = !0)),
              (this._in[e] = {}),
              (this._preds[e] = {}),
              (this._out[e] = {}),
              (this._sucs[e] = {}),
              ++this._nodeCount,
              this);
        }
        node(e) {
          return this._nodes[e];
        }
        hasNode(e) {
          return B(this._nodes, e);
        }
        removeNode(e) {
          var r = this;
          if (B(this._nodes, e)) {
            var n = function (i) {
              r.removeEdge(r._edgeObjs[i]);
            };
            delete this._nodes[e],
              this._isCompound &&
                (this._removeFromParentsChildList(e),
                delete this._parent[e],
                C(this.children(e), function (i) {
                  r.setParent(i);
                }),
                delete this._children[e]),
              C(vt(this._in[e]), n),
              delete this._in[e],
              delete this._preds[e],
              C(vt(this._out[e]), n),
              delete this._out[e],
              delete this._sucs[e],
              --this._nodeCount;
          }
          return this;
        }
        setParent(e, r) {
          if (!this._isCompound)
            throw new Error('Cannot set parent in a non-compound graph');
          if (xt(r)) r = jo;
          else {
            r += '';
            for (var n = r; !xt(n); n = this.parent(n))
              if (n === e)
                throw new Error(
                  'Setting ' +
                    r +
                    ' as parent of ' +
                    e +
                    ' would create a cycle'
                );
            this.setNode(r);
          }
          return (
            this.setNode(e),
            this._removeFromParentsChildList(e),
            (this._parent[e] = r),
            (this._children[r][e] = !0),
            this
          );
        }
        _removeFromParentsChildList(e) {
          delete this._children[this._parent[e]][e];
        }
        parent(e) {
          if (this._isCompound) {
            var r = this._parent[e];
            if (r !== jo) return r;
          }
        }
        children(e) {
          if ((xt(e) && (e = jo), this._isCompound)) {
            var r = this._children[e];
            if (r) return vt(r);
          } else {
            if (e === jo) return this.nodes();
            if (this.hasNode(e)) return [];
          }
        }
        predecessors(e) {
          var r = this._preds[e];
          if (r) return vt(r);
        }
        successors(e) {
          var r = this._sucs[e];
          if (r) return vt(r);
        }
        neighbors(e) {
          var r = this.predecessors(e);
          if (r) return Mm(r, this.successors(e));
        }
        isLeaf(e) {
          var r;
          return (
            this.isDirected()
              ? (r = this.successors(e))
              : (r = this.neighbors(e)),
            r.length === 0
          );
        }
        filterNodes(e) {
          var r = new this.constructor({
            directed: this._isDirected,
            multigraph: this._isMultigraph,
            compound: this._isCompound,
          });
          r.setGraph(this.graph());
          var n = this;
          C(this._nodes, function (a, s) {
            e(s) && r.setNode(s, a);
          }),
            C(this._edgeObjs, function (a) {
              r.hasNode(a.v) && r.hasNode(a.w) && r.setEdge(a, n.edge(a));
            });
          var i = {};
          function o(a) {
            var s = n.parent(a);
            return s === void 0 || r.hasNode(s)
              ? ((i[a] = s), s)
              : s in i
              ? i[s]
              : o(s);
          }
          return (
            this._isCompound &&
              C(r.nodes(), function (a) {
                r.setParent(a, o(a));
              }),
            r
          );
        }
        setDefaultEdgeLabel(e) {
          return we(e) || (e = xr(e)), (this._defaultEdgeLabelFn = e), this;
        }
        edgeCount() {
          return this._edgeCount;
        }
        edges() {
          return _t(this._edgeObjs);
        }
        setPath(e, r) {
          var n = this,
            i = arguments;
          return (
            Mt(e, function (o, a) {
              return i.length > 1 ? n.setEdge(o, a, r) : n.setEdge(o, a), a;
            }),
            this
          );
        }
        setEdge() {
          var e,
            r,
            n,
            i,
            o = !1,
            a = arguments[0];
          typeof a == 'object' && a !== null && 'v' in a
            ? ((e = a.v),
              (r = a.w),
              (n = a.name),
              arguments.length === 2 && ((i = arguments[1]), (o = !0)))
            : ((e = a),
              (r = arguments[1]),
              (n = arguments[3]),
              arguments.length > 2 && ((i = arguments[2]), (o = !0))),
            (e = '' + e),
            (r = '' + r),
            xt(n) || (n = '' + n);
          var s = bc(this._isDirected, e, r, n);
          if (B(this._edgeLabels, s))
            return o && (this._edgeLabels[s] = i), this;
          if (!xt(n) && !this._isMultigraph)
            throw new Error(
              'Cannot set a named edge when isMultigraph = false'
            );
          this.setNode(e),
            this.setNode(r),
            (this._edgeLabels[s] = o ? i : this._defaultEdgeLabelFn(e, r, n));
          var l = Nj(this._isDirected, e, r, n);
          return (
            (e = l.v),
            (r = l.w),
            Object.freeze(l),
            (this._edgeObjs[s] = l),
            pR(this._preds[r], e),
            pR(this._sucs[e], r),
            (this._in[r][s] = l),
            (this._out[e][s] = l),
            this._edgeCount++,
            this
          );
        }
        edge(e, r, n) {
          var i =
            arguments.length === 1
              ? qy(this._isDirected, arguments[0])
              : bc(this._isDirected, e, r, n);
          return this._edgeLabels[i];
        }
        hasEdge(e, r, n) {
          var i =
            arguments.length === 1
              ? qy(this._isDirected, arguments[0])
              : bc(this._isDirected, e, r, n);
          return B(this._edgeLabels, i);
        }
        removeEdge(e, r, n) {
          var i =
              arguments.length === 1
                ? qy(this._isDirected, arguments[0])
                : bc(this._isDirected, e, r, n),
            o = this._edgeObjs[i];
          return (
            o &&
              ((e = o.v),
              (r = o.w),
              delete this._edgeLabels[i],
              delete this._edgeObjs[i],
              dR(this._preds[r], e),
              dR(this._sucs[e], r),
              delete this._in[r][i],
              delete this._out[e][i],
              this._edgeCount--),
            this
          );
        }
        inEdges(e, r) {
          var n = this._in[e];
          if (n) {
            var i = _t(n);
            return r
              ? Rt(i, function (o) {
                  return o.v === r;
                })
              : i;
          }
        }
        outEdges(e, r) {
          var n = this._out[e];
          if (n) {
            var i = _t(n);
            return r
              ? Rt(i, function (o) {
                  return o.w === r;
                })
              : i;
          }
        }
        nodeEdges(e, r) {
          var n = this.inEdges(e, r);
          if (n) return n.concat(this.outEdges(e, r));
        }
      });
    Vt.prototype._nodeCount = 0;
    Vt.prototype._edgeCount = 0;
  });
var Un = f(() => {
  rp();
});
function gR(t) {
  (t._prev._next = t._next),
    (t._next._prev = t._prev),
    delete t._next,
    delete t._prev;
}
function Fj(t, e) {
  if (t !== '_next' && t !== '_prev') return e;
}
var np,
  xR = f(() => {
    np = class {
      constructor() {
        var e = {};
        (e._next = e._prev = e), (this._sentinel = e);
      }
      dequeue() {
        var e = this._sentinel,
          r = e._prev;
        if (r !== e) return gR(r), r;
      }
      enqueue(e) {
        var r = this._sentinel;
        e._prev && e._next && gR(e),
          (e._next = r._next),
          (r._next._prev = e),
          (r._next = e),
          (e._prev = r);
      }
      toString() {
        for (var e = [], r = this._sentinel, n = r._prev; n !== r; )
          e.push(JSON.stringify(n, Fj)), (n = n._prev);
        return '[' + e.join(', ') + ']';
      }
    };
  });
function yR(t, e) {
  if (t.nodeCount() <= 1) return [];
  var r = Pj(t, e || Mj),
    n = Bj(r.graph, r.buckets, r.zeroIdx);
  return Ot(
    z(n, function (i) {
      return t.outEdges(i.v, i.w);
    })
  );
}
function Bj(t, e, r) {
  for (var n = [], i = e[e.length - 1], o = e[0], a; t.nodeCount(); ) {
    for (; (a = o.dequeue()); ) Hy(t, e, r, a);
    for (; (a = i.dequeue()); ) Hy(t, e, r, a);
    if (t.nodeCount()) {
      for (var s = e.length - 2; s > 0; --s)
        if (((a = e[s].dequeue()), a)) {
          n = n.concat(Hy(t, e, r, a, !0));
          break;
        }
    }
  }
  return n;
}
function Hy(t, e, r, n, i) {
  var o = i ? [] : void 0;
  return (
    C(t.inEdges(n.v), function (a) {
      var s = t.edge(a),
        l = t.node(a.v);
      i && o.push({ v: a.v, w: a.w }), (l.out -= s), Gy(e, r, l);
    }),
    C(t.outEdges(n.v), function (a) {
      var s = t.edge(a),
        l = a.w,
        c = t.node(l);
      (c.in -= s), Gy(e, r, c);
    }),
    t.removeNode(n.v),
    o
  );
}
function Pj(t, e) {
  var r = new Vt(),
    n = 0,
    i = 0;
  C(t.nodes(), function (s) {
    r.setNode(s, { v: s, in: 0, out: 0 });
  }),
    C(t.edges(), function (s) {
      var l = r.edge(s.v, s.w) || 0,
        c = e(s),
        u = l + c;
      r.setEdge(s.v, s.w, u),
        (i = Math.max(i, (r.node(s.v).out += c))),
        (n = Math.max(n, (r.node(s.w).in += c)));
    });
  var o = Zr(i + n + 3).map(function () {
      return new np();
    }),
    a = n + 1;
  return (
    C(r.nodes(), function (s) {
      Gy(o, a, r.node(s));
    }),
    { graph: r, buckets: o, zeroIdx: a }
  );
}
function Gy(t, e, r) {
  r.out
    ? r.in
      ? t[r.out - r.in + e].enqueue(r)
      : t[t.length - 1].enqueue(r)
    : t[0].enqueue(r);
}
var Mj,
  bR = f(() => {
    tt();
    Un();
    xR();
    Mj = xr(1);
  });
function _R(t) {
  var e = t.graph().acyclicer === 'greedy' ? yR(t, r(t)) : Dj(t);
  C(e, function (n) {
    var i = t.edge(n);
    t.removeEdge(n),
      (i.forwardName = n.name),
      (i.reversed = !0),
      t.setEdge(n.w, n.v, i, To('rev'));
  });
  function r(n) {
    return function (i) {
      return n.edge(i).weight;
    };
  }
}
function Dj(t) {
  var e = [],
    r = {},
    n = {};
  function i(o) {
    B(n, o) ||
      ((n[o] = !0),
      (r[o] = !0),
      C(t.outEdges(o), function (a) {
        B(r, a.w) ? e.push(a) : i(a.w);
      }),
      delete r[o]);
  }
  return C(t.nodes(), i), e;
}
function CR(t) {
  C(t.edges(), function (e) {
    var r = t.edge(e);
    if (r.reversed) {
      t.removeEdge(e);
      var n = r.forwardName;
      delete r.reversed, delete r.forwardName, t.setEdge(e.w, e.v, r, n);
    }
  });
}
var jy = f(() => {
  tt();
  bR();
});
function zn(t, e, r, n) {
  var i;
  do i = To(n);
  while (t.hasNode(i));
  return (r.dummy = e), t.setNode(i, r), i;
}
function kR(t) {
  var e = new Vt().setGraph(t.graph());
  return (
    C(t.nodes(), function (r) {
      e.setNode(r, t.node(r));
    }),
    C(t.edges(), function (r) {
      var n = e.edge(r.v, r.w) || { weight: 0, minlen: 1 },
        i = t.edge(r);
      e.setEdge(r.v, r.w, {
        weight: n.weight + i.weight,
        minlen: Math.max(n.minlen, i.minlen),
      });
    }),
    e
  );
}
function ip(t) {
  var e = new Vt({ multigraph: t.isMultigraph() }).setGraph(t.graph());
  return (
    C(t.nodes(), function (r) {
      t.children(r).length || e.setNode(r, t.node(r));
    }),
    C(t.edges(), function (r) {
      e.setEdge(r, t.edge(r));
    }),
    e
  );
}
function Yy(t, e) {
  var r = t.x,
    n = t.y,
    i = e.x - r,
    o = e.y - n,
    a = t.width / 2,
    s = t.height / 2;
  if (!i && !o)
    throw new Error(
      'Not possible to find intersection inside of the rectangle'
    );
  var l, c;
  return (
    Math.abs(o) * a > Math.abs(i) * s
      ? (o < 0 && (s = -s), (l = (s * i) / o), (c = s))
      : (i < 0 && (a = -a), (l = a), (c = (a * o) / i)),
    { x: r + l, y: n + c }
  );
}
function ji(t) {
  var e = z(Zr(Xy(t) + 1), function () {
    return [];
  });
  return (
    C(t.nodes(), function (r) {
      var n = t.node(r),
        i = n.rank;
      xt(i) || (e[i][n.order] = r);
    }),
    e
  );
}
function ER(t) {
  var e = Qn(
    z(t.nodes(), function (r) {
      return t.node(r).rank;
    })
  );
  C(t.nodes(), function (r) {
    var n = t.node(r);
    B(n, 'rank') && (n.rank -= e);
  });
}
function wR(t) {
  var e = Qn(
      z(t.nodes(), function (o) {
        return t.node(o).rank;
      })
    ),
    r = [];
  C(t.nodes(), function (o) {
    var a = t.node(o).rank - e;
    r[a] || (r[a] = []), r[a].push(o);
  });
  var n = 0,
    i = t.graph().nodeRankFactor;
  C(r, function (o, a) {
    xt(o) && a % i !== 0
      ? --n
      : n &&
        C(o, function (s) {
          t.node(s).rank += n;
        });
  });
}
function Vy(t, e, r, n) {
  var i = { width: 0, height: 0 };
  return (
    arguments.length >= 4 && ((i.rank = r), (i.order = n)),
    zn(t, 'border', i, e)
  );
}
function Xy(t) {
  return Cr(
    z(t.nodes(), function (e) {
      var r = t.node(e).rank;
      if (!xt(r)) return r;
    })
  );
}
function SR(t, e) {
  var r = { lhs: [], rhs: [] };
  return (
    C(t, function (n) {
      e(n) ? r.lhs.push(n) : r.rhs.push(n);
    }),
    r
  );
}
function vR(t, e) {
  var r = qu();
  try {
    return e();
  } finally {
    console.log(t + ' time: ' + (qu() - r) + 'ms');
  }
}
function AR(t, e) {
  return e();
}
var $n = f(() => {
  tt();
  Un();
});
function IR(t) {
  function e(r) {
    var n = t.children(r),
      i = t.node(r);
    if ((n.length && C(n, e), B(i, 'minRank'))) {
      (i.borderLeft = []), (i.borderRight = []);
      for (var o = i.minRank, a = i.maxRank + 1; o < a; ++o)
        LR(t, 'borderLeft', '_bl', r, i, o),
          LR(t, 'borderRight', '_br', r, i, o);
    }
  }
  C(t.children(), e);
}
function LR(t, e, r, n, i, o) {
  var a = { width: 0, height: 0, rank: o, borderType: e },
    s = i[e][o - 1],
    l = zn(t, 'border', a, r);
  (i[e][o] = l), t.setParent(l, n), s && t.setEdge(s, l, { weight: 1 });
}
var OR = f(() => {
  tt();
  $n();
});
function NR(t) {
  var e = t.graph().rankdir.toLowerCase();
  (e === 'lr' || e === 'rl') && MR(t);
}
function FR(t) {
  var e = t.graph().rankdir.toLowerCase();
  (e === 'bt' || e === 'rl') && Uj(t),
    (e === 'lr' || e === 'rl') && (zj(t), MR(t));
}
function MR(t) {
  C(t.nodes(), function (e) {
    RR(t.node(e));
  }),
    C(t.edges(), function (e) {
      RR(t.edge(e));
    });
}
function RR(t) {
  var e = t.width;
  (t.width = t.height), (t.height = e);
}
function Uj(t) {
  C(t.nodes(), function (e) {
    Ky(t.node(e));
  }),
    C(t.edges(), function (e) {
      var r = t.edge(e);
      C(r.points, Ky), B(r, 'y') && Ky(r);
    });
}
function Ky(t) {
  t.y = -t.y;
}
function zj(t) {
  C(t.nodes(), function (e) {
    Zy(t.node(e));
  }),
    C(t.edges(), function (e) {
      var r = t.edge(e);
      C(r.points, Zy), B(r, 'x') && Zy(r);
    });
}
function Zy(t) {
  var e = t.x;
  (t.x = t.y), (t.y = e);
}
var BR = f(() => {
  tt();
});
function PR(t) {
  (t.graph().dummyChains = []),
    C(t.edges(), function (e) {
      Wj(t, e);
    });
}
function Wj(t, e) {
  var r = e.v,
    n = t.node(r).rank,
    i = e.w,
    o = t.node(i).rank,
    a = e.name,
    s = t.edge(e),
    l = s.labelRank;
  if (o !== n + 1) {
    t.removeEdge(e);
    var c, u, h;
    for (h = 0, ++n; n < o; ++h, ++n)
      (s.points = []),
        (u = { width: 0, height: 0, edgeLabel: s, edgeObj: e, rank: n }),
        (c = zn(t, 'edge', u, '_d')),
        n === l &&
          ((u.width = s.width),
          (u.height = s.height),
          (u.dummy = 'edge-label'),
          (u.labelpos = s.labelpos)),
        t.setEdge(r, c, { weight: s.weight }, a),
        h === 0 && t.graph().dummyChains.push(c),
        (r = c);
    t.setEdge(r, i, { weight: s.weight }, a);
  }
}
function DR(t) {
  C(t.graph().dummyChains, function (e) {
    var r = t.node(e),
      n = r.edgeLabel,
      i;
    for (t.setEdge(r.edgeObj, n); r.dummy; )
      (i = t.successors(e)[0]),
        t.removeNode(e),
        n.points.push({ x: r.x, y: r.y }),
        r.dummy === 'edge-label' &&
          ((n.x = r.x),
          (n.y = r.y),
          (n.width = r.width),
          (n.height = r.height)),
        (e = i),
        (r = t.node(e));
  });
}
var Qy = f(() => {
  tt();
  $n();
});
function _c(t) {
  var e = {};
  function r(n) {
    var i = t.node(n);
    if (B(e, n)) return i.rank;
    e[n] = !0;
    var o = Qn(
      z(t.outEdges(n), function (a) {
        return r(a.w) - t.edge(a).minlen;
      })
    );
    return (
      (o === Number.POSITIVE_INFINITY || o === void 0 || o === null) && (o = 0),
      (i.rank = o)
    );
  }
  C(t.sources(), r);
}
function Yo(t, e) {
  return t.node(e.w).rank - t.node(e.v).rank - t.edge(e).minlen;
}
var op = f(() => {
  tt();
});
function ap(t) {
  var e = new Vt({ directed: !1 }),
    r = t.nodes()[0],
    n = t.nodeCount();
  e.setNode(r, {});
  for (var i, o; qj(e, t) < n; )
    (i = Hj(e, t)), (o = e.hasNode(i.v) ? Yo(t, i) : -Yo(t, i)), Gj(e, t, o);
  return e;
}
function qj(t, e) {
  function r(n) {
    C(e.nodeEdges(n), function (i) {
      var o = i.v,
        a = n === o ? i.w : o;
      !t.hasNode(a) &&
        !Yo(e, i) &&
        (t.setNode(a, {}), t.setEdge(n, a, {}), r(a));
    });
  }
  return C(t.nodes(), r), t.nodeCount();
}
function Hj(t, e) {
  return _o(e.edges(), function (r) {
    if (t.hasNode(r.v) !== t.hasNode(r.w)) return Yo(e, r);
  });
}
function Gj(t, e, r) {
  C(t.nodes(), function (n) {
    e.node(n).rank += r;
  });
}
var Jy = f(() => {
  tt();
  Un();
  op();
});
var zR = f(() => {});
var t0 = f(() => {});
var LLt,
  e0 = f(() => {
    tt();
    t0();
    LLt = xr(1);
  });
var $R = f(() => {
  e0();
});
var r0 = f(() => {});
var WR = f(() => {
  r0();
});
var BLt,
  qR = f(() => {
    tt();
    BLt = xr(1);
  });
function n0(t) {
  var e = {},
    r = {},
    n = [];
  function i(o) {
    if (B(r, o)) throw new Cc();
    B(e, o) ||
      ((r[o] = !0),
      (e[o] = !0),
      C(t.predecessors(o), i),
      delete r[o],
      n.push(o));
  }
  if ((C(t.sinks(), i), Nm(e) !== t.nodeCount())) throw new Cc();
  return n;
}
function Cc() {}
var i0 = f(() => {
  tt();
  n0.CycleException = Cc;
  Cc.prototype = new Error();
});
var HR = f(() => {
  i0();
});
function sp(t, e, r) {
  K(e) || (e = [e]);
  var n = (t.isDirected() ? t.successors : t.neighbors).bind(t),
    i = [],
    o = {};
  return (
    C(e, function (a) {
      if (!t.hasNode(a)) throw new Error('Graph does not have node: ' + a);
      GR(t, a, r === 'post', o, n, i);
    }),
    i
  );
}
function GR(t, e, r, n, i, o) {
  B(n, e) ||
    ((n[e] = !0),
    r || o.push(e),
    C(i(e), function (a) {
      GR(t, a, r, n, i, o);
    }),
    r && o.push(e));
}
var o0 = f(() => {
  tt();
});
function a0(t, e) {
  return sp(t, e, 'post');
}
var jR = f(() => {
  o0();
});
function s0(t, e) {
  return sp(t, e, 'pre');
}
var YR = f(() => {
  o0();
});
var VR = f(() => {
  t0();
  rp();
});
var XR = f(() => {
  zR();
  e0();
  $R();
  WR();
  qR();
  HR();
  jR();
  YR();
  VR();
  r0();
  i0();
});
function Vi(t) {
  (t = kR(t)), _c(t);
  var e = ap(t);
  c0(e), l0(e, t);
  for (var r, n; (r = JR(e)); ) (n = tN(e, t, r)), eN(e, t, r, n);
}
function l0(t, e) {
  var r = a0(t, t.nodes());
  (r = r.slice(0, r.length - 1)),
    C(r, function (n) {
      Kj(t, e, n);
    });
}
function Kj(t, e, r) {
  var n = t.node(r),
    i = n.parent;
  t.edge(r, i).cutvalue = ZR(t, e, r);
}
function ZR(t, e, r) {
  var n = t.node(r),
    i = n.parent,
    o = !0,
    a = e.edge(r, i),
    s = 0;
  return (
    a || ((o = !1), (a = e.edge(i, r))),
    (s = a.weight),
    C(e.nodeEdges(r), function (l) {
      var c = l.v === r,
        u = c ? l.w : l.v;
      if (u !== i) {
        var h = c === o,
          p = e.edge(l).weight;
        if (((s += h ? p : -p), Qj(t, r, u))) {
          var d = t.edge(r, u).cutvalue;
          s += h ? -d : d;
        }
      }
    }),
    s
  );
}
function c0(t, e) {
  arguments.length < 2 && (e = t.nodes()[0]), QR(t, {}, 1, e);
}
function QR(t, e, r, n, i) {
  var o = r,
    a = t.node(n);
  return (
    (e[n] = !0),
    C(t.neighbors(n), function (s) {
      B(e, s) || (r = QR(t, e, r, s, n));
    }),
    (a.low = o),
    (a.lim = r++),
    i ? (a.parent = i) : delete a.parent,
    r
  );
}
function JR(t) {
  return nr(t.edges(), function (e) {
    return t.edge(e).cutvalue < 0;
  });
}
function tN(t, e, r) {
  var n = r.v,
    i = r.w;
  e.hasEdge(n, i) || ((n = r.w), (i = r.v));
  var o = t.node(n),
    a = t.node(i),
    s = o,
    l = !1;
  o.lim > a.lim && ((s = a), (l = !0));
  var c = Rt(e.edges(), function (u) {
    return l === KR(t, t.node(u.v), s) && l !== KR(t, t.node(u.w), s);
  });
  return _o(c, function (u) {
    return Yo(e, u);
  });
}
function eN(t, e, r, n) {
  var i = r.v,
    o = r.w;
  t.removeEdge(i, o), t.setEdge(n.v, n.w, {}), c0(t), l0(t, e), Zj(t, e);
}
function Zj(t, e) {
  var r = nr(t.nodes(), function (i) {
      return !e.node(i).parent;
    }),
    n = s0(t, r);
  (n = n.slice(1)),
    C(n, function (i) {
      var o = t.node(i).parent,
        a = e.edge(i, o),
        s = !1;
      a || ((a = e.edge(o, i)), (s = !0)),
        (e.node(i).rank = e.node(o).rank + (s ? a.minlen : -a.minlen));
    });
}
function Qj(t, e, r) {
  return t.hasEdge(e, r);
}
function KR(t, e, r) {
  return r.low <= e.lim && e.lim <= r.lim;
}
var rN = f(() => {
  tt();
  XR();
  $n();
  Jy();
  op();
  Vi.initLowLimValues = c0;
  Vi.initCutValues = l0;
  Vi.calcCutValue = ZR;
  Vi.leaveEdge = JR;
  Vi.enterEdge = tN;
  Vi.exchangeEdges = eN;
});
function u0(t) {
  switch (t.graph().ranker) {
    case 'network-simplex':
      nN(t);
      break;
    case 'tight-tree':
      tY(t);
      break;
    case 'longest-path':
      Jj(t);
      break;
    default:
      nN(t);
  }
}
function tY(t) {
  _c(t), ap(t);
}
function nN(t) {
  Vi(t);
}
var Jj,
  f0 = f(() => {
    Jy();
    rN();
    op();
    Jj = _c;
  });
function iN(t) {
  var e = zn(t, 'root', {}, '_root'),
    r = eY(t),
    n = Cr(_t(r)) - 1,
    i = 2 * n + 1;
  (t.graph().nestingRoot = e),
    C(t.edges(), function (a) {
      t.edge(a).minlen *= i;
    });
  var o = rY(t) + 1;
  C(t.children(), function (a) {
    oN(t, e, i, o, n, r, a);
  }),
    (t.graph().nodeRankFactor = i);
}
function oN(t, e, r, n, i, o, a) {
  var s = t.children(a);
  if (!s.length) {
    a !== e && t.setEdge(e, a, { weight: 0, minlen: r });
    return;
  }
  var l = Vy(t, '_bt'),
    c = Vy(t, '_bb'),
    u = t.node(a);
  t.setParent(l, a),
    (u.borderTop = l),
    t.setParent(c, a),
    (u.borderBottom = c),
    C(s, function (h) {
      oN(t, e, r, n, i, o, h);
      var p = t.node(h),
        d = p.borderTop ? p.borderTop : h,
        m = p.borderBottom ? p.borderBottom : h,
        g = p.borderTop ? n : 2 * n,
        E = d !== m ? 1 : i - o[a] + 1;
      t.setEdge(l, d, { weight: g, minlen: E, nestingEdge: !0 }),
        t.setEdge(m, c, { weight: g, minlen: E, nestingEdge: !0 });
    }),
    t.parent(a) || t.setEdge(e, l, { weight: 0, minlen: i + o[a] });
}
function eY(t) {
  var e = {};
  function r(n, i) {
    var o = t.children(n);
    o &&
      o.length &&
      C(o, function (a) {
        r(a, i + 1);
      }),
      (e[n] = i);
  }
  return (
    C(t.children(), function (n) {
      r(n, 1);
    }),
    e
  );
}
function rY(t) {
  return Mt(
    t.edges(),
    function (e, r) {
      return e + t.edge(r).weight;
    },
    0
  );
}
function aN(t) {
  var e = t.graph();
  t.removeNode(e.nestingRoot),
    delete e.nestingRoot,
    C(t.edges(), function (r) {
      var n = t.edge(r);
      n.nestingEdge && t.removeEdge(r);
    });
}
var sN = f(() => {
  tt();
  $n();
});
function lN(t, e, r) {
  var n = {},
    i;
  C(r, function (o) {
    for (var a = t.parent(o), s, l; a; ) {
      if (
        ((s = t.parent(a)),
        s ? ((l = n[s]), (n[s] = a)) : ((l = i), (i = a)),
        l && l !== a)
      ) {
        e.setEdge(l, a);
        return;
      }
      a = s;
    }
  });
}
var cN = f(() => {
  tt();
});
function uN(t, e, r) {
  var n = iY(t),
    i = new Vt({ compound: !0 })
      .setGraph({ root: n })
      .setDefaultNodeLabel(function (o) {
        return t.node(o);
      });
  return (
    C(t.nodes(), function (o) {
      var a = t.node(o),
        s = t.parent(o);
      (a.rank === e || (a.minRank <= e && e <= a.maxRank)) &&
        (i.setNode(o),
        i.setParent(o, s || n),
        C(t[r](o), function (l) {
          var c = l.v === o ? l.w : l.v,
            u = i.edge(c, o),
            h = xt(u) ? 0 : u.weight;
          i.setEdge(c, o, { weight: t.edge(l).weight + h });
        }),
        B(a, 'minRank') &&
          i.setNode(o, {
            borderLeft: a.borderLeft[e],
            borderRight: a.borderRight[e],
          }));
    }),
    i
  );
}
function iY(t) {
  for (var e; t.hasNode((e = To('_root'))); );
  return e;
}
var fN = f(() => {
  tt();
  Un();
});
function hN(t, e) {
  for (var r = 0, n = 1; n < e.length; ++n) r += oY(t, e[n - 1], e[n]);
  return r;
}
function oY(t, e, r) {
  for (
    var n = ef(
        r,
        z(r, function (c, u) {
          return u;
        })
      ),
      i = Ot(
        z(e, function (c) {
          return Fn(
            z(t.outEdges(c), function (u) {
              return { pos: n[u.w], weight: t.edge(u).weight };
            }),
            'pos'
          );
        })
      ),
      o = 1;
    o < r.length;

  )
    o <<= 1;
  var a = 2 * o - 1;
  o -= 1;
  var s = z(new Array(a), function () {
      return 0;
    }),
    l = 0;
  return (
    C(
      i.forEach(function (c) {
        var u = c.pos + o;
        s[u] += c.weight;
        for (var h = 0; u > 0; )
          u % 2 && (h += s[u + 1]), (u = (u - 1) >> 1), (s[u] += c.weight);
        l += c.weight * h;
      })
    ),
    l
  );
}
var pN = f(() => {
  tt();
});
function dN(t) {
  var e = {},
    r = Rt(t.nodes(), function (s) {
      return !t.children(s).length;
    }),
    n = Cr(
      z(r, function (s) {
        return t.node(s).rank;
      })
    ),
    i = z(Zr(n + 1), function () {
      return [];
    });
  function o(s) {
    if (!B(e, s)) {
      e[s] = !0;
      var l = t.node(s);
      i[l.rank].push(s), C(t.successors(s), o);
    }
  }
  var a = Fn(r, function (s) {
    return t.node(s).rank;
  });
  return C(a, o), i;
}
var mN = f(() => {
  tt();
});
function gN(t, e) {
  return z(e, function (r) {
    var n = t.inEdges(r);
    if (n.length) {
      var i = Mt(
        n,
        function (o, a) {
          var s = t.edge(a),
            l = t.node(a.v);
          return {
            sum: o.sum + s.weight * l.order,
            weight: o.weight + s.weight,
          };
        },
        { sum: 0, weight: 0 }
      );
      return { v: r, barycenter: i.sum / i.weight, weight: i.weight };
    } else return { v: r };
  });
}
var xN = f(() => {
  tt();
});
function yN(t, e) {
  var r = {};
  C(t, function (i, o) {
    var a = (r[i.v] = { indegree: 0, in: [], out: [], vs: [i.v], i: o });
    xt(i.barycenter) || ((a.barycenter = i.barycenter), (a.weight = i.weight));
  }),
    C(e.edges(), function (i) {
      var o = r[i.v],
        a = r[i.w];
      !xt(o) && !xt(a) && (a.indegree++, o.out.push(r[i.w]));
    });
  var n = Rt(r, function (i) {
    return !i.indegree;
  });
  return aY(n);
}
function aY(t) {
  var e = [];
  function r(o) {
    return function (a) {
      a.merged ||
        ((xt(a.barycenter) ||
          xt(o.barycenter) ||
          a.barycenter >= o.barycenter) &&
          sY(o, a));
    };
  }
  function n(o) {
    return function (a) {
      a.in.push(o), --a.indegree === 0 && t.push(a);
    };
  }
  for (; t.length; ) {
    var i = t.pop();
    e.push(i), C(i.in.reverse(), r(i)), C(i.out, n(i));
  }
  return z(
    Rt(e, function (o) {
      return !o.merged;
    }),
    function (o) {
      return Co(o, ['vs', 'i', 'barycenter', 'weight']);
    }
  );
}
function sY(t, e) {
  var r = 0,
    n = 0;
  t.weight && ((r += t.barycenter * t.weight), (n += t.weight)),
    e.weight && ((r += e.barycenter * e.weight), (n += e.weight)),
    (t.vs = e.vs.concat(t.vs)),
    (t.barycenter = r / n),
    (t.weight = n),
    (t.i = Math.min(e.i, t.i)),
    (e.merged = !0);
}
var bN = f(() => {
  tt();
});
function CN(t, e) {
  var r = SR(t, function (u) {
      return B(u, 'barycenter');
    }),
    n = r.lhs,
    i = Fn(r.rhs, function (u) {
      return -u.i;
    }),
    o = [],
    a = 0,
    s = 0,
    l = 0;
  n.sort(lY(!!e)),
    (l = _N(o, i, l)),
    C(n, function (u) {
      (l += u.vs.length),
        o.push(u.vs),
        (a += u.barycenter * u.weight),
        (s += u.weight),
        (l = _N(o, i, l));
    });
  var c = { vs: Ot(o) };
  return s && ((c.barycenter = a / s), (c.weight = s)), c;
}
function _N(t, e, r) {
  for (var n; e.length && (n = Xe(e)).i <= r; ) e.pop(), t.push(n.vs), r++;
  return r;
}
function lY(t) {
  return function (e, r) {
    return e.barycenter < r.barycenter
      ? -1
      : e.barycenter > r.barycenter
      ? 1
      : t
      ? r.i - e.i
      : e.i - r.i;
  };
}
var TN = f(() => {
  tt();
  $n();
});
function h0(t, e, r, n) {
  var i = t.children(e),
    o = t.node(e),
    a = o ? o.borderLeft : void 0,
    s = o ? o.borderRight : void 0,
    l = {};
  a &&
    (i = Rt(i, function (m) {
      return m !== a && m !== s;
    }));
  var c = gN(t, i);
  C(c, function (m) {
    if (t.children(m.v).length) {
      var g = h0(t, m.v, r, n);
      (l[m.v] = g), B(g, 'barycenter') && uY(m, g);
    }
  });
  var u = yN(c, r);
  cY(u, l);
  var h = CN(u, n);
  if (a && ((h.vs = Ot([a, h.vs, s])), t.predecessors(a).length)) {
    var p = t.node(t.predecessors(a)[0]),
      d = t.node(t.predecessors(s)[0]);
    B(h, 'barycenter') || ((h.barycenter = 0), (h.weight = 0)),
      (h.barycenter =
        (h.barycenter * h.weight + p.order + d.order) / (h.weight + 2)),
      (h.weight += 2);
  }
  return h;
}
function cY(t, e) {
  C(t, function (r) {
    r.vs = Ot(
      r.vs.map(function (n) {
        return e[n] ? e[n].vs : n;
      })
    );
  });
}
function uY(t, e) {
  xt(t.barycenter)
    ? ((t.barycenter = e.barycenter), (t.weight = e.weight))
    : ((t.barycenter =
        (t.barycenter * t.weight + e.barycenter * e.weight) /
        (t.weight + e.weight)),
      (t.weight += e.weight));
}
var kN = f(() => {
  tt();
  xN();
  bN();
  TN();
});
function SN(t) {
  var e = Xy(t),
    r = EN(t, Zr(1, e + 1), 'inEdges'),
    n = EN(t, Zr(e - 1, -1, -1), 'outEdges'),
    i = dN(t);
  wN(t, i);
  for (var o = Number.POSITIVE_INFINITY, a, s = 0, l = 0; l < 4; ++s, ++l) {
    fY(s % 2 ? r : n, s % 4 >= 2), (i = ji(t));
    var c = hN(t, i);
    c < o && ((l = 0), (a = am(i)), (o = c));
  }
  wN(t, a);
}
function EN(t, e, r) {
  return z(e, function (n) {
    return uN(t, n, r);
  });
}
function fY(t, e) {
  var r = new Vt();
  C(t, function (n) {
    var i = n.graph().root,
      o = h0(n, i, r, e);
    C(o.vs, function (a, s) {
      n.node(a).order = s;
    }),
      lN(n, r, o.vs);
  });
}
function wN(t, e) {
  C(e, function (r) {
    C(r, function (n, i) {
      t.node(n).order = i;
    });
  });
}
var vN = f(() => {
  tt();
  Un();
  $n();
  cN();
  fN();
  pN();
  mN();
  kN();
});
function AN(t) {
  var e = pY(t);
  C(t.graph().dummyChains, function (r) {
    for (
      var n = t.node(r),
        i = n.edgeObj,
        o = hY(t, e, i.v, i.w),
        a = o.path,
        s = o.lca,
        l = 0,
        c = a[l],
        u = !0;
      r !== i.w;

    ) {
      if (((n = t.node(r)), u)) {
        for (; (c = a[l]) !== s && t.node(c).maxRank < n.rank; ) l++;
        c === s && (u = !1);
      }
      if (!u) {
        for (; l < a.length - 1 && t.node((c = a[l + 1])).minRank <= n.rank; )
          l++;
        c = a[l];
      }
      t.setParent(r, c), (r = t.successors(r)[0]);
    }
  });
}
function hY(t, e, r, n) {
  var i = [],
    o = [],
    a = Math.min(e[r].low, e[n].low),
    s = Math.max(e[r].lim, e[n].lim),
    l,
    c;
  l = r;
  do (l = t.parent(l)), i.push(l);
  while (l && (e[l].low > a || s > e[l].lim));
  for (c = l, l = n; (l = t.parent(l)) !== c; ) o.push(l);
  return { path: i.concat(o.reverse()), lca: c };
}
function pY(t) {
  var e = {},
    r = 0;
  function n(i) {
    var o = r;
    C(t.children(i), n), (e[i] = { low: o, lim: r++ });
  }
  return C(t.children(), n), e;
}
var LN = f(() => {
  tt();
});
function dY(t, e) {
  var r = {};
  function n(i, o) {
    var a = 0,
      s = 0,
      l = i.length,
      c = Xe(o);
    return (
      C(o, function (u, h) {
        var p = gY(t, u),
          d = p ? t.node(p).order : l;
        (p || u === c) &&
          (C(o.slice(s, h + 1), function (m) {
            C(t.predecessors(m), function (g) {
              var E = t.node(g),
                y = E.order;
              (y < a || d < y) && !(E.dummy && t.node(m).dummy) && IN(r, g, m);
            });
          }),
          (s = h + 1),
          (a = d));
      }),
      o
    );
  }
  return Mt(e, n), r;
}
function mY(t, e) {
  var r = {};
  function n(o, a, s, l, c) {
    var u;
    C(Zr(a, s), function (h) {
      (u = o[h]),
        t.node(u).dummy &&
          C(t.predecessors(u), function (p) {
            var d = t.node(p);
            d.dummy && (d.order < l || d.order > c) && IN(r, p, u);
          });
    });
  }
  function i(o, a) {
    var s = -1,
      l,
      c = 0;
    return (
      C(a, function (u, h) {
        if (t.node(u).dummy === 'border') {
          var p = t.predecessors(u);
          p.length &&
            ((l = t.node(p[0]).order), n(a, c, h, s, l), (c = h), (s = l));
        }
        n(a, c, a.length, l, o.length);
      }),
      a
    );
  }
  return Mt(e, i), r;
}
function gY(t, e) {
  if (t.node(e).dummy)
    return nr(t.predecessors(e), function (r) {
      return t.node(r).dummy;
    });
}
function IN(t, e, r) {
  if (e > r) {
    var n = e;
    (e = r), (r = n);
  }
  var i = t[e];
  i || (t[e] = i = {}), (i[r] = !0);
}
function xY(t, e, r) {
  if (e > r) {
    var n = e;
    (e = r), (r = n);
  }
  return B(t[e], r);
}
function yY(t, e, r, n) {
  var i = {},
    o = {},
    a = {};
  return (
    C(e, function (s) {
      C(s, function (l, c) {
        (i[l] = l), (o[l] = l), (a[l] = c);
      });
    }),
    C(e, function (s) {
      var l = -1;
      C(s, function (c) {
        var u = n(c);
        if (u.length) {
          u = Fn(u, function (g) {
            return a[g];
          });
          for (
            var h = (u.length - 1) / 2, p = Math.floor(h), d = Math.ceil(h);
            p <= d;
            ++p
          ) {
            var m = u[p];
            o[c] === c &&
              l < a[m] &&
              !xY(r, c, m) &&
              ((o[m] = c), (o[c] = i[c] = i[m]), (l = a[m]));
          }
        }
      });
    }),
    { root: i, align: o }
  );
}
function bY(t, e, r, n, i) {
  var o = {},
    a = _Y(t, e, r, i),
    s = i ? 'borderLeft' : 'borderRight';
  function l(h, p) {
    for (var d = a.nodes(), m = d.pop(), g = {}; m; )
      g[m] ? h(m) : ((g[m] = !0), d.push(m), (d = d.concat(p(m)))),
        (m = d.pop());
  }
  function c(h) {
    o[h] = a.inEdges(h).reduce(function (p, d) {
      return Math.max(p, o[d.v] + a.edge(d));
    }, 0);
  }
  function u(h) {
    var p = a.outEdges(h).reduce(function (m, g) {
        return Math.min(m, o[g.w] - a.edge(g));
      }, Number.POSITIVE_INFINITY),
      d = t.node(h);
    p !== Number.POSITIVE_INFINITY &&
      d.borderType !== s &&
      (o[h] = Math.max(o[h], p));
  }
  return (
    l(c, a.predecessors.bind(a)),
    l(u, a.successors.bind(a)),
    C(n, function (h) {
      o[h] = o[r[h]];
    }),
    o
  );
}
function _Y(t, e, r, n) {
  var i = new Vt(),
    o = t.graph(),
    a = EY(o.nodesep, o.edgesep, n);
  return (
    C(e, function (s) {
      var l;
      C(s, function (c) {
        var u = r[c];
        if ((i.setNode(u), l)) {
          var h = r[l],
            p = i.edge(h, u);
          i.setEdge(h, u, Math.max(a(t, c, l), p || 0));
        }
        l = c;
      });
    }),
    i
  );
}
function CY(t, e) {
  return _o(_t(e), function (r) {
    var n = Number.NEGATIVE_INFINITY,
      i = Number.POSITIVE_INFINITY;
    return (
      km(r, function (o, a) {
        var s = wY(t, a) / 2;
        (n = Math.max(o + s, n)), (i = Math.min(o - s, i));
      }),
      n - i
    );
  });
}
function TY(t, e) {
  var r = _t(e),
    n = Qn(r),
    i = Cr(r);
  C(['u', 'd'], function (o) {
    C(['l', 'r'], function (a) {
      var s = o + a,
        l = t[s],
        c;
      if (l !== e) {
        var u = _t(l);
        (c = a === 'l' ? n - Qn(u) : i - Cr(u)),
          c &&
            (t[s] = bo(l, function (h) {
              return h + c;
            }));
      }
    });
  });
}
function kY(t, e) {
  return bo(t.ul, function (r, n) {
    if (e) return t[e.toLowerCase()][n];
    var i = Fn(z(t, n));
    return (i[1] + i[2]) / 2;
  });
}
function ON(t) {
  var e = ji(t),
    r = Ii(dY(t, e), mY(t, e)),
    n = {},
    i;
  C(['u', 'd'], function (a) {
    (i = a === 'u' ? e : _t(e).reverse()),
      C(['l', 'r'], function (s) {
        s === 'r' &&
          (i = z(i, function (h) {
            return _t(h).reverse();
          }));
        var l = (a === 'u' ? t.predecessors : t.successors).bind(t),
          c = yY(t, i, r, l),
          u = bY(t, i, c.root, c.align, s === 'r');
        s === 'r' &&
          (u = bo(u, function (h) {
            return -h;
          })),
          (n[a + s] = u);
      });
  });
  var o = CY(t, n);
  return TY(n, o), kY(n, t.graph().align);
}
function EY(t, e, r) {
  return function (n, i, o) {
    var a = n.node(i),
      s = n.node(o),
      l = 0,
      c;
    if (((l += a.width / 2), B(a, 'labelpos')))
      switch (a.labelpos.toLowerCase()) {
        case 'l':
          c = -a.width / 2;
          break;
        case 'r':
          c = a.width / 2;
          break;
      }
    if (
      (c && (l += r ? c : -c),
      (c = 0),
      (l += (a.dummy ? e : t) / 2),
      (l += (s.dummy ? e : t) / 2),
      (l += s.width / 2),
      B(s, 'labelpos'))
    )
      switch (s.labelpos.toLowerCase()) {
        case 'l':
          c = s.width / 2;
          break;
        case 'r':
          c = -s.width / 2;
          break;
      }
    return c && (l += r ? c : -c), (c = 0), l;
  };
}
function wY(t, e) {
  return t.node(e).width;
}
var RN = f(() => {
  tt();
  Un();
  $n();
});
function NN(t) {
  (t = ip(t)),
    SY(t),
    Em(ON(t), function (e, r) {
      t.node(r).x = e;
    });
}
function SY(t) {
  var e = ji(t),
    r = t.graph().ranksep,
    n = 0;
  C(e, function (i) {
    var o = Cr(
      z(i, function (a) {
        return t.node(a).height;
      })
    );
    C(i, function (a) {
      t.node(a).y = n + o / 2;
    }),
      (n += o + r);
  });
}
var FN = f(() => {
  tt();
  $n();
  RN();
});
function m0(t, e) {
  var r = e && e.debugTiming ? vR : AR;
  r('layout', function () {
    var n = r('  buildLayoutGraph', function () {
      return PY(t);
    });
    r('  runLayout', function () {
      vY(n, r);
    }),
      r('  updateInputGraph', function () {
        AY(t, n);
      });
  });
}
function vY(t, e) {
  e('    makeSpaceForEdgeLabels', function () {
    DY(t);
  }),
    e('    removeSelfEdges', function () {
      YY(t);
    }),
    e('    acyclic', function () {
      _R(t);
    }),
    e('    nestingGraph.run', function () {
      iN(t);
    }),
    e('    rank', function () {
      u0(ip(t));
    }),
    e('    injectEdgeLabelProxies', function () {
      UY(t);
    }),
    e('    removeEmptyRanks', function () {
      wR(t);
    }),
    e('    nestingGraph.cleanup', function () {
      aN(t);
    }),
    e('    normalizeRanks', function () {
      ER(t);
    }),
    e('    assignRankMinMax', function () {
      zY(t);
    }),
    e('    removeEdgeLabelProxies', function () {
      $Y(t);
    }),
    e('    normalize.run', function () {
      PR(t);
    }),
    e('    parentDummyChains', function () {
      AN(t);
    }),
    e('    addBorderSegments', function () {
      IR(t);
    }),
    e('    order', function () {
      SN(t);
    }),
    e('    insertSelfEdges', function () {
      VY(t);
    }),
    e('    adjustCoordinateSystem', function () {
      NR(t);
    }),
    e('    position', function () {
      NN(t);
    }),
    e('    positionSelfEdges', function () {
      XY(t);
    }),
    e('    removeBorderNodes', function () {
      jY(t);
    }),
    e('    normalize.undo', function () {
      DR(t);
    }),
    e('    fixupEdgeLabelCoords', function () {
      HY(t);
    }),
    e('    undoCoordinateSystem', function () {
      FR(t);
    }),
    e('    translateGraph', function () {
      WY(t);
    }),
    e('    assignNodeIntersects', function () {
      qY(t);
    }),
    e('    reversePoints', function () {
      GY(t);
    }),
    e('    acyclic.undo', function () {
      CR(t);
    });
}
function AY(t, e) {
  C(t.nodes(), function (r) {
    var n = t.node(r),
      i = e.node(r);
    n &&
      ((n.x = i.x),
      (n.y = i.y),
      e.children(r).length && ((n.width = i.width), (n.height = i.height)));
  }),
    C(t.edges(), function (r) {
      var n = t.edge(r),
        i = e.edge(r);
      (n.points = i.points), B(i, 'x') && ((n.x = i.x), (n.y = i.y));
    }),
    (t.graph().width = e.graph().width),
    (t.graph().height = e.graph().height);
}
function PY(t) {
  var e = new Vt({ multigraph: !0, compound: !0 }),
    r = d0(t.graph());
  return (
    e.setGraph(Ii({}, IY, p0(r, LY), Co(r, OY))),
    C(t.nodes(), function (n) {
      var i = d0(t.node(n));
      e.setNode(n, Ai(p0(i, RY), NY)), e.setParent(n, t.parent(n));
    }),
    C(t.edges(), function (n) {
      var i = d0(t.edge(n));
      e.setEdge(n, Ii({}, MY, p0(i, FY), Co(i, BY)));
    }),
    e
  );
}
function DY(t) {
  var e = t.graph();
  (e.ranksep /= 2),
    C(t.edges(), function (r) {
      var n = t.edge(r);
      (n.minlen *= 2),
        n.labelpos.toLowerCase() !== 'c' &&
          (e.rankdir === 'TB' || e.rankdir === 'BT'
            ? (n.width += n.labeloffset)
            : (n.height += n.labeloffset));
    });
}
function UY(t) {
  C(t.edges(), function (e) {
    var r = t.edge(e);
    if (r.width && r.height) {
      var n = t.node(e.v),
        i = t.node(e.w),
        o = { rank: (i.rank - n.rank) / 2 + n.rank, e };
      zn(t, 'edge-proxy', o, '_ep');
    }
  });
}
function zY(t) {
  var e = 0;
  C(t.nodes(), function (r) {
    var n = t.node(r);
    n.borderTop &&
      ((n.minRank = t.node(n.borderTop).rank),
      (n.maxRank = t.node(n.borderBottom).rank),
      (e = Cr(e, n.maxRank)));
  }),
    (t.graph().maxRank = e);
}
function $Y(t) {
  C(t.nodes(), function (e) {
    var r = t.node(e);
    r.dummy === 'edge-proxy' &&
      ((t.edge(r.e).labelRank = r.rank), t.removeNode(e));
  });
}
function WY(t) {
  var e = Number.POSITIVE_INFINITY,
    r = 0,
    n = Number.POSITIVE_INFINITY,
    i = 0,
    o = t.graph(),
    a = o.marginx || 0,
    s = o.marginy || 0;
  function l(c) {
    var u = c.x,
      h = c.y,
      p = c.width,
      d = c.height;
    (e = Math.min(e, u - p / 2)),
      (r = Math.max(r, u + p / 2)),
      (n = Math.min(n, h - d / 2)),
      (i = Math.max(i, h + d / 2));
  }
  C(t.nodes(), function (c) {
    l(t.node(c));
  }),
    C(t.edges(), function (c) {
      var u = t.edge(c);
      B(u, 'x') && l(u);
    }),
    (e -= a),
    (n -= s),
    C(t.nodes(), function (c) {
      var u = t.node(c);
      (u.x -= e), (u.y -= n);
    }),
    C(t.edges(), function (c) {
      var u = t.edge(c);
      C(u.points, function (h) {
        (h.x -= e), (h.y -= n);
      }),
        B(u, 'x') && (u.x -= e),
        B(u, 'y') && (u.y -= n);
    }),
    (o.width = r - e + a),
    (o.height = i - n + s);
}
function qY(t) {
  C(t.edges(), function (e) {
    var r = t.edge(e),
      n = t.node(e.v),
      i = t.node(e.w),
      o,
      a;
    r.points
      ? ((o = r.points[0]), (a = r.points[r.points.length - 1]))
      : ((r.points = []), (o = i), (a = n)),
      r.points.unshift(Yy(n, o)),
      r.points.push(Yy(i, a));
  });
}
function HY(t) {
  C(t.edges(), function (e) {
    var r = t.edge(e);
    if (B(r, 'x'))
      switch (
        ((r.labelpos === 'l' || r.labelpos === 'r') &&
          (r.width -= r.labeloffset),
        r.labelpos)
      ) {
        case 'l':
          r.x -= r.width / 2 + r.labeloffset;
          break;
        case 'r':
          r.x += r.width / 2 + r.labeloffset;
          break;
      }
  });
}
function GY(t) {
  C(t.edges(), function (e) {
    var r = t.edge(e);
    r.reversed && r.points.reverse();
  });
}
function jY(t) {
  C(t.nodes(), function (e) {
    if (t.children(e).length) {
      var r = t.node(e),
        n = t.node(r.borderTop),
        i = t.node(r.borderBottom),
        o = t.node(Xe(r.borderLeft)),
        a = t.node(Xe(r.borderRight));
      (r.width = Math.abs(a.x - o.x)),
        (r.height = Math.abs(i.y - n.y)),
        (r.x = o.x + r.width / 2),
        (r.y = n.y + r.height / 2);
    }
  }),
    C(t.nodes(), function (e) {
      t.node(e).dummy === 'border' && t.removeNode(e);
    });
}
function YY(t) {
  C(t.edges(), function (e) {
    if (e.v === e.w) {
      var r = t.node(e.v);
      r.selfEdges || (r.selfEdges = []),
        r.selfEdges.push({ e, label: t.edge(e) }),
        t.removeEdge(e);
    }
  });
}
function VY(t) {
  var e = ji(t);
  C(e, function (r) {
    var n = 0;
    C(r, function (i, o) {
      var a = t.node(i);
      (a.order = o + n),
        C(a.selfEdges, function (s) {
          zn(
            t,
            'selfedge',
            {
              width: s.label.width,
              height: s.label.height,
              rank: a.rank,
              order: o + ++n,
              e: s.e,
              label: s.label,
            },
            '_se'
          );
        }),
        delete a.selfEdges;
    });
  });
}
function XY(t) {
  C(t.nodes(), function (e) {
    var r = t.node(e);
    if (r.dummy === 'selfedge') {
      var n = t.node(r.e.v),
        i = n.x + n.width / 2,
        o = n.y,
        a = r.x - i,
        s = n.height / 2;
      t.setEdge(r.e, r.label),
        t.removeNode(e),
        (r.label.points = [
          { x: i + (2 * a) / 3, y: o - s },
          { x: i + (5 * a) / 6, y: o - s },
          { x: i + a, y: o },
          { x: i + (5 * a) / 6, y: o + s },
          { x: i + (2 * a) / 3, y: o + s },
        ]),
        (r.label.x = r.x),
        (r.label.y = r.y);
    }
  });
}
function p0(t, e) {
  return bo(Co(t, e), Number);
}
function d0(t) {
  var e = {};
  return (
    C(t, function (r, n) {
      e[n.toLowerCase()] = r;
    }),
    e
  );
}
var LY,
  IY,
  OY,
  RY,
  NY,
  FY,
  MY,
  BY,
  MN = f(() => {
    tt();
    Un();
    OR();
    BR();
    jy();
    Qy();
    f0();
    sN();
    vN();
    LN();
    FN();
    $n();
    (LY = ['nodesep', 'edgesep', 'ranksep', 'marginx', 'marginy']),
      (IY = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: 'tb' }),
      (OY = ['acyclicer', 'ranker', 'rankdir', 'align']),
      (RY = ['width', 'height']),
      (NY = { width: 0, height: 0 }),
      (FY = ['minlen', 'weight', 'width', 'height', 'labeloffset']),
      (MY = {
        minlen: 1,
        weight: 1,
        width: 0,
        height: 0,
        labeloffset: 10,
        labelpos: 'r',
      }),
      (BY = ['labelpos']);
  });
var BN = f(() => {
  jy();
  MN();
  Qy();
  f0();
});
function bn(t) {
  var e = {
    options: {
      directed: t.isDirected(),
      multigraph: t.isMultigraph(),
      compound: t.isCompound(),
    },
    nodes: KY(t),
    edges: ZY(t),
  };
  return xt(t.graph()) || (e.value = Ut(t.graph())), e;
}
function KY(t) {
  return z(t.nodes(), function (e) {
    var r = t.node(e),
      n = t.parent(e),
      i = { v: e };
    return xt(r) || (i.value = r), xt(n) || (i.parent = n), i;
  });
}
function ZY(t) {
  return z(t.edges(), function (e) {
    var r = t.edge(e),
      n = { v: e.v, w: e.w };
    return xt(e.name) || (n.name = e.name), xt(r) || (n.value = r), n;
  });
}
var g0 = f(() => {
  tt();
  rp();
});
var QY,
  JY,
  tV,
  eV,
  rV,
  nV,
  iV,
  oV,
  aV,
  sV,
  lV,
  DN,
  UN = f(() => {
    'use strict';
    xe();
    (QY = (t, e, r, n) => {
      e.forEach((i) => {
        lV[i](t, r, n);
      });
    }),
      (JY = (t, e, r) => {
        k.trace('Making markers for ', r),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-extensionStart')
            .attr('class', 'marker extension ' + e)
            .attr('refX', 18)
            .attr('refY', 7)
            .attr('markerWidth', 190)
            .attr('markerHeight', 240)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 1,7 L18,13 V 1 Z'),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-extensionEnd')
            .attr('class', 'marker extension ' + e)
            .attr('refX', 1)
            .attr('refY', 7)
            .attr('markerWidth', 20)
            .attr('markerHeight', 28)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 1,1 V 13 L18,7 Z');
      }),
      (tV = (t, e, r) => {
        t
          .append('defs')
          .append('marker')
          .attr('id', r + '_' + e + '-compositionStart')
          .attr('class', 'marker composition ' + e)
          .attr('refX', 18)
          .attr('refY', 7)
          .attr('markerWidth', 190)
          .attr('markerHeight', 240)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z'),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-compositionEnd')
            .attr('class', 'marker composition ' + e)
            .attr('refX', 1)
            .attr('refY', 7)
            .attr('markerWidth', 20)
            .attr('markerHeight', 28)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');
      }),
      (eV = (t, e, r) => {
        t
          .append('defs')
          .append('marker')
          .attr('id', r + '_' + e + '-aggregationStart')
          .attr('class', 'marker aggregation ' + e)
          .attr('refX', 18)
          .attr('refY', 7)
          .attr('markerWidth', 190)
          .attr('markerHeight', 240)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z'),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-aggregationEnd')
            .attr('class', 'marker aggregation ' + e)
            .attr('refX', 1)
            .attr('refY', 7)
            .attr('markerWidth', 20)
            .attr('markerHeight', 28)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');
      }),
      (rV = (t, e, r) => {
        t
          .append('defs')
          .append('marker')
          .attr('id', r + '_' + e + '-dependencyStart')
          .attr('class', 'marker dependency ' + e)
          .attr('refX', 6)
          .attr('refY', 7)
          .attr('markerWidth', 190)
          .attr('markerHeight', 240)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 5,7 L9,13 L1,7 L9,1 Z'),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-dependencyEnd')
            .attr('class', 'marker dependency ' + e)
            .attr('refX', 13)
            .attr('refY', 7)
            .attr('markerWidth', 20)
            .attr('markerHeight', 28)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 18,7 L9,13 L14,7 L9,1 Z');
      }),
      (nV = (t, e, r) => {
        t
          .append('defs')
          .append('marker')
          .attr('id', r + '_' + e + '-lollipopStart')
          .attr('class', 'marker lollipop ' + e)
          .attr('refX', 13)
          .attr('refY', 7)
          .attr('markerWidth', 190)
          .attr('markerHeight', 240)
          .attr('orient', 'auto')
          .append('circle')
          .attr('stroke', 'black')
          .attr('fill', 'transparent')
          .attr('cx', 7)
          .attr('cy', 7)
          .attr('r', 6),
          t
            .append('defs')
            .append('marker')
            .attr('id', r + '_' + e + '-lollipopEnd')
            .attr('class', 'marker lollipop ' + e)
            .attr('refX', 1)
            .attr('refY', 7)
            .attr('markerWidth', 190)
            .attr('markerHeight', 240)
            .attr('orient', 'auto')
            .append('circle')
            .attr('stroke', 'black')
            .attr('fill', 'transparent')
            .attr('cx', 7)
            .attr('cy', 7)
            .attr('r', 6);
      }),
      (iV = (t, e, r) => {
        t
          .append('marker')
          .attr('id', r + '_' + e + '-pointEnd')
          .attr('class', 'marker ' + e)
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 6)
          .attr('refY', 5)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', 12)
          .attr('markerHeight', 12)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 0 0 L 10 5 L 0 10 z')
          .attr('class', 'arrowMarkerPath')
          .style('stroke-width', 1)
          .style('stroke-dasharray', '1,0'),
          t
            .append('marker')
            .attr('id', r + '_' + e + '-pointStart')
            .attr('class', 'marker ' + e)
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 4.5)
            .attr('refY', 5)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('markerWidth', 12)
            .attr('markerHeight', 12)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 0 5 L 10 10 L 10 0 z')
            .attr('class', 'arrowMarkerPath')
            .style('stroke-width', 1)
            .style('stroke-dasharray', '1,0');
      }),
      (oV = (t, e, r) => {
        t
          .append('marker')
          .attr('id', r + '_' + e + '-circleEnd')
          .attr('class', 'marker ' + e)
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 11)
          .attr('refY', 5)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', 11)
          .attr('markerHeight', 11)
          .attr('orient', 'auto')
          .append('circle')
          .attr('cx', '5')
          .attr('cy', '5')
          .attr('r', '5')
          .attr('class', 'arrowMarkerPath')
          .style('stroke-width', 1)
          .style('stroke-dasharray', '1,0'),
          t
            .append('marker')
            .attr('id', r + '_' + e + '-circleStart')
            .attr('class', 'marker ' + e)
            .attr('viewBox', '0 0 10 10')
            .attr('refX', -1)
            .attr('refY', 5)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('markerWidth', 11)
            .attr('markerHeight', 11)
            .attr('orient', 'auto')
            .append('circle')
            .attr('cx', '5')
            .attr('cy', '5')
            .attr('r', '5')
            .attr('class', 'arrowMarkerPath')
            .style('stroke-width', 1)
            .style('stroke-dasharray', '1,0');
      }),
      (aV = (t, e, r) => {
        t
          .append('marker')
          .attr('id', r + '_' + e + '-crossEnd')
          .attr('class', 'marker cross ' + e)
          .attr('viewBox', '0 0 11 11')
          .attr('refX', 12)
          .attr('refY', 5.2)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', 11)
          .attr('markerHeight', 11)
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 1,1 l 9,9 M 10,1 l -9,9')
          .attr('class', 'arrowMarkerPath')
          .style('stroke-width', 2)
          .style('stroke-dasharray', '1,0'),
          t
            .append('marker')
            .attr('id', r + '_' + e + '-crossStart')
            .attr('class', 'marker cross ' + e)
            .attr('viewBox', '0 0 11 11')
            .attr('refX', -1)
            .attr('refY', 5.2)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('markerWidth', 11)
            .attr('markerHeight', 11)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 1,1 l 9,9 M 10,1 l -9,9')
            .attr('class', 'arrowMarkerPath')
            .style('stroke-width', 2)
            .style('stroke-dasharray', '1,0');
      }),
      (sV = (t, e, r) => {
        t.append('defs')
          .append('marker')
          .attr('id', r + '_' + e + '-barbEnd')
          .attr('refX', 19)
          .attr('refY', 7)
          .attr('markerWidth', 20)
          .attr('markerHeight', 14)
          .attr('markerUnits', 'strokeWidth')
          .attr('orient', 'auto')
          .append('path')
          .attr('d', 'M 19,7 L9,13 L14,7 L9,1 Z');
      }),
      (lV = {
        extension: JY,
        composition: tV,
        aggregation: eV,
        dependency: rV,
        lollipop: nV,
        point: iV,
        circle: oV,
        cross: aV,
        barb: sV,
      }),
      (DN = QY);
  });
var lp,
  cp,
  up,
  zN,
  $N,
  fp = f(() => {
    (lp = 'comm'),
      (cp = 'rule'),
      (up = 'decl'),
      (zN = '@import'),
      ($N = '@keyframes');
  });
function hp(t) {
  return t.trim();
}
function pp(t, e, r) {
  return t.replace(e, r);
}
function qN(t, e) {
  return t.indexOf(e);
}
function Vo(t, e) {
  return t.charCodeAt(e) | 0;
}
function Xo(t, e, r) {
  return t.slice(e, r);
}
function _n(t) {
  return t.length;
}
function dp(t) {
  return t.length;
}
function bs(t, e) {
  return e.push(t), t;
}
var WN,
  Tc,
  kc = f(() => {
    (WN = Math.abs), (Tc = String.fromCharCode);
  });
function gp(t, e, r, n, i, o, a) {
  return {
    value: t,
    root: e,
    parent: r,
    type: n,
    props: i,
    children: o,
    line: mp,
    column: _s,
    length: a,
    return: '',
  };
}
function GN() {
  return ve;
}
function jN() {
  return (
    (ve = an > 0 ? Vo(Cs, --an) : 0), _s--, ve === 10 && ((_s = 1), mp--), ve
  );
}
function sn() {
  return (
    (ve = an < HN ? Vo(Cs, an++) : 0), _s++, ve === 10 && ((_s = 1), mp++), ve
  );
}
function Xi() {
  return Vo(Cs, an);
}
function Ec() {
  return an;
}
function xp(t, e) {
  return Xo(Cs, t, e);
}
function x0(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function YN(t) {
  return (mp = _s = 1), (HN = _n((Cs = t))), (an = 0), [];
}
function VN(t) {
  return (Cs = ''), t;
}
function yp(t) {
  return hp(xp(an - 1, y0(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function XN(t) {
  for (; (ve = Xi()) && ve < 33; ) sn();
  return x0(t) > 2 || x0(ve) > 3 ? '' : ' ';
}
function KN(t, e) {
  for (
    ;
    --e &&
    sn() &&
    !(ve < 48 || ve > 102 || (ve > 57 && ve < 65) || (ve > 70 && ve < 97));

  );
  return xp(t, Ec() + (e < 6 && Xi() == 32 && sn() == 32));
}
function y0(t) {
  for (; sn(); )
    switch (ve) {
      case t:
        return an;
      case 34:
      case 39:
        t !== 34 && t !== 39 && y0(ve);
        break;
      case 40:
        t === 41 && y0(t);
        break;
      case 92:
        sn();
        break;
    }
  return an;
}
function ZN(t, e) {
  for (; sn() && t + ve !== 47 + 10; )
    if (t + ve === 42 + 42 && Xi() === 47) break;
  return '/*' + xp(e, an - 1) + '*' + Tc(t === 47 ? t : sn());
}
function QN(t) {
  for (; !x0(Xi()); ) sn();
  return xp(t, an);
}
var mp,
  _s,
  HN,
  an,
  ve,
  Cs,
  b0 = f(() => {
    kc();
    (mp = 1), (_s = 1), (HN = 0), (an = 0), (ve = 0), (Cs = '');
  });
function eF(t) {
  return VN(bp('', null, null, null, [''], (t = YN(t)), 0, [0], t));
}
function bp(t, e, r, n, i, o, a, s, l) {
  for (
    var c = 0,
      u = 0,
      h = a,
      p = 0,
      d = 0,
      m = 0,
      g = 1,
      E = 1,
      y = 1,
      T = 0,
      b = '',
      N = i,
      I = o,
      A = n,
      O = b;
    E;

  )
    switch (((m = T), (T = sn()))) {
      case 40:
        if (m != 108 && Vo(O, h - 1) == 58) {
          qN((O += pp(yp(T), '&', '&\f')), '&\f') != -1 && (y = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        O += yp(T);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        O += XN(m);
        break;
      case 92:
        O += KN(Ec() - 1, 7);
        continue;
      case 47:
        switch (Xi()) {
          case 42:
          case 47:
            bs(cV(ZN(sn(), Ec()), e, r), l);
            break;
          default:
            O += '/';
        }
        break;
      case 123 * g:
        s[c++] = _n(O) * y;
      case 125 * g:
      case 59:
      case 0:
        switch (T) {
          case 0:
          case 125:
            E = 0;
          case 59 + u:
            d > 0 &&
              _n(O) - h &&
              bs(
                d > 32
                  ? tF(O + ';', n, r, h - 1)
                  : tF(pp(O, ' ', '') + ';', n, r, h - 2),
                l
              );
            break;
          case 59:
            O += ';';
          default:
            if (
              (bs((A = JN(O, e, r, c, u, i, s, b, (N = []), (I = []), h)), o),
              T === 123)
            )
              if (u === 0) bp(O, e, A, A, N, o, h, s, I);
              else
                switch (p === 99 && Vo(O, 3) === 110 ? 100 : p) {
                  case 100:
                  case 109:
                  case 115:
                    bp(
                      t,
                      A,
                      A,
                      n && bs(JN(t, A, A, 0, 0, i, s, b, i, (N = []), h), I),
                      i,
                      I,
                      h,
                      s,
                      n ? N : I
                    );
                    break;
                  default:
                    bp(O, A, A, A, [''], I, 0, s, I);
                }
        }
        (c = u = d = 0), (g = y = 1), (b = O = ''), (h = a);
        break;
      case 58:
        (h = 1 + _n(O)), (d = m);
      default:
        if (g < 1) {
          if (T == 123) --g;
          else if (T == 125 && g++ == 0 && jN() == 125) continue;
        }
        switch (((O += Tc(T)), T * g)) {
          case 38:
            y = u > 0 ? 1 : ((O += '\f'), -1);
            break;
          case 44:
            (s[c++] = (_n(O) - 1) * y), (y = 1);
            break;
          case 64:
            Xi() === 45 && (O += yp(sn())),
              (p = Xi()),
              (u = h = _n((b = O += QN(Ec())))),
              T++;
            break;
          case 45:
            m === 45 && _n(O) == 2 && (g = 0);
        }
    }
  return o;
}
function JN(t, e, r, n, i, o, a, s, l, c, u) {
  for (
    var h = i - 1, p = i === 0 ? o : [''], d = dp(p), m = 0, g = 0, E = 0;
    m < n;
    ++m
  )
    for (var y = 0, T = Xo(t, h + 1, (h = WN((g = a[m])))), b = t; y < d; ++y)
      (b = hp(g > 0 ? p[y] + ' ' + T : pp(T, /&\f/g, p[y]))) && (l[E++] = b);
  return gp(t, e, r, i === 0 ? cp : s, l, c, u);
}
function cV(t, e, r) {
  return gp(t, e, r, lp, Tc(GN()), Xo(t, 2, -2), 0);
}
function tF(t, e, r, n) {
  return gp(t, e, r, up, Xo(t, 0, n), Xo(t, n + 1, -1), n);
}
var rF = f(() => {
  fp();
  kc();
  b0();
});
var nF = f(() => {});
function _p(t, e) {
  for (var r = '', n = dp(t), i = 0; i < n; i++) r += e(t[i], i, t, e) || '';
  return r;
}
function iF(t, e, r, n) {
  switch (t.type) {
    case zN:
    case up:
      return (t.return = t.return || t.value);
    case lp:
      return '';
    case $N:
      return (t.return = t.value + '{' + _p(t.children, n) + '}');
    case cp:
      t.value = t.props.join(',');
  }
  return _n((r = _p(t.children, n)))
    ? (t.return = t.value + '{' + r + '}')
    : '';
}
var oF = f(() => {
  fp();
  kc();
});
var aF = f(() => {});
var sF = f(() => {
  fp();
  kc();
  rF();
  nF();
  b0();
  oF();
  aF();
});
var _0,
  lF = f(() => {
    _0 = '11.0.0-alpha.2';
  });
var cF,
  uF = f(() => {
    'use strict';
    gn();
    Ar();
    cF = (t) => {
      let { securityLevel: e } = rt(),
        r = ft('body');
      if (e === 'sandbox') {
        let o = ft(`#i${t}`).node()?.contentDocument ?? document;
        r = ft(o.body);
      }
      return r.select(`#${t}`);
    };
  });
var fV,
  hV,
  C0,
  Cp,
  Tp = f(() => {
    'use strict';
    xe();
    (fV = function (t, e) {
      for (let r of e) t.attr(r[0], r[1]);
    }),
      (hV = function (t, e, r) {
        let n = new Map();
        return (
          r
            ? (n.set('width', '100%'), n.set('style', `max-width: ${e}px;`))
            : (n.set('height', t), n.set('width', e)),
          n
        );
      }),
      (C0 = function (t, e, r, n) {
        let i = hV(e, r, n);
        fV(t, i);
      }),
      (Cp = function (t, e, r, n) {
        let i = e.node().getBBox(),
          o = i.width,
          a = i.height;
        k.info(`SVG bounds: ${o}x${a}`, i);
        let s = 0,
          l = 0;
        k.info(`Graph bounds: ${s}x${l}`, t),
          (s = o + r * 2),
          (l = a + r * 2),
          k.info(`Calculated bounds: ${s}x${l}`),
          C0(e, l, s, n);
        let c = `${i.x - r} ${i.y - r} ${i.width + 2 * r} ${i.height + 2 * r}`;
        e.attr('viewBox', c);
      });
  });
var pV,
  T0,
  fF,
  k0 = f(() => {
    'use strict';
    xe();
    uF();
    Tp();
    (pV = (t, e, r) => {
      k.debug(`renering svg for syntax error
`);
      let n = cF(e);
      n.attr('viewBox', '0 0 2412 512'), C0(n, 100, 512, !0);
      let i = n.append('g');
      i
        .append('path')
        .attr('class', 'error-icon')
        .attr(
          'd',
          'm411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z'
        ),
        i
          .append('path')
          .attr('class', 'error-icon')
          .attr(
            'd',
            'm459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z'
          ),
        i
          .append('path')
          .attr('class', 'error-icon')
          .attr(
            'd',
            'm340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z'
          ),
        i
          .append('path')
          .attr('class', 'error-icon')
          .attr(
            'd',
            'm400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z'
          ),
        i
          .append('path')
          .attr('class', 'error-icon')
          .attr(
            'd',
            'm496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z'
          ),
        i
          .append('path')
          .attr('class', 'error-icon')
          .attr(
            'd',
            'm436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z'
          ),
        i
          .append('text')
          .attr('class', 'error-text')
          .attr('x', 1440)
          .attr('y', 250)
          .attr('font-size', '150px')
          .style('text-anchor', 'middle')
          .text('Syntax error in text'),
        i
          .append('text')
          .attr('class', 'error-text')
          .attr('x', 1250)
          .attr('y', 400)
          .attr('font-size', '100px')
          .style('text-anchor', 'middle')
          .text(`mermaid version ${r}`);
    }),
      (T0 = { draw: pV }),
      (fF = T0);
  });
var dV,
  hF,
  pF = f(() => {
    'use strict';
    k0();
    (dV = { db: {}, renderer: T0, parser: { parse: () => {} } }), (hF = dV);
  });
var kp,
  mV,
  dF,
  mF,
  E0 = f(() => {
    'use strict';
    xe();
    (kp = {}),
      (mV = (t, e, r) => {
        let n = '';
        return (
          t in kp && kp[t] ? (n = kp[t](r)) : k.warn(`No theme found for ${t}`),
          ` & {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
    fill: ${r.textColor}
  }

  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${r.errorBkgColor};
  }
  & .error-text {
    fill: ${r.errorTextColor};
    stroke: ${r.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: 2px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }

  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${r.lineColor};
    stroke: ${r.lineColor};
  }
  & .marker.cross {
    stroke: ${r.lineColor};
  }

  & svg {
    font-family: ${r.fontFamily};
    font-size: ${r.fontSize};
  }

  ${n}

  ${e}
`
        );
      }),
      (dF = (t, e) => {
        e !== void 0 && (kp[t] = e);
      }),
      (mF = mV);
  });
var gV,
  xV,
  gF,
  yV,
  bV,
  _V,
  Ep,
  wc,
  S0,
  w0,
  v0 = f(() => {
    'use strict';
    pc();
    xe();
    Ar();
    en();
    Tp();
    E0();
    Py();
    (gV = k),
      (xV = fc),
      (gF = rt),
      (yV = (t) => Pn(t, gF())),
      (bV = Cp),
      (_V = () => By),
      (Ep = {}),
      (wc = (t, e, r) => {
        if (Ep[t]) throw new Error(`Diagram ${t} already registered.`);
        (Ep[t] = e),
          r && my(t, r),
          dF(t, e.styles),
          e.injectUtils?.(gV, xV, gF, yV, bV, _V(), () => {});
      }),
      (S0 = (t) => {
        if (t in Ep) return Ep[t];
        throw new w0(t);
      }),
      (w0 = class extends Error {
        constructor(e) {
          super(`Diagram ${e} not found.`);
        }
      });
  });
var xF,
  wp,
  yF = f(() => {
    'use strict';
    _F();
    pF();
    pc();
    v0();
    (xF = !1),
      (wp = () => {
        xF ||
          ((xF = !0),
          wc('error', hF, (t) => t.toLowerCase().trim() === 'error'),
          wc(
            '---',
            {
              db: { clear: () => {} },
              styles: {},
              renderer: { draw: () => {} },
              parser: {
                parse: () => {
                  throw new Error(
                    "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
                  );
                },
              },
              init: () => null,
            },
            (t) => t.toLowerCase().trimStart().startsWith('---')
          ),
          DO(bF));
      });
  });
var Sc,
  Sp,
  CF = f(() => {
    'use strict';
    Ar();
    xe();
    v0();
    pc();
    dy();
    (Sc = class {
      constructor(e, r = {}) {
        this.text = e;
        this.metadata = r;
        this.type = 'graph';
        this.text += `
`;
        let n = rt();
        try {
          this.type = hc(e, n);
        } catch (o) {
          (this.type = 'error'), (this.detectError = o);
        }
        let i = S0(this.type);
        k.debug('Type ' + this.type),
          (this.db = i.db),
          (this.renderer = i.renderer),
          (this.parser = i.parser),
          this.parser.parser && (this.parser.parser.yy = this.db),
          (this.init = i.init),
          this.parse();
      }
      parse() {
        if (this.detectError) throw this.detectError;
        this.db.clear?.();
        let e = rt();
        this.init?.(e),
          this.metadata.title && this.db.setDiagramTitle?.(this.metadata.title),
          this.parser.parse(this.text);
      }
      async render(e, r) {
        await this.renderer.draw(this.text, e, r, this);
      }
      getParser() {
        return this.parser;
      }
      getType() {
        return this.type;
      }
    }),
      (Sp = async (t, e = {}) => {
        let r = hc(t, rt());
        try {
          S0(r);
        } catch {
          let i = UO(r);
          if (!i) throw new ms(`Diagram ${r} not found.`);
          let { id: o, diagram: a } = await i();
          wc(o, a);
        }
        return new Sc(t, e);
      });
  });
var TF,
  kF,
  EF = f(() => {
    'use strict';
    (TF = []),
      (kF = () => {
        TF.forEach((t) => {
          t();
        }),
          (TF = []);
      });
  });
function wF(t, e) {
  t.attr('role', CV), e !== '' && t.attr('aria-roledescription', e);
}
function SF(t, e, r, n) {
  if (t.insert !== void 0) {
    if (r) {
      let i = `chart-desc-${n}`;
      t.attr('aria-describedby', i),
        t.insert('desc', ':first-child').attr('id', i).text(r);
    }
    if (e) {
      let i = `chart-title-${n}`;
      t.attr('aria-labelledby', i),
        t.insert('title', ':first-child').attr('id', i).text(e);
    }
  }
}
var CV,
  vF = f(() => {
    'use strict';
    CV = 'graphics-document document';
  });
var AF,
  LF = f(() => {
    'use strict';
    AF = (t) => t.replace(/^\s*%%(?!{)[^\n]+\n?/gm, '').trimStart();
  });
function GF(t) {
  return typeof t > 'u' || t === null;
}
function TV(t) {
  return typeof t == 'object' && t !== null;
}
function kV(t) {
  return Array.isArray(t) ? t : GF(t) ? [] : [t];
}
function EV(t, e) {
  var r, n, i, o;
  if (e)
    for (o = Object.keys(e), r = 0, n = o.length; r < n; r += 1)
      (i = o[r]), (t[i] = e[i]);
  return t;
}
function wV(t, e) {
  var r = '',
    n;
  for (n = 0; n < e; n += 1) r += t;
  return r;
}
function SV(t) {
  return t === 0 && Number.NEGATIVE_INFINITY === 1 / t;
}
function jF(t, e) {
  var r = '',
    n = t.reason || '(unknown reason)';
  return t.mark
    ? (t.mark.name && (r += 'in "' + t.mark.name + '" '),
      (r += '(' + (t.mark.line + 1) + ':' + (t.mark.column + 1) + ')'),
      !e &&
        t.mark.snippet &&
        (r +=
          `

` + t.mark.snippet),
      n + ' ' + r)
    : n;
}
function Ac(t, e) {
  Error.call(this),
    (this.name = 'YAMLException'),
    (this.reason = t),
    (this.mark = e),
    (this.message = jF(this, !1)),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack || '');
}
function A0(t, e, r, n, i) {
  var o = '',
    a = '',
    s = Math.floor(i / 2) - 1;
  return (
    n - e > s && ((o = ' ... '), (e = n - s + o.length)),
    r - n > s && ((a = ' ...'), (r = n + s - a.length)),
    {
      str: o + t.slice(e, r).replace(/\t/g, '\u2192') + a,
      pos: n - e + o.length,
    }
  );
}
function L0(t, e) {
  return Ne.repeat(' ', e - t.length) + t;
}
function NV(t, e) {
  if (((e = Object.create(e || null)), !t.buffer)) return null;
  e.maxLength || (e.maxLength = 79),
    typeof e.indent != 'number' && (e.indent = 1),
    typeof e.linesBefore != 'number' && (e.linesBefore = 3),
    typeof e.linesAfter != 'number' && (e.linesAfter = 2);
  for (
    var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1;
    (o = r.exec(t.buffer));

  )
    i.push(o.index),
      n.push(o.index + o[0].length),
      t.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = '',
    l,
    c,
    u = Math.min(t.line + e.linesAfter, i.length).toString().length,
    h = e.maxLength - (e.indent + u + 3);
  for (l = 1; l <= e.linesBefore && !(a - l < 0); l++)
    (c = A0(t.buffer, n[a - l], i[a - l], t.position - (n[a] - n[a - l]), h)),
      (s =
        Ne.repeat(' ', e.indent) +
        L0((t.line - l + 1).toString(), u) +
        ' | ' +
        c.str +
        `
` +
        s);
  for (
    c = A0(t.buffer, n[a], i[a], t.position, h),
      s +=
        Ne.repeat(' ', e.indent) +
        L0((t.line + 1).toString(), u) +
        ' | ' +
        c.str +
        `
`,
      s +=
        Ne.repeat('-', e.indent + u + 3 + c.pos) +
        `^
`,
      l = 1;
    l <= e.linesAfter && !(a + l >= i.length);
    l++
  )
    (c = A0(t.buffer, n[a + l], i[a + l], t.position - (n[a] - n[a + l]), h)),
      (s +=
        Ne.repeat(' ', e.indent) +
        L0((t.line + l + 1).toString(), u) +
        ' | ' +
        c.str +
        `
`);
  return s.replace(/\n$/, '');
}
function PV(t) {
  var e = {};
  return (
    t !== null &&
      Object.keys(t).forEach(function (r) {
        t[r].forEach(function (n) {
          e[String(n)] = r;
        });
      }),
    e
  );
}
function DV(t, e) {
  if (
    ((e = e || {}),
    Object.keys(e).forEach(function (r) {
      if (MV.indexOf(r) === -1)
        throw new Lr(
          'Unknown option "' +
            r +
            '" is met in definition of "' +
            t +
            '" YAML type.'
        );
    }),
    (this.options = e),
    (this.tag = t),
    (this.kind = e.kind || null),
    (this.resolve =
      e.resolve ||
      function () {
        return !0;
      }),
    (this.construct =
      e.construct ||
      function (r) {
        return r;
      }),
    (this.instanceOf = e.instanceOf || null),
    (this.predicate = e.predicate || null),
    (this.represent = e.represent || null),
    (this.representName = e.representName || null),
    (this.defaultStyle = e.defaultStyle || null),
    (this.multi = e.multi || !1),
    (this.styleAliases = PV(e.styleAliases || null)),
    BV.indexOf(this.kind) === -1)
  )
    throw new Lr(
      'Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.'
    );
}
function IF(t, e) {
  var r = [];
  return (
    t[e].forEach(function (n) {
      var i = r.length;
      r.forEach(function (o, a) {
        o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
      }),
        (r[i] = n);
    }),
    r
  );
}
function UV() {
  var t = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: { scalar: [], sequence: [], mapping: [], fallback: [] },
    },
    e,
    r;
  function n(i) {
    i.multi
      ? (t.multi[i.kind].push(i), t.multi.fallback.push(i))
      : (t[i.kind][i.tag] = t.fallback[i.tag] = i);
  }
  for (e = 0, r = arguments.length; e < r; e += 1) arguments[e].forEach(n);
  return t;
}
function O0(t) {
  return this.extend(t);
}
function GV(t) {
  if (t === null) return !0;
  var e = t.length;
  return (
    (e === 1 && t === '~') ||
    (e === 4 && (t === 'null' || t === 'Null' || t === 'NULL'))
  );
}
function jV() {
  return null;
}
function YV(t) {
  return t === null;
}
function XV(t) {
  if (t === null) return !1;
  var e = t.length;
  return (
    (e === 4 && (t === 'true' || t === 'True' || t === 'TRUE')) ||
    (e === 5 && (t === 'false' || t === 'False' || t === 'FALSE'))
  );
}
function KV(t) {
  return t === 'true' || t === 'True' || t === 'TRUE';
}
function ZV(t) {
  return Object.prototype.toString.call(t) === '[object Boolean]';
}
function JV(t) {
  return (48 <= t && t <= 57) || (65 <= t && t <= 70) || (97 <= t && t <= 102);
}
function tX(t) {
  return 48 <= t && t <= 55;
}
function eX(t) {
  return 48 <= t && t <= 57;
}
function rX(t) {
  if (t === null) return !1;
  var e = t.length,
    r = 0,
    n = !1,
    i;
  if (!e) return !1;
  if (((i = t[r]), (i === '-' || i === '+') && (i = t[++r]), i === '0')) {
    if (r + 1 === e) return !0;
    if (((i = t[++r]), i === 'b')) {
      for (r++; r < e; r++)
        if (((i = t[r]), i !== '_')) {
          if (i !== '0' && i !== '1') return !1;
          n = !0;
        }
      return n && i !== '_';
    }
    if (i === 'x') {
      for (r++; r < e; r++)
        if (((i = t[r]), i !== '_')) {
          if (!JV(t.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== '_';
    }
    if (i === 'o') {
      for (r++; r < e; r++)
        if (((i = t[r]), i !== '_')) {
          if (!tX(t.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== '_';
    }
  }
  if (i === '_') return !1;
  for (; r < e; r++)
    if (((i = t[r]), i !== '_')) {
      if (!eX(t.charCodeAt(r))) return !1;
      n = !0;
    }
  return !(!n || i === '_');
}
function nX(t) {
  var e = t,
    r = 1,
    n;
  if (
    (e.indexOf('_') !== -1 && (e = e.replace(/_/g, '')),
    (n = e[0]),
    (n === '-' || n === '+') &&
      (n === '-' && (r = -1), (e = e.slice(1)), (n = e[0])),
    e === '0')
  )
    return 0;
  if (n === '0') {
    if (e[1] === 'b') return r * parseInt(e.slice(2), 2);
    if (e[1] === 'x') return r * parseInt(e.slice(2), 16);
    if (e[1] === 'o') return r * parseInt(e.slice(2), 8);
  }
  return r * parseInt(e, 10);
}
function iX(t) {
  return (
    Object.prototype.toString.call(t) === '[object Number]' &&
    t % 1 === 0 &&
    !Ne.isNegativeZero(t)
  );
}
function sX(t) {
  return !(t === null || !aX.test(t) || t[t.length - 1] === '_');
}
function lX(t) {
  var e, r;
  return (
    (e = t.replace(/_/g, '').toLowerCase()),
    (r = e[0] === '-' ? -1 : 1),
    '+-'.indexOf(e[0]) >= 0 && (e = e.slice(1)),
    e === '.inf'
      ? r === 1
        ? Number.POSITIVE_INFINITY
        : Number.NEGATIVE_INFINITY
      : e === '.nan'
      ? NaN
      : r * parseFloat(e, 10)
  );
}
function uX(t, e) {
  var r;
  if (isNaN(t))
    switch (e) {
      case 'lowercase':
        return '.nan';
      case 'uppercase':
        return '.NAN';
      case 'camelcase':
        return '.NaN';
    }
  else if (Number.POSITIVE_INFINITY === t)
    switch (e) {
      case 'lowercase':
        return '.inf';
      case 'uppercase':
        return '.INF';
      case 'camelcase':
        return '.Inf';
    }
  else if (Number.NEGATIVE_INFINITY === t)
    switch (e) {
      case 'lowercase':
        return '-.inf';
      case 'uppercase':
        return '-.INF';
      case 'camelcase':
        return '-.Inf';
    }
  else if (Ne.isNegativeZero(t)) return '-0.0';
  return (r = t.toString(10)), cX.test(r) ? r.replace('e', '.e') : r;
}
function fX(t) {
  return (
    Object.prototype.toString.call(t) === '[object Number]' &&
    (t % 1 !== 0 || Ne.isNegativeZero(t))
  );
}
function dX(t) {
  return t === null ? !1 : VF.exec(t) !== null || XF.exec(t) !== null;
}
function mX(t) {
  var e,
    r,
    n,
    i,
    o,
    a,
    s,
    l = 0,
    c = null,
    u,
    h,
    p;
  if (((e = VF.exec(t)), e === null && (e = XF.exec(t)), e === null))
    throw new Error('Date resolve error');
  if (((r = +e[1]), (n = +e[2] - 1), (i = +e[3]), !e[4]))
    return new Date(Date.UTC(r, n, i));
  if (((o = +e[4]), (a = +e[5]), (s = +e[6]), e[7])) {
    for (l = e[7].slice(0, 3); l.length < 3; ) l += '0';
    l = +l;
  }
  return (
    e[9] &&
      ((u = +e[10]),
      (h = +(e[11] || 0)),
      (c = (u * 60 + h) * 6e4),
      e[9] === '-' && (c = -c)),
    (p = new Date(Date.UTC(r, n, i, o, a, s, l))),
    c && p.setTime(p.getTime() - c),
    p
  );
}
function gX(t) {
  return t.toISOString();
}
function yX(t) {
  return t === '<<' || t === null;
}
function _X(t) {
  if (t === null) return !1;
  var e,
    r,
    n = 0,
    i = t.length,
    o = B0;
  for (r = 0; r < i; r++)
    if (((e = o.indexOf(t.charAt(r))), !(e > 64))) {
      if (e < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function CX(t) {
  var e,
    r,
    n = t.replace(/[\r\n=]/g, ''),
    i = n.length,
    o = B0,
    a = 0,
    s = [];
  for (e = 0; e < i; e++)
    e % 4 === 0 &&
      e &&
      (s.push((a >> 16) & 255), s.push((a >> 8) & 255), s.push(a & 255)),
      (a = (a << 6) | o.indexOf(n.charAt(e)));
  return (
    (r = (i % 4) * 6),
    r === 0
      ? (s.push((a >> 16) & 255), s.push((a >> 8) & 255), s.push(a & 255))
      : r === 18
      ? (s.push((a >> 10) & 255), s.push((a >> 2) & 255))
      : r === 12 && s.push((a >> 4) & 255),
    new Uint8Array(s)
  );
}
function TX(t) {
  var e = '',
    r = 0,
    n,
    i,
    o = t.length,
    a = B0;
  for (n = 0; n < o; n++)
    n % 3 === 0 &&
      n &&
      ((e += a[(r >> 18) & 63]),
      (e += a[(r >> 12) & 63]),
      (e += a[(r >> 6) & 63]),
      (e += a[r & 63])),
      (r = (r << 8) + t[n]);
  return (
    (i = o % 3),
    i === 0
      ? ((e += a[(r >> 18) & 63]),
        (e += a[(r >> 12) & 63]),
        (e += a[(r >> 6) & 63]),
        (e += a[r & 63]))
      : i === 2
      ? ((e += a[(r >> 10) & 63]),
        (e += a[(r >> 4) & 63]),
        (e += a[(r << 2) & 63]),
        (e += a[64]))
      : i === 1 &&
        ((e += a[(r >> 2) & 63]),
        (e += a[(r << 4) & 63]),
        (e += a[64]),
        (e += a[64])),
    e
  );
}
function kX(t) {
  return Object.prototype.toString.call(t) === '[object Uint8Array]';
}
function vX(t) {
  if (t === null) return !0;
  var e = [],
    r,
    n,
    i,
    o,
    a,
    s = t;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (((i = s[r]), (a = !1), SX.call(i) !== '[object Object]')) return !1;
    for (o in i)
      if (wX.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (e.indexOf(o) === -1) e.push(o);
    else return !1;
  }
  return !0;
}
function AX(t) {
  return t !== null ? t : [];
}
function OX(t) {
  if (t === null) return !0;
  var e,
    r,
    n,
    i,
    o,
    a = t;
  for (o = new Array(a.length), e = 0, r = a.length; e < r; e += 1) {
    if (
      ((n = a[e]),
      IX.call(n) !== '[object Object]' ||
        ((i = Object.keys(n)), i.length !== 1))
    )
      return !1;
    o[e] = [i[0], n[i[0]]];
  }
  return !0;
}
function RX(t) {
  if (t === null) return [];
  var e,
    r,
    n,
    i,
    o,
    a = t;
  for (o = new Array(a.length), e = 0, r = a.length; e < r; e += 1)
    (n = a[e]), (i = Object.keys(n)), (o[e] = [i[0], n[i[0]]]);
  return o;
}
function MX(t) {
  if (t === null) return !0;
  var e,
    r = t;
  for (e in r) if (FX.call(r, e) && r[e] !== null) return !1;
  return !0;
}
function BX(t) {
  return t !== null ? t : {};
}
function RF(t) {
  return Object.prototype.toString.call(t);
}
function Wn(t) {
  return t === 10 || t === 13;
}
function Zo(t) {
  return t === 9 || t === 32;
}
function Ir(t) {
  return t === 9 || t === 32 || t === 10 || t === 13;
}
function ks(t) {
  return t === 44 || t === 91 || t === 93 || t === 123 || t === 125;
}
function WX(t) {
  var e;
  return 48 <= t && t <= 57
    ? t - 48
    : ((e = t | 32), 97 <= e && e <= 102 ? e - 97 + 10 : -1);
}
function qX(t) {
  return t === 120 ? 2 : t === 117 ? 4 : t === 85 ? 8 : 0;
}
function HX(t) {
  return 48 <= t && t <= 57 ? t - 48 : -1;
}
function NF(t) {
  return t === 48
    ? '\0'
    : t === 97
    ? '\x07'
    : t === 98
    ? '\b'
    : t === 116 || t === 9
    ? '	'
    : t === 110
    ? `
`
    : t === 118
    ? '\v'
    : t === 102
    ? '\f'
    : t === 114
    ? '\r'
    : t === 101
    ? '\x1B'
    : t === 32
    ? ' '
    : t === 34
    ? '"'
    : t === 47
    ? '/'
    : t === 92
    ? '\\'
    : t === 78
    ? '\x85'
    : t === 95
    ? '\xA0'
    : t === 76
    ? '\u2028'
    : t === 80
    ? '\u2029'
    : '';
}
function GX(t) {
  return t <= 65535
    ? String.fromCharCode(t)
    : String.fromCharCode(
        ((t - 65536) >> 10) + 55296,
        ((t - 65536) & 1023) + 56320
      );
}
function jX(t, e) {
  (this.input = t),
    (this.filename = e.filename || null),
    (this.schema = e.schema || KF),
    (this.onWarning = e.onWarning || null),
    (this.legacy = e.legacy || !1),
    (this.json = e.json || !1),
    (this.listener = e.listener || null),
    (this.implicitTypes = this.schema.compiledImplicit),
    (this.typeMap = this.schema.compiledTypeMap),
    (this.length = t.length),
    (this.position = 0),
    (this.line = 0),
    (this.lineStart = 0),
    (this.lineIndent = 0),
    (this.firstTabInLine = -1),
    (this.documents = []);
}
function nM(t, e) {
  var r = {
    name: t.filename,
    buffer: t.input.slice(0, -1),
    position: t.position,
    line: t.line,
    column: t.position - t.lineStart,
  };
  return (r.snippet = FV(r)), new Lr(e, r);
}
function at(t, e) {
  throw nM(t, e);
}
function Lp(t, e) {
  t.onWarning && t.onWarning.call(null, nM(t, e));
}
function Ki(t, e, r, n) {
  var i, o, a, s;
  if (e < r) {
    if (((s = t.input.slice(e, r)), n))
      for (i = 0, o = s.length; i < o; i += 1)
        (a = s.charCodeAt(i)),
          a === 9 ||
            (32 <= a && a <= 1114111) ||
            at(t, 'expected valid JSON character');
    else UX.test(s) && at(t, 'the stream contains non-printable characters');
    t.result += s;
  }
}
function MF(t, e, r, n) {
  var i, o, a, s;
  for (
    Ne.isObject(r) ||
      at(
        t,
        'cannot merge mappings; the provided source object is unacceptable'
      ),
      i = Object.keys(r),
      a = 0,
      s = i.length;
    a < s;
    a += 1
  )
    (o = i[a]), Zi.call(e, o) || ((e[o] = r[o]), (n[o] = !0));
}
function Es(t, e, r, n, i, o, a, s, l) {
  var c, u;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, u = i.length; c < u; c += 1)
      Array.isArray(i[c]) &&
        at(t, 'nested arrays are not supported inside keys'),
        typeof i == 'object' &&
          RF(i[c]) === '[object Object]' &&
          (i[c] = '[object Object]');
  if (
    (typeof i == 'object' &&
      RF(i) === '[object Object]' &&
      (i = '[object Object]'),
    (i = String(i)),
    e === null && (e = {}),
    n === 'tag:yaml.org,2002:merge')
  )
    if (Array.isArray(o))
      for (c = 0, u = o.length; c < u; c += 1) MF(t, e, o[c], r);
    else MF(t, e, o, r);
  else
    !t.json &&
      !Zi.call(r, i) &&
      Zi.call(e, i) &&
      ((t.line = a || t.line),
      (t.lineStart = s || t.lineStart),
      (t.position = l || t.position),
      at(t, 'duplicated mapping key')),
      i === '__proto__'
        ? Object.defineProperty(e, i, {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: o,
          })
        : (e[i] = o),
      delete r[i];
  return e;
}
function P0(t) {
  var e;
  (e = t.input.charCodeAt(t.position)),
    e === 10
      ? t.position++
      : e === 13
      ? (t.position++, t.input.charCodeAt(t.position) === 10 && t.position++)
      : at(t, 'a line break is expected'),
    (t.line += 1),
    (t.lineStart = t.position),
    (t.firstTabInLine = -1);
}
function Ae(t, e, r) {
  for (var n = 0, i = t.input.charCodeAt(t.position); i !== 0; ) {
    for (; Zo(i); )
      i === 9 && t.firstTabInLine === -1 && (t.firstTabInLine = t.position),
        (i = t.input.charCodeAt(++t.position));
    if (e && i === 35)
      do i = t.input.charCodeAt(++t.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Wn(i))
      for (
        P0(t), i = t.input.charCodeAt(t.position), n++, t.lineIndent = 0;
        i === 32;

      )
        t.lineIndent++, (i = t.input.charCodeAt(++t.position));
    else break;
  }
  return (
    r !== -1 && n !== 0 && t.lineIndent < r && Lp(t, 'deficient indentation'), n
  );
}
function Rp(t) {
  var e = t.position,
    r;
  return (
    (r = t.input.charCodeAt(e)),
    !!(
      (r === 45 || r === 46) &&
      r === t.input.charCodeAt(e + 1) &&
      r === t.input.charCodeAt(e + 2) &&
      ((e += 3), (r = t.input.charCodeAt(e)), r === 0 || Ir(r))
    )
  );
}
function D0(t, e) {
  e === 1
    ? (t.result += ' ')
    : e > 1 &&
      (t.result += Ne.repeat(
        `
`,
        e - 1
      ));
}
function YX(t, e, r) {
  var n,
    i,
    o,
    a,
    s,
    l,
    c,
    u,
    h = t.kind,
    p = t.result,
    d;
  if (
    ((d = t.input.charCodeAt(t.position)),
    Ir(d) ||
      ks(d) ||
      d === 35 ||
      d === 38 ||
      d === 42 ||
      d === 33 ||
      d === 124 ||
      d === 62 ||
      d === 39 ||
      d === 34 ||
      d === 37 ||
      d === 64 ||
      d === 96 ||
      ((d === 63 || d === 45) &&
        ((i = t.input.charCodeAt(t.position + 1)), Ir(i) || (r && ks(i)))))
  )
    return !1;
  for (
    t.kind = 'scalar', t.result = '', o = a = t.position, s = !1;
    d !== 0;

  ) {
    if (d === 58) {
      if (((i = t.input.charCodeAt(t.position + 1)), Ir(i) || (r && ks(i))))
        break;
    } else if (d === 35) {
      if (((n = t.input.charCodeAt(t.position - 1)), Ir(n))) break;
    } else {
      if ((t.position === t.lineStart && Rp(t)) || (r && ks(d))) break;
      if (Wn(d))
        if (
          ((l = t.line),
          (c = t.lineStart),
          (u = t.lineIndent),
          Ae(t, !1, -1),
          t.lineIndent >= e)
        ) {
          (s = !0), (d = t.input.charCodeAt(t.position));
          continue;
        } else {
          (t.position = a), (t.line = l), (t.lineStart = c), (t.lineIndent = u);
          break;
        }
    }
    s && (Ki(t, o, a, !1), D0(t, t.line - l), (o = a = t.position), (s = !1)),
      Zo(d) || (a = t.position + 1),
      (d = t.input.charCodeAt(++t.position));
  }
  return Ki(t, o, a, !1), t.result ? !0 : ((t.kind = h), (t.result = p), !1);
}
function VX(t, e) {
  var r, n, i;
  if (((r = t.input.charCodeAt(t.position)), r !== 39)) return !1;
  for (
    t.kind = 'scalar', t.result = '', t.position++, n = i = t.position;
    (r = t.input.charCodeAt(t.position)) !== 0;

  )
    if (r === 39)
      if (
        (Ki(t, n, t.position, !0),
        (r = t.input.charCodeAt(++t.position)),
        r === 39)
      )
        (n = t.position), t.position++, (i = t.position);
      else return !0;
    else
      Wn(r)
        ? (Ki(t, n, i, !0), D0(t, Ae(t, !1, e)), (n = i = t.position))
        : t.position === t.lineStart && Rp(t)
        ? at(t, 'unexpected end of the document within a single quoted scalar')
        : (t.position++, (i = t.position));
  at(t, 'unexpected end of the stream within a single quoted scalar');
}
function XX(t, e) {
  var r, n, i, o, a, s;
  if (((s = t.input.charCodeAt(t.position)), s !== 34)) return !1;
  for (
    t.kind = 'scalar', t.result = '', t.position++, r = n = t.position;
    (s = t.input.charCodeAt(t.position)) !== 0;

  ) {
    if (s === 34) return Ki(t, r, t.position, !0), t.position++, !0;
    if (s === 92) {
      if (
        (Ki(t, r, t.position, !0),
        (s = t.input.charCodeAt(++t.position)),
        Wn(s))
      )
        Ae(t, !1, e);
      else if (s < 256 && eM[s]) (t.result += rM[s]), t.position++;
      else if ((a = qX(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          (s = t.input.charCodeAt(++t.position)),
            (a = WX(s)) >= 0
              ? (o = (o << 4) + a)
              : at(t, 'expected hexadecimal character');
        (t.result += GX(o)), t.position++;
      } else at(t, 'unknown escape sequence');
      r = n = t.position;
    } else
      Wn(s)
        ? (Ki(t, r, n, !0), D0(t, Ae(t, !1, e)), (r = n = t.position))
        : t.position === t.lineStart && Rp(t)
        ? at(t, 'unexpected end of the document within a double quoted scalar')
        : (t.position++, (n = t.position));
  }
  at(t, 'unexpected end of the stream within a double quoted scalar');
}
function KX(t, e) {
  var r = !0,
    n,
    i,
    o,
    a = t.tag,
    s,
    l = t.anchor,
    c,
    u,
    h,
    p,
    d,
    m = Object.create(null),
    g,
    E,
    y,
    T;
  if (((T = t.input.charCodeAt(t.position)), T === 91))
    (u = 93), (d = !1), (s = []);
  else if (T === 123) (u = 125), (d = !0), (s = {});
  else return !1;
  for (
    t.anchor !== null && (t.anchorMap[t.anchor] = s),
      T = t.input.charCodeAt(++t.position);
    T !== 0;

  ) {
    if ((Ae(t, !0, e), (T = t.input.charCodeAt(t.position)), T === u))
      return (
        t.position++,
        (t.tag = a),
        (t.anchor = l),
        (t.kind = d ? 'mapping' : 'sequence'),
        (t.result = s),
        !0
      );
    r
      ? T === 44 && at(t, "expected the node content, but found ','")
      : at(t, 'missed comma between flow collection entries'),
      (E = g = y = null),
      (h = p = !1),
      T === 63 &&
        ((c = t.input.charCodeAt(t.position + 1)),
        Ir(c) && ((h = p = !0), t.position++, Ae(t, !0, e))),
      (n = t.line),
      (i = t.lineStart),
      (o = t.position),
      ws(t, e, vp, !1, !0),
      (E = t.tag),
      (g = t.result),
      Ae(t, !0, e),
      (T = t.input.charCodeAt(t.position)),
      (p || t.line === n) &&
        T === 58 &&
        ((h = !0),
        (T = t.input.charCodeAt(++t.position)),
        Ae(t, !0, e),
        ws(t, e, vp, !1, !0),
        (y = t.result)),
      d
        ? Es(t, s, m, E, g, y, n, i, o)
        : h
        ? s.push(Es(t, null, m, E, g, y, n, i, o))
        : s.push(g),
      Ae(t, !0, e),
      (T = t.input.charCodeAt(t.position)),
      T === 44 ? ((r = !0), (T = t.input.charCodeAt(++t.position))) : (r = !1);
  }
  at(t, 'unexpected end of the stream within a flow collection');
}
function ZX(t, e) {
  var r,
    n,
    i = I0,
    o = !1,
    a = !1,
    s = e,
    l = 0,
    c = !1,
    u,
    h;
  if (((h = t.input.charCodeAt(t.position)), h === 124)) n = !1;
  else if (h === 62) n = !0;
  else return !1;
  for (t.kind = 'scalar', t.result = ''; h !== 0; )
    if (((h = t.input.charCodeAt(++t.position)), h === 43 || h === 45))
      I0 === i
        ? (i = h === 43 ? OF : DX)
        : at(t, 'repeat of a chomping mode identifier');
    else if ((u = HX(h)) >= 0)
      u === 0
        ? at(
            t,
            'bad explicit indentation width of a block scalar; it cannot be less than one'
          )
        : a
        ? at(t, 'repeat of an indentation width identifier')
        : ((s = e + u - 1), (a = !0));
    else break;
  if (Zo(h)) {
    do h = t.input.charCodeAt(++t.position);
    while (Zo(h));
    if (h === 35)
      do h = t.input.charCodeAt(++t.position);
      while (!Wn(h) && h !== 0);
  }
  for (; h !== 0; ) {
    for (
      P0(t), t.lineIndent = 0, h = t.input.charCodeAt(t.position);
      (!a || t.lineIndent < s) && h === 32;

    )
      t.lineIndent++, (h = t.input.charCodeAt(++t.position));
    if ((!a && t.lineIndent > s && (s = t.lineIndent), Wn(h))) {
      l++;
      continue;
    }
    if (t.lineIndent < s) {
      i === OF
        ? (t.result += Ne.repeat(
            `
`,
            o ? 1 + l : l
          ))
        : i === I0 &&
          o &&
          (t.result += `
`);
      break;
    }
    for (
      n
        ? Zo(h)
          ? ((c = !0),
            (t.result += Ne.repeat(
              `
`,
              o ? 1 + l : l
            )))
          : c
          ? ((c = !1),
            (t.result += Ne.repeat(
              `
`,
              l + 1
            )))
          : l === 0
          ? o && (t.result += ' ')
          : (t.result += Ne.repeat(
              `
`,
              l
            ))
        : (t.result += Ne.repeat(
            `
`,
            o ? 1 + l : l
          )),
        o = !0,
        a = !0,
        l = 0,
        r = t.position;
      !Wn(h) && h !== 0;

    )
      h = t.input.charCodeAt(++t.position);
    Ki(t, r, t.position, !1);
  }
  return !0;
}
function BF(t, e) {
  var r,
    n = t.tag,
    i = t.anchor,
    o = [],
    a,
    s = !1,
    l;
  if (t.firstTabInLine !== -1) return !1;
  for (
    t.anchor !== null && (t.anchorMap[t.anchor] = o),
      l = t.input.charCodeAt(t.position);
    l !== 0 &&
    (t.firstTabInLine !== -1 &&
      ((t.position = t.firstTabInLine),
      at(t, 'tab characters must not be used in indentation')),
    !(l !== 45 || ((a = t.input.charCodeAt(t.position + 1)), !Ir(a))));

  ) {
    if (((s = !0), t.position++, Ae(t, !0, -1) && t.lineIndent <= e)) {
      o.push(null), (l = t.input.charCodeAt(t.position));
      continue;
    }
    if (
      ((r = t.line),
      ws(t, e, QF, !1, !0),
      o.push(t.result),
      Ae(t, !0, -1),
      (l = t.input.charCodeAt(t.position)),
      (t.line === r || t.lineIndent > e) && l !== 0)
    )
      at(t, 'bad indentation of a sequence entry');
    else if (t.lineIndent < e) break;
  }
  return s
    ? ((t.tag = n), (t.anchor = i), (t.kind = 'sequence'), (t.result = o), !0)
    : !1;
}
function QX(t, e, r) {
  var n,
    i,
    o,
    a,
    s,
    l,
    c = t.tag,
    u = t.anchor,
    h = {},
    p = Object.create(null),
    d = null,
    m = null,
    g = null,
    E = !1,
    y = !1,
    T;
  if (t.firstTabInLine !== -1) return !1;
  for (
    t.anchor !== null && (t.anchorMap[t.anchor] = h),
      T = t.input.charCodeAt(t.position);
    T !== 0;

  ) {
    if (
      (!E &&
        t.firstTabInLine !== -1 &&
        ((t.position = t.firstTabInLine),
        at(t, 'tab characters must not be used in indentation')),
      (n = t.input.charCodeAt(t.position + 1)),
      (o = t.line),
      (T === 63 || T === 58) && Ir(n))
    )
      T === 63
        ? (E && (Es(t, h, p, d, m, null, a, s, l), (d = m = g = null)),
          (y = !0),
          (E = !0),
          (i = !0))
        : E
        ? ((E = !1), (i = !0))
        : at(
            t,
            'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line'
          ),
        (t.position += 1),
        (T = n);
    else {
      if (
        ((a = t.line),
        (s = t.lineStart),
        (l = t.position),
        !ws(t, r, ZF, !1, !0))
      )
        break;
      if (t.line === o) {
        for (T = t.input.charCodeAt(t.position); Zo(T); )
          T = t.input.charCodeAt(++t.position);
        if (T === 58)
          (T = t.input.charCodeAt(++t.position)),
            Ir(T) ||
              at(
                t,
                'a whitespace character is expected after the key-value separator within a block mapping'
              ),
            E && (Es(t, h, p, d, m, null, a, s, l), (d = m = g = null)),
            (y = !0),
            (E = !1),
            (i = !1),
            (d = t.tag),
            (m = t.result);
        else if (y)
          at(t, 'can not read an implicit mapping pair; a colon is missed');
        else return (t.tag = c), (t.anchor = u), !0;
      } else if (y)
        at(
          t,
          'can not read a block mapping entry; a multiline key may not be an implicit key'
        );
      else return (t.tag = c), (t.anchor = u), !0;
    }
    if (
      ((t.line === o || t.lineIndent > e) &&
        (E && ((a = t.line), (s = t.lineStart), (l = t.position)),
        ws(t, e, Ap, !0, i) && (E ? (m = t.result) : (g = t.result)),
        E || (Es(t, h, p, d, m, g, a, s, l), (d = m = g = null)),
        Ae(t, !0, -1),
        (T = t.input.charCodeAt(t.position))),
      (t.line === o || t.lineIndent > e) && T !== 0)
    )
      at(t, 'bad indentation of a mapping entry');
    else if (t.lineIndent < e) break;
  }
  return (
    E && Es(t, h, p, d, m, null, a, s, l),
    y && ((t.tag = c), (t.anchor = u), (t.kind = 'mapping'), (t.result = h)),
    y
  );
}
function JX(t) {
  var e,
    r = !1,
    n = !1,
    i,
    o,
    a;
  if (((a = t.input.charCodeAt(t.position)), a !== 33)) return !1;
  if (
    (t.tag !== null && at(t, 'duplication of a tag property'),
    (a = t.input.charCodeAt(++t.position)),
    a === 60
      ? ((r = !0), (a = t.input.charCodeAt(++t.position)))
      : a === 33
      ? ((n = !0), (i = '!!'), (a = t.input.charCodeAt(++t.position)))
      : (i = '!'),
    (e = t.position),
    r)
  ) {
    do a = t.input.charCodeAt(++t.position);
    while (a !== 0 && a !== 62);
    t.position < t.length
      ? ((o = t.input.slice(e, t.position)),
        (a = t.input.charCodeAt(++t.position)))
      : at(t, 'unexpected end of the stream within a verbatim tag');
  } else {
    for (; a !== 0 && !Ir(a); )
      a === 33 &&
        (n
          ? at(t, 'tag suffix cannot contain exclamation marks')
          : ((i = t.input.slice(e - 1, t.position + 1)),
            JF.test(i) ||
              at(t, 'named tag handle cannot contain such characters'),
            (n = !0),
            (e = t.position + 1))),
        (a = t.input.charCodeAt(++t.position));
    (o = t.input.slice(e, t.position)),
      $X.test(o) &&
        at(t, 'tag suffix cannot contain flow indicator characters');
  }
  o && !tM.test(o) && at(t, 'tag name cannot contain such characters: ' + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    at(t, 'tag name is malformed: ' + o);
  }
  return (
    r
      ? (t.tag = o)
      : Zi.call(t.tagMap, i)
      ? (t.tag = t.tagMap[i] + o)
      : i === '!'
      ? (t.tag = '!' + o)
      : i === '!!'
      ? (t.tag = 'tag:yaml.org,2002:' + o)
      : at(t, 'undeclared tag handle "' + i + '"'),
    !0
  );
}
function tK(t) {
  var e, r;
  if (((r = t.input.charCodeAt(t.position)), r !== 38)) return !1;
  for (
    t.anchor !== null && at(t, 'duplication of an anchor property'),
      r = t.input.charCodeAt(++t.position),
      e = t.position;
    r !== 0 && !Ir(r) && !ks(r);

  )
    r = t.input.charCodeAt(++t.position);
  return (
    t.position === e &&
      at(t, 'name of an anchor node must contain at least one character'),
    (t.anchor = t.input.slice(e, t.position)),
    !0
  );
}
function eK(t) {
  var e, r, n;
  if (((n = t.input.charCodeAt(t.position)), n !== 42)) return !1;
  for (
    n = t.input.charCodeAt(++t.position), e = t.position;
    n !== 0 && !Ir(n) && !ks(n);

  )
    n = t.input.charCodeAt(++t.position);
  return (
    t.position === e &&
      at(t, 'name of an alias node must contain at least one character'),
    (r = t.input.slice(e, t.position)),
    Zi.call(t.anchorMap, r) || at(t, 'unidentified alias "' + r + '"'),
    (t.result = t.anchorMap[r]),
    Ae(t, !0, -1),
    !0
  );
}
function ws(t, e, r, n, i) {
  var o,
    a,
    s,
    l = 1,
    c = !1,
    u = !1,
    h,
    p,
    d,
    m,
    g,
    E;
  if (
    (t.listener !== null && t.listener('open', t),
    (t.tag = null),
    (t.anchor = null),
    (t.kind = null),
    (t.result = null),
    (o = a = s = Ap === r || QF === r),
    n &&
      Ae(t, !0, -1) &&
      ((c = !0),
      t.lineIndent > e
        ? (l = 1)
        : t.lineIndent === e
        ? (l = 0)
        : t.lineIndent < e && (l = -1)),
    l === 1)
  )
    for (; JX(t) || tK(t); )
      Ae(t, !0, -1)
        ? ((c = !0),
          (s = o),
          t.lineIndent > e
            ? (l = 1)
            : t.lineIndent === e
            ? (l = 0)
            : t.lineIndent < e && (l = -1))
        : (s = !1);
  if (
    (s && (s = c || i),
    (l === 1 || Ap === r) &&
      (vp === r || ZF === r ? (g = e) : (g = e + 1),
      (E = t.position - t.lineStart),
      l === 1
        ? (s && (BF(t, E) || QX(t, E, g))) || KX(t, g)
          ? (u = !0)
          : ((a && ZX(t, g)) || VX(t, g) || XX(t, g)
              ? (u = !0)
              : eK(t)
              ? ((u = !0),
                (t.tag !== null || t.anchor !== null) &&
                  at(t, 'alias node should not have any properties'))
              : YX(t, g, vp === r) &&
                ((u = !0), t.tag === null && (t.tag = '?')),
            t.anchor !== null && (t.anchorMap[t.anchor] = t.result))
        : l === 0 && (u = s && BF(t, E))),
    t.tag === null)
  )
    t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
  else if (t.tag === '?') {
    for (
      t.result !== null &&
        t.kind !== 'scalar' &&
        at(
          t,
          'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
            t.kind +
            '"'
        ),
        h = 0,
        p = t.implicitTypes.length;
      h < p;
      h += 1
    )
      if (((m = t.implicitTypes[h]), m.resolve(t.result))) {
        (t.result = m.construct(t.result)),
          (t.tag = m.tag),
          t.anchor !== null && (t.anchorMap[t.anchor] = t.result);
        break;
      }
  } else if (t.tag !== '!') {
    if (Zi.call(t.typeMap[t.kind || 'fallback'], t.tag))
      m = t.typeMap[t.kind || 'fallback'][t.tag];
    else
      for (
        m = null,
          d = t.typeMap.multi[t.kind || 'fallback'],
          h = 0,
          p = d.length;
        h < p;
        h += 1
      )
        if (t.tag.slice(0, d[h].tag.length) === d[h].tag) {
          m = d[h];
          break;
        }
    m || at(t, 'unknown tag !<' + t.tag + '>'),
      t.result !== null &&
        m.kind !== t.kind &&
        at(
          t,
          'unacceptable node kind for !<' +
            t.tag +
            '> tag; it should be "' +
            m.kind +
            '", not "' +
            t.kind +
            '"'
        ),
      m.resolve(t.result, t.tag)
        ? ((t.result = m.construct(t.result, t.tag)),
          t.anchor !== null && (t.anchorMap[t.anchor] = t.result))
        : at(t, 'cannot resolve a node with !<' + t.tag + '> explicit tag');
  }
  return (
    t.listener !== null && t.listener('close', t),
    t.tag !== null || t.anchor !== null || u
  );
}
function rK(t) {
  var e = t.position,
    r,
    n,
    i,
    o = !1,
    a;
  for (
    t.version = null,
      t.checkLineBreaks = t.legacy,
      t.tagMap = Object.create(null),
      t.anchorMap = Object.create(null);
    (a = t.input.charCodeAt(t.position)) !== 0 &&
    (Ae(t, !0, -1),
    (a = t.input.charCodeAt(t.position)),
    !(t.lineIndent > 0 || a !== 37));

  ) {
    for (
      o = !0, a = t.input.charCodeAt(++t.position), r = t.position;
      a !== 0 && !Ir(a);

    )
      a = t.input.charCodeAt(++t.position);
    for (
      n = t.input.slice(r, t.position),
        i = [],
        n.length < 1 &&
          at(t, 'directive name must not be less than one character in length');
      a !== 0;

    ) {
      for (; Zo(a); ) a = t.input.charCodeAt(++t.position);
      if (a === 35) {
        do a = t.input.charCodeAt(++t.position);
        while (a !== 0 && !Wn(a));
        break;
      }
      if (Wn(a)) break;
      for (r = t.position; a !== 0 && !Ir(a); )
        a = t.input.charCodeAt(++t.position);
      i.push(t.input.slice(r, t.position));
    }
    a !== 0 && P0(t),
      Zi.call(FF, n)
        ? FF[n](t, n, i)
        : Lp(t, 'unknown document directive "' + n + '"');
  }
  if (
    (Ae(t, !0, -1),
    t.lineIndent === 0 &&
    t.input.charCodeAt(t.position) === 45 &&
    t.input.charCodeAt(t.position + 1) === 45 &&
    t.input.charCodeAt(t.position + 2) === 45
      ? ((t.position += 3), Ae(t, !0, -1))
      : o && at(t, 'directives end mark is expected'),
    ws(t, t.lineIndent - 1, Ap, !1, !0),
    Ae(t, !0, -1),
    t.checkLineBreaks &&
      zX.test(t.input.slice(e, t.position)) &&
      Lp(t, 'non-ASCII line breaks are interpreted as content'),
    t.documents.push(t.result),
    t.position === t.lineStart && Rp(t))
  ) {
    t.input.charCodeAt(t.position) === 46 && ((t.position += 3), Ae(t, !0, -1));
    return;
  }
  if (t.position < t.length - 1)
    at(t, 'end of the stream or a document separator is expected');
  else return;
}
function iM(t, e) {
  (t = String(t)),
    (e = e || {}),
    t.length !== 0 &&
      (t.charCodeAt(t.length - 1) !== 10 &&
        t.charCodeAt(t.length - 1) !== 13 &&
        (t += `
`),
      t.charCodeAt(0) === 65279 && (t = t.slice(1)));
  var r = new jX(t, e),
    n = t.indexOf('\0');
  for (
    n !== -1 && ((r.position = n), at(r, 'null byte is not allowed in input')),
      r.input += '\0';
    r.input.charCodeAt(r.position) === 32;

  )
    (r.lineIndent += 1), (r.position += 1);
  for (; r.position < r.length - 1; ) rK(r);
  return r.documents;
}
function nK(t, e, r) {
  e !== null && typeof e == 'object' && typeof r > 'u' && ((r = e), (e = null));
  var n = iM(t, r);
  if (typeof e != 'function') return n;
  for (var i = 0, o = n.length; i < o; i += 1) e(n[i]);
}
function iK(t, e) {
  var r = iM(t, e);
  if (r.length !== 0) {
    if (r.length === 1) return r[0];
    throw new Lr('expected a single document in the stream, but found more');
  }
}
function wK(t, e) {
  var r, n, i, o, a, s, l;
  if (e === null) return {};
  for (r = {}, n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
    (a = n[i]),
      (s = String(e[a])),
      a.slice(0, 2) === '!!' && (a = 'tag:yaml.org,2002:' + a.slice(2)),
      (l = t.compiledTypeMap.fallback[a]),
      l && sM.call(l.styleAliases, s) && (s = l.styleAliases[s]),
      (r[a] = s);
  return r;
}
function SK(t) {
  var e, r, n;
  if (((e = t.toString(16).toUpperCase()), t <= 255)) (r = 'x'), (n = 2);
  else if (t <= 65535) (r = 'u'), (n = 4);
  else if (t <= 4294967295) (r = 'U'), (n = 8);
  else
    throw new Lr(
      'code point within a string may not be greater than 0xFFFFFFFF'
    );
  return '\\' + r + Ne.repeat('0', n - e.length) + e;
}
function AK(t) {
  (this.schema = t.schema || KF),
    (this.indent = Math.max(1, t.indent || 2)),
    (this.noArrayIndent = t.noArrayIndent || !1),
    (this.skipInvalid = t.skipInvalid || !1),
    (this.flowLevel = Ne.isNothing(t.flowLevel) ? -1 : t.flowLevel),
    (this.styleMap = wK(this.schema, t.styles || null)),
    (this.sortKeys = t.sortKeys || !1),
    (this.lineWidth = t.lineWidth || 80),
    (this.noRefs = t.noRefs || !1),
    (this.noCompatMode = t.noCompatMode || !1),
    (this.condenseFlow = t.condenseFlow || !1),
    (this.quotingType = t.quotingType === '"' ? Ic : vK),
    (this.forceQuotes = t.forceQuotes || !1),
    (this.replacer = typeof t.replacer == 'function' ? t.replacer : null),
    (this.implicitTypes = this.schema.compiledImplicit),
    (this.explicitTypes = this.schema.compiledExplicit),
    (this.tag = null),
    (this.result = ''),
    (this.duplicates = []),
    (this.usedDuplicates = null);
}
function PF(t, e) {
  for (
    var r = Ne.repeat(' ', e), n = 0, i = -1, o = '', a, s = t.length;
    n < s;

  )
    (i = t.indexOf(
      `
`,
      n
    )),
      i === -1
        ? ((a = t.slice(n)), (n = s))
        : ((a = t.slice(n, i + 1)), (n = i + 1)),
      a.length &&
        a !==
          `
` &&
        (o += r),
      (o += a);
  return o;
}
function N0(t, e) {
  return (
    `
` + Ne.repeat(' ', t.indent * e)
  );
}
function LK(t, e) {
  var r, n, i;
  for (r = 0, n = t.implicitTypes.length; r < n; r += 1)
    if (((i = t.implicitTypes[r]), i.resolve(e))) return !0;
  return !1;
}
function Op(t) {
  return t === cK || t === sK;
}
function Oc(t) {
  return (
    (32 <= t && t <= 126) ||
    (161 <= t && t <= 55295 && t !== 8232 && t !== 8233) ||
    (57344 <= t && t <= 65533 && t !== U0) ||
    (65536 <= t && t <= 1114111)
  );
}
function DF(t) {
  return Oc(t) && t !== U0 && t !== lK && t !== Lc;
}
function UF(t, e, r) {
  var n = DF(t),
    i = n && !Op(t);
  return (
    ((r ? n : n && t !== lM && t !== cM && t !== uM && t !== fM && t !== hM) &&
      t !== R0 &&
      !(e === Ip && !i)) ||
    (DF(e) && !Op(e) && t === R0) ||
    (e === Ip && i)
  );
}
function IK(t) {
  return (
    Oc(t) &&
    t !== U0 &&
    !Op(t) &&
    t !== gK &&
    t !== bK &&
    t !== Ip &&
    t !== lM &&
    t !== cM &&
    t !== uM &&
    t !== fM &&
    t !== hM &&
    t !== R0 &&
    t !== pK &&
    t !== mK &&
    t !== uK &&
    t !== TK &&
    t !== xK &&
    t !== yK &&
    t !== dK &&
    t !== fK &&
    t !== hK &&
    t !== _K &&
    t !== CK
  );
}
function OK(t) {
  return !Op(t) && t !== Ip;
}
function vc(t, e) {
  var r = t.charCodeAt(e),
    n;
  return r >= 55296 &&
    r <= 56319 &&
    e + 1 < t.length &&
    ((n = t.charCodeAt(e + 1)), n >= 56320 && n <= 57343)
    ? (r - 55296) * 1024 + n - 56320 + 65536
    : r;
}
function pM(t) {
  var e = /^\n* /;
  return e.test(t);
}
function RK(t, e, r, n, i, o, a, s) {
  var l,
    c = 0,
    u = null,
    h = !1,
    p = !1,
    d = n !== -1,
    m = -1,
    g = IK(vc(t, 0)) && OK(vc(t, t.length - 1));
  if (e || a)
    for (l = 0; l < t.length; c >= 65536 ? (l += 2) : l++) {
      if (((c = vc(t, l)), !Oc(c))) return Ts;
      (g = g && UF(c, u, s)), (u = c);
    }
  else {
    for (l = 0; l < t.length; c >= 65536 ? (l += 2) : l++) {
      if (((c = vc(t, l)), c === Lc))
        (h = !0),
          d && ((p = p || (l - m - 1 > n && t[m + 1] !== ' ')), (m = l));
      else if (!Oc(c)) return Ts;
      (g = g && UF(c, u, s)), (u = c);
    }
    p = p || (d && l - m - 1 > n && t[m + 1] !== ' ');
  }
  return !h && !p
    ? g && !a && !i(t)
      ? dM
      : o === Ic
      ? Ts
      : F0
    : r > 9 && pM(t)
    ? Ts
    : a
    ? o === Ic
      ? Ts
      : F0
    : p
    ? gM
    : mM;
}
function NK(t, e, r, n, i) {
  t.dump = (function () {
    if (e.length === 0) return t.quotingType === Ic ? '""' : "''";
    if (!t.noCompatMode && (kK.indexOf(e) !== -1 || EK.test(e)))
      return t.quotingType === Ic ? '"' + e + '"' : "'" + e + "'";
    var o = t.indent * Math.max(1, r),
      a =
        t.lineWidth === -1
          ? -1
          : Math.max(Math.min(t.lineWidth, 40), t.lineWidth - o),
      s = n || (t.flowLevel > -1 && r >= t.flowLevel);
    function l(c) {
      return LK(t, c);
    }
    switch (RK(e, s, t.indent, a, l, t.quotingType, t.forceQuotes && !n, i)) {
      case dM:
        return e;
      case F0:
        return "'" + e.replace(/'/g, "''") + "'";
      case mM:
        return '|' + zF(e, t.indent) + $F(PF(e, o));
      case gM:
        return '>' + zF(e, t.indent) + $F(PF(FK(e, a), o));
      case Ts:
        return '"' + MK(e) + '"';
      default:
        throw new Lr('impossible error: invalid scalar style');
    }
  })();
}
function zF(t, e) {
  var r = pM(t) ? String(e) : '',
    n =
      t[t.length - 1] ===
      `
`,
    i =
      n &&
      (t[t.length - 2] ===
        `
` ||
        t ===
          `
`),
    o = i ? '+' : n ? '' : '-';
  return (
    r +
    o +
    `
`
  );
}
function $F(t) {
  return t[t.length - 1] ===
    `
`
    ? t.slice(0, -1)
    : t;
}
function FK(t, e) {
  for (
    var r = /(\n+)([^\n]*)/g,
      n = (function () {
        var c = t.indexOf(`
`);
        return (
          (c = c !== -1 ? c : t.length), (r.lastIndex = c), WF(t.slice(0, c), e)
        );
      })(),
      i =
        t[0] ===
          `
` || t[0] === ' ',
      o,
      a;
    (a = r.exec(t));

  ) {
    var s = a[1],
      l = a[2];
    (o = l[0] === ' '),
      (n +=
        s +
        (!i && !o && l !== ''
          ? `
`
          : '') +
        WF(l, e)),
      (i = o);
  }
  return n;
}
function WF(t, e) {
  if (t === '' || t[0] === ' ') return t;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ''; (n = r.exec(t)); )
    (s = n.index),
      s - i > e &&
        ((o = a > i ? a : s),
        (l +=
          `
` + t.slice(i, o)),
        (i = o + 1)),
      (a = s);
  return (
    (l += `
`),
    t.length - i > e && a > i
      ? (l +=
          t.slice(i, a) +
          `
` +
          t.slice(a + 1))
      : (l += t.slice(i)),
    l.slice(1)
  );
}
function MK(t) {
  for (var e = '', r = 0, n, i = 0; i < t.length; r >= 65536 ? (i += 2) : i++)
    (r = vc(t, i)),
      (n = er[r]),
      !n && Oc(r)
        ? ((e += t[i]), r >= 65536 && (e += t[i + 1]))
        : (e += n || SK(r));
  return e;
}
function BK(t, e, r) {
  var n = '',
    i = t.tag,
    o,
    a,
    s;
  for (o = 0, a = r.length; o < a; o += 1)
    (s = r[o]),
      t.replacer && (s = t.replacer.call(r, String(o), s)),
      (di(t, e, s, !1, !1) || (typeof s > 'u' && di(t, e, null, !1, !1))) &&
        (n !== '' && (n += ',' + (t.condenseFlow ? '' : ' ')), (n += t.dump));
  (t.tag = i), (t.dump = '[' + n + ']');
}
function qF(t, e, r, n) {
  var i = '',
    o = t.tag,
    a,
    s,
    l;
  for (a = 0, s = r.length; a < s; a += 1)
    (l = r[a]),
      t.replacer && (l = t.replacer.call(r, String(a), l)),
      (di(t, e + 1, l, !0, !0, !1, !0) ||
        (typeof l > 'u' && di(t, e + 1, null, !0, !0, !1, !0))) &&
        ((!n || i !== '') && (i += N0(t, e)),
        t.dump && Lc === t.dump.charCodeAt(0) ? (i += '-') : (i += '- '),
        (i += t.dump));
  (t.tag = o), (t.dump = i || '[]');
}
function PK(t, e, r) {
  var n = '',
    i = t.tag,
    o = Object.keys(r),
    a,
    s,
    l,
    c,
    u;
  for (a = 0, s = o.length; a < s; a += 1)
    (u = ''),
      n !== '' && (u += ', '),
      t.condenseFlow && (u += '"'),
      (l = o[a]),
      (c = r[l]),
      t.replacer && (c = t.replacer.call(r, l, c)),
      di(t, e, l, !1, !1) &&
        (t.dump.length > 1024 && (u += '? '),
        (u +=
          t.dump +
          (t.condenseFlow ? '"' : '') +
          ':' +
          (t.condenseFlow ? '' : ' ')),
        di(t, e, c, !1, !1) && ((u += t.dump), (n += u)));
  (t.tag = i), (t.dump = '{' + n + '}');
}
function DK(t, e, r, n) {
  var i = '',
    o = t.tag,
    a = Object.keys(r),
    s,
    l,
    c,
    u,
    h,
    p;
  if (t.sortKeys === !0) a.sort();
  else if (typeof t.sortKeys == 'function') a.sort(t.sortKeys);
  else if (t.sortKeys) throw new Lr('sortKeys must be a boolean or a function');
  for (s = 0, l = a.length; s < l; s += 1)
    (p = ''),
      (!n || i !== '') && (p += N0(t, e)),
      (c = a[s]),
      (u = r[c]),
      t.replacer && (u = t.replacer.call(r, c, u)),
      di(t, e + 1, c, !0, !0, !0) &&
        ((h =
          (t.tag !== null && t.tag !== '?') ||
          (t.dump && t.dump.length > 1024)),
        h && (t.dump && Lc === t.dump.charCodeAt(0) ? (p += '?') : (p += '? ')),
        (p += t.dump),
        h && (p += N0(t, e)),
        di(t, e + 1, u, !0, h) &&
          (t.dump && Lc === t.dump.charCodeAt(0) ? (p += ':') : (p += ': '),
          (p += t.dump),
          (i += p)));
  (t.tag = o), (t.dump = i || '{}');
}
function HF(t, e, r) {
  var n, i, o, a, s, l;
  for (
    i = r ? t.explicitTypes : t.implicitTypes, o = 0, a = i.length;
    o < a;
    o += 1
  )
    if (
      ((s = i[o]),
      (s.instanceOf || s.predicate) &&
        (!s.instanceOf ||
          (typeof e == 'object' && e instanceof s.instanceOf)) &&
        (!s.predicate || s.predicate(e)))
    ) {
      if (
        (r
          ? s.multi && s.representName
            ? (t.tag = s.representName(e))
            : (t.tag = s.tag)
          : (t.tag = '?'),
        s.represent)
      ) {
        if (
          ((l = t.styleMap[s.tag] || s.defaultStyle),
          aM.call(s.represent) === '[object Function]')
        )
          n = s.represent(e, l);
        else if (sM.call(s.represent, l)) n = s.represent[l](e, l);
        else
          throw new Lr(
            '!<' + s.tag + '> tag resolver accepts not "' + l + '" style'
          );
        t.dump = n;
      }
      return !0;
    }
  return !1;
}
function di(t, e, r, n, i, o, a) {
  (t.tag = null), (t.dump = r), HF(t, r, !1) || HF(t, r, !0);
  var s = aM.call(t.dump),
    l = n,
    c;
  n && (n = t.flowLevel < 0 || t.flowLevel > e);
  var u = s === '[object Object]' || s === '[object Array]',
    h,
    p;
  if (
    (u && ((h = t.duplicates.indexOf(r)), (p = h !== -1)),
    ((t.tag !== null && t.tag !== '?') || p || (t.indent !== 2 && e > 0)) &&
      (i = !1),
    p && t.usedDuplicates[h])
  )
    t.dump = '*ref_' + h;
  else {
    if (
      (u && p && !t.usedDuplicates[h] && (t.usedDuplicates[h] = !0),
      s === '[object Object]')
    )
      n && Object.keys(t.dump).length !== 0
        ? (DK(t, e, t.dump, i), p && (t.dump = '&ref_' + h + t.dump))
        : (PK(t, e, t.dump), p && (t.dump = '&ref_' + h + ' ' + t.dump));
    else if (s === '[object Array]')
      n && t.dump.length !== 0
        ? (t.noArrayIndent && !a && e > 0
            ? qF(t, e - 1, t.dump, i)
            : qF(t, e, t.dump, i),
          p && (t.dump = '&ref_' + h + t.dump))
        : (BK(t, e, t.dump), p && (t.dump = '&ref_' + h + ' ' + t.dump));
    else if (s === '[object String]') t.tag !== '?' && NK(t, t.dump, e, o, l);
    else {
      if (s === '[object Undefined]') return !1;
      if (t.skipInvalid) return !1;
      throw new Lr('unacceptable kind of an object to dump ' + s);
    }
    t.tag !== null &&
      t.tag !== '?' &&
      ((c = encodeURI(t.tag[0] === '!' ? t.tag.slice(1) : t.tag).replace(
        /!/g,
        '%21'
      )),
      t.tag[0] === '!'
        ? (c = '!' + c)
        : c.slice(0, 18) === 'tag:yaml.org,2002:'
        ? (c = '!!' + c.slice(18))
        : (c = '!<' + c + '>'),
      (t.dump = c + ' ' + t.dump));
  }
  return !0;
}
function UK(t, e) {
  var r = [],
    n = [],
    i,
    o;
  for (M0(t, r, n), i = 0, o = n.length; i < o; i += 1)
    e.duplicates.push(r[n[i]]);
  e.usedDuplicates = new Array(o);
}
function M0(t, e, r) {
  var n, i, o;
  if (t !== null && typeof t == 'object')
    if (((i = e.indexOf(t)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
    else if ((e.push(t), Array.isArray(t)))
      for (i = 0, o = t.length; i < o; i += 1) M0(t[i], e, r);
    else
      for (n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
        M0(t[n[i]], e, r);
}
function zK(t, e) {
  e = e || {};
  var r = new AK(e);
  r.noRefs || UK(t, r);
  var n = t;
  return (
    r.replacer && (n = r.replacer.call({ '': n }, '', n)),
    di(r, 0, n, !0, !0)
      ? r.dump +
        `
`
      : ''
  );
}
function z0(t, e) {
  return function () {
    throw new Error(
      'Function yaml.' +
        t +
        ' is removed in js-yaml 4. Use yaml.' +
        e +
        ' instead, which is now safe by default.'
    );
  };
}
var vV,
  AV,
  LV,
  IV,
  OV,
  RV,
  Ne,
  Lr,
  FV,
  MV,
  BV,
  tr,
  zV,
  $V,
  WV,
  qV,
  HV,
  VV,
  QV,
  oX,
  aX,
  cX,
  hX,
  YF,
  pX,
  VF,
  XF,
  xX,
  bX,
  B0,
  EX,
  wX,
  SX,
  LX,
  IX,
  NX,
  FX,
  PX,
  KF,
  Zi,
  vp,
  ZF,
  QF,
  Ap,
  I0,
  DX,
  OF,
  UX,
  zX,
  $X,
  JF,
  tM,
  eM,
  rM,
  Ko,
  FF,
  oK,
  aK,
  oM,
  aM,
  sM,
  U0,
  sK,
  Lc,
  lK,
  cK,
  uK,
  fK,
  R0,
  hK,
  pK,
  dK,
  mK,
  lM,
  gK,
  Ip,
  xK,
  yK,
  bK,
  _K,
  cM,
  uM,
  CK,
  fM,
  TK,
  hM,
  er,
  kK,
  EK,
  vK,
  Ic,
  dM,
  F0,
  mM,
  gM,
  Ts,
  $K,
  WK,
  xM,
  yM,
  oOt,
  aOt,
  sOt,
  lOt,
  cOt,
  bM = f(() => {
    (vV = GF),
      (AV = TV),
      (LV = kV),
      (IV = wV),
      (OV = SV),
      (RV = EV),
      (Ne = {
        isNothing: vV,
        isObject: AV,
        toArray: LV,
        repeat: IV,
        isNegativeZero: OV,
        extend: RV,
      });
    Ac.prototype = Object.create(Error.prototype);
    Ac.prototype.constructor = Ac;
    Ac.prototype.toString = function (e) {
      return this.name + ': ' + jF(this, e);
    };
    Lr = Ac;
    (FV = NV),
      (MV = [
        'kind',
        'multi',
        'resolve',
        'construct',
        'instanceOf',
        'predicate',
        'represent',
        'representName',
        'defaultStyle',
        'styleAliases',
      ]),
      (BV = ['scalar', 'sequence', 'mapping']);
    tr = DV;
    O0.prototype.extend = function (e) {
      var r = [],
        n = [];
      if (e instanceof tr) n.push(e);
      else if (Array.isArray(e)) n = n.concat(e);
      else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
        e.implicit && (r = r.concat(e.implicit)),
          e.explicit && (n = n.concat(e.explicit));
      else
        throw new Lr(
          'Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })'
        );
      r.forEach(function (o) {
        if (!(o instanceof tr))
          throw new Lr(
            'Specified list of YAML types (or a single Type object) contains a non-Type object.'
          );
        if (o.loadKind && o.loadKind !== 'scalar')
          throw new Lr(
            'There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.'
          );
        if (o.multi)
          throw new Lr(
            'There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.'
          );
      }),
        n.forEach(function (o) {
          if (!(o instanceof tr))
            throw new Lr(
              'Specified list of YAML types (or a single Type object) contains a non-Type object.'
            );
        });
      var i = Object.create(O0.prototype);
      return (
        (i.implicit = (this.implicit || []).concat(r)),
        (i.explicit = (this.explicit || []).concat(n)),
        (i.compiledImplicit = IF(i, 'implicit')),
        (i.compiledExplicit = IF(i, 'explicit')),
        (i.compiledTypeMap = UV(i.compiledImplicit, i.compiledExplicit)),
        i
      );
    };
    (zV = O0),
      ($V = new tr('tag:yaml.org,2002:str', {
        kind: 'scalar',
        construct: function (t) {
          return t !== null ? t : '';
        },
      })),
      (WV = new tr('tag:yaml.org,2002:seq', {
        kind: 'sequence',
        construct: function (t) {
          return t !== null ? t : [];
        },
      })),
      (qV = new tr('tag:yaml.org,2002:map', {
        kind: 'mapping',
        construct: function (t) {
          return t !== null ? t : {};
        },
      })),
      (HV = new zV({ explicit: [$V, WV, qV] }));
    VV = new tr('tag:yaml.org,2002:null', {
      kind: 'scalar',
      resolve: GV,
      construct: jV,
      predicate: YV,
      represent: {
        canonical: function () {
          return '~';
        },
        lowercase: function () {
          return 'null';
        },
        uppercase: function () {
          return 'NULL';
        },
        camelcase: function () {
          return 'Null';
        },
        empty: function () {
          return '';
        },
      },
      defaultStyle: 'lowercase',
    });
    QV = new tr('tag:yaml.org,2002:bool', {
      kind: 'scalar',
      resolve: XV,
      construct: KV,
      predicate: ZV,
      represent: {
        lowercase: function (t) {
          return t ? 'true' : 'false';
        },
        uppercase: function (t) {
          return t ? 'TRUE' : 'FALSE';
        },
        camelcase: function (t) {
          return t ? 'True' : 'False';
        },
      },
      defaultStyle: 'lowercase',
    });
    (oX = new tr('tag:yaml.org,2002:int', {
      kind: 'scalar',
      resolve: rX,
      construct: nX,
      predicate: iX,
      represent: {
        binary: function (t) {
          return t >= 0 ? '0b' + t.toString(2) : '-0b' + t.toString(2).slice(1);
        },
        octal: function (t) {
          return t >= 0 ? '0o' + t.toString(8) : '-0o' + t.toString(8).slice(1);
        },
        decimal: function (t) {
          return t.toString(10);
        },
        hexadecimal: function (t) {
          return t >= 0
            ? '0x' + t.toString(16).toUpperCase()
            : '-0x' + t.toString(16).toUpperCase().slice(1);
        },
      },
      defaultStyle: 'decimal',
      styleAliases: {
        binary: [2, 'bin'],
        octal: [8, 'oct'],
        decimal: [10, 'dec'],
        hexadecimal: [16, 'hex'],
      },
    })),
      (aX = new RegExp(
        '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$'
      ));
    cX = /^[-+]?[0-9]+e/;
    (hX = new tr('tag:yaml.org,2002:float', {
      kind: 'scalar',
      resolve: sX,
      construct: lX,
      predicate: fX,
      represent: uX,
      defaultStyle: 'lowercase',
    })),
      (YF = HV.extend({ implicit: [VV, QV, oX, hX] })),
      (pX = YF),
      (VF = new RegExp('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$')),
      (XF = new RegExp(
        '^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$'
      ));
    xX = new tr('tag:yaml.org,2002:timestamp', {
      kind: 'scalar',
      resolve: dX,
      construct: mX,
      instanceOf: Date,
      represent: gX,
    });
    (bX = new tr('tag:yaml.org,2002:merge', { kind: 'scalar', resolve: yX })),
      (B0 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`);
    (EX = new tr('tag:yaml.org,2002:binary', {
      kind: 'scalar',
      resolve: _X,
      construct: CX,
      predicate: kX,
      represent: TX,
    })),
      (wX = Object.prototype.hasOwnProperty),
      (SX = Object.prototype.toString);
    (LX = new tr('tag:yaml.org,2002:omap', {
      kind: 'sequence',
      resolve: vX,
      construct: AX,
    })),
      (IX = Object.prototype.toString);
    (NX = new tr('tag:yaml.org,2002:pairs', {
      kind: 'sequence',
      resolve: OX,
      construct: RX,
    })),
      (FX = Object.prototype.hasOwnProperty);
    (PX = new tr('tag:yaml.org,2002:set', {
      kind: 'mapping',
      resolve: MX,
      construct: BX,
    })),
      (KF = pX.extend({ implicit: [xX, bX], explicit: [EX, LX, NX, PX] })),
      (Zi = Object.prototype.hasOwnProperty),
      (vp = 1),
      (ZF = 2),
      (QF = 3),
      (Ap = 4),
      (I0 = 1),
      (DX = 2),
      (OF = 3),
      (UX =
        /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/),
      (zX = /[\x85\u2028\u2029]/),
      ($X = /[,\[\]\{\}]/),
      (JF = /^(?:!|!!|![a-z\-]+!)$/i),
      (tM =
        /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i);
    (eM = new Array(256)), (rM = new Array(256));
    for (Ko = 0; Ko < 256; Ko++) (eM[Ko] = NF(Ko) ? 1 : 0), (rM[Ko] = NF(Ko));
    FF = {
      YAML: function (e, r, n) {
        var i, o, a;
        e.version !== null && at(e, 'duplication of %YAML directive'),
          n.length !== 1 &&
            at(e, 'YAML directive accepts exactly one argument'),
          (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
          i === null && at(e, 'ill-formed argument of the YAML directive'),
          (o = parseInt(i[1], 10)),
          (a = parseInt(i[2], 10)),
          o !== 1 && at(e, 'unacceptable YAML version of the document'),
          (e.version = n[0]),
          (e.checkLineBreaks = a < 2),
          a !== 1 &&
            a !== 2 &&
            Lp(e, 'unsupported YAML version of the document');
      },
      TAG: function (e, r, n) {
        var i, o;
        n.length !== 2 && at(e, 'TAG directive accepts exactly two arguments'),
          (i = n[0]),
          (o = n[1]),
          JF.test(i) ||
            at(
              e,
              'ill-formed tag handle (first argument) of the TAG directive'
            ),
          Zi.call(e.tagMap, i) &&
            at(
              e,
              'there is a previously declared suffix for "' + i + '" tag handle'
            ),
          tM.test(o) ||
            at(
              e,
              'ill-formed tag prefix (second argument) of the TAG directive'
            );
        try {
          o = decodeURIComponent(o);
        } catch {
          at(e, 'tag prefix is malformed: ' + o);
        }
        e.tagMap[i] = o;
      },
    };
    (oK = nK),
      (aK = iK),
      (oM = { loadAll: oK, load: aK }),
      (aM = Object.prototype.toString),
      (sM = Object.prototype.hasOwnProperty),
      (U0 = 65279),
      (sK = 9),
      (Lc = 10),
      (lK = 13),
      (cK = 32),
      (uK = 33),
      (fK = 34),
      (R0 = 35),
      (hK = 37),
      (pK = 38),
      (dK = 39),
      (mK = 42),
      (lM = 44),
      (gK = 45),
      (Ip = 58),
      (xK = 61),
      (yK = 62),
      (bK = 63),
      (_K = 64),
      (cM = 91),
      (uM = 93),
      (CK = 96),
      (fM = 123),
      (TK = 124),
      (hM = 125),
      (er = {});
    er[0] = '\\0';
    er[7] = '\\a';
    er[8] = '\\b';
    er[9] = '\\t';
    er[10] = '\\n';
    er[11] = '\\v';
    er[12] = '\\f';
    er[13] = '\\r';
    er[27] = '\\e';
    er[34] = '\\"';
    er[92] = '\\\\';
    er[133] = '\\N';
    er[160] = '\\_';
    er[8232] = '\\L';
    er[8233] = '\\P';
    (kK = [
      'y',
      'Y',
      'yes',
      'Yes',
      'YES',
      'on',
      'On',
      'ON',
      'n',
      'N',
      'no',
      'No',
      'NO',
      'off',
      'Off',
      'OFF',
    ]),
      (EK = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/);
    (vK = 1), (Ic = 2);
    (dM = 1), (F0 = 2), (mM = 3), (gM = 4), (Ts = 5);
    ($K = zK), (WK = { dump: $K });
    (xM = YF),
      (yM = oM.load),
      (oOt = oM.loadAll),
      (aOt = WK.dump),
      (sOt = z0('safeLoad', 'load')),
      (lOt = z0('safeLoadAll', 'loadAll')),
      (cOt = z0('safeDump', 'dump'));
  });
function _M(t) {
  let e = t.match(qh);
  if (!e) return { text: t, metadata: {} };
  let r = yM(e[1], { schema: xM }) ?? {};
  r = typeof r == 'object' && !Array.isArray(r) ? r : {};
  let n = {};
  return (
    r.displayMode && (n.displayMode = r.displayMode.toString()),
    r.title && (n.title = r.title.toString()),
    r.config && (n.config = r.config),
    { text: t.slice(e[0].length), metadata: n }
  );
}
var CM = f(() => {
  'use strict';
  Hh();
  bM();
});
function TM(t) {
  let e = HK(t),
    r = GK(e),
    n = jK(r.text),
    i = Ty(r.config, n.directive);
  return (t = AF(n.text)), { code: t, title: r.title, config: i };
}
var HK,
  GK,
  jK,
  kM = f(() => {
    'use strict';
    LF();
    CM();
    gs();
    (HK = (t) =>
      t
        .replace(
          /\r\n?/g,
          `
`
        )
        .replace(
          /<(\w+)([^>]*)>/g,
          (e, r, n) => '<' + r + n.replace(/="([^"]*)"/g, "='$1'") + '>'
        )),
      (GK = (t) => {
        let { text: e, metadata: r } = _M(t),
          { displayMode: n, title: i, config: o = {} } = r;
        return (
          n && (o.gantt || (o.gantt = {}), (o.gantt.displayMode = n)),
          { title: i, config: o, text: e }
        );
      }),
      (jK = (t) => {
        let e = ur.detectInit(t) ?? {},
          r = ur.detectDirective(t, 'wrap');
        return (
          Array.isArray(r)
            ? (e.wrap = r.some(({ type: n }) => {}))
            : r?.type === 'wrap' && (e.wrap = !0),
          { text: HO(t), directive: e }
        );
      });
  });
function AM(t) {
  let e = TM(t);
  return xc(), JO(e.config ?? {}), e;
}
async function lZ(t, e) {
  wp(), (t = AM(t).code);
  try {
    await Sp(t);
  } catch (r) {
    if (e?.suppressErrors) return !1;
    throw r;
  }
  return !0;
}
function SM(t, e) {
  return t
    .append('iframe')
    .attr('id', e)
    .attr('style', 'width: 100%; height: 100%;')
    .attr('sandbox', '');
}
function gZ(t = {}) {
  t?.fontFamily &&
    !t.themeVariables?.fontFamily &&
    (t.themeVariables || (t.themeVariables = {}),
    (t.themeVariables.fontFamily = t.fontFamily)),
    XO(t),
    t?.theme && t.theme in rn
      ? (t.themeVariables = rn[t.theme].getThemeVariables(t.themeVariables))
      : t &&
        (t.themeVariables = rn.default.getThemeVariables(t.themeVariables));
  let e = typeof t == 'object' ? VO(t) : ky();
  fc(e.logLevel), wp();
}
function xZ(t, e, r, n) {
  wF(e, t), SF(e, r, n, e.attr('id'));
}
var vM,
  YK,
  VK,
  XK,
  KK,
  ZK,
  QK,
  JK,
  tZ,
  eZ,
  rZ,
  nZ,
  iZ,
  oZ,
  aZ,
  sZ,
  cZ,
  Qi,
  EM,
  uZ,
  fZ,
  hZ,
  pZ,
  wM,
  dZ,
  mZ,
  IOt,
  Np = f(() => {
    'use strict';
    gn();
    sF();
    lF();
    Ar();
    yF();
    CF();
    k0();
    EF();
    xe();
    E0();
    Wh();
    vM = Gc(Kx(), 1);
    en();
    vm();
    vF();
    kM();
    (YK = 5e4),
      (VK =
        'graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa'),
      (XK = 'sandbox'),
      (KK = 'loose'),
      (ZK = 'http://www.w3.org/2000/svg'),
      (QK = 'http://www.w3.org/1999/xlink'),
      (JK = 'http://www.w3.org/1999/xhtml'),
      (tZ = '100%'),
      (eZ = '100%'),
      (rZ = 'border:0;margin:0;'),
      (nZ = 'margin:0'),
      (iZ = 'allow-top-navigation-by-user-activation allow-popups'),
      (oZ = 'The "iframe" tag is not supported by your browser.'),
      (aZ = ['foreignobject']),
      (sZ = ['dominant-baseline']);
    (cZ = function (t) {
      let e = t;
      return (
        (e = e.replace(/style.*:\S*#.*;/g, function (r) {
          return r.substring(0, r.length - 1);
        })),
        (e = e.replace(/classDef.*:\S*#.*;/g, function (r) {
          return r.substring(0, r.length - 1);
        })),
        (e = e.replace(/#\w+;/g, function (r) {
          let n = r.substring(1, r.length - 1);
          return /^\+?\d+$/.test(n)
            ? '\uFB02\xB0\xB0' + n + '\xB6\xDF'
            : '\uFB02\xB0' + n + '\xB6\xDF';
        })),
        e
      );
    }),
      (Qi = function (t) {
        return t.replace(/ﬂ°°/g, '&#').replace(/ﬂ°/g, '&').replace(/¶ß/g, ';');
      }),
      (EM = (t, e, r = []) => `
.${t} ${e} { ${r.join(' !important; ')} !important; }`),
      (uZ = (t, e = {}) => {
        let r = '';
        if (
          (t.themeCSS !== void 0 &&
            (r += `
${t.themeCSS}`),
          t.fontFamily !== void 0 &&
            (r += `
:root { --mermaid-font-family: ${t.fontFamily}}`),
          t.altFontFamily !== void 0 &&
            (r += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`),
          !dt(e))
        ) {
          let a =
            t.htmlLabels || t.flowchart?.htmlLabels
              ? ['> *', 'span']
              : ['rect', 'polygon', 'ellipse', 'circle', 'path'];
          for (let s in e) {
            let l = e[s];
            dt(l.styles) ||
              a.forEach((c) => {
                r += EM(l.id, c, l.styles);
              }),
              dt(l.textStyles) || (r += EM(l.id, 'tspan', l.textStyles));
          }
        }
        return r;
      }),
      (fZ = (t, e, r, n) => {
        let i = uZ(t, r),
          o = mF(e, i, t.themeVariables);
        return _p(eF(`${n}{${o}}`), iF);
      }),
      (hZ = (t = '', e, r) => {
        let n = t;
        return (
          !r &&
            !e &&
            (n = n.replace(
              /marker-end="url\([\d+./:=?A-Za-z-]*?#/g,
              'marker-end="url(#'
            )),
          (n = Qi(n)),
          (n = n.replace(/<br>/g, '<br/>')),
          n
        );
      }),
      (pZ = (t = '', e) => {
        let r = e?.viewBox?.baseVal?.height
            ? e.viewBox.baseVal.height + 'px'
            : eZ,
          n = btoa('<body style="' + nZ + '">' + t + '</body>');
        return `<iframe style="width:${tZ};height:${r};${rZ}" src="data:text/html;base64,${n}" sandbox="${iZ}">
  ${oZ}
</iframe>`;
      }),
      (wM = (t, e, r, n, i) => {
        let o = t.append('div');
        o.attr('id', r), n && o.attr('style', n);
        let a = o
          .append('svg')
          .attr('id', e)
          .attr('width', '100%')
          .attr('xmlns', ZK);
        return i && a.attr('xmlns:xlink', i), a.append('g'), t;
      });
    (dZ = (t, e, r, n) => {
      t.getElementById(e)?.remove(),
        t.getElementById(r)?.remove(),
        t.getElementById(n)?.remove();
    }),
      (mZ = async function (t, e, r) {
        wp();
        let n = AM(e);
        e = n.code;
        let i = rt();
        k.debug(i), e.length > (i?.maxTextSize ?? YK) && (e = VK);
        let o = '#' + t,
          a = 'i' + t,
          s = '#' + a,
          l = 'd' + t,
          c = '#' + l,
          u = ft('body'),
          h = i.securityLevel === XK,
          p = i.securityLevel === KK,
          d = i.fontFamily;
        if (r !== void 0) {
          if ((r && (r.innerHTML = ''), h)) {
            let v = SM(ft(r), a);
            (u = ft(v.nodes()[0].contentDocument.body)),
              (u.node().style.margin = 0);
          } else u = ft(r);
          wM(u, t, l, `font-family: ${d}`, QK);
        } else {
          if ((dZ(document, t, l, a), h)) {
            let v = SM(ft('body'), a);
            (u = ft(v.nodes()[0].contentDocument.body)),
              (u.node().style.margin = 0);
          } else u = ft('body');
          wM(u, t, l);
        }
        e = cZ(e);
        let m, g;
        try {
          m = await Sp(e, { title: n.title });
        } catch (v) {
          (m = new Sc('error')), (g = v);
        }
        let E = u.select(c).node(),
          y = m.type,
          T = E.firstChild,
          b = T.firstChild,
          N = m.renderer.getClasses?.(e, m),
          I = fZ(i, y, N, o),
          A = document.createElement('style');
        (A.innerHTML = I), T.insertBefore(A, b);
        try {
          await m.renderer.draw(e, t, _0, m);
        } catch (v) {
          throw (fF.draw(e, t, _0), v);
        }
        let O = u.select(`${c} svg`),
          D = m.db.getAccTitle?.(),
          J = m.db.getAccDescription?.();
        xZ(y, O, D, J),
          u
            .select(`[id="${t}"]`)
            .selectAll('foreignobject > *')
            .attr('xmlns', JK);
        let st = u.select(c).node().innerHTML;
        if (
          (k.debug('config.arrowMarkerAbsolute', i.arrowMarkerAbsolute),
          (st = hZ(st, h, ie(i.arrowMarkerAbsolute))),
          h)
        ) {
          let v = u.select(c + ' svg').node();
          st = pZ(st, v);
        } else
          p || (st = vM.default.sanitize(st, { ADD_TAGS: aZ, ADD_ATTR: sZ }));
        if ((kF(), g)) throw g;
        let L = ft(h ? s : c).node();
        return (
          L && 'remove' in L && L.remove(),
          { svg: st, bindFunctions: m.db.bindFunctions }
        );
      });
    IOt = Object.freeze({
      render: mZ,
      parse: lZ,
      getDiagramFromText: Sp,
      initialize: gZ,
      getConfig: rt,
      setConfig: ZO,
      getSiteConfig: ky,
      updateSiteConfig: KO,
      reset: () => {
        xc();
      },
      globalReset: () => {
        xc(Gi);
      },
      defaultConfig: Gi,
    });
    fc(rt().logLevel);
    xc(rt());
  });
function yZ(t, e) {
  e && t.attr('style', e);
}
function bZ(t) {
  let e = ft(
      document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    ),
    r = e.append('xhtml:div'),
    n = t.label,
    i = t.isNode ? 'nodeLabel' : 'edgeLabel';
  return (
    r.html(
      '<span class="' +
        i +
        '" ' +
        (t.labelStyle ? 'style="' + t.labelStyle + '"' : '') +
        '>' +
        n +
        '</span>'
    ),
    yZ(r, t.labelStyle),
    r.style('display', 'inline-block'),
    r.style('white-space', 'nowrap'),
    r.attr('xmlns', 'http://www.w3.org/1999/xhtml'),
    e.node()
  );
}
var _Z,
  He,
  Rc = f(() => {
    'use strict';
    gn();
    xe();
    Ar();
    en();
    Np();
    (_Z = (t, e, r, n) => {
      let i = t || '';
      if ((typeof i == 'object' && (i = i[0]), ie(rt().flowchart.htmlLabels))) {
        (i = i.replace(/\\n|\n/g, '<br />')), k.info('vertexText' + i);
        let o = {
          isNode: n,
          label: Qi(i).replace(
            /fa[blrs]?:fa-[\w-]+/g,
            (s) => `<i class='${s.replace(':', ' ')}'></i>`
          ),
          labelStyle: e.replace('fill:', 'color:'),
        };
        return bZ(o);
      } else {
        let o = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        o.setAttribute('style', e.replace('color:', 'fill:'));
        let a = [];
        typeof i == 'string'
          ? (a = i.split(/\\n|\n|<br\s*\/?>/gi))
          : Array.isArray(i)
          ? (a = i)
          : (a = []);
        for (let s of a) {
          let l = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'tspan'
          );
          l.setAttributeNS(
            'http://www.w3.org/XML/1998/namespace',
            'xml:space',
            'preserve'
          ),
            l.setAttribute('dy', '1em'),
            l.setAttribute('x', '0'),
            r
              ? l.setAttribute('class', 'title-row')
              : l.setAttribute('class', 'row'),
            (l.textContent = s.trim()),
            o.appendChild(l);
        }
        return o;
      }
    }),
      (He = _Z);
  });
function $0(t, e) {
  let r = e || CZ,
    n = typeof r.includeImageAlt == 'boolean' ? r.includeImageAlt : !0,
    i = typeof r.includeHtml == 'boolean' ? r.includeHtml : !0;
  return IM(t, n, i);
}
function IM(t, e, r) {
  if (TZ(t)) {
    if ('value' in t) return t.type === 'html' && !r ? '' : t.value;
    if (e && 'alt' in t && t.alt) return t.alt;
    if ('children' in t) return LM(t.children, e, r);
  }
  return Array.isArray(t) ? LM(t, e, r) : '';
}
function LM(t, e, r) {
  let n = [],
    i = -1;
  for (; ++i < t.length; ) n[i] = IM(t[i], e, r);
  return n.join('');
}
function TZ(t) {
  return !!(t && typeof t == 'object');
}
var CZ,
  OM = f(() => {
    CZ = {};
  });
var RM = f(() => {
  OM();
});
function Ze(t, e, r, n) {
  let i = t.length,
    o = 0,
    a;
  if (
    (e < 0 ? (e = -e > i ? 0 : i + e) : (e = e > i ? i : e),
    (r = r > 0 ? r : 0),
    n.length < 1e4)
  )
    (a = Array.from(n)), a.unshift(e, r), t.splice(...a);
  else
    for (r && t.splice(e, r); o < n.length; )
      (a = n.slice(o, o + 1e4)),
        a.unshift(e, 0),
        t.splice(...a),
        (o += 1e4),
        (e += 1e4);
}
function hr(t, e) {
  return t.length > 0 ? (Ze(t, t.length, 0, e), t) : e;
}
var Ji = f(() => {});
function FM(t) {
  let e = {},
    r = -1;
  for (; ++r < t.length; ) kZ(e, t[r]);
  return e;
}
function kZ(t, e) {
  let r;
  for (r in e) {
    let i = (NM.call(t, r) ? t[r] : void 0) || (t[r] = {}),
      o = e[r],
      a;
    if (o)
      for (a in o) {
        NM.call(i, a) || (i[a] = []);
        let s = o[a];
        EZ(i[a], Array.isArray(s) ? s : s ? [s] : []);
      }
  }
}
function EZ(t, e) {
  let r = -1,
    n = [];
  for (; ++r < e.length; ) (e[r].add === 'after' ? t : n).push(e[r]);
  Ze(t, 0, 0, n);
}
var NM,
  MM = f(() => {
    Ji();
    NM = {}.hasOwnProperty;
  });
var BM,
  PM = f(() => {
    BM =
      /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
  });
function Nc(t) {
  return t !== null && (t < 32 || t === 127);
}
function Z(t) {
  return t !== null && t < -2;
}
function ke(t) {
  return t !== null && (t < 0 || t === 32);
}
function mt(t) {
  return t === -2 || t === -1 || t === 32;
}
function to(t) {
  return e;
  function e(r) {
    return r !== null && t.test(String.fromCharCode(r));
  }
}
var Ur,
  pr,
  DM,
  Fc,
  UM,
  zM,
  $M,
  WM,
  $t = f(() => {
    PM();
    (Ur = to(/[A-Za-z]/)),
      (pr = to(/[\dA-Za-z]/)),
      (DM = to(/[#-'*+\--9=?A-Z^-~]/));
    (Fc = to(/\d/)), (UM = to(/[\dA-Fa-f]/)), (zM = to(/[!-/:-@[-`{-~]/));
    ($M = to(BM)), (WM = to(/\s/));
  });
function yt(t, e, r, n) {
  let i = n ? n - 1 : Number.POSITIVE_INFINITY,
    o = 0;
  return a;
  function a(l) {
    return mt(l) ? (t.enter(r), s(l)) : e(l);
  }
  function s(l) {
    return mt(l) && o++ < i ? (t.consume(l), s) : (t.exit(r), e(l));
  }
}
var Ge = f(() => {
  $t();
});
function wZ(t) {
  let e = t.attempt(this.parser.constructs.contentInitial, n, i),
    r;
  return e;
  function n(s) {
    if (s === null) {
      t.consume(s);
      return;
    }
    return (
      t.enter('lineEnding'),
      t.consume(s),
      t.exit('lineEnding'),
      yt(t, e, 'linePrefix')
    );
  }
  function i(s) {
    return t.enter('paragraph'), o(s);
  }
  function o(s) {
    let l = t.enter('chunkText', { contentType: 'text', previous: r });
    return r && (r.next = l), (r = l), a(s);
  }
  function a(s) {
    if (s === null) {
      t.exit('chunkText'), t.exit('paragraph'), t.consume(s);
      return;
    }
    return Z(s) ? (t.consume(s), t.exit('chunkText'), o) : (t.consume(s), a);
  }
}
var qM,
  HM = f(() => {
    Ge();
    $t();
    qM = { tokenize: wZ };
  });
function SZ(t) {
  let e = this,
    r = [],
    n = 0,
    i,
    o,
    a;
  return s;
  function s(b) {
    if (n < r.length) {
      let N = r[n];
      return (e.containerState = N[1]), t.attempt(N[0].continuation, l, c)(b);
    }
    return c(b);
  }
  function l(b) {
    if ((n++, e.containerState._closeFlow)) {
      (e.containerState._closeFlow = void 0), i && T();
      let N = e.events.length,
        I = N,
        A;
      for (; I--; )
        if (e.events[I][0] === 'exit' && e.events[I][1].type === 'chunkFlow') {
          A = e.events[I][1].end;
          break;
        }
      y(n);
      let O = N;
      for (; O < e.events.length; )
        (e.events[O][1].end = Object.assign({}, A)), O++;
      return (
        Ze(e.events, I + 1, 0, e.events.slice(N)), (e.events.length = O), c(b)
      );
    }
    return s(b);
  }
  function c(b) {
    if (n === r.length) {
      if (!i) return p(b);
      if (i.currentConstruct && i.currentConstruct.concrete) return m(b);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return (e.containerState = {}), t.check(GM, u, h)(b);
  }
  function u(b) {
    return i && T(), y(n), p(b);
  }
  function h(b) {
    return (
      (e.parser.lazy[e.now().line] = n !== r.length), (a = e.now().offset), m(b)
    );
  }
  function p(b) {
    return (e.containerState = {}), t.attempt(GM, d, m)(b);
  }
  function d(b) {
    return n++, r.push([e.currentConstruct, e.containerState]), p(b);
  }
  function m(b) {
    if (b === null) {
      i && T(), y(0), t.consume(b);
      return;
    }
    return (
      (i = i || e.parser.flow(e.now())),
      t.enter('chunkFlow', { contentType: 'flow', previous: o, _tokenizer: i }),
      g(b)
    );
  }
  function g(b) {
    if (b === null) {
      E(t.exit('chunkFlow'), !0), y(0), t.consume(b);
      return;
    }
    return Z(b)
      ? (t.consume(b),
        E(t.exit('chunkFlow')),
        (n = 0),
        (e.interrupt = void 0),
        s)
      : (t.consume(b), g);
  }
  function E(b, N) {
    let I = e.sliceStream(b);
    if (
      (N && I.push(null),
      (b.previous = o),
      o && (o.next = b),
      (o = b),
      i.defineSkip(b.start),
      i.write(I),
      e.parser.lazy[b.start.line])
    ) {
      let A = i.events.length;
      for (; A--; )
        if (
          i.events[A][1].start.offset < a &&
          (!i.events[A][1].end || i.events[A][1].end.offset > a)
        )
          return;
      let O = e.events.length,
        D = O,
        J,
        st;
      for (; D--; )
        if (e.events[D][0] === 'exit' && e.events[D][1].type === 'chunkFlow') {
          if (J) {
            st = e.events[D][1].end;
            break;
          }
          J = !0;
        }
      for (y(n), A = O; A < e.events.length; )
        (e.events[A][1].end = Object.assign({}, st)), A++;
      Ze(e.events, D + 1, 0, e.events.slice(O)), (e.events.length = A);
    }
  }
  function y(b) {
    let N = r.length;
    for (; N-- > b; ) {
      let I = r[N];
      (e.containerState = I[1]), I[0].exit.call(e, t);
    }
    r.length = b;
  }
  function T() {
    i.write([null]),
      (o = void 0),
      (i = void 0),
      (e.containerState._closeFlow = void 0);
  }
}
function vZ(t, e, r) {
  return yt(
    t,
    t.attempt(this.parser.constructs.document, e, r),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  );
}
var jM,
  GM,
  YM = f(() => {
    Ge();
    $t();
    Ji();
    (jM = { tokenize: SZ }), (GM = { tokenize: vZ });
  });
function W0(t) {
  if (t === null || ke(t) || WM(t)) return 1;
  if ($M(t)) return 2;
}
var VM = f(() => {
  $t();
});
function Ss(t, e, r) {
  let n = [],
    i = -1;
  for (; ++i < t.length; ) {
    let o = t[i].resolveAll;
    o && !n.includes(o) && ((e = o(e, r)), n.push(o));
  }
  return e;
}
var Fp = f(() => {});
function AZ(t, e) {
  let r = -1,
    n,
    i,
    o,
    a,
    s,
    l,
    c,
    u;
  for (; ++r < t.length; )
    if (
      t[r][0] === 'enter' &&
      t[r][1].type === 'attentionSequence' &&
      t[r][1]._close
    ) {
      for (n = r; n--; )
        if (
          t[n][0] === 'exit' &&
          t[n][1].type === 'attentionSequence' &&
          t[n][1]._open &&
          e.sliceSerialize(t[n][1]).charCodeAt(0) ===
            e.sliceSerialize(t[r][1]).charCodeAt(0)
        ) {
          if (
            (t[n][1]._close || t[r][1]._open) &&
            (t[r][1].end.offset - t[r][1].start.offset) % 3 &&
            !(
              (t[n][1].end.offset -
                t[n][1].start.offset +
                t[r][1].end.offset -
                t[r][1].start.offset) %
              3
            )
          )
            continue;
          l =
            t[n][1].end.offset - t[n][1].start.offset > 1 &&
            t[r][1].end.offset - t[r][1].start.offset > 1
              ? 2
              : 1;
          let h = Object.assign({}, t[n][1].end),
            p = Object.assign({}, t[r][1].start);
          XM(h, -l),
            XM(p, l),
            (a = {
              type: l > 1 ? 'strongSequence' : 'emphasisSequence',
              start: h,
              end: Object.assign({}, t[n][1].end),
            }),
            (s = {
              type: l > 1 ? 'strongSequence' : 'emphasisSequence',
              start: Object.assign({}, t[r][1].start),
              end: p,
            }),
            (o = {
              type: l > 1 ? 'strongText' : 'emphasisText',
              start: Object.assign({}, t[n][1].end),
              end: Object.assign({}, t[r][1].start),
            }),
            (i = {
              type: l > 1 ? 'strong' : 'emphasis',
              start: Object.assign({}, a.start),
              end: Object.assign({}, s.end),
            }),
            (t[n][1].end = Object.assign({}, a.start)),
            (t[r][1].start = Object.assign({}, s.end)),
            (c = []),
            t[n][1].end.offset - t[n][1].start.offset &&
              (c = hr(c, [
                ['enter', t[n][1], e],
                ['exit', t[n][1], e],
              ])),
            (c = hr(c, [
              ['enter', i, e],
              ['enter', a, e],
              ['exit', a, e],
              ['enter', o, e],
            ])),
            (c = hr(
              c,
              Ss(e.parser.constructs.insideSpan.null, t.slice(n + 1, r), e)
            )),
            (c = hr(c, [
              ['exit', o, e],
              ['enter', s, e],
              ['exit', s, e],
              ['exit', i, e],
            ])),
            t[r][1].end.offset - t[r][1].start.offset
              ? ((u = 2),
                (c = hr(c, [
                  ['enter', t[r][1], e],
                  ['exit', t[r][1], e],
                ])))
              : (u = 0),
            Ze(t, n - 1, r - n + 3, c),
            (r = n + c.length - u - 2);
          break;
        }
    }
  for (r = -1; ++r < t.length; )
    t[r][1].type === 'attentionSequence' && (t[r][1].type = 'data');
  return t;
}
function LZ(t, e) {
  let r = this.parser.constructs.attentionMarkers.null,
    n = this.previous,
    i = W0(n),
    o;
  return a;
  function a(l) {
    return (o = l), t.enter('attentionSequence'), s(l);
  }
  function s(l) {
    if (l === o) return t.consume(l), s;
    let c = t.exit('attentionSequence'),
      u = W0(l),
      h = !u || (u === 2 && i) || r.includes(l),
      p = !i || (i === 2 && u) || r.includes(n);
    return (
      (c._open = !!(o === 42 ? h : h && (i || !p))),
      (c._close = !!(o === 42 ? p : p && (u || !h))),
      e(l)
    );
  }
}
function XM(t, e) {
  (t.column += e), (t.offset += e), (t._bufferIndex += e);
}
var Mc,
  KM = f(() => {
    Ji();
    VM();
    Fp();
    Mc = { name: 'attention', tokenize: LZ, resolveAll: AZ };
  });
function IZ(t, e, r) {
  let n = 0;
  return i;
  function i(d) {
    return (
      t.enter('autolink'),
      t.enter('autolinkMarker'),
      t.consume(d),
      t.exit('autolinkMarker'),
      t.enter('autolinkProtocol'),
      o
    );
  }
  function o(d) {
    return Ur(d) ? (t.consume(d), a) : c(d);
  }
  function a(d) {
    return d === 43 || d === 45 || d === 46 || pr(d) ? ((n = 1), s(d)) : c(d);
  }
  function s(d) {
    return d === 58
      ? (t.consume(d), (n = 0), l)
      : (d === 43 || d === 45 || d === 46 || pr(d)) && n++ < 32
      ? (t.consume(d), s)
      : ((n = 0), c(d));
  }
  function l(d) {
    return d === 62
      ? (t.exit('autolinkProtocol'),
        t.enter('autolinkMarker'),
        t.consume(d),
        t.exit('autolinkMarker'),
        t.exit('autolink'),
        e)
      : d === null || d === 32 || d === 60 || Nc(d)
      ? r(d)
      : (t.consume(d), l);
  }
  function c(d) {
    return d === 64 ? (t.consume(d), u) : DM(d) ? (t.consume(d), c) : r(d);
  }
  function u(d) {
    return pr(d) ? h(d) : r(d);
  }
  function h(d) {
    return d === 46
      ? (t.consume(d), (n = 0), u)
      : d === 62
      ? ((t.exit('autolinkProtocol').type = 'autolinkEmail'),
        t.enter('autolinkMarker'),
        t.consume(d),
        t.exit('autolinkMarker'),
        t.exit('autolink'),
        e)
      : p(d);
  }
  function p(d) {
    if ((d === 45 || pr(d)) && n++ < 63) {
      let m = d === 45 ? p : h;
      return t.consume(d), m;
    }
    return r(d);
  }
}
var q0,
  ZM = f(() => {
    $t();
    q0 = { name: 'autolink', tokenize: IZ };
  });
function OZ(t, e, r) {
  return n;
  function n(o) {
    return mt(o) ? yt(t, i, 'linePrefix')(o) : i(o);
  }
  function i(o) {
    return o === null || Z(o) ? e(o) : r(o);
  }
}
var eo,
  Mp = f(() => {
    Ge();
    $t();
    eo = { tokenize: OZ, partial: !0 };
  });
function RZ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    if (a === 62) {
      let s = n.containerState;
      return (
        s.open || (t.enter('blockQuote', { _container: !0 }), (s.open = !0)),
        t.enter('blockQuotePrefix'),
        t.enter('blockQuoteMarker'),
        t.consume(a),
        t.exit('blockQuoteMarker'),
        o
      );
    }
    return r(a);
  }
  function o(a) {
    return mt(a)
      ? (t.enter('blockQuotePrefixWhitespace'),
        t.consume(a),
        t.exit('blockQuotePrefixWhitespace'),
        t.exit('blockQuotePrefix'),
        e)
      : (t.exit('blockQuotePrefix'), e(a));
  }
}
function NZ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return mt(a)
      ? yt(
          t,
          o,
          'linePrefix',
          n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(a)
      : o(a);
  }
  function o(a) {
    return t.attempt(Bp, e, r)(a);
  }
}
function FZ(t) {
  t.exit('blockQuote');
}
var Bp,
  QM = f(() => {
    Ge();
    $t();
    Bp = {
      name: 'blockQuote',
      tokenize: RZ,
      continuation: { tokenize: NZ },
      exit: FZ,
    };
  });
function MZ(t, e, r) {
  return n;
  function n(o) {
    return (
      t.enter('characterEscape'),
      t.enter('escapeMarker'),
      t.consume(o),
      t.exit('escapeMarker'),
      i
    );
  }
  function i(o) {
    return zM(o)
      ? (t.enter('characterEscapeValue'),
        t.consume(o),
        t.exit('characterEscapeValue'),
        t.exit('characterEscape'),
        e)
      : r(o);
  }
}
var Pp,
  JM = f(() => {
    $t();
    Pp = { name: 'characterEscape', tokenize: MZ };
  });
function vs(t) {
  let e = '&' + t + ';';
  tB.innerHTML = e;
  let r = tB.textContent;
  return (r.charCodeAt(r.length - 1) === 59 && t !== 'semi') || r === e
    ? !1
    : r;
}
var tB,
  Dp = f(() => {
    tB = document.createElement('i');
  });
function BZ(t, e, r) {
  let n = this,
    i = 0,
    o,
    a;
  return s;
  function s(h) {
    return (
      t.enter('characterReference'),
      t.enter('characterReferenceMarker'),
      t.consume(h),
      t.exit('characterReferenceMarker'),
      l
    );
  }
  function l(h) {
    return h === 35
      ? (t.enter('characterReferenceMarkerNumeric'),
        t.consume(h),
        t.exit('characterReferenceMarkerNumeric'),
        c)
      : (t.enter('characterReferenceValue'), (o = 31), (a = pr), u(h));
  }
  function c(h) {
    return h === 88 || h === 120
      ? (t.enter('characterReferenceMarkerHexadecimal'),
        t.consume(h),
        t.exit('characterReferenceMarkerHexadecimal'),
        t.enter('characterReferenceValue'),
        (o = 6),
        (a = UM),
        u)
      : (t.enter('characterReferenceValue'), (o = 7), (a = Fc), u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      let p = t.exit('characterReferenceValue');
      return a === pr && !vs(n.sliceSerialize(p))
        ? r(h)
        : (t.enter('characterReferenceMarker'),
          t.consume(h),
          t.exit('characterReferenceMarker'),
          t.exit('characterReference'),
          e);
    }
    return a(h) && i++ < o ? (t.consume(h), u) : r(h);
  }
}
var Up,
  eB = f(() => {
    Dp();
    $t();
    Up = { name: 'characterReference', tokenize: BZ };
  });
function PZ(t, e, r) {
  let n = this,
    i = { tokenize: I, partial: !0 },
    o = 0,
    a = 0,
    s;
  return l;
  function l(A) {
    return c(A);
  }
  function c(A) {
    let O = n.events[n.events.length - 1];
    return (
      (o =
        O && O[1].type === 'linePrefix'
          ? O[2].sliceSerialize(O[1], !0).length
          : 0),
      (s = A),
      t.enter('codeFenced'),
      t.enter('codeFencedFence'),
      t.enter('codeFencedFenceSequence'),
      u(A)
    );
  }
  function u(A) {
    return A === s
      ? (a++, t.consume(A), u)
      : a < 3
      ? r(A)
      : (t.exit('codeFencedFenceSequence'),
        mt(A) ? yt(t, h, 'whitespace')(A) : h(A));
  }
  function h(A) {
    return A === null || Z(A)
      ? (t.exit('codeFencedFence'), n.interrupt ? e(A) : t.check(rB, g, N)(A))
      : (t.enter('codeFencedFenceInfo'),
        t.enter('chunkString', { contentType: 'string' }),
        p(A));
  }
  function p(A) {
    return A === null || Z(A)
      ? (t.exit('chunkString'), t.exit('codeFencedFenceInfo'), h(A))
      : mt(A)
      ? (t.exit('chunkString'),
        t.exit('codeFencedFenceInfo'),
        yt(t, d, 'whitespace')(A))
      : A === 96 && A === s
      ? r(A)
      : (t.consume(A), p);
  }
  function d(A) {
    return A === null || Z(A)
      ? h(A)
      : (t.enter('codeFencedFenceMeta'),
        t.enter('chunkString', { contentType: 'string' }),
        m(A));
  }
  function m(A) {
    return A === null || Z(A)
      ? (t.exit('chunkString'), t.exit('codeFencedFenceMeta'), h(A))
      : A === 96 && A === s
      ? r(A)
      : (t.consume(A), m);
  }
  function g(A) {
    return t.attempt(i, N, E)(A);
  }
  function E(A) {
    return t.enter('lineEnding'), t.consume(A), t.exit('lineEnding'), y;
  }
  function y(A) {
    return o > 0 && mt(A) ? yt(t, T, 'linePrefix', o + 1)(A) : T(A);
  }
  function T(A) {
    return A === null || Z(A)
      ? t.check(rB, g, N)(A)
      : (t.enter('codeFlowValue'), b(A));
  }
  function b(A) {
    return A === null || Z(A)
      ? (t.exit('codeFlowValue'), T(A))
      : (t.consume(A), b);
  }
  function N(A) {
    return t.exit('codeFenced'), e(A);
  }
  function I(A, O, D) {
    let J = 0;
    return st;
    function st(M) {
      return A.enter('lineEnding'), A.consume(M), A.exit('lineEnding'), R;
    }
    function R(M) {
      return (
        A.enter('codeFencedFence'),
        mt(M)
          ? yt(
              A,
              L,
              'linePrefix',
              n.parser.constructs.disable.null.includes('codeIndented')
                ? void 0
                : 4
            )(M)
          : L(M)
      );
    }
    function L(M) {
      return M === s ? (A.enter('codeFencedFenceSequence'), v(M)) : D(M);
    }
    function v(M) {
      return M === s
        ? (J++, A.consume(M), v)
        : J >= a
        ? (A.exit('codeFencedFenceSequence'),
          mt(M) ? yt(A, U, 'whitespace')(M) : U(M))
        : D(M);
    }
    function U(M) {
      return M === null || Z(M) ? (A.exit('codeFencedFence'), O(M)) : D(M);
    }
  }
}
function DZ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return a === null
      ? r(a)
      : (t.enter('lineEnding'), t.consume(a), t.exit('lineEnding'), o);
  }
  function o(a) {
    return n.parser.lazy[n.now().line] ? r(a) : e(a);
  }
}
var rB,
  zp,
  nB = f(() => {
    Ge();
    $t();
    (rB = { tokenize: DZ, partial: !0 }),
      (zp = { name: 'codeFenced', tokenize: PZ, concrete: !0 });
  });
function zZ(t, e, r) {
  let n = this;
  return i;
  function i(c) {
    return t.enter('codeIndented'), yt(t, o, 'linePrefix', 4 + 1)(c);
  }
  function o(c) {
    let u = n.events[n.events.length - 1];
    return u &&
      u[1].type === 'linePrefix' &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? a(c)
      : r(c);
  }
  function a(c) {
    return c === null
      ? l(c)
      : Z(c)
      ? t.attempt(UZ, a, l)(c)
      : (t.enter('codeFlowValue'), s(c));
  }
  function s(c) {
    return c === null || Z(c)
      ? (t.exit('codeFlowValue'), a(c))
      : (t.consume(c), s);
  }
  function l(c) {
    return t.exit('codeIndented'), e(c);
  }
}
function $Z(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return n.parser.lazy[n.now().line]
      ? r(a)
      : Z(a)
      ? (t.enter('lineEnding'), t.consume(a), t.exit('lineEnding'), i)
      : yt(t, o, 'linePrefix', 4 + 1)(a);
  }
  function o(a) {
    let s = n.events[n.events.length - 1];
    return s &&
      s[1].type === 'linePrefix' &&
      s[2].sliceSerialize(s[1], !0).length >= 4
      ? e(a)
      : Z(a)
      ? i(a)
      : r(a);
  }
}
var Bc,
  UZ,
  iB = f(() => {
    Ge();
    $t();
    (Bc = { name: 'codeIndented', tokenize: zZ }),
      (UZ = { tokenize: $Z, partial: !0 });
  });
function WZ(t) {
  let e = t.length - 4,
    r = 3,
    n,
    i;
  if (
    (t[r][1].type === 'lineEnding' || t[r][1].type === 'space') &&
    (t[e][1].type === 'lineEnding' || t[e][1].type === 'space')
  ) {
    for (n = r; ++n < e; )
      if (t[n][1].type === 'codeTextData') {
        (t[r][1].type = 'codeTextPadding'),
          (t[e][1].type = 'codeTextPadding'),
          (r += 2),
          (e -= 2);
        break;
      }
  }
  for (n = r - 1, e++; ++n <= e; )
    i === void 0
      ? n !== e && t[n][1].type !== 'lineEnding' && (i = n)
      : (n === e || t[n][1].type === 'lineEnding') &&
        ((t[i][1].type = 'codeTextData'),
        n !== i + 2 &&
          ((t[i][1].end = t[n - 1][1].end),
          t.splice(i + 2, n - i - 2),
          (e -= n - i - 2),
          (n = i + 2)),
        (i = void 0));
  return t;
}
function qZ(t) {
  return (
    t !== 96 ||
    this.events[this.events.length - 1][1].type === 'characterEscape'
  );
}
function HZ(t, e, r) {
  let n = this,
    i = 0,
    o,
    a;
  return s;
  function s(p) {
    return t.enter('codeText'), t.enter('codeTextSequence'), l(p);
  }
  function l(p) {
    return p === 96
      ? (t.consume(p), i++, l)
      : (t.exit('codeTextSequence'), c(p));
  }
  function c(p) {
    return p === null
      ? r(p)
      : p === 32
      ? (t.enter('space'), t.consume(p), t.exit('space'), c)
      : p === 96
      ? ((a = t.enter('codeTextSequence')), (o = 0), h(p))
      : Z(p)
      ? (t.enter('lineEnding'), t.consume(p), t.exit('lineEnding'), c)
      : (t.enter('codeTextData'), u(p));
  }
  function u(p) {
    return p === null || p === 32 || p === 96 || Z(p)
      ? (t.exit('codeTextData'), c(p))
      : (t.consume(p), u);
  }
  function h(p) {
    return p === 96
      ? (t.consume(p), o++, h)
      : o === i
      ? (t.exit('codeTextSequence'), t.exit('codeText'), e(p))
      : ((a.type = 'codeTextData'), u(p));
  }
}
var H0,
  oB = f(() => {
    $t();
    H0 = { name: 'codeText', tokenize: HZ, resolve: WZ, previous: qZ };
  });
function $p(t) {
  let e = {},
    r = -1,
    n,
    i,
    o,
    a,
    s,
    l,
    c;
  for (; ++r < t.length; ) {
    for (; r in e; ) r = e[r];
    if (
      ((n = t[r]),
      r &&
        n[1].type === 'chunkFlow' &&
        t[r - 1][1].type === 'listItemPrefix' &&
        ((l = n[1]._tokenizer.events),
        (o = 0),
        o < l.length && l[o][1].type === 'lineEndingBlank' && (o += 2),
        o < l.length && l[o][1].type === 'content'))
    )
      for (; ++o < l.length && l[o][1].type !== 'content'; )
        l[o][1].type === 'chunkText' &&
          ((l[o][1]._isInFirstContentOfListItem = !0), o++);
    if (n[0] === 'enter')
      n[1].contentType && (Object.assign(e, GZ(t, r)), (r = e[r]), (c = !0));
    else if (n[1]._container) {
      for (
        o = r, i = void 0;
        o-- &&
        ((a = t[o]),
        a[1].type === 'lineEnding' || a[1].type === 'lineEndingBlank');

      )
        a[0] === 'enter' &&
          (i && (t[i][1].type = 'lineEndingBlank'),
          (a[1].type = 'lineEnding'),
          (i = o));
      i &&
        ((n[1].end = Object.assign({}, t[i][1].start)),
        (s = t.slice(i, r)),
        s.unshift(n),
        Ze(t, i, r - i + 1, s));
    }
  }
  return !c;
}
function GZ(t, e) {
  let r = t[e][1],
    n = t[e][2],
    i = e - 1,
    o = [],
    a = r._tokenizer || n.parser[r.contentType](r.start),
    s = a.events,
    l = [],
    c = {},
    u,
    h,
    p = -1,
    d = r,
    m = 0,
    g = 0,
    E = [g];
  for (; d; ) {
    for (; t[++i][1] !== d; );
    o.push(i),
      d._tokenizer ||
        ((u = n.sliceStream(d)),
        d.next || u.push(null),
        h && a.defineSkip(d.start),
        d._isInFirstContentOfListItem &&
          (a._gfmTasklistFirstContentOfListItem = !0),
        a.write(u),
        d._isInFirstContentOfListItem &&
          (a._gfmTasklistFirstContentOfListItem = void 0)),
      (h = d),
      (d = d.next);
  }
  for (d = r; ++p < s.length; )
    s[p][0] === 'exit' &&
      s[p - 1][0] === 'enter' &&
      s[p][1].type === s[p - 1][1].type &&
      s[p][1].start.line !== s[p][1].end.line &&
      ((g = p + 1),
      E.push(g),
      (d._tokenizer = void 0),
      (d.previous = void 0),
      (d = d.next));
  for (
    a.events = [],
      d ? ((d._tokenizer = void 0), (d.previous = void 0)) : E.pop(),
      p = E.length;
    p--;

  ) {
    let y = s.slice(E[p], E[p + 1]),
      T = o.pop();
    l.unshift([T, T + y.length - 1]), Ze(t, T, 2, y);
  }
  for (p = -1; ++p < l.length; )
    (c[m + l[p][0]] = m + l[p][1]), (m += l[p][1] - l[p][0] - 1);
  return c;
}
var G0 = f(() => {
  Ji();
});
function YZ(t) {
  return $p(t), t;
}
function VZ(t, e) {
  let r;
  return n;
  function n(s) {
    return (
      t.enter('content'),
      (r = t.enter('chunkContent', { contentType: 'content' })),
      i(s)
    );
  }
  function i(s) {
    return s === null ? o(s) : Z(s) ? t.check(jZ, a, o)(s) : (t.consume(s), i);
  }
  function o(s) {
    return t.exit('chunkContent'), t.exit('content'), e(s);
  }
  function a(s) {
    return (
      t.consume(s),
      t.exit('chunkContent'),
      (r.next = t.enter('chunkContent', {
        contentType: 'content',
        previous: r,
      })),
      (r = r.next),
      i
    );
  }
}
function XZ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return (
      t.exit('chunkContent'),
      t.enter('lineEnding'),
      t.consume(a),
      t.exit('lineEnding'),
      yt(t, o, 'linePrefix')
    );
  }
  function o(a) {
    if (a === null || Z(a)) return r(a);
    let s = n.events[n.events.length - 1];
    return !n.parser.constructs.disable.null.includes('codeIndented') &&
      s &&
      s[1].type === 'linePrefix' &&
      s[2].sliceSerialize(s[1], !0).length >= 4
      ? e(a)
      : t.interrupt(n.parser.constructs.flow, r, e)(a);
  }
}
var j0,
  jZ,
  aB = f(() => {
    Ge();
    $t();
    G0();
    (j0 = { tokenize: VZ, resolve: YZ }), (jZ = { tokenize: XZ, partial: !0 });
  });
function Wp(t, e, r, n, i, o, a, s, l) {
  let c = l || Number.POSITIVE_INFINITY,
    u = 0;
  return h;
  function h(y) {
    return y === 60
      ? (t.enter(n), t.enter(i), t.enter(o), t.consume(y), t.exit(o), p)
      : y === null || y === 32 || y === 41 || Nc(y)
      ? r(y)
      : (t.enter(n),
        t.enter(a),
        t.enter(s),
        t.enter('chunkString', { contentType: 'string' }),
        g(y));
  }
  function p(y) {
    return y === 62
      ? (t.enter(o), t.consume(y), t.exit(o), t.exit(i), t.exit(n), e)
      : (t.enter(s), t.enter('chunkString', { contentType: 'string' }), d(y));
  }
  function d(y) {
    return y === 62
      ? (t.exit('chunkString'), t.exit(s), p(y))
      : y === null || y === 60 || Z(y)
      ? r(y)
      : (t.consume(y), y === 92 ? m : d);
  }
  function m(y) {
    return y === 60 || y === 62 || y === 92 ? (t.consume(y), d) : d(y);
  }
  function g(y) {
    return !u && (y === null || y === 41 || ke(y))
      ? (t.exit('chunkString'), t.exit(s), t.exit(a), t.exit(n), e(y))
      : u < c && y === 40
      ? (t.consume(y), u++, g)
      : y === 41
      ? (t.consume(y), u--, g)
      : y === null || y === 32 || y === 40 || Nc(y)
      ? r(y)
      : (t.consume(y), y === 92 ? E : g);
  }
  function E(y) {
    return y === 40 || y === 41 || y === 92 ? (t.consume(y), g) : g(y);
  }
}
var Y0 = f(() => {
  $t();
});
function qp(t, e, r, n, i, o) {
  let a = this,
    s = 0,
    l;
  return c;
  function c(d) {
    return t.enter(n), t.enter(i), t.consume(d), t.exit(i), t.enter(o), u;
  }
  function u(d) {
    return s > 999 ||
      d === null ||
      d === 91 ||
      (d === 93 && !l) ||
      (d === 94 && !s && '_hiddenFootnoteSupport' in a.parser.constructs)
      ? r(d)
      : d === 93
      ? (t.exit(o), t.enter(i), t.consume(d), t.exit(i), t.exit(n), e)
      : Z(d)
      ? (t.enter('lineEnding'), t.consume(d), t.exit('lineEnding'), u)
      : (t.enter('chunkString', { contentType: 'string' }), h(d));
  }
  function h(d) {
    return d === null || d === 91 || d === 93 || Z(d) || s++ > 999
      ? (t.exit('chunkString'), u(d))
      : (t.consume(d), l || (l = !mt(d)), d === 92 ? p : h);
  }
  function p(d) {
    return d === 91 || d === 92 || d === 93 ? (t.consume(d), s++, h) : h(d);
  }
}
var V0 = f(() => {
  $t();
});
function Hp(t, e, r, n, i, o) {
  let a;
  return s;
  function s(p) {
    return p === 34 || p === 39 || p === 40
      ? (t.enter(n),
        t.enter(i),
        t.consume(p),
        t.exit(i),
        (a = p === 40 ? 41 : p),
        l)
      : r(p);
  }
  function l(p) {
    return p === a
      ? (t.enter(i), t.consume(p), t.exit(i), t.exit(n), e)
      : (t.enter(o), c(p));
  }
  function c(p) {
    return p === a
      ? (t.exit(o), l(a))
      : p === null
      ? r(p)
      : Z(p)
      ? (t.enter('lineEnding'),
        t.consume(p),
        t.exit('lineEnding'),
        yt(t, c, 'linePrefix'))
      : (t.enter('chunkString', { contentType: 'string' }), u(p));
  }
  function u(p) {
    return p === a || p === null || Z(p)
      ? (t.exit('chunkString'), c(p))
      : (t.consume(p), p === 92 ? h : u);
  }
  function h(p) {
    return p === a || p === 92 ? (t.consume(p), u) : u(p);
  }
}
var X0 = f(() => {
  Ge();
  $t();
});
function Qo(t, e) {
  let r;
  return n;
  function n(i) {
    return Z(i)
      ? (t.enter('lineEnding'), t.consume(i), t.exit('lineEnding'), (r = !0), n)
      : mt(i)
      ? yt(t, n, r ? 'linePrefix' : 'lineSuffix')(i)
      : e(i);
  }
}
var K0 = f(() => {
  Ge();
  $t();
});
function mi(t) {
  return t
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase();
}
var Gp = f(() => {});
function ZZ(t, e, r) {
  let n = this,
    i;
  return o;
  function o(d) {
    return t.enter('definition'), a(d);
  }
  function a(d) {
    return qp.call(
      n,
      t,
      s,
      r,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(d);
  }
  function s(d) {
    return (
      (i = mi(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))),
      d === 58
        ? (t.enter('definitionMarker'),
          t.consume(d),
          t.exit('definitionMarker'),
          l)
        : r(d)
    );
  }
  function l(d) {
    return ke(d) ? Qo(t, c)(d) : c(d);
  }
  function c(d) {
    return Wp(
      t,
      u,
      r,
      'definitionDestination',
      'definitionDestinationLiteral',
      'definitionDestinationLiteralMarker',
      'definitionDestinationRaw',
      'definitionDestinationString'
    )(d);
  }
  function u(d) {
    return t.attempt(KZ, h, h)(d);
  }
  function h(d) {
    return mt(d) ? yt(t, p, 'whitespace')(d) : p(d);
  }
  function p(d) {
    return d === null || Z(d)
      ? (t.exit('definition'), n.parser.defined.push(i), e(d))
      : r(d);
  }
}
function QZ(t, e, r) {
  return n;
  function n(s) {
    return ke(s) ? Qo(t, i)(s) : r(s);
  }
  function i(s) {
    return Hp(
      t,
      o,
      r,
      'definitionTitle',
      'definitionTitleMarker',
      'definitionTitleString'
    )(s);
  }
  function o(s) {
    return mt(s) ? yt(t, a, 'whitespace')(s) : a(s);
  }
  function a(s) {
    return s === null || Z(s) ? e(s) : r(s);
  }
}
var Z0,
  KZ,
  sB = f(() => {
    Y0();
    V0();
    Ge();
    X0();
    K0();
    $t();
    Gp();
    (Z0 = { name: 'definition', tokenize: ZZ }),
      (KZ = { tokenize: QZ, partial: !0 });
  });
function JZ(t, e, r) {
  return n;
  function n(o) {
    return t.enter('hardBreakEscape'), t.consume(o), i;
  }
  function i(o) {
    return Z(o) ? (t.exit('hardBreakEscape'), e(o)) : r(o);
  }
}
var Q0,
  lB = f(() => {
    $t();
    Q0 = { name: 'hardBreakEscape', tokenize: JZ };
  });
function tQ(t, e) {
  let r = t.length - 2,
    n = 3,
    i,
    o;
  return (
    t[n][1].type === 'whitespace' && (n += 2),
    r - 2 > n && t[r][1].type === 'whitespace' && (r -= 2),
    t[r][1].type === 'atxHeadingSequence' &&
      (n === r - 1 || (r - 4 > n && t[r - 2][1].type === 'whitespace')) &&
      (r -= n + 1 === r ? 2 : 4),
    r > n &&
      ((i = { type: 'atxHeadingText', start: t[n][1].start, end: t[r][1].end }),
      (o = {
        type: 'chunkText',
        start: t[n][1].start,
        end: t[r][1].end,
        contentType: 'text',
      }),
      Ze(t, n, r - n + 1, [
        ['enter', i, e],
        ['enter', o, e],
        ['exit', o, e],
        ['exit', i, e],
      ])),
    t
  );
}
function eQ(t, e, r) {
  let n = 0;
  return i;
  function i(u) {
    return t.enter('atxHeading'), o(u);
  }
  function o(u) {
    return t.enter('atxHeadingSequence'), a(u);
  }
  function a(u) {
    return u === 35 && n++ < 6
      ? (t.consume(u), a)
      : u === null || ke(u)
      ? (t.exit('atxHeadingSequence'), s(u))
      : r(u);
  }
  function s(u) {
    return u === 35
      ? (t.enter('atxHeadingSequence'), l(u))
      : u === null || Z(u)
      ? (t.exit('atxHeading'), e(u))
      : mt(u)
      ? yt(t, s, 'whitespace')(u)
      : (t.enter('atxHeadingText'), c(u));
  }
  function l(u) {
    return u === 35 ? (t.consume(u), l) : (t.exit('atxHeadingSequence'), s(u));
  }
  function c(u) {
    return u === null || u === 35 || ke(u)
      ? (t.exit('atxHeadingText'), s(u))
      : (t.consume(u), c);
  }
}
var J0,
  cB = f(() => {
    Ge();
    $t();
    Ji();
    J0 = { name: 'headingAtx', tokenize: eQ, resolve: tQ };
  });
var uB,
  tb,
  fB = f(() => {
    (uB = [
      'address',
      'article',
      'aside',
      'base',
      'basefont',
      'blockquote',
      'body',
      'caption',
      'center',
      'col',
      'colgroup',
      'dd',
      'details',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'frame',
      'frameset',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hr',
      'html',
      'iframe',
      'legend',
      'li',
      'link',
      'main',
      'menu',
      'menuitem',
      'nav',
      'noframes',
      'ol',
      'optgroup',
      'option',
      'p',
      'param',
      'search',
      'section',
      'summary',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'title',
      'tr',
      'track',
      'ul',
    ]),
      (tb = ['pre', 'script', 'style', 'textarea']);
  });
function iQ(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === 'enter' && t[e][1].type === 'htmlFlow'); );
  return (
    e > 1 &&
      t[e - 2][1].type === 'linePrefix' &&
      ((t[e][1].start = t[e - 2][1].start),
      (t[e + 1][1].start = t[e - 2][1].start),
      t.splice(e - 2, 2)),
    t
  );
}
function oQ(t, e, r) {
  let n = this,
    i,
    o,
    a,
    s,
    l;
  return c;
  function c(_) {
    return u(_);
  }
  function u(_) {
    return t.enter('htmlFlow'), t.enter('htmlFlowData'), t.consume(_), h;
  }
  function h(_) {
    return _ === 33
      ? (t.consume(_), p)
      : _ === 47
      ? (t.consume(_), (o = !0), g)
      : _ === 63
      ? (t.consume(_), (i = 3), n.interrupt ? e : x)
      : Ur(_)
      ? (t.consume(_), (a = String.fromCharCode(_)), E)
      : r(_);
  }
  function p(_) {
    return _ === 45
      ? (t.consume(_), (i = 2), d)
      : _ === 91
      ? (t.consume(_), (i = 5), (s = 0), m)
      : Ur(_)
      ? (t.consume(_), (i = 4), n.interrupt ? e : x)
      : r(_);
  }
  function d(_) {
    return _ === 45 ? (t.consume(_), n.interrupt ? e : x) : r(_);
  }
  function m(_) {
    let qt = 'CDATA[';
    return _ === qt.charCodeAt(s++)
      ? (t.consume(_), s === qt.length ? (n.interrupt ? e : L) : m)
      : r(_);
  }
  function g(_) {
    return Ur(_) ? (t.consume(_), (a = String.fromCharCode(_)), E) : r(_);
  }
  function E(_) {
    if (_ === null || _ === 47 || _ === 62 || ke(_)) {
      let qt = _ === 47,
        Pt = a.toLowerCase();
      return !qt && !o && tb.includes(Pt)
        ? ((i = 1), n.interrupt ? e(_) : L(_))
        : uB.includes(a.toLowerCase())
        ? ((i = 6), qt ? (t.consume(_), y) : n.interrupt ? e(_) : L(_))
        : ((i = 7),
          n.interrupt && !n.parser.lazy[n.now().line] ? r(_) : o ? T(_) : b(_));
    }
    return _ === 45 || pr(_)
      ? (t.consume(_), (a += String.fromCharCode(_)), E)
      : r(_);
  }
  function y(_) {
    return _ === 62 ? (t.consume(_), n.interrupt ? e : L) : r(_);
  }
  function T(_) {
    return mt(_) ? (t.consume(_), T) : st(_);
  }
  function b(_) {
    return _ === 47
      ? (t.consume(_), st)
      : _ === 58 || _ === 95 || Ur(_)
      ? (t.consume(_), N)
      : mt(_)
      ? (t.consume(_), b)
      : st(_);
  }
  function N(_) {
    return _ === 45 || _ === 46 || _ === 58 || _ === 95 || pr(_)
      ? (t.consume(_), N)
      : I(_);
  }
  function I(_) {
    return _ === 61 ? (t.consume(_), A) : mt(_) ? (t.consume(_), I) : b(_);
  }
  function A(_) {
    return _ === null || _ === 60 || _ === 61 || _ === 62 || _ === 96
      ? r(_)
      : _ === 34 || _ === 39
      ? (t.consume(_), (l = _), O)
      : mt(_)
      ? (t.consume(_), A)
      : D(_);
  }
  function O(_) {
    return _ === l
      ? (t.consume(_), (l = null), J)
      : _ === null || Z(_)
      ? r(_)
      : (t.consume(_), O);
  }
  function D(_) {
    return _ === null ||
      _ === 34 ||
      _ === 39 ||
      _ === 47 ||
      _ === 60 ||
      _ === 61 ||
      _ === 62 ||
      _ === 96 ||
      ke(_)
      ? I(_)
      : (t.consume(_), D);
  }
  function J(_) {
    return _ === 47 || _ === 62 || mt(_) ? b(_) : r(_);
  }
  function st(_) {
    return _ === 62 ? (t.consume(_), R) : r(_);
  }
  function R(_) {
    return _ === null || Z(_) ? L(_) : mt(_) ? (t.consume(_), R) : r(_);
  }
  function L(_) {
    return _ === 45 && i === 2
      ? (t.consume(_), H)
      : _ === 60 && i === 1
      ? (t.consume(_), j)
      : _ === 62 && i === 4
      ? (t.consume(_), Et)
      : _ === 63 && i === 3
      ? (t.consume(_), x)
      : _ === 93 && i === 5
      ? (t.consume(_), ht)
      : Z(_) && (i === 6 || i === 7)
      ? (t.exit('htmlFlowData'), t.check(rQ, Xt, v)(_))
      : _ === null || Z(_)
      ? (t.exit('htmlFlowData'), v(_))
      : (t.consume(_), L);
  }
  function v(_) {
    return t.check(nQ, U, Xt)(_);
  }
  function U(_) {
    return t.enter('lineEnding'), t.consume(_), t.exit('lineEnding'), M;
  }
  function M(_) {
    return _ === null || Z(_) ? v(_) : (t.enter('htmlFlowData'), L(_));
  }
  function H(_) {
    return _ === 45 ? (t.consume(_), x) : L(_);
  }
  function j(_) {
    return _ === 47 ? (t.consume(_), (a = ''), it) : L(_);
  }
  function it(_) {
    if (_ === 62) {
      let qt = a.toLowerCase();
      return tb.includes(qt) ? (t.consume(_), Et) : L(_);
    }
    return Ur(_) && a.length < 8
      ? (t.consume(_), (a += String.fromCharCode(_)), it)
      : L(_);
  }
  function ht(_) {
    return _ === 93 ? (t.consume(_), x) : L(_);
  }
  function x(_) {
    return _ === 62
      ? (t.consume(_), Et)
      : _ === 45 && i === 2
      ? (t.consume(_), x)
      : L(_);
  }
  function Et(_) {
    return _ === null || Z(_)
      ? (t.exit('htmlFlowData'), Xt(_))
      : (t.consume(_), Et);
  }
  function Xt(_) {
    return t.exit('htmlFlow'), e(_);
  }
}
function aQ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return Z(a)
      ? (t.enter('lineEnding'), t.consume(a), t.exit('lineEnding'), o)
      : r(a);
  }
  function o(a) {
    return n.parser.lazy[n.now().line] ? r(a) : e(a);
  }
}
function sQ(t, e, r) {
  return n;
  function n(i) {
    return (
      t.enter('lineEnding'),
      t.consume(i),
      t.exit('lineEnding'),
      t.attempt(eo, e, r)
    );
  }
}
var eb,
  rQ,
  nQ,
  hB = f(() => {
    $t();
    fB();
    Mp();
    (eb = { name: 'htmlFlow', tokenize: oQ, resolveTo: iQ, concrete: !0 }),
      (rQ = { tokenize: sQ, partial: !0 }),
      (nQ = { tokenize: aQ, partial: !0 });
  });
function lQ(t, e, r) {
  let n = this,
    i,
    o,
    a;
  return s;
  function s(x) {
    return t.enter('htmlText'), t.enter('htmlTextData'), t.consume(x), l;
  }
  function l(x) {
    return x === 33
      ? (t.consume(x), c)
      : x === 47
      ? (t.consume(x), I)
      : x === 63
      ? (t.consume(x), b)
      : Ur(x)
      ? (t.consume(x), D)
      : r(x);
  }
  function c(x) {
    return x === 45
      ? (t.consume(x), u)
      : x === 91
      ? (t.consume(x), (o = 0), m)
      : Ur(x)
      ? (t.consume(x), T)
      : r(x);
  }
  function u(x) {
    return x === 45 ? (t.consume(x), d) : r(x);
  }
  function h(x) {
    return x === null
      ? r(x)
      : x === 45
      ? (t.consume(x), p)
      : Z(x)
      ? ((a = h), j(x))
      : (t.consume(x), h);
  }
  function p(x) {
    return x === 45 ? (t.consume(x), d) : h(x);
  }
  function d(x) {
    return x === 62 ? H(x) : x === 45 ? p(x) : h(x);
  }
  function m(x) {
    let Et = 'CDATA[';
    return x === Et.charCodeAt(o++)
      ? (t.consume(x), o === Et.length ? g : m)
      : r(x);
  }
  function g(x) {
    return x === null
      ? r(x)
      : x === 93
      ? (t.consume(x), E)
      : Z(x)
      ? ((a = g), j(x))
      : (t.consume(x), g);
  }
  function E(x) {
    return x === 93 ? (t.consume(x), y) : g(x);
  }
  function y(x) {
    return x === 62 ? H(x) : x === 93 ? (t.consume(x), y) : g(x);
  }
  function T(x) {
    return x === null || x === 62
      ? H(x)
      : Z(x)
      ? ((a = T), j(x))
      : (t.consume(x), T);
  }
  function b(x) {
    return x === null
      ? r(x)
      : x === 63
      ? (t.consume(x), N)
      : Z(x)
      ? ((a = b), j(x))
      : (t.consume(x), b);
  }
  function N(x) {
    return x === 62 ? H(x) : b(x);
  }
  function I(x) {
    return Ur(x) ? (t.consume(x), A) : r(x);
  }
  function A(x) {
    return x === 45 || pr(x) ? (t.consume(x), A) : O(x);
  }
  function O(x) {
    return Z(x) ? ((a = O), j(x)) : mt(x) ? (t.consume(x), O) : H(x);
  }
  function D(x) {
    return x === 45 || pr(x)
      ? (t.consume(x), D)
      : x === 47 || x === 62 || ke(x)
      ? J(x)
      : r(x);
  }
  function J(x) {
    return x === 47
      ? (t.consume(x), H)
      : x === 58 || x === 95 || Ur(x)
      ? (t.consume(x), st)
      : Z(x)
      ? ((a = J), j(x))
      : mt(x)
      ? (t.consume(x), J)
      : H(x);
  }
  function st(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || pr(x)
      ? (t.consume(x), st)
      : R(x);
  }
  function R(x) {
    return x === 61
      ? (t.consume(x), L)
      : Z(x)
      ? ((a = R), j(x))
      : mt(x)
      ? (t.consume(x), R)
      : J(x);
  }
  function L(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96
      ? r(x)
      : x === 34 || x === 39
      ? (t.consume(x), (i = x), v)
      : Z(x)
      ? ((a = L), j(x))
      : mt(x)
      ? (t.consume(x), L)
      : (t.consume(x), U);
  }
  function v(x) {
    return x === i
      ? (t.consume(x), (i = void 0), M)
      : x === null
      ? r(x)
      : Z(x)
      ? ((a = v), j(x))
      : (t.consume(x), v);
  }
  function U(x) {
    return x === null ||
      x === 34 ||
      x === 39 ||
      x === 60 ||
      x === 61 ||
      x === 96
      ? r(x)
      : x === 47 || x === 62 || ke(x)
      ? J(x)
      : (t.consume(x), U);
  }
  function M(x) {
    return x === 47 || x === 62 || ke(x) ? J(x) : r(x);
  }
  function H(x) {
    return x === 62
      ? (t.consume(x), t.exit('htmlTextData'), t.exit('htmlText'), e)
      : r(x);
  }
  function j(x) {
    return (
      t.exit('htmlTextData'),
      t.enter('lineEnding'),
      t.consume(x),
      t.exit('lineEnding'),
      it
    );
  }
  function it(x) {
    return mt(x)
      ? yt(
          t,
          ht,
          'linePrefix',
          n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
        )(x)
      : ht(x);
  }
  function ht(x) {
    return t.enter('htmlTextData'), a(x);
  }
}
var rb,
  pB = f(() => {
    Ge();
    $t();
    rb = { name: 'htmlText', tokenize: lQ };
  });
function hQ(t) {
  let e = -1;
  for (; ++e < t.length; ) {
    let r = t[e][1];
    (r.type === 'labelImage' ||
      r.type === 'labelLink' ||
      r.type === 'labelEnd') &&
      (t.splice(e + 1, r.type === 'labelImage' ? 4 : 2),
      (r.type = 'data'),
      e++);
  }
  return t;
}
function pQ(t, e) {
  let r = t.length,
    n = 0,
    i,
    o,
    a,
    s;
  for (; r--; )
    if (((i = t[r][1]), o)) {
      if (i.type === 'link' || (i.type === 'labelLink' && i._inactive)) break;
      t[r][0] === 'enter' && i.type === 'labelLink' && (i._inactive = !0);
    } else if (a) {
      if (
        t[r][0] === 'enter' &&
        (i.type === 'labelImage' || i.type === 'labelLink') &&
        !i._balanced &&
        ((o = r), i.type !== 'labelLink')
      ) {
        n = 2;
        break;
      }
    } else i.type === 'labelEnd' && (a = r);
  let l = {
      type: t[o][1].type === 'labelLink' ? 'link' : 'image',
      start: Object.assign({}, t[o][1].start),
      end: Object.assign({}, t[t.length - 1][1].end),
    },
    c = {
      type: 'label',
      start: Object.assign({}, t[o][1].start),
      end: Object.assign({}, t[a][1].end),
    },
    u = {
      type: 'labelText',
      start: Object.assign({}, t[o + n + 2][1].end),
      end: Object.assign({}, t[a - 2][1].start),
    };
  return (
    (s = [
      ['enter', l, e],
      ['enter', c, e],
    ]),
    (s = hr(s, t.slice(o + 1, o + n + 3))),
    (s = hr(s, [['enter', u, e]])),
    (s = hr(
      s,
      Ss(e.parser.constructs.insideSpan.null, t.slice(o + n + 4, a - 3), e)
    )),
    (s = hr(s, [['exit', u, e], t[a - 2], t[a - 1], ['exit', c, e]])),
    (s = hr(s, t.slice(a + 1))),
    (s = hr(s, [['exit', l, e]])),
    Ze(t, o, t.length, s),
    t
  );
}
function dQ(t, e, r) {
  let n = this,
    i = n.events.length,
    o,
    a;
  for (; i--; )
    if (
      (n.events[i][1].type === 'labelImage' ||
        n.events[i][1].type === 'labelLink') &&
      !n.events[i][1]._balanced
    ) {
      o = n.events[i][1];
      break;
    }
  return s;
  function s(p) {
    return o
      ? o._inactive
        ? h(p)
        : ((a = n.parser.defined.includes(
            mi(n.sliceSerialize({ start: o.end, end: n.now() }))
          )),
          t.enter('labelEnd'),
          t.enter('labelMarker'),
          t.consume(p),
          t.exit('labelMarker'),
          t.exit('labelEnd'),
          l)
      : r(p);
  }
  function l(p) {
    return p === 40
      ? t.attempt(cQ, u, a ? u : h)(p)
      : p === 91
      ? t.attempt(uQ, u, a ? c : h)(p)
      : a
      ? u(p)
      : h(p);
  }
  function c(p) {
    return t.attempt(fQ, u, h)(p);
  }
  function u(p) {
    return e(p);
  }
  function h(p) {
    return (o._balanced = !0), r(p);
  }
}
function mQ(t, e, r) {
  return n;
  function n(h) {
    return (
      t.enter('resource'),
      t.enter('resourceMarker'),
      t.consume(h),
      t.exit('resourceMarker'),
      i
    );
  }
  function i(h) {
    return ke(h) ? Qo(t, o)(h) : o(h);
  }
  function o(h) {
    return h === 41
      ? u(h)
      : Wp(
          t,
          a,
          s,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32
        )(h);
  }
  function a(h) {
    return ke(h) ? Qo(t, l)(h) : u(h);
  }
  function s(h) {
    return r(h);
  }
  function l(h) {
    return h === 34 || h === 39 || h === 40
      ? Hp(
          t,
          c,
          r,
          'resourceTitle',
          'resourceTitleMarker',
          'resourceTitleString'
        )(h)
      : u(h);
  }
  function c(h) {
    return ke(h) ? Qo(t, u)(h) : u(h);
  }
  function u(h) {
    return h === 41
      ? (t.enter('resourceMarker'),
        t.consume(h),
        t.exit('resourceMarker'),
        t.exit('resource'),
        e)
      : r(h);
  }
}
function gQ(t, e, r) {
  let n = this;
  return i;
  function i(s) {
    return qp.call(
      n,
      t,
      o,
      a,
      'reference',
      'referenceMarker',
      'referenceString'
    )(s);
  }
  function o(s) {
    return n.parser.defined.includes(
      mi(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))
    )
      ? e(s)
      : r(s);
  }
  function a(s) {
    return r(s);
  }
}
function xQ(t, e, r) {
  return n;
  function n(o) {
    return (
      t.enter('reference'),
      t.enter('referenceMarker'),
      t.consume(o),
      t.exit('referenceMarker'),
      i
    );
  }
  function i(o) {
    return o === 93
      ? (t.enter('referenceMarker'),
        t.consume(o),
        t.exit('referenceMarker'),
        t.exit('reference'),
        e)
      : r(o);
  }
}
var Jo,
  cQ,
  uQ,
  fQ,
  jp = f(() => {
    Y0();
    V0();
    X0();
    K0();
    $t();
    Ji();
    Gp();
    Fp();
    (Jo = { name: 'labelEnd', tokenize: dQ, resolveTo: pQ, resolveAll: hQ }),
      (cQ = { tokenize: mQ }),
      (uQ = { tokenize: gQ }),
      (fQ = { tokenize: xQ });
  });
function yQ(t, e, r) {
  let n = this;
  return i;
  function i(s) {
    return (
      t.enter('labelImage'),
      t.enter('labelImageMarker'),
      t.consume(s),
      t.exit('labelImageMarker'),
      o
    );
  }
  function o(s) {
    return s === 91
      ? (t.enter('labelMarker'),
        t.consume(s),
        t.exit('labelMarker'),
        t.exit('labelImage'),
        a)
      : r(s);
  }
  function a(s) {
    return s === 94 && '_hiddenFootnoteSupport' in n.parser.constructs
      ? r(s)
      : e(s);
  }
}
var nb,
  dB = f(() => {
    jp();
    nb = { name: 'labelStartImage', tokenize: yQ, resolveAll: Jo.resolveAll };
  });
function bQ(t, e, r) {
  let n = this;
  return i;
  function i(a) {
    return (
      t.enter('labelLink'),
      t.enter('labelMarker'),
      t.consume(a),
      t.exit('labelMarker'),
      t.exit('labelLink'),
      o
    );
  }
  function o(a) {
    return a === 94 && '_hiddenFootnoteSupport' in n.parser.constructs
      ? r(a)
      : e(a);
  }
}
var ib,
  mB = f(() => {
    jp();
    ib = { name: 'labelStartLink', tokenize: bQ, resolveAll: Jo.resolveAll };
  });
function _Q(t, e) {
  return r;
  function r(n) {
    return (
      t.enter('lineEnding'),
      t.consume(n),
      t.exit('lineEnding'),
      yt(t, e, 'linePrefix')
    );
  }
}
var Pc,
  gB = f(() => {
    Ge();
    Pc = { name: 'lineEnding', tokenize: _Q };
  });
function CQ(t, e, r) {
  let n = 0,
    i;
  return o;
  function o(c) {
    return t.enter('thematicBreak'), a(c);
  }
  function a(c) {
    return (i = c), s(c);
  }
  function s(c) {
    return c === i
      ? (t.enter('thematicBreakSequence'), l(c))
      : n >= 3 && (c === null || Z(c))
      ? (t.exit('thematicBreak'), e(c))
      : r(c);
  }
  function l(c) {
    return c === i
      ? (t.consume(c), n++, l)
      : (t.exit('thematicBreakSequence'),
        mt(c) ? yt(t, s, 'whitespace')(c) : s(c));
  }
}
var ta,
  ob = f(() => {
    Ge();
    $t();
    ta = { name: 'thematicBreak', tokenize: CQ };
  });
function EQ(t, e, r) {
  let n = this,
    i = n.events[n.events.length - 1],
    o =
      i && i[1].type === 'linePrefix'
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    a = 0;
  return s;
  function s(d) {
    let m =
      n.containerState.type ||
      (d === 42 || d === 43 || d === 45 ? 'listUnordered' : 'listOrdered');
    if (
      m === 'listUnordered'
        ? !n.containerState.marker || d === n.containerState.marker
        : Fc(d)
    ) {
      if (
        (n.containerState.type ||
          ((n.containerState.type = m), t.enter(m, { _container: !0 })),
        m === 'listUnordered')
      )
        return (
          t.enter('listItemPrefix'),
          d === 42 || d === 45 ? t.check(ta, r, c)(d) : c(d)
        );
      if (!n.interrupt || d === 49)
        return t.enter('listItemPrefix'), t.enter('listItemValue'), l(d);
    }
    return r(d);
  }
  function l(d) {
    return Fc(d) && ++a < 10
      ? (t.consume(d), l)
      : (!n.interrupt || a < 2) &&
        (n.containerState.marker
          ? d === n.containerState.marker
          : d === 41 || d === 46)
      ? (t.exit('listItemValue'), c(d))
      : r(d);
  }
  function c(d) {
    return (
      t.enter('listItemMarker'),
      t.consume(d),
      t.exit('listItemMarker'),
      (n.containerState.marker = n.containerState.marker || d),
      t.check(eo, n.interrupt ? r : u, t.attempt(TQ, p, h))
    );
  }
  function u(d) {
    return (n.containerState.initialBlankLine = !0), o++, p(d);
  }
  function h(d) {
    return mt(d)
      ? (t.enter('listItemPrefixWhitespace'),
        t.consume(d),
        t.exit('listItemPrefixWhitespace'),
        p)
      : r(d);
  }
  function p(d) {
    return (
      (n.containerState.size =
        o + n.sliceSerialize(t.exit('listItemPrefix'), !0).length),
      e(d)
    );
  }
}
function wQ(t, e, r) {
  let n = this;
  return (n.containerState._closeFlow = void 0), t.check(eo, i, o);
  function i(s) {
    return (
      (n.containerState.furtherBlankLines =
        n.containerState.furtherBlankLines ||
        n.containerState.initialBlankLine),
      yt(t, e, 'listItemIndent', n.containerState.size + 1)(s)
    );
  }
  function o(s) {
    return n.containerState.furtherBlankLines || !mt(s)
      ? ((n.containerState.furtherBlankLines = void 0),
        (n.containerState.initialBlankLine = void 0),
        a(s))
      : ((n.containerState.furtherBlankLines = void 0),
        (n.containerState.initialBlankLine = void 0),
        t.attempt(kQ, e, a)(s));
  }
  function a(s) {
    return (
      (n.containerState._closeFlow = !0),
      (n.interrupt = void 0),
      yt(
        t,
        t.attempt(rr, e, r),
        'linePrefix',
        n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
      )(s)
    );
  }
}
function SQ(t, e, r) {
  let n = this;
  return yt(t, i, 'listItemIndent', n.containerState.size + 1);
  function i(o) {
    let a = n.events[n.events.length - 1];
    return a &&
      a[1].type === 'listItemIndent' &&
      a[2].sliceSerialize(a[1], !0).length === n.containerState.size
      ? e(o)
      : r(o);
  }
}
function vQ(t) {
  t.exit(this.containerState.type);
}
function AQ(t, e, r) {
  let n = this;
  return yt(
    t,
    i,
    'listItemPrefixWhitespace',
    n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4 + 1
  );
  function i(o) {
    let a = n.events[n.events.length - 1];
    return !mt(o) && a && a[1].type === 'listItemPrefixWhitespace'
      ? e(o)
      : r(o);
  }
}
var rr,
  TQ,
  kQ,
  xB = f(() => {
    Ge();
    $t();
    Mp();
    ob();
    (rr = {
      name: 'list',
      tokenize: EQ,
      continuation: { tokenize: wQ },
      exit: vQ,
    }),
      (TQ = { tokenize: AQ, partial: !0 }),
      (kQ = { tokenize: SQ, partial: !0 });
  });
function LQ(t, e) {
  let r = t.length,
    n,
    i,
    o;
  for (; r--; )
    if (t[r][0] === 'enter') {
      if (t[r][1].type === 'content') {
        n = r;
        break;
      }
      t[r][1].type === 'paragraph' && (i = r);
    } else
      t[r][1].type === 'content' && t.splice(r, 1),
        !o && t[r][1].type === 'definition' && (o = r);
  let a = {
    type: 'setextHeading',
    start: Object.assign({}, t[i][1].start),
    end: Object.assign({}, t[t.length - 1][1].end),
  };
  return (
    (t[i][1].type = 'setextHeadingText'),
    o
      ? (t.splice(i, 0, ['enter', a, e]),
        t.splice(o + 1, 0, ['exit', t[n][1], e]),
        (t[n][1].end = Object.assign({}, t[o][1].end)))
      : (t[n][1] = a),
    t.push(['exit', a, e]),
    t
  );
}
function IQ(t, e, r) {
  let n = this,
    i;
  return o;
  function o(c) {
    let u = n.events.length,
      h;
    for (; u--; )
      if (
        n.events[u][1].type !== 'lineEnding' &&
        n.events[u][1].type !== 'linePrefix' &&
        n.events[u][1].type !== 'content'
      ) {
        h = n.events[u][1].type === 'paragraph';
        break;
      }
    return !n.parser.lazy[n.now().line] && (n.interrupt || h)
      ? (t.enter('setextHeadingLine'), (i = c), a(c))
      : r(c);
  }
  function a(c) {
    return t.enter('setextHeadingLineSequence'), s(c);
  }
  function s(c) {
    return c === i
      ? (t.consume(c), s)
      : (t.exit('setextHeadingLineSequence'),
        mt(c) ? yt(t, l, 'lineSuffix')(c) : l(c));
  }
  function l(c) {
    return c === null || Z(c) ? (t.exit('setextHeadingLine'), e(c)) : r(c);
  }
}
var Yp,
  yB = f(() => {
    Ge();
    $t();
    Yp = { name: 'setextUnderline', tokenize: IQ, resolveTo: LQ };
  });
var ab = f(() => {
  KM();
  ZM();
  Mp();
  QM();
  JM();
  eB();
  nB();
  iB();
  oB();
  aB();
  sB();
  lB();
  cB();
  hB();
  pB();
  jp();
  dB();
  mB();
  gB();
  xB();
  yB();
  ob();
});
function OQ(t) {
  let e = this,
    r = t.attempt(
      eo,
      n,
      t.attempt(
        this.parser.constructs.flowInitial,
        i,
        yt(
          t,
          t.attempt(this.parser.constructs.flow, i, t.attempt(j0, i)),
          'linePrefix'
        )
      )
    );
  return r;
  function n(o) {
    if (o === null) {
      t.consume(o);
      return;
    }
    return (
      t.enter('lineEndingBlank'),
      t.consume(o),
      t.exit('lineEndingBlank'),
      (e.currentConstruct = void 0),
      r
    );
  }
  function i(o) {
    if (o === null) {
      t.consume(o);
      return;
    }
    return (
      t.enter('lineEnding'),
      t.consume(o),
      t.exit('lineEnding'),
      (e.currentConstruct = void 0),
      r
    );
  }
}
var bB,
  _B = f(() => {
    ab();
    Ge();
    bB = { tokenize: OQ };
  });
function EB(t) {
  return { tokenize: e, resolveAll: wB(t === 'text' ? RQ : void 0) };
  function e(r) {
    let n = this,
      i = this.parser.constructs[t],
      o = r.attempt(i, a, s);
    return a;
    function a(u) {
      return c(u) ? o(u) : s(u);
    }
    function s(u) {
      if (u === null) {
        r.consume(u);
        return;
      }
      return r.enter('data'), r.consume(u), l;
    }
    function l(u) {
      return c(u) ? (r.exit('data'), o(u)) : (r.consume(u), l);
    }
    function c(u) {
      if (u === null) return !0;
      let h = i[u],
        p = -1;
      if (h)
        for (; ++p < h.length; ) {
          let d = h[p];
          if (!d.previous || d.previous.call(n, n.previous)) return !0;
        }
      return !1;
    }
  }
}
function wB(t) {
  return e;
  function e(r, n) {
    let i = -1,
      o;
    for (; ++i <= r.length; )
      o === void 0
        ? r[i] && r[i][1].type === 'data' && ((o = i), i++)
        : (!r[i] || r[i][1].type !== 'data') &&
          (i !== o + 2 &&
            ((r[o][1].end = r[i - 1][1].end),
            r.splice(o + 2, i - o - 2),
            (i = o + 2)),
          (o = void 0));
    return t ? t(r, n) : r;
  }
}
function RQ(t, e) {
  let r = 0;
  for (; ++r <= t.length; )
    if (
      (r === t.length || t[r][1].type === 'lineEnding') &&
      t[r - 1][1].type === 'data'
    ) {
      let n = t[r - 1][1],
        i = e.sliceStream(n),
        o = i.length,
        a = -1,
        s = 0,
        l;
      for (; o--; ) {
        let c = i[o];
        if (typeof c == 'string') {
          for (a = c.length; c.charCodeAt(a - 1) === 32; ) s++, a--;
          if (a) break;
          a = -1;
        } else if (c === -2) (l = !0), s++;
        else if (c !== -1) {
          o++;
          break;
        }
      }
      if (s) {
        let c = {
          type:
            r === t.length || l || s < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            line: n.end.line,
            column: n.end.column - s,
            offset: n.end.offset - s,
            _index: n.start._index + o,
            _bufferIndex: o ? a : n.start._bufferIndex + a,
          },
          end: Object.assign({}, n.end),
        };
        (n.end = Object.assign({}, c.start)),
          n.start.offset === n.end.offset
            ? Object.assign(n, c)
            : (t.splice(r, 0, ['enter', c, e], ['exit', c, e]), (r += 2));
      }
      r++;
    }
  return t;
}
var CB,
  TB,
  kB,
  sb = f(() => {
    (CB = { resolveAll: wB() }), (TB = EB('string')), (kB = EB('text'));
  });
function SB(t, e, r) {
  let n = Object.assign(
      r ? Object.assign({}, r) : { line: 1, column: 1, offset: 0 },
      { _index: 0, _bufferIndex: -1 }
    ),
    i = {},
    o = [],
    a = [],
    s = [],
    l = !0,
    c = {
      consume: N,
      enter: I,
      exit: A,
      attempt: J(O),
      check: J(D),
      interrupt: J(D, { interrupt: !0 }),
    },
    u = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser: t,
      sliceStream: g,
      sliceSerialize: m,
      now: E,
      defineSkip: y,
      write: d,
    },
    h = e.tokenize.call(u, c),
    p;
  return e.resolveAll && o.push(e), u;
  function d(v) {
    return (
      (a = hr(a, v)),
      T(),
      a[a.length - 1] !== null
        ? []
        : (st(e, 0), (u.events = Ss(o, u.events, u)), u.events)
    );
  }
  function m(v, U) {
    return FQ(g(v), U);
  }
  function g(v) {
    return NQ(a, v);
  }
  function E() {
    let { line: v, column: U, offset: M, _index: H, _bufferIndex: j } = n;
    return { line: v, column: U, offset: M, _index: H, _bufferIndex: j };
  }
  function y(v) {
    (i[v.line] = v.column), L();
  }
  function T() {
    let v;
    for (; n._index < a.length; ) {
      let U = a[n._index];
      if (typeof U == 'string')
        for (
          v = n._index, n._bufferIndex < 0 && (n._bufferIndex = 0);
          n._index === v && n._bufferIndex < U.length;

        )
          b(U.charCodeAt(n._bufferIndex));
      else b(U);
    }
  }
  function b(v) {
    (l = void 0), (p = v), (h = h(v));
  }
  function N(v) {
    Z(v)
      ? (n.line++, (n.column = 1), (n.offset += v === -3 ? 2 : 1), L())
      : v !== -1 && (n.column++, n.offset++),
      n._bufferIndex < 0
        ? n._index++
        : (n._bufferIndex++,
          n._bufferIndex === a[n._index].length &&
            ((n._bufferIndex = -1), n._index++)),
      (u.previous = v),
      (l = !0);
  }
  function I(v, U) {
    let M = U || {};
    return (
      (M.type = v),
      (M.start = E()),
      u.events.push(['enter', M, u]),
      s.push(M),
      M
    );
  }
  function A(v) {
    let U = s.pop();
    return (U.end = E()), u.events.push(['exit', U, u]), U;
  }
  function O(v, U) {
    st(v, U.from);
  }
  function D(v, U) {
    U.restore();
  }
  function J(v, U) {
    return M;
    function M(H, j, it) {
      let ht, x, Et, Xt;
      return Array.isArray(H) ? qt(H) : 'tokenize' in H ? qt([H]) : _(H);
      function _(gt) {
        return G;
        function G(X) {
          let ct = X !== null && gt[X],
            P = X !== null && gt.null,
            Lt = [
              ...(Array.isArray(ct) ? ct : ct ? [ct] : []),
              ...(Array.isArray(P) ? P : P ? [P] : []),
            ];
          return qt(Lt)(X);
        }
      }
      function qt(gt) {
        return (ht = gt), (x = 0), gt.length === 0 ? it : Pt(gt[x]);
      }
      function Pt(gt) {
        return G;
        function G(X) {
          return (
            (Xt = R()),
            (Et = gt),
            gt.partial || (u.currentConstruct = gt),
            gt.name && u.parser.constructs.disable.null.includes(gt.name)
              ? bt(X)
              : gt.tokenize.call(
                  U ? Object.assign(Object.create(u), U) : u,
                  c,
                  Fe,
                  bt
                )(X)
          );
        }
      }
      function Fe(gt) {
        return (l = !0), v(Et, Xt), j;
      }
      function bt(gt) {
        return (l = !0), Xt.restore(), ++x < ht.length ? Pt(ht[x]) : it;
      }
    }
  }
  function st(v, U) {
    v.resolveAll && !o.includes(v) && o.push(v),
      v.resolve &&
        Ze(u.events, U, u.events.length - U, v.resolve(u.events.slice(U), u)),
      v.resolveTo && (u.events = v.resolveTo(u.events, u));
  }
  function R() {
    let v = E(),
      U = u.previous,
      M = u.currentConstruct,
      H = u.events.length,
      j = Array.from(s);
    return { restore: it, from: H };
    function it() {
      (n = v),
        (u.previous = U),
        (u.currentConstruct = M),
        (u.events.length = H),
        (s = j),
        L();
    }
  }
  function L() {
    n.line in i &&
      n.column < 2 &&
      ((n.column = i[n.line]), (n.offset += i[n.line] - 1));
  }
}
function NQ(t, e) {
  let r = e.start._index,
    n = e.start._bufferIndex,
    i = e.end._index,
    o = e.end._bufferIndex,
    a;
  if (r === i) a = [t[r].slice(n, o)];
  else {
    if (((a = t.slice(r, i)), n > -1)) {
      let s = a[0];
      typeof s == 'string' ? (a[0] = s.slice(n)) : a.shift();
    }
    o > 0 && a.push(t[i].slice(0, o));
  }
  return a;
}
function FQ(t, e) {
  let r = -1,
    n = [],
    i;
  for (; ++r < t.length; ) {
    let o = t[r],
      a;
    if (typeof o == 'string') a = o;
    else
      switch (o) {
        case -5: {
          a = '\r';
          break;
        }
        case -4: {
          a = `
`;
          break;
        }
        case -3: {
          a = `\r
`;
          break;
        }
        case -2: {
          a = e ? ' ' : '	';
          break;
        }
        case -1: {
          if (!e && i) continue;
          a = ' ';
          break;
        }
        default:
          a = String.fromCharCode(o);
      }
    (i = o === -2), n.push(a);
  }
  return n.join('');
}
var vB = f(() => {
  $t();
  Ji();
  Fp();
});
var lb = {};
Ed(lb, {
  attentionMarkers: () => WQ,
  contentInitial: () => BQ,
  disable: () => qQ,
  document: () => MQ,
  flow: () => DQ,
  flowInitial: () => PQ,
  insideSpan: () => $Q,
  string: () => UQ,
  text: () => zQ,
});
var MQ,
  BQ,
  PQ,
  DQ,
  UQ,
  zQ,
  $Q,
  WQ,
  qQ,
  AB = f(() => {
    ab();
    sb();
    (MQ = {
      42: rr,
      43: rr,
      45: rr,
      48: rr,
      49: rr,
      50: rr,
      51: rr,
      52: rr,
      53: rr,
      54: rr,
      55: rr,
      56: rr,
      57: rr,
      62: Bp,
    }),
      (BQ = { 91: Z0 }),
      (PQ = { [-2]: Bc, [-1]: Bc, 32: Bc }),
      (DQ = {
        35: J0,
        42: ta,
        45: [Yp, ta],
        60: eb,
        61: Yp,
        95: ta,
        96: zp,
        126: zp,
      }),
      (UQ = { 38: Up, 92: Pp }),
      (zQ = {
        [-5]: Pc,
        [-4]: Pc,
        [-3]: Pc,
        33: nb,
        38: Up,
        42: Mc,
        60: [q0, rb],
        91: ib,
        92: [Q0, Pp],
        93: Jo,
        95: Mc,
        96: H0,
      }),
      ($Q = { null: [Mc, CB] }),
      (WQ = { null: [42, 95] }),
      (qQ = { null: [] });
  });
function LB(t) {
  let r = FM([lb, ...((t || {}).extensions || [])]),
    n = {
      defined: [],
      lazy: {},
      constructs: r,
      content: i(qM),
      document: i(jM),
      flow: i(bB),
      string: i(TB),
      text: i(kB),
    };
  return n;
  function i(o) {
    return a;
    function a(s) {
      return SB(n, o, s);
    }
  }
}
var IB = f(() => {
  MM();
  HM();
  YM();
  _B();
  sb();
  vB();
  AB();
});
function RB() {
  let t = 1,
    e = '',
    r = !0,
    n;
  return i;
  function i(o, a, s) {
    let l = [],
      c,
      u,
      h,
      p,
      d;
    for (
      o = e + o.toString(a),
        h = 0,
        e = '',
        r && (o.charCodeAt(0) === 65279 && h++, (r = void 0));
      h < o.length;

    ) {
      if (
        ((OB.lastIndex = h),
        (c = OB.exec(o)),
        (p = c && c.index !== void 0 ? c.index : o.length),
        (d = o.charCodeAt(p)),
        !c)
      ) {
        e = o.slice(h);
        break;
      }
      if (d === 10 && h === p && n) l.push(-3), (n = void 0);
      else
        switch (
          (n && (l.push(-5), (n = void 0)),
          h < p && (l.push(o.slice(h, p)), (t += p - h)),
          d)
        ) {
          case 0: {
            l.push(65533), t++;
            break;
          }
          case 9: {
            for (u = Math.ceil(t / 4) * 4, l.push(-2); t++ < u; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), (t = 1);
            break;
          }
          default:
            (n = !0), (t = 1);
        }
      h = p + 1;
    }
    return s && (n && l.push(-5), e && l.push(e), l.push(null)), l;
  }
}
var OB,
  NB = f(() => {
    OB = /[\0\t\n\r]/g;
  });
function FB(t) {
  for (; !$p(t); );
  return t;
}
var MB = f(() => {
  G0();
});
function Vp(t, e) {
  let r = Number.parseInt(t, e);
  return r < 9 ||
    r === 11 ||
    (r > 13 && r < 32) ||
    (r > 126 && r < 160) ||
    (r > 55295 && r < 57344) ||
    (r > 64975 && r < 65008) ||
    (r & 65535) === 65535 ||
    (r & 65535) === 65534 ||
    r > 1114111
    ? '\uFFFD'
    : String.fromCharCode(r);
}
var cb = f(() => {});
function BB(t) {
  return t.replace(HQ, GQ);
}
function GQ(t, e, r) {
  if (e) return e;
  if (r.charCodeAt(0) === 35) {
    let i = r.charCodeAt(1),
      o = i === 120 || i === 88;
    return Vp(r.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return vs(r) || t;
}
var HQ,
  PB = f(() => {
    Dp();
    cb();
    HQ = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  });
function As(t) {
  return !t || typeof t != 'object'
    ? ''
    : 'position' in t || 'type' in t
    ? DB(t.position)
    : 'start' in t || 'end' in t
    ? DB(t)
    : 'line' in t || 'column' in t
    ? ub(t)
    : '';
}
function ub(t) {
  return UB(t && t.line) + ':' + UB(t && t.column);
}
function DB(t) {
  return ub(t && t.start) + '-' + ub(t && t.end);
}
function UB(t) {
  return t && typeof t == 'number' ? t : 1;
}
var zB = f(() => {});
var $B = f(() => {
  zB();
});
function jQ(t) {
  let e = {
    transforms: [],
    canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
    enter: {
      autolink: s(dr),
      autolinkProtocol: R,
      autolinkEmail: R,
      atxHeading: s(V),
      blockQuote: s(ct),
      characterEscape: R,
      characterReference: R,
      codeFenced: s(P),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: s(P, l),
      codeText: s(Lt, l),
      codeTextData: R,
      data: R,
      codeFlowValue: R,
      definition: s(Ct),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: s(pt),
      hardBreakEscape: s(kt),
      hardBreakTrailing: s(kt),
      htmlFlow: s(wt, l),
      htmlFlowData: R,
      htmlText: s(wt, l),
      htmlTextData: R,
      image: s(Ee),
      label: l,
      link: s(dr),
      listItem: s(Rs),
      listItemValue: m,
      listOrdered: s(Or, d),
      listUnordered: s(Or),
      paragraph: s(Dc),
      reference: Pt,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: s(V),
      strong: s(Ns),
      thematicBreak: s(ad),
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: O,
      autolink: u(),
      autolinkEmail: X,
      autolinkProtocol: G,
      blockQuote: u(),
      characterEscapeValue: L,
      characterReferenceMarkerHexadecimal: bt,
      characterReferenceMarkerNumeric: bt,
      characterReferenceValue: gt,
      codeFenced: u(T),
      codeFencedFence: y,
      codeFencedFenceInfo: g,
      codeFencedFenceMeta: E,
      codeFlowValue: L,
      codeIndented: u(b),
      codeText: u(j),
      codeTextData: L,
      data: L,
      definition: u(),
      definitionDestinationString: A,
      definitionLabelString: N,
      definitionTitleString: I,
      emphasis: u(),
      hardBreakEscape: u(U),
      hardBreakTrailing: u(U),
      htmlFlow: u(M),
      htmlFlowData: L,
      htmlText: u(H),
      htmlTextData: L,
      image: u(ht),
      label: Et,
      labelText: x,
      lineEnding: v,
      link: u(it),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: Fe,
      resourceDestinationString: Xt,
      resourceTitleString: _,
      resource: qt,
      setextHeading: u(st),
      setextHeadingLineSequence: J,
      setextHeadingText: D,
      strong: u(),
      thematicBreak: u(),
    },
  };
  HB(e, (t || {}).mdastExtensions || []);
  let r = {};
  return n;
  function n(F) {
    let W = { type: 'root', children: [] },
      lt = {
        stack: [W],
        tokenStack: [],
        config: e,
        enter: c,
        exit: h,
        buffer: l,
        resume: p,
        setData: o,
        getData: a,
      },
      It = [],
      Ft = -1;
    for (; ++Ft < F.length; )
      if (F[Ft][1].type === 'listOrdered' || F[Ft][1].type === 'listUnordered')
        if (F[Ft][0] === 'enter') It.push(Ft);
        else {
          let Rr = It.pop();
          Ft = i(F, Rr, Ft);
        }
    for (Ft = -1; ++Ft < F.length; ) {
      let Rr = e[F[Ft][0]];
      qB.call(Rr, F[Ft][1].type) &&
        Rr[F[Ft][1].type].call(
          Object.assign({ sliceSerialize: F[Ft][2].sliceSerialize }, lt),
          F[Ft][1]
        );
    }
    if (lt.tokenStack.length > 0) {
      let Rr = lt.tokenStack[lt.tokenStack.length - 1];
      (Rr[1] || WB).call(lt, void 0, Rr[0]);
    }
    for (
      W.position = {
        start: ro(
          F.length > 0 ? F[0][1].start : { line: 1, column: 1, offset: 0 }
        ),
        end: ro(
          F.length > 0
            ? F[F.length - 2][1].end
            : { line: 1, column: 1, offset: 0 }
        ),
      },
        Ft = -1;
      ++Ft < e.transforms.length;

    )
      W = e.transforms[Ft](W) || W;
    return W;
  }
  function i(F, W, lt) {
    let It = W - 1,
      Ft = -1,
      Rr = !1,
      $r,
      Kt,
      ln,
      Hn;
    for (; ++It <= lt; ) {
      let se = F[It];
      if (
        (se[1].type === 'listUnordered' ||
        se[1].type === 'listOrdered' ||
        se[1].type === 'blockQuote'
          ? (se[0] === 'enter' ? Ft++ : Ft--, (Hn = void 0))
          : se[1].type === 'lineEndingBlank'
          ? se[0] === 'enter' &&
            ($r && !Hn && !Ft && !ln && (ln = It), (Hn = void 0))
          : se[1].type === 'linePrefix' ||
            se[1].type === 'listItemValue' ||
            se[1].type === 'listItemMarker' ||
            se[1].type === 'listItemPrefix' ||
            se[1].type === 'listItemPrefixWhitespace' ||
            (Hn = void 0),
        (!Ft && se[0] === 'enter' && se[1].type === 'listItemPrefix') ||
          (Ft === -1 &&
            se[0] === 'exit' &&
            (se[1].type === 'listUnordered' || se[1].type === 'listOrdered')))
      ) {
        if ($r) {
          let Fs = It;
          for (Kt = void 0; Fs--; ) {
            let cn = F[Fs];
            if (
              cn[1].type === 'lineEnding' ||
              cn[1].type === 'lineEndingBlank'
            ) {
              if (cn[0] === 'exit') continue;
              Kt && ((F[Kt][1].type = 'lineEndingBlank'), (Rr = !0)),
                (cn[1].type = 'lineEnding'),
                (Kt = Fs);
            } else if (
              !(
                cn[1].type === 'linePrefix' ||
                cn[1].type === 'blockQuotePrefix' ||
                cn[1].type === 'blockQuotePrefixWhitespace' ||
                cn[1].type === 'blockQuoteMarker' ||
                cn[1].type === 'listItemIndent'
              )
            )
              break;
          }
          ln && (!Kt || ln < Kt) && ($r._spread = !0),
            ($r.end = Object.assign({}, Kt ? F[Kt][1].start : se[1].end)),
            F.splice(Kt || It, 0, ['exit', $r, se[2]]),
            It++,
            lt++;
        }
        se[1].type === 'listItemPrefix' &&
          (($r = {
            type: 'listItem',
            _spread: !1,
            start: Object.assign({}, se[1].start),
          }),
          F.splice(It, 0, ['enter', $r, se[2]]),
          It++,
          lt++,
          (ln = void 0),
          (Hn = !0));
      }
    }
    return (F[W][1]._spread = Rr), lt;
  }
  function o(F, W) {
    r[F] = W;
  }
  function a(F) {
    return r[F];
  }
  function s(F, W) {
    return lt;
    function lt(It) {
      c.call(this, F(It), It), W && W.call(this, It);
    }
  }
  function l() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function c(F, W, lt) {
    return (
      this.stack[this.stack.length - 1].children.push(F),
      this.stack.push(F),
      this.tokenStack.push([W, lt]),
      (F.position = { start: ro(W.start) }),
      F
    );
  }
  function u(F) {
    return W;
    function W(lt) {
      F && F.call(this, lt), h.call(this, lt);
    }
  }
  function h(F, W) {
    let lt = this.stack.pop(),
      It = this.tokenStack.pop();
    if (It)
      It[0].type !== F.type &&
        (W ? W.call(this, F, It[0]) : (It[1] || WB).call(this, F, It[0]));
    else
      throw new Error(
        'Cannot close `' +
          F.type +
          '` (' +
          As({ start: F.start, end: F.end }) +
          '): it\u2019s not open'
      );
    return (lt.position.end = ro(F.end)), lt;
  }
  function p() {
    return $0(this.stack.pop());
  }
  function d() {
    o('expectingFirstListItemValue', !0);
  }
  function m(F) {
    if (a('expectingFirstListItemValue')) {
      let W = this.stack[this.stack.length - 2];
      (W.start = Number.parseInt(this.sliceSerialize(F), 10)),
        o('expectingFirstListItemValue');
    }
  }
  function g() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.lang = F;
  }
  function E() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.meta = F;
  }
  function y() {
    a('flowCodeInside') || (this.buffer(), o('flowCodeInside', !0));
  }
  function T() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    (W.value = F.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')), o('flowCodeInside');
  }
  function b() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = F.replace(/(\r?\n|\r)$/g, '');
  }
  function N(F) {
    let W = this.resume(),
      lt = this.stack[this.stack.length - 1];
    (lt.label = W), (lt.identifier = mi(this.sliceSerialize(F)).toLowerCase());
  }
  function I() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.title = F;
  }
  function A() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.url = F;
  }
  function O(F) {
    let W = this.stack[this.stack.length - 1];
    if (!W.depth) {
      let lt = this.sliceSerialize(F).length;
      W.depth = lt;
    }
  }
  function D() {
    o('setextHeadingSlurpLineEnding', !0);
  }
  function J(F) {
    let W = this.stack[this.stack.length - 1];
    W.depth = this.sliceSerialize(F).charCodeAt(0) === 61 ? 1 : 2;
  }
  function st() {
    o('setextHeadingSlurpLineEnding');
  }
  function R(F) {
    let W = this.stack[this.stack.length - 1],
      lt = W.children[W.children.length - 1];
    (!lt || lt.type !== 'text') &&
      ((lt = od()),
      (lt.position = { start: ro(F.start) }),
      W.children.push(lt)),
      this.stack.push(lt);
  }
  function L(F) {
    let W = this.stack.pop();
    (W.value += this.sliceSerialize(F)), (W.position.end = ro(F.end));
  }
  function v(F) {
    let W = this.stack[this.stack.length - 1];
    if (a('atHardBreak')) {
      let lt = W.children[W.children.length - 1];
      (lt.position.end = ro(F.end)), o('atHardBreak');
      return;
    }
    !a('setextHeadingSlurpLineEnding') &&
      e.canContainEols.includes(W.type) &&
      (R.call(this, F), L.call(this, F));
  }
  function U() {
    o('atHardBreak', !0);
  }
  function M() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = F;
  }
  function H() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = F;
  }
  function j() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.value = F;
  }
  function it() {
    let F = this.stack[this.stack.length - 1];
    if (a('inReference')) {
      let W = a('referenceType') || 'shortcut';
      (F.type += 'Reference'),
        (F.referenceType = W),
        delete F.url,
        delete F.title;
    } else delete F.identifier, delete F.label;
    o('referenceType');
  }
  function ht() {
    let F = this.stack[this.stack.length - 1];
    if (a('inReference')) {
      let W = a('referenceType') || 'shortcut';
      (F.type += 'Reference'),
        (F.referenceType = W),
        delete F.url,
        delete F.title;
    } else delete F.identifier, delete F.label;
    o('referenceType');
  }
  function x(F) {
    let W = this.sliceSerialize(F),
      lt = this.stack[this.stack.length - 2];
    (lt.label = BB(W)), (lt.identifier = mi(W).toLowerCase());
  }
  function Et() {
    let F = this.stack[this.stack.length - 1],
      W = this.resume(),
      lt = this.stack[this.stack.length - 1];
    if ((o('inReference', !0), lt.type === 'link')) {
      let It = F.children;
      lt.children = It;
    } else lt.alt = W;
  }
  function Xt() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.url = F;
  }
  function _() {
    let F = this.resume(),
      W = this.stack[this.stack.length - 1];
    W.title = F;
  }
  function qt() {
    o('inReference');
  }
  function Pt() {
    o('referenceType', 'collapsed');
  }
  function Fe(F) {
    let W = this.resume(),
      lt = this.stack[this.stack.length - 1];
    (lt.label = W),
      (lt.identifier = mi(this.sliceSerialize(F)).toLowerCase()),
      o('referenceType', 'full');
  }
  function bt(F) {
    o('characterReferenceType', F.type);
  }
  function gt(F) {
    let W = this.sliceSerialize(F),
      lt = a('characterReferenceType'),
      It;
    lt
      ? ((It = Vp(W, lt === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        o('characterReferenceType'))
      : (It = vs(W));
    let Ft = this.stack.pop();
    (Ft.value += It), (Ft.position.end = ro(F.end));
  }
  function G(F) {
    L.call(this, F);
    let W = this.stack[this.stack.length - 1];
    W.url = this.sliceSerialize(F);
  }
  function X(F) {
    L.call(this, F);
    let W = this.stack[this.stack.length - 1];
    W.url = 'mailto:' + this.sliceSerialize(F);
  }
  function ct() {
    return { type: 'blockquote', children: [] };
  }
  function P() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function Lt() {
    return { type: 'inlineCode', value: '' };
  }
  function Ct() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: '',
    };
  }
  function pt() {
    return { type: 'emphasis', children: [] };
  }
  function V() {
    return { type: 'heading', depth: void 0, children: [] };
  }
  function kt() {
    return { type: 'break' };
  }
  function wt() {
    return { type: 'html', value: '' };
  }
  function Ee() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function dr() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function Or(F) {
    return {
      type: 'list',
      ordered: F.type === 'listOrdered',
      start: null,
      spread: F._spread,
      children: [],
    };
  }
  function Rs(F) {
    return { type: 'listItem', spread: F._spread, checked: null, children: [] };
  }
  function Dc() {
    return { type: 'paragraph', children: [] };
  }
  function Ns() {
    return { type: 'strong', children: [] };
  }
  function od() {
    return { type: 'text', value: '' };
  }
  function ad() {
    return { type: 'thematicBreak' };
  }
}
function ro(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function HB(t, e) {
  let r = -1;
  for (; ++r < e.length; ) {
    let n = e[r];
    Array.isArray(n) ? HB(t, n) : YQ(t, n);
  }
}
function YQ(t, e) {
  let r;
  for (r in e)
    if (qB.call(e, r)) {
      if (r === 'canContainEols') {
        let n = e[r];
        n && t[r].push(...n);
      } else if (r === 'transforms') {
        let n = e[r];
        n && t[r].push(...n);
      } else if (r === 'enter' || r === 'exit') {
        let n = e[r];
        n && Object.assign(t[r], n);
      }
    }
}
function WB(t, e) {
  throw t
    ? new Error(
        'Cannot close `' +
          t.type +
          '` (' +
          As({ start: t.start, end: t.end }) +
          '): a different token (`' +
          e.type +
          '`, ' +
          As({ start: e.start, end: e.end }) +
          ') is open'
      )
    : new Error(
        'Cannot close document, a token (`' +
          e.type +
          '`, ' +
          As({ start: e.start, end: e.end }) +
          ') is still open'
      );
}
var qB,
  Xp,
  GB = f(() => {
    RM();
    IB();
    NB();
    MB();
    cb();
    PB();
    Gp();
    Dp();
    $B();
    (qB = {}.hasOwnProperty),
      (Xp = function (t, e, r) {
        return (
          typeof e != 'string' && ((r = e), (e = void 0)),
          jQ(r)(FB(LB(r).document().write(RB()(t, e, !0))))
        );
      });
  });
var jB = f(() => {
  GB();
});
function YB(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  var n = Array.from(typeof t == 'string' ? [t] : t);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, '');
  var i = n.reduce(function (s, l) {
    var c = l.match(/\n([\t ]+|(?!\s).)/g);
    return c
      ? s.concat(
          c.map(function (u) {
            var h, p;
            return (p =
              (h = u.match(/[\t ]/g)) === null || h === void 0
                ? void 0
                : h.length) !== null && p !== void 0
              ? p
              : 0;
          })
        )
      : s;
  }, []);
  if (i.length) {
    var o = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, i) +
        '}',
      'g'
    );
    n = n.map(function (s) {
      return s.replace(
        o,
        `
`
      );
    });
  }
  n[0] = n[0].replace(/^\r?\n/, '');
  var a = n[0];
  return (
    e.forEach(function (s, l) {
      var c = a.match(/(?:^|\n)( *)$/),
        u = c ? c[1] : '',
        h = s;
      typeof s == 'string' &&
        s.includes(`
`) &&
        (h = String(s)
          .split(
            `
`
          )
          .map(function (p, d) {
            return d === 0 ? p : '' + u + p;
          }).join(`
`)),
        (a += h + n[l + 1]);
    }),
    a
  );
}
var VB = f(() => {});
function VQ(t) {
  let e = t.replace(
    /\n{2,}/g,
    `
`
  );
  return YB(e);
}
function XB(t) {
  let e = VQ(t),
    { children: r } = Xp(e),
    n = [[]],
    i = 0;
  function o(a, s = 'normal') {
    a.type === 'text'
      ? a.value
          .split(
            `
`
          )
          .forEach((c, u) => {
            u !== 0 && (i++, n.push([])),
              c.split(' ').forEach((h) => {
                h && n[i].push({ content: h, type: s });
              });
          })
      : (a.type === 'strong' || a.type === 'emphasis') &&
        a.children.forEach((l) => {
          o(l, a.type);
        });
  }
  return (
    r.forEach((a) => {
      a.type === 'paragraph' &&
        a.children.forEach((s) => {
          o(s);
        });
    }),
    n
  );
}
function KB(t) {
  let { children: e } = Xp(t);
  function r(n) {
    return n.type === 'text'
      ? n.value.replace(/\n/g, '<br/>')
      : n.type === 'strong'
      ? `<strong>${n.children.map(r).join('')}</strong>`
      : n.type === 'emphasis'
      ? `<em>${n.children.map(r).join('')}</em>`
      : n.type === 'paragraph'
      ? `<p>${n.children.map(r).join('')}</p>`
      : `Unsupported markdown: ${n.type}`;
  }
  return e.map(r).join('');
}
var ZB = f(() => {
  'use strict';
  jB();
  VB();
});
function XQ(t) {
  return Intl.Segmenter
    ? [...new Intl.Segmenter().segment(t)].map((e) => e.segment)
    : [...t];
}
function KQ(t, e) {
  let r = XQ(e.content);
  return QB(t, [], r, e.type);
}
function QB(t, e, r, n) {
  if (r.length === 0)
    return [
      { content: e.join(''), type: n },
      { content: '', type: n },
    ];
  let [i, ...o] = r,
    a = [...e, i];
  return t([{ content: a.join(''), type: n }])
    ? QB(t, a, o, n)
    : (e.length === 0 && i && (e.push(i), r.shift()),
      [
        { content: e.join(''), type: n },
        { content: r.join(''), type: n },
      ]);
}
function JB(t, e) {
  if (
    t.some(({ content: r }) =>
      r.includes(`
`)
    )
  )
    throw new Error(
      'splitLineToFitWidth does not support newlines in the line'
    );
  return fb(t, e);
}
function fb(t, e, r = [], n = []) {
  if (t.length === 0) return n.length > 0 && r.push(n), r.length > 0 ? r : [];
  let i = '';
  t[0].content === ' ' && ((i = ' '), t.shift());
  let o = t.shift() ?? { content: ' ', type: 'normal' },
    a = [...n];
  if ((i !== '' && a.push({ content: i, type: 'normal' }), a.push(o), e(a)))
    return fb(t, e, r, a);
  if (n.length > 0) r.push(n), t.unshift(o);
  else if (o.content) {
    let [s, l] = KQ(e, o);
    r.push([s]), l.content && t.unshift(l);
  }
  return fb(t, e, r);
}
var tP = f(() => {
  'use strict';
});
function ZQ(t, e) {
  e && t.attr('style', e);
}
function QQ(t, e, r, n, i = !1) {
  let o = t.append('foreignObject'),
    a = o.append('xhtml:div'),
    s = e.label,
    l = e.isNode ? 'nodeLabel' : 'edgeLabel';
  a.html(
    `
    <span class="${l} ${n}" ` +
      (e.labelStyle ? 'style="' + e.labelStyle + '"' : '') +
      '>' +
      s +
      '</span>'
  ),
    ZQ(a, e.labelStyle),
    a.style('display', 'table-cell'),
    a.style('white-space', 'nowrap'),
    a.style('max-width', r + 'px'),
    a.attr('xmlns', 'http://www.w3.org/1999/xhtml'),
    i && a.attr('class', 'labelBkg');
  let c = a.node().getBoundingClientRect();
  return (
    c.width === r &&
      (a.style('display', 'table'),
      a.style('white-space', 'break-spaces'),
      a.style('width', r + 'px'),
      (c = a.node().getBoundingClientRect())),
    o.style('width', c.width),
    o.style('height', c.height),
    o.node()
  );
}
function eP(t, e, r) {
  return t
    .append('tspan')
    .attr('class', 'text-outer-tspan')
    .attr('x', 0)
    .attr('y', e * r - 0.1 + 'em')
    .attr('dy', r + 'em');
}
function JQ(t, e, r) {
  let n = t.append('text'),
    i = eP(n, 1, e);
  rP(i, r);
  let o = i.node().getComputedTextLength();
  return n.remove(), o;
}
function tJ(t, e, r, n = !1) {
  let o = e.append('g'),
    a = o.insert('rect').attr('class', 'background'),
    s = o.append('text').attr('y', '-10.1'),
    l = 0;
  for (let c of r) {
    let u = (p) => JQ(o, 1.1, p) <= t,
      h = u(c) ? [c] : JB(c, u);
    for (let p of h) {
      let d = eP(s, l, 1.1);
      rP(d, p), l++;
    }
  }
  if (n) {
    let c = s.node().getBBox(),
      u = 2;
    return (
      a
        .attr('x', -u)
        .attr('y', -u)
        .attr('width', c.width + 2 * u)
        .attr('height', c.height + 2 * u),
      o.node()
    );
  } else return s.node();
}
function rP(t, e) {
  t.text(''),
    e.forEach((r, n) => {
      let i = t
        .append('tspan')
        .attr('font-style', r.type === 'emphasis' ? 'italic' : 'normal')
        .attr('class', 'text-inner-tspan')
        .attr('font-weight', r.type === 'strong' ? 'bold' : 'normal');
      n === 0 ? i.text(r.content) : i.text(' ' + r.content);
    });
}
var Ls,
  Kp = f(() => {
    'use strict';
    xe();
    Np();
    ZB();
    tP();
    Ls = (
      t,
      e = '',
      {
        style: r = '',
        isTitle: n = !1,
        classes: i = '',
        useHtmlLabels: o = !0,
        isNode: a = !0,
        width: s = 200,
        addSvgBackground: l = !1,
      } = {}
    ) => {
      if ((k.info('createText', e, r, n, i, o, a, l), o)) {
        let c = KB(e),
          u = {
            isNode: a,
            label: Qi(c).replace(
              /fa[blrs]?:fa-[\w-]+/g,
              (p) => `<i class='${p.replace(':', ' ')}'></i>`
            ),
            labelStyle: r.replace('fill:', 'color:'),
          };
        return QQ(t, u, s, i, l);
      } else {
        let c = XB(e);
        return tJ(s, t, c, l);
      }
    };
  });
function qn(t, e, r, n) {
  return t
    .insert('polygon', ':first-child')
    .attr(
      'points',
      n
        .map(function (i) {
          return i.x + ',' + i.y;
        })
        .join(' ')
    )
    .attr('class', 'label-container')
    .attr('transform', 'translate(' + -e / 2 + ',' + r / 2 + ')');
}
var je,
  oe,
  Zp = f(() => {
    'use strict';
    Rc();
    Kp();
    Ar();
    Np();
    gn();
    en();
    (je = async (t, e, r, n) => {
      let i,
        o = e.useHtmlLabels || ie(rt().flowchart.htmlLabels);
      r ? (i = r) : (i = 'node default');
      let a = t
          .insert('g')
          .attr('class', i)
          .attr('id', e.domId || e.id),
        s = a.insert('g').attr('class', 'label').attr('style', e.labelStyle),
        l;
      e.labelText === void 0
        ? (l = '')
        : (l = typeof e.labelText == 'string' ? e.labelText : e.labelText[0]);
      let c = s.node(),
        u;
      e.labelType === 'markdown'
        ? (u = Ls(s, Pn(Qi(l), rt()), {
            useHtmlLabels: o,
            width: e.width || rt().flowchart.wrappingWidth,
            classes: 'markdown-node-label',
          }))
        : (u = c.appendChild(He(Pn(Qi(l), rt()), e.labelStyle, !1, n)));
      let h = u.getBBox(),
        p = e.padding / 2;
      if (ie(rt().flowchart.htmlLabels)) {
        let d = u.children[0],
          m = ft(u),
          g = d.getElementsByTagName('img');
        if (g) {
          let E = l.replace(/<img[^>]*>/g, '').trim() === '';
          await Promise.all(
            [...g].map(
              (y) =>
                new Promise((T) => {
                  function b() {
                    if (
                      ((y.style.display = 'flex'),
                      (y.style.flexDirection = 'column'),
                      E)
                    ) {
                      let N = rt().fontSize
                          ? rt().fontSize
                          : window.getComputedStyle(document.body).fontSize,
                        I = 5;
                      y.style.width = parseInt(N, 10) * I + 'px';
                    } else y.style.width = '100%';
                    T(y);
                  }
                  setTimeout(() => {
                    y.complete && b();
                  }),
                    y.addEventListener('error', b),
                    y.addEventListener('load', b);
                })
            )
          );
        }
        (h = d.getBoundingClientRect()),
          m.attr('width', h.width),
          m.attr('height', h.height);
      }
      return (
        o
          ? s.attr(
              'transform',
              'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
            )
          : s.attr('transform', 'translate(0, ' + -h.height / 2 + ')'),
        e.centerLabel &&
          s.attr(
            'transform',
            'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
          ),
        s.insert('rect', ':first-child'),
        { shapeSvg: a, bbox: h, halfPadding: p, label: s }
      );
    }),
      (oe = (t, e) => {
        let r = e.node().getBBox();
        (t.width = r.width), (t.height = r.height);
      });
  });
var Tt,
  Cn,
  nP,
  iP,
  Jp,
  eJ,
  oP,
  aP,
  Is,
  Qp,
  sP,
  lP,
  cP,
  uP,
  fP = f(() => {
    'use strict';
    xe();
    g0();
    Un();
    (Tt = {}),
      (Cn = {}),
      (nP = {}),
      (iP = () => {
        (Cn = {}), (nP = {}), (Tt = {});
      }),
      (Jp = (t, e) => (
        k.trace('In isDecendant', e, ' ', t, ' = ', Cn[e].includes(t)),
        !!Cn[e].includes(t)
      )),
      (eJ = (t, e) => (
        k.info('Decendants of ', e, ' is ', Cn[e]),
        k.info('Edge is ', t),
        t.v === e || t.w === e
          ? !1
          : Cn[e]
          ? Cn[e].includes(t.v) ||
            Jp(t.v, e) ||
            Jp(t.w, e) ||
            Cn[e].includes(t.w)
          : (k.debug('Tilt, ', e, ',not in decendants'), !1)
      )),
      (oP = (t, e, r, n) => {
        k.warn('Copying children of ', t, 'root', n, 'data', e.node(t), n);
        let i = e.children(t) || [];
        t !== n && i.push(t),
          k.warn('Copying (nodes) clusterId', t, 'nodes', i),
          i.forEach((o) => {
            if (e.children(o).length > 0) oP(o, e, r, n);
            else {
              let a = e.node(o);
              k.info('cp ', o, ' to ', n, ' with parent ', t),
                r.setNode(o, a),
                n !== e.parent(o) &&
                  (k.warn('Setting parent', o, e.parent(o)),
                  r.setParent(o, e.parent(o))),
                t !== n && o !== t
                  ? (k.debug('Setting parent', o, t), r.setParent(o, t))
                  : (k.info('In copy ', t, 'root', n, 'data', e.node(t), n),
                    k.debug(
                      'Not Setting parent for node=',
                      o,
                      'cluster!==rootId',
                      t !== n,
                      'node!==clusterId',
                      o !== t
                    ));
              let s = e.edges(o);
              k.debug('Copying Edges', s),
                s.forEach((l) => {
                  k.info('Edge', l);
                  let c = e.edge(l.v, l.w, l.name);
                  k.info('Edge data', c, n);
                  try {
                    eJ(l, n)
                      ? (k.info('Copying as ', l.v, l.w, c, l.name),
                        r.setEdge(l.v, l.w, c, l.name),
                        k.info(
                          'newGraph edges ',
                          r.edges(),
                          r.edge(r.edges()[0])
                        ))
                      : k.info(
                          'Skipping copy of edge ',
                          l.v,
                          '-->',
                          l.w,
                          ' rootId: ',
                          n,
                          ' clusterId:',
                          t
                        );
                  } catch (u) {
                    k.error(u);
                  }
                });
            }
            k.debug('Removing node', o), e.removeNode(o);
          });
      }),
      (aP = (t, e) => {
        let r = e.children(t),
          n = [...r];
        for (let i of r) (nP[i] = t), (n = [...n, ...aP(i, e)]);
        return n;
      }),
      (Is = (t, e) => {
        k.trace('Searching', t);
        let r = e.children(t);
        if ((k.trace('Searching children of id ', t, r), r.length < 1))
          return k.trace('This is a valid node', t), t;
        for (let n of r) {
          let i = Is(n, e);
          if (i) return k.trace('Found replacement for', t, ' => ', i), i;
        }
      }),
      (Qp = (t) =>
        !Tt[t] || !Tt[t].externalConnections ? t : Tt[t] ? Tt[t].id : t),
      (sP = (t, e) => {
        if (!t || e > 10) {
          k.debug('Opting out, no graph ');
          return;
        } else k.debug('Opting in, graph ');
        t.nodes().forEach(function (r) {
          t.children(r).length > 0 &&
            (k.warn(
              'Cluster identified',
              r,
              ' Replacement id in edges: ',
              Is(r, t)
            ),
            (Cn[r] = aP(r, t)),
            (Tt[r] = { id: Is(r, t), clusterData: t.node(r) }));
        }),
          t.nodes().forEach(function (r) {
            let n = t.children(r),
              i = t.edges();
            n.length > 0
              ? (k.debug('Cluster identified', r, Cn),
                i.forEach((o) => {
                  if (o.v !== r && o.w !== r) {
                    let a = Jp(o.v, r),
                      s = Jp(o.w, r);
                    a ^ s &&
                      (k.warn('Edge: ', o, ' leaves cluster ', r),
                      k.warn('Decendants of XXX ', r, ': ', Cn[r]),
                      (Tt[r].externalConnections = !0));
                  }
                }))
              : k.debug('Not a cluster ', r, Cn);
          }),
          t.edges().forEach(function (r) {
            let n = t.edge(r);
            k.warn('Edge ' + r.v + ' -> ' + r.w + ': ' + JSON.stringify(r)),
              k.warn(
                'Edge ' + r.v + ' -> ' + r.w + ': ' + JSON.stringify(t.edge(r))
              );
            let i = r.v,
              o = r.w;
            if (
              (k.warn(
                'Fix XXX',
                Tt,
                'ids:',
                r.v,
                r.w,
                'Translating: ',
                Tt[r.v],
                ' --- ',
                Tt[r.w]
              ),
              Tt[r.v] && Tt[r.w] && Tt[r.v] === Tt[r.w])
            ) {
              k.warn(
                'Fixing and trixing link to self - removing XXX',
                r.v,
                r.w,
                r.name
              ),
                k.warn('Fixing and trixing - removing XXX', r.v, r.w, r.name),
                (i = Qp(r.v)),
                (o = Qp(r.w)),
                t.removeEdge(r.v, r.w, r.name);
              let a = r.w + '---' + r.v;
              t.setNode(a, {
                domId: a,
                id: a,
                labelStyle: '',
                labelText: n.label,
                padding: 0,
                shape: 'labelRect',
                style: '',
              });
              let s = structuredClone(n),
                l = structuredClone(n);
              (s.label = ''),
                (s.arrowTypeEnd = 'none'),
                (l.label = ''),
                (s.fromCluster = r.v),
                (l.toCluster = r.v),
                t.setEdge(i, a, s, r.name + '-cyclic-special'),
                t.setEdge(a, o, l, r.name + '-cyclic-special');
            } else (Tt[r.v] || Tt[r.w]) && (k.warn('Fixing and trixing - removing XXX', r.v, r.w, r.name), (i = Qp(r.v)), (o = Qp(r.w)), t.removeEdge(r.v, r.w, r.name), i !== r.v && (n.fromCluster = r.v), o !== r.w && (n.toCluster = r.w), k.warn('Fix Replacing with XXX', i, o, r.name), t.setEdge(i, o, n, r.name));
          }),
          k.warn('Adjusted Graph', bn(t)),
          lP(t, 0),
          k.trace(Tt);
      }),
      (lP = (t, e) => {
        if ((k.warn('extractor - ', e, bn(t), t.children('D')), e > 10)) {
          k.error('Bailing out');
          return;
        }
        let r = t.nodes(),
          n = !1;
        for (let i of r) {
          let o = t.children(i);
          n = n || o.length > 0;
        }
        if (!n) {
          k.debug('Done, no node has children', t.nodes());
          return;
        }
        k.debug('Nodes = ', r, e);
        for (let i of r)
          if (
            (k.debug(
              'Extracting node',
              i,
              Tt,
              Tt[i] && !Tt[i].externalConnections,
              !t.parent(i),
              t.node(i),
              t.children('D'),
              ' Depth ',
              e
            ),
            !Tt[i])
          )
            k.debug('Not a cluster', i, e);
          else if (
            !Tt[i].externalConnections &&
            t.children(i) &&
            t.children(i).length > 0
          ) {
            k.warn(
              'Cluster without external connections, without a parent and with children',
              i,
              e
            );
            let a = t.graph().rankdir === 'TB' ? 'LR' : 'TB';
            Tt[i] &&
              Tt[i].clusterData &&
              Tt[i].clusterData.dir &&
              ((a = Tt[i].clusterData.dir),
              k.warn('Fixing dir', Tt[i].clusterData.dir, a));
            let s = new Vt({ multigraph: !0, compound: !0 })
              .setGraph({
                rankdir: a,
                nodesep: 50,
                ranksep: 50,
                marginx: 8,
                marginy: 8,
              })
              .setDefaultEdgeLabel(function () {
                return {};
              });
            k.warn('Old graph before copy', bn(t)),
              oP(i, t, s, i),
              t.setNode(i, {
                clusterNode: !0,
                id: i,
                clusterData: Tt[i].clusterData,
                labelText: Tt[i].labelText,
                graph: s,
              }),
              k.warn('New graph after copy node: (', i, ')', bn(s)),
              k.debug('Old graph after copy', bn(t));
          } else
            k.warn(
              'Cluster ** ',
              i,
              ' **not meeting the criteria !externalConnections:',
              !Tt[i].externalConnections,
              ' no parent: ',
              !t.parent(i),
              ' children ',
              t.children(i) && t.children(i).length > 0,
              t.children('D'),
              e
            ),
              k.debug(Tt);
        (r = t.nodes()), k.warn('New list of nodes', r);
        for (let i of r) {
          let o = t.node(i);
          k.warn(' Now next level', i, o), o.clusterNode && lP(o.graph, e + 1);
        }
      }),
      (cP = (t, e) => {
        if (e.length === 0) return [];
        let r = Object.assign(e);
        return (
          e.forEach((n) => {
            let i = t.children(n),
              o = cP(t, i);
            r = [...r, ...o];
          }),
          r
        );
      }),
      (uP = (t) => cP(t, t.children()));
  });
function rJ(t, e) {
  return t.intersect(e);
}
var hP,
  pP = f(() => {
    'use strict';
    hP = rJ;
  });
function nJ(t, e, r, n) {
  var i = t.x,
    o = t.y,
    a = i - n.x,
    s = o - n.y,
    l = Math.sqrt(e * e * s * s + r * r * a * a),
    c = Math.abs((e * r * a) / l);
  n.x < i && (c = -c);
  var u = Math.abs((e * r * s) / l);
  return n.y < o && (u = -u), { x: i + c, y: o + u };
}
var td,
  hb = f(() => {
    'use strict';
    td = nJ;
  });
function iJ(t, e, r) {
  return td(t, e, e, r);
}
var dP,
  mP = f(() => {
    'use strict';
    hb();
    dP = iJ;
  });
function oJ(t, e, r, n) {
  var i, o, a, s, l, c, u, h, p, d, m, g, E, y, T;
  if (
    ((i = e.y - t.y),
    (a = t.x - e.x),
    (l = e.x * t.y - t.x * e.y),
    (p = i * r.x + a * r.y + l),
    (d = i * n.x + a * n.y + l),
    !(p !== 0 && d !== 0 && gP(p, d)) &&
      ((o = n.y - r.y),
      (s = r.x - n.x),
      (c = n.x * r.y - r.x * n.y),
      (u = o * t.x + s * t.y + c),
      (h = o * e.x + s * e.y + c),
      !(u !== 0 && h !== 0 && gP(u, h)) && ((m = i * s - o * a), m !== 0)))
  )
    return (
      (g = Math.abs(m / 2)),
      (E = a * c - s * l),
      (y = E < 0 ? (E - g) / m : (E + g) / m),
      (E = o * l - i * c),
      (T = E < 0 ? (E - g) / m : (E + g) / m),
      { x: y, y: T }
    );
}
function gP(t, e) {
  return t * e > 0;
}
var xP,
  yP = f(() => {
    'use strict';
    xP = oJ;
  });
function aJ(t, e, r) {
  var n = t.x,
    i = t.y,
    o = [],
    a = Number.POSITIVE_INFINITY,
    s = Number.POSITIVE_INFINITY;
  typeof e.forEach == 'function'
    ? e.forEach(function (m) {
        (a = Math.min(a, m.x)), (s = Math.min(s, m.y));
      })
    : ((a = Math.min(a, e.x)), (s = Math.min(s, e.y)));
  for (
    var l = n - t.width / 2 - a, c = i - t.height / 2 - s, u = 0;
    u < e.length;
    u++
  ) {
    var h = e[u],
      p = e[u < e.length - 1 ? u + 1 : 0],
      d = xP(t, r, { x: l + h.x, y: c + h.y }, { x: l + p.x, y: c + p.y });
    d && o.push(d);
  }
  return o.length
    ? (o.length > 1 &&
        o.sort(function (m, g) {
          var E = m.x - r.x,
            y = m.y - r.y,
            T = Math.sqrt(E * E + y * y),
            b = g.x - r.x,
            N = g.y - r.y,
            I = Math.sqrt(b * b + N * N);
          return T < I ? -1 : T === I ? 0 : 1;
        }),
      o[0])
    : t;
}
var bP,
  _P = f(() => {
    'use strict';
    yP();
    bP = aJ;
  });
var sJ,
  ea,
  pb = f(() => {
    'use strict';
    (sJ = (t, e) => {
      var r = t.x,
        n = t.y,
        i = e.x - r,
        o = e.y - n,
        a = t.width / 2,
        s = t.height / 2,
        l,
        c;
      return (
        Math.abs(o) * a > Math.abs(i) * s
          ? (o < 0 && (s = -s), (l = o === 0 ? 0 : (s * i) / o), (c = s))
          : (i < 0 && (a = -a), (l = a), (c = i === 0 ? 0 : (a * o) / i)),
        { x: r + l, y: n + c }
      );
    }),
      (ea = sJ);
  });
var ae,
  db = f(() => {
    'use strict';
    pP();
    mP();
    hb();
    _P();
    pb();
    ae = { node: hP, circle: dP, ellipse: td, polygon: bP, rect: ea };
  });
var lJ,
  CP,
  TP = f(() => {
    'use strict';
    Zp();
    xe();
    Ar();
    db();
    (lJ = async (t, e) => {
      e.useHtmlLabels || rt().flowchart.htmlLabels || (e.centerLabel = !0);
      let {
        shapeSvg: n,
        bbox: i,
        halfPadding: o,
      } = await je(t, e, 'node ' + e.classes, !0);
      k.info('Classes = ', e.classes);
      let a = n.insert('rect', ':first-child');
      return (
        a
          .attr('rx', e.rx)
          .attr('ry', e.ry)
          .attr('x', -i.width / 2 - o)
          .attr('y', -i.height / 2 - o)
          .attr('width', i.width + e.padding)
          .attr('height', i.height + e.padding),
        oe(e, a),
        (e.intersect = function (s) {
          return ae.rect(e, s);
        }),
        n
      );
    }),
      (CP = lJ);
  });
function vP(t, e, r, n) {
  let i = [],
    o = (s) => {
      i.push(s, 0);
    },
    a = (s) => {
      i.push(0, s);
    };
  e.includes('t') ? (k.debug('add top border'), o(r)) : a(r),
    e.includes('r') ? (k.debug('add right border'), o(n)) : a(n),
    e.includes('b') ? (k.debug('add bottom border'), o(r)) : a(r),
    e.includes('l') ? (k.debug('add left border'), o(n)) : a(n),
    t.attr('stroke-dasharray', i.join(' '));
}
var kP,
  zr,
  EP,
  cJ,
  uJ,
  fJ,
  hJ,
  pJ,
  dJ,
  mJ,
  gJ,
  xJ,
  yJ,
  bJ,
  _J,
  CJ,
  TJ,
  kJ,
  EJ,
  wJ,
  wP,
  SJ,
  vJ,
  SP,
  Os,
  AP,
  LP,
  IP,
  mb,
  OP = f(() => {
    'use strict';
    gn();
    xe();
    Zp();
    Ar();
    db();
    Rc();
    TP();
    en();
    (kP = (t) => (t ? ' ' + t : '')),
      (zr = (t, e) => `${e || 'node default'}${kP(t.classes)} ${kP(t.class)}`),
      (EP = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = i + o,
          s = [
            { x: a / 2, y: 0 },
            { x: a, y: -a / 2 },
            { x: a / 2, y: -a },
            { x: 0, y: -a / 2 },
          ];
        k.info('Question main (Circle)');
        let l = qn(r, a, a, s);
        return (
          l.attr('style', e.style),
          oe(e, l),
          (e.intersect = function (c) {
            return k.warn('Intersect called'), ae.polygon(e, s, c);
          }),
          r
        );
      }),
      (cJ = (t, e) => {
        let r = t
            .insert('g')
            .attr('class', 'node default')
            .attr('id', e.domId || e.id),
          n = 28,
          i = [
            { x: 0, y: n / 2 },
            { x: n / 2, y: 0 },
            { x: 0, y: -n / 2 },
            { x: -n / 2, y: 0 },
          ];
        return (
          r
            .insert('polygon', ':first-child')
            .attr(
              'points',
              i
                .map(function (a) {
                  return a.x + ',' + a.y;
                })
                .join(' ')
            )
            .attr('class', 'state-start')
            .attr('r', 7)
            .attr('width', 28)
            .attr('height', 28),
          (e.width = 28),
          (e.height = 28),
          (e.intersect = function (a) {
            return ae.circle(e, 14, a);
          }),
          r
        );
      }),
      (uJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = 4,
          o = n.height + e.padding,
          a = o / i,
          s = n.width + 2 * a + e.padding,
          l = [
            { x: a, y: 0 },
            { x: s - a, y: 0 },
            { x: s, y: -o / 2 },
            { x: s - a, y: -o },
            { x: a, y: -o },
            { x: 0, y: -o / 2 },
          ],
          c = qn(r, s, o, l);
        return (
          c.attr('style', e.style),
          oe(e, c),
          (e.intersect = function (u) {
            return ae.polygon(e, l, u);
          }),
          r
        );
      }),
      (fJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: -o / 2, y: 0 },
            { x: i, y: 0 },
            { x: i, y: -o },
            { x: -o / 2, y: -o },
            { x: 0, y: -o / 2 },
          ];
        return (
          qn(r, i, o, a).attr('style', e.style),
          (e.width = i + o),
          (e.height = o),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (hJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: (-2 * o) / 6, y: 0 },
            { x: i - o / 6, y: 0 },
            { x: i + (2 * o) / 6, y: -o },
            { x: o / 6, y: -o },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (pJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: (2 * o) / 6, y: 0 },
            { x: i + o / 6, y: 0 },
            { x: i - (2 * o) / 6, y: -o },
            { x: -o / 6, y: -o },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (dJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: (-2 * o) / 6, y: 0 },
            { x: i + (2 * o) / 6, y: 0 },
            { x: i - o / 6, y: -o },
            { x: o / 6, y: -o },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (mJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: o / 6, y: 0 },
            { x: i - o / 6, y: 0 },
            { x: i + (2 * o) / 6, y: -o },
            { x: (-2 * o) / 6, y: -o },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (gJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: 0, y: 0 },
            { x: i + o / 2, y: 0 },
            { x: i, y: -o / 2 },
            { x: i + o / 2, y: -o },
            { x: 0, y: -o },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (xJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = i / 2,
          a = o / (2.5 + i / 50),
          s = n.height + a + e.padding,
          l =
            'M 0,' +
            a +
            ' a ' +
            o +
            ',' +
            a +
            ' 0,0,0 ' +
            i +
            ' 0 a ' +
            o +
            ',' +
            a +
            ' 0,0,0 ' +
            -i +
            ' 0 l 0,' +
            s +
            ' a ' +
            o +
            ',' +
            a +
            ' 0,0,0 ' +
            i +
            ' 0 l 0,' +
            -s,
          c = r
            .attr('label-offset-y', a)
            .insert('path', ':first-child')
            .attr('style', e.style)
            .attr('d', l)
            .attr(
              'transform',
              'translate(' + -i / 2 + ',' + -(s / 2 + a) + ')'
            );
        return (
          oe(e, c),
          (e.intersect = function (u) {
            let h = ae.rect(e, u),
              p = h.x - e.x;
            if (
              o != 0 &&
              (Math.abs(p) < e.width / 2 ||
                (Math.abs(p) == e.width / 2 &&
                  Math.abs(h.y - e.y) > e.height / 2 - a))
            ) {
              let d = a * a * (1 - (p * p) / (o * o));
              d != 0 && (d = Math.sqrt(d)),
                (d = a - d),
                u.y - e.y > 0 && (d = -d),
                (h.y += d);
            }
            return h;
          }),
          r
        );
      }),
      (yJ = async (t, e) => {
        let {
            shapeSvg: r,
            bbox: n,
            halfPadding: i,
          } = await je(t, e, 'node ' + e.classes + ' ' + e.class, !0),
          o = r.insert('rect', ':first-child'),
          a = n.width + e.padding,
          s = n.height + e.padding;
        if (
          (o
            .attr('class', 'basic label-container')
            .attr('style', e.style)
            .attr('rx', e.rx)
            .attr('ry', e.ry)
            .attr('x', -n.width / 2 - i)
            .attr('y', -n.height / 2 - i)
            .attr('width', a)
            .attr('height', s),
          e.props)
        ) {
          let l = new Set(Object.keys(e.props));
          e.props.borders &&
            (vP(o, e.props.borders, a, s), l.delete('borders')),
            l.forEach((c) => {
              k.warn(`Unknown node property ${c}`);
            });
        }
        return (
          oe(e, o),
          (e.intersect = function (l) {
            return ae.rect(e, l);
          }),
          r
        );
      }),
      (bJ = async (t, e) => {
        let { shapeSvg: r } = await je(t, e, 'label', !0);
        k.trace('Classes = ', e.class);
        let n = r.insert('rect', ':first-child'),
          i = 0,
          o = 0;
        if (
          (n.attr('width', i).attr('height', o),
          r.attr('class', 'label edgeLabel'),
          e.props)
        ) {
          let a = new Set(Object.keys(e.props));
          e.props.borders &&
            (vP(n, e.props.borders, i, o), a.delete('borders')),
            a.forEach((s) => {
              k.warn(`Unknown node property ${s}`);
            });
        }
        return (
          oe(e, n),
          (e.intersect = function (a) {
            return ae.rect(e, a);
          }),
          r
        );
      });
    (_J = (t, e) => {
      let r;
      e.classes ? (r = 'node ' + e.classes) : (r = 'node default');
      let n = t
          .insert('g')
          .attr('class', r)
          .attr('id', e.domId || e.id),
        i = n.insert('rect', ':first-child'),
        o = n.insert('line'),
        a = n.insert('g').attr('class', 'label'),
        s = e.labelText.flat ? e.labelText.flat() : e.labelText,
        l = '';
      typeof s == 'object' ? (l = s[0]) : (l = s),
        k.info('Label text abc79', l, s, typeof s == 'object');
      let c = a.node().appendChild(He(l, e.labelStyle, !0, !0)),
        u = { width: 0, height: 0 };
      if (ie(rt().flowchart.htmlLabels)) {
        let g = c.children[0],
          E = ft(c);
        (u = g.getBoundingClientRect()),
          E.attr('width', u.width),
          E.attr('height', u.height);
      }
      k.info('Text 2', s);
      let h = s.slice(1, s.length),
        p = c.getBBox(),
        d = a
          .node()
          .appendChild(He(h.join ? h.join('<br/>') : h, e.labelStyle, !0, !0));
      if (ie(rt().flowchart.htmlLabels)) {
        let g = d.children[0],
          E = ft(d);
        (u = g.getBoundingClientRect()),
          E.attr('width', u.width),
          E.attr('height', u.height);
      }
      let m = e.padding / 2;
      return (
        ft(d).attr(
          'transform',
          'translate( ' +
            (u.width > p.width ? 0 : (p.width - u.width) / 2) +
            ', ' +
            (p.height + m + 5) +
            ')'
        ),
        ft(c).attr(
          'transform',
          'translate( ' +
            (u.width < p.width ? 0 : -(p.width - u.width) / 2) +
            ', 0)'
        ),
        (u = a.node().getBBox()),
        a.attr(
          'transform',
          'translate(' + -u.width / 2 + ', ' + (-u.height / 2 - m + 3) + ')'
        ),
        i
          .attr('class', 'outer title-state')
          .attr('x', -u.width / 2 - m)
          .attr('y', -u.height / 2 - m)
          .attr('width', u.width + e.padding)
          .attr('height', u.height + e.padding),
        o
          .attr('class', 'divider')
          .attr('x1', -u.width / 2 - m)
          .attr('x2', u.width / 2 + m)
          .attr('y1', -u.height / 2 - m + p.height + m)
          .attr('y2', -u.height / 2 - m + p.height + m),
        oe(e, i),
        (e.intersect = function (g) {
          return ae.rect(e, g);
        }),
        n
      );
    }),
      (CJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.height + e.padding,
          o = n.width + i / 4 + e.padding,
          a = r
            .insert('rect', ':first-child')
            .attr('style', e.style)
            .attr('rx', i / 2)
            .attr('ry', i / 2)
            .attr('x', -o / 2)
            .attr('y', -i / 2)
            .attr('width', o)
            .attr('height', i);
        return (
          oe(e, a),
          (e.intersect = function (s) {
            return ae.rect(e, s);
          }),
          r
        );
      }),
      (TJ = async (t, e) => {
        let {
            shapeSvg: r,
            bbox: n,
            halfPadding: i,
          } = await je(t, e, zr(e, void 0), !0),
          o = r.insert('circle', ':first-child');
        return (
          o
            .attr('style', e.style)
            .attr('rx', e.rx)
            .attr('ry', e.ry)
            .attr('r', n.width / 2 + i)
            .attr('width', n.width + e.padding)
            .attr('height', n.height + e.padding),
          k.info('Circle main'),
          oe(e, o),
          (e.intersect = function (a) {
            return (
              k.info('Circle intersect', e, n.width / 2 + i, a),
              ae.circle(e, n.width / 2 + i, a)
            );
          }),
          r
        );
      }),
      (kJ = async (t, e) => {
        let {
            shapeSvg: r,
            bbox: n,
            halfPadding: i,
          } = await je(t, e, zr(e, void 0), !0),
          o = 5,
          a = r.insert('g', ':first-child'),
          s = a.insert('circle'),
          l = a.insert('circle');
        return (
          a.attr('class', e.class),
          s
            .attr('style', e.style)
            .attr('rx', e.rx)
            .attr('ry', e.ry)
            .attr('r', n.width / 2 + i + o)
            .attr('width', n.width + e.padding + o * 2)
            .attr('height', n.height + e.padding + o * 2),
          l
            .attr('style', e.style)
            .attr('rx', e.rx)
            .attr('ry', e.ry)
            .attr('r', n.width / 2 + i)
            .attr('width', n.width + e.padding)
            .attr('height', n.height + e.padding),
          k.info('DoubleCircle main'),
          oe(e, s),
          (e.intersect = function (c) {
            return (
              k.info('DoubleCircle intersect', e, n.width / 2 + i + o, c),
              ae.circle(e, n.width / 2 + i + o, c)
            );
          }),
          r
        );
      }),
      (EJ = async (t, e) => {
        let { shapeSvg: r, bbox: n } = await je(t, e, zr(e, void 0), !0),
          i = n.width + e.padding,
          o = n.height + e.padding,
          a = [
            { x: 0, y: 0 },
            { x: i, y: 0 },
            { x: i, y: -o },
            { x: 0, y: -o },
            { x: 0, y: 0 },
            { x: -8, y: 0 },
            { x: i + 8, y: 0 },
            { x: i + 8, y: -o },
            { x: -8, y: -o },
            { x: -8, y: 0 },
          ],
          s = qn(r, i, o, a);
        return (
          s.attr('style', e.style),
          oe(e, s),
          (e.intersect = function (l) {
            return ae.polygon(e, a, l);
          }),
          r
        );
      }),
      (wJ = (t, e) => {
        let r = t
            .insert('g')
            .attr('class', 'node default')
            .attr('id', e.domId || e.id),
          n = r.insert('circle', ':first-child');
        return (
          n
            .attr('class', 'state-start')
            .attr('r', 7)
            .attr('width', 14)
            .attr('height', 14),
          oe(e, n),
          (e.intersect = function (i) {
            return ae.circle(e, 7, i);
          }),
          r
        );
      }),
      (wP = (t, e, r) => {
        let n = t
            .insert('g')
            .attr('class', 'node default')
            .attr('id', e.domId || e.id),
          i = 70,
          o = 10;
        r === 'LR' && ((i = 10), (o = 70));
        let a = n
          .append('rect')
          .attr('x', (-1 * i) / 2)
          .attr('y', (-1 * o) / 2)
          .attr('width', i)
          .attr('height', o)
          .attr('class', 'fork-join');
        return (
          oe(e, a),
          (e.height = e.height + e.padding / 2),
          (e.width = e.width + e.padding / 2),
          (e.intersect = function (s) {
            return ae.rect(e, s);
          }),
          n
        );
      }),
      (SJ = (t, e) => {
        let r = t
            .insert('g')
            .attr('class', 'node default')
            .attr('id', e.domId || e.id),
          n = r.insert('circle', ':first-child'),
          i = r.insert('circle', ':first-child');
        return (
          i
            .attr('class', 'state-start')
            .attr('r', 7)
            .attr('width', 14)
            .attr('height', 14),
          n
            .attr('class', 'state-end')
            .attr('r', 5)
            .attr('width', 10)
            .attr('height', 10),
          oe(e, i),
          (e.intersect = function (o) {
            return ae.circle(e, 7, o);
          }),
          r
        );
      }),
      (vJ = (t, e) => {
        let r = e.padding / 2,
          n = 4,
          i = 8,
          o;
        e.classes ? (o = 'node ' + e.classes) : (o = 'node default');
        let a = t
            .insert('g')
            .attr('class', o)
            .attr('id', e.domId || e.id),
          s = a.insert('rect', ':first-child'),
          l = a.insert('line'),
          c = a.insert('line'),
          u = 0,
          h = n,
          p = a.insert('g').attr('class', 'label'),
          d = 0,
          m = e.classData.annotations && e.classData.annotations[0],
          g = e.classData.annotations[0]
            ? '\xAB' + e.classData.annotations[0] + '\xBB'
            : '',
          E = p.node().appendChild(He(g, e.labelStyle, !0, !0)),
          y = E.getBBox();
        if (ie(rt().flowchart.htmlLabels)) {
          let D = E.children[0],
            J = ft(E);
          (y = D.getBoundingClientRect()),
            J.attr('width', y.width),
            J.attr('height', y.height);
        }
        e.classData.annotations[0] && ((h += y.height + n), (u += y.width));
        let T = e.classData.label;
        e.classData.type !== void 0 &&
          e.classData.type !== '' &&
          (rt().flowchart.htmlLabels
            ? (T += '&lt;' + e.classData.type + '&gt;')
            : (T += '<' + e.classData.type + '>'));
        let b = p.node().appendChild(He(T, e.labelStyle, !0, !0));
        ft(b).attr('class', 'classTitle');
        let N = b.getBBox();
        if (ie(rt().flowchart.htmlLabels)) {
          let D = b.children[0],
            J = ft(b);
          (N = D.getBoundingClientRect()),
            J.attr('width', N.width),
            J.attr('height', N.height);
        }
        (h += N.height + n), N.width > u && (u = N.width);
        let I = [];
        e.classData.members.forEach((D) => {
          let J = D.getDisplayDetails(),
            st = J.displayText;
          rt().flowchart.htmlLabels &&
            (st = st.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
          let R = p
              .node()
              .appendChild(
                He(st, J.cssStyle ? J.cssStyle : e.labelStyle, !0, !0)
              ),
            L = R.getBBox();
          if (ie(rt().flowchart.htmlLabels)) {
            let v = R.children[0],
              U = ft(R);
            (L = v.getBoundingClientRect()),
              U.attr('width', L.width),
              U.attr('height', L.height);
          }
          L.width > u && (u = L.width), (h += L.height + n), I.push(R);
        }),
          (h += i);
        let A = [];
        if (
          (e.classData.methods.forEach((D) => {
            let J = D.getDisplayDetails(),
              st = J.displayText;
            rt().flowchart.htmlLabels &&
              (st = st.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
            let R = p
                .node()
                .appendChild(
                  He(st, J.cssStyle ? J.cssStyle : e.labelStyle, !0, !0)
                ),
              L = R.getBBox();
            if (ie(rt().flowchart.htmlLabels)) {
              let v = R.children[0],
                U = ft(R);
              (L = v.getBoundingClientRect()),
                U.attr('width', L.width),
                U.attr('height', L.height);
            }
            L.width > u && (u = L.width), (h += L.height + n), A.push(R);
          }),
          (h += i),
          m)
        ) {
          let D = (u - y.width) / 2;
          ft(E).attr(
            'transform',
            'translate( ' + ((-1 * u) / 2 + D) + ', ' + (-1 * h) / 2 + ')'
          ),
            (d = y.height + n);
        }
        let O = (u - N.width) / 2;
        return (
          ft(b).attr(
            'transform',
            'translate( ' + ((-1 * u) / 2 + O) + ', ' + ((-1 * h) / 2 + d) + ')'
          ),
          (d += N.height + n),
          l
            .attr('class', 'divider')
            .attr('x1', -u / 2 - r)
            .attr('x2', u / 2 + r)
            .attr('y1', -h / 2 - r + i + d)
            .attr('y2', -h / 2 - r + i + d),
          (d += i),
          I.forEach((D) => {
            ft(D).attr(
              'transform',
              'translate( ' + -u / 2 + ', ' + ((-1 * h) / 2 + d + i / 2) + ')'
            );
            let J = D?.getBBox();
            d += (J?.height ?? 0) + n;
          }),
          (d += i),
          c
            .attr('class', 'divider')
            .attr('x1', -u / 2 - r)
            .attr('x2', u / 2 + r)
            .attr('y1', -h / 2 - r + i + d)
            .attr('y2', -h / 2 - r + i + d),
          (d += i),
          A.forEach((D) => {
            ft(D).attr(
              'transform',
              'translate( ' + -u / 2 + ', ' + ((-1 * h) / 2 + d) + ')'
            );
            let J = D?.getBBox();
            d += (J?.height ?? 0) + n;
          }),
          s
            .attr('class', 'outer title-state')
            .attr('x', -u / 2 - r)
            .attr('y', -(h / 2) - r)
            .attr('width', u + e.padding)
            .attr('height', h + e.padding),
          oe(e, s),
          (e.intersect = function (D) {
            return ae.rect(e, D);
          }),
          a
        );
      }),
      (SP = {
        rhombus: EP,
        question: EP,
        rect: yJ,
        labelRect: bJ,
        rectWithTitle: _J,
        choice: cJ,
        circle: TJ,
        doublecircle: kJ,
        stadium: CJ,
        hexagon: uJ,
        rect_left_inv_arrow: fJ,
        lean_right: hJ,
        lean_left: pJ,
        trapezoid: dJ,
        inv_trapezoid: mJ,
        rect_right_inv_arrow: gJ,
        cylinder: xJ,
        start: wJ,
        end: SJ,
        note: CP,
        subroutine: EJ,
        fork: wP,
        join: wP,
        class_box: vJ,
      }),
      (Os = {}),
      (AP = async (t, e, r) => {
        let n, i;
        if (e.link) {
          let o;
          rt().securityLevel === 'sandbox'
            ? (o = '_top')
            : e.linkTarget && (o = e.linkTarget || '_blank'),
            (n = t
              .insert('svg:a')
              .attr('xlink:href', e.link)
              .attr('target', o)),
            (i = await SP[e.shape](n, e, r));
        } else (i = await SP[e.shape](t, e, r)), (n = i);
        return (
          e.tooltip && i.attr('title', e.tooltip),
          e.class && i.attr('class', 'node default ' + e.class),
          (Os[e.id] = n),
          e.haveCallback &&
            Os[e.id].attr('class', Os[e.id].attr('class') + ' clickable'),
          n
        );
      }),
      (LP = (t, e) => {
        Os[e.id] = t;
      }),
      (IP = () => {
        Os = {};
      }),
      (mb = (t) => {
        let e = Os[t.id];
        k.trace(
          'Transforming node',
          t.diff,
          t,
          'translate(' + (t.x - t.width / 2 - 5) + ', ' + t.width / 2 + ')'
        );
        let r = 8,
          n = t.diff || 0;
        return (
          t.clusterNode
            ? e.attr(
                'transform',
                'translate(' +
                  (t.x + n - t.width / 2) +
                  ', ' +
                  (t.y - t.height / 2 - r) +
                  ')'
              )
            : e.attr('transform', 'translate(' + t.x + ', ' + t.y + ')'),
          n
        );
      });
  });
var AJ,
  LJ,
  IJ,
  OJ,
  RJ,
  RP,
  NP,
  FP,
  MP = f(() => {
    'use strict';
    pb();
    xe();
    Rc();
    Kp();
    gn();
    Ar();
    en();
    (AJ = (t, e) => {
      k.info('Creating subgraph rect for ', e.id, e);
      let r = t
          .insert('g')
          .attr('class', 'cluster' + (e.class ? ' ' + e.class : ''))
          .attr('id', e.id),
        n = r.insert('rect', ':first-child'),
        i = ie(rt().flowchart.htmlLabels),
        o = r.insert('g').attr('class', 'cluster-label'),
        a =
          e.labelType === 'markdown'
            ? Ls(o, e.labelText, { style: e.labelStyle, useHtmlLabels: i })
            : o.node().appendChild(He(e.labelText, e.labelStyle, void 0, !0)),
        s = a.getBBox();
      if (ie(rt().flowchart.htmlLabels)) {
        let p = a.children[0],
          d = ft(a);
        (s = p.getBoundingClientRect()),
          d.attr('width', s.width),
          d.attr('height', s.height);
      }
      let l = 0 * e.padding,
        c = l / 2,
        u = e.width <= s.width + l ? s.width + l : e.width;
      e.width <= s.width + l
        ? (e.diff = (s.width - e.width) / 2 - e.padding / 2)
        : (e.diff = -e.padding / 2),
        k.trace('Data ', e, JSON.stringify(e)),
        n
          .attr('style', e.style)
          .attr('rx', e.rx)
          .attr('ry', e.ry)
          .attr('x', e.x - u / 2)
          .attr('y', e.y - e.height / 2 - c)
          .attr('width', u)
          .attr('height', e.height + l),
        i
          ? o.attr(
              'transform',
              'translate(' +
                (e.x - s.width / 2) +
                ', ' +
                (e.y - e.height / 2) +
                ')'
            )
          : o.attr(
              'transform',
              'translate(' + e.x + ', ' + (e.y - e.height / 2) + ')'
            );
      let h = n.node().getBBox();
      return (
        (e.width = h.width),
        (e.height = h.height),
        (e.intersect = function (p) {
          return ea(e, p);
        }),
        r
      );
    }),
      (LJ = (t, e) => {
        let r = t.insert('g').attr('class', 'note-cluster').attr('id', e.id),
          n = r.insert('rect', ':first-child'),
          i = 0 * e.padding,
          o = i / 2;
        n.attr('rx', e.rx)
          .attr('ry', e.ry)
          .attr('x', e.x - e.width / 2 - o)
          .attr('y', e.y - e.height / 2 - o)
          .attr('width', e.width + i)
          .attr('height', e.height + i)
          .attr('fill', 'none');
        let a = n.node().getBBox();
        return (
          (e.width = a.width),
          (e.height = a.height),
          (e.intersect = function (s) {
            return ea(e, s);
          }),
          r
        );
      }),
      (IJ = (t, e) => {
        let r = t.insert('g').attr('class', e.classes).attr('id', e.id),
          n = r.insert('rect', ':first-child'),
          i = r.insert('g').attr('class', 'cluster-label'),
          o = r.append('rect'),
          a = i.node().appendChild(He(e.labelText, e.labelStyle, void 0, !0)),
          s = a.getBBox();
        if (ie(rt().flowchart.htmlLabels)) {
          let p = a.children[0],
            d = ft(a);
          (s = p.getBoundingClientRect()),
            d.attr('width', s.width),
            d.attr('height', s.height);
        }
        s = a.getBBox();
        let l = 0 * e.padding,
          c = l / 2,
          u = e.width <= s.width + e.padding ? s.width + e.padding : e.width;
        e.width <= s.width + e.padding
          ? (e.diff = (s.width + e.padding * 0 - e.width) / 2)
          : (e.diff = -e.padding / 2),
          n
            .attr('class', 'outer')
            .attr('x', e.x - u / 2 - c)
            .attr('y', e.y - e.height / 2 - c)
            .attr('width', u + l)
            .attr('height', e.height + l),
          o
            .attr('class', 'inner')
            .attr('x', e.x - u / 2 - c)
            .attr('y', e.y - e.height / 2 - c + s.height - 1)
            .attr('width', u + l)
            .attr('height', e.height + l - s.height - 3),
          i.attr(
            'transform',
            'translate(' +
              (e.x - s.width / 2) +
              ', ' +
              (e.y -
                e.height / 2 -
                e.padding / 3 +
                (ie(rt().flowchart.htmlLabels) ? 5 : 3)) +
              ')'
          );
        let h = n.node().getBBox();
        return (
          (e.height = h.height),
          (e.intersect = function (p) {
            return ea(e, p);
          }),
          r
        );
      }),
      (OJ = (t, e) => {
        let r = t.insert('g').attr('class', e.classes).attr('id', e.id),
          n = r.insert('rect', ':first-child'),
          i = 0 * e.padding,
          o = i / 2;
        n.attr('class', 'divider')
          .attr('x', e.x - e.width / 2 - o)
          .attr('y', e.y - e.height / 2)
          .attr('width', e.width + i)
          .attr('height', e.height + i);
        let a = n.node().getBBox();
        return (
          (e.width = a.width),
          (e.height = a.height),
          (e.diff = -e.padding / 2),
          (e.intersect = function (s) {
            return ea(e, s);
          }),
          r
        );
      }),
      (RJ = { rect: AJ, roundedWithTitle: IJ, noteGroup: LJ, divider: OJ }),
      (RP = {}),
      (NP = (t, e) => {
        k.trace('Inserting cluster');
        let r = e.shape || 'rect';
        RP[e.id] = RJ[r](t, e);
      }),
      (FP = () => {
        RP = {};
      });
  });
function ed(t, e) {
  (t = rd(t)), (e = rd(e));
  let [r, n] = [t.x, t.y],
    [i, o] = [e.x, e.y],
    a = i - r,
    s = o - n;
  return { angle: Math.atan(s / a), deltaX: a, deltaY: s };
}
var no,
  rd,
  BP,
  PP = f(() => {
    'use strict';
    no = {
      aggregation: 18,
      extension: 18,
      composition: 18,
      dependency: 6,
      lollipop: 13.5,
      arrow_point: 5.3,
    };
    (rd = (t) => (Array.isArray(t) ? { x: t[0], y: t[1] } : t)),
      (BP = (t) => ({
        x: function (e, r, n) {
          let i = 0;
          if (r === 0 && Object.hasOwn(no, t.arrowTypeStart)) {
            let { angle: o, deltaX: a } = ed(n[0], n[1]);
            i = no[t.arrowTypeStart] * Math.cos(o) * (a >= 0 ? 1 : -1);
          } else if (r === n.length - 1 && Object.hasOwn(no, t.arrowTypeEnd)) {
            let { angle: o, deltaX: a } = ed(n[n.length - 1], n[n.length - 2]);
            i = no[t.arrowTypeEnd] * Math.cos(o) * (a >= 0 ? 1 : -1);
          }
          return rd(e).x + i;
        },
        y: function (e, r, n) {
          let i = 0;
          if (r === 0 && Object.hasOwn(no, t.arrowTypeStart)) {
            let { angle: o, deltaY: a } = ed(n[0], n[1]);
            i =
              no[t.arrowTypeStart] * Math.abs(Math.sin(o)) * (a >= 0 ? 1 : -1);
          } else if (r === n.length - 1 && Object.hasOwn(no, t.arrowTypeEnd)) {
            let { angle: o, deltaY: a } = ed(n[n.length - 1], n[n.length - 2]);
            i = no[t.arrowTypeEnd] * Math.abs(Math.sin(o)) * (a >= 0 ? 1 : -1);
          }
          return rd(e).y + i;
        },
      }));
  });
function nd(t, e) {
  rt().flowchart.htmlLabels &&
    t &&
    ((t.style.width = e.length * 9 + 'px'), (t.style.height = '12px'));
}
var id,
  Qe,
  UP,
  zP,
  $P,
  NJ,
  FJ,
  DP,
  WP,
  qP = f(() => {
    'use strict';
    xe();
    Rc();
    Kp();
    gn();
    Ar();
    gs();
    en();
    PP();
    (id = {}),
      (Qe = {}),
      (UP = () => {
        (id = {}), (Qe = {});
      }),
      (zP = (t, e) => {
        let r = ie(rt().flowchart.htmlLabels),
          n =
            e.labelType === 'markdown'
              ? Ls(t, e.label, {
                  style: e.labelStyle,
                  useHtmlLabels: r,
                  addSvgBackground: !0,
                })
              : He(e.label, e.labelStyle);
        k.info('abc82', e, e.labelType);
        let i = t.insert('g').attr('class', 'edgeLabel'),
          o = i.insert('g').attr('class', 'label');
        o.node().appendChild(n);
        let a = n.getBBox();
        if (r) {
          let l = n.children[0],
            c = ft(n);
          (a = l.getBoundingClientRect()),
            c.attr('width', a.width),
            c.attr('height', a.height);
        }
        o.attr(
          'transform',
          'translate(' + -a.width / 2 + ', ' + -a.height / 2 + ')'
        ),
          (id[e.id] = i),
          (e.width = a.width),
          (e.height = a.height);
        let s;
        if (e.startLabelLeft) {
          let l = He(e.startLabelLeft, e.labelStyle),
            c = t.insert('g').attr('class', 'edgeTerminals'),
            u = c.insert('g').attr('class', 'inner');
          s = u.node().appendChild(l);
          let h = l.getBBox();
          u.attr(
            'transform',
            'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
          ),
            Qe[e.id] || (Qe[e.id] = {}),
            (Qe[e.id].startLeft = c),
            nd(s, e.startLabelLeft);
        }
        if (e.startLabelRight) {
          let l = He(e.startLabelRight, e.labelStyle),
            c = t.insert('g').attr('class', 'edgeTerminals'),
            u = c.insert('g').attr('class', 'inner');
          (s = c.node().appendChild(l)), u.node().appendChild(l);
          let h = l.getBBox();
          u.attr(
            'transform',
            'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
          ),
            Qe[e.id] || (Qe[e.id] = {}),
            (Qe[e.id].startRight = c),
            nd(s, e.startLabelRight);
        }
        if (e.endLabelLeft) {
          let l = He(e.endLabelLeft, e.labelStyle),
            c = t.insert('g').attr('class', 'edgeTerminals'),
            u = c.insert('g').attr('class', 'inner');
          s = u.node().appendChild(l);
          let h = l.getBBox();
          u.attr(
            'transform',
            'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
          ),
            c.node().appendChild(l),
            Qe[e.id] || (Qe[e.id] = {}),
            (Qe[e.id].endLeft = c),
            nd(s, e.endLabelLeft);
        }
        if (e.endLabelRight) {
          let l = He(e.endLabelRight, e.labelStyle),
            c = t.insert('g').attr('class', 'edgeTerminals'),
            u = c.insert('g').attr('class', 'inner');
          s = u.node().appendChild(l);
          let h = l.getBBox();
          u.attr(
            'transform',
            'translate(' + -h.width / 2 + ', ' + -h.height / 2 + ')'
          ),
            c.node().appendChild(l),
            Qe[e.id] || (Qe[e.id] = {}),
            (Qe[e.id].endRight = c),
            nd(s, e.endLabelRight);
        }
        return n;
      });
    ($P = (t, e) => {
      k.info('Moving label abc78 ', t.id, t.label, id[t.id]);
      let r = e.updatedPath ? e.updatedPath : e.originalPath;
      if (t.label) {
        let n = id[t.id],
          i = t.x,
          o = t.y;
        if (r) {
          let a = ur.calcLabelPosition(r);
          k.info(
            'Moving label ' + t.label + ' from (',
            i,
            ',',
            o,
            ') to (',
            a.x,
            ',',
            a.y,
            ') abc78'
          ),
            e.updatedPath && ((i = a.x), (o = a.y));
        }
        n.attr('transform', 'translate(' + i + ', ' + o + ')');
      }
      if (t.startLabelLeft) {
        let n = Qe[t.id].startLeft,
          i = t.x,
          o = t.y;
        if (r) {
          let a = ur.calcTerminalLabelPosition(
            t.arrowTypeStart ? 10 : 0,
            'start_left',
            r
          );
          (i = a.x), (o = a.y);
        }
        n.attr('transform', 'translate(' + i + ', ' + o + ')');
      }
      if (t.startLabelRight) {
        let n = Qe[t.id].startRight,
          i = t.x,
          o = t.y;
        if (r) {
          let a = ur.calcTerminalLabelPosition(
            t.arrowTypeStart ? 10 : 0,
            'start_right',
            r
          );
          (i = a.x), (o = a.y);
        }
        n.attr('transform', 'translate(' + i + ', ' + o + ')');
      }
      if (t.endLabelLeft) {
        let n = Qe[t.id].endLeft,
          i = t.x,
          o = t.y;
        if (r) {
          let a = ur.calcTerminalLabelPosition(
            t.arrowTypeEnd ? 10 : 0,
            'end_left',
            r
          );
          (i = a.x), (o = a.y);
        }
        n.attr('transform', 'translate(' + i + ', ' + o + ')');
      }
      if (t.endLabelRight) {
        let n = Qe[t.id].endRight,
          i = t.x,
          o = t.y;
        if (r) {
          let a = ur.calcTerminalLabelPosition(
            t.arrowTypeEnd ? 10 : 0,
            'end_right',
            r
          );
          (i = a.x), (o = a.y);
        }
        n.attr('transform', 'translate(' + i + ', ' + o + ')');
      }
    }),
      (NJ = (t, e) => {
        let r = t.x,
          n = t.y,
          i = Math.abs(e.x - r),
          o = Math.abs(e.y - n),
          a = t.width / 2,
          s = t.height / 2;
        return i >= a || o >= s;
      }),
      (FJ = (t, e, r) => {
        k.warn(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(e)}
  insidePoint : ${JSON.stringify(r)}
  node        : x:${t.x} y:${t.y} w:${t.width} h:${t.height}`);
        let n = t.x,
          i = t.y,
          o = Math.abs(n - r.x),
          a = t.width / 2,
          s = r.x < e.x ? a - o : a + o,
          l = t.height / 2,
          c = Math.abs(e.y - r.y),
          u = Math.abs(e.x - r.x);
        if (Math.abs(i - e.y) * a > Math.abs(n - e.x) * l) {
          let h = r.y < e.y ? e.y - l - i : i - l - e.y;
          s = (u * h) / c;
          let p = {
            x: r.x < e.x ? r.x + s : r.x - u + s,
            y: r.y < e.y ? r.y + c - h : r.y - c + h,
          };
          return (
            s === 0 && ((p.x = e.x), (p.y = e.y)),
            u === 0 && (p.x = e.x),
            c === 0 && (p.y = e.y),
            k.warn(`abc89 topp/bott calc, Q ${c}, q ${h}, R ${u}, r ${s}`, p),
            p
          );
        } else {
          r.x < e.x ? (s = e.x - a - n) : (s = n - a - e.x);
          let h = (c * s) / u,
            p = r.x < e.x ? r.x + u - s : r.x - u + s,
            d = r.y < e.y ? r.y + h : r.y - h;
          return (
            k.warn(`sides calc abc89, Q ${c}, q ${h}, R ${u}, r ${s}`, {
              _x: p,
              _y: d,
            }),
            s === 0 && ((p = e.x), (d = e.y)),
            u === 0 && (p = e.x),
            c === 0 && (d = e.y),
            { x: p, y: d }
          );
        }
      }),
      (DP = (t, e) => {
        k.warn('abc88 cutPathAtIntersect', t, e);
        let r = [],
          n = t[0],
          i = !1;
        return (
          t.forEach((o) => {
            if ((k.info('abc88 checking point', o, e), !NJ(e, o) && !i)) {
              let a = FJ(e, n, o);
              k.warn('abc88 inside', o, n, a), k.warn('abc88 intersection', a);
              let s = !1;
              r.forEach((l) => {
                s = s || (l.x === a.x && l.y === a.y);
              }),
                r.some((l) => l.x === a.x && l.y === a.y)
                  ? k.warn('abc88 no intersect', a, r)
                  : r.push(a),
                (i = !0);
            } else k.warn('abc88 outside', o, n), (n = o), i || r.push(o);
          }),
          k.warn('abc88 returning points', r),
          r
        );
      }),
      (WP = function (t, e, r, n, i, o, a) {
        let s = r.points,
          l = !1,
          c = o.node(e.v);
        var u = o.node(e.w);
        k.info('abc88 InsertEdge: ', r),
          u.intersect &&
            c.intersect &&
            ((s = s.slice(1, r.points.length - 1)),
            s.unshift(c.intersect(s[0])),
            k.info(
              'Last point',
              s[s.length - 1],
              u,
              u.intersect(s[s.length - 1])
            ),
            s.push(u.intersect(s[s.length - 1]))),
          r.toCluster &&
            (k.info('to cluster abc88', n[r.toCluster]),
            (s = DP(r.points, n[r.toCluster].node)),
            (l = !0)),
          r.fromCluster &&
            (k.info('from cluster abc88', n[r.fromCluster]),
            (s = DP(s.reverse(), n[r.fromCluster].node).reverse()),
            (l = !0));
        let h = s.filter((N) => !Number.isNaN(N.y)),
          p = rc;
        r.curve && (i === 'graph' || i === 'flowchart') && (p = r.curve);
        let { x: d, y: m } = BP(r),
          g = kx().x(d).y(m).curve(p),
          E;
        switch (r.thickness) {
          case 'normal':
            E = 'edge-thickness-normal';
            break;
          case 'thick':
            E = 'edge-thickness-thick';
            break;
          case 'invisible':
            E = 'edge-thickness-thick';
            break;
          default:
            E = '';
        }
        switch (r.pattern) {
          case 'solid':
            E += ' edge-pattern-solid';
            break;
          case 'dotted':
            E += ' edge-pattern-dotted';
            break;
          case 'dashed':
            E += ' edge-pattern-dashed';
            break;
        }
        let y = t
            .append('path')
            .attr('d', g(h))
            .attr('id', r.id)
            .attr('class', ' ' + E + (r.classes ? ' ' + r.classes : ''))
            .attr('style', r.style),
          T = '';
        switch (
          ((rt().flowchart.arrowMarkerAbsolute ||
            rt().state.arrowMarkerAbsolute) &&
            ((T =
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              window.location.search),
            (T = T.replace(/\(/g, '\\(')),
            (T = T.replace(/\)/g, '\\)'))),
          k.info('arrowTypeStart', r.arrowTypeStart),
          k.info('arrowTypeEnd', r.arrowTypeEnd),
          r.arrowTypeStart)
        ) {
          case 'arrow_cross':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-crossStart)'
            );
            break;
          case 'arrow_point':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-pointStart)'
            );
            break;
          case 'arrow_barb':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-barbStart)'
            );
            break;
          case 'arrow_circle':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-circleStart)'
            );
            break;
          case 'aggregation':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-aggregationStart)'
            );
            break;
          case 'extension':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-extensionStart)'
            );
            break;
          case 'composition':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-compositionStart)'
            );
            break;
          case 'dependency':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-dependencyStart)'
            );
            break;
          case 'lollipop':
            y.attr(
              'marker-start',
              'url(' + T + '#' + a + '_' + i + '-lollipopStart)'
            );
            break;
          default:
        }
        switch (r.arrowTypeEnd) {
          case 'arrow_cross':
            y.attr('marker-end', 'url(' + T + '#' + a + '_' + i + '-crossEnd)');
            break;
          case 'arrow_point':
            y.attr('marker-end', 'url(' + T + '#' + a + '_' + i + '-pointEnd)');
            break;
          case 'arrow_barb':
            y.attr('marker-end', 'url(' + T + '#' + a + '_' + i + '-barbEnd)');
            break;
          case 'arrow_circle':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-circleEnd)'
            );
            break;
          case 'aggregation':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-aggregationEnd)'
            );
            break;
          case 'extension':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-extensionEnd)'
            );
            break;
          case 'composition':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-compositionEnd)'
            );
            break;
          case 'dependency':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-dependencyEnd)'
            );
            break;
          case 'lollipop':
            y.attr(
              'marker-end',
              'url(' + T + '#' + a + '_' + i + '-lollipopEnd)'
            );
            break;
          default:
        }
        let b = {};
        return l && (b.updatedPath = s), (b.originalPath = r.points), b;
      });
  });
var HP,
  GP,
  jP = f(() => {
    'use strict';
    BN();
    g0();
    UN();
    Zp();
    fP();
    OP();
    MP();
    qP();
    xe();
    (HP = async (t, e, r, n, i) => {
      k.info('Graph in recursive render: XXX', bn(e), i);
      let o = e.graph().rankdir;
      k.trace('Dir in recursive render - dir:', o);
      let a = t.insert('g').attr('class', 'root');
      e.nodes()
        ? k.info('Recursive render XXX', e.nodes())
        : k.info('No nodes found for', e),
        e.edges().length > 0 &&
          k.trace('Recursive edges', e.edge(e.edges()[0]));
      let s = a.insert('g').attr('class', 'clusters'),
        l = a.insert('g').attr('class', 'edgePaths'),
        c = a.insert('g').attr('class', 'edgeLabels'),
        u = a.insert('g').attr('class', 'nodes');
      await Promise.all(
        e.nodes().map(async function (p) {
          let d = e.node(p);
          if (i !== void 0) {
            let m = JSON.parse(JSON.stringify(i.clusterData));
            k.info('Setting data for cluster XXX (', p, ') ', m, i),
              e.setNode(i.id, m),
              e.parent(p) ||
                (k.trace('Setting parent', p, i.id), e.setParent(p, i.id, m));
          }
          if (
            (k.info('(Insert) Node XXX' + p + ': ' + JSON.stringify(e.node(p))),
            d && d.clusterNode)
          ) {
            k.info('Cluster identified', p, d.width, e.node(p));
            let m = await HP(u, d.graph, r, n, e.node(p)),
              g = m.elem;
            oe(d, g),
              (d.diff = m.diff || 0),
              k.info('Node bounds (abc123)', p, d, d.width, d.x, d.y),
              LP(g, d),
              k.warn('Recursive render complete ', g, d);
          } else e.children(p).length > 0 ? (k.info('Cluster - the non recursive path XXX', p, d.id, d, e), k.info(Is(d.id, e)), (Tt[d.id] = { id: Is(d.id, e), node: d })) : (k.info('Node - the non recursive path', p, d.id, d), await AP(u, e.node(p), o));
        })
      ),
        e.edges().forEach(function (p) {
          let d = e.edge(p.v, p.w, p.name);
          k.info('Edge ' + p.v + ' -> ' + p.w + ': ' + JSON.stringify(p)),
            k.info(
              'Edge ' + p.v + ' -> ' + p.w + ': ',
              p,
              ' ',
              JSON.stringify(e.edge(p))
            ),
            k.info(
              'Fix',
              Tt,
              'ids:',
              p.v,
              p.w,
              'Translateing: ',
              Tt[p.v],
              Tt[p.w]
            ),
            zP(c, d);
        }),
        e.edges().forEach(function (p) {
          k.info('Edge ' + p.v + ' -> ' + p.w + ': ' + JSON.stringify(p));
        }),
        k.info('#############################################'),
        k.info('###                Layout                 ###'),
        k.info('#############################################'),
        k.info(e),
        m0(e),
        k.info('Graph after layout:', bn(e));
      let h = 0;
      return (
        uP(e).forEach(function (p) {
          let d = e.node(p);
          k.info('Position ' + p + ': ' + JSON.stringify(e.node(p))),
            k.info(
              'Position ' + p + ': (' + d.x,
              ',' + d.y,
              ') width: ',
              d.width,
              ' height: ',
              d.height
            ),
            d && d.clusterNode
              ? mb(d)
              : e.children(p).length > 0
              ? (NP(s, d), (Tt[d.id].node = d))
              : mb(d);
        }),
        e.edges().forEach(function (p) {
          let d = e.edge(p);
          k.info('Edge ' + p.v + ' -> ' + p.w + ': ' + JSON.stringify(d), d);
          let m = WP(l, p, d, Tt, r, e, n);
          $P(d, m);
        }),
        e.nodes().forEach(function (p) {
          let d = e.node(p);
          k.info(p, d.type, d.diff), d.type === 'group' && (h = d.diff);
        }),
        { elem: a, diff: h }
      );
    }),
      (GP = async (t, e, r, n, i) => {
        DN(t, r, n, i),
          IP(),
          UP(),
          FP(),
          iP(),
          k.warn('Graph at first:', JSON.stringify(bn(e))),
          sP(e),
          k.warn('Graph after:', JSON.stringify(bn(e))),
          await HP(t, e, n, i);
      });
  });
function YP(t, e) {
  e && t.attr('style', e);
}
var VP = f(() => {});
function XP(t, e) {
  var r = t.append('foreignObject').attr('width', '100000'),
    n = r.append('xhtml:div');
  n.attr('xmlns', 'http://www.w3.org/1999/xhtml');
  var i = e.label;
  switch (typeof i) {
    case 'function':
      n.insert(i);
      break;
    case 'object':
      n.insert(function () {
        return i;
      });
      break;
    default:
      n.html(i);
  }
  YP(n, e.labelStyle),
    n.style('display', 'inline-block'),
    n.style('white-space', 'nowrap');
  var o = n.node().getBoundingClientRect();
  return r.attr('width', o.width).attr('height', o.height), r;
}
var KP = f(() => {
  VP();
});
var ZP,
  BJ,
  QP,
  JP,
  PJ,
  DJ,
  tD,
  eD = f(() => {
    'use strict';
    Un();
    gn();
    Ar();
    gs();
    jP();
    KP();
    xe();
    en();
    gs();
    Tp();
    (ZP = {}),
      (BJ = function (t) {
        let e = Object.keys(t);
        for (let r of e) ZP[r] = t[r];
      }),
      (QP = function (t, e, r, n, i, o) {
        let a = n.select(`[id="${r}"]`);
        Object.keys(t).forEach(function (l) {
          let c = t[l],
            u = 'default';
          c.classes.length > 0 && (u = c.classes.join(' ')),
            (u = u + ' flowchart-label');
          let h = mc(c.styles),
            p = c.text !== void 0 ? c.text : c.id,
            d;
          if ((k.info('vertex', c, c.labelType), c.labelType === 'markdown'))
            k.info('vertex', c, c.labelType);
          else if (ie(rt().flowchart.htmlLabels)) {
            let E = {
              label: p.replace(
                /fa[blrs]?:fa-[\w-]+/g,
                (y) => `<i class='${y.replace(':', ' ')}'></i>`
              ),
            };
            (d = XP(a, E).node()), d.parentNode.removeChild(d);
          } else {
            let E = i.createElementNS('http://www.w3.org/2000/svg', 'text');
            E.setAttribute('style', h.labelStyle.replace('color:', 'fill:'));
            let y = p.split(li.lineBreakRegex);
            for (let T of y) {
              let b = i.createElementNS('http://www.w3.org/2000/svg', 'tspan');
              b.setAttributeNS(
                'http://www.w3.org/XML/1998/namespace',
                'xml:space',
                'preserve'
              ),
                b.setAttribute('dy', '1em'),
                b.setAttribute('x', '1'),
                (b.textContent = T),
                E.appendChild(b);
            }
            d = E;
          }
          let m = 0,
            g = '';
          switch (c.type) {
            case 'round':
              (m = 5), (g = 'rect');
              break;
            case 'square':
              g = 'rect';
              break;
            case 'diamond':
              g = 'question';
              break;
            case 'hexagon':
              g = 'hexagon';
              break;
            case 'odd':
              g = 'rect_left_inv_arrow';
              break;
            case 'lean_right':
              g = 'lean_right';
              break;
            case 'lean_left':
              g = 'lean_left';
              break;
            case 'trapezoid':
              g = 'trapezoid';
              break;
            case 'inv_trapezoid':
              g = 'inv_trapezoid';
              break;
            case 'odd_right':
              g = 'rect_left_inv_arrow';
              break;
            case 'circle':
              g = 'circle';
              break;
            case 'ellipse':
              g = 'ellipse';
              break;
            case 'stadium':
              g = 'stadium';
              break;
            case 'subroutine':
              g = 'subroutine';
              break;
            case 'cylinder':
              g = 'cylinder';
              break;
            case 'group':
              g = 'rect';
              break;
            case 'doublecircle':
              g = 'doublecircle';
              break;
            default:
              g = 'rect';
          }
          e.setNode(c.id, {
            labelStyle: h.labelStyle,
            shape: g,
            labelText: p,
            labelType: c.labelType,
            rx: m,
            ry: m,
            class: u,
            style: h.style,
            id: c.id,
            link: c.link,
            linkTarget: c.linkTarget,
            tooltip: o.db.getTooltip(c.id) || '',
            domId: o.db.lookUpDomId(c.id),
            haveCallback: c.haveCallback,
            width: c.type === 'group' ? 500 : void 0,
            dir: c.dir,
            type: c.type,
            props: c.props,
            padding: rt().flowchart.padding,
          }),
            k.info('setNode', {
              labelStyle: h.labelStyle,
              labelType: c.labelType,
              shape: g,
              labelText: p,
              rx: m,
              ry: m,
              class: u,
              style: h.style,
              id: c.id,
              domId: o.db.lookUpDomId(c.id),
              width: c.type === 'group' ? 500 : void 0,
              type: c.type,
              dir: c.dir,
              props: c.props,
              padding: rt().flowchart.padding,
            });
        });
      }),
      (JP = function (t, e, r) {
        k.info('abc78 edges = ', t);
        let n = 0,
          i = {},
          o,
          a;
        if (t.defaultStyle !== void 0) {
          let s = mc(t.defaultStyle);
          (o = s.style), (a = s.labelStyle);
        }
        t.forEach(function (s) {
          n++;
          let l = 'L-' + s.start + '-' + s.end;
          i[l] === void 0
            ? ((i[l] = 0), k.info('abc78 new entry', l, i[l]))
            : (i[l]++, k.info('abc78 new entry', l, i[l]));
          let c = l + '-' + i[l];
          k.info('abc78 new link id to be used is', l, c, i[l]);
          let u = 'LS-' + s.start,
            h = 'LE-' + s.end,
            p = { style: '', labelStyle: '' };
          switch (
            ((p.minlen = s.length || 1),
            s.type === 'arrow_open'
              ? (p.arrowhead = 'none')
              : (p.arrowhead = 'normal'),
            (p.arrowTypeStart = 'arrow_open'),
            (p.arrowTypeEnd = 'arrow_open'),
            s.type)
          ) {
            case 'double_arrow_cross':
              p.arrowTypeStart = 'arrow_cross';
            case 'arrow_cross':
              p.arrowTypeEnd = 'arrow_cross';
              break;
            case 'double_arrow_point':
              p.arrowTypeStart = 'arrow_point';
            case 'arrow_point':
              p.arrowTypeEnd = 'arrow_point';
              break;
            case 'double_arrow_circle':
              p.arrowTypeStart = 'arrow_circle';
            case 'arrow_circle':
              p.arrowTypeEnd = 'arrow_circle';
              break;
          }
          let d = '',
            m = '';
          switch (s.stroke) {
            case 'normal':
              (d = 'fill:none;'),
                o !== void 0 && (d = o),
                a !== void 0 && (m = a),
                (p.thickness = 'normal'),
                (p.pattern = 'solid');
              break;
            case 'dotted':
              (p.thickness = 'normal'),
                (p.pattern = 'dotted'),
                (p.style = 'fill:none;stroke-width:2px;stroke-dasharray:3;');
              break;
            case 'thick':
              (p.thickness = 'thick'),
                (p.pattern = 'solid'),
                (p.style = 'stroke-width: 3.5px;fill:none;');
              break;
            case 'invisible':
              (p.thickness = 'invisible'),
                (p.pattern = 'solid'),
                (p.style = 'stroke-width: 0;fill:none;');
              break;
          }
          if (s.style !== void 0) {
            let g = mc(s.style);
            (d = g.style), (m = g.labelStyle);
          }
          (p.style = p.style += d),
            (p.labelStyle = p.labelStyle += m),
            s.interpolate !== void 0
              ? (p.curve = dc(s.interpolate, si))
              : t.defaultInterpolate !== void 0
              ? (p.curve = dc(t.defaultInterpolate, si))
              : (p.curve = dc(ZP.curve, si)),
            s.text === void 0
              ? s.style !== void 0 && (p.arrowheadStyle = 'fill: #333')
              : ((p.arrowheadStyle = 'fill: #333'), (p.labelpos = 'c')),
            (p.labelType = s.labelType),
            (p.label = s.text.replace(
              li.lineBreakRegex,
              `
`
            )),
            s.style === void 0 &&
              (p.style =
                p.style || 'stroke: #333; stroke-width: 1.5px;fill:none;'),
            (p.labelStyle = p.labelStyle.replace('color:', 'fill:')),
            (p.id = c),
            (p.classes = 'flowchart-link ' + u + ' ' + h),
            e.setEdge(s.start, s.end, p, n);
        });
      }),
      (PJ = function (t, e) {
        return e.db.getClasses();
      }),
      (DJ = async function (t, e, r, n) {
        k.info('Drawing flowchart');
        let i = n.db.getDirection();
        i === void 0 && (i = 'TD');
        let { securityLevel: o, flowchart: a } = rt(),
          s = a.nodeSpacing || 50,
          l = a.rankSpacing || 50,
          c;
        o === 'sandbox' && (c = ft('#i' + e));
        let u =
            o === 'sandbox'
              ? ft(c.nodes()[0].contentDocument.body)
              : ft('body'),
          h = o === 'sandbox' ? c.nodes()[0].contentDocument : document,
          p = new Vt({ multigraph: !0, compound: !0 })
            .setGraph({
              rankdir: i,
              nodesep: s,
              ranksep: l,
              marginx: 0,
              marginy: 0,
            })
            .setDefaultEdgeLabel(function () {
              return {};
            }),
          d,
          m = n.db.getSubGraphs();
        k.info('Subgraphs - ', m);
        for (let I = m.length - 1; I >= 0; I--)
          (d = m[I]),
            k.info('Subgraph - ', d),
            n.db.addVertex(
              d.id,
              { text: d.title, type: d.labelType },
              'group',
              void 0,
              d.classes,
              d.dir
            );
        let g = n.db.getVertices(),
          E = n.db.getEdges();
        k.info('Edges', E);
        let y = 0;
        for (y = m.length - 1; y >= 0; y--) {
          (d = m[y]), zg('cluster').append('text');
          for (let I = 0; I < d.nodes.length; I++)
            k.info('Setting up subgraphs', d.nodes[I], d.id),
              p.setParent(d.nodes[I], d.id);
        }
        QP(g, p, e, u, h, n), JP(E, p, n);
        let T = u.select(`[id="${e}"]`),
          b = u.select('#' + e + ' g');
        if (
          (await GP(b, p, ['point', 'circle', 'cross'], 'flowchart', e),
          ur.insertTitle(
            T,
            'flowchartTitleText',
            a.titleTopMargin,
            n.db.getDiagramTitle()
          ),
          Cp(p, T, a.diagramPadding, a.useMaxWidth),
          n.db.indexNodes('subGraph' + y),
          !a.htmlLabels)
        ) {
          let I = h.querySelectorAll('[id="' + e + '"] .edgeLabel .label');
          for (let A of I) {
            let O = A.getBBox(),
              D = h.createElementNS('http://www.w3.org/2000/svg', 'rect');
            D.setAttribute('rx', 0),
              D.setAttribute('ry', 0),
              D.setAttribute('width', O.width),
              D.setAttribute('height', O.height),
              A.insertBefore(D, A.firstChild);
          }
        }
        Object.keys(g).forEach(function (I) {
          let A = g[I];
          if (A.link) {
            let O = ft('#' + e + ' [id="' + I + '"]');
            if (O) {
              let D = h.createElementNS('http://www.w3.org/2000/svg', 'a');
              D.setAttributeNS(
                'http://www.w3.org/2000/svg',
                'class',
                A.classes.join(' ')
              ),
                D.setAttributeNS('http://www.w3.org/2000/svg', 'href', A.link),
                D.setAttributeNS(
                  'http://www.w3.org/2000/svg',
                  'rel',
                  'noopener'
                ),
                o === 'sandbox'
                  ? D.setAttributeNS(
                      'http://www.w3.org/2000/svg',
                      'target',
                      '_top'
                    )
                  : A.linkTarget &&
                    D.setAttributeNS(
                      'http://www.w3.org/2000/svg',
                      'target',
                      A.linkTarget
                    );
              let J = O.insert(function () {
                  return D;
                }, ':first-child'),
                st = O.select('.label-container');
              st &&
                J.append(function () {
                  return st.node();
                });
              let R = O.select('.label');
              R &&
                J.append(function () {
                  return R.node();
                });
            }
          }
        });
      }),
      (tD = {
        setConf: BJ,
        addVertices: QP,
        addEdges: JP,
        getClasses: PJ,
        draw: DJ,
      });
  });
var rD = {};
Ed(rD, { diagram: () => UJ });
var UJ,
  nD = f(() => {
    'use strict';
    cR();
    $y();
    fR();
    eD();
    UJ = { parser: lR, db: fr, renderer: tD, styles: uR };
  });
var iD,
  zJ,
  $J,
  WJ,
  bF,
  _F = f(() => {
    (iD = 'osint'),
      (zJ = (t) => t.match(/^\s*osint[^-]/) !== null),
      ($J = async () => {
        let { diagram: t } = await Promise.resolve().then(() => (nD(), rD));
        return { id: iD, diagram: t };
      }),
      (WJ = { id: iD, detector: zJ, loader: $J }),
      (bF = WJ);
  });
_F();
export { bF as default };
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

dompurify/dist/purify.js:
  (*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE *)

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
