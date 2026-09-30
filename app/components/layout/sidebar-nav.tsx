import { cn } from "@/lib/utils";
import type { Workspace } from "@/types";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../ui/button";

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  currentWorkspace: Workspace | null;
  className?: string;
}

export const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "flex flex-col",
        isCollapsed ? "gap-2" : "gap-1",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          location.pathname === item.href ||
          (item.href !== "/dashboard" &&
            location.pathname.startsWith(`${item.href}/`));

        const handleClick = () => {
          if (item.href === "/workspaces") {
            navigate(item.href);
          } else if (currentWorkspace?._id) {
            navigate(`${item.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(item.href);
          }
        };

        return (
          <Button
            key={item.href}
            type="button"
            variant="ghost"
            onClick={handleClick}
            aria-current={isActive ? "page" : undefined}
            aria-label={isCollapsed ? item.title : undefined}
            className={cn(
              "group relative border-0 shadow-none",
              "transition-all duration-200 ease-out",
              "focus-visible:ring-2 focus-visible:ring-blue-500/20",

              isCollapsed
                ? [
                    "mx-auto size-11 justify-center rounded-xl p-0",
                    "text-slate-400",
                    "hover:bg-slate-100 hover:text-slate-800",
                  ]
                : [
                    "h-11 w-full justify-start rounded-xl px-3",
                    "text-[13px] font-medium",
                    "text-slate-500",
                    "hover:bg-slate-50 hover:text-slate-900",
                  ],

              isActive &&
                (isCollapsed
                  ? [
                      "bg-blue-50 text-blue-600",
                      "shadow-[inset_0_0_0_1px_rgba(37,99,235,0.08)]",
                      "hover:bg-blue-50 hover:text-blue-600",
                    ]
                  : [
                      "bg-blue-50/80 text-blue-700",
                      "shadow-[inset_0_0_0_1px_rgba(37,99,235,0.07)]",
                      "hover:bg-blue-50/80 hover:text-blue-700",
                    ])
            )}
          >
            {/* Active indicator */}
            <span
              className={cn(
                "absolute bg-blue-600 transition-all duration-200",
                isCollapsed
                  ? "bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                  : "left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full",
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              )}
            />

            {/* Icon container */}
            <span
              className={cn(
                "relative flex shrink-0 items-center justify-center",
                "transition-all duration-200",
                isCollapsed ? "size-11" : "size-5",
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 group-hover:text-slate-700",
                !isCollapsed &&
                  isActive &&
                  "group-hover:translate-x-0.5",
                isCollapsed &&
                  isActive &&
                  "scale-105"
              )}
            >
              <Icon
                className={cn(
                  "transition-all duration-200",
                  isCollapsed ? "size-[18px]" : "size-[17px]",
                  isActive
                    ? "stroke-[2.2]"
                    : "stroke-[1.8]"
                )}
              />
            </span>

            {/* Label */}
            {!isCollapsed && (
              <span
                className={cn(
                  "ml-2 flex-1 truncate text-left",
                  isActive
                    ? "font-semibold text-blue-700"
                    : "font-medium text-slate-600"
                )}
              >
                {item.title}
              </span>
            )}

            {/* Desktop arrow for active item */}
            {!isCollapsed && (
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 transition-all duration-200",
                  isActive
                    ? "translate-x-0 text-blue-400 opacity-100"
                    : "-translate-x-1 text-slate-300 opacity-0",
                  "group-hover:translate-x-0 group-hover:opacity-100"
                )}
              />
            )}

            {/* Collapsed tooltip */}
            {isCollapsed && (
              <span
                className={cn(
                  "pointer-events-none absolute left-full z-50 ml-3",
                  "whitespace-nowrap rounded-lg",
                  "border border-slate-200 bg-slate-950",
                  "px-2.5 py-1.5",
                  "text-[11px] font-medium text-white",
                  "opacity-0 shadow-lg",
                  "translate-x-[-4px]",
                  "transition-all duration-150",
                  "group-hover:translate-x-0 group-hover:opacity-100"
                )}
              >
                {item.title}
              </span>
            )}
          </Button>
        );
      })}
    </nav>
  );
};