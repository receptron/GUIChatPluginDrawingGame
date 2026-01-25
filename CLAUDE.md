# CLAUDE.md

## Plugin Overview

Drawing Game plugin for GUI Chat applications. Users draw pictures using only primitive shapes (circle, ellipse, rectangle, triangle, line) through voice/chat instructions, then AI guesses what was drawn.

## Common Guidelines

For standard plugin development guidelines (Tailwind CSS constraints, build process, npm publish steps), see:
https://github.com/receptron/GUIChatPluginTemplate/blob/main/CLAUDE.md

Key rules from common guidelines:
- Do NOT use Tailwind arbitrary values (JIT syntax like `bg-[#1a1a2e]`, `w-[100px]`)
- Use standard Tailwind classes only (e.g., `bg-slate-900`, `w-24`)

## Plugin-Specific Notes

### Game Flow

1. User starts a new game with `start` action
2. User describes shapes to draw (AI interprets into primitive commands)
3. Available shapes: circle, ellipse, rectangle, triangle, line
4. Available patterns: solid, hatched, dotted, striped
5. User can `move` last shape or `undo`
6. When done, user says "guess!" and AI makes a guess

### Data Types

```typescript
type PatternType = "solid" | "hatched" | "dotted" | "striped";

interface DrawingGameArgs {
  action: "start" | "circle" | "ellipse" | "rectangle" | "triangle" | "line" | "fill" | "pattern" | "move" | "undo" | "guess";
  x?: number;           // 0-100 (percentage)
  y?: number;           // 0-100 (percentage)
  size?: number;        // For circle/triangle
  width?: number;       // For ellipse/rectangle
  height?: number;      // For ellipse/rectangle
  x1?, y1?, x2?, y2?;   // For line
  color?: string;       // CSS color
  pattern?: PatternType;
  dx?, dy?: number;     // For move (relative)
}

interface DrawingGameData {
  shapes: Shape[];
  defaultColor: string;
  defaultPattern: PatternType;
  gamePhase: "drawing" | "guessing";
}
```

### Position Guide

- x: 0=left, 50=center, 100=right
- y: 0=top, 50=center, 100=bottom
- size: 5=tiny, 15=small, 30=medium, 50=large

### Key Files

- `src/core/definition.ts`: Tool definition with SYSTEM_PROMPT
- `src/core/plugin.ts`: Execute function with all actions
- `src/core/types.ts`: TypeScript interfaces
- `src/vue/View.vue`: SVG canvas with shape rendering
- `src/vue/Preview.vue`: Thumbnail preview

### SVG Patterns

The View component includes SVG pattern definitions for:
- `pattern-hatched`: Diagonal lines
- `pattern-dotted`: Dots
- `pattern-striped`: Horizontal stripes

## Commands

```bash
yarn install      # Install dependencies
yarn dev          # Start Vue demo server
yarn build        # Build (outputs to dist/)
yarn typecheck    # Type check
yarn lint         # Lint check
```

## Updating This Document

**IMPORTANT**: When making spec changes or improvements to this plugin through discussion with Claude:
1. Update this CLAUDE.md to reflect any new constraints, dependencies, or architectural decisions
2. Keep the "Plugin-Specific Notes" section current with actual implementation
