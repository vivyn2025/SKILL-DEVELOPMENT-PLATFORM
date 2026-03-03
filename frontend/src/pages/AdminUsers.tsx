import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { adminUserData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Users, Mail, Shield, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminUsers = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-2xl font-bold font-['Space_Grotesk']">User Management</h1>
                        <p className="text-sm text-muted-foreground">Manage platform users and roles</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="glass">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary" />
                                    Total Students
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{adminUserData.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="glass">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-accent" />
                                    Admins
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2</div>
                            </CardContent>
                        </Card>
                        <Card className="glass">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-500" />
                                    Active This Week
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">18</div>
                            </CardContent>
                        </Card>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Avg Score</TableHead>
                                        <TableHead>Tests Taken</TableHead>
                                        <TableHead>Last Activity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {adminUserData.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{u.name}</span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Mail className="w-3 h-3" /> {u.email}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="capitalize">Student</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={u.avgScore >= 80 ? 'text-accent border-accent/20' : u.avgScore >= 60 ? 'text-warning border-warning/20' : 'text-destructive border-destructive/20'}>
                                                    {u.avgScore}%
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{u.assessments}</TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{u.lastActive}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminUsers;
