/**
 * Drawing Game Plugin Core
 */
import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { DrawingGameData, DrawingGameJsonData, DrawingGameArgs } from "./types";
export declare const executeDrawingGame: (context: ToolContext, args: DrawingGameArgs) => Promise<ToolResult<DrawingGameData, DrawingGameJsonData>>;
export declare const pluginCore: ToolPluginCore<DrawingGameData, DrawingGameJsonData, DrawingGameArgs>;
