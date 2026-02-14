import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { KPIWidget } from '@/components/KPIWidget';
import { ChartCard } from '@/components/ChartCard';
import { adminUserData, weakestSkillsData, progressData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, TrendingUp, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform overview and analytics</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIWidget label="Total Users" value={156} icon={Users} trend={18} />
            <KPIWidget label="Assessments" value={432} icon={ClipboardCheck} trend={12} />
            <KPIWidget label="Avg Score" value="72%" icon={TrendingUp} trend={5} />
            <KPIWidget label="Active Today" value={43} icon={Activity} trend={8} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="WEAKEST SKILLS (AVG SCORES)">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weakestSkillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                  <Bar dataKey="avgScore" fill="hsl(var(--destructive))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="PLATFORM PERFORMANCE TREND">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* User Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">USER PERFORMANCE</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Assessments</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUserData.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
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

export default AdminDashboard;
