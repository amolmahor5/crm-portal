"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import ChatSidebar from "./ChatSidebar"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatFooter from "./ChatFooter"
import EmployeeDialog from "./EmployeeDialog"

// --- Helpers ---
function randomTime() {
    const hour = Math.floor(Math.random() * 12) + 1
    const minute = Math.floor(Math.random() * 60)
    const ampm = Math.random() > 0.5 ? "AM" : "PM"
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`
}
function randomDate(start = new Date(2025, 5, 1), end = new Date(2025, 5, 28)) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split("T")[0]
}
function generateMockMessages(count = 100) {
    const roles = ["user", "agent"]
    const contents = [
        "Hello!", "How can I help you?", "I'm having trouble with my account.",
        "Sure, let me check.", "Thank you!", "Can you provide more details?",
        "I can't log in.", "Try resetting your password.", "It worked, thanks!",
        "You're welcome!", "Is there anything else?", "No, that's all.",
        "Have a great day!", "You too!", "What is your email?", "m@example.com",
        "Please wait a moment.", "Okay.", "Done.", "Received.",
    ]
    const messages = []
    for (let i = 0; i < count; i++) {
        const date = randomDate()
        messages.push({
            id: i + 1,
            role: roles[Math.floor(Math.random() * roles.length)],
            content: contents[Math.floor(Math.random() * contents.length)],
            time: randomTime(),
            date,
            seen: Math.random() > 0.5,
            emojis: [],
        })
    }
    messages.sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? -1 : 1))
    return messages
}
const users = [
    { name: "Olivia Martin", email: "m@example.com", avatar: "/avatars/01.png" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", avatar: "/avatars/03.png" },
    { name: "Emma Wilson", email: "emma@example.com", avatar: "/avatars/05.png" },
    { name: "Jackson Lee", email: "lee@example.com", avatar: "/avatars/02.png" },
    { name: "William Kim", email: "will@email.com", avatar: "/avatars/04.png" },
]
function groupMessagesByDate(messages) {
    const groups = {}
    messages.forEach((msg) => {
        if (!groups[msg.date]) groups[msg.date] = []
        groups[msg.date].push(msg)
    })
    return groups
}
function getLastMessage(messages) {
    if (!messages.length) return null
    return messages[messages.length - 1]
}

// --- Main Widget ---
export default function ChatWidget() {
    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState([])
    const [selectedEmployee, setSelectedEmployee] = React.useState(users[0])
    const [showChat, setShowChat] = React.useState(typeof window !== "undefined" ? window.innerWidth >= 640 : true)
    const [messages, setMessages] = React.useState(() => generateMockMessages(100))
    const [input, setInput] = React.useState("")
    const inputLength = input.trim().length

    const messagesEndRef = React.useRef(null)
    const chatContentRef = React.useRef(null)
    const [showScrollDown, setShowScrollDown] = React.useState(false)

    const handleContextMenuAction = (action, message) => {
        if (action === "copy") {
            navigator.clipboard.writeText(message.content)
        }
        // Implement other actions as needed
    }

    const handleEmojiSend = (msg, emoji) => {
        setMessages((prev) =>
            prev.map((m) =>
                m.id === msg.id
                    ? { ...m, emojis: [...(m.emojis || []), emoji] }
                    : m
            )
        )
    }

    React.useEffect(() => {
        function handleResize() {
            setShowChat(window.innerWidth >= 640)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, showChat])

    React.useEffect(() => {
        function handleScroll() {
            if (!chatContentRef.current) return
            const { scrollTop, scrollHeight, clientHeight } = chatContentRef.current
            setShowScrollDown(scrollTop + clientHeight < scrollHeight - 100)
        }
        const ref = chatContentRef.current
        if (ref) ref.addEventListener("scroll", handleScroll)
        return () => {
            if (ref) ref.removeEventListener("scroll", handleScroll)
        }
    }, [chatContentRef, showChat])

    const grouped = groupMessagesByDate(messages)
    const employeeList = users.map((user, idx) => {
        const perUser = Math.floor(messages.length / users.length)
        const userMessages = messages.slice(idx * perUser, (idx + 1) * perUser)
        const lastMsg = getLastMessage(userMessages)
        return {
            ...user,
            lastMsg: lastMsg ? lastMsg.content : "",
            lastTime: lastMsg ? lastMsg.time : "",
            seen: lastMsg ? lastMsg.seen : false,
        }
    })

    function handleEmployeeClick(user) {
        setSelectedEmployee(user)
        if (window.innerWidth < 640) setShowChat(true)
    }
    function handleBackToList() {
        if (window.innerWidth < 640) setShowChat(false)
    }
    function handleSend(event) {
        event.preventDefault()
        if (inputLength === 0) return
        const now = new Date()
        const hour = now.getHours() % 12 || 12
        const minute = now.getMinutes().toString().padStart(2, "0")
        const ampm = now.getHours() >= 12 ? "PM" : "AM"
        const time = `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`
        const date = now.toISOString().split("T")[0]
        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                role: "user",
                content: input,
                time,
                date,
                seen: false,
                emojis: [],
            },
        ])
        setInput("")
    }
    function handleScrollDown() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="flex w-full">
            {/* Left: Sidebar */}
            <div className={cn(showChat ? "hidden sm:block" : "block", "w-full sm:w-96")}>
                <ChatSidebar
                    employeeList={employeeList}
                    selectedEmployee={selectedEmployee}
                    onEmployeeClick={handleEmployeeClick}
                    onNewInvite={() => setOpen(true)}
                />
            </div>
            {/* Right: Main Chat */}
            <div className={cn("w-full sm:h-[86vh] flex flex-col relative bg-background transition-all duration-200", showChat ? "block" : "hidden sm:flex")}>
                <ChatHeader selectedEmployee={selectedEmployee} onBack={handleBackToList} />
                <ChatMessages
                    grouped={grouped}
                    messagesEndRef={messagesEndRef}
                    showScrollDown={showScrollDown}
                    onScrollDown={handleScrollDown}
                    chatContentRef={chatContentRef}
                    onEmojiSend={handleEmojiSend}
                    onContextMenuAction={handleContextMenuAction}
                />
                <ChatFooter
                    input={input}
                    setInput={setInput}
                    inputLength={inputLength}
                    onSend={handleSend}
                />
            </div>
            <EmployeeDialog
                open={open}
                setOpen={setOpen}
                users={users}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
            />
        </div>
    )
}