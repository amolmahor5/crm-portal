import React from "react"
import { PlusIcon, CheckCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TypographyH3 } from "@/components/custom/Typography"

export default function ChatSidebar({ employeeList, selectedEmployee, onEmployeeClick, onNewInvite }) {
    return (
        <div className="w-full sm:h-[86vh] sm:w-96 sm:border-r sm:pr-3 space-y-4 overflow-y-auto bg-background transition-all duration-200">
            <div className="flex justify-between items-center">
                <TypographyH3>Chats</TypographyH3>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="ml-auto size-8 rounded-full"
                                onClick={onNewInvite}
                            >
                                <PlusIcon />
                                <span className="sr-only">New Invite</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={10}>New Invite</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="space-y-2">
                {employeeList.map((emp) => (
                    <div
                        key={emp.email}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition",
                            selectedEmployee.email === emp.email && "bg-accent"
                        )}
                        onClick={() => onEmployeeClick(emp)}
                    >
                        <Avatar className="border">
                            <AvatarImage src={emp.avatar} alt={emp.name} />
                            <AvatarFallback>{emp.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-medium truncate">{emp.name}</p>
                                <span className="text-xs text-muted-foreground">{emp.lastTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground truncate flex-1">{emp.lastMsg}</span>
                                {emp.seen ? (
                                    <CheckCheck className="text-blue-500 w-4 h-4 ml-1" />
                                ) : (
                                    <Check className="text-muted-foreground w-4 h-4 ml-1" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}