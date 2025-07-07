"use client"

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    LabelList,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { TypographyH1, TypographyH3 } from "@/components/custom/Typography"
import { Label } from "@/components/ui/label"
import { RefreshCcw } from "lucide-react"

// Example project data (replace with API data as needed)
const PROJECTS = [
    { id: 1, name: "Website Redesign", status: "Created" },
    { id: 2, name: "CRM Integration", status: "Planned" },
    { id: 3, name: "Marketing Campaign", status: "In Progress" },
    { id: 4, name: "Product Launch", status: "On Hold" },
    { id: 5, name: "Bug Fix Sprint", status: "Review" },
    { id: 6, name: "Customer Onboarding", status: "Delivered" },
    { id: 7, name: "API Development", status: "Closed" },
]

const STATUS_ORDER = [
    "Planned",
    "Created",
    "In Progress",
    "Review",
    "On Hold",
    "Closed",
    "Delivered",
]

const STATUS_COLORS = {
    "Planned": "#d1d5db",
    "Created": "#3b82f6",
    "In Progress": "#facc15",
    "Review": "#818cf8",
    "On Hold": "#fb923c",
    "Closed": "#f87171",
    "Delivered": "#22c55e",
}

// Pie chart data: count of projects per status
const PIE_DATA = STATUS_ORDER.map((status) => ({
    name: status,
    value: PROJECTS.filter((p) => p.status === status).length,
    fill: STATUS_COLORS[status],
})).filter((d) => d.value > 0)

// Bar chart data: example, replace with real onTime/delayed data if available
const BAR_CHART_DATA = STATUS_ORDER.map((status) => ({
    status,
    onTime: Math.floor(Math.random() * 10),
    delayed: Math.floor(Math.random() * 5),
}))

const chartConfig = {
    onTime: {
        label: "On Time",
        color: "#3b82f6",
    },
    delayed: {
        label: "Delayed",
        color: "#f87171",
    },
}

export default function ProjectsOverview() {
    const statusCounts = STATUS_ORDER.map((status) => ({
        name: status,
        count: PROJECTS.filter((p) => p.status === status).length,
        color: STATUS_COLORS[status],
    }))

    return (
        <div className="space-y-8">
            <TypographyH1>Projects Overview</TypographyH1>

            {/* Grid: Status Summary + Pie Chart + Bar Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <Card>
                    <TypographyH3>Projects Status</TypographyH3>
                    <CardContent className="space-y-6 p-0">
                        <ChartContainer config={{}}>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie
                                        data={PIE_DATA}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={80}
                                        label={({ name, percent }) =>
                                            `${name} (${(percent * 100).toFixed(0)}%)`
                                        }
                                    >
                                        {PIE_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>

                        <div className="grid grid-cols-2 gap-3">
                            {statusCounts.map((status) => (
                                <div
                                    key={status.name}
                                    className="flex items-center gap-4 border p-3 rounded-md"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex justify-center items-center"
                                        style={{ backgroundColor: status.color }}
                                    >
                                        <RefreshCcw size={18} color="white" />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label>{status.name}</Label>
                                        <TypographyH3 className="text-lg">
                                            {status.count}
                                        </TypographyH3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card className="h-fit">
                    <TypographyH3>On Time vs Delayed</TypographyH3>
                    <CardContent className="p-0">
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={BAR_CHART_DATA}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 0,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis dataKey="status" tickLine={false} axisLine={false} />
                                    <YAxis />
                                    <Bar dataKey="onTime" fill={chartConfig.onTime.color} radius={6}>
                                        <LabelList
                                            position="top"
                                            offset={12}
                                            className="fill-foreground"
                                            fontSize={12}
                                        />
                                    </Bar>
                                    <Bar dataKey="delayed" fill={chartConfig.delayed.color} radius={6}>
                                        <LabelList
                                            position="top"
                                            offset={12}
                                            className="fill-foreground"
                                            fontSize={12}
                                        />
                                    </Bar>
                                    <ChartLegend content={<ChartLegendContent />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}