import { BackButton } from "@/components/back-button";
import { Loader } from "@/components/loader";
import { CreateTaskDialog } from "@/components/task/create-task-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UseProjectQuery } from "@/hooks/use-project";
import { getProjectProgress } from "@/lib";
import { cn } from "@/lib/utils";
import type { Project, Task, TaskStatus } from "@/types";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const ProjectDetails = () => {
  const { projectId, workspaceId } = useParams<{
    projectId: string;
    workspaceId: string;
  }>();

  const navigate = useNavigate();

  const [isCreateTask, setIsCreateTask] = useState(false);
  const [taskFilter, setTaskFilter] = useState<TaskStatus | "All">("All");

  const { data, isLoading } = UseProjectQuery(projectId!) as {
    data: {
      tasks: Task[];
      project: Project;
    };
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const { project, tasks } = data;

  const projectProgress = getProjectProgress(tasks);

  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const handleTaskClick = (taskId: string) => {
    navigate(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`
    );
  };

  return (
    <div className="space-y-8">
      {/* Project header */}
      <section className="border-b border-[#E5E1D8] pb-7">
        <BackButton />

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl">
              {project.title}
            </h1>

            {project.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end lg:w-auto">
            <div className="w-full sm:min-w-[220px]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Project progress
                </span>

                <span className="text-xs font-semibold text-slate-700">
                  {projectProgress}%
                </span>
              </div>

              <Progress
                value={projectProgress}
                className="h-1.5 bg-slate-100"
              />
            </div>

            <Button
              onClick={() => setIsCreateTask(true)}
              className="h-10 rounded-lg bg-[#3158F5] px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#294bd7] hover:shadow-md"
            >
              Add Task
            </Button>
          </div>
        </div>
      </section>

      {/* Task board */}
      <section>
        <Tabs defaultValue="all" className="w-full">
          {/* Filters */}
          <div className="flex flex-col gap-5 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
            <TabsList className="h-10 w-fit rounded-lg border border-[#E5E1D8] bg-slate-50/70 p-1">
              <TabsTrigger
                value="all"
                onClick={() => setTaskFilter("All")}
                className="rounded-md px-4 text-sm text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                All Tasks
              </TabsTrigger>

              <TabsTrigger
                value="todo"
                onClick={() => setTaskFilter("To Do")}
                className="rounded-md px-4 text-sm text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                To Do
              </TabsTrigger>

              <TabsTrigger
                value="in-progress"
                onClick={() => setTaskFilter("In Progress")}
                className="rounded-md px-4 text-sm text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                In Progress
              </TabsTrigger>

              <TabsTrigger
                value="done"
                onClick={() => setTaskFilter("Done")}
                className="rounded-md px-4 text-sm text-slate-500 transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Done
              </TabsTrigger>
            </TabsList>

            {/* Board summary */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-400" />
                <span className="text-slate-500">To Do</span>
                <span className="font-semibold text-slate-800">
                  {todoTasks.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#3158F5]" />
                <span className="text-slate-500">In Progress</span>
                <span className="font-semibold text-slate-800">
                  {inProgressTasks.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="text-slate-500">Done</span>
                <span className="font-semibold text-slate-800">
                  {doneTasks.length}
                </span>
              </div>

              <span className="hidden h-4 w-px bg-slate-200 sm:block" />

              <span className="text-slate-400">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </span>
            </div>
          </div>

          {/* All tasks */}
          <TabsContent value="all" className="mt-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
              <TaskColumn
                title="To Do"
                count={todoTasks.length}
                tasks={todoTasks}
                onTaskClick={handleTaskClick}
                accent="todo"
              />

              <TaskColumn
                title="In Progress"
                count={inProgressTasks.length}
                tasks={inProgressTasks}
                onTaskClick={handleTaskClick}
                accent="progress"
              />

              <TaskColumn
                title="Done"
                count={doneTasks.length}
                tasks={doneTasks}
                onTaskClick={handleTaskClick}
                accent="done"
              />
            </div>
          </TabsContent>

          {/* To Do */}
          <TabsContent value="todo" className="mt-5">
            <TaskColumn
              title="To Do"
              count={todoTasks.length}
              tasks={todoTasks}
              onTaskClick={handleTaskClick}
              accent="todo"
              isFullWidth
            />
          </TabsContent>

          {/* In Progress */}
          <TabsContent value="in-progress" className="mt-5">
            <TaskColumn
              title="In Progress"
              count={inProgressTasks.length}
              tasks={inProgressTasks}
              onTaskClick={handleTaskClick}
              accent="progress"
              isFullWidth
            />
          </TabsContent>

          {/* Done */}
          <TabsContent value="done" className="mt-5">
            <TaskColumn
              title="Done"
              count={doneTasks.length}
              tasks={doneTasks}
              onTaskClick={handleTaskClick}
              accent="done"
              isFullWidth
            />
          </TabsContent>
        </Tabs>
      </section>

      <CreateTaskDialog
        open={isCreateTask}
        onOpenChange={setIsCreateTask}
        projectId={projectId!}
        projectMembers={project.members as any}
      />
    </div>
  );
};

export default ProjectDetails;

interface TaskColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  accent: "todo" | "progress" | "done";
  isFullWidth?: boolean;
}

const TaskColumn = ({
  title,
  count,
  tasks,
  onTaskClick,
  accent,
  isFullWidth = false,
}: TaskColumnProps) => {
  const accentStyles = {
    todo: {
      dot: "bg-slate-400",
      count: "bg-slate-100 text-slate-600",
    },
    progress: {
      dot: "bg-[#3158F5]",
      count: "bg-[#3158F5]/8 text-[#3158F5]",
    },
    done: {
      dot: "bg-emerald-500",
      count: "bg-emerald-50 text-emerald-600",
    },
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#E5E1D8] bg-slate-50/50",
        isFullWidth && "w-full"
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-white/80 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "size-2 rounded-full",
              accentStyles[accent].dot
            )}
          />

          <h2 className="text-sm font-semibold text-slate-800">
            {title}
          </h2>

          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
              accentStyles[accent].count
            )}
          >
            {count}
          </span>
        </div>

        {tasks.length > 0 && (
          <span className="text-[11px] text-slate-400">
            {tasks.length}{" "}
            {tasks.length === 1 ? "task" : "tasks"}
          </span>
        )}
      </div>

      {/* Scrollable task area */}
      <div
        className={cn(
          "min-h-[140px] max-h-[620px] overflow-y-auto p-3",
          "[&::-webkit-scrollbar]:w-1.5",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-slate-200",
          isFullWidth &&
            "max-h-none grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
        )}
      >
        {tasks.length === 0 ? (
          <div className="flex min-h-[110px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white/60">
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500">
                No tasks here
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                Tasks will appear here
              </p>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => onTaskClick(task._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TaskCard = ({
  task,
  onClick,
}: {
  task: Task;
  onClick: () => void;
}) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer rounded-lg border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
    >
      <CardHeader className="pb-2.5">
        <div className="flex items-start justify-between gap-3">
          <Badge
            className={cn(
              "rounded-full border-0 px-2 py-0.5 text-[10px] font-medium",
              task.priority === "High" &&
                "bg-red-50 text-red-600 hover:bg-red-50",
              task.priority === "Medium" &&
                "bg-orange-50 text-orange-600 hover:bg-orange-50",
              task.priority === "Low" &&
                "bg-slate-100 text-slate-500 hover:bg-slate-100"
            )}
          >
            {task.priority}
          </Badge>

          <div
            className="flex items-center gap-0.5"
            onClick={(event) => event.stopPropagation()}
          >
            {task.status !== "To Do" && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-md text-slate-400 opacity-60 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100"
                onClick={() => {
                  console.log("mark as to do");
                }}
                title="Mark as To Do"
              >
                <AlertCircle className="size-3.5" />
                <span className="sr-only">Mark as To Do</span>
              </Button>
            )}

            {task.status !== "In Progress" && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-md text-slate-400 opacity-60 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100"
                onClick={() => {
                  console.log("mark as in progress");
                }}
                title="Mark as In Progress"
              >
                <Clock className="size-3.5" />
                <span className="sr-only">
                  Mark as In Progress
                </span>
              </Button>
            )}

            {task.status !== "Done" && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-md text-slate-400 opacity-60 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100"
                onClick={() => {
                  console.log("mark as done");
                }}
                title="Mark as Done"
              >
                <CheckCircle className="size-3.5" />
                <span className="sr-only">Mark as Done</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800">
          {task.title}
        </h4>

        {task.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-500">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <div className="min-w-0">
            {task.assignees && task.assignees.length > 0 && (
              <div className="flex items-center -space-x-1.5">
                {task.assignees.slice(0, 5).map((member) => (
                  <Avatar
                    key={member._id}
                    className="size-7 border-2 border-white bg-slate-100"
                    title={member.name}
                  >
                    <AvatarImage src={member.profilePicture} />

                    <AvatarFallback className="text-[10px] font-medium text-slate-600">
                      {member.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}

                {task.assignees.length > 5 && (
                  <span className="ml-2 text-[11px] text-slate-400">
                    +{task.assignees.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          {task.dueDate && (
            <div className="flex shrink-0 items-center text-[11px] text-slate-400">
              <Calendar className="mr-1 size-3" />
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </div>
          )}
        </div>

        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-2.5 text-[11px] text-slate-400">
            {task.subtasks.filter((subtask) => subtask.completed).length}{" "}
            / {task.subtasks.length} subtasks
          </div>
        )}
      </CardContent>
    </Card>
  );
};