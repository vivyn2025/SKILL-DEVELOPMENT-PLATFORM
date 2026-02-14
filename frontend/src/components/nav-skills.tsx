import {
    BookOpen,
    GraduationCap,
    LayoutDashboard,
    LineChart,
    Target,
    Trophy,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSkills({
    items,
}: {
    items: {
        title: string
        url: string
        icon: React.ElementType
        badge?: string
        isActive?: boolean
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                            <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                {item.badge && (
                                    <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                                        {item.badge}
                                    </span>
                                )}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
