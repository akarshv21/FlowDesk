import { Loader } from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetMyTasksQuery } from "@/hooks/use-task";
import { useGetWorkspaceQuery } from "@/hooks/use-workspace";
import type { Project, Task } from "@/types";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  Clock,
  FilterIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const MyTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId") || "";
  const initialFilter = searchParams.get("filter") || "all";
  const initialSort = searchParams.get("sort") || "desc";
  const initialSearch = searchParams.get("search") || "";
  const initialProject = searchParams.get("projectId") || "all";

  const [filter, setFilter] = useState<string>(initialFilter);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSort === "asc" ? "asc" : "desc"
  );

  const [search, setSearch] = useState<string>(initialSearch);

  const [selectedProjectId, setSelectedProjectId] =
    useState<string>(initialProject);

  const { data: workspaceData } = useGetWorkspaceQuery(workspaceId) as {
    data?: {
      workspace: any;
      projects: Project[];
    };
    isLoading: boolean;
  };

  const { data: myTasks, isLoading } = useGetMyTasksQuery(
    workspaceId || undefined
  ) as {
    data: Task[];
    isLoading: boolean;
  };

  const workspaceProjects = workspaceData?.projects || [];

  /*
   * Keep URL state in sync with the current filters.
   */
  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    if (workspaceId) {
      params.workspaceId = workspaceId;
    }

    params.filter = filter;
    params.sort = sortDirection;
    params.search = search;
    params.projectId = selectedProjectId;

    setSearchParams(params, { replace: true });
  }, [
    filter,
    sortDirection,
    search,
    selectedProjectId,
    workspaceId,
  ]);

  /*
   * When the global workspace changes, reset the selected
   * project to All Projects.
   */
  useEffect(() => {
    setSelectedProjectId("all");
  }, [workspaceId]);

  /*
   * If the selected project no longer exists in the current
   * workspace, fall back to All Projects.
   */
  useEffect(() => {
    if (
      selectedProjectId !== "all" &&
      workspaceProjects.length > 0 &&
      !workspaceProjects.some(
        (project) => project._id === selectedProjectId
      )
    ) {
      setSelectedProjectId("all");
    }
  }, [workspaceProjects, selectedProjectId]);

  const selectedProject =
    selectedProjectId === "all"
      ? null
      : workspaceProjects.find(
          (project) => project._id === selectedProjectId
        );

  /*
   * Backend returns tasks assigned to the current user.
   *
   * We additionally scope them to the globally selected
   * workspace here.
   */
  const workspaceTasks = (myTasks || []).filter((task) => {
    if (!workspaceId) return true;

    const taskWorkspaceId =
      task.project?.workspace?.toString?.() ||
      task.project?.workspace;

    return taskWorkspaceId === workspaceId;
  });

  /*
   * Filter by selected project.
   */
  const projectTasks = workspaceTasks.filter((task) => {
    if (selectedProjectId === "all") return true;

    return task.project?._id === selectedProjectId;
  });

  /*
   * Status / priority filters + search.
   */
  const filteredTasks = projectTasks
    .filter((task) => {
      if (filter === "all") return true;

      if (filter === "todo") {
        return task.status === "To Do";
      }

      if (filter === "inprogress") {
        return task.status === "In Progress";
      }

      if (filter === "done") {
        return task.status === "Done";
      }

      if (filter === "achieved") {
        return task.isArchived === true;
      }

      if (filter === "high") {
        return task.priority === "High";
      }

      return true;
    })
    .filter((task) => {
      const query = search.trim().toLowerCase();

      if (!query) return true;

      return (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      );
    });

  /*
   * Sort tasks by due date.
   */
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() -
            new Date(a.dueDate).getTime();
    }

    return 0;
  });

  const todoTasks = sortedTasks.filter(
    (task) => task.status === "To Do"
  );

  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = sortedTasks.filter(
    (task) => task.status === "Done"
  );

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Select a workspace
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose a workspace to see your tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Tasks assigned to you in the selected workspace.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {/* PROJECT SELECTOR */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="min-w-[190px] justify-between"
                >
                  <span className="truncate">
                    {selectedProject?.title || "All Projects"}
                  </span>

                  <ChevronDown className="ml-2 size-4 shrink-0" />
                </Button>
              }
            />

            <DropdownMenuContent
              align="end"
              className="w-[220px]"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  Select Project
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => handleProjectChange("all")}
                >
                  All Projects
                </DropdownMenuItem>

                {workspaceProjects.map((project) => (
                  <DropdownMenuItem
                    key={project._id}
                    onClick={() =>
                      handleProjectChange(project._id)
                    }
                  >
                    <span className="truncate">
                      {project.title}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT */}
          <Button
            variant="outline"
            onClick={() =>
              setSortDirection(
                sortDirection === "asc" ? "desc" : "asc"
              )
            }
          >
            {sortDirection === "asc"
              ? "Oldest First"
              : "Newest First"}
          </Button>

          {/* FILTER */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline">
                  <FilterIcon className="mr-2 size-4" />
                  Filter
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  Filter Tasks
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => setFilter("all")}
                >
                  All Tasks
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("todo")}
                >
                  To Do
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("inprogress")}
                >
                  In Progress
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("done")}
                >
                  Done
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("achieved")}
                >
                  Achieved
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setFilter("high")}
                >
                  High Priority
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* LIST / BOARD */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">
            List View
          </TabsTrigger>

          <TabsTrigger value="board">
            Board View
          </TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedProject?.title || "My Tasks"}
              </CardTitle>

              <CardDescription>
                {sortedTasks.length}{" "}
                {sortedTasks.length === 1 ? "task" : "tasks"}{" "}
                assigned to you
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {sortedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="mb-2 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                      <div className="flex">
                        <div className="mr-2 flex gap-2">
                          {task.status === "Done" ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <Clock className="size-4 text-yellow-500" />
                          )}
                        </div>

                        <div>
                          <Link
                            to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                            className="flex items-center font-medium transition-colors hover:text-primary hover:underline"
                          >
                            {task.title}

                            <ArrowUpRight className="ml-1 size-4" />
                          </Link>

                          <div className="mt-1 flex items-center space-x-2">
                            <Badge
                              variant={
                                task.status === "Done"
                                  ? "default"
                                  : "outline"
                              }
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
                              >
                                {task.priority}
                              </Badge>
                            )}

                            {task.isArchived && (
                              <Badge variant="outline">
                                Archived
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground">
                        {task.dueDate && (
                          <div>
                            Due:{" "}
                            {format(
                              task.dueDate,
                              "PPPP"
                            )}
                          </div>
                        )}

                        <div>
                          Project:{" "}
                          <span className="font-medium">
                            {task.project.title}
                          </span>
                        </div>

                        <div>
                          Modified on:{" "}
                          {format(
                            task.updatedAt,
                            "PPPP"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {sortedTasks.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* TO DO */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  To Do

                  <Badge variant="outline">
                    {todoTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="max-h-[600px] space-y-3 overflow-y-auto p-3">
                {todoTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">
                          {task.title}
                        </h3>

                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {task.description ||
                            "No description"}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(
                                task.dueDate,
                                "PPPP"
                              )}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}

                {todoTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            {/* IN PROGRESS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  In Progress

                  <Badge variant="outline">
                    {inProgressTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="max-h-[600px] space-y-3 overflow-y-auto p-3">
                {inProgressTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">
                          {task.title}
                        </h3>

                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {task.description ||
                            "No description"}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(
                                task.dueDate,
                                "PPPP"
                              )}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}

                {inProgressTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            {/* DONE */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Done

                  <Badge variant="outline">
                    {doneTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="max-h-[600px] space-y-3 overflow-y-auto p-3">
                {doneTasks.map((task) => (
                  <Card
                    key={task._id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">
                          {task.title}
                        </h3>

                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {task.description ||
                            "No description"}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>

                          {task.dueDate && (
                            <span className="text-sm text-muted-foreground">
                              {format(
                                task.dueDate,
                                "PPPP"
                              )}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}

                {doneTasks.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasks;