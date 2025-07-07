import {
    SquareTerminal as SquareTerminalIcon,
    ClipboardList as ClipboardListIcon,
    Goal as GoalIcon,
    Clock as ClockIcon,
    Globe as GlobeIcon,
    MessageCircle as MessageCircleIcon,
    Calendar as CalendarIcon,
    Settings2 as Settings2Icon,
    UserCheck as UserCheckIcon,
    BookOpen,
    FileText as FileTextIcon,
    Users2,
    FileArchive,
    Briefcase as BriefcaseIcon,
    UserPlus as UserPlusIcon,
    FileQuestion,
    DollarSign,
    CreditCard,
    Wallet,
    ShoppingCart,
    BarChart,
    ListChecks,
    Bot,
    Target,
    BadgeIndianRupee,
    TicketsPlane,
    Settings,
    HandCoins,
    CirclePercent,
    ChartSpline,
    Kanban,
} from "lucide-react"

// Sub-route metadata
export const subRouteMeta = {
    Dashboard: { icon: SquareTerminalIcon, url: "/" },
    organizations: { icon: Users2, url: "/superadmin/organizations/list" },
    Forms: { icon: FileTextIcon, url: "/forms" },

    // Employee
    Tasks: { icon: ClipboardListIcon, url: "/employee/tasks" },
    Goals: { icon: GoalIcon, url: "/employee/goals/dashboard" },
    "Log Hours": { icon: ClockIcon, url: "/employee/loghours" },
    "Website Pages": { icon: GlobeIcon, url: "/employee/blogs" },
    Chat: { icon: MessageCircleIcon, url: "/employee/chat" },
    Calendar: { icon: CalendarIcon, url: "/employee/calendar/leaves" },
    Settings: { icon: Settings, url: "/employee/settings/profile" },
    Attendance: { icon: UserCheckIcon, url: "/employee/attendance" },

    Projects: { icon: Target, url: "/projects" },

    // Learning
    "My Courses": { icon: BookOpen, url: "/learning/mycourses" },
    "Manage Courses": { icon: FileTextIcon, url: "/learning/courses" },

    // Admin
    Employees: { icon: Users2, url: "/admin/myteam/members" },
    "Admin Settings": { icon: Settings2Icon, url: "/admin/settings" },
    Attendances: { icon: UserCheckIcon, url: "/admin/attendance" },
    Inventory: { icon: FileArchive, url: "/admin/inventory" },

    // Hiring
    Jobs: { icon: BriefcaseIcon, url: "/hiring/jobs" },
    Candidates: { icon: UserPlusIcon, url: "/hiring/candidates" },
    "Question Papers": { icon: FileQuestion, url: "/hiring/question-papers" },

    // Finance
    "Finance Board": { icon: HandCoins, url: "/finance/board" },
    Transactions: { icon: CreditCard, url: "/finance/transactions" },
    Payrolls: { icon: Wallet, url: "/finance/payrolls" },
    Purchases: { icon: ShoppingCart, url: "/finance/purchases" },
    Income: { icon: BadgeIndianRupee, url: "/finance/income" },
    Reports: { icon: TicketsPlane, url: "/finance/reports/profit-loss" },
    Setting: { icon: Settings, url: "/finance/settings" },

    // Service Requests
    Requests: { icon: ListChecks, url: "/admin/requests" },

    // Marketing
    Marketing: { icon: GlobeIcon, url: "/marketing" },
    Subscribers: { icon: Users2, url: "/subscribers" },
    Campaigns: { icon: ClipboardListIcon, url: "/campaigns" },
    Scheduling: { icon: CalendarIcon, url: "/scheduling" },
    "Social Posts": { icon: MessageCircleIcon, url: "/social-posts" },
    Blogs: { icon: FileTextIcon, url: "/blogs" },

    // Sales
    "Sales Board": { icon: Kanban, url: "/sales-board" },
    Contacts: { icon: Users2, url: "/contacts" },
    "My Things": { icon: Bot, url: "/my-things" },
    "Current Sales": { icon: CirclePercent, url: "/current-sales" },
    "Future Sales": { icon: ChartSpline, url: "/future-sales" },
    "Sales Settings": { icon: Settings2Icon, url: "/sales-settings" },
    "Website Stuff": { icon: GlobeIcon, url: "/website-stuff" },
}

// MODULE → SUBROUTES mapping
export const moduleSubRoutes = {
    employee: ["Dashboard", "Tasks", "Goals", "Log Hours", "Website Pages", "Chat", "Calendar", "Settings", "Attendance"],
    projects: ["Projects"],
    learning: ["My Courses", "Manage Courses"],
    administration: ["Employees", "Attendances", "Admin Settings", "Inventory"],
    hiring: ["Jobs", "Candidates", "Question Papers"],
    finance: ["Finance Board", "Transactions", "Payrolls", "Purchases", "Income", "Reports", "Setting"],
    marketing: ["Marketing", "Subscribers", "Campaigns", "Scheduling", "Social Posts", "Blogs"],
    sales: ["Sales Board", "Contacts", "My Things", "Current Sales", "Future Sales", "Sales Settings", "Website Stuff"],
    serviceRequest: ["Requests"],
    superadmin: ["Dashboard", "organizations", "Forms"],
}

// Role → modules access
export const roleAccess = {
    superadmin: Object.keys(moduleSubRoutes),
    admin: ["employee", "projects", "learning", "administration", "hiring", "finance", "marketing", "sales", "serviceRequest"],
    hrAdmin: ["employee", "hiring", "learning", "administration", "finance"],
    HR: ["employee", "hiring", "finance"],
    PayrollHR: ["employee", "finance"],
    financeAdmin: ["finance", "employee"],
    marketing: ["marketing", "employee"],
    sales: ["sales", "employee"],
    teamlead: ["employee", "projects"],
    manager: ["employee", "projects", "finance", "sales"],
    employee: ["employee"],
}

// Permissions example
export const userPermissions = {
    permissions: {
        employee_crud: { createAllowed: true, updateAllowed: true, deleteAllowed: true },
        project_crud: { createAllowed: true, updateAllowed: true, deleteAllowed: true },
        finance_crud: { createAllowed: true, updateAllowed: false, deleteAllowed: false },
    }
}

// Module order
const MODULE_ORDER = [
    "employee", "projects", "learning", "administration",
    "hiring", "finance", "marketing", "sales", "serviceRequest", "superadmin"
]

// ✅ MAIN FUNCTION: Get routes per role
export function getRoutesForRole(role) {
    const modules = roleAccess[role] || []
    const permissions = userPermissions.permissions || {}

    let routes = []

    MODULE_ORDER.forEach((module) => {
        if (!modules.includes(module)) return
        const subRoutes = moduleSubRoutes[module] || []
        subRoutes.forEach((sub) => {
            if (subRouteMeta[sub]) {
                routes.push({
                    name: sub,
                    url: subRouteMeta[sub].url,
                    icon: subRouteMeta[sub].icon,
                    module,
                    permissions: permissions[`${module}_crud`] || null,
                })
            }
        })
    })

    // Deduplicate by URL
    const seen = new Set()
    return routes.filter((route) => {
        if (seen.has(route.url)) return false
        seen.add(route.url)
        return true
    })
}
