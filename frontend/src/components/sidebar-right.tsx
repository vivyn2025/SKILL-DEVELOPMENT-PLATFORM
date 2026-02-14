import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { CheckCircle2, Clock, Target } from "lucide-react"

interface ProgressStats {
    totalSkills: number
    completed: number
    avgScore: number
    upcomingAssessments?: string[]
}

export function SidebarRight({
    user,
    progressStats,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    user: {
        name: string
        email: string
        avatar: string
    }
    progressStats?: ProgressStats
}) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const stats = progressStats || {
        totalSkills: 0,
        completed: 0,
        avgScore: 0,
        upcomingAssessments: [],
    }

    const completionRate = stats.totalSkills > 0
        ? Math.round((stats.completed / stats.totalSkills) * 100)
        : 0

    return (
        <Sidebar
            collapsible="none"
            className="sticky top-0 hidden h-svh border-l lg:flex"
            {...props}
        >
            <SidebarHeader className="border-sidebar-border h-16 border-b">
                <NavUser user={user} />
            </SidebarHeader>
            <SidebarContent>
                {/* Progress Overview */}
                <SidebarGroup>
                    <SidebarGroupLabel>Progress Overview</SidebarGroupLabel>
                    <SidebarGroupContent className="px-4 py-2">
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-muted-foreground">Completion</span>
                                    <span className="text-sm font-medium">{completionRate}%</span>
                                </div>
                                <Progress value={completionRate} className="h-2" />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <Card className="p-2 text-center">
                                    <div className="text-2xl font-bold text-primary">{stats.totalSkills}</div>
                                    <div className="text-xs text-muted-foreground">Skills</div>
                                </Card>
                                <Card className="p-2 text-center">
                                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                                    <div className="text-xs text-muted-foreground">Done</div>
                                </Card>
                                <Card className="p-2 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stats.avgScore}</div>
                                    <div className="text-xs text-muted-foreground">Avg</div>
                                </Card>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Calendar */}
                <SidebarGroup className="px-0">
                    <SidebarGroupLabel className="px-4">Study Calendar</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
                        />
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Upcoming Tasks */}
                <SidebarGroup>
                    <SidebarGroupLabel>Upcoming Tasks</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {stats.upcomingAssessments && stats.upcomingAssessments.length > 0 ? (
                                stats.upcomingAssessments.slice(0, 5).map((assessment, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton>
                                            <Clock className="size-4" />
                                            <span className="text-xs">{assessment}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            ) : (
                                <SidebarMenuItem>
                                    <SidebarMenuButton disabled>
                                        <CheckCircle2 className="size-4" />
                                        <span className="text-xs">All caught up!</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        Keep learning! 🚀
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
