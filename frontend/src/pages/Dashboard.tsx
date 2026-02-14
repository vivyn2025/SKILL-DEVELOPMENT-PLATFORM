"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle, TrendingUp, AlertTriangle, User } from "lucide-react"
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, ResponsiveContainer
} from "recharts"

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
import { KPIWidget } from "@/components/KPIWidget"
import { ChartCard } from "@/components/ChartCard"
import { useAuth } from "@/hooks/useAuth"
import { progress as progressApi } from "@/lib/api"
import { useNavigate } from "react-router-dom"

interface SkillProgress {
  id: string
  name: string
  category: string
  currentLevel: number
  targetLevel: number
  score: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // Fetch skill progress from MongoDB
  const { data: skillsProgress = [], isLoading } = useQuery<SkillProgress[]>({
    queryKey: ["progress"],
    queryFn: progressApi.getAll,
    enabled: !!user,
  })

  // Calculate KPIs
  const totalSkills = skillsProgress.length
  const completedSkills = skillsProgress.filter(
    (s) => s.currentLevel >= s.targetLevel
  ).length
  const avgScore = totalSkills > 0
    ? Math.round(skillsProgress.reduce((a, s) => a + s.score, 0) / totalSkills)
    : 0
  const gapSkills = totalSkills - completedSkills

  // Prepare data for charts
  const barData = skillsProgress.map((s) => ({
    name: s.name,
    current: s.currentLevel,
    target: s.targetLevel,
  }))

  const radarData = skillsProgress.map((s) => ({
    subject: s.name,
    score: s.score,
  }))

  const lineData = skillsProgress.map((s, idx) => ({
    name: `Week ${idx + 1}`,
    score: s.score,
  }))

  // Group skills by category for sidebar
  const skillCategories = React.useMemo(() => {
    const grouped: Record<string, any[]> = {}

    skillsProgress.forEach((skill) => {
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

  // Progress stats for right sidebar
  const progressStats = {
    totalSkills,
    completed: completedSkills,
    avgScore,
    upcomingAssessments: skillsProgress
      .filter((s) => s.currentLevel < s.targetLevel)
      .slice(0, 5)
      .map((s) => `${s.name} Assessment`),
  }

  // User data for right sidebar
  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    avatar: "",
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <SidebarLeft skillCategories={skillCategories} />
      <SidebarInset>
        {/* Header */}
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
                  <BreadcrumbPage className="line-clamp-1">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-['Space_Grotesk']">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Here's your skill development overview
              </p>
            </div>
          </motion.div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIWidget
              label="Total Skills"
              value={totalSkills}
              icon={BookOpen}
              trend={12}
            />
            <KPIWidget
              label="Completed"
              value={completedSkills}
              icon={CheckCircle}
              trend={8}
            />
            <KPIWidget
              label="Avg Score"
              value={`${avgScore}%`}
              icon={TrendingUp}
              trend={5}
            />
            <KPIWidget
              label="Gap Skills"
              value={gapSkills}
              icon={AlertTriangle}
              trend={-3}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="SKILL COVERAGE">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="CURRENT VS TARGET">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="current" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="target" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="PROGRESS TREND">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="RECOMMENDED SKILLS">
              <div className="space-y-3 pt-4">
                {skillsProgress
                  .filter((s) => s.currentLevel < s.targetLevel)
                  .slice(0, 5)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/assessment/${skill.id}`)}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Level {skill.currentLevel} → {skill.targetLevel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{skill.score}%</p>
                        <p className="text-xs text-muted-foreground">
                          {skill.category}
                        </p>
                      </div>
                    </div>
                  ))}
                {skillsProgress.filter((s) => s.currentLevel < s.targetLevel)
                  .length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      🎉 All skills completed!
                    </p>
                  )}
              </div>
            </ChartCard>
          </div>
        </main>
      </SidebarInset>
      <SidebarRight user={userData} progressStats={progressStats} />
    </SidebarProvider>
  )
}
