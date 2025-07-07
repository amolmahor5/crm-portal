import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { BreadcrumbData } from "../custom/Breadcrumb"

export default function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-4 p-4 sm:px-8 pt-22">
          <BreadcrumbData />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}