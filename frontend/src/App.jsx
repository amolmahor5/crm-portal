import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import AuthLayout from "./layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";

import { userPermissions, subRouteMeta } from "@/pages/permissions/PagesPermission";
import SalesRoutes from "@/routes/SalesRoutes";
import FinanceRoutes from "@/routes/FinanceRoutes";
import AdminRoutes from "@/routes/AdminRoutes";
import EmployeeRoutes from "@/routes/EmployeeRoutes";

export function Page({ title }) {
  return (
    <h1 className="scroll-m-20 text-md sm:text-2xl font-bold tracking-tight text-balance">
      {title} Coming soon...
    </h1>
  );
}

function getAllRoutes(permissions) {
  const allRoutes = [];
  Object.keys(permissions).forEach((key) => {
    if (Array.isArray(permissions[key])) {
      permissions[key].forEach((sub) => {
        if (subRouteMeta[sub]) {
          allRoutes.push({
            path: subRouteMeta[sub].url,
            title: sub,
          });
        }
      });
    }
  });
  return allRoutes;
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const allRoutes = getAllRoutes(userPermissions);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<AuthLayout />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        {/* Redirect root route to employee dashboard */}
        <Route index element={<Navigate to="/employee" replace />} />

        {/* employee routes */}
        <Route path="employee/*" element={<EmployeeRoutes />} />

        {/* admin routes */}
        <Route path="admin/*" element={<AdminRoutes />} />

        {/* sales routes */}
        <Route path="/*" element={<SalesRoutes />} />

        {/* finance routes */}
        <Route path="finance/*" element={<FinanceRoutes />} />

        {/* fallback "Coming Soon" routes based on permissions */}
        {allRoutes
          .filter(
            (route) =>
              !route.path.startsWith("") &&
              !route.path.startsWith("/employee/settings/") &&
              !route.path.startsWith("/employee/chat") &&
              !route.path.startsWith("/admin/settings/") &&
              !route.path.startsWith("/admin/") &&
              !route.path.startsWith("/contacts") &&
              !route.path.startsWith("/current-sales") &&
              !route.path.startsWith("/future-sales") &&
              !route.path.startsWith("/sales-settings") &&
              !route.path.startsWith("/finance") &&
              !route.path.startsWith("/sales-board") &&
              !route.path.startsWith("/my-things")
          )
          .map((route) => (
            <Route
              key={route.path}
              path={route.path.startsWith("/") ? route.path.slice(1) : route.path}
              element={<Page title={route.title} />}
            />
          ))}
      </Route>
    </Routes>
  );
}
