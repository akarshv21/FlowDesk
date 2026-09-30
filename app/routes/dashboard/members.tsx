import { Loader } from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetWorkspaceDetailsQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import {
  Grid2X2,
  List,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

const Members = () => {
  const [searchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  if (!workspaceId) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center">
        <Card className="w-full max-w-2xl overflow-hidden border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
          <CardContent className="relative flex min-h-[380px] items-center justify-center overflow-hidden p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-blue-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 size-52 rounded-full bg-slate-100/70 blur-3xl" />

            <div className="relative max-w-md text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-[20px] border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                <UsersRound className="size-7" strokeWidth={1.8} />
              </div>

              <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                <Sparkles className="size-3.5" />
                Team workspace
              </div>

              <h1 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                No workspace selected
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Select a workspace to see the people working together and
                manage your team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data, isLoading } = useGetWorkspaceDetailsQuery(workspaceId) as {
    data: Workspace;
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center">
        <Card className="w-full max-w-xl border-slate-200/80 bg-white">
          <CardContent className="py-16 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <UsersRound className="size-6" />
            </div>

            <h1 className="text-xl font-semibold text-slate-950">
              Workspace not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Select another workspace to view its members.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const members = data.members || [];
  const query = search.trim().toLowerCase();

  const filteredMembers = members.filter((member) => {
    if (!query) return true;

    const name = member.user.name?.toLowerCase() || "";
    const email = member.user.email?.toLowerCase() || "";
    const role = member.role?.toLowerCase() || "";

    return (
      name.includes(query) ||
      email.includes(query) ||
      role.includes(query)
    );
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
      {/* Page header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
            <UsersRound className="size-3.5" />
            Team
          </div>

          <h1 className="text-3xl font-bold tracking-[-0.035em] text-slate-950">
            Members
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage the people collaborating in{" "}
            <span className="font-medium text-slate-700">
              {data.name}
            </span>
            .
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-sm">
          <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <UsersRound className="size-3.5" />
          </span>

          <span className="text-sm font-semibold text-slate-800">
            {members.length}
          </span>

          <span className="text-xs text-slate-400">
            {members.length === 1 ? "member" : "members"}
          </span>
        </div>
      </div>

      {/* Empty workspace */}
      {members.length === 0 ? (
        <Card className="overflow-hidden border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
          <CardContent className="relative flex min-h-[420px] items-center justify-center overflow-hidden p-8">
            <div className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-blue-50/80 blur-3xl" />

            <div className="relative max-w-lg text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-[20px] border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                <UsersRound className="size-7" strokeWidth={1.8} />
              </div>

              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {data.name}
              </div>

              <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">
                Bring your team together.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Invite people to your workspace and start turning projects
                into shared progress.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="list" className="w-full">
          {/* Search + view switcher */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                type="search"
                placeholder="Search members..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 rounded-xl border-slate-200 bg-white pl-9 pr-4 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-100"
              />
            </div>

            <TabsList className="h-10 w-fit rounded-xl border border-slate-200 bg-slate-50 p-1">
              <TabsTrigger
                value="list"
                className="h-8 rounded-lg px-4 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <List className="mr-1.5 size-3.5" />
                List
              </TabsTrigger>

              <TabsTrigger
                value="board"
                className="h-8 rounded-lg px-4 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Grid2X2 className="mr-1.5 size-3.5" />
                Board
              </TabsTrigger>
            </TabsList>
          </div>

          {/* List view */}
          <TabsContent value="list" className="mt-4">
            <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 bg-slate-50/40 px-5 py-4">
                <CardTitle className="text-base text-slate-900">
                  Workspace members
                </CardTitle>

                <CardDescription>
                  {filteredMembers.length}{" "}
                  {filteredMembers.length === 1 ? "person" : "people"}{" "}
                  {query
                    ? "matching your search"
                    : "in this workspace"}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {filteredMembers.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Search className="size-5" />
                    </div>

                    <p className="font-medium text-slate-800">
                      No members found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another name, email, or role.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.user._id}
                        className="group flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <Avatar className="size-10 shrink-0 border border-slate-200">
                            <AvatarImage
                              src={member.user.profilePicture}
                              alt={member.user.name}
                            />

                            <AvatarFallback className="bg-blue-50 font-semibold text-blue-600">
                              {member.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {member.user.name}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {member.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pl-[54px] sm:pl-0">
                          <Badge
                            variant={
                              ["admin", "owner"].includes(member.role)
                                ? "destructive"
                                : "secondary"
                            }
                            className="rounded-full px-2.5 capitalize"
                          >
                            {member.role}
                          </Badge>

                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 font-normal text-slate-500"
                          >
                            {data.name}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Board view */}
          <TabsContent value="board" className="mt-4">
            {filteredMembers.length === 0 ? (
              <Card className="border-slate-200/80 bg-white">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                    <Search className="size-5" />
                  </div>

                  <p className="font-medium text-slate-800">
                    No members found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try another name, email, or role.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMembers.map((member) => (
                  <Card
                    key={member.user._id}
                    className="group overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
                  >
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <Avatar className="mb-4 size-16 border-2 border-white shadow-[0_4px_15px_rgba(15,23,42,0.10)]">
                        <AvatarImage
                          src={member.user.profilePicture}
                          alt={member.user.name}
                        />

                        <AvatarFallback className="bg-blue-50 text-lg font-semibold text-blue-600">
                          {member.user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <h3 className="max-w-full truncate text-sm font-semibold text-slate-900">
                        {member.user.name}
                      </h3>

                      <p className="mt-1 max-w-full truncate text-xs text-slate-400">
                        {member.user.email}
                      </p>

                      <Badge
                        variant={
                          ["admin", "owner"].includes(member.role)
                            ? "destructive"
                            : "secondary"
                        }
                        className="mt-4 rounded-full px-3 capitalize"
                      >
                        {member.role}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Members;