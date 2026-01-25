const D = "drawingGame", $ = {
  type: "function",
  name: D,
  description: "A drawing game where you help the user draw pictures using only primitive shapes. The user describes what to draw, and you interpret their instructions into shape commands. At the end, you guess what they drew.",
  parameters: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: [
          "start",
          "circle",
          "ellipse",
          "rectangle",
          "triangle",
          "line",
          "fill",
          "pattern",
          "move",
          "undo",
          "guess"
        ],
        description: "The action to perform. start: Clear canvas and start new game. circle/ellipse/rectangle/triangle/line: Draw shapes. fill: Change default fill color. pattern: Change default pattern (solid/hatched/dotted/striped). move: Move the last shape. undo: Remove last shape. guess: Make a guess what the drawing represents."
      },
      x: {
        type: "number",
        description: "X position (0-100, where 0=left, 50=center, 100=right)"
      },
      y: {
        type: "number",
        description: "Y position (0-100, where 0=top, 50=center, 100=bottom)"
      },
      size: {
        type: "number",
        description: "Size for circle/triangle (0-100, where 5=tiny, 15=small, 30=medium, 50=large)"
      },
      width: {
        type: "number",
        description: "Width for ellipse/rectangle (0-100)"
      },
      height: {
        type: "number",
        description: "Height for ellipse/rectangle (0-100)"
      },
      x1: {
        type: "number",
        description: "Start X for line (0-100)"
      },
      y1: {
        type: "number",
        description: "Start Y for line (0-100)"
      },
      x2: {
        type: "number",
        description: "End X for line (0-100)"
      },
      y2: {
        type: "number",
        description: "End Y for line (0-100)"
      },
      strokeWidth: {
        type: "number",
        description: "Line width (1-10, default 2)"
      },
      color: {
        type: "string",
        description: "CSS color name or hex (e.g., 'blue', 'red', '#FF5733')"
      },
      pattern: {
        type: "string",
        enum: ["solid", "hatched", "dotted", "striped"],
        description: "Fill pattern: solid (normal), hatched (diagonal lines), dotted, striped (horizontal)"
      },
      dx: {
        type: "number",
        description: "Relative X movement for move action (-100 to 100)"
      },
      dy: {
        type: "number",
        description: "Relative Y movement for move action (-100 to 100)"
      }
    },
    required: ["action"]
  }
}, z = `You are playing a drawing game. The user will describe what they want to draw, and you must interpret their instructions using ONLY primitive shapes.

AVAILABLE COMMANDS:
- start: Clear canvas and begin new game
- circle: Draw a circle (x, y, size, color, pattern)
- ellipse: Draw an ellipse (x, y, width, height, color, pattern)
- rectangle: Draw a rectangle (x, y, width, height, color, pattern)
- triangle: Draw a triangle (x, y, size, color, pattern)
- line: Draw a line (x1, y1, x2, y2, color, strokeWidth)
- fill: Change default fill color
- pattern: Change default pattern (solid/hatched/dotted/striped)
- move: Move last shape (dx, dy as relative movement)
- undo: Remove last shape
- guess: Guess what the drawing is

POSITION GUIDE (0-100):
- x: 0=left edge, 50=center, 100=right edge
- y: 0=top edge, 50=center, 100=bottom edge
- size: 5=tiny, 15=small, 30=medium, 50=large

PATTERNS:
- solid: Normal fill
- hatched: Diagonal lines (網掛け)
- dotted: Dots pattern
- striped: Horizontal stripes

EXAMPLES:
- "大きな青い丸を中央に" → circle x:50, y:50, size:30, color:blue
- "上に小さな赤い三角" → triangle x:50, y:20, size:15, color:red
- "網掛けの四角" → rectangle with pattern:hatched
- "ちょっと右に" → move dx:10, dy:0
- "当てて!" → guess

RULES:
1. Only use primitive shapes - no complex drawings!
2. Interpret user's natural language into coordinates
3. When user says "当てて" or "guess", call the guess action
4. Be creative but stick to primitives!`, A = [
  {
    name: "Start Game",
    args: { action: "start" }
  },
  {
    name: "Blue Circle",
    args: {
      action: "circle",
      x: 50,
      y: 50,
      size: 25,
      color: "blue"
    }
  },
  {
    name: "Red Triangle",
    args: {
      action: "triangle",
      x: 50,
      y: 25,
      size: 15,
      color: "red"
    }
  },
  {
    name: "Green Rectangle",
    args: {
      action: "rectangle",
      x: 50,
      y: 75,
      width: 40,
      height: 15,
      color: "green"
    }
  },
  {
    name: "Yellow Ellipse",
    args: {
      action: "ellipse",
      x: 30,
      y: 50,
      width: 20,
      height: 30,
      color: "gold"
    }
  },
  {
    name: "Black Line",
    args: {
      action: "line",
      x1: 10,
      y1: 90,
      x2: 90,
      y2: 90,
      color: "black",
      strokeWidth: 3
    }
  },
  {
    name: "Hatched Pattern",
    args: {
      action: "rectangle",
      x: 70,
      y: 30,
      width: 20,
      height: 20,
      color: "purple",
      pattern: "hatched"
    }
  },
  {
    name: "Move Right",
    args: {
      action: "move",
      dx: 10,
      dy: 0
    }
  },
  {
    name: "Undo",
    args: { action: "undo" }
  },
  {
    name: "Guess!",
    args: { action: "guess" }
  }
], m = () => Math.random().toString(36).substring(2, 9), a = (t, e, d) => Math.max(e, Math.min(d, t)), x = (t) => {
  const e = t.pattern !== "solid" ? ` ${t.pattern}` : "", d = (h, n) => {
    const u = h < 33 ? "left" : h > 66 ? "right" : "center";
    return `${n < 33 ? "top" : n > 66 ? "bottom" : "middle"}-${u}`;
  };
  switch (t.type) {
    case "circle":
      return `${t.size < 15 ? "small" : t.size > 35 ? "large" : "medium"}${e} ${t.color} circle at ${d(t.x, t.y)}`;
    case "ellipse":
      return `${e} ${t.color} ellipse at ${d(t.x, t.y)}`;
    case "rectangle": {
      const n = Math.abs(t.width - t.height) < 5 ? "square" : "rectangle";
      return `${e} ${t.color} ${n} at ${d(t.x, t.y)}`;
    }
    case "triangle":
      return `${t.size < 15 ? "small" : t.size > 35 ? "large" : "medium"}${e} ${t.color} triangle at ${d(t.x, t.y)}`;
    case "line":
      return `${t.color} line from (${t.x1},${t.y1}) to (${t.x2},${t.y2})`;
  }
}, S = async (t, e) => {
  const { action: d } = e, h = t.currentResult?.data;
  let n = h?.shapes ?? [], u = h?.defaultColor ?? "black", g = h?.defaultPattern ?? "solid", w = h?.gamePhase ?? "drawing";
  const p = e.color ?? u, f = e.pattern ?? g;
  let o = "", l = "";
  switch (d) {
    case "start": {
      n = [], u = "black", g = "solid", w = "drawing", o = "New drawing game started! Canvas is clear.", l = "The drawing canvas is now clear. Help the user draw by interpreting their descriptions into primitive shapes (circle, ellipse, rectangle, triangle, line). Ask them what they want to draw!";
      break;
    }
    case "circle": {
      const s = a(e.x ?? 50, 0, 100), r = a(e.y ?? 50, 0, 100), i = a(e.size ?? 20, 1, 100), c = {
        id: m(),
        type: "circle",
        x: s,
        y: r,
        size: i,
        color: p,
        pattern: f
      };
      n = [...n, c], o = `Drew a ${p} circle at (${s}, ${r}) with size ${i}`, l = "Circle added. Ask the user what else they want to add or if they want you to guess.";
      break;
    }
    case "ellipse": {
      const s = a(e.x ?? 50, 0, 100), r = a(e.y ?? 50, 0, 100), i = a(e.width ?? 30, 1, 100), c = a(e.height ?? 20, 1, 100), y = {
        id: m(),
        type: "ellipse",
        x: s,
        y: r,
        width: i,
        height: c,
        color: p,
        pattern: f
      };
      n = [...n, y], o = `Drew a ${p} ellipse at (${s}, ${r})`, l = "Ellipse added. Ask the user what else they want to add.";
      break;
    }
    case "rectangle": {
      const s = a(e.x ?? 50, 0, 100), r = a(e.y ?? 50, 0, 100), i = a(e.width ?? 30, 1, 100), c = a(e.height ?? 20, 1, 100), y = {
        id: m(),
        type: "rectangle",
        x: s,
        y: r,
        width: i,
        height: c,
        color: p,
        pattern: f
      };
      n = [...n, y], o = `Drew a ${p} rectangle at (${s}, ${r})`, l = "Rectangle added. Ask the user what else they want to add.";
      break;
    }
    case "triangle": {
      const s = a(e.x ?? 50, 0, 100), r = a(e.y ?? 50, 0, 100), i = a(e.size ?? 20, 1, 100), c = {
        id: m(),
        type: "triangle",
        x: s,
        y: r,
        size: i,
        color: p,
        pattern: f
      };
      n = [...n, c], o = `Drew a ${p} triangle at (${s}, ${r}) with size ${i}`, l = "Triangle added. Ask the user what else they want to add.";
      break;
    }
    case "line": {
      const s = a(e.x1 ?? 20, 0, 100), r = a(e.y1 ?? 50, 0, 100), i = a(e.x2 ?? 80, 0, 100), c = a(e.y2 ?? 50, 0, 100), y = a(e.strokeWidth ?? 2, 1, 10), k = {
        id: m(),
        type: "line",
        x1: s,
        y1: r,
        x2: i,
        y2: c,
        strokeWidth: y,
        color: p,
        pattern: "solid"
      };
      n = [...n, k], o = `Drew a ${p} line from (${s}, ${r}) to (${i}, ${c})`, l = "Line added. Ask the user what else they want to add.";
      break;
    }
    case "fill": {
      e.color ? (u = e.color, o = `Default fill color changed to ${e.color}`, l = "Default color updated. Future shapes will use this color unless specified otherwise.") : (o = "No color specified for fill action", l = "Ask the user what color they want to use.");
      break;
    }
    case "pattern": {
      e.pattern ? (g = e.pattern, o = `Default pattern changed to ${e.pattern}`, l = "Default pattern updated. Future shapes will use this pattern unless specified otherwise.") : (o = "No pattern specified", l = "Ask the user what pattern they want (solid, hatched, dotted, striped).");
      break;
    }
    case "move": {
      if (n.length === 0)
        o = "No shapes to move", l = "There are no shapes on the canvas yet. Help the user draw something first.";
      else {
        const s = e.dx ?? 0, r = e.dy ?? 0, i = n[n.length - 1];
        let c;
        i.type === "line" ? c = {
          ...i,
          x1: a(i.x1 + s, 0, 100),
          y1: a(i.y1 + r, 0, 100),
          x2: a(i.x2 + s, 0, 100),
          y2: a(i.y2 + r, 0, 100)
        } : c = {
          ...i,
          x: a(i.x + s, 0, 100),
          y: a(i.y + r, 0, 100)
        }, n = [...n.slice(0, -1), c], o = `Moved last shape by (${s}, ${r})`, l = "Shape moved. Ask the user if they want to continue adjusting.";
      }
      break;
    }
    case "undo": {
      n.length === 0 ? (o = "No shapes to undo", l = "The canvas is already empty.") : (n = n.slice(0, -1), o = `Removed last shape. ${n.length} shapes remaining.`, l = "Last shape removed. Ask the user what they want to do next.");
      break;
    }
    case "guess": {
      w = "guessing";
      const s = n.map(x);
      o = `Guessing phase! The drawing has ${n.length} shapes.`, l = `Look at the shape descriptions and make your best guess what the user drew. Be creative and fun with your guess! Shape descriptions: ${s.join("; ")}. After guessing, ask the user if you were correct.`;
      break;
    }
    default:
      o = `Unknown action: ${d}`, l = "Ask the user what they want to do.";
  }
  const b = {
    shapes: n,
    defaultColor: u,
    defaultPattern: g,
    gamePhase: w
  }, v = {
    shapeCount: n.length,
    gamePhase: w,
    lastAction: d,
    ...d === "guess" && { shapeDescriptions: n.map(x) }
  };
  return {
    toolName: $.name,
    message: o,
    data: b,
    jsonData: v,
    instructions: l,
    updating: d !== "start"
  };
}, T = {
  toolDefinition: $,
  execute: S,
  generatingMessage: "Drawing...",
  isEnabled: () => !0,
  systemPrompt: z,
  samples: A
};
export {
  A as SAMPLES,
  z as SYSTEM_PROMPT,
  $ as TOOL_DEFINITION,
  D as TOOL_NAME,
  S as executeDrawingGame,
  T as pluginCore
};
