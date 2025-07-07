import { HeaderStats } from "./HeaderStats";
import { MyTasks } from "./MyTasks";
import { MyGoals } from "./MyGoals";
import { MyCourses } from "./MyCourses";
import { Timesheet } from "./Timesheet";
import { MyLeaves } from "./MyLeaves";
import { Birthdays } from "./Birthdays";
import { TypographyH1 } from "../../../components/custom/Typography";
import { TopTeamMembers } from "./TopTeamMembers";
import { LeavesThisWeek } from "./LeavesThisWeek";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <TypographyH1>Dashboard</TypographyH1>
            <HeaderStats />

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                <MyTasks />
                <MyGoals />
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
                <MyCourses />
                <Timesheet />
                <MyLeaves />
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
                <Birthdays />
                <TopTeamMembers />
                <LeavesThisWeek />
            </div>

        </div>
    );
}
