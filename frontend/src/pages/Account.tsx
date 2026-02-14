"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    User,
    Lock,
    Bell,
    Shield,
    Smartphone,
    LogOut,
    Mail,
    Save,
    Trash2,
    Globe,
    Moon,
    Sun
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"

export default function AccountPage() {
    const { user, logout } = useAuth()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
    }

    const sections = [
        { id: "general", label: "General", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
    ]

    return (
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
                <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Account Settings</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-8 p-6 max-w-5xl mx-auto w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold font-['Space_Grotesk']">Account Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your profile, security preferences, and notifications.
                        </p>
                    </div>

                    <Tabs defaultValue="general" className="w-full">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Sidebar Navigation for Settings */}
                            <aside className="w-full md:w-64 shrink-0">
                                <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-2 w-full">
                                    {sections.map((section) => (
                                        <TabsTrigger
                                            key={section.id}
                                            value={section.id}
                                            className="w-full justify-start gap-3 px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg transition-all"
                                        >
                                            <section.icon className="h-4 w-4" />
                                            {section.label}
                                        </TabsTrigger>
                                    ))}
                                    <div className="pt-4 mt-4 border-t w-full">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start gap-3 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={logout}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Log out
                                        </Button>
                                    </div>
                                </TabsList>
                            </aside>

                            {/* Content Area */}
                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* General Settings */}
                                        <TabsContent value="general" className="mt-0 space-y-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Profile Information</CardTitle>
                                                    <CardDescription>
                                                        Update your public profile display information.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="flex items-center gap-6">
                                                        <Avatar className="h-20 w-20 border-2 border-border">
                                                            <AvatarImage src={user?.avatar} />
                                                            <AvatarFallback className="text-xl">
                                                                {user?.name?.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Button variant="outline">Change Avatar</Button>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="name">Display Name</Label>
                                                            <Input id="name" defaultValue={user?.name} />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="bio">Bio</Label>
                                                            <Input id="bio" placeholder="Tell us about yourself" />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="url">Portfolio URL</Label>
                                                            <div className="relative">
                                                                <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                                <Input id="url" className="pl-9" placeholder="https://..." />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
                                                    <Button disabled={isLoading} onClick={handleSave}>
                                                        {isLoading ? "Saving..." : "Save Changes"}
                                                    </Button>
                                                </CardFooter>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Contact Information</CardTitle>
                                                    <CardDescription>
                                                        Manage your email and phone number.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="email">Email Address</Label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input id="email" defaultValue={user?.email} disabled />
                                                        </div>
                                                        <p className="text-[0.8rem] text-muted-foreground">
                                                            Contact support to change your email address.
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Security Settings */}
                                        <TabsContent value="security" className="mt-0 space-y-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Password</CardTitle>
                                                    <CardDescription>
                                                        Change your account password.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="current">Current Password</Label>
                                                        <Input id="current" type="password" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="new">New Password</Label>
                                                        <Input id="new" type="password" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="confirm">Confirm Password</Label>
                                                        <Input id="confirm" type="password" />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-end border-t px-6 py-4">
                                                    <Button>Update Password</Button>
                                                </CardFooter>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                                    <CardDescription>
                                                        Add an extra layer of security to your account.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <p className="font-medium">2FA is currently disabled</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                We recommend enabling 2FA for account security.
                                                            </p>
                                                        </div>
                                                        <Button variant="outline">Enable 2FA</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="border-destructive/20">
                                                <CardHeader>
                                                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                                    <CardDescription>
                                                        Irreversible actions. Tread carefully.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button variant="destructive" className="w-full sm:w-auto">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Account
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        {/* Notifications Settings */}
                                        <TabsContent value="notifications" className="mt-0 space-y-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Email Notifications</CardTitle>
                                                    <CardDescription>
                                                        Choose what emails you want to receive.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="flex items-center justify-between space-x-2">
                                                        <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                                            <span>Marketing emails</span>
                                                            <span className="font-normal text-xs text-muted-foreground">
                                                                Receive emails about new features and products.
                                                            </span>
                                                        </Label>
                                                        <Switch id="marketing" />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between space-x-2">
                                                        <Label htmlFor="activity" className="flex flex-col space-y-1">
                                                            <span>Activity digest</span>
                                                            <span className="font-normal text-xs text-muted-foreground">
                                                                Daily summary of your learning progress.
                                                            </span>
                                                        </Label>
                                                        <Switch id="activity" defaultChecked />
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center justify-between space-x-2">
                                                        <Label htmlFor="security" className="flex flex-col space-y-1">
                                                            <span>Security alerts</span>
                                                            <span className="font-normal text-xs text-muted-foreground">
                                                                Receive emails about account security login.
                                                            </span>
                                                        </Label>
                                                        <Switch id="security" defaultChecked disabled />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-end border-t px-6 py-4">
                                                    <Button variant="outline">Save Preferences</Button>
                                                </CardFooter>
                                            </Card>
                                        </TabsContent>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Tabs>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
