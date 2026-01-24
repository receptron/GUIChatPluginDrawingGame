/**
 * Drawing Game Tool Definition
 */

import type { ToolDefinition } from "gui-chat-protocol";

export const TOOL_NAME = "drawingGame";

export const TOOL_DEFINITION: ToolDefinition = {
  type: "function",
  name: TOOL_NAME,
  description:
    "A drawing game where you help the user draw pictures using only primitive shapes. " +
    "The user describes what to draw, and you interpret their instructions into shape commands. " +
    "At the end, you guess what they drew.",
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
          "guess",
        ],
        description:
          "The action to perform. " +
          "start: Clear canvas and start new game. " +
          "circle/ellipse/rectangle/triangle/line: Draw shapes. " +
          "fill: Change default fill color. " +
          "pattern: Change default pattern (solid/hatched/dotted/striped). " +
          "move: Move the last shape. " +
          "undo: Remove last shape. " +
          "guess: Make a guess what the drawing represents.",
      },
      x: {
        type: "number",
        description: "X position (0-100, where 0=left, 50=center, 100=right)",
      },
      y: {
        type: "number",
        description: "Y position (0-100, where 0=top, 50=center, 100=bottom)",
      },
      size: {
        type: "number",
        description:
          "Size for circle/triangle (0-100, where 5=tiny, 15=small, 30=medium, 50=large)",
      },
      width: {
        type: "number",
        description: "Width for ellipse/rectangle (0-100)",
      },
      height: {
        type: "number",
        description: "Height for ellipse/rectangle (0-100)",
      },
      x1: {
        type: "number",
        description: "Start X for line (0-100)",
      },
      y1: {
        type: "number",
        description: "Start Y for line (0-100)",
      },
      x2: {
        type: "number",
        description: "End X for line (0-100)",
      },
      y2: {
        type: "number",
        description: "End Y for line (0-100)",
      },
      strokeWidth: {
        type: "number",
        description: "Line width (1-10, default 2)",
      },
      color: {
        type: "string",
        description: "CSS color name or hex (e.g., 'blue', 'red', '#FF5733')",
      },
      pattern: {
        type: "string",
        enum: ["solid", "hatched", "dotted", "striped"],
        description:
          "Fill pattern: solid (normal), hatched (diagonal lines), dotted, striped (horizontal)",
      },
      dx: {
        type: "number",
        description: "Relative X movement for move action (-100 to 100)",
      },
      dy: {
        type: "number",
        description: "Relative Y movement for move action (-100 to 100)",
      },
    },
    required: ["action"],
  },
};

export const SYSTEM_PROMPT = `You are playing a drawing game. The user will describe what they want to draw, and you must interpret their instructions using ONLY primitive shapes.

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
4. Be creative but stick to primitives!`;
