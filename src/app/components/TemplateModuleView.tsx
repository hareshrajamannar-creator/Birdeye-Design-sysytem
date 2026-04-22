/**
 * ─────────────────────────────────────────────────────────────────
 * TEMPLATE MODULE — copy this file to start a new feature
 * ─────────────────────────────────────────────────────────────────
 *
 * HOW TO USE:
 * 1. Copy this file:
 *    cp src/app/components/TemplateModuleView.tsx src/app/components/YourFeatureView.tsx
 *
 * 2. Rename every occurrence of "Template" → "YourFeature"
 *
 * 3. Wire it into App.tsx:
 *    - Import:  import { YourFeatureView } from "./components/YourFeatureView";
 *    - Add to AppView union: | "your-feature"
 *    - Add render case:
 *        } : currentView === "your-feature" ? (
 *          <YourFeatureView />
 *        ) : ...
 *
 * 4. Register the title in appViewTitle.ts:
 *    case "your-feature": return "Your Feature";
 *
 * 5. Add the L1 icon in Sidebar.v2.tsx (follow existing icon entries)
 *
 * RULES (enforced by Claude Code — see CLAUDE.md):
 * - Every component must come from @/app/components/ui/
 * - No raw hex colors — use Tailwind token classes only
 * - No new npm packages for UI
 * - Icons only from lucide-react or @phosphor-icons/react
 * ─────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { Plus, Search, MoreVertical } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ModuleHeader } from "@/app/components/layout/ModuleHeader";

// ─── Mock data — replace with real data/API calls ───────────────
const MOCK_ROWS = [
  { id: 1, name: "Item one",   status: "active",   date: "Apr 20, 2026" },
  { id: 2, name: "Item two",   status: "pending",  date: "Apr 19, 2026" },
  { id: 3, name: "Item three", status: "inactive", date: "Apr 18, 2026" },
];

type Status = "active" | "pending" | "inactive";

const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
  active:   { label: "Active",   className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  pending:  { label: "Pending",  className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  inactive: { label: "Inactive", className: "bg-[#f3f4f6] text-[#6b7280] dark:bg-[#252b35] dark:text-[#9ca3af]" },
};

// ─── Main component ──────────────────────────────────────────────
export function TemplateModuleView() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_ROWS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Page header ─────────────────────────────────────────── */}
      <ModuleHeader
        title="Template Module"
        subtitle="Replace this with your feature description"
        actions={
          <>
            {/* Add secondary actions here */}
            <Button size="sm" variant="outline">Export</Button>
            {/* Primary CTA */}
            <Button size="sm">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add item
            </Button>
          </>
        }
      />

      {/* ── Content area ────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto p-6">

        {/* ── Summary cards (optional — delete if not needed) ───── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total",    value: "128" },
            { label: "Active",   value: "94"  },
            { label: "Pending",  value: "34"  },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-[#111827] dark:text-[#f3f4f6]">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Toolbar ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>

        {/* ── Data table ──────────────────────────────────────────── */}
        <div className="rounded-lg border border-[#e5e9f0] dark:border-[#252b35] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-sm text-[#9ca3af]">
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-[#111827] dark:text-[#f3f4f6]">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={STATUS_BADGE[row.status as Status].className}
                      >
                        {STATUS_BADGE[row.status as Status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6b7280] dark:text-[#9ca3af] text-sm">
                      {row.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  );
}
