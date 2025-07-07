import React from "react"
import {
    ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function MessageContextMenu({ onEdit, onCopy, onReply, onForward, onPin, onSelect, onShare, onDelete, children }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={onEdit}>Edit</ContextMenuItem>
                <ContextMenuItem onClick={onCopy}>Copy</ContextMenuItem>
                <ContextMenuItem onClick={onReply}>Reply</ContextMenuItem>
                <ContextMenuItem onClick={onForward}>Forward</ContextMenuItem>
                <ContextMenuItem onClick={onPin}>Pin</ContextMenuItem>
                <ContextMenuItem onClick={onSelect}>Select</ContextMenuItem>
                <ContextMenuItem onClick={onShare}>Share</ContextMenuItem>
                <ContextMenuItem onClick={onDelete} className="text-red-500">Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}