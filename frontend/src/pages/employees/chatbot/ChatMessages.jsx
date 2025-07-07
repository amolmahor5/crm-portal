import React from "react"
import { ChevronsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Picker } from "emoji-mart"
import data from "@emoji-mart/data"
import MessageContextMenu from "./MessageContextMenu"

function formatDateBadge(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB")
}

export default function ChatMessages({
    grouped,
    messagesEndRef,
    showScrollDown,
    onScrollDown,
    chatContentRef,
    onEmojiSend,
    onContextMenuAction
}) {
    const [longPressMsgId, setLongPressMsgId] = React.useState(null)
    const longPressTimer = React.useRef(null)

    const handleLongPressStart = (msgId) => {
        longPressTimer.current = setTimeout(() => {
            setLongPressMsgId(msgId)
        }, 400)
    }

    const handleLongPressEnd = () => {
        clearTimeout(longPressTimer.current)
    }

    return (
        <CardContent
            ref={chatContentRef}
            className={cn(
                "flex-1 px-0 sm:px-4 overflow-y-auto sm:max-h-[65vh] pb-12 scrollbar-hide relative"
            )}
        >
            <div className="flex flex-col gap-4">
                {Object.entries(grouped).map(([date, msgs]) => (
                    <React.Fragment key={date}>
                        <div className="flex justify-center items-center my-2">
                            <Badge variant="secondary" className="font-normal">
                                {formatDateBadge(date)}
                            </Badge>
                        </div>
                        {msgs.map((message) => (
                            <div key={message.id} className="relative">
                                <MessageContextMenu
                                    onEdit={() => onContextMenuAction("edit", message)}
                                    onCopy={() => onContextMenuAction("copy", message)}
                                    onReply={() => onContextMenuAction("reply", message)}
                                    onForward={() => onContextMenuAction("forward", message)}
                                    onPin={() => onContextMenuAction("pin", message)}
                                    onSelect={() => onContextMenuAction("select", message)}
                                    onShare={() => onContextMenuAction("share", message)}
                                    onDelete={() => onContextMenuAction("delete", message)}
                                >
                                    <div
                                        className={cn(
                                            // Fixed bubble styles
                                            "break-words whitespace-pre-wrap w-fit min-w-[100px] max-w-[75%] sm:max-w-[60%] flex flex-col gap-1 rounded-lg px-3 py-2 text-xs select-text leading-relaxed",
                                            message.role === "user"
                                                ? "bg-primary text-primary-foreground ml-auto "
                                                : "bg-muted"
                                        )}
                                        onTouchStart={() => handleLongPressStart(message.id)}
                                        onTouchEnd={handleLongPressEnd}
                                        onTouchCancel={handleLongPressEnd}
                                    >
                                        <span>{message.content}</span>
                                        <span
                                            className={cn(
                                                "text-[10px] text-right block",
                                                message.role === "user"
                                                    ? "text-secondary"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {message.time}
                                        </span>
                                        {message.emojis?.length > 0 && (
                                            <div className="flex gap-1 mt-1">
                                                {message.emojis.map((e, i) => (
                                                    <span key={i} className="text-lg">{e}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </MessageContextMenu>

                                {longPressMsgId === message.id && (
                                    <div className="absolute left-1/2 -translate-x-1/2 z-50">
                                        <Picker
                                            data={data}
                                            theme="light"
                                            onEmojiSelect={(emoji) => {
                                                onEmojiSend(message, emoji.native)
                                                setLongPressMsgId(null)
                                            }}
                                            navPosition="bottom"
                                            previewPosition="none"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {showScrollDown && (
                <Button
                    size="icon"
                    className="fixed bottom-24 right-8 z-50"
                    onClick={onScrollDown}
                >
                    <ChevronsDown className="w-5 h-5" />
                </Button>
            )}
        </CardContent>
    )
}
