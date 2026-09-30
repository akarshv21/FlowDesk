import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  ChevronRight,
  LockKeyhole,
  Users,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useGetWorkspaceDetailsQuery,
  useGetWorkspaceStatsQuery,
} from "@/hooks/use-workspace";
import type { Workspace } from "@/types";

const Settings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");
  const hasWorkspace = Boolean(workspaceId);

  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskUpdated: true,
    comments: true,
    workspaceInvites: true,
    memberAdded: true,
  });

  const toggleNotification = (
    key: keyof typeof notifications
  ) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
  } = useGetWorkspaceDetailsQuery(workspaceId || "");

  const {
    data: statsData,
    isLoading: statsLoading,
  } = useGetWorkspaceStatsQuery(workspaceId);

  const workspace = workspaceData as Workspace | undefined;

  const workspaceInitial =
    workspace?.name?.trim()?.charAt(0)?.toUpperCase() || "—";

  const membersCount = workspace?.members?.length ?? 0;

  const stats = (
    statsData as
      | {
          stats?: {
            totalProjects?: number;
            totalTasks?: number;
          };
        }
      | undefined
  )?.stats;

  const projectsCount = stats?.totalProjects ?? 0;
  const tasksCount = stats?.totalTasks ?? 0;

  const showWorkspaceLoading =
    hasWorkspace && workspaceLoading;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-7 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-9">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="-ml-2 mb-5 h-9 gap-2 px-2.5 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Button>

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
          Workspace
        </p>

        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-[30px]">
          Settings
        </h1>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
          Manage your workspace, notifications, and account
          preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Workspace overview */}
        <section>
          <div className="mb-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
              Workspace
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950">
              Workspace overview
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              A quick look at the workspace you're managing.
            </p>
          </div>

          <Card className="overflow-hidden rounded-2xl border-[#E5E1D8] shadow-none">
            <CardContent className="p-0">
              {/* Workspace identity */}
              <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white shadow-sm">
                    {showWorkspaceLoading ? (
                      <Loader />
                    ) : (
                      workspaceInitial
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-slate-950">
                        {showWorkspaceLoading
                          ? "Loading..."
                          : workspace?.name || "—"}
                      </h3>

                      {workspace && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </div>

                    <p className="mt-1 max-w-xl truncate text-sm text-slate-500">
                      {showWorkspaceLoading
                        ? "Loading workspace details..."
                        : workspace?.description || "—"}
                    </p>
                  </div>
                </div>

                {workspace && workspaceId ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      navigate(`/workspaces/${workspaceId}`)
                    }
                    className="w-full gap-2 border-slate-200 bg-white sm:w-auto"
                  >
                    View workspace
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/workspaces")}
                    className="w-full gap-2 border-slate-200 bg-white sm:w-auto"
                  >
                    Select workspace
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>

              <Separator className="bg-slate-100" />

              {/* Workspace stats */}
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="px-4 py-5 text-center sm:px-6">
                  <p className="text-xl font-semibold tracking-tight text-slate-950">
                    {statsLoading && hasWorkspace
                      ? "—"
                      : membersCount}
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-400">
                    Members
                  </p>
                </div>

                <div className="px-4 py-5 text-center sm:px-6">
                  <p className="text-xl font-semibold tracking-tight text-slate-950">
                    {statsLoading && hasWorkspace
                      ? "—"
                      : projectsCount}
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-400">
                    Projects
                  </p>
                </div>

                <div className="px-4 py-5 text-center sm:px-6">
                  <p className="text-xl font-semibold tracking-tight text-slate-950">
                    {statsLoading && hasWorkspace
                      ? "—"
                      : tasksCount}
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-400">
                    Tasks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications
        <section>
          <div className="mb-3.5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Bell className="size-4" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Notifications
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Choose which activity should notify you.
                </p>
              </div>
            </div>
          </div>

          <Card className="rounded-2xl border-[#E5E1D8] shadow-none">
            <CardContent className="p-0">
              {[
                {
                  key: "taskAssigned" as const,
                  title: "Task assigned to me",
                  description:
                    "When someone assigns a task to you.",
                },
                {
                  key: "taskUpdated" as const,
                  title: "Task updates",
                  description:
                    "When a task you're involved with changes.",
                },
                {
                  key: "comments" as const,
                  title: "Comments",
                  description:
                    "When someone comments on one of your tasks.",
                },
                {
                  key: "workspaceInvites" as const,
                  title: "Workspace invitations",
                  description:
                    "When you're invited to join a workspace.",
                },
                {
                  key: "memberAdded" as const,
                  title: "New members",
                  description:
                    "When someone joins your workspace.",
                },
              ].map((item, index) => (
                <div
                  key={item.key}
                  className={`flex items-center justify-between gap-6 px-5 py-5 sm:px-6 ${
                    index !== 4
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleNotification(item.key)
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      notifications[item.key]
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }`}
                    aria-label={`Toggle ${item.title}`}
                  >
                    <span
                      className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${
                        notifications[item.key]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section> */}

        {/* Workspace access */}
        <section>
          <div className="mb-3.5">
            <h2 className="text-base font-semibold text-slate-950">
              Workspace access
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage the people who can access this workspace.
            </p>
          </div>

          <Card className="rounded-2xl border-[#E5E1D8] shadow-none">
            <CardContent className="p-0">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    workspaceId
                      ? `/members?workspaceId=${workspaceId}`
                      : "/members"
                  )
                }
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      Members
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      View members, roles, and workspace access.
                    </p>
                  </div>
                </div>

                <ChevronRight className="size-4 shrink-0 text-slate-400" />
              </button>
            </CardContent>
          </Card>
        </section>

        {/* Account */}
        <section>
          <div className="mb-3.5">
            <h2 className="text-base font-semibold text-slate-950">
              Account
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage your personal information and security.
            </p>
          </div>

          <Card className="rounded-2xl border-[#E5E1D8] shadow-none">
            <CardContent className="p-0">
              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserRound className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      Profile
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Name, tagline, bio, and account information.
                    </p>
                  </div>
                </div>

                <ChevronRight className="size-4 shrink-0 text-slate-400" />
              </button>

              <Separator className="bg-slate-100" />

              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <LockKeyhole className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      Password & security
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Change your password and protect your account.
                    </p>
                  </div>
                </div>

                <ChevronRight className="size-4 shrink-0 text-slate-400" />
              </button>
            </CardContent>
          </Card>
        </section>

        {/* Danger zone */}
        <section className="border-t border-slate-100 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="size-4" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Danger Zone
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Destructive workspace actions.
              </p>
            </div>
          </div>

          <Card className="rounded-2xl border-red-200 bg-red-50/25 shadow-none">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Delete workspace
                  </p>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                    Permanently delete this workspace and its
                    associated data. This action cannot be undone.
                  </p>
                </div>

                <Button
                  variant="outline"
                  disabled
                  className="w-full shrink-0 border-red-200 bg-white text-red-600 hover:bg-red-50 sm:w-auto"
                >
                 Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Settings;