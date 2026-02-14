import * as React from "react"
import { ChevronRight, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SkillCategory {
    name: string
    skills: {
        id: string
        name: string
        progress: number
        level: number
    }[]
}

export function SkillCategories({
    categories,
}: {
    categories: SkillCategory[]
}) {
    return (
        <>
            {categories.map((category, index) => (
                <React.Fragment key={category.name}>
                    <SidebarGroup key={category.name} className="py-0">
                        <Collapsible
                            defaultOpen={index === 0}
                            className="group/collapsible"
                        >
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
                            >
                                <CollapsibleTrigger>
                                    {category.name}{" "}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {category.skills.map((skill) => (
                                            <SidebarMenuItem key={skill.id}>
                                                <SidebarMenuButton asChild>
                                                    <a href={`/assessment/${skill.id}`} className="flex flex-col items-start py-3">
                                                        <div className="flex items-center w-full gap-2">
                                                            <Star className="size-4" fill={skill.level >= 7 ? "currentColor" : "none"} />
                                                            <span className="flex-1">{skill.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                Lv {skill.level}
                                                            </span>
                                                        </div>
                                                        <Progress value={skill.progress} className="mt-2 h-1" />
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </Collapsible>
                    </SidebarGroup>
                </React.Fragment>
            ))}
        </>
    )
}
