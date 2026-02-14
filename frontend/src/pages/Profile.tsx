"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Mail,
    Calendar,
    Award,
    TrendingUp,
    Target,
    Flame,
    Edit2,
    Camera,
    Share2,
    Download,
    Trophy,
    BookOpen,
    Star,
    Zap,
    CheckCircle2,
} from "lucide-react"

import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { progress as progressApi } from "@/lib/api"
import { useNavigate } from "react-router-dom"

interface Achievement {
    id: string
    title: string
    description: string
    icon: React.ElementType
    earned: boolean
    earnedDate?: string
    color: string
}

const achievements: Achievement[] = [
    {
        id: "1",
        title: "First Steps",
        description: "Complete your first assessment",
        icon: Award,
        earned: true,
        earnedDate: "2024-01-15",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "2",
        title: "Quick Learner",
        description: "Score 90% or higher on any assessment",
        icon: Zap,
        earned: true,
        earnedDate: "2024-01-20",
        color: "from-yellow-500 to-orange-500",
    },
    {
        id: "3",
        title: "Consistent",
        description: "Maintain a 7-day learning streak",
        icon: Flame,
        earned: true,
        earnedDate: "2024-02-01",
        color: "from-red-500 to-pink-500",
    },
    {
        id: "4",
        title: "Master",
        description: "Complete 5 skills to expert level",
        icon: Trophy,
        earned: false,
        color: "from-purple-500 to-indigo-500",
    },
    {
        id: "5",
        title: "Overachiever",
        description: "Complete all assessments in a category",
        icon: Star,
        earned: false,
        color: "from-green-500 to-teal-500",
    },
]

export default function ProfilePage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    React.useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const { data: skillsProgress = [] } = useQuery({
        queryKey: ["progress"],
        queryFn: progressApi.getAll,
        enabled: !!user,
    })

    // Calculate stats
    const totalSkills = skillsProgress.length
    const completedSkills = skillsProgress.filter(
        (s: any) => s.currentLevel >= s.targetLevel
    ).length
    const avgScore = totalSkills > 0
        ? Math.round(skillsProgress.reduce((a: number, s: any) => a + s.score, 0) / totalSkills)
        : 0

    // Learning streak (mock - would come from backend)
    const learningStreak = 12

    // Activity heatmap data (mock - last 12 weeks)
    const activityData = React.useMemo(() => {
        const weeks = 12
        const data = []
        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < 7; day++) {
                data.push({
                    week,
                    day,
                    count: Math.floor(Math.random() * 5),
                })
            }
        }
        return data
    }, [])

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const skillCategories = React.useMemo(() => {
        const grouped: Record<string, any[]> = {}
        skillsProgress.forEach((skill: any) => {
            const category = skill.category || "Other"
            if (!grouped[category]) {
                grouped[category] = []
            }
            grouped[category].push({
                id: skill.id,
                name: skill.name,
                progress: (skill.currentLevel / skill.targetLevel) * 100,
                level: skill.currentLevel,
            })
        })
        return Object.entries(grouped).map(([name, skills]) => ({
            name,
            skills,
        }))
    }, [skillsProgress])

    const userData = {
        name: user?.name || "User",
        email: user?.email || "",
        avatar: "",
    }

    const progressStats = {
        totalSkills,
        completed: completedSkills,
        avgScore,
    }

    return (
        <SidebarProvider>
            <SidebarLeft skillCategories={skillCategories} />
            <SidebarInset>
                <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Profile</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-6 p-6">
                    {/* Profile Header Card with 3D Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden"
                    >
                        <Card className="border-none bg-gradient-to-br from-primary/10 via-background to-accent/10">
                            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
                            <CardContent className="p-8 relative">
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    {/* Profile Avatar with 3D hover effect */}
                                    <motion.div
                                        className="relative group"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-primary/50">
                                                    {getInitials(userData.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Camera className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>

                                    {/* Profile Info */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h1 className="text-3xl font-bold font-['Space_Grotesk']">
                                                {userData.name}
                                            </h1>
                                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                                <Mail className="h-4 w-4" />
                                                {userData.email}
                                            </p>
                                            <Badge variant="secondary" className="mt-2">
                                                {user?.role === "admin" ? "Administrator" : "Student"}
                                            </Badge>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button onClick={() => navigate("/account")} variant="outline">
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                            <Button variant="outline" onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                // Could add toast here
                                            }}>
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Share Profile
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-4 md:gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary">{totalSkills}</div>
                                            <div className="text-xs text-muted-foreground">Skills</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">{completedSkills}</div>
                                            <div className="text-xs text-muted-foreground">Completed</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600">{avgScore}%</div>
                                            <div className="text-xs text-muted-foreground">Avg Score</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Learning Streak */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Flame className="h-5 w-5 text-orange-500" />
                                        Learning Streak
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-4xl font-bold text-orange-500">
                                                {learningStreak} days
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Keep it up! 🔥
                                            </p>
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                            <Flame className="h-16 w-16 text-orange-500" />
                                        </motion.div>
                                    </div>

                                    {/* Activity Heatmap */}
                                    <div className="mt-6">
                                        <p className="text-sm font-medium mb-3">Activity (Last 12 weeks)</p>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 12 }).map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-col gap-1">
                                                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                        const activity = activityData.find(
                                                            (a) => a.week === weekIndex && a.day === dayIndex
                                                        )
                                                        const intensity = activity?.count || 0
                                                        return (
                                                            <motion.div
                                                                key={`${weekIndex}-${dayIndex}`}
                                                                className={`w-3 h-3 rounded-sm ${intensity === 0
                                                                    ? "bg-muted"
                                                                    : intensity === 1
                                                                        ? "bg-primary/20"
                                                                        : intensity === 2
                                                                            ? "bg-primary/40"
                                                                            : intensity === 3
                                                                                ? "bg-primary/60"
                                                                                : "bg-primary"
                                                                    }`}
                                                                whileHover={{ scale: 1.5 }}
                                                                title={`${intensity} activities`}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Skills Progress Rings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Skills by Category
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {skillCategories.map((category) => {
                                            const avgProgress =
                                                category.skills.reduce((a, s) => a + s.progress, 0) /
                                                category.skills.length
                                            return (
                                                <div key={category.name} className="text-center">
                                                    <div className="relative inline-flex items-center justify-center mb-2">
                                                        <svg className="w-24 h-24">
                                                            <circle
                                                                className="text-muted stroke-current"
                                                                strokeWidth="6"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r="40"
                                                                cx="48"
                                                                cy="48"
                                                            />
                                                            <circle
                                                                className="text-primary stroke-current"
                                                                strokeWidth="6"
                                                                strokeDasharray={`${avgProgress * 2.51}, 251`}
                                                                strokeLinecap="round"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r="40"
                                                                cx="48"
                                                                cy="48"
                                                                transform="rotate(-90 48 48)"
                                                            />
                                                        </svg>
                                                        <span className="absolute text-xl font-bold">
                                                            {Math.round(avgProgress)}%
                                                        </span>
                                                    </div>
                                                    <p className="font-medium text-sm">{category.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {category.skills.length} skills
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Achievements */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-yellow-500" />
                                        Achievements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {achievements.map((achievement) => (
                                            <motion.div
                                                key={achievement.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`p-4 rounded-lg border ${achievement.earned
                                                    ? "bg-gradient-to-r " + achievement.color + " text-white border-transparent"
                                                    : "bg-muted/30 border-border grayscale"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2 rounded-full ${achievement.earned ? "bg-white/20" : "bg-muted"
                                                            }`}
                                                    >
                                                        <achievement.icon className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-sm">
                                                            {achievement.title}
                                                        </h3>
                                                        <p
                                                            className={`text-xs ${achievement.earned ? "text-white/80" : "text-muted-foreground"
                                                                }`}
                                                        >
                                                            {achievement.description}
                                                        </p>
                                                        {achievement.earned && achievement.earnedDate && (
                                                            <p className="text-xs text-white/60 mt-1">
                                                                Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {achievement.earned && (
                                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarInset>
            <SidebarRight user={userData} progressStats={progressStats} />
        </SidebarProvider>
    )
}
