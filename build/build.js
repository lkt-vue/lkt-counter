import { defineComponent as T, mergeDefaults as h, ref as a, onMounted as _, createElementBlock as k, openBlock as F, toDisplayString as I } from "vue";
import { CounterType as l, getDefaultValues as S, Counter as C } from "lkt-vue-kernel";
import { secondsToTimeString as M } from "lkt-date-tools";
const w = { class: "lkt-counter" }, b = /* @__PURE__ */ T({
  __name: "LktCounter",
  props: /* @__PURE__ */ h({
    type: {},
    from: {},
    to: {},
    step: {},
    timeout: {},
    dateFormat: {},
    seconds: {}
  }, S(C)),
  setup(r) {
    const e = r, t = a(e.type === l.Number ? parseFloat(e.from) : e.from), s = a(void 0), u = a(typeof e.step > "u" ? 1 : parseFloat(e.step)), f = a(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), m = a(e.type === l.Number ? parseFloat(e.to) : e.to), c = a(e.seconds), p = () => {
      t.value = M(c.value);
    };
    function D() {
      setInterval(function() {
        p(), --c.value < 0 && (c.value = 0);
      }, 1e3);
    }
    if (e.type === l.Number)
      s.value = setInterval(() => {
        t.value < m.value ? t.value += u.value : t.value > m.value ? t.value -= u.value : clearInterval(s.value);
      }, f.value);
    else if (e.type === l.Date) {
      let o = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), i = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      s.value = setInterval(() => {
        o.getTime() < i.getTime() ? o.setSeconds(o.getSeconds() + u.value) : o.getTime() > i.getTime() && o.setSeconds(o.getSeconds() - u.value);
        let n = i - o, v = Math.floor(n / (1e3 * 60 * 60 * 24)), d = Math.floor(n % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), y = Math.floor(n % (1e3 * 60 * 60) / (1e3 * 60)), g = Math.floor(n % (1e3 * 60) / 1e3);
        t.value = v + "d " + d + "h " + y + "m " + g + "s ", t.value = e.dateFormat.replace(":d", v).replace(":h", d).replace(":m", y).replace(":s", g), n < 0 && clearInterval(s.value);
      }, f.value);
    } else e.type === l.Timer && p();
    return _(() => {
      e.type === l.Timer && D();
    }), (o, i) => (F(), k("div", w, I(t.value), 1));
  }
}), B = {
  install: (r) => {
    r.component("lkt-counter") === void 0 && r.component("lkt-counter", b);
  }
};
export {
  B as default
};
