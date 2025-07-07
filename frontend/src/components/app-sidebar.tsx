import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getRoutesForRole } from "../pages/permissions/PagesPermission";

// Group routes by module for sidebar sections
function groupRoutesByModule(routes) {
  const grouped = {};
  routes.forEach((route) => {
    if (!grouped[route.module]) {
      grouped[route.module] = [];
    }
    grouped[route.module].push(route);
  });
  return grouped;
}

function getSectionTitle(module) {
  if (module === "employee") return "My Stuff";
  if (module === "superadmin") return "Super Admin";
  // Capitalize first letter for other modules
  return module.charAt(0).toUpperCase() + module.slice(1);
}

export function AppSidebar(props) {
  const currentUserRole = "superadmin";
  const routes = getRoutesForRole(currentUserRole);
  const groupedRoutes = groupRoutesByModule(routes);

  // Convert grouped routes to sidebar sections
  const navMain = Object.entries(groupedRoutes).map(([module, items]) => ({
    title: getSectionTitle(module),
    url: "#",
    items: items.map((item) => ({
      title: item.name,
      url: item.url,
      icon: item.icon,
      permissions: item.permissions,
    })),
  }));

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
      role: "Admin",
    },
    teams: [
      {
        name: "UC Services PVT LTD",
        logo: null,
        plan: "Enterprise",
      },
    ],
    navMain: navMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher data={data} />
      </SidebarHeader>
      <SidebarContent SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
