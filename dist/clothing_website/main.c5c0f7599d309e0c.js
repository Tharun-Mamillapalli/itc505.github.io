"use strict";
(self.webpackChunkclothing_website =
  self.webpackChunkclothing_website || []).push([
  [179],
  {
    908: () => {
      function oe(e) {
        return "function" == typeof e;
      }
      function wo(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ui = wo(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Eo(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class mt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (oe(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ui ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  _f(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ui ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ui(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) _f(t);
            else {
              if (t instanceof mt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Eo(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Eo(n, t), t instanceof mt && t._removeParent(this);
        }
      }
      mt.EMPTY = (() => {
        const e = new mt();
        return (e.closed = !0), e;
      })();
      const yf = mt.EMPTY;
      function vf(e) {
        return (
          e instanceof mt ||
          (e && "closed" in e && oe(e.remove) && oe(e.add) && oe(e.unsubscribe))
        );
      }
      function _f(e) {
        oe(e) ? e() : e.unsubscribe();
      }
      const qn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Bi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Bi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Bi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Df(e) {
        Bi.setTimeout(() => {
          const { onUnhandledError: t } = qn;
          if (!t) throw e;
          t(e);
        });
      }
      function Cf() {}
      const nw = rl("C", void 0, void 0);
      function rl(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Kn = null;
      function Hi(e) {
        if (qn.useDeprecatedSynchronousErrorHandling) {
          const t = !Kn;
          if ((t && (Kn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Kn;
            if (((Kn = null), n)) throw r;
          }
        } else e();
      }
      class ol extends mt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), vf(t) && t.add(this))
              : (this.destination = uw);
        }
        static create(t, n, r) {
          return new bo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? sl(
                (function ow(e) {
                  return rl("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? sl(
                (function rw(e) {
                  return rl("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? sl(nw, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const sw = Function.prototype.bind;
      function il(e, t) {
        return sw.call(e, t);
      }
      class aw {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              zi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              zi(r);
            }
          else zi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              zi(n);
            }
        }
      }
      class bo extends ol {
        constructor(t, n, r) {
          let o;
          if ((super(), oe(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && qn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && il(t.next, i),
                  error: t.error && il(t.error, i),
                  complete: t.complete && il(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new aw(o);
        }
      }
      function zi(e) {
        qn.useDeprecatedSynchronousErrorHandling
          ? (function iw(e) {
              qn.useDeprecatedSynchronousErrorHandling &&
                Kn &&
                ((Kn.errorThrown = !0), (Kn.error = e));
            })(e)
          : Df(e);
      }
      function sl(e, t) {
        const { onStoppedNotification: n } = qn;
        n && Bi.setTimeout(() => n(e, t));
      }
      const uw = {
          closed: !0,
          next: Cf,
          error: function lw(e) {
            throw e;
          },
          complete: Cf,
        },
        al =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Yn(e) {
        return e;
      }
      function wf(e) {
        return 0 === e.length
          ? Yn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let me = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function fw(e) {
              return (
                (e && e instanceof ol) ||
                ((function dw(e) {
                  return e && oe(e.next) && oe(e.error) && oe(e.complete);
                })(e) &&
                  vf(e))
              );
            })(n)
              ? n
              : new bo(n, r, o);
            return (
              Hi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Ef(r))((o, i) => {
              const s = new bo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [al]() {
            return this;
          }
          pipe(...n) {
            return wf(n)(this);
          }
          toPromise(n) {
            return new (n = Ef(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Ef(e) {
        var t;
        return null !== (t = e ?? qn.Promise) && void 0 !== t ? t : Promise;
      }
      const hw = wo(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let an = (() => {
        class e extends me {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new bf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new hw();
          }
          next(n) {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Hi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? yf
              : ((this.currentObservers = null),
                i.push(n),
                new mt(() => {
                  (this.currentObservers = null), Eo(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new me();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new bf(t, n)), e;
      })();
      class bf extends an {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : yf;
        }
      }
      function Sf(e) {
        return oe(e?.lift);
      }
      function Pe(e) {
        return (t) => {
          if (Sf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Re(e, t, n, r, o) {
        return new pw(e, t, n, r, o);
      }
      class pw extends ol {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function z(e, t) {
        return Pe((n, r) => {
          let o = 0;
          n.subscribe(
            Re(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Tn(e) {
        return this instanceof Tn ? ((this.v = e), this) : new Tn(e);
      }
      function Tf(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function dl(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Rf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function xf(e) {
        return oe(e?.then);
      }
      function Nf(e) {
        return oe(e[al]);
      }
      function Ff(e) {
        return Symbol.asyncIterator && oe(e?.[Symbol.asyncIterator]);
      }
      function Pf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Of = (function kw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function kf(e) {
        return oe(e?.[Of]);
      }
      function Lf(e) {
        return (function Af(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof Tn
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Tn(n.read());
              if (o) return yield Tn(void 0);
              yield yield Tn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Vf(e) {
        return oe(e?.getReader);
      }
      function Tt(e) {
        if (e instanceof me) return e;
        if (null != e) {
          if (Nf(e))
            return (function Lw(e) {
              return new me((t) => {
                const n = e[al]();
                if (oe(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Rf(e))
            return (function Vw(e) {
              return new me((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (xf(e))
            return (function jw(e) {
              return new me((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Df);
              });
            })(e);
          if (Ff(e)) return jf(e);
          if (kf(e))
            return (function $w(e) {
              return new me((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Vf(e))
            return (function Uw(e) {
              return jf(Lf(e));
            })(e);
        }
        throw Pf(e);
      }
      function jf(e) {
        return new me((t) => {
          (function Bw(e, t) {
            var n, r, o, i;
            return (function Mf(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Tf(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function ln(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function ke(e, t, n = 1 / 0) {
        return oe(t)
          ? ke((r, o) => z((i, s) => t(r, i, o, s))(Tt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Pe((r, o) =>
              (function Hw(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    i && t.next(g), u++;
                    let m = !1;
                    Tt(n(g, c++)).subscribe(
                      Re(
                        t,
                        (v) => {
                          o?.(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (u--; l.length && u < r; ) {
                                const v = l.shift();
                                s ? ln(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Re(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function mr(e = 1 / 0) {
        return ke(Yn, e);
      }
      const Bt = new me((e) => e.complete());
      function fl(e) {
        return e[e.length - 1];
      }
      function $f(e) {
        return oe(fl(e)) ? e.pop() : void 0;
      }
      function So(e) {
        return (function Gw(e) {
          return e && oe(e.schedule);
        })(fl(e))
          ? e.pop()
          : void 0;
      }
      function Uf(e, t = 0) {
        return Pe((n, r) => {
          n.subscribe(
            Re(
              r,
              (o) => ln(r, e, () => r.next(o), t),
              () => ln(r, e, () => r.complete(), t),
              (o) => ln(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Bf(e, t = 0) {
        return Pe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Hf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new me((n) => {
          ln(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            ln(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Se(e, t) {
        return t
          ? (function Xw(e, t) {
              if (null != e) {
                if (Nf(e))
                  return (function qw(e, t) {
                    return Tt(e).pipe(Bf(t), Uf(t));
                  })(e, t);
                if (Rf(e))
                  return (function Yw(e, t) {
                    return new me((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (xf(e))
                  return (function Kw(e, t) {
                    return Tt(e).pipe(Bf(t), Uf(t));
                  })(e, t);
                if (Ff(e)) return Hf(e, t);
                if (kf(e))
                  return (function Zw(e, t) {
                    return new me((n) => {
                      let r;
                      return (
                        ln(n, t, () => {
                          (r = e[Of]()),
                            ln(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => oe(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Vf(e))
                  return (function Qw(e, t) {
                    return Hf(Lf(e), t);
                  })(e, t);
              }
              throw Pf(e);
            })(e, t)
          : Tt(e);
      }
      function hl(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new bo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function re(e) {
        for (let t in e) if (e[t] === re) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function pl(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function ie(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ie).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function gl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const tE = re({ __forward_ref__: re });
      function se(e) {
        return (
          (e.__forward_ref__ = se),
          (e.toString = function () {
            return ie(this());
          }),
          e
        );
      }
      function F(e) {
        return ml(e) ? e() : e;
      }
      function ml(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(tE) &&
          e.__forward_ref__ === se
        );
      }
      function yl(e) {
        return e && !!e.ɵproviders;
      }
      const zf = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(t, n) {
          super(Gi(t, n)), (this.code = t);
        }
      }
      function Gi(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function V(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Wi(e, t) {
        throw new C(-201, !1);
      }
      function yt(e, t) {
        null == e &&
          (function ee(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function R(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function vt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function qi(e) {
        return Gf(e, Ki) || Gf(e, qf);
      }
      function Gf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Wf(e) {
        return e && (e.hasOwnProperty(vl) || e.hasOwnProperty(uE))
          ? e[vl]
          : null;
      }
      const Ki = re({ ɵprov: re }),
        vl = re({ ɵinj: re }),
        qf = re({ ngInjectableDef: re }),
        uE = re({ ngInjectorDef: re });
      var P = (() => (
        ((P = P || {})[(P.Default = 0)] = "Default"),
        (P[(P.Host = 1)] = "Host"),
        (P[(P.Self = 2)] = "Self"),
        (P[(P.SkipSelf = 4)] = "SkipSelf"),
        (P[(P.Optional = 8)] = "Optional"),
        P
      ))();
      let _l;
      function _t(e) {
        const t = _l;
        return (_l = e), t;
      }
      function Kf(e, t, n) {
        const r = qi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & P.Optional
          ? null
          : void 0 !== t
          ? t
          : void Wi(ie(e));
      }
      const le = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Mo = {},
        Dl = "__NG_DI_FLAG__",
        Yi = "ngTempTokenPath",
        dE = "ngTokenPath",
        fE = /\n/gm,
        hE = "\u0275",
        Yf = "__source";
      let Io;
      function yr(e) {
        const t = Io;
        return (Io = e), t;
      }
      function pE(e, t = P.Default) {
        if (void 0 === Io) throw new C(-203, !1);
        return null === Io
          ? Kf(e, void 0, t)
          : Io.get(e, t & P.Optional ? null : void 0, t);
      }
      function A(e, t = P.Default) {
        return (
          (function cE() {
            return _l;
          })() || pE
        )(F(e), t);
      }
      function G(e, t = P.Default) {
        return A(e, Zi(t));
      }
      function Zi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Cl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = F(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = P.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = gE(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(A(o, i));
          } else t.push(A(r));
        }
        return t;
      }
      function Ao(e, t) {
        return (e[Dl] = t), (e.prototype[Dl] = t), e;
      }
      function gE(e) {
        return e[Dl];
      }
      function un(e) {
        return { toString: e }.toString();
      }
      var Ht = (() => (
          ((Ht = Ht || {})[(Ht.OnPush = 0)] = "OnPush"),
          (Ht[(Ht.Default = 1)] = "Default"),
          Ht
        ))(),
        zt = (() => {
          return (
            ((e = zt || (zt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            zt
          );
          var e;
        })();
      const cn = {},
        Q = [],
        Qi = re({ ɵcmp: re }),
        wl = re({ ɵdir: re }),
        El = re({ ɵpipe: re }),
        Qf = re({ ɵmod: re }),
        dn = re({ ɵfac: re }),
        To = re({ __NG_ELEMENT_ID__: re });
      let vE = 0;
      function Gt(e) {
        return un(() => {
          const t = Jf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ht.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || zt.Emulated,
              id: "c" + vE++,
              styles: e.styles || Q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          eh(n);
          const r = e.dependencies;
          return (n.directiveDefs = Xi(r, !1)), (n.pipeDefs = Xi(r, !0)), n;
        });
      }
      function DE(e) {
        return te(e) || Ue(e);
      }
      function CE(e) {
        return null !== e;
      }
      function Rt(e) {
        return un(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Q,
          declarations: e.declarations || Q,
          imports: e.imports || Q,
          exports: e.exports || Q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Xf(e, t) {
        if (null == e) return cn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function L(e) {
        return un(() => {
          const t = Jf(e);
          return eh(t), t;
        });
      }
      function te(e) {
        return e[Qi] || null;
      }
      function Ue(e) {
        return e[wl] || null;
      }
      function rt(e) {
        return e[El] || null;
      }
      function ut(e, t) {
        const n = e[Qf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ie(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Jf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Xf(e.inputs, t),
          outputs: Xf(e.outputs),
        };
      }
      function eh(e) {
        e.features?.forEach((t) => t(e));
      }
      function Xi(e, t) {
        if (!e) return null;
        const n = t ? rt : DE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(CE);
      }
      const fn = 0,
        b = 1,
        B = 2,
        he = 3,
        xt = 4,
        Zn = 5,
        Be = 6,
        _r = 7,
        ye = 8,
        Ji = 9,
        es = 10,
        W = 11,
        bl = 12,
        Ro = 13,
        th = 14,
        Dr = 15,
        He = 16,
        xo = 17,
        Cr = 18,
        Wt = 19,
        No = 20,
        nh = 21,
        ue = 22,
        Sl = 1,
        rh = 2,
        ts = 7,
        ns = 8,
        wr = 9,
        Ke = 10;
      function ct(e) {
        return Array.isArray(e) && "object" == typeof e[Sl];
      }
      function Nt(e) {
        return Array.isArray(e) && !0 === e[Sl];
      }
      function Ml(e) {
        return 0 != (4 & e.flags);
      }
      function Fo(e) {
        return e.componentOffset > -1;
      }
      function rs(e) {
        return 1 == (1 & e.flags);
      }
      function Ft(e) {
        return !!e.template;
      }
      function EE(e) {
        return 0 != (256 & e[B]);
      }
      function Qn(e, t) {
        return e.hasOwnProperty(dn) ? e[dn] : null;
      }
      class ME {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Dt() {
        return sh;
      }
      function sh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = AE), IE;
      }
      function IE() {
        const e = lh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === cn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function AE(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            lh(e) ||
            (function TE(e, t) {
              return (e[ah] = t);
            })(e, { previous: cn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new ME(l && l.currentValue, t, a === cn)), (e[r] = t);
      }
      Dt.ngInherit = !0;
      const ah = "__ngSimpleChanges__";
      function lh(e) {
        return e[ah] || null;
      }
      const Ct = function (e, t, n) {};
      function Le(e) {
        for (; Array.isArray(e); ) e = e[fn];
        return e;
      }
      function os(e, t) {
        return Le(t[e]);
      }
      function dt(e, t) {
        return Le(t[e.index]);
      }
      function dh(e, t) {
        return e.data[t];
      }
      function ot(e, t) {
        const n = t[e];
        return ct(n) ? n : n[fn];
      }
      function is(e) {
        return 64 == (64 & e[B]);
      }
      function xn(e, t) {
        return null == t ? null : e[t];
      }
      function fh(e) {
        e[Cr] = 0;
      }
      function Al(e, t) {
        e[Zn] += t;
        let n = e,
          r = e[he];
        for (
          ;
          null !== r && ((1 === t && 1 === n[Zn]) || (-1 === t && 0 === n[Zn]));

        )
          (r[Zn] += t), (n = r), (r = r[he]);
      }
      const j = { lFrame: wh(null), bindingsEnabled: !0 };
      function ph() {
        return j.bindingsEnabled;
      }
      function _() {
        return j.lFrame.lView;
      }
      function Y() {
        return j.lFrame.tView;
      }
      function br(e) {
        return (j.lFrame.contextLView = e), e[ye];
      }
      function Sr(e) {
        return (j.lFrame.contextLView = null), e;
      }
      function Ve() {
        let e = gh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function gh() {
        return j.lFrame.currentTNode;
      }
      function qt(e, t) {
        const n = j.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Tl() {
        return j.lFrame.isParent;
      }
      function Mr() {
        return j.lFrame.bindingIndex++;
      }
      function BE(e, t) {
        const n = j.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), xl(t);
      }
      function xl(e) {
        j.lFrame.currentDirectiveIndex = e;
      }
      function Fl(e) {
        j.lFrame.currentQueryIndex = e;
      }
      function zE(e) {
        const t = e[b];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Be] : null;
      }
      function Dh(e, t, n) {
        if (n & P.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & P.Host ||
              ((o = zE(i)), null === o || ((i = i[Dr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (j.lFrame = Ch());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Pl(e) {
        const t = Ch(),
          n = e[b];
        (j.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Ch() {
        const e = j.lFrame,
          t = null === e ? null : e.child;
        return null === t ? wh(e) : t;
      }
      function wh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Eh() {
        const e = j.lFrame;
        return (
          (j.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const bh = Eh;
      function Ol() {
        const e = Eh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ze() {
        return j.lFrame.selectedIndex;
      }
      function Xn(e) {
        j.lFrame.selectedIndex = e;
      }
      function de() {
        const e = j.lFrame;
        return dh(e.tView, e.selectedIndex);
      }
      function ss(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks ?? (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function as(e, t, n) {
        Sh(e, t, 3, n);
      }
      function ls(e, t, n, r) {
        (3 & e[B]) === n && Sh(e, t, n, r);
      }
      function kl(e, t) {
        let n = e[B];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[B] = n));
      }
      function Sh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[Cr] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[Cr] += 65536),
              (a < i || -1 == i) &&
                (JE(e, n, t, l), (e[Cr] = (4294901760 & e[Cr]) + l + 2)),
              l++;
      }
      function JE(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[B] >> 11 < e[Cr] >> 16 && (3 & e[B]) === t) {
            (e[B] += 2048), Ct(4, a, i);
            try {
              i.call(a);
            } finally {
              Ct(5, a, i);
            }
          }
        } else {
          Ct(4, a, i);
          try {
            i.call(a);
          } finally {
            Ct(5, a, i);
          }
        }
      }
      const Ir = -1;
      class Oo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Vl(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Ih(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Mh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Ih(e) {
        return 64 === e.charCodeAt(0);
      }
      function ko(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Ah(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Ah(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Th(e) {
        return e !== Ir;
      }
      function us(e) {
        return 32767 & e;
      }
      function cs(e, t) {
        let n = (function rb(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Dr]), n--;
        return r;
      }
      let jl = !0;
      function ds(e) {
        const t = jl;
        return (jl = e), t;
      }
      const Rh = 255,
        xh = 5;
      let ob = 0;
      const Kt = {};
      function fs(e, t) {
        const n = Nh(e, t);
        if (-1 !== n) return n;
        const r = t[b];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          $l(r.data, e),
          $l(t, null),
          $l(r.blueprint, null));
        const o = Ul(e, t),
          i = e.injectorIndex;
        if (Th(o)) {
          const s = us(o),
            a = cs(o, t),
            l = a[b].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function $l(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Nh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ul(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = jh(o)), null === r)) return Ir;
          if ((n++, (o = o[Dr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Ir;
      }
      function Bl(e, t, n) {
        !(function ib(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(To) && (r = n[To]),
            null == r && (r = n[To] = ob++);
          const o = r & Rh;
          t.data[e + (o >> xh)] |= 1 << o;
        })(e, t, n);
      }
      function Fh(e, t, n) {
        if (n & P.Optional || void 0 !== e) return e;
        Wi();
      }
      function Ph(e, t, n, r) {
        if (
          (n & P.Optional && void 0 === r && (r = null),
          !(n & (P.Self | P.Host)))
        ) {
          const o = e[Ji],
            i = _t(void 0);
          try {
            return o ? o.get(t, r, n & P.Optional) : Kf(t, r, n & P.Optional);
          } finally {
            _t(i);
          }
        }
        return Fh(r, 0, n);
      }
      function Oh(e, t, n, r = P.Default, o) {
        if (null !== e) {
          if (1024 & t[B]) {
            const s = (function cb(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[B] && !(256 & s[B]);

              ) {
                const a = kh(i, s, n, r | P.Self, Kt);
                if (a !== Kt) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[nh];
                  if (u) {
                    const c = u.get(n, Kt, r);
                    if (c !== Kt) return c;
                  }
                  (l = jh(s)), (s = s[Dr]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, Kt);
            if (s !== Kt) return s;
          }
          const i = kh(e, t, n, r, Kt);
          if (i !== Kt) return i;
        }
        return Ph(t, n, r, o);
      }
      function kh(e, t, n, r, o) {
        const i = (function lb(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(To) ? e[To] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Rh : ub) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Dh(t, e, r)) return r & P.Host ? Fh(o, 0, r) : Ph(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & P.Optional) return s;
            Wi();
          } finally {
            bh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Nh(e, t),
            l = Ir,
            u = r & P.Host ? t[He][Be] : null;
          for (
            (-1 === a || r & P.SkipSelf) &&
            ((l = -1 === a ? Ul(e, t) : t[a + 8]),
            l !== Ir && Vh(r, !1)
              ? ((s = t[b]), (a = us(l)), (t = cs(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[b];
            if (Lh(i, a, c.data)) {
              const d = ab(a, t, n, s, r, u);
              if (d !== Kt) return d;
            }
            (l = t[a + 8]),
              l !== Ir && Vh(r, t[b].data[a + 8] === u) && Lh(i, a, t)
                ? ((s = c), (a = us(l)), (t = cs(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function ab(e, t, n, r, o, i) {
        const s = t[b],
          a = s.data[e + 8],
          c = (function hs(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && Ft(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Fo(a) && jl : r != s && 0 != (3 & a.type),
            o & P.Host && i === a
          );
        return null !== c ? Jn(t, s, c, a) : Kt;
      }
      function Jn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function eb(e) {
            return e instanceof Oo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function nE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function J(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : V(e);
              })(i[n])
            );
          const a = ds(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? _t(s.injectImpl) : null;
          Dh(e, r, P.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function XE(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = sh(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && _t(l), ds(a), (s.resolving = !1), bh();
          }
        }
        return o;
      }
      function Lh(e, t, n) {
        return !!(n[t + (e >> xh)] & (1 << e));
      }
      function Vh(e, t) {
        return !(e & P.Self || (e & P.Host && t));
      }
      class Ar {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Oh(this._tNode, this._lView, t, Zi(r), n);
        }
      }
      function ub() {
        return new Ar(Ve(), _());
      }
      function je(e) {
        return un(() => {
          const t = e.prototype.constructor,
            n = t[dn] || Hl(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[dn] || Hl(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Hl(e) {
        return ml(e)
          ? () => {
              const t = Hl(F(e));
              return t && t();
            }
          : Qn(e);
      }
      function jh(e) {
        const t = e[b],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Be] : null;
      }
      const Rr = "__parameters__";
      function Nr(e, t, n) {
        return un(() => {
          const r = (function zl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Rr)
                ? l[Rr]
                : Object.defineProperty(l, Rr, { value: [] })[Rr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function er(e, t) {
        e.forEach((n) => (Array.isArray(n) ? er(n, t) : t(n)));
      }
      function Uh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function gs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ft(e, t, n) {
        let r = Fr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function pb(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Wl(e, t) {
        const n = Fr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Fr(e, t) {
        return (function Bh(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const $o = Ao(Nr("Optional"), 8),
        Uo = Ao(Nr("SkipSelf"), 4);
      var it = (() => (
        ((it = it || {})[(it.Important = 1)] = "Important"),
        (it[(it.DashCase = 2)] = "DashCase"),
        it
      ))();
      const Xl = new Map();
      let kb = 0;
      const eu = "__ngContext__";
      function ze(e, t) {
        ct(t)
          ? ((e[eu] = t[No]),
            (function Vb(e) {
              Xl.set(e[No], e);
            })(t))
          : (e[eu] = t);
      }
      let tu;
      function nu(e, t) {
        return tu(e, t);
      }
      function Go(e) {
        const t = e[he];
        return Nt(t) ? t[he] : t;
      }
      function ru(e) {
        return lp(e[Ro]);
      }
      function ou(e) {
        return lp(e[xt]);
      }
      function lp(e) {
        for (; null !== e && !Nt(e); ) e = e[xt];
        return e;
      }
      function Or(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Nt(r) ? (i = r) : ct(r) && ((s = !0), (r = r[fn]));
          const a = Le(r);
          0 === e && null !== n
            ? null == o
              ? pp(t, n, a)
              : tr(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? tr(t, n, a, o || null, !0)
            : 2 === e
            ? (function du(e, t, n) {
                const r = _s(e, t);
                r &&
                  (function o0(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function l0(e, t, n, r, o) {
                const i = n[ts];
                i !== Le(n) && Or(t, e, r, i, o);
                for (let a = Ke; a < n.length; a++) {
                  const l = n[a];
                  Wo(l[b], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function su(e, t, n) {
        return e.createElement(t, n);
      }
      function cp(e, t) {
        const n = e[wr],
          r = n.indexOf(t),
          o = t[he];
        512 & t[B] && ((t[B] &= -513), Al(o, -1)), n.splice(r, 1);
      }
      function au(e, t) {
        if (e.length <= Ke) return;
        const n = Ke + t,
          r = e[n];
        if (r) {
          const o = r[xo];
          null !== o && o !== e && cp(o, r), t > 0 && (e[n - 1][xt] = r[xt]);
          const i = gs(e, Ke + t);
          !(function Zb(e, t) {
            Wo(e, t, t[W], 2, null, null), (t[fn] = null), (t[Be] = null);
          })(r[b], r);
          const s = i[Wt];
          null !== s && s.detachView(i[b]),
            (r[he] = null),
            (r[xt] = null),
            (r[B] &= -65);
        }
        return r;
      }
      function dp(e, t) {
        if (!(128 & t[B])) {
          const n = t[W];
          n.destroyNode && Wo(e, t, n, 3, null, null),
            (function Jb(e) {
              let t = e[Ro];
              if (!t) return lu(e[b], e);
              for (; t; ) {
                let n = null;
                if (ct(t)) n = t[Ro];
                else {
                  const r = t[Ke];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[xt] && t !== e; )
                    ct(t) && lu(t[b], t), (t = t[he]);
                  null === t && (t = e), ct(t) && lu(t[b], t), (n = t && t[xt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function lu(e, t) {
        if (!(128 & t[B])) {
          (t[B] &= -65),
            (t[B] |= 128),
            (function r0(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Oo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        Ct(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          Ct(5, a, l);
                        }
                      }
                    else {
                      Ct(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        Ct(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function n0(e, t) {
              const n = e.cleanup,
                r = t[_r];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[_r] = null;
              }
            })(e, t),
            1 === t[b].type && t[W].destroy();
          const n = t[xo];
          if (null !== n && Nt(t[he])) {
            n !== t[he] && cp(n, t);
            const r = t[Wt];
            null !== r && r.detachView(e);
          }
          !(function jb(e) {
            Xl.delete(e[No]);
          })(t);
        }
      }
      function fp(e, t, n) {
        return (function hp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[fn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === zt.None || i === zt.Emulated) return null;
            }
            return dt(r, n);
          }
        })(e, t.parent, n);
      }
      function tr(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function pp(e, t, n) {
        e.appendChild(t, n);
      }
      function gp(e, t, n, r, o) {
        null !== r ? tr(e, t, n, r, o) : pp(e, t, n);
      }
      function _s(e, t) {
        return e.parentNode(t);
      }
      let uu,
        pu,
        Es,
        vp = function yp(e, t, n) {
          return 40 & e.type ? dt(e, n) : null;
        };
      function Ds(e, t, n, r) {
        const o = fp(e, r, t),
          i = t[W],
          a = (function mp(e, t, n) {
            return vp(e, t, n);
          })(r.parent || t[Be], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) gp(i, o, n[l], a, !1);
          else gp(i, o, n, a, !1);
        void 0 !== uu && uu(i, r, t, n, o);
      }
      function Cs(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return dt(t, e);
          if (4 & n) return cu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Cs(e, r);
            {
              const o = e[t.index];
              return Nt(o) ? cu(-1, o) : Le(o);
            }
          }
          if (32 & n) return nu(t, e)() || Le(e[t.index]);
          {
            const r = Dp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Cs(Go(e[He]), r)
              : Cs(e, t.next);
          }
        }
        return null;
      }
      function Dp(e, t) {
        return null !== t ? e[He][Be].projection[t.projection] : null;
      }
      function cu(e, t) {
        const n = Ke + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[b].firstChild;
          if (null !== o) return Cs(r, o);
        }
        return t[ts];
      }
      function fu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && ze(Le(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) fu(e, t, n.child, r, o, i, !1), Or(t, e, o, a, i);
            else if (32 & l) {
              const u = nu(n, r);
              let c;
              for (; (c = u()); ) Or(t, e, o, c, i);
              Or(t, e, o, a, i);
            } else 16 & l ? Cp(e, t, r, n, o, i) : Or(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Wo(e, t, n, r, o, i) {
        fu(n, r, e.firstChild, t, o, i, !1);
      }
      function Cp(e, t, n, r, o, i) {
        const s = n[He],
          l = s[Be].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Or(t, e, o, l[u], i);
        else fu(e, t, l, s[he], o, i, !0);
      }
      function wp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Ep(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Vl(e, t, r),
          null !== o && wp(e, t, o),
          null !== i &&
            (function c0(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      function Ip(e) {
        return (
          (function gu() {
            if (void 0 === Es && ((Es = null), le.trustedTypes))
              try {
                Es = le.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Es;
          })()?.createScriptURL(e) || e
        );
      }
      class Ap {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${zf})`;
        }
      }
      function Nn(e) {
        return e instanceof Ap ? e.changingThisBreaksApplicationSecurity : e;
      }
      function qo(e, t) {
        const n = (function D0(e) {
          return (e instanceof Ap && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${zf})`);
        }
        return n === t;
      }
      const b0 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Me = (() => (
        ((Me = Me || {})[(Me.NONE = 0)] = "NONE"),
        (Me[(Me.HTML = 1)] = "HTML"),
        (Me[(Me.STYLE = 2)] = "STYLE"),
        (Me[(Me.SCRIPT = 3)] = "SCRIPT"),
        (Me[(Me.URL = 4)] = "URL"),
        (Me[(Me.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        Me
      ))();
      function nr(e) {
        const t = Yo();
        return t
          ? t.sanitize(Me.URL, e) || ""
          : qo(e, "URL")
          ? Nn(e)
          : (function mu(e) {
              return (e = String(e)).match(b0) ? e : "unsafe:" + e;
            })(V(e));
      }
      function Op(e) {
        const t = Yo();
        if (t) return Ip(t.sanitize(Me.RESOURCE_URL, e) || "");
        if (qo(e, "ResourceURL")) return Ip(Nn(e));
        throw new C(904, !1);
      }
      function Yo() {
        const e = _();
        return e && e[bl];
      }
      const Ss = new S("ENVIRONMENT_INITIALIZER"),
        Lp = new S("INJECTOR", -1),
        Vp = new S("INJECTOR_DEF_TYPES");
      class jp {
        get(t, n = Mo) {
          if (n === Mo) {
            const r = new Error(`NullInjectorError: No provider for ${ie(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function V0(...e) {
        return { ɵproviders: $p(0, e), ɵfromNgModule: !0 };
      }
      function $p(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          er(t, (i) => {
            const s = i;
            Du(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Up(o, n),
          n
        );
      }
      function Up(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Cu(o, (i) => {
            t.push(i);
          });
        }
      }
      function Du(e, t, n, r) {
        if (!(e = F(e))) return !1;
        let o = null,
          i = Wf(e);
        const s = !i && te(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = Wf(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) Du(u, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                er(i.imports, (c) => {
                  Du(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Up(u, t);
            }
            if (!a) {
              const u = Qn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: u, deps: Q },
                { provide: Vp, useValue: o, multi: !0 },
                { provide: Ss, useValue: () => A(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              Cu(l, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Cu(e, t) {
        for (let n of e)
          yl(n) && (n = n.ɵproviders), Array.isArray(n) ? Cu(n, t) : t(n);
      }
      const j0 = re({ provide: String, useValue: re });
      function wu(e) {
        return null !== e && "object" == typeof e && j0 in e;
      }
      function rr(e) {
        return "function" == typeof e;
      }
      const Eu = new S("Set Injector scope."),
        Ms = {},
        U0 = {};
      let bu;
      function Is() {
        return void 0 === bu && (bu = new jp()), bu;
      }
      class Yt {}
      class zp extends Yt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Mu(t, (s) => this.processProvider(s)),
            this.records.set(Lp, Lr(void 0, this)),
            o.has("environment") && this.records.set(Yt, Lr(void 0, this));
          const i = this.records.get(Eu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Vp.multi, Q, P.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = yr(this),
            r = _t(void 0);
          try {
            return t();
          } finally {
            yr(n), _t(r);
          }
        }
        get(t, n = Mo, r = P.Default) {
          this.assertNotDestroyed(), (r = Zi(r));
          const o = yr(this),
            i = _t(void 0);
          try {
            if (!(r & P.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function W0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && qi(t);
                (a = l && this.injectableDefInScope(l) ? Lr(Su(t), Ms) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & P.Self ? Is() : this.parent).get(
              t,
              (n = r & P.Optional && n === Mo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Yi] = s[Yi] || []).unshift(ie(t)), o)) throw s;
              return (function mE(e, t, n, r) {
                const o = e[Yi];
                throw (
                  (t[Yf] && o.unshift(t[Yf]),
                  (e.message = (function yE(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == hE
                        ? e.slice(2)
                        : e;
                    let o = ie(t);
                    if (Array.isArray(t)) o = t.map(ie).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ie(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      fE,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[dE] = o),
                  (e[Yi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            _t(i), yr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = yr(this),
            n = _t(void 0);
          try {
            const r = this.get(Ss.multi, Q, P.Self);
            for (const o of r) o();
          } finally {
            yr(t), _t(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ie(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = rr((t = F(t))) ? t : F(t && t.provide);
          const r = (function H0(e) {
            return wu(e) ? Lr(void 0, e.useValue) : Lr(Gp(e), Ms);
          })(t);
          if (rr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Lr(void 0, Ms, !0)),
              (o.factory = () => Cl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Ms && ((n.value = U0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function G0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = F(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Su(e) {
        const t = qi(e),
          n = null !== t ? t.factory : Qn(e);
        if (null !== n) return n;
        if (e instanceof S) throw new C(204, !1);
        if (e instanceof Function)
          return (function B0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function jo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function lE(e) {
              return (e && (e[Ki] || e[qf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Gp(e, t, n) {
        let r;
        if (rr(e)) {
          const o = F(e);
          return Qn(o) || Su(o);
        }
        if (wu(e)) r = () => F(e.useValue);
        else if (
          (function Hp(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Cl(e.deps || []));
        else if (
          (function Bp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => A(F(e.useExisting));
        else {
          const o = F(e && (e.useClass || e.provide));
          if (
            !(function z0(e) {
              return !!e.deps;
            })(e)
          )
            return Qn(o) || Su(o);
          r = () => new o(...Cl(e.deps));
        }
        return r;
      }
      function Lr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Mu(e, t) {
        for (const n of e)
          Array.isArray(n) ? Mu(n, t) : n && yl(n) ? Mu(n.ɵproviders, t) : t(n);
      }
      class q0 {}
      class Wp {}
      class Y0 {
        resolveComponentFactory(t) {
          throw (function K0(e) {
            const t = Error(
              `No component factory found for ${ie(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Zo = (() => {
        class e {}
        return (e.NULL = new Y0()), e;
      })();
      function Z0() {
        return Vr(Ve(), _());
      }
      function Vr(e, t) {
        return new ht(dt(e, t));
      }
      let ht = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Z0), e;
      })();
      class Kp {}
      let mn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function X0() {
                const e = _(),
                  n = ot(Ve().index, e);
                return (ct(n) ? n : e)[W];
              })()),
            e
          );
        })(),
        J0 = (() => {
          class e {}
          return (
            (e.ɵprov = R({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Qo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const eS = new Qo("15.2.10"),
        Iu = {},
        Au = "ngOriginalError";
      function Tu(e) {
        return e[Au];
      }
      class jr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Tu(t);
          for (; n && Tu(n); ) n = Tu(n);
          return n || null;
        }
      }
      function yn(e) {
        return e instanceof Function ? e() : e;
      }
      function Zp(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Qp = "ng-template";
      function dS(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Zp(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Xp(e) {
        return 4 === e.type && e.value !== Qp;
      }
      function fS(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Qp);
      }
      function hS(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function mS(e) {
            for (let t = 0; t < e.length; t++) if (Mh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !fS(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (Pt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!dS(e.attrs, u, n)) {
                    if (Pt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = pS(8 & r ? "class" : l, o, Xp(e), n);
                if (-1 === d) {
                  if (Pt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Zp(h, u, 0)) || (2 & r && u !== f)) {
                    if (Pt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Pt(r) && !Pt(l)) return !1;
            if (s && Pt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Pt(r) || s;
      }
      function Pt(e) {
        return 0 == (1 & e);
      }
      function pS(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function yS(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Jp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (hS(e, t[r], n)) return !0;
        return !1;
      }
      function eg(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function _S(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Pt(s) && ((t += eg(i, o)), (o = "")),
              (r = s),
              (i = i || !Pt(r));
          n++;
        }
        return "" !== o && (t += eg(i, o)), t;
      }
      const $ = {};
      function Z(e) {
        tg(Y(), _(), Ze() + e, !1);
      }
      function tg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[B])) {
            const i = e.preOrderCheckHooks;
            null !== i && as(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && ls(t, i, 0, n);
          }
        Xn(n);
      }
      function ig(e, t = null, n = null, r) {
        const o = sg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function sg(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Q, V0(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ie(e))),
          new zp(i, t || Is(), r || null, o)
        );
      }
      let Zt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return ig({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return ig({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Mo),
          (e.NULL = new jp()),
          (e.ɵprov = R({ token: e, providedIn: "any", factory: () => A(Lp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function D(e, t = P.Default) {
        const n = _();
        return null === n ? A(e, t) : Oh(Ve(), n, F(e), t);
      }
      function pg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Fl(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ts(e, t, n, r, o, i, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[fn] = o),
          (d[B] = 76 | r),
          (null !== c || (e && 1024 & e[B])) && (d[B] |= 1024),
          fh(d),
          (d[he] = d[Dr] = e),
          (d[ye] = n),
          (d[es] = s || (e && e[es])),
          (d[W] = a || (e && e[W])),
          (d[bl] = l || (e && e[bl]) || null),
          (d[Ji] = u || (e && e[Ji]) || null),
          (d[Be] = i),
          (d[No] = (function Lb() {
            return kb++;
          })()),
          (d[nh] = c),
          (d[He] = 2 == t.type ? e[He] : d),
          d
        );
      }
      function Br(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Pu(e, t, n, r, o) {
            const i = gh(),
              s = Tl(),
              l = (e.data[t] = (function GS(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && ((i.next = l), (l.prev = i))),
              l
            );
          })(e, t, n, r, o)),
            (function UE() {
              return j.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Po() {
            const e = j.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return qt(i, !0), i;
      }
      function Xo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Ou(e, t, n) {
        Pl(t);
        try {
          const r = e.viewQuery;
          null !== r && zu(1, r, n);
          const o = e.template;
          null !== o && gg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && pg(e, t),
            e.staticViewQueries && zu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function BS(e, t) {
              for (let n = 0; n < t.length; n++) dM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[B] &= -5), Ol();
        }
      }
      function Rs(e, t, n, r) {
        const o = t[B];
        if (128 != (128 & o)) {
          Pl(t);
          try {
            fh(t),
              (function yh(e) {
                return (j.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && gg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && as(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && ls(t, u, 0, null), kl(t, 0);
            }
            if (
              ((function uM(e) {
                for (let t = ru(e); null !== t; t = ou(t)) {
                  if (!t[rh]) continue;
                  const n = t[wr];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[B] || Al(o[he], 1), (o[B] |= 512);
                  }
                }
              })(t),
              (function lM(e) {
                for (let t = ru(e); null !== t; t = ou(t))
                  for (let n = Ke; n < t.length; n++) {
                    const r = t[n],
                      o = r[b];
                    is(r) && Rs(o, r, o.template, r[ye]);
                  }
              })(t),
              null !== e.contentQueries && pg(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && as(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && ls(t, u, 1), kl(t, 1);
            }
            !(function $S(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Xn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      BE(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Xn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function US(e, t) {
                for (let n = 0; n < t.length; n++) cM(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && zu(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && as(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && ls(t, u, 2), kl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[B] &= -41),
              512 & t[B] && ((t[B] &= -513), Al(t[he], -1));
          } finally {
            Ol();
          }
        }
      }
      function gg(e, t, n, r, o) {
        const i = Ze(),
          s = 2 & r;
        try {
          Xn(-1),
            s && t.length > ue && tg(e, t, ue, !1),
            Ct(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Xn(i), Ct(s ? 3 : 1, o);
        }
      }
      function ku(e, t, n) {
        if (Ml(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Lu(e, t, n) {
        ph() &&
          ((function XS(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Fo(n) &&
              (function iM(e, t, n) {
                const r = dt(t, e),
                  o = mg(n),
                  i = e[es],
                  s = xs(
                    e,
                    Ts(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || fs(n, t),
              ze(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = Jn(t, e, a, n);
              ze(u, t),
                null !== s && sM(0, a - o, u, l, 0, s),
                Ft(l) && (ot(n.index, t)[ye] = Jn(t, e, a, n));
            }
          })(e, t, n, dt(n, t)),
          64 == (64 & n.flags) && Cg(e, t, n));
      }
      function Vu(e, t, n = dt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function mg(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = ju(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function ju(e, t, n, r, o, i, s, a, l, u) {
        const c = ue + r,
          d = c + o,
          f = (function HS(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : $);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[b] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function vg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? _g(n, t, o, i)
              : r.hasOwnProperty(o) && _g(n, t, r[o], i);
          }
        return n;
      }
      function _g(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function pt(e, t, n, r, o, i, s, a) {
        const l = dt(t, n);
        let c,
          u = t.inputs;
        !a && null != u && (c = u[r])
          ? (Gu(e, n, c, r, o),
            Fo(t) &&
              (function KS(e, t) {
                const n = ot(t, e);
                16 & n[B] || (n[B] |= 32);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function qS(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(l, r, o));
      }
      function $u(e, t, n, r) {
        if (ph()) {
          const o = null === r ? null : { "": -1 },
            i = (function eM(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Jp(t, s.selectors, !1))
                    if ((r || (r = []), Ft(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Uu(e, t, a.length);
                      } else r.unshift(s), Uu(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Dg(e, t, n, s, o, a),
            o &&
              (function tM(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = ko(n.mergedAttrs, n.attrs);
      }
      function Dg(e, t, n, r, o, i) {
        for (let u = 0; u < r.length; u++) Bl(fs(n, t), e, r[u].type);
        !(function rM(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = Xo(e, t, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = ko(n.mergedAttrs, c.hostAttrs)),
            oM(e, n, t, l, c),
            nM(l, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            l++;
        }
        !(function WS(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = vg(d.inputs, c, l, f ? f.inputs : null)),
              (u = vg(d.outputs, c, u, p));
            const g = null === l || null === s || Xp(t) ? null : aM(l, c, s);
            a.push(g);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = u);
        })(e, n, i);
      }
      function Cg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function HE() {
            return j.lFrame.currentDirectiveIndex;
          })();
        try {
          Xn(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              u = t[a];
            xl(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                JS(l, u);
          }
        } finally {
          Xn(-1), xl(s);
        }
      }
      function JS(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Uu(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function nM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Ft(t) && (n[""] = e);
        }
      }
      function oM(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Qn(o.type)),
          s = new Oo(i, Ft(o), D);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function ZS(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function QS(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Xo(e, n, o.hostVars, $), o);
      }
      function Qt(e, t, n, r, o, i) {
        const s = dt(e, t);
        !(function Bu(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? V(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[W], s, i, e.value, n, r, o);
      }
      function sM(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function aM(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function wg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function cM(e, t) {
        const n = ot(t, e);
        if (is(n)) {
          const r = n[b];
          48 & n[B] ? Rs(r, n, r.template, n[ye]) : n[Zn] > 0 && Hu(n);
        }
      }
      function Hu(e) {
        for (let r = ru(e); null !== r; r = ou(r))
          for (let o = Ke; o < r.length; o++) {
            const i = r[o];
            if (is(i))
              if (512 & i[B]) {
                const s = i[b];
                Rs(s, i, s.template, i[ye]);
              } else i[Zn] > 0 && Hu(i);
          }
        const n = e[b].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = ot(n[r], e);
            is(o) && o[Zn] > 0 && Hu(o);
          }
      }
      function dM(e, t) {
        const n = ot(t, e),
          r = n[b];
        (function fM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Ou(r, n, n[ye]);
      }
      function xs(e, t) {
        return e[Ro] ? (e[th][xt] = t) : (e[Ro] = t), (e[th] = t), t;
      }
      function Ns(e) {
        for (; e; ) {
          e[B] |= 32;
          const t = Go(e);
          if (EE(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Fs(e, t, n, r = !0) {
        const o = t[es];
        o.begin && o.begin();
        try {
          Rs(e, t, e.template, n);
        } catch (s) {
          throw (r && Mg(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function zu(e, t, n) {
        Fl(0), t(e, n);
      }
      function Eg(e) {
        return e[_r] || (e[_r] = []);
      }
      function bg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Mg(e, t) {
        const n = e[Ji],
          r = n ? n.get(jr, null) : null;
        r && r.handleError(t);
      }
      function Gu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function Ps(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = gl(o, a))
              : 2 == i && (r = gl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Os(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Le(i)), Nt(i)))
            for (let a = Ke; a < i.length; a++) {
              const l = i[a],
                u = l[b].firstChild;
              null !== u && Os(l[b], l, u, r);
            }
          const s = n.type;
          if (8 & s) Os(e, t, n.child, r);
          else if (32 & s) {
            const a = nu(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Dp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Go(t[He]);
              Os(l[b], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Jo {
        get rootNodes() {
          const t = this._lView,
            n = t[b];
          return Os(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ye];
        }
        set context(t) {
          this._lView[ye] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[B]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[he];
            if (Nt(t)) {
              const n = t[ns],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (au(t, r), gs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          dp(this._lView[b], this._lView);
        }
        onDestroy(t) {
          !(function yg(e, t, n, r) {
            const o = Eg(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && bg(e).push(r, o.length - 1));
          })(this._lView[b], this._lView, null, t);
        }
        markForCheck() {
          Ns(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[B] &= -65;
        }
        reattach() {
          this._lView[B] |= 64;
        }
        detectChanges() {
          Fs(this._lView[b], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Xb(e, t) {
              Wo(e, t, t[W], 2, null, null);
            })(this._lView[b], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class hM extends Jo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Fs(t[b], t, t[ye], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ig extends Zo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = te(t);
          return new ei(n, this.ngModule);
        }
      }
      function Ag(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class gM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Zi(r);
          const o = this.injector.get(t, Iu, r);
          return o !== Iu || n === Iu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class ei extends Wp {
        get inputs() {
          return Ag(this.componentDef.inputs);
        }
        get outputs() {
          return Ag(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function DS(e) {
              return e.map(_S).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Yt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new gM(t, i) : t,
            a = s.get(Kp, null);
          if (null === a) throw new C(407, !1);
          const l = s.get(J0, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function zS(e, t, n) {
                  return e.selectRootElement(t, n === zt.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : su(
                  u,
                  c,
                  (function pM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = ju(0, null, null, 1, 0, null, null, null, null, null),
            p = Ts(null, h, null, f, null, null, a, u, l, s, null);
          let g, m;
          Pl(p);
          try {
            const v = this.componentDef;
            let w,
              y = null;
            v.findHostDirectiveDefs
              ? ((w = []),
                (y = new Map()),
                v.findHostDirectiveDefs(v, w, y),
                w.push(v))
              : (w = [v]);
            const T = (function yM(e, t) {
                const n = e[b],
                  r = ue;
                return (e[r] = t), Br(n, r, 2, "#host", null);
              })(p, d),
              X = (function vM(e, t, n, r, o, i, s, a) {
                const l = o[b];
                !(function _M(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = ko(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ps(t, t.mergedAttrs, !0), null !== n && Ep(r, n, t));
                })(r, e, t, s);
                const u = i.createRenderer(t, n),
                  c = Ts(
                    o,
                    mg(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    u,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && Uu(l, e, r.length - 1),
                  xs(o, c),
                  (o[e.index] = c)
                );
              })(T, d, v, w, p, a, u);
            (m = dh(h, ue)),
              d &&
                (function CM(e, t, n, r) {
                  if (r) Vl(e, n, ["ng-version", eS.full]);
                  else {
                    const { attrs: o, classes: i } = (function CS(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!Pt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Vl(e, n, o),
                      i && i.length > 0 && wp(e, n, i.join(" "));
                  }
                })(u, v, d, r),
              void 0 !== n &&
                (function wM(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, n),
              (g = (function DM(e, t, n, r, o, i) {
                const s = Ve(),
                  a = o[b],
                  l = dt(s, o);
                Dg(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  ze(Jn(o, a, s.directiveStart + c, s), o);
                Cg(a, o, s), l && ze(l, o);
                const u = Jn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ye] = o[ye] = u), null !== i))
                  for (const c of i) c(u, t);
                return ku(a, s, e), u;
              })(X, v, w, y, p, [EM])),
              Ou(h, p, null);
          } finally {
            Ol();
          }
          return new mM(this.componentType, g, Vr(m, p), p, m);
        }
      }
      class mM extends q0 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new hM(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Gu(i[b], i, o, t, n), Ns(ot(this._tNode.index, i));
          }
        }
        get injector() {
          return new Ar(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function EM() {
        const e = Ve();
        ss(_()[b], e);
      }
      function ne(e) {
        let t = (function Tg(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (Ft(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Wu(e.inputs)),
                (s.declaredInputs = Wu(e.declaredInputs)),
                (s.outputs = Wu(e.outputs));
              const a = o.hostBindings;
              a && IM(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && SM(e, l),
                u && MM(e, u),
                pl(e.inputs, o.inputs),
                pl(e.declaredInputs, o.declaredInputs),
                pl(e.outputs, o.outputs),
                Ft(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === ne && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function bM(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = ko(o.hostAttrs, (n = ko(n, o.hostAttrs))));
          }
        })(r);
      }
      function Wu(e) {
        return e === cn ? {} : e === Q ? [] : e;
      }
      function SM(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function MM(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function IM(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function ks(e) {
        return (
          !!(function qu(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Ge(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Jt(e, t, n, r) {
        const o = _();
        return Ge(o, Mr(), t) && (Y(), Qt(de(), o, e, t, n, r)), Jt;
      }
      function zr(e, t, n, r) {
        return Ge(e, Mr(), n) ? t + V(n) + r : $;
      }
      function bt(e, t, n, r, o, i, s, a) {
        const l = _(),
          u = Y(),
          c = e + ue,
          d = u.firstCreatePass
            ? (function LM(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = Br(t, e, 4, s || null, xn(u, a));
                $u(t, n, c, xn(u, l)), ss(t, c);
                const d = (c.tView = ju(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        qt(d, !1);
        const f = l[W].createComment("");
        Ds(u, l, f, d),
          ze(f, l),
          xs(l, (l[c] = wg(f, l, f, d))),
          rs(d) && Lu(u, l, d),
          null != s && Vu(l, d, a);
      }
      function ve(e, t, n) {
        const r = _();
        return Ge(r, Mr(), t) && pt(Y(), de(), r, e, t, r[W], n, !1), ve;
      }
      function Ku(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Gu(e, n, t.inputs[s], s, r);
      }
      function M(e, t, n, r) {
        const o = _(),
          i = Y(),
          s = ue + e,
          a = o[W],
          l = i.firstCreatePass
            ? (function $M(e, t, n, r, o, i) {
                const s = t.consts,
                  l = Br(t, e, 2, r, xn(s, o));
                return (
                  $u(t, n, l, xn(s, i)),
                  null !== l.attrs && Ps(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ps(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          u = (o[s] = su(
            a,
            t,
            (function QE() {
              return j.lFrame.currentNamespace;
            })()
          )),
          c = rs(l);
        return (
          qt(l, !0),
          Ep(a, u, l),
          32 != (32 & l.flags) && Ds(i, o, u, l),
          0 ===
            (function OE() {
              return j.lFrame.elementDepthCount;
            })() && ze(u, o),
          (function kE() {
            j.lFrame.elementDepthCount++;
          })(),
          c && (Lu(i, o, l), ku(i, l, o)),
          null !== r && Vu(o, l),
          M
        );
      }
      function I() {
        let e = Ve();
        Tl()
          ? (function Rl() {
              j.lFrame.isParent = !1;
            })()
          : ((e = e.parent), qt(e, !1));
        const t = e;
        !(function LE() {
          j.lFrame.elementDepthCount--;
        })();
        const n = Y();
        return (
          n.firstCreatePass && (ss(n, e), Ml(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function tb(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Ku(n, t, _(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function nb(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Ku(n, t, _(), t.stylesWithoutHost, !1),
          I
        );
      }
      function _n(e, t, n, r) {
        return M(e, t, n, r), I(), _n;
      }
      function Xr() {
        return _();
      }
      function ni(e) {
        return !!e && "function" == typeof e.then;
      }
      const Qu = function Hg(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function _e(e, t, n, r) {
        const o = _(),
          i = Y(),
          s = Ve();
        return (
          (function Gg(e, t, n, r, o, i, s) {
            const a = rs(r),
              u = e.firstCreatePass && bg(e),
              c = t[ye],
              d = Eg(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = dt(r, t),
                m = s ? s(g) : g,
                v = d.length,
                w = s ? (T) => s(Le(T[r.index])) : r.index;
              let y = null;
              if (
                (!s &&
                  a &&
                  (y = (function BM(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[_r],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== y)
              )
                ((y.__ngLastListenerFn__ || y).__ngNextListenerFn__ = i),
                  (y.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = qg(r, t, c, i, !1);
                const T = n.listen(m, o, i);
                d.push(i, T), u && u.push(o, w, v, v + 1);
              }
            } else i = qg(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const X = t[p[m]][p[m + 1]].subscribe(i),
                    be = d.length;
                  d.push(i, X), u && u.push(o, r.index, be, -(be + 1));
                }
            }
          })(i, o, o[W], s, e, t, r),
          _e
        );
      }
      function Wg(e, t, n, r) {
        try {
          return Ct(6, t, n), !1 !== n(r);
        } catch (o) {
          return Mg(e, o), !1;
        } finally {
          Ct(7, t, n);
        }
      }
      function qg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Ns(e.componentOffset > -1 ? ot(e.index, t) : t);
          let l = Wg(t, n, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = Wg(t, n, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Fn(e = 1) {
        return (function GE(e) {
          return (j.lFrame.contextLView = (function WE(e, t) {
            for (; e > 0; ) (t = t[Dr]), e--;
            return t;
          })(e, j.lFrame.contextLView))[ye];
        })(e);
      }
      function ir(e, t, n) {
        return Xu(e, "", t, "", n), ir;
      }
      function Xu(e, t, n, r, o) {
        const i = _(),
          s = zr(i, t, n, r);
        return s !== $ && pt(Y(), de(), i, e, s, i[W], o, !1), Xu;
      }
      function Vs(e, t) {
        return (e << 17) | (t << 2);
      }
      function Pn(e) {
        return (e >> 17) & 32767;
      }
      function Ju(e) {
        return 2 | e;
      }
      function sr(e) {
        return (131068 & e) >> 2;
      }
      function ec(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function tc(e) {
        return 1 | e;
      }
      function nm(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Pn(i) : sr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          QM(e[a], t) && ((l = !0), (e[a + 1] = r ? tc(c) : Ju(c))),
            (a = r ? Pn(c) : sr(c));
        }
        l && (e[n + 1] = r ? Ju(i) : tc(i));
      }
      function QM(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Fr(e, t) >= 0)
        );
      }
      function js(e, t) {
        return (
          (function Ot(e, t, n, r) {
            const o = _(),
              i = Y(),
              s = (function pn(e) {
                const t = j.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function dm(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Ze()],
                    s = (function cm(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function gm(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function sI(e, t, n, r) {
                      const o = (function Nl(e) {
                        const t = j.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = ri((n = nc(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = nc(o, e, t, n, r)), null === i)) {
                            let l = (function aI(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== sr(r)) return e[Pn(r)];
                            })(e, t, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = nc(null, e, t, l[1], r)),
                              (l = ri(l, t.attrs, r)),
                              (function lI(e, t, n, r) {
                                e[Pn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, l));
                          } else
                            i = (function uI(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = ri(r, e[i].hostAttrs, n);
                              return ri(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function YM(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Pn(s),
                        l = sr(s);
                      e[r] = n;
                      let c,
                        u = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || Fr(n, c) > 0) && (u = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== l) {
                          const f = Pn(e[a + 1]);
                          (e[r + 1] = Vs(f, a)),
                            0 !== f && (e[f + 1] = ec(e[f + 1], r)),
                            (e[a + 1] = (function qM(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Vs(a, 0)),
                            0 !== a && (e[a + 1] = ec(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Vs(l, 0)),
                          0 === a ? (a = r) : (e[l + 1] = ec(e[l + 1], r)),
                          (l = r);
                      u && (e[r + 1] = Ju(e[r + 1])),
                        nm(e, c, r, !0),
                        nm(e, c, r, !1),
                        (function ZM(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Fr(i, t) >= 0 &&
                            (n[r + 1] = tc(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Vs(a, l)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== $ &&
                Ge(o, s, t) &&
                (function hm(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const l = e.data,
                    u = l[a + 1],
                    c = (function KM(e) {
                      return 1 == (1 & e);
                    })(u)
                      ? pm(l, t, n, o, sr(u), s)
                      : void 0;
                  $s(c) ||
                    ($s(i) ||
                      ((function WM(e) {
                        return 2 == (2 & e);
                      })(u) &&
                        (i = pm(l, null, n, o, a, s))),
                    (function u0(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : it.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= it.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, os(Ze(), n), o, i));
                })(
                  i,
                  i.data[Ze()],
                  o,
                  o[W],
                  e,
                  (o[s + 1] = (function hI(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ie(Nn(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          js
        );
      }
      function nc(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = ri(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function ri(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ft(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function pm(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[o + 1];
          f === $ && (f = d ? Q : void 0);
          let h = d ? Wl(f, r) : c === r ? f : void 0;
          if ((u && !$s(h) && (h = Wl(l, r)), $s(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Pn(p) : sr(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Wl(l, r));
        }
        return a;
      }
      function $s(e) {
        return void 0 !== e;
      }
      function k(e, t = "") {
        const n = _(),
          r = Y(),
          o = e + ue,
          i = r.firstCreatePass ? Br(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function iu(e, t) {
            return e.createText(t);
          })(n[W], t));
        Ds(r, n, s, i), qt(i, !1);
      }
      function St(e) {
        return ar("", e, ""), St;
      }
      function ar(e, t, n) {
        const r = _(),
          o = zr(r, e, t, n);
        return (
          o !== $ &&
            (function vn(e, t, n) {
              const r = os(t, e);
              !(function up(e, t, n) {
                e.setValue(t, n);
              })(e[W], r, n);
            })(r, Ze(), o),
          ar
        );
      }
      const to = "en-US";
      let Lm = to;
      function ic(e, t, n, r, o) {
        if (((e = F(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) ic(e[i], t, n, r, o);
        else {
          const i = Y(),
            s = _();
          let a = rr(e) ? e : F(e.provide),
            l = Gp(e);
          const u = Ve(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (rr(e) || !e.multi) {
            const h = new Oo(l, o, D),
              p = ac(a, t, o ? c : c + f, d);
            -1 === p
              ? (Bl(fs(u, s), i, a),
                sc(i, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = ac(a, t, c + f, d),
              p = ac(a, t, c, c + f),
              m = p >= 0 && n[p];
            if ((o && !m) || (!o && !(h >= 0 && n[h]))) {
              Bl(fs(u, s), i, a);
              const v = (function xA(e, t, n, r, o) {
                const i = new Oo(e, n, D);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  ly(i, o, r && !n),
                  i
                );
              })(o ? RA : TA, n.length, o, r, l);
              !o && m && (n[p].providerFactory = v),
                sc(i, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(v),
                s.push(v);
            } else sc(i, e, h > -1 ? h : p, ly(n[o ? p : h], l, !o && r));
            !o && r && m && n[p].componentProviders++;
          }
        }
      }
      function sc(e, t, n, r) {
        const o = rr(t),
          i = (function $0(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? F(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function ly(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function ac(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function TA(e, t, n, r) {
        return lc(this.multi, []);
      }
      function RA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Jn(n, n[b], this.providerFactory.index, r);
          (i = a.slice(0, s)), lc(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), lc(o, i);
        return i;
      }
      function lc(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ce(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function AA(e, t, n) {
              const r = Y();
              if (r.firstCreatePass) {
                const o = Ft(e);
                ic(n, r.data, r.blueprint, o, !0),
                  ic(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class no {}
      class uy {}
      class cy extends no {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ig(this));
          const r = ut(t);
          (this._bootstrapComponents = yn(r.bootstrap)),
            (this._r3Injector = sg(
              t,
              n,
              [
                { provide: no, useValue: this },
                { provide: Zo, useValue: this.componentFactoryResolver },
              ],
              ie(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class uc extends uy {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new cy(this.moduleType, t);
        }
      }
      class FA extends no {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Ig(this)),
            (this.instance = null);
          const o = new zp(
            [
              ...t,
              { provide: no, useValue: this },
              { provide: Zo, useValue: this.componentFactoryResolver },
            ],
            n || Is(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Gs(e, t, n = null) {
        return new FA(e, t, n).injector;
      }
      let PA = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = $p(0, n.type),
                o =
                  r.length > 0
                    ? Gs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "environment",
            factory: () => new e(A(Yt)),
          })),
          e
        );
      })();
      function dy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(PA).getOrCreateStandaloneInjector(e);
      }
      function dc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ge = class sT extends an {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = dc(i)), o && (o = dc(o)), s && (s = dc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof mt && t.add(a), a;
        }
      };
      let Dn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = cT), e;
      })();
      const lT = Dn,
        uT = class extends lT {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Ts(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[xo] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Wt];
            return (
              null !== s && (o[Wt] = s.createEmbeddedView(r)),
              Ou(r, o, t),
              new Jo(o)
            );
          }
        };
      function cT() {
        return (function Ws(e, t) {
          return 4 & e.type ? new uT(t, e, Vr(e, t)) : null;
        })(Ve(), _());
      }
      let Lt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = dT), e;
      })();
      function dT() {
        return (function Sy(e, t) {
          let n;
          const r = t[e.index];
          if (Nt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Le(r);
            else {
              const i = t[W];
              o = i.createComment("");
              const s = dt(e, t);
              tr(
                i,
                _s(i, s),
                o,
                (function s0(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = wg(r, t, o, e)), xs(t, n);
          }
          return new Ey(n, e, t);
        })(Ve(), _());
      }
      const fT = Lt,
        Ey = class extends fT {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Vr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Ar(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ul(this._hostTNode, this._hostLView);
            if (Th(t)) {
              const n = cs(t, this._hostLView),
                r = us(t);
              return new Ar(n[b].data[r + 8], n);
            }
            return new Ar(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = by(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ke;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Vo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new ei(te(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(Yt, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[b];
            if (
              (function PE(e) {
                return Nt(e[he]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[he],
                  f = new Ey(d, d[Be], d[he]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function e0(e, t, n, r) {
              const o = Ke + r,
                i = n.length;
              r > 0 && (n[o - 1][xt] = t),
                r < i - Ke
                  ? ((t[xt] = n[o]), Uh(n, Ke + r, t))
                  : (n.push(t), (t[xt] = null)),
                (t[he] = n);
              const s = t[xo];
              null !== s &&
                n !== s &&
                (function t0(e, t) {
                  const n = e[wr];
                  t[He] !== t[he][he][He] && (e[rh] = !0),
                    null === n ? (e[wr] = [t]) : n.push(t);
                })(s, t);
              const a = t[Wt];
              null !== a && a.insertView(e), (t[B] |= 64);
            })(o, r, s, i);
            const a = cu(i, s),
              l = r[W],
              u = _s(l, s[ts]);
            return (
              null !== u &&
                (function Qb(e, t, n, r, o, i) {
                  (r[fn] = o), (r[Be] = t), Wo(e, r, n, 1, o, i);
                })(o, s[Be], l, r, u, a),
              t.attachToViewContainerRef(),
              Uh(hc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = by(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = au(this._lContainer, n);
            r && (gs(hc(this._lContainer), n), dp(r[b], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = au(this._lContainer, n);
            return r && null != gs(hc(this._lContainer), n) ? new Jo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function by(e) {
        return e[ns];
      }
      function hc(e) {
        return e[ns] || (e[ns] = []);
      }
      function Ks(...e) {}
      const Ys = new S("Application Initializer");
      let Zs = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Ks),
              (this.reject = Ks),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ni(i)) n.push(i);
                else if (Qu(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Ys, 8));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const fi = new S("AppId", {
        providedIn: "root",
        factory: function Qy() {
          return `${bc()}${bc()}${bc()}`;
        },
      });
      function bc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Xy = new S("Platform Initializer"),
        Sc = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let $T = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Cn = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          G(Cn, P.Optional | P.SkipSelf) ||
          (function UT() {
            return (typeof $localize < "u" && $localize.locale) || to;
          })(),
      });
      class HT {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Jy = (() => {
        class e {
          compileModuleSync(n) {
            return new uc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = yn(ut(n).declarations).reduce((s, a) => {
                const l = te(a);
                return l && s.push(new ei(l)), s;
              }, []);
            return new HT(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const WT = (() => Promise.resolve(0))();
      function Mc(e) {
        typeof Zone > "u"
          ? WT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class De {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ge(!1)),
            (this.onMicrotaskEmpty = new ge(!1)),
            (this.onStable = new ge(!1)),
            (this.onError = new ge(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function qT() {
              let e = le.requestAnimationFrame,
                t = le.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function ZT(e) {
              const t = () => {
                !(function YT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(le, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ac(e),
                                (e.isCheckStableRunning = !0),
                                Ic(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ac(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return nv(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      rv(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return nv(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), rv(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ac(e),
                          Ic(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!De.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (De.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, KT, Ks, Ks);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const KT = {};
      function Ic(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ac(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function nv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function rv(e) {
        e._nesting--, Ic(e);
      }
      class QT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ge()),
            (this.onMicrotaskEmpty = new ge()),
            (this.onStable = new ge()),
            (this.onError = new ge());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const ov = new S(""),
        Qs = new S("");
      let xc,
        Tc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                xc ||
                  ((function XT(e) {
                    xc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      De.assertNotInAngularZone(),
                        Mc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Mc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(De), A(Rc), A(Qs));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Rc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return xc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const wn = !1;
      let On = null;
      const iv = new S("AllowMultipleToken"),
        Nc = new S("PlatformDestroyListeners"),
        sv = new S("appBootstrapListener");
      class av {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function uv(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new S(r);
        return (i = []) => {
          let s = Fc();
          if (!s || s.injector.get(iv, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function tR(e) {
                  if (On && !On.get(iv, !1)) throw new C(400, !1);
                  On = e;
                  const t = e.get(dv);
                  (function lv(e) {
                    const t = e.get(Xy, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function cv(e = [], t) {
                    return Zt.create({
                      name: t,
                      providers: [
                        { provide: Eu, useValue: "platform" },
                        { provide: Nc, useValue: new Set([() => (On = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function rR(e) {
            const t = Fc();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function Fc() {
        return On?.get(dv) ?? null;
      }
      let dv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function hv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new QT()
                      : ("zone.js" === e ? void 0 : e) || new De(t)),
                  n
                );
              })(
                r?.ngZone,
                (function fv(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: De, useValue: o }];
            return o.run(() => {
              const s = Zt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(jr, null);
              if (!l) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Js(this._modules, a), u.unsubscribe();
                  });
                }),
                (function pv(e, t, n) {
                  try {
                    const r = n();
                    return ni(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(Zs);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function Vm(e) {
                          yt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Lm = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Cn, to) || to),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = gv({}, r);
            return (function JT(e, t, n) {
              const r = new uc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Xs);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Nc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Zt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function gv(e, t) {
        return Array.isArray(t) ? t.reduce(gv, e) : { ...e, ...t };
      }
      let Xs = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new me((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new me((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    De.assertNotInAngularZone(),
                      Mc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  De.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Jw(...e) {
              const t = So(e),
                n = (function Ww(e, t) {
                  return "number" == typeof fl(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Tt(r[0])
                  : mr(n)(Se(r, t))
                : Bt;
            })(
              i,
              s.pipe(
                (function eE(e = {}) {
                  const {
                    connector: t = () => new an(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Pe((g, m) => {
                      u++, !d && !c && f();
                      const v = (l = l ?? t());
                      m.add(() => {
                        u--, 0 === u && !d && !c && (a = hl(p, o));
                      }),
                        v.subscribe(m),
                        !s &&
                          u > 0 &&
                          ((s = new bo({
                            next: (w) => v.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = hl(h, n, w)), v.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = hl(h, r)), v.complete();
                            },
                          })),
                          Tt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof Wp;
            if (!this._injector.get(Zs).done) {
              !o &&
                (function vr(e) {
                  const t = te(e) || Ue(e) || rt(e);
                  return null !== t && t.standalone;
                })(n);
              throw new C(405, wn);
            }
            let s;
            (s = o ? n : this._injector.get(Zo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function eR(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(no),
              u = s.create(Zt.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(ov, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Js(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Js(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(sv, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Js(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(De), A(Yt), A(jr));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Js(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let ea = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = iR), e;
      })();
      function iR(e) {
        return (function sR(e, t, n) {
          if (Fo(e) && !n) {
            const r = ot(e.index, t);
            return new Jo(r, r);
          }
          return 47 & e.type ? new Jo(t[He], t) : null;
        })(Ve(), _(), 16 == (16 & e));
      }
      class Dv {
        constructor() {}
        supports(t) {
          return ks(t);
        }
        create(t) {
          return new fR(t);
        }
      }
      const dR = (e, t) => t;
      class fR {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || dR);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < wv(r, o, i)) ? n : r,
              a = wv(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !ks(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function PM(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new hR(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Cv()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Cv()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class hR {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class pR {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Cv {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new pR()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function wv(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function bv() {
        return new ra([new Dv()]);
      }
      let ra = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || bv()),
              deps: [[e, new Uo(), new $o()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = R({ token: e, providedIn: "root", factory: bv })), e;
      })();
      const _R = uv(null, "core", []);
      let DR = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Xs));
          }),
          (e.ɵmod = Rt({ type: e })),
          (e.ɵinj = vt({})),
          e
        );
      })();
      function io(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Vc = null;
      function En() {
        return Vc;
      }
      class ER {}
      const Je = new S("DocumentToken");
      let jc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function bR() {
                return A(Mv);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const SR = new S("Location Initialized");
      let Mv = (() => {
        class e extends jc {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return En().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = En().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = En().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            Iv() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            Iv()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Je));
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return (function MR() {
                return new Mv(A(Je));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Iv() {
        return !!window.history.pushState;
      }
      function $c(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Av(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function bn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let cr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return G(Rv);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Tv = new S("appBaseHref");
      let Rv = (() => {
          class e extends cr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  G(Je).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return $c(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  bn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + bn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + bn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(jc), A(Tv, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        IR = (() => {
          class e extends cr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = $c(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + bn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + bn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(jc), A(Tv, 8));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Uc = (() => {
          class e {
            constructor(n) {
              (this._subject = new ge()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function RR(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(Av(xv(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + bn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function TR(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, xv(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + bn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + bn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = bn),
            (e.joinWithSlash = $c),
            (e.stripTrailingSlash = Av),
            (e.ɵfac = function (n) {
              return new (n || e)(A(cr));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return (function AR() {
                  return new Uc(A(cr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function xv(e) {
        return e.replace(/\/index.html$/, "");
      }
      function $v(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class gx {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ha = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new gx(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), zv(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              zv(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Lt), D(Dn), D(ra));
          }),
          (e.ɵdir = L({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function zv(e, t) {
        e.context.$implicit = t.item;
      }
      let pa = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new yx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Gv("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Gv("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Lt), D(Dn));
          }),
          (e.ɵdir = L({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class yx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Gv(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ie(t)}'.`
          );
      }
      let Bx = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Rt({ type: e })),
          (e.ɵinj = vt({})),
          e
        );
      })();
      let Wx = (() => {
        class e {}
        return (
          (e.ɵprov = R({
            token: e,
            providedIn: "root",
            factory: () => new qx(A(Je), window),
          })),
          e
        );
      })();
      class qx {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function Kx(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Yv(this.window.history) ||
              Yv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Yv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Zv {}
      class CN extends ER {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class od extends CN {
        static makeCurrent() {
          !(function wR(e) {
            Vc || (Vc = e);
          })(new od());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function wN() {
            return (
              (yi = yi || document.querySelector("base")),
              yi ? yi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function EN(e) {
                (ya = ya || document.createElement("a")),
                  ya.setAttribute("href", e);
                const t = ya.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          yi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return $v(document.cookie, t);
        }
      }
      let ya,
        yi = null;
      const t_ = new S("TRANSITION_ID"),
        SN = [
          {
            provide: Ys,
            useFactory: function bN(e, t, n) {
              return () => {
                n.get(Zs).donePromise.then(() => {
                  const r = En(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [t_, Je, Zt],
            multi: !0,
          },
        ];
      let IN = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const va = new S("EventManagerPlugins");
      let _a = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(va), A(De));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class n_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = En().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let r_ = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        vi = (() => {
          class e extends r_ {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(Je));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const id = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        sd = /%COMP%/g,
        s_ = new S("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function a_(e, t) {
        return t.flat(100).map((n) => n.replace(sd, e));
      }
      function l_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let ad = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ld(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof d_
                ? o.applyToHost(n)
                : o instanceof ud && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case zt.Emulated:
                  i = new d_(s, a, r, this.appId, l);
                  break;
                case zt.ShadowDom:
                  return new PN(s, a, n, r);
                default:
                  i = new ud(s, a, r, l);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(_a), A(vi), A(fi), A(s_));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ld {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(id[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (c_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (c_(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = id[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = id[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (it.DashCase | it.Important)
            ? t.style.setProperty(n, r, o & it.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & it.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, l_(r))
            : this.eventManager.addEventListener(t, n, l_(r));
        }
      }
      function c_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class PN extends ld {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = a_(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class ud extends ld {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = a_(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class d_ extends ud {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function xN(e) {
              return "_ngcontent-%COMP%".replace(sd, e);
            })(s)),
            (this.hostAttr = (function NN(e) {
              return "_nghost-%COMP%".replace(sd, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let ON = (() => {
        class e extends n_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Je));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const f_ = ["alt", "control", "meta", "shift"],
        kN = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        LN = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let VN = (() => {
        class e extends n_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => En().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              f_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = kN[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                f_.forEach((s) => {
                  s !== o && (0, LN[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Je));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const BN = uv(_R, "browser", [
          { provide: Sc, useValue: "browser" },
          {
            provide: Xy,
            useValue: function jN() {
              od.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Je,
            useFactory: function UN() {
              return (
                (function p0(e) {
                  pu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        g_ = new S(""),
        m_ = [
          {
            provide: Qs,
            useClass: class MN {
              addToWindow(t) {
                (le.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (le.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (le.getAllAngularRootElements = () => t.getAllRootElements()),
                  le.frameworkStabilizers || (le.frameworkStabilizers = []),
                  le.frameworkStabilizers.push((r) => {
                    const o = le.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? En().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: ov, useClass: Tc, deps: [De, Rc, Qs] },
          { provide: Tc, useClass: Tc, deps: [De, Rc, Qs] },
        ],
        y_ = [
          { provide: Eu, useValue: "root" },
          {
            provide: jr,
            useFactory: function $N() {
              return new jr();
            },
            deps: [],
          },
          { provide: va, useClass: ON, multi: !0, deps: [Je, De, Sc] },
          { provide: va, useClass: VN, multi: !0, deps: [Je] },
          { provide: ad, useClass: ad, deps: [_a, vi, fi, s_] },
          { provide: Kp, useExisting: ad },
          { provide: r_, useExisting: vi },
          { provide: vi, useClass: vi, deps: [Je] },
          { provide: _a, useClass: _a, deps: [va, De] },
          { provide: Zv, useClass: IN, deps: [] },
          [],
        ];
      let HN = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: fi, useValue: n.appId },
                  { provide: t_, useExisting: fi },
                  SN,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(g_, 12));
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = vt({ providers: [...y_, ...m_], imports: [Bx, DR] })),
            e
          );
        })(),
        v_ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(Je));
            }),
            (e.ɵprov = R({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function GN() {
                        return new v_(A(Je));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function x(...e) {
        return Se(e, So(e));
      }
      typeof window < "u" && window;
      class Ut extends an {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Da = wo(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: QN } = Array,
        { getPrototypeOf: XN, prototype: JN, keys: eF } = Object;
      function C_(e) {
        if (1 === e.length) {
          const t = e[0];
          if (QN(t)) return { args: t, keys: null };
          if (
            (function tF(e) {
              return e && "object" == typeof e && XN(e) === JN;
            })(t)
          ) {
            const n = eF(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: nF } = Array;
      function w_(e) {
        return z((t) =>
          (function rF(e, t) {
            return nF(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function E_(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function b_(...e) {
        const t = So(e),
          n = $f(e),
          { args: r, keys: o } = C_(e);
        if (0 === r.length) return Se([], t);
        const i = new me(
          (function oF(e, t, n = Yn) {
            return (r) => {
              S_(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    S_(
                      t,
                      () => {
                        const u = Se(e[l], t);
                        let c = !1;
                        u.subscribe(
                          Re(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => E_(o, s) : Yn)
        );
        return n ? i.pipe(w_(n)) : i;
      }
      function S_(e, t, n) {
        e ? ln(n, e, t) : t();
      }
      function fd(...e) {
        return (function iF() {
          return mr(1);
        })()(Se(e, So(e)));
      }
      function M_(e) {
        return new me((t) => {
          Tt(e()).subscribe(t);
        });
      }
      function _i(e, t) {
        const n = oe(e) ? e : () => e,
          r = (o) => o.error(n());
        return new me(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function hd() {
        return Pe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Re(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class I_ extends me {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Sf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new mt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Re(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = mt.EMPTY));
          }
          return t;
        }
        refCount() {
          return hd()(this);
        }
      }
      function nn(e, t) {
        return Pe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Re(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                Tt(e(l, c)).subscribe(
                  (o = Re(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function so(e) {
        return e <= 0
          ? () => Bt
          : Pe((t, n) => {
              let r = 0;
              t.subscribe(
                Re(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Mn(e, t) {
        return Pe((n, r) => {
          let o = 0;
          n.subscribe(Re(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Ca(e) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Re(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function A_(e = aF) {
        return Pe((t, n) => {
          let r = !1;
          t.subscribe(
            Re(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function aF() {
        return new Da();
      }
      function Ln(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Mn((o, i) => e(o, i, r)) : Yn,
            so(1),
            n ? Ca(t) : A_(() => new Da())
          );
      }
      function Vn(e, t) {
        return oe(t) ? ke(e, t, 1) : ke(e, 1);
      }
      function We(e, t, n) {
        const r = oe(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Pe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Re(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Yn;
      }
      function jn(e) {
        return Pe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Re(n, void 0, void 0, (s) => {
              (i = Tt(e(s, jn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function T_(e, t) {
        return Pe(
          (function lF(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                l = t,
                u = 0;
              i.subscribe(
                Re(
                  s,
                  (c) => {
                    const d = u++;
                    (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
                  },
                  o &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function pd(e) {
        return e <= 0
          ? () => Bt
          : Pe((t, n) => {
              let r = [];
              t.subscribe(
                Re(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function R_(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Mn((o, i) => e(o, i, r)) : Yn,
            pd(1),
            n ? Ca(t) : A_(() => new Da())
          );
      }
      function gd(e) {
        return Pe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const U = "primary",
        Di = Symbol("RouteTitle");
      class dF {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ao(e) {
        return new dF(e);
      }
      function fF(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function rn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !x_(e[o], t[o]))) return !1;
        return !0;
      }
      function x_(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function N_(e) {
        return Array.prototype.concat.apply([], e);
      }
      function F_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function $e(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function $n(e) {
        return Qu(e) ? e : ni(e) ? Se(Promise.resolve(e)) : x(e);
      }
      const wa = !1,
        pF = {
          exact: function k_(e, t, n) {
            if (
              !dr(e.segments, t.segments) ||
              !Ea(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !k_(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: L_,
        },
        P_ = {
          exact: function gF(e, t) {
            return rn(e, t);
          },
          subset: function mF(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => x_(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function O_(e, t, n) {
        return (
          pF[n.paths](e.root, t.root, n.matrixParams) &&
          P_[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function L_(e, t, n) {
        return V_(e, t, t.segments, n);
      }
      function V_(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!dr(o, n) || t.hasChildren() || !Ea(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!dr(e.segments, n) || !Ea(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !L_(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(dr(e.segments, o) && Ea(e.segments, o, r) && e.children[U]) &&
            V_(e.children[U], t, i, r)
          );
        }
      }
      function Ea(e, t, n) {
        return t.every((r, o) => P_[n](e[o].parameters, r.parameters));
      }
      class Un {
        constructor(t = new q([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return _F.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            $e(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return ba(this);
        }
      }
      class Ci {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ao(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return U_(this);
        }
      }
      function dr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let wi = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({
            token: e,
            factory: function () {
              return new md();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class md {
        parse(t) {
          const n = new AF(t);
          return new Un(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Ei(t.root, !0)}`,
            r = (function wF(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Sa(n)}=${Sa(o)}`).join("&")
                    : `${Sa(n)}=${Sa(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function DF(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const _F = new md();
      function ba(e) {
        return e.segments.map((t) => U_(t)).join("/");
      }
      function Ei(e, t) {
        if (!e.hasChildren()) return ba(e);
        if (t) {
          const n = e.children[U] ? Ei(e.children[U], !1) : "",
            r = [];
          return (
            $e(e.children, (o, i) => {
              i !== U && r.push(`${i}:${Ei(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function vF(e, t) {
            let n = [];
            return (
              $e(e.children, (r, o) => {
                o === U && (n = n.concat(t(r, o)));
              }),
              $e(e.children, (r, o) => {
                o !== U && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === U ? [Ei(e.children[U], !1)] : [`${o}:${Ei(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[U]
            ? `${ba(e)}/${n[0]}`
            : `${ba(e)}/(${n.join("//")})`;
        }
      }
      function j_(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Sa(e) {
        return j_(e).replace(/%3B/gi, ";");
      }
      function yd(e) {
        return j_(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ma(e) {
        return decodeURIComponent(e);
      }
      function $_(e) {
        return Ma(e.replace(/\+/g, "%20"));
      }
      function U_(e) {
        return `${yd(e.path)}${(function CF(e) {
          return Object.keys(e)
            .map((t) => `;${yd(t)}=${yd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const EF = /^[^\/()?;=#]+/;
      function Ia(e) {
        const t = e.match(EF);
        return t ? t[0] : "";
      }
      const bF = /^[^=?&#]+/,
        MF = /^[^&#]+/;
      class AF {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new q([], {})
              : new q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[U] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Ia(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new C(4009, wa);
          return this.capture(t), new Ci(Ma(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Ia(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Ia(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Ma(n)] = Ma(r);
        }
        parseQueryParam(t) {
          const n = (function SF(e) {
            const t = e.match(bF);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function IF(e) {
              const t = e.match(MF);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = $_(n),
            i = $_(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ia(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, wa);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = U);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[U] : new q([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new C(4011, wa);
        }
      }
      function vd(e) {
        return e.segments.length > 0 ? new q([], { [U]: e }) : e;
      }
      function Aa(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Aa(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function TF(e) {
          if (1 === e.numberOfChildren && e.children[U]) {
            const t = e.children[U];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      function fr(e) {
        return e instanceof Un;
      }
      const _d = !1;
      function RF(e, t, n, r, o) {
        if (0 === n.length) return lo(t.root, t.root, t.root, r, o);
        const i = (function W_(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new G_(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  $e(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new G_(n, t, r);
        })(n);
        return i.toRoot()
          ? lo(t.root, t.root, new q([], {}), r, o)
          : (function s(l) {
              const u = (function NF(e, t, n, r) {
                  if (e.isAbsolute) return new uo(t.root, !0, 0);
                  if (-1 === r) return new uo(n, n === t.root, 0);
                  return (function q_(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new C(4005, _d && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new uo(r, !1, o - i);
                  })(n, r + (bi(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? co(u.segmentGroup, u.index, i.commands)
                  : Dd(u.segmentGroup, u.index, i.commands);
              return lo(t.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function bi(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Si(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function lo(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          $e(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : z_(e, t, n));
        const a = vd(Aa(s));
        return new Un(a, i, o);
      }
      function z_(e, t, n) {
        const r = {};
        return (
          $e(e.children, (o, i) => {
            r[i] = o === t ? n : z_(o, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class G_ {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && bi(r[0]))
          )
            throw new C(
              4003,
              _d && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Si);
          if (o && o !== F_(r))
            throw new C(4004, _d && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class uo {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Dd(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return co(e, t, n);
        const r = (function PF(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Si(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!Y_(l, u, s)) return i;
                r += 2;
              } else {
                if (!Y_(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[U] = new q(e.segments.slice(r.pathIndex), e.children)),
            co(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Cd(e, t, n)
          : r.match
          ? co(e, 0, o)
          : Cd(e, t, n);
      }
      function co(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function FF(e) {
              return Si(e[0]) ? e[0].outlets : { [U]: e };
            })(n),
            o = {};
          if (
            !r[U] &&
            e.children[U] &&
            1 === e.numberOfChildren &&
            0 === e.children[U].segments.length
          ) {
            const i = co(e.children[U], t, n);
            return new q(e.segments, i.children);
          }
          return (
            $e(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Dd(e.children[s], t, i));
            }),
            $e(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new q(e.segments, o)
          );
        }
      }
      function Cd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Si(i)) {
            const l = OF(i.outlets);
            return new q(r, l);
          }
          if (0 === o && bi(n[0])) {
            r.push(new Ci(e.segments[t].path, K_(n[0]))), o++;
            continue;
          }
          const s = Si(i) ? i.outlets[U] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && bi(a)
            ? (r.push(new Ci(s, K_(a))), (o += 2))
            : (r.push(new Ci(s, {})), o++);
        }
        return new q(r, {});
      }
      function OF(e) {
        const t = {};
        return (
          $e(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Cd(new q([], {}), 0, n));
          }),
          t
        );
      }
      function K_(e) {
        const t = {};
        return $e(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Y_(e, t, n) {
        return e == n.path && rn(t, n.parameters);
      }
      const Mi = "imperative";
      class on {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class wd extends on {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class hr extends on {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ta extends on {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Ra extends on {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Ed extends on {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class kF extends on {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class LF extends on {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VF extends on {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class jF extends on {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class $F extends on {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class UF {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class BF {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class HF {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zF {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class GF {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class WF {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Z_ {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let YF = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return RF(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        QF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function (t) {
                return YF.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Q_ {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = bd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = bd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Sd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Sd(t, this._root).map((n) => n.value);
        }
      }
      function bd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = bd(e, n);
          if (r) return r;
        }
        return null;
      }
      function Sd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Sd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class In {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function fo(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class X_ extends Q_ {
        constructor(t, n) {
          super(t), (this.snapshot = n), Md(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function J_(e, t) {
        const n = (function XF(e, t) {
            const s = new xa([], {}, {}, "", {}, U, t, null, e.root, -1, {});
            return new tD("", new In(s, []));
          })(e, t),
          r = new Ut([new Ci("", {})]),
          o = new Ut({}),
          i = new Ut({}),
          s = new Ut({}),
          a = new Ut(""),
          l = new ho(r, o, s, a, i, U, t, n.root);
        return (l.snapshot = n.root), new X_(new In(l, []), n);
      }
      class ho {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(z((u) => u[Di])) ?? x(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(z((t) => ao(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(z((t) => ao(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function eD(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function JF(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class xa {
        get title() {
          return this.data?.[Di];
        }
        constructor(t, n, r, o, i, s, a, l, u, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ao(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class tD extends Q_ {
        constructor(t, n) {
          super(n), (this.url = t), Md(this, n);
        }
        toString() {
          return nD(this._root);
        }
      }
      function Md(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Md(e, n));
      }
      function nD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(nD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Id(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            rn(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            rn(t.params, n.params) || e.params.next(n.params),
            (function hF(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!rn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            rn(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Ad(e, t) {
        const n =
          rn(e.params, t.params) &&
          (function yF(e, t) {
            return (
              dr(e, t) && e.every((n, r) => rn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Ad(e.parent, t.parent))
        );
      }
      function Ii(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function tP(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ii(e, r, o);
              return Ii(e, r);
            });
          })(e, t, n);
          return new In(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ii(e, a))),
                s
              );
            }
          }
          const r = (function nP(e) {
              return new ho(
                new Ut(e.url),
                new Ut(e.params),
                new Ut(e.queryParams),
                new Ut(e.fragment),
                new Ut(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ii(e, i));
          return new In(r, o);
        }
      }
      const Td = "ngNavigationCancelingError";
      function rD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = fr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = oD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function oD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Td] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function iD(e) {
        return sD(e) && fr(e.url);
      }
      function sD(e) {
        return e && e[Td];
      }
      class rP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ai()),
            (this.attachRef = null);
        }
      }
      let Ai = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new rP()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Na = !1;
      let Rd = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = U),
              (this.activateEvents = new ge()),
              (this.deactivateEvents = new ge()),
              (this.attachEvents = new ge()),
              (this.detachEvents = new ge()),
              (this.parentContexts = G(Ai)),
              (this.location = G(Lt)),
              (this.changeDetector = G(ea)),
              (this.environmentInjector = G(Yt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, Na);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, Na);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, Na);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new C(4013, Na);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new oP(n, a, o.injector);
            if (
              r &&
              (function iP(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = L({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Dt],
          })),
          e
        );
      })();
      class oP {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === ho
            ? this.route
            : t === Ai
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let xd = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Gt({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [dy],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && _n(0, "router-outlet");
            },
            dependencies: [Rd],
            encapsulation: 2,
          })),
          e
        );
      })();
      function aD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Gs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Fd(e) {
        const t = e.children && e.children.map(Fd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== U &&
            (n.component = xd),
          n
        );
      }
      function At(e) {
        return e.outlet || U;
      }
      function lD(e, t) {
        const n = e.filter((r) => At(r) === t);
        return n.push(...e.filter((r) => At(r) !== t)), n;
      }
      function Ti(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class cP {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Id(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = fo(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            $e(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = fo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = fo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = fo(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new WF(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new zF(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Id(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Id(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ti(o.snapshot),
                l = a?.get(Zo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class uD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Fa {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function dP(e, t, n) {
        const r = e._root;
        return Ri(r, t ? t._root : null, n, [r.value]);
      }
      function po(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function aE(e) {
              return null !== qi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Ri(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = fo(t);
        return (
          e.children.forEach((s) => {
            (function hP(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function pP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !dr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !dr(e.url, t.url) || !rn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Ad(e, t) || !rn(e.queryParams, t.queryParams);
                    default:
                      return !Ad(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new uD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Ri(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Fa(a.outlet.component, s));
              } else
                s && xi(t, a, o),
                  o.canActivateChecks.push(new uD(r)),
                  Ri(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          $e(i, (s, a) => xi(s, n.getContext(a), o)),
          o
        );
      }
      function xi(e, t, n) {
        const r = fo(e),
          o = e.value;
        $e(r, (i, s) => {
          xi(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Fa(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Ni(e) {
        return "function" == typeof e;
      }
      function Pd(e) {
        return e instanceof Da || "EmptyError" === e?.name;
      }
      const Pa = Symbol("INITIAL_VALUE");
      function go() {
        return nn((e) =>
          b_(
            e.map((t) =>
              t.pipe(
                so(1),
                (function sF(...e) {
                  const t = So(e);
                  return Pe((n, r) => {
                    (t ? fd(e, n, t) : fd(e, n)).subscribe(r);
                  });
                })(Pa)
              )
            )
          ).pipe(
            z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Pa) return Pa;
                  if (!1 === n || n instanceof Un) return n;
                }
              return !0;
            }),
            Mn((t) => t !== Pa),
            so(1)
          )
        );
      }
      function cD(e) {
        return (function cw(...e) {
          return wf(e);
        })(
          We((t) => {
            if (fr(t)) throw rD(0, t);
          }),
          z((t) => !0 === t)
        );
      }
      const Od = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function dD(e, t, n, r, o) {
        const i = kd(e, t, n);
        return i.matched
          ? (function xP(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? x(
                    o.map((s) => {
                      const a = po(s, e);
                      return $n(
                        (function DP(e) {
                          return e && Ni(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(go(), cD())
                : x(!0);
            })((r = aD(t, r)), t, n).pipe(z((s) => (!0 === s ? i : { ...Od })))
          : x(i);
      }
      function kd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Od }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || fF)(n, e, t);
        if (!o) return { ...Od };
        const i = {};
        $e(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Oa(e, t, n, r) {
        if (
          n.length > 0 &&
          (function PP(e, t, n) {
            return n.some((r) => ka(e, t, r) && At(r) !== U);
          })(e, n, r)
        ) {
          const i = new q(
            t,
            (function FP(e, t, n, r) {
              const o = {};
              (o[U] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && At(i) !== U) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[At(i)] = s);
                }
              return o;
            })(e, t, r, new q(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function OP(e, t, n) {
            return n.some((r) => ka(e, t, r));
          })(e, n, r)
        ) {
          const i = new q(
            e.segments,
            (function NP(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (ka(e, n, s) && !o[At(s)]) {
                  const a = new q([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[At(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new q(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function ka(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function fD(e, t, n, r) {
        return (
          !!(At(e) === r || (r !== U && ka(t, n, e))) &&
          ("**" === e.path || kd(t, e, n).matched)
        );
      }
      function hD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const La = !1;
      class Va {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class pD {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Fi(e) {
        return _i(new Va(e));
      }
      function gD(e) {
        return _i(new pD(e));
      }
      class jP {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Oa(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, U)
            .pipe(
              z((i) =>
                this.createUrlTree(
                  Aa(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              jn((i) => {
                if (i instanceof pD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Va ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, U)
            .pipe(
              z((o) => this.createUrlTree(Aa(o), t.queryParams, t.fragment))
            )
            .pipe(
              jn((o) => {
                throw o instanceof Va ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new C(4002, La);
        }
        createUrlTree(t, n, r) {
          const o = vd(t);
          return new Un(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(z((i) => new q([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Se(o).pipe(
            Vn((i) => {
              const s = r.children[i],
                a = lD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                z((l) => ({ segment: l, outlet: i }))
              );
            }),
            T_((i, s) => ((i[s.outlet] = s.segment), i), {}),
            R_()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Se(r).pipe(
            Vn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                jn((u) => {
                  if (u instanceof Va) return x(null);
                  throw u;
                })
              )
            ),
            Ln((a) => !!a),
            jn((a, l) => {
              if (Pd(a)) return hD(n, o, i) ? x(new q([], {})) : Fi(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return fD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Fi(n)
            : Fi(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? gD(i)
            : this.lineralizeSegments(r, i).pipe(
                ke((s) => {
                  const a = new q(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = kd(n, o, i);
          if (!a) return Fi(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? gD(d)
            : this.lineralizeSegments(o, d).pipe(
                ke((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = aD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? x({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new q(o, {})
                      )
                    )
                  )
                : x(new q(o, {})))
            : dD(n, r, o, t).pipe(
                nn(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          ke((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Oa(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new q(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                z((y) => new q(a, y))
                              );
                            if (0 === f.length && 0 === p.length)
                              return x(new q(a, {}));
                            const m = At(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? U : i,
                              !0
                            ).pipe(
                              z((w) => new q(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : Fi(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? x({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? x({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function RP(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? x(!0)
                    : x(
                        o.map((s) => {
                          const a = po(s, e);
                          return $n(
                            (function mP(e) {
                              return e && Ni(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(go(), cD());
                })(t, n, r).pipe(
                  ke((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          We((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function LP(e) {
                          return _i(oD(La, 3));
                        })()
                  )
                )
            : x({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return x(r);
            if (o.numberOfChildren > 1 || !o.children[U])
              return t.redirectTo, _i(new C(4e3, La));
            o = o.children[U];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Un(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            $e(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            $e(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new q(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new C(4001, La);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class UP {}
      class zP {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Oa(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            U
          ).pipe(
            z((n) => {
              if (null === n) return null;
              const r = new xa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  U,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new In(r, n),
                i = new tD(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = eD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return Se(Object.keys(r.children)).pipe(
            Vn((o) => {
              const i = r.children[o],
                s = lD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            T_((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function uF(e, t = !1) {
              return Pe((n, r) => {
                let o = 0;
                n.subscribe(
                  Re(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Ca(null),
            R_(),
            z((o) => {
              if (null === o) return null;
              const i = yD(o);
              return (
                (function GP(e) {
                  e.sort((t, n) =>
                    t.value.outlet === U
                      ? -1
                      : n.value.outlet === U
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return Se(n).pipe(
            Vn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            Ln((s) => !!s),
            jn((s) => {
              if (Pd(s)) return hD(r, o, i) ? x([]) : x(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !fD(n, r, o, i)) return x(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? F_(o).parameters : {},
              l = _D(r) + o.length;
            s = x({
              snapshot: new xa(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                DD(n),
                At(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                vD(r),
                l,
                CD(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = dD(r, n, o, t).pipe(
              z(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = _D(r) + l.length;
                  return {
                    snapshot: new xa(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      DD(n),
                      At(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      vD(r),
                      d,
                      CD(n)
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            nn((a) => {
              if (null === a) return x(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function WP(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Oa(
                  r,
                  u,
                  c,
                  f.filter((m) => void 0 === m.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  z((m) => (null === m ? null : [new In(l, m)]))
                );
              if (0 === f.length && 0 === p.length) return x([new In(l, [])]);
              const g = At(n) === i;
              return this.processSegment(d, f, h, p, g ? U : i).pipe(
                z((m) => (null === m ? null : [new In(l, m)]))
              );
            })
          );
        }
      }
      function qP(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function yD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!qP(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = yD(r.children);
          t.push(new In(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function vD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function _D(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function DD(e) {
        return e.data || {};
      }
      function CD(e) {
        return e.resolve || {};
      }
      function wD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Ld(e) {
        return nn((t) => {
          const n = e(t);
          return n ? Se(n).pipe(z(() => t)) : x(t);
        });
      }
      const mo = new S("ROUTES");
      let Vd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = G(Jy));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return x(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = $n(n.loadComponent()).pipe(
                z(bD),
                We((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                gd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new I_(r, () => new an()).pipe(hd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return x({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = N_(l.get(mo, [], P.Self | P.Optional))));
                  return { routes: u.map(Fd), injector: l };
                }),
                gd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new I_(i, () => new an()).pipe(hd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return $n(n()).pipe(
              z(bD),
              ke((r) =>
                r instanceof uy || Array.isArray(r)
                  ? x(r)
                  : Se(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function bD(e) {
        return (function tO(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let $a = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new an()),
              (this.configLoader = G(Vd)),
              (this.environmentInjector = G(Yt)),
              (this.urlSerializer = G(wi)),
              (this.rootContexts = G(Ai)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => x(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new BF(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new UF(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Ut({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Mi,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Mn((r) => 0 !== r.id),
                z((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                nn((r) => {
                  let o = !1,
                    i = !1;
                  return x(r).pipe(
                    We((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    nn((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Ra(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Bt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          SD(s.source) && (n.browserUrlTree = s.extractedUrl),
                          x(s).pipe(
                            nn((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new wd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? Bt
                                  : Promise.resolve(c)
                              );
                            }),
                            (function $P(e, t, n, r) {
                              return nn((o) =>
                                (function VP(e, t, n, r, o) {
                                  return new jP(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  z((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            We((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function YP(e, t, n, r, o) {
                              return ke((i) =>
                                (function HP(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new zP(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      nn((a) =>
                                        null === a
                                          ? (function BP(e) {
                                              return new me((t) => t.error(e));
                                            })(new UP())
                                          : x(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(z((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            We((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new kF(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new wd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const m = J_(d, this.rootComponentType).snapshot;
                        return x(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Ra(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Bt
                        );
                      }
                    }),
                    We((s) => {
                      const a = new LF(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    z(
                      (s) =>
                        (r = {
                          ...s,
                          guards: dP(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function wP(e, t) {
                      return ke((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? x({ ...n, guardsResult: !0 })
                          : (function EP(e, t, n, r) {
                              return Se(e).pipe(
                                ke((o) =>
                                  (function TP(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? x(
                                          i.map((a) => {
                                            const l = Ti(t) ?? o,
                                              u = po(a, l);
                                            return $n(
                                              (function _P(e) {
                                                return e && Ni(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    u(e, t, n, r)
                                                  )
                                            ).pipe(Ln());
                                          })
                                        ).pipe(go())
                                      : x(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Ln((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              ke((a) =>
                                a &&
                                (function gP(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function bP(e, t, n, r) {
                                      return Se(t).pipe(
                                        Vn((o) =>
                                          fd(
                                            (function MP(e, t) {
                                              return (
                                                null !== e && t && t(new HF(e)),
                                                x(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function SP(e, t) {
                                              return (
                                                null !== e && t && t(new GF(e)),
                                                x(!0)
                                              );
                                            })(o.route, r),
                                            (function AP(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function fP(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    M_(() =>
                                                      x(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              Ti(s.node) ?? n,
                                                            c = po(l, u);
                                                          return $n(
                                                            (function vP(e) {
                                                              return (
                                                                e &&
                                                                Ni(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(Ln());
                                                        })
                                                      ).pipe(go())
                                                    )
                                                  );
                                              return x(i).pipe(go());
                                            })(e, o.path, n),
                                            (function IP(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return x(!0);
                                              const o = r.map((i) =>
                                                M_(() => {
                                                  const s = Ti(t) ?? n,
                                                    a = po(i, s);
                                                  return $n(
                                                    (function yP(e) {
                                                      return (
                                                        e && Ni(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Ln());
                                                })
                                              );
                                              return x(o).pipe(go());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Ln((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : x(a)
                              ),
                              z((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    We((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), fr(s.guardsResult))
                      )
                        throw rD(0, s.guardsResult);
                      const a = new VF(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    Mn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Ld((s) => {
                      if (s.guards.canActivateChecks.length)
                        return x(s).pipe(
                          We((a) => {
                            const l = new jF(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          nn((a) => {
                            let l = !1;
                            return x(a).pipe(
                              (function ZP(e, t) {
                                return ke((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return x(n);
                                  let i = 0;
                                  return Se(o).pipe(
                                    Vn((s) =>
                                      (function QP(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !wD(o) &&
                                            (i[Di] = o.title),
                                          (function XP(e, t, n, r) {
                                            const o = (function JP(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return x({});
                                            const i = {};
                                            return Se(o).pipe(
                                              ke((s) =>
                                                (function eO(e, t, n, r) {
                                                  const o = Ti(t) ?? r,
                                                    i = po(e, o);
                                                  return $n(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Ln(),
                                                  We((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              pd(1),
                                              (function cF(e) {
                                                return z(() => e);
                                              })(i),
                                              jn((s) => (Pd(s) ? Bt : _i(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            z(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = eD(e, n).resolve),
                                                o &&
                                                  wD(o) &&
                                                  (e.data[Di] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    We(() => i++),
                                    pd(1),
                                    ke((s) => (i === o.length ? x(n) : Bt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              We({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          We((a) => {
                            const l = new $F(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Ld((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              We((c) => {
                                l.component = c;
                              }),
                              z(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return b_(a(s.targetSnapshot.root)).pipe(Ca(), so(1));
                    }),
                    Ld(() => this.afterPreactivation()),
                    z((s) => {
                      const a = (function eP(e, t, n) {
                        const r = Ii(e, t._root, n ? n._root : void 0);
                        return new X_(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    We((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      z(
                        (r) => (
                          new cP(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    so(1),
                    We({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new hr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    gd(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    jn((s) => {
                      if (((i = !0), sD(s))) {
                        iD(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Ta(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), iD(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || SD(r.source),
                            };
                          n.scheduleNavigation(l, Mi, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new Ed(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return Bt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ta(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function SD(e) {
        return e !== Mi;
      }
      let MD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === U));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Di];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return G(nO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        nO = (() => {
          class e extends MD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(v_));
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        rO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return G(iO);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class oO {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let iO = (() => {
        class e extends oO {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = je(e)))(r || e);
            };
          })()),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ua = new S("", { providedIn: "root", factory: () => ({}) });
      let aO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({
              token: e,
              factory: function () {
                return G(lO);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        lO = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function uO(e) {
        throw e;
      }
      function cO(e, t, n) {
        return t.parse("/");
      }
      const dO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        fO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Oe = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = G($T)),
                (this.isNgZoneEnabled = !1),
                (this.options = G(Ua, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || uO),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || cO),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = G(aO)),
                (this.routeReuseStrategy = G(rO)),
                (this.urlCreationStrategy = G(QF)),
                (this.titleStrategy = G(MD)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = N_(G(mo, { optional: !0 }) ?? [])),
                (this.navigationTransitions = G($a)),
                (this.urlSerializer = G(wi)),
                (this.location = G(Uc)),
                (this.isNgZoneEnabled =
                  G(De) instanceof De && De.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new Un()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = J_(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Mi, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = "popstate" === n.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const l = { ...o };
                delete l.navigationId,
                  delete l.ɵrouterPageId,
                  0 !== Object.keys(l).length && (i.state = l);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(Fd)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: l,
                } = r,
                u = l ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = i || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  n,
                  c,
                  u ?? null
                )
              );
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const o = fr(n) ? n : this.parseUrl(n),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, Mi, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function hO(e) {
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new C(4008, false);
                  }
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let o;
              if (
                ((o = !0 === r ? { ...dO } : !1 === r ? { ...fO } : r), fr(n))
              )
                return O_(this.currentUrlTree, n, o);
              const i = this.parseUrl(n);
              return O_(this.currentUrlTree, i, o);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, o) => {
                const i = n[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(n, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, l, u, c;
              return (
                s
                  ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                  : (u = new Promise((d, f) => {
                      (a = d), (l = f);
                    })),
                (c =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: c,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: i,
                  resolve: a,
                  reject: l,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(n, r) {
              const o = this.urlSerializer.serialize(n);
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(o, "", s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
                this.location.go(o, "", i);
              }
            }
            restoreHistory(n, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const i =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === i &&
                    (this.resetState(n),
                    (this.browserUrlTree = n.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(n, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Ba = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new an());
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === l || "area" === l),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((u) => {
                      u instanceof hr && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(n) {
              this._preserveFragment = io(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = io(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = io(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function kp(e, t, n) {
                      return (function k0(e, t) {
                        return ("src" === t &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === t && ("base" === e || "link" === e))
                          ? Op
                          : nr;
                      })(
                        t,
                        n
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", n);
            }
            applyAttributeValue(n, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(Oe),
                D(ho),
                (function ps(e) {
                  return (function sb(e, t) {
                    if ("class" === t) return e.classes;
                    if ("style" === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = n[o];
                        if (Mh(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof n[o]; ) o++;
                        else {
                          if (i === t) return n[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(Ve(), e);
                })("tabindex"),
                D(mn),
                D(ht),
                D(cr)
              );
            }),
            (e.ɵdir = L({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  _e("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & n && Jt("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Dt],
            })),
            e
          );
        })();
      class ID {}
      let mO = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Mn((n) => n instanceof hr),
                Vn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Gs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Se(o).pipe(mr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : x(null);
              const i = o.pipe(
                ke((s) =>
                  null === s
                    ? x(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Se([i, this.loader.loadComponent(r)]).pipe(mr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Oe), A(Jy), A(Yt), A(ID), A(Vd));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const $d = new S("");
      let AD = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof wd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof hr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Z_ &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Z_(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function hg() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var gt = (() => (
        ((gt = gt || {})[(gt.COMPLETE = 0)] = "COMPLETE"),
        (gt[(gt.FAILED = 1)] = "FAILED"),
        (gt[(gt.REDIRECTING = 2)] = "REDIRECTING"),
        gt
      ))();
      const yo = !1;
      function Bn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const Ud = new S("", { providedIn: "root", factory: () => !1 });
      function RD() {
        const e = G(Zt);
        return (t) => {
          const n = e.get(Xs);
          if (t !== n.components[0]) return;
          const r = e.get(Oe),
            o = e.get(xD);
          1 === e.get(Bd) && r.initialNavigation(),
            e.get(ND, null, P.Optional)?.setUpPreloading(),
            e.get($d, null, P.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const xD = new S(yo ? "bootstrap done indicator" : "", {
          factory: () => new an(),
        }),
        Bd = new S(yo ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function CO() {
        let e = [];
        return (
          (e = yo
            ? [
                {
                  provide: Ss,
                  multi: !0,
                  useFactory: () => {
                    const t = G(Oe);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function qF(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          Bn(1, e)
        );
      }
      const ND = new S(yo ? "router preloader" : "");
      function wO(e) {
        return Bn(0, [
          { provide: ND, useExisting: mO },
          { provide: ID, useExisting: e },
        ]);
      }
      const Pi = !1,
        FD = new S(
          Pi ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        EO = [
          Uc,
          { provide: wi, useClass: md },
          Oe,
          Ai,
          {
            provide: ho,
            useFactory: function TD(e) {
              return e.routerState.root;
            },
            deps: [Oe],
          },
          Vd,
          Pi ? { provide: Ud, useValue: !0 } : [],
        ];
      function bO() {
        return new av("Router", Oe);
      }
      let PD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                EO,
                Pi && r?.enableTracing ? CO().ɵproviders : [],
                { provide: mo, multi: !0, useValue: n },
                {
                  provide: FD,
                  useFactory: AO,
                  deps: [[Oe, new $o(), new Uo()]],
                },
                { provide: Ua, useValue: r || {} },
                r?.useHash
                  ? { provide: cr, useClass: IR }
                  : { provide: cr, useClass: Rv },
                {
                  provide: $d,
                  useFactory: () => {
                    const e = G(Wx),
                      t = G(De),
                      n = G(Ua),
                      r = G($a),
                      o = G(wi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new AD(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? wO(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: av, multi: !0, useFactory: bO },
                r?.initialNavigation ? TO(r) : [],
                [
                  { provide: OD, useFactory: RD },
                  { provide: sv, multi: !0, useExisting: OD },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: mo, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(FD, 8));
          }),
          (e.ɵmod = Rt({ type: e })),
          (e.ɵinj = vt({ imports: [xd] })),
          e
        );
      })();
      function AO(e) {
        if (Pi && e)
          throw new C(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function TO(e) {
        return [
          "disabled" === e.initialNavigation
            ? Bn(3, [
                {
                  provide: Ys,
                  multi: !0,
                  useFactory: () => {
                    const t = G(Oe);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Bd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Bn(2, [
                { provide: Bd, useValue: 0 },
                {
                  provide: Ys,
                  multi: !0,
                  deps: [Zt],
                  useFactory: (t) => {
                    const n = t.get(SR, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(Oe),
                              i = t.get(xD);
                            (function yO(e, t) {
                              e.events
                                .pipe(
                                  Mn(
                                    (n) =>
                                      n instanceof hr ||
                                      n instanceof Ta ||
                                      n instanceof Ed ||
                                      n instanceof Ra
                                  ),
                                  z((n) =>
                                    n instanceof hr || n instanceof Ra
                                      ? gt.COMPLETE
                                      : n instanceof Ta &&
                                        (0 === n.code || 1 === n.code)
                                      ? gt.REDIRECTING
                                      : gt.FAILED
                                  ),
                                  Mn((n) => n !== gt.REDIRECTING),
                                  so(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get($a).afterPreactivation = () => (
                                r(!0), i.closed ? x(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const OD = new S(Pi ? "Router Initializer" : ""),
        xO = [
          {
            id: "7",
            name: "L'Oreal Paris Elvive Glycolic Gloss Shampoo 200ml",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/46625f8b-f3c3-4da6-8aa7-338974d597c1/3f82ae88-7fc5-4616-8d35-0fe88464da8b_1515991246.jpeg?h=960&w=960",
            description:
              "Shiny hair is healthy-looking hair because its smooth surface perfectly reflects light. Hair damage disrupts cuticles, making fibres rough, porous, and dull unable to reflect light.",
          },
          {
            id: "8",
            name: "Pepsi Max No Sugar Cola Cans 24x330ml",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/31ae4150-f1ee-4198-bc13-8a3a71985bae/2721dd4c-db95-4b3e-8fca-16d9e45a70b4_294645174.jpeg?h=960&w=960",
            description:
              "Pepsi MAX is the fizz-popping, taste rocking, sugar free cola - bursting with taste and bold refreshment. The perfect drink for fun times together, at home or on the go!.",
          },
          {
            id: "9",
            name: "Carlsberg Danish Pilsner Lager Beer Can 18x440ml",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/09373ec1-c545-4065-9a88-edff1d4e2a2a/bbd80b5e-8de9-49c2-bceb-94deecf3d907_748578954.jpeg?h=960&w=960",
            description:
              "At Carlsberg, the pursuit of better beer is in our DNA. More than 170 years after our founder J.C. Jacobsen mastered the art of brewing great Pilsner, we're still looking for ways to improve our beer. Our perfectly balanced Danish Pilsner is wonderfully crisp and refreshing, with a fuller flavour and a distinctive hop aroma. Worth a try? Probably. J.C. Jacobsen. ",
          },
          {
            id: "10",
            name: "Oral-B Pro C/Act Electric Replacement White Toothbrush Heads 5 Pack",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/5e0b496e-c249-4a61-9a71-321e3328273a/c603c48b-c671-47f5-b2ea-92bdedec30ad_1225747896.jpeg?h=960&w=960",
            description:
              "The Oral-B Pro Cross Action electric toothbrush head features more than 2200 perfectly angled bristles to remove up to 100% more bacterial plaque for cleaner teeth & healthier gums vs. a manual toothbrush.",
          },
          {
            id: "11",
            price: "$40",
            name: "Tesco 70 Pork Cocktail Sausages 595G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/5b5e1feb-7093-460c-95e7-85cc22edd2bc/c293b812-d36e-497f-989e-e5ff02f6487f.jpeg?h=960&w=960",
            description:
              "While every care has been taken to ensure product information is correct, food products are constantly being reformulated, so ingredients, nutrition content, dietary and allergens may change. You should always read the product label and not rely solely on the information provided on the website",
          },
        ],
        NO = [
          {
            id: "17",
            price: "$20",
            name: "Dettol Antibacterial Multi Surface Cleaning Wipes 126 Pack",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/df255edd-1193-4c8b-9da6-b5ea2a46aaf7/bc416900-def2-4379-85fb-a6d94bdd3de5_1566044359.jpeg?h=960&w=960",
            description:
              " Kills 99.9% of Bacteria & Viruses*: Including Covid -19 Virus** and antibiotic MRSA, E.coli, Salmonella, Rotavirus, Flu virus (H1N1) and 90% of all allergens.",
          },
          {
            id: "18",
            price: "$20",
            name: "Walkers Sensations Poppadoms Mango & Chilli Sharing Bag 82.5g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/047f7c90-8ffb-407c-bb72-046c7f1b6dcc/7dadb624-526f-47fd-8d43-61b127baabc5_685967532.jpeg?h=960&w=960",
            description:
              "Mango and Red Chilli Chutney Flavour Potato and Gram Flour Snack.",
          },
          {
            id: "19",
            price: "$20",
            name: "Jack Daniel's Tennessee Whiskey 1L",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/e3d10dfe-6398-4ace-bbb2-a42b2bf35b36/75b23c5f-d09e-4b8a-bc61-edb2ca93c986.jpeg?h=960&w=960",
            description:
              "Jack Daniel’s Tennessee Whiskey comes from the United States oldest registered distillery and is charcoal mellowed through 10 feet of sugar maple charcoal..",
          },
          {
            id: "20",
            price: "$30",
            name: "Sullivan Slim Knitlike Chino Trouser",
            imageUrl:
              "https://www.optimized-rlmedia.io/is/image/PoloGSI/s7-1415668_lifestyle?$rl_df_pdp_5_7_lif$",
            description:
              "The Sullivan features a low rise and is trim through the seat and the thigh with a tapered leg. This pair is crafted from a knit-like cotton dobby fabric that features extra stretch for comfort.",
          },
          {
            id: "21",
            price: "$5.80",
            name: "Blue Dragon Wholewheat Noodles 250g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/a01cc8d0-ce14-44cf-a511-5f9195a2cdf8/1d0253bf-5764-46a5-ac47-dabd14e3725a_324791642.jpeg?h=960&w=960",
            description:
              "Wholemeal Wheat Flour (60%), Wheat Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Water, Salt, Firming Agents (Potassium Carbonate, Sodium Carbonate).",
          },
        ],
        kD = [
          {
            id: "1",
            price: "$20",
            name: "Hellmann's Light Mayonnaise Jar 600g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/d65d0553-966c-473f-869b-5b154f69c6bf/6bf304a2-e5da-4210-9f0c-1332f781fbc6_957508879.jpeg?h=960&w=960",
            description:
              "Hellmann's Light Mayonnaise adds an unmistakable amazing taste and creaminess to the simplest of ingredients, bringing out the best in your food – with 65% less fat*",
          },
          {
            id: "2",
            price: "$250",
            name: "Tesco Organic Fair Trade Bananas 5 Pack",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/de20882e-3b1f-4e69-b667-0203dd7e9a62/faf7ab2b-12a8-4a93-bc7d-e6f809e7afbc_466958296.jpeg?h=960&w=960",
            description:
              "Responsibly Grown. Hand picked and gently ripened with a sweet flavour..",
          },
          {
            id: "3",
            price: "$10",
            name: "Tesco Organic Carrots 700G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/d0b62479-d1dc-4b37-bb1f-b59e544771df/7be7d790-db00-4f9f-9bf7-8df543f3d50f_1595564162.jpeg?h=960&w=960",
            description:
              "Sweet & crunchy Harvested early in the morning, great eaten raw or roasted Working with trusted growers who share our commitment to the environment and responsible farming, all our organic fruit and vegetables are grown in harmony with nature .",
          },
          {
            id: "4",
            price: "$15",
            name: "Tesco Organic Large On The Vine Tomatoes 400G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/15003768-9be5-4323-8717-b4aec095f28a/a1ff0b1b-8fca-49cd-9a64-a6f957072c2e.jpeg?h=960&w=960",
            description:
              "Hand picked. Brought to you on the vine for fresh aroma and flavour. Working with trusted growers who share our committment to the environment and responsible farming. ",
          },
          {
            id: "5",
            price: "$220",
            name: "Water-repellent crinkle-nylon bodywarmer with all-over quilted lettering embroidery",
            imageUrl:
              "https://www.armani.com/variants/images/1647597313635559/F/w2500.jpg",
            description:
              "Blazer made of wool-blend jersey featuring a single-breasted fastening and detachable inner panel with full zip and drawstring.",
          },
          {
            id: "6",
            price: "$200",
            name: "Jack Daniel's Tennessee Honey 1L",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/9eefc243-e52f-487f-99be-4edf57de66c2/20d3771d-8593-46f0-9dfa-0e5b463ea411.jpeg?h=960&w=960",
            description:
              "Jack Daniel’s Tennessee Honey is a delicious, complex Jack. It delivers the bold character of Jack Daniel’s Tennessee Whiskey with the taste of rich honey and a nutty finish. Described by our Master Distiller, Chris Fletcher, as being ‘like a slice of pecan pie in a glass of Jack’, Jack Daniel’s Tennessee Honey is best enjoyed on the rocks or in a variety of cocktails.",
          },
          {
            id: "7",
            price: "$100",
            name: "Andrex Classic Clean Toilet Tissue Standard Rolls 9 Rolls x 8 Sheets",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/c4028d79-127f-4d98-9c96-f9c07c14eca7/dd0f7a6f-d8df-4468-b5b5-4fa795718aea_1769356193.jpeg?h=960&w=960",
            description:
              "Andrex® wants you to feel clean and confident every day. Each sheet of Andrex® Classic Clean Toilet Tissue features our unique 3D Wave™ texture that is proven to clean effectively*, giving you a better clean with fewer sheets.",
          },
          {
            id: "8",
            price: "$150",
            name: "Ariel All In One Washing Liquid Pods Original 25 Washes 490Gt",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/dc58f381-4254-4134-bab8-5105aaddeb5a/c1da78c1-4e7d-4fb0-8591-b71e2f5c8bb0_2099202762.jpeg?h=960&w=960",
            description:
              "Ariel All-in-1 PODS® washing capsules laundry detergent Original provide brilliant stain removal even in a cold wash. They have been designed for cold, with unique technologies like COOL CLEAN Technology..",
          },
          {
            id: "9",
            price: "$170",
            name: "McCain 4 Baked Jacket Potatoes 800G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/8cb185fc-b8e6-411d-9820-1e556b3b2a9f/ecd095bc-7524-4c30-bced-2d2758d70f6a.jpeg?h=960&w=960",
            description:
              "Here at McCain we're a family owned foods company and we know good, honest food tastes best. That's why we keep things simple. ",
          },
          {
            id: "10",
            price: "$150",
            name: "Chicago Town Crispy Thin Loaded Cheese Pizza 439G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/7d2cb451-1481-4df8-9d0d-633e24e057d9/b9f29e0e-0fff-4955-9f0c-6f3b09da8a4b.jpeg?h=960&w=960",
            description:
              "Thin and crispy pizza base with tomato sauce, a blend of mozzarella, mature Cheddar, Monterey Jack and Emmental cheese. Like us? For great offers and competitions follow us on social media or get updates direct to your inbox at chicagotown.com.",
          },
          {
            id: "11",
            price: "$200",
            name: "Youngs Gastro Jumbo Wholetail Scampi 230G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/e03bb884-a8bd-4ff0-a4b7-65ea8f726923/67d04b70-7517-4de3-b3b5-3d1a8a53244a.jpeg?h=960&w=960",
            description:
              "Scampi (40%) (Crustacean), Wheat Flour [Wheat Flour, Calcium Carbonate, Iron, Niacin (B3), Thiamin (B1)], Water, Rapeseed Oil, Rice Flour, Potato Starch, Wheat Starch, Wheat Gluten, Salt, Oat Fibre, Yeast, Raising Agents: Diphosphates, Sodium Bicarbonate, Stabilisers: Sodium Carbonate, Sodium Bicarbonate, Citric Acid, Cornflour, White Peppe.",
          },
          {
            id: "12",
            price: "$16.90",
            name: "McCain Crispy French Fries 900g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/abbff646-eb78-4f78-beee-9d931569ada8/82c80f54-4321-4560-ad8d-afb073d10616.jpeg?h=960&w=960",
            description:
              "We believe every family should be able to enjoy mealtimes together, taking time for the little moments that matter. For some families, this isn't always possible. That's why McCain have committed to donating... £1M to Family Fund by 2023, to help them reach their goal of providing 150,000 grants & services to UK families with disabled and seriously ill children..",
          },
          {
            id: "13",
            price: "$2.50",
            name: "Lenor Unstoppables In-Wash Scent Booster Dreams 320G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/be69dac5-26c4-4ddc-acfa-af5bc19fd814/b0b103c4-86d6-49bd-adaa-967a04e91770_1877886513.jpeg?h=960&w=960",
            description:
              "Discover Lenor Unstoppables in wash scent booster, formulated with long lasting freshness technology, to provide your laundry with a boost of non stop freshness up to 12 weeks in storage..",
          },
          {
            id: "14",
            price: "$15.90",
            name: "Oversized-fit heavyweight jersey T-shirt with painted effect print",
            imageUrl:
              "https://www.armani.com/variants/images/1647597313594824/F/w2500.jpg",
            description:
              "Oversized-fit crew-neck T-shirt in pure cotton heavyweight jersey, featuring a distinctive print that covers the front and back.",
          },
          {
            id: "15",
            price: "$14.80",
            name: "Finish Ultimate Plus All In 1 Dishwasher Tablets x52 634.4g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/7d9af0f5-ee78-40a5-9d2c-276e2b50a444/4e55f28f-5513-439b-a8b0-71d929ee6dfa_1275227753.jpeg?h=960&w=960",
            description:
              "UNBEATABLE CLEAN1: Let your dishwasher and the powerful Finish Ultimate Plus formula take care of your dirty dishes with its unbeatable clean1 without pre-rinsing2.",
          },
          {
            id: "16",
            price: "$15.80",
            name: "Persil Non Bio 3 In 1 Laundry Washing Capsules 32 Washes 675.2G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/38734396-31d8-416e-af9b-50d23305aaec/02f26d95-b955-41ea-a1a0-ad2fa61926a9_1996655097.jpeg?h=960&w=960",
            description:
              "Featuring superior fabric-cleaning technology, Persil Non Bio 3 in 1 Washing Capsules keep whites bright* and provide outstanding stain removal while remaining gentle next to sensitive skin.",
          },
          {
            id: "17",
            price: "$1.90",
            name: "Yazoo Chilled Chocolate Flavour Milkshake 400Ml",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/8e0dc4ee-75d2-476a-8db1-01bf7f8e1dcb/4215917b-6457-4358-b392-2688fd5c23b3.jpeg?h=960&w=960",
            description:
              "emi Skimmed Milk, Skimmed Milk, Sugar, Fat Reduced Cocoa Powder (1%), Stabilisers: Cellulose, Cellulose Gum and Carrageenan, Natural Flavouring",
          },
          {
            id: "18",
            price: "$200",
            name: "Freixenet Italian Sparkling Rose 75Cl",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/362b91b8-8a5e-41a5-bc0a-2b6903ba2e33/3a570790-3596-4d93-aa43-a0ab40353426_989786578.jpeg?h=960&w=960",
            description:
              "A family-owned business with over 150 years of wine-making heritage in the Catalonia region west of Barcelona, Freixenet is renowned for the quality and consistency of its sparkling wine. With a clear mission to help people celebrate more, Freixenet creates quality fizz with a dash of style, in every bottle..",
          },
          {
            id: "19",
            price: "$120",
            name: "Tesco Smoked Salmon 100g",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/1797ac6e-fcea-4375-9ebb-25e3ce09be0c/8e4a8c1b-f8cf-4051-8df3-f6c30b064c6a.jpeg?h=960&w=960",
            description:
              "Our Smoked Salmon is farmed in waters off the coast of Norway or Scotland. Cured to lock in succulence, then gently kiln smoked using smouldering oak for robustness and beechwood for a subtle sweetness. Finally it is left to mature to allow the flavour to develop before slicin.",
          },
          {
            id: "20",
            price: "$110",
            name: "Sullivan Slim Knitlike Chino Trouser",
            imageUrl:
              "https://www.optimized-rlmedia.io/is/image/PoloGSI/s7-1415668_lifestyle?$rl_df_pdp_5_7_lif$",
            description:
              "The Sullivan features a low rise and is trim through the seat and the thigh with a tapered leg. This pair is crafted from a knit-like cotton dobby fabric that features extra stretch for comfort.",
          },
          {
            id: "21",
            price: "$120",
            name: "Muller Corner Vanilla & Banana Chocolate Balls & Flakes 6 X 124G",
            imageUrl:
              "https://digitalcontent.api.tesco.com/v2/media/ghs/2a2ccaab-2f90-49a1-9404-0b7dcb3c942f/c3bec78d-c8a1-474e-b9b6-2bf455dae265.jpeg?h=960&w=960",
            description:
              "Our best-selling Corner: you've made a delicious decision with this one. Thick and creamy vanilla flavour yogurt with crunchy milk & white chocolate coated puffed rice balls on the side! Müllerlicious!.",
          },
        ];
      function LD(e, t, n, r, o, i, s) {
        try {
          var a = e[i](s),
            l = a.value;
        } catch (u) {
          return void n(u);
        }
        a.done ? t(l) : Promise.resolve(l).then(r, o);
      }
      function vo(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (r, o) {
            var i = e.apply(t, n);
            function s(l) {
              LD(i, r, o, s, a, "next", l);
            }
            function a(l) {
              LD(i, r, o, s, a, "throw", l);
            }
            s(void 0);
          });
        };
      }
      class Ha {}
      class Hd {}
      class An {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.entries(t).forEach(([n, r]) => {
                            let o;
                            if (
                              ((o =
                                "string" == typeof r
                                  ? [r]
                                  : "number" == typeof r
                                  ? [r.toString()]
                                  : r.map((i) => i.toString())),
                              o.length > 0)
                            ) {
                              const i = n.toLowerCase();
                              this.headers.set(i, o),
                                this.maybeSetNormalizedName(n, i);
                            }
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof An
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new An();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof An
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class FO {
        encodeKey(t) {
          return VD(t);
        }
        encodeValue(t) {
          return VD(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const OO = /%(\d[a-f0-9])/gi,
        kO = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function VD(e) {
        return encodeURIComponent(e).replace(OO, (t, n) => kO[n] ?? t);
      }
      function za(e) {
        return `${e}`;
      }
      class Hn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new FO()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function PO(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(za) : [za(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Hn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(za(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(za(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class LO {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function jD(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function $D(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function UD(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Oi {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function VO(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new An()),
            this.context || (this.context = new LO()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Hn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : jD(this.body) ||
              $D(this.body) ||
              UD(this.body) ||
              (function jO(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Hn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || UD(this.body)
            ? null
            : $D(this.body)
            ? this.body.type || null
            : jD(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Hn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            u = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                u
              )),
            new Oi(n, r, i, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var Te = (() => (
        ((Te = Te || {})[(Te.Sent = 0)] = "Sent"),
        (Te[(Te.UploadProgress = 1)] = "UploadProgress"),
        (Te[(Te.ResponseHeader = 2)] = "ResponseHeader"),
        (Te[(Te.DownloadProgress = 3)] = "DownloadProgress"),
        (Te[(Te.Response = 4)] = "Response"),
        (Te[(Te.User = 5)] = "User"),
        Te
      ))();
      class zd {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new An()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Gd extends zd {
        constructor(t = {}) {
          super(t), (this.type = Te.ResponseHeader);
        }
        clone(t = {}) {
          return new Gd({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ga extends zd {
        constructor(t = {}) {
          super(t),
            (this.type = Te.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ga({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class BD extends zd {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Wd(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let HD = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Oi) i = n;
            else {
              let l, u;
              (l = o.headers instanceof An ? o.headers : new An(o.headers)),
                o.params &&
                  (u =
                    o.params instanceof Hn
                      ? o.params
                      : new Hn({ fromObject: o.params })),
                (i = new Oi(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: u,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = x(i).pipe(Vn((l) => this.handler.handle(l)));
            if (n instanceof Oi || "events" === o.observe) return s;
            const a = s.pipe(Mn((l) => l instanceof Ga));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(z((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Hn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Wd(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Wd(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Wd(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Ha));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function zD(e, t) {
        return t(e);
      }
      function $O(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const BO = new S("HTTP_INTERCEPTORS"),
        ki = new S("HTTP_INTERCEPTOR_FNS");
      function HO() {
        let e = null;
        return (t, n) => (
          null === e &&
            (e = (G(BO, { optional: !0 }) ?? []).reduceRight($O, zD)),
          e(t, n)
        );
      }
      let GD = (() => {
        class e extends Ha {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null);
          }
          handle(n) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(ki)));
              this.chain = r.reduceRight(
                (o, i) =>
                  (function UO(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(o, i, this.injector),
                zD
              );
            }
            return this.chain(n, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Hd), A(Yt));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const qO = /^\)\]\}',?\n/;
      let qD = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new me((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new An(o.getAllResponseHeaders()),
                    g =
                      (function KO(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new Gd({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: m } = a(),
                    v = null;
                  204 !== p &&
                    (v = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = v ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof v) {
                    const y = v;
                    v = v.replace(qO, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (T) {
                      (v = y), w && ((w = !1), (v = { error: T, text: v }));
                    }
                  }
                  w
                    ? (r.next(
                        new Ga({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new BD({
                          error: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    g = new BD({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: Te.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: Te.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", u),
                o.addEventListener("timeout", u),
                o.addEventListener("abort", u),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: Te.Sent }),
                () => {
                  o.removeEventListener("error", u),
                    o.removeEventListener("abort", u),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", u),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Zv));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const qd = new S("XSRF_ENABLED"),
        KD = new S("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        YD = new S("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class ZD {}
      let QO = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = $v(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(Je), A(Sc), A(KD));
          }),
          (e.ɵprov = R({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function XO(e, t) {
        const n = e.url.toLowerCase();
        if (
          !G(qd) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = G(ZD).getToken(),
          o = G(YD);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var Ee = (() => (
        ((Ee = Ee || {})[(Ee.Interceptors = 0)] = "Interceptors"),
        (Ee[(Ee.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (Ee[(Ee.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (Ee[(Ee.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (Ee[(Ee.JsonpSupport = 4)] = "JsonpSupport"),
        (Ee[(Ee.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        Ee
      ))();
      function _o(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function JO(...e) {
        const t = [
          HD,
          qD,
          GD,
          { provide: Ha, useExisting: GD },
          { provide: Hd, useExisting: qD },
          { provide: ki, useValue: XO, multi: !0 },
          { provide: qd, useValue: !0 },
          { provide: ZD, useClass: QO },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function L0(e) {
          return { ɵproviders: e };
        })(t);
      }
      const QD = new S("LEGACY_INTERCEPTOR_FN");
      let t1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = vt({
              providers: [
                JO(
                  _o(Ee.LegacyInterceptors, [
                    { provide: QD, useFactory: HO },
                    { provide: ki, useExisting: QD, multi: !0 },
                  ])
                ),
              ],
            })),
            e
          );
        })(),
        et = (() => {
          class e {
            constructor(n) {
              (this.http = n),
                (this.all_products = []),
                (this._API_URL = "http://localhost:3000"),
                (this._GET_CART_BY_TOKEN = "/api/get_cart_by_token"),
                (this._DELETE_CART_BY_TOKEN = "/api/delete_cart_by_token"),
                (this._DELETE_ITEM_FROM_CART_BY_TOKEN =
                  "/api/delete_item_from_cart_by_token"),
                (this._ADD_ITEM_TO_CART_BY_TOKEN =
                  "/api/add_item_to_cart_by_token"),
                (e.user_token = localStorage.getItem("token")),
                (this.all_products = kD);
            }
            static #e = (this.product_to_open = null);
            static #t = (this.cart_products = []);
            static #n = (this.user_token = null);
            static #r = (this.loading_cart = !0);
            getProduct(n) {
              for (let r = 0; r < this.all_products.length; r++)
                if (this.all_products[r].id == n) return this.all_products[r];
              return { id: "", name: "", imageUrl: "", description: "" };
            }
            getCartPrice() {
              var n = this;
              return new Promise(
                (function () {
                  var r = vo(function* (o, i) {
                    console.log("need to wait here"), yield n.getCartFromDB();
                    let s = e.cart_products;
                    console.log(s);
                    let a = 0;
                    for (let l = 0; l < s.length; l++)
                      a += parseInt(s[l].price.replace(/\D/g, ""));
                    o(a);
                  });
                  return function (o, i) {
                    return r.apply(this, arguments);
                  };
                })()
              );
            }
            getCartFromDB() {
              var n = this;
              return vo(function* () {
                const r = localStorage.getItem("token");
                return (
                  console.log("getting items of", r),
                  r
                    ? yield n.http
                        .get(n._API_URL + n._GET_CART_BY_TOKEN, {
                          params: { token: r },
                        })
                        .subscribe((o) => {
                          if (o) {
                            console.log("reponse:", o), (e.cart_products = []);
                            for (let i = 0; i < o.length; i++)
                              console.log(
                                "adding to cart from db:",
                                o[i].ProductID
                              ),
                                e.cart_products.push(
                                  n.getProduct(o[i].ProductID.toString())
                                );
                            return e.cart_products;
                          }
                        })
                    : console.log("no token. needs to log in"),
                  (e.user_token = r),
                  e.cart_products
                );
              })();
            }
            addItemToCart(n) {
              let r = localStorage.getItem("token");
              return this.http
                .post(this._API_URL + this._ADD_ITEM_TO_CART_BY_TOKEN, {
                  token: r,
                  productID: n,
                })
                .subscribe(
                  (i) => {
                    console.log("adding:", i);
                  },
                  (i) => {
                    console.error(i);
                  }
                );
            }
            createOrLoginUser(n, r) {
              return localStorage.setItem("token", n), !0;
            }
            removeItemFromCartInDB(n) {
              return new Promise((r, o) => {
                const i = localStorage.getItem("token");
                i
                  ? (console.log(
                      "removing item from cart [index = ",
                      n,
                      "] token = ",
                      i,
                      " current cart = ",
                      e.cart_products
                    ),
                    this.http
                      .delete(
                        this._API_URL + this._DELETE_ITEM_FROM_CART_BY_TOKEN,
                        {
                          body: {
                            token: i,
                            productID: parseInt(e.cart_products[n].id),
                          },
                        }
                      )
                      .subscribe((s) => {
                        s
                          ? (console.log("response:", s),
                            e.cart_products.splice(n, 1),
                            r())
                          : o(new Error("Failed to remove item from cart"));
                      }))
                  : (console.log("no token. needs to log in"),
                    o(new Error("No token")));
              });
            }
            static #o = (this.ɵfac = function (r) {
              return new (r || e)(A(HD));
            });
            static #i = (this.ɵprov = R({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      function n1(e, t) {
        if (1 & e) {
          const n = Xr();
          M(0, "div", 6),
            _e("click", function () {
              const i = br(n).$implicit;
              return Sr(Fn().openProduct(i.id));
            }),
            M(1, "h3"),
            k(2),
            I(),
            _n(3, "img", 7),
            M(4, "p"),
            k(5),
            I()();
        }
        if (2 & e) {
          const n = t.$implicit;
          Z(2),
            St(n.name),
            Z(1),
            ir("alt", n.name),
            ve("src", n.imageUrl, nr),
            Z(2),
            St(n.description);
        }
      }
      function r1(e, t) {
        if (1 & e) {
          const n = Xr();
          M(0, "div", 6),
            _e("click", function () {
              const i = br(n).$implicit;
              return Sr(Fn().openProduct(i.id));
            }),
            M(1, "h3"),
            k(2),
            I(),
            _n(3, "img", 7),
            M(4, "p"),
            k(5),
            I()();
        }
        if (2 & e) {
          const n = t.$implicit;
          Z(2),
            St(n.name),
            Z(1),
            ir("alt", n.name),
            ve("src", n.imageUrl, nr),
            Z(2),
            St(n.description);
        }
      }
      let o1 = (() => {
        class e {
          constructor(n) {
            (this.router = n),
              (this.topSellingClothes = xO),
              (this.newArrivals = NO);
          }
          openProduct(n) {
            (et.product_to_open = n),
              console.log("opening: ", n),
              this.router.navigateByUrl("/product");
          }
          ngOnInit() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(D(Oe));
          });
          static #t = (this.ɵcmp = Gt({
            type: e,
            selectors: [["app-home"]],
            decls: 15,
            vars: 2,
            consts: [
              [1, "introduction"],
              [1, "subtitle"],
              [1, "top-selling"],
              [1, "product-list"],
              ["class", "product-item", 3, "click", 4, "ngFor", "ngForOf"],
              [1, "new-arrivals"],
              [1, "product-item", 3, "click"],
              [3, "src", "alt"],
            ],
            template: function (r, o) {
              1 & r &&
                (M(0, "section", 0)(1, "h1"),
                k(
                  2,
                  "Serving customers, communities and planet a little better every day."
                ),
                I(),
                M(3, "p", 1),
                k(
                  4,
                  "We've built sustainability into our purpose, strategy and business plans. We know that our business depends on the world around us. As the UK's largest retailer, we know we can make a big difference.Our commitment to operating in a responsible and sustainable way reflect our values. And they are the responsibility of everyone at Tesco."
                ),
                I()(),
                M(5, "section", 2)(6, "h2"),
                k(7, "Top Picks"),
                I(),
                M(8, "div", 3),
                bt(9, n1, 6, 4, "div", 4),
                I()(),
                M(10, "section", 5)(11, "h2"),
                k(12, "Top offers"),
                I(),
                M(13, "div", 3),
                bt(14, r1, 6, 4, "div", 4),
                I()()),
                2 & r &&
                  (Z(9),
                  ve("ngForOf", o.topSellingClothes),
                  Z(5),
                  ve("ngForOf", o.newArrivals));
            },
            dependencies: [ha],
            styles: [
              ".introduction[_ngcontent-%COMP%]{text-align:center;padding:10%}.top-selling[_ngcontent-%COMP%]{padding:5% 3%;background-color:#f7f7f7}.top-selling[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .new-arrivals[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:30px 0}.new-arrivals[_ngcontent-%COMP%]{padding:5% 3%}.product-list[_ngcontent-%COMP%]{display:flex;justify-content:space-around;flex-wrap:wrap}.product-item[_ngcontent-%COMP%]{width:400px;margin:10px;text-align:center;border:1px solid black;padding:5px;border-radius:10px;cursor:pointer}.product-item[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 1px 1px #000}.product-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left}.product-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto}",
            ],
          }));
        }
        return e;
      })();
      function i1(e, t) {
        if (1 & e) {
          const n = Xr();
          M(0, "div", 2),
            _e("click", function () {
              const i = br(n).$implicit;
              return Sr(Fn().openProduct(i.id));
            }),
            _n(1, "img", 3),
            M(2, "h3"),
            k(3),
            I(),
            M(4, "p"),
            k(5),
            I()();
        }
        if (2 & e) {
          const n = t.$implicit;
          Z(1),
            ir("alt", n.name),
            ve("src", n.imageUrl, nr),
            Z(2),
            St(n.name),
            Z(2),
            St(n.description);
        }
      }
      let s1 = (() => {
        class e {
          constructor(n, r) {
            (this.router = n),
              (this.dataService = r),
              (this.products = []),
              (this.products = kD);
          }
          openProduct(n) {
            (et.product_to_open = n),
              console.log("opening: ", n),
              this.router.navigateByUrl("/product");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(D(Oe), D(et));
          });
          static #t = (this.ɵcmp = Gt({
            type: e,
            selectors: [["app-products-list"]],
            decls: 2,
            vars: 1,
            consts: [
              [1, "product-grid"],
              ["class", "product-card", 3, "click", 4, "ngFor", "ngForOf"],
              [1, "product-card", 3, "click"],
              [3, "src", "alt"],
            ],
            template: function (r, o) {
              1 & r && (M(0, "div", 0), bt(1, i1, 6, 4, "div", 1), I()),
                2 & r && (Z(1), ve("ngForOf", o.products));
            },
            dependencies: [ha],
            styles: [
              ".product-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:100px;padding:50px}.product-card[_ngcontent-%COMP%]{border:1px solid #ddd;padding:55px;text-align:left}.product-card[_ngcontent-%COMP%]:hover{box-shadow:1px 1px 10px 1px #000;cursor:pointer}.product-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:10px 0}.product-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;height:auto;margin-bottom:15px}",
            ],
          }));
        }
        return e;
      })();
      function a1(e, t) {
        1 & e && (M(0, "div")(1, "h1", 2), k(2, "Cart is empty."), I()());
      }
      function l1(e, t) {
        if (1 & e) {
          const n = Xr();
          M(0, "div", 6),
            _n(1, "img", 7),
            M(2, "div", 8)(3, "h3"),
            k(4),
            I(),
            M(5, "p"),
            k(6),
            I()(),
            M(7, "div", 9),
            k(8),
            I(),
            M(9, "div")(10, "button", 10),
            _e("click", function () {
              const i = br(n).index;
              return Sr(Fn(2).removeItem(i));
            }),
            k(11, "-"),
            I()()();
        }
        if (2 & e) {
          const n = t.$implicit;
          Z(1),
            ir("alt", n.name),
            ve("src", n.imageUrl, nr),
            Z(3),
            St(n.name),
            Z(2),
            St(n.description),
            Z(2),
            ar(" ", n.price, " ");
        }
      }
      function u1(e, t) {
        if (
          (1 & e &&
            (M(0, "div")(1, "div", 3),
            k(2),
            I(),
            M(3, "div", 4),
            bt(4, l1, 12, 5, "div", 5),
            I()()),
          2 & e)
        ) {
          const n = Fn();
          Z(2),
            ar("Total Price: ", n.totalPrice, ""),
            Z(2),
            ve("ngForOf", n.products);
        }
      }
      let c1 = (() => {
          class e {
            constructor(n) {
              (this.dataservice = n), (this.products = []);
            }
            ngOnInit() {
              var n = this;
              return vo(function* () {
                yield n.executeWithTimeout(), yield n.loadData();
              })();
            }
            loadData() {
              var n = this;
              return vo(function* () {
                (n.products = yield n.dataservice.getCartFromDB()),
                  (n.totalPrice = yield n.dataservice.getCartPrice()),
                  console.log(n.totalPrice);
              })();
            }
            removeItem(n) {
              var r = this;
              return vo(function* () {
                yield r.dataservice.removeItemFromCartInDB(n),
                  yield r.loadData();
              })();
            }
            executeWithTimeout() {
              return new Promise((r) => {
                setTimeout(() => {
                  console.log(
                    "This code is executed after a delay of 3 seconds."
                  ),
                    r();
                }, 1);
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(D(et));
            });
            static #t = (this.ɵcmp = Gt({
              type: e,
              selectors: [["app-cart"]],
              decls: 3,
              vars: 2,
              consts: [
                [1, "content"],
                [4, "ngIf"],
                [2, "font-size", "100px", "padding", "25% 10%"],
                [1, "title", 2, "text-align", "right", "padding", "3%"],
                [1, "clothing-list"],
                ["class", "clothing-item", 4, "ngFor", "ngForOf"],
                [1, "clothing-item"],
                [1, "item-image", 3, "src", "alt"],
                [1, "item-details"],
                [1, "title"],
                [1, "red", 3, "click"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0),
                  bt(1, a1, 3, 0, "div", 1),
                  bt(2, u1, 5, 2, "div", 1),
                  I()),
                  2 & r &&
                    (Z(1),
                    ve("ngIf", o.products.length <= 0),
                    Z(1),
                    ve("ngIf", o.products.length > 0));
              },
              dependencies: [ha, pa],
              styles: [
                ".content[_ngcontent-%COMP%]{text-align:-webkit-center;min-height:1200px;overflow:scroll}.clothing-list[_ngcontent-%COMP%]{padding:20px}.clothing-item[_ngcontent-%COMP%]{display:flex;align-items:center;border-bottom:1px solid #ddd;padding:10px 0}.item-image[_ngcontent-%COMP%]{width:100px;height:auto;margin-right:20px}.item-details[_ngcontent-%COMP%]{flex-grow:1}",
              ],
            }));
          }
          return e;
        })(),
        d1 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Gt({
              type: e,
              selectors: [["app-bill"]],
              decls: 2,
              vars: 0,
              template: function (r, o) {
                1 & r && (M(0, "p"), k(1, "bill works!"), I());
              },
            }));
          }
          return e;
        })(),
        f1 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Gt({
              type: e,
              selectors: [["app-about-us"]],
              decls: 11,
              vars: 0,
              consts: [[1, "about-us"]],
              template: function (r, o) {
                1 & r &&
                  (M(0, "section", 0)(1, "h1"),
                  k(2, "About Us"),
                  I(),
                  M(3, "p"),
                  k(
                    4,
                    "Having a diverse Board with different perspectives, insights and viewpoints benefits the Group’s stakeholders through better business performance. Our Board comprises the Chairman, Group Chief Executive, Chief Financial Officer, Senior Independent Director and a number of independent Non-executive Directors."
                  ),
                  I(),
                  M(5, "p"),
                  k(
                    6,
                    "As a leading multinational retailer, with more than 330,000 colleagues, we aim to serve customers every day with affordable, healthy and sustainable food – to help them enjoy a better quality of life and an easier way of living."
                  ),
                  I(),
                  M(7, "p"),
                  k(
                    8,
                    "We now serve customers all over the world and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the fashion industry."
                  ),
                  I(),
                  M(9, "p"),
                  k(
                    10,
                    "Tesco has led the way in reducing emissions. We were the first FTSE 100 company to commit to science-based targets in line with the Paris Agreement's 1.5C target. In 2022/23, we achieved an absolute reduction in our operations of 55% against a 2015 baseline. We’ve done this by using energy and refrigeration more efficiently, and by adopting 100% renewable electricity across the Group.."
                  ),
                  I()());
              },
              //     styles: [
              //       ".about-us[_ngcontent-%COMP%]{padding:40px;text-align:left;height:1200px;background-repeat:no-repeat;background:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(https://wallpapers.com/images/hd/grocery-store-1920-x-1080-background-ca4ksc5m7j9y7kon.jpg);background-size:cover}.about-us[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:20px;color:#fff}.about-us[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:15px;line-height:1.6;color:#fff;font-size:30px}",
              //     ],
            }));
          }
          return e;
        })();
      function h1(e, t) {
        1 & e &&
          (M(0, "p"),
          k(1, "You need to log in before adding items to cart"),
          I());
      }
      function p1(e, t) {
        1 & e && (M(0, "p"), k(1, "Product was added to cart."), I());
      }
      let g1 = (() => {
          class e {
            constructor(n, r) {
              (this.dataService = n),
                (this.router = r),
                (this.productID = null),
                (this.added = !1),
                (this.can_add = !1),
                (this.productID = et.product_to_open),
                null == this.productID && this.router.navigateByUrl(""),
                (this.product = this.dataService.getProduct(this.productID)),
                (this.can_add = null != et.user_token);
            }
            addToCart() {
              var n = this;
              return vo(function* () {
                null != n.product &&
                  null != et.user_token &&
                  (et.cart_products.push(n.product),
                  n.dataService.addItemToCart(n.productID),
                  (n.added = !0),
                  console.log("added true", n.added),
                  yield n.executeWithTimeout(),
                  (n.added = !1),
                  console.log("added false", n.added));
              })();
            }
            executeWithTimeout() {
              return new Promise((r) => {
                setTimeout(() => {
                  console.log(
                    "This code is executed after a delay of 3 seconds."
                  ),
                    r();
                }, 3e3);
              });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(D(et), D(Oe));
            });
            static #t = (this.ɵcmp = Gt({
              type: e,
              selectors: [["app-product"]],
              decls: 13,
              vars: 8,
              consts: [
                [1, "content"],
                [1, "product-item"],
                [3, "src", "alt"],
                [2, "margin", "20px", 3, "disabled", "click"],
                [4, "ngIf"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0)(1, "div", 1)(2, "h3"),
                  k(3),
                  I(),
                  _n(4, "img", 2),
                  M(5, "p"),
                  k(6),
                  I(),
                  M(7, "h1"),
                  k(8),
                  I()(),
                  M(9, "button", 3),
                  _e("click", function () {
                    return o.addToCart();
                  }),
                  k(10, "Add to Cart"),
                  I(),
                  bt(11, h1, 2, 0, "p", 4),
                  bt(12, p1, 2, 0, "p", 4),
                  I()),
                  2 & r &&
                    (Z(3),
                    St(o.product.name),
                    Z(1),
                    ir("alt", o.product.name),
                    ve("src", o.product.imageUrl, nr),
                    Z(2),
                    St(o.product.description),
                    Z(2),
                    ar("Price: ", o.product.price, ""),
                    Z(1),
                    ve("disabled", !o.can_add),
                    Z(2),
                    ve("ngIf", !o.can_add),
                    Z(1),
                    ve("ngIf", 1 == o.added));
              },
              dependencies: [pa],
              styles: [
                ".product-item[_ngcontent-%COMP%]{width:600px;margin:10px;text-align:center;padding:20px}.product-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left}.product-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto}.content[_ngcontent-%COMP%]{text-align:-webkit-center}",
              ],
            }));
          }
          return e;
        })(),
        XD = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(mn), D(ht));
            }),
            (e.ɵdir = L({ type: e })),
            e
          );
        })(),
        pr = (() => {
          class e extends XD {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = je(e)))(r || e);
              };
            })()),
            (e.ɵdir = L({ type: e, features: [ne] })),
            e
          );
        })();
      const sn = new S("NgValueAccessor"),
        v1 = { provide: sn, useExisting: se(() => Wa), multi: !0 },
        D1 = new S("CompositionEventMode");
      let Wa = (() => {
        class e extends XD {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function _1() {
                  const e = En() ? En().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(mn), D(ht), D(D1, 8));
          }),
          (e.ɵdir = L({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                _e("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ce([v1]), ne],
          })),
          e
        );
      })();
      const C1 = !1,
        qe = new S("NgValidators"),
        Gn = new S("NgAsyncValidators");
      function uC(e) {
        return null != e;
      }
      function cC(e) {
        const t = ni(e) ? Se(e) : e;
        if (C1 && !Qu(t)) {
          let n = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (n +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new C(-1101, n))
          );
        }
        return t;
      }
      function dC(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function fC(e, t) {
        return t.map((n) => n(e));
      }
      function hC(e) {
        return e.map((t) =>
          (function E1(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function Kd(e) {
        return null != e
          ? (function pC(e) {
              if (!e) return null;
              const t = e.filter(uC);
              return 0 == t.length
                ? null
                : function (n) {
                    return dC(fC(n, t));
                  };
            })(hC(e))
          : null;
      }
      function Yd(e) {
        return null != e
          ? (function gC(e) {
              if (!e) return null;
              const t = e.filter(uC);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function m1(...e) {
                      const t = $f(e),
                        { args: n, keys: r } = C_(e),
                        o = new me((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let l = s,
                            u = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            Tt(n[c]).subscribe(
                              Re(
                                i,
                                (f) => {
                                  d || ((d = !0), u--), (a[c] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (u || i.next(r ? E_(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(w_(t)) : o;
                    })(fC(n, t).map(cC)).pipe(z(dC));
                  };
            })(hC(e))
          : null;
      }
      function mC(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Zd(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Ka(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function _C(e, t) {
        const n = Zd(t);
        return (
          Zd(e).forEach((o) => {
            Ka(n, o) || n.push(o);
          }),
          n
        );
      }
      function DC(e, t) {
        return Zd(t).filter((n) => !Ka(e, n));
      }
      class CC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Kd(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Yd(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class tt extends CC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Wn extends CC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class wC {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let EC = (() => {
        class e extends wC {
          constructor(n) {
            super(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Wn, 2));
          }),
          (e.ɵdir = L({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (n, r) {
              2 & n &&
                js("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                  "ng-pristine",
                  r.isPristine
                )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                  "ng-invalid",
                  r.isInvalid
                )("ng-pending", r.isPending);
            },
            features: [ne],
          })),
          e
        );
      })();
      const Li = "VALID",
        Za = "INVALID",
        Do = "PENDING",
        Vi = "DISABLED";
      function Qa(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class IC {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Li;
        }
        get invalid() {
          return this.status === Za;
        }
        get pending() {
          return this.status == Do;
        }
        get disabled() {
          return this.status === Vi;
        }
        get enabled() {
          return this.status !== Vi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(_C(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(_C(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(DC(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(DC(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Ka(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Ka(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Do),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Vi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Li),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Li || this.status === Do) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Vi : Li;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Do), (this._hasOwnPendingAsyncValidator = !0);
            const n = cC(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new ge()), (this.statusChanges = new ge());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Vi
            : this.errors
            ? Za
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Do)
            ? Do
            : this._anyControlsHaveStatus(Za)
            ? Za
            : Li;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Qa(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function x1(e) {
              return Array.isArray(e) ? Kd(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function N1(e) {
              return Array.isArray(e) ? Yd(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      const Co = new S("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Xa,
        }),
        Xa = "always";
      function ji(e, t, n = Xa) {
        (function rf(e, t) {
          const n = (function yC(e) {
            return e._rawValidators;
          })(e);
          null !== t.validator
            ? e.setValidators(mC(n, t.validator))
            : "function" == typeof n && e.setValidators([n]);
          const r = (function vC(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== t.asyncValidator
            ? e.setAsyncValidators(mC(r, t.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          tl(t._rawValidators, o), tl(t._rawAsyncValidators, o);
        })(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function O1(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && AC(e, t);
            });
          })(e, t),
          (function L1(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function k1(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && AC(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function P1(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function tl(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function AC(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function xC(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function NC(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const FC = class extends IC {
          constructor(t = null, n, r) {
            super(
              (function ef(e) {
                return (Qa(e) ? e.validators : e) || null;
              })(n),
              (function tf(e, t) {
                return (Qa(t) ? t.asyncValidators : e) || null;
              })(r, n)
            ),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              Qa(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = NC(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            xC(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            xC(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            NC(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        G1 = { provide: Wn, useExisting: se(() => cf) },
        kC = (() => Promise.resolve())();
      let cf = (() => {
          class e extends Wn {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new FC()),
                (this._registered = !1),
                (this.update = new ge()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function lf(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Wa
                        ? (n = i)
                        : (function $1(e) {
                            return Object.getPrototypeOf(e.constructor) === pr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function af(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              ji(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              kC.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o = 0 !== r && io(r);
              kC.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function Ja(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(tt, 9),
                D(qe, 10),
                D(Gn, 10),
                D(sn, 10),
                D(ea, 8),
                D(Co, 8)
              );
            }),
            (e.ɵdir = L({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ce([G1]), ne, Dt],
            })),
            e
          );
        })(),
        VC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = vt({})),
            e
          );
        })(),
        mk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = vt({ imports: [VC] })),
            e
          );
        })(),
        vk = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Co, useValue: n.callSetDisabledState ?? Xa },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Rt({ type: e })),
            (e.ɵinj = vt({ imports: [mk] })),
            e
          );
        })();
      const _k = [
        { path: "", component: o1 },
        { path: "about-us", component: f1 },
        { path: "products-list", component: s1 },
        { path: "product", component: g1 },
        { path: "cart", component: c1 },
        { path: "bill", component: d1 },
        {
          path: "login",
          component: (() => {
            class e {
              constructor(n, r) {
                (this.dataService = n),
                  (this.router = r),
                  (this.email = ""),
                  (this.password = ""),
                  et.user_token && this.router.navigateByUrl("/");
              }
              loginOrSignUp() {
                console.log(this.email, this.password),
                  this.email.length <= 0 ||
                    this.password.length <= 0 ||
                    (this.dataService.createOrLoginUser(
                      this.email,
                      this.password
                    ) &&
                      ((et.user_token = this.email),
                      localStorage.setItem("token", this.email),
                      this.router.navigateByUrl("/"),
                      window.location.reload()));
              }
              static #e = (this.ɵfac = function (r) {
                return new (r || e)(D(et), D(Oe));
              });
              static #t = (this.ɵcmp = Gt({
                type: e,
                selectors: [["app-login"]],
                decls: 13,
                vars: 2,
                consts: [
                  [1, "login-form"],
                  [1, "input-field"],
                  [1, "input-title"],
                  ["type", "email", 3, "ngModel", "ngModelChange"],
                  ["type", "password", 3, "ngModel", "ngModelChange"],
                  [3, "click"],
                ],
                template: function (r, o) {
                  1 & r &&
                    (M(0, "div", 0)(1, "div", 1)(2, "p", 2),
                    k(3, " Email "),
                    I(),
                    M(4, "input", 3),
                    _e("ngModelChange", function (s) {
                      return (o.email = s);
                    }),
                    I()(),
                    M(5, "div", 1)(6, "p", 2),
                    k(7, " Password "),
                    I(),
                    M(8, "input", 4),
                    _e("ngModelChange", function (s) {
                      return (o.password = s);
                    }),
                    I()(),
                    M(9, "button", 5),
                    _e("click", function () {
                      return o.loginOrSignUp();
                    }),
                    k(10, "Login"),
                    I(),
                    M(11, "p"),
                    k(
                      12,
                      "Login and sign up both done by same in beta version"
                    ),
                    I()()),
                    2 & r &&
                      (Z(4),
                      ve("ngModel", o.email),
                      Z(4),
                      ve("ngModel", o.password));
                },
                dependencies: [Wa, EC, cf],
                styles: [
                  ".login-form[_ngcontent-%COMP%]{background-color:var(--primary-color-light);border-radius:10px;padding:50px 20px;margin:20%;color:#fff;align-items:center;text-align:center}",
                ],
              }));
            }
            return e;
          })(),
        },
      ];
      let Dk = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Rt({ type: e }));
          static #n = (this.ɵinj = vt({ imports: [PD.forRoot(_k), PD] }));
        }
        return e;
      })();
      function Ck(e, t) {
        1 & e && (M(0, "button", 10), k(1, "Login"), I());
      }
      function wk(e, t) {
        if (1 & e) {
          const n = Xr();
          M(0, "button", 11),
            _e("click", function () {
              return br(n), Sr(Fn().logoutUser());
            }),
            k(1, "Logout"),
            I();
        }
      }
      function Ek(e, t) {
        if ((1 & e && (M(0, "div", 12), k(1), I()), 2 & e)) {
          const n = Fn();
          Z(1), ar("Logged in as: ", n.token, "");
        }
      }
      let bk = (() => {
          class e {
            constructor(n, r) {
              (this.router = r),
                (this.title = "clothing_website"),
                (this.token = null),
                n.getCartFromDB(),
                (this.token = et.user_token),
                console.log(this.token);
            }
            ngOnInit() {}
            logoutUser() {
              (et.user_token = null),
                localStorage.removeItem("token"),
                window.location.reload();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(D(et), D(Oe));
            });
            static #t = (this.ɵcmp = Gt({
              type: e,
              selectors: [["app-root"]],
              decls: 35,
              vars: 3,
              consts: [
                ["routerLink", "", 1, "nav-button"],
                ["routerLink", "about-us", 1, "nav-button"],
                ["routerLink", "products-list", 1, "nav-button"],
                ["routerLink", "cart", 1, "nav-button"],
                ["class", "nav-button", "routerLink", "login", 4, "ngIf"],
                ["class", "nav-button", 3, "click", 4, "ngIf"],
                [
                  "class",
                  "row",
                  "style",
                  "justify-content: end; padding: 5px; position: absolute; top: 0; right: 0; color: white;",
                  4,
                  "ngIf",
                ],
                [1, "site-footer"],
                [1, "footer-content"],
                [1, "footer-bottom"],
                ["routerLink", "login", 1, "nav-button"],
                [1, "nav-button", 3, "click"],
                [
                  1,
                  "row",
                  2,
                  "justify-content",
                  "end",
                  "padding",
                  "5px",
                  "position",
                  "absolute",
                  "top",
                  "0",
                  "right",
                  "0",
                  "color",
                  "white",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "nav")(1, "button", 0),
                  k(2, "Home"),
                  I(),
                  M(3, "button", 1),
                  k(4, "About Us"),
                  I(),
                  M(5, "button", 2),
                  k(6, "Our Products"),
                  I(),
                  M(7, "button", 3),
                  k(8, "Cart"),
                  I(),
                  bt(9, Ck, 2, 0, "button", 4),
                  bt(10, wk, 2, 0, "button", 5),
                  I(),
                  bt(11, Ek, 2, 1, "div", 6),
                  _n(12, "router-outlet"),
                  M(13, "footer", 7)(14, "div", 8)(15, "div")(16, "h3"),
                  k(17, "About Us"),
                  I(),
                  M(18, "p"),
                  k(
                    19,
                    "We now serve customers all over the world and are thrilled to be a part of industry"
                  ),
                  I()(),
                  M(20, "div")(21, "h3"),
                  k(22, "Contact"),
                  I(),
                  M(23, "p"),
                  k(24, "Email: contact.Tesco.com"),
                  I(),
                  M(25, "p"),
                  k(26, "Phone: +123 456 7890"),
                  I()(),
                  M(27, "div")(28, "h3"),
                  k(29, "Follow Us"),
                  I(),
                  M(30, "p"),
                  k(31, "Stay updated with our latest offers."),
                  I()()(),
                  M(32, "div", 9)(33, "p"),
                  k(34, "\xa9 2023 Grocery Store. All rights reserved."),
                  I()()()),
                  2 & r &&
                    (Z(9),
                    ve("ngIf", !o.token),
                    Z(1),
                    ve("ngIf", o.token),
                    Z(1),
                    ve("ngIf", o.token));
              },
              dependencies: [pa, Rd, Ba],
              styles: [
                ".nav-button[_ngcontent-%COMP%]{padding:5px;font-size:20px;background:none;color:#fff;margin:20px}.nav-button[_ngcontent-%COMP%]:hover{background-color:#ffffff0f}nav[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;background-color:#24246a}.site-footer[_ngcontent-%COMP%]{background-color:#222;color:#eee;text-align:center;padding:20px 0}.footer-content[_ngcontent-%COMP%]{display:flex;justify-content:space-around;padding:20px}.footer-content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{max-width:200px}.footer-bottom[_ngcontent-%COMP%]{border-top:1px solid #FFF;padding:10px 0;margin-top:20px}",
              ],
            }));
          }
          return e;
        })(),
        Sk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Rt({ type: e, bootstrap: [bk] }));
            static #n = (this.ɵinj = vt({ imports: [vk, HN, Dk, t1] }));
          }
          return e;
        })();
      BN()
        .bootstrapModule(Sk)
        .catch((e) => console.error(e));
    },
  },
  (oe) => {
    oe((oe.s = 908));
  },
]);
