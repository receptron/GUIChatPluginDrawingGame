/**
 * Drawing Game Sample Data
 */

import type { ToolSample } from "gui-chat-protocol";

export const SAMPLES: ToolSample[] = [
  {
    name: "Start Game",
    args: { action: "start" },
  },
  {
    name: "Blue Circle",
    args: {
      action: "circle",
      x: 50,
      y: 50,
      size: 25,
      color: "blue",
    },
  },
  {
    name: "Red Triangle",
    args: {
      action: "triangle",
      x: 50,
      y: 25,
      size: 15,
      color: "red",
    },
  },
  {
    name: "Green Rectangle",
    args: {
      action: "rectangle",
      x: 50,
      y: 75,
      width: 40,
      height: 15,
      color: "green",
    },
  },
  {
    name: "Yellow Ellipse",
    args: {
      action: "ellipse",
      x: 30,
      y: 50,
      width: 20,
      height: 30,
      color: "gold",
    },
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
      strokeWidth: 3,
    },
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
      pattern: "hatched",
    },
  },
  {
    name: "Move Right",
    args: {
      action: "move",
      dx: 10,
      dy: 0,
    },
  },
  {
    name: "Undo",
    args: { action: "undo" },
  },
  {
    name: "Guess!",
    args: { action: "guess" },
  },
];
