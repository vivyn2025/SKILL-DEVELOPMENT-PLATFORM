import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AssessmentPage from "./pages/Assessment";
import GapAnalysis from "./pages/GapAnalysis";
import LearningPath from "./pages/LearningPath";
import AdminDashboard from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminSkills from "./pages/AdminSkills";
import AdminAssessments from "./pages/AdminAssessments";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />

            {/* Auth Routes - Redirect to dashboard if already logged in */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes - Require Login */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/assessment/:id" element={<AssessmentPage />} />
            <Route path="/gap-analysis" element={<GapAnalysis />} />
            <Route path="/learning-path" element={<LearningPath />} />

            {/* Admin Only Route */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/assessments" element={<AdminAssessments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
