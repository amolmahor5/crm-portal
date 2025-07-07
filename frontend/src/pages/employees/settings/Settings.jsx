import { Outlet } from 'react-router-dom'
import { TypographyH1 } from '@/components/custom/Typography'
import SettingsNav from '@/components/SettingsNav'

const navigationLinks = [
    { label: "Profile", href: "/employee/settings/profile" },
    { label: "Inventory", href: "/employee/settings/inventory" },
    { label: "Documents", href: "/employee/settings/documents" },
    { label: "Holiday", href: "/employee/settings/org-holidays" },
    { label: "Employee Handbook", href: "/employee/settings/employee-handbook" },
    { label: "Leaves Policy", href: "/employee/settings/leaves-policy" },
    { label: "Reimbursements", href: "/employee/settings/reimbursements" },
]

export default function Settings() {
    return (
        <>
            <TypographyH1>
                Profile Settings
            </TypographyH1>
            <SettingsNav links={navigationLinks} />
            <Outlet />
        </>
    )
}