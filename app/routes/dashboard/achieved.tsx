import { Loader } from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAchievedTasksQuery } from "@/hooks/use-task";
import type { Task } from "@/types";
import { format } from "date-fns";
import {
  Archive,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FolderKanban,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

type ArchivedTask = Task & {
  archivedAt?: string | Date | null;
};

const getDaysLeft = (archivedAt?: string | Date | null) => {
  if (!archivedAt) return null;

  const archivedDate = new Date(archivedAt).getTime();
  const expiryDate = archivedDate + 30 * 24 * 60 * 60 * 1000;
  const remaining = expiryDate - Date.now();

  if (remaining <= 0) {
    return 0;
  }

  return Math.ceil(remaining / (24 * 60 * 60 * 1000));
};

const Achieved = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const workspaceId = searchParams.get("workspaceId") || "";

  const { data: achievedTasks, isLoading } =
    useGetAchievedTasksQuery() as {
      data: ArchivedTask[];
      isLoading: boolean;
    };

  const workspaceTasks = useMemo(() => {
    if (!workspaceId) return [];

    return (achievedTasks || []).filter((task) => {
      const taskWorkspaceId =
        task.project?.workspace?.toString?.() ||
        task.project?.workspace;

      return taskWorkspaceId === workspaceId;
    });
  }, [achievedTasks, workspaceId]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return workspaceTasks;

    return workspaceTasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.project?.title?.toLowerCase().includes(query)
      );
    });
  }, [workspaceTasks, search]);

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Archive className="size-6" strokeWidth={1.8} />
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
            Select a workspace
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Choose a workspace from the top bar to view its achieved tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] md:px-7">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Archive className="size-5" strokeWidth={1.8} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">
                  Achieved
                </h1>

                <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                  Archive
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Completed work kept for 30 days before permanent deletion.
              </p>
            </div>
          </div>

          <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Archived
            </p>
            <p className="mt-0.5 text-lg font-semibold text-slate-900">
              {workspaceTasks.length}
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[420px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search achieved tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">
            {filteredTasks.length}
          </span>{" "}
          {filteredTasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      {/* Tasks */}
      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
        <CardHeader className="border-b border-slate-100 px-6 py-4 md:px-7">
          <div>
            <CardTitle className="text-base font-semibold text-slate-950">
              Achieved Tasks
            </CardTitle>

            <CardDescription className="mt-1 text-xs">
              Archived tasks from this workspace.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-3 md:p-4">
          {filteredTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
                {search ? (
                  <Search className="size-5" />
                ) : (
                  <Archive className="size-5" />
                )}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                {search ? "No matching tasks" : "No achieved tasks yet"}
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">
                {search
                  ? "Try a different search term."
                  : "Archived tasks from this workspace will appear here."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTasks.map((task) => {
                const daysLeft = getDaysLeft(task.archivedAt);

                return (
                  <Link
                    key={task._id}
                    to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                    className="group block rounded-xl border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/[0.18] hover:shadow-[0_5px_18px_rgba(49,88,245,0.06)] md:px-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* Task information */}
                      <div className="flex min-w-0 items-start gap-3.5">
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
                          <CheckCircle2
                            className="size-[17px]"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                              {task.title}
                            </h3>

                            <ArrowUpRight className="size-3.5 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" />
                          </div>

                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <FolderKanban className="size-3.5" />
                              {task.project?.title || "Project"}
                            </span>

                            {task.dueDate && (
                              <>
                                <span className="text-slate-300">•</span>

                                <span className="inline-flex items-center gap-1.5">
                                  <CalendarDays className="size-3.5" />
                                  Due {format(task.dueDate, "MMM d, yyyy")}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            <Badge
                              variant="outline"
                              className="rounded-full border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                            >
                              {task.status}
                            </Badge>

                            {task.priority && (
                              <Badge
                                variant={
                                  task.priority === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="rounded-full px-2 py-0.5 text-[10px]"
                              >
                                {task.priority}
                              </Badge>
                            )}

                            <Badge
                              variant="outline"
                              className="rounded-full border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600"
                            >
                              Archived
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Retention */}
                      <div className="flex shrink-0 items-center md:pl-6">
                        {daysLeft !== null ? (
                          <div
                            className={`min-w-[110px] rounded-xl border px-3 py-2 text-center ${
                              daysLeft <= 3
                                ? "border-red-100 bg-red-50"
                                : daysLeft <= 7
                                  ? "border-amber-100 bg-amber-50"
                                  : "border-blue-100 bg-blue-50"
                            }`}
                          >
                            <p
                              className={`text-sm font-semibold ${
                                daysLeft <= 3
                                  ? "text-red-600"
                                  : daysLeft <= 7
                                    ? "text-amber-600"
                                    : "text-blue-600"
                              }`}
                            >
                              {daysLeft === 0
                                ? "Expires today"
                                : `${daysLeft} ${
                                    daysLeft === 1 ? "day" : "days"
                                  } left`}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              auto-delete
                            </p>
                          </div>
                        ) : (
                          <div className="min-w-[110px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                            <p className="text-xs font-medium text-slate-500">
                              Archive date
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              not available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Achieved;