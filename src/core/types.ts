/**
 * Drawing Game Plugin Types
 */

// ============================================================================
// Pattern Types
// ============================================================================

export type PatternType = "solid" | "hatched" | "dotted" | "striped";

// ============================================================================
// Shape Types
// ============================================================================

export interface BaseShape {
  id: string;
  type: "circle" | "ellipse" | "rectangle" | "triangle" | "line";
  color: string;
  pattern: PatternType;
}

export interface CircleShape extends BaseShape {
  type: "circle";
  x: number;
  y: number;
  size: number;
}

export interface EllipseShape extends BaseShape {
  type: "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectangleShape extends BaseShape {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TriangleShape extends BaseShape {
  type: "triangle";
  x: number;
  y: number;
  size: number;
}

export interface LineShape extends BaseShape {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
}

export type Shape =
  | CircleShape
  | EllipseShape
  | RectangleShape
  | TriangleShape
  | LineShape;

// ============================================================================
// Game Data Types
// ============================================================================

export type GamePhase = "drawing" | "guessing";

/** Data for View/Preview components */
export interface DrawingGameData {
  shapes: Shape[];
  defaultColor: string;
  defaultPattern: PatternType;
  gamePhase: GamePhase;
}

/** Data returned to LLM */
export interface DrawingGameJsonData {
  shapeCount: number;
  gamePhase: GamePhase;
  lastAction: string;
  shapeDescriptions?: string[];
}

// ============================================================================
// Arguments Types
// ============================================================================

export type ActionType =
  | "start"
  | "circle"
  | "ellipse"
  | "rectangle"
  | "triangle"
  | "line"
  | "fill"
  | "pattern"
  | "move"
  | "undo"
  | "guess";

export interface DrawingGameArgs {
  action: ActionType;

  // Position (0-100 percentage)
  x?: number;
  y?: number;

  // Size for circle, triangle
  size?: number;

  // Size for ellipse, rectangle
  width?: number;
  height?: number;

  // Line specific
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  strokeWidth?: number;

  // Style
  color?: string;
  pattern?: PatternType;

  // Move specific (relative movement)
  dx?: number;
  dy?: number;
}
