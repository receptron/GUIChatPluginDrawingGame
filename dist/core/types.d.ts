/**
 * Drawing Game Plugin Types
 */
export type PatternType = "solid" | "hatched" | "dotted" | "striped";
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
export type Shape = CircleShape | EllipseShape | RectangleShape | TriangleShape | LineShape;
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
export type ActionType = "start" | "circle" | "ellipse" | "rectangle" | "triangle" | "line" | "fill" | "pattern" | "move" | "undo" | "guess";
export interface DrawingGameArgs {
    action: ActionType;
    x?: number;
    y?: number;
    size?: number;
    width?: number;
    height?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    strokeWidth?: number;
    color?: string;
    pattern?: PatternType;
    dx?: number;
    dy?: number;
}
