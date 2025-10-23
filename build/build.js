import { defineComponent as _, mergeDefaults as w, ref as a, onMounted as I, computed as F, resolveComponent as S, createElementBlock as h, openBlock as p, createBlock as V, unref as b, normalizeProps as x, mergeProps as M, Fragment as N, createTextVNode as P, toDisplayString as B } from "vue";
import { CounterType as n, CounterView as E, getDefaultValues as L, Counter as j } from "lkt-vue-kernel";
import { secondsToTimeString as z } from "lkt-date-tools";
const q = { class: "lkt-counter" }, A = /* @__PURE__ */ _({
  __name: "LktCounter",
  props: /* @__PURE__ */ w({
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
  }, L(j)),
  setup(l) {
    const e = l, o = a(e.type === n.Number ? parseFloat(e.from) : e.from), s = a(void 0), u = a(typeof e.step > "u" ? 1 : parseFloat(e.step)), f = a(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), v = a(e.type === n.Number ? parseFloat(e.to) : e.to), i = a(e.seconds), m = () => {
      o.value = z(i.value);
    };
    let d = null;
    function D() {
      m(), d = setInterval(() => {
        --i.value < 0 && (i.value = 0, clearInterval(d), typeof e.events.onEnd == "function" && e.events.onEnd()), m();
      }, 1e3);
    }
    if (e.type === n.Number)
      s.value = setInterval(() => {
        o.value < v.value ? o.value += u.value : o.value > v.value ? o.value -= u.value : clearInterval(s.value);
      }, f.value);
    else if (e.type === n.Date) {
      let t = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), c = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      s.value = setInterval(() => {
        t.getTime() < c.getTime() ? t.setSeconds(t.getSeconds() + u.value) : t.getTime() > c.getTime() && t.setSeconds(t.getSeconds() - u.value);
        let r = c - t, g = Math.floor(r / (1e3 * 60 * 60 * 24)), y = Math.floor(r % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), k = Math.floor(r % (1e3 * 60 * 60) / (1e3 * 60)), T = Math.floor(r % (1e3 * 60) / 1e3);
        o.value = g + "d " + y + "h " + k + "m " + T + "s ", o.value = e.dateFormat.replace(":d", g).replace(":h", y).replace(":m", k).replace(":s", T), r < 0 && clearInterval(s.value);
      }, f.value);
    } else e.type === n.Timer && m();
    I(() => {
      e.type === n.Timer && D();
    });
    const C = F(() => {
      let t = 0;
      switch (e.type) {
        case n.Timer:
          t = i.value * 100 / e.seconds, 100 / e.seconds;
          break;
      }
      return {
        ...e.progress,
        animation: {
          ...typeof e.progress.animation == "object" ? e.progress.animation : {},
          externalControl: !0
        },
        duration: 1e3,
        text: o.value,
        modelValue: t
      };
    });
    return (t, c) => {
      const r = S("lkt-progress");
      return p(), h("div", q, [
        l.view === b(E).Progress ? (p(), V(r, x(M({ key: 0 }, C.value)), null, 16)) : (p(), h(N, { key: 1 }, [
          P(B(o.value), 1)
        ], 64))
      ]);
    };
  }
}), K = {
  install: (l) => {
    l.component("lkt-counter") === void 0 && l.component("lkt-counter", A);
  }
};
export {
  K as default
};
