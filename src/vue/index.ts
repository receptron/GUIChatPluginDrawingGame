/**
 * Drawing Game Plugin - Vue Implementation
 */

import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { DrawingGameData, DrawingGameJsonData, DrawingGameArgs } from "../core/types";
import { pluginCore } from "../core/plugin";
import View from "./View.vue";
import Preview from "./Preview.vue";

// ============================================================================
// Vue Plugin (with components)
// ============================================================================

export const plugin: ToolPlugin<DrawingGameData, DrawingGameJsonData, DrawingGameArgs> = {
  ...pluginCore,
  viewComponent: View,
  previewComponent: Preview,
};

// Types
export type {
  PatternType,
  Shape,
  CircleShape,
  EllipseShape,
  RectangleShape,
  TriangleShape,
  LineShape,
  GamePhase,
  DrawingGameData,
  DrawingGameJsonData,
  ActionType,
  DrawingGameArgs,
} from "../core/types";

// Core plugin utilities
export { pluginCore, executeDrawingGame } from "../core/plugin";
export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT } from "../core/definition";
export { SAMPLES } from "../core/samples";

// Export components for direct use
export { View, Preview };

// Default export for MulmoChat compatibility
export default { plugin };
