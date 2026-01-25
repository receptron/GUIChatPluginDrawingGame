# Drawing Game Plugin Plan

## Concept

**「お絵描き伝言ゲーム」プラグイン**

ユーザーが音声/チャットでプリミティブな描画命令だけを使って絵を描き、最後にAIに何を描いたか当ててもらうゲーム。

### ゲームの流れ

1. **ゲーム開始**: ユーザーが「絵を描きたい」と言う
2. **描画フェーズ**: AIがプリミティブ命令のみを受け付け、SVGキャンバスに描画
3. **判定フェーズ**: ユーザーが「当てて」と言うと、AIが絵を推測
4. **確認**: ユーザーが「正解！」or「違う、○○だった」と教える

---

## Actions

| Action | Description | Parameters |
|--------|-------------|------------|
| `start` | 新しいゲーム開始（キャンバスクリア） | - |
| `circle` | 円を描く | x, y, size, color, pattern |
| `ellipse` | 楕円を描く | x, y, width, height, color, pattern |
| `rectangle` | 四角形を描く | x, y, width, height, color, pattern |
| `triangle` | 三角形を描く | x, y, size, color, pattern |
| `line` | 線を描く | x1, y1, x2, y2, color, strokeWidth |
| `fill` | デフォルト塗りつぶし色を変更 | color |
| `pattern` | デフォルトパターンを変更 | pattern (solid/hatched/dotted/striped) |
| `move` | 最後の図形を移動 | dx, dy (相対移動) |
| `undo` | 最後の図形を取り消す | - |
| `guess` | AIが何の絵か当てる | - |

---

## Data Types

### DrawingGameArgs

```typescript
type PatternType = "solid" | "hatched" | "dotted" | "striped";

interface DrawingGameArgs {
  action: "start" | "circle" | "ellipse" | "rectangle" | "triangle" | "line" | "fill" | "pattern" | "move" | "undo" | "guess";

  // Position (0-100 percentage)
  x?: number;
  y?: number;

  // Size
  size?: number;      // for circle, triangle
  width?: number;     // for ellipse, rectangle
  height?: number;    // for ellipse, rectangle

  // Line specific
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  strokeWidth?: number;

  // Style
  color?: string;
  pattern?: PatternType;

  // Move specific
  dx?: number;  // relative x movement
  dy?: number;  // relative y movement
}
```

### Shape

```typescript
interface Shape {
  id: string;
  type: "circle" | "ellipse" | "rectangle" | "triangle" | "line";
  x: number;
  y: number;
  size?: number;
  width?: number;
  height?: number;
  color: string;
  pattern: PatternType;
  strokeWidth?: number;
  // line specific
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}
```

### DrawingGameData

```typescript
interface DrawingGameData {
  shapes: Shape[];
  defaultColor: string;
  defaultPattern: PatternType;
  gamePhase: "drawing" | "guessing";
}
```

### DrawingGameJsonData

```typescript
interface DrawingGameJsonData {
  shapeCount: number;
  gamePhase: "drawing" | "guessing";
  lastAction: string;
  // guess時：AIが分析するための図形情報
  shapeDescriptions?: string[];
}
```

---

## System Prompt

```
You are playing a drawing game. The user describes what to draw using only primitive shapes.

AVAILABLE COMMANDS:
- circle: Draw a circle (x, y, size, color, pattern)
- ellipse: Draw an ellipse (x, y, width, height, color, pattern)
- rectangle: Draw a rectangle (x, y, width, height, color, pattern)
- triangle: Draw a triangle (x, y, size, color, pattern)
- line: Draw a line (x1, y1, x2, y2, color, strokeWidth)
- fill: Change default fill color
- pattern: Change default pattern (solid/hatched/dotted/striped)
- move: Move the last shape (dx, dy as relative movement)
- undo: Remove the last shape
- guess: Make a guess what the drawing is

POSITION GUIDE (0-100):
- x: 0=left, 50=center, 100=right
- y: 0=top, 50=center, 100=bottom
- size: 5=tiny, 15=small, 30=medium, 50=large

PATTERNS:
- solid: Normal fill
- hatched: Diagonal lines (網掛け)
- dotted: Dots pattern
- striped: Horizontal stripes

EXAMPLES:
- "大きな青い丸を中央に" → circle x:50, y:50, size:30, color:blue
- "上に小さな赤い三角" → triangle x:50, y:20, size:15, color:red
- "網掛けの四角" → rectangle with pattern:hatched
- "ちょっと右に移動" → move dx:5, dy:0

Only use primitives! When user says "当てて" or "guess", call guess action.
```

---

## Pattern Implementation (SVG)

```svg
<defs>
  <!-- Hatched pattern (斜線) -->
  <pattern id="hatched" patternUnits="userSpaceOnUse" width="8" height="8">
    <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="currentColor" stroke-width="1"/>
  </pattern>

  <!-- Dotted pattern (点々) -->
  <pattern id="dotted" patternUnits="userSpaceOnUse" width="8" height="8">
    <circle cx="4" cy="4" r="1.5" fill="currentColor"/>
  </pattern>

  <!-- Striped pattern (縞) -->
  <pattern id="striped" patternUnits="userSpaceOnUse" width="8" height="8">
    <line x1="0" y1="4" x2="8" y2="4" stroke="currentColor" stroke-width="2"/>
  </pattern>
</defs>
```

---

## Implementation Steps

### Phase 1: Core Setup
- [ ] Update package.json (name: @gui-chat-plugin/drawing-game)
- [ ] Create types.ts
- [ ] Create definition.ts with tool schema
- [ ] Create plugin.ts skeleton

### Phase 2: Drawing Logic
- [ ] Implement `start` - clear shapes array
- [ ] Implement `circle` - add circle shape
- [ ] Implement `ellipse` - add ellipse shape
- [ ] Implement `rectangle` - add rectangle shape
- [ ] Implement `triangle` - add triangle shape
- [ ] Implement `line` - add line shape
- [ ] Implement `fill` - change default color
- [ ] Implement `pattern` - change default pattern
- [ ] Implement `move` - modify last shape position
- [ ] Implement `undo` - remove last shape

### Phase 3: Guessing
- [ ] Implement `guess` - return shape descriptions for AI
- [ ] Generate human-readable shape descriptions

### Phase 4: Vue Components
- [ ] Create View.vue with SVG canvas
- [ ] Add SVG pattern definitions
- [ ] Render each shape type
- [ ] Create Preview.vue thumbnail

### Phase 5: Polish
- [ ] Add samples.ts
- [ ] Test in demo
- [ ] Publish

---

## UI Design

```
┌─────────────────────────────────────┐
│  🎨 Drawing Game                    │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      ●                      │   │
│  │        ▲                    │   │
│  │     ■■■■■                   │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Shapes: 3  │  Color: blue         │
└─────────────────────────────────────┘
```

---

## Samples

```typescript
export const SAMPLES: ToolSample[] = [
  { name: "Start Game", args: { action: "start" } },
  { name: "Blue Circle", args: { action: "circle", x: 50, y: 50, size: 25, color: "blue" } },
  { name: "Red Triangle", args: { action: "triangle", x: 50, y: 30, size: 15, color: "red" } },
  { name: "Hatched Rectangle", args: { action: "rectangle", x: 50, y: 70, width: 40, height: 20, pattern: "hatched" } },
  { name: "Move Right", args: { action: "move", dx: 10, dy: 0 } },
  { name: "Undo", args: { action: "undo" } },
  { name: "Guess!", args: { action: "guess" } },
];
```
