import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { KPIWidget } from '@/components/KPIWidget';
import { ChartCard } from '@/components/ChartCard';
import { adminUserData, weakestSkillsData, progressData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Users, ClipboardCheck, TrendingUp, Activity, BookOpen } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Admin Console</h1>
            <p className="text-sm text-muted-foreground">Strategic overview and management shortcuts</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPIWidget label="Total Users" value={156} icon={Users} trend={18} />
            <KPIWidget label="Assessments" value={432} icon={ClipboardCheck} trend={12} />
            <KPIWidget label="Avg Score" value="72%" icon={TrendingUp} trend={5} />
            <KPIWidget label="Active Today" value={43} icon={Activity} trend={8} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass p-6 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <Users className="w-10 h-10 text-primary mx-auto" />
              <h3 className="font-semibold text-lg">User Directory</h3>
              <p className="text-sm text-muted-foreground">Manage all students, roles, and account permissions.</p>
              <Link to="/admin/users" className="block">
                <Button className="w-full rounded-xl gradient-primary border-0">Manage Users</Button>
              </Link>
            </Card>
            <Card className="glass p-6 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <BookOpen className="w-10 h-10 text-accent mx-auto" />
              <h3 className="font-semibold text-lg">Skill Lab</h3>
              <p className="text-sm text-muted-foreground">Configure the skill taxonomy and difficulty levels.</p>
              <Link to="/admin/skills" className="block">
                <Button className="w-full rounded-xl gradient-primary border-0">Manage Skills</Button>
              </Link>
            </Card>
            <Card className="glass p-6 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <ClipboardCheck className="w-10 h-10 text-green-500 mx-auto" />
              <h3 className="font-semibold text-lg">Assessment Hub</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage all skill evaluation modules.</p>
              <Link to="/admin/assessments" className="block">
                <Button className="w-full rounded-xl gradient-primary border-0">Manage Assessments</Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
