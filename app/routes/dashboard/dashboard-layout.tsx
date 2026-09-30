import { Header } from "@/components/layout/header";
import { SidebarComponent } from "@/components/layout/sidebar-component";
import { Loader } from "@/components/loader";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { fetchData } from "@/lib/fetch-utils";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLoaderData } from "react-router";

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([fetchData("/workspaces")]);

    return { workspaces };
  } catch (error) {
    console.log("Failed to fetch workspaces:", error);

    return { workspaces: [] };
  }
};

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const { workspaces } = useLoaderData() as {
    workspaces: Workspace[];
  };

  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  const [currentWorkspace, setCurrentWorkspace] =
    useState<Workspace | null>(null);

  // Automatically select the last used workspace
  useEffect(() => {
    if (workspaces.length === 0) return;

    const lastWorkspaceId = localStorage.getItem("lastWorkspaceId");

    const lastWorkspace = workspaces.find(
      (workspace) => workspace._id === lastWorkspaceId
    );

    setCurrentWorkspace(lastWorkspace || workspaces[0]);
  }, [workspaces]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);

    // Remember the workspace the user selected
    localStorage.setItem("lastWorkspaceId", workspace._id);
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;