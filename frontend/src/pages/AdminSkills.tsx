import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { skills as skillsApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';

const AdminSkills = () => {
    const { data: skills = [], isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: skillsApi.getAll
    });

    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Manage Skills</h1>
                            <p className="text-sm text-muted-foreground">Configure skills, categories and difficulty levels</p>
                        </motion.div>
                        <Button className="gradient-primary border-0 rounded-xl gap-2 font-medium">
                            <Plus className="w-4 h-4" /> Add New Skill
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search skills..." className="pl-10 rounded-xl glass" />
                        </div>
                        <Button variant="outline" className="rounded-xl gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-32 glass rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {skills.map((skill: any) => (
                                <Card key={skill._id || skill.id} className="glass group hover:shadow-lg transition-all duration-300 overflow-hidden border-0">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                                <BookOpen className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                            <Button variant="ghost" size="icon" className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{skill.description}</p>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary" className="rounded-lg">{skill.category}</Badge>
                                            <div className="flex gap-2">
                                                <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminSkills;
