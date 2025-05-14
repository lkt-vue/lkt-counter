import { defineComponent as y, mergeDefaults as D, ref as l, createElementBlock as g, openBlock as h, toDisplayString as _ } from "vue";
import { CounterType as i, getDefaultValues as k, Counter as F } from "lkt-vue-kernel";
const C = { class: "lkt-counter" }, I = /* @__PURE__ */ y({
  __name: "LktCounter",
  props: /* @__PURE__ */ D({
    type: {},
    from: {},
    to: {},
    step: {},
    timeout: {},
    dateFormat: {}
  }, k(F)),
  setup(r) {
    const e = r, o = l(e.type === i.Number ? parseFloat(e.from) : e.from), n = l(void 0), s = l(typeof e.step > "u" ? 1 : parseFloat(e.step)), c = l(typeof e.timeout > "u" ? 1e3 : parseFloat(e.timeout)), p = l(e.type === i.Number ? parseFloat(e.to) : e.to);
    if (e.type === i.Number)
      n.value = setInterval(() => {
        o.value < p.value ? o.value += s.value : o.value > p.value ? o.value -= s.value : clearInterval(n.value);
      }, c.value);
    else if (e.type === i.Date) {
      let t = typeof e.from > "u" ? /* @__PURE__ */ new Date() : new Date(e.from), u = typeof e.to > "u" ? /* @__PURE__ */ new Date() : new Date(e.to);
      n.value = setInterval(() => {
        t.getTime() < u.getTime() ? t.setSeconds(t.getSeconds() + s.value) : t.getTime() > u.getTime() && t.setSeconds(t.getSeconds() - s.value);
        let a = u - t, f = Math.floor(a / (1e3 * 60 * 60 * 24)), m = Math.floor(a % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), v = Math.floor(a % (1e3 * 60 * 60) / (1e3 * 60)), d = Math.floor(a % (1e3 * 60) / 1e3);
        o.value = f + "d " + m + "h " + v + "m " + d + "s ", o.value = e.dateFormat.replace(":d", f).replace(":h", m).replace(":m", v).replace(":s", d), a < 0 && clearInterval(n.value);
      }, c.value);
    }
    return (t, u) => (h(), g("div", C, _(o.value), 1));
  }
}), w = {
  install: (r) => {
    r.component("lkt-counter") === void 0 && r.component("lkt-counter", I);
  }
};
export {
  w as default
};
