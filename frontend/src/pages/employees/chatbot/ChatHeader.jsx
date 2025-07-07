import React from "react"
import { ArrowLeft, PhoneCall, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function ChatHeader({ selectedEmployee, onBack }) {
    return (
        <div className="w-full bg-background z-50 sm:shadow-none sm:border-b sm:pb-2 shadow px-3 py-4 h-18
                        fixed top-0 left-0 md:static md:top-auto md:left-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ArrowLeft onClick={onBack} className="md:hidden" />
                    <Avatar className="border">
                        <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                        <AvatarFallback>{selectedEmployee.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-sm leading-none font-medium">{selectedEmployee.name}</p>
                        <p className="text-muted-foreground text-xs">{selectedEmployee.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="size-8 rounded-full" size="icon">
                        <PhoneCall />
                    </Button>
                    <Button className="size-8 rounded-full" size="icon">
                        <Video />
                    </Button>
                </div>
            </div>
        </div>
    )
}
