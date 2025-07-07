import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"


export function TeamSwitcher({
  data,
}) {
  const [activeTeam, setActiveTeam] = React.useState(data?.teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-accent-foreground hover:bg-accent-foreground bg-accent-foreground data-[state=open]:text-sidebar-accent"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                {/* <activeTeam.logo className="size-4" /> */}
                <img src="/logo.png" alt="logo" />
              </div>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium">{activeTeam?.name}</span>
                {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) p-2 bg-accent-foreground text-accent border-none min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Select
            </DropdownMenuLabel>
            {data?.navMain?.map((team, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveTeam(team.title)}
                className="gap-2 p-2 cursor-pointer"
              >
                {team?.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <div className="grid gap-3 mt-4">
              <Button className="w-full bg-white/10 hover:bg-white/10 " variant="outlined">
                Switch Organazation
                <ChevronsUpDown />
              </Button>
              <Button className="w-full bg-white/10 hover:bg-white/10 " variant="outlined">
                Create Workspace
                <Plus />
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
