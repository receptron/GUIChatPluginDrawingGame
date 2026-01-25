import { TOOL_NAME as S, pluginCore as C } from "./core.js";
import { SAMPLES as _t, SYSTEM_PROMPT as kt, TOOL_DEFINITION as ft, executeDrawingGame as wt } from "./core.js";
import { defineComponent as $, ref as P, watch as O, createElementBlock as o, openBlock as l, createCommentVNode as k, createElementVNode as i, toDisplayString as h, normalizeClass as T, createStaticVNode as D, Fragment as x, renderList as _, normalizeStyle as g, computed as N } from "vue";
const z = { class: "size-full overflow-hidden p-4 bg-slate-100 flex flex-col items-center" }, E = {
  key: 0,
  class: "w-full max-w-2xl"
}, M = { class: "flex items-center justify-between mb-4" }, U = { class: "flex items-center gap-4 text-sm text-slate-600" }, V = { class: "bg-white rounded-lg shadow-lg overflow-hidden border-2 border-slate-300" }, B = ["viewBox"], Y = { class: "opacity-10" }, A = ["x1", "x2"], F = ["y1", "y2"], G = ["cx", "cy", "r", "fill", "stroke"], I = ["cx", "cy", "rx", "ry", "fill", "stroke"], L = ["x", "y", "width", "height", "fill", "stroke"], X = ["points", "fill", "stroke"], q = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"], W = { class: "mt-4 text-center text-sm text-slate-500" }, j = { key: 0 }, K = { key: 1 }, R = { key: 2 }, a = 500, Z = /* @__PURE__ */ $({
  __name: "View",
  props: {
    selectedResult: {},
    sendTextMessage: { type: Function }
  },
  setup(f) {
    const w = f, s = P(null);
    O(
      () => w.selectedResult,
      (n) => {
        n?.toolName === S && n.data && (s.value = n.data);
      },
      { immediate: !0, deep: !0 }
    );
    const r = (n) => n / 100 * a, y = (n) => n.type === "line" ? "none" : n.pattern === "solid" ? n.color : `url(#pattern-${n.pattern})`, c = (n) => n.pattern === "solid" ? "" : `color: ${n.color}`, e = (n) => {
      const d = r(n.x), t = r(n.y), u = r(n.size) / 2, m = t - u, v = t + u * 0.5, b = d - u * 0.866, p = d + u * 0.866;
      return `${d},${m} ${b},${v} ${p},${v}`;
    };
    return (n, d) => (l(), o("div", z, [
      s.value ? (l(), o("div", E, [
        i("div", M, [
          d[0] || (d[0] = i("h2", { class: "text-xl font-bold text-slate-800" }, "Drawing Game", -1)),
          i("div", U, [
            i("span", null, "Shapes: " + h(s.value.shapes.length), 1),
            i("span", {
              class: T(s.value.gamePhase === "guessing" ? "text-amber-600 font-semibold" : "")
            }, h(s.value.gamePhase === "guessing" ? "Guessing!" : "Drawing"), 3)
          ])
        ]),
        i("div", V, [
          (l(), o("svg", {
            viewBox: `0 0 ${a} ${a}`,
            class: "w-full aspect-square",
            style: { background: "white" }
          }, [
            d[1] || (d[1] = D('<defs><pattern id="pattern-hatched" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="2"></line></pattern><pattern id="pattern-dotted" patternUnits="userSpaceOnUse" width="10" height="10"><circle cx="5" cy="5" r="2" fill="currentColor"></circle></pattern><pattern id="pattern-striped" patternUnits="userSpaceOnUse" width="10" height="10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="3"></line></pattern></defs>', 1)),
            i("g", Y, [
              (l(), o(x, null, _(9, (t) => i("line", {
                key: `v-${t}`,
                x1: t * 50,
                y1: "0",
                x2: t * 50,
                y2: a,
                stroke: "#999",
                "stroke-width": "1"
              }, null, 8, A)), 64)),
              (l(), o(x, null, _(9, (t) => i("line", {
                key: `h-${t}`,
                x1: "0",
                y1: t * 50,
                x2: a,
                y2: t * 50,
                stroke: "#999",
                "stroke-width": "1"
              }, null, 8, F)), 64))
            ]),
            (l(!0), o(x, null, _(s.value.shapes, (t) => (l(), o(x, {
              key: t.id
            }, [
              t.type === "circle" ? (l(), o("circle", {
                key: 0,
                cx: r(t.x),
                cy: r(t.y),
                r: r(t.size) / 2,
                fill: y(t),
                stroke: t.color,
                "stroke-width": "2",
                style: g(c(t))
              }, null, 12, G)) : t.type === "ellipse" ? (l(), o("ellipse", {
                key: 1,
                cx: r(t.x),
                cy: r(t.y),
                rx: r(t.width) / 2,
                ry: r(t.height) / 2,
                fill: y(t),
                stroke: t.color,
                "stroke-width": "2",
                style: g(c(t))
              }, null, 12, I)) : t.type === "rectangle" ? (l(), o("rect", {
                key: 2,
                x: r(t.x) - r(t.width) / 2,
                y: r(t.y) - r(t.height) / 2,
                width: r(t.width),
                height: r(t.height),
                fill: y(t),
                stroke: t.color,
                "stroke-width": "2",
                style: g(c(t))
              }, null, 12, L)) : t.type === "triangle" ? (l(), o("polygon", {
                key: 3,
                points: e(t),
                fill: y(t),
                stroke: t.color,
                "stroke-width": "2",
                style: g(c(t))
              }, null, 12, X)) : t.type === "line" ? (l(), o("line", {
                key: 4,
                x1: r(t.x1),
                y1: r(t.y1),
                x2: r(t.x2),
                y2: r(t.y2),
                stroke: t.color,
                "stroke-width": t.strokeWidth * 2,
                "stroke-linecap": "round"
              }, null, 8, q)) : k("", !0)
            ], 64))), 128))
          ], 8, B))
        ]),
        i("div", W, [
          s.value.shapes.length === 0 ? (l(), o("span", j, ' Say something like "draw a big blue circle in the center" ')) : s.value.gamePhase === "drawing" ? (l(), o("span", K, ' Keep adding shapes or say "guess!" when done ')) : (l(), o("span", R, " Waiting for the guess... "))
        ])
      ])) : k("", !0)
    ]));
  }
}), H = { class: "p-3 bg-amber-50 rounded-md" }, J = {
  key: 0,
  class: "flex flex-col gap-2"
}, Q = { class: "bg-white rounded border border-slate-200 overflow-hidden" }, tt = {
  viewBox: "0 0 100 100",
  class: "w-full aspect-square"
}, et = ["cx", "cy", "r", "fill", "stroke"], ot = ["cx", "cy", "rx", "ry", "fill"], lt = ["x", "y", "width", "height", "fill"], nt = ["points", "fill"], rt = ["x1", "y1", "x2", "y2", "stroke"], it = { class: "text-center" }, st = { class: "inline-block bg-amber-500 text-white text-xs font-bold py-1 px-3 rounded-full" }, ct = /* @__PURE__ */ $({
  __name: "Preview",
  props: {
    result: {}
  },
  setup(f) {
    const w = f, s = N(() => w.result.data), r = (y) => {
      const c = y.x, e = y.y, n = y.size / 2, d = e - n, t = e + n * 0.5, u = c - n * 0.866, m = c + n * 0.866;
      return `${c},${d} ${u},${t} ${m},${t}`;
    };
    return (y, c) => (l(), o("div", H, [
      s.value ? (l(), o("div", J, [
        c[0] || (c[0] = i("div", { class: "text-sm font-semibold text-slate-800 text-center" }, " Drawing Game ", -1)),
        i("div", Q, [
          (l(), o("svg", tt, [
            (l(!0), o(x, null, _(s.value.shapes, (e) => (l(), o(x, {
              key: e.id
            }, [
              e.type === "circle" ? (l(), o("circle", {
                key: 0,
                cx: e.x,
                cy: e.y,
                r: e.size / 2,
                fill: e.color,
                stroke: e.color,
                "stroke-width": "0.5"
              }, null, 8, et)) : e.type === "ellipse" ? (l(), o("ellipse", {
                key: 1,
                cx: e.x,
                cy: e.y,
                rx: e.width / 2,
                ry: e.height / 2,
                fill: e.color
              }, null, 8, ot)) : e.type === "rectangle" ? (l(), o("rect", {
                key: 2,
                x: e.x - e.width / 2,
                y: e.y - e.height / 2,
                width: e.width,
                height: e.height,
                fill: e.color
              }, null, 8, lt)) : e.type === "triangle" ? (l(), o("polygon", {
                key: 3,
                points: r(e),
                fill: e.color
              }, null, 8, nt)) : e.type === "line" ? (l(), o("line", {
                key: 4,
                x1: e.x1,
                y1: e.y1,
                x2: e.x2,
                y2: e.y2,
                stroke: e.color,
                "stroke-width": "1"
              }, null, 8, rt)) : k("", !0)
            ], 64))), 128))
          ]))
        ]),
        i("div", it, [
          i("span", st, h(s.value.shapes.length) + " shapes ", 1)
        ])
      ])) : k("", !0)
    ]));
  }
}), dt = {
  ...C,
  viewComponent: Z,
  previewComponent: ct
}, xt = { plugin: dt };
export {
  ct as Preview,
  _t as SAMPLES,
  kt as SYSTEM_PROMPT,
  ft as TOOL_DEFINITION,
  S as TOOL_NAME,
  Z as View,
  xt as default,
  wt as executeDrawingGame,
  dt as plugin,
  C as pluginCore
};
