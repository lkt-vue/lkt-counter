import { defineComponent as x, mergeDefaults as S, ref as r, onMounted as b, watch as M, resolveComponent as N, createElementBlock as I, openBlock as p, createBlock as B, unref as E, mergeProps as P, Fragment as _, createTextVNode as L, toDisplayString as j } from "vue";
import { CounterType as i, CounterView as q, getDefaultValues as z, Counter as A } from "lkt-vue-kernel";
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
  setup(o, { expose: w }) {
    const e = o, a = r(e.type === i.Number ? parseFloat(e.from) : e.from), v = r(void 0), c = r(typeof e.step > "u" ? 1 : parseFloat(e.step)), d = r(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), g = r(e.type === i.Number ? parseFloat(e.to) : e.to), s = r(e.seconds), l = r(!1), y = r(0), m = () => {
      a.value = G(s.value), typeof e.events.onChange == "function" && e.events.onChange(s.value), V();
    }, V = () => {
      let t = 100;
      switch (e.type) {
        case i.Timer:
          s.value <= 1 ? t = 0 : t = (s.value - 1) * 100 / e.seconds;
          break;
      }
      y.value = t;
    };
    let n = null;
    function h() {
      l.value || (n = setInterval(() => {
        if (l.value) {
          n && (clearInterval(n), n = null, l.value = !0);
          return;
        }
        --s.value < 0 && (s.value = 0, clearInterval(n), typeof e.events.onEnd == "function" && e.events.onEnd());
      }, 1e3));
    }
    function F() {
      n && (clearInterval(n), n = null, l.value = !0, m());
    }
    if (e.type === i.Number)
      v.value = setInterval(() => {
        a.value < g.value ? a.value += c.value : a.value > g.value ? a.value -= c.value : clearInterval(v.value);
      }, d.value);
    else if (e.type === i.Date) {
      let t = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), f = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      v.value = setInterval(() => {
        t.getTime() < f.getTime() ? t.setSeconds(t.getSeconds() + c.value) : t.getTime() > f.getTime() && t.setSeconds(t.getSeconds() - c.value);
        let u = f - t, T = Math.floor(u / (1e3 * 60 * 60 * 24)), k = Math.floor(u % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), D = Math.floor(u % (1e3 * 60 * 60) / (1e3 * 60)), C = Math.floor(u % (1e3 * 60) / 1e3);
        a.value = T + "d " + k + "h " + D + "m " + C + "s ", a.value = e.dateFormat.replace(":d", T).replace(":h", k).replace(":m", D).replace(":s", C), u < 0 && clearInterval(v.value);
      }, d.value);
    } else e.type === i.Timer && m();
    return b(() => {
      e.type === i.Timer && h();
    }), w({
      pause: () => {
        l.value || F();
      },
      start: () => {
        l.value && (l.value = !1, h());
      }
    }), M(s, (t) => {
      m();
    }), (t, f) => {
      const u = N("lkt-progress");
      return p(), I("div", H, [
        o.view === E(q).Progress ? (p(), B(u, P({ key: 0 }, {
          ...o.progress,
          animation: {
            ...typeof o.progress.animation == "object" ? o.progress.animation : {},
            externalControl: !0
          },
          duration: l.value ? 0 : 1e3,
          text: a.value
        }, { "model-value": y.value }), null, 16, ["model-value"])) : (p(), I(_, { key: 1 }, [
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
