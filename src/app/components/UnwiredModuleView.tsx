import { Construction } from "lucide-react";
import type { AppView } from "../App";

interface UnwiredModuleViewProps {
  currentView: AppView;
}

/**
 * Shown when a route exists in AppView but no view component has been
 * wired up in App.tsx yet. Prevents blank screens during development.
 */
export function UnwiredModuleView({ currentView }: UnwiredModuleViewProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] px-6 py-4 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-[#111827] dark:text-[#f3f4f6] tracking-[-0.4px] capitalize">
          {currentView.replace(/-/g, " ")}
        </h1>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f6] dark:bg-[#252b35]">
          <Construction className="h-7 w-7 text-[#6b7280] dark:text-[#9ca3af]" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[15px] font-semibold text-[#111827] dark:text-[#f3f4f6]">
            View not connected yet
          </p>
          <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] max-w-sm">
            The route{" "}
            <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">
              "{currentView}"
            </code>{" "}
            exists in <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">AppView</code> but no view component is wired up in <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">App.tsx</code> yet.
          </p>
        </div>

        {/* Instructions */}
        <div className="mt-2 w-full max-w-lg rounded-xl border border-[#e5e9f0] dark:border-[#252b35] bg-[#f9fafb] dark:bg-[#1a1e27] text-left overflow-hidden">
          <div className="border-b border-[#e5e9f0] dark:border-[#252b35] px-4 py-2.5">
            <p className="text-xs font-semibold text-[#374151] dark:text-[#d1d5db] uppercase tracking-wide">
              To fix this — 2 steps
            </p>
          </div>
          <div className="flex flex-col gap-0 divide-y divide-[#e5e9f0] dark:divide-[#252b35]">
            <div className="px-4 py-3 flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2552ED] text-[10px] font-bold text-white mt-0.5">1</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-medium text-[#111827] dark:text-[#f3f4f6]">Copy the template module</p>
                <code className="text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono">
                  cp src/app/components/TemplateModuleView.tsx src/app/components/{currentView.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")}View.tsx
                </code>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2552ED] text-[10px] font-bold text-white mt-0.5">2</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-medium text-[#111827] dark:text-[#f3f4f6]">Wire it in App.tsx</p>
                <code className="text-xs text-[#6b7280] dark:text-[#9ca3af] font-mono">
                  {`} : currentView === "${currentView}" ? (`}<br />
                  {`  <${currentView.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")}View />`}<br />
                  {`) : ...`}
                </code>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#9ca3af] dark:text-[#6b7280]">
          Full guide in <code className="font-mono">AERO_DS_APP_PLAN.md</code> → Phase 3
        </p>
      </div>
    </div>
  );
}
