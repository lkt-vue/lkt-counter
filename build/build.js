import { defineComponent as s, mergeDefaults as l } from "vue";
import { CounterType as a, getDefaultValues as c, Counter as u } from "lkt-vue-kernel";
const i = /* @__PURE__ */ s({
  __name: "LktCounter",
  props: /* @__PURE__ */ l({
    type: {},
    from: {},
    to: {}
  }, c(u)),
  setup(t) {
    const n = t;
    if (console.log("counter iniciado: "), n.type === a.Date) {
      var o = /* @__PURE__ */ new Date(), r = /* @__PURE__ */ new Date("2036-03-15T23:23:23");
      setInterval(() => {
        o.setSeconds(o.getSeconds() + 1);
        let e = new Date(r - o);
        console.log("currentDate: ", e.getFullYear() - 1970, e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds());
      }, 1e3);
    }
    return (e, p) => null;
  }
}), f = {
  install: (t) => {
    t.component("lkt-counter") === void 0 && t.component("lkt-counter", i);
  }
};
export {
  f as default
};
