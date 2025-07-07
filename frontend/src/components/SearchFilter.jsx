"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SearchFilter({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}) {
    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full appearance-none bg-background pl-8 shadow-none"
            />
        </div>
    )
}
