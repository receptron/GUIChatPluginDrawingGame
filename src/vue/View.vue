<template>
  <div class="size-full overflow-hidden p-4 bg-slate-100 flex flex-col items-center">
    <div v-if="gameData" class="w-full max-w-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-slate-800">Drawing Game</h2>
        <div class="flex items-center gap-4 text-sm text-slate-600">
          <span>Shapes: {{ gameData.shapes.length }}</span>
          <span
            :class="gameData.gamePhase === 'guessing' ? 'text-amber-600 font-semibold' : ''"
          >
            {{ gameData.gamePhase === "guessing" ? "Guessing!" : "Drawing" }}
          </span>
        </div>
      </div>

      <!-- SVG Canvas -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-slate-300">
        <svg
          :viewBox="`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`"
          class="w-full aspect-square"
          style="background: white;"
        >
          <!-- Pattern Definitions -->
          <defs>
            <!-- Hatched pattern -->
            <pattern
              id="pattern-hatched"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="2" />
            </pattern>

            <!-- Dotted pattern -->
            <pattern id="pattern-dotted" patternUnits="userSpaceOnUse" width="10" height="10">
              <circle cx="5" cy="5" r="2" fill="currentColor" />
            </pattern>

            <!-- Striped pattern -->
            <pattern id="pattern-striped" patternUnits="userSpaceOnUse" width="10" height="10">
              <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="3" />
            </pattern>
          </defs>

          <!-- Grid (optional visual guide) -->
          <g class="opacity-10">
            <line
              v-for="i in 9"
              :key="`v-${i}`"
              :x1="i * 50"
              y1="0"
              :x2="i * 50"
              :y2="CANVAS_SIZE"
              stroke="#999"
              stroke-width="1"
            />
            <line
              v-for="i in 9"
              :key="`h-${i}`"
              x1="0"
              :y1="i * 50"
              :x2="CANVAS_SIZE"
              :y2="i * 50"
              stroke="#999"
              stroke-width="1"
            />
          </g>

          <!-- Shapes -->
          <template v-for="shape in gameData.shapes" :key="shape.id">
            <!-- Circle -->
            <circle
              v-if="shape.type === 'circle'"
              :cx="toCanvas(shape.x)"
              :cy="toCanvas(shape.y)"
              :r="toCanvas(shape.size) / 2"
              :fill="getFill(shape)"
              :stroke="shape.color"
              stroke-width="2"
              :style="getPatternStyle(shape)"
            />

            <!-- Ellipse -->
            <ellipse
              v-else-if="shape.type === 'ellipse'"
              :cx="toCanvas(shape.x)"
              :cy="toCanvas(shape.y)"
              :rx="toCanvas(shape.width) / 2"
              :ry="toCanvas(shape.height) / 2"
              :fill="getFill(shape)"
              :stroke="shape.color"
              stroke-width="2"
              :style="getPatternStyle(shape)"
            />

            <!-- Rectangle -->
            <rect
              v-else-if="shape.type === 'rectangle'"
              :x="toCanvas(shape.x) - toCanvas(shape.width) / 2"
              :y="toCanvas(shape.y) - toCanvas(shape.height) / 2"
              :width="toCanvas(shape.width)"
              :height="toCanvas(shape.height)"
              :fill="getFill(shape)"
              :stroke="shape.color"
              stroke-width="2"
              :style="getPatternStyle(shape)"
            />

            <!-- Triangle -->
            <polygon
              v-else-if="shape.type === 'triangle'"
              :points="getTrianglePoints(shape)"
              :fill="getFill(shape)"
              :stroke="shape.color"
              stroke-width="2"
              :style="getPatternStyle(shape)"
            />

            <!-- Line -->
            <line
              v-else-if="shape.type === 'line'"
              :x1="toCanvas(shape.x1)"
              :y1="toCanvas(shape.y1)"
              :x2="toCanvas(shape.x2)"
              :y2="toCanvas(shape.y2)"
              :stroke="shape.color"
              :stroke-width="shape.strokeWidth * 2"
              stroke-linecap="round"
            />
          </template>
        </svg>
      </div>

      <!-- Status Bar -->
      <div class="mt-4 text-center text-sm text-slate-500">
        <span v-if="gameData.shapes.length === 0">
          Say something like "draw a big blue circle in the center"
        </span>
        <span v-else-if="gameData.gamePhase === 'drawing'">
          Keep adding shapes or say "guess!" when done
        </span>
        <span v-else>
          Waiting for the guess...
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { ToolResult } from "gui-chat-protocol";
import type { DrawingGameData, Shape, TriangleShape } from "../core/types";
import { TOOL_NAME } from "../core/definition";

const CANVAS_SIZE = 500;

const props = defineProps<{
  selectedResult: ToolResult;
  sendTextMessage: (text?: string) => void;
}>();

const gameData = ref<DrawingGameData | null>(null);

watch(
  () => props.selectedResult,
  (newResult) => {
    if (newResult?.toolName === TOOL_NAME && newResult.data) {
      gameData.value = newResult.data as DrawingGameData;
    }
  },
  { immediate: true, deep: true },
);

// Convert percentage (0-100) to canvas coordinates
const toCanvas = (percent: number): number => {
  return (percent / 100) * CANVAS_SIZE;
};

// Get fill style based on pattern
const getFill = (shape: Shape): string => {
  if (shape.type === "line") return "none";
  if (shape.pattern === "solid") return shape.color;
  return `url(#pattern-${shape.pattern})`;
};

// Get style for pattern color
const getPatternStyle = (shape: Shape): string => {
  if (shape.pattern === "solid") return "";
  return `color: ${shape.color}`;
};

// Calculate triangle points (equilateral, pointing up)
const getTrianglePoints = (shape: TriangleShape): string => {
  const cx = toCanvas(shape.x);
  const cy = toCanvas(shape.y);
  const r = toCanvas(shape.size) / 2;

  // Equilateral triangle vertices
  const topY = cy - r;
  const bottomY = cy + r * 0.5;
  const leftX = cx - r * 0.866;
  const rightX = cx + r * 0.866;

  return `${cx},${topY} ${leftX},${bottomY} ${rightX},${bottomY}`;
};
</script>
