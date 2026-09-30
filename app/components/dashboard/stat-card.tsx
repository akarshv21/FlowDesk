import type { StatsCardProps } from "@/types";
import {
  FolderKanban,
  ListTodo,
  CircleDot,
  Timer,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const StatsCard = ({ data }: { data: StatsCardProps }) => {
  const cards = [
    {
      title: "Total Projects",
      value: data.totalProjects,
      description: `${data.totalProjectInProgress} in progress`,
      icon: FolderKanban,
      iconClass: "bg-blue-50 text-blue-600",
      accent: "from-blue-500/10",
    },
    {
      title: "Total Tasks",
      value: data.totalTasks,
      description: `${data.totalTaskCompleted} completed`,
      icon: ListTodo,
      iconClass: "bg-violet-50 text-violet-600",
      accent: "from-violet-500/10",
    },
    {
      title: "To Do",
      value: data.totalTaskToDo,
      description: "Tasks waiting to be done",
      icon: CircleDot,
      iconClass: "bg-orange-50 text-orange-600",
      accent: "from-orange-500/10",
    },
    {
      title: "In Progress",
      value: data.totalTaskInProgress,
      description: "Tasks currently in progress",
      icon: Timer,
      iconClass: "bg-emerald-50 text-emerald-600",
      accent: "from-emerald-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className={`group relative overflow-hidden border-border/70 bg-gradient-to-br ${card.accent} to-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold tracking-tight">
                    {card.value}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>

                <ArrowUpRight className="mb-1 h-4 w-4 text-muted-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};