/**
 * Drawing Game Plugin Core
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type {
  DrawingGameData,
  DrawingGameJsonData,
  DrawingGameArgs,
  Shape,
  CircleShape,
  EllipseShape,
  RectangleShape,
  TriangleShape,
  LineShape,
  PatternType,
} from "./types";
import { TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";
import { SAMPLES } from "./samples";

// ============================================================================
// Helper Functions
// ============================================================================

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const describeShape = (shape: Shape): string => {
  const patternDesc = shape.pattern !== "solid" ? ` ${shape.pattern}` : "";
  const positionDesc = (x: number, y: number): string => {
    const hPos = x < 33 ? "left" : x > 66 ? "right" : "center";
    const vPos = y < 33 ? "top" : y > 66 ? "bottom" : "middle";
    return `${vPos}-${hPos}`;
  };

  switch (shape.type) {
    case "circle": {
      const sizeDesc =
        shape.size < 15 ? "small" : shape.size > 35 ? "large" : "medium";
      return `${sizeDesc}${patternDesc} ${shape.color} circle at ${positionDesc(shape.x, shape.y)}`;
    }
    case "ellipse": {
      return `${patternDesc} ${shape.color} ellipse at ${positionDesc(shape.x, shape.y)}`;
    }
    case "rectangle": {
      const isSquare = Math.abs(shape.width - shape.height) < 5;
      const shapeType = isSquare ? "square" : "rectangle";
      return `${patternDesc} ${shape.color} ${shapeType} at ${positionDesc(shape.x, shape.y)}`;
    }
    case "triangle": {
      const sizeDesc =
        shape.size < 15 ? "small" : shape.size > 35 ? "large" : "medium";
      return `${sizeDesc}${patternDesc} ${shape.color} triangle at ${positionDesc(shape.x, shape.y)}`;
    }
    case "line": {
      return `${shape.color} line from (${shape.x1},${shape.y1}) to (${shape.x2},${shape.y2})`;
    }
  }
};

// ============================================================================
// Execute Function
// ============================================================================

export const executeDrawingGame = async (
  context: ToolContext,
  args: DrawingGameArgs,
): Promise<ToolResult<DrawingGameData, DrawingGameJsonData>> => {
  const { action } = args;

  // Get current state from context or initialize
  const currentData = context.currentResult?.data as DrawingGameData | undefined;
  let shapes: Shape[] = currentData?.shapes ?? [];
  let defaultColor: string = currentData?.defaultColor ?? "black";
  let defaultPattern: PatternType = currentData?.defaultPattern ?? "solid";
  let gamePhase = currentData?.gamePhase ?? "drawing";

  const color = args.color ?? defaultColor;
  const pattern = args.pattern ?? defaultPattern;

  let message: string;
  let instructions: string;

  switch (action) {
    case "start": {
      shapes = [];
      defaultColor = "black";
      defaultPattern = "solid";
      gamePhase = "drawing";
      message = "New drawing game started! Canvas is clear.";
      instructions =
        "The drawing canvas is now clear. Help the user draw by interpreting their descriptions into primitive shapes (circle, ellipse, rectangle, triangle, line). Ask them what they want to draw!";
      break;
    }

    case "circle": {
      const x = clamp(args.x ?? 50, 0, 100);
      const y = clamp(args.y ?? 50, 0, 100);
      const size = clamp(args.size ?? 20, 1, 100);
      const newCircle: CircleShape = {
        id: generateId(),
        type: "circle",
        x,
        y,
        size,
        color,
        pattern,
      };
      shapes = [...shapes, newCircle];
      message = `Drew a ${color} circle at (${x}, ${y}) with size ${size}`;
      instructions =
        "Circle added. Ask the user what else they want to add or if they want you to guess.";
      break;
    }

    case "ellipse": {
      const x = clamp(args.x ?? 50, 0, 100);
      const y = clamp(args.y ?? 50, 0, 100);
      const width = clamp(args.width ?? 30, 1, 100);
      const height = clamp(args.height ?? 20, 1, 100);
      const newEllipse: EllipseShape = {
        id: generateId(),
        type: "ellipse",
        x,
        y,
        width,
        height,
        color,
        pattern,
      };
      shapes = [...shapes, newEllipse];
      message = `Drew a ${color} ellipse at (${x}, ${y})`;
      instructions =
        "Ellipse added. Ask the user what else they want to add.";
      break;
    }

    case "rectangle": {
      const x = clamp(args.x ?? 50, 0, 100);
      const y = clamp(args.y ?? 50, 0, 100);
      const width = clamp(args.width ?? 30, 1, 100);
      const height = clamp(args.height ?? 20, 1, 100);
      const newRect: RectangleShape = {
        id: generateId(),
        type: "rectangle",
        x,
        y,
        width,
        height,
        color,
        pattern,
      };
      shapes = [...shapes, newRect];
      message = `Drew a ${color} rectangle at (${x}, ${y})`;
      instructions =
        "Rectangle added. Ask the user what else they want to add.";
      break;
    }

    case "triangle": {
      const x = clamp(args.x ?? 50, 0, 100);
      const y = clamp(args.y ?? 50, 0, 100);
      const size = clamp(args.size ?? 20, 1, 100);
      const newTriangle: TriangleShape = {
        id: generateId(),
        type: "triangle",
        x,
        y,
        size,
        color,
        pattern,
      };
      shapes = [...shapes, newTriangle];
      message = `Drew a ${color} triangle at (${x}, ${y}) with size ${size}`;
      instructions =
        "Triangle added. Ask the user what else they want to add.";
      break;
    }

    case "line": {
      const x1 = clamp(args.x1 ?? 20, 0, 100);
      const y1 = clamp(args.y1 ?? 50, 0, 100);
      const x2 = clamp(args.x2 ?? 80, 0, 100);
      const y2 = clamp(args.y2 ?? 50, 0, 100);
      const strokeWidth = clamp(args.strokeWidth ?? 2, 1, 10);
      const newLine: LineShape = {
        id: generateId(),
        type: "line",
        x1,
        y1,
        x2,
        y2,
        strokeWidth,
        color,
        pattern: "solid",
      };
      shapes = [...shapes, newLine];
      message = `Drew a ${color} line from (${x1}, ${y1}) to (${x2}, ${y2})`;
      instructions = "Line added. Ask the user what else they want to add.";
      break;
    }

    case "fill": {
      if (args.color) {
        defaultColor = args.color;
        message = `Default fill color changed to ${args.color}`;
        instructions =
          "Default color updated. Future shapes will use this color unless specified otherwise.";
      } else {
        message = "No color specified for fill action";
        instructions = "Ask the user what color they want to use.";
      }
      break;
    }

    case "pattern": {
      if (args.pattern) {
        defaultPattern = args.pattern;
        message = `Default pattern changed to ${args.pattern}`;
        instructions =
          "Default pattern updated. Future shapes will use this pattern unless specified otherwise.";
      } else {
        message = "No pattern specified";
        instructions =
          "Ask the user what pattern they want (solid, hatched, dotted, striped).";
      }
      break;
    }

    case "move": {
      if (shapes.length === 0) {
        message = "No shapes to move";
        instructions = "There are no shapes on the canvas yet. Help the user draw something first.";
      } else {
        const dx = args.dx ?? 0;
        const dy = args.dy ?? 0;
        const lastShape = shapes[shapes.length - 1];
        let movedShape: Shape;

        if (lastShape.type === "line") {
          movedShape = {
            ...lastShape,
            x1: clamp(lastShape.x1 + dx, 0, 100),
            y1: clamp(lastShape.y1 + dy, 0, 100),
            x2: clamp(lastShape.x2 + dx, 0, 100),
            y2: clamp(lastShape.y2 + dy, 0, 100),
          };
        } else {
          movedShape = {
            ...lastShape,
            x: clamp(lastShape.x + dx, 0, 100),
            y: clamp(lastShape.y + dy, 0, 100),
          } as Shape;
        }

        shapes = [...shapes.slice(0, -1), movedShape];
        message = `Moved last shape by (${dx}, ${dy})`;
        instructions = "Shape moved. Ask the user if they want to continue adjusting.";
      }
      break;
    }

    case "undo": {
      if (shapes.length === 0) {
        message = "No shapes to undo";
        instructions = "The canvas is already empty.";
      } else {
        shapes = shapes.slice(0, -1);
        message = `Removed last shape. ${shapes.length} shapes remaining.`;
        instructions = "Last shape removed. Ask the user what they want to do next.";
      }
      break;
    }

    case "guess": {
      gamePhase = "guessing";
      const shapeDescriptions = shapes.map(describeShape);
      message = `Guessing phase! The drawing has ${shapes.length} shapes.`;
      instructions =
        `Look at the shape descriptions and make your best guess what the user drew. Be creative and fun with your guess! Shape descriptions: ${shapeDescriptions.join("; ")}. After guessing, ask the user if you were correct.`;
      break;
    }

    default: {
      message = `Unknown action: ${action}`;
      instructions = "Ask the user what they want to do.";
    }
  }

  const data: DrawingGameData = {
    shapes,
    defaultColor,
    defaultPattern,
    gamePhase,
  };

  const jsonData: DrawingGameJsonData = {
    shapeCount: shapes.length,
    gamePhase,
    lastAction: action,
    ...(action === "guess" && { shapeDescriptions: shapes.map(describeShape) }),
  };

  return {
    toolName: TOOL_DEFINITION.name,
    message,
    data,
    jsonData,
    instructions,
    updating: action !== "start",
  };
};

// ============================================================================
// Core Plugin
// ============================================================================

export const pluginCore: ToolPluginCore<
  DrawingGameData,
  DrawingGameJsonData,
  DrawingGameArgs
> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeDrawingGame,
  generatingMessage: "Drawing...",
  isEnabled: () => true,
  systemPrompt: SYSTEM_PROMPT,
  samples: SAMPLES,
};
