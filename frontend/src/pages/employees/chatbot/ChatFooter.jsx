"use client"

import React from "react"
import { ArrowUpIcon, PlusIcon, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CardFooter } from "@/components/ui/card"
import { Picker } from "emoji-mart"
import data from "@emoji-mart/data"

export default function ChatFooter({ input, setInput, inputLength, onSend }) {
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
    const emojiRef = React.useRef(null)

    // Hide emoji picker on outside click
    React.useEffect(() => {
        function handleClickOutside(e) {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setShowEmojiPicker(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji.native)
    }

    return (
        <>
            {/* Mobile Footer */}
            <form
                onSubmit={onSend}
                className="sm:hidden fixed bottom-0 left-0 w-full shadow-lg py-2 px-3 bg-white z-30 border-t"
            >
                <div className="flex gap-2 relative">
                    {/* Emoji Button */}
                    <div className="relative" ref={emojiRef}>
                        <Button
                            type="button"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <Smile className="w-4 h-4" />
                        </Button>
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0 z-50">
                                <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
                            </div>
                        )}
                    </div>

                    {/* Attachment Button */}
                    <Button
                        size="icon"
                        type="button"
                        className="size-8 rounded-full"
                        tabIndex={-1}
                    >
                        <PlusIcon />
                    </Button>

                    {/* Text Input */}
                    <Textarea
                        id="message"
                        rows={1}
                        placeholder="Type your message..."
                        className="flex-1 text-xs shadow-none resize-none border-none outline-none focus:ring-0 focus-visible:ring-0"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {/* Send Button */}
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute top-4 right-4 -translate-y-1/2 size-8 rounded-full"
                        disabled={inputLength === 0}
                    >
                        <ArrowUpIcon className="size-5" />
                    </Button>
                </div>
            </form>

            {/* Desktop Footer */}
            <CardFooter className="hidden sm:block border-t p-4">
                <form onSubmit={onSend} className="w-full relative">
                    <div className="flex gap-3">
                        {/* Emoji Picker */}
                        <div className="relative" ref={emojiRef}>
                            <Button
                                type="button"
                                size="icon"
                                className="size-8 rounded-full"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile className="w-5 h-5" />
                            </Button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-12 left-0 z-50">
                                    <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
                                </div>
                            )}
                        </div>

                        {/* Attachment Button */}
                        <Button
                            size="icon"
                            type="button"
                            className="size-8 rounded-full"
                            tabIndex={-1}
                        >
                            <PlusIcon />
                        </Button>

                        {/* Text Input */}
                        <Textarea
                            id="message"
                            rows={1}
                            placeholder="Type your message..."
                            className="flex-1 shadow-none resize-none border-none outline-none text-xs focus:ring-0 focus-visible:ring-0"
                            autoComplete="off"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        {/* Send Button */}
                        <Button
                            type="submit"
                            size="icon"
                            className="size-8 rounded-full"
                            disabled={inputLength === 0}
                        >
                            <ArrowUpIcon className="size-5" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </>
    )
}
