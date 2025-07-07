// tasks
import TaskBoard from "@/pages/employees/tasks/dashboard/TaskBoard";

// goals
import GoalsDashboard from "@/pages/employees/goals/GoalsDashboard";
import GoalsList from "@/pages/employees/goals/GoalsList";
import Achievement from "@/pages/employees/goals/Achievement";

// chat
import ChatWidget from "@/pages/employees/chatbot/ChatWidget";

// /attendance
import AttendanceCapture from "@/pages/employees/attendance/AttendanceCapture";

// calender
import LeaveOverview from "@/pages/employees/calender/LeavesOverview";

// settings
import { Routes, Route } from "react-router-dom";
import Profile from "@/pages/employees/settings/Profile";
import Inventory from "@/pages/employees/settings/Inventory";
import DocumentsList from "@/pages/employees/settings/DocumentsList";
import HolidayEmp from "@/pages/employees/settings/Holiday";
import Handbook from "@/pages/employees/settings/Handbook";
import LeavesPolicy from "@/pages/employees/settings/LeavesPolicy";
import Reimbursements from "@/pages/employees/settings/Reimbursements";

import { EmployeeTabs, EmployeeCalenderTabs, EmployeeGoalsTabs } from "@/components/custom/tabs/Tabs";
import Dashboard from "@/pages/employees/dashboard/Dashboard";
import LeavesCoff from "@/pages/employees/calender/LeavesCoff";

export default function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="" element={<Dashboard />} />

            <Route path="tasks/*">
                <Route index path="" element={<TaskBoard />} />
                <Route index path="goals-list" element={<GoalsList />} />
                <Route index path="achievement" element={<Achievement />} />
            </Route>

            <Route path="goals/*" element={<EmployeeGoalsTabs />}>
                <Route index path="dashboard" element={<GoalsDashboard />} />
                <Route index path="goals-list" element={<GoalsList />} />
                <Route index path="achievement" element={<Achievement />} />
            </Route>

            <Route path="chat" element={<ChatWidget />} />

            <Route path="attendance" element={<AttendanceCapture />} />

            <Route path="calendar/*" element={<EmployeeCalenderTabs />}>
                <Route path="leaves" element={<LeaveOverview />} />
                <Route path="c-offs" element={<LeavesCoff />} />
            </Route>

            <Route path="settings/*" element={<EmployeeTabs />}>
                <Route path="profile" element={<Profile />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="documents" element={<DocumentsList />} />
                <Route path="org-holidays" element={<HolidayEmp />} />
                <Route path="employee-handbook" element={<Handbook />} />
                <Route path="leaves-policy" element={<LeavesPolicy />} />
                <Route path="reimbursements" element={<Reimbursements />} />
            </Route>
        </Routes >
    );
}