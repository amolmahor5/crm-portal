import { Routes, Route } from "react-router-dom";
import AssignInventary from "@/pages/admin/AssignInventary";
import EmployeeDirectory from "@/pages/admin/EmployeeDirectory";
import RolePermissions from "@/pages/admin/RolePermissions";
import Invitations from "@/pages/admin/Invitations";

// attendace
import Dashboard from "@/pages/admin/attendance/Dashboard";
import AttendanceHistory from "@/pages/admin/attendance/AttendanceHistory";

// org
import OrganazationDetails from "@/pages/organazation/OrganazationDetails";
import Branding from "@/pages/organazation/Branding";
import PagesControl from "@/pages/organazation/PagesControl";
import ConfigureLeaveType from "@/pages/organazation/ConfigureLeaveType";
import DocumentList from "@/pages/organazation/DocumentList";
import Policy from "@/pages/organazation/Policy";
import Holiday from "@/pages/organazation/Holiday";
import Bussinessday from "@/pages/organazation/BussinessDay";
import DocumentSequence from "@/pages/organazation/DocumentSequence";
import SkillSets from "@/pages/organazation/SkillSets";
import LeaveManagement from "@/pages/organazation/LeaveManagement";
import Domains from "@/pages/organazation/Domains";
import DepartmentEmails from "@/pages/organazation/Emails";
import { RecordFace } from "@/pages/organazation/RecordFace";
import { Page } from "@/App";

import { AdminEmployeeManageTabs, OrganazationTabs, AttendanceTabs } from "@/components/custom/tabs/Tabs";
import ServiceRequest from "@/pages/admin/requests/ServiceRequest";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="myteam/*" element={<AdminEmployeeManageTabs />}>
                <Route path="members" element={<EmployeeDirectory />} />
                <Route path="permissions" element={<RolePermissions />} />
                <Route path="invitations" element={<Invitations />} />
            </Route>
            <Route path="attendance/*" element={<AttendanceTabs />}>
                <Route index element={<Dashboard />} />
                <Route path="history" element={<AttendanceHistory />} />
            </Route>

            <Route path="requests/*" element={<ServiceRequest />} />

            <Route path="settings/*" element={<OrganazationTabs />}>
                <Route index element={<OrganazationDetails />} />
                <Route path="branding" element={<Branding />} />
                <Route path="pages-control" element={<PagesControl />} />
                <Route path="billing" element={<Page title="Billing" />} />
                <Route path="leave-type" element={<ConfigureLeaveType />} />
                <Route path="document-list" element={<DocumentList />} />
                <Route path="policy" element={<Policy />} />
                <Route path="holidays" element={<Holiday />} />
                <Route path="business-days" element={<Bussinessday />} />
                <Route path="document-sequence" element={<DocumentSequence />} />
                <Route path="skill-sets" element={<SkillSets />} />
                <Route path="leave-management" element={<LeaveManagement />} />
                <Route path="domain" element={<Domains />} />
                <Route path="record-face" element={<RecordFace />} />
                <Route path="email-settings" element={<DepartmentEmails />} />
            </Route>
            <Route path="inventory" element={<AssignInventary />} />
        </Routes>
    );
}