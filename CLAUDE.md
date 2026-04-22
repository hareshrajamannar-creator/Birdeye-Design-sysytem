# Birdeye Design System — Claude Code Instructions

## Setup (first time)

```bash
npm install
npm run dev        # → http://localhost:5173
npm run storybook  # → http://localhost:6006 (component browser)
```

## What this repo is

A fully working Birdeye product shell your team uses as a base to build features. It includes:
- **L1 navigation** (left icon strip) — `src/app/components/Sidebar.tsx`
- **L2 navigation** (per-module side panel) — `src/app/components/Sidebar.tsx`
- **TopBar** — `src/app/components/TopBar.tsx`
- **25+ module views** (Reviews, Contacts, Agents, Social, Ticketing, etc.) — `src/app/components/`
- **All UI primitives** — `src/app/components/ui/` (Button, Card, Table, Input, Dialog, etc.)

## THE ONE RULE — read before writing any UI

**Every UI element must come from `src/app/components/ui/`.**

Before writing any component, check if it already exists:
```
src/app/components/ui/button.tsx       ← all buttons
src/app/components/ui/card.tsx         ← all cards
src/app/components/ui/table.tsx        ← all tables
src/app/components/ui/input.tsx        ← all inputs
src/app/components/ui/dialog.tsx       ← all modals/dialogs
src/app/components/ui/sheet.tsx        ← all slide-over panels
src/app/components/ui/tabs.tsx         ← all tabs
src/app/components/ui/badge.tsx        ← all status badges
src/app/components/ui/select.tsx       ← all dropdowns
src/app/components/ui/form.tsx         ← all forms (react-hook-form)
src/app/components/ui/chart.tsx        ← all charts (Recharts)
src/app/components/ui/avatar.tsx       ← all avatars
src/app/components/ui/checkbox.tsx     ← all checkboxes
src/app/components/ui/switch.tsx       ← all toggles
src/app/components/ui/skeleton.tsx     ← all loading states
src/app/components/ui/dropdown-menu.tsx← all dropdown menus
src/app/components/ui/tooltip.tsx      ← all tooltips
src/app/components/ui/sonner.tsx       ← all toasts/notifications
```

**Never install a new UI library. Never write a component from scratch if it exists above.**

## How to add a new feature module (5 steps)

### Step 1 — Add your route type
In `src/app/App.tsx`, add your module name to the `AppView` union:
```ts
export type AppView =
  | "reviews"
  | "contacts"
  | "your-module-name"  // ← add this
  | ...
```

### Step 2 — Register the title
In `src/app/appViewTitle.ts`:
```ts
case "your-module-name":
  return "Your Module Title";
```

### Step 3 — Add L1 icon
In `src/app/components/Sidebar.tsx` (or the versioned file it re-exports from), add an entry to the icon strip for your module.

### Step 4 — Create L2 nav panel (if needed)
```tsx
// src/app/components/YourModuleL2NavPanel.tsx
export function YourModuleL2NavPanel() {
  return (
    <div className="w-[220px] flex flex-col shrink-0 border-r border-[#e5e9f0] dark:border-[#252b35]">
      {/* nav items */}
    </div>
  );
}
```
Export from `Sidebar.tsx` and wire in `App.tsx` (follow the pattern of existing panels).

### Step 5 — Create the module view
```tsx
// src/app/components/YourModuleView.tsx
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

export function YourModuleView() {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Page header */}
      <div className="shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] px-6 py-4 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-[#111827] dark:text-[#f3f4f6] tracking-[-0.4px]">
          Your Module
        </h1>
        <Button size="sm">Primary action</Button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Use components from src/app/components/ui/ here */}
      </div>
    </div>
  );
}
```

Wire in `App.tsx` in the main content render chain:
```tsx
} : currentView === "your-module-name" ? (
  <YourModuleView />
) : ...
```

## Styling rules

- **Colors**: Use Tailwind token classes only — `bg-white`, `text-[#111827]`, `border-[#e5e9f0]`, `dark:bg-[#1e2229]`
- **Never** use arbitrary hex in `style={{ color: '#...' }}` inline styles
- **Spacing**: Multiples of 4px — `p-4`, `gap-2`, `px-6`, `py-3`
- **Font**: Already loaded via `src/tokens/fonts.css` — do not import fonts manually
- **Icons**: Import from `lucide-react` or `@phosphor-icons/react` only

## ALWAYS start from the template

When building any new feature module, **always copy `TemplateModuleView.tsx` first**:

```bash
cp src/app/components/TemplateModuleView.tsx src/app/components/YourFeatureView.tsx
```

The template already has:
- `ModuleHeader` wired up with title, subtitle, and action buttons
- A search input
- A data table with status badges and row actions
- Correct Tailwind token classes (no raw hex)
- Inline comments explaining every section

Rename "Template" → "YourFeature" throughout, then replace mock data with real data.

## Shared layout components

```
src/app/components/layout/ModuleHeader.tsx  ← use for ALL page headers
```

```tsx
import { ModuleHeader } from "@/app/components/layout/ModuleHeader";

<ModuleHeader
  title="Your Module"
  subtitle="Optional description"
  actions={<Button size="sm">Primary action</Button>}
  tabs={<Tabs>...</Tabs>}
/>
```

## Reference: look at existing modules before building

The best way to understand patterns is to read existing views:
- **Template (start here)** → `src/app/components/TemplateModuleView.tsx`
- Simple list view → `src/app/components/ReviewsView.v1.tsx`
- Data table view → `src/app/components/ContactsView.v1.tsx`
- Dashboard with charts → `src/app/components/BusinessOverviewDashboard.tsx`
- Form-heavy view → `src/app/components/ScheduleBuilderView.tsx`

## Common mistakes that cause blank screens

1. **Not importing the component** — double-check the import path uses `@/app/components/ui/`
2. **Not wiring the view in App.tsx** — the `currentView === "your-module"` branch must exist
3. **CSS class typo** — Tailwind classes are case-sensitive
4. **Returning null accidentally** — make sure your component always returns JSX
5. **Missing export** — ensure `export function YourModuleView()` not just `function YourModuleView()`

> If you add a route but forget to wire the view, the app now shows a helpful
> `UnwiredModuleView` with exact instructions instead of a blank screen.

## Design version

Current: `v2` (set in `src/config/designVersion.ts`). Do not change this.
