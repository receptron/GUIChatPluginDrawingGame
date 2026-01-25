/**
 * Drawing Game Plugin - Vue Implementation
 */
import "../style.css";
import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { DrawingGameData, DrawingGameJsonData, DrawingGameArgs } from "../core/types";
import View from "./View.vue";
import Preview from "./Preview.vue";
export declare const plugin: ToolPlugin<DrawingGameData, DrawingGameJsonData, DrawingGameArgs>;
export type { PatternType, Shape, CircleShape, EllipseShape, RectangleShape, TriangleShape, LineShape, GamePhase, DrawingGameData, DrawingGameJsonData, ActionType, DrawingGameArgs, } from "../core/types";
export { pluginCore, executeDrawingGame } from "../core/plugin";
export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT } from "../core/definition";
export { SAMPLES } from "../core/samples";
export { View, Preview };
declare const _default: {
    plugin: ToolPlugin<DrawingGameData, DrawingGameJsonData, DrawingGameArgs, import("gui-chat-protocol/vue").InputHandler, Record<string, unknown>>;
};
export default _default;
