// Reference implementation preserved in ReviewsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function ReviewsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Reviews" activeL2Key={activeItem} />;
}
