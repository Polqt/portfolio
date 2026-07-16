# Desktop-Metaphor Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio site as a full OS-desktop metaphor — every page (home, about, projects, notes/notes detail) is a draggable/resizable "window" on one persistent desktop, with a boot sequence, a taskbar (evolved from the existing `Dock`), real URL deep-linking, and a neutral OS-gray visual skin.

**Architecture:** A pure, unit-tested window-manager reducer (`lib/window-manager`) holds all open-window state (position/size/z-index/minimized). It lives in a React context provided once in `app/layout.tsx`, so it survives client-side navigation. A `RouteSync` component watches the current pathname and opens/focuses the window that corresponds to it; existing route `page.tsx` files become thin SSR wrappers around extracted content components, and those same content components are reused as window bodies — no duplicated markup, no duplicated data fetching. `react-rnd` provides drag/resize on desktop viewports; a CSS/JS breakpoint check falls back to a static stacked layout on mobile (no drag). Window layout is never persisted — every load recomputes the default layout for the current path.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind, `react-rnd` (new dependency), Vitest (new, for pure-logic unit tests only — no component/DOM test infra added, per YAGNI).

## Global Constraints

- No position/layout persistence across reloads (confirmed decision) — every mount recomputes default windows from current pathname.
- Real URLs must keep working standalone for `/notes/:id` and `/projects` (SEO/shareable links) — route `page.tsx` files keep rendering real content server-side, never reduced to empty client shells.
- Closing the window that corresponds to the current route navigates back to `/`. Closing a non-route-bound extra instance (e.g. a second Notes window opened from within the desktop) does not change the URL.
- Multi-instance allowed only for `noteDetail` windows (kind is not a singleton); all other kinds are singleton — opening one when it already exists focuses the existing instance instead of creating a new one.
- Drag/resize only above the `md` breakpoint (768px, matches existing Tailwind `sm`/`lg` usage in the codebase); below it, windows render as a static stacked list, no `react-rnd`.
- Boot sequence is skippable and must not replay on the same browser after first completion (localStorage flag).
- Chrome/taskbar/window-title text uses `font-mono` (`GeistMono`, already loaded in `app/layout.tsx`); body/prose content inside window bodies keeps `font-sans` (`GeistSans`).
- No `Dock` component after this plan — it is fully replaced by `Taskbar`. Delete `components/Dock.tsx` once nothing imports it.
- Codebase cleanup is folded into each task, not a separate pass: when a task touches a file, leave it better than found (remove now-dead imports, don't carry forward unused code) — but don't refactor files this plan doesn't touch.

---

## File Structure

```
lib/window-manager/
  types.ts          — WindowKind, WindowInstance, WindowManagerState, actions
  reducer.ts         — pure windowManagerReducer(state, action)
  reducer.test.ts    — vitest unit tests for the reducer
  registry.ts         — WINDOW_REGISTRY config + getDefaultWindows(pathname, params)
  registry.test.ts    — vitest unit tests for registry helpers
  context.tsx         — WindowManagerProvider + useWindowManager() hook (consumes reducer)

components/desktop/
  Window.tsx           — react-rnd chrome (title bar, traffic lights, close/focus) + mobile static fallback
  Desktop.tsx           — renders Taskbar + all open Window instances from context
  Taskbar.tsx           — replaces Dock: running-window buttons + app launcher + theme toggle
  BootScreen.tsx        — boot animation, localStorage skip flag
  RouteSync.tsx         — watches usePathname(), opens/focuses the matching window
  useIsDesktopViewport.ts — matchMedia hook, true when >= 768px

components/home/HomeHeroContent.tsx   — extracted from app/page.tsx (hero block only)
components/about/AboutContent.tsx      — extracted from app/about/page.tsx (everything but Dock)
components/notes/NotesListContent.tsx  — extracted from app/notes/page.tsx (everything but Dock)
components/notes/NoteDetailContent.tsx — extracted from app/notes/[id]/page.tsx (everything but Dock)

app/layout.tsx        — modified: wraps children in WindowManagerProvider + BootScreen + Desktop + RouteSync
app/page.tsx           — modified: thin wrapper rendering <HomeHeroContent />
app/about/page.tsx      — modified: thin wrapper rendering <AboutContent />
app/notes/page.tsx      — modified: thin wrapper rendering <NotesListContent />
app/notes/[id]/page.tsx — modified: thin wrapper rendering <NoteDetailContent noteId={params.id} />
app/projects/page.tsx   — unchanged (already a thin wrapper around ProjectsContent)
components/projects/ProjectsContent.tsx — modified: remove its own <Dock /> render (Desktop now owns chrome)
components/Dock.tsx     — deleted at the end, once nothing imports it

app/globals.css        — modified: new neutral OS-gray CSS variables + window-chrome utility classes
package.json            — modified: add react-rnd, vitest devDependency + "test" script
vitest.config.ts        — new: node environment, no jsdom/react plugin (pure-logic tests only)
```

---

### Task 1: Window-manager types + pure reducer

**Files:**
- Create: `lib/window-manager/types.ts`
- Create: `lib/window-manager/reducer.ts`
- Test: `lib/window-manager/reducer.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `WindowKind`, `WindowPosition`, `WindowSize`, `WindowInstance`, `WindowManagerState`, `WindowManagerAction`, `windowManagerReducer(state, action)`, `createInitialState(descriptors)` — used by every later task.

- [ ] **Step 1: Install dependencies**

```bash
npm install react-rnd
npm install -D vitest
```

- [ ] **Step 2: Add vitest config**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
});
```

- [ ] **Step 3: Add test script**

Modify `package.json` scripts block to add:

```json
"test": "vitest run"
```

- [ ] **Step 4: Write types**

```typescript
// lib/window-manager/types.ts
export type WindowKind =
  | 'hero'
  | 'github'
  | 'techstack'
  | 'spotify'
  | 'haiku'
  | 'location'
  | 'about'
  | 'projects'
  | 'notesList'
  | 'noteDetail';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowInstance {
  id: string;
  kind: WindowKind;
  title: string;
  props: Record<string, unknown>;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  minimized: boolean;
  routeBound: boolean;
}

export interface WindowDescriptor {
  id: string;
  kind: WindowKind;
  title: string;
  props: Record<string, unknown>;
  position: WindowPosition;
  size: WindowSize;
  routeBound: boolean;
}

export interface WindowManagerState {
  windows: WindowInstance[];
  nextZIndex: number;
}

export type WindowManagerAction =
  | { type: 'OPEN'; descriptor: WindowDescriptor; focus?: boolean }
  | { type: 'CLOSE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MOVE'; id: string; position: WindowPosition }
  | { type: 'RESIZE'; id: string; size: WindowSize }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'RESTORE'; id: string };
```

- [ ] **Step 5: Write the failing reducer tests**

```typescript
// lib/window-manager/reducer.test.ts
import { describe, it, expect } from 'vitest';
import { windowManagerReducer, createInitialState } from './reducer';
import type { WindowDescriptor, WindowManagerState } from './types';

function descriptor(overrides: Partial<WindowDescriptor> = {}): WindowDescriptor {
  return {
    id: 'hero',
    kind: 'hero',
    title: 'Hero',
    props: {},
    position: { x: 0, y: 0 },
    size: { width: 400, height: 300 },
    routeBound: false,
    ...overrides,
  };
}

describe('createInitialState', () => {
  it('assigns increasing z-index in descriptor order', () => {
    const state = createInitialState([
      descriptor({ id: 'a' }),
      descriptor({ id: 'b' }),
    ]);
    expect(state.windows.map(w => w.id)).toEqual(['a', 'b']);
    expect(state.windows[1].zIndex).toBeGreaterThan(state.windows[0].zIndex);
  });
});

describe('windowManagerReducer OPEN', () => {
  it('adds a new window on top', () => {
    const state = createInitialState([descriptor({ id: 'a' })]);
    const next = windowManagerReducer(state, {
      type: 'OPEN',
      descriptor: descriptor({ id: 'b' }),
    });
    expect(next.windows).toHaveLength(2);
    expect(next.windows[1].zIndex).toBeGreaterThan(next.windows[0].zIndex);
  });

  it('focuses (does not duplicate) an existing window with the same id', () => {
    const state = createInitialState([
      descriptor({ id: 'a' }),
      descriptor({ id: 'b' }),
    ]);
    const next = windowManagerReducer(state, {
      type: 'OPEN',
      descriptor: descriptor({ id: 'a' }),
      focus: true,
    });
    expect(next.windows).toHaveLength(2);
    const a = next.windows.find(w => w.id === 'a')!;
    const b = next.windows.find(w => w.id === 'b')!;
    expect(a.zIndex).toBeGreaterThan(b.zIndex);
  });
});

describe('windowManagerReducer CLOSE', () => {
  it('removes the window by id', () => {
    const state = createInitialState([
      descriptor({ id: 'a' }),
      descriptor({ id: 'b' }),
    ]);
    const next = windowManagerReducer(state, { type: 'CLOSE', id: 'a' });
    expect(next.windows.map(w => w.id)).toEqual(['b']);
  });
});

describe('windowManagerReducer FOCUS', () => {
  it('raises the window above all others', () => {
    const state = createInitialState([
      descriptor({ id: 'a' }),
      descriptor({ id: 'b' }),
      descriptor({ id: 'c' }),
    ]);
    const next = windowManagerReducer(state, { type: 'FOCUS', id: 'a' });
    const a = next.windows.find(w => w.id === 'a')!;
    const maxOthers = Math.max(
      ...next.windows.filter(w => w.id !== 'a').map(w => w.zIndex),
    );
    expect(a.zIndex).toBeGreaterThan(maxOthers);
  });
});

describe('windowManagerReducer MOVE / RESIZE', () => {
  it('updates position and size for the target window only', () => {
    const state = createInitialState([
      descriptor({ id: 'a' }),
      descriptor({ id: 'b' }),
    ]);
    const moved = windowManagerReducer(state, {
      type: 'MOVE',
      id: 'a',
      position: { x: 50, y: 60 },
    });
    expect(moved.windows.find(w => w.id === 'a')!.position).toEqual({
      x: 50,
      y: 60,
    });
    expect(moved.windows.find(w => w.id === 'b')!.position).toEqual({
      x: 0,
      y: 0,
    });

    const resized = windowManagerReducer(moved, {
      type: 'RESIZE',
      id: 'a',
      size: { width: 500, height: 400 },
    });
    expect(resized.windows.find(w => w.id === 'a')!.size).toEqual({
      width: 500,
      height: 400,
    });
  });
});

describe('windowManagerReducer MINIMIZE / RESTORE', () => {
  it('toggles the minimized flag', () => {
    const state = createInitialState([descriptor({ id: 'a' })]);
    const minimized = windowManagerReducer(state, {
      type: 'MINIMIZE',
      id: 'a',
    });
    expect(minimized.windows[0].minimized).toBe(true);

    const restored = windowManagerReducer(minimized, {
      type: 'RESTORE',
      id: 'a',
    });
    expect(restored.windows[0].minimized).toBe(false);
  });
});
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `npx vitest run lib/window-manager/reducer.test.ts`
Expected: FAIL with "Cannot find module './reducer'"

- [ ] **Step 7: Implement the reducer**

```typescript
// lib/window-manager/reducer.ts
import type {
  WindowDescriptor,
  WindowManagerAction,
  WindowManagerState,
} from './types';

const STARTING_Z = 10;

export function createInitialState(
  descriptors: WindowDescriptor[],
): WindowManagerState {
  let nextZIndex = STARTING_Z;
  const windows = descriptors.map(d => ({
    ...d,
    zIndex: nextZIndex++,
    minimized: false,
  }));
  return { windows, nextZIndex };
}

export function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction,
): WindowManagerState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find(w => w.id === action.descriptor.id);
      if (existing) {
        return action.focus
          ? focus(state, action.descriptor.id)
          : state;
      }
      return {
        windows: [
          ...state.windows,
          {
            ...action.descriptor,
            zIndex: state.nextZIndex,
            minimized: false,
          },
        ],
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'CLOSE':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.id),
      };
    case 'FOCUS':
      return focus(state, action.id);
    case 'MOVE':
      return updateWindow(state, action.id, w => ({
        ...w,
        position: action.position,
      }));
    case 'RESIZE':
      return updateWindow(state, action.id, w => ({
        ...w,
        size: action.size,
      }));
    case 'MINIMIZE':
      return updateWindow(state, action.id, w => ({
        ...w,
        minimized: true,
      }));
    case 'RESTORE':
      return updateWindow(state, action.id, w => ({
        ...w,
        minimized: false,
      }));
    default:
      return state;
  }
}

function focus(state: WindowManagerState, id: string): WindowManagerState {
  if (!state.windows.some(w => w.id === id)) return state;
  return {
    windows: state.windows.map(w =>
      w.id === id ? { ...w, zIndex: state.nextZIndex } : w,
    ),
    nextZIndex: state.nextZIndex + 1,
  };
}

function updateWindow(
  state: WindowManagerState,
  id: string,
  update: (w: WindowManagerState['windows'][number]) => WindowManagerState['windows'][number],
): WindowManagerState {
  return {
    ...state,
    windows: state.windows.map(w => (w.id === id ? update(w) : w)),
  };
}
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npx vitest run lib/window-manager/reducer.test.ts`
Expected: PASS (all 7 tests)

- [ ] **Step 9: Commit**

```bash
git add lib/window-manager/types.ts lib/window-manager/reducer.ts lib/window-manager/reducer.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: add pure window-manager reducer"
```

---

### Task 2: Window registry + default-windows-per-path

**Files:**
- Create: `lib/window-manager/registry.ts`
- Test: `lib/window-manager/registry.test.ts`

**Interfaces:**
- Consumes: `WindowKind`, `WindowDescriptor` from Task 1 (`lib/window-manager/types.ts`).
- Produces: `WINDOW_REGISTRY`, `getDefaultDescriptors(pathname: string): WindowDescriptor[]`, `getRouteDescriptor(pathname: string): WindowDescriptor | null` — used by `context.tsx` (Task 3) and `RouteSync.tsx` (Task 8).

- [ ] **Step 1: Write the failing tests**

```typescript
// lib/window-manager/registry.test.ts
import { describe, it, expect } from 'vitest';
import { getDefaultDescriptors, getRouteDescriptor } from './registry';

describe('getRouteDescriptor', () => {
  it('returns null for the home path', () => {
    expect(getRouteDescriptor('/')).toBeNull();
  });

  it('returns an about descriptor for /about', () => {
    const d = getRouteDescriptor('/about');
    expect(d?.kind).toBe('about');
    expect(d?.routeBound).toBe(true);
  });

  it('returns a projects descriptor for /projects', () => {
    expect(getRouteDescriptor('/projects')?.kind).toBe('projects');
  });

  it('returns a notesList descriptor for /notes', () => {
    expect(getRouteDescriptor('/notes')?.kind).toBe('notesList');
  });

  it('returns a noteDetail descriptor with the id in props for /notes/:id', () => {
    const d = getRouteDescriptor('/notes/my-first-post');
    expect(d?.kind).toBe('noteDetail');
    expect(d?.id).toBe('noteDetail:my-first-post');
    expect(d?.props.noteId).toBe('my-first-post');
  });
});

describe('getDefaultDescriptors', () => {
  it('always includes the home trio', () => {
    const descriptors = getDefaultDescriptors('/');
    const kinds = descriptors.map(d => d.kind).sort();
    expect(kinds).toEqual(['github', 'hero', 'techstack']);
  });

  it('appends the route descriptor for non-home paths', () => {
    const descriptors = getDefaultDescriptors('/about');
    const kinds = descriptors.map(d => d.kind);
    expect(kinds).toContain('hero');
    expect(kinds).toContain('about');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/window-manager/registry.test.ts`
Expected: FAIL with "Cannot find module './registry'"

- [ ] **Step 3: Implement the registry**

```typescript
// lib/window-manager/registry.ts
import type { WindowDescriptor, WindowKind, WindowPosition, WindowSize } from './types';

interface RegistryEntry {
  title: string;
  defaultSize: WindowSize;
  defaultPosition: WindowPosition;
}

export const WINDOW_REGISTRY: Record<WindowKind, RegistryEntry> = {
  hero: {
    title: 'about-me',
    defaultSize: { width: 480, height: 300 },
    defaultPosition: { x: 40, y: 40 },
  },
  github: {
    title: 'github-activity',
    defaultSize: { width: 380, height: 340 },
    defaultPosition: { x: 540, y: 40 },
  },
  techstack: {
    title: 'tech-stack',
    defaultSize: { width: 480, height: 260 },
    defaultPosition: { x: 40, y: 360 },
  },
  spotify: {
    title: 'now-playing',
    defaultSize: { width: 360, height: 220 },
    defaultPosition: { x: 940, y: 40 },
  },
  haiku: {
    title: 'daily-haiku',
    defaultSize: { width: 340, height: 220 },
    defaultPosition: { x: 940, y: 280 },
  },
  location: {
    title: 'location',
    defaultSize: { width: 360, height: 260 },
    defaultPosition: { x: 540, y: 400 },
  },
  about: {
    title: 'about.exe',
    defaultSize: { width: 640, height: 560 },
    defaultPosition: { x: 120, y: 60 },
  },
  projects: {
    title: 'projects.exe',
    defaultSize: { width: 720, height: 560 },
    defaultPosition: { x: 160, y: 60 },
  },
  notesList: {
    title: 'notes.exe',
    defaultSize: { width: 640, height: 560 },
    defaultPosition: { x: 140, y: 60 },
  },
  noteDetail: {
    title: 'note.txt',
    defaultSize: { width: 620, height: 560 },
    defaultPosition: { x: 200, y: 80 },
  },
};

function buildDescriptor(
  id: string,
  kind: WindowKind,
  routeBound: boolean,
  props: Record<string, unknown> = {},
): WindowDescriptor {
  const entry = WINDOW_REGISTRY[kind];
  return {
    id,
    kind,
    title: entry.title,
    props,
    position: entry.defaultPosition,
    size: entry.defaultSize,
    routeBound,
  };
}

const NOTE_DETAIL_PATTERN = /^\/notes\/([^/]+)$/;

export function getRouteDescriptor(pathname: string): WindowDescriptor | null {
  if (pathname === '/') return null;
  if (pathname === '/about') return buildDescriptor('about', 'about', true);
  if (pathname === '/projects')
    return buildDescriptor('projects', 'projects', true);
  if (pathname === '/notes')
    return buildDescriptor('notesList', 'notesList', true);

  const noteMatch = pathname.match(NOTE_DETAIL_PATTERN);
  if (noteMatch) {
    const noteId = noteMatch[1];
    return buildDescriptor(`noteDetail:${noteId}`, 'noteDetail', true, {
      noteId,
    });
  }

  return null;
}

export function getDefaultDescriptors(pathname: string): WindowDescriptor[] {
  const base = [
    buildDescriptor('hero', 'hero', false),
    buildDescriptor('github', 'github', false),
    buildDescriptor('techstack', 'techstack', false),
  ];
  const route = getRouteDescriptor(pathname);
  return route ? [...base, route] : base;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/window-manager/registry.test.ts`
Expected: PASS (all 7 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/window-manager/registry.ts lib/window-manager/registry.test.ts
git commit -m "feat: add window registry and default-windows-per-path resolver"
```

---

### Task 3: WindowManagerProvider context + hook

**Files:**
- Create: `lib/window-manager/context.tsx`

**Interfaces:**
- Consumes: `windowManagerReducer`, `createInitialState` (Task 1), `getDefaultDescriptors` (Task 2).
- Produces: `WindowManagerProvider`, `useWindowManager()` returning `{ windows, openWindow(descriptor, focus?), closeWindow(id), focusWindow(id), moveWindow(id, position), resizeWindow(id, size), minimizeWindow(id), restoreWindow(id) }` — used by `Desktop.tsx`, `Window.tsx`, `Taskbar.tsx`, `RouteSync.tsx` (Tasks 4-8).

- [ ] **Step 1: Implement the provider (no separate test — thin wiring over the already-tested reducer)**

```tsx
// lib/window-manager/context.tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import { windowManagerReducer, createInitialState } from './reducer';
import { getDefaultDescriptors } from './registry';
import type { WindowDescriptor, WindowInstance, WindowPosition, WindowSize } from './types';

interface WindowManagerValue {
  windows: WindowInstance[];
  openWindow: (descriptor: WindowDescriptor, focus?: boolean) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: WindowPosition) => void;
  resizeWindow: (id: string, size: WindowSize) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

export function WindowManagerProvider({
  initialPathname,
  children,
}: {
  initialPathname: string;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    windowManagerReducer,
    initialPathname,
    path => createInitialState(getDefaultDescriptors(path)),
  );

  const openWindow = useCallback(
    (descriptor: WindowDescriptor, focus = true) =>
      dispatch({ type: 'OPEN', descriptor, focus }),
    [],
  );
  const closeWindow = useCallback(
    (id: string) => dispatch({ type: 'CLOSE', id }),
    [],
  );
  const focusWindow = useCallback(
    (id: string) => dispatch({ type: 'FOCUS', id }),
    [],
  );
  const moveWindow = useCallback(
    (id: string, position: WindowPosition) =>
      dispatch({ type: 'MOVE', id, position }),
    [],
  );
  const resizeWindow = useCallback(
    (id: string, size: WindowSize) => dispatch({ type: 'RESIZE', id, size }),
    [],
  );
  const minimizeWindow = useCallback(
    (id: string) => dispatch({ type: 'MINIMIZE', id }),
    [],
  );
  const restoreWindow = useCallback(
    (id: string) => dispatch({ type: 'RESTORE', id }),
    [],
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows: state.windows,
        openWindow,
        closeWindow,
        focusWindow,
        moveWindow,
        resizeWindow,
        minimizeWindow,
        restoreWindow,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return ctx;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors referencing `lib/window-manager/context.tsx`

- [ ] **Step 3: Commit**

```bash
git add lib/window-manager/context.tsx
git commit -m "feat: add WindowManagerProvider context and useWindowManager hook"
```

---

### Task 4: useIsDesktopViewport breakpoint hook

**Files:**
- Create: `components/desktop/useIsDesktopViewport.ts`

**Interfaces:**
- Produces: `useIsDesktopViewport(): boolean` (true when viewport >= 768px) — used by `Window.tsx` and `Desktop.tsx` (Tasks 5-6).

- [ ] **Step 1: Implement the hook**

```typescript
// components/desktop/useIsDesktopViewport.ts
'use client';

import { useEffect, useState } from 'react';

const BREAKPOINT_QUERY = '(min-width: 768px)';

export function useIsDesktopViewport(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(BREAKPOINT_QUERY);
    setIsDesktop(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return isDesktop;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/desktop/useIsDesktopViewport.ts
git commit -m "feat: add desktop-viewport breakpoint hook"
```

---

### Task 5: Window chrome component (drag/resize + mobile fallback)

**Files:**
- Create: `components/desktop/Window.tsx`
- Modify: `package.json` (react-rnd already added in Task 1)

**Interfaces:**
- Consumes: `WindowInstance` (Task 1), `useWindowManager()` (Task 3), `useIsDesktopViewport()` (Task 4).
- Produces: `<Window instance={WindowInstance}>{children}</Window>` — used by `Desktop.tsx` (Task 6).

- [ ] **Step 1: Implement the component**

```tsx
// components/desktop/Window.tsx
'use client';

import { Rnd } from 'react-rnd';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useWindowManager } from '@/lib/window-manager/context';
import { useIsDesktopViewport } from './useIsDesktopViewport';
import type { WindowInstance } from '@/lib/window-manager/types';

export default function Window({
  instance,
  children,
}: {
  instance: WindowInstance;
  children: ReactNode;
}) {
  const { closeWindow, focusWindow, moveWindow, resizeWindow } =
    useWindowManager();
  const isDesktop = useIsDesktopViewport();

  const handleClose = () => {
    closeWindow(instance.id);
    if (instance.routeBound) {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const chrome = (
    <div
      className="flex items-center gap-2 rounded-t-lg border-b border-border bg-secondary px-3 py-2 cursor-move font-mono text-xs text-secondary-foreground"
      onMouseDown={() => focusWindow(instance.id)}
    >
      <button
        onClick={handleClose}
        aria-label={`Close ${instance.title}`}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-destructive/80 hover:bg-destructive"
      >
        <X className="h-2 w-2 opacity-0 hover:opacity-100" />
      </button>
      <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
      <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
      <span className="ml-2 truncate">{instance.title}</span>
    </div>
  );

  if (!isDesktop) {
    return (
      <section className="rounded-lg border border-border bg-card overflow-hidden">
        {chrome}
        <div className="max-h-[70vh] overflow-auto p-4">{children}</div>
      </section>
    );
  }

  return (
    <Rnd
      size={{ width: instance.size.width, height: instance.size.height }}
      position={{ x: instance.position.x, y: instance.position.y }}
      minWidth={280}
      minHeight={160}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: instance.zIndex }}
      onDragStop={(_e, d) => moveWindow(instance.id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        resizeWindow(instance.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        moveWindow(instance.id, position);
      }}
      onMouseDown={() => focusWindow(instance.id)}
      className="rounded-lg border border-border bg-card shadow-lg overflow-hidden flex flex-col"
    >
      <div className="window-drag-handle">{chrome}</div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </Rnd>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors referencing `components/desktop/Window.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/desktop/Window.tsx
git commit -m "feat: add Window chrome component with react-rnd drag/resize and mobile fallback"
```

---

### Task 6: Desktop shell (renders open windows from context)

**Files:**
- Create: `components/desktop/Desktop.tsx`

**Interfaces:**
- Consumes: `useWindowManager()` (Task 3), `Window` (Task 5), `WINDOW_REGISTRY` kinds (Task 2).
- Produces: `<Desktop />` (renders all open windows, resolving each `kind` to its body component) — used in `app/layout.tsx` (Task 9).

- [ ] **Step 1: Implement the component**

```tsx
// components/desktop/Desktop.tsx
'use client';

import Window from './Window';
import { useWindowManager } from '@/lib/window-manager/context';
import HaikuWidget from '@/components/widgets/HaikuWidget';
import LocationWidget from '@/components/widgets/LocationWidget';
import TechStackWidget from '@/components/widgets/TechStackWidget';
import GitHubWidget from '@/components/widgets/GitHubWidget';
import SpotifyWidget from '@/components/widgets/SpotifyWidget';
import HomeHeroContent from '@/components/home/HomeHeroContent';
import AboutContent from '@/components/about/AboutContent';
import ProjectsContent from '@/components/projects/ProjectsContent';
import NotesListContent from '@/components/notes/NotesListContent';
import NoteDetailContent from '@/components/notes/NoteDetailContent';
import type { WindowInstance } from '@/lib/window-manager/types';

function renderBody(instance: WindowInstance) {
  switch (instance.kind) {
    case 'hero':
      return <HomeHeroContent />;
    case 'github':
      return <GitHubWidget />;
    case 'techstack':
      return <TechStackWidget />;
    case 'spotify':
      return <SpotifyWidget />;
    case 'haiku':
      return <HaikuWidget />;
    case 'location':
      return <LocationWidget />;
    case 'about':
      return <AboutContent />;
    case 'projects':
      return <ProjectsContent />;
    case 'notesList':
      return <NotesListContent />;
    case 'noteDetail':
      return <NoteDetailContent noteId={instance.props.noteId as string} />;
  }
}

export default function Desktop() {
  const { windows } = useWindowManager();

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-20">
      {windows
        .filter(w => !w.minimized)
        .map(instance => (
          <Window key={instance.id} instance={instance}>
            {renderBody(instance)}
          </Window>
        ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit** (deferred — this imports files created in later tasks; commit together at the end of Task 9 once everything compiles)

Note for implementer: Task 6 will not typecheck cleanly until Tasks 7-9 create `HomeHeroContent`, `AboutContent`, `NotesListContent`, `NoteDetailContent`. Do not run `tsc --noEmit` as a gate here — proceed to Task 7 and come back to verify once those exist.

---

### Task 7: Extract content components from existing pages

**Files:**
- Create: `components/home/HomeHeroContent.tsx`
- Create: `components/about/AboutContent.tsx`
- Create: `components/notes/NotesListContent.tsx`
- Create: `components/notes/NoteDetailContent.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/notes/page.tsx`
- Modify: `app/notes/[id]/page.tsx`
- Modify: `components/projects/ProjectsContent.tsx`

**Interfaces:**
- Produces: `<HomeHeroContent />`, `<AboutContent />`, `<NotesListContent />`, `<NoteDetailContent noteId={string} />` — consumed by `Desktop.tsx` (Task 6) and by the thin page wrappers below.

- [ ] **Step 1: Extract `HomeHeroContent`**

Move the entire hero `<div className="sm:col-span-2 bento-item ...">...</div>` block (lines 34-93 of the current `app/page.tsx`) into a new file, dropping the outer grid wrapper:

```tsx
// components/home/HomeHeroContent.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { SITE } from '@/data/site';

export default function HomeHeroContent() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-sm opacity-60" />
          <Image
            src="/Hidalgo.png"
            alt={SITE.name}
            width={80}
            height={80}
            className="relative rounded-2xl w-16 h-16 sm:w-20 sm:h-20 object-cover"
            priority
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {SITE.name}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{SITE.role}</p>
          <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-md">
            Filipino developer building things that matter. Exploring AI,
            real-time systems, and the craft of modern software — one commit
            at a time.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30">
        <Link
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <IconBrandGithub className="h-3.5 w-3.5" />
          GitHub
        </Link>
        <Link
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <IconBrandLinkedin className="h-3.5 w-3.5" />
          LinkedIn
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors ml-auto"
        >
          About me
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `app/page.tsx` with a thin wrapper**

```tsx
// app/page.tsx
import HomeHeroContent from '@/components/home/HomeHeroContent';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <HomeHeroContent />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Extract `AboutContent`**

Move everything inside the outer `<div className="min-h-screen flex flex-col">` of `app/about/page.tsx` *except* the trailing `<Dock />`, including all hooks, into:

```tsx
// components/about/AboutContent.tsx
'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import ExperienceSection from '@/components/ExperienceSection';
import Skills from '@/components/Skills';

const DarkMap = dynamic(() => import('@/components/widgets/DarkMap'), {
  ssr: false,
});

export default function AboutContent() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lon: number;
    timezone: string;
    tzAbbr: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.latitude) {
          const tz = data.timezone || SITE.timezone;
          const tzAbbr =
            new Intl.DateTimeFormat('en', {
              timeZone: tz,
              timeZoneName: 'short',
            })
              .formatToParts(new Date())
              .find(p => p.type === 'timeZoneName')?.value ?? 'PHT';
          setLiveLocation({
            lat: data.latitude,
            lon: data.longitude,
            timezone: tz,
            tzAbbr,
          });
        }
      })
      .catch(() => {});

    const updateTime = (tz: string = SITE.timezone) => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(() => updateTime(), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!liveLocation?.timezone) return;
    setTime(
      new Intl.DateTimeFormat('en-US', {
        timeZone: liveLocation.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()),
    );
  }, [liveLocation]);

  return (
    <div
      className={`w-full transition-all duration-700 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="h-36 sm:h-44 relative overflow-hidden">
          <DarkMap
            lat={SITE.lat}
            lon={SITE.lon}
            zoom={12}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-card/10 pointer-events-none z-[1001]" />
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 z-[1002]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 bg-background/40 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-[11px] font-medium text-foreground/90">
                  {SITE.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-background/40 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-[11px] font-mono text-foreground/90">
                  {time} {liveLocation?.tzAbbr ?? 'PHT'}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="text-[10px] font-mono text-muted-foreground/60">
                {`${SITE.lat.toFixed(1)}°N ${SITE.lon.toFixed(1)}°E`}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 -mt-14 sm:-mt-16 relative z-[1003]">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 opacity-50 to-accent/10 rounded-2xl blur-sm" />
            <Image
              src="/Hidalgo.png"
              alt={SITE.name}
              width={96}
              height={96}
              className="relative rounded-2xl w-24 h-24 sm:w-28 sm:h-28 object-cover border-4 border-card"
              priority
            />
            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-card bg-emerald-500" />
          </div>
        </div>

        <div className="px-6 sm:px-8 pt-4 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {SITE.name}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {SITE.role}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {SITE.bio}
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {SITE.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Since 2022
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">
          Skills
        </span>
        <div className="flex-1 h-px bg-border/50" />
      </div>

      <section>
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-primary" />
          Tech Stack
        </h2>
        <Skills />
      </section>

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">
          Summary
        </span>
        <div className="flex-1 h-px bg-border/50" />
      </div>

      <section>
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-poke-fire" />
          Summary
        </h2>
        <ExperienceSection />
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Replace `app/about/page.tsx` with a thin wrapper**

```tsx
// app/about/page.tsx
import AboutContent from '@/components/about/AboutContent';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24">
      <AboutContent />
    </div>
  );
}
```

- [ ] **Step 5: Extract `NotesListContent`**

Move everything inside the outer wrapper of `app/notes/page.tsx` *except* the trailing `<Dock />` into:

```tsx
// components/notes/NotesListContent.tsx
'use client';

import NotesContent from './NotesContent';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { getNotesCount } from '@/lib/data';

export default function NotesListContent() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [query, setQuery] = useState('');
  const notesCount = getNotesCount();

  const placeholders = [
    'Search notes...',
    'Find tech insights...',
    'Explore my learnings...',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
          A CS student&apos;s journey through code, experiments, and
          late-night discoveries. Sharing what I learn as I build, break, and
          occasionally fix things.
        </p>

        <div className="w-full [&>form]:!max-w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">
              {notesCount} {notesCount === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          <div className="hidden sm:flex gap-1.5">
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                view === 'grid'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <NotesContent query={query} view={view} />
    </div>
  );
}
```

- [ ] **Step 6: Replace `app/notes/page.tsx` with a thin wrapper**

```tsx
// app/notes/page.tsx
import NotesListContent from '@/components/notes/NotesListContent';

export default function NotesPage() {
  return (
    <div className="min-h-screen w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24">
      <NotesListContent />
    </div>
  );
}
```

- [ ] **Step 7: Extract `NoteDetailContent`**

Move everything inside `app/notes/[id]/page.tsx` *except* the trailing `<Dock />` into a component that takes `noteId` as a prop instead of reading `useParams()` directly (so it can be reused for extra multi-instance windows opened without a route change):

```tsx
// components/notes/NoteDetailContent.tsx
'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import { getNoteById } from '@/lib/data';
import { renderMarkdown } from '@/utils/markdown-renderer';

export default function NoteDetailContent({ noteId }: { noteId: string }) {
  const note = getNoteById(noteId);

  if (!note) {
    notFound();
  }

  return (
    <div className="w-full">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Blog</span>
      </Link>

      <article className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            {note.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{note.date}</span>
            <span>•</span>
            <span>{note.readTime} read</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-[15px] prose-li:leading-relaxed">
          {renderMarkdown(note.content)}
        </div>

        {note.githubUrl && (
          <footer className="pt-10 mt-10 border-t border-border/30">
            <Link
              href={note.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </Link>
          </footer>
        )}
      </article>
    </div>
  );
}
```

- [ ] **Step 8: Replace `app/notes/[id]/page.tsx` with a thin wrapper**

```tsx
// app/notes/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import NoteDetailContent from '@/components/notes/NoteDetailContent';

export default function NotePage() {
  const params = useParams();
  return (
    <div className="min-h-screen w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24">
      <NoteDetailContent noteId={params.id as string} />
    </div>
  );
}
```

- [ ] **Step 9: Remove `<Dock />` from `ProjectsContent`**

In `components/projects/ProjectsContent.tsx`, delete the `import Dock from '@/components/Dock';` line and the `<Dock />` usage at the bottom of the returned JSX (Desktop now owns all chrome).

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: build succeeds with no type errors across the four thin pages and `Desktop.tsx` (Task 6 now resolves cleanly).

- [ ] **Step 11: Commit**

```bash
git add components/home/HomeHeroContent.tsx components/about/AboutContent.tsx components/notes/NotesListContent.tsx components/notes/NoteDetailContent.tsx app/page.tsx app/about/page.tsx app/notes/page.tsx "app/notes/[id]/page.tsx" components/projects/ProjectsContent.tsx components/desktop/Desktop.tsx
git commit -m "refactor: extract page content into reusable components, drop per-page Dock"
```

---

### Task 8: RouteSync (opens/focuses the window matching the current URL)

**Files:**
- Create: `components/desktop/RouteSync.tsx`

**Interfaces:**
- Consumes: `useWindowManager()` (Task 3), `getRouteDescriptor()` (Task 2).
- Produces: `<RouteSync />` (renders nothing, side-effect only) — used in `app/layout.tsx` (Task 9).

- [ ] **Step 1: Implement the component**

```tsx
// components/desktop/RouteSync.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useWindowManager } from '@/lib/window-manager/context';
import { getRouteDescriptor } from '@/lib/window-manager/registry';

export default function RouteSync() {
  const pathname = usePathname();
  const { openWindow } = useWindowManager();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The initial window set is already computed synchronously by
    // WindowManagerProvider's lazy initializer — skip re-opening it here.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const descriptor = getRouteDescriptor(pathname);
    if (descriptor) {
      openWindow(descriptor, true);
    }
  }, [pathname, openWindow]);

  return null;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/desktop/RouteSync.tsx
git commit -m "feat: add RouteSync to open/focus windows on client-side navigation"
```

---

### Task 9: Taskbar (replaces Dock)

**Files:**
- Create: `components/desktop/Taskbar.tsx`
- Delete: `components/Dock.tsx`

**Interfaces:**
- Consumes: `useWindowManager()` (Task 3), `WINDOW_REGISTRY` (Task 2), `getRouteDescriptor` (Task 2), existing `FloatingDock` (`components/ui/floating-dock.tsx`) and `Theme` toggle (`components/Theme.tsx`) — reused as-is.
- Produces: `<Taskbar />` — used in `app/layout.tsx` (Task 10).

- [ ] **Step 1: Implement the component**

```tsx
// components/desktop/Taskbar.tsx
'use client';

import {
  Download,
  FolderIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FloatingDock } from '@/components/ui/floating-dock';
import { SITE } from '@/data/site';
import ThemeToggle from '@/components/Theme';
import { useWindowManager } from '@/lib/window-manager/context';

export default function Taskbar() {
  const { theme, setTheme } = useTheme();
  const { windows, focusWindow, restoreWindow } = useWindowManager();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = (href: string) => {
    router.push(href);
  };

  const links = [
    {
      title: 'Home',
      icon: <HomeIcon className="h-full w-full text-muted-foreground" />,
      href: '/',
      onClick: () => goTo('/'),
    },
    {
      title: 'About',
      icon: <UserIcon className="h-full w-full text-muted-foreground" />,
      href: '/about',
      onClick: () => goTo('/about'),
    },
    {
      title: 'Projects',
      icon: <FolderIcon className="h-full w-full text-muted-foreground" />,
      href: '/projects',
      onClick: () => goTo('/projects'),
    },
    {
      title: 'Blog',
      icon: <PencilIcon className="h-full w-full text-muted-foreground" />,
      href: '/notes',
      onClick: () => goTo('/notes'),
    },
    {
      title: 'CV',
      icon: <Download className="h-full w-full text-muted-foreground" />,
      href: SITE.cvPath,
    },
    {
      title: 'Theme',
      icon: (
        <ThemeToggle theme={theme} setTheme={setTheme} mounted={mounted} />
      ),
      href: '#',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-2 pb-2">
      {windows.length > 0 && (
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/90 backdrop-blur-sm px-2 py-1.5 font-mono text-xs">
          {windows.map(w => (
            <button
              key={w.id}
              onClick={() =>
                w.minimized ? restoreWindow(w.id) : focusWindow(w.id)
              }
              className={`rounded px-2 py-1 transition-colors ${
                w.minimized
                  ? 'text-muted-foreground hover:bg-muted'
                  : 'bg-muted text-foreground'
              }`}
            >
              {w.title}
            </button>
          ))}
        </div>
      )}
      <FloatingDock items={links} />
    </div>
  );
}
```

- [ ] **Step 2: Delete the old Dock component**

```bash
rm components/Dock.tsx
```

- [ ] **Step 3: Verify no remaining imports**

Run: `npx tsc --noEmit`
Expected: no "Cannot find module '@/components/Dock'" errors (all four page files and `ProjectsContent` were already updated in Task 7)

- [ ] **Step 4: Commit**

```bash
git add components/desktop/Taskbar.tsx
git rm components/Dock.tsx
git commit -m "feat: replace Dock with Taskbar (running-window list + app launcher)"
```

---

### Task 10: BootScreen

**Files:**
- Create: `components/desktop/BootScreen.tsx`

**Interfaces:**
- Produces: `<BootScreen onDone={() => void}>` — used in `app/layout.tsx` (Task 11).

- [ ] **Step 1: Implement the component**

```tsx
// components/desktop/BootScreen.tsx
'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-boot-seen';
const BOOT_LINES = [
  'booting janpol-os...',
  'mounting /home/hero',
  'mounting /home/github',
  'mounting /home/techstack',
  'ready.',
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      onDone();
      return;
    }
    setVisible(true);
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;
    if (lineIndex >= BOOT_LINES.length) {
      localStorage.setItem(STORAGE_KEY, '1');
      const timeout = setTimeout(onDone, 300);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setLineIndex(i => i + 1), 220);
    return () => clearTimeout(timeout);
  }, [visible, lineIndex, onDone]);

  const skip = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    onDone();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between bg-background p-6 font-mono text-sm text-foreground">
      <div>
        {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <button
        onClick={skip}
        className="self-end text-xs text-muted-foreground hover:text-foreground"
      >
        skip [esc]
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/desktop/BootScreen.tsx
git commit -m "feat: add skippable boot sequence"
```

---

### Task 11: Wire everything into the root layout

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `WindowManagerProvider` (Task 3), `Desktop` (Task 6), `Taskbar` (Task 9), `BootScreen` (Task 10), `RouteSync` (Task 8).

- [ ] **Step 1: Add a client shell component that reads the initial pathname and gates on boot**

```tsx
// components/desktop/DesktopShell.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { WindowManagerProvider } from '@/lib/window-manager/context';
import Desktop from './Desktop';
import Taskbar from './Taskbar';
import RouteSync from './RouteSync';
import BootScreen from './BootScreen';

export default function DesktopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [booted, setBooted] = useState(false);

  return (
    <WindowManagerProvider initialPathname={pathname}>
      <RouteSync />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <Desktop />
          <Taskbar />
        </>
      )}
      {/* SSR/no-JS fallback content stays in the DOM but hidden once the
          desktop has booted, so search engines and no-JS clients still see
          real per-route content. */}
      <div className={booted ? 'sr-only' : 'hidden'} aria-hidden={booted}>
        {children}
      </div>
    </WindowManagerProvider>
  );
}
```

- [ ] **Step 2: Wire it into the root layout**

```tsx
// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import DesktopShell from '@/components/desktop/DesktopShell';

export const metadata: Metadata = {
  title: {
    default: 'Janpol Hidalgo — Developer',
    template: '%s | Janpol Hidalgo',
  },
  description:
    'Software engineer crafting modern web and mobile experiences. Exploring AI, real-time systems, and the art of building things that matter.',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
    apple: '/WebAvatar.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Janpol Hidalgo — Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
    siteName: 'Janpol Hidalgo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janpol Hidalgo — Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans noise-bg`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DesktopShell>{children}</DesktopShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Manual verification**

Run: `npm run dev`
Open `http://localhost:3000`. Expected: boot sequence plays once, then desktop shows Hero + GitHub + TechStack windows, draggable/resizable at >=768px width. Navigate to `/about` via taskbar — About window opens and focuses. Reload on `/notes/<a-real-note-id>` directly — note window opens focused on top of the default layout (no boot replay, since `localStorage` flag is now set). Close the note window — URL returns to `/`. Shrink the browser below 768px — windows render as a static stacked list, no drag handles.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/desktop/DesktopShell.tsx
git commit -m "feat: wire WindowManagerProvider, Desktop, Taskbar, BootScreen, RouteSync into root layout"
```

---

### Task 12: Neutral OS-gray visual skin

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes/replaces: existing `--background`, `--foreground`, `--card`, `--primary`, `--accent`, `--border`, etc. CSS variables (Task 1 of file, `app/globals.css:6-98`). Leaves the `--type-*` Pokémon tokens untouched (still used by `TYPE_COLORS`/`EXPERIENCE_TYPE_COLORS` in `data/site.ts`).

- [ ] **Step 1: Replace the light/dark palette with neutral OS grays**

In `app/globals.css`, replace the `:root` block's color variables (keep `--radius`, `--chart-*`, and all `--type-*` entries unchanged):

```css
:root {
  /* ─── Light Mode: neutral OS gray ─── */
  --background: 220 14% 96%;
  --foreground: 220 9% 12%;

  --card: 0 0% 100%;
  --card-foreground: 220 9% 12%;

  --popover: 0 0% 100%;
  --popover-foreground: 220 9% 12%;

  --primary: 220 9% 30%;
  --primary-foreground: 0 0% 100%;

  --secondary: 220 13% 91%;
  --secondary-foreground: 220 9% 12%;

  --muted: 220 13% 91%;
  --muted-foreground: 220 9% 40%;

  --accent: 220 9% 46%;
  --accent-foreground: 0 0% 100%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;

  --border: 220 13% 85%;
  --input: 220 13% 85%;
  --ring: 220 9% 46%;
  ...
```

And the `.dark` block:

```css
.dark {
  /* ─── Dark Mode: neutral OS gray ─── */
  --background: 220 13% 9%;
  --foreground: 220 9% 92%;

  --card: 220 13% 13%;
  --card-foreground: 220 9% 92%;

  --popover: 220 13% 13%;
  --popover-foreground: 220 9% 92%;

  --primary: 220 9% 70%;
  --primary-foreground: 220 13% 9%;

  --secondary: 220 10% 18%;
  --secondary-foreground: 220 9% 92%;

  --muted: 220 10% 18%;
  --muted-foreground: 220 9% 60%;

  --accent: 220 9% 55%;
  --accent-foreground: 220 13% 9%;

  --destructive: 0 63% 40%;
  --destructive-foreground: 0 0% 98%;

  --border: 220 10% 22%;
  --input: 220 10% 22%;
  --ring: 220 9% 55%;
  ...
```

(Keep every `--type-*` line under each block exactly as-is — do not touch them.)

- [ ] **Step 2: Manual verification**

Run: `npm run dev`. Toggle light/dark via the taskbar theme button. Expected: window chrome, taskbar, and cards render in neutral grays in both modes; skill badges (which use `--type-*` tokens) are unaffected.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: switch to neutral OS-gray palette for the desktop redesign"
```

---

### Task 13: Final cleanup pass

**Files:**
- Modify: any file touched above with leftover dead imports

**Interfaces:** none — verification-only task.

- [ ] **Step 1: Grep for leftover references to the old Dock**

Run: `grep -rn "components/Dock" app components lib`
Expected: no matches.

- [ ] **Step 2: Grep for unused `bento-item` / bento-grid classes now that the home grid is gone**

Run: `grep -rn "bento-item" app components`
Expected: no matches in `app/page.tsx` (grid removed in Task 7); if the `.bento-item` utility class in `app/globals.css` (lines 214-222) has no remaining consumers, remove it in this step along with its hover rule.

- [ ] **Step 3: Run full verification**

```bash
npx tsc --noEmit
npx vitest run
npm run build
```

Expected: all three succeed with zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead bento-grid styles after desktop redesign"
```

---

## Self-Review Notes

- **Spec coverage:** boot sequence (Task 10), taskbar/dock evolution (Task 9), draggable/resizable windows w/ react-rnd (Task 5), mobile static fallback (Tasks 4-5), real URL sync for `/about`, `/projects`, `/notes`, `/notes/:id` (Tasks 2, 8), close-navigates-to-`/` (Task 5 step 1), multi-instance `noteDetail` windows (Task 2's non-singleton id scheme `noteDetail:${noteId}`), no position persistence (Task 1's `createInitialState` always recomputed from current pathname, never read from storage), neutral OS-gray palette (Task 12), monospace chrome / sans prose (`font-mono` on `Window.tsx` chrome and `Taskbar.tsx`, prose components keep inherited `font-sans` from `body`), pre-opened Hero+GitHub+TechStack (Task 2 `getDefaultDescriptors` base trio), codebase cleanup folded in per task (Task 7 step 9, Task 9 step 2, Task 13).
- **Type consistency check:** `WindowInstance.props.noteId` (Task 1/2) matches `NoteDetailContent({ noteId }: { noteId: string })` (Task 7) and its use in `Desktop.tsx` (`instance.props.noteId as string`, Task 6) — consistent across all three.
- **No placeholders:** every step above contains complete code, exact file paths, and exact run commands.
