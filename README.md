# @gui-chat-plugin/drawing-game

Drawing game plugin for GUI Chat applications. Draw pictures using only primitive shapes through voice/chat instructions, then let AI guess what you drew!

## Features

- Draw with primitive shapes: circle, ellipse, rectangle, triangle, line
- Fill patterns: solid, hatched, dotted, striped
- Edit operations: move, undo
- AI guessing: Let the AI guess what you drew

## Installation

```bash
yarn add @gui-chat-plugin/drawing-game
```

## Usage

### Vue Integration

```typescript
// In src/tools/index.ts
import DrawingGamePlugin from "@gui-chat-plugin/drawing-game/vue";

const pluginList = [
  // ... other plugins
  DrawingGamePlugin,
];

// In src/main.ts
import "@gui-chat-plugin/drawing-game/style.css";
```

### Core-only Usage

```typescript
import { executeDrawingGame, TOOL_DEFINITION } from "@gui-chat-plugin/drawing-game";

// Start a new game
const result = await executeDrawingGame(context, { action: "start" });

// Draw a circle
const result = await executeDrawingGame(context, {
  action: "circle",
  x: 50,
  y: 50,
  size: 30,
  color: "blue",
});
```

## API

### Actions

| Action | Description |
|--------|-------------|
| `start` | Clear canvas and start new game |
| `circle` | Draw a circle (x, y, size, color, pattern) |
| `ellipse` | Draw an ellipse (x, y, width, height, color, pattern) |
| `rectangle` | Draw a rectangle (x, y, width, height, color, pattern) |
| `triangle` | Draw a triangle (x, y, size, color, pattern) |
| `line` | Draw a line (x1, y1, x2, y2, color, strokeWidth) |
| `fill` | Change default fill color |
| `pattern` | Change default pattern (solid/hatched/dotted/striped) |
| `move` | Move last shape (dx, dy) |
| `undo` | Remove last shape |
| `guess` | AI guesses what the drawing is |

### Position Guide

- **x**: 0=left, 50=center, 100=right
- **y**: 0=top, 50=center, 100=bottom
- **size**: 5=tiny, 15=small, 30=medium, 50=large

### Patterns

- `solid` - Normal fill
- `hatched` - Diagonal lines
- `dotted` - Dots pattern
- `striped` - Horizontal stripes

## Test Prompts

Try these prompts to test the plugin:

1. "Let's play the drawing game"
2. "Draw a big blue circle in the center"
3. "Add a small red triangle on top"
4. "Move it a bit to the right"
5. "Guess what I drew!"

## Development

```bash
# Install dependencies
yarn install

# Run Vue demo
yarn dev

# Build
yarn build

# Lint
yarn lint
```

## License

MIT
