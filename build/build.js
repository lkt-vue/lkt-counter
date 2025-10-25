import { defineComponent as x, mergeDefaults as S, ref as n, onMounted as b, watch as M, resolveComponent as N, createElementBlock as w, openBlock as p, createBlock as B, unref as E, mergeProps as P, Fragment as _, createTextVNode as L, toDisplayString as j } from "vue";
import { CounterType as u, CounterView as q, getDefaultValues as z, Counter as A } from "lkt-vue-kernel";
import { secondsToTimeString as G } from "lkt-date-tools";
const H = { class: "lkt-counter" }, J = /* @__PURE__ */ x({
  __name: "LktCounter",
  props: /* @__PURE__ */ S({
    type: {},
    from: {},
    to: {},
    step: {},
    timeout: {},
    dateFormat: {},
    seconds: {},
    view: {},
    progress: {},
    events: {}
  }, z(A)),
  setup(o, { expose: C }) {
    const e = o, a = n(e.type === u.Number ? parseFloat(e.from) : e.from), c = n(void 0), v = n(typeof e.step > "u" ? 1 : parseFloat(e.step)), d = n(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), g = n(e.type === u.Number ? parseFloat(e.to) : e.to), i = n(e.seconds), l = n(!1), y = n(0), m = () => {
      a.value = G(i.value), V();
    }, V = () => {
      let t = 100;
      switch (e.type) {
        case u.Timer:
          i.value <= 1 ? t = 0 : t = (i.value - 1) * 100 / e.seconds;
          break;
      }
      y.value = t;
    };
    let r = null;
    function T() {
      l.value || (r = setInterval(() => {
        if (l.value) {
          r && (clearInterval(r), r = null, l.value = !0);
          return;
        }
        --i.value < 0 && (i.value = 0, clearInterval(r), typeof e.events.onEnd == "function" && e.events.onEnd());
      }, 1e3));
    }
    function F() {
      r && (clearInterval(r), r = null, l.value = !0, m());
    }
    if (e.type === u.Number)
      c.value = setInterval(() => {
        a.value < g.value ? a.value += v.value : a.value > g.value ? a.value -= v.value : clearInterval(c.value);
      }, d.value);
    else if (e.type === u.Date) {
      let t = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), f = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      c.value = setInterval(() => {
        t.getTime() < f.getTime() ? t.setSeconds(t.getSeconds() + v.value) : t.getTime() > f.getTime() && t.setSeconds(t.getSeconds() - v.value);
        let s = f - t, k = Math.floor(s / (1e3 * 60 * 60 * 24)), h = Math.floor(s % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), D = Math.floor(s % (1e3 * 60 * 60) / (1e3 * 60)), I = Math.floor(s % (1e3 * 60) / 1e3);
        a.value = k + "d " + h + "h " + D + "m " + I + "s ", a.value = e.dateFormat.replace(":d", k).replace(":h", h).replace(":m", D).replace(":s", I), s < 0 && clearInterval(c.value);
      }, d.value);
    } else e.type === u.Timer && m();
    return b(() => {
      e.type === u.Timer && T();
    }), C({
      pause: () => {
        l.value || F();
      },
      start: () => {
        l.value && (l.value = !1, T());
      }
    }), M(i, (t) => {
      m();
    }), (t, f) => {
      const s = N("lkt-progress");
      return p(), w("div", H, [
        o.view === E(q).Progress ? (p(), B(s, P({ key: 0 }, {
          ...o.progress,
          animation: {
            ...typeof o.progress.animation == "object" ? o.progress.animation : {},
            externalControl: !0
          },
          duration: l.value ? 0 : 900,
          text: a.value
        }, { "model-value": y.value }), null, 16, ["model-value"])) : (p(), w(_, { key: 1 }, [
          L(j(a.value), 1)
        ], 64))
      ]);
    };
  }
}), R = {
  install: (o) => {
    o.component("lkt-counter") === void 0 && o.component("lkt-counter", J);
  }
};
export {
  R as default
};
