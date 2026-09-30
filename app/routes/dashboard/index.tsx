import { RecentProjects } from "@/components/dashboard/recnt-project";
import { StatsCard } from "@/components/dashboard/stat-card";
import { StatisticsCharts } from "@/components/dashboard/statistics-charts";
import { Loader } from "@/components/loader";
import { UpcomingTasks } from "@/components/upcoming-tasks";
import {
  useGetWorkspaceStatsQuery,
  useGetWorkspacesQuery,
} from "@/hooks/use-workspace";
import type {
  Project,
  Workspace,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from "@/types";
import {
  ArrowRight,
  Check,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const workspaceIdFromUrl = searchParams.get("workspaceId");

  const { data: workspaces, isPending: isWorkspacesPending } =
    useGetWorkspacesQuery() as {
      data: Workspace[];
      isPending: boolean;
    };

  const lastWorkspaceId = localStorage.getItem("lastWorkspaceId");

  const workspaceId =
    workspaceIdFromUrl ||
    lastWorkspaceId ||
    workspaces?.[0]?._id ||
    null;

  const { data, isPending: isStatsPending } =
    useGetWorkspaceStatsQuery(workspaceId) as {
      data: {
        stats: StatsCardProps;
        taskTrendsData: TaskTrendsData[];
        projectStatusData: ProjectStatusData[];
        taskPriorityData: TaskPriorityData[];
        workspaceProductivityData: WorkspaceProductivityData[];
        upcomingTasks: Task[];
        recentProjects: Project[];
      };
      isPending: boolean;
    };

  if (isWorkspacesPending) {
    return <Loader />;
  }

  /*
   * Empty state for a brand-new account.
   * The user is sent to the Workspaces page where
   * the existing Create Workspace dialog opens automatically.
   */
  if (workspaces?.length === 0) {
    return (
      <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 blur-3xl" />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>

        {/* Main empty state */}
        <div className="relative w-full max-w-4xl">
          <div className="text-center">
            {/* Brand mark */}
            {/* <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div> */}

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              YOUR WORKSPACE STARTS HERE
            </div>

            {/* Heading */}
            <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
              Welcome to Flowdesk
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Create your workspace and bring your projects, tasks, and team
              together in one organized place.
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={() => navigate("/workspaces?create=true")}
              className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_24px_rgba(37,99,235,0.25)] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />

              Create your first workspace

              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Getting started */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Getting started
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Step 1 */}
              <div className="relative rounded-2xl border border-blue-200 bg-white/90 p-4 text-left shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <Users className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600">
                        01
                      </span>

                      <p className="text-sm font-semibold text-slate-900">
                        Workspace
                      </p>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Bring your team together
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-4 text-left shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <FolderKanban className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        02
                      </span>

                      <p className="text-sm font-semibold text-slate-900">
                        Projects
                      </p>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Organize your work
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-4 text-left shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                    <CheckSquare className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        03
                      </span>

                      <p className="text-sm font-semibold text-slate-900">
                        Tasks
                      </p>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Track work to completion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting message */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
              <LayoutDashboard className="h-3.5 w-3.5" />

              <span>
                Start with one workspace. You can create more whenever you
                need.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isStatsPending || !workspaceId) {
    return <Loader />;
  }

  return (
    <div className="space-y-9 pb-10">
      <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Overview
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            A clear view of your workspace activity, projects, and tasks.
          </p>
        </div>
      </section>

      <StatsCard data={data.stats} />

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Workspace Analytics
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Track task activity and project progress.
            </p>
          </div>
        </div>

        <StatisticsCharts
          stats={data.stats}
          taskTrendsData={data.taskTrendsData}
          projectStatusData={data.projectStatusData}
          taskPriorityData={data.taskPriorityData}
          workspaceProductivityData={data.workspaceProductivityData}
        />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Work Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Stay on top of recent projects and upcoming tasks.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <RecentProjects data={data.recentProjects} />
          <UpcomingTasks data={data.upcomingTasks} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;