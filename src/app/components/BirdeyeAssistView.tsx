import {
  Settings2,
  CheckCircle2,
  ClipboardList,
  ArrowLeftRight,
  Key,
  RefreshCw,
  Users,
  ToggleRight,
  Pencil,
  ShieldCheck,
  UserCog,
  Layers,
  Wrench,
  LifeBuoy,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

type ActionCard = {
  label: string;
  icon: React.ElementType;
};

const accountManagementCards: ActionCard[] = [
  { label: "Account Feature Management",              icon: Settings2       },
  { label: "Activate SMB and Location Accounts",      icon: CheckCircle2    },
  { label: "Manage Business",                         icon: ClipboardList   },
  { label: "Move Business",                           icon: ArrowLeftRight  },
  { label: "Move Source Business to Target Business", icon: CheckCircle2    },
  { label: "Reset API Key",                           icon: Key             },
  { label: "Sync Business",                           icon: RefreshCw       },
  { label: "Temporary Account Access",                icon: Users           },
  { label: "Toggle SEO",                              icon: ToggleRight     },
  { label: "Update Business Sms Number",              icon: Pencil          },
];

const customRoleCards: ActionCard[] = [
  { label: "Create Custom Role",   icon: UserCog    },
  { label: "Edit Role Permissions",icon: ShieldCheck},
  { label: "Assign Roles",         icon: Users      },
];

const rollupCards: ActionCard[] = [
  { label: "Rollup Configuration", icon: Layers    },
  { label: "Manage Rollup Groups", icon: Wrench    },
];

const securityCards: ActionCard[] = [
  { label: "Security Settings",     icon: ShieldCheck },
  { label: "Audit Logs",            icon: ClipboardList},
  { label: "IP Allowlist",          icon: Key          },
];

const updateServicesCards: ActionCard[] = [
  { label: "Service Configuration", icon: Wrench    },
  { label: "Feature Flags",         icon: ToggleRight },
];

const userManagementCards: ActionCard[] = [
  { label: "Manage Users",          icon: Users     },
  { label: "Invite Users",          icon: UserCog   },
  { label: "Deactivate Users",      icon: LifeBuoy  },
];

const sections: { id: string; label: string; cards: ActionCard[] }[] = [
  { id: "account-management",     label: "Account Management",      cards: accountManagementCards  },
  { id: "custom-role-management", label: "Custom Role Management",  cards: customRoleCards         },
  { id: "rollup-management",      label: "Rollup Management",       cards: rollupCards             },
  { id: "security-management",    label: "Security Management",     cards: securityCards           },
  { id: "update-services",        label: "Update Services",         cards: updateServicesCards     },
  { id: "user-management",        label: "User Management",         cards: userManagementCards     },
];

function ActionCardTile({ label, icon: Icon }: ActionCard) {
  return (
    <button className="flex items-center gap-3 px-4 py-4 rounded-lg border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-[#252a33] hover:border-[#2552ED]/40 hover:bg-[#f5f7ff] dark:hover:bg-[#1e2d5e]/30 transition-all cursor-pointer text-left group w-full">
      <Icon className="w-[18px] h-[18px] text-[#6b7280] dark:text-[#9ba2b0] group-hover:text-[#2552ED] transition-colors shrink-0" />
      <span className="text-[13px] leading-snug text-[#2552ED] dark:text-[#4d7fff] group-hover:underline transition-colors">
        {label}
      </span>
    </button>
  );
}

export function BirdeyeAssistView() {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-[#1e2229]">
      <div className="p-6 max-w-5xl">
        <Accordion
          type="multiple"
          defaultValue={["account-management"]}
          className="flex flex-col gap-3"
        >
          {sections.map(({ id, label, cards }) => (
            <AccordionItem
              key={id}
              value={id}
              className="border border-black/[0.07] dark:border-white/[0.07] rounded-lg overflow-hidden last:border-b"
            >
              <AccordionTrigger className="px-5 py-4 text-[15px] font-semibold text-[#212121] dark:text-[#e4e4e4] hover:no-underline hover:bg-[#f8f9fb] dark:hover:bg-[#2a2f3a] transition-colors data-[state=open]:border-b data-[state=open]:border-black/[0.06] dark:data-[state=open]:border-white/[0.06]">
                {label}
              </AccordionTrigger>
              <AccordionContent className="px-5 pt-4 pb-5">
                <div className="grid grid-cols-3 gap-3">
                  {cards.map((card) => (
                    <ActionCardTile key={card.label} {...card} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
