import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { ClipboardCheck, Plus, Search, Clock, Award, MoreVertical, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { assessments as assessmentsApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';

const AdminAssessments = () => {
    const { data: assessments = [], isLoading } = useQuery({
        queryKey: ['admin-assessments'],
        queryFn: assessmentsApi.getAll
    });

    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Assessment Management</h1>
                            <p className="text-sm text-muted-foreground">Create and manage skill evaluations</p>
                        </motion.div>
                        <Button className="gradient-primary border-0 rounded-xl gap-2 font-medium">
                            <Plus className="w-4 h-4" /> Create Assessment
                        </Button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search assessments..." className="pl-10 rounded-xl glass max-w-md" />
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 glass rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {assessments.map((a: any) => (
                                <Card key={a._id || a.id} className="glass group hover:bg-secondary/20 transition-all duration-300 border-0">
                                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <ClipboardCheck className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{a.title}</h3>
                                                <div className="flex items-center gap-3 mt-1 underline-none">
                                                    <Badge variant="outline" className="text-[10px] h-5 bg-background/50">
                                                        {a.skillId?.name || 'General'}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {a.duration} mins
                                                    </span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Award className="w-3 h-3" /> {a.totalMarks} points
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                            <Button variant="ghost" size="sm" className="rounded-lg gap-2">
                                                <PlayCircle className="w-4 h-4" /> Preview
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-lg">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
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

export default AdminAssessments;
