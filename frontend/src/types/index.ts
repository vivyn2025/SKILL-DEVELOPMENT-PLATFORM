export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  score: number;
}

export interface Assessment {
  id: string;
  title: string;
  skillId: string;
  questions: Question[];
  duration: number; // in minutes
  totalMarks: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Prerequisite {
  topic: string;
  description: string;
  importance: 'essential' | 'recommended' | 'helpful';
}

export interface GapSkill {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  gapPercentage: number;
  severity: 'high' | 'medium' | 'low';
  prerequisites?: Prerequisite[];
}

export interface LearningStep {
  id: string;
  skillName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
  resources: string[];
}

export interface KPI {
  label: string;
  value: number | string;
  icon: string;
  trend?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalAssessments: number;
  averageScore: number;
  activeUsers: number;
}
