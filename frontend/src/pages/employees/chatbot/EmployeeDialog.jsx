import React from "react"
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TypographyH3 } from "@/components/custom/Typography"
import { Check, X } from "lucide-react"

export default function EmployeeDialog({ open, setOpen, users, selectedUsers, setSelectedUsers }) {
    const allSelected = users.length > 0 && selectedUsers.length === users.length

    const handleToggleUser = (user) => {
        if (selectedUsers.some(u => u.email === user.email)) {
            setSelectedUsers(selectedUsers.filter(u => u.email !== user.email))
        } else {
            setSelectedUsers([...selectedUsers, user])
        }
    }

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(users)
        }
    }

    const handleInvite = () => {
        setOpen(false)
        // You can add invite logic here if needed
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle />
                    <TypographyH3 className="text-start">
                        Select Team
                    </TypographyH3>
                    <DialogDescription />
                </DialogHeader>
                <div className="flex justify-between items-center pb-2">
                    {
                        allSelected ?
                            <Button
                                variant={allSelected ? "secondary" : "outline"}
                                size="xs"
                                onClick={handleSelectAll}
                            >
                                <X />
                                Deselect All
                            </Button>
                            :
                            <Button
                                variant={allSelected ? "secondary" : "outline"}
                                size="xs"
                                onClick={handleSelectAll}
                            >
                                <Check />Select All
                            </Button>
                    }
                    <span className="text-xs text-muted-foreground">
                        {selectedUsers.length} selected
                    </span>
                </div>
                <div className="pb-4 space-y-2 max-h-72 overflow-y-auto">
                    {users.map(user => (
                        <div
                            key={user.email}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent transition ${selectedUsers.some(u => u.email === user.email) ? "bg-accent" : ""}`}
                            onClick={() => handleToggleUser(user)}
                        >
                            <Avatar className="border">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                            {selectedUsers.some(u => u.email === user.email) && (
                                <span className="text-primary font-bold text-lg">✓</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={handleInvite}
                        disabled={selectedUsers.length === 0}
                    >
                        Invite Team
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}