"use client"

import * as React from "react"
import {
    BookOpen,
    GraduationCap,
    LayoutDashboard,
    LineChart,
    Target,
    Trophy,
    Shield,
} from "lucide-react"

import { NavSkills } from "@/components/nav-skills"
import { SkillCategories } from "@/components/skill-categories"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

export function SidebarLeft({
    skillCategories,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    skillCategories?: {
        name: string
        skills: {
            id: string
            name: string
            progress: number
            level: number
        }[]
    }[]
}) {
    const { user } = useAuth()

    const teams = [
        {
            name: "Luminary",
            logo: GraduationCap,
            plan: user?.role === "admin" ? "Admin" : "Student",
        },
    ]

    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Assessments",
            url: "/assessment/1",
            icon: BookOpen,
        },
        {
            title: "Gap Analysis",
            url: "/gap-analysis",
            icon: Target,
            badge: skillCategories?.reduce((acc, cat) =>
                acc + cat.skills.filter(s => s.progress < 80).length, 0
            ).toString(),
        },
        {
            title: "Learning Path",
            url: "/learning-path",
            icon: LineChart,
        },
        {
            title: "Achievements",
            url: "#",
            icon: Trophy,
        },
    ]

    const navSecondary = user?.role === "admin" ? [
        {
            title: "Admin Dashboard",
            url: "/admin",
            icon: Shield,
        },
        {
            title: "Manage Skills",
            url: "/admin/skills",
            icon: BookOpen,
        },
        {
            title: "Manage Assessments",
            url: "/admin/assessments",
            icon: Shield,
        },
        {
            title: "User Management",
            url: "/admin/users",
            icon: GraduationCap,
        },
    ] : []

    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={teams} />
                <NavSkills items={navMain} />
            </SidebarHeader>
            <SidebarContent>
                {skillCategories && skillCategories.length > 0 && (
                    <>
                        <SidebarSeparator />
                        <SkillCategories categories={skillCategories} />
                    </>
                )}
            </SidebarContent>
            {navSecondary.length > 0 && (
                <SidebarFooter>
                    <NavSkills items={navSecondary} />
                </SidebarFooter>
            )}
            <SidebarRail />
        </Sidebar>
    )
}
