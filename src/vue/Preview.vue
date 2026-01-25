<template>
  <div class="p-3 bg-amber-50 rounded-md">
    <div v-if="gameData" class="flex flex-col gap-2">
      <!-- Title -->
      <div class="text-sm font-semibold text-slate-800 text-center">
        Drawing Game
      </div>

      <!-- Mini Canvas Preview -->
      <div class="bg-white rounded border border-slate-200 overflow-hidden">
        <svg viewBox="0 0 100 100" class="w-full aspect-square">
          <template v-for="shape in gameData.shapes" :key="shape.id">
            <circle
              v-if="shape.type === 'circle'"
              :cx="shape.x"
              :cy="shape.y"
              :r="shape.size / 2"
              :fill="shape.color"
              :stroke="shape.color"
              stroke-width="0.5"
            />
            <ellipse
              v-else-if="shape.type === 'ellipse'"
              :cx="shape.x"
              :cy="shape.y"
              :rx="shape.width / 2"
              :ry="shape.height / 2"
              :fill="shape.color"
            />
            <rect
              v-else-if="shape.type === 'rectangle'"
              :x="shape.x - shape.width / 2"
              :y="shape.y - shape.height / 2"
              :width="shape.width"
              :height="shape.height"
              :fill="shape.color"
            />
            <polygon
              v-else-if="shape.type === 'triangle'"
              :points="getMiniTrianglePoints(shape)"
              :fill="shape.color"
            />
            <line
              v-else-if="shape.type === 'line'"
              :x1="shape.x1"
              :y1="shape.y1"
              :x2="shape.x2"
              :y2="shape.y2"
              :stroke="shape.color"
              stroke-width="1"
            />
          </template>
        </svg>
      </div>

      <!-- Shape Count -->
      <div class="text-center">
        <span class="inline-block bg-amber-500 text-white text-xs font-bold py-1 px-3 rounded-full">
          {{ gameData.shapes.length }} shapes
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ToolResult } from "gui-chat-protocol";
import type { DrawingGameData, TriangleShape } from "../core/types";

const props = defineProps<{
  result: ToolResult;
}>();

const gameData = computed(() => props.result.data as DrawingGameData | null);

const getMiniTrianglePoints = (shape: TriangleShape): string => {
  const cx = shape.x;
  const cy = shape.y;
  const r = shape.size / 2;
  const topY = cy - r;
  const bottomY = cy + r * 0.5;
  const leftX = cx - r * 0.866;
  const rightX = cx + r * 0.866;
  return `${cx},${topY} ${leftX},${bottomY} ${rightX},${bottomY}`;
};
</script>
