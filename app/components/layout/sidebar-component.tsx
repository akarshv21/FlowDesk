import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import {
  CheckCircle2,
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarNav } from "./sidebar-nav";

export const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Workspaces", href: "/workspaces", icon: Users },
    { title: "My Tasks", href: "/my-tasks", icon: ListCheck },
    { title: "Members", href: "/members", icon: Users },
    { title: "Achieved", href: "/achieved", icon: CheckCircle2 },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  const workspaceInitial =
    currentWorkspace?.name?.charAt(0).toUpperCase() || "W";

  const userInitial = user?.name?.charAt(0).toUpperCase() || "A";

  const toggleSidebar = () => {
    setIsCollapsed((current) => !current);
  };

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col",
        "border-r border-slate-200/80 bg-white",
        "transition-[width] duration-300 ease-out",
        isCollapsed ? "w-[76px]" : "w-16 md:w-[272px]"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-[76px] shrink-0 items-center",
          "border-b border-slate-100/90",
          isCollapsed ? "justify-center" : "justify-between px-5"
        )}
      >
        {/* Logo - visual only */}
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "gap-1" : "gap-3"
          )}
        >
          {/* <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center",
              "rounded-[13px] bg-blue-600 text-white",
              "shadow-[0_7px_20px_rgba(37,99,235,0.18)]"
            )}
          >
            <Workflow className="size-[19px]" strokeWidth={2.2} />
          </div> */}

          <div
  className={cn(
    "flex size-10 shrink-0 items-center justify-center",
    "rounded-[13px] bg-blue-600 text-white",
    "shadow-[0_7px_20px_rgba(37,99,235,0.18)]"
  )}
>
  <div className="relative h-4 w-4">
    <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute left-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-white" />
  </div>
</div>



          {!isCollapsed && (
            <div className="hidden min-w-0 md:block">
              <div className="text-[18px] font-bold leading-none tracking-[-0.035em] text-slate-950">
                Flowdesk
              </div>

              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Turn work into flow.
              </div>
            </div>
          )}

          {/* Collapsed toggle */}
          {isCollapsed && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
              className={cn(
                "size-8 shrink-0 rounded-full",
                "border-2 border-blue-100 bg-white",
                "text-slate-500",
                "shadow-[0_4px_14px_rgba(15,23,42,0.15)]",
                "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600",
                "active:scale-95"
              )}
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          )}
        </div>

        {/* Expanded toggle */}
        {!isCollapsed && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className={cn(
              "hidden size-8 shrink-0 md:flex",
              "rounded-xl",
              "border border-slate-200 bg-white",
              "text-slate-400",
              "shadow-[0_2px_8px_rgba(15,23,42,0.05)]",
              "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600",
              "active:scale-95"
            )}
          >
            <ChevronsLeft className="size-4" />
          </Button>
        )}
      </div>

      {/* Current workspace */}
      {!isCollapsed && (
        <div className="hidden px-4 pt-5 md:block">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Current workspace
            </span>

            {currentWorkspace && (
              <span className="flex items-center gap-1.5 text-[9px] font-medium text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm"
                style={{
                  backgroundColor: currentWorkspace?.color || "#3158F5",
                }}
              >
                {workspaceInitial}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-800">
                  {currentWorkspace?.name || "Select workspace"}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                  {currentWorkspace
                    ? "Your active workspace"
                    : "Choose a workspace to begin"}
                </p>
              </div>

              <ChevronRight className="size-3.5 shrink-0 text-slate-300" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="min-h-0 flex-1 px-3 py-6">
        {!isCollapsed && (
          <div className="mb-3 hidden px-2 md:block">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Workspace
            </span>
          </div>
        )}

        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          currentWorkspace={currentWorkspace}
          className={cn(
            isCollapsed ? "items-center space-y-2" : "space-y-1"
          )}
        />
      </ScrollArea>

      {/* User */}
      <div className="shrink-0 border-t border-slate-100 bg-white p-3">
        {!isCollapsed ? (
          <div className="hidden rounded-2xl bg-slate-50/80 p-2.5 md:block">
            <div className="flex items-center gap-3">
              <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                {userInitial}

                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-slate-50 bg-emerald-500" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-slate-800">
                  {user?.name || "Account"}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                  {user?.email || "Signed in"}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="size-8 shrink-0 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Log out"
              >
                <LogOut className="size-3.5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="size-10 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600"
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};