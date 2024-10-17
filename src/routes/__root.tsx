import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Sidebar } from "../components";

export const Route = createRootRoute({
  component: () => (
    <div className="flex">
      <Sidebar />
      <main className="h-screen overflow-y-scroll w-full">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </div>
  ),
});
