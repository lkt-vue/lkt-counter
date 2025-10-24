import { defineComponent as x, mergeDefaults as S, ref as r, onMounted as b, watch as M, resolveComponent as N, createElementBlock as w, openBlock as m, createBlock as B, unref as E, mergeProps as P, Fragment as _, createTextVNode as L, toDisplayString as j } from "vue";
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
    const e = o, a = r(e.type === u.Number ? parseFloat(e.from) : e.from), c = r(void 0), v = r(typeof e.step > "u" ? 1 : parseFloat(e.step)), p = r(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), d = r(e.type === u.Number ? parseFloat(e.to) : e.to), i = r(e.seconds), n = r(!1), g = r(0), y = () => {
      a.value = G(i.value), V();
    }, V = () => {
      let t = 100;
      switch (e.type) {
        case u.Timer:
          i.value === 1 ? t = 0 : t = (i.value - 1) * 100 / e.seconds;
          break;
      }
      g.value = t;
    };
    let l = null;
    function T() {
      n.value || (l = setInterval(() => {
        if (n.value) {
          l && (clearInterval(l), l = null, n.value = !0);
          return;
        }
        --i.value < 0 && (i.value = 0, clearInterval(l), typeof e.events.onEnd == "function" && e.events.onEnd());
      }, 1e3));
    }
    function F() {
      l && (clearInterval(l), l = null, n.value = !0);
    }
    if (e.type === u.Number)
      c.value = setInterval(() => {
        a.value < d.value ? a.value += v.value : a.value > d.value ? a.value -= v.value : clearInterval(c.value);
      }, p.value);
    else if (e.type === u.Date) {
      let t = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), f = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      c.value = setInterval(() => {
        t.getTime() < f.getTime() ? t.setSeconds(t.getSeconds() + v.value) : t.getTime() > f.getTime() && t.setSeconds(t.getSeconds() - v.value);
        let s = f - t, k = Math.floor(s / (1e3 * 60 * 60 * 24)), h = Math.floor(s % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), D = Math.floor(s % (1e3 * 60 * 60) / (1e3 * 60)), I = Math.floor(s % (1e3 * 60) / 1e3);
        a.value = k + "d " + h + "h " + D + "m " + I + "s ", a.value = e.dateFormat.replace(":d", k).replace(":h", h).replace(":m", D).replace(":s", I), s < 0 && clearInterval(c.value);
      }, p.value);
    } else e.type === u.Timer && y();
    return b(() => {
      e.type === u.Timer && T();
    }), C({
      pause: () => {
        n.value || F();
      },
      start: () => {
        n.value && (n.value = !1, T());
      }
    }), M(i, (t) => {
      y();
    }), (t, f) => {
      const s = N("lkt-progress");
      return m(), w("div", H, [
        o.view === E(q).Progress ? (m(), B(s, P({ key: 0 }, {
          ...o.progress,
          animation: {
            ...typeof o.progress.animation == "object" ? o.progress.animation : {},
            externalControl: !0
          },
          duration: 1e3,
          text: a.value
        }, { "model-value": g.value }), null, 16, ["model-value"])) : (m(), w(_, { key: 1 }, [
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
